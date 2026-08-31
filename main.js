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
        osc.frequency.setValueAtTime(350 + Math.random() * 300, audioCtx.currentTime);
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
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.08);
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
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, audioCtx.currentTime);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
    } catch(e) {}
}

// Corrupción de texto en vivo en segundo plano durante 150ms exactos
function corruptAllTexts() {
    const textElements = document.querySelectorAll('[data-corrupt-text]');
    const originalTexts = [];

    textElements.forEach(el => {
        const original = el.getAttribute('data-corrupt-text');
        originalTexts.push({ el: el, text: original });
        
        let corrupted = '';
        const charset = '█▓▒░#@$%&*<>?/\\|~019284';
        for (let i = 0; i < original.length; i++) {
            corrupted += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        el.innerText = corrupted;
    });

    setTimeout(() => {
        originalTexts.forEach(item => {
            item.el.innerText = item.text;
        });
    }, 150);
}

// Disparador global del glitch en segundo plano que afecta a todas las ventanas abiertas
function triggerBackgroundGlitch() {
    playGlitchNoise();

    const windows = document.querySelectorAll('.terminal-window');
    windows.forEach(win => {
        win.classList.add('glitch-active');
        setTimeout(() => {
            win.classList.remove('glitch-active');
        }, 150);
    });

    corruptAllTexts();

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

// Bucle autónomo en segundo plano: Ocurre de forma impredecible cada 4 a 9 segundos
function initBackgroundGlitchDaemon() {
    function scheduleNextGlitch() {
        const randomInterval = 4000 + Math.random() * 5000; // Entre 4 y 9 segundos
        setTimeout(() => {
            triggerBackgroundGlitch();
            scheduleNextGlitch();
        }, randomInterval);
    }
    scheduleNextGlitch();
}

const bootLogs = [
    "LOADING MUNCIX_CORE KERNEL MODULES...",
    "BYPASSING SECURITY FIREWALLS: [OK]",
    "ENGAGING CONSTANT MATRIX RAIN CASCADE...",
    "STARTING AUTONOMOUS BACKGROUND GLITCH DAEMON (150MS BURSTS)...",
    "SYSTEM CORRUPTED. WELCOME, MUNCIX_OP."
];

const bootLogEl = document.getElementById('bootLog');
const bootScreen = document.getElementById('bootScreen');
let currentLogIndex = 0;

function runBootSequence() {
    if (currentLogIndex < bootLogs.length) {
        bootLogEl.innerText += "\n> " + bootLogs[currentLogIndex];
        currentLogIndex++;
        playKeySound();
        setTimeout(runBootSequence, 90 + Math.random() * 60);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            playEnterSound();
            setTimeout(() => {
                bootScreen.remove();
                document.getElementById('mainCommandInput').focus();
                initMatrixRain();
                initBackgroundGlitchDaemon(); // ¡Inicia la corrupción autónoma en segundo plano!
            }, 400);
        }, 300);
    }
}

window.addEventListener('load', () => {
    setTimeout(runBootSequence, 200);
});

function setupWindowBehaviors(winEl, headerEl, closeBtn, minBtn, maxBtn, isMain = false) {
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

    closeBtn.addEventListener('click', () => {
        triggerBackgroundGlitch();
        winEl.classList.add('closing');
        if (!isMain) {
            setTimeout(() => winEl.remove(), 200);
        }
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

const mainTerminal = document.getElementById('mainTerminal');
setupWindowBehaviors(
    mainTerminal,
    mainTerminal.querySelector('.terminal-header'),
    document.getElementById('mainCloseBtn'),
    document.getElementById('mainMinBtn'),
    document.getElementById('mainMaxBtn'),
    true
);

function setupTerminalInterface(inputEl, outputContainerEl, bodyEl) {
    let history = [];
    let historyIdx = -1;

    inputEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            playEnterSound();
            const val = inputEl.value.trim();
            if (val !== '') {
                history.push(val);
                historyIdx = history.length;
            }
            appendLine(outputContainerEl, `<span style="color: #ff0055;">muncix@void:~#</span> ${escapeHtml(val)}`, '');
            processCommand(val, outputContainerEl, bodyEl);
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
        } else {
            playKeySound();
        }
    });

    bodyEl.addEventListener('click', () => {
        inputEl.focus();
    });
}

