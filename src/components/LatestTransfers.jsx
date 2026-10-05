import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTransfers } from "../services/api";

const LatestTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await getTransfers();

        setTransfers((data.data || []).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch transfers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <section className="cabby-transfers-section">
      <div className="container">

        {/* Header */}
        <div className="cabby-section-header">
          <div>
            <span className="cabby-section-label">
              TRANSFER CENTRE
            </span>

            <h2>Latest Transfers</h2>
          </div>

          <Link
            to="/transfers"
            className="cabby-view-all"
          >
            View All Transfers <span>→</span>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-4">
            <p>Loading transfers...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && transfers.length === 0 && (
          <div className="text-center py-4">
            <p>No recent transfers available.</p>
          </div>
        )}

        {/* Transfers */}
        {!loading && transfers.length > 0 && (
          <div className="row g-4">

            {transfers.map((transfer) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={transfer._id}
              >
                <div className="card h-100 shadow-sm border-0">

                  <div className="card-body">

                    {/* Player */}
                    <div className="text-center">

                      {transfer.playerImage ? (
                        <img
                          src={transfer.playerImage}
                          alt={transfer.playerName}
                          className="rounded-circle mb-3"
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "90px",
                            height: "90px",
                          }}
                        >
                          No Image
                        </div>
                      )}

                      <h5 className="fw-bold mb-1">
                        {transfer.playerName}
                      </h5>

                      <p className="text-muted mb-3">
                        {transfer.position || "Player"}
                      </p>

                    </div>

                    {/* Clubs */}
                    <div className="row align-items-center text-center">

                      {/* From */}
                      <div className="col-5">

                        {transfer.fromClub?.logo ? (
                          <img
                            src={transfer.fromClub.logo}
                            alt={transfer.fromClub.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <div className="text-muted">
                            No Logo
                          </div>
                        )}

                        <p className="small fw-bold mt-2 mb-0">
                          {transfer.fromClub?.name || "Unknown"}
                        </p>

                      </div>

                      {/* Arrow */}
                      <div className="col-2">
                        <strong className="fs-4">
                          →
                        </strong>
                      </div>

                      {/* To */}
                      <div className="col-5">

                        {transfer.toClub?.logo ? (
                          <img
                            src={transfer.toClub.logo}
                            alt={transfer.toClub.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <div className="text-muted">
                            No Logo
                          </div>
                        )}

                        <p className="small fw-bold mt-2 mb-0">
                          {transfer.toClub?.name || "Unknown"}
                        </p>

                      </div>

                    </div>

                    <hr />

                    {/* Transfer Details */}
                    <div className="small">

                      <p className="mb-2">
                        <strong>Fee:</strong>{" "}
                        {transfer.transferFee || "Undisclosed"}
                      </p>

                      <p className="mb-2">
                        <strong>Type:</strong>{" "}
                        {transfer.transferType}
                      </p>

                      <p className="mb-3">
                        <strong>Status:</strong>{" "}
                        <span className="badge bg-success">
                          {transfer.status}
                        </span>
                      </p>

                    </div>

                    {/* Details Button */}
                    <Link
                      to={`/transfers/${transfer._id}`}
                      className="btn btn-dark w-100"
                    >
                      Transfer Details →
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default LatestTransfers;