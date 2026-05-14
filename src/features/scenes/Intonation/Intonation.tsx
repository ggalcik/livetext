import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import { IIntonementSceneSchema, type IIntonementType } from "./types";
import snailWindow from './assets/snail_window.jpg';
import { usePersistentState } from "../../../hooks/usePersistentState";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import glog from "../../../components/glog";
import { afterChants } from "./data";
import { AudioController } from "../../../components/AudioController";
import Snail from "../../Blip/Snail";
import { gGlobal } from "../../Global/global";
import { intonations } from "./data";
import "./Intonation.css";

export default function Intonation() {
    const [intonationScene] = usePersistentState({
        storageKey: 'intonationScene',
        schema: IIntonementSceneSchema,
        fallback: { active: 'Intro' }
    })
    const activeSection = intonationScene.active;
    const [displaySection, setDisplaySection] = useState(activeSection);
    const [showTextSection, setShowTextSection] = useState<IIntonementType | null>(null);
    const [hideTextSection, setHideTextSection] = useState(false);
    const [animateTextSection, setAnimateTextSection] = useState<boolean|undefined>(false);
    const [textSectionRun, setTextSectionRun] = useState(0);
    const [showSnail, setShowSnail] = useState(false);
    const [snailRun, setSnailRun] = useState(0);

    const audioRef = useRef<AudioController | null>(null);

    if (!audioRef.current) {
        audioRef.current = new AudioController();
        audioRef.current.setVolume(0.3);
    }

    const handleSnailEnd = useCallback(() => {
        setShowSnail(false);
    }, []);

    useEffect(() => {
        if (!hideTextSection) return;

        const delay = showTextSection === 'Nyeh' ? 500 : 1400;
        const t = setTimeout(() => {
            setShowTextSection(null);
            setHideTextSection(false);
        }, delay);

        return (() => clearTimeout(t));
    }, [hideTextSection])

    useEffect(() => {
        const sectionToShow = activeSection !== 'Intro' ? activeSection : null;
        const shouldAnimate = intonationScene.advanced;
        const delay = shouldAnimate ? 5000 : 0;
        const t = setTimeout(() => {
            setAnimateTextSection(shouldAnimate);
            setShowTextSection(sectionToShow);
            if (shouldAnimate && sectionToShow !== null) {
                setTextSectionRun(run => run + 1);
            }
        }, delay);
        return (() => clearTimeout(t));
    }, [activeSection, intonationScene.advanced]);

    useEffect(() => {
        if (displaySection === activeSection) return;

        const previousSection = displaySection;

        if (intonationScene.advanced) {
            audioRef.current?.playUrl(afterChants[previousSection]);
            if (previousSection != 'Nyeh') {
                setSnailRun(run => run + 1);
                setShowSnail(true);
            } else {
                setShowSnail(false);
            }
        } else {
            audioRef.current?.stop();
            setShowSnail(false);
        }

        setDisplaySection(activeSection);
    }, [activeSection, intonationScene.advanced]);

    useEffect(() => {
        return () => {
            audioRef.current?.stop();
        };
    }, []);

    const crampedStyle = gGlobal.layout.crampedPortrait ? '-top-1/5' : '';


    return (
        <div className={`absolute w-full h-full text-white bg-black overflow-hidden ${crampedStyle}`}>
            <img className="absolute top-0" src={snailWindow} />
            {showTextSection !== null &&
                <div
                    key={animateTextSection ? `text-run-${textSectionRun}` : `text-section-${showTextSection}`}
                    className={`absolute top-1/3 h-1/2 text-amber-200 px-[16%] pt-4 font-[Cherry_Cream_Soda] text-2xl bg-black/60 indent-[2em_hanging_each-line] ${animateTextSection ? 'animate-intonation-text-enter' : ''} ${hideTextSection ? 'animate-intonation-text-exit' : ''}`}
                    dangerouslySetInnerHTML={{ __html: intonations[showTextSection].replace(/[\r\n]+/g, '<br>') }}>
                </div>
            }

            {showSnail && <Snail key={`snail-run-${snailRun}`} endBlip={handleSnailEnd} variant='shell' opts={{ reverse: snailRun % 2 === 1 }} />}
            {/* <div className="absolute top-0 text-white">
                  displaySection {displaySection}, activeSection {activeSection}
                </div> */}
        </div>
    );
}


