import React from "react";
import clsx from "clsx";
import type { Banner, BannerCSS } from "../../../context/LiveData/types";
import { dateStr } from "../../../components/util";
import { combineBannerCSS, parseBannerCSS } from "../../../context/LiveData/bannerCss";

interface ItemDisplayProps {
  banner: Banner;
  defaultCSS: BannerCSS;
  initialCSS: BannerCSS;

  ref: React.Ref<HTMLDivElement>;
}

export default function ItemDisplay({ banner, defaultCSS, initialCSS, ref }: ItemDisplayProps) {
  const bannerStyle = parseBannerCSS(
    combineBannerCSS(initialCSS, defaultCSS, banner.bannerCSS)
  );

  function liveTextDisplay(text: string) {
    if (!text.trim()) return "[no text]";
    return (textToDisplayIncorrect(text));


    let newText = text;
    // let newText = `${extra} ${text}`;
    newText = newText.replace('[[d]]', dateStr('iii MMM d yyyy G'));
    return newText.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }

  function getTextLines(text: string): string[] {
    return text.split(/\r\n|\r|\n/);
  }

  function textToDisplayIncorrect(text: string): string {
    const lines = getTextLines(text);
    const newLines = lines.map((line, idx) => <div key={idx}>{line}</div>)

    return newLines.join('');
  }
  const returnItem = (

    <div
      ref={ref}
      style={{
        ...bannerStyle,

      }}
      className={clsx('opacity-100',

        "absolute",


      )}
    >
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

  return returnItem;
}
