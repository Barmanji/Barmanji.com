export function TechStack({ items }: { items?: string[] }) {
	if (!items?.length) return null;

	return (
		<div className="mt-4 border-t border-white/10 pt-3">
			<p
				className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] leading-6 text-zinc-400 duration-1000 group-hover:text-zinc-200"
				aria-label="Tech stack"
			>
				{items.map((tech, i) => (
					<span key={tech} className="inline-flex items-center gap-x-2">
						{i > 0 && (
							<span style={{ color: "#ff174f" }} aria-hidden="true">
								•
							</span>
						)}
						{tech}
					</span>
				))}
			</p>
		</div>
	);
}
