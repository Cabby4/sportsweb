// import { useState } from "react";
// import transferData from "../data/transferData";

// const Transfers = () => {
//   const [filter, setFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredTransfers = transferData.filter((transfer) => {
//     const matchesFilter =
//       filter === "All" || transfer.status === filter;

//     const search = searchTerm.toLowerCase();

//     const matchesSearch =
//       transfer.player.toLowerCase().includes(search) ||
//       transfer.from.toLowerCase().includes(search) ||
//       transfer.to.toLowerCase().includes(search);

//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <main className="transfers-page">

//       {/* Header */}
//       <section className="transfers-header">
//         <span>TRANSFER CENTRE</span>

//         <h1>Football Transfers</h1>

//         <p>
//           Follow the latest football transfers, rumours,
//           completed deals and transfer news.
//         </p>
//       </section>

//       {/* Search */}
//       <section className="transfer-controls">

//         <input
//           type="text"
//           placeholder="Search player or club..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <div className="transfer-filters">
//           {["All", "Completed", "Rumour"].map((status) => (
//             <button
//               key={status}
//               className={filter === status ? "active" : ""}
//               onClick={() => setFilter(status)}
//             >
//               {status}
//             </button>
//           ))}
//         </div>

//       </section>

//       {/* Transfer List */}
//       <section className="transfer-section">

//         <div className="transfer-section-heading">
//           <div>
//             <span>LATEST</span>
//             <h2>Transfer Activity</h2>
//           </div>

//           <p>
//             {filteredTransfers.length} transfer
//             {filteredTransfers.length !== 1 ? "s" : ""}
//           </p>
//         </div>

//         {filteredTransfers.length > 0 ? (
//           <div className="transfer-list">

//             {filteredTransfers.map((transfer) => (
//               <article
//                 className="transfer-card"
//                 key={transfer.id}
//               >

//                 <div className="transfer-player">
//                   <div className="player-avatar">
//                     ⚽
//                   </div>

//                   <div>
//                     <h3>{transfer.player}</h3>
//                     <small>{transfer.date}</small>
//                   </div>
//                 </div>

//                 <div className="transfer-clubs">

//                   <div className="transfer-club">
//                     <span>FROM</span>
//                     <strong>{transfer.from}</strong>
//                   </div>

//                   <div className="transfer-arrow">
//                     →
//                   </div>

//                   <div className="transfer-club">
//                     <span>TO</span>
//                     <strong>{transfer.to}</strong>
//                   </div>

//                 </div>

//                 <div className="transfer-fee">
//                   <span>FEE</span>
//                   <strong>{transfer.fee}</strong>
//                 </div>

//                 <div
//                   className={`transfer-status ${transfer.status.toLowerCase()}`}
//                 >
//                   {transfer.status}
//                 </div>

//               </article>
//             ))}

//           </div>
//         ) : (
//           <div className="no-transfers">
//             <h3>No transfers found</h3>
//             <p>
//               Try searching for another player or club.
//             </p>
//           </div>
//         )}

//       </section>

//     </main>
//   );
// };

// export default Transfers;

import { useState } from "react";
import transferData from "../data/transferData";

const Transfers = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filters = ["All", "Completed", "Rumour"];

  const filteredTransfers = transferData.filter((transfer) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      transfer.player.toLowerCase().includes(searchValue) ||
      transfer.from.toLowerCase().includes(searchValue) ||
      transfer.to.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "All" || transfer.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="transfers-page">

      {/* =================================
          HERO
      ================================= */}
      <section className="transfers-hero">
        <div className="container">

          <div className="transfers-hero-content">

            <span className="transfers-label">
              CABBY SPORTS
            </span>

            <h1>
              Transfer Centre
            </h1>

            <p>
              Follow the latest football transfers,
              completed deals, rumours and transfer
              stories from around the world.
            </p>

          </div>

        </div>
      </section>


      {/* =================================
          TRANSFER CENTRE
      ================================= */}
      <section className="transfers-section">

        <div className="container">

          <div className="cabby-section-header">

            <div>

              <span className="cabby-section-label">
                TRANSFER MARKET
              </span>

              <h2>
                Latest Transfers
              </h2>

            </div>

            <span className="transfers-count">
              {filteredTransfers.length} Transfers
            </span>

          </div>


          {/* =================================
              SEARCH + FILTER
          ================================= */}
          <div className="transfers-filters">

            <div className="transfers-search">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search player or club..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <div className="transfers-status-filter">

              {filters.map((item) => (

                <button
                  type="button"
                  key={item}
                  className={
                    status === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setStatus(item)
                  }
                >
                  {item}
                </button>

              ))}

            </div>

          </div>


          {/* =================================
              TRANSFER TABLE HEADER
          ================================= */}
          <div className="transfers-table-head">

            <span>
              PLAYER
            </span>

            <span>
              TRANSFER
            </span>

            <span>
              FEE
            </span>

            <span>
              STATUS
            </span>

            <span>
              DATE
            </span>

          </div>


          {/* =================================
              TRANSFER LIST
          ================================= */}
          {filteredTransfers.length > 0 ? (

            <div className="transfers-list">

              {filteredTransfers.map((transfer) => (

                <div
                  className="transfer-row"
                  key={transfer.id}
                >

                  {/* PLAYER */}
                  <div className="transfer-player">

                    <div className="transfer-player-avatar">
                      {transfer.player.charAt(0)}
                    </div>

                    <div>

                      <h3>
                        {transfer.player}
                      </h3>

                      <small>
                        Football Transfer
                      </small>

                    </div>

                  </div>


                  {/* TRANSFER */}
                  <div className="transfer-route">

                    <span>
                      {transfer.from}
                    </span>

                    <strong>
                      →
                    </strong>

                    <span>
                      {transfer.to}
                    </span>

                  </div>


                  {/* FEE */}
                  <div className="transfer-fee">

                    <strong>
                      {transfer.fee}
                    </strong>

                  </div>


                  {/* STATUS */}
                  <div>

                    <span
                      className={`transfer-status ${
                        transfer.status === "Completed"
                          ? "completed"
                          : "rumour"
                      }`}
                    >
                      {transfer.status}
                    </span>

                  </div>


                  {/* DATE */}
                  <div className="transfer-date">

                    {transfer.date}

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="transfers-empty">

              <div>
                🔎
              </div>

              <h3>
                No transfers found
              </h3>

              <p>
                Try searching for another player
                or club.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =================================
          TRANSFER CTA
      ================================= */}
      <section className="transfers-cta-section">

        <div className="container">

          <div className="transfers-cta">

            <div>

              <span>
                CABBY SPORTS TRANSFER CENTRE
              </span>

              <h2>
                Follow Every Transfer Story
              </h2>

              <p>
                From confirmed deals to transfer
                rumours, stay updated with the
                football market.
              </p>

            </div>

            <a
              href="/news"
              className="transfers-cta-button"
            >
              Latest Football News →
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Transfers;