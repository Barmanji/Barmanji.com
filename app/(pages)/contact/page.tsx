"use client";
import {  Mail, ArrowDown, } from "lucide-react";
import { LuGithub as Github, LuLinkedin as Linkedin } from "react-icons/lu";
import { RiTwitterXLine as Twitter } from "react-icons/ri";
import Link from "next/link";
import { Navigation } from "../../../components/nav";
import { Card } from "../../../components/card";
import MessageForm from "@/components/messageForm";
import { useEffect, useRef } from "react";

const socials = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/ajay-barman-0b37011a7/",
    label: "LinkedIn",
    handle: "Ajay Barman",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:barmanjiaj@gmail.com",
    label: "Email",
    handle: "Barmanjiaj@gmail.com",
  },
  {
    icon: <Twitter size={20} />,
    href: "https://x.com/ItsBarmanji",
    label: "Twitter",
    handle: "ItsBarmanji",
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/barmanji",
    label: "Github",
    handle: "Barmanji",
  },
];

export default function Contact() {
  const arrowRef = useRef<SVGSVGElement>(null);

  const scrollToForm = () => {
    document
      .getElementById("message-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
            .bounce {
                animation: bounce 2s infinite;
            }
        `;
    document.head.appendChild(style);

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
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-full flex flex-col">
      <Navigation />
      <div className="flex-grow flex flex-col items-center w-screen pt-24 pb-10 gap-3 md:pr-32 md:pl-32">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl pl-6 md:pl-32 w-screen">
          Social
        </h2>
        <div className="w-full h-px bg-zinc-800 mb-5" />
        <div className="flex items-center flex-col w-screen gap-5 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full md:pl-32 md:pr-32 gap-5 ">
            {/* LinkedIn */}
            <Card>
              <Link
                href={socials[0].href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:pb-8 lg:pb-24 md:p-16 "
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="text-gray-400 relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-sea-green group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-sea-green drop-shadow-orange">
                  {socials[0].icon}
                </span>
                <div className="z-10 flex flex-col items-center">
                  <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-sea-green font-display">
                    {socials[0].handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200 font-kode-mono">
                    {socials[0].label}
                  </span>
                </div>
              </Link>
            </Card>

            {/* GitHub + Twitter Combined */}
            <div className="grid grid-cols-2 gap-5">
              {/* GitHub */}
              <Card>
                <Link
                  href={socials[3].href}
                  target="_blank"
                  className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:pb-8 lg:pb-24 md:p-16"
                >
                  <span
                    className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className=" text-gray-400 relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-sea-green group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-sea-green drop-shadow-orange">
                    {socials[3].icon}
                  </span>
                  <div className="z-10 flex flex-col items-center">
                    <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-sea-green font-display">
                      {socials[3].handle}
                    </span>
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200 font-kode-mono">
                      {socials[3].label}
                    </span>
                  </div>
                </Link>
              </Card>

              {/* Twitter */}
              <Card>
                <Link
                  href={socials[2].href}
                  target="_blank"
                  className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:pb-8 lg:pb-24 md:p-16"
                >
                  <span
                    className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className=" text-gray-400 relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-sea-green group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-sea-green drop-shadow-orange">
                    {socials[2].icon}
                  </span>
                  <div className="z-10 flex flex-col items-center">
                    <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-sea-green font-display">
                      {socials[2].handle}
                    </span>
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200 font-kode-mono">
                      {socials[2].label}
                    </span>
                  </div>
                </Link>
              </Card>
            </div>

            {/* Email */}
            <Card>
              <Link
                href={socials[1].href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:pb-8 lg:pb-24 md:p-16"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="text-gray-400 relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-sea-green group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-sea-green drop-shadow-orange">
                  {socials[1].icon}
                </span>
                <div className="z-10 flex flex-col items-center">
                  <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-sea-green font-display">
                    {socials[1].handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200 font-kode-mono">
                    {socials[1].label}
                  </span>
                </div>
              </Link>
            </Card>
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl pl-6 md:pl-32 w-screen">
          Direct Message
        </h2>
        <div className="w-full h-px bg-zinc-800 mb-5" />
        <div id="message-form" className="w-screen mb-10">
          <MessageForm />
        </div>
      </div>
      <div className="fixed bottom-5 right-5">
        <ArrowDown
          ref={arrowRef}
          size={26}
          className="text-sea-green cursor-pointer bounce"
          onClick={scrollToForm}
        />
      </div>
    </div>
  );
}

