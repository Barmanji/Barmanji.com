import { allProjects } from "@/.contentlayer/generated";
import { Navigation } from "../../../components/nav";
import { Redis } from "@upstash/redis";
import type { ProjectCardData } from "@/lib/project-types";
import { ProjectsExplorer } from "./projects-explorer";

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const projects: ProjectCardData[] = allProjects
    .filter((project) => project.published)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
      date: project.date ? new Date(project.date).toISOString() : null,
      techStack: project.techStack ?? [],
      mobileSupported: Boolean(project.mobileSupported),
      desktopSupported: Boolean(project.desktopSupported),
    }));

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            My work treasure! Mostly are hobby projects, also hosted.
            <span className="text-red-500"> EXPLORE & ENJOY! </span>
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <ProjectsExplorer projects={projects} views={views} />
      </div>
    </div>
  );
}
