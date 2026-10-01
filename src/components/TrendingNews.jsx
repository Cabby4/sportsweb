import { Link } from "react-router-dom";
import newsData from "../data/newsData";

const TrendingNews = () => {
  const trendingNews = newsData.slice(0, 5);

  return (
    <section className="trending-section">
      <div className="trending-header">
        <span>TRENDING</span>
        <h2>Trending News</h2>
      </div>

      <div className="trending-list">
        {trendingNews.map((article, index) => (
          <Link
            to={`/news/${article.id}`}
            className="trending-item"
            key={article.id}
          >
            <div className="trending-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="trending-info">
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <small>{article.date}</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingNews;