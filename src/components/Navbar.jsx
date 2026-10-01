import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Cabby Sports
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/football" onClick={closeMenu}>Football</Link>
          <Link to="/teams" onClick={closeMenu}>Teams</Link>
          <Link to="/news" onClick={closeMenu}>News</Link>
          <Link to="/fixtures" onClick={closeMenu}>Fixtures</Link>
          <Link to="/results" onClick={closeMenu}>Results</Link>
          <Link to="/transfers" onClick={closeMenu}>Transfers</Link>
        </div>

        <Link to="/search" className="search-btn">
          🔍
        </Link>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;