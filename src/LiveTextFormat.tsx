import clsx from "clsx";
import type { BannerCSS, LiveDataAction, LiveDataState } from "./context/LiveData/types";
import { useEffect, useRef } from "react";

interface LiveTextFormatOpts {
  banner: "default" | number;
  dispatch: React.Dispatch<LiveDataAction>;
  bannerCSS: BannerCSS;
  defaultCSS: BannerCSS;
  hideThis: () => void;
}

export default function LiveTextFormat({
  banner,
  dispatch,
  bannerCSS,
  defaultCSS,
  hideThis,
}: LiveTextFormatOpts) {
  const ref = useRef<HTMLDivElement>(null);

  type CSSField = keyof LiveDataState["bannerCSS"];
  type CSSValue<K extends CSSField> = LiveDataState["bannerCSS"][K];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        hideThis();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hideThis]);

  function dispatchChange<K extends CSSField>(key: K, value: CSSValue<K> | undefined) {
    dispatch({
      type: "bannerCSS",
      payload: {
        banner,
        cssPayload: {
          [key]: value,
        },
      },
    });
  }

  return (
    <div ref={ref} className="relative z-10 border bg-white m-2 p-2 drop-shadow-2xl text-sm">
      <div className="grid grid-cols-[auto_auto] gap-2">
        <div className="text-right self-center">padding</div>
        <div>
          <input
            className="w-40 border p-2"
            value={bannerCSS.padding}
            placeholder={defaultCSS.padding}
            onChange={(e) => dispatchChange("padding", e.target.value)}
          />
        </div>
        <div className="text-right self-center">
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font" target="_blank">
            font
          </a>
        </div>
        <div>
          <input
            className="w-40 border p-2"
            value={bannerCSS.font}
            placeholder={defaultCSS.font}
            onChange={(e) => dispatchChange("font", e.target.value)}
          />
        </div>
        <div className="text-right self-center">textAlign</div>

        <div className="flex gap-2">
          {(["left", "center", "right"] as const).map((align) => (
            <button
              key={align}
              className={clsx("px-3 py-1 rounded border cursor-pointer", {
                "bg-blue-600 text-white border-blue-600": bannerCSS.textAlign === align,
                "bg-blue-100 border-blue-600":
                  !bannerCSS.textAlign && defaultCSS.textAlign === align,
                "bg-white text-gray-800 border-gray-400 hover:bg-gray-100":
                  bannerCSS.textAlign && bannerCSS.textAlign !== align,
              })}
              onClick={() => dispatchChange("textAlign", align)}
            >
              {align[0].toUpperCase()}
            </button>
          ))}
        </div>
        <div className="text-right self-center">color</div>
        <div>
          <input
            className="w-40 border p-2"
            value={bannerCSS.color}
            placeholder={defaultCSS.color}
            onChange={(e) => dispatchChange("color", e.target.value)}
          />
        </div>
        <div className="text-right self-center">backgroundColor</div>
        <div className="flex items-center gap-2">
          <input
            className="w-20 border p-2"
            value={bannerCSS.backgroundColor}
            placeholder={defaultCSS.backgroundColor}
            onChange={(e) => dispatchChange("backgroundColor", e.target.value)}
          />
          <input
            type="checkbox"
            className="h-6 w-6"
            checked={bannerCSS.onBox}
            onChange={(e) => dispatchChange("onBox", e.target.checked)}
          />
          <div>box</div>
        </div>
        <div className="text-right self-center">textShadow</div>
        <div>
          <input
            className="w-40 border p-2"
            value={bannerCSS.textShadow}
            placeholder={defaultCSS.textShadow}
            onChange={(e) => dispatchChange("textShadow", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
