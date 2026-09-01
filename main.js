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
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450 + Math.random() * 400, audioCtx.currentTime);
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
        osc.type = 'square';
        osc.frequency.setValueAtTime(280, audioCtx.currentTime);
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
        const bufferSize = audioCtx.sampleRate * 0.18;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.25 ? 1 : -1);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, audioCtx.currentTime);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
    } catch(e) {}
}

// CORRUPCIÓN A BINARIO/GLITCH (1s y 0s / símbolos) POR 150ms-200ms SIN BORRAR EL OUTPUT/INPUT
function corruptDynamicTexts() {
    const outputs = document.querySelectorAll('.output-line, .terminal-title, .window-status, .prompt');
    const backupData = [];

    outputs.forEach(el => {
        if (!el.hasAttribute('data-original')) {
            el.setAttribute('data-original', el.innerText);
        }
        const original = el.getAttribute('data-original');
        backupData.push({ element: el, text: original });

        // Transformar algunos caracteres aleatorios en 1s, 0s y caracteres glitch
        let corrupted = '';
        const binaryCharset = '1010101010█▓▒░#@$%&';
        for (let i = 0; i < original.length; i++) {
            if (Math.random() < 0.45 && original[i] !== ' ') {
                corrupted += binaryCharset.charAt(Math.floor(Math.random() * binaryCharset.length));
            } else {
                corrupted += original[i];
            }
        }
        el.innerText = corrupted;
    });

    // Restaurar los textos originales exactamente después de 150 milisegundos
    setTimeout(() => {
        backupData.forEach(item => {
            if (item.element && item.text) {
                item.element.innerText = item.text;
            }
        });
    }, 150);
}

function triggerBackgroundGlitch() {
    playGlitchNoise();

    const windows = document.querySelectorAll('.terminal-window');
    windows.forEach(win => {
        win.classList.add('glitch-active');
        setTimeout(() => {
            win.classList.remove('glitch-active');
        }, 180);
    });

    corruptDynamicTexts();

    const flash = document.getElementById('corruptFlash');
    const screenOverlay = document.getElementById('screenGlitchOverlay');
    if (flash && screenOverlay) {
        flash.style.opacity = '1';
        screenOverlay.style.opacity = '1';
        setTimeout(() => {
            flash.style.opacity = '0';
            screenOverlay.style.opacity = '0';
        }, 150);
    }
}

function initBackgroundGlitchDaemon() {
    function scheduleNextGlitch() {
        const randomInterval = 5000 + Math.random() * 5000;
        setTimeout(() => {
            triggerBackgroundGlitch();
            scheduleNextGlitch();
        }, randomInterval);
    }
    scheduleNextGlitch();
}

const bootLogs = [
    "LOADING QUANTUM MUNCIX_CORE KERNEL...",
    "BYPASSING NEURAL SECURITY MATRIX: [OK]",
    "ENGAGING ADVANCED MATRIX RAIN CASCADE...",
    "ACTIVATING 150MS TYPING CORRUPTION DAEMON...",
    "SYSTEM SECURED. WELCOME, MUNCIX_OP."
];

const bootLogEl = document.getElementById('bootLog');
const bootScreen = document.getElementById('bootScreen');
let currentLogIndex = 0;

function runBootSequence() {
    if (currentLogIndex < bootLogs.length) {
        bootLogEl.innerText += "\n> " + bootLogs[currentLogIndex];
        currentLogIndex++;
        playKeySound();
        setTimeout(runBootSequence, 70 + Math.random() * 40);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            playEnterSound();
            setTimeout(() => {
                bootScreen.remove();
                initMatrixRain();
                initBackgroundGlitchDaemon();
                createTerminalWindow('mainTerminal', 'MUNCIX_OS // QUANTUM_CORE [CYBER_ACTIVE]', '707', true, null);
            }, 400);
        }, 250);
    }
}

window.addEventListener('load', () => {
    setTimeout(runBootSequence, 200);
});

