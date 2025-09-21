import { useEffect, useState } from "react";

// 1) grab *.mp4 files from /src/local/video
const videoModules = import.meta.glob("/src/local/video/*.mp4", {
    eager: true,
    import: "default",
});

const videoFiles = Object.keys(videoModules).map((path) => {
    const parts = path.split("/");
    const file = parts[parts.length - 1];
    return { file, url: videoModules[path] as string };
});

type SceneDataType = {
    preview: string | null;
    live: string | null;
    loop: boolean;
};

const STORAGE_KEY = "videoScene";

export default function VideoSelector() {
    const [sceneData, setSceneData] = useState<SceneDataType>({
        preview: null,
        live: null,
        loop: false,
    });
    const [muted, setMuted] = useState(false);

    // 4) initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setSceneData(JSON.parse(saved));
            } catch {
                console.warn("Invalid JSON in videoScene localStorage");
            }
        }
    }, []);

    // persist to localStorage whenever sceneData changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sceneData));
    }, [sceneData]);

    function handleSelect(type: "preview" | "live", file: string | null) {
        setSceneData((prev) => ({ ...prev, [type]: file }));
    }

    interface IRadio {
        value: string | null,
        which: "preview" | "live"
    }

    function Radio({ which, value }: IRadio) {
        return <input className="w-8 h-8"
            type="radio"
            name={which}
            checked={sceneData[which] === value}
            onChange={() => handleSelect(which, value)}
        />
    }

    return (
        <div className="p-4 space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2  items-start gap-4">


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

                    {videoFiles.map(({file}) => (
                        <label key={file} className="contents cursor-pointer">
                            <Radio which="preview" value={file} />
                            <Radio which="live" value={file} />
                            <input type="text"
                             className="w-16 px-2 border bg-white" 
                             placeholder="0:00"/>
                             
                            <div>{file}</div>
                        </label>
                    ))}
                </div>

                <div>


                    {/* controls */}
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="checkbox"
                                checked={sceneData.loop}
                                onChange={(e) =>
                                    setSceneData((prev) => ({ ...prev, loop: e.target.checked }))
                                }
                            />
                            Loop
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
                            key={sceneData.preview} // restart when preview changes
                            src={videoFiles.find((f) => f.file === sceneData.preview)?.url}
                            controls
                            loop={sceneData.loop}
                            muted={muted}
                            className="max-w-full max-h-full border"
                        /></div>
                    )}

                </div>
            </div>
        </div>
    );
}
