
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Football", path: "/football" },
    { name: "Teams", path: "/teams" },
    { name: "News", path: "/news" },
    { name: "Fixtures", path: "/fixtures" },
    { name: "Results", path: "/results" },
    { name: "Transfers", path: "/transfers" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="cabby-navbar">
      <div className="container">
        <div className="cabby-navbar-inner">

          {/* =========================
              LOGO
          ========================= */}
          <Link
            to="/"
            className="cabby-brand"
            onClick={closeMenu}
          >
            <img
              src="/cabby-sports-logo.png"
              alt="Cabby Sports"
              className="cabby-brand-logo"
            />

            <div className="cabby-brand-text">
              <span className="cabby-name">CABBY</span>
              <span className="sports-name">SPORTS</span>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}
          <div className="cabby-desktop-nav">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`cabby-nav-link ${
                    active ? "active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              to="/search"
              className="cabby-search"
              aria-label="Search"
            >
              🔍
            </Link>
          </div>

          {/* =========================
              MOBILE CONTROLS
          ========================= */}
          <div className="cabby-mobile-controls">

            <Link
              to="/search"
              className="cabby-search"
              aria-label="Search"
            >
              🔍
            </Link>

            <button
              type="button"
              className="cabby-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>
        </div>

        {/* =========================
            MOBILE NAVIGATION
        ========================= */}
        {menuOpen && (
          <div className="cabby-mobile-nav">

            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`cabby-mobile-link ${
                    active ? "active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;