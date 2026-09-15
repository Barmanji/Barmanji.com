"use client";

import React from "react";
import { motion } from "framer-motion";

export interface GridItem {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
}

interface StaggeredGridProps {
  items: GridItem[];
  className?: string;
  staggerDelay?: number;
}

export function StaggeredGrid({
  items,
  className = "",
  staggerDelay = 0.08,
}: StaggeredGridProps) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className}`}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80 hover:border-zinc-600 transition-all duration-300 cursor-default"
        >
          <div className="text-zinc-400 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
            {item.icon}
          </div>
          <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-300 text-center">
            {item.title}
          </span>
          {item.subtitle && (
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
              {item.subtitle}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
