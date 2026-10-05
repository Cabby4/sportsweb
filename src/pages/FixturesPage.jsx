import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFixtures } from "../services/api";

const FixturesPage = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const data = await getFixtures();

        setFixtures(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading fixtures...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">{error}</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">Upcoming Fixtures</h1>

        <p className="text-muted">
          Stay updated with upcoming football matches.
        </p>
      </div>

      {fixtures.length === 0 ? (
        <div className="alert alert-info">
          No upcoming fixtures available.
        </div>
      ) : (
        <div className="row g-4">

          {fixtures.map((fixture) => (

            <div
              className="col-12 col-md-6 col-lg-4"
              key={fixture._id}
            >

              <div className="card h-100 shadow-sm border-0">

                <div className="card-body">

                  <div className="text-center mb-3">

                    <span className="badge bg-success">
                      {fixture.competition}
                    </span>

                  </div>

                  {/* Teams */}
                  <div className="row align-items-center text-center">

                    {/* Home Team */}
                    <div className="col-5">

                      {fixture.homeTeam?.logo && (
                        <img
                          src={fixture.homeTeam.logo}
                          alt={fixture.homeTeam.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                          }}
                        />
                      )}

                      <h6 className="fw-bold mt-2">
                        {fixture.homeTeam?.name || "Home Team"}
                      </h6>

                    </div>

                    {/* VS */}
                    <div className="col-2">

                      <span className="fw-bold text-muted">
                        VS
                      </span>

                    </div>

                    {/* Away Team */}
                    <div className="col-5">

                      {fixture.awayTeam?.logo && (
                        <img
                          src={fixture.awayTeam.logo}
                          alt={fixture.awayTeam.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                          }}
                        />
                      )}

                      <h6 className="fw-bold mt-2">
                        {fixture.awayTeam?.name || "Away Team"}
                      </h6>

                    </div>

                  </div>

                  <hr />

                  {/* Match Date */}
                  <div className="text-center">

                    <p className="mb-1">
                      <strong>Date</strong>
                    </p>

                    <p className="text-muted">
                      {new Date(
                        fixture.matchDate
                      ).toLocaleString()}
                    </p>

                  </div>

                  {/* Venue */}
                  {fixture.venue && (
                    <p className="text-center text-muted mb-2">
                      📍 {fixture.venue}
                    </p>
                  )}

                  {/* Matchweek */}
                  {fixture.matchweek && (
                    <p className="text-center text-muted">
                      Matchweek {fixture.matchweek}
                    </p>
                  )}

                  <div className="text-center mt-3">

                    <Link
                      to={`/matches/${fixture._id}`}
                      className="btn btn-dark"
                    >
                      Match Details
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default FixturesPage;