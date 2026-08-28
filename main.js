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
   AUDIO ENGINE (Web Audio API — no files needed)
   ============================================ */
let actx=null;
function audio(){
  if(!actx){
    actx=new(window.AudioContext||window.webkitAudioContext)();
  }
  if(actx.state==='suspended')actx.resume();
  return actx
}

function playKey(){
  try{
    const a=audio(),o=a.createOscillator(),g=a.createGain();
    o.type='square';o.frequency.value=800+Math.random()*400;
    g.gain.setValueAtTime(.03,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.04);
    o.connect(g);g.connect(a.destination);
    o.start(a.currentTime);o.stop(a.currentTime+.04)
  }catch{}
}

function playEnter(){
  try{
    const a=audio(),o=a.createOscillator(),g=a.createGain();
    o.type='sine';o.frequency.setValueAtTime(600,a.currentTime);
    o.frequency.exponentialRampToValueAtTime(1200,a.currentTime+.08);
    g.gain.setValueAtTime(.06,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.12);
    o.connect(g);g.connect(a.destination);
    o.start(a.currentTime);o.stop(a.currentTime+.12)
  }catch{}
}

function playError(){
  try{
    const a=audio(),o=a.createOscillator(),g=a.createGain();
    o.type='sawtooth';o.frequency.setValueAtTime(200,a.currentTime);
    o.frequency.exponentialRampToValueAtTime(80,a.currentTime+.2);
    g.gain.setValueAtTime(.08,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.25);
    o.connect(g);g.connect(a.destination);
    o.start(a.currentTime);o.stop(a.currentTime+.25)
  }catch{}
}

function playSuccess(){
  try{
    const a=audio();
    [400,600,800].forEach((f,i)=>{
      const o=a.createOscillator(),g=a.createGain();
      o.type='sine';o.frequency.value=f;
      g.gain.setValueAtTime(.05,a.currentTime+i*.06);
      g.gain.exponentialRampToValueAtTime(.001,a.currentTime+i*.06+.15);
      o.connect(g);g.connect(a.destination);
      o.start(a.currentTime+i*.06);o.stop(a.currentTime+i*.06+.15)
    })
  }catch{}
}

function playGlitch(){
  try{
    const a=audio();
    const buf=a.createBuffer(1,a.sampleRate*.1,a.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.exp(-i/(d.length*.1));
    const s=a.createBufferSource(),g=a.createGain();
    s.buffer=buf;g.gain.setValueAtTime(.06,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.1);
    s.connect(g);g.connect(a.destination);s.start(a.currentTime)
  }catch{}
}

function playBoot(){
  try{
    const a=audio(),o=a.createOscillator(),g=a.createGain();
    o.type='sine';o.frequency.setValueAtTime(220,a.currentTime);
    o.frequency.exponentialRampToValueAtTime(440,a.currentTime+.3);
    g.gain.setValueAtTime(.04,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.4);
    o.connect(g);g.connect(a.destination);
    o.start(a.currentTime);o.stop(a.currentTime+.4)
  }catch{}
}

function playCorrupt(){
  try{
    const a=audio();
    const buf=a.createBuffer(1,a.sampleRate*.3,a.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++){
      const t=i/d.length;
      d[i]=(Math.random()*2-1)*Math.sin(t*Math.PI)*(.5+.5*Math.sin(t*40))
    }
    const s=a.createBufferSource(),g=a.createGain();
    s.buffer=buf;g.gain.setValueAtTime(.1,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.3);
    s.connect(g);g.connect(a.destination);s.start(a.currentTime)
  }catch{}
}

function playBruteTick(){
  try{
    const a=audio(),o=a.createOscillator(),g=a.createGain();
    o.type='square';o.frequency.value=1200+Math.random()*800;
    g.gain.setValueAtTime(.015,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.02);
    o.connect(g);g.connect(a.destination);
    o.start(a.currentTime);o.stop(a.currentTime+.02)
  }catch{}
}

function playMinimize(){
  try{
    const a=audio(),o=a.createOscillator(),g=a.createGain();
    o.type='sine';o.frequency.setValueAtTime(800,a.currentTime);
    o.frequency.exponentialRampToValueAtTime(200,a.currentTime+.2);
    g.gain.setValueAtTime(.05,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.25);
    o.connect(g);g.connect(a.destination);
    o.start(a.currentTime);o.stop(a.currentTime+.25)
  }catch{}
}

function playMaximize(){
  try{
    const a=audio(),o=a.createOscillator(),g=a.createGain();
    o.type='sine';o.frequency.setValueAtTime(300,a.currentTime);
    o.frequency.exponentialRampToValueAtTime(900,a.currentTime+.2);
    g.gain.setValueAtTime(.05,a.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.25);
    o.connect(g);g.connect(a.destination);
    o.start(a.currentTime);o.stop(a.currentTime+.25)
  }catch{}
}

/* ============================================
   MATRIX RAIN
   ============================================ */
let mxPaused=false;
function pauseMX(){mxPaused=true;document.body.classList.add('mx-hit')}
function resumeMX(){mxPaused=false;document.body.classList.remove('mx-hit')}

const c=document.getElementById('c'),x=c.getContext('2d');
let W,H,cols,drops;
const ch='アイウエオカキクケコサシスセソ0123456789$#@%&*+=<>';
const fs=12;

function rs(){
  const dpr=devicePixelRatio||1;
  W=c.width=innerWidth*dpr;
  H=c.height=innerHeight*dpr;
  c.style.width=innerWidth+'px';
  c.style.height=innerHeight+'px';
  cols=Math.floor(innerWidth/fs);
  drops=Array(cols).fill(1)
}
rs();
addEventListener('resize',rs,{passive:true});

(function mx(){
  if(document.hidden)return;
  if(mxPaused)return;
  const dpr=devicePixelRatio||1;
  const f=fs*dpr;
  x.fillStyle='rgba(6,6,6,.06)';
  x.fillRect(0,0,W,H);
  x.fillStyle='#0f0';
  x.font=f+'px monospace';
  for(let i=0;i<cols;i++){
    x.fillText(ch[Math.random()*ch.length|0],i*f,drops[i]*f);
    if(drops[i]*f>H&&Math.random()>.974)drops[i]=0;
    drops[i]++
  }
  requestAnimationFrame(mx)
})();

/* ============================================
   WORKSPACE
   ============================================ */
const winsEl=document.getElementById('wins');
const ki=document.getElementById('ki');
let zc=1;
const terms=[];
let active=null;
const LS='void_wins_v8';

const dock=document.createElement('div');
dock.className='dock';
dock.setAttribute('role','toolbar');
dock.setAttribute('aria-label','Minimized windows');
winsEl.appendChild(dock);

let errPop=null;

function genToken(){
  const c2='abcdef0123456789';
  let r='';
  for(let i=0;i<8;i++)r+=c2[Math.random()*16|0];
  return r
}

function showErr(t){
  if(errPop)errPop.remove();
  pauseMX();playError();
  errPop=document.createElement('div');
  errPop.className='err-pop';
  errPop.setAttribute('role','alertdialog');
  errPop.setAttribute('aria-label','Connection error');
  const pid=Math.random()*9000+1000|0;
  const up=Math.random()*999|0;
  errPop.innerHTML=`
    <div class="err-glitch-bg"></div>
    <h3>SESSION ${t.id.slice(-4).toUpperCase()} — CONNECTION LOST</h3>
    <p>Terminal process terminated unexpectedly.<br>Session data preserved in memory buffer.</p>
    <span class="err-btn" tabindex="0" role="button">[ RECONNECT ]</span>
    <div class="err-dim">PID ${pid} · uptime ${up}s · exit code 137 · signal SIGKILL</div>
  `;
  winsEl.appendChild(errPop);
  const btn=errPop.querySelector('.err-btn');
  const restore=()=>{
    t.el.classList.remove('minimized');
    t.el.style.zIndex=++zc;
    active=t;
    if(mob)focusKi();
    errPop.remove();errPop=null;
    resumeMX();playSuccess();
    updateDock();save()
  };
  btn.addEventListener('click',restore);
  btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();restore()}})
}

