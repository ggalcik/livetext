import React, { useEffect, useState, forwardRef } from "react";
import clsx from "clsx";
import type { Banner, BannerCSS, BannerType } from "../../../context/LiveData/types";
import { dateStr } from "../../../components/util";
import glog from "../../../components/glog";

interface ItemDisplayProps {
  banner: Banner;
  defaultCSS: BannerCSS;
  initialCSS: BannerCSS;

  ref: React.Ref<HTMLDivElement>;
}

export default function ItemDisplay({ banner, defaultCSS, initialCSS, ref }: ItemDisplayProps) {


  function fallback(...values: (string | boolean | null | undefined)[]): string | boolean | undefined {
    return values.find(v => v != null && v !== "") ?? undefined;
  }

  function getVal<K extends keyof BannerCSS>(field: K): BannerCSS[K] {
    const val =
      fallback(banner.bannerCSS[field],
        defaultCSS[field],
        initialCSS[field]
      );

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
    return (textToDisplayIncorrect(text));


    let newText = text;
    // let newText = `${extra} ${text}`;
    newText = newText.replace('[[d]]', dateStr('iii MMM d yyyy G'));
    return newText.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }

  function getTextLines(text: string): string[] {
    return text.split(/\r\n|\r|\n/);
  }

  function textToDisplay(text: string): string {
    const lines = getTextLines(text);
    const newLines = lines.map((line, idx) => {
        <div key={idx}>{line}</div>
      }
    )

    return newLines.join('');
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
        padding: getVal("padding"),
        textAlign: getVal("textAlign") as React.CSSProperties["textAlign"],

        backgroundColor: getVal("onBox") ? getVal("backgroundColor") : "transparent"

      }}
      className={clsx('opacity-100',

        "absolute",


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

  return returnItem;
}
