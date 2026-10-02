import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import BreakingNews from "../components/BreakingNews";
import LatestNews from "../components/LatestNews";
import TrendingNews from "../components/TrendingNews";
import Fixtures from "../components/Fixtures";
import Results from "../components/Results";

const Home = () => {
  return (
    <main className="home-page">
      <Hero />

      <BreakingNews />

      <LatestNews />

      <TrendingNews />

      <Fixtures />

      <Results />

      <section className="home-final-cta">
        <div className="container">
          <div className="home-final-cta-box">
            <div>
              <span>CABBY SPORTS</span>

              <h2>
                Your Football. Your Stories.
              </h2>

              <p>
                Stay connected with the latest football
                news, fixtures, results, transfers and
                stories from around the world.
              </p>
            </div>

            <div className="home-final-cta-actions">
              <Link to="/news" className="home-cta-primary">
  Explore News →
</Link>

<Link to="/football" className="home-cta-secondary">
  Football Hub
</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;