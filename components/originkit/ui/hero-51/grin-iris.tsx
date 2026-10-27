/* eslint-disable */
// @ts-nocheck
"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

const PAIR = new Set<HTMLElement>()
const SHARED = { glanceX: 0, glanceY: 0, nextAt: 0 }

const DEFAULTS = {
    background: "#000000",
    scale: 110,
    irisColor: "#FF2400",
    scleraColor: "#FFFFFF",
    pupilSize: 0,
    follow: "frame",
    reach: 10,
    dilate: 5.2,
    wander: 10,
    float: 10,
}

const DEFAULT_ADVANCED = {
    restX: 22,
    restY: 1,

    maxTurn: 42,

    irisAngle: 29,

    bulge: 12,
    markColor: "#FFFFFF",
    collarColor: "#7A4A22",
    lightAngle: 0,
    gloss: 100,
    redness: 100,
    veins: 30,
    limbus: 75,
    fiber: 100,
    followMs: 45,
    saccadeMs: 2200,
    hippus: 30,
}

type Advanced = typeof DEFAULT_ADVANCED

export interface GrinIrisProps {
    background?: string

    scale?: number

    irisColor?: string

    scleraColor?: string

    pupilSize?: number

    follow?: "page" | "frame" | "off"

    reach?: number

    dilate?: number

    wander?: number

    float?: number

    advanced?: Partial<Advanced>
    style?: CSSProperties
}

const VERT = `
attribute vec2 aPos;
void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = `
uniform vec2  uCenter;
uniform float uRadius;
uniform mat3  uRot;
uniform float uCosA;
uniform float uSinA;
uniform float uZc;
uniform float uRc;
uniform float uIrisZ;
uniform float uIrisR;
uniform float uPupil;
uniform float uMark;
uniform vec3  uIris;
uniform vec3  uSclera;
uniform vec3  uMarkCol;
uniform vec3  uCollar;
uniform vec2  uLight;
uniform float uGloss;
uniform float uRed;
uniform float uVeins;
uniform float uLimbus;
uniform float uFiber;
uniform float uTime;

float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
}

float vnoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash13(i), hash13(i + vec3(1.0, 0.0, 0.0)), f.x),
                   mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
               mix(mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), f.x),
                   mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
}

float box(vec3 R, vec3 d, vec3 up, vec2 hw, float soft) {
    float k = dot(R, d);
    if (k <= 0.0) return 0.0;
    vec3 rt = normalize(cross(up, d));
    vec3 u = cross(d, rt);
    vec2 uv = vec2(dot(R, rt), dot(R, u)) / k;
    vec2 e = smoothstep(hw + soft, hw - soft, abs(uv));
    return e.x * e.y;
}

vec3 roll(vec3 v) {
    return vec3(uLight.x * v.x - uLight.y * v.y, uLight.y * v.x + uLight.x * v.y, v.z);
}

vec3 env(vec3 R) {
    vec3 c = vec3(0.0);

    c += vec3(1.0, 0.98, 0.97) * 16.0 *
         box(R, roll(normalize(vec3(0.40, 0.72, -0.55))), vec3(0.0, 0.0, 1.0), vec2(0.75, 0.75), 0.35);

    c += vec3(1.0, 0.97, 0.95) * 9.0 *
         box(R, roll(normalize(vec3(-0.92, 0.05, 0.25))), vec3(0.0, 1.0, 0.0), vec2(0.22, 0.65), 0.10);

    c += vec3(1.0, 0.95, 0.92) * 6.0 *
         box(R, roll(normalize(vec3(-0.80, -0.45, 0.10))), vec3(0.0, 1.0, 0.0), vec2(0.30, 0.18), 0.08);

    c += vec3(1.0, 0.9, 0.88) * 2.2 *
         box(R, roll(normalize(vec3(-0.45, -0.55, -0.70))), vec3(0.0, 1.0, 0.0), vec2(0.9, 0.35), 0.35);

    c += vec3(0.05, 0.045, 0.045) * (0.4 + 0.6 * smoothstep(-0.4, 1.0, R.y));
    return c;
}

