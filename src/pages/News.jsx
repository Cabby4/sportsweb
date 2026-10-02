
// import NewsCard from "../components/NewsCard";
// import newsData from "../data/newsData";

// function News() {
//   return (
//     <section className="news-page">
//       <div className="page-title">
//         <span>SPORTS NEWS</span>

//         <h1>Latest News</h1>

//         <p>
//           Stay up to date with the latest football and sports stories.
//         </p>
//       </div>

//       <div className="news-page-layout">
//         <div className="news-main">

//           <div className="news-filter">
//             <button>All</button>
//             <button>Football</button>
//             <button>Transfers</button>
//             <button>Premier League</button>
//           </div>

//           <div className="news-grid">
//             {newsData.map((item) => (
//               <NewsCard
//                 key={item.id}
//                 id={item.id}
//                 image={item.image}
//                 category={item.category}
//                 title={item.title}
//               />
//             ))}
//           </div>

//         </div>

//         <aside className="trending">
//           <h2>Trending</h2>

//           <div className="trending-item">
//             <span>01</span>
//             <p>Latest football news and updates</p>
//           </div>

//           <div className="trending-item">
//             <span>02</span>
//             <p>Transfer stories making headlines</p>
//           </div>

//           <div className="trending-item">
//             <span>03</span>
//             <p>Latest match results and fixtures</p>
//           </div>

//           <div className="trending-item">
//             <span>04</span>
//             <p>Major sports stories today</p>
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// }

// export default News;

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import newsData from "../data/newsData";

const News = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(newsData.map((article) => article.category)),
  ];

  const filteredNews = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return newsData.filter((article) => {
      const matchesCategory =
        category === "All" ||
        article.category === category;

      const matchesSearch =
        !searchValue ||
        [
          article.title,
          article.category,
          article.author,
          ...(article.content || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const featuredArticle = newsData[0];

  const regularNews = filteredNews.filter(
    (article) => article.id !== featuredArticle?.id
  );

  return (
    <main className="news-page">

      {/* HERO */}
      <section className="news-page-hero">
        <div className="container">
          <div className="news-page-hero-content">
            <span className="news-page-label">
              CABBY SPORTS NEWS
            </span>

            <h1>Latest Football News</h1>

            <p>
              Get the latest football stories, breaking news,
              transfer updates and everything happening across
              the football world.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED STORY */}
      {featuredArticle && (
        <section className="news-featured-section">
          <div className="container">

            <div className="cabby-section-header">
              <div>
                <span className="cabby-section-label">
                  TOP STORY
                </span>

                <h2>Featured News</h2>
              </div>
            </div>

            <Link
              to={`/news/${featuredArticle.id}`}
              className="news-featured-card"
            >
              <div className="news-featured-image">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                />

                <span>
                  {featuredArticle.category}
                </span>
              </div>

              <div className="news-featured-content">
                <span className="news-featured-small">
                  LATEST STORY
                </span>

                <h2>{featuredArticle.title}</h2>

                <p>
                  {featuredArticle.content?.[0] ||
                    "Read the latest football story from Cabby Sports."}
                </p>

                <div className="news-featured-meta">
                  <span>{featuredArticle.author}</span>
                  <b>•</b>
                  <span>{featuredArticle.date}</span>
                </div>

                <span className="news-read-more">
                  Read Full Story →
                </span>
              </div>
            </Link>

          </div>
        </section>
      )}

      {/* NEWS */}
      <section className="news-list-section">
        <div className="container">

          {/* HEADER */}
          <div className="news-list-header">
            <div>
              <span className="cabby-section-label">
                ALL STORIES
              </span>

              <h2>Latest Stories</h2>
            </div>

            <span className="news-result-count">
              {filteredNews.length}{" "}
              {filteredNews.length === 1
                ? "Story"
                : "Stories"}
            </span>
          </div>

          {/* FILTERS */}
          <div className="news-controls">

            <div className="news-search">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="news-categories">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    category === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>

          </div>

          {/* NEWS GRID */}
          {regularNews.length > 0 ? (
            <div className="news-page-grid">

              {regularNews.map((article) => (
                <Link
                  to={`/news/${article.id}`}
                  className="news-page-card"
                  key={article.id}
                >
                  <div className="news-page-card-image">
                    <img
                      src={article.image}
                      alt={article.title}
                    />

                    <span>
                      {article.category}
                    </span>
                  </div>

                  <div className="news-page-card-content">

                    <div className="news-page-card-meta">
                      <span>
                        {article.author}
                      </span>

                      <b>•</b>

                      <span>
                        {article.date}
                      </span>
                    </div>

                    <h3>{article.title}</h3>

                    <p>
                      {article.content?.[0] ||
                        "Read the latest football news and updates from Cabby Sports."}
                    </p>

                    <span className="news-page-card-link">
                      Read Story →
                    </span>

                  </div>
                </Link>
              ))}

            </div>
          ) : (
            <div className="news-page-empty">
              <div>🔎</div>

              <h3>No stories found</h3>

              <p>
                Try another search term or select a
                different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="news-cta-section">
        <div className="container">

          <div className="news-cta">

            <div>
              <span>CABBY SPORTS</span>

              <h2>
                Stay Connected With The Football World
              </h2>

              <p>
                Follow Cabby Sports for football news,
                transfers, fixtures, results and more.
              </p>
            </div>

            <Link
              to="/fixtures"
              className="news-cta-button"
            >
              View Fixtures →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
};

export default News;