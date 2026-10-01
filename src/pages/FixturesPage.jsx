
import { useState } from "react";

function FixturesPage() {
  const [selectedCompetition, setSelectedCompetition] = useState("All");

  const fixtures = [
    {
      id: 1,
      competition: "Premier League",
      date: "Saturday, 03 October",
      time: "15:00",
      home: "Chelsea",
      away: "Arsenal",
    },
    {
      id: 2,
      competition: "La Liga",
      date: "Saturday, 03 October",
      time: "18:30",
      home: "Barcelona",
      away: "Real Madrid",
    },
    {
      id: 3,
      competition: "Premier League",
      date: "Sunday, 04 October",
      time: "16:30",
      home: "Liverpool",
      away: "Manchester City",
    },
    {
      id: 4,
      competition: "Serie A",
      date: "Sunday, 04 October",
      time: "19:45",
      home: "Inter Milan",
      away: "AC Milan",
    },
    {
      id: 5,
      competition: "Champions League",
      date: "Tuesday, 06 October",
      time: "20:00",
      home: "Bayern Munich",
      away: "Liverpool",
    },
    {
      id: 6,
      competition: "La Liga",
      date: "Wednesday, 07 October",
      time: "20:00",
      home: "Atletico Madrid",
      away: "Sevilla",
    },
  ];

  const competitions = [
    "All",
    "Premier League",
    "La Liga",
    "Serie A",
    "Champions League",
  ];

  const filteredFixtures =
    selectedCompetition === "All"
      ? fixtures
      : fixtures.filter(
          (fixture) =>
            fixture.competition === selectedCompetition
        );

  return (
    <section className="fixtures-page">

      <div className="page-title">
        <span>MATCH CENTRE</span>

        <h1>Fixtures</h1>

        <p>
          Check upcoming matches, kick-off times and competitions.
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

      <div className="fixtures-page-list">
        {filteredFixtures.map((fixture) => (
          <article className="fixture-page-card" key={fixture.id}>

            <div className="fixture-competition">
              <span>{fixture.competition}</span>
              <small>{fixture.date}</small>
            </div>

            <div className="fixture-match">

              <div className="fixture-team">
                <strong>{fixture.home}</strong>
              </div>

              <div className="fixture-time">
                <span>{fixture.time}</span>
                <small>Kick-off</small>
              </div>

              <div className="fixture-team">
                <strong>{fixture.away}</strong>
              </div>

            </div>

            <button className="match-centre-btn">
              Match Centre
            </button>

          </article>
        ))}

        {filteredFixtures.length === 0 && (
          <p className="no-fixtures">
            No fixtures available for this competition.
          </p>
        )}
      </div>

    </section>
  );
}

export default FixturesPage;