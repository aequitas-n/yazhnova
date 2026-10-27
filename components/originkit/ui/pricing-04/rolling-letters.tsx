/* eslint-disable */
// @ts-nocheck
"use client"

import React, { useEffect, useRef, useState, useLayoutEffect, useCallback, useMemo } from "react"
import gsap from "gsap"

const startYPercentMap = {
    top: -500,
    bottom: 500,
};

const mapEase = (ease) => {
    if (typeof ease !== "string")
        return "power4.out";
    const easeMap = {
        linear: "none",
        easeIn: "power2.in",
        easeOut: "power4.out",
        easeInOut: "power2.inOut",
        circIn: "circ.in",
        circOut: "circ.out",
        circInOut: "circ.inOut",
        backIn: "back.in",
        backOut: "back.out(1.7)",
        backInOut: "back.inOut",
        anticipate: "back.out(1.7)",
    };
    return easeMap[ease] ?? ease;
};

function SlotMachine({ text = "Rolling Letters", font = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "120px",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    lineHeight: "1.1em",
    textAlign: "left",
}, color = "#ffffff", startFrom = "top", staggerFrom = "start", tag = "h1", transition = {
    type: "tween",
    duration: 0.6,
    delay: 0,
    ease: "easeOut",
    staggerChildren: 0.08,
}, }) {
    const containerRef = useRef(null);
    const playAnimation = useCallback(() => {
        if (!containerRef.current)
            return;
        const chars = containerRef.current.querySelectorAll(".char");
        gsap.killTweensOf(chars);
        gsap.set(chars, {
            clearProps: "transform",
        });
        gsap.from(chars, {
            yPercent: startYPercentMap[startFrom],
            duration: transition.duration ?? 0.6,
            delay: transition.delay ?? 0,
            stagger: {
                each: transition.staggerChildren ?? 0.08,
                from: staggerFrom,
            },
            ease: mapEase(transition.ease),
        });
    }, [startFrom, staggerFrom, transition]);
    useEffect(() => {
        playAnimation();
    }, [text, playAnimation]);
    return React.createElement(tag, {
        ref: containerRef,
        style: {
            margin: 0,
            display: "block",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            color,
            ...font,
        },
    }, text.split("").map((char, index) => (React.createElement("span", { key: index, className: "char", style: {
            display: "inline-block",
        } }, char === " " ? "\u00A0" : char))));
}

export default SlotMachine