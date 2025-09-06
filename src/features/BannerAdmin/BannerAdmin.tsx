// import clsx from "clsx";
import { backgroundOptions, type BackgroundType, type PopupState } from "../../context/LiveData/types";
import TopOpts from "../../TopOpts";
import LiveTextOpts from "../LiveDisplay/LiveTextOpts";
import SpotsOpts from "../Spots/SpotsOpts";
import BannersEdit from "./BannersEdit";
import { useLiveData } from "../../context/LiveData";

// import { dateStr, showOptsPopup, thisOptsPopupIsActive } from "../../components/util";
// import LiveTextFormat from "../../features/LiveDisplay/LiveTextFormat";
// import { initialLiveDataState } from "../../context/LiveData/LiveDataReducer";

export default function BannerAdmin({ popupState }: { popupState: PopupState }) {
    const { state, dispatch } = useLiveData();
    const { visiblePopup, setVisiblePopup } = popupState;
    return (
        <div className=" grid h-[100vh] grid-cols-1 md:grid-cols-2 grid-rows-[10vh_10vh_auto] gap-4 p-4">
            <TopOpts />
            <div className="h-32">
                <LiveTextOpts popupState={{ visiblePopup, setVisiblePopup }} />
            </div>
            <div className="">
                <SpotsOpts popupState={{ visiblePopup, setVisiblePopup }} />
            </div>

            <div className="">
                <BannersEdit type="rotating" popupState={{ visiblePopup, setVisiblePopup }} />

                {BackgroundOpts()}
            </div>
            <div className="">
                {/* <SpotsEdit popupState={{ visiblePopup, setVisiblePopup }} /> */}
                 <BannersEdit type="spot" popupState={{ visiblePopup, setVisiblePopup }} />
            </div>
        </div>

    );

    function BackgroundOpts() {
        return <div>
            <div>Backgrounds:</div>
            <div className="columns-2">
                {backgroundOptions.map((item) => {
                    const name = `background_image_${item}`;
                    return (
                        <div key={name} className="flex pb-2 gap-2">
                            <input
                                className="w-8 h-8"
                                type="radio"
                                id={name}
                                value={item}
                                checked={state.backgroundImage === item}
                                onChange={(e) => {
                                    dispatch({
                                        type: "background/change",
                                        payload: { which: e.target.value as BackgroundType },
                                    });
                                } } />{" "}
                            <label htmlFor={name} className="cursor-pointer">
                                {item}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>;
    }
}
