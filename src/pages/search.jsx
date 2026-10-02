// import { useState } from "react";
// import { Link } from "react-router-dom";
// import newsData from "../data/newsData";
// import TeamData from "../data/TeamData";

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const search = searchTerm.toLowerCase().trim();

//   const filteredNews = newsData.filter((article) =>
//     article.title.toLowerCase().includes(search) ||
//     article.category.toLowerCase().includes(search)
//   );

//   const filteredTeams = TeamData.filter((team) =>
//     team.name.toLowerCase().includes(search) ||
//     team.league.toLowerCase().includes(search)
//   );

//   return (
//     <main className="search-page">
//       <div className="search-header">
//         <h1>Search Cabby Sports</h1>
//         <p>Find the latest news, teams and sports updates.</p>

//         <input
//           type="text"
//           placeholder="Search news or teams..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           autoFocus
//         />
//       </div>

//       {searchTerm.trim() === "" ? (
//         <div className="search-message">
//           <h2>What are you looking for?</h2>
//           <p>Search for a team, news article or category.</p>
//         </div>
//       ) : (
//         <>
//           {/* News Results */}
//           <section className="search-section">
//             <h2>News</h2>

//             {filteredNews.length > 0 ? (
//               <div className="search-results">
//                 {filteredNews.map((article) => (
//                   <Link
//                     to={`/news/${article.id}`}
//                     className="search-result-card"
//                     key={article.id}
//                   >
//                     <img src={article.image} alt={article.title} />

//                     <div>
//                       <span>{article.category}</span>
//                       <h3>{article.title}</h3>
//                       <p>{article.date}</p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <p className="no-results">No news found.</p>
//             )}
//           </section>

//           {/* Team Results */}
//           <section className="search-section">
//             <h2>Teams</h2>

//             {filteredTeams.length > 0 ? (
//               <div className="search-team-results">
//                 {filteredTeams.map((team) => (
//                   <Link
//                     to={`/teams/${team.id}`}
//                     className="search-team-card"
//                     key={team.id}
//                   >
//                     <img src={team.image} alt={team.name} />

//                     <div>
//                       <h3>{team.name}</h3>
//                       <p>{team.league}</p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <p className="no-results">No teams found.</p>
//             )}
//           </section>
//         </>
//       )}
//     </main>
//   );
// };

// export default Search;

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import newsData from "../data/newsData";
import teamData from "../data/TeamData";
import matchData from "../data/matchData";
import transferData from "../data/transferData";

