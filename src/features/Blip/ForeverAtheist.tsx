import { useEffect } from "react";
import type { BlipProps } from "./types";
import endingAudioUrl from "./assets/forever.mp3";
import "./ForeverAtheist.css";

const HOUR_MARKS = Array.from({ length: 12 });
const MINUTE_MARKS = Array.from({ length: 60 });

function playForeverAudio() {
  const AudioContextClass = window.AudioContext;
  const context = new AudioContextClass();
  void context.resume();
  const master = context.createGain();
  master.gain.value = 0.32;
  master.connect(context.destination);
  const start = context.currentTime + 0.05;

  // A mechanical tick whose spacing contracts continuously into a rush.
  let elapsed = 0;
  let tickIndex = 0;
  while (elapsed < 5.05) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const tickTime = start + elapsed;
    const progress = elapsed / 5.05;
    const pitchRise = 1 + progress * 0.55;
    oscillator.type = tickIndex % 2 === 0 ? "square" : "triangle";
    oscillator.frequency.setValueAtTime(
      (tickIndex % 2 === 0 ? 1450 : 1050) * pitchRise,
      tickTime,
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      240 * (1 + progress * 0.4),
      tickTime + 0.035,
    );
    gain.gain.setValueAtTime(0.0001, tickTime);
    gain.gain.exponentialRampToValueAtTime(0.2, tickTime + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, tickTime + 0.045);
    oscillator.connect(gain).connect(master);
    oscillator.start(tickTime);
    oscillator.stop(tickTime + 0.05);

    elapsed += 0.48 - 0.445 * progress ** 0.58;
    tickIndex += 1;
  }

  const endingAudio = new Audio(endingAudioUrl);
  const endingTimer = window.setTimeout(() => {
    endingAudio.play().catch((error) => {
      console.warn("Could not play the Forever ending audio:", error);
    });
  }, 4500);

  return () => {
    window.clearTimeout(endingTimer);
    endingAudio.pause();
    endingAudio.currentTime = 0;
    void context.close();
  };
}

export default function ForeverAtheist({ endBlip }: BlipProps) {
  useEffect(() => {
    const timeout = window.setTimeout(endBlip, 9000);
    return () => window.clearTimeout(timeout);
  }, [endBlip]);

  useEffect(() => playForeverAudio(), []);

  return (
    <div className="forever-clock" aria-label="Forever Atheist clock animation">
      <div className="forever-clock__case">
        <div className="forever-clock__face">
            <div className="forever-clock__minute-marks" aria-hidden="true">
              {MINUTE_MARKS.map((_, index) => (
                <i key={index} style={{ "--mark": index } as React.CSSProperties} />
              ))}
            </div>
            <div className="forever-clock__hour-marks" aria-hidden="true">
              {HOUR_MARKS.map((_, index) => (
                <i key={index} style={{ "--hour": index } as React.CSSProperties} />
              ))}
            </div>
            <span className="forever-clock__number forever-clock__number--12">XII</span>
            <span className="forever-clock__number forever-clock__number--3">III</span>
            <span className="forever-clock__number forever-clock__number--6">VI</span>
            <span className="forever-clock__number forever-clock__number--9">IX</span>
            <div className="forever-clock__hand forever-clock__hand--hour" aria-hidden="true" />
            <div className="forever-clock__hand forever-clock__hand--minute" aria-hidden="true" />
            <div className="forever-clock__hand forever-clock__hand--second" aria-hidden="true" />
            <div className="forever-clock__symbol" aria-label="Atheist symbol">
              <svg viewBox="0 0 180 180" aria-hidden="true">
                <ellipse cx="90" cy="90" rx="74" ry="29" />
                <ellipse cx="90" cy="90" rx="74" ry="29" transform="rotate(60 90 90)" />
                <ellipse cx="90" cy="90" rx="74" ry="29" transform="rotate(120 90 90)" />
                <circle cx="90" cy="90" r="8" />
              </svg>
              <span>A</span>
            </div>
        </div>
      </div>
      <div className="forever-clock__title">
        <div className="forever-clock__word">FOREVER</div>
        <div className="forever-clock__word">ATHEIST</div>
      </div>
    </div>
  );
}
