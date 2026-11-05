
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  getNews,
  getFixtures,
  getResults,
  getTransfers,
} from "../services/api";

const getList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

const getTeamName = (team) => {
  if (!team) return "TBC";
  if (typeof team === "string") return team;
  return team.name || team.shortName || "TBC";
};

const getInitial = (team) => getTeamName(team).charAt(0).toUpperCase();

const formatDate = (date) => {
  if (!date) return "Date TBC";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return String(date);

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date) => {
  if (!date) return "Time TBC";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Time TBC";

  return parsedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Football = () => {
  const [footballNews, setFootballNews] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [latestTransfers, setLatestTransfers] = useState([]);

  const [loading, setLoading] = useState({
    news: true,
    fixtures: true,
    results: true,
    transfers: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let isMounted = true;

    const loadSection = async (section, request, onSuccess) => {
      try {
        const response = await request();

        if (isMounted) {
          onSuccess(getList(response));
        }
      } catch (error) {
        console.error(`Failed to load ${section}:`, error);

        if (isMounted) {
          setErrors((previous) => ({
            ...previous,
            [section]: `${section} are temporarily unavailable.`,
          }));
        }
      } finally {
        if (isMounted) {
          setLoading((previous) => ({
            ...previous,
            [section]: false,
          }));
        }
      }
    };

    loadSection(
      "news",
      () => getNews({ section: "football", limit: 3 }),
      setFootballNews
    );

    loadSection("fixtures", getFixtures, (data) => {
      const now = Date.now();

      const upcoming = data
        .filter((match) => {
          const status = String(match.status || "").toLowerCase();
          const matchTime = new Date(match.matchDate).getTime();

          return (
            status === "scheduled" &&
            Number.isFinite(matchTime) &&
            matchTime >= now
          );
        })
        .sort(
          (a, b) =>
            new Date(a.matchDate).getTime() -
            new Date(b.matchDate).getTime()
        )
        .slice(0, 3);

      setUpcomingMatches(upcoming);
    });

    loadSection("results", getResults, (data) => {
      const completed = data
        .filter(
          (match) =>
            String(match.status || "").toLowerCase() === "completed"
        )
        .sort(
          (a, b) =>
            new Date(b.matchDate).getTime() -
            new Date(a.matchDate).getTime()
        )
        .slice(0, 3);

      setRecentResults(completed);
    });

    loadSection("transfers", getTransfers, (data) => {
      const transfers = data
        .filter(
          (transfer) =>
            String(transfer.status || "").toLowerCase() !== "cancelled"
        )
        .sort(
          (a, b) =>
            new Date(b.transferDate).getTime() -
            new Date(a.transferDate).getTime()
        )
        .slice(0, 4);

      setLatestTransfers(transfers);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="football-page">
      <Helmet>
        <title>
          Football News, Fixtures, Results & Transfers | Cabby Sports
        </title>

        <meta
          name="description"
          content="Explore football news, upcoming fixtures, match results and transfer updates, with dedicated African and grassroots football coverage on Cabby Sports."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://cabbysports.vercel.app/football"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cabby Sports" />

        <meta
          property="og:title"
          content="Football News, Fixtures, Results & Transfers | Cabby Sports"
        />

        <meta
          property="og:description"
          content="Football news, fixtures, results, transfers, African football and grassroots stories."
        />

        <meta
          property="og:url"
          content="https://cabbysports.vercel.app/football"
        />

        <meta
          property="og:image"
          content="https://cabbysports.vercel.app/cabby-sports-logo.png"
        />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Football News, Fixtures, Results & Transfers | Cabby Sports"
        />

        <meta
          name="twitter:description"
          content="Football news, fixtures, results and transfer updates, including African and grassroots football."
        />

        <meta
          name="twitter:image"
          content="https://cabbysports.vercel.app/cabby-sports-logo.png"
        />
      </Helmet>

      {/* FOOTBALL HERO */}
      <section className="football-page-hero">
        <div className="container">
          <div className="football-page-hero-content">
            <span className="football-page-label">
              CABBY SPORTS
            </span>

            <h1>Football</h1>

            <p>
              Stay connected with the latest football news, fixtures,
              results, transfers and stories from around the world,
              with dedicated coverage of African football and the
              grassroots game.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTBALL NEWS */}
      <section className="football-news-section">
        <div className="container">
          <div className="cabby-section-header">
            <div>
              <span className="cabby-section-label">
                TOP STORIES
              </span>

              <h2>Football News</h2>
            </div>

            <Link to="/news" className="cabby-view-all">
              View All News <span>→</span>
            </Link>
          </div>

          <div className="football-news-grid">
            {loading.news ? (
              <p>Loading football news...</p>
            ) : errors.news ? (
              <p role="alert">{errors.news}</p>
            ) : footballNews.length === 0 ? (
              <p>No football articles are available yet.</p>
            ) : (
              footballNews.map((article) => {
                const articleId = article._id || article.id;

                const description =
                  article.excerpt ||
                  article.summary ||
                  article.description ||
                  (Array.isArray(article.content)
                    ? article.content[0]
                    : article.content) ||
                  "Read the latest football updates on Cabby Sports.";

                return (
                  <Link
                    to={`/news/${articleId}`}
                    className="football-news-card"
                    key={articleId}
                  >
                    <div className="football-news-image">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title || "Football news"}
                          loading="lazy"
                        />
                      ) : (
                        <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center">
                          No Image
                        </div>
                      )}

                      <span>{article.category || "Football"}</span>
                    </div>

                    <div className="football-news-content">
                      <small>
                        {formatDate(article.createdAt || article.date)}
                      </small>

                      <h3>{article.title}</h3>

                      <p>{description}</p>

                      <strong>Read Story →</strong>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* UPCOMING FIXTURES */}
      <section className="football-matches-section">
        <div className="container">
          <div className="cabby-section-header">
            <div>
              <span className="cabby-section-label">
                MATCH CENTER
              </span>

              <h2>Upcoming Fixtures</h2>
            </div>

            <Link to="/fixtures" className="cabby-view-all">
              All Fixtures <span>→</span>
            </Link>
          </div>

          <div className="football-match-grid">
            {loading.fixtures ? (
              <p>Loading upcoming fixtures...</p>
            ) : errors.fixtures ? (
              <p role="alert">{errors.fixtures}</p>
            ) : upcomingMatches.length === 0 ? (
              <p>No upcoming fixtures are available yet.</p>
            ) : (
              upcomingMatches.map((match) => (
                <div
                  className="football-match-card"
                  key={match._id || match.id}
                >
                  <div className="football-match-top">
                    <span>{match.competition || "Football"}</span>
                    <strong>UPCOMING</strong>
                  </div>

                  <div className="football-match-date">
                    <b>{formatDate(match.matchDate)}</b>
                    <span>{formatTime(match.matchDate)}</span>
                  </div>

                  <div className="football-match-teams">
                    <div>
                      <span className="football-team-badge">
                        {getInitial(match.homeTeam)}
                      </span>

                      <strong>{getTeamName(match.homeTeam)}</strong>
                    </div>

                    <span className="football-vs">VS</span>

                    <div>
                      <span className="football-team-badge">
                        {getInitial(match.awayTeam)}
                      </span>

                      <strong>{getTeamName(match.awayTeam)}</strong>
                    </div>
                  </div>

                  <Link
                    to={`/matches/${match._id || match.id}`}
                    className="football-match-link"
                  >
                    Match Details →
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* RECENT RESULTS */}
      <section className="football-results-section">
        <div className="container">
          <div className="cabby-section-header">
            <div>
              <span className="cabby-section-label">
                MATCH CENTER
              </span>

              <h2>Recent Results</h2>
            </div>

            <Link to="/results" className="cabby-view-all">
              All Results <span>→</span>
            </Link>
          </div>

          <div className="football-results-grid">
            {loading.results ? (
              <p>Loading recent results...</p>
            ) : errors.results ? (
              <p role="alert">{errors.results}</p>
            ) : recentResults.length === 0 ? (
              <p>No completed match results are available yet.</p>
            ) : (
              recentResults.map((match) => (
                <div
                  className="football-result-card"
                  key={match._id || match.id}
                >
                  <div className="football-result-top">
                    <span>{match.competition || "Football"}</span>
                    <strong>FULL TIME</strong>
                  </div>

                  <div className="football-result-date">
                    {formatDate(match.matchDate)}
                  </div>

                  <div className="football-result-teams">
                    <div>
                      <span className="football-team-badge">
                        {getInitial(match.homeTeam)}
                      </span>

                      <strong>{getTeamName(match.homeTeam)}</strong>
                    </div>

                    <div className="football-score">
                      <span>{match.homeScore ?? 0}</span>
                      <b>-</b>
                      <span>{match.awayScore ?? 0}</span>
                    </div>

                    <div>
                      <span className="football-team-badge">
                        {getInitial(match.awayTeam)}
                      </span>

                      <strong>{getTeamName(match.awayTeam)}</strong>
                    </div>
                  </div>

                  <Link
                    to={`/matches/${match._id || match.id}`}
                    className="football-match-link"
                  >
                    Match Details →
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* LATEST TRANSFERS */}
      <section className="football-transfers-section">
        <div className="container">
          <div className="cabby-section-header">
            <div>
              <span className="cabby-section-label">
                TRANSFER CENTRE
              </span>

              <h2>Latest Transfers</h2>
            </div>

            <Link to="/transfers" className="cabby-view-all">
              All Transfers <span>→</span>
            </Link>
          </div>

          <div className="football-transfer-list">
            {loading.transfers ? (
              <p>Loading transfers...</p>
            ) : errors.transfers ? (
              <p role="alert">{errors.transfers}</p>
            ) : latestTransfers.length === 0 ? (
              <p>No transfer records are available yet.</p>
            ) : (
              latestTransfers.map((transfer) => (
                <div
                  className="football-transfer-card"
                  key={transfer._id || transfer.id}
                >
                  <div className="football-transfer-player">
                    <div className="football-player-avatar">
                      {(transfer.playerName || "P").charAt(0)}
                    </div>

                    <div>
                      <h3>{transfer.playerName || "Unknown player"}</h3>

                      <small>{formatDate(transfer.transferDate)}</small>
                    </div>
                  </div>

                  <div className="football-transfer-route">
                    <span>{getTeamName(transfer.fromClub)}</span>
                    <strong>→</strong>
                    <span>{getTeamName(transfer.toClub)}</span>
                  </div>

                  <div className="football-transfer-info">
                    <strong>
                      {transfer.transferFee || "Undisclosed"}
                    </strong>

                    <span
                      className={
                        String(transfer.status).toLowerCase() === "completed"
                          ? "completed"
                          : "rumour"
                      }
                    >
                      {transfer.status || "Status unknown"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FOOTBALL CALL TO ACTION */}
      <section className="football-cta-section">
        <div className="container">
          <div className="football-cta">
            <div>
              <span>STAY CONNECTED</span>

              <h2>Never Miss A Football Story</h2>

              <p>
                Follow Cabby Sports and stay connected with football
                news, fixtures, results and transfers from around the
                world, including Africa and the grassroots game where
                the passion begins.
              </p>
            </div>

            <Link to="/news" className="football-cta-button">
              Explore Football News →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Football;