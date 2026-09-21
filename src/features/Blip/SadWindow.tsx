import { useEffect, useState } from "react";
import type { BlipProps } from "./types";
import "./SadWindow.css";

const LIGHTNING_DURATION_MS = 2_200;
const MIN_LIGHTNING_DELAY_MS = 5_000;
const MAX_LIGHTNING_DELAY_MS = 10_000;
const STROBE_DURATION_MS = 100;
const MIN_STROBE_START_MS = 500;

function createStrobeDelays() {
  const count = Math.floor(Math.random() * 4);
  const delays: number[] = [];

  while (delays.length < count) {
    const delay = MIN_STROBE_START_MS + Math.random()
      * (LIGHTNING_DURATION_MS - STROBE_DURATION_MS - MIN_STROBE_START_MS);

    if (delays.every((existing) => Math.abs(existing - delay) >= STROBE_DURATION_MS)) {
      delays.push(delay);
    }
  }

  return delays.sort((a, b) => a - b);
}

/**
 * A transparent architectural frame for the portrait-shaped OBS source.
 * The clear pane is deliberately unpainted so the camera feed beneath it
 * remains fully visible.
 */
export default function SadWindow({ source }: BlipProps) {
  const [isLightning, setIsLightning] = useState(false);
  const [strobeDelays, setStrobeDelays] = useState<number[]>([]);

  useEffect(() => {
    let delayTimer: number | undefined;
    let flashTimer: number | undefined;
    let disposed = false;

    const scheduleLightning = () => {
      const delay = MIN_LIGHTNING_DELAY_MS
        + Math.random() * (MAX_LIGHTNING_DELAY_MS - MIN_LIGHTNING_DELAY_MS);

      delayTimer = window.setTimeout(() => {
        if (disposed) return;
        setStrobeDelays(createStrobeDelays());
        setIsLightning(true);

        flashTimer = window.setTimeout(() => {
          setIsLightning(false);
          setStrobeDelays([]);
          scheduleLightning();
        }, LIGHTNING_DURATION_MS);
      }, delay);
    };

    scheduleLightning();

    return () => {
      disposed = true;
      if (delayTimer !== undefined) window.clearTimeout(delayTimer);
      if (flashTimer !== undefined) window.clearTimeout(flashTimer);
    };
  }, []);

  if (source !== "OBS") return null;

  return (
    <div className="sad-window-container absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className={`sad-window-scene h-full w-full${isLightning ? " is-lightning" : ""}`}
        viewBox="0 0 600 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sad-window-brick" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#77493d" />
            <stop offset="0.5" stopColor="#60382f" />
            <stop offset="1" stopColor="#3b2522" />
          </linearGradient>
          <linearGradient id="sad-window-reveal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#151315" />
            <stop offset="0.55" stopColor="#302522" />
            <stop offset="1" stopColor="#4c352d" />
          </linearGradient>
          <linearGradient id="sad-window-sill" x1="0" y1="0" x2="1" y2=".35">
            <stop offset="0" stopColor="#887565" />
            <stop offset="0.45" stopColor="#776455" />
            <stop offset="1" stopColor="#3d302b" />
          </linearGradient>
          <linearGradient id="sad-window-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b9e8f4" stopOpacity=".36" />
            <stop offset="0.52" stopColor="#75b9d2" stopOpacity=".31" />
            <stop offset="1" stopColor="#376f91" stopOpacity=".38" />
          </linearGradient>
          <pattern id="sad-window-bricks" width="126" height="70" patternUnits="userSpaceOnUse" patternTransform="skewY(9)">
            {/* Two equal-height courses in a true half-brick running bond. */}
            <path d="M0 1H126 M0 35H126 M0 69H126 M63 1V35 M31.5 35V69 M94.5 35V69" fill="none" stroke="#b28a72" strokeOpacity=".42" strokeWidth="5" />
            <path d="M4 7H58 M68 7H122 M4 42H27 M37 42H90 M100 42H122" fill="none" stroke="#d5ad91" strokeOpacity=".12" strokeWidth="3" />
            <path d="M5 30H58 M68 30H121 M5 64H27 M37 64H90 M100 64H121" fill="none" stroke="#241714" strokeOpacity=".24" strokeWidth="3" />
          </pattern>
          <pattern id="sad-window-rain-far" width="420" height="1050" patternUnits="userSpaceOnUse">
            <path
              d="M31 38l-6 15 M146 71l-9 23 M327 116l-7 18 M83 164l-11 28 M244 207l-6 16 M386 251l-9 22 M178 298l-7 19 M49 347l-10 26 M301 389l-6 15 M113 432l-8 21 M365 474l-11 29 M218 519l-7 17 M19 558l-9 24 M276 603l-12 30 M153 649l-6 16 M402 692l-8 20 M92 738l-10 25 M335 779l-7 18 M198 824l-11 27 M55 871l-6 16 M259 914l-9 22 M379 963l-12 29 M128 1007l-7 18 M219 19l-8 20 M405 55l-10 25 M20 129l-7 18 M196 145l-9 24 M353 187l-6 15 M122 238l-8 21 M281 274l-11 27 M14 319l-6 16 M205 371l-9 23 M414 413l-7 19 M69 497l-10 26 M323 545l-8 20 M185 579l-6 17 M374 631l-10 25 M41 681l-7 19 M238 727l-9 24 M416 763l-6 16 M120 849l-11 28 M310 882l-7 18 M12 936l-9 22 M210 977l-8 21 M348 1026l-6 16"
              stroke="#b9d7e6"
              strokeOpacity=".34"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <animateTransform attributeName="patternTransform" type="translate" from="420 -1050" to="0 0" dur="3.25s" repeatCount="indefinite" />
          </pattern>
          <pattern id="sad-window-rain-near" width="420" height="1050" patternUnits="userSpaceOnUse">
            <path
              d="M103 26l-12 30 M349 94l-16 40 M225 183l-10 26 M34 277l-15 38 M292 354l-11 29 M156 449l-17 43 M397 536l-12 31 M72 626l-14 36 M258 713l-10 27 M181 807l-16 41 M372 895l-13 34 M47 987l-11 29 M267 48l-14 35 M17 121l-11 28 M401 167l-15 39 M142 231l-12 32 M337 300l-17 42 M83 392l-10 27 M245 486l-14 36 M28 571l-16 40 M331 663l-12 31 M117 758l-15 38 M414 842l-11 29 M224 942l-17 43 M321 1018l-10 26"
              stroke="#d8eaf2"
              strokeOpacity=".42"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <animateTransform attributeName="patternTransform" type="translate" from="420 -1050" to="0 0" dur="1.75s" repeatCount="indefinite" />
          </pattern>
          <filter id="sad-window-shadow" x="-40%" y="-30%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="sad-window-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="2" seed="12" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
            <feComponentTransfer in="gray" result="faded">
              <feFuncA type="table" tableValues="0 .12" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="faded" mode="multiply" />
          </filter>
          <clipPath id="sad-window-wall-clip">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H600V800H0ZM140 300L530 362V752L140 690Z" />
          </clipPath>
          <clipPath id="sad-window-glass-clip">
            <path d="M170 332L500 384V712L170 660Z" />
          </clipPath>
        </defs>

        {/* Wall with a true transparent opening cut out of it. */}
        <g clipPath="url(#sad-window-wall-clip)" filter="url(#sad-window-grain)">
          <path d="M0 0H600V800H0Z" fill="url(#sad-window-brick)" />
          <path d="M0 0H600V800H0Z" fill="url(#sad-window-bricks)" />
          <path d="M516 0L600 0V800L548 800Z" fill="#241919" fillOpacity=".35" />
          <path d="M0 0H600V76C405 57 214 70 0 112Z" fill="#e8bd98" fillOpacity=".08" />
        </g>

        {/* Deep masonry reveals make the above/right viewpoint legible. */}
        <path d="M140 298L530 360L500 384L170 332Z" fill="url(#sad-window-reveal)" />
        <path d="M530 360V752L500 712V384Z" fill="#241919" />
        <path d="M140 690V296L173 329L170 332V660Z" fill="#4f352d" />
        <path d="M170 660L500 712L530 752L140 690Z" fill="url(#sad-window-sill)" />

        {/* Mostly transparent blue glass; the camera remains clearly visible. */}
        <path d="M170 332L500 384V712L170 660Z" fill="url(#sad-window-glass)" />
        <g clipPath="url(#sad-window-glass-clip)">
          <path d="M0 190L0 285L600 885L600 790Z" fill="#174f78" fillOpacity=".13" />
          <path d="M0 -65L0 -12L600 588L600 535Z" fill="#2c739c" fillOpacity=".09" />
          <path d="M0 390L0 432L600 1032L600 990Z" fill="#0d3d66" fillOpacity=".16" />
          <path d="M0 302L0 318L600 918L600 902Z" fill="#b7e8f3" fillOpacity=".09" />
        </g>
        <path className="sad-window-lightning-glass" d="M170 332L500 384V712L170 660Z" fill="#f4fbff" />

        {/* Square window: vertical jambs, with every horizontal at the brick angle. */}
        <path d="M170 332L500 384V712L170 660Z" fill="none" stroke="#19191a" strokeWidth="17" strokeLinejoin="round" />
        <path d="M335 358V686" stroke="#242223" strokeWidth="14" />
        <path d="M170 496L500 548" stroke="#242223" strokeWidth="14" />

        {/* Each pane catches light only along its left and bottom edges. */}
        <g fill="none" stroke="#8a7865" strokeWidth="6" strokeLinecap="round">
          {/* upper-left pane */}
          <path d="M181 348V491" />
          <path d="M181 490L324 513" />
          {/* upper-right pane */}
          <path d="M343 373V517" />
          <path d="M343 518L483 540" />
          {/* lower-left pane */}
          <path d="M181 508V651" />
          <path d="M181 651L324 674" />
          {/* lower-right pane */}
          <path d="M343 534V677" />
          <path d="M343 677L483 699" />
        </g>

        {/* Small edge details add age without obscuring the camera subject. */}
        <path d="M195 310L211 300M273 324L287 315M465 358L480 349" stroke="#251a18" strokeOpacity=".5" strokeWidth="4" />
        <path d="M546 476C564 493 566 521 551 544" fill="none" stroke="#171314" strokeOpacity=".5" strokeWidth="5" />
        <ellipse cx="375" cy="731" rx="150" ry="22" fill="#100d0d" fillOpacity=".35" filter="url(#sad-window-shadow)" transform="rotate(9 375 731)" />

        {/* Very faint reflection only; opacity stays low for face visibility. */}
        <path d="M195 368L305 387V510L195 491Z" fill="#a8c0c4" fillOpacity=".035" />
        <path d="M344 395L475 418V526L344 503Z" fill="#d7d8cb" fillOpacity=".025" />

        {/* Rain and lightning sit over the whole browser source. */}
        <rect width="600" height="800" fill="url(#sad-window-rain-far)" />
        <rect width="600" height="800" fill="url(#sad-window-rain-near)" />
        <rect className="sad-window-lightning-flash" width="600" height="800" fill="#e9f6ff" />
        {strobeDelays.map((delay) => (
          <rect
            key={delay}
            className="sad-window-lightning-strobe"
            width="600"
            height="800"
            fill="#fff"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}
