const gl = document.getElementById('gl');
const ctx = gl.getContext('2d');
const boot = document.getElementById('boot');
const main = document.getElementById('main');
const cpu = document.getElementById('cpu');
const ram = document.getElementById('ram');
const up = document.getElementById('up');
const lock = document.getElementById('lock');
const pw = document.getElementById('pw');
const ok = document.getElementById('ok');

let w = gl.width = window.innerWidth;
let h = gl.height = window.innerHeight;
let t = 0;

window.onresize = () => {
  w = gl.width = window.innerWidth;
  h = gl.height = window.innerHeight;
};

// Boot Sequence (Rápido y seco)
setTimeout(() => {
  boot.classList.add('active');
  setTimeout(() => {
    boot.classList.remove('active');
    boot.classList.add('hidden');
    main.classList.remove('hidden');
    main.classList.add('active');
    glitchLoop();
    statsLoop();
  }, 2000);
}, 500);

// Glitch "Seco" - Sin suavizado, cortes directos
function glitchLoop() {
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
  requestAnimationFrame(glitchLoop);
}

// Stats Falsas
function statsLoop() {
  setInterval(() => {
    cpu.innerText = Math.floor(Math.random() * 30 + 10);
    ram.innerText = Math.floor(Math.random() * 20 + 30);
    t++;
    const s = t % 60;
    const m = Math.floor(t / 60);
    up.innerText = `${m}:${s < 10 ? '0'+s : s}`;
  }, 1000);
}

// Password (Opcional)
ok.onclick = () => {
  if (pw.value === 'admin') lock.classList.add('hidden');
  else { pw.value = ''; lock.classList.add('hidden'); alert('ERR'); }
};

// Mostrar lock a los 10s (Descomentar si quieres)
// setTimeout(() => lock.classList.remove('hidden'), 10000);
