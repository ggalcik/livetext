import { useEffect, useState } from "react";
import { MasterViewport } from "../../components/MasterViewport/MasterViewport";
import { usePersistentState } from "../../hooks/usePersistentState";
import LiveVideoPlayer from "../scenes/Video/Video";
import Player from "./Player";
import { vidclipDefault, VidclipSchema, type VidSettings } from "./types";
import glog from "../../components/glog";

export default function VidclipDisplay() {

  const [vidclipData, setVidclipData] = usePersistentState({
    storageKey: 'vidclip',
    schema: VidclipSchema,
    fallback: vidclipDefault
  })

  const [lastTimestamp, setLastTimestamp] = useState<number | undefined>(undefined);
  const [vidSettings, setVidSettings] = useState<VidSettings | undefined>(undefined);

  function handleVidStop() {
    setVidclipData(
      {
        play_timestamp: Date.now()
      }
    )
  }

  useEffect(() => {
    // if (vidclipData.vidSettings) {
    if (lastTimestamp !== undefined) {
      setVidSettings(vidclipData.vidSettings)
    }
    setLastTimestamp(vidclipData.play_timestamp);
  }, [vidclipData.play_timestamp, vidclipData.vidSettings])

  if (!vidSettings) return <></>;
  return (
    <div className="absolute w-full h-full bg-black">

      <Player vidSettings={vidSettings} handleVidStop={handleVidStop}/>

    </div>
  )
}