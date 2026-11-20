"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Monitor, Smartphone } from "lucide-react";
import { Card } from "@/components/card";
import { TechStack } from "@/components/tech-stack";
import { filters, getProjectFilters, type FilterId } from "@/lib/project-filters";
import type { ProjectCardData } from "@/lib/project-types";
import { Article } from "./article";

type Props = {
	projects: ProjectCardData[];
	views: Record<string, number>;
};

const sortByDate = (a: ProjectCardData, b: ProjectCardData) =>
	(b.date ? new Date(b.date).getTime() : 0) -
	(a.date ? new Date(a.date).getTime() : 0);

export function ProjectsExplorer({ projects, views }: Props) {
	const [activeFilter, setActiveFilter] = useState<FilterId>("all");

	const featured = projects.find((project) => project.slug === "v0-clone");
	const top2 = projects.find((project) => project.slug === "codeleet");
	const top3 = projects.find((project) => project.slug === "threadly");
	const pinnedSlugs = [featured?.slug, top2?.slug, top3?.slug].filter(
		Boolean,
	) as string[];

	const sorted = projects
		.filter((project) => !pinnedSlugs.includes(project.slug))
		.sort(sortByDate);

	const filtered =
		activeFilter === "all"
			? projects
			: projects
					.filter((project) =>
						getProjectFilters(project.techStack).includes(activeFilter),
					)
					.sort(sortByDate);

	const counts = { all: projects.length } as Record<FilterId, number>;
	for (const filter of filters) {
		if (filter.id === "all") continue;
		counts[filter.id] = projects.filter((project) =>
			getProjectFilters(project.techStack).includes(filter.id),
		).length;
	}

	const visible = activeFilter === "all" ? sorted : filtered;
	const activeLabel =
		filters.find((filter) => filter.id === activeFilter)?.label ?? "All";

	return (
		<div className="space-y-8 md:space-y-12">
			{activeFilter === "all" && (
				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
					{featured && (
						<Card>
							<Link href={`/projects/${featured.slug}`}>
								<article className="relative w-full h-full p-4 md:p-8">
									<div className="flex items-center justify-between gap-2">
										<div className="text-xs" style={{ color: "#e11d48" }}>
											{featured.date ? (
												<time dateTime={featured.date}>
													{Intl.DateTimeFormat(undefined, {
														dateStyle: "medium",
													}).format(new Date(featured.date))}
												</time>
											) : (
												<span>SOON</span>
											)}
										</div>
										<span
											className="flex items-center gap-1 text-xs text-zinc-500"
											style={{ color: "#e11d48" }}
										>
											<Eye className="w-4 h-4" />
											{Intl.NumberFormat("en-US", {
												notation: "compact",
											}).format(views[featured.slug] ?? 0)}
										</span>
									</div>

									<h2
										id="featured-post"
										className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
									>
										{featured.title}
									</h2>
									<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
										{featured.description}
									</p>
									<TechStack items={featured.techStack} />
									<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
										<span className="font-bold text-sm">Best Experience on</span>
										{featured.mobileSupported && (
											<Smartphone
												className="inline-block w-4 h-4 ml-2"
												color="#e11d48"
											/>
										)}
										{featured.desktopSupported && (
											<Monitor
												className="inline-block w-4 h-4 ml-2"
												color="#e11d48"
											/>
										)}
									</p>
									<div className="absolute bottom-4 md:bottom-8">
										<p
											className="hidden text-zinc-200 hover:text-zinc-50 lg:block"
											style={{ color: "#e11d48" }}
										>
											Read more <span aria-hidden="true">&rarr;</span>
										</p>
									</div>
								</article>
							</Link>
						</Card>
					)}

					<div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
						{[top2, top3].filter(Boolean).map((project) => (
							<Card key={project!.slug}>
								<Article project={project!} views={views[project!.slug] ?? 0} />
							</Card>
						))}
					</div>
				</div>
			)}

			<div className="flex flex-col gap-3">
				<div
					className="flex flex-wrap items-center gap-2"
					role="group"
					aria-label="Filter projects by technology"
				>
					{filters.map((filter) => {
						const active = activeFilter === filter.id;
						return (
							<button
								key={filter.id}
								type="button"
								onClick={() =>
									setActiveFilter(
										filter.id === "all" || active ? "all" : filter.id,
									)
								}
								aria-pressed={active}
								className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-kode-mono transition-colors ${
									active
										? "border-[#ff174f]/60 bg-[#ff174f]/10 text-zinc-100"
										: "border-zinc-700/70 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
								}`}
							>
								{filter.id !== "all" && (
									<span
										className="h-1.5 w-1.5 rounded-full"
										style={{
											backgroundColor: active ? "#ff174f" : "#52525b",
										}}
									/>
								)}
								{filter.label}
								<span
									className={`text-[10px] ${
										active ? "text-[#ff174f]" : "text-zinc-600"
									}`}
								>
									{counts[filter.id]}
								</span>
							</button>
						);
					})}
				</div>
				<p className="text-[11px] tracking-[0.18em] uppercase text-zinc-600">
					{activeFilter === "all"
						? `${counts.all} projects`
						: `${filtered.length} ${activeLabel} project${filtered.length === 1 ? "" : "s"}`}
				</p>
			</div>

			<div className="hidden w-full h-px md:block bg-zinc-800" />

			{visible.length === 0 ? (
				<p className="py-12 text-sm text-zinc-500">
					No projects in this stack yet.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
					{[0, 1, 2].map((column) => (
						<div key={column} className="grid grid-cols-1 gap-4">
							{visible
								.filter((_, index) => index % 3 === column)
								.map((project) => (
									<Card key={project.slug}>
										<Article
											project={project}
											views={views[project.slug] ?? 0}
										/>
									</Card>
								))}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
