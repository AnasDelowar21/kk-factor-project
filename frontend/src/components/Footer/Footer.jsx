function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-red-600">
            THE KK FACTOR
          </h2>
          <p className="mt-2 text-gray-400">
            News, Radio, Music and Live Streaming.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-red-500">Facebook</a>
          <a href="#" className="hover:text-red-500">Instagram</a>
          <a href="#" className="hover:text-red-500">YouTube</a>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © 2026 THE KK FACTOR. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;