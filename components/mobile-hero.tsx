import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { navItems } from "@/lib/navigation";

const chips = ["Neovim", "Arch BTW", "Claude Code", "Rust", "Next.js"];

export function MobileHero() {
	return (
		<section className="relative flex min-h-[100svh] w-full flex-col overflow-x-hidden bg-[#08080a] px-5 pb-[calc(1.75rem+env(safe-area-inset-bottom))] pt-6 md:hidden">
			{/* Ambient aurora + faint grid */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				<div className="animate-float absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ff174f]/20 blur-[90px]" />
				<div
					className="animate-float absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-[100px]"
					style={{ animationDelay: "-4s" }}
				/>
				<div className="absolute -bottom-24 left-1/2 h-64 w-[130%] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[110px]" />
				<div
					className="absolute inset-0 opacity-[0.05]"
					style={{
						backgroundImage:
							"linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
						backgroundSize: "46px 46px",
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08080a]/30 to-[#08080a]" />
			</div>

			{/* Status bar */}
			<header className="animate-rise relative flex items-center justify-between">
				<span className="flex items-center gap-2">
					<span className="relative flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
						<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
					</span>
					<span className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-400">
						Available for work
					</span>
				</span>
				<span className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-600">
					India · IST
				</span>
			</header>

			<div className="animate-rise relative mt-9 [animation-delay:80ms]">
				<p className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500">
					Software Craftsman
				</p>
				<h1 className="mt-2 font-display text-[clamp(3.75rem,21vw,5.5rem)] leading-[0.86] tracking-tight text-zinc-50">
					Barmanji<span className="text-[#ff174f]">.</span>
				</h1>
				<p className="mt-4 max-w-[21rem] text-[13.5px] leading-6 text-zinc-400">
					Building high-performance end-to-end systems. Currently dating{" "}
					<span className="text-zinc-100">Agentic Systems</span> and{" "}
					<span className="text-zinc-100">Rust</span>.
				</p>
			</div>

			{/* Stack chips */}
			<div className="animate-rise relative mt-5 flex flex-wrap gap-2 [animation-delay:160ms]">
				{chips.map((chip) => (
					<span
						key={chip}
						className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 backdrop-blur-sm"
					>
						{chip}
					</span>
				))}
			</div>

			{/* Terminal card */}
			<div className="animate-rise relative mt-auto [animation-delay:220ms]">
				<div className="rounded-2xl border border-white/[0.06] bg-black/30 p-4 backdrop-blur-sm">
					<div className="flex items-center gap-1.5">
						<span className="h-2 w-2 rounded-full bg-[#ff174f]/70" />
						<span className="h-2 w-2 rounded-full bg-amber-400/60" />
						<span className="h-2 w-2 rounded-full bg-emerald-400/60" />
						<span className="ml-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
							~/workspace
						</span>
					</div>
					<div className="mt-3 space-y-1 font-mono text-[11px] leading-5">
						<p className="text-zinc-400">
							<span className="text-[#ff174f]">$</span>{" "}
							<span className="text-zinc-200">whoami</span>
						</p>
						<p className="text-zinc-500">
							<span className="text-zinc-600">→</span> software craftsman
						</p>
						<p className="text-zinc-400">
							<span className="text-[#ff174f]">$</span>{" "}
							<span className="text-zinc-200">stack</span>
						</p>
						<p className="text-zinc-500">
							<span className="text-zinc-600">→</span> rust · go · python ·
							next.js
						</p>
					</div>
				</div>
			</div>

			{/* Navigation card */}
			<nav
				aria-label="Primary"
				className="animate-rise relative mt-6 [animation-delay:280ms]"
			>
				<div className="mb-2 flex items-center justify-between px-1">
					<span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
						Navigate
					</span>
					<span className="h-px flex-1 mx-3 bg-white/10" />
					<span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
						Tap to open
					</span>
				</div>
				<div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="group flex items-center justify-between border-b border-white/[0.06] px-4 py-3.5 last:border-b-0 active:bg-white/[0.06]"
						>
							<span className="flex items-center gap-3">
								<span className="h-1.5 w-1.5 rounded-full bg-zinc-700 transition-colors duration-300 group-hover:bg-[#ff174f]" />
								<span className="text-[15px] text-zinc-300 transition-colors duration-300 group-hover:text-white">
									{item.name}
								</span>
							</span>
							<ArrowUpRight className="h-4 w-4 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff174f]" />
						</Link>
					))}
				</div>
			</nav>

			{/* Footer */}
			<footer className="animate-rise relative mt-5 flex items-center justify-between [animation-delay:320ms]">
				<span className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-600">
					Barmanji · India
				</span>
				<a
					href="mailto:barmanjiaj@gmail.com"
					className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-400 transition-colors active:text-zinc-100"
				>
					<Mail className="h-3 w-3" /> Say hello
				</a>
			</footer>
		</section>
	);
}
