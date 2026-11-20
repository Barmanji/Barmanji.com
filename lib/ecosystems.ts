export type EcosystemGroup = {
	label: string;
	items: string[];
};

export type EcosystemProof = {
	slug: string;
	title: string;
};

export type Ecosystem = {
	id: string;
	index: string;
	label: string;
	title: string;
	status: "Production" | "Advanced" | "Working";
	accent: string;
	summary: string;
	description: string;
	groups: EcosystemGroup[];
	proof: EcosystemProof[];
};

const ecosystemList: Ecosystem[] = [
	{
		id: "rust",
		index: "01",
		label: "Systems & Low Level",
		title: "Rust & Bare-Metal Engines",
		status: "Production",
		accent: "#f97316",
		summary:
			"TCP/HTTP servers, ownership, threads, and zero-drama request paths.",
		description:
			"I reach for Rust when the problem sits close to the metal: parsing protocols, holding state across connections, and making the compiler prove the hard parts. Most of that work is written from scratch rather than hidden behind a framework, which is exactly where the interesting bugs and lessons live.",
		groups: [
			{ label: "Runtime", items: ["Tokio", "std::net", "Threads", "Channels"] },
			{ label: "Web", items: ["Axum", "Tower", "SQLx"] },
			{ label: "Desktop / UI", items: ["Tauri", "Leptos"] },
			{ label: "Craft", items: ["HTTP/1.1", "Gzip", "Persistent Connections"] },
		],
		proof: [
			{ slug: "http-server-from-scratch", title: "HTTP Server from Scratch" },
			{ slug: "rust-twitter-clone", title: "Twitter Clone in Rust" },
		],
	},
	{
		id: "next",
		index: "02",
		label: "Frontend & Applications",
		title: "Next.js & Frontend Systems",
		status: "Production",
		accent: "#3b82f6",
		summary:
			"App Router, server components, streaming, and interfaces that stay fast.",
		description:
			"The frontend work is Next.js-first: App Router, server actions, route handlers, and a design system that stays out of the way. I care about the boring parts that make a UI feel fast — loading states, error boundaries, and predictable data flow — more than the clever ones.",
		groups: [
			{ label: "Core", items: ["React 19", "Next.js 16", "TypeScript"] },
			{ label: "Data", items: ["TanStack Query", "tRPC", "Server Actions"] },
			{ label: "UI", items: ["Tailwind CSS", "shadcn/ui", "MUI", "Framer Motion"] },
			{ label: "Auth / Billing", items: ["Clerk", "better-auth", "Razorpay"] },
		],
		proof: [
			{ slug: "v0-clone", title: "V0-clone" },
			{ slug: "blazejet", title: "Blaze Jet" },
			{ slug: "codeleet", title: "CodeLeet" },
			{ slug: "health-bridge", title: "Health Bridge" },
			{ slug: "reels-pro", title: "Reels Pro" },
			{ slug: "t3-chat-clone", title: "T3-Chat-Clone" },
			{ slug: "threadly", title: "Threadly" },
			{ slug: "thumbnail-builder", title: "Thumbnail Builder" },
			{ slug: "anonymous", title: "Anonymous Messenger" },
			{ slug: "megablog", title: "MegaBlog" },
			{ slug: "barmanji.com", title: "Barmanji.com" },
		],
	},
	{
		id: "go",
		index: "03",
		label: "Concurrency & Tooling",
		title: "Go Concurrency & APIs",
		status: "Advanced",
		accent: "#14b8a6",
		summary:
			"Goroutines, channels, CLI ergonomics, and agent loops that keep moving.",
		description:
			"Go is the language I use for small, sharp tools: single binaries that do one job, stream output, and fail with a message a human can act on. The concurrency model makes long-running loops and subprocess orchestration feel ordinary instead of fragile.",
		groups: [
			{ label: "Runtime", items: ["Goroutines", "Channels", "Context"] },
			{ label: "HTTP", items: ["net/http", "JSON", "SSE"] },
			{ label: "CLI", items: ["Cobra", "Charmbracelet Huh"] },
			{ label: "Agents", items: ["Tool Calling", "Subagents", "Shell Execution"] },
		],
		proof: [{ slug: "clawd-code", title: "Clawd Code" }],
	},
	{
		id: "python",
		index: "04",
		label: "Python & Async",
		title: "Python & Async Automation",
		status: "Production",
		accent: "#eab308",
		summary:
			"Django, FastAPI, SQLModel, and ML pipelines that stay readable.",
		description:
			"Python is where I prototype the data-heavy parts: async APIs, SQLModel schemas, background jobs, and the occasional scikit-learn classifier. The rule is the same as everywhere else — explicit boundaries, typed edges, and no magic in the request path.",
		groups: [
			{ label: "Web", items: ["Django", "FastAPI", "Uvicorn"] },
			{ label: "Data", items: ["SQLModel", "Pydantic", "SQLite", "PostgreSQL"] },
			{ label: "ML", items: ["scikit-learn", "Pandas", "NumPy"] },
			{ label: "Integrations", items: ["OpenAI", "ImageKit", "Clerk"] },
		],
		proof: [
			{ slug: "health-bridge", title: "Health Bridge" },
			{ slug: "django-chickbum", title: "Django Chickbum" },
			{ slug: "thumbnail-builder", title: "Thumbnail Builder" },
		],
	},
	{
		id: "databases",
		index: "05",
		label: "Data & Persistence",
		title: "Databases & Scalable Backends",
		status: "Production",
		accent: "#a855f7",
		summary:
			"Schema design, migrations, caching, and queries that survive traffic.",
		description:
			"Most of the hard bugs live between the application and the database. I design schemas around the queries that actually run, keep migrations boring, and reach for Redis when the same read happens too often. The goal is not a clever schema — it is one that is still understandable six months later.",
		groups: [
			{ label: "Relational", items: ["PostgreSQL", "SQLite", "Prisma", "Drizzle", "SQLx"] },
			{ label: "Document", items: ["MongoDB", "Mongoose"] },
			{ label: "Cache / Queue", items: ["Redis", "Upstash", "Kafka"] },
			{ label: "Ops", items: ["Transactions", "Indexes", "Pooling"] },
		],
		proof: [
			{ slug: "health-bridge", title: "Health Bridge" },
			{ slug: "codeleet", title: "CodeLeet" },
			{ slug: "threadly", title: "Threadly" },
			{ slug: "t3-chat-clone", title: "T3-Chat-Clone" },
			{ slug: "blazejet", title: "Blaze Jet" },
			{ slug: "v0-clone", title: "V0-clone" },
			{ slug: "reels-pro", title: "Reels Pro" },
			{ slug: "anonymous", title: "Anonymous Messenger" },
		],
	},
	{
		id: "ai",
		index: "06",
		label: "AI & Agents",
		title: "AI & Agent Systems",
		status: "Working",
		accent: "#ec4899",
		summary:
			"Tool calling, streaming, sandboxes, and guard rails around the model.",
		description:
			"I build around models rather than trusting them: bounded tool loops, explicit schemas, streaming responses, and a fallback for every failure. The interesting part is not the prompt — it is the system that keeps the agent useful and contained.",
		groups: [
			{ label: "Providers", items: ["OpenAI", "Gemini", "OpenRouter", "Anthropic"] },
			{ label: "SDKs", items: ["Vercel AI SDK", "AI SDK React"] },
			{ label: "Runtime", items: ["E2B Sandboxes", "Inngest"] },
			{ label: "Craft", items: ["Tool Calling", "Streaming", "LSP", "Subagents"] },
		],
		proof: [
			{ slug: "v0-clone", title: "V0-clone" },
			{ slug: "health-bridge", title: "Health Bridge" },
			{ slug: "thumbnail-builder", title: "Thumbnail Builder" },
			{ slug: "t3-chat-clone", title: "T3-Chat-Clone" },
			{ slug: "clawd-code", title: "Clawd Code" },
		],
	},
	{
		id: "devops",
		index: "07",
		label: "Infrastructure & Delivery",
		title: "DevOps & Infra",
		status: "Working",
		accent: "#ef4444",
		summary:
			"Containers, queues, self-hosted services, and repeatable deploys.",
		description:
			"I like knowing what happens between a commit and a running URL. That means Dockerfiles I can read, self-hosted dependencies when the managed version is too expensive, and deployment notes that a future me can follow without archaeology.",
		groups: [
			{ label: "Containers", items: ["Docker", "Docker Compose"] },
			{ label: "Cloud", items: ["AWS S3", "AWS ECS", "Vercel"] },
			{ label: "Messaging", items: ["Kafka", "Socket.io"] },
			{ label: "Self-hosted", items: ["Judge0", "PostgreSQL", "Redis"] },
		],
		proof: [
			{ slug: "codeleet", title: "CodeLeet" },
			{ slug: "blazejet", title: "Blaze Jet" },
			{ slug: "t3-chat-clone", title: "T3-Chat-Clone" },
			{ slug: "health-bridge", title: "Health Bridge" },
			{ slug: "v0-clone", title: "V0-clone" },
		],
	},
	{
		id: "tooling",
		index: "08",
		label: "Tooling & Environment",
		title: "Neovim & Tooling",
		status: "Advanced",
		accent: "#22c55e",
		summary:
			"Lua config, tmux, zsh, and an Arch setup tuned for editing speed.",
		description:
			"The editor is part of the craft. My Neovim config is Lua, my terminal is tmux and zsh, and the whole setup lives in a stow-managed dotfiles repo so a new machine takes minutes instead of an evening. Tools should disappear into the work.",
		groups: [
			{ label: "Editor", items: ["Neovim", "Lua", "LSP", "Treesitter"] },
			{ label: "Shell", items: ["Zsh", "p10k", "zinit", "tmux"] },
			{ label: "Desktop", items: ["Arch Linux", "Hyprland", "Waybar", "Alacritty"] },
			{ label: "Setup", items: ["GNU Stow", "Dotfiles", "Scripts"] },
		],
		proof: [
			{ slug: "dotfiles", title: "Dotfiles" },
			{ slug: "barmanji.com", title: "Barmanji.com" },
		],
	},
];

// Display order: Next.js, Rust, Python, AI, Go, Databases, DevOps, Tooling.
const ecosystemOrder = [
	"next",
	"rust",
	"python",
	"ai",
	"go",
	"databases",
	"devops",
	"tooling",
];

export const ecosystems: Ecosystem[] = ecosystemOrder.map((id, index) => {
	const item = ecosystemList.find((ecosystem) => ecosystem.id === id);
	if (!item) throw new Error(`Unknown ecosystem: ${id}`);
	return { ...item, index: String(index + 1).padStart(2, "0") };
});
