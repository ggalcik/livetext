import { useState, useEffect } from "react";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { usePersistentState } from "../../hooks/usePersistentState";
import { soundboardDataDefault, SoundboardDataSchema } from "./types";
import clsx from "clsx";

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
    const [soundboardData, setSoundboardData] = usePersistentState({
        storageKey: 'soundboardData',
        schema: SoundboardDataSchema,
        fallback: soundboardDataDefault}
    );
        
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

    function toggleHighlight(file: string) {
        let newHighlights;
        if (soundboardData.highlightNames.includes(file))
            newHighlights = soundboardData.highlightNames.filter((item) => item != file);
        else 
            newHighlights = [...soundboardData.highlightNames, file];

        setSoundboardData({
            ...soundboardData,
            highlightNames: newHighlights
        });

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
                {soundFiles.map(({ file, url }) => {
                    const isHighlighted = soundboardData.highlightNames.includes(file);
                    return (
                    <button
                        key={file}
                        onClick={() => currentSound === file ? stopSound() : playSound(url, file)}
                        onContextMenu={(e) => { toggleHighlight(file); e.preventDefault() }}
                        className={clsx('px-4 py-2 text-white rounded border-4',
                            isHighlighted ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700',
                            currentSound===file ? 'border-green-900' : 'border-white'
                        )}
                    >
                        {file.replace(".mp3", "").replace("_", " ")}
                    </button>
                )})}
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
