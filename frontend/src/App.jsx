import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import News from "./pages/News";
import Radio from "./pages/Radio";
import Music from "./pages/Music";
import Live from "./pages/Live";
import Login from "./pages/Login";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/music" element={<Music />} />
        <Route path="/live" element={<Live />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;