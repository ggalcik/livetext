import type { BlipProps } from "./types";

/**
 * A transparent architectural frame for the portrait-shaped OBS source.
 * The clear pane is deliberately unpainted so the camera feed beneath it
 * remains fully visible.
 */
export default function SadWindow({ source }: BlipProps) {
  if (source !== "OBS") return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="h-full w-full"
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
          <linearGradient id="sad-window-sill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b19b82" />
            <stop offset="0.45" stopColor="#776455" />
            <stop offset="1" stopColor="#3d302b" />
          </linearGradient>
          <linearGradient id="sad-window-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b9e8f4" stopOpacity=".36" />
            <stop offset="0.52" stopColor="#75b9d2" stopOpacity=".31" />
            <stop offset="1" stopColor="#376f91" stopOpacity=".38" />
          </linearGradient>
          <pattern id="sad-window-bricks" width="126" height="58" patternUnits="userSpaceOnUse" patternTransform="skewY(9)">
            <rect width="126" height="58" fill="url(#sad-window-brick)" />
            <path d="M0 1H126 M0 57H126 M63 1V29 M0 29H126 M0 29V57 M126 29V57" fill="none" stroke="#b28a72" strokeOpacity=".42" strokeWidth="5" />
            <path d="M4 6H58 M68 6H122 M4 35H121" fill="none" stroke="#d5ad91" strokeOpacity=".12" strokeWidth="3" />
            <path d="M5 52H58 M69 25H120" fill="none" stroke="#241714" strokeOpacity=".24" strokeWidth="3" />
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
          <path d="M0 0H600V800H0Z" fill="url(#sad-window-bricks)" />
          <path d="M516 0L600 0V800L548 800Z" fill="#241919" fillOpacity=".35" />
          <path d="M0 0H600V76C405 57 214 70 0 112Z" fill="#e8bd98" fillOpacity=".08" />
        </g>

        {/* Deep masonry reveals make the above/right viewpoint legible. */}
        <path d="M140 300L530 362L500 384L170 332Z" fill="url(#sad-window-reveal)" />
        <path d="M530 362V752L500 712V384Z" fill="#241919" />
        <path d="M140 690V300L170 332V660Z" fill="#4f352d" />
        <path d="M170 660L500 712L530 752L140 690Z" fill="url(#sad-window-sill)" />

        {/* Mostly transparent blue glass; the camera remains clearly visible. */}
        <path d="M170 332L500 384V712L170 660Z" fill="url(#sad-window-glass)" />
        <g clipPath="url(#sad-window-glass-clip)">
          <path d="M0 190L0 285L600 885L600 790Z" fill="#174f78" fillOpacity=".13" />
          <path d="M0 -65L0 -12L600 588L600 535Z" fill="#2c739c" fillOpacity=".09" />
          <path d="M0 390L0 432L600 1032L600 990Z" fill="#0d3d66" fillOpacity=".16" />
          <path d="M0 302L0 318L600 918L600 902Z" fill="#b7e8f3" fillOpacity=".09" />
        </g>

        {/* Square window: vertical jambs, with every horizontal at the brick angle. */}
        <path d="M170 332L500 384V712L170 660Z" fill="none" stroke="#19191a" strokeWidth="17" strokeLinejoin="round" />
        <path d="M335 358V686" stroke="#242223" strokeWidth="14" />
        <path d="M170 496L500 548" stroke="#242223" strokeWidth="14" />

        {/* Each pane catches light only along its left and bottom edges. */}
        <g fill="none" stroke="#8a7865" strokeWidth="6" strokeLinecap="round">
          {/* upper-left pane */}
          <path d="M184 348V488" />
          {/* <path d="M184 507L327 530" /> */}
          {/* upper-right pane */}
          <path d="M346 373V514" />
          {/* <path d="M346 535L486 557" /> */}
          {/* lower-left pane */}
          <path d="M184 516V648" />
          <path d="M184 648L327 671" />
          {/* lower-right pane */}
          <path d="M346 542V674" />
          <path d="M346 674L486 696" />
        </g>

        {/* Small edge details add age without obscuring the camera subject. */}
        <path d="M195 310L211 300M273 324L287 315M465 358L480 349" stroke="#251a18" strokeOpacity=".5" strokeWidth="4" />
        <path d="M546 476C564 493 566 521 551 544" fill="none" stroke="#171314" strokeOpacity=".5" strokeWidth="5" />
        <ellipse cx="375" cy="731" rx="150" ry="22" fill="#100d0d" fillOpacity=".35" filter="url(#sad-window-shadow)" transform="rotate(9 375 731)" />

        {/* Very faint reflection only; opacity stays low for face visibility. */}
        <path d="M195 368L305 387V510L195 491Z" fill="#a8c0c4" fillOpacity=".035" />
        <path d="M344 395L475 418V526L344 503Z" fill="#d7d8cb" fillOpacity=".025" />
      </svg>
    </div>
  );
}
