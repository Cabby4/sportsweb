import { Link } from "react-router-dom";
import matchData from "../data/matchData";

const Results = () => {
  const results = matchData.filter(
    (match) => match.status === "Full Time"
  );

  return (
    <section className="matches-section results-section">
      <div className="matches-heading">
        <div>
          <span>RECENT</span>
          <h2>Results</h2>
        </div>

        <Link to="/results">View All Results →</Link>
      </div>

      <div className="matches-list">
        {results.slice(0, 3).map((result) => (
          <div className="match-card" key={result.id}>
            <div className="match-competition">
              {result.competition}
            </div>

            <div className="match-date">
              <strong>{result.date}</strong>
              <span>Full Time</span>
            </div>

            <div className="match-teams">
              <div className="match-team">
                <span>{result.home}</span>
                <strong>{result.homeScore}</strong>
              </div>

              <div className="vs">-</div>

              <div className="match-team">
                <span>{result.away}</span>
                <strong>{result.awayScore}</strong>
              </div>
            </div>

            <Link
              to={`/matches/${result.id}`}
              className="match-centre-btn"
            >
              Match Centre
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Results;