const Search = () => {
  const [search, setSearch] = useState("");

  const searchValue = search.trim().toLowerCase();

  const results = useMemo(() => {
    if (!searchValue) {
      return {
        news: [],
        teams: [],
        matches: [],
        transfers: [],
      };
    }

    const news = newsData.filter((article) =>
      [
        article.title,
        article.category,
        article.author,
        ...(article.content || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)
    );

    const teams = teamData.filter((team) =>
      [
        team.name,
        team.league,
        team.country,
        team.stadium,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)
    );

    const matches = matchData.filter((match) =>
      [
        match.competition,
        match.home,
        match.away,
        match.date,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)
    );

    const transfers = transferData.filter((transfer) =>
      [
        transfer.player,
        transfer.from,
        transfer.to,
        transfer.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)
    );

    return {
      news,
      teams,
      matches,
      transfers,
    };
  }, [searchValue]);

  const totalResults =
    results.news.length +
    results.teams.length +
    results.matches.length +
    results.transfers.length;

  return (
    <main className="search-page">

      {/* HERO */}
      <section className="search-page-hero">
        <div className="container">
          <div className="search-page-hero-content">
            <span className="search-page-label">
              CABBY SPORTS
            </span>

            <h1>Search for Sports Stories</h1>

            <p>
              Find football news, teams, fixtures,
              results and transfer stories.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-page-section">
        <div className="container">

          <div className="search-box-large">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search news, teams, players, clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
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

          {/* EMPTY STATE */}
          {!searchValue && (
            <div className="search-empty">
              <div className="search-empty-icon">
                🔎
              </div>

              <h2>What are you looking for?</h2>

              <p>
                Search for a team, player, football story,
                transfer or match.
              </p>
            </div>
          )}

          {/* RESULTS */}
          {searchValue && (
            <>
              <div className="search-results-header">
                <div>
                  <span className="cabby-section-label">
                    SEARCH RESULTS
                  </span>

                  <h2>
                    Results for "{search}"
                  </h2>
                </div>

                <span className="search-results-count">
                  {totalResults}{" "}
                  {totalResults === 1
                    ? "Result"
                    : "Results"}
                </span>
              </div>

              {/* NEWS */}
              {results.news.length > 0 && (
                <section className="search-result-section">
                  <div className="search-result-title">
                    <h3>Latest News</h3>
                    <span>
                      {results.news.length}
                    </span>
                  </div>

                  <div className="search-news-grid">
                    {results.news.map((article) => (
                      <Link
                        to={`/news/${article.id}`}
                        className="search-news-card"
                        key={article.id}
                      >
                        <div className="search-news-image">
                          <img
                            src={article.image}
                            alt={article.title}
                          />
                        </div>

                        <div className="search-news-content">
                          <span>
                            {article.category}
                          </span>

                          <h4>{article.title}</h4>

                          <small>
                            {article.date}
                          </small>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* TEAMS */}
              {results.teams.length > 0 && (
                <section className="search-result-section">
                  <div className="search-result-title">
                    <h3>Teams</h3>
                    <span>
                      {results.teams.length}
                    </span>
                  </div>

                  <div className="search-teams-grid">
                    {results.teams.map((team) => (
                      <Link
                        to={`/teams/${team.id}`}
                        className="search-team-card"
                        key={team.id}
                      >
                        <div className="search-team-logo">
                          {team.logo}
                        </div>

                        <div>
                          <h4>{team.name}</h4>

                          <p>
                            {team.league}
                          </p>
                        </div>

                        <span>→</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* MATCHES */}
              {results.matches.length > 0 && (
                <section className="search-result-section">
                  <div className="search-result-title">
                    <h3>Matches</h3>
                    <span>
                      {results.matches.length}
                    </span>
                  </div>

                  <div className="search-matches-list">
                    {results.matches.map((match) => (
                      <Link
                        to={`/matches/${match.id}`}
                        className="search-match-card"
                        key={match.id}
                      >
                        <div>
                          <span>
                            {match.competition}
                          </span>

                          <small>
                            {match.date} • {match.time}
                          </small>
                        </div>

                        <strong>
                          {match.home}
                          <b> vs </b>
                          {match.away}
                        </strong>

                        <span className="search-match-status">
                          {match.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* TRANSFERS */}
              {results.transfers.length > 0 && (
                <section className="search-result-section">
                  <div className="search-result-title">
                    <h3>Transfers</h3>
                    <span>
                      {results.transfers.length}
                    </span>
                  </div>

                  <div className="search-transfers-list">
                    {results.transfers.map((transfer) => (
                      <div
                        className="search-transfer-card"
                        key={transfer.id}
                      >
                        <div className="search-transfer-player">
                          <div>
                            {transfer.player.charAt(0)}
                          </div>

                          <strong>
                            {transfer.player}
                          </strong>
                        </div>

                        <div className="search-transfer-route">
                          <span>
                            {transfer.from}
                          </span>

                          <b>→</b>

                          <span>
                            {transfer.to}
                          </span>
                        </div>

                        <strong className="search-transfer-fee">
                          {transfer.fee}
                        </strong>

                        <span
                          className={`search-transfer-status ${
                            transfer.status ===
                            "Completed"
                              ? "completed"
                              : "rumour"
                          }`}
                        >
                          {transfer.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* NO RESULTS */}
              {totalResults === 0 && (
                <div className="search-no-results">
                  <div>😕</div>

                  <h2>No results found</h2>

                  <p>
                    We couldn't find anything matching
                    "{search}".
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </main>
  );
};

export default Search;