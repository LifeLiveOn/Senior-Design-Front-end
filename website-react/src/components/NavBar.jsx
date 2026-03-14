import {Link} from "react-router-dom"

function NavBar() {
    return (
        <nav className="nav-bar">
            <Link to="/" className="site-title">
                <img src="/roof_logo.svg" alt="OverWatch logo" className="nav-logo" />
                <div className="title-text">   
                    <div>
                        < span className="title-over">Over</span>
                        <span className="title-watch">Watch</span>
                    </div>
                    <span className="title-sub">by Steak Farm</span>
                </div>
            </Link>
            <ul>
                <li>
                    <Link to="/customers">Customers</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            <button className="nav-logout">Log Out</button>
        </nav>
    );
}

export default NavBar;