import BlipAdmin from "../Blip/BlipAdmin";
import VidclipAdmin from "../Vidclips/VidclipAdmin";

export default function Overcards() {
    return (
        <div className="grid grid-cols-[max-content_1fr] m-2 gap-y-0.5">
            <div className="m-1 mx-2 mt-2 text-right font-bold bg-white">Vidclips</div>
             <VidclipAdmin />
            <div className="m-1 mx-2 mt-2 text-right font-bold bg-white">Blips</div>
             <BlipAdmin />
        </div>
    )
}