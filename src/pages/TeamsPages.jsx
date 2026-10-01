import { useState } from "react";
import TeamCard from "../components/TeamCard";
import TeamData from "../data/TeamData";

function TeamsPage() {
  const [selectedLeague, setSelectedLeague] = useState("All");

  const leagues = [
    "All",
    "Premier League",
    "La Liga",
    "Bundesliga",
    "Serie A",
  ];

  const filteredTeams =
    selectedLeague === "All"
      ? TeamData
      : TeamData.filter(
          (team) => team.league === selectedLeague
        );

  return (
    <section className="teams-page">

      <div className="page-title">
        <span>SPORTS TEAMS</span>

        <h1>Teams</h1>

        <p>
          Follow your favourite football teams and stay updated.
        </p>
      </div>

      <div className="competition-filters">
        {leagues.map((league) => (
          <button
            key={league}
            className={
              selectedLeague === league ? "active" : ""
            }
            onClick={() => setSelectedLeague(league)}
          >
            {league}
          </button>
        ))}
      </div>

      <div className="teams-grid">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            id={team.id}
            name={team.name}
            league={team.league}
            logo={team.logo}
          />
        ))}
      </div>

    </section>
  );
}

export default TeamsPage;