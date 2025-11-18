import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    const logout = () => {
        window.location.href = "http://localhost:8000/sign-out";
    };

    return (
        <>
            <nav
                style={{
                    background: "#333",
                    color: "white",
                    padding: "12px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", gap: "20px" }}>
                    <Link to="/customers" style={{ color: "white" }}>Customers</Link>
                    <Link to="/houses" style={{ color: "white" }}>Houses</Link>
                    <Link to="/house-images" style={{ color: "white" }}>House Images</Link>
                    <Link to="/agent-logs" style={{ color: "white" }}>Agent Logs</Link>
                </div>

                <button
                    onClick={logout}
                    style={{
                        background: "transparent",
                        color: "white",
                        border: "1px solid white",
                        padding: "6px 12px",
                        borderRadius: 4,
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            </nav>

            <div style={{ padding: 20 }}>
                <Outlet />
            </div>
        </>
    );
}
