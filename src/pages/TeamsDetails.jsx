import { Link, useParams } from "react-router-dom";
import teamData from "../data/TeamData";
import matchData from "../data/matchData";
import newsData from "../data/newsData";

const TeamDetails = () => {
  const { id } = useParams();

  const team = teamData.find(
    (team) => team.id === Number(id)
  );

  if (!team) {
    return (
      <main className="not-found">
        <h2>Team Not Found</h2>
        <Link to="/teams">← Back to Teams</Link>
      </main>
    );
  }

  const teamMatches = matchData.filter(
    (match) =>
      match.home === team.name ||
      match.away === team.name
  );

  const upcomingMatches = teamMatches.filter(
    (match) => match.status === "Upcoming"
  );

  const recentResults = teamMatches.filter(
    (match) => match.status === "Full Time"
  );

  return (
    <main className="team-details-page">

      {/* Team Header */}

      <section className="team-details-header">

        <div className="team-details-logo">
          {team.logo}
        </div>

        <div>
          <span>{team.league}</span>

          <h1>{team.name}</h1>

          <p>{team.country}</p>
        </div>

      </section>

      {/* Team Information */}

      <section className="team-info-grid">

        <div>
          <span>FOUNDED</span>
          <strong>{team.founded}</strong>
        </div>

        <div>
          <span>STADIUM</span>
          <strong>{team.stadium}</strong>
        </div>

        <div>
          <span>MANAGER</span>
          <strong>{team.manager}</strong>
        </div>

        <div>
          <span>LEAGUE</span>
          <strong>{team.league}</strong>
        </div>

      </section>

      <div className="team-content-grid">

        {/* Fixtures */}

        <section className="team-panel">

          <div className="team-panel-heading">
            <div>
              <span>UPCOMING</span>
              <h2>Fixtures</h2>
            </div>

            <Link to="/fixtures">
              View All
            </Link>
          </div>

          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <div
                className="team-match"
                key={match.id}
              >
                <div>
                  <small>{match.competition}</small>
                  <p>{match.date}</p>
                </div>

                <strong>
                  {match.home}
                  <br />
                  vs
                  <br />
                  {match.away}
                </strong>

                <Link to={`/matches/${match.id}`}>
                  View
                </Link>
              </div>
            ))
          ) : (
            <p className="team-empty">
              No upcoming fixtures.
            </p>
          )}

        </section>

        {/* Results */}

        <section className="team-panel">

          <div className="team-panel-heading">
            <div>
              <span>RECENT</span>
              <h2>Results</h2>
            </div>

            <Link to="/results">
              View All
            </Link>
          </div>

          {recentResults.length > 0 ? (
            recentResults.map((match) => (
              <div
                className="team-match"
                key={match.id}
              >
                <div>
                  <small>{match.competition}</small>
                  <p>{match.date}</p>
                </div>

                <strong>
                  {match.home}
                  <br />
                  {match.homeScore} - {match.awayScore}
                  <br />
                  {match.away}
                </strong>

                <Link to={`/matches/${match.id}`}>
                  View
                </Link>
              </div>
            ))
          ) : (
            <p className="team-empty">
              No recent results.
            </p>
          )}

        </section>

      </div>

      {/* Latest News */}

      <section className="team-panel team-news-panel">

        <div className="team-panel-heading">
          <div>
            <span>NEWS</span>
            <h2>Latest News</h2>
          </div>

          <Link to="/news">
            View All News
          </Link>
        </div>

        <div className="team-news-grid">

          {newsData.slice(0, 3).map((article) => (
            <Link
              to={`/news/${article.id}`}
              className="team-news-card"
              key={article.id}
            >
              <img
                src={article.image}
                alt={article.title}
              />

              <div>
                <span>{article.category}</span>

                <h3>{article.title}</h3>

                <small>{article.date}</small>
              </div>
            </Link>
          ))}

        </div>

      </section>

      <Link
        to="/teams"
        className="back-to-teams"
      >
        ← Back to Teams
      </Link>

    </main>
  );
};

export default TeamDetails;