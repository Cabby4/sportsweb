import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:4001"}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save authentication data
      localStorage.setItem("cabbyToken", data.token);
      localStorage.setItem("cabbyUser", JSON.stringify(data.user));

      // Make sure only admins can enter the dashboard
      if (data.user?.role !== "admin") {
        localStorage.removeItem("cabbyToken");
        localStorage.removeItem("cabbyUser");

        throw new Error("Admin access required");
      }

      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="mx-auto"
        style={{
          maxWidth: "450px",
          marginTop: "60px",
        }}
      >
        <div className="card shadow border-0">
          <div className="card-body p-4 p-md-5">

            <div className="text-center mb-4">
              <img
                src="/cabby-sports-logo.png"
                alt="Cabby Sports"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "contain",
                }}
              />

              <h2 className="fw-bold mt-3">
                Admin Login
              </h2>

              <p className="text-muted">
                Sign in to manage Cabby Sports
              </p>
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="admin@cabbysports.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 py-2"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;