function updateDock(){
  const mins=terms.filter(t=>t.el.classList.contains('minimized'));
  dock.innerHTML='';
  if(!mins.length){dock.classList.remove('on');return}
  dock.classList.add('on');
  mins.forEach(t=>{
    const d=document.createElement('div');
    d.className='dock-item';
    d.textContent=t.title;
    d.setAttribute('role','button');
    d.setAttribute('tabindex','0');
    d.setAttribute('aria-label','Restore '+t.title);
    const restore=()=>{
      t.el.classList.remove('minimized');
      t.el.style.zIndex=++zc;
      active=t;
      if(mob)focusKi();
      playSuccess();
      updateDock();save()
    };
    d.addEventListener('click',restore);
    d.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();restore()}});
    dock.appendChild(d)
  })
}

function save(){
  const d=terms.filter(t=>!t.el.classList.contains('minimized')).map(t=>({
    id:t.id,l:t.el.style.left||'',t:t.el.style.top||'',
    w:t.el.style.width||'',h:t.el.style.height||'',ti:t.title
  }));
  try{localStorage.setItem(LS,JSON.stringify(d))}catch{}
}
function load(){
  try{return JSON.parse(localStorage.getItem(LS)||'[]')}catch{return[]}
}

function clamp(t){
  if(mob)return;
  const w=t.el,vw=innerWidth,vh=innerHeight;
  const ww=w.offsetWidth,wh=w.offsetHeight;
  let l=parseFloat(w.style.left)||0,tp=parseFloat(w.style.top)||0;
  if(l<0)l=0;if(tp<0)tp=0;
  if(l+ww>vw)l=Math.max(0,vw-ww-8);
  if(tp+wh>vh)tp=Math.max(0,vh-wh-8);
  w.style.left=l+'px';w.style.top=tp+'px'
}

function focusKi(){
  if(!mob)return;
  ki.value='';
  setTimeout(()=>ki.focus(),150)
}
function blurKi(){
  if(!mob)return;
  ki.blur()
}

ki.addEventListener('input',()=>{
  if(!active)return;
  const t=active;
  if(t.el.classList.contains('minimized'))return;
  const line=t.body.querySelector('.input-line');
  if(!line||line.style.display==='none')return;
  t.input=ki.value;
  t.hi=t.hist.length;
  upd(t)
});

ki.addEventListener('keydown',e=>{
  if(!active)return;
  const t=active;
  if(t.el.classList.contains('minimized'))return;
  if(e.key==='Enter'){
    e.preventDefault();
    const line=t.body.querySelector('.input-line');
    if(!line||line.style.display==='none')return;
    const v=t.input;
    playEnter();
    pr(t,t.prompt+' '+v,'cmd');
    if(v.trim()){t.hist.push(v);t.hi=t.hist.length}
    t.input='';ki.value='';
    line.querySelector('.typed').textContent='';
    route(t,v)
  }
  if(e.key==='Backspace'){
    t.input=t.input.slice(0,-1);
    ki.value=t.input;
    upd(t)
  }
});

