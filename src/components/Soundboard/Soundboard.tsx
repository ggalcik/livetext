import { useState, useEffect } from "react";
import Controls from "./Controls";

// Auto-import all .mp3 files from /public/local/soundboard
const soundModules = import.meta.glob("/public/local/soundboard/*.mp3", {
  eager: true,
  import: "default",
});

const soundFiles = Object.keys(soundModules).map((path) => {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  return { file, url: `/local/soundboard/${file}` };
});

export default function Soundboard() {
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(1.0);
  const [muted, setMuted] = useState<boolean>(false);

  function playSound(fileUrl: string, fileName: string) {
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }

    const audio = new Audio(fileUrl);
    audio.volume = muted ? 0 : volume;
    audio.play();
    setAudioEl(audio);
    setCurrentSound(fileName);
  }

  function stopSound() {
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
      setAudioEl(null);
      setCurrentSound(null);
    }
  }

  // Sync audio element volume when slider or mute changes
  useEffect(() => {
    if (audioEl) {
      audioEl.volume = muted ? 0 : volume;
    }
  }, [volume, muted, audioEl]);

  return (
    <div className="p-4 space-y-6">

      {/* Global controls */}
      <Controls
        volume={volume}
        muted={muted}
        onVolumeChange={setVolume}
        onToggleMute={() => setMuted((m) => !m)}
      />

      {/* Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {soundFiles.map(({ file, url }) => (
          <button
            key={file}
            onClick={() => playSound(url, file)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {file.replace(".mp3", "")}
          </button>
        ))}
      </div>

      {/* Now playing */}
      {currentSound && (
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">Now playing: {currentSound}</p>
          <button
            onClick={stopSound}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
}
