import clsx from "clsx";
import { NO_ACTIVE_BANNER } from "./context/LiveData/types";
import type { LiveDataState } from "./context/LiveData/types";
import { initialLiveDataState } from "./context/LiveData/LiveDataReducer";

export default function LiveText({ state }: { state: LiveDataState }) {
  function liveTextDisplay(text: string) {
    if (!text.trim()) return "[no text]";
    return text.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }
  if (state.activeBanner === null) return "[no banner]";

  const thisCSS = {...initialLiveDataState.bannerCSS, ...state.bannerCSS, ...state.banners[state.activeBanner].bannerCSS};

  function getVal<K extends keyof LiveDataState["bannerCSS"]>(field: K): string {
    return thisCSS[field] || "";
  }
  // function getVal<K extends keyof LiveDataState["bannerCSS"]>(field: K): string {
  //   const val = state.bannerCSS[field];
  //   const fallback = initialLiveDataState.bannerCSS[field];
  //   return (val || fallback) ?? "";
  // }

  return (
    <div
      className={clsx("min-h-full", {
        "bg-(--chromakey-color)": state.backgroundOn,
      })}
    >
      {!state.banners.length && "[no banners]"}
      {state.activeBanner !== NO_ACTIVE_BANNER &&
        !state.banners[state.activeBanner] &&
        "[something wrong]"}
      {
        state.activeBanner !== NO_ACTIVE_BANNER && state.banners[state.activeBanner] && (
          <div
            style={{
              padding: getVal("padding"),
              textAlign: getVal("textAlign") as React.CSSProperties["textAlign"],
            }}
          >
            <mark
              style={{
                color: getVal("color"),
                font: getVal("font"),
                backgroundColor: getVal("backgroundColor"),
              }}
              dangerouslySetInnerHTML={{
                __html: liveTextDisplay(state.banners[state.activeBanner].text),
              }}
            ></mark>
          </div>
        )

        // <div dangerouslySetInnerHTML={{__html: liveTextDisplay(state.banners[state.activeBanner].text)}} className="bg-black p-2 inline leading-10" ></div>
      }
    </div>
  );
}