/* === TILING === */
let tiling=false;

function applyTile(){
  const visible=terms.filter(t=>!t.el.classList.contains('minimized')&&!t.el.classList.contains('maximized'));
  if(visible.length<2)return;
  const n=visible.length;
  let cols2,rows2;
  if(n===2){cols2=2;rows2=1}
  else if(n<=4){cols2=2;rows2=2}
  else{cols2=3;rows2=Math.ceil(n/3)}
  const vw=innerWidth,vh=innerHeight,gap=4;
  const cw=(vw-gap*(cols2+1))/cols2;
  const ch2=(vh-gap*(rows2+1))/rows2;
  visible.forEach((t,i)=>{
    const col=i%cols2,row=Math.floor(i/cols2);
    t.el.style.left=(gap+col*(cw+gap))+'px';
    t.el.style.top=(gap+row*(ch2+gap))+'px';
    t.el.style.width=cw+'px';
    t.el.style.height=ch2+'px';
    t.el.style.maxHeight='none';
    t.body.style.maxHeight='none';
    t.body.style.flex='1'
  })
}

function toggleTile(){
  const visible=terms.filter(t=>!t.el.classList.contains('minimized')&&!t.el.classList.contains('maximized'));
  if(visible.length<2){
    if(active)pr(active,'Tiling requires at least 2 visible windows.','warn');
    return
  }
  tiling=!tiling;
  playEnter();
  if(tiling){
    visible.forEach(t=>t.el.classList.add('tiling'));
    applyTile();
    if(active)pr(active,'Tiled '+visible.length+' windows.','ok')
  }else{
    visible.forEach(t=>{
      t.el.classList.remove('tiling');
      t.el.style.width='';t.el.style.height='';t.el.style.maxHeight='';
      t.body.style.maxHeight='';t.body.style.flex='';
      clamp(t)
    });
    if(active)pr(active,'Tiling disabled.','dim')
  }
  save()
}

