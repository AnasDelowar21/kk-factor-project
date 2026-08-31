import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import News from "./pages/News";
import Radio from "./pages/Radio";
import Music from "./pages/Music";
import Live from "./pages/Live";
import Article from "./pages/Article";
import { PlayerProvider } from "./context/PlayerContext";
import IntegratedMusicPlayer from "./components/Player/IntegratedMusicPlayer";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <PlayerProvider>
      <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/music" element={<Music />} />
          <Route path="/live" element={<Live />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>

        <IntegratedMusicPlayer />
      </div>
    </PlayerProvider>
  );
}

export default App;