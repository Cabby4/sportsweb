
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getNewsById } from "../services/api";

import RelatedNews from "../components/RelatedNews";
import FollowUs from "../components/FollowUs";
import ShareButtons from "../components/ShareButtons";

const SITE_URL = "https://cabbysports.vercel.app";

const NewsDetails = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getNewsById(id);
        setArticle(data.data);
      } catch (error) {
        setError(error.message);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const pageTitle = `${article.title} | Cabby Sports`;
  const pageDescription = (
    article.summary ||
    article.content ||
    article.title
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
const canonicalUrl = `${SITE_URL}/news/${encodeURIComponent(
  article._id || id
)}`;
  const imageUrl = article.image
    ? new URL(article.image, SITE_URL).href
    : `${SITE_URL}/cabby-sports-logo.png`;

  return (
    <div className="container py-5">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Cabby Sports" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

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
              height: "auto",
              maxHeight: "600px",
              objectFit: "contain",
              backgroundColor: "#f1f1f1",
            }}
          />
        )}

        <span className="badge bg-success mb-3">
          {article.category}
        </span>

        <h1 className="fw-bold mb-3">{article.title}</h1>

        <p className="text-muted">
          By {article.author} ·{" "}
          {new Date(article.createdAt).toLocaleDateString()}
        </p>

        <hr />

        <p className="lead">{article.summary}</p>

        <div className="mt-4">
          <p style={{ whiteSpace: "pre-line" }}>{article.content}</p>
        </div>

        {article.tags?.length > 0 && (
          <div className="mt-4">
            {article.tags.map((tag) => (
              <span key={tag} className="badge bg-light text-dark me-2">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <ShareButtons title={article.title} />
      <FollowUs />
      <RelatedNews current={article} />
    </div>
  );
};

export default NewsDetails;
