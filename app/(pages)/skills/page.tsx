"use client";

import React from "react";
import { Navigation } from "../../../components/nav";
import { StaggeredGrid, BentoItem } from "@/components/ui/staggered-grid";
import {
  SiDocker,
  SiNeovim,
  SiTanstack,
  SiRust,
  SiClaude,
  SiAnthropic,
} from "react-icons/si";

const skillImages = [
  "https://skillicons.dev/icons?i=ts",
  "https://skillicons.dev/icons?i=js",
  "https://skillicons.dev/icons?i=react",
  "https://skillicons.dev/icons?i=nextjs",
  "https://skillicons.dev/icons?i=nodejs",
  "https://skillicons.dev/icons?i=express",
  "https://skillicons.dev/icons?i=tailwind",
  "https://skillicons.dev/icons?i=postgresql",
  "https://skillicons.dev/icons?i=mongodb",
  "https://skillicons.dev/icons?i=redis",
  "https://skillicons.dev/icons?i=kafka",
  "https://skillicons.dev/icons?i=bun",
  "https://skillicons.dev/icons?i=docker",
  "https://skill-icons-v2.vercel.app/api/icons?i=trpc",
  "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/openai/default.svg",
  "https://skillicons.dev/icons?i=aws",
  "https://skillicons.dev/icons?i=graphql",
  "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/drizzle-orm/default.svg",
  "https://skillicons.dev/icons?i=html",
  "https://skillicons.dev/icons?i=supabase",
  "https://skillicons.dev/icons?i=git",
  "https://skillicons.dev/icons?i=jest",
  "https://skillicons.dev/icons?i=cypress",
  "https://skillicons.dev/icons?i=prisma",
  "https://skillicons.dev/icons?i=socketio",
  "https://skillicons.dev/icons?i=firebase",
];

const bentoItems: BentoItem[] = [
  {
    id: 1,
    title: "Rust",
    subtitle: "Systems",
    description: "Systems language",
    icon: <SiRust size={24} />,
    gradientFrom: "#dea584",
    gradientTo: "#78350f",
  },
  {
    id: 2,
    title: "TanStack",
    expandedTitle: "TanStack Query",
    subtitle: "Data Fetching",
    description: "Server state management",
    icon: <SiTanstack size={24} />,
    gradientFrom: "#ef4444",
    gradientTo: "#991b1b",
  },
  {
    id: 3,
    title: "Neovim",
    subtitle: "Editor",
    description: "Terminal editor",
    icon: <SiNeovim size={24} />,
    gradientFrom: "#57a143",
    gradientTo: "#14532d",
  },
  {
    id: 4,
    title: "Claude",
    subtitle: "AI",
    description: "AI assistant",
    icon: <SiClaude size={24} />,
    gradientFrom: "#d97757",
    gradientTo: "#78350f",
  },
  {
    id: 5,
    title: "Agent Kit",
    subtitle: "AI Agents",
    description: "Agent framework",
    icon: <SiAnthropic size={24} />,
    gradientFrom: "#8b5cf6",
    gradientTo: "#4c1d95",
  },
  {
    id: 6,
    title: "Docker",
    subtitle: "DevOps",
    description: "Containers",
    icon: <SiDocker size={24} />,
    gradientFrom: "#2496ED",
    gradientTo: "#0c4a6e",
  },
];

export default function SkillsPage() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow w-screen pt-20">
        <StaggeredGrid
          images={skillImages}
          bentoItems={bentoItems}
          centerText={["Experienced", "in"]}
        />
      </div>
    </div>
  );
}
