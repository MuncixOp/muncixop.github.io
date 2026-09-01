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
        osc.frequency.setValueAtTime(480 + Math.random() * 420, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.022);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.022);
    } catch(e) {}
}

function playEnterSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.075);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    } catch(e) {}
}

function playGlitchNoise() {
    try {
        initAudio();
        const bufferSize = audioCtx.sampleRate * 0.15;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.28 ? 1 : -1);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1600, audioCtx.currentTime);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.22, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
    } catch(e) {}
}

// CORRUPCIÓN DINÁMICA DE TEXTOS EN INTERFAZ
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
            if (Math.random() < 0.48 && original[i] !== ' ') {
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
    }, 120);
}

// DISPARADOR DE GLITCHES ALEATORIOS MÚLTIPLES
function triggerRandomGlitch() {
    playGlitchNoise();

    const windows = document.querySelectorAll('.terminal-window');
    const effects = ['void-fx-1', 'void-fx-2', 'void-fx-3'];
    const chosenFx = effects[Math.floor(Math.random() * effects.length)];

    windows.forEach(win => {
        win.classList.add(chosenFx);
        setTimeout(() => win.classList.remove(chosenFx), 140);
    });

    corruptDynamicTexts();

    if (Math.random() > 0.3) {
        const vhs = document.getElementById('vhsTracking');
        if (vhs) {
            vhs.style.opacity = '1';
            vhs.style.top = '100vh';
            setTimeout(() => {
                vhs.style.opacity = '0';
                vhs.style.top = '-60px';
            }, 160);
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
        }, 100);
    }
}

function initGlitchDaemon() {
    function schedule() {
        const interval = 2800 + Math.random() * 3800;
        setTimeout(() => {
            triggerRandomGlitch();
            schedule();
        }, interval);
    }
    schedule();
}

// SECUENCIA DE BOOT COMPLETA
const voidBootLogs = [
    { text: "[BIOS] Initializing UEFI Subsystem & Quantum ACPI Core...", status: "Loading ACPI..." },
    { text: "[CPU] Core #0 - #16 detected @ 9.8 GHz [HYPERCORE ARCHITECTURE]", status: "Checking clocks..." },
    { text: "[MEM] Initializing 262144MB ECC RAM -> 0x00000 - 0xFFFFF [OK]", status: "Validating memory..." },
    { text: "[PCI] High-speed PCIe Gen 5 lanes mapped. Secure bus active.", status: "Mounting storage..." },
    { text: "[KERNEL] Uncompressing HYPER_VOID_KERNEL v25.0 into Ring 0...", status: "Injecting kernel..." },
    { text: "[SECURITY] Establishing biometrics & AES-256 neural handshake...", status: "Securing firewall..." },
    { text: "[VFS] Mounting virtual file system tree on /dev/void/root...", status: "Mounting VFS..." },
    { text: "[DAEMON] Starting multi-glitch procedural rendering engine...", status: "Spawning daemons..." },
    { text: "[NET] Opening secure websocket tunnel to void.hyper.node...", status: "Handshaking TCP..." },
    { text: "[READY] All systems nominal. Launching HYPER_VOID interface...", status: "BOOT SEQUENCE COMPLETE." }
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
        playKeySound();
        setTimeout(runVoidBoot, 65 + Math.random() * 65);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            playEnterSound();
            setTimeout(() => {
                bootScreen.remove();
                initMatrixRain();
                initGlitchDaemon();
                createTerminalWindow('mainTerminal', 'MUNCIX_OS // HYPER_VOID [ONLINE]', '202', true, null);
            }, 350);
        }, 250);
    }
}

window.addEventListener('load', () => {
    setTimeout(runVoidBoot, 200);
});

