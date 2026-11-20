"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/lib/navigation";

// 1-4 map to the nav pages; 0 goes home but never shows a numeric 0.
const shortcuts = [...navItems, { key: "0", name: "Home", href: "/" }];

function isTypingTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName.toLowerCase();
	return (
		tag === "input" ||
		tag === "textarea" ||
		tag === "select" ||
		target.isContentEditable
	);
}

/**
 * Global number navigation:
 *   1-4 -> nav items, 0 -> home.
 * Ignores keystrokes while typing, while a modifier is held, and while a
 * modal dialog is open. Each press pops up a single large MacBook-style
 * keycap showing the page name, which then fades away.
 */
export function NumberShortcuts() {
	const router = useRouter();
	const [pressedKey, setPressedKey] = useState<string | null>(null);
	const resetTimer = useRef<number | null>(null);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.defaultPrevented) return;
			if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
			if (isTypingTarget(event.target)) return;
			if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;

			const item = shortcuts.find((shortcut) => shortcut.key === event.key);
			if (!item) return;

			event.preventDefault();

			setPressedKey(item.key);
			if (resetTimer.current) window.clearTimeout(resetTimer.current);
			resetTimer.current = window.setTimeout(() => setPressedKey(null), 700);

			router.push(item.href);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			if (resetTimer.current) window.clearTimeout(resetTimer.current);
		};
	}, [router]);

	const active = shortcuts.find((shortcut) => shortcut.key === pressedKey);

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-x-0 bottom-8 z-40 hidden justify-center select-none md:flex"
		>
			{/* Fixed-size stage keeps rapid 1->2 presses from shifting layout. */}
			<div className="relative flex h-24 w-56 items-center justify-center">
				<AnimatePresence mode="popLayout" initial={false}>
					{active && (
						<motion.span
							key={active.key}
							initial={{ opacity: 0, y: 16, scale: 0.86 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -12, scale: 0.94 }}
							transition={{ duration: 0.16, ease: "easeOut" }}
							className="absolute inset-0 flex items-center justify-center gap-3 rounded-2xl border border-zinc-700/80 border-b-4 border-b-zinc-950 bg-zinc-800/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_0_rgba(0,0,0,0.55),0_0_30px_rgba(255,23,79,0.18)]"
						>
							<span className="font-kode-mono text-xl uppercase tracking-[0.24em] text-zinc-100">
								{active.name}
							</span>
						</motion.span>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
