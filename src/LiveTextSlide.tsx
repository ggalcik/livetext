import React, { useEffect, useState } from "react";
import clsx from "clsx";
import type { LiveDataState } from "./context/LiveData/types";

interface BannerSlideProps {
  banner: LiveDataState["banners"][number];
  defaultCSS: LiveDataState["bannerCSS"];
  initialCSS: LiveDataState["bannerCSS"];
}

export default function LiveTextSlide({ banner, defaultCSS, initialCSS }: BannerSlideProps) {
  const [slideIn, setSlideIn] = useState(false);
  // console.log("defaultCSS %o, banner.bannerCSS %o", defaultCSS, banner.bannerCSS);
  const logSetSlideIn = (which: boolean) => {
    console.log("setSlideIn: ", which);
    setSlideIn(which);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      logSetSlideIn(true);
    });
  }, [banner]);

  // console.log("defaultCSS %o, banner.bannerCSS %o", defaultCSS, banner.bannerCSS);
  
  function getVal<K extends keyof LiveDataState["bannerCSS"]>(field: K): string {
    const val = banner.bannerCSS[field] || defaultCSS[field] || initialCSS[field];
    if (!val) return field === 'textAlign' ? 'left' : '';
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
        }}
        dangerouslySetInnerHTML={{ __html: liveTextDisplay(banner.text) }}
      />
    </div>
  );
}
