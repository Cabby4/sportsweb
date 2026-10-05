import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTransferById } from "../services/api";

const TransferDetails = () => {
  const { id } = useParams();

  const [transfer, setTransfer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const data = await getTransferById(id);
        setTransfer(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfer();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading transfer...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">{error}</h4>

        <Link to="/transfers" className="btn btn-dark mt-3">
          Back to Transfers
        </Link>
      </div>
    );
  }

  if (!transfer) {
    return (
      <div className="container py-5 text-center">
        <h4>Transfer not found</h4>

        <Link to="/transfers" className="btn btn-dark mt-3">
          Back to Transfers
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <Link
        to="/transfers"
        className="btn btn-outline-dark mb-4"
      >
        ← Back to Transfers
      </Link>

      <div className="card border-0 shadow-sm">

        <div className="card-body p-4 p-md-5 text-center">

          {transfer.playerImage && (
            <img
              src={transfer.playerImage}
              alt={transfer.playerName}
              className="rounded-circle mb-3"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
          )}

          <h1 className="fw-bold">
            {transfer.playerName}
          </h1>

          <p className="text-muted">
            {transfer.position || "Football Player"}
          </p>

          <span className="badge bg-success mb-4">
            {transfer.status}
          </span>

          <div className="row align-items-center">

            {/* From Club */}
            <div className="col-5">

              {transfer.fromClub?.logo && (
                <img
                  src={transfer.fromClub.logo}
                  alt={transfer.fromClub.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                  }}
                />
              )}

              <h4 className="fw-bold mt-3">
                {transfer.fromClub?.name}
              </h4>

            </div>

            {/* Arrow */}
            <div className="col-2">
              <span className="display-5">
                →
              </span>
            </div>

            {/* To Club */}
            <div className="col-5">

              {transfer.toClub?.logo && (
                <img
                  src={transfer.toClub.logo}
                  alt={transfer.toClub.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                  }}
                />
              )}

              <h4 className="fw-bold mt-3">
                {transfer.toClub?.name}
              </h4>

            </div>

          </div>

          <hr className="my-4" />

          <div className="row">

            <div className="col-md-4 mb-3">
              <h6 className="fw-bold">Transfer Fee</h6>
              <p className="text-muted">
                {transfer.transferFee || "Undisclosed"}
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <h6 className="fw-bold">Transfer Type</h6>
              <p className="text-muted">
                {transfer.transferType}
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <h6 className="fw-bold">Transfer Date</h6>
              <p className="text-muted">
                {new Date(
                  transfer.transferDate
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          {transfer.contractLength && (
            <div className="mb-3">
              <h6 className="fw-bold">
                Contract Length
              </h6>

              <p className="text-muted">
                {transfer.contractLength}
              </p>
            </div>
          )}

          {transfer.description && (
            <div className="border-top pt-4 mt-3">
              <h5 className="fw-bold">
                Transfer Information
              </h5>

              <p className="text-muted">
                {transfer.description}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default TransferDetails;