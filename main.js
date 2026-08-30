const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Alfabeto katakana combinado con números y símbolos criptográficos (estilo original)
const characters = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEF$#@*+<>~';
const fontSize = 16;
let columns = Math.floor(width / fontSize);

// Creamos un array de gotas con propiedades físicas individuales para cada columna
// Cada columna guarda su posición actual 'y' y su velocidad de caída
let drops = [];
function initDrops() {
  columns = Math.floor(width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = {
      y: Math.random() * -100, // Posición inicial aleatoria fuera de la pantalla
      speed: Math.random() * 1.2 + 0.8 // Velocidad individual variada
    };
  }
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
  // Capa semitransparente oscura para crear la estela difuminada característica
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.font = `bold ${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i];
    const x = i * fontSize;
    const currentY = drop.y * fontSize;

    // Dibujamos una pequeña estela de caracteres desvaneciéndose hacia arriba
    const trailLength = 18; // Longitud de la estela
    for (let j = 0; j < trailLength; j++) {
      const charY = currentY - (j * fontSize);
      if (charY < 0 || charY > height) continue;

      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));

      if (j === 0) {
        // La "cabeza" de la cascada: carácter ultrabrillante casi blanco/verde puro
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00ff66';
      } else {
        // El cuerpo de la estela: se va oscureciendo exponencialmente
        const opacity = Math.max(0, 1 - (j / trailLength));
        ctx.fillStyle = `rgba(0, ${Math.floor(180 + 75 * opacity)}, 50, ${opacity})`;
        ctx.shadowBlur = j === 1 ? 6 : 0; // Solo un ligero brillo en el segundo caracter
        ctx.shadowColor = '#00ff00';
      }

      ctx.fillText(randomChar, x, charY);
    }

    // Restablecer sombra para optimizar rendimiento
    ctx.shadowBlur = 0;

    // Avanzar la gota según su velocidad
    drop.y += drop.speed;

    // Si la gota sale de la pantalla por debajo, la reiniciamos arriba con nueva velocidad
    if (currentY > height && Math.random() > 0.975) {
      drop.y = Math.random() * -20;
      drop.speed = Math.random() * 1.2 + 0.8;
    }
  }

  requestAnimationFrame(drawMatrix);
}

// Iniciar animación de Matrix
requestAnimationFrame(drawMatrix);


// Secuencia de arranque del sistema (Boot) en la terminal
const lines = [
  ['dim', '[ 0.000000] BIOS v4.2.1 — VOID SYSTEMS'],
  ['dim', '[ 0.000312] CPU: unknown @ 4.2GHz'],
  ['dim', '[ 0.001044] RAM: 65536MB OK'],
  ['',     '> cargando kernel...'],
  ['',     '> montando /dev/null...'],
  ['ok',   '> acceso concedido ✓'],
  ['warn', '> 3 nodos disponibles:'],
];

const out = document.getElementById('out');
const lnk = document.getElementById('lnk');
const term = document.getElementById('term');

let i = 0;
(function type() {
  if (i >= lines.length) { showLinks(); return; }
  const [cls, txt] = lines[i];
  const el = document.createElement('div');
  el.className = 'out' + (cls ? ' ' + cls : '');
  el.textContent = txt;
  out.appendChild(el);
  i++;
  setTimeout(type, 240 + Math.random() * 180);
})();

function showLinks() {
  const data = [
    ['CURSEFORGE', 'https://www.curseforge.com/members/muncixop/projects'],
    ['X / TWITTER', 'https://x.com/MuncixOp'],
    ['TIKTOK', 'https://www.tiktok.com/@muncixop'],
  ];
  
  data.forEach(([label, href], idx) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `<span class="n">[${idx + 1}]</span>${label}`;
    a.style.opacity = 0;
    lnk.appendChild(a);
    
    setTimeout(() => {
      a.style.transition = 'opacity .35s ease';
      a.style.opacity = 1;
    }, 120 * idx + 100);
  });
}

// Navegación rápida por teclado (1-3)
window.addEventListener('keydown', e => {
  const links = lnk.querySelectorAll('a');
  const n = parseInt(e.key, 10) - 1;
  if (n >= 0 && n < links.length) {
    location.href = links[n].href;
  }
});

// Glitches visuales aleatorios de la interfaz de la terminal
setInterval(() => {
  if (Math.random() > .92) {
    term.classList.add('shake');
    term.style.boxShadow = '0 0 60px #f0f3,0 0 120px #0ff1';
    setTimeout(() => {
      term.classList.remove('shake');
      term.style.boxShadow = '';
    }, 120);
  }
}, 3000);
