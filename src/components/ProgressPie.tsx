import type { Timer } from "../context/LiveData/types";

interface IProgressPie {
    timer: Timer
    size?: number;
    alt?: boolean
}

export function ProgressPie({
    timer,
    size = 120,
    alt = false,
}: IProgressPie) {
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

        const x1 = cx + radius * Math.cos((startAngle * Math.PI) / 180);
        const y1 = cy + radius * Math.sin((startAngle * Math.PI) / 180);
        const x2 = cx + radius * Math.cos((endAngle * Math.PI) / 180);
        const y2 = cy + radius * Math.sin((endAngle * Math.PI) / 180);

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
                strokeWidth={3}
                fill={fill}
                style={{
                    transition: "fill 0.5s ease",

                    //   transition: "fill 0.5s ease, opacity 0.5s ease",
                    //   opacity: isFilled ? 0.6: 1,
                }}
            />)
        // <path key={i} d={pathData} fill={fill} />;
    });

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
        </div>
    );
}
