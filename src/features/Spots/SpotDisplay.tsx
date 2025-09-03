// deprecated
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import type { SpotCSS, LiveDataState } from "../../context/LiveData/types";

interface SpotSlideProps {
  spot: LiveDataState["spots"][number];
  defaultCSS: LiveDataState["spotCSS"];
  initialCSS: SpotCSS;
}

/**
 * @deprecated Use ItemDisplay instead
 */
export default function SpotDisplay({ spot, defaultCSS, initialCSS }: SpotSlideProps) {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setSlideIn(true));
  }, [spot]);

  function getVal<K extends keyof SpotCSS>(field: K): SpotCSS[K] {
    const val = spot.spotCSS?.[field] ?? defaultCSS?.[field] ?? initialCSS?.[field];

    if (val === undefined) {
      if (field === "textAlign") return "left" as SpotCSS[K];
      if (field === "onBox") return false as SpotCSS[K];
      return "" as SpotCSS[K];
    }

    return val;
  }

  function liveTextDisplay(text: string) {
    if (!text.trim()) return "[no text]";
    return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }

  return (
    <div
      style={{
        padding: getVal("padding"),
        textAlign: getVal("textAlign") as React.CSSProperties["textAlign"],
        backgroundColor: getVal("onBox") ? getVal("backgroundColor") : "transparent",
      }}
      className={clsx(
        " absolute transition-transform duration-500 ease-in-out",
        slideIn ? "scale-100" : "scale-30"
      )}
    >
      <mark
        className=""
        style={{
          textShadow: getVal("textShadow"),
          color: getVal("color"),
          font: getVal("font"),
          backgroundColor: getVal("backgroundColor"),
          boxDecorationBreak: "clone",
          padding: "5px 10px",
        }}
        dangerouslySetInnerHTML={{ __html: liveTextDisplay(spot.text) }}
      />
    </div>
  );
}
