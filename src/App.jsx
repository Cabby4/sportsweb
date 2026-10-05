import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import News from "./pages/News";
import Football from "./pages/Football";
import FixturesPage from "./pages/FixturesPage";
import ResultsPage from "./pages/ResultsPage";
import Transfers from "./pages/Transfers";
import MatchDetails from "./pages/MatchDetails";
import TransferDetails from "./pages/TransferDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute";
import AdminNews from "./pages/admin/AdminNews";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminFixtures from "./pages/admin/AdminFixtures";
import AdminResults from "./pages/admin/AdminResults";
import AdminTransfers from "./pages/admin/AdminTransfers";

import ResultDetails from "./pages/ResultDetails";
import NewsDetails from "./pages/NewsDetails";
import TeamsPages from "./pages/TeamsPages";
import TeamsDetails from "./pages/TeamsDetails";
import Search from "./pages/search";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>  

          <Routes>

  {/* PUBLIC ROUTES */}

  <Route path="/" element={<Home />} />
  <Route path="/news" element={<News />} />
  <Route path="/news/:id" element={<NewsDetails />} />
  <Route path="/football" element={<Football />} />
  <Route path="/fixtures" element={<FixturesPage />} />
  <Route path="/matches/:id" element={<MatchDetails />} />
  <Route path="/results" element={<ResultsPage />} />
  <Route path="/results/:id" element={<ResultDetails />} />
  <Route path="/transfers" element={<Transfers />} />
  <Route path="/transfers/:id" element={<TransferDetails />} />
  <Route path="/teams" element={<TeamsPages />} />
  <Route path="/teams/:id" element={<TeamsDetails />} />
  <Route path="/search" element={<Search />} />

  {/* ADMIN LOGIN */}

  <Route
    path="/admin/login"
    element={<AdminLogin />}
  />

  {/* PROTECTED ADMIN ROUTES */}

  <Route element={<ProtectedAdminRoute />}>

    <Route
      path="/admin/dashboard"
      element={<AdminDashboard />}
    />

    <Route
      path="/admin/news"
      element={<AdminNews />}
    />

  </Route>

  <Route
    path="/admin/teams"
    element={<AdminTeams />}
  />

  <Route
    path="/admin/fixtures"
    element={<AdminFixtures />}
  />

  <Route
    path="/admin/results"
    element={<AdminResults />}
  />

  <Route
    path="/admin/transfers"
    element={<AdminTransfers />}
  />

</Routes>

      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;