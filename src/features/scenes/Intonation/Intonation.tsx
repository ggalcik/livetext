import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import { IIntonementSceneSchema } from "./types";
import snailWindow from './assets/snail_window.jpg';
import { usePersistentState } from "../../../hooks/usePersistentState";
import { useEffect, useState, type ReactNode } from "react";
import glog from "../../../components/glog";
import { afterChants } from "./data";
import { AudioController } from "../../../components/AudioController";

export default function Intonation() {
    const [intonationScene, setIntonationScene] = usePersistentState({
        storageKey: 'intonationScene',
        schema: IIntonementSceneSchema,
        fallback: { active: 'Intro' }
    })
    const activeSection = intonationScene.active;
    const [currentSection, setCurrentSection] = useState(activeSection);

    const audio = new AudioController();


    useEffect(() => { 
        if (currentSection === activeSection) return;

        if (intonationScene.advanced) audio.playUrl(afterChants[currentSection]);
        setCurrentSection(activeSection);

        return(() => audio.stop());
    }, [activeSection]);



    return (
        <div className="absolute w-full h-full bg-black overflow-hidden">

            <img src={snailWindow} />


        </div>



    );
}