function appendLine(container, html, className = '') {
    const div = document.createElement('div');
    div.className = `output-line ${className}`;
    div.setAttribute('data-corrupt-text', div.innerText);
    div.innerHTML = html;
    container.appendChild(div);
    const termBody = container.closest('.terminal-body');
    termBody.scrollTop = termBody.scrollHeight;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

setupTerminalInterface(
    document.getElementById('mainCommandInput'),
    document.getElementById('mainOutputContainer'),
    document.getElementById('mainTerminalBody')
);

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
        ctx.fillStyle = 'rgba(3, 5, 8, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff0055';
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

function processCommand(rawCmd, outContainer, bodyEl) {
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const win = outContainer.closest('.terminal-window');

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Available Muncix System Commands:
  help      - Display this command reference guide
  clear     - Clear the current terminal console
  window    - Spawn a new corrupted floating sub-terminal
  glitch    - Force a manual 150ms hard system glitch burst right now
  socials   - Display and open official social channels (TikTok, X, CurseForge)
  reboot    - Perform a full system hard reboot`, 'system');
            break;

        case 'clear':
            outContainer.innerHTML = '';
            break;

        case 'window':
            spawnNewTerminal();
            appendLine(outContainer, "New corrupted secondary terminal instance spawned.", "success");
            break;

        case 'glitch':
            triggerBackgroundGlitch();
            appendLine(outContainer, "[!] Manual glitch burst injected into background daemon.", "error");
            break;

        case 'socials':
            appendLine(outContainer, `Official Muncix_Op Social Channels:`, 'success');
            appendLine(outContainer, `
                <div class="social-card">
                    <span>TikTok (@muncixop)</span>
                    <span class="action-link" onclick="window.open('https://www.tiktok.com/@muncixop', '_blank')">[OPEN_LINK]</span>
                </div>
                <div class="social-card">
                    <span>X / Twitter (@MuncixOp)</span>
                    <span class="action-link" onclick="window.open('https://x.com/MuncixOp', '_blank')">[OPEN_LINK]</span>
                </div>
                <div class="social-card">
                    <span>CurseForge Projects</span>
                    <span class="action-link" onclick="window.open('https://www.curseforge.com/members/muncixop/projects', '_blank')">[OPEN_LINK]</span>
                </div>
            `, '');
            break;

        case 'reboot':
            appendLine(outContainer, "Initiating emergency system hard reboot...", "error");
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
    const offsetX = (spawnedCount * 40) % 180;
    const offsetY = (spawnedCount * 40) % 120;

    const winDiv = document.createElement('div');
    winDiv.className = 'terminal-window spawning';
    winDiv.id = winId;
    winDiv.style.top = `calc(22vh + ${offsetY}px)`;
    winDiv.style.left = `calc(25vw + ${offsetX}px)`;

    winDiv.innerHTML = `
        <div class="terminal-header" data-window-id="${winId}">
            <div class="window-controls">
                <button class="control-btn btn-close" id="${winId}_close" title="Close"></button>
                <button class="control-btn btn-minimize" id="${winId}_min" title="Minimize"></button>
                <button class="control-btn btn-maximize" id="${winId}_max" title="Maximize"></button>
            </div>
            <div class="terminal-title" data-corrupt-text="SUB_SHELL #${spawnedCount}">
                <span>SUB_SHELL</span> #${spawnedCount}
            </div>
            <div class="window-status" data-corrupt-text="PID: ${500 + spawnedCount}">PID: ${500 + spawnedCount}</div>
        </div>

        <div class="terminal-body" id="${winId}_body">
            <div class="output-line system" data-corrupt-text="Isolated corrupted subsystem initialized.">Isolated corrupted subsystem initialized.</div>
            <div class="output-line system" data-corrupt-text="Type 'socials' for direct access links.">Type 'socials' for direct access links.</div>
            <div class="output-line" style="margin-bottom: 10px;">----------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt">muncix@sub:~#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span data-corrupt-text="SUBSYSTEM ACTIVE">SUBSYSTEM ACTIVE</span>
            <span>UTF-8</span>
        </div>
    `;

    document.body.appendChild(winDiv);

    setupWindowBehaviors(
        winDiv,
        winDiv.querySelector('.terminal-header'),
        document.getElementById(`${winId}_close`),
        document.getElementById(`${winId}_min`),
        document.getElementById(`${winId}_max`),
        false
    );

    setupTerminalInterface(
        document.getElementById(`${winId}_input`),
        document.getElementById(`${winId}_output`),
        document.getElementById(`${winId}_body`)
    );

    document.getElementById(`${winId}_input`).focus();
}
