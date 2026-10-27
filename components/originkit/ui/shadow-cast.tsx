"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"

interface ShadowCastProps {
    background?: string
    baseColor?: string
    accentColor?: string
    density?: number
    size?: number
    jitter?: number
    softness?: number
    falloff?: number
    hover?: number
    speed?: number
    grain?: number
    style?: CSSProperties
}

const MAX_DPR = 2

const HOVER_RATE = 6

const DRIFT_X = 0.34
const DRIFT_Y = 0.26
const DRIFT_RATE_X = 0.23
const DRIFT_RATE_Y = 0.37

const MAX_RADIUS_SHARE = 0.225
const MAX_JITTER_SHARE = 0.25

type Vec3 = [number, number, number]

function parseColor(input: string | undefined, fallback: Vec3): Vec3 {
    if (!input) return fallback
    const str = String(input).trim()

    if (str.charAt(0) === "#") {
        let hex = str.slice(1)
        if (hex.length === 3 || hex.length === 4) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        }
        if (hex.length >= 6) {
            const r = parseInt(hex.slice(0, 2), 16)
            const g = parseInt(hex.slice(2, 4), 16)
            const b = parseInt(hex.slice(4, 6), 16)
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r / 255, g / 255, b / 255]
        }
        return fallback
    }

    const parts = str.match(/[\d.]+/g)
    if (parts && parts.length >= 3) {
        return [
            Math.min(255, parseFloat(parts[0])) / 255,
            Math.min(255, parseFloat(parts[1])) / 255,
            Math.min(255, parseFloat(parts[2])) / 255,
        ]
    }
    return fallback
}

function clamp(v: number, lo: number, hi: number): number {
    return v < lo ? lo : v > hi ? hi : v
}

function num(v: unknown, fallback: number): number {
    return typeof v === "number" && isFinite(v) ? v : fallback
}

const VERT_SRC = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime;
uniform float uDpr;

uniform vec3  uBg;
uniform vec3  uBase;
uniform vec3  uAccent;
uniform vec2  uLight;
uniform float uSpacing;
uniform float uRadius;
uniform float uJitter;
uniform float uSoft;
uniform float uFall;
uniform float uGrain;

const int MARCH = 64;

float h21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float filmGrain(vec2 fragCoord, float t, float dpr) {
    vec2 cell = floor(fragCoord / max(dpr, 1.0));
    return h21(cell + floor(t * 24.0) * 13.7) - 0.5;
}

vec2 blockerAt(vec2 cell) {
    vec2 j = vec2(h21(cell + 3.1), h21(cell + 8.7)) - 0.5;
    return (cell + 0.5) * uSpacing + j * (2.0 * uJitter);
}

float radiusAt(vec2 cell) {
    return uRadius * (0.68 + 0.64 * h21(cell + 15.3));
}

