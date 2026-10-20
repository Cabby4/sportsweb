import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";
import "./RelatedNews.css";

const RelatedNews = ({ current, limit = 5 }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const fetchAll =
          api.getNews ||
          api.getAllNews ||
          api.fetchNews ||
          api.getNewsList;

        if (!fetchAll) {
          console.error(
            "RelatedNews: no 'get all news' function found. Exports:",
            Object.keys(api)
          );
          return;
        }

        const res = await fetchAll();
        const raw = res?.data?.data ?? res?.data ?? res;
        const list = Array.isArray(raw) ? raw : [];

        const currentId = current?._id || current?.id;
        const others = list.filter((n) => (n._id || n.id) !== currentId);

        const sameCategory = others.filter(
          (n) => n.category === current?.category
        );

        setRelated(sameCategory.slice(0, limit));
      } catch (err) {
        console.error("RelatedNews failed:", err);
        setRelated([]);
      }
    };

    load();
  }, [current, limit]);

  if (related.length === 0) return null;

  return (
    <section className="related-news">
      <h4 className="related-news__title">More in {current?.category}</h4>

      <ul className="related-news__list">
        {related.map((item) => (
          <li key={item._id || item.id} className="related-news__item">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="related-news__thumb"
              />
            )}

            <div>
              <Link
                to={`/news/${item._id || item.id}`}
                className="related-news__link"
              >
                {item.title}
              </Link>
              {item.createdAt && (
                <span className="related-news__date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <Link to="/news" className="related-news__more">
        Read more news →
      </Link>
    </section>
  );
};

export default RelatedNews;