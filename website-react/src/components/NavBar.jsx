import {Link} from "react-router-dom"

function NavBar() {
    return (
        <nav className="nav-bar">
            <Link to="/" className="site-title">Roof-Vision</Link>
            <ul>
                <li>
                    <Link to="/customers">Customers</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;