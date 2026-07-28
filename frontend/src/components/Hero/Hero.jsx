import heroImage from "../../assets/hero.jpg";

function Hero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-red-500">
            Breaking News
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            News, Radio, Music and Live Streaming in One Place
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Stay updated with the latest stories, listen to live radio, enjoy
            music and watch live broadcasts through THE KK FACTOR.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">
              Explore News
            </button>

            <button className="rounded border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black">
              Watch Live
            </button>
          </div>
        </div>

        <img
          src={heroImage}
          alt="THE KK FACTOR featured media"
          className="h-80 w-full rounded-lg object-cover shadow-xl md:h-96"
        />
      </div>
    </section>
  );
}

export default Hero;