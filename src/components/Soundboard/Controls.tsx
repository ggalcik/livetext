interface ControlsProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
}

export default function Controls({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
}: ControlsProps) {
  return (
    <div className="-m-4 p-4 pb-8 bg-amber-50">
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
  );
}
