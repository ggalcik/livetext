import { useEffect, useRef } from "react";

export const useAudio = (src:string, { volume = 1, playbackRate = 1 }:Partial<HTMLAudioElement> = {} ) => {
  const audio = useRef(new Audio(src))

  useEffect(() => {
    audio.current.volume = volume
  }, [volume])

  useEffect(() => {
    audio.current.playbackRate = playbackRate
  }, [playbackRate])

  return audio.current;
}