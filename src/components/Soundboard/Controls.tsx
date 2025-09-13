import React from "react";

interface ControlsProps {
  volume: number;
  muted: boolean;
  loop: boolean;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
  onToggleLoop: () => void;
}

export default function Controls({
  volume,
  muted,
  loop,
  onVolumeChange,
  onToggleMute,
  onToggleLoop,
}: ControlsProps) {
  return (
    <div className="space-y-3">
      {/* Volume + mute */}
      <div>
        <label className="block font-medium">
          Volume: {muted ? "Muted" : `${(volume * 100).toFixed(0)}%`}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-40"
            disabled={muted}
          />
          <button
            onClick={onToggleMute}
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>

      {/* Loop toggle */}
      <div className="flex items-center space-x-2">
        <input
          id="loop"
          type="checkbox"
          checked={loop}
          onChange={onToggleLoop}
          className="h-4 w-4"
        />
        <label htmlFor="loop">Loop playback</label>
      </div>
    </div>
  );
}
