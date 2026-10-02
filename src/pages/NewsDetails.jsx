import { Link, useParams } from "react-router-dom";
import newsData from "../data/newsData";

const NewsDetails = () => {
  const { id } = useParams();

  const article = newsData.find(
    (item) => item.id === Number(id)
  );

  if (!article) {
    return (
      <main className="news-details-page">
        <section className="news-details-not-found">
          <div className="container">
            <span>404</span>
            <h1>Article Not Found</h1>
            <p>
              We couldn't find the article you're looking for.
            </p>

            <Link
              to="/news"
              className="news-details-back-button"
            >
              ← Back To News
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const relatedNews = newsData
    .filter(
      (item) =>
        item.id !== article.id &&
        item.category === article.category
    )
    .slice(0, 3);

  return (
    <main className="news-details-page">

      {/* ARTICLE HERO */}

      <section className="news-details-hero">
        <div className="container">

          <Link
            to="/news"
            className="news-details-back-link"
          >
            ← Back To News
          </Link>

          <div className="news-details-category">
            {article.category}
          </div>

          <h1>{article.title}</h1>

          <div className="news-details-meta">
            <span>{article.author}</span>
            <b>•</b>
            <span>{article.date}</span>
          </div>

        </div>
      </section>

      {/* ARTICLE IMAGE */}

      <section className="news-details-image-section">
        <div className="container">

          <div className="news-details-image-wrapper">
            <img
              src={article.image}
              alt={article.title}
            />
          </div>

        </div>
      </section>

      {/* ARTICLE CONTENT */}

      <section className="news-details-content-section">
        <div className="container">

          <div className="news-details-layout">

            <article className="news-details-article">

              <div className="news-details-intro">
                {article.content?.[0]}
              </div>

              {article.content?.slice(1).map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}

              <div className="news-details-share">
                <span>Share Story</span>

                <div>
                  <button type="button">
                    Facebook
                  </button>

                  <button type="button">
                    X
                  </button>

                  <button type="button">
                    WhatsApp
                  </button>
                </div>
              </div>

            </article>

            {/* SIDEBAR */}

            <aside className="news-details-sidebar">

              <div className="news-sidebar-box">

                <span className="cabby-section-label">
                  CABBY SPORTS
                </span>

                <h3>
                  Stay Updated With Football
                </h3>

                <p>
                  Follow the latest football news,
                  transfers, fixtures and results.
                </p>

                <Link
                  to="/news"
                  className="news-sidebar-button"
                >
                  More News →
                </Link>

              </div>

            </aside>

          </div>

        </div>
      </section>

      {/* RELATED NEWS */}

      {relatedNews.length > 0 && (
        <section className="news-related-section">
          <div className="container">

            <div className="cabby-section-header">
              <div>
                <span className="cabby-section-label">
                  MORE STORIES
                </span>

                <h2>Related News</h2>
              </div>

              <Link
                to="/news"
                className="cabby-view-all"
              >
                View All News <span>→</span>
              </Link>
            </div>

            <div className="news-related-grid">

              {relatedNews.map((item) => (
                <Link
                  to={`/news/${item.id}`}
                  className="news-related-card"
                  key={item.id}
                >

                  <div className="news-related-image">
                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <span>
                      {item.category}
                    </span>
                  </div>

                  <div className="news-related-content">

                    <small>
                      {item.date}
                    </small>

                    <h3>
                      {item.title}
                    </h3>

                    <span>
                      Read Story →
                    </span>

                  </div>

                </Link>
              ))}

            </div>

          </div>
        </section>
      )}

      {/* CTA */}

      <section className="news-details-cta-section">
        <div className="container">

          <div className="news-details-cta">

            <div>
              <span>CABBY SPORTS</span>

              <h2>
                More Football. More Stories.
              </h2>

              <p>
                Stay connected with the latest
                football news and updates.
              </p>
            </div>

            <Link
              to="/football"
              className="news-details-cta-button"
            >
              Football Hub →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
};

export default NewsDetails;