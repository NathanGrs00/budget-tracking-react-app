import { useCallback, useEffect, useState } from "react";
import type { Page } from "../types.ts";

const PAGES: Page[] = ["home", "income", "expenses", "budget", "history", "settings"];

function readHash(): Page {
    const name = window.location.hash.replace(/^#\/?/, "");
    return (PAGES as string[]).includes(name) ? (name as Page) : "home";
}

/**
 * Hash-based routing (#/income). It works on static hosting like GitHub Pages
 * and keeps the browser back button working.
 */
export function useHashRoute() {
    const [page, setPage] = useState<Page>(readHash);

    useEffect(() => {
        const onChange = () => {
            setPage(readHash());
            window.scrollTo(0, 0);
        };
        window.addEventListener("hashchange", onChange);
        return () => window.removeEventListener("hashchange", onChange);
    }, []);

    const navigate = useCallback((to: Page) => {
        window.location.hash = `/${to}`;
    }, []);

    return [page, navigate] as const;
}

export function href(page: Page): string {
    return `#/${page}`;
}
