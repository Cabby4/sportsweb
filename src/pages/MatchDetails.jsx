
import { Link, useParams } from "react-router-dom";
import matchData from "../data/matchData";

const matches = [
  {
    id: 1,
    competition: "Premier League",
    date: "Saturday, 04 October",
    time: "15:00",
    home: "Chelsea",
    away: "Arsenal",
    status: "Upcoming",
    homeScore: null,
    awayScore: null,
  },
  {
    id: 2,
    competition: "La Liga",
    date: "Sunday, 05 October",
    time: "20:00",
    home: "Barcelona",
    away: "Real Madrid",
    status: "Upcoming",
    homeScore: null,
    awayScore: null,
  },
  {
    id: 3,
    competition: "Premier League",
    date: "Wednesday, 01 October",
    time: "20:00",
    home: "Liverpool",
    away: "Chelsea",
    status: "Full Time",
    homeScore: 2,
    awayScore: 1,
  },
];

const MatchDetails = () => {
  const { id } = useParams();

  const match = matchData.find(
  (match) => match.id === Number(id)
);

  if (!match) {
    return (
      <div className="not-found">
        <h2>Match Not Found</h2>
        <Link to="/fixtures">← Back to Fixtures</Link>
      </div>
    );
  }

  return (
    <main className="match-details">

      {/* Match Header */}
      <section className="match-details-header">

        <span className="match-details-competition">
          {match.competition}
        </span>

        <span className="match-status">
          {match.status}
        </span>

        <p>
          {match.date} · {match.time}
        </p>

        <div className="match-scoreboard">

          <div className="match-details-team">
            <div className="team-logo-placeholder">
              ⚽
            </div>

            <h2>{match.home}</h2>
          </div>

          <div className="match-main-score">
            {match.homeScore !== null ? (
              <>
                <strong>{match.homeScore}</strong>
                <span>-</span>
                <strong>{match.awayScore}</strong>
              </>
            ) : (
              <span className="vs-large">VS</span>
            )}
          </div>

          <div className="match-details-team">
            <div className="team-logo-placeholder">
              ⚽
            </div>

            <h2>{match.away}</h2>
          </div>

        </div>
      </section>

      {/* Match Information */}
      <section className="match-info-grid">

        <div className="match-info-card">
          <h3>Match Information</h3>

          <div className="match-info-row">
            <span>Competition</span>
            <strong>{match.competition}</strong>
          </div>

          <div className="match-info-row">
            <span>Date</span>
            <strong>{match.date}</strong>
          </div>

          <div className="match-info-row">
            <span>Kick-off</span>
            <strong>{match.time}</strong>
          </div>

          <div className="match-info-row">
            <span>Status</span>
            <strong>{match.status}</strong>
          </div>
        </div>

        <div className="match-info-card">
          <h3>Match Stats</h3>

          <div className="stat-row">
            <span>Possession</span>
            <strong>50% - 50%</strong>
          </div>

          <div className="stat-row">
            <span>Shots</span>
            <strong>0 - 0</strong>
          </div>

          <div className="stat-row">
            <span>Shots on Target</span>
            <strong>0 - 0</strong>
          </div>

          <div className="stat-row">
            <span>Corners</span>
            <strong>0 - 0</strong>
          </div>
        </div>

      </section>

      {/* Match Events */}
      <section className="match-events">
        <h2>Match Events</h2>

        <div className="empty-events">
          {match.status === "Upcoming" ? (
            <p>Match events will appear here during the game.</p>
          ) : (
            <p>No match events have been added yet.</p>
          )}
        </div>
      </section>

      <Link to="/fixtures" className="back-matches">
        ← Back to Fixtures
      </Link>

    </main>
  );
};

export default MatchDetails;