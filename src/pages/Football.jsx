import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import newsData from "../data/newsData";
import matchData from "../data/matchData";
import transferData from "../data/transferData";

const Football = () => {
  const footballNews = newsData.slice(0, 3);

  const upcomingMatches = matchData
    .filter((match) => match.status === "Upcoming")
    .slice(0, 3);

  const recentResults = matchData
    .filter((match) => match.status === "Full Time")
    .slice(0, 3);

  const latestTransfers = transferData.slice(0, 4);

  return (

    
    <main className="football-page">

<Helmet>
  <title>Football News, Fixtures, Results & Transfers | Cabby Sports</title>

  <meta
    name="description"
    content="Explore the latest football news, upcoming fixtures, match results and transfer updates from around the world, with dedicated African and grassroots football coverage on Cabby Sports."
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
    content="Stay connected with football news, fixtures, results, transfers, African football and grassroots stories."
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
    content="Get football news, fixtures, results and transfer updates, including African and grassroots football."
  />
  <meta
    name="twitter:image"
    content="https://cabbysports.vercel.app/cabby-sports-logo.png"
  />
</Helmet>

      {/* =================================
          FOOTBALL HERO
      ================================= */}
      <section className="football-page-hero">
        <div className="container">
          <div className="football-page-hero-content">

            <span className="football-page-label">
              CABBY SPORTS
            </span>

            <h1>
              Football
            </h1>

            <p>
              Stay connected with the latest football news, fixtures, results, 
              transfers and stories from around the world, with dedicated coverage of African football and the grassroots game.
            </p>
          </div>
        </div>
      </section>


      {/* =================================
          FOOTBALL NEWS
      ================================= */}
      <section className="football-news-section">
        <div className="container">

          <div className="cabby-section-header">

            <div>
              <span className="cabby-section-label">
                TOP STORIES
              </span>

              <h2>
                Football News
              </h2>
            </div>

            <Link
              to="/news"
              className="cabby-view-all"
            >
              View All News <span>→</span>
            </Link>

          </div>


          <div className="football-news-grid">

            {footballNews.map((article) => (

              <Link
                to={`/news/${article.id}`}
                className="football-news-card"
                key={article.id}
              >

                <div className="football-news-image">

                  <img
                    src={article.image}
                    alt={article.title}
                  />

                  <span>
                    {article.category}
                  </span>

                </div>


                <div className="football-news-content">

                  <small>
                    {article.date}
                  </small>

                  <h3>
                    {article.title}
                  </h3>

                  <p>
                    {article.content?.[0] ||
                      "Read the latest football updates and stories on Cabby Sports."}
                  </p>

                  <strong>
                    Read Story →
                  </strong>

                </div>

              </Link>

            ))}

          </div>

        </div>
      </section>


      {/* =================================
          FIXTURES
      ================================= */}
      <section className="football-matches-section">

        <div className="container">

          <div className="cabby-section-header">

            <div>
              <span className="cabby-section-label">
                MATCH CENTER
              </span>

              <h2>
                Upcoming Fixtures
              </h2>
            </div>

            <Link
              to="/fixtures"
              className="cabby-view-all"
            >
              All Fixtures <span>→</span>
            </Link>

          </div>


          <div className="football-match-grid">

            {upcomingMatches.map((match) => (

              <div
                className="football-match-card"
                key={match.id}
              >

                <div className="football-match-top">

                  <span>
                    {match.competition}
                  </span>

                  <strong>
                    UPCOMING
                  </strong>

                </div>


                <div className="football-match-date">

                  <b>
                    {match.date}
                  </b>

                  <span>
                    {match.time}
                  </span>

                </div>


                <div className="football-match-teams">

                  <div>
                    <span className="football-team-badge">
                      {match.home.charAt(0)}
                    </span>

                    <strong>
                      {match.home}
                    </strong>
                  </div>


                  <span className="football-vs">
                    VS
                  </span>


                  <div>
                    <span className="football-team-badge">
                      {match.away.charAt(0)}
                    </span>

                    <strong>
                      {match.away}
                    </strong>
                  </div>

                </div>


                <Link
                  to={`/matches/${match.id}`}
                  className="football-match-link"
                >
                  Match Details →
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          RESULTS
      ================================= */}
      <section className="football-results-section">

        <div className="container">

          <div className="cabby-section-header">

            <div>
              <span className="cabby-section-label">
                MATCH CENTER
              </span>

              <h2>
                Recent Results
              </h2>
            </div>

            <Link
              to="/results"
              className="cabby-view-all"
            >
              All Results <span>→</span>
            </Link>

          </div>


          <div className="football-results-grid">

            {recentResults.map((match) => (

              <div
                className="football-result-card"
                key={match.id}
              >

                <div className="football-result-top">

                  <span>
                    {match.competition}
                  </span>

                  <strong>
                    FULL TIME
                  </strong>

                </div>


                <div className="football-result-date">
                  {match.date}
                </div>


                <div className="football-result-teams">

                  <div>
                    <span className="football-team-badge">
                      {match.home.charAt(0)}
                    </span>

                    <strong>
                      {match.home}
                    </strong>
                  </div>


                  <div className="football-score">

                    <span>
                      {match.homeScore}
                    </span>

                    <b>
                      -
                    </b>

                    <span>
                      {match.awayScore}
                    </span>

                  </div>


                  <div>
                    <span className="football-team-badge">
                      {match.away.charAt(0)}
                    </span>

                    <strong>
                      {match.away}
                    </strong>
                  </div>

                </div>


                <Link
                  to={`/matches/${match.id}`}
                  className="football-match-link"
                >
                  Match Details →
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          TRANSFERS
      ================================= */}
      <section className="football-transfers-section">

        <div className="container">

          <div className="cabby-section-header">

            <div>
              <span className="cabby-section-label">
                TRANSFER CENTRE
              </span>

              <h2>
                Latest Transfers
              </h2>
            </div>

            <Link
              to="/transfers"
              className="cabby-view-all"
            >
              All Transfers <span>→</span>
            </Link>

          </div>


          <div className="football-transfer-list">

            {latestTransfers.map((transfer) => (

              <div
                className="football-transfer-card"
                key={transfer.id}
              >

                <div className="football-transfer-player">

                  <div className="football-player-avatar">
                    {transfer.player.charAt(0)}
                  </div>

                  <div>

                    <h3>
                      {transfer.player}
                    </h3>

                    <small>
                      {transfer.date}
                    </small>

                  </div>

                </div>


                <div className="football-transfer-route">

                  <span>
                    {transfer.from}
                  </span>

                  <strong>
                    →
                  </strong>

                  <span>
                    {transfer.to}
                  </span>

                </div>


                <div className="football-transfer-info">

                  <strong>
                    {transfer.fee}
                  </strong>

                  <span
                    className={
                      transfer.status === "Completed"
                        ? "completed"
                        : "rumour"
                    }
                  >
                    {transfer.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          FOOTBALL CTA
      ================================= */}
      <section className="football-cta-section">

        <div className="container">

          <div className="football-cta">

            <div>

              <span>
                STAY CONNECTED
              </span>

              <h2>
                Never Miss A Football Story
              </h2>

              <p>
                Follow Cabby Sports and Stay connected with the latest football news, fixtures, results,
                 transfers and stories from around the world, including Africa and the grassroots game where the passion begins.
              </p>

            </div>


            <Link
              to="/news"
              className="football-cta-button"
            >
              Explore Football News →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Football;