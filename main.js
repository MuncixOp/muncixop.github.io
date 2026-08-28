const c=document.getElementById('c'),x=c.getContext('2d');
let W,H,cols,drops;
const ch='アイウエオカキクケコサシスセソ0123456789$#@%&';
const fs=12;
const mob=matchMedia('(max-width:700px)').matches;

function rs(){W=c.width=innerWidth;H=c.height=innerHeight;cols=Math.floor(W/fs);drops=Array(cols).fill(1)}
rs();addEventListener('resize',rs);

(function mx(){
  x.fillStyle='rgba(10,10,10,.07)';x.fillRect(0,0,W,H);
  x.fillStyle='#0f0';x.font=fs+'px monospace';
  for(let i=0;i<cols;i++){
    x.fillText(ch[Math.random()*ch.length|0],i*fs,drops[i]*fs);
    if(drops[i]*fs>H&&Math.random()>.974)drops[i]=0;
    drops[i]++
  }
  requestAnimationFrame(mx)
})();

const winsEl=document.getElementById('wins');
let zc=1;
const terms=[];
let active=null;
const LS='void_wins_v3';

function save(){
  const d=terms.filter(t=>!t.el.classList.contains('minimized')).map(t=>({
    id:t.id,l:t.el.style.left,t:t.el.style.top,
    w:t.el.style.width,h:t.el.style.height,ti:t.title
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

function mk(o){
  const w=document.createElement('div');
  w.className='win';
  if(!mob){
    w.style.left=(o.l||80)+'px';
    w.style.top=(o.t||60)+'px';
    if(o.w)w.style.width=o.w;
    if(o.h)w.style.height=o.h;
  }
  w.style.zIndex=++zc;

  const bar=document.createElement('div');
  bar.className='win-bar';
  bar.innerHTML=`<div class="btns"><span class="btn close"></span><span class="btn min"></span><span class="btn max"></span></div><span class="win-title">${o.ti||'terminal'}</span><div class="btns-r"></div>`;

  const body=document.createElement('div');
  body.className='win-body';
  const gl=document.createElement('div');
  gl.className='glitch-overlay';
  const rz=document.createElement('div');
  rz.className='rz';

  w.appendChild(bar);w.appendChild(body);w.appendChild(gl);w.appendChild(rz);
  winsEl.appendChild(w);

  const t={
    el:w,bar,body,gl,rz,
    id:o.id||('w'+Date.now().toString(36)+Math.random().toString(36).slice(2,5)),
    input:'',mode:'idle',hidden:false,
    prompt:'root@main:~#',node:null,
    title:o.ti||'terminal',
    hist:[],hi:-1
  };
  terms.push(t);

  w.addEventListener('mousedown',()=>{w.style.zIndex=++zc;active=t});
  w.addEventListener('touchstart',()=>{w.style.zIndex=++zc;active=t},{passive:true});

  let dx,dy,drag=false;
  bar.addEventListener('mousedown',e=>{
    if(e.target.closest('.btns'))return;
    drag=true;dx=e.clientX-w.offsetLeft;dy=e.clientY-w.offsetTop;
    w.style.transition='none'
  });
  addEventListener('mousemove',e=>{
    if(!drag)return;
    w.style.left=(e.clientX-dx)+'px';w.style.top=(e.clientY-dy)+'px'
  });
  addEventListener('mouseup',()=>{if(drag){drag=false;w.style.transition='';clamp(t);save()}});

  bar.addEventListener('touchstart',e=>{
    if(e.target.closest('.btns'))return;
    const t2=e.touches[0];drag=true;dx=t2.clientX-w.offsetLeft;dy=t2.clientY-w.offsetTop;
  },{passive:true});
  addEventListener('touchmove',e=>{
    if(!drag)return;
    const t2=e.touches[0];
    w.style.left=(t2.clientX-dx)+'px';w.style.top=(t2.clientY-dy)+'px'
  },{passive:true});
  addEventListener('touchend',()=>{if(drag){drag=false;clamp(t);save()}});

  let rdx,rdy,rw,rh,rz2=false;
  rz.addEventListener('mousedown',e=>{
    e.preventDefault();e.stopPropagation();
    rz2=true;rdx=e.clientX;rdy=e.clientY;
    rw=w.offsetWidth;rh=w.offsetHeight;w.style.transition='none'
  });
  addEventListener('mousemove',e=>{
    if(!rz2)return;
    const nw=Math.max(320,Math.min(innerWidth-16,rw+e.clientX-rdx));
    const nh=Math.max(140,Math.min(innerHeight-32,rh+e.clientY-rdy));
    w.style.width=nw+'px';w.style.height=nh+'px';
    body.style.maxHeight='none';body.style.flex='1'
  });
  addEventListener('mouseup',()=>{if(rz2){rz2=false;w.style.transition='';clamp(t);save()}});

  rz.addEventListener('touchstart',e=>{
    e.preventDefault();e.stopPropagation();
    rz2=true;const t2=e.touches[0];
    rdx=t2.clientX;rdy=t2.clientY;
    rw=w.offsetWidth;rh=w.offsetHeight;w.style.transition='none'
  },{passive:false});
  rz.addEventListener('touchmove',e=>{
    if(!rz2)return;e.preventDefault();
    const t2=e.touches[0];
    const nw=Math.max(280,Math.min(innerWidth-8,rw+t2.clientX-rdx));
    const nh=Math.max(120,Math.min(innerHeight-24,rh+t2.clientY-rdy));
    w.style.width=nw+'px';w.style.height=nh+'px';
    body.style.maxHeight='none';body.style.flex='1'
  },{passive:false});
  rz.addEventListener('touchend',()=>{if(rz2){rz2=false;w.style.transition='';clamp(t);save()}});

  bar.querySelector('.close').addEventListener('click',e=>{
    e.stopPropagation();
    w.style.transition='transform .25s,opacity .2s';
    w.style.transform='scale(.88)';w.style.opacity='0';
    setTimeout(()=>{
      w.remove();terms.splice(terms.indexOf(t),1);
      if(active===t)active=null;save()
    },250)
  });
  bar.querySelector('.min').addEventListener('click',e=>{
    e.stopPropagation();
    w.classList.toggle('minimized');save()
  });
  bar.querySelector('.max').addEventListener('click',e=>{
    e.stopPropagation();
    w.classList.toggle('maximized');save()
  });

  return t
}

function pr(t,txt,cls){
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.textContent=txt||'\u00a0';
  const line=t.body.querySelector('.input-line');
  if(line&&line.style.display!=='none')t.body.insertBefore(el,line);
  else t.body.appendChild(el);
  t.body.scrollTop=t.body.scrollHeight
}

function prH(t,html,cls){
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.innerHTML=html;
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
  t.input='';t.hi=-1;
  t.body.appendChild(line);
  t.body.scrollTop=t.body.scrollHeight
}

function hide(t){
  const line=t.body.querySelector('.input-line');
  if(line)line.style.display='none'
}

function upd(t){
  const line=t.body.querySelector('.input-line');
  if(!line)return;
  line.querySelector('.typed').textContent=t.hidden?''.padEnd(t.input.length,'*'):t.input;
  t.body.scrollTop=t.body.scrollHeight
}

const nids=['0x01','0x02','0x03'];

function ac(t){
  const parts=t.input.trim().split(/\s+/);
  if(!parts[0])return;
  if(parts.length===1){
    const m=Object.keys(shell).filter(c=>c.startsWith(parts[0].toLowerCase()));
    if(m.length===1){t.input=m[0]+' ';upd(t)}
    else if(m.length>1)pr(t,m.join('  '),'dim')
  }else if(parts[0]==='./connect'&&parts[1]){
    const m=nids.filter(id=>id.startsWith(parts[1]));
    if(m.length===1){t.input='./connect '+m[0];upd(t)}
    else if(m.length>1)pr(t,m.join('  '),'dim')
  }
}

addEventListener('keydown',e=>{
  if(!active)return;
  const t=active;
  if(t.el.classList.contains('minimized'))return;

  if(e.key==='Enter'){
    const line=t.body.querySelector('.input-line');
    if(!line||line.style.display==='none')return;
    const v=t.input;
    pr(t,t.prompt+' '+v,'cmd');
    if(v.trim()){t.hist.push(v);t.hi=t.hist.length}
    t.input='';line.querySelector('.typed').textContent='';

    if(t.mode==='login')login(t,v);
    else if(t.mode==='pass'){pr(t,'');pass(t,v)}
    else if(t.mode==='shell'){if(v.trim())sh(t,v)}
    else if(t.mode==='node'){nd(t,v)}
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
  if(e.key==='Tab'){e.preventDefault();if(t.mode==='shell'||t.mode==='node')ac(t);return}
  if(e.key.length===1){t.input+=e.key;t.hi=t.hist.length;upd(t)}
});

addEventListener('resize',()=>{
  rs();
  terms.forEach(t=>{
    if(t.el.classList.contains('maximized'))return;
    clamp(t)
  })
});

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
  ['',''],
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
(function bs(){
  if(bi>=boot.length){
    setTimeout(()=>{mt.prompt='login:';show(mt);mt.mode='login'},500);
    return
  }
  const[cls,txt]=boot[bi];
  pr(mt,txt,cls);bi++;
  setTimeout(bs,txt===''?50:35+Math.random()*45)
})();

function login(t,user){
  const u=user.trim().toLowerCase();
  if(u==='root'){
    pr(t,'');
    t.prompt="root@main's password:";
    t.mode='pass';t.hidden=true;
    show(t)
  }else{
    pr(t,`login failed for ${u||'(blank)'}`,'err');
    pr(t,'');t.prompt='login:';
    show(t)
  }
}

function pass(t,pw){
  const v=pw.trim().toLowerCase();
  if(v==='root'){
    t.hidden=false;
    pr(t,'Last login: Thu Aug 27 03:42:17 2026 from 192.168.1.42','dim');
    pr(t,'');
    pr(t,'Welcome to VOID SYSTEMS','info');
    pr(t,'Type "help" to list available commands.','dim');
    pr(t,'');
    t.prompt='root@main:~#';t.mode='shell';
    show(t)
  }else{
    pr(t,'Authentication failed.','err');
    pr(t,'');
    t.hidden=true;
    t.prompt="root@main's password:";
    show(t)
  }
}

const shell={
  help:t=>{
    pr(t,'');
    pr(t,'Available commands:','info');
    pr(t,'');
    pr(t,'  ./init            Initialize system');
    pr(t,'  ./scan            Scan for connected nodes');
    pr(t,'  ./connect <id>    Open terminal for a node');
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
    pr(t,'Tips: Tab = autocomplete, Up/Down = history','dim');
    pr(t,'')
  },

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
        pr(t,'');pr(t,'System ready. 0 errors.','ok');pr(t,'');
        show(t);return
      }
      pr(t,s[i],'ok');i++;
      setTimeout(st,150+Math.random()*100)
    })()
  },

  './scan':t=>{
    pr(t,'');
    pr(t,'Scanning network for registered nodes...','dim');
    hide(t);
    setTimeout(()=>{
      pr(t,'');
      pr(t,'  ID      HOST                  TOKEN         STATUS');
      pr(t,'  ------  ----------------------  ------------  --------');
      pr(t,'  0x01    curseforge.com          a3f8c21d      [ONLINE]');
      pr(t,'  0x02    x.com                   7b2e91f4      [ONLINE]');
      pr(t,'  0x03    tiktok.com              e41d08ab      [ONLINE]');
      pr(t,'');
      pr(t,'3 nodes found. Use ./connect <id> to open a session.','ok');
      pr(t,'');
      show(t)
    },1200)
  },

  './connect':t=>{
    const parts=t.input.trim().split(/\s+/);
    const id=parts[1];
    if(!id){
      pr(t,'Usage: ./connect <node-id>','warn');
      pr(t,'Run ./scan to see available nodes.','dim');
      pr(t,'');return
    }
    const nodes={
      '0x01':{h:'curseforge.com',tk:'a3f8c21d',ti:'node 0x01 — curseforge.com',lk:'https://www.curseforge.com/members/muncixop/projects',lb:'curseforge.com/members/muncixop/projects'},
      '0x02':{h:'x.com',tk:'7b2e91f4',ti:'node 0x02 — x.com',lk:'https://x.com/MuncixOp',lb:'x.com/MuncixOp'},
      '0x03':{h:'tiktok.com',tk:'e41d08ab',ti:'node 0x03 — tiktok.com',lk:'https://www.tiktok.com/@muncixop',lb:'tiktok.com/@muncixop'}
    };
    const n=nodes[id];
    if(!n){pr(t,`Unknown node: ${id}`,'err');pr(t,'');return}
    pr(t,`Connecting to ${n.h}...`,'dim');
    hide(t);
    setTimeout(()=>{
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
        pr(nt,'Enter auth token to proceed:','warn');
        show(nt);show(t);save()
      },600)
    },800)
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
    pr(t,'total 12');
    pr(t,'drwxr-xr-x  2 root root 4096 Aug 27 03:40 .');
    pr(t,'drwxr-xr-x  1 root root 4096 Aug 27 03:40 ..');
    pr(t,'-rwxr-xr-x  1 root root  248 Aug 27 03:39 init');
    pr(t,'-rwxr-xr-x  1 root root  192 Aug 27 03:39 scan');
    pr(t,'-rwxr-xr-x  1 root root  312 Aug 27 03:39 connect');
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
  const k=cmd.trim().toLowerCase();
  if(shell[k]){shell[k](t);return}
  if(k.startsWith('echo ')){pr(t,cmd.trim().slice(5));pr(t,'');return}
  pr(t,`zsh: command not found: ${k}`,'err');
  pr(t,'Type "help" for available commands.','dim');
  pr(t,'')
}

function nd(t,val){
  const v=val.trim().toLowerCase();
  const n=t.node;
  if(v===n.tk){
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
  pr(t,`[${n.h}] auth failed: invalid token`,'err');
  pr(t,'');
  pr(t,'Enter auth token to proceed:','warn')
}

function glitch(){
  if(!active)return;
  const t=active;
  if(t.el.classList.contains('minimized'))return;
  const gl=t.gl,w=t.el;
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
  const tx=(Math.random()-.5)*12;
  const ty=(Math.random()-.5)*6;
  w.style.transform=`translate(${tx}px,${ty}px)`;
  w.style.boxShadow='0 20px 60px #000b,0 0 0 .5px #3ddc8450,0 0 80px #3ddc8420';
  w.style.opacity=String(.85+Math.random()*.15);
  gl.classList.add('on');

  const els=t.body.querySelectorAll('.out');
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
(function sc(){setTimeout(()=>{glitch();sc()},2000+Math.random()*4000)})();

addEventListener('beforeunload',save);   
