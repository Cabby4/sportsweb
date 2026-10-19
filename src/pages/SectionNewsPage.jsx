import { useEffect, useMemo, useState } from "react";
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
    description: "The latest stories from African club football, continental competitions and domestic leagues.",
    keywords: ["africa", "african", "caf", "nigeria", "egypt", "morocco", "ghana", "south africa", "tunisia", "algeria", "tanzania", "senegal", "ivory coast", "confederation cup", "champions league"],
  },
  champions: {
    eyebrow: "CONTINENTAL COMPETITION",
    title: "CAF Champions League",
    description: "News and updates from Africa’s premier men’s club competition.",
    keywords: ["caf champions league", "champions league", "caf cl"],
  },
  confederation: {
    eyebrow: "CONTINENTAL COMPETITION",
    title: "CAF Confederation Cup",
    description: "Follow the latest stories from the CAF Confederation Cup.",
    keywords: ["caf confederation cup", "confederation cup", "caf cc"],
  },
  country: {
    eyebrow: "DOMESTIC FOOTBALL",
    title: "Country League",
    description: "Domestic league stories and updates from across Africa.",
    keywords: [],
  },
  grassroots: {
    eyebrow: "THE FUTURE OF FOOTBALL",
    title: "Grassroots Football",
    description: "Discover emerging talent, local academies, community tournaments and the people building football from the ground up.",
    keywords: ["grassroots", "academy", "academies", "youth", "under-", "under 17", "under 18", "under 20", "tournament", "scout", "prospect", "young player", "talent", "community club"],
  },
};

const grassrootsTabs = [
  { label: "All stories", value: "all", terms: [] },
  { label: "Academies", value: "academy", terms: ["academy", "academies", "youth development", "training ground"] },
  { label: "Tournaments", value: "tournament", terms: ["tournament", "grassroots cup", "youth cup", "school football", "community competition"] },
  { label: "Player profiles", value: "player", terms: ["player profile", "prospect", "young talent", "scout", "academy player"] },
];

const normalise = (value) => String(value ?? "").toLowerCase().replace(/[-_]/g, " ");

function articleText(article) {
  const tags = Array.isArray(article.tags) ? article.tags.join(" ") : article.tags;
  return normalise([
    article.title,
    article.summary,
    article.content,
    article.category,
    article.competition,
    article.country,
    article.section,
    article.grassrootsType,
    tags,
  ].join(" "));
}

function matchesTerms(article, terms) {
  const text = articleText(article);
  return terms.some((term) => text.includes(normalise(term)));
}

