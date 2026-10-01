
import NewsCard from "../components/NewsCard";
import newsData from "../data/newsData";

function News() {
  return (
    <section className="news-page">
      <div className="page-title">
        <span>SPORTS NEWS</span>

        <h1>Latest News</h1>

        <p>
          Stay up to date with the latest football and sports stories.
        </p>
      </div>

      <div className="news-page-layout">
        <div className="news-main">

          <div className="news-filter">
            <button>All</button>
            <button>Football</button>
            <button>Transfers</button>
            <button>Premier League</button>
          </div>

          <div className="news-grid">
            {newsData.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                image={item.image}
                category={item.category}
                title={item.title}
              />
            ))}
          </div>

        </div>

        <aside className="trending">
          <h2>Trending</h2>

          <div className="trending-item">
            <span>01</span>
            <p>Latest football news and updates</p>
          </div>

          <div className="trending-item">
            <span>02</span>
            <p>Transfer stories making headlines</p>
          </div>

          <div className="trending-item">
            <span>03</span>
            <p>Latest match results and fixtures</p>
          </div>

          <div className="trending-item">
            <span>04</span>
            <p>Major sports stories today</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default News;