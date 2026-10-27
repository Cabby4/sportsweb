import { Helmet } from "react-helmet-async";
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

  const [africaNews, setAfricaNews] = useState([]);
  const [africaLoading, setAfricaLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getNews({ section: "grassroots" })
      .then((data) => {
        if (!active) return;

        const articles = Array.isArray(data.data) ? data.data : [];

        setGrassrootsNews(
          articles
            .filter((article) => article.section === "grassroots")
            .slice(0, 3)
        );
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

  useEffect(() => {
    let active = true;

    getNews({ section: "africa" })
      .then((data) => {
        if (!active) return;

        const articles = Array.isArray(data.data) ? data.data : [];

        setAfricaNews(
          articles
            .filter((article) => article.section === "africa")
            .slice(0, 3)
        );
      })
      .catch((error) => {
        console.error("Unable to load African football news:", error);
      })
      .finally(() => {
        if (active) setAfricaLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Cabby Sports | Latest Football News, Fixtures & Transfers</title>

        <meta
          name="description"
          content="Get the latest football news, live match updates, fixtures, results, transfer news, African football stories and grassroots football coverage on Cabby Sports."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://cabbysports.vercel.app/"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cabby Sports" />
        <meta
          property="og:title"
          content="Cabby Sports | Latest Football News, Fixtures & Transfers"
        />
        <meta
          property="og:description"
          content="Follow breaking football news, fixtures, results, transfers, African football and grassroots stories."
        />
        <meta
          property="og:url"
          content="https://cabbysports.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://cabbysports.vercel.app/cabby-sports-logo.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Cabby Sports | Latest Football News"
        />
        <meta
          name="twitter:description"
          content="Your home for football news, fixtures, results, transfers and African football."
        />
        <meta
          name="twitter:image"
          content="https://cabbysports.vercel.app/cabby-sports-logo.png"
        />
      </Helmet>

    <main className="home-page">
      <Hero />

      <BreakingNews />

      <LatestNews />

      <TrendingNews />

      <Fixtures />

      <Results />

      <LatestTransfers />

      {/* AFRICA FOOTBALL HOMEPAGE SECTION */}
      <section className="home-africa-section">
        <div className="container">
          <div className="home-africa-heading">
            <div>
              <span className="home-africa-eyebrow">
                THE PRIDE OF AFRICAN FOOTBALL
              </span>

              <h2>Africa Football</h2>

              <p>
                Follow African club competitions, domestic leagues and the
                stories shaping football across the continent.
              </p>
            </div>

            <Link
              to="/africa-football"
              className="home-africa-view-all"
            >
              Explore Africa Football →
            </Link>
          </div>

          <div className="home-africa-topics">
            <Link to="/africa-football/caf-champions-league">
              CAF Champions League
            </Link>

            <Link to="/africa-football/caf-confederation-cup">
              CAF Confederation Cup
            </Link>

            <Link to="/africa-football/leagues/nigeria">
              Nigerian League
            </Link>

            <Link to="/africa-football/leagues/south-africa">
              South African League
            </Link>
          </div>

          {africaLoading ? (
            <p className="home-africa-status">
              Loading African football stories...
            </p>
          ) : africaNews.length > 0 ? (
            <div className="home-africa-grid">
              {africaNews.map((article) => (
                <article
                  className="home-africa-card"
                  key={article._id || article.id || article.slug || article.title}
                >
                  <Link
                    to={`/news/${article._id || article.id || article.slug}`}
                    className="home-africa-image-link"
                  >
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="home-africa-image-placeholder">
                        AFRICAN FOOTBALL
                      </div>
                    )}
                  </Link>

                  <div className="home-africa-card-content">
                    <span className="home-africa-tag">
                      {article.competition === "caf-champions-league"
                        ? "CAF Champions League"
                        : article.competition === "caf-confederation-cup"
                          ? "CAF Confederation Cup"
                          : article.country
                            ? article.country.replace(/-/g, " ")
                            : "African Football"}
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
                        "Read the latest African football story on Cabby Sports."}
                    </p>

                    <Link
                      to={`/news/${article._id || article.id || article.slug}`}
                      className="home-africa-read-more"
                    >
                      Read Story →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="home-africa-empty">
              <h3>African football stories coming soon</h3>
              <p>
                Check back for updates from leagues and competitions across
                Africa.
              </p>
              <Link to="/africa-football">
                Explore Africa Football →
              </Link>
            </div>
          )}
        </div>
      </section>

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
    </>
  );
};

export default Home;
