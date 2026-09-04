/* ========================================================================== */
/* MUNCIX_OP // APEX_NEXUS - MOTOR JAVASCRIPT AVANZADO                      */
/* ========================================================================== */

// 1. Navegación por Pestañas del Sidebar
const navButtons = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.workspace-view');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        navButtons.forEach(b => b.classList.remove('active'));
        views.forEach(v => v.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');
        playUiClickSound();
    });
});

// 2. Sistema de Audio Sintetizado (Web Audio API)
let audioEnabled = true;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration) {
    if (!audioEnabled) return;
    try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

function playUiClickSound() { playTone(580, 'sine', 0.08); }

const btnToggleAudio = document.getElementById('btnToggleAudio');
const audioStatusText = document.getElementById('audioStatusText');
btnToggleAudio.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    audioStatusText.innerText = audioEnabled ? '🔊 Audio: ON' : '🔇 Audio: OFF';
    showApexToast(audioEnabled ? 'Subsistema de audio activado' : 'Subsistema de audio silenciado');
});

// 3. Sistema de Notificaciones Toast
function showApexToast(message) {
    const stack = document.getElementById('apexToastStack');
    const toast = document.createElement('div');
    toast.className = 'apex-toast';
    toast.innerText = message;
    stack.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOutAnim 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// 4. Pantalla Completa
function requestFullscreenMode() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        showApexToast('Modo inmersivo de pantalla completa activado');
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        showApexToast('Modo inmersivo desactivado');
    }
}

// 5. Simulación de Hardware en Tiempo Real
setInterval(() => {
    const cpuValEl = document.querySelector('.cpu-val');
    const cpuBarEl = document.querySelector('.cpu-bar');
    const ramValEl = document.querySelector('.ram-val');
    const ramBarEl = document.querySelector('.ram-bar');

    if (cpuValEl && cpuBarEl) {
        const randCpu = (12 + Math.random() * 8).toFixed(1);
        cpuValEl.innerText = randCpu + '%';
        cpuBarEl.style.width = randCpu + '%';
    }
    if (ramValEl && ramBarEl) {
        const randRam = (42 + Math.random() * 2).toFixed(1);
        ramValEl.innerText = `${randRam} / 128 GB`;
        ramBarEl.style.width = ((randRam / 128) * 100) + '%';
    }
}, 2500);

// 6. Sistema de Partículas / Red Neural de Fondo en Canvas
const canvas = document.getElementById('neuralParticleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeNeuralCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeNeuralCanvas);
resizeNeuralCanvas();

for (let i = 0; i < 45; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1
    });
}

function renderNeuralField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';

    particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 140) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(renderNeuralField);
}
renderNeuralField();

// 7. Selector de Temas Avanzado
const availableThemes = [
    { class: 'theme-verde-morado', name: 'Verde-Morado' },
    { class: 'theme-ambar', name: 'Ámbar Retro' },
    { class: 'theme-nevera', name: 'Cian Arctic' },
    { class: 'theme-carmes', name: 'Carmesí Flux' },
    { class: 'theme-plata', name: 'Plata Steel' }
];

function applySelectedTheme(themeClassName) {
    availableThemes.forEach(t => document.body.classList.remove(t.class));
    document.body.classList.add(themeClassName);

    const match = availableThemes.find(t => t.class === themeClassName);
    const themeNameLabel = document.getElementById('currentThemeName');
    if (themeNameLabel && match) {
        themeNameLabel.innerText = `Tema: ${match.name}`;
    }
    const dropdown = document.getElementById('themeDropdownSelector');
    if (dropdown) dropdown.value = themeClassName;

    showApexToast(`Tema aplicado: ${match ? match.name : 'Personalizado'}`);
    playTone(440, 'triangle', 0.1);
}

function cycleThemeColors() {
    const currentThemeClass = availableThemes.find(t => document.body.classList.contains(t.class))?.class || 'theme-verde-morado';
    const currentIndex = availableThemes.findIndex(t => t.class === currentThemeClass);
    const nextTheme = availableThemes[(currentIndex + 1) % availableThemes.length];
    applySelectedTheme(nextTheme.class);
}

// 8. Motor de Glitch Estocástico Automático (2/5 de probabilidad por segundo)
let stochasticGlitchEnabled = true;

function triggerManualGlitchEvent() {
    document.body.classList.add('stochastic-glitch-active');
    playTone(180, 'sawtooth', 0.15);
    setTimeout(() => document.body.classList.remove('stochastic-glitch-active'), 250);
    showApexToast('Pulso electromagnético manual ejecutado');
}

// Comprobación cada segundo exacto (1000ms)
setInterval(() => {
    if (!stochasticGlitchEnabled) return;
    
    // Probabilidad de 2 entre 5 (40% de probabilidad por segundo)
    const randomRoll = Math.random(); // valor entre 0 y 1
    if (randomRoll < 0.4) { 
        document.body.classList.add('stochastic-glitch-active');
        playTone(220, 'square', 0.1);
        setTimeout(() => document.body.classList.remove('stochastic-glitch-active'), 200);
    }
}, 1000);

function toggleStochasticGlitchEngine() {
    stochasticGlitchEnabled = !stochasticGlitchEnabled;
    const btn = document.getElementById('btnToggleStochasticEngine');
    const statusLabel = document.getElementById('stochasticGlitchStatus');

    if (stochasticGlitchEnabled) {
        btn.classList.add('active');
        statusLabel.innerText = 'Activo (Automático)';
        showApexToast('Motor de glitch estocástico encendido');
    } else {
        btn.classList.remove('active');
        statusLabel.innerText = 'Desactivado';
        showApexToast('Motor de glitch estocástico detenido');
    }
}
