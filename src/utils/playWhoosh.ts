/**
 * Synthesizes a short whoosh sound via the Web Audio API — no external audio
 * asset needed. Filtered noise with a sweeping bandpass + a fade envelope.
 * Fails silently (e.g. autoplay-blocked on first landing-page load before any
 * user interaction) since there's nothing meaningful to recover from there.
 */
export const playWhoosh = (durationSec = 0.6) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const duration = durationSec;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.value = 0.8;
    bandpass.frequency.setValueAtTime(180, ctx.currentTime);
    bandpass.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + duration * 0.5);
    bandpass.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.08);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    noise.connect(bandpass).connect(gain).connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + duration);
    noise.onended = () => ctx.close();
  } catch {
    // Autoplay policy or no Web Audio support — silently skip.
  }
};
