import { useEffect, useState } from "react";
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../../services/api";

const emptyForm = {
  name: "",
  shortName: "",
  logo: "",
  country: "",
  league: "",
  stadium: "",
  founded: "",
  description: "",
  website: "",
  isActive: true,
};

const AdminTeams = () => {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTeams();

      setTeams(response.data || []);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      setError(error.message || "Failed to load teams.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...formData,
        founded: formData.founded
          ? Number(formData.founded)
          : undefined,
      };

      if (editingId) {
        await updateTeam(editingId, payload);
        setSuccess("Team updated successfully.");
      } else {
        await createTeam(payload);
        setSuccess("Team created successfully.");
      }

      setFormData(emptyForm);
      setEditingId(null);

      await fetchTeams();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Team save error:", error);
      setError(error.message || "Failed to save team.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (team) => {
    setEditingId(team._id);

    setFormData({
      name: team.name || "",
      shortName: team.shortName || "",
      logo: team.logo || "",
      country: team.country || "",
      league: team.league || "",
      stadium: team.stadium || "",
      founded: team.founded || "",
      description: team.description || "",
      website: team.website || "",
      isActive: team.isActive ?? true,
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteTeam(id);

      setSuccess("Team deleted successfully.");

      await fetchTeams();
    } catch (error) {
      console.error("Team delete error:", error);
      setError(error.message || "Failed to delete team.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setSuccess("");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="text-success fw-bold">
            CABBY SPORTS ADMIN
          </span>

          <h1 className="fw-bold mb-1">
            {editingId ? "Edit Team" : "Manage Teams"}
          </h1>

          <p className="text-muted mb-0">
            Create and manage football teams.
          </p>
        </div>
      </div>

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

      {/* TEAM FORM */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">
            {editingId ? "Update Team" : "Add New Team"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Team Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="e.g. Chelsea"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Short Name
                </label>

                <input
                  type="text"
                  name="shortName"
                  className="form-control"
                  placeholder="e.g. CHE"
                  value={formData.shortName}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  className="form-control"
                  placeholder="e.g. England"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  League
                </label>

                <input
                  type="text"
                  name="league"
                  className="form-control"
                  placeholder="e.g. Premier League"
                  value={formData.league}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Stadium
                </label>

                <input
                  type="text"
                  name="stadium"
                  className="form-control"
                  placeholder="e.g. Stamford Bridge"
                  value={formData.stadium}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Founded
                </label>

                <input
                  type="number"
                  name="founded"
                  className="form-control"
                  placeholder="e.g. 1905"
                  value={formData.founded}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Logo URL
                </label>

                <input
                  type="url"
                  name="logo"
                  className="form-control"
                  placeholder="https://example.com/logo.png"
                  value={formData.logo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  className="form-control"
                  placeholder="https://www.example.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Write a short description about the team..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="isActive"
                    className="form-check-input"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="isActive"
                  >
                    Team is active
                  </label>
                </div>
              </div>

              <div className="col-12 d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-dark px-4"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Team"
                    : "Create Team"}
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

      {/* TEAM LIST */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">
          Existing Teams
        </h3>

        <span className="text-muted">
          {teams.length} team{teams.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <p>Loading teams...</p>
        </div>
      ) : teams.length === 0 ? (
        <div className="alert alert-info">
          No teams found.
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div
              className="col-md-6 col-lg-4"
              key={team._id}
            >
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">

                  <div className="text-center mb-3">
                    {team.logo ? (
                      <img
                        src={team.logo}
                        alt={team.name}
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div
                        className="bg-light rounded d-flex align-items-center justify-content-center mx-auto"
                        style={{
                          width: "90px",
                          height: "90px",
                        }}
                      >
                        No Logo
                      </div>
                    )}
                  </div>

                  <h4 className="fw-bold text-center">
                    {team.name}
                  </h4>

                  <p className="text-center text-muted mb-3">
                    {team.shortName}
                  </p>

                  <div className="small mb-3">
                    <p className="mb-1">
                      <strong>League:</strong>{" "}
                      {team.league}
                    </p>

                    <p className="mb-1">
                      <strong>Country:</strong>{" "}
                      {team.country}
                    </p>

                    <p className="mb-1">
                      <strong>Stadium:</strong>{" "}
                      {team.stadium || "Not provided"}
                    </p>

                    <p className="mb-0">
                      <strong>Status:</strong>{" "}
                      {team.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm flex-grow-1"
                      onClick={() => handleEdit(team)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm flex-grow-1"
                      onClick={() => handleDelete(team._id)}
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

export default AdminTeams;