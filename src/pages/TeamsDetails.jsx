// import { Link, useParams } from "react-router-dom";
// import teamData from "../data/TeamData";
// import matchData from "../data/matchData";
// import newsData from "../data/newsData";

// const TeamDetails = () => {
//   const { id } = useParams();

//   const team = teamData.find(
//     (team) => team.id === Number(id)
//   );

//   if (!team) {
//     return (
//       <main className="not-found">
//         <h2>Team Not Found</h2>
//         <Link to="/teams">← Back to Teams</Link>
//       </main>
//     );
//   }

//   const teamMatches = matchData.filter(
//     (match) =>
//       match.home === team.name ||
//       match.away === team.name
//   );

//   const upcomingMatches = teamMatches.filter(
//     (match) => match.status === "Upcoming"
//   );

//   const recentResults = teamMatches.filter(
//     (match) => match.status === "Full Time"
//   );

//   return (
//     <main className="team-details-page">

//       {/* Team Header */}

//       <section className="team-details-header">

//         <div className="team-details-logo">
//           {team.logo}
//         </div>

//         <div>
//           <span>{team.league}</span>

//           <h1>{team.name}</h1>

//           <p>{team.country}</p>
//         </div>

//       </section>

//       {/* Team Information */}

//       <section className="team-info-grid">

//         <div>
//           <span>FOUNDED</span>
//           <strong>{team.founded}</strong>
//         </div>

//         <div>
//           <span>STADIUM</span>
//           <strong>{team.stadium}</strong>
//         </div>

//         <div>
//           <span>MANAGER</span>
//           <strong>{team.manager}</strong>
//         </div>

//         <div>
//           <span>LEAGUE</span>
//           <strong>{team.league}</strong>
//         </div>

//       </section>

//       <div className="team-content-grid">

//         {/* Fixtures */}

//         <section className="team-panel">

//           <div className="team-panel-heading">
//             <div>
//               <span>UPCOMING</span>
//               <h2>Fixtures</h2>
//             </div>

//             <Link to="/fixtures">
//               View All
//             </Link>
//           </div>

//           {upcomingMatches.length > 0 ? (
//             upcomingMatches.map((match) => (
//               <div
//                 className="team-match"
//                 key={match.id}
//               >
//                 <div>
//                   <small>{match.competition}</small>
//                   <p>{match.date}</p>
//                 </div>

//                 <strong>
//                   {match.home}
//                   <br />
//                   vs
//                   <br />
//                   {match.away}
//                 </strong>

//                 <Link to={`/matches/${match.id}`}>
//                   View
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="team-empty">
//               No upcoming fixtures.
//             </p>
//           )}

//         </section>

//         {/* Results */}

//         <section className="team-panel">

//           <div className="team-panel-heading">
//             <div>
//               <span>RECENT</span>
//               <h2>Results</h2>
//             </div>

//             <Link to="/results">
//               View All
//             </Link>
//           </div>

//           {recentResults.length > 0 ? (
//             recentResults.map((match) => (
//               <div
//                 className="team-match"
//                 key={match.id}
//               >
//                 <div>
//                   <small>{match.competition}</small>
//                   <p>{match.date}</p>
//                 </div>

//                 <strong>
//                   {match.home}
//                   <br />
//                   {match.homeScore} - {match.awayScore}
//                   <br />
//                   {match.away}
//                 </strong>

//                 <Link to={`/matches/${match.id}`}>
//                   View
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="team-empty">
//               No recent results.
//             </p>
//           )}

//         </section>

//       </div>

//       {/* Latest News */}

//       <section className="team-panel team-news-panel">

//         <div className="team-panel-heading">
//           <div>
//             <span>NEWS</span>
//             <h2>Latest News</h2>
//           </div>

//           <Link to="/news">
//             View All News
//           </Link>
//         </div>

//         <div className="team-news-grid">

//           {newsData.slice(0, 3).map((article) => (
//             <Link
//               to={`/news/${article.id}`}
//               className="team-news-card"
//               key={article.id}
//             >
//               <img
//                 src={article.image}
//                 alt={article.title}
//               />

//               <div>
//                 <span>{article.category}</span>

//                 <h3>{article.title}</h3>

//                 <small>{article.date}</small>
//               </div>
//             </Link>
//           ))}

//         </div>

//       </section>

//       <Link
//         to="/teams"
//         className="back-to-teams"
//       >
//         ← Back to Teams
//       </Link>

//     </main>
//   );
// };

// export default TeamDetails;

import { Link, useParams } from "react-router-dom";
import teamData from "../data/TeamData";
import matchData from "../data/matchData";
import newsData from "../data/newsData";

