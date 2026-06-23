import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

const ScrollReveal = ({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) => {
  return (
    <div className={className} data-scroll-reveal data-reveal-delay={delay} data-reveal-direction={direction}>
      {children}
    </div>
  );
};

export default ScrollReveal;
