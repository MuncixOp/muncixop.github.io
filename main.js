const c=document.getElementById('c'),x=c.getContext('2d');
let W,H,cols,drops;
const ch='アイウエオカキクケコサシスセソ0123456789$#@';
const fs=12;

function rs(){
  W=c.width=innerWidth;H=c.height=innerHeight;
  cols=Math.floor(W/fs);
  drops=Array(cols).fill(1)
}
rs();
addEventListener('resize',rs);

(function mx(){
  x.fillStyle='rgba(10,10,10,.07)';
  x.fillRect(0,0,W,H);
  x.fillStyle='#0f0';
  x.font=fs+'px monospace';
  for(let i=0;i<cols;i++){
    x.fillText(ch[Math.random()*ch.length|0],i*fs,drops[i]*fs);
    if(drops[i]*fs>H&&Math.random()>.974)drops[i]=0;
    drops[i]++
  }
  requestAnimationFrame(mx)
})();

const winsEl=document.getElementById('wins');
let zCounter=1;
const terminals=[];

function createWin(opts){
  const w=document.createElement('div');
  w.className='win';
  w.style.left=(opts.left||50)+'px';
  w.style.top=(opts.top||80)+'px';
  w.style.zIndex=++zCounter;

  const bar=document.createElement('div');
  bar.className='win-bar';
  bar.innerHTML=`
    <div class="btns">
      <span class="btn close"></span>
      <span class="btn min"></span>
      <span class="btn max"></span>
    </div>
    <span class="win-title">${opts.title||'terminal'}</span>
    <div class="btns-r"></div>
  `;

  const body=document.createElement('div');
  body.className='win-body';

  const gl=document.createElement('div');
  gl.className='glitch-overlay';

  w.appendChild(bar);
  w.appendChild(body);
  w.appendChild(gl);
  winsEl.appendChild(w);

  const term={
    el:w,bar,body,gl,
    input:'',mode:'idle',hidden:false,
    prompt:'root@main:~#',
    title:opts.title||'terminal',
    onCommand:opts.onCommand||null,
    active:false
  };
  terminals.push(term);

  // focus
  w.addEventListener('mousedown',()=>{
    w.style.zIndex=++zCounter;
    terminals.forEach(t=>t.active=false);
    term.active=true;
  });

  // drag
  let dx,dy,drag=false;
  bar.addEventListener('mousedown',e=>{
    if(e.target.classList.contains('btn'))return;
    drag=true;
    dx=e.clientX-w.offsetLeft;
    dy=e.clientY-w.offsetTop;
    w.style.transition='none'
  });
  addEventListener('mousemove',e=>{
    if(!drag)return;
    w.style.left=(e.clientX-dx)+'px';
    w.style.top=(e.clientY-dy)+'px'
  });
  addEventListener('mouseup',()=>{drag=false;w.style.transition=''});

  bar.addEventListener('touchstart',e=>{
    if(e.target.classList.contains('btn'))return;
    const t=e.touches[0];
    drag=true;dx=t.clientX-w.offsetLeft;dy=t.clientY-w.offsetTop;
  },{passive:true});
  addEventListener('touchmove',e=>{
    if(!drag)return;
    const t=e.touches[0];
    w.style.left=(t.clientX-dx)+'px';
    w.style.top=(t.clientY-dy)+'px'
  },{passive:true});
  addEventListener('touchend',()=>{drag=false});

  // buttons
  bar.querySelector('.close').addEventListener('click',()=>{
    w.style.transition='transform .3s,opacity .25s';
    w.style.transform='scale(.88)';
    w.style.opacity='0';
    setTimeout(()=>w.remove(),300)
  });
  bar.querySelector('.min').addEventListener('click',()=>{
    w.classList.toggle('minimized')
  });
  bar.querySelector('.max').addEventListener('click',()=>{
    w.classList.toggle('maximized')
  });

  return term;
}

function termPrint(term,txt,cls){
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.textContent=txt||'\u00a0';
  term.body.appendChild(el);
  term.body.scrollTop=term.body.scrollHeight;
}

function termPrintHTML(term,html,cls){
  const el=document.createElement('div');
  el.className='out'+(cls?' '+cls:'');
  el.innerHTML=html;
  term.body.appendChild(el);
  term.body.scrollTop=term.body.scrollHeight;
}

function termSetPrompt(term,p){
  term.prompt=p;
  const line=term.body.querySelector('.input-line');
  if(line)line.querySelector('.pr').textContent=p+' '
}

