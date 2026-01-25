export type PlayOptions = {
  volume?: number;        // 0..1
  loop?: boolean;
  restartIfSame?: boolean;
  fadeOutMs?: number;     // optional fade-out of currently playing audio
};

export class AudioController {
  private current: HTMLAudioElement | null = null;
  private currentUrl: string | null = null;
  private volume: number = 1;

  /** Play an audio file by URL. Stops or fades out any currently playing audio. */
  async playUrl(url: string, opts: PlayOptions = {}): Promise<void> {
    const restartIfSame = opts.restartIfSame ?? true;

    // Same audio already loaded
    if (this.current && this.currentUrl === url) {
      if (restartIfSame) {
        this.current.currentTime = 0;
      }

      this.applyOptions(this.current, opts);
      try {
        await this.current.play();
      } catch {
        // Autoplay / gesture restrictions are common — ignore safely
      }
      return;
    }

    // Stop or fade out existing audio
    if (this.current) {
      if (opts.fadeOutMs) {
        await this.fadeOutAndStop(opts.fadeOutMs);
      } else {
        this.stop();
      }
    }

    const audio = new Audio(url);
    audio.preload = "auto";

    this.applyOptions(audio, opts);

    this.current = audio;
    this.currentUrl = url;

    audio.addEventListener(
      "ended",
      () => {
        if (this.current === audio) {
          this.current = null;
          this.currentUrl = null;
        }
      },
      { once: true }
    );

    try {
      await audio.play();
    } catch {
      // Keep loaded; may succeed after user gesture
    }
  }

  /** Immediately stop and reset the current audio (if any). */
  stop(): void {
    if (!this.current) return;
    this.current.pause();
    this.current.currentTime = 0;
    this.current = null;
    this.currentUrl = null;
  }

  /** Pause playback but keep the current position. */
  pause(): void {
    this.current?.pause();
  }

  /** Set volume for current audio and future playback. */
  setVolume(volume: number): void {
    const v = clamp01(volume);
    this.volume = v;
    if (this.current) this.current.volume = v;
  }

  /** Fade out the current audio, then stop it. */
  fadeOutAndStop(ms: number): Promise<void> {
    return new Promise((resolve) => {
      const audio = this.current;
      if (!audio || ms <= 0) {
        this.stop();
        resolve();
        return;
      }

      const startVolume = audio.volume;
      const startTime = performance.now();

      const tick = (now: number) => {
        const t = (now - startTime) / ms;

        if (t >= 1) {
          audio.volume = 0;
          this.stop();
          resolve();
          return;
        }

        audio.volume = startVolume * (1 - t);
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  }

  /** Whether audio is currently playing. */
  isPlaying(): boolean {
    const a = this.current;
    return !!a && !a.paused && !a.ended;
  }

  /** URL of the currently loaded audio (if any). */
  getCurrentUrl(): string | null {
    return this.currentUrl;
  }

  // ---- internal helpers ----

  private applyOptions(audio: HTMLAudioElement, opts: PlayOptions): void {
    if (opts.volume !== undefined) {
      audio.volume = clamp01(opts.volume);
      this.volume = audio.volume;
    } else {
      audio.volume = this.volume;
    }

    audio.loop = opts.loop ?? false;
  }
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}
