/* ========================================================================== */
/* MUNCIX_OS // HYPER_VOID SUPREME QUANTUM CORE v99.9 - JAVASCRIPT ENGINE      */
/* ========================================================================== */

let audioCtx = null;
let audioEnabled = true;

function initAudio() {
    if (!audioCtx && audioEnabled) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {}
    }
}

function playKeySound() {
    if (!audioEnabled) return;
    try {
        initAudio();
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

function playEnterSound() {
    if (!audioEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(270, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.007, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } catch(e) {}
}

function playGlitchSound() {
    if (!audioEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.22);
    } catch(e) {}
}

/* ========================================================================== */
/* SECUENCIA DE BOOTEO SUPREMA EXPANDIDA                                      */
/* ========================================================================== */

const supremeBootLogs = [
    { text: "[BIOS] Initializing Quantum UEFI Subsystem & Mesh ACPI v9.4...", status: "Loading Quantum ACPI..." },
    { text: "[CPU] Core #0 - #64 detected @ 14.8 GHz [HYPERQUANTUM SUPREME ARCHITECTURE]", status: "Checking quantum clocks..." },
    { text: "[MEM] Initializing 2097152MB ECC Quantum RAM -> 0x00000 - 0xFFFFFF [OK]", status: "Validating memory mesh..." },
    { text: "[PCI] High-speed PCIe Gen 7 lanes mapped. Secure quantum bus active.", status: "Mounting core storage..." },
    { text: "[GPU] Neural Matrix Ray-Tracing Pipeline online. 120 FPS target locked.", status: "Calibrating shaders..." },
    { text: "[NET] Quantum entanglement communication bridge established across nodes.", status: "Securing network socket..." },
    { text: "[SECURITY] Zero-trust kernel enclave verified. Cryptographic hash matched.", status: "Verifying checksums..." },
    { text: "[KERNEL] Uncompressing MUNCIX_HYPER_VOID_SUPREME_KERNEL v99.9 into Ring 0...", status: "Injecting secure kernel..." },
    { text: "[READY] Quantum core stability 100%. Launching supreme visual interface...", status: "BOOT SEQUENCE COMPLETE." }
];

const bootLogEl = document.getElementById('bootLog');
const bootProgressBar = document.getElementById('bootProgressBar');
const bootStatusText = document.getElementById('bootStatusText');
const bootPercentText = document.getElementById('bootPercentText');
const bootFooterStatus = document.getElementById('bootFooterStatus');
const bootScreen = document.getElementById('bootScreen');
let bootIdx = 0;

function runSupremeBoot() {
    if (bootIdx < supremeBootLogs.length) {
        const log = supremeBootLogs[bootIdx];
        bootLogEl.innerText += "\n" + log.text;
        bootStatusText.innerText = log.status;
        bootFooterStatus.innerText = "STATUS: " + log.status;
        
        const pct = Math.round(((bootIdx + 1) / supremeBootLogs.length) * 100);
        bootProgressBar.style.width = pct + '%';
        bootPercentText.innerText = pct + '%';

        bootIdx++;
        setTimeout(runSupremeBoot, 90);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            bootScreen.style.transform = 'scale(1.06)';
            setTimeout(() => {
                bootScreen.remove();
                initQuantumVisuals();
                createTerminalWindow('mainTerminal', 'MUNCIX_OS // SUPREME_QUANTUM_CORE [ONLINE]', '1337', true, true);
                showToast("¡Núcleo Cuántico V99.9 inicializado con éxito absoluto!", "success");
            }, 700);
        }, 350);
    }
}

window.addEventListener('load', () => {
    setTimeout(runSupremeBoot, 100);
});

/* ========================================================================== */
/* SISTEMA DE ARCHIVOS VIRTUAL EXPANDIDO                                      */
/* ========================================================================== */

