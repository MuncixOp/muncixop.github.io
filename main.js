/* ========================================================================== */
/* MUNCIX_OS // OMNI-QUANTUM SUPREME NEXUS v999.9 - JAVASCRIPT ENGINE ULTIMATE*/
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

function playKeyClickSound() {
    if (!audioEnabled) return;
    try {
        initAudioSystem();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.0035, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.025);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.025);
    } catch(e) {}
}

function playEnterActionSound() {
    if (!audioEnabled) return;
    try {
        initAudioSystem();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(290, audioCtx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.008, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.06);
    } catch(e) {}
}

function playGlitchFXSound() {
    if (!audioEnabled) return;
    try {
        initAudioSystem();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.014, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.24);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.24);
    } catch(e) {}
}

/* ========================================================================== */
/* SECUENCIA DE BOOTEO OMNI-SUPREMA EXPANDIDA                                 */
/* ========================================================================== */

const omniBootLogs = [
    { text: "[BIOS] Initializing OMNI-QUANTUM UEFI Subsystem & Mesh ACPI v99.9...", status: "Loading Quantum ACPI..." },
    { text: "[CPU] Core #0 - #128 detected @ 18.5 GHz [HYPERQUANTUM OMNI ARCHITECTURE]", status: "Checking multi-core quantum clocks..." },
    { text: "[MEM] Initializing 8388608MB ECC Quantum RAM -> 0x00000 - 0xFFFFFFFFF [OK]", status: "Validating spatial memory mesh..." },
    { text: "[PCI] High-speed PCIe Gen 8 lanes mapped. Secure quantum entanglement active.", status: "Mounting supreme storage..." },
    { text: "[GPU] Neural Matrix Ray-Tracing Pipeline online. 240 FPS target locked.", status: "Calibrating shaders & polygons..." },
    { text: "[NET] Omnidirectional quantum communication bridge established across nodes.", status: "Securing encryption sockets..." },
    { text: "[SECURITY] Zero-trust kernel enclave verified. Cryptographic hash SHA-512 matched.", status: "Verifying checksums..." },
    { text: "[KERNEL] Uncompressing MUNCIX_OMNI_SUPREME_KERNEL v999.9 into Ring 0...", status: "Injecting supreme core..." },
    { text: "[READY] Quantum core stability 100%. Launching ultimate immersive interface...", status: "BOOT SEQUENCE COMPLETE." }
];

const bootLogContainer = document.getElementById('bootLog');
const bootProgressBarFill = document.getElementById('bootProgressBar');
const bootStatusTxt = document.getElementById('bootStatusText');
const bootPercentTxt = document.getElementById('bootPercentText');
const bootFooterElement = document.getElementById('bootFooterStatus');
const bootScreenElement = document.getElementById('bootScreen');
let bootIndex = 0;

function runOmniBootSequence() {
    if (bootIndex < omniBootLogs.length) {
        const item = omniBootLogs[bootIndex];
        bootLogContainer.innerText += "\n" + item.text;
        bootStatusTxt.innerText = item.status;
        bootFooterElement.innerText = "STATUS: " + item.status;
        
        const pct = ((bootIndex + 1) / omniBootLogs.length) * 100;
        bootProgressBarFill.style.width = pct + '%';
        bootPercentTxt.innerText = pct.toFixed(1) + '%';

        bootIndex++;
        setTimeout(runOmniBootSequence, 75);
    } else {
        setTimeout(() => {
            bootScreenElement.style.opacity = '0';
            bootScreenElement.style.transform = 'scale(1.08)';
            setTimeout(() => {
                bootScreenElement.remove();
                initOmniVisuals();
                createTerminalWindow('mainTerminal', 'MUNCIX_OS // OMNI_QUANTUM_CORE [ONLINE]', '1337', true, true);
                showToast("¡Núcleo OMNI Cuántico v999.9 inicializado con éxito absoluto!", "success");
            }, 750);
        }, 400);
    }
}

