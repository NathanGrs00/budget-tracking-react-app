
import mainLogo from '../assets/budget-tracking-logo.png';
import {useState} from "react";

interface Props {
    handleNavigating: (link: string) => void;
}

function NavBar({ handleNavigating }: Props) {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

    const toggleNavbar = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary shadow">
            <img className="ms-3" alt="budget-tool-logo" src={mainLogo} width={75}></img>
            <a className="navbar-brand ms-3 fw-bold" onClick={() => handleNavigating("home")}>Personal Budget Tool</a>

            <button
                className="navbar-toggler me-3"
                type="button"
                onClick={toggleNavbar}
                aria-controls="navbarText"
                aria-expanded={!isNavbarCollapsed}
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ms-3 ${isNavbarCollapsed ? '' : 'show'}`} id="navbarText">
                <ul className="navbar-nav ms-auto me-5">
                    <li className="nav-item active">
                        <a className="nav-link" onClick={() => handleNavigating("home")}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => handleNavigating("new-income")}>New Income</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => handleNavigating("new-expenses")}>New Expenses</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => handleNavigating("show-budget")}>Show budget</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
