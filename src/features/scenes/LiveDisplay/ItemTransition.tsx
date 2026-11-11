import { CSSTransition } from "react-transition-group";
import React from "react";
import ItemDisplay from "./ItemDisplay";
import { initialLiveDataState } from "../../../context/LiveData/LiveDataReducer";
import type { Banner} from "../../../context/LiveData/types";

type ItemTransitionProps = {
  in?: boolean;
  appear?: boolean;
  onExited?: () => void;
} & (
  | {
      kind: "rotating";
      item: Banner;
      isActive?: boolean;
      defaultCSS: typeof initialLiveDataState.defaultBannerCSS;
    }
  | {
      kind: "spot";
      item: Banner;
      isActive?: boolean;
      defaultCSS: typeof initialLiveDataState.defaultSpotCSS;
    });

export function ItemTransition({ kind, item, isActive, defaultCSS, in: transitionIn, appear, onExited }: ItemTransitionProps) {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={isActive ?? transitionIn}
      appear={appear}
      onExited={onExited}
      timeout={kind === "rotating" ? 500 : 300}
      classNames={kind}
      nodeRef={nodeRef}
      unmountOnExit
    >
      {/* <ItemDisplayWrong
        ref={nodeRef}
        banner={item}
        defaultCSS={defaultCSS}
        initialCSS={
          kind === "rotating"
            ? initialLiveDataState.defaultBannerCSS
            : initialLiveDataState.defaultSpotCSS
        }
      /> */}
      <ItemDisplay
        ref={nodeRef}
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
