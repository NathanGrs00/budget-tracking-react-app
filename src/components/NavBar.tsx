import { useState } from "react";
import mainLogo from "../assets/budget-tracking-logo.png";
import type { Page } from "../types.ts";
import { href } from "../hooks/useHashRoute.ts";

interface Props {
    currentPage: Page;
}

const LINKS: { page: Page; label: string }[] = [
    { page: "home", label: "Home" },
    { page: "income", label: "Income" },
    { page: "expenses", label: "Expenses" },
    { page: "budget", label: "Budget" },
    { page: "history", label: "History" },
    { page: "settings", label: "Settings" },
];

function NavBar({ currentPage }: Props) {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center fw-bold" href={href("home")} onClick={() => setCollapsed(true)}>
                    <img className="me-2" alt="" src={mainLogo} width={48} height={48} />
                    Personal Budget Tool
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-controls="main-nav"
                    aria-expanded={!collapsed}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${collapsed ? "" : "show"}`} id="main-nav">
                    <ul className="navbar-nav ms-auto">
                        {LINKS.map(({ page, label }) => (
                            <li className="nav-item" key={page}>
                                <a
                                    className={`nav-link ${currentPage === page ? "active fw-semibold" : ""}`}
                                    aria-current={currentPage === page ? "page" : undefined}
                                    href={href(page)}
                                    onClick={() => setCollapsed(true)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
