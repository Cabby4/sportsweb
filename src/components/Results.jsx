// import { Link } from "react-router-dom";
// import matchData from "../data/matchData";

// const Results = () => {
//   const results = matchData.filter(
//     (match) => match.status === "Full Time"
//   );

//   return (
//     <section className="matches-section results-section">
//       <div className="matches-heading">
//         <div>
//           <span>RECENT</span>
//           <h2>Results</h2>
//         </div>

//         <Link to="/results">View All Results →</Link>
//       </div>

//       <div className="matches-list">
//         {results.slice(0, 3).map((result) => (
//           <div className="match-card" key={result.id}>
//             <div className="match-competition">
//               {result.competition}
//             </div>

//             <div className="match-date">
//               <strong>{result.date}</strong>
//               <span>Full Time</span>
//             </div>

//             <div className="match-teams">
//               <div className="match-team">
//                 <span>{result.home}</span>
//                 <strong>{result.homeScore}</strong>
//               </div>

//               <div className="vs">-</div>

//               <div className="match-team">
//                 <span>{result.away}</span>
//                 <strong>{result.awayScore}</strong>
//               </div>
//             </div>

//             <Link
//               to={`/matches/${result.id}`}
//               className="match-centre-btn"
//             >
//               Match Centre
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Results;

import { Link } from "react-router-dom";
import matchData from "../data/matchData";

const Results = () => {
  const completedMatches = matchData
    .filter((match) => match.status === "Full Time")
    .slice(0, 3);

  return (
    <section className="cabby-results-section">
      <div className="container">

        {/* Header */}
        <div className="cabby-section-header">

          <div>
            <span className="cabby-section-label">
              MATCH CENTER
            </span>

            <h2>Recent Results</h2>
          </div>

          <Link
            to="/results"
            className="cabby-view-all"
          >
            View All Results <span>→</span>
          </Link>

        </div>

        {/* Results */}
        <div className="cabby-results-list">

          {completedMatches.map((match) => {

            const homeWon = match.homeScore > match.awayScore;
            const awayWon = match.awayScore > match.homeScore;
            const draw = match.homeScore === match.awayScore;

            return (
              <div
                className="cabby-result-card"
                key={match.id}
              >

                {/* Competition */}
                <div className="cabby-result-top">

                  <span className="cabby-result-competition">
                    {match.competition}
                  </span>

                  <span className="cabby-result-status">
                    FULL TIME
                  </span>

                </div>

                {/* Date */}
                <div className="cabby-result-date">
                  {match.date}
                </div>

                {/* Teams & Score */}
                <div className="cabby-result-teams">

                  {/* Home */}
                  <div
                    className={`cabby-result-team ${
                      homeWon ? "winner" : ""
                    }`}
                  >

                    <div className="cabby-result-badge">
                      {match.home.charAt(0)}
                    </div>

                    <strong>
                      {match.home}
                    </strong>

                  </div>

                  {/* Score */}
                  <div className="cabby-final-score">

                    <div className="cabby-score">
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

                  </div>

                  {/* Away */}
                  <div
                    className={`cabby-result-team ${
                      awayWon ? "winner" : ""
                    }`}
                  >

                    <div className="cabby-result-badge">
                      {match.away.charAt(0)}
                    </div>

                    <strong>
                      {match.away}
                    </strong>

                  </div>

                </div>

                {/* Details */}
                <Link
                  to={`/matches/${match.id}`}
                  className="cabby-result-button"
                >
                  Match Details →
                </Link>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Results;