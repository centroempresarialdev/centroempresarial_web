import { useEffect } from "react";
import Lenis from "lenis";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useLenisScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1,
    });

    let animationFrame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);
    document.documentElement.classList.add("lenis-smooth");

    return () => {
      cancelAnimationFrame(animationFrame);
      document.documentElement.classList.remove("lenis-smooth");
      lenis.destroy();
    };
  }, []);
};