const TeamDetails = () => {
  const { id } = useParams();

  const team = teamData.find(
    (item) => item.id === Number(id)
  );

  if (!team) {
    return (
      <main className="team-details-page">
        <div className="container">
          <div className="team-not-found">
            <h1>Team Not Found</h1>

            <p>
              The team you are looking for does not exist.
            </p>

            <Link to="/teams">
              ← Back to Teams
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const upcomingFixtures = matchData
    .filter(
      (match) =>
        match.status === "Upcoming" &&
        (match.home === team.name ||
          match.away === team.name)
    )
    .slice(0, 3);

  const recentResults = matchData
    .filter(
      (match) =>
        match.status === "Full Time" &&
        (match.home === team.name ||
          match.away === team.name)
    )
    .slice(0, 3);

  const teamNews = newsData.slice(0, 3);

  return (
    <main className="team-details-page">

      {/* =================================
          TEAM HERO
      ================================= */}
      <section className="team-details-hero">

        <div className="container">

          <Link
            to="/teams"
            className="team-back-link"
          >
            ← Back to Teams
          </Link>

          <div className="team-profile">

            <div className="team-profile-logo">
              {team.logo}
            </div>

            <div className="team-profile-content">

              <span>
                {team.league}
              </span>

              <h1>
                {team.name}
              </h1>

              <p>
                {team.country}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================
          TEAM OVERVIEW
      ================================= */}
      <section className="team-overview-section">

        <div className="container">

          <div className="team-overview-grid">

            <div className="team-overview-card">

              <span>COUNTRY</span>

              <strong>
                {team.country}
              </strong>

            </div>


            <div className="team-overview-card">

              <span>LEAGUE</span>

              <strong>
                {team.league}
              </strong>

            </div>


            <div className="team-overview-card">

              <span>FOUNDED</span>

              <strong>
                {team.founded}
              </strong>

            </div>


            <div className="team-overview-card">

              <span>STADIUM</span>

              <strong>
                {team.stadium}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =================================
          FIXTURES
      ================================= */}
      <section className="team-content-section">

        <div className="container">

          <div className="cabby-section-header">

            <div>

              <span className="cabby-section-label">
                MATCH CENTER
              </span>

              <h2>
                Upcoming Fixtures
              </h2>

            </div>

            <Link
              to="/fixtures"
              className="cabby-view-all"
            >
              All Fixtures →
            </Link>

          </div>


          {upcomingFixtures.length > 0 ? (

            <div className="team-match-list">

              {upcomingFixtures.map((match) => (

                <div
                  className="team-match-card"
                  key={match.id}
                >

                  <div className="team-match-info">

                    <span>
                      {match.competition}
                    </span>

                    <strong>
                      {match.date}
                    </strong>

                    <small>
                      {match.time}
                    </small>

                  </div>


                  <div className="team-match-teams">

                    <div>
                      <span>
                        {match.home.charAt(0)}
                      </span>

                      <strong>
                        {match.home}
                      </strong>
                    </div>


                    <b>
                      VS
                    </b>


                    <div>
                      <span>
                        {match.away.charAt(0)}
                      </span>

                      <strong>
                        {match.away}
                      </strong>
                    </div>

                  </div>


                  <Link
                    to={`/matches/${match.id}`}
                    className="team-match-details"
                  >
                    Details →
                  </Link>

                </div>

              ))}

            </div>

          ) : (

            <div className="team-empty-state">
              No upcoming fixtures available.
            </div>

          )}

        </div>

      </section>


      {/* =================================
          RESULTS
      ================================= */}
      <section className="team-results-section">

        <div className="container">

          <div className="cabby-section-header">

            <div>

              <span className="cabby-section-label">
                MATCH CENTER
              </span>

              <h2>
                Recent Results
              </h2>

            </div>

            <Link
              to="/results"
              className="cabby-view-all"
            >
              All Results →
            </Link>

          </div>


          {recentResults.length > 0 ? (

            <div className="team-results-list">

              {recentResults.map((match) => {

                const teamIsHome =
                  match.home === team.name;

                const teamScore =
                  teamIsHome
                    ? match.homeScore
                    : match.awayScore;

                const opponentScore =
                  teamIsHome
                    ? match.awayScore
                    : match.homeScore;

                const result =
                  teamScore > opponentScore
                    ? "W"
                    : teamScore < opponentScore
                      ? "L"
                      : "D";

                return (

                  <div
                    className="team-result-card"
                    key={match.id}
                  >

                    <div className="team-result-date">

                      <span>
                        {match.competition}
                      </span>

                      <strong>
                        {match.date}
                      </strong>

                    </div>


                    <div className="team-result-match">

                      <div>
                        {match.home}
                      </div>

                      <strong>
                        {match.homeScore}
                      </strong>

                      <b>-</b>

                      <strong>
                        {match.awayScore}
                      </strong>

                      <div>
                        {match.away}
                      </div>

                    </div>


                    <span
                      className={`team-result-badge result-${result.toLowerCase()}`}
                    >
                      {result}
                    </span>


                    <Link
                      to={`/matches/${match.id}`}
                      className="team-match-details"
                    >
                      Details →
                    </Link>

                  </div>

                );

              })}

            </div>

          ) : (

            <div className="team-empty-state">
              No recent results available.
            </div>

          )}

        </div>

      </section>


      {/* =================================
          TEAM NEWS
      ================================= */}
      <section className="team-news-section">

        <div className="container">

          <div className="cabby-section-header">

            <div>

              <span className="cabby-section-label">
                LATEST
              </span>

              <h2>
                Latest Football News
              </h2>

            </div>

            <Link
              to="/news"
              className="cabby-view-all"
            >
              All News →
            </Link>

          </div>


          <div className="team-news-grid">

            {teamNews.map((article) => (

              <Link
                to={`/news/${article.id}`}
                className="team-news-card"
                key={article.id}
              >

                <div className="team-news-image">

                  <img
                    src={article.image}
                    alt={article.title}
                  />

                  <span>
                    {article.category}
                  </span>

                </div>


                <div className="team-news-content">

                  <small>
                    {article.date}
                  </small>

                  <h3>
                    {article.title}
                  </h3>

                  <strong>
                    Read Story →
                  </strong>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          TEAM CTA
      ================================= */}
      <section className="team-cta-section">

        <div className="container">

          <div className="team-cta">

            <div>

              <span>
                CABBY SPORTS
              </span>

              <h2>
                Follow {team.name}
              </h2>

              <p>
                Stay updated with fixtures, results
                and the latest football stories.
              </p>

            </div>

            <Link
              to="/news"
              className="team-cta-button"
            >
              Latest News →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default TeamDetails;