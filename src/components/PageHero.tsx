import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import defaultHeroBg from "@/assets/hero/inner-hero-office.jpg";

export interface HeroCardItem {
  tag: string;
  tagVariant?: "green" | "gold";
  icon: LucideIcon;
  title: string;
  date?: string;
  dark?: boolean;
  href?: string;
}

export interface HeroHighlightItem {
  icon: LucideIcon;
  label: string;
}

export interface PageHeroProps {
  badgeIcon?: LucideIcon;
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
    icon?: LucideIcon;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  highlights?: HeroHighlightItem[];
  cards?: HeroCardItem[];
  bgImage?: string;
}

const PageHero = ({
  badgeIcon: BadgeIcon,
  badgeText,
  titlePrefix,
  titleHighlight,
  titleSuffix = "",
  description,
  primaryCta,
  secondaryCta,
  highlights = [],
  cards = [],
  bgImage = defaultHeroBg,
}: PageHeroProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] text-white pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
      {/* Background photography on right with smooth gradient mask */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={bgImage}
          alt=""
          className="h-full w-full object-cover object-center lg:object-right opacity-25 lg:opacity-40 [mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,black_80%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,black_80%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c3f30] via-transparent to-transparent lg:w-1/2" />
      </div>

      {/* Decorative ambient glowing lines matching reference */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 480 C 300 400, 600 580, 1000 320 C 1200 200, 1400 250, 1600 120"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M-50 560 C 400 480, 700 620, 1100 360 C 1300 220, 1450 280, 1650 180"
          stroke="#10B981"
          strokeWidth="1.5"
        />
      </svg>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Core message and CTA */}
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
              <span>{badgeText}</span>
            </div>

            {/* Main Headline with Accent Highlight */}
            <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
              {titlePrefix}{" "}
              <span className="relative inline-block text-accent pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-accent after:via-accent-light after:to-transparent">
                {titleHighlight}
              </span>{" "}
              {titleSuffix}
            </h1>

            {/* Direct, high-impact description (concise corporate copy) */}
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg sm:leading-8">
              {description}
            </p>

            {/* Action Buttons */}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                {primaryCta && (
                  primaryCta.href.startsWith("http") ? (
                    <a
                      href={primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-light hover:scale-105"
                    >
                      {primaryCta.icon && <primaryCta.icon className="h-4 w-4" />}
                      <span>{primaryCta.text}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      to={primaryCta.href}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-light hover:scale-105"
                    >
                      {primaryCta.icon && <primaryCta.icon className="h-4 w-4" />}
                      <span>{primaryCta.text}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )
                )}
                {secondaryCta && (
                  secondaryCta.href.startsWith("http") ? (
                    <a
                      href={secondaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-black/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/15"
                    >
                      <span>{secondaryCta.text}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      to={secondaryCta.href}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-black/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/15"
                    >
                      <span>{secondaryCta.text}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )
                )}
              </div>
            )}

            {/* Bottom 3 Quick Highlights matching reference */}
            {highlights.length > 0 && (
              <div className="relative mt-10 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent" />
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                    <item.icon className="h-4 w-4 shrink-0 text-accent" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: 3 Overlapping Floating Cards Stack */}
          {cards.length > 0 && (
            <div className="flex flex-col space-y-3.5 lg:max-w-md lg:ml-auto w-full">
              {cards.map((card, index) => {
                const CardIcon = card.icon;
                const isDark = Boolean(card.dark);

                const cardContent = (
                  <div
                    className={`group relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      isDark
                        ? "bg-[#093525]/95 border border-emerald-500/30 text-white shadow-corporate backdrop-blur-md"
                        : "bg-white/95 border border-white/60 text-slate-900 shadow-lg backdrop-blur-md"
                    }`}
                  >
                    {/* Top Row: Meta tag with icon */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CardIcon
                          className={`h-4 w-4 ${
                            isDark ? "text-accent" : "text-primary"
                          }`}
                        />
                        <span
                          className={`text-[11px] font-extrabold uppercase tracking-[0.16em] ${
                            isDark ? "text-accent" : "text-primary"
                          }`}
                        >
                          {card.tag}
                        </span>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                          isDark ? "text-white/60" : "text-slate-400"
                        }`}
                      />
                    </div>

                    {/* Card Title */}
                    <h3
                      className={`mt-2.5 text-sm sm:text-base font-bold leading-snug line-clamp-2 ${
                        isDark ? "text-white" : "text-corporate"
                      }`}
                    >
                      {card.title}
                    </h3>

                    {/* Card Date / Subtext */}
                    {card.date && (
                      <p
                        className={`mt-2 text-xs font-medium ${
                          isDark ? "text-white/65" : "text-slate-500"
                        }`}
                      >
                        {card.date}
                      </p>
                    )}
                  </div>
                );

                return card.href ? (
                  <Link key={index} to={card.href} className="block">
                    {cardContent}
                  </Link>
                ) : (
                  <div key={index}>{cardContent}</div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom smooth gradient transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent via-[#093527]/30 to-background" />
    </section>
  );
};

export default PageHero;
