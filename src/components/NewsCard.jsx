
import { Link } from "react-router-dom";

function NewsCard({ id, image, category, title }) {
  return (
    <article className="news-card">
      <Link to={`/news/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div className="news-card-content">
        <span>{category}</span>

        <h3>
          <Link to={`/news/${id}`}>
            {title}
          </Link>
        </h3>

        <Link className="read-more" to={`/news/${id}`}>
          Read more →
        </Link>
      </div>
    </article>
  );
}

export default NewsCard;