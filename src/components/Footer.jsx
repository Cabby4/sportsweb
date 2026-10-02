

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="cabby-footer">

      <div className="container">

        <div className="cabby-footer-main">

          {/* =========================
              BRAND
          ========================= */}
          <div className="cabby-footer-brand">

            <Link to="/" className="cabby-footer-brand-link">

              <img
                src="/cabby-sports-logo.png"
                alt="Cabby Sports"
                className="cabby-footer-logo"
              />

              <div className="cabby-footer-brand-text">
                <span className="cabby-footer-cabby">
                  CABBY
                </span>

                <span className="cabby-footer-sports">
                  SPORTS
                </span>
              </div>

            </Link>

            <p>
              Your home for the latest football news,
              transfers, fixtures, results and sports
              stories from around the world.
            </p>

          </div>

          {/* =========================
              QUICK LINKS
          ========================= */}
          <div className="cabby-footer-links">

            <h4>Quick Links</h4>

            <span className="footer-heading-line"></span>

            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
            <Link to="/football">Football</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/fixtures">Fixtures</Link>
            <Link to="/results">Results</Link>

          </div>

          {/* =========================
              SPORTS
          ========================= */}
          <div className="cabby-footer-links">

            <h4>Sports</h4>

            <span className="footer-heading-line"></span>

            <Link to="/transfers">Transfers</Link>
            <Link to="/fixtures">Fixtures</Link>
            <Link to="/results">Results</Link>
            <Link to="/teams">Teams</Link>

          </div>

          {/* =========================
              FOLLOW US
          ========================= */}
          <div className="cabby-footer-social">

            <h4>Follow Us</h4>

            <span className="footer-heading-line"></span>

            <div className="footer-social-icons">

              <a href="#" aria-label="Facebook">
                f
              </a>

              <a href="#" aria-label="X">
                X
              </a>

              <a href="#" aria-label="Instagram">
                ◎
              </a>

              <a href="#" aria-label="YouTube">
                ▶
              </a>

            </div>

            <div className="footer-email">
              ✉
              <span>info@cabbysports.com</span>
            </div>

          </div>

        </div>

        {/* =========================
            FOOTER BOTTOM
        ========================= */}
        <div className="cabby-footer-bottom">

          <p>
            © {new Date().getFullYear()} Cabby Sports.
            All rights reserved.
          </p>

          <span>
            MORE SPORTS&nbsp; • &nbsp;MORE STORIES&nbsp; • &nbsp;CABBY SPORTS
          </span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;