/* === WINDOW FACTORY === */
function mk(o){
  const w=document.createElement('div');
  w.className='win';
  w.setAttribute('role','dialog');
  w.setAttribute('aria-label',o.ti||'terminal');
  if(!mob){
    w.style.left=(o.l||80)+'px';
    w.style.top=(o.t||60)+'px';
    if(o.w)w.style.width=o.w;
    if(o.h)w.style.height=o.h;
  }
  w.style.zIndex=++zc;

  const bar=document.createElement('div');
  bar.className='win-bar';
  bar.setAttribute('role','toolbar');
  bar.setAttribute('aria-label','Window controls');
  bar.innerHTML=`<div class="btns"><span class="btn close" tabindex="0" role="button" aria-label="Close"></span><span class="btn min" tabindex="0" role="button" aria-label="Minimize"></span><span class="btn max" tabindex="0" role="button" aria-label="Maximize"></span></div><span class="win-title">${o.ti||'terminal'}</span><div class="btns-r"></div>`;

  const body=document.createElement('div');
  body.className='win-body';
  body.setAttribute('role','log');
  body.setAttribute('aria-live','polite');
  const gl=document.createElement('div');
  gl.className='glitch-overlay';
  gl.setAttribute('aria-hidden','true');
  const rz=document.createElement('div');
  rz.className='rz';
  rz.setAttribute('aria-hidden','true');

  w.appendChild(bar);w.appendChild(body);w.appendChild(gl);w.appendChild(rz);
  winsEl.appendChild(w);

  const t={
    el:w,bar,body,gl,rz,
    id:o.id||('w'+Date.now().toString(36)+Math.random().toString(36).slice(2,5)),
    input:'',mode:'idle',hidden:false,
    prompt:'root@main:~#',node:null,
    title:o.ti||'terminal',
    hist:[],hi:-1,_prev:'',_pend:null,_pt:null
  };
  terms.push(t);

  w.addEventListener('mousedown',()=>{w.style.zIndex=++zc;active=t});
  w.addEventListener('touchstart',()=>{
    w.style.zIndex=++zc;active=t;
    if(mob)focusKi()
  },{passive:true});

  let dx,dy,drag=false;
  bar.addEventListener('mousedown',e=>{
    if(e.target.closest('.btns'))return;
    drag=true;dx=e.clientX-w.offsetLeft;dy=e.clientY-w.offsetTop;
    w.style.transition='none'
  });
  addEventListener('mousemove',e=>{
    if(!drag)return;
    w.style.left=(e.clientX-dx)+'px';
    w.style.top=(e.clientY-dy)+'px'
  });
  addEventListener('mouseup',()=>{
    if(drag){drag=false;w.style.transition='';if(!tiling)clamp(t);save()}
  });

  bar.addEventListener('touchstart',e=>{
    if(e.target.closest('.btns'))return;
    const t2=e.touches[0];
    drag=true;dx=t2.clientX-w.offsetLeft;dy=t2.clientY-w.offsetTop;
    w.style.transition='none'
  },{passive:true});
  addEventListener('touchmove',e=>{
    if(!drag)return;
    const t2=e.touches[0];
    w.style.left=(t2.clientX-dx)+'px';
    w.style.top=(t2.clientY-dy)+'px'
  },{passive:true});
  addEventListener('touchend',()=>{
    if(drag){drag=false;if(!tiling)clamp(t);save()}
  });

  let rdx,rdy,rw,rh,rz2=false;
  rz.addEventListener('mousedown',e=>{
    e.preventDefault();e.stopPropagation();
    rz2=true;rdx=e.clientX;rdy=e.clientY;
    rw=w.offsetWidth;rh=w.offsetHeight;
    w.style.transition='none'
  });
  addEventListener('mousemove',e=>{
    if(!rz2)return;
    const nw=Math.max(320,Math.min(innerWidth-16,rw+e.clientX-rdx));
    const nh=Math.max(140,Math.min(innerHeight-32,rh+e.clientY-rdy));
    w.style.width=nw+'px';w.style.height=nh+'px';
    body.style.maxHeight='none';body.style.flex='1'
  });
  addEventListener('mouseup',()=>{
    if(rz2){rz2=false;w.style.transition='';if(!tiling)clamp(t);save()}
  });

  rz.addEventListener('touchstart',e=>{
    e.preventDefault();e.stopPropagation();
    rz2=true;
    const t2=e.touches[0];
    rdx=t2.clientX;rdy=t2.clientY;
    rw=w.offsetWidth;rh=w.offsetHeight;
    w.style.transition='none'
  },{passive:false});
  rz.addEventListener('touchmove',e=>{
    if(!rz2)return;e.preventDefault();
    const t2=e.touches[0];
    const nw=Math.max(280,Math.min(innerWidth-8,rw+t2.clientX-rdx));
    const nh=Math.max(120,Math.min(innerHeight-24,rh+t2.clientY-rdy));
    w.style.width=nw+'px';w.style.height=nh+'px';
    body.style.maxHeight='none';body.style.flex='1'
  },{passive:false});
  rz.addEventListener('touchend',()=>{
    if(rz2){rz2=false;w.style.transition='';if(!tiling)clamp(t);save()}
  });

  /* Close — corrupt */
  const doClose=()=>{
    const btn=bar.querySelector('.close');
    if(btn.classList.contains('corrupt'))return;
    btn.classList.add('corrupt');
    w.classList.add('corrupt-shake');
    pauseMX();playCorrupt();

    const els=body.querySelectorAll('.out');
    const bad=[];
    for(let i=0;i<Math.min(4,els.length);i++){
      const idx=Math.random()*els.length|0;
      const el=els[idx];
      if(el.textContent.length>4){
        const orig=el.textContent;
        const pos=Math.random()*orig.length|0;
        el.textContent=orig.slice(0,pos)+'▓▒░█▓'+orig.slice(pos+5);
        bad.push([el,orig])
      }
    }

    setTimeout(()=>{
      const err=document.createElement('div');
      err.className='close-err';
      err.innerHTML=`
        <div class="err-glitch-bg"></div>
        <h4>⚠ FATAL: PROCESS PROTECTED</h4>
        <p>Cannot terminate session.<br>Kernel lock active — retry denied.</p>
        <div class="close-err-dim">errno=1 (EPERM) · pid=${Math.random()*9000+1000|0} · signal blocked</div>
      `;
      winsEl.appendChild(err);
      setTimeout(()=>{err.remove();resumeMX()},2200)
    },200);

    setTimeout(()=>{
      btn.classList.remove('corrupt');
      w.classList.remove('corrupt-shake');
      bad.forEach(([el,o])=>{el.textContent=o})
    },500)
  };
  bar.querySelector('.close').addEventListener('click',e=>{e.stopPropagation();doClose()});
  bar.querySelector('.close').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();doClose()}});

  /* Minimize */
  const doMin=()=>{
    w.classList.add('minimized');
    if(active===t){active=null;blurKi()}
    playMinimize();
    updateDock();save();
    showErr(t)
  };
  bar.querySelector('.min').addEventListener('click',e=>{e.stopPropagation();doMin()});
  bar.querySelector('.min').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();doMin()}});

  /* Maximize */
  const doMax=()=>{
    w.classList.toggle('maximized');
    playMaximize();
    if(!w.classList.contains('maximized')){
      w.style.position='absolute';
      w.classList.remove('tiling');
      w.style.width='';w.style.height='';
      clamp(t)
    }
    save()
  };
  bar.querySelector('.max').addEventListener('click',e=>{e.stopPropagation();doMax()});
  bar.querySelector('.max').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();doMax()}});

  return t
}

/* === OUTPUT === */
function pr(t,txt,cls){
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.textContent=txt||'\u00a0';
  const line=t.body.querySelector('.input-line');
  if(line&&line.style.display!=='none')t.body.insertBefore(el,line);
  else t.body.appendChild(el);
  t.body.scrollTop=t.body.scrollHeight
}

function show(t){
  let line=t.body.querySelector('.input-line');
  if(!line){
    line=document.createElement('div');
    line.className='input-line';
    line.innerHTML='<span class="pr"></span> <span class="typed"></span><span class="cur">_</span>'
  }
  line.style.display='flex';
  line.querySelector('.pr').textContent=t.prompt;
  line.querySelector('.typed').textContent='';
  t.input='';t.hi=-1;t._prev='';t._pend=null;
  t.body.appendChild(line);
  t.body.scrollTop=t.body.scrollHeight;
  if(mob&&active===t)focusKi()
}

function hide(t){
  const line=t.body.querySelector('.input-line');
  if(line)line.style.display='none';
  if(mob&&active===t)blurKi()
}

