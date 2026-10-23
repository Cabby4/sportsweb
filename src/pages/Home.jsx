import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import BreakingNews from "../components/BreakingNews";
import LatestNews from "../components/LatestNews";
import TrendingNews from "../components/TrendingNews";
import Fixtures from "../components/Fixtures";
import Results from "../components/Results";
import LatestTransfers from "../components/LatestTransfers";

const Home = () => {
  return (
    <main className="home-page">
      <Hero />

      <BreakingNews />

      <LatestNews />

      <TrendingNews />

      <Fixtures />

      <Results />

      <LatestTransfers />

      <section className="home-final-cta">
        <div className="container">
          <div className="home-final-cta-box">
            <div>
              <span>CABBY SPORTS | BEYOND THE GAME</span>

              <h2>
                Every Story. Every Match. Every Moment.
              </h2>

              <p>
                Your destination for trusted football news, match updates,
                fixtures, results and transfer stories. From the biggest
                global competitions to African football and grassroots
                talent, we bring you closer to the game.
              </p>
            </div>

            <div className="home-final-cta-actions">
              <Link to="/news" className="home-cta-primary">
                Explore Latest News →
              </Link>

              <Link to="/football" className="home-cta-secondary">
                Explore Football
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;