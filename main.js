/* ========================================================================== */
/* MUNCIX_OS // KERNEL v9999.0 - APEX ENGINE (REALISTIC HARDWARE SIMULATION)  */
/* ========================================================================== */

let audioCtx = null;
let audioEnabled = true;

function initAudioSystem() {
    if (!audioCtx && audioEnabled) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {}
    }
}

function playMechanicalClick() {
    if (!audioEnabled) return;
    try {
        initAudioSystem();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.003, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.02);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.02);
    } catch(e) {}
}

function playElectroPulse() {
    if (!audioEnabled) return;
    try {
        initAudioSystem();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.18);
    } catch(e) {}
}

/* ========================================================================== */
/* SECUENCIA DE BOOTEO REALISTA                                               */
/* ========================================================================== */

const bootLogsHardware = [
    { text: "[INIT] MUNCIX UEFI BIOS v9999.0 loaded from flash ROM.", status: "Mounting NVMe buses..." },
    { text: "[CPU] 64 Cores active @ 16.8 GHz. L3 Cache: 512MB ECC.", status: "Allocating CPU rings..." },
    { text: "[MEM] 131072 MB RAM verified at 8400 MHz [ECC Active]", status: "Mapping physical memory blocks..." },
    { text: "[PCI] PCIe Gen 5 lanes initialized. Secure crypto enclave online.", status: "Verifying hardware integrity..." },
    { text: "[GPU] Hardware accelerated vector pipeline active (240 Hz target)", status: "Calibrating shaders..." },
    { text: "[NET] Quantum link established. Zero packet loss confirmed.", status: "Securing socket streams..." },
    { text: "[KERNEL] Uncompressing MUNCIX_APEX_KERNEL into Ring 0...", status: "Loading root modules..." },
    { text: "[READY] Hardware cold-start sequence finished successfully.", status: "SYSTEM READY." }
];

const bootConsole = document.getElementById('bootConsoleOutput');
const bootFill = document.getElementById('bootProgressBarFill');
const bootStatus = document.getElementById('bootStatusIndicator');
const bootPercent = document.getElementById('bootPercentIndicator');
const bootOverlay = document.getElementById('bootSequenceOverlay');
let bootStep = 0;

function executeBootSequence() {
    if (bootStep < bootLogsHardware.length) {
        const item = bootLogsHardware[bootStep];
        bootConsole.innerText += "\n" + item.text;
        bootStatus.innerText = item.status;
        
        const pct = ((bootStep + 1) / bootLogsHardware.length) * 100;
        bootFill.style.width = pct + '%';
        bootPercent.innerText = pct.toFixed(1) + '%';

        bootStep++;
        setTimeout(executeBootSequence, 65);
    } else {
        setTimeout(() => {
            bootOverlay.style.opacity = '0';
            bootOverlay.style.transform = 'scale(1.05)';
            setTimeout(() => {
                bootOverlay.remove();
                initHardwareCanvasVisuals();
                spawnTerminalWindow('mainTerminal', 'MUNCIX_OS // KERNEL_ROOT [ONLINE]', '4096', true);
                showToast("Kernel Apex inicializado correctamente.", "success");
            }, 500);
        }, 300);
    }
}

window.addEventListener('load', () => {
    setTimeout(executeBootSequence, 100);
});

/* ========================================================================== */
/* SISTEMA DE ARCHIVOS VIRTUAL                                                */
/* ========================================================================== */

