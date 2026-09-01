let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playKeySound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400 + Math.random() * 400, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
    } catch(e) {}
}

function playEnterSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(250, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.09);
    } catch(e) {}
}

function playGlitchNoise() {
    try {
        initAudio();
        const bufferSize = audioCtx.sampleRate * 0.15;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.3 ? 1 : -1);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1200, audioCtx.currentTime);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
    } catch(e) {}
}

// SISTEMA DE CORRUPCIÓN DINÁMICA DE TEXTOS (HEX / BINARIO / GLITCH)
function corruptDynamicTexts() {
    const staticElements = document.querySelectorAll('.terminal-title, .window-status, .prompt, .terminal-footer-hint span');
    const backupData = [];

    staticElements.forEach(el => {
        if (!el.hasAttribute('data-original')) {
            el.setAttribute('data-original', el.innerText);
        }
        const original = el.getAttribute('data-original');
        backupData.push({ element: el, text: original });

        let corrupted = '';
        const charset = '01ABCDEF█▓▒░#@$%&<>_X';
        for (let i = 0; i < original.length; i++) {
            if (Math.random() < 0.45 && original[i] !== ' ') {
                corrupted += charset.charAt(Math.floor(Math.random() * charset.length));
            } else {
                corrupted += original[i];
            }
        }
        el.innerText = corrupted;
    });

    setTimeout(() => {
        backupData.forEach(item => {
            if (item.element && item.text) {
                item.element.innerText = item.text;
            }
        });
    }, 140);
}

// DISPARADOR DE GLITCHES ALEATORIOS (EVITA QUE SE SIENTA REPETITIVO)
function triggerRandomGlitch() {
    playGlitchNoise();

    const windows = document.querySelectorAll('.terminal-window');
    const glitchEffects = ['glitch-fx-1', 'glitch-fx-2', 'glitch-fx-3'];
    const chosenFx = glitchEffects[Math.floor(Math.random() * glitchEffects.length)];

    windows.forEach(win => {
        win.classList.add(chosenFx);
        setTimeout(() => {
            win.classList.remove(chosenFx);
        }, 160);
    });

    corruptDynamicTexts();

    // Efecto VHS tracking bar ocasional
    if (Math.random() > 0.4) {
        const vhs = document.getElementById('vhsTracking');
        if (vhs) {
            vhs.style.opacity = '1';
            vhs.style.top = '100vh';
            setTimeout(() => {
                vhs.style.opacity = '0';
                vhs.style.top = '-50px';
            }, 200);
        }
    }

    const flash = document.getElementById('corruptFlash');
    const screenOverlay = document.getElementById('screenGlitchOverlay');
    if (flash && screenOverlay) {
        flash.style.opacity = '1';
        screenOverlay.style.opacity = '1';
        setTimeout(() => {
            flash.style.opacity = '0';
            screenOverlay.style.opacity = '0';
        }, 120);
    }
}

function initBackgroundGlitchDaemon() {
    function scheduleNext() {
        const interval = 3500 + Math.random() * 4500;
        setTimeout(() => {
            triggerRandomGlitch();
            scheduleNext();
        }, interval);
    }
    scheduleNext();
}

// BOOT SCREEN REALISTA MEJORADO
const omegaBootLogs = [
    { text: "[BIOS] Initializing UEFI Subsystem & ACPI Tables...", status: "Loading ACPI..." },
    { text: "[CPU] Core #0 - #8 detected @ 8.6 GHz [QUANTUM ARCHITECTURE]", status: "Checking clocks..." },
    { text: "[MEM] Testing 65536MB ECC RAM -> 0-OK, 100% INTEGRITY", status: "Validating memory..." },
    { text: "[PCI] High-speed lane mapping complete. NVMe Controller active.", status: "Mounting storage..." },
    { text: "[KERNEL] Uncompressing OMEGA_VOID_KERNEL v15.0 into Ring 0...", status: "Injecting kernel..." },
    { text: "[SECURITY] Establishing hardware encryption handshake [AES-256-GCM]", status: "Securing firewall..." },
    { text: "[VFS] Mounting virtual file system tree on /dev/muncix/root...", status: "Mounting VFS..." },
    { text: "[DAEMON] Starting multi-glitch procedural rendering engine...", status: "Spawning daemons..." },
    { text: "[NET] Connecting to secure proxy node via wss://void.socket...", status: "Handshaking TCP..." },
    { text: "[READY] All systems nominal. Launching OMEGA interface...", status: "BOOT SEQUENCE COMPLETE." }
];

const bootLogEl = document.getElementById('bootLog');
const bootProgressBar = document.getElementById('bootProgressBar');
const bootFooterStatus = document.getElementById('bootFooterStatus');
const bootScreen = document.getElementById('bootScreen');
let bootIdx = 0;

