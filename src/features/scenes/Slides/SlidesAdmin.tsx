import { useEffect, useMemo } from "react";
import { SlidesSceneSchema, SlidesSceneFallback, type SlidesScene } from "./types";
import { usePersistentState } from "../../../hooks/usePersistentState";

export function SlidesAdmin() {
    const [panelScene, setPanelScene] = usePersistentState({
        storageKey: "slidesScene",
        schema: SlidesSceneSchema,
        fallback: SlidesSceneFallback,
    });

    // Discover local images (Vite build-time glob)
    const images = useMemo(() => {
        return import.meta.glob("/src/local/slides/*", { eager: true }) as Record<
            string,
            { default: string }
        >;
    }, []);

    // Extract filenames like "foo.jpg"
    const availableFilenames = useMemo(() => {
        return Object.keys(images).map((path) => path.split("/").pop() ?? "");
    }, [images]);

    // --- Reconciliation on mount ---
    useEffect(() => {
        const known = new Set(availableFilenames);

        // Keep valid entries
        const existingSlides = panelScene.slides.filter((s) => known.has(s.filename));

        // Add new ones
        const missing = availableFilenames.filter(
            (filename) => !existingSlides.some((s) => s.filename === filename)
        );

        const appendedSlides = [
            ...existingSlides,
            ...missing.map((filename) => ({ filename, marked: false })),
        ];

        // Update only if changed
        const changed =
            appendedSlides.length !== panelScene.slides.length ||
            appendedSlides.some((s, i) => panelScene.slides[i]?.filename !== s.filename);

        if (changed) {
            setPanelScene({ slides: appendedSlides });
        }
    }, [availableFilenames, panelScene.slides, setPanelScene]);

    // --- Reorder functions ---
    const moveUp = (index: number) => {
        if (index === 0) return;
        const slides = [...panelScene.slides];
        [slides[index - 1], slides[index]] = [slides[index], slides[index - 1]];
        setPanelScene({ ...panelScene, slides });
    };

    const moveDown = (index: number) => {
        if (index === panelScene.slides.length - 1) return;
        const slides = [...panelScene.slides];
        [slides[index], slides[index + 1]] = [slides[index + 1], slides[index]];
        setPanelScene({ ...panelScene, slides });
    };

    const toggleMarked = (index: number) => {
        const slides = [...panelScene.slides];
        slides[index] = {
            ...slides[index],
            marked: !slides[index].marked,
        };
        setPanelScene({ ...panelScene, slides });
    };

    const selectSlide = (fname: string) => {
        setPanelScene({ ...panelScene, selected: fname });
    }

    // --- Render ---
    return (
        <div className="h-120 w-max overflow-y-auto p-4 border flex flex-col gap-2">

            {panelScene.slides.map((slide, index) => {
                const module = images[`/src/local/slides/${slide.filename}`];
                const imgSrc = module?.default ?? "";

                return (
                    <div
                        key={slide.filename}
                        className={` relative border border-gray-300 p-2 rounded group
                           ${slide.filename == panelScene.selected ? 'bg-amber-100' : ' bg-white'} `}
                    >
                        <div className="relative cursor-pointer"
                            onClick={() => selectSlide(slide.filename)}>
                            <img
                                src={imgSrc}
                                alt={slide.filename}
                                className="w-60 h-auto object-contain block"
                            />

                            {/* Controls */}
                            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100">
                                <button
                                    className="w-8 h-8 border cursor-pointer bg-white"
                                    onClick={(e) => { e.stopPropagation(); moveUp(index) }}
                                >
                                    ▲
                                </button>
                                <button
                                    className="w-8 h-8 border cursor-pointer bg-white"
                                    onClick={(e) => { e.stopPropagation(); moveDown(index) }}
                                >
                                    ▼
                                </button>
                                <button
                                    className={`w-8 h-8 border cursor-pointer ${slide.marked ? 'bg-green-300' : ' bg-white'}`}
                                    onClick={(e) => { e.stopPropagation(); toggleMarked(index) }}
                                >
                                    {slide.marked ? "★" : "☆"}
                                </button>
                            </div>
                        </div>

                        <div className="mt-2 text-sm">
                            {slide.filename}
                        </div>
                    </div>
                );
            })}

        </div>

    );
}
