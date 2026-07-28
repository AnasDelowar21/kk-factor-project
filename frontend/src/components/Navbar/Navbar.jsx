import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-red-600">
          THE KK FACTOR
        </h1>

        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <Link to="/news" className="hover:text-red-500">News</Link>
          <Link to="/radio" className="hover:text-red-500">Radio</Link>
          <Link to="/music" className="hover:text-red-500">Music</Link>
          <Link to="/live" className="hover:text-red-500">Live</Link>
          <Link to="/login" className="hover:text-red-500">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;