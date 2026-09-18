/* ==========================================================================
   Confetti Generator: Pure Vanilla JavaScript Particle System
   Zero external libraries, highly performant 60fps canvas renderer
   ========================================================================== */

class ConfettiLauncher {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.colors = ['#ff5722', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#ffd700'];
  }

  _initCanvas() {
    if (!this.canvas) {
      this.canvas = document.getElementById('confetti-canvas');
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'confetti-canvas';
        document.body.appendChild(this.canvas);
      }
      this.ctx = this.canvas.getContext('2d');
      this._resize();
      window.addEventListener('resize', () => this._resize());
    }
  }

  _resize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  fire(particleCount = 90, durationMs = 2500) {
    this._initCanvas();
    if (!this.ctx) return;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: window.innerWidth * (0.3 + Math.random() * 0.4),
        y: window.innerHeight * 0.35,
        w: 8 + Math.random() * 8,
        h: 6 + Math.random() * 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 4,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35 + Math.random() * 0.15,
        opacity: 1
      });
    }

    if (!this.animationId) {
      this._animate();
    }

    setTimeout(() => {
      // Let existing particles fall and fade
    }, durationMs);
  }

  _animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rot += p.rotSpeed;
      p.opacity -= 0.007;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rot * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this._animate());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.animationId = null;
    }
  }

  stop() {
    this.particles = [];
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

export const confetti = new ConfettiLauncher();
