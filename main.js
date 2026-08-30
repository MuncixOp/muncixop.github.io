const ua=navigator.userAgent;
const os=(()=>{
  if(/iPhone|iPad|iPod/.test(ua))return'ios';
  if(/Android/.test(ua))return'android';
  if(/Mac|Darwin/.test(ua))return'mac';
  if(/Win/.test(ua))return'win';
  if(/Linux/.test(ua))return'linux';
  return'linux'
})();
const mob=os==='ios'||os==='android'||matchMedia('(max-width:700px)').matches;
const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.body.classList.add('os-'+os);

/* ============================================
   AUDIO ENGINE — GLITCHY
   ============================================ */
let actx=null;
function audio(){
  if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();
  if(actx.state==='suspended')actx.resume();
  return actx
}

function noiseBuf(a,dur){
  const b=a.createBuffer(1,a.sampleRate*dur,a.sampleRate);
  const d=b.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  return b
}

function playKey(){
  try{
    const a=audio(),t=a.currentTime;
    const o1=a.createOscillator(),o2=a.createOscillator(),g=a.createGain();
    o1.type='square';o1.frequency.value=600+Math.random()*600;
    o2.type='sawtooth';o2.frequency.value=1200+Math.random()*1200;
    o2.detune.value=Math.random()*50-25;
    g.gain.setValueAtTime(.025,t);
    g.gain.exponentialRampToValueAtTime(.001,t+.03);
    o1.connect(g);o2.connect(g);g.connect(a.destination);
    o1.start(t);o1.stop(t+.03);o2.start(t);o2.stop(t+.03);
    const n=a.createBufferSource(),ng=a.createGain();
    n.buffer=noiseBuf(a,.02);ng.gain.setValueAtTime(.015,t);
    ng.gain.exponentialRampToValueAtTime(.001,t+.02);
    n.connect(ng);ng.connect(a.destination);n.start(t);n.stop(t+.02)
  }catch{}
}

function playEnter(){
  try{
    const a=audio(),t=a.currentTime;
    const o1=a.createOscillator(),o2=a.createOscillator(),g=a.createGain();
    o1.type='square';o1.frequency.setValueAtTime(400,t);
    o1.frequency.exponentialRampToValueAtTime(1600,t+.06);
    o2.type='sawtooth';o2.frequency.setValueAtTime(800,t);
    o2.frequency.exponentialRampToValueAtTime(200,t+.08);
    g.gain.setValueAtTime(.05,t);
    g.gain.exponentialRampToValueAtTime(.001,t+.1);
    o1.connect(g);o2.connect(g);g.connect(a.destination);
    o1.start(t);o1.stop(t+.1);o2.start(t);o2.stop(t+.1);
    const n=a.createBufferSource(),ng=a.createGain();
    n.buffer=noiseBuf(a,.05);ng.gain.setValueAtTime(.04,t);
    ng.gain.exponentialRampToValueAtTime(.001,t+.05);
    n.connect(ng);ng.connect(a.destination);n.start(t);n.stop(t+.05)
  }catch{}
}

function playError(){
  try{
    const a=audio(),t=a.currentTime;
    const o1=a.createOscillator(),o2=a.createOscillator(),g=a.createGain();
    o1.type='sawtooth';o1.frequency.setValueAtTime(300,t);
    o1.frequency.exponentialRampToValueAtTime(60,t+.3);
    o2.type='square';o2.frequency.setValueAtTime(150,t);
    o2.frequency.exponentialRampToValueAtTime(30,t+.25);
    o2.detune.value=30;
    g.gain.setValueAtTime(.08,t);
    g.gain.exponentialRampToValueAtTime(.001,t+.35);
    o1.connect(g);o2.connect(g);g.connect(a.destination);
    o1.start(t);o1.stop(t+.35);o2.start(t);o2.stop(t+.35);
    const n=a.createBufferSource(),ng=a.createGain();
    n.buffer=noiseBuf(a,.15);ng.gain.setValueAtTime(.06,t);
    ng.gain.exponentialRampToValueAtTime(.001,t+.15);
    n.connect(ng);ng.connect(a.destination);n.start(t);n.stop(t+.15)
  }catch{}
}

