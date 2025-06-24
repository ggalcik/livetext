import type { PopupState, VisiblePopup } from "../context/LiveData/types";

export function dateStr() {
  return new Date().toDateString();
}

export const showOptsPopup = (
  setVisiblePopup: PopupState["setVisiblePopup"],
  opts: PopupState["visiblePopup"]
) => {
  setVisiblePopup(opts);
};

// sadly I got this right out of chatgpt. TODO: mull this over until I get it
export function thisOptsPopupIsActive<K extends Exclude<keyof NonNullable<VisiblePopup>, number>>(
  popup: VisiblePopup,
  check: { [P in K]: VisiblePopup extends Record<P, number|"default"|null> ? VisiblePopup[P] : never }
): boolean {
  if (!popup) return false;
  const key = Object.keys(check)[0] as K;
  return key in popup && popup[key] === check[key];
}