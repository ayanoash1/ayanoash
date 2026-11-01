/* -------------------------------------------------------------
   STAR CONSTELLATIONS & ROTATING ROMAN CLOCK CANVAS (MONOCHROME)
------------------------------------------------------------- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Star Constellations Data Structure
const constellations = [
  { name: "URSA MAJOR", stars: [ [-180, -120], [-120, -110], [-80, -70], [-20, -60], [-10, -10], [50, -20], [40, -70] ] },
  { name: "URSA MINOR", stars: [ [180, -180], [140, -150], [110, -120], [80, -100], [50, -80], [30, -110], [70, -120] ] },
  { name: "ORION", stars: [ [-220, 100], [-160, 110], [-190, 150], [-170, 150], [-150, 150], [-130, 190], [-200, 200] ] },
  { name: "CASSIOPEIA", stars: [ [120, 80], [150, 110], [180, 90], [210, 130], [250, 110] ] },
  { name: "CYGNUS", stars: [ [0, -220], [0, -180], [0, -130], [-50, -160], [50, -160] ] }
];

// Background Dust Particles
const dustParticles = Array.from({ length: 90 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.random() * 1.5 + 0.5,
  alpha: Math.random() * 0.5 + 0.2,
  speed: Math.random() * 0.002 + 0.001
}));

let rotationAngle = 0;

// Grid dot matrix - reacts to mouse proximity
const GRID_SPACING = 30, DOT_MAX_R = 6, DOT_DIST = 120;
let gridMouseX = 0, gridMouseY = 0;
let gridMouseInside = false;
let gridDots = [];

function buildGrid() {
  gridDots = [];
  for (let y = 0; y < height; y += GRID_SPACING) {
    for (let x = 0; x < width; x += GRID_SPACING) {
      gridDots.push({ x, y });
    }
  }
}

document.addEventListener('mousemove', e => {
  gridMouseX = e.clientX;
  gridMouseY = e.clientY;
  gridMouseInside = true;
});

document.addEventListener('mouseleave', () => {
  gridMouseInside = false;
});

document.addEventListener('mouseenter', () => {
  gridMouseInside = true;
});

window.addEventListener('resize', buildGrid);

buildGrid();

function drawCanvas() {
  ctx.clearRect(0, 0, width, height);

  // Monochrome Radial Background Gradient
  const grad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width);
  grad.addColorStop(0, '#121212');
  grad.addColorStop(1, '#050505');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 1. Draw Ambient Dust Stars (Silver/White)
  dustParticles.forEach(p => {
    p.alpha += Math.sin(Date.now() * p.speed) * 0.01;
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.6, p.alpha))})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // 2. Draw Celestial Star Constellations (Monochrome)
  const cx = width / 2;
  const cy = height / 2;

  constellations.forEach(constell => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();

    constell.stars.forEach((pt, idx) => {
      const x = cx + pt[0];
      const y = cy + pt[1];

      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Star Nodes & Labels
    constell.stars.forEach((pt, idx) => {
      const x = cx + pt[0];
      const y = cy + pt[1];

      ctx.fillStyle = idx === 0 ? '#ffffff' : 'rgba(200, 200, 200, 0.7)';
      ctx.beginPath();
      ctx.arc(x, y, idx === 0 ? 3.5 : 2, 0, Math.PI * 2);
      ctx.fill();

      if (idx === 0) {
        ctx.fillStyle = 'rgba(163, 163, 163, 0.5)';
        ctx.font = '9px "Helvetica Neue", Helvetica, Arial';
        ctx.fillText(constell.name, x + 8, y + 3);
      }
    });
  });

  // 3. Stationary Clock Ring & Center (Monochrome)
  const clockRadius = Math.min(width, height) * 0.32;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, clockRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, clockRadius - 16, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();

  // 4. Rotating Roman Numerals Orbit
  rotationAngle += 0.0008;

  const numerals = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
  ctx.font = '600 16px "Helvetica Neue", Helvetica, Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  numerals.forEach((num, index) => {
    const baseAngle = (index * (Math.PI / 6)) - (Math.PI / 2);
    const currentAngle = baseAngle + rotationAngle;

    const x = cx + Math.cos(currentAngle) * (clockRadius - 8);
    const y = cy + Math.sin(currentAngle) * (clockRadius - 8);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(num, x, y);
  });

  // 5. Interactive grid dot matrix (reacts to mouse proximity)
  if (gridMouseInside) {
    gridDots.forEach(d => {
      const dist = Math.hypot(d.x - gridMouseX, d.y - gridMouseY);
      const influence = dist > DOT_DIST ? 0 : 1 - dist / DOT_DIST;
      const r = influence * DOT_MAX_R;
      if (r < 0.5) return;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + influence * 0.7})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  requestAnimationFrame(drawCanvas);
}

drawCanvas();

/* -------------------------------------------------------------
   STARTUP BOOT PROGRESS ENGINE
------------------------------------------------------------- */
let progress = 0;
const progressBar = document.getElementById('boot-progress');
const enterBtn = document.getElementById('enter-btn');

const bootInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 12) + 4;
  if (progress >= 100) {
    progress = 100;
    clearInterval(bootInterval);
    enterBtn.classList.add('visible');
  }
  progressBar.style.width = progress + '%';
}, 120);

function initializeSystem() {
  const overlay = document.getElementById('boot-overlay');
  overlay.classList.add('hidden');
}

/* -------------------------------------------------------------
   DECREE SYNTHESIZER DATA & LOGIC
------------------------------------------------------------- */
const decrees = [
  "None shall rival the mind of Doom. All world affairs bend to my design.",
  "Richards believes himself clever, yet he remains a pawn on my cosmic board.",
  "Latveria stands as an unyielding beacon of law, order, and supreme science.",
  "Bow before Doom, and find prosperity. Defy Doom, and face total erasure.",
  "Magic and science are not opposing forces—they are twin blades in my hand.",
  "The universe is governed by laws. And those laws are governed by Doom."
];

function generateDecree() {
  const display = document.getElementById('decree-display');
  const randomDecree = decrees[Math.floor(Math.random() * decrees.length)];
  display.style.opacity = 0;
  display.style.transform = "scale(0.95)";
  setTimeout(() => {
    display.innerText = `"${randomDecree}"`;
    display.style.opacity = 1;
    display.style.transform = "scale(1)";
  }, 200);
}

/* -------------------------------------------------------------
   TEXT REVEAL ON SCROLL (INTERSECTION OBSERVER)
------------------------------------------------------------- */
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-text, .reveal-card').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  revealObserver.observe(el);
});

/* -------------------------------------------------------------
   SMOOTH SCROLL LINKS & BUTTON HOVER EFFECTS
------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* Button ripple effect */
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.4)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'width 0.6s ease-out, height 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.zIndex = '10';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.style.width = '300px';
      ripple.style.height = '300px';
      ripple.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});
