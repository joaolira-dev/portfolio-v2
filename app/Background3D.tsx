"use client";

import { useEffect, useRef } from "react";

export default function Background3D() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const cursor = cursorRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let frame = 0;
    let targetX = window.innerWidth * 0.68;
    let targetY = window.innerHeight * 0.32;
    let currentX = targetX;
    let currentY = targetY;

    const draw = () => {
      frame = 0;
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      backdrop?.style.setProperty("--pointer-x", `${currentX}px`);
      backdrop?.style.setProperty("--pointer-y", `${currentY}px`);
      if (Math.abs(targetX - currentX) > 0.15 || Math.abs(targetY - currentY) > 0.15) frame = window.requestAnimationFrame(draw);
    };

    const requestDraw = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      requestDraw();

      if (!finePointer || reducedMotion || !cursor) return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add("is-visible");
      const target = event.target instanceof Element ? event.target : null;
      const overControl = Boolean(target?.closest("input, textarea, select, [contenteditable='true']"));
      const overInteractive = Boolean(target?.closest("a, button, [role='button']"));
      cursor.classList.toggle("is-over-control", overControl);
      cursor.classList.toggle("is-interactive", overInteractive && !overControl);
    };

    const onScroll = () => {
      if (!backdrop || reducedMotion) return;
      backdrop.style.setProperty("--scroll-shift", `${Math.min(160, window.scrollY * 0.035)}px`);
    };
    const onPointerLeave = () => cursor?.classList.remove("is-visible");
    const onPointerDown = () => cursor?.classList.add("is-pressed");
    const onPointerUp = () => cursor?.classList.remove("is-pressed");

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer && !reducedMotion) {
      document.body.classList.add("custom-cursor-ready");
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointerup", onPointerUp, { passive: true });
    }
    requestDraw();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.classList.remove("custom-cursor-ready");
    };
  }, []);

  return (
    <>
      <div ref={backdropRef} className="cinematic-backdrop" aria-hidden="true"><i /><i /><i /></div>
      <div ref={cursorRef} className="space-cursor cinematic-cursor" aria-hidden="true"><span /></div>
    </>
  );
}