function termShowInput(term){
  let line=term.body.querySelector('.input-line');
  if(!line){
    line=document.createElement('div');
    line.className='input-line';
    line.innerHTML=`<span class="pr"></span> <span class="typed"></span><span class="cur">_</span>`;
    term.body.appendChild(line)
  }
  line.style.display='block';
  line.querySelector('.pr').textContent=term.prompt+' ';
  line.querySelector('.typed').textContent='';
  term.input='';
}

function termHideInput(term){
  const line=term.body.querySelector('.input-line');
  if(line)line.style.display='none'
}

function termGetInputLine(term){
  return term.body.querySelector('.input-line')
}

// === GLOBAL KEYBOARD (routes to active terminal) ===
addEventListener('keydown',e=>{
  const active=terminals.find(t=>t.active&&!t.el.classList.contains('minimized'));
  if(!active)return;

  if(e.key==='Enter'){
    const line=termGetInputLine(active);
    if(!line||line.style.display==='none')return;

    const val=active.input;
    termPrint(active,active.prompt+' '+val,'cmd');

    if(active.mode==='login'){
      handleLogin(active,val);
    }else if(active.mode==='password'){
      termPrint(active,'********','cmd');
      handlePassword(active);
    }else if(active.mode==='shell'){
      if(val.trim())handleShell(active,val);
    }else if(active.mode==='node'){
      handleNode(active,val);
    }
    return;
  }

  if(e.key==='Backspace'){
    active.input=active.input.slice(0,-1);
    updateTyped(active);
    return;
  }

  if(e.key==='Tab'){
    e.preventDefault();
    if(active.mode==='shell'){
      const cmds=Object.keys(shellCmds).filter(c=>c.startsWith(active.input.trim().toLowerCase()));
      if(cmds.length===1){
        active.input=cmds[0]+' ';
        updateTyped(active);
      }else if(cmds.length>1){
        termPrint(active,'  '+cmds.join('  '),'dim');
      }
    }
    return;
  }

  if(e.key.length===1){
    active.input+=e.key;
    updateTyped(active);
  }
});

function updateTyped(term){
  const line=termGetInputLine(term);
  if(!line)return;
  const t=line.querySelector('.typed');
  t.textContent=term.hidden?''.padEnd(term.input.length,'*'):term.input;
}

