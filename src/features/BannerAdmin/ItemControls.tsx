import { showOptsPopup, thisOptsPopupIsActive } from "../../components/util";
import LiveTextFormat from "./LiveTextFormat";
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

    function handleDelete(idx: number) {
        if (confirmDelete) {
            dispatch({ type: "banner/delete", payload: { idx } });
            setConfirmDelete(false);
            return;
        }
        setConfirmDelete(true);
    }

    return (<div className="flex gap-2 justify-between">
        <div className="flex gap-2">


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
        </div>

        <div className="flex gap-2">
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                onClick={(e) => {
                    // TODO: make the format button toggle 
                    // if (visiblePopup && visiblePopup.banner )
                    // if (thisOptsPopupIsActive(visiblePopup, { banner: idx }))

                    // {e.stopPropagation();showOptsPopup(setVisiblePopup, null) ;
                    // }
                    // else 
                    showOptsPopup(setVisiblePopup, { banner: idx })
                }

                }
            >
                Format
            </button>
            {/* // TODO: this relative box is causing formatting issues when active
        //  */}
            {thisOptsPopupIsActive(visiblePopup, { banner: idx }) && (
                <div className="relative z-10">
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                onClick={() => dispatch({ type: "banner/add", payload: { idx: idx + 1 } })}
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