function NewsGrid({ articles }) {
  if (!articles.length) {
    return (
      <div className="cabby-empty-state">
        <h3>Stories coming soon</h3>
        <p>We haven’t published stories in this section yet. Check back soon for updates from Cabby Sports.</p>
        <Link to="/news" className="btn btn-dark">Browse all news</Link>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {articles.map((item) => (
        <div className="col-md-6 col-lg-4" key={item._id || item.id || item.slug || item.title}>
          <article className="card h-100 shadow-sm cabby-section-news-card">
            {item.image && <img src={item.image} className="card-img-top" alt={item.title} loading="lazy" />}
            <div className="card-body d-flex flex-column">
              <span className="badge bg-success align-self-start mb-2">{item.category || "Cabby Sports"}</span>
              <h2 className="h5 card-title">{item.title}</h2>
              <p className="card-text">{item.summary || "Read the latest updates and stories on Cabby Sports."}</p>
              <Link to={`/news/${item._id || item.id || item.slug}`} className="btn btn-dark mt-auto align-self-start">Read More</Link>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

export default function SectionNewsPage({ section = "africa", competition, grassroots = false }) {
  const { country } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [grassrootsTab, setGrassrootsTab] = useState("all");

  const config = section === "country" ? {
    ...sectionConfig.country,
    title: `${countryNames[country] || (country || "African").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())} Football`,
    description: `The latest domestic football news and league updates from ${countryNames[country] || (country || "across Africa").replace(/-/g, " ")}.`,
    keywords: [countryNames[country] || (country || "").replace(/-/g, " "), `${countryNames[country] || country} league`, `${countryNames[country] || country} football`].filter(Boolean),
  } : sectionConfig[section] || sectionConfig.africa;

  useEffect(() => {
    let active = true;
    getNews()
      .then((data) => { if (active) setArticles(Array.isArray(data.data) ? data.data : []); })
      .catch((fetchError) => { if (active) setError(fetchError.message || "Unable to load stories."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (section === "africa") result = result.filter((article) => matchesTerms(article, sectionConfig.africa.keywords));
    if (section === "champions") result = result.filter((article) => matchesTerms(article, sectionConfig.champions.keywords));
    if (section === "confederation") result = result.filter((article) => matchesTerms(article, sectionConfig.confederation.keywords));
    if (section === "country") result = result.filter((article) => matchesTerms(article, config.keywords));
    if (grassroots) {
      result = result.filter((article) => matchesTerms(article, sectionConfig.grassroots.keywords));
      const selectedTab = grassrootsTabs.find((tab) => tab.value === grassrootsTab);
      if (selectedTab?.terms.length) result = result.filter((article) => matchesTerms(article, selectedTab.terms));
    }
    if (competition) result = result.filter((article) => matchesTerms(article, [competition]));
    return result;
  }, [articles, section, config.keywords, grassroots, grassrootsTab, competition]);

  return (
    <main className="cabby-editorial-page">
      <section className="cabby-editorial-hero">
        <div className="container py-5">
          <span className="cabby-editorial-eyebrow">{config.eyebrow}</span>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
          {section === "africa" && <div className="cabby-topic-links">
            <Link to="/africa-football/caf-champions-league">CAF Champions League</Link>
            <Link to="/africa-football/caf-confederation-cup">CAF Confederation Cup</Link>
            <Link to="/africa-football/leagues/nigeria">Nigerian League</Link>
            <Link to="/africa-football/leagues/south-africa">South African League</Link>
          </div>}
          {grassroots && <div className="cabby-topic-links">
            <a href="#grassroots-stories">Academies</a><a href="#grassroots-stories">Tournaments</a><a href="#grassroots-stories">Player profiles</a>
          </div>}
        </div>
      </section>

      {grassroots && <section className="container pt-4">
        <div className="cabby-section-tabs" aria-label="Filter grassroots stories">
          {grassrootsTabs.map((tab) => <button key={tab.value} type="button" className={grassrootsTab === tab.value ? "active" : ""} onClick={() => setGrassrootsTab(tab.value)}>{tab.label}</button>)}
        </div>
      </section>}

      <section className="container py-5" id={grassroots ? "grassroots-stories" : undefined}>
        <div className="cabby-editorial-section-heading">
          <div><span className="cabby-editorial-eyebrow">CABBY SPORTS COVERAGE</span><h2>{grassroots ? "Grassroots Stories" : section === "africa" ? "Latest African Football News" : `Latest ${config.title} Stories`}</h2></div>
          <Link to="/news" className="cabby-editorial-all-link">All news →</Link>
        </div>
        {loading ? <div className="py-5 text-center"><div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading</span></div><p className="mt-3">Loading stories...</p></div> : error ? <div className="alert alert-danger">{error}</div> : <NewsGrid articles={filteredArticles} />}
      </section>

      {section === "africa" && <section className="container pb-5">
        <div className="cabby-country-panel"><div><span className="cabby-editorial-eyebrow">FOLLOW DOMESTIC FOOTBALL</span><h2>Explore African Leagues</h2><p>Choose a country to browse relevant stories already published on Cabby Sports.</p></div><div className="cabby-country-links">{Object.entries(countryNames).map(([slug, name]) => <Link key={slug} to={`/africa-football/leagues/${slug}`}>{name} <span>→</span></Link>)}</div></div>
      </section>}
    </main>
  );
}
