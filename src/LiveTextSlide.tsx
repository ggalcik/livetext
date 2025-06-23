import React, { useEffect, useState } from "react";
import clsx from "clsx";
import type { LiveDataState } from "./context/LiveData/types";

interface BannerSlideProps {
  banner: LiveDataState["banners"][number];
  defaultCSS: LiveDataState["bannerCSS"];
}

export default function LiveTextSlide({ banner, defaultCSS }: BannerSlideProps) {
  const [slideIn, setSlideIn] = useState(false);

  const logSetSlideIn = (which: boolean) => {
    console.log("setSlideIn: ", which);
    setSlideIn(which);
  };

  useEffect(() => {
    logSetSlideIn(false);

    requestAnimationFrame(() => {

        logSetSlideIn(true);

    });
  }, [banner]);

  const thisCSS = {
    ...defaultCSS,
    ...banner.bannerCSS,
  };

  function getVal<K extends keyof typeof thisCSS>(field: K): string {
    return thisCSS[field] || "";
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
      }}
      className={clsx(
        "transition-transform  duration-300 ease-in-out ",
        slideIn ? " translate-x-[0%]" : "translate-x-[120%]"
      )}
    >
      <mark
        style={{
          color: getVal("color"),
          font: getVal("font"),
          backgroundColor: getVal("backgroundColor"),
        }}
        dangerouslySetInnerHTML={{ __html: liveTextDisplay(banner.text) }}
      />
    </div>
  );
}
