import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../services/api";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();

        setNews(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading news...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">{error}</h4>
      </div>
    );
  }

  
  return (
    <>
      <Helmet>
        <title>Latest Football News | Cabby Sports</title>

        <meta
          name="description"
          content="Read the latest football news, breaking stories, match updates, transfer news, African football coverage and grassroots football stories on Cabby Sports."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://cabbysports.vercel.app/news"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cabby Sports" />
        <meta
          property="og:title"
          content="Latest Football News | Cabby Sports"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest football news, match updates, transfers, African football and grassroots stories."
        />
        <meta
          property="og:url"
          content="https://cabbysports.vercel.app/news"
        />
        <meta
          property="og:image"
          content="https://cabbysports.vercel.app/cabby-sports-logo.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Latest Football News | Cabby Sports"
        />
        <meta
          name="twitter:description"
          content="Read breaking football news and the latest updates from leagues and competitions around the world."
        />
        <meta
          name="twitter:image"
          content="https://cabbysports.vercel.app/cabby-sports-logo.png"
        />
      </Helmet>

      <div className="container py-5">
        <h1 className="mb-4">Latest News</h1>

        <div className="row g-4">
          {news.map((item) => (
            <div className="col-md-6 col-lg-4" key={item._id}>
              <div className="card h-100 shadow-sm">
                {item.image && (
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body">
                  <span className="badge bg-success mb-2">
                    {item.category}
                  </span>

                  <h5 className="card-title">{item.title}</h5>

                  <p className="card-text">{item.summary}</p>

                  <Link
                    to={`/news/${item._id}`}
                    className="btn btn-dark"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

};

export default News;