const virtualFileSystem = {
    "/": { type: "dir", contents: ["home", "sys", "bin", "readme.txt", "system.conf", "quantum.dat", "supreme.log"] },
    "/home": { type: "dir", contents: ["muncix_op", "developer", "guest"] },
    "/home/muncix_op": { type: "dir", contents: ["bio.txt", "secrets.dat", "socials.log", "projects.md"] },
    "/home/developer": { type: "dir", contents: ["roblox_jjs_yuta.lua", "blockbench_model.json", "desmos_synth.js", "quantum_core.cpp"] },
    "/home/guest": { type: "dir", contents: ["welcome_guest.txt"] },
    "/sys": { type: "dir", contents: ["kernel_info", "quantum_mesh", "memory_map", "neural_net"] },
    "/bin": { type: "dir", contents: ["help", "ls", "cd", "cat", "clear", "window", "ping", "nmap", "socials", "sysinfo", "date", "whoami", "matrix", "glitch", "theme", "reboot"] },
    "/readme.txt": { type: "file", content: "MUNCIX_OS v99.9 SUPREME QUANTUM CORE. Miles de líneas de código optimizadas para máxima perfección visual, fluidez y animaciones de alta fidelidad." },
    "/system.conf": { type: "file", content: "CORE_ENGINE=QUANTUM_HYPER_VOID_SUPREME\nDEBUG_MODE=FALSE\nSAFETY_MODE=ENABLED\nANIMATION_ENGINE=ULTRA_FLUID_120FPS\nTHEME=NEON_GREEN" },
    "/quantum.dat": { type: "file", content: "QUANTUM_SIGNATURE: 0xFF9988AAB277 // SECURE SUPREME MESH HASH VERIFIED." },
    "/supreme.log": { type: "file", content: "[LOG] All subroutines operational. Zero latency pipeline confirmed." },
    "/home/muncix_op/bio.txt": { type: "file", content: "Desarrollador Principal: Muncix_Op\nEspecialidades: Roblox Studio (Jujutsu Shenanigans), Modelado 3D Blockbench de Escritorio, Desmos Audio & Gráficos." },
    "/home/muncix_op/socials.log": { type: "file", content: "TikTok: @muncixop\nX / Twitter: @MuncixOp\nCurseForge: muncixop" },
    "/home/muncix_op/projects.md": { type: "file", content: "# Proyectos Destacados\n- JJS Skill Builder Custom Movesets\n- Blockbench Advanced 3D Assets\n- Tyler, The Creator Audio Synthesis in Desmos" },
    "/home/developer/roblox_jjs_yuta.lua": { type: "file", content: "-- Jujutsu Shenanigans: Custom Yuta Okkotsu advanced moveset script v9 (Optimized)" },
    "/home/developer/blockbench_model.json": { type: "file", content: "{\"model_name\": \"Muncix_QuantumBlade_Supreme\", \"format_version\": \"1.12\", \"software\": \"Blockbench Desktop\"}" },
    "/home/developer/desmos_synth.js": { type: "file", content: "// Desmos audio synthesis mapping for Tyler, The Creator - Are We Still Friends? [Full Math Equiv]" },
    "/home/developer/quantum_core.cpp": { type: "file", content: "#include <quantum>\nint main() { quantum::initialize_supreme_void(); return 0; }" },
    "/home/guest/welcome_guest.txt": { type: "file", content: "Bienvenido al núcleo cuántico supremo. Escribe 'help' o abre la paleta con Ctrl+K." }
};

const terminalStateSessions = {};

/* ========================================================================== */
/* GESTIÓN DE VENTANAS Y COMPORTAMIENTO                                      */
/* ========================================================================== */

function setupWindowBehaviors(winEl, headerEl, closeBtn, minBtn, maxBtn, isMainTerminal) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    function initPosition() {
        const rect = winEl.getBoundingClientRect();
        winEl.style.transform = 'none';
        winEl.style.left = rect.left + 'px';
        winEl.style.top = rect.top + 'px';
    }

    headerEl.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-controls')) return;
        if (winEl.classList.contains('maximized')) return;
        initPosition();
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseFloat(winEl.style.left);
        initialTop = parseFloat(winEl.style.top);
        bringToFront(winEl);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        winEl.style.left = (initialLeft + (e.clientX - startX)) + 'px';
        winEl.style.top = (initialTop + (e.clientY - startY)) + 'px';
    }
    function onMouseUp() { isDragging = false; document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); }

    closeBtn.addEventListener('click', () => {
        if (isMainTerminal) {
            playGlitchSound();
            winEl.classList.add('glitch-active');
            const outputEl = winEl.querySelector('[id$="_output"]');
            if (outputEl) appendLine(outputEl, "[~] WATCHDOG QUANTUM: El núcleo principal está protegido contra cierre forzoso.", "warning");
            showToast("El núcleo principal está protegido.", "warning");
            setTimeout(() => winEl.classList.remove('glitch-active'), 500);
        } else {
            winEl.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
            winEl.style.transform = 'scale(0.85) translateY(25px)';
            winEl.style.opacity = '0';
            setTimeout(() => winEl.remove(), 300);
        }
    });

    let isMin = false;
    const bodyEl = winEl.querySelector('.terminal-body');
    const footerEl = winEl.querySelector('.terminal-footer-hint');

    minBtn.addEventListener('click', () => {
        isMin = !isMin;
        winEl.classList.toggle('minimized', isMin);
        if(bodyEl) bodyEl.style.display = isMin ? 'none' : 'block';
        if(footerEl) footerEl.style.display = isMin ? 'none' : 'flex';
    });

    maxBtn.addEventListener('click', () => {
        winEl.classList.toggle('maximized');
        if (!winEl.classList.contains('maximized')) initPosition();
    });

    winEl.addEventListener('mousedown', () => bringToFront(winEl));
}

