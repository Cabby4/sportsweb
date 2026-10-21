
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNews } from "../services/api";

const countryNames = {
  nigeria: "Nigeria",
  egypt: "Egypt",
  morocco: "Morocco",
  "south-africa": "South Africa",
  ghana: "Ghana",
  tunisia: "Tunisia",
  algeria: "Algeria",
  tanzania: "Tanzania",
  "ivory-coast": "Ivory Coast",
  senegal: "Senegal",
};

const sectionConfig = {
  africa: {
    eyebrow: "AFRICAN FOOTBALL",
    title: "Africa Football",
    description:
      "The latest stories from African club football, continental competitions and domestic leagues.",
  },
  champions: {
    eyebrow: "CONTINENTAL COMPETITION",
    title: "CAF Champions League",
    description:
      "News and updates from Africa’s premier men’s club competition.",
  },
  confederation: {
    eyebrow: "CONTINENTAL COMPETITION",
    title: "CAF Confederation Cup",
    description:
      "Follow the latest stories from the CAF Confederation Cup.",
  },
  country: {
    eyebrow: "DOMESTIC FOOTBALL",
    title: "Country League",
    description: "Domestic league stories and updates from across Africa.",
  },
  grassroots: {
    eyebrow: "THE FUTURE OF FOOTBALL",
    title: "Grassroots Football",
    description:
      "Discover emerging talent, local academies, community tournaments and the people building football from the ground up.",
  },
};

const grassrootsTabs = [
  { label: "All stories", value: "all" },
  { label: "Academies", value: "academy" },
  { label: "Tournaments", value: "tournament" },
  { label: "Player profiles", value: "player-profile" },
];

