import Hero from "../components/Hero/Hero";
import BreakingNews from "../components/BreakingNews/BreakingNews";
import LatestNews from "../components/LatestNews/LatestNews";
import MediaSection from "../components/MediaSection/MediaSection";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <BreakingNews />
      <Hero />
      <LatestNews />
      <MediaSection />
      <Footer />
    </>
  );
}

export default Home;