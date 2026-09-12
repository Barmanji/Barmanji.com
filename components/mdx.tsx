"use client";
// @ts-nocheck
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Check, Copy } from "lucide-react";

function clsx(...args: any) {
	return args.filter(Boolean).join(" ");
}
const components = {
	h1: ({ className, ...props }: any) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: any) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-zinc-300 dark:border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: any) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: any) => (
		<h4
			className={clsx(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: any) => (
		<h5
			className={clsx(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: any) => (
		<h6
			className={clsx(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }: any) => (
		<Link
			className={clsx(
				"font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-4",
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }: any) => (
		<p
			className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: any) => (
		<ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }:any) => (
		<ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
	),
	li: ({ className, ...props }: any) => (
		<li className={clsx("mt-2", className)} {...props} />
	),
	blockquote: ({ className, ...props }: any) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-zinc-300 dark:border-zinc-600 pl-6 italic text-zinc-800 dark:text-zinc-300 [&>*]:text-zinc-600 dark:[&>*]:text-zinc-400",
				className,
			)}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx("rounded-md border border-zinc-200 dark:border-zinc-700", className)}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }) => (
		<hr className="my-4 border-zinc-200 dark:border-zinc-700 md:my-8" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto">
			<table className={clsx("w-full", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"m-0 border-t border-zinc-300 dark:border-zinc-700 p-0 even:bg-zinc-100 dark:even:bg-zinc-800/50",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }:any) => (
		<th
			className={clsx(
				"border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: any) => (
		<td
			className={clsx(
				"border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }: any) => {
		const preRef = React.useRef<HTMLPreElement>(null);
		const [isCopied, setIsCopied] = React.useState(false);

		const handleCopy = async () => {
			if (!preRef.current) return;

			const codeText = preRef.current.querySelector("code")?.innerText || preRef.current.innerText;

			try {
				await navigator.clipboard.writeText(codeText);
				setIsCopied(true);
				setTimeout(() => setIsCopied(false), 2000);
			} catch (err) {
				console.error("Failed to copy text: ", err);
			}
		};

		return (
			<div className="group relative mt-6 mb-4">
				<button
					onClick={handleCopy}
					className={clsx(
						"absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md border py-1 px-2 text-xs font-medium transition-all duration-200",
						"border-zinc-300/80 bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900",
						"dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
					)}
					aria-label="Copy code block"
				>
					{isCopied ? (
						<>
							<Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
							<span className="text-emerald-600 dark:text-emerald-400">Copied</span>
						</>
					) : (
						<>
							<Copy className="h-3.5 w-3.5" />
							<span>Copy</span>
						</>
					)}
				</button>

				<pre
					ref={preRef}
					className={clsx(
						"mt-6 mb-4 overflow-x-auto rounded-lg border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-800 p-4 pr-20 font-mono text-sm text-zinc-800 dark:text-zinc-300",
						className,
					)}
					{...props}
				/>
			</div>
		);
	},
	code: ({ className, ...props }: any) => {
		return (
			<code
				className={clsx(
					"font-mono text-sm text-zinc-800 dark:text-zinc-300",
					"[pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:border-none",
					"bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/50 rounded py-[0.2rem] px-[0.3rem]",
					className,
				)}
				{...props}
			/>
		);
	},

	Image,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}
