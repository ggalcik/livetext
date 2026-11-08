import { useEffect, type CSSProperties } from "react";
import type { BlipProps } from "./types";
import sound from "./assets/rhizigore.mp3";
import devo from "./assets/rhizic_devo.png";
import king from "./assets/rhizic_king.png";
import backdrop from "./assets/rhizic_backdrop.png";
import "./Blip.css";
import "./Rhizigore.css";

const letters = [..."rhizigore"];

export default function Rhizigore({ endBlip }: BlipProps) {
    useEffect(() => {
        const audio = new Audio(sound);
        audio.volume = 0.7;
        void audio.play().catch((err) => console.warn("Could not play sound:", err));
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    useEffect(() => {
        const timeout = window.setTimeout(endBlip, 15000);
        return () => window.clearTimeout(timeout);
    }, [endBlip]);

    return (
        <div className="rhizigore" aria-hidden="true">
            <div className="rhizigore-backdrop" style={{ backgroundImage: `url(${backdrop})` }} />
            <div className="rhizigore-graphic">
                <img className="rhizigore-devo" src={devo} alt="" />
                <img className="rhizigore-king" src={king} alt="" />
            </div>
            <div className="rhizigore-flash" />
            <div className="rhizigore-text-position">
                <div className="rhizigore-glitch">
                    {letters.map((letter, index) => (
                        <span key={index} style={{ "--letter": index } as CSSProperties}>{letter}</span>
                    ))}
                </div>
                <div className="rhizigore-title rhizigore-title-shadow egregore-wave">
                    {letters.map((letter, index) => <span key={index}>{letter}</span>)}
                </div>
                <div className="rhizigore-title egregore-wave">
                    {letters.map((letter, index) => <span key={index}>{letter}</span>)}
                </div>
            </div>
        </div>
    );
}
