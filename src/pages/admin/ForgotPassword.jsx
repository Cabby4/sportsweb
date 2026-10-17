
import { useState } from "react";
import { Link } from "react-router-dom";
import "./password.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4001/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL.replace(/\/+$/, "")}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
          }),
        }
      );

      const responseText = await response.text();
      let data = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            `The server returned an invalid response (HTTP ${response.status}). Please check your backend.`
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            `The request failed with status ${response.status}.`
        );
      }

      if (!responseText.trim()) {
        throw new Error(
          "The server returned an empty response. Please check your backend route."
        );
      }

      setMessage(
        data.message ||
          "If an account exists with that email, a reset link will be sent."
      );
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "Cannot connect to the server. Check that your backend is running and your API URL is correct."
        );
      } else {
        setError(
          err.message || "Unable to send the password reset request."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="password-page">
      <form className="password-card" onSubmit={handleSubmit}>
        <h1>Forgot Password?</h1>

        <p>
          Enter your admin email address to request a password reset link.
        </p>

        <label htmlFor="email">Email address</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          autoComplete="email"
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className="password-success" role="status">
            {message}
          </p>
        )}

        {error && (
          <p className="password-error" role="alert">
            {error}
          </p>
        )}

        <Link to="/admin/login">Back to Login</Link>
      </form>
    </main>
  );
}
