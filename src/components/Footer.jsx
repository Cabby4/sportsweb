function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>
            CABBY <span>SPORTS</span>
          </h2>

          <p>
            Your home for the latest sports news, football updates,
            fixtures, results and transfer stories.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/news">News</a>
          <a href="/fixtures">Fixtures</a>
          <a href="/results">Results</a>
          <a href="/transfers">Transfers</a>
        </div>

        <div className="footer-links">
          <h3>Sports</h3>

          <a href="/football">Football</a>
          <a href="/basketball">Basketball</a>
          <a href="/tennis">Tennis</a>
          <a href="/boxing">Boxing</a>
        </div>

        <div className="footer-links">
          <h3>Follow Us</h3>

          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">X</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Cabby Sports. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;