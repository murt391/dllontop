const subtitle = document.getElementById("subtitle");

const messages = [
  "homer drops his donut",
  "dll is made after a google doc",
  "",
  "dll. active",
  "loading reality",
  "connection stable"
];

function randomMessage() {
  subtitle.textContent = messages[Math.floor(Math.random() * messages.length)];
}

setInterval(randomMessage, 15000);
randomMessage();

discordBtn.onclick = () => {
  window.open("https://discord.gg/QNzZtNnm4B", "_blank");
};

// Particle network background
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const mouse = { x: null, y: null };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

const dots = Array.from({ length: 80 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6
}));

function animate() {
  ctx.clearRect(0, 0, w, h);

  for (let d of dots) {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > w) d.vx *= -1;
    if (d.y < 0 || d.y > h) d.vy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,180,255,0.6)";
    ctx.fill();

    for (let d2 of dots) {
      const dist = Math.hypot(d.x - d2.x, d.y - d2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200,180,255,${1 - dist / 120})`;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d2.x, d2.y);
        ctx.stroke();
      }
    }

    if (mouse.x && mouse.y) {
      const distM = Math.hypot(d.x - mouse.x, d.y - mouse.y);
      if (distM < 150) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
