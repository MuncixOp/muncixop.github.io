// --- 1. MATRIX BACKGROUND ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const characters = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEF$#@*+<>~';
const fontSize = 16;
let drops = [];

function initDrops() {
  let columns = Math.floor(width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = { y: Math.random() * -100, speed: Math.random() * 1.2 + 0.8 };
  }
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = `bold ${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    let drop = drops[i];
    let x = i * fontSize;
    let currentY = drop.y * fontSize;
    let trailLength = 18;

    for (let j = 0; j < trailLength; j++) {
      let charY = currentY - (j * fontSize);
      if (charY < 0 || charY > height) continue;

      let randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      if (j === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00ff66';
      } else {
        let opacity = Math.max(0, 1 - (j / trailLength));
        ctx.fillStyle = `rgba(0, ${Math.floor(180 + 75 * opacity)}, 50, ${opacity})`;
        ctx.shadowBlur = j === 1 ? 6 : 0;
        ctx.shadowColor = '#00ff00';
      }
      ctx.fillText(randomChar, x, charY);
    }
    ctx.shadowBlur = 0;
    drop.y += drop.speed;
    if (currentY > height && Math.random() > 0.975) {
      drop.y = Math.random() * -20;
      drop.speed = Math.random() * 1.2 + 0.8;
    }
  }
  requestAnimationFrame(drawMatrix);
}
requestAnimationFrame(drawMatrix);


// --- 2. TERMINAL FUNCIONAL E INTERACTIVA ---
const termBody = document.getElementById('term-body');
const historyContainer = document.getElementById('history');
const hiddenInput = document.getElementById('terminal-input');
const inputDisplay = document.getElementById('input-display');
const termContainer = document.getElementById('term');

let commandHistory = [];
let historyIndex = -1;

const linksData = {
  'curseforge': ['CURSEFORGE', 'https://www.curseforge.com/members/muncixop/projects'],
  'twitter': ['X / TWITTER', 'https://x.com/MuncixOp'],
  'tiktok': ['TIKTOK', 'https://www.tiktok.com/@muncixop']
};

function focusInput() {
  hiddenInput.focus();
}
window.addEventListener('load', focusInput);
document.addEventListener('click', focusInput);

hiddenInput.addEventListener('input', () => {
  inputDisplay.textContent = hiddenInput.value;
});

hiddenInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let cmd = hiddenInput.value.trim();
    processCommand(cmd);
    hiddenInput.value = '';
    inputDisplay.textContent = '';
  } else if (e.key === 'ArrowUp') {
    if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
      historyIndex++;
      hiddenInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      inputDisplay.textContent = hiddenInput.value;
    }
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (historyIndex > 0) {
      historyIndex--;
      hiddenInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      inputDisplay.textContent = hiddenInput.value;
    } else if (historyIndex === 0) {
      historyIndex = -1;
      hiddenInput.value = '';
      inputDisplay.textContent = '';
    }
    e.preventDefault();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === '1') openLink('curseforge');
  if (e.key === '2') openLink('twitter');
  if (e.key === '3') openLink('tiktok');
});

function printLine(htmlContent, className = 'out') {
  const div = document.createElement('div');
  div.className = className;
  div.innerHTML = htmlContent;
  historyContainer.appendChild(div);
  termBody.scrollTop = termBody.scrollHeight;
}

function openLink(key) {
  if (linksData[key]) {
    printLine(`&gt; Abriendo nodo <span style="color:#0af">${linksData[key][0]}</span>...`, 'out ok');
    setTimeout(() => {
      window.open(linksData[key][1], '_blank');
    }, 400);
  }
}

function processCommand(rawCmd) {
  if (!rawCmd) return;
  commandHistory.push(rawCmd);
  historyIndex = -1;

  printLine(`<span style="color:#0af">muncixop@void:~$</span> ${escapeHTML(rawCmd)}`);

  let parts = rawCmd.toLowerCase().split(' ');
  let cmd = parts[0];

  switch (cmd) {
    case 'help':
      printLine(`Comandos disponibles:
  <span style="color:#fff">socials</span>      - Muestra los enlaces principales (Curseforge, Twitter, TikTok)
  <span style="color:#fff">curseforge</span>   - Abre directamente el perfil de Curseforge [1]
  <span style="color:#fff">twitter</span>      - Abre directamente el perfil de X / Twitter [2]
  <span style="color:#fff">tiktok</span>       - Abre directamente el perfil de TikTok [3]
  <span style="color:#fff">clear</span>        - Limpia la pantalla de la terminal
  <span style="color:#fff">whoami</span>       - Muestra información del sistema actual
  <span style="color:#fff">date</span>         - Muestra la fecha y hora del sistema`);
      break;

    case 'socials':
    case 'links':
    case 'ls':
      printLine(`Nodos de red disponibles:
  <a class="link-item" href="${linksData.curseforge[1]}" target="_blank"><span>[1]</span> CURSEFORGE</a>
  <a class="link-item" href="${linksData.twitter[1]}" target="_blank"><span>[2]</span> X / TWITTER</a>
  <a class="link-item" href="${linksData.tiktok[1]}" target="_blank"><span>[3]</span> TIKTOK</a>`);
      break;

    case 'curseforge':
      openLink('curseforge');
      break;

    case 'twitter':
    case 'x':
      openLink('twitter');
      break;

    case 'tiktok':
      openLink('tiktok');
      break;

    case 'clear':
    case 'cls':
      historyContainer.innerHTML = '';
      break;

    case 'whoami':
      printLine('muncixop — Desarrollador / Creador de contenido [VOID SYSTEMS CLI v4.2]');
      break;

    case 'date':
      printLine(`[ ${new Date().toUTCString()} ]`);
      break;

    case 'sudo':
      printLine('Permisos de superusuario denegados. Este incidente será reportado.', 'out err');
      break;

    default:
      printLine(`Comando no reconocido: "${escapeHTML(rawCmd)}". Escribe <span style="color:#fff">help</span> para obtener asistencia.`, 'out err');
      break;
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

setInterval(() => {
  if (Math.random() > .92) {
    termContainer.classList.add('shake');
    termContainer.style.boxShadow = '0 0 60px #f0f3,0 0 120px #0ff1';
    setTimeout(() => {
      termContainer.classList.remove('shake');
      termContainer.style.boxShadow = '';
    }, 120);
  }
}, 3500);
