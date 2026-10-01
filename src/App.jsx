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
  <Route path="/" element={<Home />} />

  <Route path="/news" element={<News />} />

  <Route
    path="/news/:id"
    element={<NewsDetails />}
    />

  <Route path="/football" element={<Football />} />

<Route path="/fixtures" element={<FixturesPage />} />

  <Route path="/results" element={<ResultsPage />} />

  <Route path="/transfers" element={<Transfers />} />

  <Route path="/teams" element={<TeamsPages />} />

  <Route path="/teams/:id" element={<TeamsDetails />} />

<Route path="/search" element={<Search />} />

<Route path="/matches/:id" element={<MatchDetails />} />


</Routes>

      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;