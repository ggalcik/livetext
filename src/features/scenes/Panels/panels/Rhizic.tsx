import { useCallback, useEffect } from 'react';
import dling from '/src/assets/ding.mp3';
import paper from './assets/blank-newspaper.jpg';

export function RhizicBackground() {

    return <div className="absolute top-0 left-0 w-full h-full bg-blue-900 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${paper})` }}></div>
}

const rheazons = [
    "The power of the holy spirit isn't enough to open this pickle jar.",
    "My toaster keeps burning the Virgin Mary into my bread.",
    "The cat keeps spelling 'He is Risen!' when she walks across the keyyboard.",
    "I keep committing sins, but Jesus keeps forgiving me.",
    "The neighbor's Wi-Fi is named 'JesusLovesYou' & it has stronger signal than mine.",
    "I keep getting 'Hogwarts Letters' but I don't believe in magic either.",
    "The demon that steals all the left socks.",
    "I can't eat Trix anymore, because I'm not a kid.",
    "Caught a leprechaun, but all he gave me was an AOL disc with 180 free hours of internet.",
    "I can't break par at mini-golf.",
    "If my anger gets below 55% I'm rigged to explode!",
    "Jesus leaves my messages on read but never replies.",
]

export function RhizicAdmin() {
    return <>
        <div className='w-120 h-40 overflow-y-scroll px-2 text-sm border mb-4'>
            {rheazons.map(item => <div className='border-b-gray-400 border-b py-1'>{item}</div>)}
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
        <>
            <div className="absolute top-0  left-0 text-2xl text-black font-bold font-[Book_Antiqua]">
               &ldquo;{rheazons[Math.floor(Math.random() * rheazons.length)]}&rdquo;
                </div>
            <div className="absolute bottom-0  left-0  text-2xl text-gray-700 font-bold font-[Book_Antiqua]">
                <span className='text-4xl'>&copy;</span>opyright 2025<br /
                >Rev Rhizic, Emperor of Antifa<br />All Rights Reserved.</div>
        </>
    );
}