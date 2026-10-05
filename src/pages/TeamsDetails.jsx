import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTeamById } from "../services/api";

const TeamDetails = () => {
  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeamById(id);
        setTeam(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading team...</h4>
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

  if (!team) {
    return (
      <div className="container py-5 text-center">
        <h4>Team not found</h4>
        <Link to="/teams" className="btn btn-dark mt-3">
          Back to Teams
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <Link to="/teams" className="btn btn-outline-dark mb-4">
        ← Back to Teams
      </Link>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">

          <div className="row align-items-center">

            {/* Team Logo */}
            <div className="col-md-4 text-center mb-4 mb-md-0">

              {team.logo ? (
                <img
                  src={team.logo}
                  alt={team.name}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  className="bg-light mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "180px",
                    height: "180px",
                  }}
                >
                  No Logo
                </div>
              )}

            </div>

            {/* Team Information */}
            <div className="col-md-8">

              <span className="badge bg-success mb-2">
                {team.league}
              </span>

              <h1 className="fw-bold">
                {team.name}
              </h1>

              <p className="text-muted fs-5">
                {team.shortName}
              </p>

              <hr />

              <div className="row">

                <div className="col-sm-6 mb-3">
                  <strong>Country</strong>
                  <p className="text-muted mb-0">
                    {team.country || "N/A"}
                  </p>
                </div>

                <div className="col-sm-6 mb-3">
                  <strong>Stadium</strong>
                  <p className="text-muted mb-0">
                    {team.stadium || "N/A"}
                  </p>
                </div>

                <div className="col-sm-6 mb-3">
                  <strong>Founded</strong>
                  <p className="text-muted mb-0">
                    {team.founded || "N/A"}
                  </p>
                </div>

                <div className="col-sm-6 mb-3">
                  <strong>League</strong>
                  <p className="text-muted mb-0">
                    {team.league || "N/A"}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Description */}
          {team.description && (
            <div className="mt-4 pt-4 border-top">
              <h4 className="fw-bold">About {team.name}</h4>

              <p className="text-muted">
                {team.description}
              </p>
            </div>
          )}

          {/* Official Website */}
          {team.website && (
            <div className="mt-3">
              <a
                href={team.website}
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark"
              >
                Official Website
              </a>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default TeamDetails;