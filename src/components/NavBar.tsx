import mainLogo from '../assets/budget-tracking-logo.png';

interface Props {
    handleNavigating: (link: string) => void;
}

function NavBar({handleNavigating}: Props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img className="ms-5" alt="budget-tool-logo" src={mainLogo} width={50}></img>
            <a className="navbar-brand ms-3" onClick={() => handleNavigating("home")}>Personal Budget Tool</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
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
    )
}

export default NavBar;