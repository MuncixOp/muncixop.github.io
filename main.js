const c=document.getElementById('c'),x=c.getContext('2d');
let W,H,cols,drops;
const ch='アイウエオカキクケコサシスセソ0123456789$#@';
const fs=12;
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

function mkWin(o){
  const w=document.createElement('div');
  w.className='win';
  w.style.left=(o.left||80)+'px';
  w.style.top=(o.top||60)+'px';
  w.style.zIndex=++zc;

  const bar=document.createElement('div');
  bar.className='win-bar';
  bar.innerHTML=`<div class="btns"><span class="btn close"></span><span class="btn min"></span><span class="btn max"></span></div><span class="win-title">${o.title||'terminal'}</span><div class="btns-r"></div>`;

  const body=document.createElement('div');
  body.className='win-body';
  const gl=document.createElement('div');
  gl.className='glitch-overlay';

  w.appendChild(bar);w.appendChild(body);w.appendChild(gl);
  winsEl.appendChild(w);

  const t={el:w,bar,body,gl,input:'',mode:'idle',hidden:false,prompt:'root@main:~#',nodeData:null};
  terms.push(t);

  w.addEventListener('mousedown',()=>{w.style.zIndex=++zc;active=t});

  let dx,dy,drag=false;
  bar.addEventListener('mousedown',e=>{
    if(e.target.classList.contains('btn'))return;
    drag=true;dx=e.clientX-w.offsetLeft;dy=e.clientY-w.offsetTop;
    w.style.transition='none'
  });
  addEventListener('mousemove',e=>{
    if(!drag)return;
    w.style.left=(e.clientX-dx)+'px';w.style.top=(e.clientY-dy)+'px'
  });
  addEventListener('mouseup',()=>{drag=false;w.style.transition=''});

  bar.addEventListener('touchstart',e=>{
    if(e.target.classList.contains('btn'))return;
    const t2=e.touches[0];drag=true;dx=t2.clientX-w.offsetLeft;dy=t2.clientY-w.offsetTop;
  },{passive:true});
  addEventListener('touchmove',e=>{
    if(!drag)return;
    const t2=e.touches[0];
    w.style.left=(t2.clientX-dx)+'px';w.style.top=(t2.clientY-dy)+'px'
  },{passive:true});
  addEventListener('touchend',()=>{drag=false});

  bar.querySelector('.close').addEventListener('click',()=>{
    w.style.transition='transform .25s,opacity .2s';
    w.style.transform='scale(.88)';w.style.opacity='0';
    setTimeout(()=>{w.remove();terms.splice(terms.indexOf(t),1);if(active===t)active=null},250)
  });
  bar.querySelector('.min').addEventListener('click',()=>w.classList.toggle('minimized'));
  bar.querySelector('.max').addEventListener('click',()=>w.classList.toggle('maximized'));

  return t
}

function p(t,txt,cls){
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.textContent=txt||'\u00a0';
  const line=t.body.querySelector('.input-line');
  if(line&&line.style.display!=='none')t.body.insertBefore(el,line);
  else t.body.appendChild(el);
  t.body.scrollTop=t.body.scrollHeight
}

function pHTML(t,html,cls){
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.innerHTML=html;
  const line=t.body.querySelector('.input-line');
  if(line&&line.style.display!=='none')t.body.insertBefore(el,line);
  else t.body.appendChild(el);
  t.body.scrollTop=t.body.scrollHeight
}

function showIn(t){
  let line=t.body.querySelector('.input-line');
  if(!line){
    line=document.createElement('div');
    line.className='input-line';
    line.innerHTML='<span class="pr"></span> <span class="typed"></span><span class="cur">_</span>';
  }
  line.style.display='flex';
  line.querySelector('.pr').textContent=t.prompt;
  line.querySelector('.typed').textContent='';
  t.input='';
  t.body.appendChild(line);
  t.body.scrollTop=t.body.scrollHeight
}

function hideIn(t){
  const line=t.body.querySelector('.input-line');
  if(line)line.style.display='none'
}

