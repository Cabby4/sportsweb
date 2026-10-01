import { useState } from "react";
import { Link } from "react-router-dom";
import newsData from "../data/newsData";
import TeamData from "../data/TeamData";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const search = searchTerm.toLowerCase().trim();

  const filteredNews = newsData.filter((article) =>
    article.title.toLowerCase().includes(search) ||
    article.category.toLowerCase().includes(search)
  );

  const filteredTeams = TeamData.filter((team) =>
    team.name.toLowerCase().includes(search) ||
    team.league.toLowerCase().includes(search)
  );

  return (
    <main className="search-page">
      <div className="search-header">
        <h1>Search Cabby Sports</h1>
        <p>Find the latest news, teams and sports updates.</p>

        <input
          type="text"
          placeholder="Search news or teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>

      {searchTerm.trim() === "" ? (
        <div className="search-message">
          <h2>What are you looking for?</h2>
          <p>Search for a team, news article or category.</p>
        </div>
      ) : (
        <>
          {/* News Results */}
          <section className="search-section">
            <h2>News</h2>

            {filteredNews.length > 0 ? (
              <div className="search-results">
                {filteredNews.map((article) => (
                  <Link
                    to={`/news/${article.id}`}
                    className="search-result-card"
                    key={article.id}
                  >
                    <img src={article.image} alt={article.title} />

                    <div>
                      <span>{article.category}</span>
                      <h3>{article.title}</h3>
                      <p>{article.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="no-results">No news found.</p>
            )}
          </section>

          {/* Team Results */}
          <section className="search-section">
            <h2>Teams</h2>

            {filteredTeams.length > 0 ? (
              <div className="search-team-results">
                {filteredTeams.map((team) => (
                  <Link
                    to={`/teams/${team.id}`}
                    className="search-team-card"
                    key={team.id}
                  >
                    <img src={team.image} alt={team.name} />

                    <div>
                      <h3>{team.name}</h3>
                      <p>{team.league}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="no-results">No teams found.</p>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default Search;