window.addEventListener('load', () => {
    setTimeout(runOmniBootSequence, 120);
});

/* ========================================================================== */
/* SISTEMA DE ARCHIVOS VIRTUAL OMNI-EXPANDIDO                                 */
/* ========================================================================== */

const omniVirtualFileSystem = {
    "/": { type: "dir", contents: ["home", "sys", "bin", "readme.txt", "system.conf", "quantum.dat", "omni_core.log"] },
    "/home": { type: "dir", contents: ["muncix_op", "developer", "guest"] },
    "/home/muncix_op": { type: "dir", contents: ["bio.txt", "secrets.dat", "socials.log", "projects.md", "achievements.txt"] },
    "/home/developer": { type: "dir", contents: ["roblox_jjs_yuta.lua", "blockbench_model.json", "desmos_synth.js", "quantum_core.cpp", "shaders_glsl.frag"] },
    "/home/guest": { type: "dir", contents: ["welcome_guest.txt"] },
    "/sys": { type: "dir", contents: ["kernel_info", "quantum_mesh", "memory_map", "neural_net", "raytracer_stats"] },
    "/bin": { type: "dir", contents: ["help", "ls", "cd", "cat", "clear", "window", "ping", "nmap", "socials", "sysinfo", "date", "whoami", "matrix", "glitch", "theme", "audio", "reboot"] },
    "/readme.txt": { type: "file", content: "MUNCIX_OS v999.9 OMNI-QUANTUM SUPREME NEXUS. Miles de líneas de código optimizadas al máximo nivel de perfección visual, fluidez y arquitectura inmersiva." },
    "/system.conf": { type: "file", content: "CORE_ENGINE=OMNI_QUANTUM_HYPER_VOID_SUPREME\nDEBUG_MODE=FALSE\nSAFETY_MODE=ENABLED\nANIMATION_ENGINE=ULTRA_FLUID_240FPS\nTHEME=SUPREME_NEON" },
    "/quantum.dat": { type: "file", content: "QUANTUM_SIGNATURE: 0xFF9988AAB2773399 // SECURE OMNI MESH HASH VERIFIED." },
    "/omni_core.log": { type: "file", content: "[LOG] All supreme subroutines fully operational. Zero latency pipeline confirmed." },
    "/home/muncix_op/bio.txt": { type: "file", content: "Desarrollador Principal: Muncix_Op\nEspecialidades: Roblox Studio (Jujutsu Shenanigans), Modelado 3D Blockbench de Alta Gama, Desmos Audio & Gráficos Computacionales." },
    "/home/muncix_op/socials.log": { type: "file", content: "TikTok: @muncixop\nX / Twitter: @MuncixOp\nCurseForge: muncixop" },
    "/home/muncix_op/projects.md": { type: "file", content: "# Proyectos Destacados Omni\n- Jujutsu Shenanigans Custom Movesets (Advanced Luau)\n- Blockbench Supreme 3D Assets & Rigging\n- Tyler, The Creator Audio Synthesis in Desmos Calculators" },
    "/home/muncix_op/achievements.txt": { type: "file", content: "- Master of Code Architecture\n- Quantum Mesh Pioneer\n- 100% Perfectionist Rating Achieved" },
    "/home/developer/roblox_jjs_yuta.lua": { type: "file", content: "-- Jujutsu Shenanigans: Custom Yuta Okkotsu advanced moveset script v10 (Omni Optimized)" },
    "/home/developer/blockbench_model.json": { type: "file", content: "{\"model_name\": \"Muncix_QuantumBlade_OmniSupreme\", \"format_version\": \"1.16\", \"software\": \"Blockbench Desktop Ultimate\"}" },
    "/home/developer/desmos_synth.js": { type: "file", content: "// Desmos audio synthesis mapping for Tyler, The Creator - Are We Still Friends? [Full Supreme Math Equiv]" },
    "/home/developer/quantum_core.cpp": { type: "file", content: "#include <quantum_omni.h>\nint main() { quantum::initialize_omni_supreme_void(); return 0; }" },
    "/home/developer/shaders_glsl.frag": { type: "file", content: "uniform vec2 u_resolution; uniform float u_time;\nvoid main() { vec2 st = gl_FragCoord.xy/u_resolution; gl_FragColor = vec4(vec3(abs(sin(u_time))), 1.0); }" },
    "/home/guest/welcome_guest.txt": { type: "file", content: "Bienvenido al núcleo cuántico omni supremo. Escribe 'help' o abre la paleta de comandos con Ctrl+K." }
};

