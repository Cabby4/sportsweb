import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTransfers } from "../services/api";

const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await getTransfers();
        setTransfers(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading transfers...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">{error}</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">Transfer Centre</h1>
        <p className="text-muted">
          Latest football transfer news and movements.
        </p>
      </div>

      {transfers.length === 0 ? (
        <div className="alert alert-info">
          No transfers available.
        </div>
      ) : (
        <div className="row g-4">

          {transfers.map((transfer) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={transfer._id}
            >
              <div className="card h-100 shadow-sm border-0">

                {/* Player */}
                <div className="card-body text-center">

                  {transfer.playerImage ? (
                    <img
                      src={transfer.playerImage}
                      alt={transfer.playerName}
                      className="rounded-circle mb-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      No Image
                    </div>
                  )}

                  <h5 className="fw-bold">
                    {transfer.playerName}
                  </h5>

                  <p className="text-muted">
                    {transfer.position || "Player"}
                  </p>

                  {/* Clubs */}
                  <div className="row align-items-center">

                    <div className="col-5">
                      {transfer.fromClub?.logo && (
                        <img
                          src={transfer.fromClub.logo}
                          alt={transfer.fromClub.name}
                          style={{
                            width: "55px",
                            height: "55px",
                            objectFit: "contain",
                          }}
                        />
                      )}

                      <p className="small fw-bold mt-2">
                        {transfer.fromClub?.name || "Unknown"}
                      </p>
                    </div>

                    <div className="col-2">
                      →
                    </div>

                    <div className="col-5">
                      {transfer.toClub?.logo && (
                        <img
                          src={transfer.toClub.logo}
                          alt={transfer.toClub.name}
                          style={{
                            width: "55px",
                            height: "55px",
                            objectFit: "contain",
                          }}
                        />
                      )}

                      <p className="small fw-bold mt-2">
                        {transfer.toClub?.name || "Unknown"}
                      </p>
                    </div>

                  </div>

                  <hr />

                  {/* Transfer information */}
                  <p className="mb-1">
                    <strong>Fee:</strong>{" "}
                    {transfer.transferFee || "Undisclosed"}
                  </p>

                  <p className="mb-1">
                    <strong>Type:</strong>{" "}
                    {transfer.transferType}
                  </p>

                  <p className="mb-3">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">
                      {transfer.status}
                    </span>
                  </p>

                  <Link
                    to={`/transfers/${transfer._id}`}
                    className="btn btn-dark"
                  >
                    Transfer Details
                  </Link>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Transfers;