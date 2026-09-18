/* ==========================================================================
   Audio Synthesizer: Native Web Audio API Sound Effects
   Zero external audio files, 100% reliable, lightweight & instant
   ========================================================================== */

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.muted = false;
  }

  _initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setMuted(isMuted) {
    this.muted = isMuted;
  }

  isMuted() {
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this._initContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  playDrop() {
    if (this.muted) return;
    this._initContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.08);
  }

  playServe() {
    if (this.muted) return;
    this._initContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(650, this.audioCtx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.2);
  }

  playWin() {
    if (this.muted) return;
    this._initContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    // Cheerful major arpeggio: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.25, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.25);
    });
  }

  playError() {
    if (this.muted) return;
    this._initContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    // Low dissonance buzz: 160Hz -> 120Hz
    [160, 125].forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.18, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.15);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.15);
    });
  }

  playTrophyFanfare() {
    if (this.muted) return;
    this._initContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    // Grand triumphant fanfare: C5, G5, C6, E6, G6
    const fanfare = [
      { freq: 523.25, time: 0, dur: 0.15 },
      { freq: 783.99, time: 0.15, dur: 0.15 },
      { freq: 1046.50, time: 0.3, dur: 0.2 },
      { freq: 1318.51, time: 0.5, dur: 0.2 },
      { freq: 1567.98, time: 0.7, dur: 0.5 }
    ];

    fanfare.forEach(note => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      gain.gain.setValueAtTime(0.3, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.01, now + note.time + note.dur);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + note.time);
      osc.stop(now + note.time + note.dur);
    });
  }
}

export const sound = new SoundController();
