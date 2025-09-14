import { useState, useEffect } from "react";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

// Auto-import all .mp3 files from /public/local/soundboard
const soundModules = import.meta.glob("/src/local/soundboard/*.mp3", {
    eager: true,
    import: "default",
});

const soundFiles = Object.keys(soundModules).map((path) => {
    const parts = path.split("/");
    const file = parts[parts.length - 1];
     return { file, url: (soundModules[path] as string) };
});

export default function Soundboard() {
    const [currentSound, setCurrentSound] = useState<string | null>(null);
    const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState<number>(1.0);
    const [muted, setMuted] = useState<boolean>(false);
    const [loop, setLoop] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [elapsed, setElapsed] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    function playSound(fileUrl: string, fileName: string) {
        if (audioEl) {
            audioEl.pause();
            audioEl.currentTime = 0;
        }

        const audio = new Audio(fileUrl);
        audio.volume = muted ? 0 : volume;
        audio.loop = loop;

        audio.onloadedmetadata = () => {
            setDuration(audio.duration);
        };

        audio.ontimeupdate = () => {
            setElapsed(audio.currentTime);
            if (audio.duration > 0) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        audio.onended = () => {
            if (!audio.loop) {
                setAudioEl(null);
                setCurrentSound(null);
                setProgress(0);
                setElapsed(0);
                setDuration(0);
            }
        };

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
            setProgress(0);
            setElapsed(0);
            setDuration(0);
        }
    }

    useEffect(() => {
        if (audioEl) {
            audioEl.volume = muted ? 0 : volume;
            audioEl.loop = loop;
        }
    }, [volume, muted, loop, audioEl]);

    return (
        <div className="p-4 space-y-6">
            {/* Global controls */}
            <Controls
                volume={volume}
                muted={muted}
                loop={loop}
                onVolumeChange={setVolume}
                onToggleMute={() => setMuted((m) => !m)}
                onToggleLoop={() => setLoop((l) => !l)}
            />

            {/* Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {soundFiles.map(({ file, url }) => (
                    <button
                        key={file}
                        onClick={() => playSound(url, file)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {file.replace(".mp3", "").replace("_", " ")}
                    </button>
                ))}
            </div>

            {/* Now playing */}
            {currentSound && (
                <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                        <p className="text-sm text-gray-600">Now playing: {currentSound}</p>
                        <button
                            onClick={stopSound}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Stop
                        </button>
                    </div>

                    {/* Progress bar */}
                    <ProgressBar
                        progress={progress}
                        elapsed={elapsed}
                        duration={duration}
                        onSeek={(time) => {
                            if (audioEl) {
                                audioEl.currentTime = time;
                                setElapsed(time);
                                setProgress((time / duration) * 100);
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}
