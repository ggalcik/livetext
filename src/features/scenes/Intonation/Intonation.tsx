import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import { IIntonementSceneSchema } from "./types";
import snailWindow from './assets/snail_window.jpg';
import { usePersistentState } from "../../../hooks/usePersistentState";
import { useEffect, useState, type ReactNode } from "react";
import glog from "../../../components/glog";
import { afterChants } from "./data";
import { AudioController } from "../../../components/AudioController";
import Snail from "../../Blip/Snail";
import { gGlobal } from "../../Global/global";

export default function Intonation() {
    const [intonationScene] = usePersistentState({
        storageKey: 'intonationScene',
        schema: IIntonementSceneSchema,
        fallback: { active: 'Intro' }
    })
    const activeSection = intonationScene.active;
    const [currentSection, setCurrentSection] = useState(activeSection);
    const [showSnail, setShowSnail] = useState(false);

    const audio = new AudioController();
    audio.setVolume(0.3);

 
    useEffect(() => { 
        if (currentSection === activeSection) return;

        if (intonationScene.advanced) {
            audio.playUrl(afterChants[currentSection]);
            if (currentSection != 'Nyeh') setShowSnail(true);
        } else {
            audio.stop();
            setShowSnail(false)
        }
        setCurrentSection(activeSection);

        return(() => audio.stop());
    }, [activeSection]);

const crampedStyle = gGlobal.layout.crampedPortrait ? '-top-1/5' : '';


    return (
        <div className={`absolute w-full h-full bg-black overflow-hidden ${crampedStyle}`}>
            <img className="absolute top-0" src={snailWindow} />
            { showSnail && <Snail endBlip={() => setShowSnail(false)} variant='shell' />}
        </div>
    );
}


