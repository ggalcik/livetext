import React from "react";

type HoldToConfirmButtonProps = {
  holdMs?: number;
  disabled?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  children: React.ReactNode;
};

export function HoldToConfirmButton({
  holdMs = 2000,
  disabled = false,
  danger = false,
  onConfirm,
  children,
}: HoldToConfirmButtonProps) {
  const [progress, setProgress] = React.useState(0);
  const frameRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number | null>(null);

  const cancel = React.useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    startRef.current = null;
    setProgress(0);
  }, []);

  const tick = React.useCallback((time: number) => {
    if (!startRef.current) startRef.current = time;

    const elapsed = time - startRef.current;
    const pct = Math.min(elapsed / holdMs, 1);
    setProgress(pct);

    if (pct >= 1) {
      cancel();
      onConfirm();
      return;
    }

    frameRef.current = requestAnimationFrame(tick);
  }, [holdMs, onConfirm, cancel]);

  const start = React.useCallback(() => {
    if (disabled) return;
    frameRef.current = requestAnimationFrame(tick);
  }, [disabled, tick]);

  return (
    <button
      disabled={disabled}
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      className="relative overflow-hidden rounded border px-3 py-1 disabled:opacity-50 cursor-pointer"
    >
      {/* progress bar */}
      <div
        className={`absolute inset-0  origin-left ${danger? "bg-red-400" :"bg-green-300/40"}`}
        style={{ transform: `scaleX(${progress})` }}
      />

      <span className="relative z-10">{children}</span>
    </button>
  );
}
