"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import UseAnimations, { type Animation } from "react-useanimations";
import github from "react-useanimations/lib/github";
import linkedin from "react-useanimations/lib/linkedin";
import mail from "react-useanimations/lib/mail";
import twitterX from "react-useanimations/lib/twitterX";
import { Navigation } from "../../../components/nav";
import { Card } from "../../../components/card";
import MessageForm from "@/components/messageForm";

const ACCENT = "#ff174f";

type Social = {
  label: string;
  handle: string;
  href: string;
  animation: Animation;
};

const socials: Social[] = [
  {
    label: "LinkedIn",
    handle: "Ajay Barman",
    href: "https://www.linkedin.com/in/ajay-barman-0b37011a7/",
    animation: linkedin,
  },
  {
    label: "GitHub",
    handle: "Barmanji",
    href: "https://github.com/barmanji",
    animation: github,
  },
  {
    label: "X",
    handle: "ItsBarmanji",
    href: "https://x.com/ItsBarmanji",
    animation: twitterX,
  },
];

export default function Contact() {
  const arrowRef = useRef<HTMLButtonElement>(null);

  const scrollToForm = () => {
    document
      .getElementById("message-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            arrowRef.current?.classList.add("hidden");
          } else {
            arrowRef.current?.classList.remove("hidden");
          }
        });
      },
      {
        threshold: 0.04,
      },
    );

    const messageForm = document.getElementById("message-form");
    if (messageForm) {
      observer.observe(messageForm);
    }

    return () => {
      if (messageForm) {
        observer.unobserve(messageForm);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
      <Navigation />

      <main className="mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-6 sm:pt-28 lg:px-8">
        {/* Intro */}
        <section className="animate-rise">
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-4xl">
            Let&apos;s build something
            <span className="ml-[0.12em]" style={{ color: ACCENT }}>.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-zinc-300">
            Whether it&apos;s a full-time role, a freelance build, or just a
            question about something on this site, my inbox is open. I usually
            reply within a day.
          </p>
        </section>

        {/* Social */}
        <section className="mt-10">
          <div className="flex items-center gap-4">
            <h2 className="shrink-0 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
              Social
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            <span className="shrink-0 font-mono text-[11px] tracking-[0.2em] text-zinc-600">
              01
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {socials.map((social) => (
              <Card key={social.label}>
                <UseAnimations
                  animation={social.animation}
                  size={22}
                  render={(eventProps, animationProps) => (
                    <Link
                      href={social.href}
                      target="_blank"
                      aria-label={`${social.label} — ${social.handle}`}
                      className="group relative flex h-full flex-col gap-5 p-6"
                      {...eventProps}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/60 text-zinc-400 transition-colors duration-500 group-hover:border-[#ff174f]/50 group-hover:text-zinc-100">
                        <span {...animationProps} />
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-medium text-zinc-200 transition-colors duration-500 group-hover:text-white">
                          {social.handle}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-500 group-hover:text-zinc-200">
                          {social.label}
                        </span>
                      </div>
                      <span className="mt-auto flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-500 group-hover:text-[#ff174f]">
                        Visit
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  )}
                />
              </Card>
            ))}
          </div>

          {/* Email banner */}
          <div className="mt-4">
            <Card>
              <UseAnimations
                animation={mail}
                size={22}
                render={(eventProps, animationProps) => (
                  <a
                    href="mailto:barmanjiaj@gmail.com"
                    aria-label="Email barmanjiaj@gmail.com"
                    className="group relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"
                    {...eventProps}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/60 text-zinc-400 transition-colors duration-500 group-hover:border-[#ff174f]/50 group-hover:text-zinc-100">
                        <span {...animationProps} />
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-500 group-hover:text-zinc-200">
                          Email
                        </span>
                        <span className="text-base text-zinc-200 transition-colors duration-500 group-hover:text-white">
                          barmanjiaj@gmail.com
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-zinc-700/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 transition-all duration-500 group-hover:border-[#ff174f]/60 group-hover:bg-[#ff174f]/10 group-hover:text-white sm:self-auto">
                      Write to me
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </a>
                )}
              />
            </Card>
          </div>
        </section>

        {/* Direct message */}
        <section id="message-form" className="mt-12 scroll-mt-28">
          <div className="flex items-center gap-4">
            <h2 className="shrink-0 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
              Direct message
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            <span className="shrink-0 font-mono text-[11px] tracking-[0.2em] text-zinc-600">
              02
            </span>
          </div>

          <div className="mt-6">
            <MessageForm />
          </div>
        </section>
      </main>

      <button
        ref={arrowRef}
        type="button"
        onClick={scrollToForm}
        aria-label="Scroll to the message form"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 animate-bounce items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/70 text-zinc-400 backdrop-blur transition-colors hover:border-[#ff174f]/60 hover:text-zinc-100"
      >
        <ArrowDown size={18} />
      </button>
    </div>
  );
}
