import Hero from "../components/Hero";
import BreakingNews from "../components/BreakingNews";
import LatestNews from "../components/LatestNews";
import Fixtures from "../components/Fixtures";
import Results from "../components/Results";
import TrendingNews from "../components/TrendingNews";

function Home() {
  return (
    <>
      <Hero />
      <BreakingNews />
      <LatestNews />
      <TrendingNews />
      <Fixtures />
      <Results />
  
    </>
  );
}

export default Home;