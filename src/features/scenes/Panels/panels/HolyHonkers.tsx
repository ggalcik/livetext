import { useCallback, useEffect } from 'react';
import honkhonk from './assets/honkers1.mp3';
import honkers from './assets/holy_honkers2.png';

export function HolyHonkersBackground() {
    
    return <div className="absolute top-0 left-0 w-full h-full bg-[#f1cb98] bg-no-repeat bg-contain"
   >
        
    </div>
}


export function HolyHonkers() {
    const audio = new Audio(honkhonk);

    const playSound = useCallback(() => {
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    useEffect(() => {
       playSound();
    }, []);

    return (
        <div className="w-full h-full text-4xl text-gray-700 font-bold font-[Book_Antiqua] bg-cover"
         style={{ backgroundImage: `url(${honkers})` }}>
           </div>
    );
}