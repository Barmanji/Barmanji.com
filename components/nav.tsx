"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export const Navigation: React.FC = () => {
  const pathName = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b  ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800 "
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-6 overflow-x-auto whitespace-nowrap">
            <Link
              href="/projects"
              className={`duration-200 ${pathName === "/projects" ? "text-white" : "text-zinc-400 hover:text-zinc-100"} font-kode-mono`}
            >
              Projects
            </Link>
            <Link
              href="/skills"
              className={`duration-200 ${pathName === "/skills" ? "text-white" : "text-zinc-400 hover:text-zinc-100"} font-kode-mono`}
            >
              Competencies
            </Link>
            <Link
              href="/resume"
              className={`duration-200 ${pathName === "/resume" ? "text-white" : "text-zinc-400 hover:text-zinc-100"} font-kode-mono`}
            >
              Resume
            </Link>
            <Link
              href="/contact"
              className={`duration-200 ${pathName === "/contact" ? "text-white" : "text-zinc-400 hover:text-zinc-100"} font-kode-mono`}
            >
              Contact
            </Link>
          </div>

          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
    </header>
  );
};