function setupWindowBehaviors(winEl, headerEl, closeBtn, minBtn, maxBtn, windowId, titleText, pidText, isMain, outputContainerEl) {
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
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;

        initialLeft = parseFloat(winEl.style.left);
        initialTop = parseFloat(winEl.style.top);

        bringToFront(winEl);

        document.addEventListener('touchmove', onTouchMove, {passive: false});
        document.addEventListener('touchend', onTouchEnd);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        winEl.style.left = (initialLeft + dx) + 'px';
        winEl.style.top = (initialTop + dy) + 'px';
    }

    function onTouchMove(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        winEl.style.left = (initialLeft + dx) + 'px';
        winEl.style.top = (initialTop + dy) + 'px';
        e.preventDefault();
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function onTouchEnd() {
        isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }

    // Botón de cierre estético (dispara glitch de 150ms y deja intacto el output)
    closeBtn.addEventListener('click', () => {
        triggerBackgroundGlitch();
        appendLine(outputContainerEl, "[!] EVENTO: Pulso interceptado en barra de cierre (Ventana asegurada).", "warning");
    });

    let isMinimized = false;
    const bodyEl = winEl.querySelector('.terminal-body');
    const footerEl = winEl.querySelector('.terminal-footer-hint');

    minBtn.addEventListener('click', () => {
        playKeySound();
        isMinimized = !isMinimized;
        if (isMinimized) {
            winEl.classList.add('minimized');
            if(bodyEl) bodyEl.style.display = 'none';
            if(footerEl) footerEl.style.display = 'none';
        } else {
            winEl.classList.remove('minimized');
            if(bodyEl) bodyEl.style.display = 'block';
            if(footerEl) footerEl.style.display = 'flex';
        }
    });

    maxBtn.addEventListener('click', () => {
        playKeySound();
        winEl.classList.toggle('maximized');
        if (!winEl.classList.contains('maximized')) {
            initPosition();
        }
    });

    winEl.addEventListener('mousedown', () => bringToFront(winEl));
    winEl.addEventListener('touchstart', () => bringToFront(winEl));
}

let highestZIndex = 10;
function bringToFront(winEl) {
    highestZIndex++;
    winEl.style.zIndex = highestZIndex;
}

const terminalAuthStates = {};

function setupTerminalInterface(inputEl, outputContainerEl, bodyEl, winId) {
    let history = [];
    let historyIdx = -1;

    terminalAuthStates[winId] = { step: 0 };

    // EFECTO DE GLITCH AL ESCRIBIR: Cada tecla pulsada provoca micro-corrupción y sonido por 150ms
    inputEl.addEventListener('input', () => {
        playKeySound();
        triggerBackgroundGlitch();
    });

    inputEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            playEnterSound();
            const val = inputEl.value.trim();
            if (val !== '') {
                history.push(val);
                historyIdx = history.length;
            }

            const state = terminalAuthStates[winId];

            if (state && state.step > 0) {
                handleSocialAuthProcess(val, outputContainerEl, state, winId);
                inputEl.value = '';
                return;
            }

            appendLine(outputContainerEl, `<span style="color: var(--danger-neon);">muncix@void:~#</span> ${escapeHtml(val)}`, '');
            processCommand(val, outputContainerEl, bodyEl, winId);
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

    bodyEl.addEventListener('click', () => {
        inputEl.focus();
    });
}