const virtualFS = {
    "/": { type: "dir", contents: ["home", "sys", "bin", "readme.txt", "hardware.conf"] },
    "/home": { type: "dir", contents: ["muncix_op", "developer"] },
    "/home/muncix_op": { type: "dir", contents: ["bio.txt", "projects.md", "socials.log"] },
    "/home/developer": { type: "dir", contents: ["core_kernel.cpp", "shaders.frag"] },
    "/sys": { type: "dir", contents: ["cpu_stats", "memory_map", "bus_devices"] },
    "/bin": { type: "dir", contents: ["help", "ls", "cd", "cat", "clear", "window", "ping", "sysinfo", "matrix", "glitch", "theme", "audio", "reboot"] },
    "/readme.txt": { type: "file", content: "MUNCIX_OS v9999.0 APEX KERNEL. Interfaz de comandos y multitarea de alta precisión optimizada para rendimiento absoluto." },
    "/hardware.conf": { type: "file", content: "ARCHITECTURE=X86_64_APEX\nSCHEDULER=REALTIME_PREEMPT\nLATENCY=ULTRA_LOW\nREFRESH_RATE=240FPS" },
    "/home/muncix_op/bio.txt": { type: "file", content: "Desarrollador Principal: Muncix_Op\nEspecialidades: Sistemas de Alta Gama, Roblox Studio (Jujutsu Shenanigans), Modelado 3D Blockbench y Diseño de Interfaces Avanzadas." },
    "/home/muncix_op/projects.md": { type: "file", content: "# Proyectos Destacados\n- Jujutsu Shenanigans Advanced Scripting\n- Blockbench Custom 3D Asset Pipeline\n- Desmos & WebGL Mathematical Audio Synthesizers" },
    "/home/muncix_op/socials.log": { type: "file", content: "TikTok: @muncixop\nX / Twitter: @MuncixOp\nCurseForge: muncixop" },
    "/home/developer/core_kernel.cpp": { type: "file", content: "#include <apex_hardware.h>\nint main() { apex::init_ring0_kernel(); return 0; }" },
    "/home/developer/shaders.frag": { type: "file", content: "uniform vec2 u_res; uniform float u_time;\nvoid main() { gl_FragColor = vec4(vec3(sin(u_time)), 1.0); }" }
};

const activeSessions = {};

/* ========================================================================== */
/* GESTIÓN DE VENTANAS MULTITAREA                                             */
/* ========================================================================== */

function setupWindowBehaviors(winEl, headerEl, closeBtn, minBtn, maxBtn, isMain) {
    let dragging = false;
    let startX, startY, initL, initT;

    function capturePos() {
        const rect = winEl.getBoundingClientRect();
        winEl.style.transform = 'none';
        winEl.style.left = rect.left + 'px';
        winEl.style.top = rect.top + 'px';
    }

    headerEl.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-controls')) return;
        if (winEl.classList.contains('maximized')) return;
        capturePos();
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initL = parseFloat(winEl.style.left);
        initT = parseFloat(winEl.style.top);
        bringToFront(winEl);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });

    function onMove(e) {
        if (!dragging) return;
        winEl.style.left = (initL + (e.clientX - startX)) + 'px';
        winEl.style.top = (initT + (e.clientY - startY)) + 'px';
    }
    function onUp() { dragging = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); }

    closeBtn.addEventListener('click', () => {
        if (isMain) {
            playElectroPulse();
            winEl.classList.add('glitch-active');
            const out = winEl.querySelector('[id$="_output"]');
            if (out) appendLine(out, "[WARN] El núcleo primario está protegido contra terminación.", "warning");
            showToast("El núcleo primario está protegido.", "warning");
            setTimeout(() => winEl.classList.remove('glitch-active'), 400);
        } else {
            winEl.classList.add('window-closing');
            setTimeout(() => winEl.remove(), 250);
        }
    });

    let minimized = false;
    const bodyEl = winEl.querySelector('.terminal-body');
    const footerEl = winEl.querySelector('.terminal-footer-status');

    minBtn.addEventListener('click', () => {
        minimized = !minimized;
        winEl.classList.toggle('minimized', minimized);
        if(bodyEl) bodyEl.style.display = minimized ? 'none' : 'block';
        if(footerEl) footerEl.style.display = minimized ? 'none' : 'flex';
    });

    maxBtn.addEventListener('click', () => {
        winEl.classList.toggle('maximized');
        if (!winEl.classList.contains('maximized')) capturePos();
    });

    winEl.addEventListener('mousedown', () => bringToFront(winEl));
}

