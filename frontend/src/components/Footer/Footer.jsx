function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div>
          <h2 className="text-2xl font-extrabold">
            <span className="text-[#FF1F8E]">THE KK</span>
            <span className="text-[#A685D4] ml-1">FACTOR</span>
          </h2>
          <p className="mt-2 text-[#AAAAAA] text-sm">
            News, Radio, Music and Live Streaming.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a href="/" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">Home</a>
          <a href="/about" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">About</a>
          <a href="/news" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">News</a>
          <a href="/radio" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">Radio</a>
          <a href="/music" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">Music</a>
          <a href="/live" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">Live</a>
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">Facebook</a>
          <a href="#" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">Instagram</a>
          <a href="#" className="text-[#BBBBBB] hover:text-[#FF1F8E] transition-colors duration-200">YouTube</a>
        </div>
      </div>

      <div className="border-t border-[#333333] py-4 text-center text-xs text-[#666666]">
        © 2026 THE KK FACTOR. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;