function MediaSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
        
        <div className="rounded-lg bg-gray-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase text-red-500">
            Live Radio
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Listen Live Now
          </h2>

          <p className="mt-3 text-gray-300">
            Stream THE KK FACTOR radio directly from the website.
          </p>

          <button className="mt-6 rounded bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">
            Play Radio
          </button>
        </div>

        <div className="rounded-lg bg-gray-200 p-8">
          <p className="text-sm font-semibold uppercase text-red-600">
            Music Player
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Featured Playlist
          </h2>

          <p className="mt-3 text-gray-600">
            Enjoy selected tracks and playlists from THE KK FACTOR.
          </p>

          <button className="mt-6 rounded bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800">
            Open Music Player
          </button>
        </div>

      </div>
    </section>
  );
}

export default MediaSection;