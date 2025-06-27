import React, { useEffect, useState } from "react";
import clsx from "clsx";
import type { BannerCSS, LiveDataState } from "./context/LiveData/types";

interface BannerSlideProps {
  banner: LiveDataState["banners"][number];
  defaultCSS: LiveDataState["bannerCSS"];
  initialCSS: LiveDataState["bannerCSS"];
}

export default function BannerDisplay({ banner, defaultCSS, initialCSS }: BannerSlideProps) {
  const [slideIn, setSlideIn] = useState(false);
  // console.log("defaultCSS %o, banner.bannerCSS %o", defaultCSS, banner.bannerCSS);
  const logSetSlideIn = (which: boolean) => {
    // console.log("setSlideIn: ", which);
    setSlideIn(which);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      logSetSlideIn(true);
    });
  }, [banner]);


  function getVal<K extends keyof BannerCSS>(field: K): BannerCSS[K] {
  const val = banner.bannerCSS[field] || defaultCSS[field] || initialCSS[field];

  if (val === undefined) {
    if (field === "textAlign") return "left" as BannerCSS[K];
    if (field === "onBox") return false as BannerCSS[K];
    return "" as BannerCSS[K];
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
        backgroundColor: getVal("onBox") ? getVal("backgroundColor") : "transparent" ,
      }}
      className={clsx(
        "transition-transform  duration-300 ease-in-out ",
        // slideIn ? " scale-100" : "scale-50"
        slideIn ? " translate-x-[0%]" : "translate-x-[120%]"
      )}
    >
      {/* <mark className="text-stroke-black text-stroke-1" */}
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
  );
}
