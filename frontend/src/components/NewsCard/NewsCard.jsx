function NewsCard({ category, title, description }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="h-48 bg-gray-300"></div>

      <div className="p-5">
        <p className="text-sm font-semibold uppercase text-red-600">
          {category}
        </p>

        <h3 className="mt-2 text-xl font-bold text-gray-900">
          {title}
        </h3>

        <p className="mt-3 text-gray-600">
          {description}
        </p>

        <button className="mt-4 font-semibold text-red-600 hover:text-red-800">
          Read More
        </button>
      </div>
    </article>
  );
}

export default NewsCard;