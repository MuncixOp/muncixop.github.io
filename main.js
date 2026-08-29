const canvas = document.getElementById('glitch-canvas');
const ctx = canvas.getContext('2d');
const boot = document.getElementById('boot');
const main = document.getElementById('main');
const cpu = document.getElementById('cpu');
const ram = document.getElementById('ram');
const up = document.getElementById('up');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.onresize = () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
};

// Boot rápido (2 segundos)
setTimeout(() => {
  boot.classList.remove('hidden');
  setTimeout(() => {
    boot.classList.add('hidden');
    main.classList.remove('hidden');
    loop();
    stats();
  }, 2000);
}, 500);

// Glitch Seco (Corte de imagen, sin suavizado)
function glitch() {
  if (Math.random() > 0.3) {
    const y = Math.random() * h;
    const ht = Math.random() * 30 + 10;
    const off = (Math.random() - 0.5) * 50;
    const col = Math.random() > 0.5 ? '#f05' : '#0ff';
    
    ctx.fillStyle = col;
    ctx.fillRect(0, y, w, ht);
    
    try {
      const img = ctx.getImageData(0, y, w, ht);
      ctx.putImageData(img, off, y);
    } catch (e) {}
  }
  requestAnimationFrame(glitch);
}
glitch();

// Estadísticas falsas
function stats() {
  setInterval(() => {
    cpu.innerText = Math.floor(Math.random() * 30 + 10);
    ram.innerText = Math.floor(Math.random() * 20 + 30);
    let t = Date.now();
    let s = Math.floor((t / 1000) % 60);
    let m = Math.floor((t / 60000) % 60);
    up.innerText = `${m}:${s < 10 ? '0'+s : s}`;
  }, 1000);
}

// Loop para mantener el canvas activo
function loop() {
  // Aquí podrías añadir más lógica si fuera necesario
}
