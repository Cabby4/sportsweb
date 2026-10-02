// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <section
//       className="relative min-h-[560px] overflow-hidden bg-cover bg-center sm:min-h-[600px]"
//       style={{
//         backgroundImage:
//           'url("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1800&q=85")',
//       }}
//     >
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

//       {/* Subtle bottom fade */}
//       <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

//       {/* Content */}
//       <div className="relative flex min-h-[560px] items-center sm:min-h-[600px]">
//         <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8">

//           <div className="max-w-[760px]">

//             {/* Category */}
//             <div className="mb-6 flex items-center gap-3">
//               <span className="h-[3px] w-10 bg-blue-500" />

//               <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
//                 Football
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
//               Latest Sports News,
//               <br />
//               <span className="text-blue-500">Updates & Stories</span>
//             </h1>

//             {/* Description */}
//             <p className="mb-9 max-w-[650px] text-base leading-7 text-gray-300 sm:text-lg">
//               Stay up to date with the latest football news, transfers,
//               fixtures, results and stories from around the world.
//             </p>

//             {/* Buttons */}
//             <div className="flex flex-wrap items-center gap-4">
//               <Link
//                 to="/news"
//                 className="group inline-flex items-center gap-3 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-bold text-white no-underline shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
//               >
//                 Read Latest News

//                 <span className="transition-transform group-hover:translate-x-1">
//                   →
//                 </span>
//               </Link>

//               <Link
//                 to="/fixtures"
//                 className="inline-flex items-center rounded-md border border-gray-500/70 bg-black/20 px-6 py-3.5 text-sm font-bold text-white no-underline backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black"
//               >
//                 View Fixtures
//               </Link>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="cabby-hero">
      <div className="cabby-hero-overlay">
        <div className="container">
          <div className="cabby-hero-content">

            <span className="cabby-hero-category">
              FOOTBALL
            </span>

            <h1>
              Latest Sports News,
              <br />
              Updates & Stories
            </h1>

            <p>
              Stay up to date with the latest football news, transfers,
              fixtures, results and stories from around the world.
            </p>

            <div className="cabby-hero-actions">
              <Link to="/news" className="cabby-primary-btn">
                Read Latest News <span>→</span>
              </Link>

              <Link to="/fixtures" className="cabby-secondary-btn">
                View Fixtures
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;