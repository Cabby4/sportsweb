import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeams } from "../services/api";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();

        setTeams(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading teams...</h4>
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
        <h1 className="fw-bold">Football Teams</h1>
        <p className="text-muted">
          Explore teams, leagues and club information.
        </p>
      </div>

      <div className="row g-4">
        {teams.map((team) => (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={team._id}>
            <div className="card h-100 shadow-sm">
              <div className="text-center pt-4">
                {team.logo ? (
                  <img
                    src={team.logo}
                    alt={team.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    className="bg-light mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    No Logo
                  </div>
                )}
              </div>

              <div className="card-body text-center">
                <h5 className="card-title fw-bold">
                  {team.name}
                </h5>

                <p className="text-muted mb-1">
                  {team.shortName}
                </p>

                <p className="mb-3">
                  {team.league}
                </p>

                <Link
                  to={`/teams/${team._id}`}
                  className="btn btn-dark"
                >
                  View Team
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;