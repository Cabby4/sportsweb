import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResults } from "../services/api";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults();

        setResults(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading results...</h4>
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
        <h1 className="fw-bold">Latest Results</h1>

        <p className="text-muted">
          Check the latest football match results.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="alert alert-info">
          No results available.
        </div>
      ) : (
        <div className="row g-4">

          {results.map((result) => (

            <div
              className="col-12 col-md-6 col-lg-4"
              key={result._id}
            >

              <div className="card h-100 shadow-sm border-0">

                <div className="card-body">

                  {/* Competition */}
                  <div className="text-center mb-3">

                    <span className="badge bg-dark">
                      {result.competition}
                    </span>

                  </div>

                  {/* Teams and Score */}
                  <div className="row align-items-center text-center">

                    {/* Home Team */}
                    <div className="col-5">

                      {result.homeTeam?.logo && (
                        <img
                          src={result.homeTeam.logo}
                          alt={result.homeTeam.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                          }}
                        />
                      )}

                      <h6 className="fw-bold mt-2">
                        {result.homeTeam?.name || "Home Team"}
                      </h6>

                    </div>

                    {/* Score */}
                    <div className="col-2">

                      <h4 className="fw-bold mb-0">
                        {result.homeScore}
                        {" - "}
                        {result.awayScore}
                      </h4>

                    </div>

                    {/* Away Team */}
                    <div className="col-5">

                      {result.awayTeam?.logo && (
                        <img
                          src={result.awayTeam.logo}
                          alt={result.awayTeam.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "contain",
                          }}
                        />
                      )}

                      <h6 className="fw-bold mt-2">
                        {result.awayTeam?.name || "Away Team"}
                      </h6>

                    </div>

                  </div>

                  <hr />

                  {/* Date */}
                  <div className="text-center">

                    <p className="mb-1">
                      <strong>Match Date</strong>
                    </p>

                    <p className="text-muted">
                      {new Date(
                        result.matchDate
                      ).toLocaleString()}
                    </p>

                  </div>

                  {/* Venue */}
                  {result.venue && (
                    <p className="text-center text-muted">
                      📍 {result.venue}
                    </p>
                  )}

                  {/* Status */}
                  <div className="text-center mb-3">

                    <span className="badge bg-success">
                      {result.status}
                    </span>

                  </div>

                  <div className="text-center">

                    <Link
                      to={`/results/${result._id}`}
                      className="btn btn-dark"
                    >
                      View Result
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

export default ResultsPage;