import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFixtures } from "../services/api";

const Fixtures = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const data = await getFixtures();

        setUpcomingMatches((data.data || []).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch fixtures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  return (
    <section className="cabby-fixtures-section">
      <div className="container">

        {/* Header */}
        <div className="cabby-section-header">
          <div>
            <span className="cabby-section-label">
              MATCH CENTER
            </span>

            <h2>Upcoming Fixtures</h2>
          </div>

          <Link
            to="/fixtures"
            className="cabby-view-all"
          >
            View All Fixtures <span>→</span>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-4">
            <p>Loading fixtures...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && upcomingMatches.length === 0 && (
          <div className="text-center py-4">
            <p>No upcoming fixtures available.</p>
          </div>
        )}

        {/* Fixtures */}
        {!loading && upcomingMatches.length > 0 && (
          <div className="cabby-fixtures-list">

            {upcomingMatches.map((match) => {
              const matchDate = new Date(match.matchDate);

              return (
                <div
                  className="cabby-fixture-card"
                  key={match._id}
                >

                  {/* Competition */}
                  <div className="cabby-fixture-top">

                    <span className="cabby-fixture-competition">
                      {match.competition}
                    </span>

                    <span className="cabby-fixture-status">
                      {match.status?.toUpperCase()}
                    </span>

                  </div>

                  {/* Date & Time */}
                  <div className="cabby-fixture-date">

                    <strong>
                      {matchDate.toLocaleDateString()}
                    </strong>

                    <span>
                      {matchDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                  </div>

                  {/* Teams */}
                  <div className="cabby-fixture-teams">

                    {/* Home Team */}
                    <div className="cabby-team">

                      <div className="cabby-team-badge">

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

                    {/* VS */}
                    <div className="cabby-vs">
                      VS
                    </div>

                    {/* Away Team */}
                    <div className="cabby-team">

                      <div className="cabby-team-badge">

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

                  {/* Match Link */}
                  <Link
                    to={`/matches/${match._id}`}
                    className="cabby-match-button"
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

export default Fixtures;