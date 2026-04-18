import { useCallback, useEffect, useRef, useState } from 'react';
// import aaaamennnn from '../../../../../src/local/soundboard/aaaamennnn.mp3';
// import gregorius from './assets/in_nominae_gregorius_no.png';
import chrystolyzer from './assets/chrystolyzer.png';
import beepboop from './assets/beepboop.mp3';
import lights from './assets/random_lights.png';
import egregore1 from './assets/egregore1.png';
import egregore2 from './assets/egregore2.png';
import egregore3 from './assets/egregore3.png';
import { chrystolyzerQuestions } from './data';
import './Chrystolyzer.css';
import { randomOne } from '../../../../helpers/helpers';

const VOLUME = 0.1;

export function ChrystolyzerAdmin() {

    return <div className="absolute w-full h-full overflow-hidden">


    </div>
}

export function ChrystolyzerBackground() {

    return <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/2 -left-1/2 scale-300 w-full h-full
     bg-yellow-800 bg-no-repeat bg-cover bg-center"
        >

        </div>
    </div>
}

export function Chrystolyzer() {
    const [computing, setComputing] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const beepboopRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!beepboopRef.current) {
            beepboopRef.current = new Audio(beepboop);
            beepboopRef.current.loop = true;
            beepboopRef.current.volume = VOLUME;
        }

        if (computing) {
            beepboopRef.current.play().catch((err) => {
                console.warn("Could not play sound:", err);
            });
        } else {
            beepboopRef.current.pause();
        }


        return () => {
          beepboopRef.current?.pause();
        };

    }, [computing])

    useEffect(() => {
        // audioRef.current = new Audio(aaaamennnn);
        // const audio = audioRef.current;
        // audio.volume = 0.7;
        // audio.play().catch((err) => {
        //   console.warn("Could not play sound:", err);
        // });

        // return () => {
        //   audio.pause();
        //   audio.currentTime = 0;
        // };
    }, []);

    return <div className="absolute w-full h-full overflow-hidden text-white">

        <div className='theMainBox relative' onClick={() => setComputing(p=> !p)}>
            <img className="relative z-10 w-full" src={chrystolyzer} />
            <div className='theReadoutWrapper absolute z-1 top-0 left-0 w-full h-full pt-[12%] pl-[14%] pr-[15%]'>
                <div className='theReadoutBox  border w-full h-[14%] overflow-hidden'>

                    {computing && <div className='w-full h-full animate-computing'></div>}

                </div>
            </div>

            <div className={`theDisplayWrapper absolute z-10 top-[40%] left-0 w-full pl-[12%] pr-[13%] 
                font-["Press_Start_2P"] text-gray-500`}>
                    {randomOne(chrystolyzerQuestions)}
                </div>
        </div>
    </div>
}

export function EgregoreAdmin() {
    return <></>
}