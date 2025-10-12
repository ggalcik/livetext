
import BannerFormat from "./BannerFormat";
import type { Banner, PopupState } from "../../context/LiveData/types";
import { useLiveData } from "../../context/LiveData";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "../../components/Button";
import glog from "../../components/glog";


interface IItemControls {
    item: Banner;
    idx: number;
    total: number;
    popupState: PopupState;
    isActive?: boolean;
    moveAnim: (dir: string) => void
}


export default function ItemControls({ item, idx, total, popupState, isActive = true, moveAnim }: IItemControls) {
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

    return (<div className="flex flex-wrap lg:flex-nowrap gap-2 justify-between">
        <div className="flex gap-2 flex-grow basis-full lg:basis-0  ">
            <input
                type="radio"
                name={activeType}
                value={idx}
                className=" justify-center w-8 h-8"
                checked={state[activeType] === idx}
                disabled={!isActive}
                onChange={() => dispatch({ type: "banner/setActive", payload: { type: item.type, idx } })}
            />
            {item.type === 'rotating' &&
                <>
                    <input
                        type="checkbox"
                        name={`bannerOn_${idx}`}
                        className=" justify-center w-8 h-8"
                        checked={item.on === undefined ? false : item.on}
                        onChange={() => dispatch({ type: "banner/toggleOne", payload: { idx } })}
                    />
                    <Button variant="b" disabled={!isActive}

                        onClick={() => {
                            dispatch({ type: "banner/soloOne", payload: { type: 'rotating', idx } });
                        }}>S</Button>
                </>
            }
            {item.type === 'spot' &&
                <Button variant="b"
                    onClick={() => {
                        dispatch({ type: "banner/soloOne", payload: { type: 'spot', idx } });
                    }}>S</Button>
            }
            <Button
                onClick={() => {
                    if (visiblePopup === `${item.type}_${idx}`) {
                        setVisiblePopup(null);
                    } else {
                        setVisiblePopup(`${item.type}_${idx}`);
                    }
                }}
            >
                Format
            </Button>
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

            <Button
                type="button"
                onClick={() => dispatch({ type: "banner/add", payload: { type: item.type, idx: idx + 1 } })}
            >
                Add
            </Button>

        </div>

        <div className="flex gap-2 basis-1/3 ">
            <Button variant="b" size="sm" disabled={idx === 0}
                onClick={() => {
                     moveAnim('up');
                    dispatch({ type: "banner/move", payload: { type: item.type, dir: -1, idx } });
                }}>🡡</Button>
            <Button variant="b" size="sm" disabled={idx === total - 1}
                onClick={() => {
                     moveAnim('down');
                    dispatch({ type: "banner/move", payload: { type: item.type, dir: 1, idx } });
                }}>🡣</Button>


        </div>

        <div className="flex relative basis-1/3 z-0 justify-end">

            <div className="w-8">
                {confirmDelete &&
                    <Button
                        variant="c"
                        size="sm"
                        onClick={() => setConfirmDelete(false)}>X</Button>
                }
            </div>
            <Button
                variant="c"
                mode={confirmDelete ? 'activated' : undefined}
                onClick={() => handleDelete(idx)}>
                {confirmDelete ? 'Sure?' : 'Delete'}
            </Button>

        </div>
    </div>
    );
}

