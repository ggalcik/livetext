import { usePersistentState } from "../../hooks/usePersistentState"
import { vidclipDefault, VidclipSchema } from "./types"
import { VIDCLIPS } from "./config";
import { Button } from "../../components/Button";

export default function VidclipAdmin() {
    const [vidclipData, setVidClipData] = usePersistentState({
        storageKey: 'vidclip',
        schema: VidclipSchema,
        fallback: vidclipDefault
    })

    function updateVidclip(vidkey?:string) {
        const isActive = vidkey && (VIDCLIPS[vidkey].filename === vidclipData.vidSettings?.filename);
        const newVidClips = isActive || !vidkey ? undefined : VIDCLIPS[vidkey];

        setVidClipData(
            {
                ...vidclipData,
                play_timestamp: Date.now(),
                vidSettings: newVidClips
            }
        )
    }
    


    return (
<div className="flex gap-2">


        {Object.keys(VIDCLIPS).map((vidkey) => {
            const isActive = VIDCLIPS[vidkey].filename === vidclipData.vidSettings?.filename;
            return (
                <div key={`vidclip_${vidkey}`}>
                    {/* <Button mode={panelName === panelScene.active?.panel ? 'activated' : null} 
                                    onClick={() => showPanel(panelName)}> */}
                    <Button className={isActive 
                        ? 'ring-4 ring-black'
                        : 'ring-4 ring-white'}
                        onClick={() => updateVidclip(vidkey)}>
                        {vidkey}
                    </Button>
                </div>

            )        
        
        })}
    
  </div>
       
    )
   
}


