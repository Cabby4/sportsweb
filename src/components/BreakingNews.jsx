// const BreakingNews = () => {
//   const breakingNews = [
//     "Latest football updates from around the world",
//     "Transfer news and rumours",
//     "Premier League fixtures and results",
//     "Champions League latest updates",
//   ];

//   return (
//     <section className="breaking-news">
//       <div className="breaking-label">
//         🔴 BREAKING
//       </div>

//       <div className="breaking-content">
//         {breakingNews.map((news, index) => (
//           <span key={index}>
//             {news}
//           </span>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BreakingNews;

import { Link } from "react-router-dom";

const BreakingNews = () => {
  const breakingNews = [
    {
      id: 1,
      text: "Latest football updates from around the world",
    },
    {
      id: 2,
      text: "Transfer news and rumours",
    },
    {
      id: 3,
      text: "Premier League fixtures and results",
    },
    {
      id: 4,
      text: "Champions League latest updates",
    },
    {
      id: 5,
      text: "Major football stories making headlines",
    },
  ];

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
              key={`first-${news.id}`}
              to={`/news/${news.id}`}
              className="cabby-breaking-item"
            >
              {news.text}
            </Link>
          ))}

          {/* Duplicate set for continuous scrolling */}
          {breakingNews.map((news) => (
            <Link
              key={`second-${news.id}`}
              to={`/news/${news.id}`}
              className="cabby-breaking-item"
            >
              {news.text}
            </Link>
          ))}

        </div>

      </div>

    </section>
  );
};

export default BreakingNews;