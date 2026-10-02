// import { Link } from "react-router-dom";
// import matchData from "../data/matchData";

// const Fixtures = () => {
//   const fixtures = matchData.filter(
//     (match) => match.status === "Upcoming"
//   );

//   return (
//     <section className="matches-section">
//       <div className="matches-heading">
//         <div>
//           <span>UPCOMING</span>
//           <h2>Fixtures</h2>
//         </div>

//         <Link to="/fixtures">View All Fixtures →</Link>
//       </div>

//       <div className="matches-list">
//         {fixtures.slice(0, 3).map((fixture) => (
//           <div className="match-card" key={fixture.id}>
//             <div className="match-competition">
//               {fixture.competition}
//             </div>

//             <div className="match-date">
//               <strong>{fixture.date}</strong>
//               <span>{fixture.time}</span>
//             </div>

//             <div className="match-teams">
//               <div className="match-team">
//                 <span>{fixture.home}</span>
//               </div>

//               <div className="vs">VS</div>

//               <div className="match-team">
//                 <span>{fixture.away}</span>
//               </div>
//             </div>

//             <Link
//               to={`/matches/${fixture.id}`}
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

// export default Fixtures;

import { Link } from "react-router-dom";
import matchData from "../data/matchData";

const Fixtures = () => {
  const upcomingMatches = matchData
    .filter((match) => match.status === "Upcoming")
    .slice(0, 3);

  return (
    <section className="cabby-fixtures-section">
      <div className="container">

        {/* Header */}
        <div className="cabby-section-header">

          <div>
            <span className="cabby-section-label">
              MATCH CENTER
            </span>

            <h2>Upcoming Fixtures</h2>
          </div>

          <Link
            to="/fixtures"
            className="cabby-view-all"
          >
            View All Fixtures <span>→</span>
          </Link>

        </div>

        {/* Fixtures */}
        <div className="cabby-fixtures-list">

          {upcomingMatches.map((match) => (

            <div
              className="cabby-fixture-card"
              key={match.id}
            >

              {/* Competition */}
              <div className="cabby-fixture-top">

                <span className="cabby-fixture-competition">
                  {match.competition}
                </span>

                <span className="cabby-fixture-status">
                  UPCOMING
                </span>

              </div>

              {/* Date & Time */}
              <div className="cabby-fixture-date">

                <strong>{match.date}</strong>

                <span>{match.time}</span>

              </div>

              {/* Teams */}
              <div className="cabby-fixture-teams">

                <div className="cabby-team">
                  <div className="cabby-team-badge">
                    {match.home.charAt(0)}
                  </div>

                  <strong>{match.home}</strong>
                </div>

                <div className="cabby-vs">
                  VS
                </div>

                <div className="cabby-team">
                  <div className="cabby-team-badge">
                    {match.away.charAt(0)}
                  </div>

                  <strong>{match.away}</strong>
                </div>

              </div>

              {/* Match Link */}
              <Link
                to={`/matches/${match.id}`}
                className="cabby-match-button"
              >
                Match Details →
              </Link>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Fixtures;