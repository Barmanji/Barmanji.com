"use client";
import * as React from "react";

const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Returns `true` on narrow (mobile) viewports and `false` on desktop.
 * Defaults to desktop so the primary feature renders immediately; the value
 * is corrected after the media query is evaluated on the client.
 */
export function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const mql = window.matchMedia(MOBILE_QUERY);
		const update = () => setIsMobile(mql.matches);
		update();
		mql.addEventListener("change", update);
		return () => mql.removeEventListener("change", update);
	}, []);

	return isMobile;
}
