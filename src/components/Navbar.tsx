import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="justify-between items-center">
                <Link to="/leaderboard" className="navbar-buttons">Classement</Link>
                <Link to="/duel" className="navbar-buttons">Duel</Link>
                <Link to="/upload" className="navbar-buttons">Ajouter un Chat</Link>
            </div>
        </nav>
    );
};