const terminalSessionsMap = {};

/* ========================================================================== */
/* GESTIÓN DE VENTANAS Y COMPORTAMIENTO OMNI                                  */
/* ========================================================================== */

function setupOmniWindowBehaviors(winEl, headerEl, closeBtn, minBtn, maxBtn, isMainTerminal) {
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
        bringWindowToFront(winEl);
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
            playGlitchFXSound();
            winEl.classList.add('glitch-active');
            const outputEl = winEl.querySelector('[id$="_output"]');
            if (outputEl) appendTerminalLine(outputEl, "[~] OMNI WATCHDOG: El núcleo principal está protegido contra cierre forzoso.", "warning");
            showToast("El núcleo principal está protegido.", "warning");
            setTimeout(() => winEl.classList.remove('glitch-active'), 500);
        } else {
            winEl.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
            winEl.style.transform = 'scale(0.82) translateY(30px)';
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

    winEl.addEventListener('mousedown', () => bringWindowToFront(winEl));
}

let topZIndex = 20;
function bringWindowToFront(winEl) {
    topZIndex++;
    winEl.style.zIndex = topZIndex;
}

function setupTerminalInterfaceLogic(inputEl, outputContainerEl, bodyEl, winId) {
    let historyStack = [];
    let historyIndex = -1;

    terminalSessionsMap[winId] = { cwd: "/", authStep: 0 };

    inputEl.addEventListener('input', () => playKeyClickSound());

    inputEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            playEnterActionSound();
            const val = inputEl.value.trim();
            if (val !== '') {
                historyStack.push(val);
                historyIndex = historyStack.length;
            }

            const session = terminalSessionsMap[winId];
            if (session && session.authStep > 0) {
                handleAuthFlowOmni(val, outputContainerEl, session);
                inputEl.value = '';
                return;
            }

            appendTerminalLine(outputContainerEl, `<span style="color: var(--neon-cyan);">muncix@omni:${session.cwd}#</span> ${escapeHtml(val)}`, '');
            processOmniCommand(val, outputContainerEl, bodyEl, winId, session);
            inputEl.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                inputEl.value = historyStack[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < historyStack.length - 1) {
                historyIndex++;
                inputEl.value = historyStack[historyIndex];
            } else {
                historyIndex = historyStack.length;
                inputEl.value = '';
            }
            e.preventDefault();
        }
    });

    bodyEl.addEventListener('click', () => inputEl.focus());
}

