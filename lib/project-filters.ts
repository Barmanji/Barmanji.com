export type FilterId =
	| "all"
	| "rust"
	| "python"
	| "go"
	| "js"
	| "databases"
	| "ai"
	| "devops";

export const filters: { id: FilterId; label: string }[] = [
	{ id: "all", label: "All" },
	{ id: "rust", label: "Rust" },
	{ id: "python", label: "Python" },
	{ id: "go", label: "Go" },
	{ id: "js", label: "React / Next.js" },
	{ id: "databases", label: "Databases" },
	{ id: "ai", label: "AI / Agents" },
	{ id: "devops", label: "DevOps" },
];

// Exact, normalized tech names per category. Exact matching avoids false
// positives such as "Django" containing "go".
const techCategories: Record<Exclude<FilterId, "all">, string[]> = {
	rust: ["rust"],
	python: ["python", "django", "fastapi", "flask", "pandas", "numpy", "scikit-learn"],
	go: ["go"],
	js: [
		"react",
		"next.js",
		"typescript",
		"javascript",
		"vite",
		"node.js",
		"express",
		"tailwind css",
		"shadcn/ui",
		"redux toolkit",
		"react router",
		"tanstack query",
		"nextauth.js",
		"better-auth",
		"daisyui",
		"tinymce",
		"p5.js",
		"fetch api",
		"context api",
		"socket.io",
		"clerk",
		"zod",
		"three.js",
		"react hook form",
	],
	databases: [
		"postgresql",
		"mongodb",
		"sqlite",
		"prisma",
		"drizzle orm",
		"mongoose",
		"neon",
		"upstash redis",
		"redis",
		"supabase",
		"mysql",
	],
	ai: [
		"openai api",
		"gemini api",
		"openrouter",
		"e2b",
		"claude",
		"openai",
		"anthropic",
	],
	devops: [
		"docker",
		"aws s3",
		"aws ecs",
		"aws",
		"kafka",
		"github actions",
		"vercel",
	],
};

const normalizedTech = (tech: string) => tech.trim().toLowerCase();

export function getProjectFilters(techStack: string[] = []): FilterId[] {
	const matches = new Set<FilterId>();

	for (const tech of techStack) {
		const normalized = normalizedTech(tech);
		for (const [category, names] of Object.entries(techCategories)) {
			if (names.includes(normalized)) {
				matches.add(category as FilterId);
			}
		}
	}

	return [...matches];
}
