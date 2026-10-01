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

  const latestTransfers = transferData.slice(0, 3);

  return (
    <main className="football-page">

      {/* Football Hero */}
      <section className="football-hero">
        <div className="football-hero-content">
          <span>FOOTBALL</span>

          <h1>The Home of Football</h1>

          <p>
            Get the latest football news, fixtures, results,
            transfers and team updates from around the world.
          </p>

          <Link to="/news" className="football-hero-btn">
            Explore Football News →
          </Link>
        </div>
      </section>

      {/* Latest Football News */}
      <section className="football-section">
        <div className="football-section-heading">
          <div>
            <span>LATEST</span>
            <h2>Football News</h2>
          </div>

          <Link to="/news">
            View All News →
          </Link>
        </div>

        <div className="football-news-grid">
          {footballNews.map((article) => (
            <Link
              to={`/news/${article.id}`}
              className="football-news-card"
              key={article.id}
            >
              <img
                src={article.image}
                alt={article.title}
              />

              <div className="football-news-content">
                <span>{article.category}</span>

                <h3>{article.title}</h3>

                <small>{article.date}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Fixtures */}
      <section className="football-section">
        <div className="football-section-heading">
          <div>
            <span>UPCOMING</span>
            <h2>Fixtures</h2>
          </div>

          <Link to="/fixtures">
            View All Fixtures →
          </Link>
        </div>

        <div className="football-matches-grid">
          {upcomingMatches.map((match) => (
            <div className="football-match-card" key={match.id}>

              <span className="football-match-competition">
                {match.competition}
              </span>

              <p>
                {match.date} · {match.time}
              </p>

              <div className="football-match-teams">
                <strong>{match.home}</strong>

                <span>VS</span>

                <strong>{match.away}</strong>
              </div>

              <Link to={`/matches/${match.id}`}>
                Match Centre
              </Link>

            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="football-section">
        <div className="football-section-heading">
          <div>
            <span>RECENT</span>
            <h2>Results</h2>
          </div>

          <Link to="/results">
            View All Results →
          </Link>
        </div>

        <div className="football-matches-grid">
          {recentResults.map((match) => (
            <div className="football-match-card" key={match.id}>

              <span className="football-match-competition">
                {match.competition}
              </span>

              <p>{match.date}</p>

              <div className="football-result-teams">
                <div>
                  <strong>{match.home}</strong>
                  <b>{match.homeScore}</b>
                </div>

                <span>-</span>

                <div>
                  <strong>{match.away}</strong>
                  <b>{match.awayScore}</b>
                </div>
              </div>

              <Link to={`/matches/${match.id}`}>
                Match Centre
              </Link>

            </div>
          ))}
        </div>
      </section>

      {/* Transfer Updates */}
      <section className="football-section football-transfer-section">

        <div className="football-section-heading">
          <div>
            <span>TRANSFERS</span>
            <h2>Latest Transfer Updates</h2>
          </div>

          <Link to="/transfers">
            View All Transfers →
          </Link>
        </div>

        <div className="football-transfer-list">

          {latestTransfers.map((transfer) => (
            <div
              className="football-transfer-item"
              key={transfer.id}
            >
              <div>
                <strong>{transfer.player}</strong>
                <small>{transfer.date}</small>
              </div>

              <div className="football-transfer-move">
                <span>{transfer.from}</span>
                <b>→</b>
                <span>{transfer.to}</span>
              </div>

              <strong>{transfer.fee}</strong>

              <span
                className={`transfer-status ${transfer.status.toLowerCase()}`}
              >
                {transfer.status}
              </span>
            </div>
          ))}

        </div>

      </section>

    </main>
  );
};

export default Football;