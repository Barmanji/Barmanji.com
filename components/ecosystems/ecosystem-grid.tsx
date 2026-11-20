"use client";

import { useState } from "react";
import type { Ecosystem } from "@/lib/ecosystems";
import { EcosystemCard } from "./ecosystem-card";
import { EcosystemModal } from "./ecosystem-modal";

export function EcosystemGrid({ items }: { items: Ecosystem[] }) {
	const [active, setActive] = useState<Ecosystem | null>(null);

	return (
		<>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{items.map((item) => (
					<EcosystemCard
						key={item.id}
						item={item}
						onOpen={() => setActive(item)}
					/>
				))}
			</div>
			<EcosystemModal item={active} onClose={() => setActive(null)} />
		</>
	);
}
