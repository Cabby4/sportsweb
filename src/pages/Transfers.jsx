import { useState } from "react";
import transferData from "../data/transferData";

const Transfers = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransfers = transferData.filter((transfer) => {
    const matchesFilter =
      filter === "All" || transfer.status === filter;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      transfer.player.toLowerCase().includes(search) ||
      transfer.from.toLowerCase().includes(search) ||
      transfer.to.toLowerCase().includes(search);

    return matchesFilter && matchesSearch;
  });

  return (
    <main className="transfers-page">

      {/* Header */}
      <section className="transfers-header">
        <span>TRANSFER CENTRE</span>

        <h1>Football Transfers</h1>

        <p>
          Follow the latest football transfers, rumours,
          completed deals and transfer news.
        </p>
      </section>

      {/* Search */}
      <section className="transfer-controls">

        <input
          type="text"
          placeholder="Search player or club..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="transfer-filters">
          {["All", "Completed", "Rumour"].map((status) => (
            <button
              key={status}
              className={filter === status ? "active" : ""}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

      </section>

      {/* Transfer List */}
      <section className="transfer-section">

        <div className="transfer-section-heading">
          <div>
            <span>LATEST</span>
            <h2>Transfer Activity</h2>
          </div>

          <p>
            {filteredTransfers.length} transfer
            {filteredTransfers.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredTransfers.length > 0 ? (
          <div className="transfer-list">

            {filteredTransfers.map((transfer) => (
              <article
                className="transfer-card"
                key={transfer.id}
              >

                <div className="transfer-player">
                  <div className="player-avatar">
                    ⚽
                  </div>

                  <div>
                    <h3>{transfer.player}</h3>
                    <small>{transfer.date}</small>
                  </div>
                </div>

                <div className="transfer-clubs">

                  <div className="transfer-club">
                    <span>FROM</span>
                    <strong>{transfer.from}</strong>
                  </div>

                  <div className="transfer-arrow">
                    →
                  </div>

                  <div className="transfer-club">
                    <span>TO</span>
                    <strong>{transfer.to}</strong>
                  </div>

                </div>

                <div className="transfer-fee">
                  <span>FEE</span>
                  <strong>{transfer.fee}</strong>
                </div>

                <div
                  className={`transfer-status ${transfer.status.toLowerCase()}`}
                >
                  {transfer.status}
                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="no-transfers">
            <h3>No transfers found</h3>
            <p>
              Try searching for another player or club.
            </p>
          </div>
        )}

      </section>

    </main>
  );
};

export default Transfers;