
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-category">FOOTBALL</span>

          <h1>
            Latest Sports News,
            <br />
            Updates & Stories
          </h1>

          <p>
            Stay up to date with the latest football news, transfers,
            fixtures, results and stories from around the world.
          </p>

          <Link to="/news" className="hero-btn">
            Read Latest News →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;