vec3 irisShade(vec2 q) {
    float r = length(q);
    float a = atan(q.y, q.x);
    vec2 cs = vec2(cos(a), sin(a));

    float w = (vnoise(vec3(cs * 5.0, r * 4.0)) - 0.5) * 0.06 +
              (vnoise(vec3(cs * 16.0, r * 10.0)) - 0.5) * 0.025;
    vec2 cw = vec2(cos(a + w), sin(a + w));

    float n1 = vnoise(vec3(cw * 9.0, r * 3.0 + 3.0));

    float t1 = pow(1.0 - abs(vnoise(vec3(cw * 38.0, r * 3.0 + 9.0)) * 2.0 - 1.0), 5.0);
    float t2 = pow(1.0 - abs(vnoise(vec3(cw * 63.0, r * 5.0 + 1.7)) * 2.0 - 1.0), 6.0);

    float run = smoothstep(0.25, 0.75, vnoise(vec3(cw * 20.0, r * 13.0 + 4.0)));
    float thr = clamp((t1 + t2 * 0.8) * (0.30 + 0.70 * run), 0.0, 1.0);

    vec3 dark = uIris * vec3(0.06, 0.10, 0.03);
    vec3 light = mix(uIris, vec3(0.80, 0.95, 0.30), 0.3) * 1.5;
    vec3 c = mix(dark, uIris * 0.8, smoothstep(0.2, 0.75, n1) * 0.35 + 0.05);
    c = mix(c, light, thr * uFiber);

    c *= 1.0 - 0.7 * smoothstep(0.68, 0.86, vnoise(vec3(cw * 16.0, r * 9.0 + 21.0))) * uFiber;
    float n2 = vnoise(vec3(cw * 30.0, r * 7.0 + 9.0));
    c = mix(mix(dark, uIris, 0.5), c, uFiber);

    c *= mix(1.0, 0.30, smoothstep(0.80, 1.0, r) * (0.5 + 0.5 * uLimbus));

    float pr = uPupil;
    float cr = pr * (1.35 + 0.8 * (vnoise(vec3(cs * 6.0, 11.0)) - 0.5) +
                     0.45 * (n2 - 0.5));
    float collar = smoothstep(cr, cr - 0.07, r);
    vec3 cc = uCollar * (0.35 + 1.5 * n2);
    cc = mix(cc, vec3(0.50, 0.05, 0.03),
             smoothstep(0.62, 0.85, vnoise(vec3(cs * 23.0, r * 14.0))) * 0.8);
    c = mix(c, cc, collar * 0.85);

    float jag = 0.03 * (vnoise(vec3(cs * 13.0, 2.0)) - 0.5);
    c *= mix(0.45, 1.0, smoothstep(pr, pr + 0.14, r));
    float pupil = smoothstep(pr + 0.012, pr - 0.012, r + jag);
    return mix(c, vec3(0.004), pupil);
}

float sdEllipse(vec2 p, vec2 ab) {
    return (length(p / ab) - 1.0) * min(ab.x, ab.y);
}

float markSd(vec2 m) {
    float d = sdEllipse(m - vec2(-0.30, 0.50), vec2(0.18, 0.26));
    d = min(d, sdEllipse(m - vec2(0.355, 0.53), vec2(0.16, 0.30)));

    vec2 c = vec2(0.0905, -0.0839);
    float R = 0.772;
    vec2 v = m - c;
    vec2 mid = vec2(0.115, -0.993);
    float arc;
    if (dot(normalize(v), mid) > -0.208) {
        arc = abs(length(v) - R);
    } else {
        vec2 e1 = c + R * vec2(-0.9954, 0.0958);
        vec2 e2 = c + R * vec2(0.9475, 0.3198);
        arc = min(length(m - e1), length(m - e2));
    }
    return min(d, arc - 0.028);
}

float veinLines(vec3 n, float f, float seed) {
    vec3 wq = n * f;
    wq += vec3(vnoise(wq * 0.5 + seed), vnoise(wq * 0.5 + seed + 7.1), vnoise(wq * 0.5 + seed + 3.3)) * 0.8;
    float v = vnoise(wq);
    return smoothstep(0.018, 0.0, abs(v - 0.5));
}

vec3 scleraAlbedo(vec3 nl) {
    vec3 a = uSclera;

    float away = smoothstep(uCosA - 0.06, uCosA - 0.55, nl.z);
    float big = veinLines(nl, 5.0, 0.0);
    float fine = veinLines(nl, 11.0, 17.0) * 0.6;
    float v = clamp(big + fine, 0.0, 1.0) * away * uVeins;
    a = mix(a, vec3(0.62, 0.07, 0.07), v * 0.75);

    a *= mix(vec3(1.0), vec3(1.0, 0.82, 0.82), vnoise(nl * 3.0 + 5.0) * 0.5 * uRed);
    return a;
}

