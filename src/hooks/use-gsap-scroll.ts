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
      gsap.set("[data-scroll-reveal], [data-gsap-stagger] > *, [data-gsap-image]", {
        autoAlpha: 1,
        clearProps: "transform",
      });
      return;
    }

    const ctx = gsap.context(() => {
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
            duration: 0.85,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
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
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: container,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-image]").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
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
          yPercent: 10,
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