void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float aspect = uRes.x / uRes.y;

    vec2 p = vec2(uv.x * aspect, uv.y);
    float aa = 1.4 / uRes.y;

    vec2 toLight = uLight - p;
    float maxT = length(toLight);
    vec2 dir = maxT > 1e-6 ? toLight / maxT : vec2(0.0, 1.0);

    vec2 cell = floor(p / uSpacing);
    vec2 stepDir = sign(dir);

    vec2 safeDir = vec2(
        abs(dir.x) < 1e-6 ? 1e-6 : dir.x,
        abs(dir.y) < 1e-6 ? 1e-6 : dir.y
    );
    vec2 tDelta = abs(uSpacing / safeDir);
    vec2 tMax = ((cell + max(stepDir, 0.0)) * uSpacing - p) / safeDir;

    if (abs(dir.x) < 1e-6) tMax.x = 1e20;
    if (abs(dir.y) < 1e-6) tMax.y = 1e20;

    float shade = 1.0;
    float travelled = 0.0;

    for (int i = 0; i < MARCH; i++) {
        vec2 c = blockerAt(cell);
        float rad = radiusAt(cell);

        vec2 pc = c - p;
        float t = clamp(dot(pc, dir), 0.0, maxT);
        float h = length(pc - dir * t) - rad;

        if (h < 0.0) { shade = 0.0; break; }

        shade = min(shade, h / max(t * uSoft, 1e-5));

        if (tMax.x < tMax.y) {
            travelled = tMax.x;
            cell.x += stepDir.x;
            tMax.x += tDelta.x;
        } else {
            travelled = tMax.y;
            cell.y += stepDir.y;
            tMax.y += tDelta.y;
        }
        if (travelled > maxT) break;
    }
    shade = clamp(shade, 0.0, 1.0);

    float dist = length(uLight - p);
    float atten = 1.0 / (1.0 + uFall * dist * dist);

    vec3 col = uBg + uAccent * atten * shade;

    vec2 own = floor(p / uSpacing);
    vec2 pc = blockerAt(own);
    float pr = radiusAt(own);
    float pd = length(p - pc) - pr;
    float cov = 1.0 - smoothstep(-aa, aa, pd);

    if (cov > 0.0) {
        float dc = length(uLight - pc);
        float attenC = 1.0 / (1.0 + uFall * dc * dc);
        vec2 toL = dc > 1e-6 ? (uLight - pc) / dc : vec2(0.0, 1.0);
        vec2 nrm = normalize(p - pc + 1e-6);
        float lam = clamp(dot(nrm, toL) * 0.5 + 0.5, 0.0, 1.0);

        float rim = smoothstep(-aa * 3.0, 0.0, pd) * pow(lam, 3.0);
        vec3 pillar = uBase * (0.24 + 1.25 * pow(lam, 1.6) * attenC) + uAccent * rim * 0.5 * attenC;
        col = mix(col, pillar, cov);
    }

    col += (h21(gl_FragCoord.xy) - 0.5) * (1.5 / 255.0);
    col += filmGrain(gl_FragCoord.xy, uTime, uDpr) * uGrain;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