let topZ = 20;
function bringToFront(winEl) {
    topZ++;
    winEl.style.zIndex = topZ;
}

function setupTerminalInterface(inputEl, outputContainerEl, bodyEl, winId) {
    let history = [];
    let historyIdx = -1;

    terminalStateSessions[winId] = { cwd: "/", authStep: 0 };

    inputEl.addEventListener('input', () => playKeySound());

    inputEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            playEnterSound();
            const val = inputEl.value.trim();
            if (val !== '') {
                history.push(val);
                historyIdx = history.length;
            }

            const session = terminalStateSessions[winId];
            if (session && session.authStep > 0) {
                handleAuthFlow(val, outputContainerEl, session);
                inputEl.value = '';
                return;
            }

            appendLine(outputContainerEl, `<span style="color: var(--cyan-neon);">muncix@quantum:${session.cwd}#</span> ${escapeHtml(val)}`, '');
            processCommand(val, outputContainerEl, bodyEl, winId, session);
            inputEl.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIdx > 0) {
                historyIdx--;
                inputEl.value = history[historyIdx];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIdx < history.length - 1) {
                historyIdx++;
                inputEl.value = history[historyIdx];
            } else {
                historyIdx = history.length;
                inputEl.value = '';
            }
            e.preventDefault();
        }
    });

    bodyEl.addEventListener('click', () => inputEl.focus());
}

function handleAuthFlow(val, outContainer, session) {
    appendLine(outContainer, `<span style="color: var(--purple-neon);">auth@quantum:~#</span> ${escapeHtml(val || '[BYPASS]')}`, '');

    if (session.authStep === 1) {
        session.authStep = 2;
        appendLine(outContainer, "[+] FASE 1: Token de seguridad cuántica validado con éxito.", "success");
        appendLine(outContainer, "[?] FASE 2/2: Escribe 'CONFIRMAR' para descifrar los enlaces oficiales de Muncix_Op:", "warning");
    } else if (session.authStep === 2) {
        session.authStep = 0;
        appendLine(outContainer, "[✔] ACCESO SUPREMO CONCEDIDO: Canales oficiales descifrados.", "success");
        appendLine(outContainer, `
            <div class="social-card">
                <span>TikTok Oficial (@muncixop)</span>
                <span class="action-link" onclick="window.open('https://www.tiktok.com/@muncixop', '_blank')">[ABRIR]</span>
            </div>
            <div class="social-card">
                <span>X / Twitter Oficial (@MuncixOp)</span>
                <span class="action-link" onclick="window.open('https://x.com/MuncixOp', '_blank')">[ABRIR]</span>
            </div>
            <div class="social-card">
                <span>CurseForge Projects</span>
                <span class="action-link" onclick="window.open('https://www.curseforge.com/members/muncixop/projects', '_blank')">[ABRIR]</span>
            </div>
        `, '');
        showToast("¡Redes oficiales descifradas correctamente!", "success");
    }
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
/* LIENZOS GRÁFICOS AVANZADOS (MATRIX, PARTÍCULAS, RED NEURONAL)            */
/* ========================================================================== */

let matrixActive = true;

function initQuantumVisuals() {
    // 1. Matrix Rain
    const matrixCanvas = document.getElementById('quantumMatrixCanvas');
    const mCtx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    const chars = '0123456789ABCDEF@#$_-MUNCIX';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    setInterval(() => {
        if (!matrixActive) return;
        mCtx.fillStyle = 'rgba(0, 1, 2, 0.16)';
        mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        mCtx.fillStyle = 'rgba(0, 255, 255, 0.45)';
        mCtx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            mCtx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.97) drops[i] = 0;
            drops[i]++;
        }
    }, 32);

    // 2. Partículas Cuánticas Flotantes
    const pCanvas = document.getElementById('particleFieldCanvas');
    const pCtx = pCanvas.getContext('2d');
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
    
    const particles = Array.from({ length: 65 }, () => ({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
    }));

    function renderParticles() {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        pCtx.fillStyle = 'rgba(0, 255, 102, 0.6)';
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = pCanvas.width;
            if (p.x > pCanvas.width) p.x = 0;
            if (p.y < 0) p.y = pCanvas.height;
            if (p.y > pCanvas.height) p.y = 0;

            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            pCtx.fillStyle = `rgba(0, 255, 255, ${p.alpha})`;
            pCtx.fill();
        });
        requestAnimationFrame(renderParticles);
    }
    renderParticles();

    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        pCanvas.width = window.innerWidth;
        pCanvas.height = window.innerHeight;
    });
}

