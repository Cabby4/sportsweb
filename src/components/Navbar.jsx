
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [africaOpen, setAfricaOpen] = useState(false);
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

  const africaLinks = [
    { name: "Africa Football Home", path: "/africa-football" },
    {
      name: "CAF Champions League",
      path: "/africa-football/caf-champions-league",
    },
    {
      name: "CAF Confederation Cup",
      path: "/africa-football/caf-confederation-cup",
    },
    {
      name: "Nigeria League",
      path: "/africa-football/leagues/nigeria",
    },
    {
      name: "South Africa League",
      path: "/africa-football/leagues/south-africa",
    },
    { name: "Egypt League", path: "/africa-football/leagues/egypt" },
    { name: "Morocco League", path: "/africa-football/leagues/morocco" },
    { name: "Ghana League", path: "/africa-football/leagues/ghana" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
    setAfricaOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const isAfricaActive = location.pathname.startsWith("/africa-football");

  const linkClass = ({ isActive }) =>
    `cabby-nav-link ${isActive ? "active" : ""}`;

  return (
    <nav className="cabby-navbar" aria-label="Main navigation">
      <div className="container">
        <div className="cabby-navbar-inner">
          <Link
            to="/"
            className="cabby-brand"
            onClick={closeMenu}
            aria-label="Cabby Sports home"
          >
            <img
              src="/MainLogo2.jpeg"
              alt=""
              className="cabby-brand-logo"
            />

            <div className="cabby-brand-text">
              <span className="cabby-name">CABBY</span>
              <span className="sports-name">SPORTS</span>
              <span className="sports-code">
                An Improved Dynamics of Sports
              </span>
            </div>
          </Link>

          <div className="cabby-desktop-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={linkClass}
              >
                {item.name}
              </NavLink>
            ))}

            <div
              className={`cabby-nav-dropdown ${
                isAfricaActive ? "is-active" : ""
              }`}
            >
              <NavLink
                to="/africa-football"
                className={() =>
                  `cabby-nav-link ${
                    isAfricaActive ? "active" : ""
                  }`
                }
                aria-haspopup="true"
              >
                Africa <span aria-hidden="true">⌄</span>
              </NavLink>

              <div className="cabby-nav-dropdown-menu">
                {africaLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/africa-football"}
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink
              to="/grassroots-football"
              className={({ isActive }) =>
                `cabby-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              Grassroots
            </NavLink>

            <Link
              to="/search"
              className="cabby-search"
              aria-label="Search Cabby Sports"
              title="Search"
            >
              <span aria-hidden="true">⌕</span>
            </Link>
          </div>

          <div className="cabby-mobile-controls">
            <Link
              to="/search"
              className="cabby-search"
              aria-label="Search Cabby Sports"
              onClick={closeMenu}
            >
              <span aria-hidden="true">⌕</span>
            </Link>

            <button
              type="button"
              className="cabby-menu-btn"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="cabby-mobile-nav"
            >
              <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="cabby-mobile-nav" id="cabby-mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `cabby-mobile-link ${isActive ? "active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <button
              type="button"
              className={`cabby-mobile-link cabby-mobile-toggle ${
                isAfricaActive ? "active" : ""
              }`}
              onClick={() => setAfricaOpen((open) => !open)}
              aria-expanded={africaOpen}
            >
              Africa Football
              <span aria-hidden="true">{africaOpen ? "−" : "+"}</span>
            </button>

            {africaOpen &&
              africaLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/africa-football"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `cabby-mobile-sublink ${isActive ? "active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

            <NavLink
              to="/grassroots-football"
              onClick={closeMenu}
              className={({ isActive }) =>
                `cabby-mobile-link ${isActive ? "active" : ""}`
              }
            >
              Grassroots Football
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
