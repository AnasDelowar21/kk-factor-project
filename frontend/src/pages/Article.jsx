import { useParams, Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    category: "WORLD",
    title: "Major International Story",
    content:
      "This is the full article content for the major international story. Later, this information will come from the database or CMS.",
  },
  {
    id: 2,
    category: "ENTERTAINMENT",
    title: "Trending Entertainment News",
    content:
      "This is the full entertainment article. Later, this content will be managed through the CMS.",
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title: "Technology and Innovation",
    content:
      "This is the full technology article. Later, this content will come from the backend and database.",
  },
];

function Article() {
  const { id } = useParams();

  const article = articles.find(
    (item) => item.id === Number(id)
  );

  if (!article) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow">

        <Link
          to="/news"
          className="text-sm font-semibold text-red-600"
        >
          ← Back to News
        </Link>

        <p className="mt-6 text-sm font-semibold text-red-600">
          {article.category}
        </p>

        <h1 className="mt-3 text-4xl font-bold text-gray-900">
          {article.title}
        </h1>

        <p className="mt-6 leading-8 text-gray-700">
          {article.content}
        </p>

      </div>
    </div>
  );
}

export default Article;