let topZ = 20;
function bringToFront(winEl) {
    topZ++;
    winEl.style.zIndex = topZ;
}

function setupTerminalInput(inputEl, outContainer, bodyEl, winId) {
    let history = [];
    let hIndex = -1;

    activeSessions[winId] = { cwd: "/" };

    inputEl.addEventListener('input', () => playMechanicalClick());

    inputEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const val = inputEl.value.trim();
            if (val !== '') {
                history.push(val);
                hIndex = history.length;
            }

            const session = activeSessions[winId];
            appendLine(outContainer, `<span style="color: var(--accent-primary);">muncix@apex:${session.cwd}#</span> ${escapeHtml(val)}`, '');
            processCommand(val, outContainer, bodyEl, winId, session);
            inputEl.value = '';
        } else if (e.key === 'ArrowUp') {
            if (hIndex > 0) {
                hIndex--;
                inputEl.value = history[hIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (hIndex < history.length - 1) {
                hIndex++;
                inputEl.value = history[hIndex];
            } else {
                hIndex = history.length;
                inputEl.value = '';
            }
            e.preventDefault();
        }
    });

    bodyEl.addEventListener('click', () => inputEl.focus());
}

function appendLine(container, html, className = '') {
    const div = document.createElement('div');
    div.className = `output-line ${className}`;
    div.innerHTML = html;
    container.appendChild(div);
    const body = container.closest('.terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ========================================================================== */
/* LIENZOS VISUALES (MATRIZ VECTORIAL Y GRILLA CUÁNTICA)                      */
/* ========================================================================== */

let matrixActive = true;

function initHardwareCanvasVisuals() {
    const vCanvas = document.getElementById('vectorMatrixCanvas');
    const vCtx = vCanvas.getContext('2d');
    vCanvas.width = window.innerWidth;
    vCanvas.height = window.innerHeight;

    const chars = '0123456789ABCDEF@#$_MUNCIX';
    const fontSize = 13;
    const columns = vCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    setInterval(() => {
        if (!matrixActive) return;
        vCtx.fillStyle = 'rgba(8, 7, 6, 0.2)';
        vCtx.fillRect(0, 0, vCanvas.width, vCanvas.height);
        vCtx.fillStyle = 'rgba(255, 176, 0, 0.45)';
        vCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            vCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > vCanvas.height && Math.random() > 0.98) drops[i] = 0;
            drops[i]++;
        }
    }, 35);

    const qCanvas = document.getElementById('quantumGridCanvas');
    const qCtx = qCanvas.getContext('2d');
    qCanvas.width = window.innerWidth;
    qCanvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * qCanvas.width,
        y: Math.random() * qCanvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 1.8 + 1
    }));

    function renderParticles() {
        qCtx.clearRect(0, 0, qCanvas.width, qCanvas.height);
        qCtx.strokeStyle = 'rgba(255, 176, 0, 0.08)';
        qCtx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
            particles[i].x += particles[i].vx;
            particles[i].y += particles[i].vy;
            if (particles[i].x < 0 || particles[i].x > qCanvas.width) particles[i].vx *= -1;
            if (particles[i].y < 0 || particles[i].y > qCanvas.height) particles[i].vy *= -1;

            qCtx.beginPath();
            qCtx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
            qCtx.fillStyle = 'rgba(255, 176, 0, 0.35)';
            qCtx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 120) {
                    qCtx.beginPath();
                    qCtx.moveTo(particles[i].x, particles[i].y);
                    qCtx.lineTo(particles[j].x, particles[j].y);
                    qCtx.stroke();
                }
            }
        }
        requestAnimationFrame(renderParticles);
    }
    renderParticles();

    window.addEventListener('resize', () => {
        vCanvas.width = window.innerWidth;
        vCanvas.height = window.innerHeight;
        qCanvas.width = window.innerWidth;
        qCanvas.height = window.innerHeight;
    });
}

