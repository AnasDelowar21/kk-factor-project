import BreakingNews from "../components/BreakingNews/BreakingNews";
import NewsSlideshow from "../components/Hero/NewsSlideshow";
import LatestNews from "../components/LatestNews/LatestNews";
import MediaSection from "../components/MediaSection/MediaSection";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <BreakingNews />
      <NewsSlideshow />
      <LatestNews />
      <MediaSection />
      <Footer />
    </>
  );
}

export default Home;