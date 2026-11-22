/**
 * Desktop-only onboarding hint: a hand-drawn arrow that points at the
 * Projects link from the north-west. It draws itself in after the intro
 * slide, then fades away.
 *
 * It plays on every landing on the home page (first load and refresh).
 * Returning visitors skip the 3s slide intro, so the CSS gives them a
 * much shorter delay via `html.barmanji-no-intro`.
 */
export function PressMeArrow() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute bottom-full right-full -mb-2 mr-[-12px] hidden md:block"
		>
			<div className="animate-press-me relative h-[120px] w-[190px] text-zinc-200">
				<span className="absolute left-1 top-0 -rotate-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-300">
					press the number
				</span>
				<svg
					viewBox="0 0 190 120"
					fill="none"
					className="absolute inset-0 h-full w-full overflow-visible"
				>
					<path
						className="press-me-path"
						pathLength={1}
						d="M12 26C32 4 56 10 50 32C44 54 22 58 32 76C42 94 70 92 88 82C106 72 102 52 86 56C70 60 76 78 104 86C126 92 148 100 168 114"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						className="press-me-path"
						pathLength={1}
						d="M146 108C154 110 161 112 168 114C162 106 157 99 151 91"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
}
