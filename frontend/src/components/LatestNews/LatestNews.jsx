import NewsCard from "../NewsCard/NewsCard";

function LatestNews() {
  return (
    <section className="bg-[#FAFAFA] py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-[#1A1A1A]">
            Latest News
          </h2>

          <button className="font-bold text-[#FF1F8E] hover:text-[#C4006A] transition-colors duration-200">
            View All →
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <NewsCard
            category="World"
            title="Major International Story"
            description="The latest updates and important information from around the world."
          />

          <NewsCard
            category="Entertainment"
            title="Trending Entertainment News"
            description="Discover the newest stories from music, television and entertainment."
          />

          <NewsCard
            category="Technology"
            title="Technology and Innovation"
            description="Read about the latest developments in technology and digital media."
          />
        </div>
      </div>
    </section>
  );
}

export default LatestNews;