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
        osc.frequency.setValueAtTime(400 + Math.random() * 400, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } catch(e) {}
}

function playEnterSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
    } catch(e) {}
}

function playErrorSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.setValueAtTime(60, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } catch(e) {}
}

function playGlitchSound() {
    try {
        initAudio();
        const bufferSize = audioCtx.sampleRate * 0.3;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * (Math.random() > 0.5 ? 1 : -1);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, audioCtx.currentTime);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();

        const flash = document.getElementById('corruptFlash');
        if (flash) {
            flash.style.opacity = '1';
            setTimeout(() => { flash.style.opacity = '0'; }, 100);
        }
    } catch(e) {}
}

const bootLogs = [
    "LOADING MUNCIX_CORE KERNEL MODULES...",
    "BYPASSING SECURITY FIREWALLS: [OK]",
    "MOUNTING CORRUPTED SECTORS: /dev/muncix_root [OK]",
    "INJECTING GLITCH PROTOCOLS & CORRUPTION OVERLAYS...",
    "ESTABLISHING SECURE NET LINKS TO TIKTOK, X, AND CURSEFORGE...",
    "SYNCHRONIZING AUDIO / VISUAL BUFFER FRAMES...",
    "SYSTEM CORRUPTION STABLE. WELCOME, MUNCIX_OP."
];

const bootLogEl = document.getElementById('bootLog');
const bootScreen = document.getElementById('bootScreen');
let currentLogIndex = 0;

function runBootSequence() {
    if (currentLogIndex < bootLogs.length) {
        bootLogEl.innerText += "\n> " + bootLogs[currentLogIndex];
        currentLogIndex++;
        playKeySound();
        setTimeout(runBootSequence, 120 + Math.random() * 100);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            playEnterSound();
            setTimeout(() => {
                bootScreen.remove();
                document.getElementById('mainCommandInput').focus();
            }, 500);
        }, 400);
    }
}

window.addEventListener('load', () => {
    setTimeout(runBootSequence, 300);
});

function setupWindowBehaviors(winEl, headerEl, closeBtn, minBtn, maxBtn, isMain = false) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    function ensurePixelPosition() {
        const rect = winEl.getBoundingClientRect();
        winEl.style.transform = 'none';
        winEl.style.left = rect.left + 'px';
        winEl.style.top = rect.top + 'px';
    }

    headerEl.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-controls')) return;
        if (winEl.classList.contains('maximized')) return;

        ensurePixelPosition();
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

        ensurePixelPosition();
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
        playGlitchSound();
        winEl.classList.add('glitch-active');
        setTimeout(() => winEl.classList.remove('glitch-active'), 300);
        if (!isMain) {
            setTimeout(() => winEl.remove(), 300);
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
        if (winEl.classList.contains('maximized')) {
            winEl.style.left = '';
            winEl.style.top = '';
        } else {
            ensurePixelPosition();
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
    div.innerHTML = html;
    container.appendChild(div);
    const termBody = container.closest('.terminal-body');
    termBody.scrollTop = termBody.scrollHeight;
}

function appendTypedLine(container, text, className = '', speed = 15, callback = null) {
    const div = document.createElement('div');
    div.className = `output-line ${className}`;
    container.appendChild(div);
    
    const termBody = container.closest('.terminal-body');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            div.innerHTML = escapeHtml(text.substring(0, i + 1)) + '<span class="typing-cursor"></span>';
            i++;
            termBody.scrollTop = termBody.scrollHeight;
            setTimeout(type, speed + Math.random() * 8);
        } else {
            div.innerHTML = escapeHtml(text);
            termBody.scrollTop = termBody.scrollHeight;
            if (callback) callback();
        }
    }
    type();
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

setupTerminalInterface(
    document.getElementById('mainCommandInput'),
    document.getElementById('mainOutputContainer'),
    document.getElementById('mainTerminalBody')
);

let matrixActive = false;
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let matrixInterval;

function toggleMatrixRain() {
    matrixActive = !matrixActive;
    if (matrixActive) {
        canvas.style.display = 'block';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const letters = 'MUNCIX_OP0123456789@#$%^&*()_+<>_CORRUPT';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(3, 5, 8, 0.08)';
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
        return "Corrupted Matrix Rain overlay activated.";
    } else {
        clearInterval(matrixInterval);
        canvas.style.display = 'none';
        return "Matrix overlay deactivated.";
    }
}

function processCommand(rawCmd, outContainer, bodyEl) {
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] || '';

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Available Muncix System Commands:
  help      - Display this command reference guide
  clear     - Clear the current terminal console
  window    - Spawn a new corrupted floating sub-terminal
  matrix    - Toggle custom corrupted Matrix rain overlay
  sysinfo   - Display Muncix_Op kernel profile & stats
  corrupt   - Trigger an aggressive system corruption glitch burst
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

        case 'matrix':
            const msg = toggleMatrixRain();
            appendLine(outContainer, msg, "success");
            break;

        case 'sysinfo':
            appendLine(outContainer, `USER: Muncix_Op [ROOT_ADMIN]
Kernel: Muncix Unix Corrupted v9.4
Active Modules: TikTok, X/Twitter, CurseForge
Glitch Engine: Hyper-Active (Level 9)`, 'system');
            break;

        case 'corrupt':
            playGlitchSound();
            const win = outContainer.closest('.terminal-window');
            win.classList.add('glitch-active');
            setTimeout(() => win.classList.remove('glitch-active'), 350);
            appendLine(outContainer, "[!] HARDWARE WARNING: Corrupted sector overflow injected!", "error");
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
            }, 1200);
            break;

        case '':
            break;

        default:
            playErrorSound();
            appendLine(outContainer, `command not recognized: '${escapeHtml(cmd)}'. Type 'help' for options.`, 'error');
            break;
    }
}

let spawnedCount = 0;
function spawnNewTerminal() {
    spawnedCount++;
    const winId = 'spawnedWin_' + spawnedCount;
    const offsetX = (spawnedCount * 35) % 200;
    const offsetY = (spawnedCount * 35) % 140;

    const winDiv = document.createElement('div');
    winDiv.className = 'terminal-window constant-jitter spawning';
    winDiv.id = winId;
    winDiv.style.top = `calc(15vh + ${offsetY}px)`;
    winDiv.style.left = `calc(20vw + ${offsetX}px)`;

    winDiv.innerHTML = `
        <div class="terminal-header" data-window-id="${winId}">
            <div class="window-controls">
                <button class="control-btn btn-close" id="${winId}_close" title="Close"></button>
                <button class="control-btn btn-minimize" id="${winId}_min" title="Minimize"></button>
                <button class="control-btn btn-maximize" id="${winId}_max" title="Maximize"></button>
            </div>
            <div class="terminal-title">
                <span>SUB_SHELL</span> #${spawnedCount}
            </div>
            <div class="window-status">PID: ${500 + spawnedCount}</div>
        </div>

        <div class="terminal-body" id="${winId}_body">
            <div class="output-line system">Isolated corrupted subsystem initialized.</div>
            <div class="output-line system">Type 'socials' for direct access links.</div>
            <div class="output-line" style="margin-bottom: 10px;">----------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt">muncix@sub:~#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span>SUBSYSTEM ACTIVE</span>
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
