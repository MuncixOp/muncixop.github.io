// Matrix rain
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Teclado: presiona 1-3 para navegar
document.addEventListener('keydown', (e) => {
    const links = document.querySelectorAll('.link');
    const idx = parseInt(e.key) - 1;
    if (idx >= 0 && idx < links.length) {
        window.location.href = links[idx].href;
    }
});

// Glitch aleatorio extra en la terminal
const terminal = document.querySelector('.terminal');
setInterval(() => {
    if (Math.random() > 0.92) {
        terminal.style.transform = `translate(${(Math.random()-0.5)*4}px, ${(Math.random()-0.5)*4}px)`;
        terminal.style.boxShadow = '0 0 40px rgba(255,0,255,0.4)';
        setTimeout(() => {
            terminal.style.transform = '';
            terminal.style.boxShadow = '';
        }, 100);
    }
}, 2000);   
