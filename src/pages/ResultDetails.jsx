import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getResultById } from "../services/api";

const ResultDetails = () => {
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getResultById(id);

        setResult(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading result...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">{error}</h4>

        <Link to="/results" className="btn btn-dark mt-3">
          Back to Results
        </Link>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container py-5 text-center">
        <h4>Result not found</h4>

        <Link to="/results" className="btn btn-dark mt-3">
          Back to Results
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <Link to="/results" className="btn btn-outline-dark mb-4">
        ← Back to Results
      </Link>

      <div className="card border-0 shadow-sm">

        <div className="card-body p-4 p-md-5">

          {/* Competition */}
          <div className="text-center mb-4">

            <span className="badge bg-dark px-3 py-2">
              {result.competition}
            </span>

            <p className="text-muted mt-2">
              {new Date(result.matchDate).toLocaleDateString()}
            </p>

          </div>

          {/* Teams */}
          <div className="row align-items-center text-center">

            {/* Home */}
            <div className="col-5">

              {result.homeTeam?.logo && (
                <img
                  src={result.homeTeam.logo}
                  alt={result.homeTeam.name}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "contain",
                  }}
                />
              )}

              <h2 className="fw-bold mt-3">
                {result.homeTeam?.name}
              </h2>

            </div>

            {/* Score */}
            <div className="col-2">

              <div className="display-5 fw-bold">
                {result.homeScore}
              </div>

              <div className="text-muted fw-bold">
                -
              </div>

              <div className="display-5 fw-bold">
                {result.awayScore}
              </div>

            </div>

            {/* Away */}
            <div className="col-5">

              {result.awayTeam?.logo && (
                <img
                  src={result.awayTeam.logo}
                  alt={result.awayTeam.name}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "contain",
                  }}
                />
              )}

              <h2 className="fw-bold mt-3">
                {result.awayTeam?.name}
              </h2>

            </div>

          </div>

          <hr className="my-4" />

          {/* Information */}
          <div className="row text-center">

            <div className="col-md-4 mb-3">

              <h6 className="fw-bold">
                Date
              </h6>

              <p className="text-muted">
                {new Date(
                  result.matchDate
                ).toLocaleString()}
              </p>

            </div>

            <div className="col-md-4 mb-3">

              <h6 className="fw-bold">
                Venue
              </h6>

              <p className="text-muted">
                {result.venue || "Not available"}
              </p>

            </div>

            <div className="col-md-4 mb-3">

              <h6 className="fw-bold">
                Status
              </h6>

              <span className="badge bg-success">
                {result.status}
              </span>

            </div>

          </div>

          {result.description && (
            <div className="border-top pt-4 mt-3">

              <h5 className="fw-bold">
                Match Report
              </h5>

              <p className="text-muted">
                {result.description}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ResultDetails;