function compileShader(
    gl: WebGLRenderingContext,
    type: number,
    src: string
): WebGLShader | null {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("ShadowCast shader:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }
    return shader
}

export default function ShadowCast(props: ShadowCastProps) {
    const {
        background = "#000000",
        baseColor = "#FFFFFF",
        accentColor = "#FFB45A",
        density = 24,
        size = 10,
        jitter = 100,
        softness = 100,
        falloff = 22,
        hover = 100,
        speed = 32,
        grain = 0,
        style,
    } = props

    const rootRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const propsRef = useRef(props)
    propsRef.current = props

    const pointerRef = useRef({ rawX: 0.5, rawY: 0.5, on: 0, onTarget: 0 })

    useEffect(() => {
        const root = rootRef.current
        const canvas = canvasRef.current
        if (!root || !canvas) return

        const gl = canvas.getContext("webgl", {
            antialias: false,
            alpha: false,
            depth: false,
            preserveDrawingBuffer: false,
        })
        if (!gl) {
            console.error("ShadowCast: WebGL unavailable")
            return
        }

        const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
        const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
        if (!vs || !fs) return

        const program = gl.createProgram()
        if (!program) return
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("ShadowCast link:", gl.getProgramInfoLog(program))
            return
        }
        gl.useProgram(program)

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const posLoc = gl.getAttribLocation(program, "aPos")
        gl.enableVertexAttribArray(posLoc)
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

        const loc = (name: string) => gl.getUniformLocation(program, name)
        const uRes = loc("uRes")
        const uTime = loc("uTime")
        const uDpr = loc("uDpr")
        const uBg = loc("uBg")
        const uBase = loc("uBase")
        const uAccent = loc("uAccent")
        const uLight = loc("uLight")
        const uSpacing = loc("uSpacing")
        const uRadius = loc("uRadius")
        const uJitter = loc("uJitter")
        const uSoft = loc("uSoft")
        const uFall = loc("uFall")
        const uGrain = loc("uGrain")

        let cssWidth = root.offsetWidth || 1
        let cssHeight = root.offsetHeight || 1
        const resizeObserver = new ResizeObserver(() => {
            cssWidth = root.offsetWidth || 1
            cssHeight = root.offsetHeight || 1
        })
        resizeObserver.observe(root)

        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches

        let raf = 0
        let last = performance.now()
        let clock = 0

        const render = (now: number) => {
            raf = requestAnimationFrame(render)

            const dt = Math.min(0.05, (now - last) / 1000)
            last = now

            const p = propsRef.current
            const rate = reduceMotion ? 0 : clamp(num(p.speed, 32), 0, 100) / 50

            clock = (clock + dt * rate) % 3600

            const pointer = pointerRef.current
            pointer.on += (pointer.onTarget - pointer.on) * (1 - Math.exp(-HOVER_RATE * dt))

            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
            const bufferWidth = Math.max(1, Math.round(cssWidth * dpr))
            const bufferHeight = Math.max(1, Math.round(cssHeight * dpr))
            if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
                canvas.width = bufferWidth
                canvas.height = bufferHeight
                gl.viewport(0, 0, bufferWidth, bufferHeight)
            }
            const aspect = bufferWidth / bufferHeight

            const idleX = aspect * 0.5 + DRIFT_X * Math.sin(clock * DRIFT_RATE_X)
            const idleY = 0.5 + DRIFT_Y * Math.sin(clock * DRIFT_RATE_Y + 1.3)

            const pointerX = pointer.rawX * aspect
            const pointerY = 1 - pointer.rawY
            const follow = (clamp(num(p.hover, 100), 0, 100) / 100) * Math.min(1, pointer.on)

            const density = Math.round(clamp(num(p.density, 24), 4, 24))
            const spacing = 1 / density

            gl.uniform2f(uRes, bufferWidth, bufferHeight)
            gl.uniform1f(uTime, clock)
            gl.uniform1f(uDpr, dpr)

            const bg = parseColor(p.background, [0.024, 0.024, 0.039])
            const base = parseColor(p.baseColor, [0.145, 0.161, 0.235])
            const accent = parseColor(p.accentColor, [1.0, 0.706, 0.353])
            gl.uniform3f(uBg, bg[0], bg[1], bg[2])
            gl.uniform3f(uBase, base[0], base[1], base[2])
            gl.uniform3f(uAccent, accent[0], accent[1], accent[2])

            gl.uniform2f(
                uLight,
                idleX + (pointerX - idleX) * follow,
                idleY + (pointerY - idleY) * follow
            )
            gl.uniform1f(uSpacing, spacing)

            gl.uniform1f(
                uRadius,
                spacing * MAX_RADIUS_SHARE * (clamp(num(p.size, 10), 10, 100) / 100)
            )
            gl.uniform1f(
                uJitter,
                spacing * MAX_JITTER_SHARE * (clamp(num(p.jitter, 100), 0, 100) / 100)
            )

            gl.uniform1f(uSoft, 0.004 + (clamp(num(p.softness, 100), 0, 100) / 100) * 0.26)
            gl.uniform1f(uFall, (clamp(num(p.falloff, 22), 0, 100) / 100) * 6)
            gl.uniform1f(uGrain, (clamp(num(p.grain, 0), 0, 100) / 100) * 0.09)

            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }

        const readPointer = (event: PointerEvent) => {
            const rect = root.getBoundingClientRect()
            if (rect.width <= 0 || rect.height <= 0) return
            const pointer = pointerRef.current
            pointer.rawX = clamp((event.clientX - rect.left) / rect.width, 0, 1)
            pointer.rawY = clamp((event.clientY - rect.top) / rect.height, 0, 1)
        }

        const onMove = (event: PointerEvent) => {
            readPointer(event)
            pointerRef.current.onTarget = 1
        }
        const onLeave = () => {
            pointerRef.current.onTarget = 0
        }

        root.addEventListener("pointermove", onMove)
        root.addEventListener("pointerenter", onMove)
        root.addEventListener("pointerleave", onLeave)

        window.addEventListener("blur", onLeave)

        raf = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(raf)
            resizeObserver.disconnect()
            root.removeEventListener("pointermove", onMove)
            root.removeEventListener("pointerenter", onMove)
            root.removeEventListener("pointerleave", onLeave)
            window.removeEventListener("blur", onLeave)
            gl.deleteBuffer(buffer)
            gl.deleteProgram(program)
            gl.deleteShader(vs)
            gl.deleteShader(fs)

        }
    }, [])

    return (
        <div
            ref={rootRef}
            style={{
                minWidth: 1200,
                minHeight: 800,
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                isolation: "isolate",
                background,
                touchAction: "none",
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
            />
        </div>
    )
}