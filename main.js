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

function noise_buf(a,dur){
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
    n.buffer=noise_buf(a,.02);ng.gain.setValueAtTime(.015,t);
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
    n.buffer=noise_buf(a,.05);ng.gain.setValueAtTime(.04,t);
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
    n.buffer=noise_buf(a,.15);ng.gain.setValueAtTime(.06,t);
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
    n1.buffer=noise_buf(a,.15);
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
    n2.buffer=noise_buf(a,.08);
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
    n.buffer=noise_buf(a,.2);ng.gain.setValueAtTime(.02,t);
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

function playBruteTick(){
  try{
    const a=audio(),t=a.currentTime;
    const o=a.createOscillator(),g=a.createGain();
    o.type='square';o.frequency.value=2000+Math.random()*2000;
    g.gain.setValueAtTime(.012,t);
    g.gain.exponentialRampToValueAtTime(.001,t+.015);
    o.connect(g);g.connect(a.destination);
    o.start(t);o.stop(t+.015);
    const n=a.createBufferSource(),ng=a.createGain();
    n.buffer=noise_buf(a,.01);
    ng.gain.setValueAtTime(.01,t);
    ng.gain.exponentialRampToValueAtTime(.001,t+.01);
    n.connect(ng);ng.connect(a.destination);n.start(t);n.stop(t+.01)
  }catch{}
}

function playMinimize(){
  try{
    const a=audio(),t=a.currentTime;
    const o1=a.createOscillator(),o2=a.createOscillator(),g=a.createGain();
    o1.type='sine';o1.frequency.setValueAtTime(1000,t);
    o1.frequency.exponentialRampToValueAtTime(150,t+.25);
    o2.type='square';o2.frequency.setValueAtTime(500,t);
    o2.frequency.exponentialRampToValueAtTime(75,t+.2);
    g.gain.setValueAtTime(.05,t);
    g.gain.exponentialRampToValueAtTime(.001,t+.3);
    o1.connect(g);o2.connect(g);g.connect(a.destination);
    o1.start(t);o1.stop(t+.3);o2.start(t);o2.stop(t+.3)
  }catch{}
}

function playMaximize(){
  try{
    const a=audio(),t=a.currentTime;
    const o1=a.createOscillator(),o2=a.createOscillator(),g=a.createGain();
    o1.type='sine';o1.frequency.setValueAtTime(200,t);
    o1.frequency.exponentialRampToValueAtTime(1200,t+.25);
    o2.type='square';o2.frequency.setValueAtTime(400,t);
    o2.frequency.exponentialRampToValueAtTime(2400,t+.2);
    g.gain.setValueAtTime(.04,t);
    g.gain.exponentialRampToValueAtTime(.001,t+.3);
    o1.connect(g);o2.connect(g);g.connect(a.destination);
    o1.start(t);o1.stop(t+.3);o2.start(t);o2.stop(t+.3)
  }catch{}
}

/* ============================================
   MATRIX
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
const LS='void_wins_v9';

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
    d
