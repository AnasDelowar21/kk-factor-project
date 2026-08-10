import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-red-500 font-semibold"
      : "text-white hover:text-red-500";

  return (
    <nav className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-red-600">
          THE KK FACTOR
        </h1>

        <div className="flex gap-6 text-sm font-medium">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/news" className={linkStyle}>
            News
          </NavLink>

          <NavLink to="/radio" className={linkStyle}>
            Radio
          </NavLink>

          <NavLink to="/music" className={linkStyle}>
            Music
          </NavLink>

          <NavLink to="/live" className={linkStyle}>
            Live
          </NavLink>

          <NavLink to="/login" className={linkStyle}>
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;