vec3 diffuse(vec3 n, vec3 albedo) {
    vec3 L = roll(normalize(vec3(0.50, 0.70, 0.55)));
    float ndl = dot(n, L);

    vec3 wrap = vec3(0.90, 0.50, 0.50) * (0.35 + 0.65 * uRed);
    vec3 d = clamp((ndl + wrap) / (1.0 + wrap), 0.0, 1.0);
    d *= d;
    float fill = max(0.0, dot(n, roll(normalize(vec3(-0.85, -0.15, 0.50)))));
    return albedo * (d * 1.55 + vec3(0.30, 0.16, 0.16) * fill + 0.03);
}

vec3 limbShade(vec3 c, float k) {
    k = clamp(k, 0.0, 1.0);
    float g = dot(c, vec3(0.3, 0.5, 0.2));
    return mix(c, vec3(min(g, 1.2)) * 0.22, k);
}

vec2 sphereHit(vec3 ro, vec3 rd, vec3 c, float r) {
    vec3 oc = ro - c;
    float b = dot(oc, rd);
    float h = b * b - (dot(oc, oc) - r * r);
    if (h < 0.0) return vec2(-1.0, h);
    return vec2(-b - sqrt(h), h);
}

float tone(float x) {
    return x < 0.8 ? x : 0.8 + 0.2 * (1.0 - exp(-(x - 0.8) / 0.2));
}

