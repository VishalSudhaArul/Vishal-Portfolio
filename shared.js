/* ═══════════════════════════════════════════════════
   VISHAL SUDHA ARUL — SHARED JS
   Used by: all HTML pages (index, skills, projects,
   certifications, achievements, contact)
   ═══════════════════════════════════════════════════ */


/* ─────────────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────────────── */
const cur  = document.getElementById('cur');
const curt = document.getElementById('curt');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cur.style.left = mouseX + 'px';
    cur.style.top  = mouseY + 'px';
});

(function animateTrail() {
    trailX += (mouseX - trailX) * 0.11;
    trailY += (mouseY - trailY) * 0.11;
    curt.style.left = trailX + 'px';
    curt.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
})();


/* ─────────────────────────────────────
   2. CANVAS GRID BACKGROUND
───────────────────────────────────── */
const canvas = document.getElementById('bgc');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gridSize = 65;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.022)';
    ctx.lineWidth   = 1;

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);


/* ─────────────────────────────────────
   3. NAVBAR — glass effect on scroll
───────────────────────────────────── */
const navbar = document.getElementById('nb');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('sc', window.scrollY > 50);
});


/* ─────────────────────────────────────
   4. SCROLL REVEAL ANIMATIONS
   Elements with class .rv fade + slide
   up when they enter the viewport.
   Delay variants: .d1 .d2 .d3 .d4 .d5
───────────────────────────────────── */
const revealEls = document.querySelectorAll('.rv');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target); // animate once
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));
