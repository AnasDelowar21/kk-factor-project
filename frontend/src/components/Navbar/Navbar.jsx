import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "font-bold text-[#FF1F8E] border-b-2 border-[#FF1F8E] pb-1 transition-all"
      : "text-[#1A1A1A] hover:text-[#FF1F8E] font-medium pb-1 transition-colors duration-200";

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] shadow-xs sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-2.5">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="h-10 sm:h-12 flex items-center">
            <img
              src="/kk-logo.png"
              alt="The KK Factor Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-base font-black tracking-tight leading-none text-[#1A1A1A]">
              THE KK <span className="text-[#FF1F8E]">FACTOR</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#7B5EA7]">
              Rock Chic Music
            </span>
          </div>
        </NavLink>

        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <NavLink to="/" className={linkStyle}>Home</NavLink>
          <NavLink to="/news" className={linkStyle}>News</NavLink>
          <NavLink to="/radio" className={linkStyle}>Radio</NavLink>
          <NavLink to="/music" className={linkStyle}>Music</NavLink>
          <NavLink to="/live" className={linkStyle}>Live</NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-[#C4006A] text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-sm"
                : "bg-[#FF1F8E] text-white px-4 py-1.5 rounded-full font-bold text-sm hover:bg-[#C4006A] transition-colors duration-200 shadow-sm"
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;