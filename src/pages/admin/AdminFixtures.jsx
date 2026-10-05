import { useEffect, useState } from "react";
import {
  getFixtures,
  createFixture,
  updateFixture,
  deleteFixture,
  getTeams,
} from "../../services/api";

const emptyForm = {
  homeTeam: "",
  awayTeam: "",
  competition: "",
  matchDate: "",
  venue: "",
  status: "Scheduled",
  matchweek: "",
  description: "",
};

const AdminFixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [teams, setTeams] = useState([]);

  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [fixturesResponse, teamsResponse] = await Promise.all([
        getFixtures(),
        getTeams(),
      ]);

      setFixtures(fixturesResponse.data || []);
      setTeams(teamsResponse.data || []);
    } catch (error) {
      console.error("Failed to fetch fixtures data:", error);
      setError(error.message || "Failed to load fixtures.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.homeTeam === formData.awayTeam) {
      setError("Home team and away team cannot be the same.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...formData,
        matchweek: formData.matchweek
          ? Number(formData.matchweek)
          : undefined,
      };

      if (editingId) {
        await updateFixture(editingId, payload);
        setSuccess("Fixture updated successfully.");
      } else {
        await createFixture(payload);
        setSuccess("Fixture created successfully.");
      }

      setFormData(emptyForm);
      setEditingId(null);

      await fetchData();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Fixture save error:", error);
      setError(error.message || "Failed to save fixture.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (fixture) => {
    setEditingId(fixture._id);

    const formattedDate = fixture.matchDate
      ? new Date(fixture.matchDate).toISOString().slice(0, 16)
      : "";

    setFormData({
      homeTeam: fixture.homeTeam?._id || fixture.homeTeam || "",
      awayTeam: fixture.awayTeam?._id || fixture.awayTeam || "",
      competition: fixture.competition || "",
      matchDate: formattedDate,
      venue: fixture.venue || "",
      status: fixture.status || "Scheduled",
      matchweek: fixture.matchweek || "",
      description: fixture.description || "",
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fixture?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteFixture(id);

      setSuccess("Fixture deleted successfully.");

      await fetchData();
    } catch (error) {
      console.error("Fixture delete error:", error);
      setError(error.message || "Failed to delete fixture.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setSuccess("");
  };

  const getTeamName = (team) => {
    if (!team) return "Unknown Team";

    if (typeof team === "object") {
      return team.name || "Unknown Team";
    }

    const foundTeam = teams.find((item) => item._id === team);

    return foundTeam?.name || "Unknown Team";
  };

  return (
    <div className="container py-5">
      {/* HEADER */}
      <div className="mb-4">
        <span className="text-success fw-bold">
          CABBY SPORTS ADMIN
        </span>

        <h1 className="fw-bold mb-1">
          {editingId ? "Edit Fixture" : "Manage Fixtures"}
        </h1>

        <p className="text-muted mb-0">
          Create and manage upcoming football fixtures.
        </p>
      </div>

      {/* ALERTS */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {/* FORM */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">
            {editingId ? "Update Fixture" : "Add New Fixture"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* HOME TEAM */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Home Team
                </label>

                <select
                  name="homeTeam"
                  className="form-select"
                  value={formData.homeTeam}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select home team
                  </option>

                  {teams.map((team) => (
                    <option
                      key={team._id}
                      value={team._id}
                    >
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* AWAY TEAM */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Away Team
                </label>

                <select
                  name="awayTeam"
                  className="form-select"
                  value={formData.awayTeam}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select away team
                  </option>

                  {teams.map((team) => (
                    <option
                      key={team._id}
                      value={team._id}
                    >
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* COMPETITION */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Competition
                </label>

                <input
                  type="text"
                  name="competition"
                  className="form-control"
                  placeholder="e.g. Premier League"
                  value={formData.competition}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* MATCH DATE */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Match Date & Time
                </label>

                <input
                  type="datetime-local"
                  name="matchDate"
                  className="form-control"
                  value={formData.matchDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* VENUE */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
                  className="form-control"
                  placeholder="e.g. Stamford Bridge"
                  value={formData.venue}
                  onChange={handleChange}
                />
              </div>

              {/* STATUS */}
              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Scheduled">
                    Scheduled
                  </option>

                  <option value="Postponed">
                    Postponed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              {/* MATCHWEEK */}
              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Matchweek
                </label>

                <input
                  type="number"
                  name="matchweek"
                  className="form-control"
                  placeholder="e.g. 8"
                  value={formData.matchweek}
                  onChange={handleChange}
                  min="1"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Add any additional match information..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* BUTTONS */}
              <div className="col-12 d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-dark px-4"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Fixture"
                    : "Create Fixture"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* FIXTURE LIST */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">
          Existing Fixtures
        </h3>

        <span className="text-muted">
          {fixtures.length} fixture
          {fixtures.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <p>Loading fixtures...</p>
        </div>
      ) : fixtures.length === 0 ? (
        <div className="alert alert-info">
          No fixtures found.
        </div>
      ) : (
        <div className="row g-4">
          {fixtures.map((fixture) => (
            <div
              className="col-md-6 col-lg-4"
              key={fixture._id}
            >
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">

                  <div className="text-center mb-3">
                    <span className="badge bg-success">
                      {fixture.competition}
                    </span>
                  </div>

                  <div className="text-center">
                    <h5 className="fw-bold mb-3">
                      {getTeamName(fixture.homeTeam)}
                      <span className="text-muted mx-2">
                        vs
                      </span>
                      {getTeamName(fixture.awayTeam)}
                    </h5>

                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(
                        fixture.matchDate
                      ).toLocaleString()}
                    </p>

                    <p className="mb-1">
                      <strong>Venue:</strong>{" "}
                      {fixture.venue || "TBA"}
                    </p>

                    <p className="mb-1">
                      <strong>Matchweek:</strong>{" "}
                      {fixture.matchweek || "N/A"}
                    </p>

                    <p className="mb-3">
                      <strong>Status:</strong>{" "}
                      {fixture.status}
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm flex-grow-1"
                      onClick={() => handleEdit(fixture)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm flex-grow-1"
                      onClick={() =>
                        handleDelete(fixture._id)
                      }
                    >
                      Delete
                    </button>
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

export default AdminFixtures;