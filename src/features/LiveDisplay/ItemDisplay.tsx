import React, { useEffect, useState } from "react";
import clsx from "clsx";

type CSSDefaults = {
  textAlign?: string;
  onBox?: boolean;
  [key: string]: unknown;
};

interface GenericDisplayProps<
  TStyle extends CSSDefaults,
  TItem extends Record<string, unknown>,
  TKey extends keyof TItem = keyof TItem
> {
  item: TItem;
  cssKey: TKey;
  defaultCSS: TStyle;
  initialCSS: TStyle;
}

export function GenericDisplay<
  TStyle extends CSSDefaults,
  TItem extends Record<string, unknown>,
  TKey extends keyof TItem & string
>({
  item,
  cssKey,
  defaultCSS,
  initialCSS,
}: GenericDisplayProps<TStyle, TItem, TKey>) {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setSlideIn(true));
  }, [item]);

  function getVal<K extends keyof TStyle>(field: K): TStyle[K] {
    const cssObj = item[cssKey] as Partial<TStyle> | undefined;
    const val = cssObj?.[field] ?? defaultCSS?.[field] ?? initialCSS?.[field];

    if (val === undefined) {
      if (field === "textAlign") return "left" as TStyle[K];
      if (field === "onBox") return false as TStyle[K];
      return "" as TStyle[K];
    }

    return val;
  }

  return (
    <div className={clsx("transition", { "opacity-100": slideIn, "opacity-0": !slideIn })}>
      {/* You can render something using getVal here */}
      <div style={{ textAlign: getVal("textAlign" as keyof TStyle) as string }}>
        Display using getVal
      </div>
    </div>
  );
}