/* ========================================================================== */
/* PROCESADOR DE COMANDOS DEL SISTEMA                                         */
/* ========================================================================== */

function processCommand(rawCmd, outContainer, bodyEl, winId, session) {
    const parts = rawCmd.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Comandos supremos disponibles en MUNCIX_OS v99.9:
  ls           - Lista los archivos del directorio virtual actual
  cd <dir>     - Cambia de directorio virtual
  cat <file>   - Visualiza el contenido detallado de un archivo
  ping <host>  - Simula envío de paquetes cuánticos ICMP de alta velocidad
  sysinfo      - Reporte profundo del núcleo y hardware cuántico
  whoami       - Muestra el usuario activo con privilegios de raíz
  date         - Muestra la marca temporal del núcleo cuántico
  socials      - Muestra y descifra las redes oficiales de Muncix_Op
  matrix       - Alterna la lluvia de código digital en pantalla
  glitch       - Genera una anomalía cromática y glitch de interfaz
  theme        - Cambia la paleta de colores neón del sistema
  clear        - Limpia la pantalla de la terminal
  window       - Abre una subterminal cuántica adicional flotante
  reboot       - Reinicia el núcleo del sistema operativo`, 'system');
            break;

        case 'ls':
            const currentDir = virtualFileSystem[session.cwd];
            if (currentDir && currentDir.contents) {
                appendLine(outContainer, currentDir.contents.join('   '), 'success');
            } else {
                appendLine(outContainer, "Error: directorio no válido en la malla.", "error");
            }
            break;

        case 'cd':
            if (!arg || arg === '~') {
                session.cwd = "/home/muncix_op";
            } else if (arg === '..') {
                if (session.cwd !== "/") {
                    const partsPath = session.cwd.split('/');
                    partsPath.pop();
                    session.cwd = partsPath.join('/') || "/";
                }
            } else {
                let target = arg.startsWith('/') ? arg : (session.cwd === '/' ? '/' + arg : session.cwd + '/' + arg);
                if (virtualFileSystem[target] && virtualFileSystem[target].type === 'dir') {
                    session.cwd = target;
                } else {
                    appendLine(outContainer, `cd: no such file or directory: ${arg}`, 'error');
                }
            }
            const promptEl = bodyEl.closest('.terminal-window').querySelector('.prompt');
            if (promptEl) promptEl.innerText = `muncix@quantum:${session.cwd}#`;
            break;

        case 'cat':
            if (!arg) {
                appendLine(outContainer, "Uso: cat <archivo>", "warning");
                break;
            }
            let filePath = arg.startsWith('/') ? arg : (session.cwd === '/' ? '/' + arg : session.cwd + '/' + arg);
            if (virtualFileSystem[filePath] && virtualFileSystem[filePath].type === 'file') {
                appendLine(outContainer, virtualFileSystem[filePath].content, 'system');
            } else {
                appendLine(outContainer, `cat: ${arg}: Archivo no encontrado en el sistema`, 'error');
            }
            break;

        case 'ping':
            const targetHost = arg || 'quantum.void.supreme.node';
            appendLine(outContainer, `PING ${targetHost} (127.0.0.1) 56 bytes of data.`, 'system');
            let pings = 0;
            const pingInterval = setInterval(() => {
                pings++;
                const time = (Math.random() * 0.9 + 0.1).toFixed(2);
                appendLine(outContainer, `64 bytes from ${targetHost}: icmp_seq=${pings} time=${time} ms`, 'success');
                if (pings >= 4) clearInterval(pingInterval);
            }, 250);
            break;

        case 'sysinfo':
            appendLine(outContainer, `OS: MUNCIX_OS v99.9 SUPREME QUANTUM | Kernel: HyperVoid-X9 | Arch: x86_64-Q | Latency: 0.1ms`, 'system');
            break;

        case 'whoami':
            appendLine(outContainer, `muncix_op (UID: 0 [QUANTUM_SUPREME_ROOT])`, 'success');
            break;

        case 'date':
            appendLine(outContainer, `Fri Sep 4 10:02:14 UTC 2026 [QUANTUM_SYNC_OK]`, 'system');
            break;

        case 'matrix':
            matrixActive = !matrixActive;
            appendLine(outContainer, `Lluvia Matrix state: ${matrixActive ? 'ENABLED' : 'DISABLED'}`, 'success');
            showToast(`Lluvia Matrix: ${matrixActive ? 'Activa' : 'Pausada'}`, 'info');
            break;

        case 'glitch':
            playGlitchSound();
            const win = bodyEl.closest('.terminal-window');
            win.classList.add('glitch-active');
            setTimeout(() => win.classList.remove('glitch-active'), 500);
            appendLine(outContainer, "[!] Anomalía cuántica provocada con éxito.", "warning");
            showToast("¡Glitch visual forzado!", "warning");
            break;

        case 'theme':
            const themes = ['', 'theme-cyan', 'theme-purple', 'theme-danger'];
            const currentThemeIndex = themes.findIndex(t => document.body.classList.contains(t));
            const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
            themes.forEach(t => { if(t) document.body.classList.remove(t); });
            if (nextTheme) document.body.classList.add(nextTheme);
            appendLine(outContainer, `Tema visual actualizado: ${nextTheme || 'NEON_GREEN_DEFAULT'}`, 'success');
            showToast(`Tema cambiado: ${nextTheme || 'Default'}`, 'success');
            break;

        case 'clear':
            outContainer.innerHTML = '';
            break;

        case 'window':
            spawnNewSubTerminal();
            appendLine(outContainer, "Nueva subterminal cuántica flotante abierta.", "success");
            showToast("Subterminal abierta", "success");
            break;

        case 'socials':
            session.authStep = 1;
            appendLine(outContainer, "[!] VERIFICACIÓN DE SEGURIDAD CUÁNTICA SUPREMA:", "warning");
            appendLine(outContainer, "[?] Escribe cualquier valor o presiona ENTER para continuar:", "warning");
            break;

        case 'reboot':
            appendLine(outContainer, "Reiniciando núcleo cuántico supremo...", "error");
            showToast("Reiniciando sistema...", "error");
            setTimeout(() => location.reload(), 900);
            break;

        case '':
            break;

        default:
            appendLine(outContainer, `comando no reconocido: '${escapeHtml(cmd)}'. Escribe 'help' para ver la lista de comandos.`, 'error');
            break;
    }
}

