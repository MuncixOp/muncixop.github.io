let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Sonido de tecleo ultra sutil y suave
function playKeySound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.005, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.015);
    } catch(e) {}
}

function playEnterSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
    } catch(e) {}
}

// Sonido de glitch más armónico, profundo y menos estridente
function playGlitchSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    } catch(e) {}
}

// Secuencia de booteo limpia
const voidBootLogs = [
    { text: "[BIOS] Initializing UEFI Subsystem & Quantum ACPI Core...", status: "Loading ACPI..." },
    { text: "[CPU] Core #0 - #16 detected @ 9.8 GHz [HYPERCORE ARCHITECTURE]", status: "Checking clocks..." },
    { text: "[MEM] Initializing 262144MB ECC RAM -> 0x00000 - 0xFFFFF [OK]", status: "Validating memory..." },
    { text: "[PCI] High-speed PCIe Gen 5 lanes mapped. Secure bus active.", status: "Mounting storage..." },
    { text: "[KERNEL] Uncompressing HYPER_VOID_KERNEL v25.0 into Ring 0...", status: "Injecting kernel..." },
    { text: "[READY] All systems nominal. Launching interface...", status: "BOOT SEQUENCE COMPLETE." }
];

const bootLogEl = document.getElementById('bootLog');
const bootProgressBar = document.getElementById('bootProgressBar');
const bootFooterStatus = document.getElementById('bootFooterStatus');
const bootScreen = document.getElementById('bootScreen');
let bootIdx = 0;

function runVoidBoot() {
    if (bootIdx < voidBootLogs.length) {
        const log = voidBootLogs[bootIdx];
        bootLogEl.innerText += "\n" + log.text;
        bootFooterStatus.innerText = "STATUS: " + log.status;
        
        const pct = Math.round(((bootIdx + 1) / voidBootLogs.length) * 100);
        bootProgressBar.style.width = pct + '%';

        bootIdx++;
        setTimeout(runVoidBoot, 120);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            setTimeout(() => {
                bootScreen.remove();
                initMatrixRain();
                createTerminalWindow('mainTerminal', 'MUNCIX_OS // HYPER_VOID [ONLINE]', '202', true, true);
            }, 350);
        }, 200);
    }
}

window.addEventListener('load', () => {
    setTimeout(runVoidBoot, 150);
});

// Sistema de archivos virtual
const virtualFileSystem = {
    "/": { type: "dir", contents: ["home", "sys", "bin", "readme.txt", "system.conf"] },
    "/home": { type: "dir", contents: ["muncix_op", "developer", "guest"] },
    "/home/muncix_op": { type: "dir", contents: ["bio.txt", "secrets.dat", "socials.log"] },
    "/home/developer": { type: "dir", contents: ["roblox_jjs_yuta.lua", "blockbench_model.json"] },
    "/home/guest": { type: "dir", contents: ["welcome_guest.txt"] },
    "/sys": { type: "dir", contents: ["kernel_info", "memory_map"] },
    "/bin": { type: "dir", contents: ["help", "ls", "cd", "cat", "clear", "window", "ping", "nmap", "socials", "sysinfo", "date", "whoami", "reboot"] },
    "/readme.txt": { type: "file", content: "MUNCIX_OS v25.0 HYPER_VOID. Versión estable optimizada para una experiencia fluida y segura." },
    "/system.conf": { type: "file", content: "CORE_ENGINE=HYPER_VOID\nDEBUG_MODE=FALSE\nSAFETY_MODE=ENABLED\nGLITCH_INTENSITY=CALM" },
    "/home/muncix_op/bio.txt": { type: "file", content: "Desarrollador: Muncix_Op\nÁreas: Roblox Studio (Jujutsu Shenanigans), Blockbench 3D, Desmos." },
    "/home/muncix_op/socials.log": { type: "file", content: "TikTok: @muncixop\nX / Twitter: @MuncixOp\nCurseForge: muncixop" },
    "/home/developer/roblox_jjs_yuta.lua": { type: "file", content: "-- Jujutsu Shenanigans: Custom Yuta Okkotsu moveset script" },
    "/home/developer/blockbench_model.json": { type: "file", content: "{\"model_name\": \"Muncix_CyberWeapon\", \"format_version\": \"1.10\"}" },
    "/home/guest/welcome_guest.txt": { type: "file", content: "Hola invitado. Escribe 'help' para ver la lista de comandos disponibles." }
};