/* ========================================================================== */
/* PROCESADOR DE COMANDOS DEL KERNEL                                          */
/* ========================================================================== */

function processCommand(raw, outContainer, bodyEl, winId, session) {
    const parts = raw.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Comandos del sistema MUNCIX_OS v9999.0:
  ls           - Lista los directorios y archivos de la ruta actual
  cd <dir>     - Cambia de directorio en el sistema virtual
  cat <file>   - Imprime en pantalla el contenido de un archivo
  ping <host>  - Envía paquetes de prueba de red simulados
  sysinfo      - Reporte detallado de buses, CPU y memoria RAM
  whoami       - Muestra el usuario activo en el anillo de seguridad
  date         - Muestra la marca temporal sincronizada con hardware
  matrix       - Alterna el flujo vectorial de códigos binarios
  glitch       - Fuerza una perturbación electromagnética local
  theme        - Rota la paleta de colores de hardware
  audio        - Conmuta los relés acústicos de retroalimentación
  clear        - Borra el búfer de salida de la terminal
  window       - Abre una nueva ventana de terminal flotante
  reboot       - Reinicia el sistema operativo`, 'system');
            break;

        case 'ls':
            const dir = virtualFS[session.cwd];
            if (dir && dir.contents) {
                appendLine(outContainer, dir.contents.join('   '), 'success');
            } else {
                appendLine(dir, "Error: directorio inválido.", "error");
            }
            break;

        case 'cd':
            if (!arg || arg === '~') {
                session.cwd = "/home/muncix_op";
            } else if (arg === '..') {
                if (session.cwd !== "/") {
                    const p = session.cwd.split('/');
                    p.pop();
                    session.cwd = p.join('/') || "/";
                }
            } else {
                let target = arg.startsWith('/') ? arg : (session.cwd === '/' ? '/' + arg : session.cwd + '/' + arg);
                if (virtualFS[target] && virtualFS[target].type === 'dir') {
                    session.cwd = target;
                } else {
                    appendLine(outContainer, `cd: directorio no encontrado: ${arg}`, 'error');
                }
            }
            const promptEl = bodyEl.closest('.terminal-window').querySelector('.prompt');
            if (promptEl) promptEl.innerText = `muncix@apex:${session.cwd}#`;
            break;

        case 'cat':
            if (!arg) {
                appendLine(outContainer, "Uso: cat <archivo>", "warning");
                break;
            }
            let fPath = arg.startsWith('/') ? arg : (session.cwd === '/' ? '/' + arg : session.cwd + '/' + arg);
            if (virtualFS[fPath] && virtualFS[fPath].type === 'file') {
                appendLine(outContainer, virtualFS[fPath].content, 'system');
            } else {
                appendLine(outContainer, `cat: ${arg}: No such file or directory`, 'error');
            }
            break;

        case 'ping':
            const host = arg || 'apex.kernel.local';
            appendLine(outContainer, `PING ${host} (127.0.0.1) 56 bytes of data.`, 'system');
            let count = 0;
            const pInt = setInterval(() => {
                count++;
                const t = (Math.random() * 0.4 + 0.05).toFixed(2);
                appendLine(outContainer, `64 bytes from ${host}: icmp_seq=${count} time=${t} ms`, 'success');
                if (count >= 4) clearInterval(pInt);
            }, 200);
            break;

        case 'sysinfo':
            appendLine(outContainer, `OS: MUNCIX_OS v9999.0 APEX | Kernel: Preempt-RT | Cores: 64 | RAM: 131072MB | Latency: 0.01ms`, 'system');
            break;

        case 'whoami':
            appendLine(outContainer, `muncix_op (UID: 0 [RING_0_SUPERUSER])`, 'success');
            break;

        case 'date':
            appendLine(outContainer, `Fri Sep 4 10:20:05 UTC 2026 [HW_SYNC_OK]`, 'system');
            break;

        case 'matrix':
            matrixActive = !matrixActive;
            appendLine(outContainer, `Flujo vectorial: ${matrixActive ? 'ACTIVO' : 'PAUSADO'}`, 'success');
            showToast(`Matriz: ${matrixActive ? 'Activa' : 'Pausada'}`, 'info');
            break;

        case 'glitch':
            playElectroPulse();
            const w = bodyEl.closest('.terminal-window');
            w.classList.add('glitch-active');
            setTimeout(() => w.classList.remove('glitch-active'), 400);
            appendLine(outContainer, "[!] Perturbación electromagnética aplicada.", "warning");
            showToast("¡Fluctuación de hardware forzada!", "warning");
            break;

        case 'theme':
            const palettes = ['theme-amber', 'theme-phosphor', 'theme-cyan', 'theme-crimson', 'theme-silver'];
            const curIdx = palettes.findIndex(t => document.body.classList.contains(t));
            const nextP = palettes[(curIdx + 1) % palettes.length];
            palettes.forEach(t => document.body.classList.remove(t));
            document.body.classList.add(nextP);
            appendLine(outContainer, `Esquema de color cambiado: ${nextP.toUpperCase()}`, 'success');
            showToast(`Tema: ${nextP.toUpperCase()}`, 'success');
            break;

        case 'audio':
            audioEnabled = !audioEnabled;
            appendLine(outContainer, `Relés acústicos: ${audioEnabled ? 'CONECTADOS' : 'SILENCIADOS'}`, 'success');
            showToast(`Audio: ${audioEnabled ? 'Conectado' : 'Silenciado'}`, 'success');
            break;

        case 'clear':
            outContainer.innerHTML = '';
            break;

        case 'window':
            spawnNewSubTerminal();
            appendLine(outContainer, "Nueva instancia de terminal abierta.", "success");
            showToast("Terminal creada", "success");
            break;

        case 'reboot':
            appendLine(outContainer, "Reinicializando el kernel en frío...", "error");
            showToast("Reiniciando sistema...", "error");
            setTimeout(() => location.reload(), 800);
            break;

        case '':
            break;

        default:
            appendLine(outContainer, `comando desconocido: '${escapeHtml(cmd)}'. Escribe 'help' para ver la lista.`, 'error');
            break;
    }
}

