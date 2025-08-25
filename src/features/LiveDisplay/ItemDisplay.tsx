import React, { useEffect, useState } from "react";
import clsx from "clsx";
import type { Banner, BannerCSS } from "../../context/LiveData/types";

interface ItemDisplayProps {
  banner: Banner;
  defaultCSS: BannerCSS;
  initialCSS: BannerCSS;
  bannerType: "rotating" | "spot";
}

export default function ItemDisplay({ banner, defaultCSS, initialCSS, bannerType }: ItemDisplayProps) {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setSlideIn(true));
  }, [banner]);

  function getVal<K extends keyof BannerCSS>(field: K): BannerCSS[K] {
    const val = banner.bannerCSS?.[field] ?? defaultCSS[field] ?? initialCSS[field];

    if (val !== undefined) {
      return val as BannerCSS[K];
    }

    if (field === "textAlign") return "left" as BannerCSS[K];
    if (field === "onBox") return false as BannerCSS[K];

    // fallback for string-like fields
    return "" as BannerCSS[K];

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
        ...(bannerType === "spot"
          ? { backgroundColor: getVal("onBox") ? getVal("backgroundColor") : "transparent" }
          : {}),
      }}
      className={clsx(
        " absolute transition-transform duration-500 ease-in-out",
        slideIn && bannerType === 'spot' ? "scale-100" : "scale-30",
        slideIn && bannerType === 'rotating' ? " translate-x-[0%]" : "translate-x-[120%]"
      )}
    >
      <div
        style={{
          backgroundColor: getVal("onBox") ? getVal("backgroundColor") : "transparent",
        }}
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
          dangerouslySetInnerHTML={{ __html: liveTextDisplay(banner.text) }}
        />
      </div>
    </div>
  );
}
