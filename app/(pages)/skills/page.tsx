import type { Metadata } from "next";
import { Navigation } from "../../../components/nav";
import { EcosystemGrid } from "@/components/ecosystems/ecosystem-grid";
import { ecosystems } from "@/lib/ecosystems";

export const metadata: Metadata = {
	title: "Skills",
	description:
		"Languages, runtimes, and tools behind the projects: Rust, Go, Python, Next.js, databases, AI agents, infrastructure, and Neovim.",
};

const stats = [
	{ label: "Languages", value: "4+" },
	{ label: "Projects", value: "27" },
	{ label: "Ecosystems", value: String(ecosystems.length) },
	{ label: "Editor", value: "Neovim" },
];

export default function SkillsPage() {
	return (
		<div className="min-h-screen pb-24 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="px-5 pt-24 mx-auto max-w-7xl sm:px-6 sm:pt-28 lg:px-8">
				<div className="max-w-2xl">
					<p className="font-kode-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
						<span className="text-[#ff174f]">{"//"}</span> Core Engineering
						Skills
					</p>
					<h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						The skills behind the work
					</h1>
					<p className="mt-4 text-zinc-400">
						Languages, runtimes, and tools I actually build with. Tap any card
						for the longer version.
					</p>
				</div>

				<div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3"
						>
							<p className="font-kode-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
								{stat.label}
							</p>
							<p className="mt-1 text-lg text-zinc-100">{stat.value}</p>
						</div>
					))}
				</div>

				<div className="mt-10">
					<EcosystemGrid items={ecosystems} />
				</div>
			</div>
		</div>
	);
}
