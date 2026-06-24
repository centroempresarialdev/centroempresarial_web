import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offsets = {
  up: { x: 0, y: 42 },
  left: { x: -42, y: 0 },
  right: { x: 42, y: 0 },
  none: { x: 0, y: 0 },
};

export const useGsapScroll = (routeKey: string) => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set("main, main > section, [data-scroll-reveal], [data-gsap-stagger] > *, [data-gsap-image], [data-gsap-card]", {
        autoAlpha: 1,
        clearProps: "transform",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set("[data-scroll-progress]", { scaleX: 0 });

      gsap.fromTo(
        "main",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
        },
      );

      gsap.to("[data-scroll-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      gsap.utils.toArray<HTMLElement>("main > section").forEach((section, index) => {
        gsap.fromTo(
          section,
          {
            autoAlpha: index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 26,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: index === 0 ? "top 92%" : "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((element) => {
        const direction = (element.dataset.revealDirection || "up") as keyof typeof offsets;
        const delay = Number(element.dataset.revealDelay || 0);

        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            ...offsets[direction],
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.95,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-stagger]").forEach((container) => {
        const children = gsap.utils.toArray<HTMLElement>(":scope > *", container);
        if (!children.length) return;

        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 26, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: "power4.out",
            stagger: 0.075,
            scrollTrigger: {
              trigger: container,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 22, scale: 0.975 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-image]").forEach((image) => {
        gsap.fromTo(
          image,
          {
            autoAlpha: 0,
            scale: 1.08,
            clipPath: "inset(7% 7% 7% 7% round 8px)",
          },
          {
            autoAlpha: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 8px)",
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-parallax]").forEach((image) => {
        gsap.to(image, {
          yPercent: 8,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement || image,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [routeKey]);
};
