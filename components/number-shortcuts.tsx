"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
 * modal dialog is open. Renders a small MacBook-style key HUD on desktop.
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
			resetTimer.current = window.setTimeout(() => setPressedKey(null), 220);

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
			className="pointer-events-none fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 select-none items-end gap-2 md:flex"
		>
			{navItems.map((item) => {
				const pressed = pressedKey === item.key;
				return (
					<span
						key={item.key}
						className={`flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700/80 border-b-[3px] border-b-zinc-950 bg-zinc-800/90 font-kode-mono text-xs text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_3px_0_rgba(0,0,0,0.55)] transition-all duration-100 ease-out ${
							pressed
								? "translate-y-[2px] scale-[0.96] border-[#ff174f]/60 border-b bg-zinc-700 text-white shadow-[0_0_18px_rgba(255,23,79,0.35)]"
								: ""
						}`}
					>
						{item.key}
					</span>
				);
			})}
		</div>
	);
}
