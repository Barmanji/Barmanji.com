import type { Metadata } from "next";
import { Navigation } from "../../../components/nav";
import { EcosystemGrid } from "@/components/ecosystems/ecosystem-grid";
import { ecosystems } from "@/lib/ecosystems";

export const metadata: Metadata = {
	title: "Stack",
	description:
		"Languages, runtimes, and tools behind the projects: Rust, Go, Python, Next.js, databases, AI agents, infrastructure, and Neovim.",
};

const stats = [
	{ label: "Languages", value: "4+" },
	{ label: "Projects", value: "27" },
	{ label: "Ecosystems", value: String(ecosystems.length) },
	{ label: "Editor", value: "Neovim" },
];

export default function StackPage() {
	return (
		<div className="min-h-screen pb-24 bg-zinc-950 bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
			<Navigation />
			<div className="px-5 pt-24 mx-auto max-w-7xl sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
				<div className="max-w-2xl">
					<h1 className="font-display text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						The stack behind the work
						<span className="ml-[0.12em]" style={{ color: "#ff174f" }}>.</span>
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
							className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-4 py-3 backdrop-blur-sm transition-colors duration-500 hover:border-zinc-700"
						>
							<span
								className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-zinc-600/60 to-transparent"
								aria-hidden="true"
							/>
							<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
								{stat.label}
							</p>
							<p className="mt-1 font-display text-lg text-zinc-100">
								{stat.value}
							</p>
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
