"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Ecosystem } from "@/lib/ecosystems";

export function EcosystemModal({
	item,
	onClose,
}: {
	item: Ecosystem | null;
	onClose: () => void;
}) {
	const panelRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!item) return;

		const previous = document.activeElement as HTMLElement | null;
		document.body.style.overflow = "hidden";
		closeRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
				return;
			}

			if (event.key !== "Tab" || !panelRef.current) return;

			const focusable = panelRef.current.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
			);
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "";
			previous?.focus?.();
		};
	}, [item, onClose]);

	if (!item) return null;

	return (
		<motion.div
			className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			onClick={onClose}
			role="presentation"
		>
			<motion.div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby="ecosystem-title"
				className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl sm:rounded-2xl sm:p-10"
				initial={{ opacity: 0, y: 24, scale: 0.98 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
				onClick={(event) => event.stopPropagation()}
			>
				<span
					className="absolute inset-x-0 top-0 h-px"
					style={{
						background: `linear-gradient(90deg, ${item.accent}, transparent)`,
					}}
					aria-hidden="true"
				/>

				<div className="sticky top-0 z-10 -mx-5 -mt-5 mb-2 flex items-start justify-between gap-4 border-b border-zinc-800/70 bg-zinc-950/95 px-5 py-4 backdrop-blur sm:static sm:m-0 sm:mb-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
					<div>
						<p className="font-kode-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
							<span style={{ color: item.accent }}>[{item.index}]</span>{" "}
							{item.label}
						</p>
						<h2
							id="ecosystem-title"
							className="mt-2 font-display text-2xl text-zinc-100 sm:text-4xl"
						>
							{item.title}
						</h2>
					</div>
					<button
						ref={closeRef}
						type="button"
						onClick={onClose}
						aria-label="Close details"
						className="rounded-full border border-zinc-700 p-2.5 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff174f]/60"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="mt-4 flex items-center gap-2">
					<span className="rounded-full border border-zinc-700/70 px-2.5 py-1 font-kode-mono text-[10px] uppercase tracking-wider text-zinc-400">
						{item.status}
					</span>
					<span
						className="h-1.5 w-1.5 rounded-full"
						style={{ backgroundColor: item.accent }}
						aria-hidden="true"
					/>
				</div>

				<p className="mt-6 text-[15px] leading-8 text-zinc-400 sm:text-base">
					{item.description}
				</p>

				<div className="mt-8 grid gap-6 sm:grid-cols-2">
					{item.groups.map((group) => (
						<div key={group.label}>
							<p className="font-kode-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
								{group.label}
							</p>
							<div className="mt-2.5 flex flex-wrap gap-1.5">
								{group.items.map((tag) => (
									<span
										key={tag}
										className="rounded border border-zinc-800 bg-zinc-900/60 px-2 py-1 font-kode-mono text-[11px] text-zinc-400 sm:text-xs"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					))}
				</div>

				{item.proof.length > 0 && (
					<div className="mt-8 border-t border-white/10 pt-5">
						<p className="font-kode-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
							Proof of craft
						</p>
						<div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
							{item.proof.map((project) => (
								<Link
									key={project.slug}
									href={`/projects/${project.slug}`}
									className="inline-flex items-center gap-1 text-[15px] text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline sm:text-base"
								>
									{project.title}
									<ArrowUpRight className="h-3.5 w-3.5" />
								</Link>
							))}
						</div>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
