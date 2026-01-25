import { AudioController } from "./AudioController";

/*
  Create ONE controller instance per “audio lane”.
  Typical lanes:
  - UI / soundboard effects
  - Ambient background audio
  - Narration / voiceover
*/

const audio = new AudioController();

/* --------------------------------------------------
   BASIC PLAYBACK
-------------------------------------------------- */

// Play a sound by URL (abruptly stops anything playing)
audio.playUrl("/audio/applause.mp3");

// Restart the same sound if it’s already playing (default behavior)
audio.playUrl("/audio/applause.mp3");

// Play without restarting if already playing
audio.playUrl("/audio/applause.mp3", { restartIfSame: false });

/* --------------------------------------------------
   FADE BEHAVIOR (OPTIONAL)
-------------------------------------------------- */

// Fade out the currently playing sound, then play the new one
audio.playUrl("/audio/drumroll.mp3", {
  fadeOutMs: 800,
});

// Explicit gentle stop
audio.fadeOutAndStop(1000);

// Immediate hard stop
audio.stop();

/* --------------------------------------------------
   VOLUME CONTROL
-------------------------------------------------- */

// Set volume (applies to current + future playback)
audio.setVolume(0.4);

// Play a sound at a specific volume
audio.playUrl("/audio/boo.mp3", {
  volume: 0.6,
});

/* --------------------------------------------------
   LOOPING (BACKGROUND / AMBIENT AUDIO)
-------------------------------------------------- */

audio.playUrl("/audio/ambient.mp3", {
  loop: true,
  volume: 0.25,
});

// Later…
audio.fadeOutAndStop(1500);

/* --------------------------------------------------
   STATE QUERIES
-------------------------------------------------- */

if (audio.isPlaying()) {
  console.log("Something is playing");
}

const current = audio.getCurrentUrl();
console.log("Current audio:", current);

/* --------------------------------------------------
   REACT PATTERN (TYPICAL)
-------------------------------------------------- */

import { useRef } from "react";

function Soundboard() {
  const audioRef = useRef<AudioController | null>(null);

  if (!audioRef.current) {
    audioRef.current = new AudioController();
  }

  return (
    <>
      <button
        onClick={() =>
          audioRef.current?.playUrl("/audio/applause.mp3")
        }
      >
        Applause
      </button>

      <button
        onClick={() =>
          audioRef.current?.playUrl("/audio/boo.mp3", {
            fadeOutMs: 500,
          })
        }
      >
        Boo (fade)
      </button>

      <button
        onClick={() => audioRef.current?.stop()}
      >
        Stop
      </button>
    </>
  );
}
