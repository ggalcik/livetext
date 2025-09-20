
import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";
import CanvasCaptionPlayer from "./CanvasCaptionPlayer";


export default function Atemporal({ controls = true }: { controls?: boolean }) {
    return <CanvasCaptionPlayer controls={controls}/>
}