function upd(t){
  const line=t.body.querySelector('.input-line');
  if(!line)return;
  if(t.hidden){
    line.querySelector('.typed').textContent=''.padEnd(t.input.length,'*');
    t._prev=''.padEnd(t.input.length,'*');
    t.body.scrollTop=t.body.scrollHeight;
    return
  }
  if(!t._pend)t._pend=new Set();
  const real=t.input;
  for(let i=0;i<real.length;i++){
    if(!t._prev||i>=t._prev.length||real[i]!==t._prev[i])t._pend.add(i)
  }
  let disp='';
  for(let i=0;i<real.length;i++){
    disp+=t._pend.has(i)?(Math.random()>.5?'1':'0'):real[i]
  }
  line.querySelector('.typed').textContent=disp;
  t._prev=real;
  t.body.scrollTop=t.body.scrollHeight;
  if(t._pend.size){
    clearTimeout(t._pt);
    t._pt=setTimeout(()=>{
      t._pend.clear();
      const l2=t.body.querySelector('.input-line');
      if(l2)l2.querySelector('.typed').textContent=t.input
    },90+Math.random()*70)
  }
}

/* === AUTOCOMPLETE === */
const nids=['0x01','0x02','0x03'];

function ac(t){
  const parts=t.input.trim().split(/\s+/);
  if(!parts[0])return;
  const q=parts[0].toLowerCase();
  if(parts.length===1){
    const m=Object.keys(shell).filter(k=>{
      const first=k.split(' ')[0];
      return first.startsWith(q)||k.startsWith(q)
    });
    if(m.length===1){
      t.input=m[0]+' ';
      if(mob)ki.value=t.input;
      upd(t)
    }else if(m.length>1)pr(t,m.join('  '),'dim')
  }else if(parts[0]==='./connect'&&parts[1]){
    const m=nids.filter(id=>id.startsWith(parts[1]));
    if(m.length===1){
      t.input='./connect '+m[0];
      if(mob)ki.value=t.input;
      upd(t)
    }else if(m.length>1)pr(t,m.join('  '),'dim')
  }
}

function route(t,v){
  if(t.mode==='login')login(t,v);
  else if(t.mode==='pass'){pr(t,'');pass(t,v)}
  else if(t.mode==='shell'){if(v.trim())sh(t,v)}
  else if(t.mode==='node'){nd(t,v)}
}

/* === DESKTOP KEYBOARD === */
if(!mob){
  addEventListener('keydown',e=>{
    if(!active)return;
    const t=active;
    if(t.el.classList.contains('minimized'))return;

    if(e.key==='Enter'){
      const line=t.body.querySelector('.input-line');
      if(!line||line.style.display==='none')return;
      const v=t.input;
      playEnter();
      pr(t,t.prompt+' '+v,'cmd');
      if(v.trim()){t.hist.push(v);t.hi=t.hist.length}
      t.input='';
      line.querySelector('.typed').textContent='';
      route(t,v);
      return
    }
    if(e.key==='Backspace'){t.input=t.input.slice(0,-1);upd(t);return}
    if(e.key==='ArrowUp'){
      e.preventDefault();
      if(t.hist.length&&t.hi>-1){t.hi--;t.input=t.hist[t.hi]||'';upd(t)}
      return
    }
    if(e.key==='ArrowDown'){
      e.preventDefault();
      if(t.hi<t.hist.length){t.hi++;t.input=t.hist[t.hi]||'';upd(t)}
      return
    }
    if(e.key==='Tab'){
      e.preventDefault();
      if(t.mode==='shell'||t.mode==='node')ac(t);
      return
    }
    if(e.key==='t'&&(e.ctrlKey||e.metaKey)){
      e.preventDefault();
      toggleTile();
      return
    }
    if(e.key.length===1){
      playKey();
      t.input+=e.key;
      t.hi=t.hist.length;
      upd(t)
    }
  })
}

addEventListener('resize',()=>{
  rs();
  if(tiling)applyTile();
  else terms.forEach(t=>{
    if(t.el.classList.contains('maximized'))return;
    clamp(t)
  })
},{passive:true});

/* === BOOT === */
const boot=[
  ['dim','VOID BIOS v4.2.1 (C) 2026 VOID Systems Inc.'],
  ['dim',''],
  ['dim','CPU: VOID-9 @ 4.20GHz (8c/16t)'],
  ['dim','Microcode: 0x2A1F'],
  ['dim',''],
  ['dim','Memory Test: 65536 MB OK'],
  ['dim','  CH-A: 32768 MB @ DDR5-6400'],
  ['dim','  CH-B: 32768 MB @ DDR5-6400'],
  ['dim',''],
  ['dim','Storage:'],
  ['dim','  NVMe0: VOID-SSD-2TB [OK]'],
  ['dim','  NVMe1: VOID-SSD-1TB [OK]'],
  ['dim',''],
  ['dim','PCIe:'],
  ['dim','  GPU: VOID-RTX-5090 24GB [OK]'],
  ['dim','  NIC: eth0 10G [OK]'],
  ['dim','  NIC: wlan0 Wi-Fi 7 [OK]'],
  ['dim',''],
  ['dim','Loading kernel...'],
  ['dim',''],
  ['info','  [ 0.000000] void-kernel 6.1.0-void'],
  ['info','  [ 0.000128] smp: 8 CPUs online'],
  ['info','  [ 0.000412] mem: 65536MB mapped'],
  ['info','  [ 0.001024] eth0: 10Gbps up'],
  ['info','  [ 0.002048] wlan0: VOID-5G (ch 149)'],
  ['info','  [ 0.003072] ext4: /dev/nvme0n1p2 mounted'],
  ['info','  [ 0.004096] systemd: 142 services'],
  ['info','  [ 0.005120] systemd: ready'],
  ['dim',''],
  ['','']
];

