
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import type { ComputedFields } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { CharsElement, LineElement } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const computedFields: ComputedFields<"Project" | "Page"> = {
	path: {
		type: "string" as const,
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slug: {
		type: "string" as const,
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: "./projects/**/*.mdx",
	contentType: "mdx",

	fields: {
		published: {
			type: "boolean",
		},
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		date: {
			type: "date",
		},
		url: {
			type: "string",
		},
		repository: {
			type: "string",
		},
		mobileSupported: {
			type: 'boolean',
		},
		desktopSupported: {
			type: 'boolean',
		},
	},
	computedFields,
}));

export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: "pages/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "./content",
  disableImportAliasWarning: true,
	documentTypes: [Page, Project],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode as unknown as (options: {
					theme: { light: string; dark: string };
					onVisitLine?: (node: LineElement) => void;
					onVisitHighlightedLine?: (node: LineElement, id?: string) => void;
					onVisitHighlightedChars?: (node: CharsElement, id?: string) => void;
				}) => void,
				{
					theme: { light: "github-light", dark: "github-dark" },
					onVisitLine(node: LineElement) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node: LineElement) {
						node.properties.className =
							node.properties.className ?? [];
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedChars(node: CharsElement) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});
