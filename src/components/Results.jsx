import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResults } from "../services/api";

const Results = () => {
  const [completedMatches, setCompletedMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults();

        setCompletedMatches((data.data || []).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <section className="cabby-results-section">
      <div className="container">

        {/* Header */}
        <div className="cabby-section-header">
          <div>
            <span className="cabby-section-label">
              MATCH CENTER
            </span>

            <h2>Recent Results</h2>
          </div>

          <Link
            to="/results"
            className="cabby-view-all"
          >
            View All Results <span>→</span>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-4">
            <p>Loading results...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && completedMatches.length === 0 && (
          <div className="text-center py-4">
            <p>No recent results available.</p>
          </div>
        )}

        {/* Results */}
        {!loading && completedMatches.length > 0 && (
          <div className="cabby-results-list">

            {completedMatches.map((match) => {
              const homeWon =
                match.homeScore > match.awayScore;

              const awayWon =
                match.awayScore > match.homeScore;

              const draw =
                match.homeScore === match.awayScore;

              const matchDate = new Date(match.matchDate);

              return (
                <div
                  className="cabby-result-card"
                  key={match._id}
                >

                  {/* Competition */}
                  <div className="cabby-result-top">

                    <span className="cabby-result-competition">
                      {match.competition}
                    </span>

                    <span className="cabby-result-status">
                      {match.status?.toUpperCase()}
                    </span>

                  </div>

                  {/* Date */}
                  <div className="cabby-result-date">
                    {matchDate.toLocaleDateString()}
                  </div>

                  {/* Teams & Score */}
                  <div className="cabby-result-teams">

                    {/* Home */}
                    <div
                      className={`cabby-result-team ${
                        homeWon ? "winner" : ""
                      }`}
                    >

                      <div className="cabby-result-badge">

                        {match.homeTeam?.logo ? (
                          <img
                            src={match.homeTeam.logo}
                            alt={match.homeTeam.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          match.homeTeam?.shortName?.charAt(0) ||
                          match.homeTeam?.name?.charAt(0)
                        )}

                      </div>

                      <strong>
                        {match.homeTeam?.name || "Home Team"}
                      </strong>

                    </div>

                    {/* Score */}
                    <div className="cabby-final-score">

                      <div className="cabby-score">
                        <span>{match.homeScore}</span>

                        <b>-</b>

                        <span>{match.awayScore}</span>
                      </div>

                      <small>
                        {draw
                          ? "DRAW"
                          : homeWon
                          ? `${match.homeTeam?.name} WON`
                          : `${match.awayTeam?.name} WON`}
                      </small>

                    </div>

                    {/* Away */}
                    <div
                      className={`cabby-result-team ${
                        awayWon ? "winner" : ""
                      }`}
                    >

                      <div className="cabby-result-badge">

                        {match.awayTeam?.logo ? (
                          <img
                            src={match.awayTeam.logo}
                            alt={match.awayTeam.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          match.awayTeam?.shortName?.charAt(0) ||
                          match.awayTeam?.name?.charAt(0)
                        )}

                      </div>

                      <strong>
                        {match.awayTeam?.name || "Away Team"}
                      </strong>

                    </div>

                  </div>

                  {/* Details */}
                  <Link
                    to={`/results/${match._id}`}
                    className="cabby-result-button"
                  >
                    Match Details →
                  </Link>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
};

export default Results;