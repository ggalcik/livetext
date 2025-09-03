import { showOptsPopup, thisOptsPopupIsActive } from "../../components/util";
import LiveTextFormat from "../LiveDisplay/LiveTextFormat";
import type { Banner } from "../../context/LiveData/types";
import { useLiveData } from "../../context/LiveData";

interface IItemControls {
    item: Banner;
    idx: number;
}


export default function ItemControls({ item, idx }: IItemControls) {
    const { state, dispatch } = useLiveData();

    return (<div className="flex gap-2">

        <input
            type="radio"
            name="activeBanner"
            value={idx}
            className=" justify-center w-8 h-8"
            checked={state.activeBanner === idx}
            disabled={!item.on}
            onChange={() => dispatch({ type: "banner/setActive", payload: { idx } })}
        />
        <input
            type="checkbox"
            name={`bannerOn_${idx}`}
            className=" justify-center w-8 h-8"
            checked={item.on === undefined ? false : item.on}
            onChange={() => dispatch({ type: "banner/toggleOneOn", payload: { idx } })}
        />

        <button
            className="text-blue-400 cursor-pointer text-left"
            onClick={() => showOptsPopup(setVisiblePopup, { banner: idx })}
        >
            [format]
        </button>
        {thisOptsPopupIsActive(visiblePopup, { banner: idx }) && (
            <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2">
                    <LiveTextFormat
                        banner={idx}
                        css={state.banners[idx].bannerCSS}
                        dispatch={dispatch}
                        defaultCSS={state.defaultBannerCSS}
                        hideThis={() => popupState.setVisiblePopup(null)}
                    />
                </div>
            </div>
        )}
        <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 px-5 py-2.5 me-2 mb-2 font-medium rounded-lg text-sm   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
            onClick={() => dispatch({ type: "banner/delete", payload: { idx } })}
        >
            Delete
        </button>

        <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
            onClick={() => dispatch({ type: "banner/add", payload: { idx: idx + 1 } })}
        >
            Add
        </button>
    </div>
    );
}