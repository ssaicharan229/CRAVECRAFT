/**
 * ==============================================================================
 * CRAVECRAFT — CINEMATIC SOUND & AMBIENT ENGINE
 * Web Audio API SoundManager (Zero Scroll-Lag Architecture)
 * ==============================================================================
 */

"use strict";

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.isUnlocked = false;

    // Gain Nodes
    this.masterGain = null;
    this.ambientGain = null;
    this.sfxGain = null;

    // Volume Levels
    this.masterVolume = 0.7;
    this.ambientVolume = 0.25;
    this.sfxVolume = 0.6;

    // Concurrency & Safety Controls
    this.activeSfxCount = 0;
    this.maxSfxCount = 3;
    this.lastTickTime = 0;
    this.wasEnabledBeforeHide = false;

    // Ambient State
    this.currentAmbientKey = null;
    this.currentAmbientSource = null;
    this.currentAmbientGain = null;

    // Buffer Cache & In-flight Requests
    this.audioBuffers = new Map();
    this.loadingPromises = new Map();

    // Sound State (OFF by default, persisted in localStorage)
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.isEnabled = false;

    try {
      const saved = localStorage.getItem("cravecraft_sound_enabled");
      if (saved !== null && !this.prefersReducedMotion) {
        this.isEnabled = saved === "true";
      }
    } catch (e) {
      this.isEnabled = false;
    }

    // Sound File Map
    this.ambientUrls = {
      bright: "assets/audio/ambient-bright.mp3",
      airy: "assets/audio/ambient-airy.mp3",
      fire: "assets/audio/ambient-fire.mp3",
      burger: "assets/audio/ambient-burger.mp3",
      pizza: "assets/audio/ambient-pizza.mp3",
      biryani: "assets/audio/ambient-biryani.mp3",
      pasta: "assets/audio/ambient-pasta.mp3"
    };

    this.sfxUrls = {
      whoosh: "assets/audio/sfx-whoosh.mp3",
      swoosh: "assets/audio/sfx-swoosh.mp3",
      slide: "assets/audio/sfx-slide.mp3",
      tick: "assets/audio/sfx-tick.mp3",
      click: "assets/audio/sfx-click.mp3",
      pop: "assets/audio/sfx-pop.mp3",
      chime: "assets/audio/sfx-chime.mp3"
    };

    // DOM Elements
    this.toggleBtn = document.getElementById("soundToggleBtn");
    this.soundLabel = document.getElementById("soundLabel");
    this.soundIconBox = document.getElementById("soundIconBox");
    this.tooltip = document.getElementById("soundTooltip");

    this.init();
  }

  init() {
    this.updateUI();
    this.bindEvents();
    this.initTooltip();

    // Lazy-preload lightweight SFX after page is interactive
    setTimeout(() => {
      this.preloadSfx();
    }, 1500);
  }

  initAudioContext() {
    if (!this.audioContext) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;

        this.audioContext = new AudioCtx();

        this.masterGain = this.audioContext.createGain();
        this.ambientGain = this.audioContext.createGain();
        this.sfxGain = this.audioContext.createGain();

        // Node routing: Sources -> Category Gains -> Master Gain -> Destination
        this.ambientGain.connect(this.masterGain);
        this.sfxGain.connect(this.masterGain);
        this.masterGain.connect(this.audioContext.destination);

        const now = this.audioContext.currentTime;
        this.masterGain.gain.setValueAtTime(this.isEnabled ? this.masterVolume : 0, now);
        this.ambientGain.gain.setValueAtTime(this.ambientVolume, now);
        this.sfxGain.gain.setValueAtTime(this.sfxVolume, now);
      } catch (err) {
        console.warn("Web Audio API initialization failed:", err);
        return null;
      }
    }
    return this.audioContext;
  }

  unlock() {
    if (this.isUnlocked) return Promise.resolve();

    const ctx = this.initAudioContext();
    if (!ctx) return Promise.resolve();

    // iOS Safari Web Audio unlock technique: play a 1-sample silent buffer synchronously
    try {
      const silentBuffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = silentBuffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch (e) {}

    if (ctx.state === "suspended") {
      return ctx.resume().then(() => {
        this.isUnlocked = true;
      }).catch(() => {});
    }

    this.isUnlocked = true;
    return Promise.resolve();
  }

  bindEvents() {
    // Unlock Web Audio on first user interaction (required for iOS Safari)
    const unlockHandler = () => {
      this.unlock();
      window.removeEventListener("click", unlockHandler);
      window.removeEventListener("touchstart", unlockHandler);
      window.removeEventListener("keydown", unlockHandler);
    };

    window.addEventListener("click", unlockHandler, { once: true, passive: true });
    window.addEventListener("touchstart", unlockHandler, { once: true, passive: true });
    window.addEventListener("keydown", unlockHandler, { once: true, passive: true });

    // Toggle button click
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => {
        this.hideTooltip();
        this.toggleSound();
      });
    }

    // Keyboard shortcut: 'M' toggles sound
    window.addEventListener("keydown", (e) => {
      if ((e.key === "m" || e.key === "M") && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
        this.hideTooltip();
        this.toggleSound();
      }
    });

    // Mute when tab is hidden, resume when tab is visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.wasEnabledBeforeHide = this.isEnabled;
        if (this.audioContext && this.masterGain && this.isEnabled) {
          const now = this.audioContext.currentTime;
          this.masterGain.gain.cancelScheduledValues(now);
          this.masterGain.gain.linearRampToValueAtTime(0, now + 0.1);
          this.updateEqState(false);
        }
      } else {
        if (this.wasEnabledBeforeHide && this.audioContext && this.masterGain) {
          if (this.audioContext.state === "suspended") {
            this.audioContext.resume().catch(() => {});
          }
          const now = this.audioContext.currentTime;
          this.masterGain.gain.cancelScheduledValues(now);
          this.masterGain.gain.linearRampToValueAtTime(this.masterVolume, now + 0.4);
          this.updateEqState(true);
        }
      }
    });
  }

  initTooltip() {
    if (!this.tooltip) return;

    try {
      const seenTooltip = localStorage.getItem("cravecraft_seen_sound_tooltip");
      if (seenTooltip) {
        this.tooltip.style.display = "none";
        return;
      }
    } catch (e) {}

    // Show tooltip for 6 seconds on first visit
    setTimeout(() => {
      this.hideTooltip();
    }, 6000);
  }

  hideTooltip() {
    if (!this.tooltip) return;
    this.tooltip.style.opacity = "0";
    this.tooltip.style.transform = "translateY(6px)";
    setTimeout(() => {
      if (this.tooltip) this.tooltip.style.display = "none";
    }, 500);

    try {
      localStorage.setItem("cravecraft_seen_sound_tooltip", "true");
    } catch (e) {}
  }

  toggleSound() {
    this.unlock().then(() => {
      this.setEnabled(!this.isEnabled);
    });
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;

    try {
      localStorage.setItem("cravecraft_sound_enabled", String(this.isEnabled));
    } catch (e) {}

    const ctx = this.initAudioContext();
    if (ctx && this.masterGain) {
      const now = ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);

      if (this.isEnabled) {
        if (ctx.state === "suspended") {
          ctx.resume().catch(() => {});
        }
        this.masterGain.gain.linearRampToValueAtTime(this.masterVolume, now + 0.4);

        // Resume ambient track if currently selected
        if (this.currentAmbientKey) {
          const key = this.currentAmbientKey;
          this.currentAmbientKey = null; // force reload/play
          this.playAmbient(key, 0.6);
        }
      } else {
        this.masterGain.gain.linearRampToValueAtTime(0, now + 0.4);
      }
    }

    this.updateUI();
  }

  updateUI() {
    if (!this.toggleBtn) return;

    this.toggleBtn.setAttribute("aria-pressed", String(this.isEnabled));
    this.toggleBtn.setAttribute("aria-label", this.isEnabled ? "Mute audio (Hotkey: M)" : "Unmute audio (Hotkey: M)");

    if (this.soundLabel) {
      this.soundLabel.textContent = this.isEnabled ? "SOUND ON" : "SOUND OFF";
    }

    if (this.soundIconBox) {
      this.soundIconBox.innerHTML = this.isEnabled ? this.getUnmutedSvg() : this.getMutedSvg();
    }

    this.updateEqState();
  }

  updateEqState(forcePlaying) {
    if (!this.toggleBtn) return;

    const isPlaying = forcePlaying !== undefined ? forcePlaying : (this.isEnabled && (this.activeSfxCount > 0 || this.currentAmbientSource !== null));
    this.toggleBtn.classList.toggle("playing", isPlaying);
  }

  getMutedSvg() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
  }

  getUnmutedSvg() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
  }

  loadBuffer(url) {
    if (this.audioBuffers.has(url)) {
      return Promise.resolve(this.audioBuffers.get(url));
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url);
    }

    const promise = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Audio fetch failed: ${url}`);
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => {
        const ctx = this.initAudioContext();
        if (!ctx) return null;
        return ctx.decodeAudioData(arrayBuffer);
      })
      .then((decodedBuffer) => {
        if (decodedBuffer) {
          this.audioBuffers.set(url, decodedBuffer);
        }
        this.loadingPromises.delete(url);
        return decodedBuffer;
      })
      .catch((err) => {
        this.loadingPromises.delete(url);
        return null;
      });

    this.loadingPromises.set(url, promise);
    return promise;
  }

  preloadSfx() {
    Object.values(this.sfxUrls).forEach((url) => {
      this.loadBuffer(url);
    });
  }

  preloadAmbient(key) {
    const url = this.ambientUrls[key];
    if (url) {
      this.loadBuffer(url).catch(() => {});
    }
  }

  /* --------------------------------------------------------------------------
     AMBIENT PLAYBACK & DYNAMIC DUCKING
     -------------------------------------------------------------------------- */
  playAmbient(key, fadeDuration = 0.8) {
    if (this.currentAmbientKey === key && this.currentAmbientSource) {
      return;
    }

    this.currentAmbientKey = key;
    const url = this.ambientUrls[key];
    if (!url) return;

    const ctx = this.initAudioContext();
    if (!ctx) return;

    this.loadBuffer(url).then((buffer) => {
      if (!buffer || this.currentAmbientKey !== key) return;

      const now = ctx.currentTime;

      // Crossfade: Ramp down previous ambient track
      if (this.currentAmbientSource && this.currentAmbientGain) {
        const oldGain = this.currentAmbientGain;
        const oldSource = this.currentAmbientSource;
        try {
          oldGain.gain.cancelScheduledValues(now);
          oldGain.gain.linearRampToValueAtTime(0, now + fadeDuration);
          setTimeout(() => {
            try {
              oldSource.stop();
              oldSource.disconnect();
            } catch (e) {}
          }, fadeDuration * 1000 + 50);
        } catch (e) {}
      }

      // Create new ambient looping source
      try {
        const newSource = ctx.createBufferSource();
        newSource.buffer = buffer;
        newSource.loop = true;

        const newTrackGain = ctx.createGain();
        newTrackGain.gain.setValueAtTime(0, now);
        newTrackGain.gain.linearRampToValueAtTime(1, now + fadeDuration);

        newSource.connect(newTrackGain);
        newTrackGain.connect(this.ambientGain);
        newSource.start(0);

        this.currentAmbientSource = newSource;
        this.currentAmbientGain = newTrackGain;
        this.updateEqState();
      } catch (err) {}
    }).catch(() => {});
  }

  fadeAmbient(duration = 0.8) {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;

    if (this.currentAmbientGain) {
      try {
        this.currentAmbientGain.gain.cancelScheduledValues(now);
        this.currentAmbientGain.gain.linearRampToValueAtTime(0, now + duration);
      } catch (e) {}
    }
  }

  stopAmbient(duration = 0.5) {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;

    if (this.currentAmbientSource && this.currentAmbientGain) {
      const oldGain = this.currentAmbientGain;
      const oldSource = this.currentAmbientSource;
      try {
        oldGain.gain.cancelScheduledValues(now);
        oldGain.gain.linearRampToValueAtTime(0, now + duration);
        setTimeout(() => {
          try {
            oldSource.stop();
            oldSource.disconnect();
          } catch (e) {}
        }, duration * 1000 + 50);
      } catch (e) {}

      this.currentAmbientSource = null;
      this.currentAmbientGain = null;
      this.currentAmbientKey = null;
      this.updateEqState();
    }
  }

  duckAmbient() {
    if (!this.audioContext || !this.ambientGain) return;
    try {
      const now = this.audioContext.currentTime;
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.linearRampToValueAtTime(this.ambientVolume * 0.4, now + 0.1);
    } catch (e) {}
  }

  unduckAmbient() {
    if (!this.audioContext || !this.ambientGain) return;
    try {
      const now = this.audioContext.currentTime;
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.linearRampToValueAtTime(this.ambientVolume, now + 0.5);
    } catch (e) {}
  }

  /* --------------------------------------------------------------------------
     ONE-SHOT SFX PLAYBACK
     -------------------------------------------------------------------------- */
  playSfx(name, options = {}) {
    if (!this.isEnabled) return;
    if (this.activeSfxCount >= this.maxSfxCount) return;

    // Strict throttle for micro-events (e.g. ingredient tick max 1 per 70ms)
    if (name === "tick") {
      const nowTime = performance.now();
      if (nowTime - this.lastTickTime < 70) return;
      this.lastTickTime = nowTime;
    }

    const url = this.sfxUrls[name];
    if (!url) return;

    const ctx = this.initAudioContext();
    if (!ctx) return;

    this.loadBuffer(url).then((buffer) => {
      if (!buffer) return;

      try {
        const source = ctx.createBufferSource();
        source.buffer = buffer;

        // Random pitch ±5% for organic variations
        if (options.randomPitch) {
          source.playbackRate.value = 1 + (Math.random() * 0.1 - 0.05);
        }

        source.connect(this.sfxGain);

        this.activeSfxCount++;
        this.duckAmbient();
        this.updateEqState();

        source.onended = () => {
          this.activeSfxCount = Math.max(0, this.activeSfxCount - 1);
          if (this.activeSfxCount === 0) {
            this.unduckAmbient();
          }
          this.updateEqState();
          try {
            source.disconnect();
          } catch (e) {}
        };

        source.start(0);
      } catch (err) {}
    }).catch(() => {});
  }
}

// Global Sound Instance
window.soundManager = null;
window.addEventListener("DOMContentLoaded", () => {
  window.soundManager = new SoundManager();
});