const terminalStateSessions = {};

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

    // Cierre protegido con glitch estético y calmado
    closeBtn.addEventListener('click', () => {
        if (isMainTerminal) {
            playGlitchSound();
            winEl.classList.add('glitch-active');
            
            const outputEl = winEl.querySelector('[id$="_output"]');
            if (outputEl) {
                appendLine(outputEl, "[~] KERNEL WATCHDOG: El proceso principal permanece protegido de forma segura.", "warning");
            }

            setTimeout(() => {
                winEl.classList.remove('glitch-active');
            }, 350);
        } else {
            winEl.remove();
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

let topZ = 15;
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
                handleAuthFlow(val, outputContainerEl, session);
                inputEl.value = '';
                return;
            }

            appendLine(outputContainerEl, `<span style="color: var(--danger-neon);">muncix@void:${session.cwd}#</span> ${escapeHtml(val)}`, '');
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
    appendLine(outContainer, `<span style="color: var(--cyan-neon);">auth@void:~#</span> ${escapeHtml(val || '[BYPASS]')}`, '');

    if (session.authStep === 1) {
        session.authStep = 2;
        appendLine(outContainer, "[+] FASE 1: Token verificado con éxito.", "success");
        appendLine(outContainer, "[?] FASE 2/2: Escriba 'CONFIRMAR' para revelar las redes oficiales de Muncix_Op:", "warning");
    } else if (session.authStep === 2) {
        session.authStep = 0;
        appendLine(outContainer, "[✔] ACCESO CONCEDIDO: Canales seguros descifrados.", "success");
        appendLine(outContainer, `
            <div class="social-card">
                <span>TikTok (@muncixop)</span>
                <span class="action-link" onclick="window.open('https://www.tiktok.com/@muncixop', '_blank')">[ABRIR]</span>
            </div>
            <div class="social-card">
                <span>X / Twitter (@MuncixOp)</span>
                <span class="action-link" onclick="window.open('https://x.com/MuncixOp', '_blank')">[ABRIR]</span>
            </div>
            <div class="social-card">
                <span>CurseForge Projects</span>
                <span class="action-link" onclick="window.open('https://www.curseforge.com/members/muncixop/projects', '_blank')">[ABRIR]</span>
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
    const chars = '0123456789ABCDEF';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(0, 1, 2, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 255, 102, 0.35)';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) drops[i] = 0;
            drops[i]++;
        }
    }, 40);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function processCommand(rawCmd, outContainer, bodyEl, winId, session) {
    const parts = rawCmd.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Comandos disponibles en MUNCIX_OS:
  ls           - Lista los archivos del directorio actual
  cd <dir>     - Cambia de directorio virtual
  cat <file>   - Visualiza el contenido de un archivo
  ping <host>  - Simula envío de paquetes ICMP
  sysinfo      - Información detallada del sistema
  whoami       - Muestra el usuario activo
  date         - Muestra la marca temporal
  socials      - Muestra las redes oficiales de Muncix_Op
  clear        - Limpia la pantalla
  window       - Abre una subterminal adicional
  reboot       - Reinicia el sistema`, 'system');
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
            const promptEl = bodyEl.closest('.terminal-window').querySelector('.prompt');
            if (promptEl) promptEl.innerText = `muncix@void:${session.cwd}#`;
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

        case 'ping':
            const targetHost = arg || 'void.hyper.node';
            appendLine(outContainer, `PING ${targetHost} (127.0.0.1) 56 bytes of data.`, 'system');
            let pings = 0;
            const pingInterval = setInterval(() => {
                pings++;
                const time = (Math.random() * 2 + 0.5).toFixed(2);
                appendLine(outContainer, `64 bytes from ${targetHost}: icmp_seq=${pings} time=${time} ms`, 'success');
                if (pings >= 4) clearInterval(pingInterval);
            }, 350);
            break;

        case 'sysinfo':
            appendLine(outContainer, `OS: MUNCIX_OS v25.0 | Kernel: Linux Quantum | Arch: x86_64 | Status: Stable`, 'system');
            break;

        case 'whoami':
            appendLine(outContainer, `muncix_op (UID: 0 [ROOT])`, 'success');
            break;

        case 'date':
            appendLine(outContainer, `Wed Sep 2 07:53:45 UTC 2026`, 'system');
            break;

        case 'clear':
            outContainer.innerHTML = '';
            break;

        case 'window':
            spawnNewSubTerminal();
            appendLine(outContainer, "Nueva subterminal abierta.", "success");
            break;

        case 'socials':
            session.authStep = 1;
            appendLine(outContainer, "[!] VERIFICACIÓN DE SEGURIDAD: Para acceder al canal seguro,", "warning");
            appendLine(outContainer, "[?] Ingrese cualquier valor o presione ENTER para continuar:", "warning");
            break;

        case 'reboot':
            appendLine(outContainer, "Reiniciando sistema...", "error");
            setTimeout(() => location.reload(), 800);
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
    const offX = (subCount * 30) % 180;
    const offY = (subCount * 30) % 100;
    createTerminalWindow(winId, `SUB_SHELL #${subCount}`, `${980 + subCount}`, `top: calc(12vh + ${offY}px); left: calc(15vw + ${offX}px);`, false);
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
            <div class="output-line system">MUNCIX_KERNEL [Versión 25.0 STABLE]</div>
            <div class="output-line system corrupted-text">Escribe 'help' para ver los comandos disponibles.</div>
            <div class="output-line" style="margin-bottom: 8px;">----------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt">muncix@void:/#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span>SYSTEM STATUS: STABLE / NOMINAL</span>
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
