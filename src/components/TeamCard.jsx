import { Link } from "react-router-dom";

function TeamCard({ id, name, league, logo }) {
  return (
    <article className="team-card">
      <Link to={`/teams/${id}`} className="team-card-link">
        <div className="team-logo">
          <img src={logo} alt={`${name} logo`} />
        </div>

        <div className="team-card-info">
          <h3>{name}</h3>
          <p>{league}</p>
        </div>
      </Link>
    </article>
  );
}

export default TeamCard;