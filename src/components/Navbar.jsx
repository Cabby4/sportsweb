
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
    { name: "Africa Football", path: "/africa-football" },
    { name: "Grassroots Football", path: "/grassroots-football" },
  ];

  const africaLinks = [
    { name: "Africa Football Home", path: "/africa-football" },
    { name: "CAF Champions League", path: "/africa-football/caf-champions-league" },
    { name: "CAF Confederation Cup", path: "/africa-football/caf-confederation-cup" },
    { name: "Nigeria League", path: "/africa-football/leagues/nigeria" },
    { name: "South Africa League", path: "/africa-football/leagues/south-africa" },
    { name: "Egypt League", path: "/africa-football/leagues/egypt" },
    { name: "Morocco League", path: "/africa-football/leagues/morocco" },
    { name: "Ghana League", path: "/africa-football/leagues/ghana" },
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
              src="/MainLogo2.jpeg"
              alt="Cabby Sports"
              className="cabby-brand-logo"
            />

            <div className="cabby-brand-text">
              <span className="cabby-name">CABBY</span>
              <span className="sports-name">SPORTS</span>
              <span className="sports-code">An Improved Dynamics of Sports</span>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}
          <div className="cabby-desktop-nav">
            {navItems.map((item) => {
              const active = location.pathname === item.path || (item.path === "/africa-football" && location.pathname.startsWith("/africa-football"));
              if (item.path === "/africa-football") {
                return (
                  <div className="cabby-nav-dropdown" key={item.path}>
                    <Link to={item.path} className={`cabby-nav-link ${active ? "active" : ""}`}>{item.name} <span aria-hidden="true">⌄</span></Link>
                    <div className="cabby-nav-dropdown-menu">
                      {africaLinks.map((subItem) => <Link key={subItem.path} to={subItem.path}>{subItem.name}</Link>)}
                    </div>
                  </div>
                );
              }
              return <Link key={item.path} to={item.path} className={`cabby-nav-link ${active ? "active" : ""}`}>{item.name}</Link>;
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
              const active = location.pathname === item.path || (item.path === "/africa-football" && location.pathname.startsWith("/africa-football"));
              return <Link key={item.path} to={item.path} onClick={closeMenu} className={`cabby-mobile-link ${active ? "active" : ""}`}>{item.name}</Link>;
            })}
            <div className="cabby-mobile-subnav-label">Africa Football pages</div>
            {africaLinks.slice(1).map((item) => <Link key={item.path} to={item.path} onClick={closeMenu} className="cabby-mobile-sublink">{item.name}</Link>)}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;