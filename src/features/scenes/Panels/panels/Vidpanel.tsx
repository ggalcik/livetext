import { useEffect, useRef, useState } from "react";

const VIDBASE = "/video/";

export function Vidpanel({ vid }: { vid: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const theVid = `${VIDBASE}${vid}`;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    setHasError(false);       // reset error on vid change
    el.pause();
    el.currentTime = 0;
    el.load();
  }, [theVid]);

  return (
    <div className="space-y-4">
      {hasError && (
        <div className="text-sm text-red-600">
          Video failed to load
        </div>
      )}

      <video
        ref={videoRef}
        src={theVid}
        autoPlay
        className="max-w-full max-h-full border"
      />
    </div>
  );
}