function runOmegaBoot() {
    if (bootIdx < omegaBootLogs.length) {
        const log = omegaBootLogs[bootIdx];
        bootLogEl.innerText += "\n" + log.text;
        bootFooterStatus.innerText = "STATUS: " + log.status;
        
        const pct = Math.round(((bootIdx + 1) / omegaBootLogs.length) * 100);
        bootProgressBar.style.width = pct + '%';

        bootIdx++;
        playKeySound();
        setTimeout(runOmegaBoot, 90 + Math.random() * 90);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            playEnterSound();
            setTimeout(() => {
                bootScreen.remove();
                initMatrixRain();
                initBackgroundGlitchDaemon();
                createTerminalWindow('mainTerminal', 'MUNCIX_OS // OMEGA_CORE [ONLINE]', '909', true, null);
            }, 400);
        }, 300);
    }
}

window.addEventListener('load', () => {
    setTimeout(runOmegaBoot, 200);
});

// SISTEMA DE ARCHIVOS VIRTUAL INTERACTIVO (FS)
const virtualFileSystem = {
    "/": { type: "dir", contents: ["home", "sys", "bin", "readme.txt"] },
    "/home": { type: "dir", contents: ["muncix_op", "projects"] },
    "/home/muncix_op": { type: "dir", contents: ["bio.txt", "secrets.dat"] },
    "/home/projects": { type: "dir", contents: ["jjs_skills.txt", "desmos_synth.txt", "blockbench_model.txt"] },
    "/sys": { type: "dir", contents: ["kernel_info", "memory_map", "daemons"] },
    "/bin": { type: "dir", contents: ["help", "clear", "window", "socials", "neofetch", "matrix", "reboot", "cat", "ls", "cd"] },
    "/readme.txt": { type: "file", content: "Bienvenido a MUNCIX_OS v15.0 OMEGA. Explora el sistema usando comandos de terminal estándar como 'ls', 'cd', 'cat', o escribe 'help'." },
    "/home/muncix_op/bio.txt": { type: "file", content: "Usuario: Muncix_Op\nEspecialidad: Desarrollo Roblox (Jujutsu Shenanigans), Blockbench 3D, Matemáticas creativas (Desmos) y Ciberseguridad." },
    "/home/muncix_op/secrets.dat": { type: "file", content: "[CLASSIFIED] Acceso restringido por protocolo de seguridad neural. Usa 'socials' para verificar credenciales." },
    "/home/projects/jjs_skills.txt": { type: "file", content: "Proyecto Skill Builder: Configuración de habilidades custom para Jujutsu Shenanigans (Yuta Okkotsu movesets)." },
    "/home/projects/desmos_synth.txt": { type: "file", content: "Sintetizador de audio y gráficos matemáticos inspirados en 'Are We Still Friends?' (Tyler, The Creator)." },
    "/home/projects/blockbench_model.txt": { type: "file", content: "Modelado 3D de alta precisión optimizado en la última versión de escritorio de Blockbench." }
};

const terminalStateSessions = {};

function setupWindowBehaviors(winEl, headerEl, closeBtn, minBtn, maxBtn, windowId) {
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

    headerEl.addEventListener('touchstart', (e) => {
        if (e.target.closest('.window-controls')) return;
        if (winEl.classList.contains('maximized')) return;
        initPosition();
        isDragging = true;
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
        initialLeft = parseFloat(winEl.style.left);
        initialTop = parseFloat(winEl.style.top);
        bringToFront(winEl);
        document.addEventListener('touchmove', onTouchMove, {passive: false});
        document.addEventListener('touchend', onTouchEnd);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        winEl.style.left = (initialLeft + (e.clientX - startX)) + 'px';
        winEl.style.top = (initialTop + (e.clientY - startY)) + 'px';
    }
    function onTouchMove(e) {
        if (!isDragging) return;
        const t = e.touches[0];
        winEl.style.left = (initialLeft + (t.clientX - startX)) + 'px';
        winEl.style.top = (initialTop + (t.clientY - startY)) + 'px';
        e.preventDefault();
    }
    function onMouseUp() { isDragging = false; document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); }
    function onTouchEnd() { isDragging = false; document.removeEventListener('touchmove', onTouchMove); document.removeEventListener('touchend', onTouchEnd); }

    closeBtn.addEventListener('click', () => {
        triggerRandomGlitch();
        winEl.remove();
    });

    let isMin = false;
    const bodyEl = winEl.querySelector('.terminal-body');
    const footerEl = winEl.querySelector('.terminal-footer-hint');

    minBtn.addEventListener('click', () => {
        playKeySound();
        isMin = !isMin;
        winEl.classList.toggle('minimized', isMin);
        if(bodyEl) bodyEl.style.display = isMin ? 'none' : 'block';
        if(footerEl) footerEl.style.display = isMin ? 'none' : 'flex';
    });

    maxBtn.addEventListener('click', () => {
        playKeySound();
        winEl.classList.toggle('maximized');
        if (!winEl.classList.contains('maximized')) initPosition();
    });

    winEl.addEventListener('mousedown', () => bringToFront(winEl));
    winEl.addEventListener('touchstart', () => bringToFront(winEl));
}

