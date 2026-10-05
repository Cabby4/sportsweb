import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNewsById } from "../services/api";

const NewsDetails = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getNewsById(id);

        setArticle(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading article...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">{error}</h4>

        <Link to="/news" className="btn btn-dark mt-3">
          Back to News
        </Link>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-5 text-center">
        <h4>Article not found</h4>

        <Link to="/news" className="btn btn-dark mt-3">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/news" className="btn btn-outline-dark mb-4">
        ← Back to News
      </Link>

      <article>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="img-fluid rounded mb-4"
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
        )}

        <span className="badge bg-success mb-3">
          {article.category}
        </span>

        <h1 className="fw-bold mb-3">
          {article.title}
        </h1>

        <p className="text-muted">
          By {article.author} ·{" "}
          {new Date(article.createdAt).toLocaleDateString()}
        </p>

        <hr />

        <p className="lead">
          {article.summary}
        </p>

        <div className="mt-4">
          <p style={{ whiteSpace: "pre-line" }}>
            {article.content}
          </p>
        </div>

        {article.tags?.length > 0 && (
          <div className="mt-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="badge bg-light text-dark me-2"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsDetails;