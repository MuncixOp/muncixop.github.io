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
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500 + Math.random() * 300, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
    } catch(e) {}
}

function playEnterSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(250, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } catch(e) {}
}

function playErrorSound() {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.setValueAtTime(80, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
    } catch(e) {}
}

function playGlitchSound() {
    try {
        initAudio();
        const bufferSize = audioCtx.sampleRate * 0.2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
        filter.Q.setValueAtTime(5, audioCtx.currentTime);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
    } catch(e) {}
}

const bootLogs = [
    "Initializing hardware abstraction layer...",
    "Loading ACPI tables and CPU microcode...",
    "Checking primary storage layout: /dev/nvme0n1 [OK]",
    "Allocating kernel memory space: 32768MB available [OK]",
    "Mounting network interface controllers...",
    "Establishing secure sandbox parameters...",
    "Starting system background daemons: [void_watchdog, net_router, sec_daemon]",
    "Verifying file system integrity and block maps...",
    "Kernel boot sequence completed with 0 errors.",
    "Spawning root shell process..."
];

const bootLogEl = document.getElementById('bootLog');
const bootScreen = document.getElementById('bootScreen');
let currentLogIndex = 0;

function runBootSequence() {
    if (currentLogIndex < bootLogs.length) {
        bootLogEl.innerText += "\n> " + bootLogs[currentLogIndex];
        currentLogIndex++;
        playKeySound();
        setTimeout(runBootSequence, 150 + Math.random() * 120);
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

    headerEl.addEventListener('mousedown', (e) => {
        if (e.target.closest('.window-controls')) return;
        if (winEl.classList.contains('maximized')) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = winEl.getBoundingClientRect();
        winEl.style.transform = 'none';
        winEl.style.left = rect.left + 'px';
        winEl.style.top = rect.top + 'px';

        initialLeft = rect.left;
        initialTop = rect.top;

        bringToFront(winEl);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    headerEl.addEventListener('touchstart', (e) => {
        if (e.target.closest('.window-controls')) return;
        if (winEl.classList.contains('maximized')) return;

        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;

        const rect = winEl.getBoundingClientRect();
        winEl.style.transform = 'none';
        winEl.style.left = rect.left + 'px';
        winEl.style.top = rect.top + 'px';

        initialLeft = rect.left;
        initialTop = rect.top;

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
        const touch = e.touches[0];
        winEl.style.left = (initialLeft + (touch.clientX - startX)) + 'px';
        winEl.style.top = (initialTop + (touch.clientY - startY)) + 'px';
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
        if (isMain) {
            playGlitchSound();
            winEl.classList.add('glitch-active');
            setTimeout(() => winEl.classList.remove('glitch-active'), 300);
        } else {
            playErrorSound();
            winEl.classList.add('closing');
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
            winEl.style.left = '50%';
            winEl.style.top = '50%';
            winEl.style.transform = 'translate(-50%, -50%)';
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
            appendLine(outputContainerEl, `<span style="color: #00ff66;">root@void:~#</span> ${escapeHtml(val)}`, '');
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
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(5, 7, 12, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff66';
            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 33);
        return "Matrix visual matrix overlay activated.";
    } else {
        clearInterval(matrixInterval);
        canvas.style.display = 'none';
        return "Matrix visual matrix overlay deactivated.";
    }
}

function processCommand(rawCmd, outContainer, bodyEl) {
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] || '';

    switch(cmd) {
        case 'help':
            appendLine(outContainer, `Available system commands:
  help      - Display this command reference guide
  clear     - Clear the current terminal view
  window    - Spawn a new secondary floating terminal instance
  matrix    - Toggle the matrix rain graphics overlay
  sysinfo   - Display detailed kernel metrics and hardware profile
  ping      - Test network latency against target domains or IPs
  date      - Print current system timestamp
  echo      - Print custom text strings into output stream
  glitch    - Trigger artificial visual distortion pulse
  diagnostics - Run simulated hardware diagnostic suite
  network   - Scan active local interfaces and routing tables
  socials   - Open authorized external communications / links
  reboot    - Perform a warm reboot of the environment`, 'system');
            break;

        case 'clear':
            outContainer.innerHTML = '';
            break;

        case 'window':
            spawnNewTerminal();
            appendLine(outContainer, "New secondary shell instance spawned successfully.", "success");
            break;

        case 'matrix':
            const msg = toggleMatrixRain();
            appendLine(outContainer, msg, "success");
            break;

        case 'sysinfo':
            appendLine(outContainer, `OS: Void Systems Unix Kernel x86_64
Version: 7.2.0-STABLE
Uptime: active (operational)
Memory Allocated: 1640MB / 32768MB
Render Engine: WebGL / HTML5 Canvas Pipeline
Device Support: Cross-Platform Responsive`, 'system');
            break;

        case 'ping':
            const target = arg || '127.0.0.1';
            appendLine(outContainer, `PING ${target} with 32 bytes of diagnostic data:`, 'system');
            for(let i=1; i<=3; i++) {
                setTimeout(() => {
                    appendLine(outContainer, `64 bytes from ${target}: icmp_seq=${i} ttl=119 time=${(Math.random()*12+4).toFixed(2)} ms`, '');
                }, i * 350);
            }
            break;

        case 'date':
            appendLine(outContainer, `System Timestamp (UTC): ${new Date().toUTCString()}`, 'success');
            break;

        case 'echo':
            const textToEcho = parts.slice(1).join(' ');
            appendLine(outContainer, escapeHtml(textToEcho), '');
            break;

        case 'glitch':
            playGlitchSound();
            const win = outContainer.closest('.terminal-window');
            win.classList.add('glitch-active');
            setTimeout(() => win.classList.remove('glitch-active'), 300);
            appendLine(outContainer, "Manual glitch pulse injected into terminal frame buffer.", "warning");
            break;

        case 'diagnostics':
            appendLine(outContainer, `Executing comprehensive background diagnostics...`, 'system');
            const panelId = 'diag_' + Math.floor(Math.random() * 10000);
            appendLine(outContainer, `
                <div class="interactive-panel">
                    <div class="panel-row"><span>CPU Core Integrity:</span><span style="color:#3fb950">99.8% Nominal</span></div>
                    <div class="panel-row"><span>Memory Buffer Check:</span><span style="color:#3fb950">Passed (0 errors)</span></div>
                    <div class="panel-row"><span>Storage Sector Scan:</span></div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" id="${panelId}_bar"></div></div>
                </div>
            `, '');
            setTimeout(() => {
                const bar = document.getElementById(`${panelId}_bar`);
                if(bar) bar.style.width = '100%';
            }, 100);
            break;

        case 'network':
            appendLine(outContainer, `Active Network Interfaces:
  [eth0] - IP: 192.168.1.150 - Status: LINK_UP (1 Gbps)
  [wlan0] - IP: 10.0.0.42 - Status: SECURE_WPA3
  [tun0] - IP: 10.8.0.1 - Status: ENCRYPTED_VPN`, 'system');
            break;

        case 'socials':
            appendLine(outContainer, `External communications routing available:
  - <span class="action-link" onclick="window.open('https://github.com', '_blank')">GitHub Repository</span>
  - <span class="action-link" onclick="window.open('https://discord.com', '_blank')">Discord Community Server</span>
  - <span class="action-link" onclick="window.open('https://x.com', '_blank')">X / Twitter Feed</span>`, 'success');
            break;

        case 'reboot':
            appendLine(outContainer, "Initiating system kernel warm reboot sequence...", "error");
            setTimeout(() => {
                location.reload();
            }, 1200);
            break;

        case '':
            break;

        default:
            playErrorSound();
            appendLine(outContainer, `command not recognized: '${escapeHtml(cmd)}'. Type 'help' for instructions.`, 'error');
            break;
    }
}

let spawnedCount = 0;
function spawnNewTerminal() {
    spawnedCount++;
    const winId = 'spawnedWin_' + spawnedCount;
    const offsetX = (spawnedCount * 30) % 180;
    const offsetY = (spawnedCount * 30) % 120;

    const winDiv = document.createElement('div');
    winDiv.className = 'terminal-window constant-jitter spawning';
    winDiv.id = winId;
    winDiv.style.top = `calc(18vh + ${offsetY}px)`;
    winDiv.style.left = `calc(22vw + ${offsetX}px)`;

    winDiv.innerHTML = `
        <div class="terminal-header" data-window-id="${winId}">
            <div class="window-controls">
                <button class="control-btn btn-close" id="${winId}_close" title="Close"></button>
                <button class="control-btn btn-minimize" id="${winId}_min" title="Minimize"></button>
                <button class="control-btn btn-maximize" id="${winId}_max" title="Maximize"></button>
            </div>
            <div class="terminal-title">
                <span>INVOKED_SHELL</span> #${spawnedCount}
            </div>
            <div class="window-status">PID: ${120 + spawnedCount}</div>
        </div>

        <div class="terminal-body" id="${winId}_body">
            <div class="output-line system">Secondary isolated shell instance established.</div>
            <div class="output-line system">This window can be safely closed or manipulated independently.</div>
            <div class="output-line" style="margin-bottom: 10px;">----------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt">user@void-sub:~#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span>SECONDARY SUBSYSTEM</span>
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