// SISTEMA DE ARCHIVOS VIRTUAL INTEGRAL
const virtualFileSystem = {
    "/": { type: "dir", contents: ["home", "sys", "bin", "readme.txt", "system.conf", "kernel_core.asm"] },
    "/home": { type: "dir", contents: ["muncix_op", "developer", "guest"] },
    "/home/muncix_op": { type: "dir", contents: ["bio.txt", "secrets.dat", "socials.log"] },
    "/home/developer": { type: "dir", contents: ["roblox_jjs_yuta.lua", "blockbench_model.json", "desmos_synth_audio.js"] },
    "/home/guest": { type: "dir", contents: ["welcome_guest.txt"] },
    "/sys": { type: "dir", contents: ["kernel_info", "memory_map", "network_interfaces", "daemons", "entropy_pool"] },
    "/bin": { type: "dir", contents: ["help", "ls", "cd", "cat", "clear", "window", "ping", "nmap", "traceroute", "crypto", "matrix", "matrix_speed", "socials", "sysinfo", "date", "whoami", "reboot"] },
    "/readme.txt": { type: "file", content: "MUNCIX_OS v25.0 HYPER_VOID. El sistema operativo web simulado definitivo optimizado para máxima compatibilidad con dispositivos y navegadores." },
    "/system.conf": { type: "file", content: "CORE_ENGINE=HYPER_VOID\nDEBUG_MODE=FALSE\nMAX_WINDOWS=UNLIMITED\nENCRYPTION_LEVEL=QUANTUM-256" },
    "/kernel_core.asm": { type: "file", content: "SECTION .text\nGLOBAL _start\n_start:\n    mov rax, 1\n    mov rdi, 1\n    syscall" },
    "/home/muncix_op/bio.txt": { type: "file", content: "Desarrollador: Muncix_Op\nÁreas: Roblox Studio (Jujutsu Shenanigans), Blockbench 3D, Desmos Mathematical Art y Arquitectura Web Ciberpunk." },
    "/home/muncix_op/secrets.dat": { type: "file", content: "[CLASSIFIED] ZONA RESTRINGIDA. Utiliza el comando 'socials' para verificar las credenciales seguras." },
    "/home/muncix_op/socials.log": { type: "file", content: "TikTok: @muncixop\nX / Twitter: @MuncixOp\nCurseForge: muncixop" },
    "/home/developer/roblox_jjs_yuta.lua": { type: "file", content: "-- Jujutsu Shenanigans: Custom Yuta Okkotsu moveset script\nlocal module = {}\nmodule.SummonRika = function() print('Rika active!') end\nreturn module" },
    "/home/developer/blockbench_model.json": { type: "file", content: "{\"model_name\": \"Muncix_CyberWeapon\", \"format_version\": \"1.10\", \"textures\": {\"0\": \"neon_glow\"}}" },
    "/home/developer/desmos_synth_audio.js": { type: "file", content: "// Ecuaciones paramétricas de audio y visuales inspiradas en Tyler, The Creator." },
    "/home/guest/welcome_guest.txt": { type: "file", content: "Hola invitado. Tienes acceso completo a la terminal. Prueba escribir 'help' o 'neofetch'." }
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
        triggerRandomGlitch();
        const win = inputEl.closest('.terminal-window');
        if (win) {
            win.classList.add('typing-shake-fx');
            setTimeout(() => win.classList.remove('typing-shake-fx'), 80);
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

            appendLine(outputContainerEl, `<span style="color: var(--danger-neon);">muncix@void:${session.cwd}#</span> ${escapeHtml(val)}`, '');
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
    appendLine(outContainer, `<span style="color: var(--cyan-neon);">auth@void:~#</span> ${escapeHtml(val || '[BYPASS]')}`, '');

    if (session.authStep === 1) {
        session.authStep = 2;
        triggerRandomGlitch();
        appendLine(outContainer, "[+] FASE 1: Token neural verificado con éxito.", "success");
        appendLine(outContainer, "[?] FASE 2/3: Ingrese la clave de descifrado maestro (o presione ENTER):", "warning");
    } else if (session.authStep === 2) {
        session.authStep = 3;
        triggerRandomGlitch();
        appendLine(outContainer, "[+] FASE 2: Clave maestra aceptada. Desbloqueando bases de datos...", "success");
        appendLine(outContainer, "[?] FASE 3/3: Escriba 'CONFIRMAR' para revelar las redes oficiales de Muncix_Op:", "warning");
    } else if (session.authStep === 3) {
        session.authStep = 0;
        triggerRandomGlitch();
        appendLine(outContainer, "[✔] ACCESO TOTAL CONCEDIDO: Canales seguros descifrados.", "success");
        appendLine(outContainer, `
            <div class="social-card">
                <span>TikTok (@muncixop)</span>
                <span class="action-link" onclick="window.open('https://www.tiktok.com/@muncixop', '_blank')">[ABRIR_RED_SOCIAL]</span>
            </div>
            <div class="social-card">
                <span>X / Twitter (@MuncixOp)</span>
                <span class="action-link" onclick="window.open('https://x.com/MuncixOp', '_blank')">[ABRIR_RED_SOCIAL]</span>
            </div>
            <div class="social-card">
                <span>CurseForge Projects</span>
                <span class="action-link" onclick="window.open('https://www.curseforge.com/members/muncixop/projects', '_blank')">[ABRIR_RED_SOCIAL]</span>
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
    const chars = 'MUNCIX_OP0123456789ABCDEF@#$%&█▓▒░VOID';
    const fontSize = 13;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(0, 1, 2, 0.13)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'var(--primary-neon)';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.955) drops[i] = 0;
            drops[i]++;
        }
    }, 25);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// PROCESADOR DE COMANDOS MASIVO COMPLETO
function processCommand(rawCmd, outContainer, bodyEl, winId, session) {
    const parts = rawCmd.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Comandos disponibles en MUNCIX_OS HYPER_VOID:
  -- Gestión de Archivos --
  ls           - Lista los archivos del directorio actual
  cd <dir>     - Cambia de directorio virtual
  cat <file>   - Visualiza el contenido de un archivo

  -- Red y Ciberseguridad --
  ping <host>  - Simula envío de paquetes ICMP a servidores remotos
  nmap <ip>    - Escanea puertos abiertos en nodos virtuales
  traceroute   - Roruta paquetes a través de pasarelas cuánticas
  crypto       - Muestra cotizaciones y hashes de criptomonedas

  -- Sistema y Utilidades --
  sysinfo      - Información detallada del hardware y sistema
  whoami       - Muestra el usuario activo actual
  date         - Muestra la marca temporal del sistema cuánitco
  neofetch     - Resumen estético del entorno operativo
  matrix       - Activa una ráfaga estroboscópica Matrix
  matrix_speed - Modifica la frecuencia del flujo de datos
  socials      - Proceso de autenticación para redes de Muncix_Op
  clear        - Limpia la pantalla de la consola
  window       - Abre una subterminal interactiva adicional
  reboot       - Reinicia el kernel del sistema`, 'system');
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
            appendLine(outContainer, `PING ${targetHost} (127.0.0.1) 56(84) bytes of data.`, 'system');
            let pings = 0;
            const pingInterval = setInterval(() => {
                pings++;
                const time = (Math.random() * 3.5 + 0.9).toFixed(2);
                appendLine(outContainer, `64 bytes from ${targetHost}: icmp_seq=${pings} ttl=128 time=${time} ms`, 'success');
                if (pings >= 4) clearInterval(pingInterval);
            }, 300);
            break;

        case 'nmap':
            appendLine(outContainer, `Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-01 03:33 UTC`, 'system');
            appendLine(outContainer, `Scanning target node [10.0.0.99]...`, 'warning');
            setTimeout(() => {
                appendLine(outContainer, `PORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n3306/tcp open  mysql\n9090/tcp open  quantum-void`, 'success');
            }, 500);
            break;

        case 'traceroute':
            appendLine(outContainer, `traceroute to void.hyper.node (192.168.1.254), 30 hops max`, 'system');
            setTimeout(() => appendLine(outContainer, ` 1  gateway.local (192.168.1.1)  0.312 ms  0.289 ms`, 'success'), 180);
            setTimeout(() => appendLine(outContainer, ` 2  node-hyper-gamma.net (10.20.15.2)  2.410 ms`, 'success'), 380);
            setTimeout(() => appendLine(outContainer, ` 3  hyper-void-core.node (172.16.0.255)  1.420 ms [SECURE]`, 'purple'), 600);
            break;

        case 'crypto':
            appendLine(outContainer, `[+] COTIZACIONES DEL MERCADO NEURAL CUÁNTICO:`, 'purple');
            appendLine(outContainer, `> HYPER_COIN (HPC): $9,840.12 (+21.4%)\n> MUNC_TOKEN (MNC): $145.80 (+12.3%)\n> SOLANA (SOL): $210.50 (+3.2%)`, 'success');
            break;

        case 'sysinfo':
            appendLine(outContainer, `[SYSINFO] OS: MUNCIX_OS v25.0 HYPER_VOID | Kernel: Linux Quantum 9.8.0-void | Arch: x86_64 | Memory: 262144MB`, 'system');
            break;

        case 'whoami':
            appendLine(outContainer, `muncix_op (UID: 0 [ROOT])`, 'success');
            break;

        case 'date':
            appendLine(outContainer, `Tue Sep 1 03:33:00 UTC 2026`, 'system');
            break;

        case 'neofetch':
            appendLine(outContainer, `
       /\\       <span style="color:var(--danger-neon);">muncix@hyper-void</span>
      /  \\      -----------------------
     / /\\ \\     OS: MUNCIX_OS v25.0 HYPER_VOID
    / /__\\ \\    Kernel: Linux Quantum 9.8.0-void
   / /----\\ \\   Uptime: 140 hours, 12 mins
  /_/      \\_\\  Shell: void-sh 7.1
                Theme: Cyberpunk Neon / Crimson Red
                Compatibility: Universal / Opera GX / Chrome / Safari`, 'system');
            break;

        case 'matrix':
            triggerRandomGlitch();
            appendLine(outContainer, "[✔] Ráfaga estroboscópica Matrix ejecutada con éxito.", "success");
            break;

        case 'matrix_speed':
            appendLine(outContainer, "[✔] Frecuencia del canvas actualizada al nivel máximo.", "success");
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
            appendLine(outContainer, "[?] FASE 1/3: Ingrese su token o ID (ej: 'void_token_key'):", "warning");
            break;

        case 'reboot':
            appendLine(outContainer, "Reiniciando núcleo cuántico de emergencia...", "error");
            setTimeout(() => location.reload(), 1000);
            break;

        case '':
            break;

        default:
            triggerRandomGlitch();
            appendLine(outContainer, `comando no reconocido: '${escapeHtml(cmd)}'. Escribe 'help' para ver la lista completa de comandos.`, 'error');
            break;
    }
}

let subCount = 0;
function spawnNewSubTerminal() {
    subCount++;
    const winId = 'subWin_' + subCount;
    const offX = (subCount * 34) % 200;
    const offY = (subCount * 34) % 120;
    createTerminalWindow(winId, `SUB_SHELL #${subCount}`, `${980 + subCount}`, `calc(14vh + ${offY}px); left: calc(16vw + ${offX}px);`);
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
            <div class="output-line system">MUNCIX_KERNEL [Versión 25.0 HYPER_VOID - MODO MÁXIMO]</div>
            <div class="output-line system">Escribe 'help' para ver todos los comandos o 'socials' para verificar credenciales.</div>
            <div class="output-line" style="margin-bottom: 8px;">----------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt" data-original="muncix@void:/#">muncix@void:/#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span data-original="DAEMON: HYPER-VOID MULTI-GLITCH ENGINE ACTIVE">DAEMON: HYPER-VOID MULTI-GLITCH ENGINE ACTIVE</span>
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