const saved=load();
let hasMain=false;
saved.forEach(s=>{
  if(s.ti&&s.ti.includes('muncixop@void')){
    const m=mk({id:s.id,ti:s.ti,l:s.l,t:s.t,w:s.w,h:s.h});
    active=m;m.mode='boot';hasMain=true
  }
});
if(!hasMain){
  const m=mk({ti:'muncixop@void — zsh',l:80,t:60});
  active=m;m.mode='boot'
}

let bi=0;
const mt=terms[0];

function startLogin(){
  playBoot();
  if(mob){
    pr(mt,'Last login: auto ('+os+')','dim');
    pr(mt,'');
    pr(mt,'Welcome to VOID SYSTEMS','info');
    pr(mt,'Type "help" to list available commands.','dim');
    pr(mt,'');
    mt.prompt='root@main:~#';
    mt.mode='shell';
    show(mt);
    return
  }
  mt.prompt='login:';
  show(mt);
  mt.mode='login'
}

(function bs(){
  if(bi>=boot.length){
    setTimeout(startLogin,500);
    return
  }
  const[cls,txt]=boot[bi];
  pr(mt,txt,cls);bi++;
  const delay=reducedMotion?10:(txt===''?50:35+Math.random()*45);
  setTimeout(bs,delay)
})();

/* === AUTH === */
function login(t,user){
  const u=user.trim().toLowerCase();
  if(u==='root'){
    pr(t,'');
    t.prompt="root@main's password:";
    t.mode='pass';t.hidden=true;
    show(t)
  }else{
    playError();
    pr(t,`login failed for ${u||'(blank)'}`,'err');
    pr(t,'');
    t.prompt='login:';
    show(t)
  }
}

function pass(t,pw){
  const v=pw.trim().toLowerCase();
  if(v==='root'){
    t.hidden=false;
    playSuccess();
    pr(t,'Last login: Thu Aug 27 03:42:17 2026 from 192.168.1.42','dim');
    pr(t,'');
    pr(t,'Welcome to VOID SYSTEMS','info');
    pr(t,'Type "help" to list available commands.','dim');
    pr(t,'');
    t.prompt='root@main:~#';t.mode='shell';
    show(t)
  }else{
    playError();
    pr(t,'Authentication failed.','err');
    pr(t,'');
    t.hidden=true;
    t.prompt="root@main's password:";
    show(t)
  }
}

/* === TOKENS === */
const tokens={
  '0x01':genToken(),
  '0x02':genToken(),
  '0x03':genToken()
};