let subCount = 0;
function spawnNewSubTerminal() {
    subCount++;
    const winId = 'subWin_' + subCount;
    const offX = (subCount * 40) % 220;
    const offY = (subCount * 40) % 130;
    createTerminalWindow(winId, `QUANTUM_SHELL #${subCount}`, `${990 + subCount}`, `top: calc(8vh + ${offY}px); left: calc(10vw + ${offX}px);`, false);
}

function createTerminalWindow(winId, title, pid, customStyle, isMainTerminal = false) {
    const container = document.getElementById('terminalContainer');
    const winDiv = document.createElement('div');
    winDiv.className = 'terminal-window spawning';
    winDiv.id = winId;
    if (customStyle) winDiv.style.cssText = customStyle;

    winDiv.innerHTML = `
        <div class="terminal-header">
            <div class="window-controls">
                <button class="control-btn btn-close" id="${winId}_close"></button>
                <button class="control-btn btn-minimize" id="${winId}_min"></button>
                <button class="control-btn btn-maximize" id="${winId}_max"></button>
            </div>
            <div class="terminal-title">
                <span>MUNCIX_OS</span> // ${title}
            </div>
            <div class="window-status">PID: ${pid}</div>
        </div>

        <div class="terminal-body" id="${winId}_body">
            <div class="output-line system">MUNCIX_SUPREME_QUANTUM_KERNEL [Versión 99.9 STABLE]</div>
            <div class="output-line system corrupted-text">Escribe 'help' para explorar el sistema o usa Ctrl+K.</div>
            <div class="output-line" style="margin-bottom: 10px;">--------------------------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt">muncix@quantum:/#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span>QUANTUM STATUS: 100% OPTIMAL / SECURE</span>
            <span>UTF-8 // 120 FPS</span>
        </div>
    `;

    container.appendChild(winDiv);

    setupWindowBehaviors(
        winDiv,
        winDiv.querySelector('.terminal-header'),
        document.getElementById(`${winId}_close`),
        document.getElementById(`${winId}_min`),
        document.getElementById(`${winId}_max`),
        isMainTerminal
    );

    setupTerminalInterface(
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

function showToast(message, type = 'info') {
    const container = document.getElementById('toastNotificationContainer');
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    
    let icon = '⚡';
    if (type === 'success') icon = '✔';
    if (type === 'warning') icon = '⚠';
    if (type === 'error') icon = '✖';

    toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toast-out 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => toast.remove(), 350);
    }, 3500);
}

