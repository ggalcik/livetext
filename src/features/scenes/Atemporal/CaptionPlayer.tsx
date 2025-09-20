import { useRef, useState } from "react";
import captions from "./captions.json";
import type { Caption } from "./types";

const BOX_SIZE = 300;

export default function CaptionPlayer() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function togglePlay() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/local/soundboard/philbro_atemporal.mp3");

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration ?? 0);
      };

      audioRef.current.ontimeupdate = () => {
        setElapsed(audioRef.current?.currentTime ?? 0);
      };

      audioRef.current.onended = () => {
        setPlaying(false);
        setElapsed(0); // reset only on natural end
      };
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  function seek(time: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setElapsed(time);
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* Play/Pause toggle */}
      <button
        onClick={togglePlay}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {playing ? "Pause" : "Play"}
      </button>

      {/* Progress bar */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500 w-12 text-right">
          {elapsed.toFixed(1)}s
        </span>
        <div
          className="flex-1 bg-gray-300 h-2 rounded cursor-pointer relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = Math.min(Math.max(clickX / rect.width, 0), 1);
            seek(percent * duration);
          }}
        >
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${(elapsed / duration) * 100}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow"
            style={{ left: `calc(${(elapsed / duration) * 100}% - 0.5rem)` }}
          />
        </div>
        <span className="text-xs text-gray-500 w-12">
          {duration.toFixed(1)}s
        </span>
      </div>

      {/* Caption display */}
      <div
        className="relative bg-black overflow-hidden"
        style={{ width: BOX_SIZE, height: BOX_SIZE, font: '20px Elephant' }}
      >
        {(captions as Caption[])
          .filter((c) => elapsed >= c.start && elapsed <= (c.end + (c.fadeOut || 0)))
          .map((c, i) => {
            let opacity = 1;
            if (c.fadeOut && elapsed > c.end) {
              const fadeProgress = (elapsed - c.end) / c.fadeOut;
              opacity = Math.max(1 - fadeProgress, 0);
            }

            return (
              <div
                key={i}
                className="absolute text-white transition-opacity"
                style={{
                  top: `${c.top}%`,
                  left: `${c.left}%`,
                  transform: `rotate(${c.rotate || 0}deg) scale(${c.scale})`,
                  opacity,
                }}
              >
                {c.text}
              </div>
            );
          })}
      </div>
    </div>
  );
}
