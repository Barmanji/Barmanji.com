import { ArrowUpRight } from "lucide-react";
import type { Ecosystem } from "@/lib/ecosystems";

export function EcosystemCard({
	item,
	onOpen,
}: {
	item: Ecosystem;
	onOpen: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onOpen}
			aria-haspopup="dialog"
			className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 text-left transition-colors duration-300 hover:border-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff174f]/60 sm:p-6"
		>
			<span
				className="absolute inset-x-0 top-0 h-px"
				style={{
					background: `linear-gradient(90deg, ${item.accent}, transparent)`,
				}}
				aria-hidden="true"
			/>

			<div className="flex items-center justify-between gap-3">
				<span className="font-kode-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[11px]">
					<span style={{ color: item.accent }}>[{item.index}]</span>{" "}
					{item.label}
				</span>
				<span className="shrink-0 rounded-full border border-zinc-700/70 px-2 py-0.5 font-kode-mono text-[9px] uppercase tracking-wider text-zinc-400 sm:px-2.5 sm:py-1 sm:text-[10px]">
					{item.status}
				</span>
			</div>

			<h3 className="mt-4 font-display text-xl text-zinc-100 transition-colors group-hover:text-white">
				{item.title}
			</h3>
			<p className="mt-2 text-sm leading-6 text-zinc-400 sm:text-[15px] sm:leading-7">
				{item.summary}
			</p>

			<div className="mt-4 flex flex-wrap gap-1.5">
				{item.groups
					.flatMap((group) => group.items)
					.slice(0, 5)
					.map((tag) => (
						<span
							key={tag}
							className="rounded border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 font-kode-mono text-[10px] text-zinc-500 sm:text-[11px]"
						>
							{tag}
						</span>
					))}
			</div>

			<span className="mt-6 inline-flex items-center gap-1 font-kode-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 transition-colors group-hover:text-zinc-200 sm:text-[11px]">
				Open details <ArrowUpRight className="h-3.5 w-3.5" />
			</span>
		</button>
	);
}
