
import BannerFormat from "./BannerFormat";
import type { Banner, PopupState } from "../../context/LiveData/types";
import { useLiveData } from "../../context/LiveData";
import { useState } from "react";
import clsx from "clsx";


interface IItemControls {
    item: Banner;
    idx: number;
    popupState: PopupState;
}


export default function ItemControls({ item, idx, popupState }: IItemControls) {
    const { visiblePopup, setVisiblePopup } = popupState;
    const { state, dispatch } = useLiveData();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const activeType = item.type === 'rotating' ? 'activeBanner' : 'activeSpot';

    function handleDelete(idx: number) {
        if (confirmDelete) {
            dispatch({ type: "banner/delete", payload: { type: item.type, idx } });
            setConfirmDelete(false);
            return;
        }
        setConfirmDelete(true);
    }

    return (<div className="flex gap-2 justify-between">
        <div className="flex gap-2">
            <input
                type="radio"
                name={activeType}
                value={idx}
                className=" justify-center w-8 h-8"
                checked={state[activeType] === idx}
                disabled={item.type === 'rotating' && !item.on}
                onChange={() => dispatch({ type: "banner/setActive", payload: { type: item.type, idx } })}
            />
            {item.type === 'rotating' &&
                <input
                    type="checkbox"
                    name={`bannerOn_${idx}`}
                    className=" justify-center w-8 h-8"
                    checked={item.on === undefined ? false : item.on}
                    onChange={() => dispatch({ type: "banner/toggleOne", payload: { idx } })}
                />
            }
        </div>

        <div className="flex gap-2">
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                onClick={(e) => {
                    if (visiblePopup === `${item.type}_${idx}`) {
                        setVisiblePopup(null);
                    } else {
                        setVisiblePopup(`${item.type}_${idx}`);
                    }
                }

                }
            >
                Format
            </button>
            {/* // TODO: this relative box is causing formatting issues when active
        //  */}
            {visiblePopup == `${item.type}_${idx}` && (
                <div className="relative z-10">
                    <div className="absolute top-1/2 -translate-y-1/2">
                        <BannerFormat
                            bannerType={item.type}
                            idx={idx}
                            css={item.type === 'rotating' ?
                                state.banners[idx].bannerCSS :
                                state.spots[idx].bannerCSS}
                            dispatch={dispatch}
                            defaultCSS={item.type === 'rotating' ? state.defaultBannerCSS : state.defaultSpotCSS}
                            hideThis={() => setVisiblePopup(null)}
                        />
                    </div>
                </div>
            )}

            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                onClick={() => dispatch({ type: "banner/add", payload: { type: item.type, idx: idx + 1 } })}
            >
                Add
            </button>
        </div>

        <div className="flex relative z-0">

            <div className="w-8 -left-4">
                {confirmDelete && <button className={clsx(` focus:outline-none text-white
                focus:ring-4 focus:ring-red-300 px-2 py-1 me-2 mb-2 font-medium rounded-lg text-sm  
                bg-red-500 hover:bg-red-500 cursor-pointer`)}
                    onClick={() => setConfirmDelete(false)}>X</button>
                }
            </div>
            <button
                type="button"
                className={clsx(`focus:outline-none text-white
                focus:ring-4 focus:ring-red-300 px-4 py-2 me-2 mb-2 font-medium rounded-lg text-sm  
                dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer`,
                    confirmDelete ? ' bg-red-500 hover:bg-red-500' : '  bg-red-700 hover:bg-red-800 ')}
                onClick={() => handleDelete(idx)}
            >
                {confirmDelete ? 'Sure?' : 'Delete'}
            </button>

        </div>
    </div>
    );
}