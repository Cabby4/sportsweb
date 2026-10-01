import { Link, useParams } from "react-router-dom";
import newsData from "../data/newsData";

function NewsDetails() {
  const { id } = useParams();

  const article = newsData.find(
    (item) => item.id === Number(id)
  );

  if (!article) {
    return (
      <section className="page">
        <h1>Article Not Found</h1>
        <Link to="/news">← Back to News</Link>
      </section>
    );
  }

  return (
    <article className="article-page">

      <div className="article-header">

        <span className="article-category">
          {article.category}
        </span>

        <h1>{article.title}</h1>

        <div className="article-meta">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

      </div>

      <img
        className="article-image"
        src={article.image}
        alt={article.title}
      />

      <div className="article-layout">

        <div className="article-content">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <aside className="article-sidebar">
          <h3>Share</h3>

          <button>Facebook</button>
          <button>X</button>
          <button>WhatsApp</button>
        </aside>

      </div>

      <Link className="back-news" to="/news">
        ← Back to News
      </Link>

    </article>
  );
}

export default NewsDetails;