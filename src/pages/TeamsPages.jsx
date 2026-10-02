// import { useState } from "react";
// import TeamCard from "../components/TeamCard";
// import TeamData from "../data/TeamData";

// function TeamsPage() {
//   const [selectedLeague, setSelectedLeague] = useState("All");

//   const leagues = [
//     "All",
//     "Premier League",
//     "La Liga",
//     "Bundesliga",
//     "Serie A",
//   ];

//   const filteredTeams =
//     selectedLeague === "All"
//       ? TeamData
//       : TeamData.filter(
//           (team) => team.league === selectedLeague
//         );

//   return (
//     <section className="teams-page">

//       <div className="page-title">
//         <span>SPORTS TEAMS</span>

//         <h1>Teams</h1>

//         <p>
//           Follow your favourite football teams and stay updated.
//         </p>
//       </div>

//       <div className="competition-filters">
//         {leagues.map((league) => (
//           <button
//             key={league}
//             className={
//               selectedLeague === league ? "active" : ""
//             }
//             onClick={() => setSelectedLeague(league)}
//           >
//             {league}
//           </button>
//         ))}
//       </div>

//       <div className="teams-grid">
//         {filteredTeams.map((team) => (
//           <TeamCard
//             key={team.id}
//             id={team.id}
//             name={team.name}
//             league={team.league}
//             logo={team.logo}
//           />
//         ))}
//       </div>

//     </section>
//   );
// }

// export default TeamsPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import teamData from "../data/TeamData";

const TeamsPage = () => {
  const [search, setSearch] = useState("");
  const [league, setLeague] = useState("All");

  const leagues = [
    "All",
    ...new Set(teamData.map((team) => team.league)),
  ];

  const filteredTeams = teamData.filter((team) => {
    const matchesSearch = team.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesLeague =
      league === "All" || team.league === league;

    return matchesSearch && matchesLeague;
  });

  return (
    <main className="teams-page">

      {/* =========================
          HERO
      ========================= */}
      <section className="teams-page-hero">
        <div className="container">
          <div className="teams-page-hero-content">

            <span className="teams-page-label">
              CABBY SPORTS
            </span>

            <h1>Football Teams</h1>

            <p>
              Explore teams, leagues, stadiums and
              football information from around the world.
            </p>

          </div>
        </div>
      </section>


      {/* =========================
          TEAMS
      ========================= */}
      <section className="teams-section">

        <div className="container">

          <div className="cabby-section-header">

            <div>
              <span className="cabby-section-label">
                TEAM CENTRE
              </span>

              <h2>Teams</h2>
            </div>

            <span className="teams-count">
              {filteredTeams.length} Teams
            </span>

          </div>


          {/* =========================
              FILTERS
          ========================= */}
          <div className="teams-filters">

            <div className="teams-search">

              <span>🔍</span>

              <input
                type="text"
                placeholder="Search teams..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>


            <div className="teams-leagues">

              {leagues.map((item) => (

                <button
                  key={item}
                  type="button"
                  className={
                    league === item
                      ? "active"
                      : ""
                  }
                  onClick={() => setLeague(item)}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>


          {/* =========================
              TEAM GRID
          ========================= */}
          {filteredTeams.length > 0 ? (

            <div className="teams-grid">

              {filteredTeams.map((team) => (

                <Link
                  to={`/teams/${team.id}`}
                  className="team-page-card"
                  key={team.id}
                >

                  <div className="team-page-card-top">

                    <span>
                      {team.league}
                    </span>

                    <strong>
                      →
                    </strong>

                  </div>


                  <div className="team-page-logo">
                    {team.logo}
                  </div>


                  <h3>
                    {team.name}
                  </h3>


                  <p>
                    {team.country}
                  </p>


                  <div className="team-page-info">

                    <div>
                      <span>STADIUM</span>
                      <strong>{team.stadium}</strong>
                    </div>

                    <div>
                      <span>FOUNDED</span>
                      <strong>{team.founded}</strong>
                    </div>

                  </div>


                  <div className="team-page-card-link">
                    View Team →
                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <div className="teams-empty">

              <div>🔎</div>

              <h3>
                No teams found
              </h3>

              <p>
                Try searching for another team or
                selecting a different league.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
};

export default TeamsPage;