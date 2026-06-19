import { useEffect, useState } from "react";
import clsx from "clsx";
import type { LiveDataState } from "./context/LiveData/types";
import { combineBannerCSS, parseBannerCSS } from "./context/LiveData/bannerCss";

interface BannerSlideProps {
  banner: LiveDataState["banners"][number];
  defaultCSS: LiveDataState["defaultBannerCSS"];
  initialCSS: LiveDataState["defaultBannerCSS"];
}

export default function BannerDisplay({ banner, defaultCSS, initialCSS }: BannerSlideProps) {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setSlideIn(true);
    });
  }, [banner]);
  const bannerStyle = parseBannerCSS(
    combineBannerCSS(initialCSS, defaultCSS, banner.bannerCSS)
  );

  function liveTextDisplay(text: string) {
    if (!text.trim()) return "[no text]";
    return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }

  return (
    <div
      style={{
        ...bannerStyle,
      }}
      className={clsx(
        "transition-transform duration-300 ease-in-out ",
        // slideIn ? " scale-100" : "scale-50"
        slideIn ? " translate-x-[0%]" : "translate-x-[120%]"
      )}
    >
      {/* <mark className="text-stroke-black text-stroke-1" */}
      <div
        style={{}}
      >
        <mark
          className=""
          style={{
            backgroundColor: bannerStyle.backgroundColor,
            boxDecorationBreak: "clone",
            padding: "5px 10px",
          }}
          dangerouslySetInnerHTML={{ __html: liveTextDisplay(banner.text) }}
        />
      </div>
    </div>
  );
}
