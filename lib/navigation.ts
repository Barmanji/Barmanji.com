export type NavItem = {
	key: string;
	name: string;
	href: string;
	mobileHidden?: boolean;
};

export const navItems: NavItem[] = [
	{ key: "1", name: "Projects", href: "/projects" },
	{ key: "2", name: "Competencies", href: "/stack" },
	{ key: "3", name: "Contact", href: "/contact" },
	{ key: "4", name: "Resume", href: "/resume" },
];
