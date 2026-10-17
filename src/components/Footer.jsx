import { Link } from "react-router-dom";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

  const email = "cabbysports4@gmail.com";
const subject = "Hello Cabby Sports";

const handleEmailClick = (e) => {
  e.preventDefault();

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // Opens the phone's default mail app (Gmail app if it is the default)
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  } else {
    // Opens Gmail compose in a new browser tab
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
};

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
                src="/MainLogo.jpeg"
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
              From packed stadiums to open fields in Lagos, Accra, Nairobi and beyond, football is more than a game.
              Catch every headline, every goal and every story, from the grassroots to other Leagues around the World.
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

              <a
                href="https://www.facebook.com/profile.php?id=100091353158880"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="facebook-icon" />
              </a>

              <a
                href="https://instagram.com/YOUR_PAGE"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="instagram-icon" />
              </a>

              <a
                href="https://x.com/cabbysports_1"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="x-icon" />
              </a>

              <a
                href="https://youtube.com/@cabbysports1?si=jpwJb2hEfXAGosO7"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="youtube-icon" />
              </a>

            </div>

          <div className="footer-email">
            ✉
            <a
              href={`mailto:${email}`}
              onClick={handleEmailClick}
            >
              {email}
            </a>
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