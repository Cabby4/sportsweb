
// import { Link, useParams } from "react-router-dom";
// import matchData from "../data/matchData";

// const matches = [
//   {
//     id: 1,
//     competition: "Premier League",
//     date: "Saturday, 04 October",
//     time: "15:00",
//     home: "Chelsea",
//     away: "Arsenal",
//     status: "Upcoming",
//     homeScore: null,
//     awayScore: null,
//   },
//   {
//     id: 2,
//     competition: "La Liga",
//     date: "Sunday, 05 October",
//     time: "20:00",
//     home: "Barcelona",
//     away: "Real Madrid",
//     status: "Upcoming",
//     homeScore: null,
//     awayScore: null,
//   },
//   {
//     id: 3,
//     competition: "Premier League",
//     date: "Wednesday, 01 October",
//     time: "20:00",
//     home: "Liverpool",
//     away: "Chelsea",
//     status: "Full Time",
//     homeScore: 2,
//     awayScore: 1,
//   },
// ];

// const MatchDetails = () => {
//   const { id } = useParams();

//   const match = matchData.find(
//   (match) => match.id === Number(id)
// );

//   if (!match) {
//     return (
//       <div className="not-found">
//         <h2>Match Not Found</h2>
//         <Link to="/fixtures">← Back to Fixtures</Link>
//       </div>
//     );
//   }

//   return (
//     <main className="match-details">

//       {/* Match Header */}
//       <section className="match-details-header">

//         <span className="match-details-competition">
//           {match.competition}
//         </span>

//         <span className="match-status">
//           {match.status}
//         </span>

//         <p>
//           {match.date} · {match.time}
//         </p>

//         <div className="match-scoreboard">

//           <div className="match-details-team">
//             <div className="team-logo-placeholder">
//               ⚽
//             </div>

//             <h2>{match.home}</h2>
//           </div>

//           <div className="match-main-score">
//             {match.homeScore !== null ? (
//               <>
//                 <strong>{match.homeScore}</strong>
//                 <span>-</span>
//                 <strong>{match.awayScore}</strong>
//               </>
//             ) : (
//               <span className="vs-large">VS</span>
//             )}
//           </div>

//           <div className="match-details-team">
//             <div className="team-logo-placeholder">
//               ⚽
//             </div>

//             <h2>{match.away}</h2>
//           </div>

//         </div>
//       </section>

//       {/* Match Information */}
//       <section className="match-info-grid">

//         <div className="match-info-card">
//           <h3>Match Information</h3>

//           <div className="match-info-row">
//             <span>Competition</span>
//             <strong>{match.competition}</strong>
//           </div>

//           <div className="match-info-row">
//             <span>Date</span>
//             <strong>{match.date}</strong>
//           </div>

//           <div className="match-info-row">
//             <span>Kick-off</span>
//             <strong>{match.time}</strong>
//           </div>

//           <div className="match-info-row">
//             <span>Status</span>
//             <strong>{match.status}</strong>
//           </div>
//         </div>

//         <div className="match-info-card">
//           <h3>Match Stats</h3>

//           <div className="stat-row">
//             <span>Possession</span>
//             <strong>50% - 50%</strong>
//           </div>

//           <div className="stat-row">
//             <span>Shots</span>
//             <strong>0 - 0</strong>
//           </div>

//           <div className="stat-row">
//             <span>Shots on Target</span>
//             <strong>0 - 0</strong>
//           </div>

//           <div className="stat-row">
//             <span>Corners</span>
//             <strong>0 - 0</strong>
//           </div>
//         </div>

//       </section>

//       {/* Match Events */}
//       <section className="match-events">
//         <h2>Match Events</h2>

//         <div className="empty-events">
//           {match.status === "Upcoming" ? (
//             <p>Match events will appear here during the game.</p>
//           ) : (
//             <p>No match events have been added yet.</p>
//           )}
//         </div>
//       </section>

//       <Link to="/fixtures" className="back-matches">
//         ← Back to Fixtures
//       </Link>

//     </main>
//   );
// };

// export default MatchDetails;

import { Link, useParams } from "react-router-dom";
import matchData from "../data/matchData";