let subCount = 0;
function spawnNewSubTerminal() {
    subCount++;
    const id = 'subTerm_' + subCount;
    const ox = (subCount * 40) % 220;
    const oy = (subCount * 40) % 120;
    spawnTerminalWindow(id, `TERMINAL #${subCount}`, `${8000 + subCount}`, false, `top: calc(8vh + ${oy}px); left: calc(10vw + ${ox}px);`);
}

function spawnTerminalWindow(winId, title, pid, isMain, customStyle) {
    const wm = document.getElementById('windowManagerContainer');
    const win = document.createElement('div');
    win.className = 'terminal-window window-spawning';
    win.id = winId;
    if (customStyle) win.style.cssText = customStyle;

    win.innerHTML = `
        <div class="terminal-header">
            <div class="window-controls">
                <button class="control-btn btn-close" id="${winId}_close"></button>
                <button class="control-btn btn-minimize" id="${winId}_min"></button>
                <button class="control-btn btn-maximize" id="${winId}_max"></button>
            </div>
            <div class="terminal-title">
                <span>MUNCIX_OS</span> // ${title}
            </div>
            <div class="window-pid">PID: ${pid}</div>
        </div>

        <div class="terminal-body" id="${winId}_body">
            <div class="output-line system">MUNCIX_APEX_KERNEL [Versión 9999.0 RING 0]</div>
            <div class="output-line system">Escribe 'help' para consultar comandos o presiona Ctrl+K.</div>
            <div class="output-line" style="margin-bottom: 8px;">--------------------------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt">muncix@apex:/#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-status">
            <span>ESTADO: 100% ESTABLE // PREEMPT-RT SCHEDULER</span>
            <span>UTF-8 // 240 HZ RENDER</span>
        </div>
    `;

    wm.appendChild(win);

    setupWindowBehaviors(
        win,
        win.querySelector('.terminal-header'),
        document.getElementById(`${winId}_close`),
        document.getElementById(`${winId}_min`),
        document.getElementById(`${winId}_max`),
        isMain
    );

    setupTerminalInput(
        document.getElementById(`${winId}_input`),
        document.getElementById(`${winId}_output`),
        document.getElementById(`${winId}_body`),
        winId
    );

    document.getElementById(`${winId}_input`).focus();
}

