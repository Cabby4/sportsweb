import { Link } from "react-router-dom";
import newsData from "../data/newsData";

const LatestNews = () => {
  const featuredNews = newsData[0];
  const sideNews = newsData.slice(1);

  return (
    <section className="latest-news-section">
      <div className="section-heading">
        <div>
          <span>LATEST</span>
          <h2>Latest News</h2>
        </div>

        <Link to="/news">View All News →</Link>
      </div>

      <div className="latest-news-layout">

        {/* Featured Article */}
        {featuredNews && (
          <Link
            to={`/news/${featuredNews.id}`}
            className="featured-news"
          >
            <img
              src={featuredNews.image}
              alt={featuredNews.title}
            />

            <div className="featured-news-content">
              <span>{featuredNews.category}</span>

              <h3>{featuredNews.title}</h3>

              <p>
                {featuredNews.content?.[0] ||
                  "Read the latest sports news and updates from Cabby Sports."}
              </p>

              <small>
                {featuredNews.author} · {featuredNews.date}
              </small>
            </div>
          </Link>
        )}

        {/* Smaller Articles */}
        <div className="side-news">

          {sideNews.map((article) => (
            <Link
              to={`/news/${article.id}`}
              className="side-news-card"
              key={article.id}
            >
              <img
                src={article.image}
                alt={article.title}
              />

              <div>
                <span>{article.category}</span>

                <h3>{article.title}</h3>

                <small>{article.date}</small>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default LatestNews;