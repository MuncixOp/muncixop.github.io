// matrix
const c=document.getElementById('c'),x=c.getContext('2d');
let W,H,cols,drops;
const ch='アイウエオカキクケコサシスセソ0123456789';
const fs=12;

function rs(){W=c.width=innerWidth;H=c.height=innerHeight;cols=Math.floor(W/fs);drops=Array(cols).fill(1)}
rs();
addEventListener('resize',rs);

(function mx(){
  x.fillStyle='rgba(8,8,8,.08)';
  x.fillRect(0,0,W,H);
  x.fillStyle='#0f0';
  x.font=fs+'px monospace';
  for(let i=0;i<cols;i++){
    x.fillText(ch[Math.random()*ch.length|0],i*fs,drops[i]*fs);
    if(drops[i]*fs>H&&Math.random()>.974)drops[i]=0;
    drops[i]++;
  }
  requestAnimationFrame(mx);
})();

// drag
const win=document.getElementById('win');
const bar=document.getElementById('bar');
let dx,dy,drag=false;

bar.addEventListener('mousedown',e=>{
  if(e.target.classList.contains('btn'))return;
  drag=true;
  dx=e.clientX-win.offsetLeft;
  dy=e.clientY-win.offsetTop;
  win.style.transition='none';
});
addEventListener('mousemove',e=>{
  if(!drag)return;
  win.style.left=(e.clientX-dx)+'px';
  win.style.top=(e.clientY-dy)+'px';
  win.style.position='absolute';
});
addEventListener('mouseup',()=>{drag=false;win.style.transition=''});

// touch drag
bar.addEventListener('touchstart',e=>{
  if(e.target.classList.contains('btn'))return;
  const t=e.touches[0];
  drag=true;
  dx=t.clientX-win.offsetLeft;
  dy=t.clientY-win.offsetTop;
},{passive:true});
addEventListener('touchmove',e=>{
  if(!drag)return;
  const t=e.touches[0];
  win.style.left=(t.clientX-dx)+'px';
  win.style.top=(t.clientY-dy)+'px';
  win.style.position='absolute';
},{passive:true});
addEventListener('touchend',()=>{drag=false});

// window buttons
document.getElementById('btnClose').addEventListener('click',()=>{
  win.style.transition='transform .3s,opacity .25s';
  win.style.transform='scale(.9)';
  win.style.opacity='0';
  setTimeout(()=>{
    win.style.transform='';
    win.style.opacity='';
    win.style.transition='';
  },2000);
});

document.getElementById('btnMin').addEventListener('click',()=>{
  win.classList.toggle('minimized');
});

document.getElementById('btnMax').addEventListener('click',()=>{
  win.classList.toggle('maximized');
});

// boot
const out=document.getElementById('out');
const lnk=document.getElementById('lnk');
const gl=document.getElementById('gl');

const seq=[
  ['dim','[ 0.000000] BIOS v4.2.1 — VOID SYSTEMS'],
  ['dim','[ 0.000312] CPU: unknown @ 4.2GHz'],
  ['dim','[ 0.001044] RAM: 65536MB OK'],
  ['','> cargando kernel...'],
  ['','> montando /dev/null...'],
  ['ok','> acceso concedido ✓'],
  ['warn','> 3 nodos disponibles:'],
];

let si=0;
(function boot(){
  if(si>=seq.length){showLinks();return}
  const[cls,txt]=seq[si];
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.textContent=txt;
  out.appendChild(el);
  si++;
  setTimeout(boot,200+Math.random()*180);
})();

function showLinks(){
  const d=[
    ['CURSEFORGE','https://www.curseforge.com/members/muncixop/projects'],
    ['X / TWITTER','https://x.com/MuncixOp'],
    ['TIKTOK','https://www.tiktok.com/@muncixop'],
  ];
  d.forEach(([l,h],i)=>{
    const a=document.createElement('a');
    a.href=h;a.target='_blank';
    a.innerHTML=`<span class="n">[${i+1}]</span>${l}`;
    a.style.opacity='0';
    lnk.appendChild(a);
    setTimeout(()=>{a.style.transition='opacity .3s';a.style.opacity='1'},100);
  });
}

// keyboard
addEventListener('keydown',e=>{
  const links=lnk.querySelectorAll('a');
  const n=+e.key-1;
  if(n>=0&&n<links.length)location.href=links[n].href;
});

// glitch — horizontal slice displacement
function glitch(){
  const h=win.offsetHeight;
  gl.innerHTML='';
  const n=3+(Math.random()*4|0);

  for(let i=0;i<n;i++){
    const s=document.createElement('div');
    s.className='sl';
    const top=Math.random()*100;
    const th=2+Math.random()*14;
    const off=(Math.random()-.5)*80;
    s.style.cssText=`top:${top}%;height:${th}px;transform:translateX(${off}px)`;
    gl.appendChild(s);
  }

  // tear: shift the whole window
  const tx=(Math.random()-.5)*8;
  const ty=(Math.random()-.5)*4;
  win.style.transform=`translate(${tx}px,${ty}px)`;
  win.style.boxShadow='0 20px 60px #000a,0 0 0 1px #4af54a40,0 0 60px #4af54a20';

  gl.classList.add('on');

  // second burst
  setTimeout(()=>{
    gl.innerHTML='';
    const n2=2+(Math.random()*3|0);
    for(let i=0;i<n2;i++){
      const s=document.createElement('div');
      s.className='sl';
      const top=Math.random()*100;
      const th=1+Math.random()*6;
      const off=(Math.random()-.5)*120;
      s.style.cssText=`top:${top}%;height:${th}px;transform:translateX(${off}px)`;
      gl.appendChild(s);
    }
    win.style.transform=`translate(${(Math.random()-.5)*12}px,${(Math.random()-.5)*6}px)`;
  },50);

  // reset
  setTimeout(()=>{
    gl.classList.remove('on');
    gl.innerHTML='';
    win.style.transform='';
    win.style.boxShadow='';
  },130+Math.random()*70);
}

(function sched(){
  setTimeout(()=>{glitch();sched()},2500+Math.random()*5000);
})();   
