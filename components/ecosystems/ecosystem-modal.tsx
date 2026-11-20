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
			className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
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
				className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:rounded-2xl sm:p-8"
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

				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="font-kode-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
							<span style={{ color: item.accent }}>[{item.index}]</span>{" "}
							{item.label}
						</p>
						<h2
							id="ecosystem-title"
							className="mt-2 font-display text-2xl text-zinc-100 sm:text-3xl"
						>
							{item.title}
						</h2>
					</div>
					<button
						ref={closeRef}
						type="button"
						onClick={onClose}
						aria-label="Close details"
						className="rounded-full border border-zinc-700 p-2 text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff174f]/60"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				<div className="mt-4 flex items-center gap-2">
					<span className="rounded-full border border-zinc-700/70 px-2 py-0.5 font-kode-mono text-[9px] uppercase tracking-wider text-zinc-400">
						{item.status}
					</span>
					<span
						className="h-1.5 w-1.5 rounded-full"
						style={{ backgroundColor: item.accent }}
						aria-hidden="true"
					/>
				</div>

				<p className="mt-5 text-sm leading-7 text-zinc-400">
					{item.description}
				</p>

				<div className="mt-6 grid gap-4 sm:grid-cols-2">
					{item.groups.map((group) => (
						<div key={group.label}>
							<p className="font-kode-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
								{group.label}
							</p>
							<div className="mt-2 flex flex-wrap gap-1.5">
								{group.items.map((tag) => (
									<span
										key={tag}
										className="rounded border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 font-kode-mono text-[10px] text-zinc-400"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					))}
				</div>

				{item.proof.length > 0 && (
					<div className="mt-6 border-t border-white/10 pt-4">
						<p className="font-kode-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
							Proof of craft
						</p>
						<div className="mt-2 flex flex-wrap gap-3">
							{item.proof.map((project) => (
								<Link
									key={project.slug}
									href={`/projects/${project.slug}`}
									className="inline-flex items-center gap-1 text-sm text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline"
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
