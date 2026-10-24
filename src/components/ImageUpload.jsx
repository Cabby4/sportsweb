import { useState } from "react";
import { API_URL } from "../services/api";

const ImageUpload = ({ label = "Image", value, onChange, folder }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      if (folder) formData.append("folder", folder);

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Upload failed");

      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={handleFile}
        disabled={uploading}
      />

      {uploading && <small className="text-muted">Uploading...</small>}
      {error && <small className="text-danger d-block">{error}</small>}

      {value && !uploading && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "8px" }}
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={() => onChange("")}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;