const MatchDetails = () => {
  const { id } = useParams();

  const match = matchData.find(
    (item) => item.id === Number(id)
  );

  if (!match) {
    return (
      <main className="match-details-page">
        <section className="match-not-found">
          <div className="container">
            <span>404</span>
            <h1>Match Not Found</h1>
            <p>
              We couldn't find the match you're looking for.
            </p>

            <Link to="/fixtures" className="match-back-button">
              Back to Fixtures
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const isUpcoming = match.status === "Upcoming";

  const homeWon =
    !isUpcoming && match.homeScore > match.awayScore;

  const awayWon =
    !isUpcoming && match.awayScore > match.homeScore;

  const draw =
    !isUpcoming &&
    match.homeScore === match.awayScore;

  return (
    <main className="match-details-page">

      {/* HERO */}
      <section className="match-details-hero">
        <div className="container">

          <Link
            to={isUpcoming ? "/fixtures" : "/results"}
            className="match-back-link"
          >
            ← Back to {isUpcoming ? "Fixtures" : "Results"}
          </Link>

          <div className="match-details-header">
            <span className="match-details-competition">
              {match.competition}
            </span>

            <span
              className={`match-details-status ${
                isUpcoming ? "upcoming" : "finished"
              }`}
            >
              {isUpcoming ? "UPCOMING" : "FULL TIME"}
            </span>
          </div>

          <div className="match-details-date">
            <strong>{match.date}</strong>
            <span>{match.time}</span>
          </div>

          {/* MATCH SCOREBOARD */}
          <div className="match-scoreboard">

            {/* HOME */}
            <div
              className={`match-score-team ${
                homeWon ? "winner" : ""
              }`}
            >
              <div className="match-large-badge">
                {match.home.charAt(0)}
              </div>

              <h2>{match.home}</h2>

              {!isUpcoming && homeWon && (
                <span className="match-result-label">
                  WINNER
                </span>
              )}
            </div>

            {/* SCORE */}
            <div className="match-score-center">
              {isUpcoming ? (
                <>
                  <span className="match-vs-large">
                    VS
                  </span>

                  <small>
                    {match.time}
                  </small>
                </>
              ) : (
                <>
                  <div className="match-final-score">
                    <span>{match.homeScore}</span>
                    <b>-</b>
                    <span>{match.awayScore}</span>
                  </div>

                  <small>
                    {draw
                      ? "DRAW"
                      : homeWon
                      ? `${match.home} WON`
                      : `${match.away} WON`}
                  </small>
                </>
              )}
            </div>

            {/* AWAY */}
            <div
              className={`match-score-team ${
                awayWon ? "winner" : ""
              }`}
            >
              <div className="match-large-badge">
                {match.away.charAt(0)}
              </div>

              <h2>{match.away}</h2>

              {!isUpcoming && awayWon && (
                <span className="match-result-label">
                  WINNER
                </span>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* MATCH INFORMATION */}
      <section className="match-info-section">
        <div className="container">

          <div className="match-info-grid">

            <div className="match-info-card">
              <span>COMPETITION</span>
              <strong>{match.competition}</strong>
            </div>

            <div className="match-info-card">
              <span>DATE</span>
              <strong>{match.date}</strong>
            </div>

            <div className="match-info-card">
              <span>KICK-OFF</span>
              <strong>{match.time}</strong>
            </div>

            <div className="match-info-card">
              <span>STATUS</span>
              <strong>
                {isUpcoming ? "Upcoming" : "Full Time"}
              </strong>
            </div>

          </div>

        </div>
      </section>

      {/* TEAM LINKS */}
      <section className="match-teams-section">
        <div className="container">

          <div className="cabby-section-header">
            <div>
              <span className="cabby-section-label">
                TEAMS
              </span>

              <h2>Match Teams</h2>
            </div>
          </div>

          <div className="match-team-links">

            <Link
              to={`/teams/${getTeamId(match.home)}`}
              className="match-team-link"
            >
              <div className="match-team-link-badge">
                {match.home.charAt(0)}
              </div>

              <div>
                <span>HOME TEAM</span>
                <strong>{match.home}</strong>
              </div>

              <b>→</b>
            </Link>

            <Link
              to={`/teams/${getTeamId(match.away)}`}
              className="match-team-link"
            >
              <div className="match-team-link-badge">
                {match.away.charAt(0)}
              </div>

              <div>
                <span>AWAY TEAM</span>
                <strong>{match.away}</strong>
              </div>

              <b>→</b>
            </Link>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="match-details-cta-section">
        <div className="container">

          <div className="match-details-cta">

            <div>
              <span>CABBY SPORTS</span>

              <h2>
                Follow More Football Action
              </h2>

              <p>
                Check upcoming fixtures, recent results,
                transfer news and the latest football stories.
              </p>
            </div>

            <Link
              to="/football"
              className="match-details-cta-button"
            >
              Football Hub →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
};

/*
  Temporary helper.

  Once the backend is connected, team IDs will come
  directly from the API/database.
*/
const getTeamId = (teamName) => {
  const teams = {
    Chelsea: 1,
    Arsenal: 2,
    Liverpool: 3,
    "Manchester City": 4,
    Barcelona: 5,
    "Real Madrid": 6,
    "Bayern Munich": 7,
    "Inter Milan": 8,
    "AC Milan": 8,
    Juventus: 8,
  };

  return teams[teamName] || 1;
};

export default MatchDetails;