/* === SHELL === */
const shell={
  help:t=>{
    pr(t,'');
    pr(t,'Available commands:','info');
    pr(t,'');
    pr(t,'  ./init            Initialize system');
    pr(t,'  ./scan            Scan for connected nodes');
    pr(t,'  ./connect <id>    Open terminal for a node');
    pr(t,'  ./tile            Tile all visible windows');
    pr(t,'  ./status          Show system status');
    pr(t,'  whoami            Current user');
    pr(t,'  uname -a          System info');
    pr(t,'  cat /etc/void     System config');
    pr(t,'  ls                List files');
    pr(t,'  echo <msg>        Print message');
    pr(t,'  clear             Clear screen');
    pr(t,'  exit              Disconnect');
    pr(t,'  help              This message');
    pr(t,'');
    if(!mob)pr(t,'Tips: Tab = autocomplete, Up/Down = history, Ctrl+T = tile','dim');
    pr(t,'')
  },

  './tile':t=>{toggleTile();show(t)},

  './init':t=>{
    pr(t,'');pr(t,'Initializing system...','info');pr(t,'');
    hide(t);
    const s=[
      '[ 1/8] Loading kernel modules',
      '[ 2/8] Mounting filesystems',
      '[ 3/8] Starting network daemon',
      '[ 4/8] Configuring firewall (iptables)',
      '[ 5/8] Loading user profiles',
      '[ 6/8] Syncing node registry',
      '[ 7/8] Verifying TLS certificates',
      '[ 8/8] Finalizing'
    ];
    let i=0;
    (function st(){
      if(i>=s.length){
        playSuccess();
        pr(t,'');pr(t,'System ready. 0 errors.','ok');pr(t,'');
        show(t);return
      }
      pr(t,s[i],'ok');i++;
      setTimeout(st,reducedMotion?10:150+Math.random()*100)
    })()
  },

  './scan':t=>{
    pr(t,'');
    pr(t,'Scanning network for registered nodes...','dim');
    hide(t);
    setTimeout(()=>{
      playSuccess();
      pr(t,'');
      pr(t,'  ID      HOST                  TOKEN         STATUS');
      pr(t,'  ------  ----------------------  ------------  --------');
      pr(t,'  0x01    curseforge.com          '+tokens['0x01']+'      [ONLINE]');
      pr(t,'  0x02    x.com                   '+tokens['0x02']+'      [ONLINE]');
      pr(t,'  0x03    tiktok.com              '+tokens['0x03']+'      [ONLINE]');
      pr(t,'');
      pr(t,'3 nodes found. Use ./connect <id> to open a session.','ok');
      pr(t,'');
      show(t)
    },reducedMotion?50:1200)
  },

  './connect':(t,args)=>{
    const id=args[0];
    if(!id){
      playError();
      pr(t,'Usage: ./connect <node-id>','warn');
      pr(t,'Run ./scan to see available nodes.','dim');
      pr(t,'');return
    }
    const nodes={
      '0x01':{h:'curseforge.com',tk:tokens['0x01'],ti:'node 0x01 — curseforge.com',lk:'https://www.curseforge.com/members/muncixop/projects',lb:'curseforge.com/members/muncixop/projects'},
      '0x02':{h:'x.com',tk:tokens['0x02'],ti:'node 0x02 — x.com',lk:'https://x.com/MuncixOp',lb:'x.com/MuncixOp'},
      '0x03':{h:'tiktok.com',tk:tokens['0x03'],ti:'node 0x03 — tiktok.com',lk:'https://www.tiktok.com/@muncixop',lb:'tiktok.com/@muncixop'}
    };
    const n=nodes[id];
    if(!n){playError();pr(t,`Unknown node: ${id}`,'err');pr(t,'');return}
    pr(t,`Connecting to ${n.h}...`,'dim');
    hide(t);
    setTimeout(()=>{
      playSuccess();
      pr(t,'');
      pr(t,'[OK] TCP handshake complete','ok');
      pr(t,'[OK] TLS 1.3 established','ok');
      pr(t,'[OK] Session token: '+n.tk,'ok');
      pr(t,'');
      pr(t,'Opening node terminal...','info');
      pr(t,'');
      setTimeout(()=>{
        const off=mob?0:terms.length*35;
        const nt=mk({ti:n.ti,l:120+off,t:100+off});
        active=nt;nt.mode='node';nt.node=n;
        nt.prompt=`[${n.h}] #`;
        pr(nt,`Connected to ${n.h}`,'ok');
        pr(nt,`Session: ${n.tk}`,'dim');
        pr(nt,'');
        if(mob){
          pr(nt,'[AUTO] Brute-force mode engaged...','info');
          pr(nt,'','dim');
          bruteForce(nt,n.tk);
        }else{
          pr(nt,'Enter auth token to proceed:','warn');
          show(nt);
        }
        show(t);save()
      },reducedMotion?50:600)
    },reducedMotion?50:800)
  },

  './status':t=>{
    pr(t,'');
    pr(t,'  UPTIME:    3d 14:22:07');
    pr(t,'  LOAD:      0.02, 0.01, 0.00');
    pr(t,'  MEM:       4.2GB / 64GB (6%)');
    pr(t,'  DISK:      128GB / 2TB (6%)');
    pr(t,'  NET:       eth0 10G up, wlan0 up');
    pr(t,'  NODES:     3 online');
    pr(t,'')
  },

  whoami:t=>{pr(t,'root');pr(t,'')},
  'uname -a':t=>{pr(t,'Linux void 6.1.0-void #1 SMP VOID x86_64 GNU/Linux');pr(t,'')},

  ls:t=>{
    pr(t,'');
    pr(t,'total 16');
    pr(t,'drwxr-xr-x  2 root root 4096 Aug 27 03:40 .');
    pr(t,'drwxr-xr-x  1 root root 4096 Aug 27 03:40 ..');
    pr(t,'-rwxr-xr-x  1 root root  248 Aug 27 03:39 init');
    pr(t,'-rwxr-xr-x  1 root root  192 Aug 27 03:39 scan');
    pr(t,'-rwxr-xr-x  1 root root  312 Aug 27 03:39 connect');
    pr(t,'-rwxr-xr-x  1 root root   96 Aug 27 03:39 tile');
    pr(t,'-rw-r--r--  1 root root  512 Aug 27 03:40 .voidrc');
    pr(t,'')
  },

  'cat /etc/void':t=>{
    pr(t,'');
    pr(t,'# /etc/void');
    pr(t,'# modified: 2026-08-27 03:41:02 UTC');
    pr(t,'');
    pr(t,'[system]');
    pr(t,'  name=void');
    pr(t,'  owner=muncixop');
    pr(t,'  kernel=6.1.0-void');
    pr(t,'');
    pr(t,'[network]');
    pr(t,'  eth0=10.0.0.1/24');
    pr(t,'  firewall=strict');
    pr(t,'');
    pr(t,'[nodes]');
    pr(t,'  0x01=curseforge.com');
    pr(t,'  0x02=x.com');
    pr(t,'  0x03=tiktok.com');
    pr(t,'');
    pr(t,'[access]');
    pr(t,'  level=root');
    pr(t,'  2fa=enabled');
    pr(t,'')
  },

  clear:t=>{t.body.innerHTML='';show(t)},

  exit:t=>{
    pr(t,'');pr(t,'Connection closed.','dim');
    hide(t);t.mode='exited'
  }
};

function sh(t,cmd){
  const full=cmd.trim().toLowerCase();
  const parts=full.split(/\s+/);
  const k=parts[0];
  const args=parts.slice(1);
  if(shell[full]){shell[full](t,args);return}
  if(shell[k]){shell[k](t,args);return}
  if(k==='echo'){pr(t,args.join(' '));pr(t,'');return}
  playError();
  pr(t,`zsh: command not found: ${k}`,'err');
  pr(t,'Type "help" for available commands.','dim');
  pr(t,'')
}

