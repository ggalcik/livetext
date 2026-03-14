import { Button } from "../../../components/Button";
import { usePersistentState } from "../../../hooks/usePersistentState"
import glog from "../../../components/glog";
import { useEffect, useState, type ReactNode } from "react";
import { IIntonementSceneSchema, intonementSections } from './types';
import { intonations } from './data';
import clsx from "clsx";


export default function IntonationsAdmin() {
    const [intonationScene, setIntonationScene] = usePersistentState({
        storageKey: 'intonationScene',
        schema: IIntonementSceneSchema,
        fallback: { active: 'Intro' }
    })
    const [advanceActive, setAdvanceActive] = useState(true);

    function advanceIntonationScene() {
        const currentIdx = intonementSections.findIndex(intonment => intonment === intonationScene.active);
        const nextIdx = (currentIdx + 1) % intonementSections.length;
        setAdvanceActive(false);
        const timer = setTimeout(() => {
            setIntonationScene({ active: intonementSections[nextIdx], advanced: true });
            setAdvanceActive(true);
        }, 2000
        );

        return () => clearTimeout(timer);
    }


    return (

        <div className="text-black flex gap-6">


            <div className=" inline-flex  flex-col gap-4">

                <Button className={'h-16'}

                    onClick={advanceIntonationScene}
                    disabled={!advanceActive}
                    size='xl'>
                    Advance
                </Button>

                <div className="border inline-flex bg-green-200 flex-col gap-2 p-2">

                    {intonementSections.map((intonement, i) => {
                        return (
                            <div key={intonement}>
                                <Button className={
                                    intonement === intonationScene.active
                                        ? 'ring-4 w-full ring-black'
                                        : 'ring-4 w-full ring-green-200 opacity-80'}
                                    onClick={() => setIntonationScene({ active: intonement })}

                                    size='xl'>
                                    {intonement}
                                </Button>
                            </div>
                        )
                    })}
                </div>

            </div>

            <div className="text-2xl w-full" 
                dangerouslySetInnerHTML={{ __html: intonations[intonationScene.active].replace(/[\r\n]+/g, '<br>') }}
            />
                
          


        </div>

    )
} 