// === BOOT ===
const bootLines=[
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

const mainWin=createWin({title:'muncixop@void — zsh',left:80,top:60});
mainWin.active=true;
mainWin.mode='boot';

let bi=0;
(function bootStep(){
  if(bi>=bootLines.length){
    setTimeout(()=>{
      termSetPrompt(mainWin,'login:');
      termShowInput(mainWin);
      mainWin.mode='login';
    },500);
    return;
  }
  const[cls,txt]=bootLines[bi];
  termPrint(mainWin,txt,cls);
  bi++;
  setTimeout(bootStep,txt===''?50:35+Math.random()*45)
})();

// === LOGIN ===
function handleLogin(term,user){
  const u=user.trim().toLowerCase();
  if(u==='muncixop'||u==='root'){
    termPrint(term,'');
    termSetPrompt(term,"root@main's password:");
    term.mode='password';
    term.hidden=true;
    termShowInput(term);
  }else{
    termPrint(term,`login failed for ${u||'(blank)'}`,'err');
    termPrint(term,'');
    termSetPrompt(term,'login:');
    termShowInput(term);
  }
}

function handlePassword(term){
  term.hidden=false;
  termPrint(term,'');
  termPrint(term,'Last login: Thu Aug 27 03:42:17 2026 from 192.168.1.42','dim');
  termPrint(term,'');
  termPrint(term,'Welcome to VOID SYSTEMS','info');
  termPrint(term,'Type "help" to list available commands.','dim');
  termPrint(term,'');
  termSetPrompt(term,'root@main:~#');
  term.mode='shell';
  termShowInput(term);
}

// === SHELL ===
const shellCmds={
  'help':t=>{
    termPrint(t,'');
    termPrint(t,'Commands:','info');
    termPrint(t,'');
    termPrint(t,'  ./init           Initialize system');
    termPrint(t,'  ./scan           Scan for connected nodes');
    termPrint(t,'  ./connect <id>   Open terminal for a node');
    termPrint(t,'  ./status         Show system status');
    termPrint(t,'  whoami           Current user');
    termPrint(t,'  uname -a         System info');
    termPrint(t,'  cat /etc/void    System config');
    termPrint(t,'  ls               List files');
    termPrint(t,'  echo <msg>       Print message');
    termPrint(t,'  clear            Clear screen');
    termPrint(t,'  exit             Disconnect');
    termPrint(t,'  help             This message');
    termPrint(t,'');
  },

  './init':t=>{
    termPrint(t,'');
    termPrint(t,'Initializing system...','info');
    termPrint(t,'');
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
        termPrint(t,'');
        termPrint(t,'System ready. 0 errors.','ok');
        termPrint(t,'');
        termShowInput(t);
        return;
      }
      termPrint(t,steps[si],'ok');
      si++;
      setTimeout(step,150+Math.random()*100)
    })();
    termHideInput(t);
  },

  './scan':t=>{
    termPrint(t,'');
    termPrint(t,'Scanning network for registered nodes...','dim');
    termHideInput(t);
    setTimeout(()=>{
      termPrint(t,'');
      termPrint(t,'  ID      HOST                  TOKEN         STATUS');
      termPrint(t,'  ------  ----------------------  ------------  --------');
      termPrint(t,'  0x01    curseforge.com          a3f8c21d      [ONLINE]');
      termPrint(t,'  0x02    x.com                   7b2e91f4      [ONLINE]');
      termPrint(t,'  0x03    tiktok.com              e41d08ab      [ONLINE]');
      termPrint(t,'');
      termPrint(t,'3 nodes found. Use ./connect <id> to open a session.','ok');
      termPrint(t,'');
      termShowInput(t);
    },1200);
  },

  './connect':t=>{
    const parts=t.input.trim().split(/\s+/);
    const id=parts[1];
    if(!id){
      termPrint(t,'Usage: ./connect <node-id>','warn');
      termPrint(t,'Run ./scan to see available nodes.','dim');
      termPrint(t,'');
      return;
    }
    const nodes={
      '0x01':{host:'curseforge.com',token:'a3f8c21d',title:'node 0x01 — curseforge.com',link:'https://www.curseforge.com/members/muncixop/projects',label:'curseforge.com/members/muncixop/projects'},
      '0x02':{host:'x.com',token:'7b2e91f4',title:'node 0x02 — x.com',link:'https://x.com/MuncixOp',label:'x.com/MuncixOp'},
      '0x03':{host:'tiktok.com',token:'e41d08ab',title:'node 0x03 — tiktok.com',link:'https://www.tiktok.com/@muncixop',label:'tiktok.com/@muncixop'},
    };
    const n=nodes[id];
    if(!n){
      termPrint(t,`Unknown node: ${id}`,'err');
      termPrint(t,'');
      return;
    }
    termPrint(t,`Connecting to ${n.host}...`,'dim');
    termHideInput(t);
    setTimeout(()=>{
      termPrint(t,'');
      termPrint(t,'[OK] TCP handshake complete','ok');
      termPrint(t,'[OK] TLS 1.3 established','ok');
      termPrint(t,'[OK] Session token received: '+n.token,'ok');
      termPrint(t,'');
      termPrint(t,'Opening node terminal...','info');
      termPrint(t,'');
      setTimeout(()=>{
        const off=terminals.length*30;
        const nt=createWin({
          title:n.title,
          left:120+off,
          top:100+off
        });
        nt.active=true;
        nt.mode='node';
        nt.nodeData=n;
        ntSetNodePrompt(nt);
        termPrint(nt,`Connected to ${n.host}`,'ok');
        termPrint(nt,`Session: ${n.token}`,'dim');
        termPrint(nt,'');
        termPrint(nt,'Enter auth token to proceed:','warn');
        termShowInput(nt);
        termShowInput(t);
      },600);
    },800);
  },

  './status':t=>{
    termPrint(t,'');
    termPrint(t,'  UPTIME:    3d 14:22:07');
    termPrint(t,'  LOAD:      0.02, 0.01, 0.00');
    termPrint(t,'  MEM:       4.2GB / 64GB (6%)');
    termPrint(t,'  DISK:      128GB / 2TB (6%)');
    termPrint(t,'  NET:       eth0 10G up, wlan0 up');
    termPrint(t,'  NODES:     3 online');
    termPrint(t,'');
  },

  'whoami':t=>{termPrint(t,'root');termPrint(t,'')},

  'uname -a':t=>{termPrint(t,'Linux void 6.1.0-void #1 SMP VOID x86_64 GNU/Linux');termPrint(t,'')},

  'ls':t=>{
    termPrint(t,'');
    termPrint(t,'total 12');
    termPrint(t,'drwxr-xr-x  2 root root 4096 Aug 27 03:40 .');
    termPrint(t,'drwxr-xr-x  1 root root 4096 Aug 27 03:40 ..');
    termPrint(t,'-rwxr-xr-x  1 root root  248 Aug 27 03:39 init');
    termPrint(t,'-rwxr-xr-x  1 root root  192 Aug 27 03:39 scan');
    termPrint(t,'-rwxr-xr-x  1 root root  312 Aug 27 03:39 connect');
    termPrint(t,'-rw-r--r--  1 root root  512 Aug 27 03:40 .voidrc');
    termPrint(t,'');
  },

  'cat /etc/void':t=>{
    termPrint(t,'');
    termPrint(t,'# /etc/void');
    termPrint(t,'# modified: 2026-08-27 03:41:02 UTC');
    termPrint(t,'');
    termPrint(t,'[system]');
    termPrint(t,'  name=void');
    termPrint(t,'  owner=muncixop');
    termPrint(t,'  kernel=6.1.0-void');
    termPrint(t,'');
    termPrint(t,'[network]');
    termPrint(t,'  eth0=10.0.0.1/24');
    termPrint(t,'  firewall=strict');
    termPrint(t,'');
    termPrint(t,'[nodes]');
    termPrint(t,'  0x01=curseforge.com');
    termPrint(t,'  0x02=x.com');
    termPrint(t,'  0x03=tiktok.com');
    termPrint(t,'');
    termPrint(t,'[access]');
    termPrint(t,'  level=root');
    termPrint(t,'  2fa=enabled');
    termPrint(t,'');
  },

  'clear':t=>{t.body.innerHTML='';termShowInput(t)},

  'exit':t=>{
    termPrint(t,'');
    termPrint(t,'Connection closed.','dim');
    termHideInput(t);
    t.mode='exited';
  },
};

