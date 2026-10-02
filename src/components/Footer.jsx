// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">

//         <div className="footer-brand">
//           <h2>
//             CABBY <span>SPORTS</span>
//           </h2>

//           <p>
//             Your home for the latest sports news, football updates,
//             fixtures, results and transfer stories.
//           </p>
//         </div>

//         <div className="footer-links">
//           <h3>Quick Links</h3>

//           <a href="/">Home</a>
//           <a href="/news">News</a>
//           <a href="/fixtures">Fixtures</a>
//           <a href="/results">Results</a>
//           <a href="/transfers">Transfers</a>
//         </div>

//         <div className="footer-links">
//           <h3>Sports</h3>

//           <a href="/football">Football</a>
//           <a href="/basketball">Basketball</a>
//           <a href="/tennis">Tennis</a>
//           <a href="/boxing">Boxing</a>
//         </div>

//         <div className="footer-links">
//           <h3>Follow Us</h3>

//           <a href="#">Facebook</a>
//           <a href="#">Instagram</a>
//           <a href="#">YouTube</a>
//           <a href="#">X</a>
//         </div>

//       </div>

//       <div className="footer-bottom">
//         <p>
//           © 2026 Cabby Sports. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

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
                src="/cabby-sports-logo.jpg"
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