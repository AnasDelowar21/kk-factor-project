import React, { useState, useEffect } from "react";
import { Radio as RadioIcon } from "lucide-react";
import Footer from "../components/Footer/Footer";
import RadioPlayer from "../components/Radio/RadioPlayer";
import RadioDirectory from "../components/Radio/RadioDirectory";
import { australianStations } from "../data/australianStations";

function Radio() {
  const [currentStation, setCurrentStation] = useState(australianStations[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All Australia");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("kk_radio_favorites");
      return saved ? JSON.parse(saved) : ["kk-factor-radio", "abc-newsradio", "abc-triplej"];
    } catch (e) {
      return ["kk-factor-radio", "abc-newsradio", "abc-triplej"];
    }
  });

  const [mobileTab, setMobileTab] = useState("player");

  useEffect(() => {
    try {
      localStorage.setItem("kk_radio_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (stationId) => {
    setFavorites((prev) =>
      prev.includes(stationId)
        ? prev.filter((id) => id !== stationId)
        : [...prev, stationId]
    );
  };

  const handleSelectStation = (station) => {
    setCurrentStation(station);
    setIsPlaying(true);
  };

  const filteredStations = australianStations.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.frequency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.genre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState =
      selectedState === "All Australia" || st.state === selectedState;

    let matchesGenre = true;
    if (selectedGenre === "Favorites") {
      matchesGenre = favorites.includes(st.id);
    } else if (selectedGenre !== "All Genres") {
      matchesGenre = st.genre === selectedGenre;
    }

    return matchesSearch && matchesState && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-red-600 selection:text-white">
      {/* Minimal Header */}
      <section className="relative border-b border-zinc-800/60 py-6 px-6 bg-gradient-to-b from-zinc-950 to-black">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-red-600/10 border border-red-600/30 rounded-full text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              THE KK FACTOR · LIVE RADIO
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AUSTRALIAN <span className="text-red-600">RADIO</span>
            </h1>
          </div>
          <p className="text-zinc-500 text-xs max-w-xs">
            Stream live Australian stations in real-time.
          </p>
        </div>
      </section>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden mx-4 mt-4 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-bold">
        <button
          onClick={() => setMobileTab("player")}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "player"
              ? "bg-red-600 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <RadioIcon className="w-3.5 h-3.5" /> Player
        </button>
        <button
          onClick={() => setMobileTab("channels")}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "channels"
              ? "bg-red-600 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <RadioIcon className="w-3.5 h-3.5" /> Channels
        </button>
      </div>

      {/* Main Content — 65/35 split */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT — Radio Player (65%, 8 cols) */}
          <div className={`lg:col-span-8 ${mobileTab === "player" ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-6">
              <RadioPlayer
                currentStation={currentStation}
                isFavorite={favorites.includes(currentStation.id)}
                onToggleFavorite={toggleFavorite}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </div>
          </div>

          {/* RIGHT — Channel Directory (35%, 4 cols) */}
          <div className={`lg:col-span-4 ${mobileTab === "channels" ? "block" : "hidden lg:block"}`}>
            <RadioDirectory
              stations={filteredStations}
              currentStationId={currentStation.id}
              isPlaying={isPlaying}
              onSelectStation={handleSelectStation}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Radio;