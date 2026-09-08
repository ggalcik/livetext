import type { ObsSceneProps } from "../../ObsSource/ObsSceneRegistry";

const images = import.meta.glob("/src/local/slides/*", { eager: true }) as Record<
  string,
  { default: string }
>;

export default function ObsSlides({ data }: ObsSceneProps) {
  const filename = typeof data?.filename === "string" ? data.filename : undefined;
  const selectedModule = filename
    ? images[`/src/local/slides/${filename}`]
    : undefined;

  if (!selectedModule) return null;

  return (
    <img
      src={selectedModule.default}
      alt=""
      className="h-full w-full object-contain"
    />
  );
}
