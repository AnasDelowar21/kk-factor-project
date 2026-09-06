import BreakingNews from "../components/BreakingNews/BreakingNews";
import NewsSlideshow from "../components/Hero/NewsSlideshow";
import LatestNews from "../components/LatestNews/LatestNews";
import MediaSection from "../components/MediaSection/MediaSection";
import SponsorsCarousel from "../components/Sponsors/SponsorsCarousel";
import NewsletterBanner from "../components/NewsletterBanner/NewsletterBanner";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <BreakingNews />
      <SponsorsCarousel />
      <NewsSlideshow />
      <LatestNews />
      <MediaSection />
      <NewsletterBanner />
      <Footer />
    </>
  );
}

export default Home;