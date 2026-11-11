// import clsx from "clsx";
import type { PopupState } from "../../context/LiveData/types";
import TopOpts from "./TopOpts";
import BannerOpts from "./BannerOpts";
import SpotsOpts from "../Spots/SpotsOpts";
import BannersEdit from "./BannersEdit";

// import { dateStr, showOptsPopup, thisOptsPopupIsActive } from "../../components/util";
// import LiveTextFormat from "../../features/LiveDisplay/LiveTextFormat";
// import { initialLiveDataState } from "../../context/LiveData/LiveDataReducer";

export default function BannerAdmin({ popupState }: { popupState: PopupState }) {
    const { visiblePopup, setVisiblePopup } = popupState;
    return (
        <div className=" grid h-[100vh] grid-cols-1 md:grid-cols-2 grid-rows-[10vh_auto_auto] gap-4 p-4">
            <TopOpts />
            <div className="">
                <BannerOpts />
            </div>
            <div className="">
                <SpotsOpts />
            </div>

            <div className="">
                <BannersEdit type="rotating" popupState={{ visiblePopup, setVisiblePopup }} />

            </div>
            <div className="">
                {/* <SpotsEdit popupState={{ visiblePopup, setVisiblePopup }} /> */}
                 <BannersEdit type="spot" popupState={{ visiblePopup, setVisiblePopup }} />
            </div>
        </div>

    );

}
