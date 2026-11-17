/* SIGNAL CITY: NIGHT SHIFT
   Self-contained top-down open-city driving game.
   Embed anywhere:  SignalCity.mount(document.getElementById('some-div'), {lang:'pt'})  */
(function(){
'use strict';
const C={night:'#120e1a',ember:'#ff8a4c',neon:'#ff4fa3',teal:'#4fe3d2',paper:'#f4e7d0',dim:'#c9b9a4',road:'#1a1424',walk:'#2b2238'};
const P=384,RW=128,N=8,WORLD=(N-1)*P+RW,NB=N-1;
const nc=i=>64+i*P;
const H=(i,j)=>[(nc(i)+nc(i+1))/2,nc(j)], V=(i,j)=>[nc(i),(nc(j)+nc(j+1))/2];
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const DISPLAY='"Big Shoulders Display","Arial Narrow",Impact,sans-serif', MONO='"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace';

const T={
 en:{title:'SIGNAL CITY',sub:'NIGHT SHIFT',
  intro:'Five jobs across a city that never closes. Pick up builds, get them checked and deliver before the clock runs out. Bump the traffic and the bugs come looking for you.',
  start:'START THE SHIFT',controls:'WASD or arrows: drive · Space: handbrake · Esc: release keys',
  job:'Drive to the ringing phone to take the next job',free:'Free roam. The city is yours.',roam:'FREE ROAM',
  done:'JOB DONE',fail:'JOB FAILED',ftime:'Out of time.',fwreck:'The build did not survive the ride.',
  slow:'Too fast. Roll through slowly.',bump:'Careful. Heat is rising.',patched:'Patched up.',heat:'HEAT',build:'BUILD',left:'left',
  finalT:'SHIFT COMPLETE',finalP:'Five jobs, every build delivered. The agents did the legwork. A human made the final call.',
  keep:'KEEP DRIVING',again:'RESTART',paused:'CLICK TO DRIVE',phone:'JOB',gas:'GAS',brake:'BRAKE',agents:'Agents delivered'},
 pt:{title:'SIGNAL CITY',sub:'TURNO DA NOITE',
  intro:'Cinco trabalhos numa cidade que nunca fecha. Pegue as builds, passe pela checagem e entregue antes do tempo acabar. Bata no trânsito e os bugs vêm atrás de você.',
  start:'COMEÇAR O TURNO',controls:'WASD ou setas: dirigir · Espaço: freio de mão · Esc: soltar o teclado',
  job:'Dirija até o telefone tocando para pegar o próximo trabalho',free:'Passeio livre. A cidade é sua.',roam:'PASSEIO LIVRE',
  done:'TRABALHO FEITO',fail:'TRABALHO PERDIDO',ftime:'O tempo acabou.',fwreck:'A build não sobreviveu à viagem.',
  slow:'Rápido demais. Passe devagar.',bump:'Cuidado. O alerta está subindo.',patched:'Consertado.',heat:'ALERTA',build:'BUILD',left:'restantes',
  finalT:'TURNO COMPLETO',finalP:'Cinco trabalhos, todas as builds entregues. Os agentes fizeram o trabalho pesado. Um humano deu a palavra final.',
  keep:'CONTINUAR DIRIGINDO',again:'RECOMEÇAR',paused:'CLIQUE PARA DIRIGIR',phone:'JOB',gas:'ACELERA',brake:'FREIO',agents:'Agentes entregaram'}
};
const mk=(at,tag,o)=>Object.assign({x:at[0],y:at[1],tag:tag},o||{});
const MISSIONS=[
 {name:'THE STOREFRONT',time:50,job:H(3,3),
  brief:{en:'A bakery app is ready for the counter. Fetch the build and get it to the merchant.',pt:'O app de uma padaria está pronto para o balcão. Busque a build e leve ao lojista.'},
  stages:[
   {label:{en:'Pick up the build at Padoca do Xerife',pt:'Pegue a build na Padoca do Xerife'},marks:[mk(V(5,2),'PADOCA')]},
   {label:{en:'Deliver it to the merchant',pt:'Entregue ao lojista'},marks:[mk(H(1,5),{en:'MERCHANT',pt:'LOJISTA'},{c:C.teal})]}]},
 {name:'THE CHECKPOINT',time:60,job:H(1,6),
  brief:{en:'No build reaches a terminal unchecked. Collect it, roll it through the scanner, then deliver.',pt:'Nenhuma build chega ao terminal sem checagem. Colete, passe pelo scanner e só então entregue.'},
  stages:[
   {label:{en:'Collect the Android build',pt:'Colete a build Android'},marks:[mk(V(0,3),'APK')]},
   {label:{en:'Roll through the scanner slowly',pt:'Passe devagar pelo scanner'},marks:[mk(H(3,1),'SCAN',{slow:true,c:C.neon})]},
   {label:{en:'Deliver the clean build',pt:'Entregue a build limpa'},marks:[mk(V(6,4),{en:'TERMINAL',pt:'TERMINAL'},{c:C.teal})]}]},
 {name:'THE DISPATCHER',time:65,job:V(6,5),
  brief:{en:'Three support events, three teams. Route each one to the right door, in any order.',pt:'Três eventos de suporte, três times. Leve cada um à porta certa, em qualquer ordem.'},
  stages:[
   {label:{en:'Collect the three events',pt:'Colete os três eventos'},marks:[mk(H(5,6),'EVENTS')]},
   {label:{en:'Route every event to its team',pt:'Leve cada evento ao seu time'},marks:[
     mk(V(2,1),{en:'PAYMENTS',pt:'PAGAMENTOS'},{c:C.neon}),mk(H(0,4),'ANDROID',{c:C.teal}),mk(V(4,4),{en:'SUPPORT',pt:'SUPORTE'},{c:C.ember})]}]},
 {name:'THE WIRE',time:48,job:H(0,1),
  brief:{en:'Link five relays so the assistant can reach the whole city. In order, and fast.',pt:'Conecte cinco antenas para o assistente alcançar a cidade toda. Em ordem, e rápido.'},
  stages:[H(1,0),V(4,1),H(5,3),V(3,5),H(1,6)].map((at,k)=>({label:{en:'Link relay '+(k+1)+' of 5',pt:'Conecte a antena '+(k+1)+' de 5'},marks:[mk(at,'RELAY '+(k+1),{c:C.teal})]}))},
 {name:'THE INSIDE CREW',time:75,job:H(3,6),heatMin:2,agents:true,
  brief:{en:'Your agents take the routine runs. You carry the one that needs a human. The bugs know it.',pt:'Seus agentes fazem as entregas de rotina. Você leva a que precisa de um humano. Os bugs sabem disso.'},
  stages:[
   {label:{en:'Meet your agents at the Yard',pt:'Encontre seus agentes no Pátio'},marks:[mk(V(3,3),{en:'THE YARD',pt:'O PÁTIO'})]},
   {label:{en:'Bring the final call to the Review Desk',pt:'Leve a decisão final à Mesa de Revisão'},marks:[mk(H(5,0),{en:'REVIEW DESK',pt:'MESA DE REVISÃO'},{c:C.teal})]}]}
];

const CSS=`
.sc-root{position:relative;width:100%;aspect-ratio:16/10;max-height:86vh;min-height:360px;background:${C.night};overflow:hidden;font-family:${MONO};color:${C.paper};user-select:none;-webkit-user-select:none;touch-action:none}
.sc-root canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.sc-over{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(18,14,26,.78);padding:20px;box-sizing:border-box}
.sc-over[hidden]{display:none}
.sc-card{max-width:520px;text-align:left}
.sc-kick{font-size:12px;letter-spacing:.18em;color:${C.ember};margin:0 0 6px}
.sc-h{font-family:${DISPLAY};font-weight:900;font-size:clamp(44px,9vw,84px);line-height:.9;margin:0 0 14px;color:${C.paper}}
.sc-h b{color:${C.neon};font-weight:900}
.sc-p{font-size:14px;line-height:1.55;color:${C.dim};margin:0 0 18px}
.sc-btn{font-family:${DISPLAY};font-weight:900;font-size:22px;letter-spacing:.04em;background:${C.ember};color:${C.night};border:0;padding:12px 22px;cursor:pointer;margin:0 10px 10px 0}
.sc-btn.alt{background:transparent;color:${C.paper};box-shadow:inset 0 0 0 2px ${C.paper}}
.sc-btn:focus-visible{outline:3px solid ${C.teal};outline-offset:3px}
.sc-small{font-size:11px;color:${C.dim};margin:8px 0 0;line-height:1.5}
.sc-lang{position:absolute;top:10px;right:10px;z-index:3;font-family:${MONO};font-size:11px;background:rgba(18,14,26,.7);color:${C.paper};border:1px solid rgba(244,231,208,.35);padding:5px 8px;cursor:pointer}
.sc-touch{position:absolute;left:0;right:0;bottom:12px;display:none;justify-content:space-between;padding:0 12px;pointer-events:none}
.sc-touch div{display:flex;gap:10px}
.sc-touch button{pointer-events:auto;width:68px;height:68px;border-radius:50%;border:2px solid rgba(244,231,208,.5);background:rgba(18,14,26,.55);color:${C.paper};font-family:${MONO};font-size:11px;font-weight:600}
.sc-touch button.on{background:${C.ember};color:${C.night}}
@media (pointer:coarse){.sc-touch{display:flex}}
`;

function mount(root,opts){
 opts=opts||{};
 if(!document.getElementById('sc-style')){const s=document.createElement('style');s.id='sc-style';s.textContent=CSS;document.head.appendChild(s);}
 let lang=opts.lang||(((document.documentElement.lang||navigator.language||'en').slice(0,2)==='pt')?'pt':'en');
 const t=k=>T[lang][k];
 const L=o=>typeof o==='string'?o:o[lang];
 root.classList.add('sc-root');
 root.innerHTML='<canvas></canvas><button class="sc-lang" type="button"></button>'+
  '<div class="sc-touch"><div><button data-k="left" type="button">&#9664;</button><button data-k="right" type="button">&#9654;</button></div><div><button data-k="down" type="button"></button><button data-k="up" type="button"></button></div></div>'+
  '<div class="sc-over"><div class="sc-card"></div></div>';
 const cv=root.querySelector('canvas'),ctx=cv.getContext('2d'),over=root.querySelector('.sc-over'),card=root.querySelector('.sc-card'),langBtn=root.querySelector('.sc-lang');
 let W=0,Hh=0,dpr=1,zoom=1;
 function resize(){const r=root.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);W=Math.max(200,r.width);Hh=Math.max(200,r.height);cv.width=Math.round(W*dpr);cv.height=Math.round(Hh*dpr);zoom=clamp(W/900,.55,1.3);}
 resize();
 if(window.ResizeObserver)new ResizeObserver(resize).observe(root);else window.addEventListener('resize',resize);

 /* ---------- world ---------- */
 let seed=7;const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let x=Math.imul(seed^seed>>>15,1|seed);x=x+Math.imul(x^x>>>7,61|x)^x;return((x^x>>>14)>>>0)/4294967296;};
 const blocks=[];const PAL=['#3a2a4d','#2c2540','#45304f','#33405a','#4a2f45','#2a3550'];
 for(let bj=0;bj<NB;bj++)for(let bi=0;bi<NB;bi++){
  const x=bi*P+RW,y=bj*P+RW,r=rnd();
  const type=(bi===3&&bj===2)||r<.1?'park':r<.18?'lot':'bld';
  const b={x:x,y:y,type:type,subs:[],trees:[]};
  if(type==='bld'){
   const sp=rnd(),rects=sp<.35?[[16,16,224,224]]:sp<.7?[[16,16,106,224],[134,16,106,224]]:[[16,16,224,106],[16,134,106,106],[134,134,106,106]];
   for(const q of rects){const wins=[],nx=Math.floor((q[2]-20)/24),ny=Math.floor((q[3]-20)/24);
    for(let k=0;k<7;k++){const wr=rnd();wins.push([x+q[0]+12+Math.floor(rnd()*nx)*24,y+q[1]+12+Math.floor(rnd()*ny)*24,wr<.45?C.ember:wr<.7?C.teal:wr<.85?C.neon:C.paper]);}
    b.subs.push({x:x+q[0],y:y+q[1],w:q[2],h:q[3],c:PAL[Math.floor(rnd()*PAL.length)],wins:wins});}
  }else if(type==='park'){for(let k=0;k<9;k++)b.trees.push([x+30+rnd()*196,y+30+rnd()*196,12+rnd()*12]);}
  blocks.push(b);
 }
 function blockAt(x,y){const bi=Math.floor(x/P),bj=Math.floor(y/P);if(bi<0||bj<0||bi>=NB||bj>=NB)return null;if(x-bi*P<RW||y-bj*P<RW)return null;return blocks[bj*NB+bi];}
 function collide(o,r){let hit=0;const bi0=Math.floor(o.x/P),bj0=Math.floor(o.y/P);
  for(let bj=bj0-1;bj<=bj0;bj++)for(let bi=bi0-1;bi<=bi0;bi++){
   if(bi<0||bj<0||bi>=NB||bj>=NB)continue;const b=blocks[bj*NB+bi];if(b.type!=='bld')continue;
   const rx=b.x+16,ry=b.y+16,S=224,cx=clamp(o.x,rx,rx+S),cy=clamp(o.y,ry,ry+S),dx=o.x-cx,dy=o.y-cy,d=Math.hypot(dx,dy);
   if(d>=r)continue;let nx,ny;
   if(d<.01){const l=o.x-rx,rr=rx+S-o.x,tp=o.y-ry,bt=ry+S-o.y,m=Math.min(l,rr,tp,bt);
    if(m===l){nx=-1;ny=0;o.x=rx-r;}else if(m===rr){nx=1;ny=0;o.x=rx+S+r;}else if(m===tp){nx=0;ny=-1;o.y=ry-r;}else{nx=0;ny=1;o.y=ry+S+r;}}
   else{nx=dx/d;ny=dy/d;o.x=cx+nx*r;o.y=cy+ny*r;}
   const vn=o.vx*nx+o.vy*ny;if(vn<0){o.vx-=1.35*vn*nx;o.vy-=1.35*vn*ny;hit=Math.max(hit,-vn);}
  }
  if(o.x<r){o.x=r;o.vx=Math.abs(o.vx)*.3;}if(o.x>WORLD-r){o.x=WORLD-r;o.vx=-Math.abs(o.vx)*.3;}
  if(o.y<r){o.y=r;o.vy=Math.abs(o.vy)*.3;}if(o.y>WORLD-r){o.y=WORLD-r;o.vy=-Math.abs(o.vy)*.3;}
  return hit;}

 /* ---------- state ---------- */
 const keys={up:0,down:0,left:0,right:0,hb:0};
 let p,traffic,agents,drones,mi,cur,cash,heat,integ,lastHit,bumpCd,banner,toast,shake,jobArmed,started=false,engaged=false,time=0,finaleShown,agentsDone;
 const TCOL=['#7d6a9a','#5a7f9a','#9a6a7a','#6a9a8f','#a08a6a','#8a8fa8'];
 function pickNext(c){const o=[];for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){const i=c.ti+d[0],j=c.tj+d[1];if(i<0||j<0||i>=N||j>=N)continue;if(i===c.fi&&j===c.fj)continue;o.push([i,j]);}
  let n;if(c.target){o.sort((a,b)=>(Math.abs(a[0]-c.target[0])+Math.abs(a[1]-c.target[1]))-(Math.abs(b[0]-c.target[0])+Math.abs(b[1]-c.target[1])));n=o[0];}else n=o[Math.floor(Math.random()*o.length)];
  c.fi=c.ti;c.fj=c.tj;c.ti=n[0];c.tj=n[1];c.t=0;}
 function carTarget(c){const dx=c.ti-c.fi,dy=c.tj-c.fj;return[nc(c.fi)+(nc(c.ti)-nc(c.fi))*c.t-dy*30,nc(c.fj)+(nc(c.tj)-nc(c.fj))*c.t+dx*30,Math.atan2(dy,dx)];}
 function mkCar(i,j,color,target){const c={fi:i,fj:j,ti:i,tj:j,t:0,sp:95+Math.random()*45,x:0,y:0,a:0,color:color,target:target||null,done:false};pickNext(c);if(!target)c.t=Math.random();const q=carTarget(c);c.x=q[0];c.y=q[1];c.a=q[2];return c;}
 function reset(){
  const s=H(2,3);p={x:s[0],y:s[1]+28,a:0,vx:0,vy:0};
  traffic=[];for(let k=0;k<16;k++)traffic.push(mkCar(Math.floor(Math.random()*N),Math.floor(Math.random()*N),TCOL[k%TCOL.length]));
  agents=[];drones=[];mi=0;cur=null;cash=0;heat=0;integ=100;lastHit=-99;bumpCd=0;banner=null;toast=null;shake=0;jobArmed=true;finaleShown=false;agentsDone=0;
 }
 reset();

 /* ---------- audio ---------- */
 let ac=null;
 function beep(f,d,type){if(!ac)return;try{const o=ac.createOscillator(),g=ac.createGain();o.type=type||'square';o.frequency.value=f;g.gain.value=.05;g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d);}catch(e){}}

 /* ---------- missions ---------- */
 const say=(txt,d)=>{toast={txt:txt,t:d||2.2};};
 const flag=(a,b,col)=>{banner={a:a,b:b,t:3.6,col:col||C.ember};};
 function loadStage(){const st=cur.m.stages[cur.si];cur.marks=st.marks.map(m=>Object.assign({},m));
  if(cur.m.agents&&cur.si===1){agents=[mkCar(3,3,C.teal,[0,7]),mkCar(3,4,C.teal,[7,7])];agentsDone=0;}}
 function startMission(){const m=MISSIONS[mi];cur={m:m,si:0,time:m.time,marks:[]};loadStage();integ=100;heat=Math.max(heat,m.heatMin||0);flag(m.name,L(m.brief),C.neon);beep(660,.12);setTimeout(()=>beep(880,.16),130);}
 function complete(){const reward=400+Math.ceil(cur.time)*15;cash+=reward;flag(t('done'),cur.m.name+'  +$'+reward,C.teal);beep(523,.1);setTimeout(()=>beep(784,.1),110);setTimeout(()=>beep(1046,.2),220);
  mi++;cur=null;heat=0;drones=[];jobArmed=true;if(mi>=MISSIONS.length&&!finaleShown){finaleShown=true;setTimeout(showFinale,2200);}}
 function fail(why){const j=cur.m.job;flag(t('fail'),t(why),C.neon);beep(180,.4,'sawtooth');cur=null;agents=[];drones=[];heat=0;integ=100;p.x=j[0];p.y=j[1];p.vx=p.vy=0;jobArmed=false;}

 /* ---------- update ---------- */
 function update(dt){
  time+=dt;
  // player
  const steer=keys.right-keys.left,speed0=Math.hypot(p.vx,p.vy);
  let ax=Math.cos(p.a),ay=Math.sin(p.a),vf=p.vx*ax+p.vy*ay;
  p.a+=steer*3*dt*clamp(vf/130,-1,1);
  ax=Math.cos(p.a);ay=Math.sin(p.a);vf=p.vx*ax+p.vy*ay;let vl=-p.vx*ay+p.vy*ax;
  if(keys.up)vf+=400*dt;
  if(keys.down){if(vf>15)vf-=620*dt;else vf-=230*dt;}
  const b=blockAt(p.x,p.y),drag=(b&&b.type==='park')?2.6:1.18;
  vf*=Math.exp(-drag*dt);if(vf<-130)vf=-130;
  if(keys.hb){vf*=Math.exp(-1.5*dt);vl*=Math.exp(-1.6*dt);}else vl*=Math.exp(-8.5*dt);
  if(!keys.up&&!keys.down&&Math.abs(vf)<6)vf=0;
  p.vx=ax*vf-ay*vl;p.vy=ay*vf+ax*vl;p.x+=p.vx*dt;p.y+=p.vy*dt;
  const hit=collide(p,12);
  if(hit>170){integ-=Math.min(10,hit/50);shake=.25;beep(110,.08,'sawtooth');}
  const speed=Math.hypot(p.vx,p.vy);
  bumpCd-=dt;

  // traffic + agents
  const all=traffic.concat(agents);
  for(const c of all){
   if(c.done)continue;
   const dx=Math.cos(c.a),dy=Math.sin(c.a),px=p.x-c.x,py=p.y-c.y,pd=Math.hypot(px,py);
   const blocked=pd<64&&(px*dx+py*dy)>pd*.35;
   if(!blocked){c.t+=c.sp*(c.target?1.5:1)*dt/P;
    if(c.t>=1){if(c.target&&c.ti===c.target[0]&&c.tj===c.target[1]){c.done=true;agentsDone++;beep(990,.08);continue;}pickNext(c);}}
   const q=carTarget(c),k=Math.min(1,dt*5);c.x+=(q[0]-c.x)*k;c.y+=(q[1]-c.y)*k;
   let da=q[2]-c.a;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;c.a+=da*Math.min(1,dt*6);
   if(pd<25&&pd>0){const nx=-px/pd,ny=-py/pd;p.x=c.x-nx*25;p.y=c.y-ny*25;
    if(bumpCd<=0&&speed0>70){p.vx*=.45;p.vy*=.45;p.vx-=nx*60;p.vy-=ny*60;bumpCd=1;shake=.3;beep(140,.1,'sawtooth');
     if(!c.target){integ-=6;heat=Math.min(3,heat+1);lastHit=time;say(t('bump'));}}}
  }
  agents=agents.filter(c=>!c.done);

  // heat + drones
  const hmin=cur?(cur.m.heatMin||0):0;
  if(time-lastHit>5)heat=Math.max(hmin,heat-.16*dt);
  if(heat<hmin)heat=hmin;
  const want=Math.floor(heat+.001);
  while(drones.length<want){const a=Math.random()*6.283;drones.push({x:p.x+Math.cos(a)*540,y:p.y+Math.sin(a)*540,vx:0,vy:0});}
  while(drones.length>want)drones.pop();
  for(const d of drones){const dx=p.x-d.x,dy=p.y-d.y,dd=Math.hypot(dx,dy)||1;
   d.vx+=dx/dd*430*dt;d.vy+=dy/dd*430*dt;const sv=Math.hypot(d.vx,d.vy),mx=250;if(sv>mx){d.vx*=mx/sv;d.vy*=mx/sv;}
   d.vx*=Math.exp(-.6*dt);d.vy*=Math.exp(-.6*dt);d.x+=d.vx*dt;d.y+=d.vy*dt;
   if(dd<22){integ-=16*dt;shake=Math.max(shake,.08);}}

  // missions
  if(cur){
   cur.time-=dt;
   for(let k=cur.marks.length-1;k>=0;k--){const m=cur.marks[k];if(Math.hypot(p.x-m.x,p.y-m.y)<40){
     if(m.slow&&speed>130){if(!toast)say(t('slow'),1.2);continue;}
     cur.marks.splice(k,1);beep(740,.09);}}
   if(cur&&!cur.marks.length){cur.si++;if(cur.si>=cur.m.stages.length)complete();else loadStage();}
   if(cur&&cur.time<=0)fail('ftime');
   if(cur&&integ<=0)fail('fwreck');
  }else{
   if(integ<=0){integ=100;say(t('patched'));}
   integ=Math.min(100,integ+4*dt);
   if(mi<MISSIONS.length){const j=MISSIONS[mi].job,d=Math.hypot(p.x-j[0],p.y-j[1]);if(!jobArmed&&d>80)jobArmed=true;if(jobArmed&&d<40)startMission();}
  }
  if(banner&&(banner.t-=dt)<=0)banner=null;
  if(toast&&(toast.t-=dt)<=0)toast=null;
  if(shake>0)shake-=dt;
 }

 /* ---------- draw ---------- */
 function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
 function drawCar(c,col,me){ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.a);
  if(me){const g=ctx.createRadialGradient(16,0,4,16,0,190);g.addColorStop(0,'rgba(255,214,150,.34)');g.addColorStop(1,'rgba(255,214,150,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(14,0);ctx.arc(14,0,190,-.42,.42);ctx.closePath();ctx.fill();}
  ctx.fillStyle='rgba(0,0,0,.4)';rr(-15,-7,32,18,4);ctx.fill();
  ctx.fillStyle=col;rr(-17,-9,34,18,4);ctx.fill();
  ctx.fillStyle='rgba(18,14,26,.75)';rr(-6,-7,13,14,2);ctx.fill();
  ctx.fillStyle='#fff3c9';ctx.fillRect(14,-8,3,4);ctx.fillRect(14,4,3,4);
  ctx.fillStyle=(me&&keys.down)?'#ff2a4a':'#a02040';ctx.fillRect(-17,-8,2,4);ctx.fillRect(-17,4,2,4);
  if(c.target){ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.strokeRect(-3,-3,6,6);}
  ctx.restore();}
 function drawMark(x,y,col,tag,pulse){const r=30+Math.sin(time*5)*4*(pulse?1:.4);
  ctx.strokeStyle=col;ctx.lineWidth=4;ctx.globalAlpha=.9;ctx.beginPath();ctx.arc(x,y,r,0,6.283);ctx.stroke();
  ctx.globalAlpha=.16;ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,r,0,6.283);ctx.fill();
  const g=ctx.createLinearGradient(0,y-120,0,y);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,col);ctx.globalAlpha=.35;ctx.fillStyle=g;ctx.fillRect(x-5,y-120,10,120);
  ctx.globalAlpha=1;ctx.font='600 13px '+MONO;ctx.textAlign='center';const w=ctx.measureText(tag).width+12;
  ctx.fillStyle='rgba(18,14,26,.85)';ctx.fillRect(x-w/2,y-66,w,20);ctx.fillStyle=col;ctx.fillText(tag,x,y-51);}
 function targets(){if(cur)return cur.marks.map(m=>({x:m.x,y:m.y,c:m.c||C.ember,tag:L(m.tag)}));
  if(mi<MISSIONS.length){const j=MISSIONS[mi].job;return[{x:j[0],y:j[1],c:C.paper,tag:t('phone')+' '+(mi+1)}];}return[];}

 function draw(){
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=C.road;ctx.fillRect(0,0,W,Hh);
  const vw=W/zoom,vh=Hh/zoom;
  let cx=p.x+p.vx*.22,cy=p.y+p.vy*.22;
  cx=vw>=WORLD?WORLD/2:clamp(cx,vw/2,WORLD-vw/2);cy=vh>=WORLD?WORLD/2:clamp(cy,vh/2,WORLD-vh/2);
  if(shake>0){cx+=(Math.random()-.5)*10;cy+=(Math.random()-.5)*10;}
  const x0=cx-vw/2,y0=cy-vh/2;
  ctx.save();ctx.scale(zoom,zoom);ctx.translate(-x0,-y0);
  // lane dashes
  ctx.strokeStyle='rgba(244,231,208,.3)';ctx.lineWidth=3;ctx.setLineDash([20,24]);ctx.beginPath();
  for(let i=0;i<N;i++){const c=nc(i);if(c>x0-70&&c<x0+vw+70){ctx.moveTo(c,Math.max(0,y0));ctx.lineTo(c,Math.min(WORLD,y0+vh));}if(c>y0-70&&c<y0+vh+70){ctx.moveTo(Math.max(0,x0),c);ctx.lineTo(Math.min(WORLD,x0+vw),c);}}
  ctx.stroke();ctx.setLineDash([]);
  // intersections
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const ix=nc(i)-64,iy=nc(j)-64;if(ix>x0+vw||ix+RW<x0||iy>y0+vh||iy+RW<y0)continue;
   ctx.fillStyle=C.road;ctx.fillRect(ix,iy,RW,RW);ctx.fillStyle='rgba(244,231,208,.16)';
   for(let k=0;k<6;k++){ctx.fillRect(ix+10+k*20,iy+2,10,8);ctx.fillRect(ix+10+k*20,iy+RW-10,10,8);ctx.fillRect(ix+2,iy+10+k*20,8,10);ctx.fillRect(ix+RW-10,iy+10+k*20,8,10);}}
  // blocks
  for(const b of blocks){if(b.x>x0+vw||b.x+256<x0||b.y>y0+vh||b.y+256<y0)continue;
   ctx.fillStyle=C.walk;ctx.fillRect(b.x,b.y,256,256);
   if(b.type==='bld'){for(const s of b.subs){ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(s.x+7,s.y+7,s.w,s.h);ctx.fillStyle=s.c;ctx.fillRect(s.x,s.y,s.w,s.h);
     ctx.strokeStyle='rgba(244,231,208,.12)';ctx.lineWidth=2;ctx.strokeRect(s.x+5,s.y+5,s.w-10,s.h-10);
     for(const w of s.wins){ctx.fillStyle=w[2];ctx.globalAlpha=.75;ctx.fillRect(w[0],w[1],9,9);}ctx.globalAlpha=1;}}
   else if(b.type==='park'){ctx.fillStyle='#1f3b3a';ctx.fillRect(b.x+10,b.y+10,236,236);for(const tr of b.trees){ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.arc(tr[0]+4,tr[1]+4,tr[2],0,6.283);ctx.fill();ctx.fillStyle='#2f6a5c';ctx.beginPath();ctx.arc(tr[0],tr[1],tr[2],0,6.283);ctx.fill();}}
   else{ctx.fillStyle='#231b30';ctx.fillRect(b.x+10,b.y+10,236,236);ctx.strokeStyle='rgba(244,231,208,.18)';ctx.lineWidth=2;ctx.beginPath();for(let k=1;k<7;k++){ctx.moveTo(b.x+10+k*34,b.y+14);ctx.lineTo(b.x+10+k*34,b.y+74);ctx.moveTo(b.x+10+k*34,b.y+182);ctx.lineTo(b.x+10+k*34,b.y+242);}ctx.stroke();}
  }
  const tg=targets();
  for(const m of tg)drawMark(m.x,m.y,m.c,m.tag,!cur);
  for(const c of traffic)drawCar(c,c.color,false);
  for(const c of agents)drawCar(c,c.color,false);
  drawCar(p,C.ember,true);
  for(const d of drones){ctx.save();ctx.translate(d.x,d.y);ctx.rotate(time*3);const j=Math.sin(time*40)*2;
   ctx.strokeStyle=C.neon;ctx.lineWidth=2;ctx.beginPath();for(let k=0;k<6;k++){const a=k*1.047;ctx.moveTo(Math.cos(a)*8,Math.sin(a)*8);ctx.lineTo(Math.cos(a)*(17+j),Math.sin(a)*(17+j));}ctx.stroke();
   ctx.fillStyle=C.neon;ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(9,0);ctx.lineTo(0,10);ctx.lineTo(-9,0);ctx.closePath();ctx.fill();ctx.fillStyle=C.night;ctx.fillRect(-3,-2,2,4);ctx.fillRect(1,-2,2,4);ctx.restore();}
  ctx.restore();

  // vignette
  const vg=ctx.createRadialGradient(W/2,Hh/2,Math.min(W,Hh)*.35,W/2,Hh/2,Math.max(W,Hh)*.75);vg.addColorStop(0,'rgba(18,14,26,0)');vg.addColorStop(1,'rgba(18,14,26,.7)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,Hh);

  // off-screen arrows
  for(const m of tg){const sx=(m.x-x0)*zoom,sy=(m.y-y0)*zoom;if(sx>20&&sx<W-20&&sy>20&&sy<Hh-20)continue;
   const a=Math.atan2(sy-Hh/2,sx-W/2),ex=clamp(sx,34,W-34),ey=clamp(sy,74,Hh-40);
   ctx.save();ctx.translate(ex,ey);ctx.rotate(a);ctx.fillStyle=m.c;ctx.beginPath();ctx.moveTo(14,0);ctx.lineTo(-8,-10);ctx.lineTo(-8,10);ctx.closePath();ctx.fill();ctx.restore();
   ctx.font='600 10px '+MONO;ctx.textAlign='center';ctx.fillStyle=m.c;ctx.fillText(Math.round(Math.hypot(m.x-p.x,m.y-p.y)/10)+'m',ex-Math.cos(a)*26,ey-Math.sin(a)*26+4);}

  // HUD
  const small=W<560,pad=12;
  ctx.textAlign='left';ctx.fillStyle='rgba(18,14,26,.72)';ctx.fillRect(pad,pad,Math.min(W-pad*2-(small?0:150),440),small?78:84);
  ctx.fillStyle=cur?C.neon:C.ember;ctx.font='600 11px '+MONO;ctx.fillText(cur?('JOB '+(mi+1)+'/5 · '+cur.m.name):(mi<5?t('roam'):t('roam')+' · 5/5'),pad+10,pad+18);
  let obj=cur?L(cur.m.stages[cur.si].label):(mi<5?t('job'):t('free'));if(cur&&cur.marks.length>1)obj+=' ('+cur.marks.length+' '+t('left')+')';
  if(cur&&cur.m.agents&&cur.si>0)obj+=' · '+t('agents')+' '+agentsDone+'/2';
  ctx.fillStyle=C.paper;ctx.font=(small?'12px ':'14px ')+MONO;const maxw=Math.min(W-pad*2-(small?0:150),440)-20;
  let words=obj.split(' '),line='',ly=pad+38;for(const w of words){if(ctx.measureText(line+w).width>maxw&&line){ctx.fillText(line,pad+10,ly);line='';ly+=16;}line+=w+' ';}ctx.fillText(line,pad+10,ly);
  // heat + build
  const hy=pad+(small?66:70);ctx.font='600 10px '+MONO;ctx.fillStyle=C.dim;ctx.fillText(t('heat'),pad+10,hy+4);
  const hx=pad+10+ctx.measureText(t('heat')).width+8;
  for(let k=0;k<3;k++){ctx.fillStyle=heat>=k+1?C.neon:'rgba(244,231,208,.2)';ctx.save();ctx.translate(hx+k*16+5,hy);ctx.rotate(.785);ctx.fillRect(-4.5,-4.5,9,9);ctx.restore();}
  const bx=hx+62;ctx.fillStyle=C.dim;ctx.fillText(t('build'),bx,hy+4);const bw=ctx.measureText(t('build')).width+8;
  ctx.fillStyle='rgba(244,231,208,.2)';ctx.fillRect(bx+bw,hy-4,90,8);ctx.fillStyle=integ>35?C.teal:C.neon;ctx.fillRect(bx+bw,hy-4,90*clamp(integ/100,0,1),8);
  // timer + cash
  ctx.textAlign='right';const tx=W-pad-(small?0:0),ty=small?pad+118:pad+52;
  if(cur){ctx.font='900 '+(small?40:54)+'px '+DISPLAY;ctx.fillStyle=cur.time<10?C.neon:C.paper;const s=Math.max(0,Math.ceil(cur.time));ctx.fillText(Math.floor(s/60)+':'+(s%60<10?'0':'')+(s%60),tx-52,ty);}
  ctx.font='600 13px '+MONO;ctx.fillStyle=C.teal;ctx.fillText('$'+cash,tx-52,ty+(cur?20:-20));
  // minimap
  const ms=small?84:112,mx=pad,my=Hh-pad-ms-(small?84:0),sc=ms/WORLD;
  ctx.fillStyle='rgba(18,14,26,.8)';ctx.fillRect(mx,my,ms,ms);ctx.strokeStyle='rgba(244,231,208,.3)';ctx.lineWidth=1;ctx.strokeRect(mx+.5,my+.5,ms-1,ms-1);
  ctx.strokeStyle='rgba(244,231,208,.22)';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<N;i++){const c=nc(i)*sc;ctx.moveTo(mx+c,my+2);ctx.lineTo(mx+c,my+ms-2);ctx.moveTo(mx+2,my+c);ctx.lineTo(mx+ms-2,my+c);}ctx.stroke();
  for(const m of tg){ctx.fillStyle=m.c;ctx.beginPath();ctx.arc(mx+m.x*sc,my+m.y*sc,3.5+Math.sin(time*6),0,6.283);ctx.fill();}
  for(const d of drones){ctx.fillStyle=C.neon;ctx.fillRect(mx+clamp(d.x,0,WORLD)*sc-1.5,my+clamp(d.y,0,WORLD)*sc-1.5,3,3);}
  ctx.save();ctx.translate(mx+p.x*sc,my+p.y*sc);ctx.rotate(p.a);ctx.fillStyle=C.ember;ctx.beginPath();ctx.moveTo(6,0);ctx.lineTo(-4,-4);ctx.lineTo(-4,4);ctx.closePath();ctx.fill();ctx.restore();
  // banner
  if(banner){const al=clamp(banner.t/.5,0,1)*clamp((3.6-banner.t)/.2,0,1);ctx.globalAlpha=al;ctx.textAlign='center';
   ctx.fillStyle='rgba(18,14,26,.82)';ctx.fillRect(0,Hh*.3,W,small?96:118);
   ctx.font='900 '+(small?38:58)+'px '+DISPLAY;ctx.fillStyle=banner.col;ctx.fillText(banner.a,W/2,Hh*.3+(small?42:60));
   ctx.font=(small?'11px ':'14px ')+MONO;ctx.fillStyle=C.paper;const mw=W-40;let ws=banner.b.split(' '),ln='',yy=Hh*.3+(small?62:86);for(const w of ws){if(ctx.measureText(ln+w).width>mw&&ln){ctx.fillText(ln.trim(),W/2,yy);ln='';yy+=15;}ln+=w+' ';}ctx.fillText(ln.trim(),W/2,yy);ctx.globalAlpha=1;}
  if(toast){ctx.textAlign='center';ctx.font='600 13px '+MONO;const w=ctx.measureText(toast.txt).width+24;ctx.fillStyle='rgba(18,14,26,.85)';ctx.fillRect(W/2-w/2,Hh-64-(small?84:0),w,28);ctx.fillStyle=C.ember;ctx.fillText(toast.txt,W/2,Hh-45-(small?84:0));}
  if(started&&!engaged&&over.hidden){ctx.fillStyle='rgba(18,14,26,.6)';ctx.fillRect(0,0,W,Hh);ctx.textAlign='center';ctx.font='900 44px '+DISPLAY;ctx.fillStyle=C.paper;ctx.fillText(t('paused'),W/2,Hh/2);}
 }

 /* ---------- overlays ---------- */
 function showStart(){over.hidden=false;card.innerHTML='<p class="sc-kick">'+t('sub')+'</p><h2 class="sc-h">SIGNAL <b>CITY</b></h2><p class="sc-p">'+t('intro')+'</p><button class="sc-btn" type="button" data-a="start">'+t('start')+'</button><p class="sc-small">'+t('controls')+'</p>';}
 function showFinale(){engaged=false;over.hidden=false;card.innerHTML='<p class="sc-kick">$'+cash+'</p><h2 class="sc-h">'+t('finalT')+'</h2><p class="sc-p">'+t('finalP')+'</p><button class="sc-btn" type="button" data-a="keep">'+t('keep')+'</button><button class="sc-btn alt" type="button" data-a="again">'+t('again')+'</button>';}
 function labels(){langBtn.textContent=lang==='en'?'PT':'EN';root.querySelector('[data-k=up]').textContent=t('gas');root.querySelector('[data-k=down]').textContent=t('brake');}
 function engage(){engaged=true;if(!ac){try{ac=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}}
 over.addEventListener('click',e=>{const a=e.target&&e.target.getAttribute&&e.target.getAttribute('data-a');if(!a)return;if(a==='again')reset();started=true;over.hidden=true;engage();});
 langBtn.addEventListener('click',e=>{e.stopPropagation();setLang(lang==='en'?'pt':'en');});
 cv.addEventListener('pointerdown',()=>{if(started&&over.hidden)engage();});
 document.addEventListener('pointerdown',e=>{if(!root.contains(e.target)){engaged=false;for(const k in keys)keys[k]=0;}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)engaged=false;});
 const KM={ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',Space:'hb'};
 window.addEventListener('keydown',e=>{if(!engaged)return;if(e.code==='Escape'){engaged=false;for(const k in keys)keys[k]=0;return;}const k=KM[e.code];if(k){keys[k]=1;e.preventDefault();}});
 window.addEventListener('keyup',e=>{const k=KM[e.code];if(k)keys[k]=0;});
 root.querySelectorAll('.sc-touch button').forEach(b=>{const k=b.getAttribute('data-k');
  const on=e=>{e.preventDefault();if(started&&over.hidden)engage();keys[k]=1;b.classList.add('on');},off=()=>{keys[k]=0;b.classList.remove('on');};
  b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off);b.addEventListener('pointerleave',off);});
 labels();showStart();
 function setLang(l){lang=l==='pt'?'pt':'en';labels();if(!over.hidden){if(finaleShown&&started)showFinale();else showStart();}}
 if(opts.followPage){langBtn.hidden=true;setLang((document.documentElement.lang||'en').slice(0,2));
  new MutationObserver(function(){setLang((document.documentElement.lang||'en').slice(0,2));}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
 let visible=true;
 if(window.IntersectionObserver)new IntersectionObserver(function(en){visible=en[0].isIntersecting;if(!visible){engaged=false;for(const k in keys)keys[k]=0;}}).observe(root);

 let last=performance.now();
 let ta='';
 function frame(now){const want=(started&&engaged)?'none':'pan-y';if(want!==ta){ta=want;root.style.touchAction=want;}const dt=Math.min(.05,(now-last)/1000);last=now;if(started&&engaged&&over.hidden)update(dt);if(visible)draw();requestAnimationFrame(frame);}
 requestAnimationFrame(frame);
 return{setLang:setLang,get p(){return p;},get cur(){return cur;},get mi(){return mi;},get cash(){return cash;},get heat(){return heat;},missions:MISSIONS,reset:reset};
}
window.SignalCity={mount:mount};
})();
