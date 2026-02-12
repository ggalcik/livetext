import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  text: string;
  style?: React.CSSProperties;
  secondaryStyle?: React.CSSProperties;
  /** milliseconds between cycles */
  cycleEveryMs?: number; // default 10_000
  /** milliseconds each letter stays highlighted */
  stepMs?: number; // default 100
};

export function TextWave({
  text,
  style,
  secondaryStyle,
  cycleEveryMs = 10_000,
  stepMs = 100,
}: Props): React.ReactElement {
  const letters = useMemo(() => Array.from(text), [text]); // handles emoji/surrogates better than split("")
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep latest values available inside timers without re-registering everything constantly.
  const lettersLenRef = useRef<number>(letters.length);
  useEffect(() => {
    lettersLenRef.current = letters.length;
  }, [letters.length]);

  useEffect(() => {
    function clearStepTimer() {
      if (stepTimerRef.current) {
        clearInterval(stepTimerRef.current);
        stepTimerRef.current = null;
      }
      setActiveIndex(null);
    }

    function runCycle() {
      clearStepTimer();

      const len = lettersLenRef.current;
      if (len <= 0) return;

      let i = 0;
      setActiveIndex(0);

      stepTimerRef.current = setInterval(() => {
        i += 1;

        if (i >= len) {
          clearStepTimer();
          return;
        }

        setActiveIndex(i);
      }, stepMs);
    }

    // Start immediately? If you want it to wait 10s before first run, remove this line.
    runCycle();

    cycleTimerRef.current = setInterval(runCycle, cycleEveryMs);

    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    };
  }, [cycleEveryMs, stepMs]);

  return (
    <>
      {letters.map((ch, idx) => {
        const isActive = idx === activeIndex;
        const mergedStyle: React.CSSProperties = isActive
          ? { ...style, ...secondaryStyle }
          : { ...style };

        // Preserve spaces visually
        const displayChar = ch === " " ? "\u00A0" : ch;

        return (
          <div
            key={`${idx}-${ch}`}
            style={{ display: "inline-block", ...mergedStyle }}
          >
            {displayChar}
          </div>
        );
      })}
    </>
  );
}
