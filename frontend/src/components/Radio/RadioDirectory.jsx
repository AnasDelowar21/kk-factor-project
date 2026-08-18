import React from "react";
import { Search, MapPin, Radio, Heart, Play, Pause } from "lucide-react";
import { AustralianStates, RadioGenres } from "../../data/australianStations";

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
    <div className="space-y-5">
      {/* Filter Controls Bar */}
      <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAAAAA]" />
            <input
              type="text"
              placeholder="Search station or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F8F8] border border-[#E8E8E8] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1A1A1A] placeholder-[#AAAAAA] focus:outline-none focus:border-[#FF1F8E] transition-all"
            />
          </div>

          {/* Region Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <MapPin className="w-3.5 h-3.5 text-[#FF1F8E]" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full sm:w-auto bg-[#F8F8F8] border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#FF1F8E] cursor-pointer"
            >
              {AustralianStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Genre Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          <button
            onClick={() => setSelectedGenre("Favorites")}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 flex-shrink-0 ${
              selectedGenre === "Favorites"
                ? "bg-[#FF1F8E] text-white font-bold"
                : "bg-[#F5F5F5] border border-[#E8E8E8] text-[#666666] hover:text-[#1A1A1A]"
            }`}
          >
            <Heart className="w-3 h-3 fill-current" />
            Saved ({favorites.length})
          </button>

          <div className="w-px h-4 bg-[#E8E8E8] mx-1 flex-shrink-0"></div>

          {RadioGenres.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-[#FF1F8E] text-white font-bold"
                    : "bg-[#F5F5F5] border border-[#E8E8E8] text-[#666666] hover:text-[#1A1A1A]"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Title */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#FF1F8E]" />
          Australian Channels ({stations.length})
        </h3>
      </div>

      {/* Empty State */}
      {stations.length === 0 && (
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 text-center space-y-2">
          <p className="text-sm text-[#888888]">No stations match your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedState("All Australia");
              setSelectedGenre("All Genres");
            }}
            className="px-3 py-1.5 bg-[#FF1F8E] hover:bg-[#C4006A] text-white font-bold text-xs rounded-lg transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Station Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stations.map((st) => {
          const isSelected = st.id === currentStationId;
          const isFav = favorites.includes(st.id);

          return (
            <div
              key={st.id}
              onClick={() => onSelectStation(st)}
              className={`group bg-white border rounded-2xl p-3.5 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-[#FF1F8E] bg-[#FFF0F7] shadow-md shadow-[#FF1F8E]/10"
                  : "border-[#E8E8E8] hover:border-[#FFAACC] hover:shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={st.logo}
                      alt={st.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E8E8E8] flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#FF1F8E] transition-colors truncate">
                        {st.name}
                      </h4>
                      <p className="text-xs text-[#888888] truncate">
                        {st.location} • {st.genre}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(st.id);
                    }}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isFav
                        ? "bg-[#FF1F8E]/10 border-[#FF1F8E]/40 text-[#FF1F8E]"
                        : "bg-[#F5F5F5] border-[#E8E8E8] text-[#AAAAAA] hover:text-[#1A1A1A]"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
                  </button>
                </div>

                <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-[#F0F0F0] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#AAAAAA]">
                  {st.frequency}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      onTogglePlay();
                    } else {
                      onSelectStation(st);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    isSelected
                      ? "bg-[#FF1F8E] text-white"
                      : "bg-[#F5F5F5] hover:bg-[#FF1F8E] hover:text-white text-[#555555] border border-[#E8E8E8]"
                  }`}
                >
                  {isSelected && isPlaying ? (
                    <><Pause className="w-3 h-3 fill-current" /> Playing</>
                  ) : (
                    <><Play className="w-3 h-3 fill-current" /> Tune In</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RadioDirectory;
