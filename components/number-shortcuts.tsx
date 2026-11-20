"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/lib/navigation";

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
 *   1-4 -> nav items, 0 -> home (no visual hint for 0).
 * Ignores keystrokes while typing, while a modifier is held, and while a
 * modal dialog is open. Pressing a key briefly pops up a single large
 * MacBook-style keycap that fades away.
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

			if (event.key === "0") {
				event.preventDefault();
				router.push("/");
				return;
			}

			const item = navItems.find((navItem) => navItem.key === event.key);
			if (!item) return;

			event.preventDefault();

			setPressedKey(item.key);
			if (resetTimer.current) window.clearTimeout(resetTimer.current);
			resetTimer.current = window.setTimeout(() => setPressedKey(null), 650);

			router.push(item.href);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			if (resetTimer.current) window.clearTimeout(resetTimer.current);
		};
	}, [router]);

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-x-0 bottom-8 z-40 hidden justify-center select-none md:flex"
		>
			<AnimatePresence>
				{pressedKey && (
					<motion.span
						key={pressedKey}
						initial={{ opacity: 0, y: 18, scale: 0.8 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -14, scale: 0.92 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className="flex h-20 w-20 items-center justify-center rounded-xl border border-zinc-700/80 border-b-4 border-b-zinc-950 bg-zinc-800/95 font-kode-mono text-4xl text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_0_rgba(0,0,0,0.55),0_0_30px_rgba(255,23,79,0.18)]"
					>
						{pressedKey}
					</motion.span>
				)}
			</AnimatePresence>
		</div>
	);
}
