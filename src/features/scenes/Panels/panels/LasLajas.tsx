import { useCallback, useEffect, useRef } from 'react';
import dling from '/src/assets/ding.mp3';
import chant from './assets/ambient_monk.mp3';
import back from './assets/las-lajas-background.webp';
import float1 from './assets/las_lajas_back.webp';
import float2 from './assets/Las-Lajas-shrine.webp';
import './LasLajas.css';

export function LasLajasBackground() {

    return <div className="absolute top-0 left-0 w-full h-full bg-blue-900 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${back})` }}></div>
}

export function LasLajas() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(chant);
    const audio = audioRef.current;
    audio.volume = 0.5;
    audio.loop = true;
    audio.play().catch((err) => {
      console.warn("Could not play sound:", err);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

    return (
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute bottom-0 scale-200 animate-slide2">
               <img src={float2} />
            </div>
                        <div className="absolute bottom-0 scale-200 animate-slide1">
               <img src={float1} />
            </div>

        </div>
    )
}