function NewsGrid({ articles }) {
  if (!articles.length) {
    return (
      <div className="cabby-empty-state">
        <h3>Stories coming soon</h3>
        <p>
          We haven’t published stories in this section yet. Check back soon
          for updates from Cabby Sports.
        </p>
        <Link to="/news" className="btn btn-dark">
          Browse all news
        </Link>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {articles.map((item) => (
        <div
          className="col-md-6 col-lg-4"
          key={item._id || item.id || item.slug || item.title}
        >
          <article className="card h-100 shadow-sm cabby-section-news-card">
            {item.image && (
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                loading="lazy"
              />
            )}

            <div className="card-body d-flex flex-column">
              <span className="badge bg-success align-self-start mb-2">
                {item.category || "Cabby Sports"}
              </span>
              <h2 className="h5 card-title">{item.title}</h2>
              <p className="card-text">
                {item.summary ||
                  "Read the latest updates and stories on Cabby Sports."}
              </p>
              <Link
                to={`/news/${item._id || item.id || item.slug}`}
                className="btn btn-dark mt-auto align-self-start"
              >
                Read More
              </Link>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

export default function SectionNewsPage({
  section = "africa",
  competition,
  grassroots = false,
}) {
  const { country } = useParams();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [grassrootsTab, setGrassrootsTab] = useState("all");

  const countryName =
    countryNames[country] ||
    (country || "").replace(/-/g, " ").replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

  const config =
    section === "country"
      ? {
          ...sectionConfig.country,
          title: `${countryName || "African"} Football`,
          description: `The latest domestic football news and league updates from ${
            countryName || "across Africa"
          }.`,
        }
      : sectionConfig[section] || sectionConfig.africa;

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");
    setArticles([]);

    const filters = {};

    if (grassroots) {
      filters.section = "grassroots";

      if (grassrootsTab !== "all") {
        filters.grassrootsType = grassrootsTab;
      }
    } else if (section === "africa") {
      filters.section = "africa";
    } else if (section === "champions") {
      filters.section = "africa";
      filters.competition = "caf-champions-league";
    } else if (section === "confederation") {
      filters.section = "africa";
      filters.competition = "caf-confederation-cup";
    } else if (section === "country") {
      filters.section = "africa";
      filters.competition = "domestic-league";

      if (country) {
        filters.country = country;
      }
    }

    getNews(filters)
  .then((data) => {
    if (!active) return;

    let fetchedArticles = Array.isArray(data.data)
      ? data.data
      : [];

    // Enforce strict separation between football sections.
    if (section === "champions") {
      fetchedArticles = fetchedArticles.filter(
        (article) =>
          article.section === "africa" &&
          article.competition === "caf-champions-league"
      );
    } else if (section === "confederation") {
      fetchedArticles = fetchedArticles.filter(
        (article) =>
          article.section === "africa" &&
          article.competition === "caf-confederation-cup"
      );
    } else if (section === "country") {
      fetchedArticles = fetchedArticles.filter(
        (article) =>
          article.section === "africa" &&
          article.competition === "domestic-league" &&
          (!country || article.country === country)
      );
    } else if (section === "africa" && !grassroots) {
      fetchedArticles = fetchedArticles.filter(
        (article) => article.section === "africa"
      );
    } else if (grassroots) {
      fetchedArticles = fetchedArticles.filter(
        (article) =>
          article.section === "grassroots" &&
          (grassrootsTab === "all" ||
            article.grassrootsType === grassrootsTab)
      );
    }

    setArticles(fetchedArticles);
  })

      .catch((fetchError) => {
        if (active) {
          setError(fetchError.message || "Unable to load stories.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [section, competition, country, grassroots, grassrootsTab]);

  return (
    <main className="cabby-editorial-page">
      <section className="cabby-editorial-hero">
        <div className="container py-5">
          <span className="cabby-editorial-eyebrow">{config.eyebrow}</span>
          <h1>{config.title}</h1>
          <p>{config.description}</p>

          {section === "africa" && (
            <div className="cabby-topic-links">
              <Link to="/africa-football/caf-champions-league">
                CAF Champions League
              </Link>
              <Link to="/africa-football/caf-confederation-cup">
                CAF Confederation Cup
              </Link>
              <Link to="/africa-football/leagues/nigeria">
                Nigerian League
              </Link>
              <Link to="/africa-football/leagues/south-africa">
                South African League
              </Link>
            </div>
          )}

          {grassroots && (
            <div className="cabby-topic-links">
              <a href="#grassroots-stories">Academies</a>
              <a href="#grassroots-stories">Tournaments</a>
              <a href="#grassroots-stories">Player profiles</a>
            </div>
          )}
        </div>
      </section>

      {grassroots && (
        <section className="container pt-4">
          <div
            className="cabby-section-tabs"
            aria-label="Filter grassroots stories"
          >
            {grassrootsTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={grassrootsTab === tab.value ? "active" : ""}
                onClick={() => setGrassrootsTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>
      )}

      <section
        className="container py-5"
        id={grassroots ? "grassroots-stories" : undefined}
      >
        <div className="cabby-editorial-section-heading">
          <div>
            <span className="cabby-editorial-eyebrow">
              CABBY SPORTS COVERAGE
            </span>
            <h2>
              {grassroots
                ? "Grassroots Stories"
                : section === "africa"
                  ? "Latest African Football News"
                  : `Latest ${config.title} Stories`}
            </h2>
          </div>
          <Link to="/news" className="cabby-editorial-all-link">
            All news →
          </Link>
        </div>

        {loading ? (
          <div className="py-5 text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading</span>
            </div>
            <p className="mt-3">Loading stories...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <NewsGrid articles={articles} />
        )}
      </section>

      {section === "africa" && (
        <section className="container pb-5">
          <div className="cabby-country-panel">
            <div>
              <span className="cabby-editorial-eyebrow">
                FOLLOW DOMESTIC FOOTBALL
              </span>
              <h2>Explore African Leagues</h2>
              <p>
                Choose a country to browse relevant stories already published
                on Cabby Sports.
              </p>
            </div>

            <div className="cabby-country-links">
              {Object.entries(countryNames).map(([slug, name]) => (
                <Link
                  key={slug}
                  to={`/africa-football/leagues/${slug}`}
                >
                  {name} <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
