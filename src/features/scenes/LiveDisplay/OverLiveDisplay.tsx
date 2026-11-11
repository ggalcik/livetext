import type { ObsSceneProps } from "../../ObsSource/ObsSceneRegistry";
import { TransitionGroup } from "react-transition-group";
import { ItemTransition } from "./ItemTransition";
import { bannerObsDataSchema } from "./bannerObsData";
import { ProgressWheel } from "../../../components/ProgressWheel";
import BreakDisplay from "./BreakDisplay";
import "./ItemTransitions.css";

/** OBS receives the current presentation, never the full library or playback state. */
export default function OverLiveDisplay({ data }: ObsSceneProps) {
  const parsed = bannerObsDataSchema.safeParse(data);
  if (!parsed.success) return null;
  const { banner, spot, width, top, scale, countdown, showAngry } = parsed.data;
  return (
    <div className="absolute" style={{
      containerType: "inline-size",
      width: `${width}%`,
      left: `${(100 - width) / 2}%`,
      top: `${top}%`,
      transform: `scale(${scale / 100})`,
      transformOrigin: "top center",
    }}>
      {showAngry && <BreakDisplay />}
      <TransitionGroup component={null} appear>
      {banner && <ItemTransition
        key={`banner-${banner.id}`}
        kind="rotating"
        item={{ id: banner.id, text: banner.text, bannerCSS: `${banner.css}; width: 100%; top: 0; left: 0`, type: "rotating", on: true }}
        defaultCSS=""
      />}
      {spot && <ItemTransition
        key={`spot-${spot.id}`}
        kind="spot"
        item={{ id: spot.id, text: spot.text, bannerCSS: `${spot.css}; width: 100%; top: 0; left: 0`, type: "spot" }}
        defaultCSS=""
      />}
      </TransitionGroup>
      {countdown && (
        <div className={countdown.kind === "timer"
          ? "absolute -top-24 -left-6 scale-80"
          : "absolute top-0 right-1/6 scale-80"}>
          <ProgressWheel
            timer={{ on: true, waiting: false, interval: countdown.interval, countdown: countdown.seconds }}
            size={countdown.kind === "timer" ? 80 : 90}
            alt={countdown.kind === "breakTimer"}
          />
        </div>
      )}
    </div>
  );
}
