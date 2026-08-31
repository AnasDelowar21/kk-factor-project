import { Link } from "react-router-dom";

function MediaSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">

        <div className="rounded-2xl bg-gradient-to-br from-[#FF1F8E] to-[#C4006A] p-8 text-white shadow-lg">
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">
            Live Radio
          </p>

          <h2 className="mt-2 text-3xl font-extrabold">
            Listen Live Now
          </h2>

          <p className="mt-3 opacity-80 text-sm leading-relaxed">
            Stream THE KK FACTOR radio directly from the website.
          </p>

          <Link
            to="/radio"
            className="mt-6 inline-block rounded-full bg-white text-[#FF1F8E] px-7 py-3 font-bold hover:bg-[#FFF0F7] transition-colors duration-200 shadow"
          >
            Play Radio
          </Link>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[#F5F0FF] to-[#EDE8FF] p-8 shadow-md border border-[#E0D9FF]">
          <p className="text-sm font-bold uppercase tracking-widest text-[#7B5EA7]">
            Music Player
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#1A1A1A]">
            Featured Playlist
          </h2>

          <p className="mt-3 text-[#555555] text-sm leading-relaxed">
            Enjoy selected tracks and playlists from THE KK FACTOR.
          </p>

          <Link
            to="/music"
            className="mt-6 inline-block rounded-full bg-[#7B5EA7] px-7 py-3 font-bold text-white hover:bg-[#5E4580] transition-colors duration-200 shadow"
          >
            Open Music Player
          </Link>
        </div>

      </div>
    </section>
  );
}

export default MediaSection;