/* ========================================================================== */
/* SISTEMA DE TOASTS Y PALETA DE COMANDOS (MODAL)                             */
/* ========================================================================== */

function showToast(msg, type = 'info') {
    const stack = document.getElementById('apexToastStack');
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    
    let icon = '⚡';
    if (type === 'success') icon = '✔';
    if (type === 'warning') icon = '⚠';
    if (type === 'error') icon = '✖';

    toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(msg)}</span>`;
    stack.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toast-slide-out 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => toast.remove(), 250);
    }, 3200);
}

const paletteModal = document.getElementById('apexCommandPalette');
const paletteInput = document.getElementById('paletteSearchBox');
const paletteList = document.getElementById('paletteResultsList');

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        paletteModal.classList.toggle('hidden');
        if (!paletteModal.classList.contains('hidden')) paletteInput.focus();
    } else if (e.key === 'Escape' && !paletteModal.classList.contains('hidden')) {
        paletteModal.classList.add('hidden');
    }
});

paletteModal.addEventListener('click', (e) => {
    if (e.target === paletteModal) paletteModal.classList.add('hidden');
});

paletteList.addEventListener('click', (e) => {
    const item = e.target.closest('.palette-item');
    if (item) {
        const cmd = item.getAttribute('data-cmd');
        paletteModal.classList.add('hidden');
        const mainInput = document.getElementById('mainTerminal_input');
        if (mainInput) {
            mainInput.value = cmd;
            mainInput.focus();
            mainInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        }
    }
});

paletteInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    paletteList.querySelectorAll('.palette-item').forEach(el => {
        el.style.display = el.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
    });
});

/* ========================================================================== */
/* DOCK DE CONTROL EVENTOS                                                    */
/* ========================================================================== */

document.getElementById('dockBtnTerminal').addEventListener('click', () => spawnNewSubTerminal());
document.getElementById('dockBtnPalette').addEventListener('click', () => {
    paletteModal.classList.toggle('hidden');
    if (!paletteModal.classList.contains('hidden')) paletteInput.focus();
});
document.getElementById('dockBtnMatrix').addEventListener('click', () => {
    matrixActive = !matrixActive;
    showToast(`Matriz: ${matrixActive ? 'Activa' : 'Pausada'}`, 'info');
});
document.getElementById('dockBtnGlitch').addEventListener('click', () => {
    playElectroPulse();
    document.querySelectorAll('.terminal-window').forEach(w => {
        w.classList.add('glitch-active');
        setTimeout(() => w.classList.remove('glitch-active'), 400);
    });
    showToast("¡Perturbación global aplicada!", "warning");
});
document.getElementById('dockBtnTheme').addEventListener('click', () => {
    const palettes = ['theme-amber', 'theme-phosphor', 'theme-cyan', 'theme-crimson', 'theme-silver'];
    const curIdx = palettes.findIndex(t => document.body.classList.contains(t));
    const nextP = palettes[(curIdx + 1) % palettes.length];
    palettes.forEach(t => document.body.classList.remove(t));
    document.body.classList.add(nextP);
    showToast(`Tema cambiado: ${nextP.toUpperCase()}`, 'success');
});
document.getElementById('dockBtnAudio').addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    showToast(`Audio: ${audioEnabled ? 'Conectado' : 'Silenciado'}`, 'success');
});
document.getElementById('dockBtnMax').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        showToast("Modo Inmersivo Activado", "success");
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            showToast("Modo Inmersivo Desactivado", "info");
        }
    }
});