function playSuccess(){
  try{
    const a=audio(),t=a.currentTime;
    [500,750,1000,1250].forEach((f,i)=>{
      const o=a.createOscillator(),g=a.createGain();
      o.type='square';o.frequency.value=f;
      g.gain.setValueAtTime(.04,t+i*.05);
      g.gain.exponentialRampToValueAtTime(.001,t+i*.05+.12);
      o.connect(g);g.connect(a.destination);
      o.start(t+i*.05);o.stop(t+i*.05+.12)
    })
  }catch{}
}

function playGlitch(){
  try{
    const a=audio(),t=a.currentTime;
    const n1=a.createBufferSource(),g1=a.createGain();
    n1.buffer=noiseBuf(a,.15);
    g1.gain.setValueAtTime(.08,t);
    g1.gain.exponentialRampToValueAtTime(.001,t+.15);
    n1.connect(g1);g1.connect(a.destination);n1.start(t);n1.stop(t+.15);
    const o=a.createOscillator(),g2=a.createGain();
    o.type='sawtooth';o.frequency.setValueAtTime(2000,t);
    o.frequency.exponentialRampToValueAtTime(100,t+.1);
    g2.gain.setValueAtTime(.05,t);
    g2.gain.exponentialRampToValueAtTime(.001,t+.1);
    o.connect(g2);g2.connect(a.destination);o.start(t);o.stop(t+.1);
    const n2=a.createBufferSource(),g3=a.createGain();
    n2.buffer=noiseBuf(a,.08);
    g3.gain.setValueAtTime(.06,t+.05);
    g3.gain.exponentialRampToValueAtTime(.001,t+.13);
    n2.connect(g3);g3.connect(a.destination);n2.start(t+.05);n2.stop(t+.13)
  }catch{}
}

function playBoot(){
  try{
    const a=audio(),t=a.currentTime;
    const o1=a.createOscillator(),o2=a.createOscillator(),g=a.createGain();
    o1.type='sine';o1.frequency.setValueAtTime(110,t);
    o1.frequency.exponentialRampToValueAtTime(440,t+.4);
    o2.type='square';o2.frequency.setValueAtTime(220,t);
    o2.frequency.exponentialRampToValueAtTime(880,t+.3);
    g.gain.setValueAtTime(.04,t);
    g.gain.exponentialRampToValueAtTime(.001,t+.5);
    o1.connect(g);o2.connect(g);g.connect(a.destination);
    o1.start(t);o1.stop(t+.5);o2.start(t);o2.stop(t+.5);
    const n=a.createBufferSource(),ng=a.createGain();
    n.buffer=noiseBuf(a,.2);ng.gain.setValueAtTime(.02,t);
    ng.gain.exponentialRampToValueAtTime(.001,t+.2);
    n.connect(ng);ng.connect(a.destination);n.start(t);n.stop(t+.2)
  }catch{}
}

function playCorrupt(){
  try{
    const a=audio(),t=a.currentTime;
    const buf=a.createBuffer(1,a.sampleRate*.4,a.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++){
      const p=i/d.length;
      d[i]=(Math.random()*2-1)*Math.sin(p*Math.PI)*(
        .3+.7*Math.abs(Math.sin(p*30))+
        .3*Math.sin(p*100)*Math.sin(p*7)
      )
    }
    const s=a.createBufferSource(),g=a.createGain();
    s.buffer=buf;
    g.gain.setValueAtTime(.12,t);
    g.gain.exponentialRampToValueAtTime(.001,t+.4);
    s.connect(g);g.connect(a.destination);s.start(t);s.stop(t+.4);
    const o=a.createOscillator(),g2=a.createGain();
    o.type='sawtooth';o.frequency.setValueAtTime(500,t);
    o.frequency.exponentialRampToValueAtTime(50,t+.35);
    o.detune.value=50;
    g2.gain.setValueAtTime(.08,t);
    g2.gain.exponentialRampToValueAtTime(.001,t+.35);
    o.connect(g2);g2.connect(a.destination);o.start(t);o.stop(t+.35)
  }catch{}
}

/* ============================================
   CANVAS MATRIX / BACKGROUND RAIN
   ============================================ */
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
let cw,ch,cols,drops;
function resizeCanvas(){
  cw=canvas.width=window.innerWidth;
  ch=canvas.height=window.innerHeight;
  cols=Math.floor(cw/18);
  drops=new Array(cols).fill(1);
}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();