function handleShell(term,cmd){
  const key=cmd.trim().toLowerCase();
  if(shellCmds[key]){
    shellCmds[key](term);
    return;
  }
  if(key.startsWith('echo ')){
    termPrint(term,cmd.trim().slice(5));
    termPrint(term,'');
    return;
  }
  termPrint(term,`zsh: command not found: ${key}`,'err');
  termPrint(term,'Type "help" for available commands.','dim');
  termPrint(term,'');
}

// === NODE TERMINAL ===
function ntSetNodePrompt(t){
  t.prompt=`[${t.nodeData.host}] #`
}

function handleNode(term,val){
  const v=val.trim().toLowerCase();
  const n=term.nodeData;

  if(v===n.token||v==='auth '+n.token){
    termPrint(term,'');
    termPrint(term,'[OK] Token verified','ok');
    termPrint(term,'[OK] Session authorized','ok');
    termPrint(term,'');
    termPrint(term,'Node resolved:','info');
    termPrint(term,'');
    const lnk=document.createElement('div');
    lnk.className='lnk';
    const a=document.createElement('a');
    a.href=n.link;a.target='_blank';
    a.innerHTML=`<span class="n">→</span>${n.label}`;
    lnk.appendChild(a);
    term.body.appendChild(lnk);
    termPrint(term,'');
    termPrint(term,'Click the link or press Enter to open.','dim');
    termHideInput(term);
    term.mode='done';
    setTimeout(()=>{
      termPrint(term,'');
      termPrint(term,'[session idle — press any key to return to main shell]','dim');
      term.mode='shell';
      termSetPrompt(term,'root@main:~#');
      termShowInput(term);
    },2000);
    return;
  }

  if(v==='help'||v==='?'){
    termPrint(term,'');
    termPrint(term,'Enter the auth token to proceed.','info');
    termPrint(term,'(Hint: the token was displayed when you connected)');
    termPrint(term,'');
    return;
  }

  termPrint(term,`[${n.host}] auth failed: invalid token`,'err');
  termPrint(term,'');
  termPrint(term,'Enter auth token to proceed:','warn');
}

// === GLITCH ===
function glitch(){
  const active=terminals.find(t=>t.active&&!t.el.classList.contains('minimized'));
  if(!active)return;
  const w=active.el;
  const gl=active.gl;
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
  const tx=(Math.random()-.5)*8;
  const ty=(Math.random()-.5)*4;
  w.style.transform=`translate(${tx}px,${ty}px)`;
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

(function sched(){
  setTimeout(()=>{glitch();sched()},3000+Math.random()*5000)
})();   
