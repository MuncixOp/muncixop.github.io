/* ========================================================================== */
/* MUNCIX_OP // APEX ENGINE (ANIMACIONES Y EFECTOS FLUIDOS)                  */
/* ========================================================================== */

// 1. Simulación de rendimiento de hardware en tiempo real
setInterval(() => {
    const cpuEl = document.getElementById('cpuUsageVal');
    const cpuBar = document.getElementById('cpuBar');
    const ramEl = document.getElementById('ramUsageVal');
    const ramBar = document.getElementById('ramBar');

    if (cpuEl && cpuBar) {
        const randomCpu = (12 + Math.random() * 8).toFixed(1);
        cpuEl.innerText = randomCpu + '%';
        cpuBar.style.width = randomCpu + '%';
    }

    if (ramEl && ramBar) {
        const randomRam = (42 + Math.random() * 2).toFixed(1);
        ramEl.innerText = `${randomRam} GB / 128 GB`;
        ramBar.style.width = ((randomRam / 128) * 100) + '%';
    }
}, 2500);

// 2. Sistema de Partículas / Red Neural de Fondo en Canvas
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 40; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 1
    });
}

function animateNeural() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';

    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animateNeural);
}
animateNeural();

// 3. Sistema de Notificaciones Toast
function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// 4. Modal de Acciones Rápidas
const modal = document.getElementById('commandModal');
const btnQuickLaunch = document.getElementById('btnQuickLaunch');
const btnCloseModal = document.getElementById('btnCloseModal');

btnQuickLaunch.addEventListener('click', () => modal.classList.remove('hidden'));
btnCloseModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// 5. Acciones de los Comandos del Modal
document.querySelectorAll('.command-option').forEach(opt => {
    opt.addEventListener('click', () => {
        const action = opt.getAttribute('data-action');
        modal.classList.add('hidden');

        if (action === 'theme') {
            const themes = ['', 'theme-amber', 'theme-neon', 'theme-crimson'];
            const currentTheme = themes.find(t => document.body.classList.contains(t)) || '';
            const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
            
            themes.forEach(t => t && document.body.classList.remove(t));
            if (nextTheme) document.body.classList.add(nextTheme);
            showToast(`Tema cambiado con éxito`);
        } 
        else if (action === 'glitch') {
            document.body.classList.add('glitch-effect');
            setTimeout(() => document.body.classList.remove('glitch-effect'), 300);
            showToast('Perturbación de hardware ejecutada');
        } 
        else if (action === 'fullscreen') {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
                showToast('Modo inmersivo activado');
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                showToast('Modo inmersivo desactivado');
            }
        }
    });
});
