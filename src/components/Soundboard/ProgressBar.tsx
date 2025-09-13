import React from "react";

interface ProgressBarProps {
  progress: number; // percent (0-100)
  elapsed: number;  // seconds
  duration: number; // seconds
  onSeek: (time: number) => void; // callback when user scrubs
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ProgressBar({
  progress,
  elapsed,
  duration,
  onSeek,
}: ProgressBarProps) {
  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);
    onSeek(percent * duration);
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Elapsed time */}
      <span className="text-xs text-gray-500 w-10 text-right">
        {formatTime(elapsed)}
      </span>

      {/* Track */}
      <div
        className="flex-1 bg-gray-300 h-2 rounded cursor-pointer relative"
        onClick={handleSeek}
      >
        {/* Filled portion */}
        <div
          className="bg-blue-600 h-2 rounded"
          style={{ width: `${progress}%` }}
        />

        {/* Knob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow"
          style={{ left: `calc(${progress}% - 0.5rem)` }}
        />
      </div>

      {/* Duration */}
      <span className="text-xs text-gray-500 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
}
