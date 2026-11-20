import { cn } from "@/lib/utils";

export function Kbd({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<kbd
			className={cn(
				"inline-flex h-5 min-w-5 items-center justify-center rounded border border-zinc-700/80 bg-zinc-900/80 px-1 font-kode-mono text-[10px] leading-none text-zinc-500",
				className,
			)}
		>
			{children}
		</kbd>
	);
}
