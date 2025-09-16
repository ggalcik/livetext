import { useEffect, useRef, useState } from "react";
import captions from "./captions.json";
import type { Caption } from "./types";

/**
 * Canvas-based caption player: renders timed text onto <canvas> for tighter timing (<= 100ms).
 * - Clickable progress bar to seek
 * - Play/Pause toggle
 * - 300x300 render box
 * - Supports rotate, scale, fadeOut per caption
 */

const BOX_SIZE = 300; // px
const FONT_BASIS = 300;
const FONT_FAMILY = 'Elephant';
const FONT_SIZE = 24; // px

export default function CanvasCaptionPlayer() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // lazy-init audio
  function ensureAudio() {
    if (!audioRef.current) {
      const el = new Audio("/local/soundboard/philbro_atemporal.mp3");
      el.preload = "auto";
      el.onloadedmetadata = () => setDuration(el.duration || 0);
      el.onended = () => {
        setPlaying(false);
        setElapsed(0);
        cancelLoop();
        drawFrame(0); // clear frame
      };
      el.ontimeupdate = () => setElapsed(el.currentTime || 0);
      audioRef.current = el;
    }
    return audioRef.current;
  }

  // render loop
  function loop() {
    const el = audioRef.current;
    if (!el) return;
    drawFrame(el.currentTime || 0);
    rafRef.current = requestAnimationFrame(loop);
  }
  function startLoop() {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
  }
  function cancelLoop() {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  function togglePlay() {
    const el = ensureAudio();
    if (playing) {
      el.pause();
      setPlaying(false);
      cancelLoop();
    } else {
      el.play();
      setPlaying(true);
      startLoop();
    }
  }

  function seek(time: number) {
    const el = ensureAudio();
    const t = Math.max(0, Math.min(duration || el.duration || 0, time));
    el.currentTime = t;
    setElapsed(t);
    // draw immediately at target time
    drawFrame(t);
  }

  // draw active captions onto canvas for a given time
  function drawFrame(time: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // bg
    ctx.fillStyle = "#404";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // text settings
    ctx.textBaseline = "top"; // align to top-left as requested
    ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
    ctx.fillStyle = "#fff";

    (captions as Caption[])
      .filter((c) => time >= c.start && time <= (c.end + (c.fadeOut || 0)))
      .forEach((c) => {
        // compute opacity with optional fadeOut
        let opacity = 1;
        if (c.fadeOut && time > c.end) {
          const fadeProgress = (time - c.end) / c.fadeOut;
          opacity = Math.max(1 - fadeProgress, 0);
        }

        const x = c.left != null
          ? (c.left / 100) * BOX_SIZE
          : c.right != null
            ? BOX_SIZE - (c.right / 100) * BOX_SIZE
            : 0;

        ctx.textAlign = c.right != null ? "right" : "left";
        const y = (c.top / 100) * canvas.height;
        const rotate = (c.rotate || 0) * (Math.PI / 180);
        // const scale = c.scale ;
        const scale = c.scale * ( BOX_SIZE/ FONT_BASIS);
        // const scale = c.scale * 2 ;

        ctx.save();
        ctx.translate(x, y); // top-left anchor
        if (rotate) ctx.rotate(rotate);
        if (scale !== 1) ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;
        ctx.fillText(c.text, 0, 0);
        ctx.restore();
      });
  }

  // initial blank draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = BOX_SIZE;
      canvas.height = BOX_SIZE;
      drawFrame(0);
    }
    return () => cancelLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {playing ? "Pause" : "Play"}
      </button>

      {/* Progress bar w/ tenths */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500 w-12 text-right">{elapsed.toFixed(1)}s</span>
        <div
          className="flex-1 bg-gray-300 h-2 rounded cursor-pointer relative"
          onClick={(e) => {
            if (!duration) return;
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = Math.min(Math.max(clickX / rect.width, 0), 1);
            seek(percent * duration);
          }}
        >
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: duration ? `${(elapsed / duration) * 100}%` : "0%" }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow"
            style={{ left: duration ? `calc(${(elapsed / duration) * 100}% - 0.5rem)` : "-9999px" }}
          />
        </div>
        <span className="text-xs text-gray-500 w-12">{duration.toFixed(1)}s</span>
      </div>

      {/* Canvas render box */}
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
