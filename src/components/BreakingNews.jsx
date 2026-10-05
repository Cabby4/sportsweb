import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../services/api";

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const data = await getNews();

        setBreakingNews(data.data || []);
      } catch (error) {
        console.error("Failed to fetch breaking news:", error);
      }
    };

    fetchBreakingNews();
  }, []);

  if (breakingNews.length === 0) {
    return null;
  }

  return (
    <section className="cabby-breaking-news">

      {/* Breaking Label */}
      <div className="cabby-breaking-label">
        <span className="breaking-dot"></span>
        BREAKING NEWS
      </div>

      {/* Scrolling News */}
      <div className="cabby-breaking-wrapper">

        <div className="cabby-breaking-track">

          {/* First set */}
          {breakingNews.map((news) => (
            <Link
              key={`first-${news._id}`}
              to={`/news/${news._id}`}
              className="cabby-breaking-item"
            >
              {news.title}
            </Link>
          ))}

          {/* Duplicate set for continuous scrolling */}
          {breakingNews.map((news) => (
            <Link
              key={`second-${news._id}`}
              to={`/news/${news._id}`}
              className="cabby-breaking-item"
            >
              {news.title}
            </Link>
          ))}

        </div>

      </div>

    </section>
  );
};

export default BreakingNews;