function handleSocialAuthProcess(val, outContainer, state, winId) {
    appendLine(outContainer, `<span style="color: var(--cyan-neon);">auth@muncix:~#</span> ${escapeHtml(val || '[BYPASS]')}`, '');

    if (state.step === 1) {
        state.step = 2;
        triggerBackgroundGlitch();
        appendLine(outContainer, "[+] FASE 1: Token neural decodificado con éxito.", "success");
        appendLine(outContainer, "[?] FASE 2/3: Ingrese la clave de cifrado maestro (o pulse ENTER):", "warning");
    } else if (state.step === 2) {
        state.step = 3;
        triggerBackgroundGlitch();
        appendLine(outContainer, "[+] FASE 2: Clave maestra aceptada. Desencriptando bases de datos...", "success");
        appendLine(outContainer, "[?] FASE 3/3: Escriba 'CONFIRMAR' para revelar canales seguros de Muncix_Op:", "warning");
    } else if (state.step === 3) {
        state.step = 0;
        triggerBackgroundGlitch();
        appendLine(outContainer, "[✔] ACCESO CONCEDIDO: Canales oficiales desbloqueados.", "success");
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
    // Guardamos el texto original para que el glitch de 150ms no borre el historial
    div.setAttribute('data-original', div.innerText);
    container.appendChild(div);
    const termBody = container.closest('.terminal-body');
    if (termBody) {
        termBody.scrollTop = termBody.scrollHeight;
    }
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function initMatrixRain() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = 'MUNCIX_OP0123456789@#$%^&*()_+<>_█▓▒░CORRUPT';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(1, 2, 4, 0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'var(--danger-neon)';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 30);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function processCommand(rawCmd, outContainer, bodyEl, winId) {
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Available Quantum Muncix Commands:
  help      - Display this reference guide
  clear     - Wipe console history
  window    - Spawn a secondary sub-terminal
  socials   - Iniciar proceso de autenticación para redes sociales
  reboot    - Execute core system reboot`, 'system');
            break;

        case 'clear':
            outContainer.innerHTML = '';
            break;

        case 'window':
            spawnNewTerminal();
            appendLine(outContainer, "Secondary subsystem successfully linked.", "success");
            break;

        case 'socials':
            triggerBackgroundGlitch();
            terminalAuthStates[winId].step = 1;
            appendLine(outContainer, "[!] PROTOCOLO DE SEGURIDAD: Iniciando autenticación para redes de Muncix_Op.", "error");
            appendLine(outContainer, "[?] FASE 1/3: Ingrese su token o ID de enlace (ej: 'muncix_auth'):", "warning");
            break;

        case 'reboot':
            appendLine(outContainer, "Initiating emergency quantum core reboot...", "error");
            setTimeout(() => {
                location.reload();
            }, 1000);
            break;

        case '':
            break;

        default:
            triggerBackgroundGlitch();
            appendLine(outContainer, `command not recognized: '${escapeHtml(cmd)}'. Type 'help' for options.`, 'error');
            break;
    }
}

let spawnedCount = 0;
function spawnNewTerminal() {
    spawnedCount++;
    const winId = 'spawnedWin_' + spawnedCount;
    const offsetX = (spawnedCount * 35) % 180;
    const offsetY = (spawnedCount * 35) % 120;
    createTerminalWindow(winId, `SUB_SHELL #${spawnedCount}`, `${800 + spawnedCount}`, false, `calc(20vh + ${offsetY}px); left: calc(22vw + ${offsetX}px);`);
}

function createTerminalWindow(winId, title, pid, isMain, customStyle) {
    const container = document.getElementById('terminalContainer');
    const winDiv = document.createElement('div');
    winDiv.className = 'terminal-window spawning';
    winDiv.id = winId;
    if (customStyle) {
        winDiv.style.cssText = customStyle;
    }

    winDiv.innerHTML = `
        <div class="terminal-header" data-window-id="${winId}">
            <div class="window-controls">
                <button class="control-btn btn-close" id="${winId}_close" title="Close"></button>
                <button class="control-btn btn-minimize" id="${winId}_min" title="Minimize"></button>
                <button class="control-btn btn-maximize" id="${winId}_max" title="Maximize"></button>
            </div>
            <div class="terminal-title" data-original="${title}">
                <span>${isMain ? 'MUNCIX_OS' : 'SUB_SHELL'}</span> ${isMain ? '// QUANTUM_CORE' : '#' + pid}
            </div>
            <div class="window-status" data-original="PID: ${pid}">PID: ${pid}</div>
        </div>

        <div class="terminal-body" id="${winId}_body">
            <div class="output-line system" data-original="${isMain ? 'MUNCIX_OP KERNEL [Version 10.9-CYBER_CORE]' : 'Isolated subsystem active.'}">${isMain ? 'MUNCIX_OP KERNEL [Version 10.9-CYBER_CORE]' : 'Isolated subsystem active.'}</div>
            <div class="output-line system" data-original="${isMain ? 'Type \'help\' for commands, or \'socials\' to start social verification.' : 'Type \'socials\' for link verification.'}">${isMain ? 'Type \'help\' for commands, or \'socials\' to start social verification.' : 'Type \'socials\' for link verification.'}</div>
            <div class="output-line" data-original="----------------------------------------------------------------" style="margin-bottom: 10px;">----------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt" data-original="${isMain ? 'muncix@void:~#' : 'muncix@sub~#'}">${isMain ? 'muncix@void:~#' : 'muncix@sub~#'}</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span data-original="${isMain ? 'DAEMON: 150MS TYPING CORRUPTION ACTIVE' : 'SUBSYSTEM ONLINE'}">${isMain ? 'DAEMON: 150MS TYPING CORRUPTION ACTIVE' : 'SUBSYSTEM ONLINE'}</span>
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
        winId,
        title,
        pid,
        isMain,
        document.getElementById(`${winId}_output`)
    );

    setupTerminalInterface(
        document.getElementById(`${winId}_input`),
        document.getElementById(`${winId}_output`),
        document.getElementById(`${winId}_body`),
        winId
    );

    document.getElementById(`${winId}_input`).focus();
}
