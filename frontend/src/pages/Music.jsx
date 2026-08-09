import { useState, useRef } from "react";
import { musicTracks } from "../data/musicData";

function Music() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Music</h1>

      <div className="space-y-3">
        {musicTracks.map((track) => (
          <div
            key={track.id}
            onClick={() => playTrack(track)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer border ${
              currentTrack?.id === track.id ? "bg-blue-50 border-blue-400" : "border-gray-200"
            }`}
          >
            <img src={track.cover} alt={track.title} className="w-12 h-12 rounded object-cover" />
            <div className="flex-1">
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-gray-500">{track.artist}</p>
            </div>
            <span className="text-sm text-blue-500">
              {currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"}
            </span>
          </div>
        ))}
      </div>

      {currentTrack && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex items-center gap-4 shadow-md">
          <img src={currentTrack.cover} alt={currentTrack.title} className="w-10 h-10 rounded object-cover" />
          <div className="flex-1">
            <p className="font-semibold">{currentTrack.title}</p>
            <p className="text-sm text-gray-500">{currentTrack.artist}</p>
          </div>
          <audio
            ref={audioRef}
            src={currentTrack.url}
            autoPlay
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Music;