import { useState } from "react";

function ResultsPage() {
  const [selectedCompetition, setSelectedCompetition] = useState("All");

  const results = [
    {
      id: 1,
      competition: "Premier League",
      date: "Saturday, 26 September",
      home: "Manchester City",
      away: "Liverpool",
      homeScore: 2,
      awayScore: 1,
    },
    {
      id: 2,
      competition: "La Liga",
      date: "Saturday, 26 September",
      home: "Barcelona",
      away: "Real Madrid",
      homeScore: 3,
      awayScore: 2,
    },
    {
      id: 3,
      competition: "Premier League",
      date: "Sunday, 27 September",
      home: "Chelsea",
      away: "Arsenal",
      homeScore: 1,
      awayScore: 1,
    },
    {
      id: 4,
      competition: "Serie A",
      date: "Sunday, 27 September",
      home: "Inter Milan",
      away: "AC Milan",
      homeScore: 2,
      awayScore: 0,
    },
    {
      id: 5,
      competition: "Champions League",
      date: "Tuesday, 29 September",
      home: "Bayern Munich",
      away: "Liverpool",
      homeScore: 3,
      awayScore: 1,
    },
    {
      id: 6,
      competition: "La Liga",
      date: "Tuesday, 29 September",
      home: "Atletico Madrid",
      away: "Sevilla",
      homeScore: 2,
      awayScore: 2,
    },
  ];

  const competitions = [
    "All",
    "Premier League",
    "La Liga",
    "Serie A",
    "Champions League",
  ];

  const filteredResults =
    selectedCompetition === "All"
      ? results
      : results.filter(
          (result) =>
            result.competition === selectedCompetition
        );

  return (
    <section className="results-page">

      <div className="page-title">
        <span>MATCH CENTRE</span>

        <h1>Results</h1>

        <p>
          Check recent match results from major competitions.
        </p>
      </div>

      <div className="competition-filters">
        {competitions.map((competition) => (
          <button
            key={competition}
            className={
              selectedCompetition === competition
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedCompetition(competition)
            }
          >
            {competition}
          </button>
        ))}
      </div>

      <div className="results-page-list">

        {filteredResults.map((result) => (
          <article
            className="result-page-card"
            key={result.id}
          >
            <div className="result-competition">
              <span>{result.competition}</span>
              <small>{result.date}</small>
            </div>

            <div className="result-match">

              <div className="result-team">
                <strong>{result.home}</strong>
              </div>

              <div className="result-score">
                <span>{result.homeScore}</span>
                <b>-</b>
                <span>{result.awayScore}</span>
              </div>

              <div className="result-team">
                <strong>{result.away}</strong>
              </div>

            </div>

            <button className="match-centre-btn">
              Match Centre
            </button>
          </article>
        ))}

        {filteredResults.length === 0 && (
          <p className="no-results">
            No results available for this competition.
          </p>
        )}

      </div>

    </section>
  );
}

export default ResultsPage;