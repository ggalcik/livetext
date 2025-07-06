import clsx from "clsx";
import { useLiveData } from "./context/LiveData";

export default function TopOpts() {
  const { state, dispatch } = useLiveData();

  return (
    <>
      <div className="grid  grid-cols-[6fr_1fr] gap-2">
        <button
          className={clsx("px-3 py-1 rounded-2xl border cursor-pointer", {
            "bg-blue-600 text-white border-blue-600": state.displayBanners,

            "bg-white text-gray-800 border-gray-400 hover:bg-gray-100": !state.displayBanners,
          })}
          onClick={() => dispatch({ type: "banner/toggle" })}
        >
          banners
        </button>
        <button
          className={clsx(
            "px-3 py-1 rounded-2xl border cursor-pointer",

            "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
          )}
          onClick={() => dispatch({ type: "banner/solo" })}
        >
          solo
        </button>
      </div>

      <div className="grid  grid-cols-[6fr_1fr] gap-2">
        <button
          className={clsx("px-3 py-1 rounded-2xl border cursor-pointer", {
            "bg-blue-600 text-white border-blue-600": state.displaySpots,

            "bg-white text-gray-800 border-gray-400 hover:bg-gray-100": !state.displaySpots,
          })}
          onClick={() => dispatch({ type: "spot/toggle" })}
        >
          spots
        </button>
        <button
          className={clsx(
            "px-3 py-1 rounded-2xl border cursor-pointer",

            "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
          )}
          onClick={() => dispatch({ type: "spot/solo" })}
        >
          solo
        </button>
      </div>
    </>
  );
}
