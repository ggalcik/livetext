import { useCallback, useEffect, useRef } from 'react';
// import aaaamennnn from '../../../../../src/local/soundboard/aaaamennnn.mp3';
// import gregorius from './assets/in_nominae_gregorius_no.png';
import chrystolyzer from './assets/chrystolyzer.png';
import lights from './assets/random_lights.png';
import egregore1 from './assets/egregore1.png';
import egregore2 from './assets/egregore2.png';
import egregore3 from './assets/egregore3.png';
import './Chrystolyzer.css';


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


    const audioRef = useRef<HTMLAudioElement | null>(null);

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

        <div className='theMainBox'>
            <img className="relative z-10 w-full" src={chrystolyzer} />
            <div className='theReadoutWrapper absolute z-1 top-0 left-0 w-full h-full pt-[12%] pl-[14%] pr-[15%]'>
                <div className='theReadoutBox  border w-full h-[10%] overflow-hidden'
                    >
                    
                    
                </div>
            </div>

        </div>
        </div>
}

        export function EgregoreAdmin() {
    return <></>
}