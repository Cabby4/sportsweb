import { useEffect, useState } from "react";
import {
  getTransfers,
  createTransfer,
  updateTransfer,
  deleteTransfer,
  getTeams,
} from "../../services/api";

const emptyForm = {
  playerName: "",
  playerImage: "",
  position: "",
  fromClub: "",
  toClub: "",
  transferType: "Permanent",
  transferFee: "Undisclosed",
  transferDate: "",
  status: "Rumour",
  contractLength: "",
  description: "",
};

const AdminTransfers = () => {
  const [transfers, setTransfers] = useState([]);
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

      const [transfersResponse, teamsResponse] =
        await Promise.all([
          getTransfers(),
          getTeams(),
        ]);

      setTransfers(transfersResponse.data || []);
      setTeams(teamsResponse.data || []);
    } catch (error) {
      console.error("Failed to fetch transfer data:", error);
      setError(
        error.message || "Failed to load transfers."
      );
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

    if (formData.fromClub === formData.toClub) {
      setError(
        "From club and destination club cannot be the same."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...formData,
      };

      if (editingId) {
        await updateTransfer(editingId, payload);
        setSuccess(
          "Transfer updated successfully."
        );
      } else {
        await createTransfer(payload);
        setSuccess(
          "Transfer created successfully."
        );
      }

      setFormData(emptyForm);
      setEditingId(null);

      await fetchData();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Transfer save error:", error);
      setError(
        error.message || "Failed to save transfer."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (transfer) => {
    setEditingId(transfer._id);

    const formattedDate = transfer.transferDate
      ? new Date(transfer.transferDate)
          .toISOString()
          .slice(0, 10)
      : "";

    setFormData({
      playerName: transfer.playerName || "",
      playerImage: transfer.playerImage || "",
      position: transfer.position || "",
      fromClub:
        transfer.fromClub?._id ||
        transfer.fromClub ||
        "",
      toClub:
        transfer.toClub?._id ||
        transfer.toClub ||
        "",
      transferType:
        transfer.transferType || "Permanent",
      transferFee:
        transfer.transferFee || "Undisclosed",
      transferDate: formattedDate,
      status: transfer.status || "Rumour",
      contractLength:
        transfer.contractLength || "",
      description:
        transfer.description || "",
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
      "Are you sure you want to delete this transfer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteTransfer(id);

      setSuccess(
        "Transfer deleted successfully."
      );

      await fetchData();
    } catch (error) {
      console.error(
        "Transfer delete error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete transfer."
      );
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
      return "Unknown Club";
    }

    if (typeof team === "object") {
      return team.name || "Unknown Club";
    }

    const foundTeam = teams.find(
      (item) => item._id === team
    );

    return foundTeam?.name || "Unknown Club";
  };

  return (
    <div className="container py-5">

      {/* HEADER */}

      <div className="mb-4">
        <span className="text-success fw-bold">
          CABBY SPORTS ADMIN
        </span>

        <h1 className="fw-bold mb-1">
          {editingId
            ? "Edit Transfer"
            : "Manage Transfers"}
        </h1>

        <p className="text-muted mb-0">
          Manage player transfers and transfer
          rumours.
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
            {editingId
              ? "Update Transfer"
              : "Add New Transfer"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* PLAYER NAME */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Player Name
                </label>

                <input
                  type="text"
                  name="playerName"
                  className="form-control"
                  placeholder="e.g. Cole Palmer"
                  value={formData.playerName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* POSITION */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Position
                </label>

                <input
                  type="text"
                  name="position"
                  className="form-control"
                  placeholder="e.g. Attacking Midfielder"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>

              {/* PLAYER IMAGE */}

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Player Image URL
                </label>

                <input
                  type="url"
                  name="playerImage"
                  className="form-control"
                  placeholder="https://example.com/player.jpg"
                  value={formData.playerImage}
                  onChange={handleChange}
                />
              </div>

              {/* FROM CLUB */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  From Club
                </label>

                <select
                  name="fromClub"
                  className="form-select"
                  value={formData.fromClub}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select previous club
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

              {/* TO CLUB */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  To Club
                </label>

                <select
                  name="toClub"
                  className="form-select"
                  value={formData.toClub}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select destination club
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

              {/* TRANSFER TYPE */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Transfer Type
                </label>

                <select
                  name="transferType"
                  className="form-select"
                  value={formData.transferType}
                  onChange={handleChange}
                >
                  <option value="Permanent">
                    Permanent
                  </option>

                  <option value="Loan">
                    Loan
                  </option>

                  <option value="Free Transfer">
                    Free Transfer
                  </option>

                  <option value="Loan Return">
                    Loan Return
                  </option>
                </select>
              </div>

              {/* TRANSFER FEE */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Transfer Fee
                </label>

                <input
                  type="text"
                  name="transferFee"
                  className="form-control"
                  placeholder="e.g. €60m"
                  value={formData.transferFee}
                  onChange={handleChange}
                />
              </div>

              {/* TRANSFER DATE */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Transfer Date
                </label>

                <input
                  type="date"
                  name="transferDate"
                  className="form-control"
                  value={formData.transferDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* STATUS */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Rumour">
                    Rumour
                  </option>

                  <option value="Negotiating">
                    Negotiating
                  </option>

                  <option value="Medical">
                    Medical
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              {/* CONTRACT LENGTH */}

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Contract Length
                </label>

                <input
                  type="text"
                  name="contractLength"
                  className="form-control"
                  placeholder="e.g. 5 years"
                  value={formData.contractLength}
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
                  placeholder="Add additional transfer information..."
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
                    ? "Update Transfer"
                    : "Create Transfer"}
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

      {/* EXISTING TRANSFERS */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">
          Existing Transfers
        </h3>

        <span className="text-muted">
          {transfers.length} transfer
          {transfers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <p>Loading transfers...</p>
        </div>
      ) : transfers.length === 0 ? (
        <div className="alert alert-info">
          No transfers found.
        </div>
      ) : (
        <div className="row g-4">
          {transfers.map((transfer) => (
            <div
              className="col-md-6 col-lg-4"
              key={transfer._id}
            >
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">

                  {/* PLAYER IMAGE */}

                  <div className="text-center mb-3">
                    {transfer.playerImage ? (
                      <img
                        src={transfer.playerImage}
                        alt={transfer.playerName}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <div
                        className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto"
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </div>

                  <h4 className="fw-bold text-center">
                    {transfer.playerName}
                  </h4>

                  {transfer.position && (
                    <p className="text-muted text-center mb-3">
                      {transfer.position}
                    </p>
                  )}

                  {/* TRANSFER */}

                  <div className="text-center mb-3">
                    <div className="fw-semibold">
                      {getTeamName(
                        transfer.fromClub
                      )}
                    </div>

                    <div className="text-success fw-bold my-1">
                      ↓
                    </div>

                    <div className="fw-semibold">
                      {getTeamName(
                        transfer.toClub
                      )}
                    </div>
                  </div>

                  <div className="text-center mb-3">
                    <span className="badge bg-dark me-1">
                      {transfer.status}
                    </span>

                    <span className="badge bg-success">
                      {transfer.transferType}
                    </span>
                  </div>

                  <div className="small mb-3">
                    <p className="mb-1">
                      <strong>Fee:</strong>{" "}
                      {transfer.transferFee ||
                        "Undisclosed"}
                    </p>

                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {transfer.transferDate
                        ? new Date(
                            transfer.transferDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>

                    <p className="mb-0">
                      <strong>Contract:</strong>{" "}
                      {transfer.contractLength ||
                        "Not provided"}
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm flex-grow-1"
                      onClick={() =>
                        handleEdit(transfer)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm flex-grow-1"
                      onClick={() =>
                        handleDelete(
                          transfer._id
                        )
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

export default AdminTransfers;