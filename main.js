const c = document.getElementById('c');
const x = c.getContext('2d');
let W, H;
function resize(){W=c.width=innerWidth;H=c.height=innerHeight}
resize();
addEventListener('resize',resize);

const chars='アイウエオカキクケコ0123456789$#@%&';
const fs=13;
let cols,drops;
function init(){cols=Math.floor(W/fs);drops=Array(cols).fill(1)}
init();
addEventListener('resize',init);

(function loop(){
  x.fillStyle='rgba(5,5,5,.06)';
  x.fillRect(0,0,W,H);
  x.fillStyle='#0f0';
  x.font=fs+'px monospace';
  for(let i=0;i<cols;i++){
    x.fillText(chars[Math.random()*chars.length|0],i*fs,drops[i]*fs);
    if(drops[i]*fs>H&&Math.random()>.975)drops[i]=0;
    drops[i]++;
  }
  requestAnimationFrame(loop);
})();

const lines=[
  ['dim','[ 0.000000] BIOS v4.2.1 — VOID SYSTEMS'],
  ['dim','[ 0.000312] CPU: unknown @ 4.2GHz'],
  ['dim','[ 0.001044] RAM: 65536MB OK'],
  ['','> cargando kernel...'],
  ['','> montando /dev/null...'],
  ['ok','> acceso concedido ✓'],
  ['warn','> 3 nodos disponibles:'],
];

const out=document.getElementById('out');
const lnk=document.getElementById('lnk');
const term=document.getElementById('term');
const slices=document.getElementById('slices');

let i=0;
(function type(){
  if(i>=lines.length){showLinks();return}
  const[cls,txt]=lines[i];
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.textContent=txt;
  out.appendChild(el);
  i++;
  setTimeout(type,280+Math.random()*200);
})();

function showLinks(){
  const data=[
    ['CURSEFORGE','https://www.curseforge.com/members/muncixop/projects'],
    ['X / TWITTER','https://x.com/MuncixOp'],
    ['TIKTOK','https://www.tiktok.com/@muncixop'],
  ];
  data.forEach(([label,href],idx)=>{
    const a=document.createElement('a');
    a.href=href;a.target='_blank';
    a.innerHTML=`<span class="n">[${idx+1}]</span>${label}`;
    a.style.opacity=0;
    lnk.appendChild(a);
    setTimeout(()=>a.style.transition='opacity .3s',100);
    requestAnimationFrame(()=>a.style.opacity=1);
  });
}

addEventListener('keydown',e=>{
  const links=lnk.querySelectorAll('a');
  const n=+e.key-1;
  if(n>=0&&n<links.length)location.href=links[n].href;
});

// real glitch: slices the terminal into horizontal bands, displaces them
function glitch(){
  const h=term.offsetHeight;
  const n=3+Math.random()*4|0;
  slices.innerHTML='';

  for(let i=0;i<n;i++){
    const sl=document.createElement('div');
    sl.className='sl';
    const top=Math.random()*100;
    const thickness=2+Math.random()*12;
    const offset=(Math.random()-.5)*60;
    const skew=(Math.random()-.5)*4;
    sl.style.cssText=`
      clip-path:inset(${top}% 0 ${100-top-thickness}% 0);
      transform:translateX(${offset}px) skewX(${skew}deg);
    `;
    slices.appendChild(sl);
  }

  // tear the border
  term.style.borderColor='#0f04';
  term.style.boxShadow='0 0 40px #0f02,inset 0 0 80px #0008';

  slices.classList.add('on');

  setTimeout(()=>{
    // second burst, different slices
    slices.innerHTML='';
    const n2=2+Math.random()*3|0;
    for(let i=0;i<n2;i++){
      const sl=document.createElement('div');
      sl.className='sl';
      const top=Math.random()*100;
      const thickness=1+Math.random()*8;
      const offset=(Math.random()-.5)*90;
      sl.style.cssText=`
        clip-path:inset(${top}% 0 ${100-top-thickness}% 0);
        transform:translateX(${offset}px);
      `;
      slices.appendChild(sl);
    }
    term.style.transform=`translate(${(Math.random()-.5)*6}px,${(Math.random()-.5)*3}px)`;
  },60);

  setTimeout(()=>{
    slices.classList.remove('on');
    slices.innerHTML='';
    term.style.borderColor='';
    term.style.boxShadow='';
    term.style.transform='';
  },140+Math.random()*80);
}

// trigger at random intervals
(function schedule(){
  setTimeout(()=>{
    glitch();
    schedule();
  },2000+Math.random()*4000);
})();   
