const BreakingNews = () => {
  const breakingNews = [
    "Latest football updates from around the world",
    "Transfer news and rumours",
    "Premier League fixtures and results",
    "Champions League latest updates",
  ];

  return (
    <section className="breaking-news">
      <div className="breaking-label">
        🔴 BREAKING
      </div>

      <div className="breaking-content">
        {breakingNews.map((news, index) => (
          <span key={index}>
            {news}
          </span>
        ))}
      </div>
    </section>
  );
};

export default BreakingNews;