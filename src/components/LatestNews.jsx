// import { Link } from "react-router-dom";
// import newsData from "../data/newsData";

// const LatestNews = () => {
//   const featuredNews = newsData[0];
//   const sideNews = newsData.slice(1);

//   return (
//     <section className="latest-news-section">
//       <div className="section-heading">
//         <div>
//           <span>LATEST</span>
//           <h2>Latest News</h2>
//         </div>

//         <Link to="/news">View All News →</Link>
//       </div>

//       <div className="latest-news-layout">

//         {/* Featured Article */}
//         {featuredNews && (
//           <Link
//             to={`/news/${featuredNews.id}`}
//             className="featured-news"
//           >
//             <img
//               src={featuredNews.image}
//               alt={featuredNews.title}
//             />

//             <div className="featured-news-content">
//               <span>{featuredNews.category}</span>

//               <h3>{featuredNews.title}</h3>

//               <p>
//                 {featuredNews.content?.[0] ||
//                   "Read the latest sports news and updates from Cabby Sports."}
//               </p>

//               <small>
//                 {featuredNews.author} · {featuredNews.date}
//               </small>
//             </div>
//           </Link>
//         )}

//         {/* Smaller Articles */}
//         <div className="side-news">

//           {sideNews.map((article) => (
//             <Link
//               to={`/news/${article.id}`}
//               className="side-news-card"
//               key={article.id}
//             >
//               <img
//                 src={article.image}
//                 alt={article.title}
//               />

//               <div>
//                 <span>{article.category}</span>

//                 <h3>{article.title}</h3>

//                 <small>{article.date}</small>
//               </div>
//             </Link>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestNews;

import { Link } from "react-router-dom";
import newsData from "../data/newsData";

const LatestNews = () => {
  const featuredNews = newsData[0];
  const sideNews = newsData.slice(1, 4);

  return (
    <section className="cabby-latest-news">

      <div className="container">

        {/* Section Header */}
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

        {/* News Layout */}
        <div className="cabby-latest-grid">

          {/* Featured News */}
          {featuredNews && (
            <Link
              to={`/news/${featuredNews.id}`}
              className="cabby-featured-news"
            >

              <div className="cabby-featured-image">

                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                />

                <span className="cabby-news-category">
                  {featuredNews.category}
                </span>

              </div>

              <div className="cabby-featured-content">

                <h3>
                  {featuredNews.title}
                </h3>

                <p>
                  {featuredNews.content?.[0] ||
                    "Read the latest sports news and updates from Cabby Sports."}
                </p>

                <div className="cabby-news-meta">
                  <span>
                    {featuredNews.author}
                  </span>

                  <span>•</span>

                  <span>
                    {featuredNews.date}
                  </span>
                </div>

              </div>

            </Link>
          )}

          {/* Side News */}
          <div className="cabby-side-news">

            {sideNews.map((article) => (

              <Link
                to={`/news/${article.id}`}
                className="cabby-side-news-card"
                key={article.id}
              >

                <div className="cabby-side-news-image">

                  <img
                    src={article.image}
                    alt={article.title}
                  />

                </div>

                <div className="cabby-side-news-content">

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

              </Link>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default LatestNews;