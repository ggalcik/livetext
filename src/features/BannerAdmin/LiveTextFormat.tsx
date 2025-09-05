import clsx from "clsx";
import type { BannerCSS, LiveDataAction } from "../../context/LiveData/types";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type LiveTextFormatOpts =
  | {
    banner: "default" | number;
    dispatch: React.Dispatch<LiveDataAction>;
    css: Partial<BannerCSS>;
    defaultCSS: BannerCSS;
    hideThis: () => void;
  }
  | {
    spot: "default" | number;
    dispatch: React.Dispatch<LiveDataAction>;
    css: Partial<BannerCSS>;
    defaultCSS: BannerCSS;
    hideThis: () => void;
  };

// when I want to put arbitrary css into a text box
function parseStyleString(css: string): CSSProperties {
  return css
    .split(';')
    .map(p => p.trim())
    .filter(Boolean)
    .reduce<CSSProperties>((acc, part) => {
      const [prop, val] = part.split(':').map(s => s.trim());
      if (!prop || !val) return acc;

      const isValid = prop in document.body.style;
      if (!isValid) return acc;  // skip unsupported property

      const camel = prop.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
      (acc as any)[camel] = val;
      return acc;
    }, {});
}

function CssEditorBox() {
  const [cssText, setCssText] = useState("padding: 10px; background-color: pink;");
  const styleObj = parseStyleString(cssText);

  return (
    <div>
      <textarea
        value={cssText}
        onChange={(e) => setCssText(e.target.value)}
        rows={5}
        className="block w-full p-2 border"
      />
      <div style={styleObj}>
        <p>This box reflects your CSS!</p>
      </div>
    </div>
  );
}

export default function LiveTextFormat(props: LiveTextFormatOpts) {
  const ref = useRef<HTMLDivElement>(null);

  const { dispatch, css, defaultCSS, hideThis } = props;

  const isBanner = "banner" in props;
  const index = isBanner ? props.banner : props.spot;

  type CSSField = keyof typeof css;
  type CSSValue<K extends CSSField> = (typeof css)[K];

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
    if (isBanner) {
      dispatch({
        type: "bannerCSS",
        payload: {
          banner: index,
          cssPayload: { [key]: value }, // TODO: is this cssPayload working how I expect?
        },
      });
    } else {
      dispatch({
        type: "spotCSS",
        payload: {
          spot: index,
          cssPayload: { [key]: value },
        },
      });
    }
  }

  return (
    <div ref={ref} className="relative z-10 border bg-white m-2 p-2 drop-shadow-2xl text-sm">
      <div className="grid grid-cols-[auto_auto] gap-2">
        <div className="text-right self-center">padding</div>
        <div>
          <input
            className="w-40 border p-2"
            value={css.padding ?? ''}
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
            value={css.font}
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
                "bg-blue-600 text-white border-blue-600": css.textAlign === align,
                "bg-blue-100 border-blue-600":
                  !css.textAlign && defaultCSS.textAlign === align,
                "bg-white text-gray-800 border-gray-400 hover:bg-gray-100":
                  css.textAlign && css.textAlign !== align,
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
            value={css.color}
            placeholder={defaultCSS.color}
            onChange={(e) => dispatchChange("color", e.target.value)}
          />
        </div>
        <div className="text-right self-center">backgroundColor</div>
        <div className="flex items-center gap-2">
          <input
            className="w-20 border p-2"
            value={css.backgroundColor}
            placeholder={defaultCSS.backgroundColor}
            onChange={(e) => dispatchChange("backgroundColor", e.target.value)}
          />
          <input
            type="checkbox"
            className="h-6 w-6"
            checked={css.onBox}
            onChange={(e) => dispatchChange("onBox", e.target.checked)}
          />
          <div>box</div>
        </div>
        <div className="text-right self-center">textShadow</div>
        <div>
          <input
            className="w-40 border p-2"
            value={css.textShadow}
            placeholder={defaultCSS.textShadow}
            onChange={(e) => dispatchChange("textShadow", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
