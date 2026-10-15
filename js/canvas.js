/**
 * INTERACTIVE CIRCUIT & NEURAL NETWORK CANVAS
 * High-performance 2D particle simulation representing distributed nodes,
 * hardware sensors, and cloud communication links.
 */

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.particleCount = 65;
    this.maxDistance = 140;
    this.mouseDistance = 180;
    
    this.mouse = {
      x: null,
      y: null,
      active: false
    };

    this.isActive = true;
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth;
    this.height = this.canvas.parentElement.clientHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Adjust particle count dynamically based on screen size
    if (this.width < 768) {
      this.particleCount = 35;
      this.maxDistance = 100;
    } else {
      this.particleCount = 70;
      this.maxDistance = 140;
    }
  }

  createParticles() {
    this.particles = [];
    const types = ['sensor', 'server', 'gateway', 'client'];
    
    for (let i = 0; i < this.particleCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      let color = '#00f0ff';
      let size = 2;
      
      if (type === 'sensor') {
        color = '#00ff9d'; // Emerald
        size = 2.2;
      } else if (type === 'server') {
        color = '#ffb800'; // Amber
        size = 2.8;
      } else if (type === 'gateway') {
        color = '#9d4edd'; // Purple
        size = 2.5;
      }

      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: size,
        color: color,
        type: type,
        pulse: Math.random() * Math.PI
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
      this.mouse.x = null;
      this.mouse.y = null;
    });

    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive) this.animate();
    });
  }

  animate() {
    if (!this.isActive) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.03;

      // Bounce at boundaries
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse interactivity (gentle gravitational attraction/repulsion)
      if (this.mouse.active && this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouseDistance) {
          const force = (this.mouseDistance - dist) / this.mouseDistance;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;

          // Connect cursor to nearby nodes
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - dist / this.mouseDistance)})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }

      // Draw Node
      const currentSize = p.size + Math.sin(p.pulse) * 0.5;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // reset for lines

      // Connect with neighboring nodes
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxDistance) {
          const alpha = 1 - dist / this.maxDistance;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.15})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ParticleNetwork('particle-canvas');
});