// Paleta de comandos modal (Ctrl+K)
const paletteModal = document.getElementById('commandPaletteModal');
const paletteSearchInput = document.getElementById('paletteSearchInput');
const paletteResults = document.getElementById('paletteResults');

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        paletteModal.classList.toggle('hidden');
        if (!paletteModal.classList.contains('hidden')) {
            paletteSearchInput.focus();
        }
    } else if (e.key === 'Escape' && !paletteModal.classList.contains('hidden')) {
        paletteModal.classList.add('hidden');
    }
});

paletteModal.addEventListener('click', (e) => {
    if (e.target === paletteModal) paletteModal.classList.add('hidden');
});

paletteResults.addEventListener('click', (e) => {
    const item = e.target.closest('.palette-item');
    if (item) {
        const cmd = item.getAttribute('data-cmd');
        paletteModal.classList.add('hidden');
        const mainInput = document.getElementById('mainTerminal_input');
        if (mainInput) {
            mainInput.value = cmd;
            mainInput.focus();
            // Simular Enter
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            mainInput.dispatchEvent(event);
        }
    }
});

paletteSearchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const items = paletteResults.querySelectorAll('.palette-item');
    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
    });
});

/* ========================================================================== */
/* DOCK FLOTANTE EVENTOS                                                      */
/* ========================================================================== */

document.getElementById('dockBtnTerminal').addEventListener('click', () => spawnNewSubTerminal());
document.getElementById('dockBtnPalette').addEventListener('click', () => {
    paletteModal.classList.toggle('hidden');
    if (!paletteModal.classList.contains('hidden')) paletteSearchInput.focus();
});
document.getElementById('dockBtnAudio').addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    showToast(`Efectos de sonido: ${audioEnabled ? 'Activados' : 'Silenciados'}`, 'success');
});
document.getElementById('dockBtnMatrix').addEventListener('click', () => {
    matrixActive = !matrixActive;
    showToast(`Lluvia Matrix: ${matrixActive ? 'Activa' : 'Pausada'}`, 'info');
});
document.getElementById('dockBtnGlitch').addEventListener('click', () => {
    playGlitchSound();
    document.querySelectorAll('.terminal-window').forEach(w => {
        w.classList.add('glitch-active');
        setTimeout(() => w.classList.remove('glitch-active'), 500);
    });
    showToast("¡Anomalía global disparada!", "warning");
});
document.getElementById('dockBtnTheme').addEventListener('click', () => {
    const themes = ['', 'theme-cyan', 'theme-purple', 'theme-danger'];
    const currentThemeIndex = themes.findIndex(t => document.body.classList.contains(t));
    const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
    themes.forEach(t => { if(t) document.body.classList.remove(t); });
    if (nextTheme) document.body.classList.add(nextTheme);
    showToast(`Tema cambiado: ${nextTheme || 'Default'}`, 'success');
});