function handleAuthFlowOmni(val, outContainer, session) {
    appendTerminalLine(outContainer, `<span style="color: var(--neon-purple);">auth@omni:~#</span> ${escapeHtml(val || '[BYPASS]')}`, '');

    if (session.authStep === 1) {
        session.authStep = 2;
        appendTerminalLine(outContainer, "[+] FASE 1: Token de seguridad cuántica supremo validado con éxito.", "success");
        appendTerminalLine(outContainer, "[?] FASE 2/2: Escribe 'CONFIRMAR' para descifrar los canales oficiales de Muncix_Op:", "warning");
    } else if (session.authStep === 2) {
        session.authStep = 0;
        appendTerminalLine(outContainer, "[✔] ACCESO SUPREMO CONCEDIDO: Canales oficiales descifrados.", "success");
        appendTerminalLine(outContainer, `
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

function appendTerminalLine(container, html, className = '') {
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
/* LIENZOS GRÁFICOS OMNI (MATRIX, PARTÍCULAS, RED NEURONAL, RAYTRACER)        */
/* ========================================================================== */

let matrixRainActive = true;

function initOmniVisuals() {
    // 1. Matrix Rain WebGL / Canvas
    const matrixCanvas = document.getElementById('quantumMatrixCanvas');
    const mCtx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    const glyphs = '0123456789ABCDEF@#$_-MUNCIXOMNI';
    const fSize = 14;
    const colCount = matrixCanvas.width / fSize;
    const dropArr = Array(Math.floor(colCount)).fill(1);

    setInterval(() => {
        if (!matrixRainActive) return;
        mCtx.fillStyle = 'rgba(0, 1, 3, 0.15)';
        mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        mCtx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        mCtx.font = fSize + 'px monospace';
        for (let i = 0; i < dropArr.length; i++) {
            const ch = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
            mCtx.fillText(ch, i * fSize, dropArr[i] * fSize);
            if (dropArr[i] * fSize > matrixCanvas.height && Math.random() > 0.97) dropArr[i] = 0;
            dropArr[i]++;
        }
    }, 30);

    // 2. Partículas Cuánticas Supremas Flotantes
    const pCanvas = document.getElementById('particleFieldCanvas');
    const pCtx = pCanvas.getContext('2d');
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
    
    const partList = Array.from({ length: 80 }, () => ({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        radius: Math.random() * 2.2 + 1,
        alpha: Math.random() * 0.6 + 0.25
    }));

    function renderParticlesOmni() {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        partList.forEach(p => {
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
        requestAnimationFrame(renderParticlesOmni);
    }
    renderParticlesOmni();

    // 3. Red Neuronal Mesh Cinemática
    const nCanvas = document.getElementById('neuralMeshCanvas');
    const nCtx = nCanvas.getContext('2d');
    nCanvas.width = window.innerWidth;
    nCanvas.height = window.innerHeight;

    const nodes = Array.from({ length: 30 }, () => ({
        x: Math.random() * nCanvas.width,
        y: Math.random() * nCanvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    }));

    function renderNeuralMesh() {
        nCtx.clearRect(0, 0, nCanvas.width, nCanvas.height);
        nCtx.strokeStyle = 'rgba(0, 255, 102, 0.12)';
        nCtx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {
            nodes[i].x += nodes[i].vx;
            nodes[i].y += nodes[i].vy;
            if (nodes[i].x < 0 || nodes[i].x > nCanvas.width) nodes[i].vx *= -1;
            if (nodes[i].y < 0 || nodes[i].y > nCanvas.height) nodes[i].vy *= -1;

            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                if (dist < 140) {
                    nCtx.beginPath();
                    nCtx.moveTo(nodes[i].x, nodes[i].y);
                    nCtx.lineTo(nodes[j].x, nodes[j].y);
                    nCtx.stroke();
                }
            }
        }
        requestAnimationFrame(renderNeuralMesh);
    }
    renderNeuralMesh();

    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        pCanvas.width = window.innerWidth;
        pCanvas.height = window.innerHeight;
        nCanvas.width = window.innerWidth;
        nCanvas.height = window.innerHeight;
    });
}

/* ========================================================================== */
/* PROCESADOR DE COMANDOS DEL SISTEMA OMNI                                    */
/* ========================================================================== */

function processOmniCommand(rawCmd, outContainer, bodyEl, winId, session) {
    const parts = rawCmd.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch(cmd) {
        case 'help':
            appendTerminalLine(outContainer, `Comandos omni-supremos disponibles en MUNCIX_OS v999.9:
  ls           - Lista los archivos del directorio virtual actual
  cd <dir>     - Cambia de directorio virtual en el árbol
  cat <file>   - Visualiza el contenido detallado de cualquier archivo
  ping <host>  - Simula envío de paquetes cuánticos ICMP de ultra alta velocidad
  sysinfo      - Reporte profundo del núcleo, memoria y hardware omni
  whoami       - Muestra el usuario activo con privilegios absolutos de raíz
  date         - Muestra la marca temporal del núcleo cuántico sincronizado
  socials      - Muestra y descifra las redes oficiales de Muncix_Op
  matrix       - Alterna la lluvia de código digital en pantalla
  glitch       - Genera una anomalía cromática y glitch global de interfaz
  theme        - Rota la paleta de colores neón del ecosistema
  audio        - Alterna los efectos de sonido sintetizados
  clear        - Limpia por completo la pantalla de la terminal
  window       - Abre una subterminal cuántica adicional flotante
  reboot       - Reinicia el núcleo del sistema operativo al instante`, 'system');
            break;

        case 'ls':
            const currentDir = omniVirtualFileSystem[session.cwd];
            if (currentDir && currentDir.contents) {
                appendTerminalLine(outContainer, currentDir.contents.join('   '), 'success');
            } else {
                appendTerminalLine(outContainer, "Error: directorio no válido en la malla.", "error");
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
                if (omniVirtualFileSystem[target] && omniVirtualFileSystem[target].type === 'dir') {
                    session.cwd = target;
                } else {
                    appendTerminalLine(outContainer, `cd: no such file or directory: ${arg}`, 'error');
                }
            }
            const promptEl = bodyEl.closest('.terminal-window').querySelector('.prompt');
            if (promptEl) promptEl.innerText = `muncix@omni:${session.cwd}#`;
            break;

        case 'cat':
            if (!arg) {
                appendTerminalLine(outContainer, "Uso: cat <archivo>", "warning");
                break;
            }
            let filePath = arg.startsWith('/') ? arg : (session.cwd === '/' ? '/' + arg : session.cwd + '/' + arg);
            if (omniVirtualFileSystem[filePath] && omniVirtualFileSystem[filePath].type === 'file') {
                appendTerminalLine(outContainer, omniVirtualFileSystem[filePath].content, 'system');
            } else {
                appendTerminalLine(outContainer, `cat: ${arg}: Archivo no encontrado en el sistema`, 'error');
            }
            break;

        case 'ping':
            const targetHost = arg || 'omni.quantum.supreme.node';
            appendTerminalLine(outContainer, `PING ${targetHost} (127.0.0.1) 56 bytes of data.`, 'system');
            let pings = 0;
            const pingInterval = setInterval(() => {
                pings++;
                const time = (Math.random() * 0.7 + 0.05).toFixed(2);
                appendTerminalLine(outContainer, `64 bytes from ${targetHost}: icmp_seq=${pings} time=${time} ms`, 'success');
                if (pings >= 4) clearInterval(pingInterval);
            }, 220);
            break;

        case 'sysinfo':
            appendTerminalLine(outContainer, `OS: MUNCIX_OS v999.9 OMNI-QUANTUM | Kernel: OmniVoid-X12 | Arch: x86_64-OMNI | Latency: 0.02ms`, 'system');
            break;

        case 'whoami':
            appendTerminalLine(outContainer, `muncix_op (UID: 0 [OMNI_QUANTUM_SUPREME_ROOT])`, 'success');
            break;

        case 'date':
            appendTerminalLine(outContainer, `Fri Sep 4 10:08:47 UTC 2026 [QUANTUM_OMNI_SYNC_OK]`, 'system');
            break;

        case 'matrix':
            matrixRainActive = !matrixRainActive;
            appendTerminalLine(outContainer, `Lluvia Matrix state: ${matrixRainActive ? 'ENABLED' : 'DISABLED'}`, 'success');
            showToast(`Lluvia Matrix: ${matrixRainActive ? 'Activa' : 'Pausada'}`, 'info');
            break;

        case 'glitch':
            playGlitchFXSound();
            const win = bodyEl.closest('.terminal-window');
            win.classList.add('glitch-active');
            setTimeout(() => win.classList.remove('glitch-active'), 500);
            appendTerminalLine(outContainer, "[!] Anomalía cuántica omni provocada con éxito.", "warning");
            showToast("¡Glitch visual forzado en el sistema!", "warning");
            break;

        case 'theme':
            const themes = ['theme-supreme', 'theme-cyan', 'theme-purple', 'theme-danger', 'theme-gold'];
            const currentThemeIndex = themes.findIndex(t => document.body.classList.contains(t));
            const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
            themes.forEach(t => document.body.classList.remove(t));
            document.body.classList.add(nextTheme);
            appendTerminalLine(outContainer, `Tema visual actualizado: ${nextTheme.toUpperCase()}`, 'success');
            showToast(`Tema cambiado: ${nextTheme.toUpperCase()}`, 'success');
            break;

        case 'audio':
            audioEnabled = !audioEnabled;
            appendTerminalLine(outContainer, `Sintetizador de audio: ${audioEnabled ? 'ACTIVADO' : 'SILENCIADO'}`, 'success');
            showToast(`Audio: ${audioEnabled ? 'Activado' : 'Silenciado'}`, 'success');
            break;

        case 'clear':
            outContainer.innerHTML = '';
            break;

        case 'window':
            spawnNewOmniSubTerminal();
            appendTerminalLine(outContainer, "Nueva subterminal cuántica flotante abierta con éxito.", "success");
            showToast("Subterminal abierta", "success");
            break;

        case 'socials':
            session.authStep = 1;
            appendTerminalLine(outContainer, "[!] VERIFICACIÓN DE SEGURIDAD CUÁNTICA OMNI:", "warning");
            appendTerminalLine(outContainer, "[?] Escribe cualquier valor o presiona ENTER para continuar:", "warning");
            break;

        case 'reboot':
            appendTerminalLine(outContainer, "Reiniciando núcleo cuántico omni supremo...", "error");
            showToast("Reiniciando sistema operativo...", "error");
            setTimeout(() => location.reload(), 900);
            break;

        case '':
            break;

        default:
            appendTerminalLine(outContainer, `comando no reconocido: '${escapeHtml(cmd)}'. Escribe 'help' para ver la lista de comandos.`, 'error');
            break;
    }
}

let subWinCount = 0;
function spawnNewOmniSubTerminal() {
    subWinCount++;
    const winId = 'subWin_' + subWinCount;
    const offX = (subWinCount * 45) % 240;
    const offY = (subWinCount * 45) % 140;
    createTerminalWindow(winId, `OMNI_SHELL #${subWinCount}`, `${9900 + subWinCount}`, `top: calc(7vh + ${offY}px); left: calc(8vw + ${offX}px);`, false);
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
            <div class="output-line system">MUNCIX_OMNI_QUANTUM_KERNEL [Versión 999.9 SUPREME]</div>
            <div class="output-line system corrupted-text">Escribe 'help' para explorar el sistema o usa Ctrl+K.</div>
            <div class="output-line" style="margin-bottom: 10px;">--------------------------------------------------------------------------------</div>
            
            <div id="${winId}_output"></div>

            <div class="input-line">
                <span class="prompt">muncix@omni:/#</span>
                <input type="text" id="${winId}_input" class="command-input" autocomplete="off" spellcheck="false">
            </div>
        </div>

        <div class="terminal-footer-hint">
            <span>OMNI STATUS: 100% OPTIMAL / SECURE ENCLAVE</span>
            <span>UTF-8 // 240 FPS ULTRA FLUID</span>
        </div>
    `;

    container.appendChild(winDiv);

    setupOmniWindowBehaviors(
        winDiv,
        winDiv.querySelector('.terminal-header'),
        document.getElementById(`${winId}_close`),
        document.getElementById(`${winId}_min`),
        document.getElementById(`${winId}_max`),
        isMainTerminal
    );

    setupTerminalInterfaceLogic(
        document.getElementById(`${winId}_input`),
        document.getElementById(`${winId}_output`),
        document.getElementById(`${winId}_body`),
        winId
    );

    document.getElementById(`${winId}_input`).focus();
}

/* ========================================================================== */
/* SISTEMA DE TOASTS Y PALETA DE COMANDOS OMNI (MODAL)                        */
/* ========================================================================== */

function showToast(message, type = 'info') {
    const container = document.getElementById('toastNotificationContainer');
    const toast = document.createElement('div');
    toast.className = 'toast-box';
    
    let icon = '⚡';
    if (type === 'success') icon = '✔';
    if (type === 'warning') icon = '⚠';
    if (type === 'error') icon = '✖';

    toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toast-out-omni 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => toast.remove(), 350);
    }, 3600);
}

// Paleta de comandos omni modal (Ctrl+K)
const paletteModalEl = document.getElementById('commandPaletteModal');
const paletteSearchInputEl = document.getElementById('paletteSearchInput');
const paletteResultsEl = document.getElementById('paletteResults');

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        paletteModalEl.classList.toggle('hidden');
        if (!paletteModalEl.classList.contains('hidden')) {
            paletteSearchInputEl.focus();
        }
    } else if (e.key === 'Escape' && !paletteModalEl.classList.contains('hidden')) {
        paletteModalEl.classList.add('hidden');
    }
});

paletteModalEl.addEventListener('click', (e) => {
    if (e.target === paletteModalEl) paletteModalEl.classList.add('hidden');
});

paletteResultsEl.addEventListener('click', (e) => {
    const row = e.target.closest('.palette-row');
    if (row) {
        const cmd = row.getAttribute('data-cmd');
        paletteModalEl.classList.add('hidden');
        const mainInput = document.getElementById('mainTerminal_input');
        if (mainInput) {
            mainInput.value = cmd;
            mainInput.focus();
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            mainInput.dispatchEvent(event);
        }
    }
});

paletteSearchInputEl.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const rows = paletteResultsEl.querySelectorAll('.palette-row');
    rows.forEach(r => {
        const txt = r.innerText.toLowerCase();
        r.style.display = txt.includes(query) ? 'flex' : 'none';
    });
});

/* ========================================================================== */
/* DOCK FLOTANTE OMNI EVENTOS                                                 */
/* ========================================================================== */

document.getElementById('dockBtnTerminal').addEventListener('click', () => spawnNewOmniSubTerminal());
document.getElementById('dockBtnPalette').addEventListener('click', () => {
    paletteModalEl.classList.toggle('hidden');
    if (!paletteModalEl.classList.contains('hidden')) paletteSearchInputEl.focus();
});
document.getElementById('dockBtnAudio').addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    showToast(`Efectos de sonido: ${audioEnabled ? 'Activados' : 'Silenciados'}`, 'success');
});
document.getElementById('dockBtnMatrix').addEventListener('click', () => {
    matrixRainActive = !matrixRainActive;
    showToast(`Lluvia Matrix: ${matrixRainActive ? 'Activa' : 'Pausada'}`, 'info');
});
document.getElementById('dockBtnGlitch').addEventListener('click', () => {
    playGlitchFXSound();
    document.querySelectorAll('.terminal-window').forEach(w => {
        w.classList.add('glitch-active');
        setTimeout(() => w.classList.remove('glitch-active'), 500);
    });
    showToast("¡Anomalía global disparada en todo el sistema!", "warning");
});
document.getElementById('dockBtnTheme').addEventListener('click', () => {
    const themes = ['theme-supreme', 'theme-cyan', 'theme-purple', 'theme-danger', 'theme-gold'];
    const currentThemeIndex = themes.findIndex(t => document.body.classList.contains(t));
    const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
    themes.forEach(t => document.body.classList.remove(t));
    document.body.classList.add(nextTheme);
    showToast(`Tema cambiado: ${nextTheme.toUpperCase()}`, 'success');
});
document.getElementById('dockBtnMax').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        showToast("Modo Inmersivo Completo Activado", "success");
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            showToast("Modo Inmersivo Desactivado", "info");
        }
    }
});
