import { useEffect, useRef, useState } from "react";
import type { VideoSceneDataType } from "./types";

// grab *.mp4 files from /src/local/video
const videoModules = import.meta.glob("/src/local/video/*.mp4", {
  eager: true,
  import: "default",
});

const videoFiles = Object.keys(videoModules).map((path) => {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  return { file, url: videoModules[path] as string };
});

const STORAGE_KEY = "videoScene";

export default function VideoSelector() {
  // initialize + reconcile inside useState
  const [sceneData, setSceneData] = useState<VideoSceneDataType>(() => {
    let loaded: VideoSceneDataType = {
      preview: null,
      live: null,
      opts: { loop: false, autoplay: false },
      files: [],
    };

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        loaded = JSON.parse(saved) as VideoSceneDataType;
      } catch {
        console.warn("Invalid JSON in videoScene localStorage");
      }
    }

    // reconcile: keep only existing files, add new ones
    const reconciledFiles = videoFiles.map(({ file }) => {
      const existing = loaded.files?.find((f) => f.name === file);
      return existing ?? { name: file };
    });

    // null out preview/live if file is gone
    const fileNames = reconciledFiles.map((f) => f.name);
    if (loaded.preview && !fileNames.includes(loaded.preview)) {
      loaded.preview = null;
    }
    if (loaded.live && !fileNames.includes(loaded.live)) {
      loaded.live = null;
    }

    return {
      ...loaded,
      files: reconciledFiles,
    };
  });

  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // persist to localStorage whenever sceneData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sceneData));
  }, [sceneData]);

  function handleSelect(type: "preview" | "live", file: string | null) {
    setSceneData((prev) => ({ ...prev, [type]: file }));
  }

  function handleStartChange(file: string, value: string) {
    setSceneData((prev) => ({
      ...prev,
      files: prev.files.map((f) =>
        f.name === file ? { ...f, start: value } : f
      ),
    }));
  }

  interface IRadio {
    value: string | null;
    which: "preview" | "live";
  }

  function Radio({ which, value }: IRadio) {
    return (
      <input
        className="w-8 h-8"
        type="radio"
        name={which}
        checked={sceneData[which] === value}
        onChange={() => handleSelect(which, value)}
      />
    );
  }

  // seek to start value on load
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sceneData.preview) return;

    const fileMeta = sceneData.files.find((f) => f.name === sceneData.preview);
    if (!fileMeta?.start) return;

    const trySeek = () => {
      const parts = fileMeta.start!.split(":").map(Number);
      if (parts.length === 2) {
        const seconds = parts[0] * 60 + parts[1];
        if (!isNaN(seconds) && video.duration > seconds) {
          video.currentTime = seconds;
        }
      }
    };

    video.addEventListener("loadedmetadata", trySeek);
    return () => video.removeEventListener("loadedmetadata", trySeek);
  }, [sceneData.preview, sceneData.files]);

    const timeCode = (): string => {
        const video = videoRef.current;
        if (!video || !video.currentTime) return "";
        const min = Math.floor(video.currentTime / 60);
        const sec = Math.floor(video.currentTime % 60)
            .toString()
            .padStart(2, "0");
        return `${min}:${sec}`;
    }

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {/* grid of radios */}
        <div className="grid grid-cols-[auto_auto_auto_1fr] gap-2 text-sm font-mono">
          <div className="font-bold">Pre</div>
          <div className="font-bold">Live</div>
          <div className="font-bold">Auto at</div>
          <div className="font-bold">File</div>

          {/* None row */}
          <label className="contents">
            <Radio which="preview" value={null} />
            <Radio which="live" value={null} />
            <div></div>
            <div>None</div>
          </label>

          {sceneData.files.map((f) => (
            <label key={f.name} className="contents cursor-pointer">
              <Radio which="preview" value={f.name} />
              <Radio which="live" value={f.name} />
              <input
                type="text"
                className="w-16 px-2 border bg-white"
                placeholder="0:00"
                value={f.start ?? ""}
                onChange={(e) => handleStartChange(f.name, e.target.value)}
              />
              <div>{f.name}</div>
            </label>
          ))}
        </div>

        <div>
          {/* controls */}
          <div className="flex gap-4">
            <label>
              <input
                type="checkbox"
                checked={sceneData.opts.loop}
                onChange={(e) =>
                  setSceneData((prev) => ({
                    ...prev,
                    opts: { ...prev.opts, loop: e.target.checked },
                  }))
                }
              />
              Loop
            </label>
            <label>
              <input
                type="checkbox"
                checked={sceneData.opts.autoplay}
                onChange={(e) =>
                  setSceneData((prev) => ({
                    ...prev,
                    opts: { ...prev.opts, autoplay: e.target.checked },
                  }))
                }
              />
              Autoplay
            </label>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="px-2 py-1 border rounded"
            >
              {muted ? "Unmute" : "Mute"}
            </button>

           
          </div>

          {/* video player */}
          {sceneData.preview && (
            <div className="h-100">
              <video
                ref={videoRef}
                key={sceneData.preview} // restart when preview changes
                src={videoFiles.find((f) => f.file === sceneData.preview)?.url}
                autoPlay={sceneData.opts.autoplay}
                loop={sceneData.opts.loop}
                muted={muted}
                className="max-w-full max-h-full border"
                controls
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