void main() {
    float px = 1.0 / uRadius;
    vec2 p = (gl_FragCoord.xy - uCenter) * px;

    vec3 ro = vec3(p, 4.0);
    vec3 rd = vec3(0.0, 0.0, -1.0);
    vec3 fwd = uRot * vec3(0.0, 0.0, 1.0);
    vec3 cc = fwd * uZc;

    vec2 hE = sphereHit(ro, rd, vec3(0.0), 1.0);
    vec2 hC = sphereHit(ro, rd, cc, uRc);
    vec3 PC = ro + rd * hC.x;
    bool capHit = hC.x > 0.0 && dot(PC, fwd) > uCosA;

    float cov = 1.0 - smoothstep(1.0 - px, 1.0 + px, length(p));
    vec2 dc = p - cc.xy;
    vec3 rimC = cc + vec3(normalize(dc + 1e-6) * uRc, 0.0);
    float capRim = smoothstep(uCosA - 0.01, uCosA + 0.01, dot(rimC, fwd));
    cov = max(cov, (1.0 - smoothstep(uRc - px, uRc + px, length(dc))) * capRim);
    if (cov <= 0.0) {
        gl_FragColor = vec4(0.0);
        return;
    }

    vec3 col;

    if (capHit) {
        vec3 N = normalize(PC - cc);
        vec3 Pl = PC * uRot;
        vec3 rr = refract(rd, N, 1.0 / 1.376);
        vec3 rl = rr * uRot;
        float t = (uIrisZ - Pl.z) / min(rl.z, -1e-3);

        vec2 q = (Pl.xy + rl.xy * t) / (uIrisR * 0.95);
        float rq = length(q);

        vec3 ir = irisShade(q);

        float il = 0.75 + 0.5 * max(0.0, dot(fwd, roll(normalize(vec3(0.30, 0.75, 0.60)))));

        ir *= il * (0.78 + 0.22 * smoothstep(0.9, -0.4, q.y));

        vec3 under = diffuse(normalize(fwd + uRot * vec3(q * uIrisR, 0.0)), scleraAlbedo(vec3(q * uSinA, uCosA)));
        vec3 base = mix(ir, under, smoothstep(0.97, 1.06, rq));

        float lr = (rq - 1.03) / 0.10;

        float rim = length(Pl.xy) / uSinA;
        float lc = (rim - 1.0) / 0.10;
        base = limbShade(base, uLimbus * max(exp(-lr * lr), exp(-lc * lc)));

        if (uMark > 0.5) {
            float sd = markSd(Pl.xy / uSinA);
            float aa = px / uSinA * 1.5;
            float m = smoothstep(aa, -aa, sd);

            vec3 mk = uMarkCol * (0.92 + 0.15 * max(0.0, N.y));
            base = mix(base, mk, m);
        }

        float ndv = max(0.0, N.z);
        float F = 0.025 + 0.975 * pow(1.0 - ndv, 5.0);
        col = base * (1.0 - F) + env(reflect(rd, N)) * F * uGloss * 1.4;
    } else {
        vec3 P = ro + rd * max(hE.x, 0.0);

        if (hE.x < 0.0) P = vec3(normalize(p) * 0.999, 0.03);
        vec3 N = normalize(P);
        vec3 nl = N * uRot;
        col = diffuse(N, scleraAlbedo(nl));

        float lg = (uCosA - nl.z) / 0.06;
        col = limbShade(col, uLimbus * exp(-lg * lg));

        float graze = pow(1.0 - clamp(N.z, 0.0, 1.0), 3.0);
        col *= mix(vec3(1.0), vec3(0.62, 0.24, 0.23), graze * 0.9 * uRed);
        float F = 0.04 + 0.96 * pow(1.0 - clamp(N.z, 0.0, 1.0), 5.0);
        col += env(reflect(rd, N)) * F * uGloss;
    }

    col = vec3(tone(col.r), tone(col.g), tone(col.b));
    col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
    col += (hash13(vec3(gl_FragCoord.xy, uTime)) - 0.5) / 255.0;
    gl_FragColor = vec4(col * cov, cov);
}
`

let parseCtx: CanvasRenderingContext2D | null | undefined

function toRGB(css: string): [number, number, number] {
    if (!css) return [0, 0, 0]
    const s = css.trim()
    const hex = /^#([0-9a-f]{3,8})$/i.exec(s)
    if (hex) {
        let h = hex[1]
        if (h.length === 3 || h.length === 4) {
            h = h
                .split("")
                .map((c) => c + c)
                .join("")
        }
        const n = parseInt(h.slice(0, 6), 16)
        return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
    }
    const fn = /^rgba?\(([^)]+)\)$/i.exec(s)
    if (fn) {
        const v = fn[1]
            .split(/[\s,/]+/)
            .filter(Boolean)
            .slice(0, 3)
            .map((x) => (x.indexOf("%") >= 0 ? parseFloat(x) * 2.55 : parseFloat(x)))
        return [(v[0] || 0) / 255, (v[1] || 0) / 255, (v[2] || 0) / 255]
    }

    if (typeof document !== "undefined") {
        if (parseCtx === undefined) parseCtx = document.createElement("canvas").getContext("2d")
        if (parseCtx) {
            parseCtx.fillStyle = "#000000"
            parseCtx.fillStyle = s
            const out = parseCtx.fillStyle
            if (typeof out === "string" && out.charAt(0) === "#" && out !== s) return toRGB(out)
        }
    }
    return [0, 0, 0]
}

function lin(css: string): [number, number, number] {
    const c = toRGB(css)
    return [Math.pow(c[0], 2.2), Math.pow(c[1], 2.2), Math.pow(c[2], 2.2)]
}

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
    const sh = gl.createShader(type)
    if (!sh) return null
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh)
        return null
    }
    return sh
}

const DEG = Math.PI / 180

const FIT = 0.71
const DPR_CAP = 2

export default function GrinIris({
    background = DEFAULTS.background,
    scale = DEFAULTS.scale,
    irisColor = DEFAULTS.irisColor,
    scleraColor = DEFAULTS.scleraColor,
    pupilSize = DEFAULTS.pupilSize,
    follow = DEFAULTS.follow,
    reach = DEFAULTS.reach,
    dilate = DEFAULTS.dilate,
    wander = DEFAULTS.wander,
    float = DEFAULTS.float,
    advanced = {"bulge":12,"fiber":100,"gloss":100,"restX":22,"restY":1,"veins":30,"hippus":30,"limbus":75,"maxTurn":42,"redness":100,"followMs":45,"irisAngle":29,"markColor":"#FFFFFF","saccadeMs":2200,"lightAngle":0,"collarColor":"#7A4A22"},
    style,
}: GrinIrisProps) {
    const hostRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [failed, setFailed] = useState(false)

    const propsRef = useRef({
        scale,
        irisColor,
        scleraColor,
        pupilSize,
        follow,
        reach,
        dilate,
        wander,
        float,
        adv: { ...DEFAULT_ADVANCED, ...advanced },
    })
    propsRef.current = {
        scale,
        irisColor,
        scleraColor,
        pupilSize,
        follow,
        reach,
        dilate,
        wander,
        float,
        adv: { ...DEFAULT_ADVANCED, ...advanced },
    }

    useEffect(() => {
        const host = hostRef.current
        const canvas = canvasRef.current
        if (!host || !canvas) return

        let disposed = false
        let raf = 0
        let gl: WebGLRenderingContext | null = null
        let program: WebGLProgram | null = null
        let buffer: WebGLBuffer | null = null
        let uni: Record<string, WebGLUniformLocation | null> = {}
        let onScreen = true
        let pageVisible = true
        let reduceMotion = false
        let dpr = 1

        const pointer = { u: 0.5, v: 0.5, active: false, down: false }

        let yaw = DEFAULT_ADVANCED.restX * DEG
        let pitch = DEFAULT_ADVANCED.restY * DEG
        let glanceX = 0
        let glanceY = 0
        let nextGlance = 1.2
        let pupil = 1
        let flash = 0
        let clock = 0
        let lastNow = 0

        function init(): boolean {
            const ctx = canvas!.getContext("webgl", {
                alpha: true,
                antialias: false,
                premultipliedAlpha: true,
            }) as WebGLRenderingContext | null
            if (!ctx) return false
            gl = ctx
            const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
            const prelude = "precision " + (hp && hp.precision > 0 ? "highp" : "mediump") + " float;\n"
            const vs = compile(gl, gl.VERTEX_SHADER, VERT)
            const fs = compile(gl, gl.FRAGMENT_SHADER, prelude + FRAG)
            if (!vs || !fs) return false
            const prog = gl.createProgram()
            if (!prog) return false
            gl.attachShader(prog, vs)
            gl.attachShader(prog, fs)
            gl.bindAttribLocation(prog, 0, "aPos")
            gl.linkProgram(prog)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
            if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false
            program = prog
            gl.useProgram(prog)

            buffer = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
            gl.enableVertexAttribArray(0)
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

            uni = {}
            for (const n of [
                "uCenter", "uRadius", "uRot", "uCosA", "uSinA", "uZc", "uRc", "uIrisZ", "uIrisR",
                "uPupil", "uMark", "uIris", "uSclera", "uMarkCol", "uCollar", "uLight", "uGloss",
                "uRed", "uVeins", "uLimbus", "uFiber", "uTime",
            ])
                uni[n] = gl.getUniformLocation(prog, n)
            gl.clearColor(0, 0, 0, 0)
            return true
        }

        function resize() {
            if (!gl) return
            dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
            const w = Math.max(1, Math.round(host!.clientWidth * dpr))
            const h = Math.max(1, Math.round(host!.clientHeight * dpr))
            if (canvas!.width !== w || canvas!.height !== h) {
                canvas!.width = w
                canvas!.height = h
                gl.viewport(0, 0, w, h)
            }
        }

        function draw(dt: number) {
            if (!gl || !program) return
            const p = propsRef.current
            const a = p.adv
            const still = reduceMotion
            clock += dt

            const W = canvas!.width
            const H = canvas!.height
            const radius = FIT * (Math.max(1, p.scale) / 100) * Math.min(W, H) * 0.5
            const bob = still ? 0 : Math.sin(clock * 0.9) * p.float * 0.006
            const cx = W * 0.5
            const cy = H * 0.5 + bob * radius

            let tx = a.restX * DEG
            let ty = a.restY * DEG
            const following = p.follow !== "off" && pointer.active && p.reach > 0
            if (following) {
                const dx = (pointer.u * W - cx) / radius
                const dy = -(pointer.v * H - cy) / radius
                const D = 17 / p.reach
                const lim = a.maxTurn * DEG
                tx = Math.max(-lim, Math.min(lim, Math.atan2(dx, D)))
                ty = Math.max(-lim, Math.min(lim, Math.atan2(dy, Math.hypot(dx, D))))
            } else if (!still && p.wander > 0) {
                const nowMs = performance.now()
                if (nowMs >= SHARED.nextAt) {
                    const amp = p.wander * 2.2 * DEG
                    const home = Math.random() < 0.4
                    SHARED.glanceX = home ? 0 : (Math.random() * 2 - 1) * amp
                    SHARED.glanceY = home ? 0 : (Math.random() * 2 - 1) * amp * 0.6
                    SHARED.nextAt = nowMs + a.saccadeMs * (0.45 + Math.random() * 1.1)
                }
                tx += SHARED.glanceX
                ty += SHARED.glanceY
            }

            if (!still) {
                tx += Math.sin(clock * 37.0) * 0.05 * DEG + Math.sin(clock * 23.0) * 0.04 * DEG
                ty += Math.sin(clock * 31.0 + 1.0) * 0.05 * DEG
            }
            const k = 1 - Math.exp(-dt / Math.max(0.005, a.followMs / 1000))
            yaw += (tx - yaw) * k
            pitch += (ty - pitch) * k

            const react = p.dilate / 10
            if (pointer.down) flash = 1
            const near = following ? 1 : 0
            const want = 1 + react * 0.22 * near - react * 0.45 * flash

            const pk = 1 - Math.exp(-dt / (want < pupil ? 0.12 : 0.9))
            pupil += (want - pupil) * pk
            flash = pointer.down ? 1 : Math.max(0, flash - dt * 2.2)
            const hippus = still ? 0 : (a.hippus / 100) * 0.03 * Math.sin(clock * 1.7) * Math.sin(clock * 0.53 + 2.0)
            const pupilR = Math.min(0.6, (0.13 + p.pupilSize * 0.035) * (pupil + hippus))

            const cyw = Math.cos(yaw), syw = Math.sin(yaw)
            const cp = Math.cos(pitch), sp = Math.sin(pitch)
            const rot = new Float32Array([
                cyw, 0, -syw,
                -syw * sp, cp, -cyw * sp,
                syw * cp, sp, cyw * cp,
            ])

            const A = Math.max(10, Math.min(45, a.irisAngle)) * DEG
            const sinA = Math.sin(A)
            const cosA = Math.cos(A)
            const apex = 1 + Math.max(0.01, a.bulge / 100)

            const rc = (sinA * sinA + (apex - cosA) * (apex - cosA)) / (2 * (apex - cosA))
            const zc = apex - rc

            const irisZ = cosA - 0.04
            const irisR = Math.sqrt(1 - irisZ * irisZ)

            gl.useProgram(program)
            gl.uniform2f(uni.uCenter, cx, H - cy)
            gl.uniform1f(uni.uRadius, radius)
            gl.uniformMatrix3fv(uni.uRot, false, rot)
            gl.uniform1f(uni.uCosA, cosA)
            gl.uniform1f(uni.uSinA, sinA)
            gl.uniform1f(uni.uZc, zc)
            gl.uniform1f(uni.uRc, rc)
            gl.uniform1f(uni.uIrisZ, irisZ)
            gl.uniform1f(uni.uIrisR, irisR)
            gl.uniform1f(uni.uPupil, pupilR)
            gl.uniform1f(uni.uMark, 0)
            const ic = lin(p.irisColor)
            const sc = lin(p.scleraColor)
            const mc = lin(a.markColor)
            const cc = lin(a.collarColor)
            gl.uniform3f(uni.uIris, ic[0], ic[1], ic[2])
            gl.uniform3f(uni.uSclera, sc[0], sc[1], sc[2])
            gl.uniform3f(uni.uMarkCol, mc[0], mc[1], mc[2])
            gl.uniform3f(uni.uCollar, cc[0], cc[1], cc[2])
            gl.uniform2f(uni.uLight, Math.cos(a.lightAngle * DEG), Math.sin(a.lightAngle * DEG))
            gl.uniform1f(uni.uGloss, a.gloss / 100)
            gl.uniform1f(uni.uRed, a.redness / 100)
            gl.uniform1f(uni.uVeins, a.veins / 100)
            gl.uniform1f(uni.uLimbus, a.limbus / 100)
            gl.uniform1f(uni.uFiber, a.fiber / 100)
            gl.uniform1f(uni.uTime, clock % 100)

            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }

        function loop(now: number) {
            if (disposed) return
            raf = requestAnimationFrame(loop)
            if (!onScreen || !pageVisible) {
                lastNow = now
                return
            }
            const dt = lastNow ? Math.min((now - lastNow) / 1000, 0.05) : 0
            lastNow = now
            resize()
            draw(dt)
        }

        if (!init()) {
            setFailed(true)
            return
        }

        const place = (e: PointerEvent) => {
            const r = host.getBoundingClientRect()
            if (r.width <= 0 || r.height <= 0) return

            let mx = r.left + r.width / 2, my = r.top + r.height / 2
            if (PAIR.size > 1) {
                let l = Infinity, t = Infinity, rr = -Infinity, b = -Infinity
                for (const h of PAIR) {
                    const q = h.getBoundingClientRect()
                    l = Math.min(l, q.left); t = Math.min(t, q.top); rr = Math.max(rr, q.right); b = Math.max(b, q.bottom)
                }
                mx = (l + rr) / 2; my = (t + b) / 2
            }
            pointer.u = 0.5 + (e.clientX - mx) / r.width
            pointer.v = 0.5 + (e.clientY - my) / r.height
        }
        const onRootMove = (e: PointerEvent) => {
            place(e)
            pointer.active = true
        }
        const onRootLeave = () => {
            if (propsRef.current.follow === "frame") pointer.active = false
            pointer.down = false
        }
        const onWinMove = (e: PointerEvent) => {
            if (propsRef.current.follow !== "page") return
            place(e)
            pointer.active = true
        }
        const onWinOut = (e: PointerEvent) => {
            if (!e.relatedTarget && propsRef.current.follow === "page") pointer.active = false
        }
        const onDown = (e: PointerEvent) => {
            place(e)
            pointer.active = true
            pointer.down = true
        }
        const onUp = (e: PointerEvent) => {
            pointer.down = false

            if (e.pointerType === "touch") pointer.active = false
        }
        PAIR.add(host)
        host.addEventListener("pointermove", onRootMove)
        host.addEventListener("pointerleave", onRootLeave)
        host.addEventListener("pointerdown", onDown)
        window.addEventListener("pointermove", onWinMove)
        window.addEventListener("pointerout", onWinOut)
        window.addEventListener("pointerup", onUp)
        window.addEventListener("pointercancel", onUp)

        const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => resize()) : null
        if (ro) ro.observe(host)
        const io =
            typeof IntersectionObserver !== "undefined"
                ? new IntersectionObserver((en) => (onScreen = en.some((e) => e.isIntersecting)), {
                      rootMargin: "128px",
                  })
                : null
        if (io) io.observe(host)
        const onVisibility = () => (pageVisible = document.visibilityState !== "hidden")
        document.addEventListener("visibilitychange", onVisibility)
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        reduceMotion = mq.matches
        const onMQ = (e: MediaQueryListEvent) => (reduceMotion = e.matches)
        mq.addEventListener("change", onMQ)

        const onLost = (e: Event) => {
            e.preventDefault()
            cancelAnimationFrame(raf)
        }
        const onRestored = () => {
            if (disposed) return
            lastNow = 0
            if (init()) raf = requestAnimationFrame(loop)
            else setFailed(true)
        }
        canvas.addEventListener("webglcontextlost", onLost)
        canvas.addEventListener("webglcontextrestored", onRestored)

        resize()
        raf = requestAnimationFrame(loop)

        return () => {
            disposed = true
            cancelAnimationFrame(raf)
            host.removeEventListener("pointermove", onRootMove)
            host.removeEventListener("pointerleave", onRootLeave)
            host.removeEventListener("pointerdown", onDown)
            PAIR.delete(host)
            window.removeEventListener("pointermove", onWinMove)
            window.removeEventListener("pointerout", onWinOut)
            window.removeEventListener("pointerup", onUp)
            window.removeEventListener("pointercancel", onUp)
            if (ro) ro.disconnect()
            if (io) io.disconnect()
            document.removeEventListener("visibilitychange", onVisibility)
            mq.removeEventListener("change", onMQ)
            canvas.removeEventListener("webglcontextlost", onLost)
            canvas.removeEventListener("webglcontextrestored", onRestored)
            if (gl) {
                if (buffer) gl.deleteBuffer(buffer)
                if (program) gl.deleteProgram(program)
                const lose = gl.getExtension("WEBGL_lose_context")
                if (lose) lose.loseContext()
            }
        }
    }, [])

    const fallback: CSSProperties = failed
        ? {
              width: FIT * scale + "%",
              aspectRatio: "1",
              maxHeight: FIT * scale + "%",
              margin: "auto",
              borderRadius: "50%",
              background:
                  "radial-gradient(circle at 70% 50%, #000 0 6%, " +
                  irisColor +
                  " 7% 22%, transparent 23%), radial-gradient(circle at 40% 30%, #fff, " +
                  scleraColor +
                  " 45%, #7a2b2b 100%)",
          }
        : { display: "none" }

    return (
        <div
            ref={hostRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                background,
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
                    display: failed ? "none" : "block",
                }}
            />
            <div style={fallback} />
        </div>
    )
}

const A = DEFAULT_ADVANCED