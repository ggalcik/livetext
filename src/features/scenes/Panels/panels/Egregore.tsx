import { useCallback, useEffect, useRef } from 'react';
// import aaaamennnn from '../../../../../src/local/soundboard/aaaamennnn.mp3';
// import gregorius from './assets/in_nominae_gregorius_no.png';
// import gregorius from './assets/in_nominae_gregorius_6.png';
import egregore1 from './assets/egregore1.png';
import egregore2 from './assets/egregore2.png';
import egregore3 from './assets/egregore3.png';
import './Egregore.css';

export function EgregoreBackground() {

    return <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/2 -left-1/2 scale-300 w-full h-full
     bg-yellow-800 bg-no-repeat bg-cover bg-center" 
     >
       
    </div>
        </div>
}

export function Egregore() {


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

    return <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute w-full h-full xanimate-risen">
            <img src={egregore3} />
        </div>
    </div>
}

export function EgregoreAdmin() {
    return <></>
}