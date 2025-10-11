import type { Timer } from "../context/LiveData/types";

interface IProgressWheel {
    timer: Timer
    size?: number;
    alt?: boolean
}

export function ProgressWheel({
    timer,
    size = 120,
    alt = false,
}: IProgressWheel) {
  if (!timer || !timer.on || timer.interval == null || timer.countdown == null) {
    return <div></div>;
  }

    const radius = size / 2 - 5;
    const cx = size / 2;
    const cy = size / 2;
    const stepAngle = 360 / (timer.interval - 1);
    const completed = Math.max(0, timer.interval - timer.countdown);

    const wedges = Array.from({ length: timer.interval - 1 }, (_, i) => {
        const startAngle = -90 + i * stepAngle;
        const endAngle = startAngle + stepAngle;

        const largeArc = stepAngle > 180 ? 1 : 0;

        const radiusMod1 = radius + (i%2==0?3:-3);
        const radiusMod2 = radius -  (i%2==1?3:-3);


        const x1 = cx + radiusMod1 * Math.cos((startAngle * Math.PI) / 180);
        const y1 = cy + radiusMod1 * Math.sin((startAngle * Math.PI) / 180);
        const x2 = cx + radiusMod2 * Math.cos((endAngle * Math.PI) / 180);
        const y2 = cy + radiusMod2 * Math.sin((endAngle * Math.PI) / 180);

        const pathData = `
      M ${cx} ${cy}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;

        const isFilled = i < completed;
        const fill = alt
            ? (isFilled ? "#fecaca" : "#b91c1c")
            : (isFilled ? "#bfdbfe" : "#2563eb");

        return (
            <path
                key={i}
                d={pathData}
                stroke={fill}
                strokeWidth={1}
                fill={fill}
                style={{
                    transition: "fill 0.5s ease",

                    //   transition: "fill 0.5s ease, opacity 0.5s ease",
                    //   opacity: isFilled ? 0.6: 1,
                }}
            />)
        // <path key={i} d={pathData} fill={fill} />;
    });

    const animSliceInterval = Math.floor((timer.countdown - 1) / 3) % 3 + 1;

    return (
        <div
            className="inline-flex items-center justify-center rounded relative"
            style={{
                width: size,
                height: size,
            }}
        >
            <svg width={size} height={size}>
                {wedges}
            </svg>
            <div
                className="absolute text-center font-bold -translate-y-0.5"
                style={{
                    color: alt ? "white" : "oklch(90.5% 0.182 98.111)",
                    fontSize: size * 0.5,
                    mixBlendMode: "difference", // or "exclusion", "overlay", etc.
                }}
            >
                {timer.countdown}
            </div>
            {alt  && animSliceInterval === 1 &&
                <div className="absolute bottom-6 -left-24 rotate-20 font-[Impact] text-red-300 text-2xl animate-pulse">So angry!!</div>
            }
            {alt  && animSliceInterval === 2 &&
                <div className="absolute top-0 -right-10 -rotate-20 font-[Impact] text-red-300 text-2xl animate-pulse">Grr!!</div>
            }
            {alt  && animSliceInterval === 3 &&
                <div className="absolute bottom-0 -right-16 -rotate-20 font-[Impact] text-red-600 text-2xl animate-pulse">Anger!!</div>
            }
        </div>
    );
}
