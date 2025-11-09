import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";
import { usePersistentState } from "../../../hooks/usePersistentState";
import graphpaper from "./assets/graph_paper.png";
import { SlidesSceneFallback, SlidesSceneSchema } from "./types";

const Slides = () => {
    const [panelScene] = usePersistentState({
        storageKey: "slidesScene",
        schema: SlidesSceneSchema,
        fallback: SlidesSceneFallback,
    });

    // Locate selected image module via Vite glob
    const images = import.meta.glob("/src/local/slides/*", { eager: true }) as Record<
        string,
        { default: string }
    >;

    const selectedName = panelScene.selected;
    const selectedPath = selectedName
        ? `/src/local/slides/${selectedName}`
        : null;

    const selectedModule = selectedPath ? images[selectedPath] : undefined;
    const selectedSrc = selectedModule?.default ?? null;

    return (
        <div
            className="absolute top-0 left-0 w-full h-full bg-blue-400 "
        >
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover opacity-30"
                style={{ backgroundImage: `url(${graphpaper})` }}
            ></div>

            <MasterViewport name="slides">
                <div className="w-full h-full relative">
                    {selectedSrc ? (
                        <img
                            src={selectedSrc}
                            alt={selectedName}
                            className=" absolute left-1/2 bottom-0 -translate-x-1/2 object-contain max-w-full max-h-full border-4 border-gray-600
                            "
                        />
                    ) : (
                        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-center text-gray-700 pb-4">
                            no image
                        </div>
                    )}
                </div>
            </MasterViewport>
        </div>
    );
};

export default Slides;
