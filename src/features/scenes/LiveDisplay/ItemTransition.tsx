import { CSSTransition } from "react-transition-group";
import React from "react";
import ItemDisplay from "./ItemDisplay";
import { initialLiveDataState } from "../../../context/LiveData/LiveDataReducer";
import type { Banner} from "../../../context/LiveData/types";

type ItemTransitionProps =
  | {
      kind: "rotating";
      item: Banner;
      isActive: boolean;
      defaultCSS: typeof initialLiveDataState.defaultBannerCSS;
    }
  | {
      kind: "spot";
      item: Banner;
      isActive: boolean;
      defaultCSS: typeof initialLiveDataState.defaultSpotCSS;
    };

export function ItemTransition({ kind, item, isActive, defaultCSS }: ItemTransitionProps) {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={isActive}
      timeout={kind === "rotating" ? 500 : 300}
      classNames={kind}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <ItemDisplay
        ref={nodeRef}
        bannerType={kind}
        banner={item}
        defaultCSS={defaultCSS}
        initialCSS={
          kind === "rotating"
            ? initialLiveDataState.defaultBannerCSS
            : initialLiveDataState.defaultSpotCSS
        }
      />
    </CSSTransition>
  );
}
