import heroImage from "../../assets/hero.jpg";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-white via-[#FFF0F7] to-[#F5F0FF] text-[#1A1A1A]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#FF1F8E]">
            Breaking News
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl text-[#1A1A1A]">
            News, Radio, Music and Live Streaming in One Place
          </h1>

          <p className="mt-6 text-lg text-[#555555]">
            Stay updated with the latest stories, listen to live radio, enjoy
            music and watch live broadcasts through THE KK FACTOR.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-full bg-[#FF1F8E] px-7 py-3 font-bold text-white shadow-md hover:bg-[#C4006A] transition-colors duration-200">
              Explore News
            </button>

            <button className="rounded-full border-2 border-[#7B5EA7] px-7 py-3 font-bold text-[#7B5EA7] hover:bg-[#7B5EA7] hover:text-white transition-all duration-200">
              Watch Live
            </button>
          </div>
        </div>

        <img
          src={heroImage}
          alt="THE KK FACTOR featured media"
          className="h-80 w-full rounded-2xl object-cover shadow-xl md:h-96 ring-4 ring-[#FF1F8E]/20"
        />
      </div>
    </section>
  );
}

export default Hero;