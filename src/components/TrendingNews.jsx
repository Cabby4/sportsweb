import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../services/api";

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const data = await getNews();

        setTrendingNews((data.data || []).slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch trending news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNews();
  }, []);

  if (loading) {
    return (
      <section className="cabby-trending-section">
        <div className="container">
          <div className="cabby-section-header">
            <div>
              <span className="cabby-section-label">
                TRENDING
              </span>

              <h2>Trending News</h2>
            </div>

            <span className="cabby-trending-live">
              🔥 Hot Stories
            </span>
          </div>

          <p>Loading trending stories...</p>
        </div>
      </section>
    );
  }

  if (trendingNews.length === 0) {
    return null;
  }

  return (
    <section className="cabby-trending-section">
      <div className="container">

        {/* Header */}
        <div className="cabby-section-header">
          <div>
            <span className="cabby-section-label">
              TRENDING
            </span>

            <h2>Trending News</h2>
          </div>

          <span className="cabby-trending-live">
            🔥 Hot Stories
          </span>
        </div>

        {/* Trending List */}
        <div className="cabby-trending-list">

          {trendingNews.map((article, index) => (
            <Link
              to={`/news/${article._id}`}
              className="cabby-trending-card"
              key={article._id}
            >

              {/* Number */}
              <div className="cabby-trending-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Image */}
              <div className="cabby-trending-image">

                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                  />
                ) : (
                  <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center">
                    No Image
                  </div>
                )}

              </div>

              {/* Content */}
              <div className="cabby-trending-content">

                <span>
                  {article.category}
                </span>

                <h3>
                  {article.title}
                </h3>

                <small>
                  {new Date(
                    article.createdAt
                  ).toLocaleDateString()}
                </small>

              </div>

              {/* Arrow */}
              <div className="cabby-trending-arrow">
                →
              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
};

export default TrendingNews;