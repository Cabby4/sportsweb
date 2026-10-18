import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../../services/api";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4001/api";

const emptyForm = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  image: "",
  category: "Football",
  author: "Cabby Sports",
  tags: "",
  featured: false,
  published: true,
};

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNews();

      setNews(data.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setSelectedImage(null);
      setImagePreview("");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    setError("");
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadNewsImage = async (file) => {
    const token = localStorage.getItem("cabbyToken");
    if (!token) {
      throw new Error("Your session has expired. Please log in again.");
    }

    const body = new FormData();
    body.append("image", file);

    const response = await fetch(
      `${API_URL.replace(/\/+$/, "")}/images`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }
    );

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || "Image upload failed.");
    }
    if (!data.imageUrl) {
      throw new Error("The upload succeeded but no image URL was returned.");
    }

    return data.imageUrl;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;

    setFormData((previous) => ({
      ...previous,
      title,
      slug: editingId ? previous.slug : generateSlug(title),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // Upload a newly selected image first; otherwise preserve the existing image URL.
      const imageUrl = selectedImage
        ? await uploadNewsImage(selectedImage)
        : formData.image;

      const payload = {
        ...formData,
        image: imageUrl,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await updateNews(editingId, payload);
        setSuccess("News article updated successfully.");
      } else {
        await createNews(payload);
        setSuccess("News article created successfully.");
      }

      setFormData(emptyForm);
      setEditingId(null);
      setSelectedImage(null);
      setImagePreview("");

      await fetchNews();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (article) => {
    setEditingId(article._id);
    setSelectedImage(null);
    setImagePreview("");

    setFormData({
      title: article.title || "",
      slug: article.slug || "",
      summary: article.summary || "",
      content: article.content || "",
      image: article.image || "",
      category: article.category || "Football",
      author: article.author || "Cabby Sports",
      tags: Array.isArray(article.tags)
        ? article.tags.join(", ")
        : "",
      featured: article.featured || false,
      published: article.published ?? true,
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
      "Are you sure you want to delete this news article?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteNews(id);

      setSuccess("News article deleted successfully.");

      if (editingId === id) {
        setEditingId(null);
        setFormData(emptyForm);
        setSelectedImage(null);
        setImagePreview("");
      }

      await fetchNews();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setSelectedImage(null);
    setImagePreview("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-vh-100 bg-light">

      {/* HEADER */}
      <header className="bg-dark text-white">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h4 className="mb-0 fw-bold">
                CABBY <span className="text-success">SPORTS</span>
              </h4>

              <small className="text-secondary">
                News Management
              </small>
            </div>

            <Link
              to="/admin/dashboard"
              className="btn btn-outline-light btn-sm"
            >
              ← Dashboard
            </Link>

          </div>
        </div>
      </header>

      <main className="container py-5">

        {/* TITLE */}
        <div className="mb-4">
          <h1 className="fw-bold">
            {editingId ? "Edit News" : "News Management"}
          </h1>

          <p className="text-muted">
            Create and manage Cabby Sports news articles.
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
        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body p-4">

            <h4 className="fw-bold mb-4">
              {editingId ? "Edit Article" : "Create New Article"}
            </h4>

            <form onSubmit={handleSubmit}>

              {/* TITLE */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter news title"
                  required
                />
              </div>

              {/* SLUG */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  className="form-control"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="news-article-slug"
                  required
                />
              </div>

              {/* SUMMARY */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Summary
                </label>

                <textarea
                  name="summary"
                  className="form-control"
                  rows="3"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Short summary of the article"
                  required
                />
              </div>

              {/* CONTENT */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Content
                </label>

                <textarea
                  name="content"
                  className="form-control"
                  rows="8"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write the full news article here..."
                  required
                />
              </div>

              {/* CLOUDINARY IMAGE UPLOAD */}
              <div className="mb-3">
                <label htmlFor="news-image" className="form-label fw-semibold">
                  News Image
                </label>

                <input
                  id="news-image"
                  type="file"
                  className="form-control"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  disabled={saving}
                />

                <small className="text-muted d-block mt-1">
                  Choose a JPG, PNG, or WebP image. Maximum size: 5 MB.
                  {editingId && " Leave this empty to keep the current image."}
                </small>

                {(imagePreview || formData.image) && (
                  <div className="mt-3">
                    <img
                      src={imagePreview || formData.image}
                      alt="News image preview"
                      style={{
                        width: "100%",
                        maxWidth: "320px",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    {selectedImage && (
                      <div className="small text-muted mt-1">
                        Selected: {selectedImage.name}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="row">

                {/* CATEGORY */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Category
                  </label>

                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Football">
                      Football
                    </option>

                    <option value="Transfers">
                      Transfers
                    </option>

                    <option value="Champions League">
                      Champions League
                    </option>

                    <option value="Premier League">
                      Premier League
                    </option>

                    <option value="La Liga">
                      La Liga
                    </option>

                    <option value="Serie A">
                      Serie A
                    </option>

                    <option value="International">
                      International
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* AUTHOR */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Author
                  </label>

                  <input
                    type="text"
                    name="author"
                    className="form-control"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* TAGS */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Tags
                </label>

                <input
                  type="text"
                  name="tags"
                  className="form-control"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="chelsea, premier league, football"
                />

                <small className="text-muted">
                  Separate tags with commas.
                </small>
              </div>

              {/* CHECKBOXES */}
              <div className="d-flex flex-wrap gap-4 mb-4">

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="featured"
                    className="form-check-input"
                    id="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />

                  <label
                    htmlFor="featured"
                    className="form-check-label"
                  >
                    Featured Article
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="published"
                    className="form-check-input"
                    id="published"
                    checked={formData.published}
                    onChange={handleChange}
                  />

                  <label
                    htmlFor="published"
                    className="form-check-label"
                  >
                    Published
                  </label>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="d-flex gap-2">

                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Article"
                    : "Create Article"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

          </div>
        </div>

        {/* NEWS LIST */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="fw-bold mb-1">
              Existing Articles
            </h3>

            <p className="text-muted mb-0">
              {news.length} article
              {news.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <p>Loading news...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="alert alert-info">
            No news articles found.
          </div>
        ) : (
          <div className="row g-4">

            {news.map((article) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={article._id}
              >
                <div className="card h-100 border-0 shadow-sm">

                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="bg-secondary-subtle d-flex align-items-center justify-content-center"
                      style={{
                        height: "200px",
                      }}
                    >
                      No Image
                    </div>
                  )}

                  <div className="card-body d-flex flex-column">

                    <div className="mb-2">
                      <span className="badge bg-success">
                        {article.category}
                      </span>

                      {article.featured && (
                        <span className="badge bg-warning text-dark ms-2">
                          Featured
                        </span>
                      )}

                      {!article.published && (
                        <span className="badge bg-secondary ms-2">
                          Draft
                        </span>
                      )}
                    </div>

                    <h5 className="fw-bold">
                      {article.title}
                    </h5>

                    <p className="text-muted small">
                      {article.summary}
                    </p>

                    <div className="mt-auto">

                      <small className="text-muted d-block mb-3">
                        {article.author || "Cabby Sports"} •{" "}
                        {new Date(
                          article.createdAt
                        ).toLocaleDateString()}
                      </small>

                      <div className="d-flex gap-2">

                        <Link
                          to={`/news/${article._id}`}
                          className="btn btn-outline-dark btn-sm"
                        >
                          View
                        </Link>

                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onClick={() => handleEdit(article)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            handleDelete(article._id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
};

export default AdminNews;