import { useState } from "react";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    category: "WORLD",
    title: "Major International Story",
    description:
      "Stay informed with the latest international news and important events happening around the world.",
  },
  {
    id: 2,
    category: "ENTERTAINMENT",
    title: "Trending Entertainment News",
    description:
      "Catch up on the latest stories from music, movies, television and entertainment.",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title: "Technology and Innovation",
    description:
      "Discover the latest developments in technology, innovation and digital media.",
  },
];

function News() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const filteredNews = newsItems.filter((news) => {
    const matchesSearch = news.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "ALL" || news.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Latest News
        </h1>

        <p className="mt-3 text-gray-600">
          Browse the latest stories from THE KK FACTOR.
        </p>

        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-6 w-full max-w-md rounded border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {["ALL", "WORLD", "ENTERTAINMENT", "TECHNOLOGY"].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded px-4 py-2 font-semibold ${
                category === item
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredNews.length > 0 ? (
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                className="overflow-hidden rounded-lg bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 bg-gray-300"></div>

                <div className="p-6">
                  <p className="text-sm font-semibold text-red-600">
                    {news.category}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-gray-900">
                    {news.title}
                  </h2>

                  <p className="mt-3 text-gray-600">
                    {news.description}
                  </p>

                  <Link
                    to={`/article/${news.id}`}
                    className="mt-5 inline-block font-semibold text-red-600 hover:text-red-800"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-lg bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold text-gray-800">
              No news found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;