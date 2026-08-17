import React, { useState } from "react";
import { Search, MapPin, Radio, Heart, Play, Pause, ChevronDown, ChevronUp } from "lucide-react";
import { AustralianStates, RadioGenres } from "../../data/australianStations";

/* Individual Station Card */
function StationCard({ st, isSelected, isPlaying, isFav, onSelect, onTogglePlay, onToggleFavorite }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`group border rounded-2xl transition-all cursor-pointer ${
        isSelected
          ? "border-red-600/70 bg-zinc-900/80 shadow-md shadow-red-950/20"
          : "border-zinc-800/60 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/40"
      }`}
    >
      {/* ── Default view: just name + play + fav ── */}
      <div
        className="flex items-center gap-3 px-3.5 py-3"
        onClick={() => onSelect(st)}
      >
        {/* Thumbnail */}
        <img
          src={st.logo}
          alt={st.name}
          className="w-9 h-9 rounded-lg object-cover border border-zinc-800 flex-shrink-0"
        />

        {/* Name */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
            {st.name}
          </h4>
          {isSelected && (
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                {isPlaying ? "Playing" : "Paused"}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {/* Play / Pause */}
          <button
            onClick={() => {
              if (isSelected) onTogglePlay();
              else onSelect(st);
            }}
            className={`p-1.5 rounded-lg border transition-all ${
              isSelected
                ? "bg-red-600 border-red-600 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
            }`}
          >
            {isSelected && isPlaying ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3 h-3 fill-current" />
            )}
          </button>

          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(st.id)}
            className={`p-1.5 rounded-lg border transition-all ${
              isFav
                ? "bg-red-600/20 border-red-600/50 text-red-400"
                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white"
            }`}
          >
            <Heart className={`w-3 h-3 ${isFav ? "fill-current" : ""}`} />
          </button>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-white transition-all"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* ── Expanded details ── */}
      {expanded && (
        <div className="px-3.5 pb-3.5 pt-0 border-t border-zinc-800/60 space-y-2 text-xs text-zinc-400">
          <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2.5 text-[11px] text-zinc-500 font-mono">
            <span>{st.frequency}</span>
            <span className="text-zinc-700">·</span>
            <span>{st.genre}</span>
            <span className="text-zinc-700">·</span>
            <span>{st.location}</span>
          </div>
          <p className="leading-relaxed text-zinc-400">{st.description}</p>
          {st.listeners && (
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-zinc-400">{st.listeners}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RadioDirectory({
  stations,
  currentStationId,
  isPlaying,
  onSelectStation,
  onTogglePlay,
  searchQuery,
  setSearchQuery,
  selectedState,
  setSelectedState,
  selectedGenre,
  setSelectedGenre,
  favorites,
  onToggleFavorite,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* ── Filter Bar ── */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 shadow-xl space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search stations…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-all"
          />
        </div>

        {/* Region + Genre pills row */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-red-500" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-red-600 cursor-pointer"
            >
              {AustralianStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto flex-1">
            <button
              onClick={() => setSelectedGenre("Favorites")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 flex-shrink-0 ${
                selectedGenre === "Favorites"
                  ? "bg-red-600 text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <Heart className="w-2.5 h-2.5 fill-current" />
              Saved
            </button>
            {RadioGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex-shrink-0 ${
                  selectedGenre === genre
                    ? "bg-red-600 text-white"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {genre === "All Genres" ? "All" : genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Channel Count ── */}
      <div className="flex items-center gap-2 px-1">
        <Radio className="w-3.5 h-3.5 text-red-500" />
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          {stations.length} Channel{stations.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Empty State ── */}
      {stations.length === 0 && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 text-center space-y-3">
          <p className="text-sm text-zinc-400">No stations match your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedState("All Australia");
              setSelectedGenre("All Genres");
            }}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-all"
          >
            Reset
          </button>
        </div>
      )}

      {/* ── Station Cards ── */}
      <div className="flex flex-col gap-2">
        {stations.map((st) => (
          <StationCard
            key={st.id}
            st={st}
            isSelected={st.id === currentStationId}
            isPlaying={isPlaying}
            isFav={favorites.includes(st.id)}
            onSelect={onSelectStation}
            onTogglePlay={onTogglePlay}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default RadioDirectory;
