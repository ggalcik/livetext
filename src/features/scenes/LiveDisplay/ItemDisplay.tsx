import React, { type JSX } from "react";
import clsx from "clsx";
import type { Banner, BannerCSS } from "../../../context/LiveData/types";
import { dateStr } from "../../../components/util";

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

function DisplayTextDivs(text: string): JSX.Element[] {
  return text.split(/\r\n|\r|\n/).map((line, idx) => {
    // Replace empty line with non-breaking space
    let newLine = line.replace(/^\s*$/, "\u00A0");
    newLine = newLine.replace('[[d]]', dateStr('iii MMM d yyyy G'));

    // Detect inline style markers like [[font-size: 70%; background-color: green]]
    const styleMatch = newLine.match(/\[\[(.+)\]\]$/);
    let style: React.CSSProperties = {};

    if (styleMatch) {
      const styleString = styleMatch[1];
      // Remove style part from text
      newLine = newLine.replace(/\[\[.+\]\]$/, '').trim();

      styleString.split(';').forEach(pair => {
        const [key, value] = pair.split(':').map(s => s?.trim());
        if (key && value) {
          // Convert kebab-case to camelCase for React
          const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          (style as any)[camelKey] = value;
        }
      });
    }

    return (
      <div key={idx} style={style}>
        {newLine}
      </div>
    );
  });
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
          backgroundColor: getVal("backgroundColor"),
          textShadow: getVal("textShadow"),
          color: getVal("color"),
          font: getVal("font"),
          // backgroundColor: getVal("onBox") ? getVal("backgroundColor") : "transparent",
        }}
      >
        {DisplayTextDivs(banner.text)}
      </div>
    </div>
  );

  return returnItem;
}
