"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroLightSpot() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    // Hero section의 실제 DOM을 부모로 올라가서 찾음
    const heroSection = section.closest("section#hero") as HTMLElement | null;
    const target = heroSection ?? section;

    gsap.set(spot, { "--x": "50%", "--y": "50%" });

    const xTo = gsap.quickTo(spot, "--x", { duration: 0.7, ease: "power2.out" });
    const yTo = gsap.quickTo(spot, "--y", { duration: 0.7, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      xTo(`${xPct}%`);
      yTo(`${yPct}%`);
    };

    const handleMouseLeave = () => {
      xTo("50%");
      yTo("50%");
    };

    target.addEventListener("mousemove", handleMouseMove);
    target.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="pointer-events-none absolute inset-0 z-[1]">
      <div
        ref={spotRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 32%, transparent 58%)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
