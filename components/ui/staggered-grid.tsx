"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";
import { cn } from "@/lib/utils";
import { FlipFadeText } from "@/components/ui/flip-fade-text";

gsap.registerPlugin(ScrollTrigger);

export interface BentoItem {
  id: number | string;
  title: string;
  expandedTitle?: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  content?: React.ReactNode;
  image?: string;
}

export interface StaggeredGridProps {
  images: string[];
  bentoItems: BentoItem[];
  centerText?: string | string[];
  className?: string;
  scroller?: string | Element | Window | null;
}

export function StaggeredGrid({
  images,
  bentoItems,
  centerText = "Halcyon",
  className,
  scroller,
}: StaggeredGridProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const gridFullRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [activeBento, setActiveBento] = useState<number>(0);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ willChange: "transform" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    const handleLoad = () => {
      document.body.classList.remove("loading");
      setIsLoaded(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _imgLoad = imagesLoaded(
      document.querySelectorAll(".grid__item-img"),
      { background: true },
      handleLoad,
    );

    return () => {
      // Cleanup
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".char");
      gsap
        .timeline({
          scrollTrigger: {
            trigger: textRef.current,
            scroller: scroller || undefined,
            start: "top bottom",
            end: "center center-=25%",
            scrub: 1,
          },
        })
        .from(chars, {
          ease: "sine.out",
          yPercent: 300,
          autoAlpha: 0,
          stagger: {
            each: 0.05,
            from: "center",
          },
        });
    }

    if (gridFullRef.current) {
      const gridFullItems = gridFullRef.current.querySelectorAll(".grid__item");
      const numColumns = getComputedStyle(gridFullRef.current)
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
      const middleColumnIndex = Math.floor(numColumns / 2);

      const columns: Element[][] = Array.from({ length: numColumns }, () => []);
      gridFullItems.forEach((item: Element) => {
        const colAttr = item.getAttribute("data-col");
        const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
        if (columns[columnIndex]) {
          columns[columnIndex].push(item);
        }
      });

      columns.forEach((columnItems, columnIndex) => {
        const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: gridFullRef.current,
              scroller: scroller || undefined,
              start: "top bottom",
              end: "center center",
              scrub: 1.5,
            },
          })
          .from(columnItems, {
            yPercent: 450,
            autoAlpha: 0,
            delay: delayFactor,
            ease: "sine.out",
          })
          .from(
            columnItems.map((item) => item.querySelector(".grid__item-img")),
            {
              transformOrigin: "50% 0%",
              ease: "sine.out",
            },
            0,
          );
      });

      const bentoContainer =
        gridFullRef.current.querySelector(".bento-container");

      if (bentoContainer) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridFullRef.current,
            scroller: scroller || undefined,
            start: "top top+=15%",
            end: "bottom center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          bentoContainer,
          {
            y: window.innerHeight * 0.1,
            scale: 1.5,
            zIndex: 1000,
            ease: "power2.out",
            duration: 1,
            force3D: true,
          },
          0,
        );
      }
    }
  }, [isLoaded, scroller]);

  const mixedGridItems: (string | "BENTO_GROUP")[] = Array.from(
    { length: 21 },
    (_, i) => images[i % images.length],
  );
  mixedGridItems[16] = "BENTO_GROUP";

  return (
    <div
      className={cn("shadow relative overflow-hidden w-full", className)}
      style={
        {
          "--grid-item-translate": "0px",
        } as React.CSSProperties
      }
    >
      <section className="grid place-items-center w-full relative mt-[10vh]">
        <div
          ref={textRef}
          className="text font-display uppercase flex flex-col items-center content-center gap-6 text-[clamp(2.25rem,10vw,10rem)] leading-[0.7] text-neutral-900 dark:text-white"
        >
          {Array.isArray(centerText)
            ? centerText.map((line, li) => (
                <div key={li}>{splitText(line)}</div>
              ))
            : splitText(centerText)}
          <div className="mt-8 opacity-60 flex flex-col items-center gap-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce text-zinc-500"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.3em] animate-pulse">
              scroll down
            </span>
          </div>
        </div>
      </section>
      <section className="grid place-items-center w-full relative">
        <div
          ref={gridFullRef}
          className="grid--full relative w-full mt-[10vh] h-auto aspect-[1.1] max-w-none p-2 sm:p-4 grid gap-2 sm:gap-4 grid-cols-7 grid-rows-5"
        >
          <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 dark:bg-black/80 rounded-lg transition-opacity duration-500" />
          {mixedGridItems.map((item, i) => {
            if (item === "BENTO_GROUP") {
              if (!bentoItems || bentoItems.length === 0) return null;

              return (
                <div
                  key="bento-group"
                  data-col={2}
                  className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-1 sm:gap-2 h-full w-full will-change-transform"
                >
                  {bentoItems.map((bentoItem, index) => {
                    const isActive = activeBento === index;
                    return (
                      <div
                        key={bentoItem.id}
                        className={cn(
                          "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                          isActive
                            ? "bg-zinc-900/10 shadow-2xl"
                            : "bg-zinc-950",
                        )}
                        style={{
                          width: isActive ? "60%" : "20%",
                          backgroundImage:
                            isActive && bentoItem.gradientFrom
                              ? `linear-gradient(135deg, ${bentoItem.gradientFrom}22, ${bentoItem.gradientTo || bentoItem.gradientFrom}11, transparent)`
                              : undefined,
                        }}
                        onMouseEnter={() => setActiveBento(index)}
                        onClick={() => setActiveBento(index)}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                            isActive
                              ? "border-zinc-500/50"
                              : "border-zinc-800/50 group-hover:border-zinc-700",
                          )}
                        />

                        <div className="relative z-10 w-full h-full flex flex-col p-0">
                          <div
                            className={cn(
                              "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                              isActive
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4 pointer-events-none",
                            )}
                          >
                            <div className="absolute inset-0 bg-zinc-900 overflow-hidden z-0">
                              {bentoItem.gradientFrom && (
                                <div
                                  className="absolute inset-0 z-[1]"
                                  style={{
                                    background: `linear-gradient(135deg, ${bentoItem.gradientFrom}33, ${bentoItem.gradientTo || bentoItem.gradientFrom}22, transparent)`,
                                  }}
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 z-0" />
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 flex items-center justify-center px-3 sm:px-5 z-20">
                              <div className="flex flex-col relative z-10 items-center">
                                <h3 className="text-[11px] sm:text-sm font-bold text-white drop-shadow-md leading-none tracking-tight text-center">
                                  {bentoItem.expandedTitle || bentoItem.title}
                                </h3>
                              </div>
                              <div
                                className="transition-colors drop-shadow-md relative z-10 sm:ml-auto [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-6 sm:[&>svg]:h-6"
                                style={{
                                  color: bentoItem.gradientFrom
                                    ? bentoItem.gradientFrom
                                    : undefined,
                                }}
                              >
                                {isActive && bentoItem.activeIcon
                                  ? bentoItem.activeIcon
                                  : bentoItem.icon}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={cn(
                            "absolute inset-0 flex flex-col items-center justify-center gap-1 sm:gap-2 transition-all duration-500",
                            isActive
                              ? "opacity-0 scale-90 pointer-events-none"
                              : "opacity-100 scale-100",
                          )}
                        >
                          <div className="text-white/50 group-hover:text-white transition-colors grayscale flex justify-center items-center [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                            {bentoItem.icon}
                          </div>
                          <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-wider text-center truncate max-w-full">
                            {bentoItem.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }

            if (i === 17 || i === 18) return null;

            if (typeof item === "string") {
              const skillNames = [
                "TypeScript",
                "JavaScript",
                "React",
                "Next.js",
                "Node.js",
                "Express",
                "Tailwind",
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "Kafka",
                "Bun",
                "Docker",
                "tRPC",
                "OpenAI",
                "AWS",
                "GraphQL",
                "Drizzle",
                "HTML",
                "Supabase",
                "Git",
                "Jest",
                "Cypress",
                "Prisma",
                "Socket.io",
                "Firebase",
              ];
              const label = skillNames[i % skillNames.length];

              return (
                <figure
                  key={`img-${i}`}
                  data-col={i % 7}
                  className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer"
                >
                  <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center gap-2 transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-transparent">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item}
                      alt={label}
                      className="relative z-10 w-9 h-9 sm:w-12 sm:h-12 object-contain transition-all duration-300 group-hover:scale-110 grayscale"
                    />
                    <div className="relative z-10 text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      <span className="block text-[10px] font-medium text-white/90 uppercase tracking-wider mb-0.5">
                        Built with
                      </span>
                      <span className="block text-sm font-bold text-white tracking-tight">
                        {label}
                      </span>
                    </div>
                  </div>
                </figure>
              );
            }
            return null;
          })}
        </div>
          <FlipFadeText
            words={[
              "Current Vibe",
              "Building in",
              "Playing with",
              "Cooking in",
            ]}
            interval={4500}
            className=" font-bold"
          />

      </section>
    </div>
  );
}

export default StaggeredGrid;
