"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Kbd } from "@/components/ui/kbd";
import { navItems } from "@/lib/navigation";

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
          <div className="flex justify-between gap-4 overflow-x-auto whitespace-nowrap md:gap-6">
            {navItems.map((item) => {
              const active = pathName === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-keyshortcuts={item.key}
                  className={`${item.mobileHidden ? "hidden md:flex" : "flex"} flex-col items-center gap-1 duration-200 ${active ? "text-white" : "text-zinc-400 hover:text-zinc-100"} font-kode-mono`}
                >
                  <span>{item.name}</span>
                  <Kbd className={active ? "border-zinc-500 text-zinc-300" : ""}>
                    [{item.key}]
                  </Kbd>
                </Link>
              );
            })}
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
