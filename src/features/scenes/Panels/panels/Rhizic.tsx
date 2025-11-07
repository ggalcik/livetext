import { useCallback, useEffect } from 'react';
import dling from '/src/assets/ding.mp3';
import paper from './assets/blank-newspaper.jpg';

export function RhizicBackground() {
    
    return <div className="absolute top-0 left-0 w-full h-full bg-blue-900 bg-no-repeat bg-cover bg-center"
    style={{ backgroundImage: `url(${paper})` }}></div>
}

export function RhizicAdmin() {
    return <>
    <div className='w-120 h-40 overflow-y-scroll px-2 text-sm border mb-4'>
        can't break par at mini-golf<br />
        god ate your homework<br />
        tammy at the salon was wearing the same t-shirt<br />
        really stuck jar lids<br />
        can't find a toaster that won't burn Jesus into all your bread<br />
        cat keeps sitting on the keyboard and spelling "He is Risen!"<br />
        I keep committing sins, but Jesus keeps forgiving me<br />
        the neighbor's Wi-Fi is named “JesusLovesYou” & it's got stronger signal than mine<br />
        Keep getting "Hogwarts Letters" but don't believe in magic either<br />
        the demon that steals all the left socks<br />
        You can't eat Trix anymore, because you're not a kid<br />
        Caught a leprechaun but he gave you a 5% off coupon for cereal<br />
        If your anger gets below 55% you're rigged to explode<br />
        Jesus leaves your messages on read but never replies<br />
    </div>
    <div className='w-120 h-40 overflow-y-scroll px-2 border'>
        Because I really neweded help from Jesus, but when I turned around there was only one set of footprints<br />
        The kids are walking on my azaleas again<br />
        You become an atheist, you get the anger for free<br />
        A = A, where A = anger, and A = Atheist
    </div>
    </>
}

export function Rhizic() {
    const audio = new Audio(dling);

    const playSound = useCallback(() => {
        audio.play().catch((err) => {
            console.warn("Could not play sound:", err);
        });
    }, []);

    useEffect(() => {
        playSound();
    }, []);

    return (
        <div className="w-full h-full text-4xl text-gray-700 font-bold font-[Book_Antiqua]">
            <span className='text-6xl'>&copy;</span>opyright 2025<br /
            >Rev Rhizic, <br />Emperor of Antifa<br />All Rights Reserved.</div>
    );
}