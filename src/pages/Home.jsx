
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import BreakingNews from "../components/BreakingNews";
import LatestNews from "../components/LatestNews";
import TrendingNews from "../components/TrendingNews";
import Fixtures from "../components/Fixtures";
import Results from "../components/Results";
import LatestTransfers from "../components/LatestTransfers";
import { getNews } from "../services/api";

const Home = () => {
  const [grassrootsNews, setGrassrootsNews] = useState([]);
  const [grassrootsLoading, setGrassrootsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getNews({ section: "grassroots" })
      .then((data) => {
        if (!active) return;

        const articles = Array.isArray(data.data) ? data.data : [];

        // Keep only published Grassroots Football stories.
        const filteredArticles = articles.filter(
          (article) => article.section === "grassroots"
        );

        setGrassrootsNews(filteredArticles.slice(0, 3));
      })
      .catch((error) => {
        console.error("Unable to load grassroots news:", error);
      })
      .finally(() => {
        if (active) setGrassrootsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="home-page">
      <Hero />

      <BreakingNews />

      <LatestNews />

      <TrendingNews />

      <Fixtures />

      <Results />

      <LatestTransfers />

      {/* GRASSROOTS FOOTBALL HOMEPAGE SECTION */}
      <section className="home-grassroots-section">
        <div className="container">
          <div className="home-grassroots-heading">
            <div>
              <span className="home-grassroots-eyebrow">
                THE FUTURE OF FOOTBALL
              </span>

              <h2>Grassroots Football</h2>

              <p>
                Discover rising talents, local academies, community
                tournaments and the people shaping the future of the game.
              </p>
            </div>

            <Link
              to="/grassroots-football"
              className="home-grassroots-view-all"
            >
              View All Grassroots News →
            </Link>
          </div>

          {grassrootsLoading ? (
            <p className="home-grassroots-status">
              Loading grassroots stories...
            </p>
          ) : grassrootsNews.length > 0 ? (
            <div className="home-grassroots-grid">
              {grassrootsNews.map((article) => (
                <article
                  className="home-grassroots-card"
                  key={article._id || article.id || article.slug}
                >
                  <Link
                    to={`/news/${article._id || article.id || article.slug}`}
                    className="home-grassroots-image-link"
                  >
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="home-grassroots-image-placeholder">
                        GRASSROOTS FOOTBALL
                      </div>
                    )}
                  </Link>

                  <div className="home-grassroots-card-content">
                    <span className="home-grassroots-tag">
                      {article.grassrootsType
                        ? article.grassrootsType.replace(/-/g, " ")
                        : "Grassroots Football"}
                    </span>

                    <h3>
                      <Link
                        to={`/news/${article._id || article.id || article.slug}`}
                      >
                        {article.title}
                      </Link>
                    </h3>

                    <p>
                      {article.summary ||
                        "Read the latest grassroots football story on Cabby Sports."}
                    </p>

                    <Link
                      to={`/news/${article._id || article.id || article.slug}`}
                      className="home-grassroots-read-more"
                    >
                      Read Story →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="home-grassroots-empty">
              <h3>Grassroots stories coming soon</h3>
              <p>
                Check back for updates on emerging talent, academies and
                community football.
              </p>
              <Link to="/grassroots-football">
                Explore Grassroots Football →
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="home-final-cta">
        <div className="container">
          <div className="home-final-cta-box">
            <div>
              <span>CABBY SPORTS | BEYOND THE GAME</span>

              <h2>Every Story. Every Match. Every Moment.</h2>

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