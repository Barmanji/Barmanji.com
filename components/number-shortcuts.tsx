"use client";

import { useEffect } from "react";
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
 * Global 1-4 navigation. Ignores keystrokes while typing, while a modifier is
 * held, and while a modal dialog is open.
 */
export function NumberShortcuts() {
	const router = useRouter();

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.defaultPrevented) return;
			if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
			if (isTypingTarget(event.target)) return;
			if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;

			const item = navItems.find((navItem) => navItem.key === event.key);
			if (!item) return;

			event.preventDefault();
			router.push(item.href);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [router]);

	return null;
}