function updateTyped(t){
  const line=t.body.querySelector('.input-line');
  if(!line)return;
  line.querySelector('.typed').textContent=t.hidden?''.padEnd(t.input.length,'*'):t.input;
  t.body.scrollTop=t.body.scrollHeight
}

addEventListener('keydown',e=>{
  if(!active)return;
  const t=active;
  if(t.el.classList.contains('minimized'))return;

  if(e.key==='Enter'){
    const line=t.body.querySelector('.input-line');
    if(!line||line.style.display==='none')return;
    const val=t.input;
    p(t,t.prompt+' '+val,'cmd');
    t.input='';
    line.querySelector('.typed').textContent='';

    if(t.mode==='login')doLogin(t,val);
    else if(t.mode==='password'){p(t,'');doPass(t)}
    else if(t.mode==='shell'){if(val.trim())doShell(t,val)}
    else if(t.mode==='node'){doNode(t,val)}
    return
  }

  if(e.key==='Backspace'){
    t.input=t.input.slice(0,-1);
    updateTyped(t);
    return
  }

  if(e.key==='Tab'){
    e.preventDefault();
    if(t.mode==='shell'){
      const matches=Object.keys(shell).filter(c=>c.startsWith(t.input.trim().toLowerCase()));
      if(matches.length===1){t.input=matches[0]+' ';updateTyped(t)}
      else if(matches.length>1)p(t,matches.join('  '),'dim')
    }
    return
  }

  if(e.key.length===1){
    t.input+=e.key;
    updateTyped(t)
  }
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

const main=mkWin({title:'muncixop@void — zsh',left:80,top:60});
active=main;
main.mode='boot';

let bi=0;
(function bootStep(){
  if(bi>=boot.length){
    setTimeout(()=>{
      main.prompt='login:';
      showIn(main);
      main.mode='login'
    },500);
    return
  }
  const[cls,txt]=boot[bi];
  p(main,txt,cls);
  bi++;
  setTimeout(bootStep,txt===''?50:35+Math.random()*45)
})();

function doLogin(t,user){
  const u=user.trim().toLowerCase();
  if(u==='muncixop'||u==='root'){
    p(t,'');
    t.prompt="root@main's password:";
    t.mode='password';
    t.hidden=true;
    showIn(t)
  }else{
    p(t,`login failed for ${u||'(blank)'}`,'err');
    p(t,'');
    t.prompt='login:';
    showIn(t)
  }
}

function doPass(t){
  t.hidden=false;
  p(t,'Last login: Thu Aug 27 03:42:17 2026 from 192.168.1.42','dim');
  p(t,'');
  p(t,'Welcome to VOID SYSTEMS','info');
  p(t,'Type "help" to list available commands.','dim');
  p(t,'');
  t.prompt='root@main:~#';
  t.mode='shell';
  showIn(t)
}

const shell={
  'help':t=>{
    p(t,'');
    p(t,'Available commands:','info');
    p(t,'');
    p(t,'  ./init            Initialize system');
    p(t,'  ./scan            Scan for connected nodes');
    p(t,'  ./connect <id>    Open terminal for a node');
    p(t,'  ./status          Show system status');
    p(t,'  whoami            Current user');
    p(t,'  uname -a          System info');
    p(t,'  cat /etc/void     System config');
    p(t,'  ls                List files');
    p(t,'  echo <msg>        Print message');
    p(t,'  clear             Clear screen');
    p(t,'  exit              Disconnect');
    p(t,'  help              This message');
    p(t,'')
  },

  './init':t=>{
    p(t,'');
    p(t,'Initializing system...','info');
    p(t,'');
    hideIn(t);
    const steps=[
      '[ 1/8] Loading kernel modules',
      '[ 2/8] Mounting filesystems',
      '[ 3/8] Starting network daemon',
      '[ 4/8] Configuring firewall (iptables)',
      '[ 5/8] Loading user profiles',
      '[ 6/8] Syncing node registry',
      '[ 7/8] Verifying TLS certificates',
      '[ 8/8] Finalizing',
    ];
    let si=0;
    (function step(){
      if(si>=steps.length){
        p(t,'');p(t,'System ready. 0 errors.','ok');p(t,'');
        showIn(t);return
      }
      p(t,steps[si],'ok');si++;
      setTimeout(step,150+Math.random()*100)
    })()
  },

  './scan':t=>{
    p(t,'');
    p(t,'Scanning network for registered nodes...','dim');
    hideIn(t);
    setTimeout(()=>{
      p(t,'');
      p(t,'  ID      HOST                  TOKEN         STATUS');
      p(t,'  ------  ----------------------  ------------  --------');
      p(t,'  0x01    curseforge.com          a3f8c21d      [ONLINE]');
      p(t,'  0x02    x.com                   7b2e91f4      [ONLINE]');
      p(t,'  0x03    tiktok.com              e41d08ab      [ONLINE]');
      p(t,'');
      p(t,'3 nodes found. Use ./connect <id> to open a session.','ok');
      p(t,'');
      showIn(t)
    },1200)
  },

  './connect':t=>{
    const parts=t.input.trim().split(/\s+/);
    const id=parts[1];
    if(!id){
      p(t,'Usage: ./connect <node-id>','warn');
      p(t,'Run ./scan to see available nodes.','dim');
      p(t,'');return
    }
    const nodes={
      '0x01':{host:'curseforge.com',token:'a3f8c21d',title:'node 0x01 — curseforge.com',link:'https://www.curseforge.com/members/muncixop/projects',label:'curseforge.com/members/muncixop/projects'},
      '0x02':{host:'x.com',token:'7b2e91f4',title:'node 0x02 — x.com',link:'https://x.com/MuncixOp',label:'x.com/MuncixOp'},
      '0x03':{host:'tiktok.com',token:'e41d08ab',title:'node 0x03 — tiktok.com',link:'https://www.tiktok.com/@muncixop',label:'tiktok.com/@muncixop'},
    };
    const n=nodes[id];
    if(!n){p(t,`Unknown node: ${id}`,'err');p(t,'');return}
    p(t,`Connecting to ${n.host}...`,'dim');
    hideIn(t);
    setTimeout(()=>{
      p(t,'');
      p(t,'[OK] TCP handshake complete','ok');
      p(t,'[OK] TLS 1.3 established','ok');
      p(t,'[OK] Session token: '+n.token,'ok');
      p(t,'');
      p(t,'Opening node terminal...','info');
      p(t,'');
      setTimeout(()=>{
        const off=terms.length*35;
        const nt=mkWin({title:n.title,left:120+off,top:100+off});
        active=nt;
        nt.mode='node';
        nt.nodeData=n;
        nt.prompt=`[${n.host}] #`;
        p(nt,`Connected to ${n.host}`,'ok');
        p(nt,`Session: ${n.token}`,'dim');
        p(nt,'');
        p(nt,'Enter auth token to proceed:','warn');
        showIn(nt);
        showIn(t)
      },600)
    },800)
  },

  './status':t=>{
    p(t,'');
    p(t,'  UPTIME:    3d 14:22:07');
    p(t,'  LOAD:      0.02, 0.01, 0.00');
    p(t,'  MEM:       4.2GB / 64GB (6%)');
    p(t,'  DISK:      128GB / 2TB (6%)');
    p(t,'  NET:       eth0 10G up, wlan0 up');
    p(t,'  NODES:     3 online');
    p(t,'')
  },

  'whoami':t=>{p(t,'root');p(t,'')},
  'uname -a':t=>{p(t,'Linux void 6.1.0-void #1 SMP VOID x86_64 GNU/Linux');p(t,'')},

  'ls':t=>{
    p(t,'');
    p(t,'total 12');
    p(t,'drwxr-xr-x  2 root root 4096 Aug 27 03:40 .');
    p(t,'drwxr-xr-x  1 root root 4096 Aug 27 03:40 ..');
    p(t,'-rwxr-xr-x  1 root root  248 Aug 27 03:39 init');
    p(t,'-rwxr-xr-x  1 root root  192 Aug 27 03:39 scan');
    p(t,'-rwxr-xr-x  1 root root  312 Aug 27 03:39 connect');
    p(t,'-rw-r--r--  1 root root  512 Aug 27 03:40 .voidrc');
    p(t,'')
  },

  'cat /etc/void':t=>{
    p(t,'');
    p(t,'# /etc/void');
    p(t,'# modified: 2026-08-27 03:41:02 UTC');
    p(t,'');
    p(t,'[system]');
    p(t,'  name=void');
    p(t,'  owner=muncixop');
    p(t,'  kernel=6.1.0-void');
    p(t,'');
    p(t,'[network]');
    p(t,'  eth0=10.0.0.1/24');
    p(t,'  firewall=strict');
    p(t,'');
    p(t,'[nodes]');
    p(t,'  0x01=curseforge.com');
    p(t,'  0x02=x.com');
    p(t,'  0x03=tiktok.com');
    p(t,'');
    p(t,'[access]');
    p(t,'  level=root');
    p(t,'  2fa=enabled');
    p(t,'')
  },

  'clear':t=>{t.body.innerHTML='';showIn(t)},

  'exit':t=>{
    p(t,'');
    p(t,'Connection closed.','dim');
    hideIn(t);
    t.mode='exited'
  },
};

function doShell(t,cmd){
  const key=cmd.trim().toLowerCase();
  if(shell[key]){shell[key](t);return}
  if(key.startsWith('echo ')){p(t,cmd.trim().slice(5));p(t,'');return}
  p(t,`zsh: command not found: ${key}`,'err');
  p(t,'Type "help" for available commands.','dim');
  p(t,'')
}

function doNode(t,val){
  const v=val.trim().toLowerCase();
  const n=t.nodeData;
  if(v===n.token){
    p(t,'');
    p(t,'[OK] Token verified','ok');
    p(t,'[OK] Session authorized','ok');
    p(t,'');
    p(t,'Node resolved:','info');
    p(t,'');
    const lnk=document.createElement('div');
    lnk.className='lnk';
    const a=document.createElement('a');
    a.href=n.link;a.target='_blank';
    a.innerHTML=`<span class="n">→</span>${n.label}`;
    lnk.appendChild(a);
    const line=t.body.querySelector('.input-line');
    if(line&&line.style.display!=='none')t.body.insertBefore(lnk,line);
    else t.body.appendChild(lnk);
    p(t,'');
    p(t,'Click the link above to open.','dim');
    p(t,'');
    hideIn(t);
    t.mode='idle'
    return
  }
  if(v==='help'||v==='?'){
    p(t,'');
    p(t,'Enter the auth token displayed above to proceed.','info');
    p(t,'');return
  }
  p(t,`[${n.host}] auth failed: invalid token`,'err');
  p(t,'');
  p(t,'Enter auth token to proceed:','warn')
}

function glitch(){
  if(!active)return;
  const t=active;
  if(t.el.classList.contains('minimized'))return;
  const gl=t.gl,w=t.el;
  gl.innerHTML='';
  const n=3+(Math.random()*4|0);
  for(let i=0;i<n;i++){
    const s=document.createElement('div');
    s.className='sl';
    const top=Math.random()*100;
    const th=2+Math.random()*14;
    const off=(Math.random()-.5)*80;
    s.style.cssText=`top:${top}%;height:${th}px;transform:translateX(${off}px)`;
    gl.appendChild(s)
  }
  w.style.transform=`translate(${(Math.random()-.5)*8}px,${(Math.random()-.5)*4}px)`;
  w.style.boxShadow='0 20px 60px #000b,0 0 0 .5px #3ddc8440,0 0 60px #3ddc8418';
  gl.classList.add('on');
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
      gl.appendChild(s)
    }
    w.style.transform=`translate(${(Math.random()-.5)*12}px,${(Math.random()-.5)*6}px)`
  },50);
  setTimeout(()=>{
    gl.classList.remove('on');
    gl.innerHTML='';
    w.style.transform='';
    w.style.boxShadow=''
  },130+Math.random()*70)
}
(function sched(){setTimeout(()=>{glitch();sched()},3000+Math.random()*5000)})();   
