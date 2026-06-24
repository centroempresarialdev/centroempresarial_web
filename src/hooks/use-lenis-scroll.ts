import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useLenisScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.18,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.08,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis-smooth");

    return () => {
      const lenisWithOff = lenis as Lenis & { off?: (event: "scroll", callback: typeof updateScrollTrigger) => void };

      lenisWithOff.off?.("scroll", updateScrollTrigger);
      gsap.ticker.remove(tick);
      document.documentElement.classList.remove("lenis-smooth");
      lenis.destroy();
    };
  }, []);
};
