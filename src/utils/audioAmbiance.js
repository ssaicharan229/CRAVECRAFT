// Procedural culinary open-kitchen & flame ambiance using Web Audio API

let audioCtx = null;
let gainNode = null;
let isPlaying = false;
let noiseNode = null;
let droneOsc = null;

export function toggleKitchenAmbiance(forceState) {
  if (typeof window === "undefined") return false;

  const targetState = forceState !== undefined ? forceState : !isPlaying;

  if (targetState) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      // Master Gain
      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 1.5);
      gainNode.connect(audioCtx.destination);

      // 1. Subtle warm fireplace / pan sizzle (filtered pink/brown noise)
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter for warm gentle sizzle
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 2.5;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      // Bandpass filter around sizzle warmth frequencies
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1400;
      filter.Q.value = 1.2;

      noiseNode.connect(filter);
      filter.connect(gainNode);
      noiseNode.start();

      // 2. Warm sub-harmonic luxury drone (warm 55Hz bass root)
      droneOsc = audioCtx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(55, audioCtx.currentTime);

      const droneGain = audioCtx.createGain();
      droneGain.gain.setValueAtTime(0.03, audioCtx.currentTime);

      droneOsc.connect(droneGain);
      droneGain.connect(gainNode);
      droneOsc.start();

      isPlaying = true;
      return true;
    } catch (e) {
      console.warn("AudioContext error:", e);
      return false;
    }
  } else {
    if (gainNode && audioCtx) {
      try {
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
        setTimeout(() => {
          if (noiseNode) {
            noiseNode.stop();
            noiseNode.disconnect();
          }
          if (droneOsc) {
            droneOsc.stop();
            droneOsc.disconnect();
          }
          isPlaying = false;
        }, 900);
      } catch {
        isPlaying = false;
      }
    }
    isPlaying = false;
    return false;
  }
}

export function playClickSound() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch {
    // Ignore audio errors
  }
}

export function playSuccessChime() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();

    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord
    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + idx * 0.08);
      osc.stop(audioCtx.currentTime + idx * 0.08 + 0.65);
    });
  } catch {
    // Ignore audio errors
  }
}
