// src/components/CursorGlow.jsx
import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      rafId = requestAnimationFrame(animate);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onHoverChange = (e) => {
      const target = e.target;
      const isInteractive = target.closest("button, a, [data-cursor-hover], input, textarea, select, label");
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousemove", onHoverChange);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", onHoverChange);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99999,
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          background: isHovering ? "#e8c44a" : "#ffffff",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s, background 0.2s, opacity 0.2s",
          opacity: isVisible ? (isClicking ? 0.6 : 1) : 0,
          mixBlendMode: "difference",
        }}
      />
      {/* Outer glow ring */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99998,
          width: isHovering ? "50px" : "36px",
          height: isHovering ? "50px" : "36px",
          border: `1.5px solid ${isHovering ? "rgba(232,196,74,0.7)" : "rgba(255,255,255,0.25)"}`,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, opacity 0.2s",
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering ? "0 0 16px rgba(232,196,74,0.3)" : "none",
        }}
      />
      {/* Ambient glow blob */}
      <div
        ref={undefined}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99997,
          width: "120px",
          height: "120px",
          background: "radial-gradient(circle, rgba(232,196,74,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
          left: glowRef.current ? glowRef.current.style.left : 0,
          top: glowRef.current ? glowRef.current.style.top : 0,
        }}
      />
    </>
  );
}
