import clsx from "clsx";
import type {
  BannerCSS,
  LiveDataAction,
  LiveDataState,
  PopupState,
} from "./context/LiveData/types";

interface LiveTextFormatOpts {
  banner: "default" | number;
  dispatch: React.Dispatch<LiveDataAction>;
  bannerCSS: BannerCSS;
  defaultCSS: BannerCSS;
}

export default function LiveTextFormat({
  banner,
  dispatch,
  bannerCSS,
  defaultCSS,
}: LiveTextFormatOpts) {
  type CSSField = keyof LiveDataState["bannerCSS"];
  type CSSValue<K extends CSSField> = LiveDataState["bannerCSS"][K];

  function dispatchChange<K extends CSSField>(key: K, value: CSSValue<K>) {
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
    <div className="absolute border bg-white m-2 p-2 drop-shadow-2xl">
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
            className="w-60 border p-2"
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
              className={clsx(
                "px-3 py-1 rounded border cursor-pointer",
                bannerCSS.textAlign === align
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
              )}
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
        <div>
          <input
            className="w-40 border p-2"
            value={bannerCSS.backgroundColor}
            placeholder={defaultCSS.backgroundColor}
            onChange={(e) => dispatchChange("backgroundColor", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