let topZ = 10;
function bringToFront(winEl) {
    topZ++;
    winEl.style.zIndex = topZ;
}

function setupTerminalInterface(inputEl, outputContainerEl, bodyEl, winId) {
    let history = [];
    let historyIdx = -1;

    terminalStateSessions[winId] = { cwd: "/", authStep: 0 };

    inputEl.addEventListener('input', () => {
        playKeySound();
        triggerRandomGlitch();
        const win = inputEl.closest('.terminal-window');
        if (win) {
            win.classList.add('typing-shake-fx');
            setTimeout(() => win.classList.remove('typing-shake-fx'), 100);
        }
    });

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
                handleAuthFlow(val, outputContainerEl, session, winId);
                inputEl.value = '';
                return;
            }

            appendLine(outputContainerEl, `<span style="color: var(--danger-neon);">muncix@omega:${session.cwd}#</span> ${escapeHtml(val)}`, '');
            processCommand(val, outputContainerEl, bodyEl, winId, session);
            inputEl.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIdx > 0) {
                historyIdx--;
                inputEl.value = history[historyIdx];
                playKeySound();
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIdx < history.length - 1) {
                historyIdx++;
                inputEl.value = history[historyIdx];
                playKeySound();
            } else {
                historyIdx = history.length;
                inputEl.value = '';
            }
            e.preventDefault();
        }
    });

    bodyEl.addEventListener('click', () => inputEl.focus());
}

function handleAuthFlow(val, outContainer, session, winId) {
    appendLine(outContainer, `<span style="color: var(--cyan-neon);">auth@secure:~#</span> ${escapeHtml(val || '[BYPASS]')}`, '');

    if (session.authStep === 1) {
        session.authStep = 2;
        triggerRandomGlitch();
        appendLine(outContainer, "[+] FASE 1: Token neural verificado correctamente.", "success");
        appendLine(outContainer, "[?] FASE 2/3: Ingrese la clave maestra de descifrado (o presione ENTER):", "warning");
    } else if (session.authStep === 2) {
        session.authStep = 3;
        triggerRandomGlitch();
        appendLine(outContainer, "[+] FASE 2: Clave maestra aceptada. Desbloqueando canales...", "success");
        appendLine(outContainer, "[?] FASE 3/3: Escriba 'CONFIRMAR' para revelar las redes oficiales de Muncix_Op:", "warning");
    } else if (session.authStep === 3) {
        session.authStep = 0;
        triggerRandomGlitch();
        appendLine(outContainer, "[✔] ACCESO TOTAL CONCEDIDO: Canales seguros descifrados.", "success");
        appendLine(outContainer, `
            <div class="social-card">
                <span>TikTok (@muncixop)</span>
                <span class="action-link" onclick="window.open('https://www.tiktok.com/@muncixop', '_blank')">[ABRIR_LINK]</span>
            </div>
            <div class="social-card">
                <span>X / Twitter (@MuncixOp)</span>
                <span class="action-link" onclick="window.open('https://x.com/MuncixOp', '_blank')">[ABRIR_LINK]</span>
            </div>
            <div class="social-card">
                <span>CurseForge Projects</span>
                <span class="action-link" onclick="window.open('https://www.curseforge.com/members/muncixop/projects', '_blank')">[ABRIR_LINK]</span>
            </div>
        `, '');
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

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function initMatrixRain() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'MUNCIX_OP0123456789ABCDEF@#$%&█▓▒░CORRUPT';
    const fontSize = 13;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(0, 2, 5, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'var(--danger-neon)';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) drops[i] = 0;
            drops[i]++;
        }
    }, 28);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// PROCESAMIENTO DE COMANDOS AVANZADOS CON SOPORTE DE ARCHIVOS
