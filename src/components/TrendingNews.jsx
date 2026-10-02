// import { Link } from "react-router-dom";
// import newsData from "../data/newsData";

// const TrendingNews = () => {
//   const trendingNews = newsData.slice(0, 5);

//   return (
//     <section className="trending-section">
//       <div className="trending-header">
//         <span>TRENDING</span>
//         <h2>Trending News</h2>
//       </div>

//       <div className="trending-list">
//         {trendingNews.map((article, index) => (
//           <Link
//             to={`/news/${article.id}`}
//             className="trending-item"
//             key={article.id}
//           >
//             <div className="trending-number">
//               {String(index + 1).padStart(2, "0")}
//             </div>

//             <div className="trending-info">
//               <span>{article.category}</span>
//               <h3>{article.title}</h3>
//               <small>{article.date}</small>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TrendingNews;

import { Link } from "react-router-dom";
import newsData from "../data/newsData";

const TrendingNews = () => {
  const trendingNews = newsData.slice(0, 5);

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
              to={`/news/${article.id}`}
              className="cabby-trending-card"
              key={article.id}
            >

              {/* Number */}
              <div className="cabby-trending-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Image */}
              <div className="cabby-trending-image">

                <img
                  src={article.image}
                  alt={article.title}
                />

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
                  {article.date}
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