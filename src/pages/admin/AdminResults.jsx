import { useEffect, useState } from "react";
import {
  getResults,
  createResult,
  updateResult,
  deleteResult,
  getTeams,
} from "../../services/api";

const emptyForm = {
  homeTeam: "",
  awayTeam: "",
  competition: "",
  matchDate: "",
  homeScore: "",
  awayScore: "",
  venue: "",
  status: "Completed",
  matchweek: "",
  description: "",
};

const AdminResults = () => {
  const [results, setResults] = useState([]);
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

      const [resultsResponse, teamsResponse] = await Promise.all([
        getResults(),
        getTeams(),
      ]);

      setResults(resultsResponse.data || []);
      setTeams(teamsResponse.data || []);
    } catch (error) {
      console.error("Failed to fetch results data:", error);
      setError(error.message || "Failed to load results.");
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

    if (
      formData.homeScore === "" ||
      formData.awayScore === ""
    ) {
      setError("Please enter both scores.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...formData,
        homeScore: Number(formData.homeScore),
        awayScore: Number(formData.awayScore),
        matchweek: formData.matchweek
          ? Number(formData.matchweek)
          : undefined,
      };

      if (editingId) {
        await updateResult(editingId, payload);
        setSuccess("Result updated successfully.");
      } else {
        await createResult(payload);
        setSuccess("Result created successfully.");
      }

      setFormData(emptyForm);
      setEditingId(null);

      await fetchData();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Result save error:", error);
      setError(error.message || "Failed to save result.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (result) => {
    setEditingId(result._id);

    const formattedDate = result.matchDate
      ? new Date(result.matchDate).toISOString().slice(0, 16)
      : "";

    setFormData({
      homeTeam: result.homeTeam?._id || result.homeTeam || "",
      awayTeam: result.awayTeam?._id || result.awayTeam || "",
      competition: result.competition || "",
      matchDate: formattedDate,
      homeScore: result.homeScore ?? "",
      awayScore: result.awayScore ?? "",
      venue: result.venue || "",
      status: result.status || "Completed",
      matchweek: result.matchweek || "",
      description: result.description || "",
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
      "Are you sure you want to delete this result?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteResult(id);

      setSuccess("Result deleted successfully.");

      await fetchData();
    } catch (error) {
      console.error("Result delete error:", error);
      setError(error.message || "Failed to delete result.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setSuccess("");
  };

  const getTeamName = (team) => {
    if (!team) {
      return "Unknown Team";
    }

    if (typeof team === "object") {
      return team.name || "Unknown Team";
    }

    const foundTeam = teams.find(
      (item) => item._id === team
    );

    return foundTeam?.name || "Unknown Team";
  };

  const getResultLabel = (homeScore, awayScore) => {
    if (homeScore > awayScore) {
      return "Home Win";
    }

    if (awayScore > homeScore) {
      return "Away Win";
    }

    return "Draw";
  };

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="mb-4">
        <span className="text-success fw-bold">
          CABBY SPORTS ADMIN
        </span>

        <h1 className="fw-bold mb-1">
          {editingId ? "Edit Result" : "Manage Results"}
        </h1>

        <p className="text-muted mb-0">
          Add and manage completed football match results.
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
            {editingId ? "Update Result" : "Add New Result"}
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

              {/* HOME SCORE */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Home Score
                </label>

                <input
                  type="number"
                  name="homeScore"
                  className="form-control"
                  min="0"
                  placeholder="0"
                  value={formData.homeScore}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* AWAY SCORE */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Away Score
                </label>

                <input
                  type="number"
                  name="awayScore"
                  className="form-control"
                  min="0"
                  placeholder="0"
                  value={formData.awayScore}
                  onChange={handleChange}
                  required
                />
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

              {/* DATE */}
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
                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Abandoned">
                    Abandoned
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
                  min="1"
                  placeholder="e.g. 8"
                  value={formData.matchweek}
                  onChange={handleChange}
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
                  placeholder="Add additional match information..."
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
                    ? "Update Result"
                    : "Create Result"}
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

      {/* RESULTS LIST */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">
          Existing Results
        </h3>

        <span className="text-muted">
          {results.length} result
          {results.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <p>Loading results...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="alert alert-info">
          No results found.
        </div>
      ) : (
        <div className="row g-4">
          {results.map((result) => (
            <div
              className="col-md-6 col-lg-4"
              key={result._id}
            >
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">

                  <div className="text-center mb-3">
                    <span className="badge bg-success">
                      {result.competition}
                    </span>
                  </div>

                  <div className="text-center">

                    <h5 className="fw-bold">
                      {getTeamName(result.homeTeam)}
                    </h5>

                    <div className="display-6 fw-bold my-2">
                      {result.homeScore}
                      <span className="text-muted mx-2">
                        -
                      </span>
                      {result.awayScore}
                    </div>

                    <h5 className="fw-bold">
                      {getTeamName(result.awayTeam)}
                    </h5>

                    <div className="mt-3 mb-3">
                      <span className="badge bg-dark">
                        {getResultLabel(
                          result.homeScore,
                          result.awayScore
                        )}
                      </span>
                    </div>

                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(
                        result.matchDate
                      ).toLocaleString()}
                    </p>

                    <p className="mb-1">
                      <strong>Venue:</strong>{" "}
                      {result.venue || "Not provided"}
                    </p>

                    <p className="mb-3">
                      <strong>Status:</strong>{" "}
                      {result.status}
                    </p>

                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm flex-grow-1"
                      onClick={() => handleEdit(result)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm flex-grow-1"
                      onClick={() =>
                        handleDelete(result._id)
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

export default AdminResults;