// // import { Link, useLocation } from "react-router-dom";

// // const Navbar = () => {
// //   const location = useLocation();

// //   const navItems = [
// //     { name: "Home", path: "/" },
// //     { name: "Football", path: "/football" },
// //     { name: "Teams", path: "/teams" },
// //     { name: "News", path: "/news" },
// //     { name: "Fixtures", path: "/fixtures" },
// //     { name: "Results", path: "/results" },
// //     { name: "Transfers", path: "/transfers" },
// //   ];

// //   return (
// //     <nav
// //       className="navbar navbar-expand-lg"
// //       style={{
// //         backgroundColor: "#111827",
// //         minHeight: "72px",
// //       }}
// //     >
// //       <div className="container">

// //         {/* Logo */}
// //         <Link
// //           to="/"
// //           className="navbar-brand d-flex align-items-center gap-2"
// //           style={{ textDecoration: "none" }}
// //         >
// //           <span
// //             className="d-flex align-items-center justify-content-center"
// //             style={{
// //               width: "42px",
// //               height: "42px",
// //               backgroundColor: "#2563eb",
// //               color: "white",
// //               borderRadius: "6px",
// //               fontWeight: "800",
// //               fontSize: "21px",
// //             }}
// //           >
// //             C
// //           </span>

// //           <span
// //             style={{
// //               color: "white",
// //               fontSize: "22px",
// //               fontWeight: "800",
// //             }}
// //           >
// //             Cabby <span style={{ color: "#60a5fa" }}>Sports</span>
// //           </span>
// //         </Link>

// //         {/* Mobile button */}
// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#cabbyNavbar"
// //           aria-controls="cabbyNavbar"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         {/* Links */}
// //         <div className="collapse navbar-collapse" id="cabbyNavbar">
// //           <div className="navbar-nav ms-auto align-items-lg-center">

// //             {navItems.map((item) => (
// //               <Link
// //                 key={item.path}
// //                 to={item.path}
// //                 className="nav-link"
// //                 style={{
// //                   color:
// //                     location.pathname === item.path
// //                       ? "#60a5fa"
// //                       : "#ffffff",
// //                   fontWeight: "600",
// //                   fontSize: "14px",
// //                   padding: "24px 14px",
// //                 }}
// //               >
// //                 {item.name}
// //               </Link>
// //             ))}

// //             <Link
// //               to="/search"
// //               className="nav-link"
// //               style={{
// //                 color: "white",
// //                 fontSize: "20px",
// //                 padding: "20px 14px",
// //               }}
// //             >
// //               🔍
// //             </Link>

// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav
//       style={{
//         backgroundColor: "#111827",
//         padding: "20px",
//         color: "white",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           display: "flex",
//           alignItems: "center",
//           gap: "30px",
//         }}
//       >
//         <Link
//           to="/"
//           style={{
//             color: "white",
//             textDecoration: "none",
//             fontSize: "24px",
//             fontWeight: "bold",
//           }}
//         >
//           Cabby Sports
//         </Link>

//         <Link to="/" style={{ color: "white" }}>
//           Home
//         </Link>

//         <Link to="/football" style={{ color: "white" }}>
//           Football
//         </Link>

//         <Link to="/teams" style={{ color: "white" }}>
//           Teams
//         </Link>

//         <Link to="/news" style={{ color: "white" }}>
//           News
//         </Link>

//         <Link to="/fixtures" style={{ color: "white" }}>
//           Fixtures
//         </Link>

//         <Link to="/results" style={{ color: "white" }}>
//           Results
//         </Link>

//         <Link to="/transfers" style={{ color: "white" }}>
//           Transfers
//         </Link>

//         <Link to="/search" style={{ color: "white" }}>
//           🔍
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Football", path: "/football" },
//     { name: "Teams", path: "/teams" },
//     { name: "News", path: "/news" },
//     { name: "Fixtures", path: "/fixtures" },
//     { name: "Results", path: "/results" },
//     { name: "Transfers", path: "/transfers" },
//   ];

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <nav className="cabby-navbar">
//       <div className="container">
//         <div className="cabby-navbar-inner">

//           {/* Logo */}
//           {/* <Link to="/" className="cabby-logo-link" onClick={closeMenu}>
//             <span className="cabby-logo-box">C</span>

//             <span className="cabby-logo-text">
//               Cabby <span>Sports</span>
//             </span>
//           </Link> */}

//           {/* Logo */}
// <Link to="/" className="cabby-logo-link" onClick={closeMenu}>
//   <div className="cabby-logo-image-wrap">
//     <img
//       src="/cabby-sports-logo.jpg"
//       alt="Cabby Sports"
//       className="cabby-logo-image"
//     />
//   </div>
// </Link>

//           {/* Desktop Navigation */}
//           <div className="cabby-desktop-nav">
//             {navItems.map((item) => {
//               const active = location.pathname === item.path;

//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`cabby-nav-link ${active ? "active" : ""}`}
//                 >
//                   {item.name}
//                 </Link>
//               );
//             })}

//             <Link to="/search" className="cabby-search">
//               🔍
//             </Link>
//           </div>

//           {/* Mobile Controls */}
//           <div className="cabby-mobile-controls">
//             <Link to="/search" className="cabby-search">
//               🔍
//             </Link>

//             <button
//               type="button"
//               className="cabby-menu-btn"
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Toggle navigation"
//             >
//               {menuOpen ? "✕" : "☰"}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {menuOpen && (
//           <div className="cabby-mobile-nav">
//             {navItems.map((item) => {
//               const active = location.pathname === item.path;

//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={closeMenu}
//                   className={`cabby-mobile-link ${
//                     active ? "active" : ""
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Football", path: "/football" },
    { name: "Teams", path: "/teams" },
    { name: "News", path: "/news" },
    { name: "Fixtures", path: "/fixtures" },
    { name: "Results", path: "/results" },
    { name: "Transfers", path: "/transfers" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="cabby-navbar">
      <div className="container">
        <div className="cabby-navbar-inner">

          {/* =========================
              LOGO
          ========================= */}
          <Link
            to="/"
            className="cabby-brand"
            onClick={closeMenu}
          >
            <img
              src="/cabby-sports-logo.jpg"
              alt="Cabby Sports"
              className="cabby-brand-logo"
            />

            <div className="cabby-brand-text">
              <span className="cabby-name">CABBY</span>
              <span className="sports-name">SPORTS</span>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}
          <div className="cabby-desktop-nav">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`cabby-nav-link ${
                    active ? "active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              to="/search"
              className="cabby-search"
              aria-label="Search"
            >
              🔍
            </Link>
          </div>

          {/* =========================
              MOBILE CONTROLS
          ========================= */}
          <div className="cabby-mobile-controls">

            <Link
              to="/search"
              className="cabby-search"
              aria-label="Search"
            >
              🔍
            </Link>

            <button
              type="button"
              className="cabby-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>
        </div>

        {/* =========================
            MOBILE NAVIGATION
        ========================= */}
        {menuOpen && (
          <div className="cabby-mobile-nav">

            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`cabby-mobile-link ${
                    active ? "active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;