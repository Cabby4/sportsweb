import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchNews, searchTeams } from "../services/api";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [news, setNews] = useState([]);
  const [teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setNews([]);
      setTeams([]);
      setError("Please enter something to search.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      setSearchParams({ q: trimmedQuery });

      const [newsResponse, teamsResponse] = await Promise.all([
        searchNews(trimmedQuery),
        searchTeams(trimmedQuery),
      ]);

      setNews(newsResponse.data || []);
      setTeams(teamsResponse.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">
          Search Cabby Sports
        </h1>

        <p className="text-muted">
          Search for football news and teams.
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="row g-2 mb-5"
      >
        <div className="col-md-10">

          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search news or teams..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

        </div>

        <div className="col-md-2">

          <button
            type="submit"
            className="btn btn-dark btn-lg w-100"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>

        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Results */}
      {!loading && !error && query.trim() && (
        <>
          {/* News */}
          <section className="mb-5">

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold">
                News
              </h3>

              <span className="text-muted">
                {news.length} result{news.length !== 1 ? "s" : ""}
              </span>
            </div>

            {news.length === 0 ? (
              <p className="text-muted">
                No news found.
              </p>
            ) : (
              <div className="row g-4">

                {news.map((item) => (
                  <div
                    className="col-md-6 col-lg-4"
                    key={item._id}
                  >

                    <div className="card h-100 shadow-sm">

                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="card-img-top"
                          style={{
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      )}

                      <div className="card-body">

                        <span className="badge bg-success mb-2">
                          {item.category}
                        </span>

                        <h5 className="fw-bold">
                          {item.title}
                        </h5>

                        <p className="text-muted">
                          {item.summary}
                        </p>

                        <Link
                          to={`/news/${item._id}`}
                          className="btn btn-dark"
                        >
                          Read More
                        </Link>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </section>

          {/* Teams */}
          <section>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold">
                Teams
              </h3>

              <span className="text-muted">
                {teams.length} result{teams.length !== 1 ? "s" : ""}
              </span>
            </div>

            {teams.length === 0 ? (
              <p className="text-muted">
                No teams found.
              </p>
            ) : (
              <div className="row g-4">

                {teams.map((team) => (
                  <div
                    className="col-12 col-sm-6 col-lg-3"
                    key={team._id}
                  >

                    <div className="card h-100 shadow-sm text-center">

                      <div className="pt-4">

                        {team.logo ? (
                          <img
                            src={team.logo}
                            alt={team.name}
                            style={{
                              width: "90px",
                              height: "90px",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <div>
                            No Logo
                          </div>
                        )}

                      </div>

                      <div className="card-body">

                        <h5 className="fw-bold">
                          {team.name}
                        </h5>

                        <p className="text-muted mb-2">
                          {team.league}
                        </p>

                        <Link
                          to={`/teams/${team._id}`}
                          className="btn btn-dark"
                        >
                          View Team
                        </Link>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </section>
        </>
      )}

    </div>
  );
};

export default Search;