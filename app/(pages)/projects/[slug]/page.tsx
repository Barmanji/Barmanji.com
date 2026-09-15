import { notFound } from "next/navigation";
import { allProjects } from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import ProjectTheme from "@/components/project-theme";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

	return (
		<ProjectTheme>
      <div className="relative bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors">
        <Header project={project} views={views} />
        <ReportView slug={project.slug} />

        <article className="px-4 py-12 mx-auto prose prose-zinc dark:prose-invert prose-quoteless">
          <Mdx code={project.body.code} />
        </article>
      </div>
    </ProjectTheme>
  );
}
