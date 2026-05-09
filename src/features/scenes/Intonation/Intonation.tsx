import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import { IIntonementSceneSchema, type IIntonementType } from "./types";
import snailWindow from './assets/snail_window.jpg';
import { usePersistentState } from "../../../hooks/usePersistentState";
import { useEffect, useState, type ReactNode } from "react";
import glog from "../../../components/glog";
import { afterChants } from "./data";
import { AudioController } from "../../../components/AudioController";
import Snail from "../../Blip/Snail";
import { gGlobal } from "../../Global/global";
import { intonations } from "./data";

export default function Intonation() {
    const [intonationScene] = usePersistentState({
        storageKey: 'intonationScene',
        schema: IIntonementSceneSchema,
        fallback: { active: 'Intro' }
    })
    const activeSection = intonationScene.active;
    const [displaySection, setDisplaySection] = useState(activeSection);
    const [showTextSection, setShowTextSection] = useState<IIntonementType | null>(null);
    const [showSnail, setShowSnail] = useState(false);

    const audio = new AudioController();
    audio.setVolume(0.3);

    function setTheText() {
        setShowTextSection(intonationScene.active !== 'Intro' ? intonationScene.active : null)
    }

    useEffect(() => {
        glog("text useEffect");
        const delay = intonationScene.advanced ? 5000 : 0;
        const t = setTimeout(() => setTheText(), delay);
        return (() => clearTimeout(t));
    }, [intonationScene.active]);

    useEffect(() => {
        glog("in snailEffect");
        if (displaySection === activeSection) return;
        glog("in snailEffect - going");
        
        if (intonationScene.advanced) {
            glog("in snailEffect - advanced");
            audio.playUrl(afterChants[displaySection]);
            if (displaySection != 'Nyeh') setShowSnail(true);
        } else {
            audio.stop();
            setShowSnail(false)
        }
        setDisplaySection(activeSection);

        return (() => { audio.stop(); });
    }, [activeSection, displaySection]);

    const crampedStyle = gGlobal.layout.crampedPortrait ? '-top-1/5' : '';


    return (
        <div className={`absolute w-full h-full text-white bg-black overflow-hidden ${crampedStyle}`}>
            <img className="absolute top-0" src={snailWindow} />
            {showTextSection !== null &&
                <div className="absolute top-1/2 h-1/2  text-amber-200 px-[16%] pt-4 font-[Cherry_Cream_Soda] text-2xl bg-black/60"
                    dangerouslySetInnerHTML={{ __html: intonations[showTextSection].replace(/[\r\n]+/g, '<br>') }}>
                </div>
            }
            
            {showSnail && <Snail endBlip={() => setShowSnail(false)} variant='shell' />}
            {/* <div className="absolute top-0 text-white">
                  displaySection {displaySection}, activeSection {activeSection}
                </div> */}
        </div>
    );
}


