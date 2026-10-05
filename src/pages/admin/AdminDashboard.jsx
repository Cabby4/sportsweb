import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getNews,
  getTeams,
  getFixtures,
  getResults,
  getTransfers,
} from "../../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    news: 0,
    teams: 0,
    fixtures: 0,
    results: 0,
    transfers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(
    localStorage.getItem("cabbyUser") || "null"
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          newsResponse,
          teamsResponse,
          fixturesResponse,
          resultsResponse,
          transfersResponse,
        ] = await Promise.all([
          getNews(),
          getTeams(),
          getFixtures(),
          getResults(),
          getTransfers(),
        ]);

        setStats({
          news: newsResponse.total ?? newsResponse.data?.length ?? 0,
          teams: teamsResponse.total ?? teamsResponse.data?.length ?? 0,
          fixtures:
            fixturesResponse.total ??
            fixturesResponse.data?.length ??
            0,
          results:
            resultsResponse.total ??
            resultsResponse.data?.length ??
            0,
          transfers:
            transfersResponse.total ??
            transfersResponse.data?.length ??
            0,
        });
      } catch (error) {
        console.error(
          "Failed to load dashboard stats:",
          error
        );

        setError(
          error.message ||
            "Failed to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cabbyToken");
    localStorage.removeItem("cabbyUser");

    navigate("/admin/login");
  };

  const statCards = [
    {
      title: "News",
      value: stats.news,
      icon: "📰",
      description: "Published articles",
      link: "/admin/news",
    },
    {
      title: "Teams",
      value: stats.teams,
      icon: "⚽",
      description: "Football teams",
      link: "/admin/teams",
    },
    {
      title: "Fixtures",
      value: stats.fixtures,
      icon: "📅",
      description: "Upcoming matches",
      link: "/admin/fixtures",
    },
    {
      title: "Results",
      value: stats.results,
      icon: "🏆",
      description: "Match results",
      link: "/admin/results",
    },
    {
      title: "Transfers",
      value: stats.transfers,
      icon: "🔄",
      description: "Transfer records",
      link: "/admin/transfers",
    },
  ];

  return (
    <div className="container py-5">

      {/* HEADER */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">

        <div>
          <span className="text-success fw-bold">
            CABBY SPORTS
          </span>

          <h1 className="fw-bold mb-1">
            Admin Dashboard
          </h1>

          <p className="text-muted mb-0">
            Welcome back,{" "}
            <strong>
              {user?.name || "Administrator"}
            </strong>
          </p>
        </div>

        <div className="d-flex gap-2">

          <Link
            to="/"
            className="btn btn-outline-dark"
          >
            View Website
          </Link>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* STAT CARDS */}

      <div className="row g-4 mb-5">

        {statCards.map((card) => (
          <div
            className="col-sm-6 col-lg"
            key={card.title}
          >
            <Link
              to={card.link}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-start">

                    <div>
                      <p className="text-muted mb-1">
                        {card.title}
                      </p>

                      <h2 className="fw-bold mb-1">
                        {loading ? "..." : card.value}
                      </h2>

                      <small className="text-muted">
                        {card.description}
                      </small>
                    </div>

                    <div
                      className="fs-2"
                      style={{
                        lineHeight: 1,
                      }}
                    >
                      {card.icon}
                    </div>

                  </div>

                </div>
              </div>
            </Link>
          </div>
        ))}

      </div>

      {/* CONTENT MANAGEMENT */}

      <div className="mb-4">
        <h3 className="fw-bold">
          Content Management
        </h3>

        <p className="text-muted">
          Manage everything published on Cabby Sports.
        </p>
      </div>

      <div className="row g-4">

        {statCards.map((card) => (
          <div
            className="col-md-6 col-lg-4"
            key={`management-${card.title}`}
          >
            <div className="card h-100 shadow-sm border-0">

              <div className="card-body p-4">

                <div className="fs-1 mb-3">
                  {card.icon}
                </div>

                <h4 className="fw-bold">
                  Manage {card.title}
                </h4>

                <p className="text-muted">
                  {card.description} and keep your
                  Cabby Sports content up to date.
                </p>

                <Link
                  to={card.link}
                  className="btn btn-dark"
                >
                  Manage {card.title}
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* QUICK INFO */}

      <div className="card shadow-sm border-0 mt-5">
        <div className="card-body p-4">

          <h4 className="fw-bold mb-3">
            Cabby Sports Admin
          </h4>

          <p className="text-muted mb-0">
            Use this dashboard to manage your football
            news, teams, fixtures, results and transfer
            information. All changes are connected to
            the Cabby Sports backend and MongoDB database.
          </p>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;