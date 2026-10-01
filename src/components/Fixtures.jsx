import { Link } from "react-router-dom";
import matchData from "../data/matchData";

const Fixtures = () => {
  const fixtures = matchData.filter(
    (match) => match.status === "Upcoming"
  );

  return (
    <section className="matches-section">
      <div className="matches-heading">
        <div>
          <span>UPCOMING</span>
          <h2>Fixtures</h2>
        </div>

        <Link to="/fixtures">View All Fixtures →</Link>
      </div>

      <div className="matches-list">
        {fixtures.slice(0, 3).map((fixture) => (
          <div className="match-card" key={fixture.id}>
            <div className="match-competition">
              {fixture.competition}
            </div>

            <div className="match-date">
              <strong>{fixture.date}</strong>
              <span>{fixture.time}</span>
            </div>

            <div className="match-teams">
              <div className="match-team">
                <span>{fixture.home}</span>
              </div>

              <div className="vs">VS</div>

              <div className="match-team">
                <span>{fixture.away}</span>
              </div>
            </div>

            <Link
              to={`/matches/${fixture.id}`}
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

export default Fixtures;