const chars='01abcdefABCDEFXYZ<>/*-_=+@#~';
function drawMatrix(){
  ctx.fillStyle='rgba(6, 6, 6, 0.08)';
  ctx.fillRect(0,0,cw,ch);
  ctx.fillStyle='#00ff41';
  ctx.font='13px monospace';
  for(let i=0;i<drops.length;i++){
    const text=chars.charAt(Math.floor(Math.random()*chars.length));
    ctx.fillText(text,i*18,drops[i]*18);
    if(drops[i]*18>ch&&Math.random()>0.975)drops[i]=0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}
requestAnimationFrame(drawMatrix);

/* ============================================
   WINDOW MANAGEMENT & REAL MOVING DRAG LOGIC
   ============================================ */
const winsContainer=document.getElementById('wins');
const ki=document.getElementById('ki');
let windowsList=[];
let activeWin=null;
let topZ=10;

function createTerminalWindow(title='~/muncixop', customCmds=null){
  topZ++;
  const win=document.createElement('div');
  win.className='win';
  win.style.zIndex=topZ;

  // Initial centering or offset calculation
  const offset=(windowsList.length%5)*24;
  const initX=Math.max(12,(window.innerWidth - Math.min(660, window.innerWidth * 0.92)) / 2 + offset);
  const initY=Math.max(12,(window.innerHeight - 450) / 2 + offset);
  win.style.left=initX+'px';
  win.style.top=initY+'px';

  win.innerHTML=`
    <div class="win-bar">
      <div class="btns">
        <div class="btn close" title="Cerrar"></div>
        <div class="btn min" title="Minimizar"></div>
        <div class="btn max" title="Maximizar"></div>
      </div>
      <div class="win-title">${title}</div>
      <div class="btns-r"></div>
    </div>
    <div class="win-body"></div>
    <div class="rz" title="Redimensionar"></div>
    <div class="glitch-overlay">
      <div class="rgb-c"></div>
      <div class="rgb-m"></div>
      <div class="flash"></div>
      <div class="sl" style="top:20%;height:4px"></div>
      <div class="sl" style="top:60%;height:8px"></div>
    </div>
  `;

  winsContainer.appendChild(win);
  windowsList.push(win);

  const bar=win.querySelector('.win-bar');
  const body=win.querySelector('.win-body');
  const rz=win.querySelector('.rz');
  const btnClose=win.querySelector('.btn.close');
  const btnMin=win.querySelector('.btn.min');
  const btnMax=win.querySelector('.btn.max');

  // Bring to front on focus / click
  win.addEventListener('pointerdown',()=>focusWindow(win));

  // --- DRAGGING LOGIC (VENTANA DE VERDAD QUE SE PUEDE MOVER) ---
  let isDragging=false;
  let startX=0, startY=0, winStartX=0, winStartY=0;

  bar.addEventListener('pointerdown',(e)=>{
    if(win.classList.contains('maximized'))return;
    isDragging=true;
    bar.setPointerCapture(e.pointerId);
    startX=e.clientX;
    startY=e.clientY;
    const rect=win.getBoundingClientRect();
    winStartX=rect.left;
    winStartY=rect.top;
    focusWindow(win);
    e.preventDefault();
  });

  bar.addEventListener('pointermove',(e)=>{
    if(!isDragging)return;
    const dx=e.clientX-startX;
    const dy=e.clientY-startY;
    let newX=winStartX+dx;
    let newY=winStartY+dy;

    // Boundaries check (keep title bar accessible)
    newX=Math.max(-win.offsetWidth+60, Math.min(window.innerWidth-60, newX));
    newY=Math.max(0, Math.min(window.innerHeight-40, newY));

    win.style.left=newX+'px';
    win.style.top=newY+'px';
  });

  bar.addEventListener('pointerup',(e)=>{
    if(isDragging){
      isDragging=false;
      try{bar.releasePointerCapture(e.pointerId);}catch{}
    }
  });

  // --- RESIZING LOGIC ---
  let isResizing=false;
  let rzStartX=0, rzStartY=0, startW=0, startH=0;

  rz.addEventListener('pointerdown',(e)=>{
    if(win.classList.contains('maximized'))return;
    isResizing=true;
    rz.setPointerCapture(e.pointerId);
    rzStartX=e.clientX;
    rzStartY=e.clientY;
    startW=win.offsetWidth;
    startH=win.offsetHeight;
    focusWindow(win);
    e.preventDefault();
  });

  rz.addEventListener('pointermove',(e)=>{
    if(!isResizing)return;
    const dw=e.clientX-rzStartX;
    const dh=e.clientY-rzStartY;
    win.style.width=Math.max(300, startW+dw)+'px';
    win.style.height=Math.max(180, startH+dh)+'px';
  });

  rz.addEventListener('pointerup',(e)=>{
    if(isResizing){
      isResizing=false;
      try{rz.releasePointerCapture(e.pointerId);}catch{}
    }
  });

  // --- WINDOW BUTTONS ---
  btnClose.addEventListener('click',(e)=>{
    e.stopPropagation();
    playCorrupt();
    win.classList.add('corrupt-shake');
    btnClose.classList.add('corrupt');
    setTimeout(()=>{
      win.remove();
      windowsList=windowsList.filter(w=>w!==win);
      if(activeWin===win)activeWin=null;
    },600);
  });

  btnMin.addEventListener('click',(e)=>{
    e.stopPropagation();
    win.classList.add('minimized');
    createDockIfNeeded();
  });

  btnMax.addEventListener('click',(e)=>{
    e.stopPropagation();
    if(win.classList.contains('maximized')){
      win.classList.remove('maximized');
      win.style.left=initX+'px';
      win.style.top=initY+'px';
    }else{
      win.classList.add('maximized');
    }
  });

  // Initialize Terminal Instance inside body
  initTerminalInstance(body, win, customCmds);
  focusWindow(win);
  return win;
}

function focusWindow(win){
  topZ++;
  win.style.zIndex=topZ;
  activeWin=win;
  windowsList.forEach(w=>w.style.borderColor=(w===win)?'#444':'#222');
  setTimeout(()=>ki.focus(),50);
}

/* ============================================
   DOCK FOR MINIMIZED WINDOWS
   ============================================ */
let dockEl=null;
function createDockIfNeeded(){
  if(dockEl)return;
  dockEl=document.createElement('div');
  dockEl.className='dock on';
  document.body.appendChild(dockEl);
  updateDock();
}

function updateDock(){
  if(!dockEl)return;
  dockEl.innerHTML='';
  windowsList.forEach((win,idx)=>{
    if(win.classList.contains('minimized')){
      const title=win.querySelector('.win-title').textContent;
      const item=div('dock-item',title);
      item.onclick=()=>{
        win.classList.remove('minimized');
        focusWindow(win);
        checkDockState();
      };
      dockEl.appendChild(item);
    }
  });
  checkDockState();
}

function checkDockState(){
  if(!dockEl)return;
  const anyMin=windowsList.some(w=>w.classList.contains('minimized'));
  if(!anyMin){
    dockEl.classList.remove('on');
    setTimeout(()=>{if(dockEl){dockEl.remove();dockEl=null;}},400);
  }
}

function div(cls,txt=''){
  const d=document.createElement('div');
  if(cls)d.className=cls;
  if(txt)d.textContent=txt;
  return d;
}

/* ============================================
   TERMINAL INTERACTIVE LOGIC & COMMANDS
   ============================================ */
function initTerminalInstance(body, winInstance, customCmds){
  let history=[];
  let histIdx=-1;
  let currentInput='';

  function print(text, cls='', isHtml=false){
    const line=document.createElement('div');
    line.className='out'+(cls?' '+cls:'');
    if(isHtml) line.innerHTML=text;
    else line.textContent=text;
    body.appendChild(line);
    body.scrollTop=body.scrollHeight;
    return line;
  }

  function printWelcome(){
    print('VOID SYSTEMS v4.92 — SECURE KERNEL', 'ok');
    print('Escribe "help" para ver los comandos disponibles.', 'dim');
    print('');
  }

  let inputLineEl=null;
  let typedSpan=null;

  function createInputLine(){
    if(inputLineEl && inputLineEl.parentNode)inputLineEl.remove();
    inputLineEl=document.createElement('div');
    inputLineEl.className='input-line';
    const promptSpan=document.createElement('span');
    promptSpan.className='pr';
    promptSpan.textContent='~/muncixop $ ';
    
    typedSpan=document.createElement('span');
    typedSpan.className='typed';
    
    const cursorSpan=document.createElement('span');
    cursorSpan.className='cur';
    cursorSpan.textContent='█';

    inputLineEl.appendChild(promptSpan);
    inputLineEl.appendChild(typedSpan);
    inputLineEl.appendChild(cursorSpan);
    body.appendChild(inputLineEl);
    body.scrollTop=body.scrollHeight;
  }

  function updateInputDisplay(){
    if(typedSpan)typedSpan.textContent=currentInput;
    body.scrollTop=body.scrollHeight;
  }

  // Global key listener routed to active terminal window
  function handleKeyDown(e){
    if(activeWin!==winInstance)return;

    // Prevent default behaviors for special keys
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab','Enter','Backspace'].includes(e.key)){
      e.preventDefault();
    }

    if(e.key==='Enter'){
      playEnter();
      const cmd=currentInput.trim();
      if(inputLineEl)inputLineEl.remove();
      inputLineEl=null;
      
      if(cmd){
        print('~/muncixop $ '+cmd, 'cmd');
        history.push(cmd);
        histIdx=history.length;
        executeCommand(cmd);
      }else{
        createInputLine();
      }
      currentInput='';
    }else if(e.key==='Backspace'){
      playKey();
      currentInput=currentInput.slice(0,-1);
      updateInputDisplay();
    }else if(e.key==='ArrowUp'){
      if(history.length>0&&histIdx>0){
        histIdx--;
        currentInput=history[histIdx];
        updateInputDisplay();
      }
    }else if(e.key==='ArrowDown'){
      if(history.length>0&&histIdx<history.length-1){
        histIdx++;
        currentInput=history[histIdx];
        updateInputDisplay();
      }else{
        histIdx=history.length;
        currentInput='';
        updateInputDisplay();
      }
    }else if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
      playKey();
      currentInput+=e.key;
      updateInputDisplay();
    }
  }

  // Bind typing to hidden input and document listener
  ki.addEventListener('keydown',handleKeyDown);
  body.addEventListener('pointerdown',()=>{
    focusWindow(winInstance);
    ki.focus();
  });

  function executeCommand(rawCmd){
    const parts=rawCmd.split(' ');
    const cmd=parts[0].toLowerCase();
    const args=parts.slice(1);

    switch(cmd){
      case 'help':
        playSuccess();
        print('Comandos disponibles:', 'info');
        print('  help      - Muestra esta lista de ayuda');
        print('  clear     - Limpia la pantalla de la terminal');
        print('  whoami    - Muestra la identidad del usuario actual');
        print('  os        - Muestra información del dispositivo y sistema');
        print('  glitch    - Ejecuta un efecto de distorsión visual y sonora');
        print('  matrix    - Cambia el flujo del sistema de respaldo');
        print('  date      - Muestra la fecha y hora actual del sistema');
        print('  window    - Abre una nueva instancia de terminal flotante');
        print('  echo      - Imprime texto en pantalla');
        print('  exit      - Cierra la ventana actual');
        break;

      case 'clear':
        playSuccess();
        body.innerHTML='';
        break;

      case 'whoami':
        playSuccess();
        print('Usuario activo: muncixop (Nivel de Acceso: Root / Workspace)');
        break;

      case 'os':
        playSuccess();
        print(`Sistema detectado: ${os.toUpperCase()} (${ua})`, 'ok');
        print(`Modo móvil: ${mob ? 'Sí' : 'No'}`);
        break;

      case 'glitch':
        playGlitch();
        triggerGlitchOverlay(winInstance);
        print('¡Alerta de distorsión de datos ejecutada!', 'warn');
        break;

      case 'matrix':
        playBoot();
        document.body.classList.toggle('mx-hit');
        print('Frecuencia del kernel de matriz alterada.', 'ok');
        setTimeout(()=>document.body.classList.remove('mx-hit'), 800);
        break;

      case 'date':
        playSuccess();
        print('Fecha del sistema: '+new Date().toLocaleString());
        break;

      case 'window':
      case 'new':
        playSuccess();
        createTerminalWindow('~/muncixop ['+(windowsList.length+1)+']');
        print('Nueva ventana de terminal desplegada.', 'ok');
        break;

      case 'echo':
        playSuccess();
        print(args.join(' '));
        break;

      case 'exit':
      case 'quit':
        playCorrupt();
        winInstance.classList.add('corrupt-shake');
        setTimeout(()=>winInstance.remove(), 500);
        break;

      default:
        playError();
        print(`Comando no reconocido: "${cmd}". Escribe "help" para ver los comandos válidos.`, 'err');
        break;
    }

    createInputLine();
  }

  printWelcome();
  createInputLine();
}

function triggerGlitchOverlay(win){
  const overlay=win.querySelector('.glitch-overlay');
  if(!overlay)return;
  overlay.classList.add('on');
  setTimeout(()=>overlay.classList.remove('on'), 350);
}

// Boot initial main terminal window
createTerminalWindow('~/muncixop');
