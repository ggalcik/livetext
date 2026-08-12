import type { Banner, PopupState } from "../../context/LiveData/types";
import { useLiveData } from "../../context/LiveData";
import { useState } from "react";
import { Button } from "../../components/Button";


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
    const formatKey = `${item.type}_${idx}`;
    const isFormatting = visiblePopup === formatKey;

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
                mode={isFormatting ? "activated" : undefined}
                onClick={() => {
                    if (isFormatting) {
                        setVisiblePopup(null);
                    } else {
                        setVisiblePopup(formatKey);
                    }
                }}
            >
                Format
            </Button>

            <Button
                type="button"
                onClick={() => dispatch({
                    type: "banner/add",
                    payload: { type: item.type, idx: idx + 1, copyFromIdx: idx },
                })}
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

