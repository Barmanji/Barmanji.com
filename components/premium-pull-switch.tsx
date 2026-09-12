"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface PremiumPullSwitchProps {
  isOn: boolean;
  onToggle?: (isOn: boolean) => void;
  chainLength?: number;
  chainType?: "dotted" | "plain";
}

export default function PremiumPullSwitch({
  isOn,
  onToggle,
  chainLength = 224,
  chainType = "dotted",
}: PremiumPullSwitchProps) {
  const [yOffset, setYOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Show "Pull me" hint on mount, fade out after 3.5s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 600);
    const hide = setTimeout(() => setShowHint(false), 4100);
    return () => {
      clearTimeout(t);
      clearTimeout(hide);
    };
  }, []);

  const startY = useRef(0);
  const maxPull = 45;
  const clickThreshold = 28;

  const physicsRef = useRef({ y: 0, velY: 0 });

  const updateState = useCallback(
    (nextState: boolean) => {
      if (onToggle) onToggle(nextState);
    },
    [onToggle],
  );

  const isOnRef = useRef(isOn);
  useEffect(() => {
    isOnRef.current = isOn;
  }, [isOn]);

  // Vertical spring-back animation — no angle, pure up/down
  useEffect(() => {
    if (isDragging) return;

    let id: number;
    const p = physicsRef.current;

    const animate = () => {
      const force = -0.45 * p.y;
      p.velY = (p.velY + force) * 0.6;
      p.y += p.velY;

      setYOffset(p.y);

      if (Math.abs(p.y) > 0.05 || Math.abs(p.velY) > 0.05) {
        id = requestAnimationFrame(animate);
      } else {
        p.y = 0;
        p.velY = 0;
        setYOffset(0);
      }
    };

    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [isDragging]);

  const handleStart = useCallback(
    (clientY: number) => {
      setIsDragging(true);
      startY.current = clientY;

      const onMove = (e: MouseEvent) => {
        const deltaY = e.clientY - startY.current;
        if (deltaY > 0) {
          const limitedY = Math.min(maxPull, deltaY);
          physicsRef.current.y = limitedY;
          setYOffset(limitedY);
        }
      };

      const onMoveTouch = (e: TouchEvent) => {
        const deltaY = e.touches[0].clientY - startY.current;
        if (deltaY > 0) {
          const limitedY = Math.min(maxPull, deltaY);
          physicsRef.current.y = limitedY;
          setYOffset(limitedY);
        }
      };

      const onEnd = () => {
        setIsDragging(false);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onEnd);
        window.removeEventListener("touchmove", onMoveTouch);
        window.removeEventListener("touchend", onEnd);

        const p = physicsRef.current;

        if (p.y >= clickThreshold) {
          const nextState = !isOnRef.current;
          updateState(nextState);
          p.velY = -16;
        } else {
          p.velY = -8;
        }
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onMoveTouch);
      window.addEventListener("touchend", onEnd);
    },
    [updateState],
  );

  const handleButtonToggle = useCallback(() => {
    const nextState = !isOnRef.current;
    updateState(nextState);
  }, [updateState]);

  const beadCount = Math.max(5, Math.floor(chainLength / 14));
  const svgWidth = 60;
  const svgHeight = chainLength + maxPull + 60;
  const cx = svgWidth / 2;
  const chainColor = isOn ? "#3a3835" : "#c8c5c0";

  return (
    <>
      {/* Button — visible on small/medium screens only */}
      <button
        onClick={handleButtonToggle}
        aria-label="Toggle theme"
        className="flex items-center justify-center fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl bg-transparent cursor-pointer lg:!hidden"
        style={{
          border: `1.5px solid ${chainColor}`,
          transition: "border-color 300ms",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          {isOn ? (
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill={chainColor}
            />
          ) : (
            <>
              <circle cx="12" cy="12" r="5" fill={chainColor} />
              <line
                x1="12"
                y1="1"
                x2="12"
                y2="3"
                stroke={chainColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="21"
                x2="12"
                y2="23"
                stroke={chainColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4.22"
                y1="4.22"
                x2="5.64"
                y2="5.64"
                stroke={chainColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="18.36"
                y1="18.36"
                x2="19.78"
                y2="19.78"
                stroke={chainColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="1"
                y1="12"
                x2="3"
                y2="12"
                stroke={chainColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="21"
                y1="12"
                x2="23"
                y2="12"
                stroke={chainColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4.22"
                y1="19.78"
                x2="5.64"
                y2="18.36"
                stroke={chainColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="18.36"
                y1="5.64"
                x2="19.78"
                y2="4.22"
                stroke={chainColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </button>

      {/* "Pull me" hint — fades in on mount, fades out after 3.5s */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 24,
          zIndex: 50,
          pointerEvents: "none",
          fontSize: 10,
          letterSpacing: "0.2em",
          fontWeight: 300,
          textTransform: "uppercase",
          color: isOn ? "#c8c5c0" : "#3a3835",
          opacity: showHint ? 0.5 : 0,
          transition: "opacity 600ms ease-in-out",
          transform: showHint ? "translateY(0)" : "translateY(4px)",
        }}
        className="lg:hidden"
      >
        Pull me
      </div>

      <div
        style={{
          position: "absolute",
          top: 455 + chainLength - 6,
          right: 100,
          zIndex: 50,
          pointerEvents: "none",
          fontSize: 12,
          letterSpacing: "0.2em",
          fontWeight: 300,
          textTransform: "uppercase",
          color: isOn ? "#c8c5c0" : "#3a3835",
          opacity: showHint ? 0.5 : 0,
          transition: "opacity 600ms ease-in-out",
          whiteSpace: "nowrap",
        }}
        className="hidden lg:block"
      >
        Pull me
      </div>

      {/* Chain pull — visible on large screens only */}
      <div
        style={{
          position: "absolute",
          top: 440,
          right: 60,
          zIndex: 50,
          cursor: "grab",
        }}
        className="hidden lg:block"
        onMouseDown={(e) => handleStart(e.clientY)}
        onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{
            overflow: "visible",
            willChange: "transform",
          }}
        >
          {/* Ceiling bracket */}
          <rect
            x={cx - 8}
            y={0}
            width={16}
            height={5}
            rx={1}
            fill={chainColor}
          />
          <circle cx={cx} cy={7} r={3} fill={chainColor} />

          {/* Cable line */}
          <line
            x1={cx}
            y1={7}
            x2={cx}
            y2={chainLength + yOffset}
            stroke={chainColor}
            strokeWidth={2}
            strokeDasharray={chainType === "dotted" ? "0 5" : "0"}
            strokeLinecap="round"
          />

          {/* Dotted beads */}
          {chainType === "dotted" &&
            Array.from({ length: beadCount }).map((_, index) => {
              const fraction = (index + 0.5) / beadCount;
              const beadY = 12 + (chainLength + yOffset - 30) * fraction;
              return (
                <circle
                  key={index}
                  cx={cx}
                  cy={beadY}
                  r={3}
                  fill={chainColor}
                />
              );
            })}

          {/* Handle weight */}
          <g transform={`translate(${cx}, ${chainLength + yOffset})`}>
            <circle cx={0} cy={0} r={2} fill={chainColor} />
            <rect
              x={-4}
              y={3}
              width={8}
              height={28}
              rx={2}
              fill={chainColor}
            />
            <line
              x1={-4}
              y1={10}
              x2={4}
              y2={10}
              stroke={isOn ? "#1a1a1a" : "#f0f0f0"}
              strokeWidth={0.8}
              opacity={0.4}
            />
          </g>
        </svg>
      </div>
    </>
  );
}
