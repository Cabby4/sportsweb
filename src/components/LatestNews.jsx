
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../services/api";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        // Fetch the newest articles, excluding featured stories.
        const data = await getNews({
          featured: false,
          limit: 4,
        });

        setNews(data.data || []);
      } catch (error) {
        console.error("Failed to fetch latest news:", error);
        setError("Unable to load latest news.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const featuredNews = news[0];
  const sideNews = news.slice(1, 4);

  return (
    <section className="cabby-latest-news">
      <div className="container">
        <div className="cabby-section-header">
          <div>
            <span className="cabby-section-label">
              LATEST
            </span>

            <h2>Latest News</h2>
          </div>

          <Link
            to="/news"
            className="cabby-view-all"
          >
            View All News <span>→</span>
          </Link>
        </div>

        {loading && (
          <div className="text-center py-5">
            <p>Loading latest news...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-5">
            <p className="text-danger">{error}</p>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-5">
            <p>No latest news available at the moment.</p>
          </div>
        )}

        {!loading && !error && featuredNews && (
          <div className="cabby-latest-grid">
            <Link
              to={`/news/${featuredNews._id}`}
              className="cabby-featured-news"
            >
              <div className="cabby-featured-image">
                {featuredNews.image ? (
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                  />
                ) : (
                  <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center">
                    No Image
                  </div>
                )}

                <span className="cabby-news-category">
                  {featuredNews.category}
                </span>
              </div>

              <div className="cabby-featured-content">
                <h3>{featuredNews.title}</h3>

                <p>
                  {featuredNews.summary ||
                    "Read the latest sports news and updates from Cabby Sports."}
                </p>

                <div className="cabby-news-meta">
                  <span>
                    {featuredNews.author || "Cabby Sports"}
                  </span>

                  <span>•</span>

                  <span>
                    {featuredNews.createdAt
                      ? new Date(
                          featuredNews.createdAt
                        ).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>
            </Link>

            <div className="cabby-side-news">
              {sideNews.map((article) => (
                <Link
                  to={`/news/${article._id}`}
                  className="cabby-side-news-card"
                  key={article._id}
                >
                  <div className="cabby-side-news-image">
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

                  <div className="cabby-side-news-content">
                    <span>{article.category}</span>

                    <h3>{article.title}</h3>

                    <small>
                      {article.createdAt
                        ? new Date(
                            article.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