/* === BRUTE FORCE === */
function bruteForce(t,correctToken){
  const attempts=Math.random()*40+20|0;
  let i=0;
  const bruteEl=document.createElement('div');
  bruteEl.className='out brute';
  const line=t.body.querySelector('.input-line');
  if(line)t.body.insertBefore(bruteEl,line);
  else t.body.appendChild(bruteEl);

  function step(){
    if(i>=attempts){
      bruteEl.textContent+=`  [${i}] ${correctToken} ✓\n`;
      t.body.scrollTop=t.body.scrollHeight;
      playSuccess();
      setTimeout(()=>{
        pr(t,'');
        pr(t,'[OK] Token verified','ok');
        pr(t,'[OK] Session authorized','ok');
        pr(t,'');
        pr(t,'Node resolved:','info');
        pr(t,'');
        const lnk=document.createElement('div');
        lnk.className='lnk';
        const a=document.createElement('a');
        a.href=t.node.lk;a.target='_blank';
        a.rel='noopener noreferrer';
        a.innerHTML=`<span class="n">→</span>${t.node.lb}`;
        lnk.appendChild(a);
        const ln=t.body.querySelector('.input-line');
        if(ln&&ln.style.display!=='none')t.body.insertBefore(lnk,ln);
        else t.body.appendChild(lnk);
        pr(t,'');
        pr(t,'Click the link above to open.','dim');
        pr(t,'');
        t.mode='idle'
      },300);
      return
    }
    playBruteTick();
    bruteEl.textContent+=`  [${i}] ${genToken()} ✗\n`;
    t.body.scrollTop=t.body.scrollHeight;
    i++;
    setTimeout(step,reducedMotion?5:20+Math.random()*40)
  }
  step()
}

/* === NODE AUTH (DESKTOP) === */
function nd(t,val){
  const v=val.trim().toLowerCase();
  const n=t.node;
  if(v===n.tk){
    playSuccess();
    pr(t,'');
    pr(t,'[OK] Token verified','ok');
    pr(t,'[OK] Session authorized','ok');
    pr(t,'');
    pr(t,'Node resolved:','info');
    pr(t,'');
    const lnk=document.createElement('div');
    lnk.className='lnk';
    const a=document.createElement('a');
    a.href=n.lk;a.target='_blank';
    a.rel='noopener noreferrer';
    a.innerHTML=`<span class="n">→</span>${n.lb}`;
    lnk.appendChild(a);
    const line=t.body.querySelector('.input-line');
    if(line&&line.style.display!=='none')t.body.insertBefore(lnk,line);
    else t.body.appendChild(lnk);
    pr(t,'');
    pr(t,'Click the link above to open.','dim');
    pr(t,'');
    hide(t);t.mode='idle';return
  }
  if(v==='help'||v==='?'){
    pr(t,'');
    pr(t,'Enter the auth token displayed above to proceed.','info');
    pr(t,'');return
  }
  playError();
  pr(t,`[${n.h}] auth failed: invalid token`,'err');
  pr(t,'');
  pr(t,'Enter auth token to proceed:','warn')
}

/* === GLITCH === */
function glitch(){
  if(reducedMotion)return;
  if(!active)return;
  const t=active;
  if(t.el.classList.contains('minimized'))return;
  const gl=t.gl,w=t.el;
  playGlitch();
  gl.innerHTML='';
  const n=4+(Math.random()*5|0);
  for(let i=0;i<n;i++){
    const s=document.createElement('div');
    s.className='sl';
    const top=Math.random()*100;
    const th=2+Math.random()*18;
    const off=(Math.random()-.5)*100;
    const sk=(Math.random()-.5)*3;
    s.style.cssText=`top:${top}%;height:${th}px;transform:translateX(${off}px) skewX(${sk}deg)`;
    gl.appendChild(s)
  }
  const rc=document.createElement('div');
  rc.className='rgb-c';
  rc.style.transform=`translate(${(Math.random()-.5)*4}px,${(Math.random()-.5)*4}px)`;
  gl.appendChild(rc);
  const rm=document.createElement('div');
  rm.className='rgb-m';
  rm.style.transform=`translate(${(Math.random()-.5)*-4}px,${(Math.random()-.5)*-4}px)`;
  gl.appendChild(rm);

  const tx=(Math.random()-.5)*12;
  const ty=(Math.random()-.5)*6;
  w.style.transform=`translate(${tx}px,${ty}px)`;
  w.style.boxShadow='0 24px 64px #000000b0,0 0 0 .5px #3ddc8440,0 0 80px #3ddc8415';
  w.style.opacity=String(.85+Math.random()*.15);
  gl.classList.add('on');

  const els=t.body.querySelectorAll('.out:not(.brute)');
  const bad=[];
  for(let i=0;i<Math.min(3,els.length);i++){
    const idx=Math.random()*els.length|0;
    const el=els[idx];
    if(el.textContent.length>4){
      const orig=el.textContent;
      const pos=Math.random()*orig.length|0;
      el.textContent=orig.slice(0,pos)+'▓▒░'+orig.slice(pos+3);
      bad.push([el,orig])
    }
  }

  setTimeout(()=>{
    gl.innerHTML='';
    const n2=3+(Math.random()*4|0);
    for(let i=0;i<n2;i++){
      const s=document.createElement('div');
      s.className='sl';
      const top=Math.random()*100;
      const th=1+Math.random()*10;
      const off=(Math.random()-.5)*140;
      s.style.cssText=`top:${top}%;height:${th}px;transform:translateX(${off}px)`;
      gl.appendChild(s)
    }
    w.style.transform=`translate(${(Math.random()-.5)*16}px,${(Math.random()-.5)*8}px)`;
    w.style.opacity=String(.7+Math.random()*.3)
  },60);

  setTimeout(()=>{
    gl.classList.remove('on');
    gl.innerHTML='';
    w.style.transform='';w.style.boxShadow='';w.style.opacity='1';
    bad.forEach(([el,o])=>{el.textContent=o})
  },150+Math.random()*100)
}
(function sc(){
  setTimeout(()=>{glitch();sc()},2000+Math.random()*4000)
})();

/* === VISIBILITY === */
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden)rs()
});

addEventListener('beforeunload',save);
addEventListener('pagehide',save);   