function processCommand(rawCmd, outContainer, bodyEl, winId, session) {
    const parts = rawCmd.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Comandos disponibles en MUNCIX_OS OMEGA:
  help      - Muestra esta guía de comandos
  ls        - Lista archivos y directorios del directorio actual
  cd <dir>  - Cambia de directorio virtual
  cat <file>- Muestra el contenido de un archivo
  neofetch  - Información del sistema y entorno operativo
  matrix    - Activa una ráfaga visual estroboscópica Matrix
  window    - Abre una subterminal interactiva adicional
  socials   - Inicia protocolo de autenticación para redes oficiales
  clear     - Limpia la pantalla de la consola
  reboot    - Reinicia el kernel del sistema`, 'system');
            break;

        case 'ls':
            const currentDir = virtualFileSystem[session.cwd];
            if (currentDir && currentDir.contents) {
                appendLine(outContainer, currentDir.contents.join('   '), 'success');
            } else {
                appendLine(outContainer, "Error: directorio no válido.", "error");
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
            // Actualizar prompt visual en la terminal activa
            const promptEl = bodyEl.closest('.terminal-window').querySelector('.prompt');
            if (promptEl) promptEl.innerText = `muncix@omega:${session.cwd}#`;
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
                appendLine(outContainer, `cat: ${arg}: No se encuentra el archivo`, 'error');
            }
            break;

        case 'neofetch':
            appendLine(outContainer, `
       /\\       <span style="color:var(--danger-neon);">muncix@omega-kernel</span>
      /  \\      ---------------------
     / /\\ \\     OS: MUNCIX_OS v15.0 OMEGA x86_64
    / /__\\ \\    Kernel: Linux Quantum 8.6.0-glitch
   / /----\\ \\   Uptime: 42 hours, 13 mins
  /_/      \\_\\  Shell: omega-sh 5.2
                Theme: Cyberpunk Neon / Red Danger
                Browser Compatibility: Universal / Opera GX Optimized`, 'system');
            break;

        case 'matrix':
            triggerRandomGlitch();
            appendLine(outContainer, "[✔] Ráfaga Matrix inyectada en el DOM con éxito.", "success");
            break;

        case 'clear':
            outContainer.innerHTML = '';
            break;

        case 'window':
            spawnNewSubTerminal();
            appendLine(outContainer, "Nueva subterminal enlazada correctamente.", "success");
            break;

        case 'socials':
            triggerRandomGlitch();
            session.authStep = 1;
            appendLine(outContainer, "[!] PROTOCOLO DE SEGURIDAD: Iniciando autenticación para redes de Muncix_Op.", "error");
            appendLine(outContainer, "[?] FASE 1/3: Ingrese su token o ID (ej: 'muncix_token'):", "warning");
            break;

        case 'reboot':
            appendLine(outContainer, "Reiniciando núcleo cuántico de emergencia...", "error");
            setTimeout(() => location.reload(), 1000);
            break;

        case '':
            break;

        default:
            triggerRandomGlitch();
            appendLine(outContainer, `comando no reconocido: '${escapeHtml(cmd)}'. Escribe 'help' para ver los comandos.`, 'error');
            break;
    }
}

let subCount = 0;
function spawnNewSubTerminal() {
    subCount++;
    const winId = 'subWin_' + subCount;
    const offX = (subCount * 30) % 160;
    const offY = (subCount * 30) % 100;
    createTerminalWindow(winId, `SUB_SHELL #${subCount}`, `${900 + subCount}`, `calc(18vh + ${offY}px); left: calc(20vw + ${offX}px);`);
}

function createTerminalWindow(winId, title, pid, customStyle) {
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
            <div class="terminal-title" data-original="${title}">
                <span>MUNCIX_OS</span> // ${title}
            </div>
            <div class="window-status" data-original="PID: ${pid}">PID: ${pid}</div>
        </div>

        <div class="terminal-body" id="${winId}_body">
            <div class="output-line system">MUNCIX_KERNEL [Versión 15.0 OMEGA - ULTRA COMPATIBLE]</div>
            <div class="output-line system">Escribe 'help' para ver los comandos disponibles o 'socials' para verificar enlaces.</div>
            <div class="output-line" style="margin-bottom: 8px;">----------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt" data-original="muncix@omega:/#">muncix@omega:/#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span data-original="DAEMON: MULTI-GLITCH ENGINE ACTIVE">DAEMON: MULTI-GLITCH ENGINE ACTIVE</span>
            <span>UTF-8</span>
        </div>
    `;

    container.appendChild(winDiv);

    setupWindowBehaviors(
        winDiv,
        winDiv.querySelector('.terminal-header'),
        document.getElementById(`${winId}_close`),
        document.getElementById(`${winId}_min`),
        document.getElementById(`${winId}_max`),
        winId
    );

    setupTerminalInterface(
        document.getElementById(`${winId}_input`),
        document.getElementById(`${winId}_output`),
        document.getElementById(`${winId}_body`),
        winId
    );

    document.getElementById(`${winId}_input`).focus();
}
