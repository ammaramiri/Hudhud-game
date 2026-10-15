'use strict';
(()=>{
const $=id=>document.getElementById(id),KEY='hudhud-mobile-world-v1';
const maps={
 world:{art:'assets/world/neighborhood-v3.webp',nodes:{home:[262,671],south:[595,813],play:[1080,738],garden:[1340,507],school:[1016,291],mosque:[602,278],library:[272,437],tree:[453,473],plaza:[762,489]},edges:[['home','south'],['south','play'],['play','garden'],['garden','school'],['school','mosque'],['mosque','library'],['library','tree'],['tree','plaza'],['plaza','garden'],['south','plaza']],spawn:'home',goal:'garden'},
 garden:{art:'assets/world/garden-hub-v2.webp',nodes:{gate:[770,850],lower:[770,680],bottom:[770,515],left:[660,445],upper:[770,370],right:[885,445],orchardTurn:[590,340],orchard:[480,265],waterTurn:[1040,375],water:[1285,365],lookoutTurn:[450,640],lookout:[280,535],sharedTurn:[1080,670],shared:[1240,650]},edges:[['gate','lower'],['lower','bottom'],['bottom','left'],['left','upper'],['upper','right'],['right','bottom'],['left','orchardTurn'],['orchardTurn','orchard'],['right','waterTurn'],['waterTurn','water'],['lower','lookoutTurn'],['lookoutTurn','lookout'],['lower','sharedTurn'],['sharedTurn','shared']],spawn:'gate',goal:'orchard'}
};
const texts={
ar:{mainMap:'العودة إلى الخريطة الرئيسية',world:'الحيّ',garden:'الحديقة',home:'البيت',south:'السوق',play:'الملعب',school:'المدرسة',mosque:'المسجد',library:'المكتبة',plaza:'الساحة',gate:'بوابة الحيّ',center:'وسط الحديقة',west:'الممر',sky:'منصة المراقبة',plant:'النبتة',animals:'سقي العصفور',craft:'ركن النجارة',walk:'اضغط على الطريق لتمشي. اسحب لتستكشف.',goGarden:'إلى الحديقة',goPlant:'إلى النبتة',goExit:'العودة إلى الحيّ',moving:'نتجه إلى {place}…',enter:'دخول الحديقة',explore:'استكشف الحديقة.',map:'خريطة المكان',settings:'الإعدادات',back:'الصفحة الأولى',mute:'كتم الصوت',unmute:'تشغيل الصوت',recenter:'إلى شخصيتي',close:'إغلاق',order:'رتّب مراحل نمو النبتة',instruction:'اضغط على الصور من البداية إلى النهاية.',try:'جرّب مرحلة أخرى. ما الذي يأتي أولًا؟',success:'الله خلق النبات وجعل له نموًا.',earned:'أكملت نشاط النبتة',returnGarden:'العودة إلى الحديقة',replay:'ألعب مرة أخرى',names:['بذرة','نبتة صغيرة','نبتة نامية','نبات مكتمل'],save:'تعذّر الحفظ. يبقى تقدمك خلال هذه الزيارة.'},
de:{mainMap:'Zurück zur Hauptkarte',world:'Das Viertel',garden:'Der Garten',home:'Zuhause',south:'Markt',play:'Spielplatz',school:'Schule',mosque:'Moschee',library:'Bücherei',plaza:'Platz',gate:'Zum Viertel',center:'Gartenmitte',west:'Weg',sky:'Aussichtsbank',plant:'Pflanze',animals:'Wasser für den Spatz',craft:'Werkbank',walk:'Tippe auf den Weg. Ziehe, um dich umzusehen.',goGarden:'Zum Garten',goPlant:'Zur Pflanze',goExit:'Zurück ins Viertel',moving:'Auf dem Weg: {place}…',enter:'Garten betreten',explore:'Erkunde den Garten.',map:'Ortskarte',settings:'Einstellungen',back:'Zum Startbildschirm',mute:'Ton ausschalten',unmute:'Ton einschalten',recenter:'Meine Figur',close:'Schließen',order:'Ordne das Pflanzenwachstum',instruction:'Tippe die Bilder in der richtigen Reihenfolge an.',try:'Versuche eine andere Phase. Was kommt zuerst?',success:'Allah hat die Pflanzen erschaffen und lässt sie wachsen.',earned:'Pflanzenaufgabe geschafft',returnGarden:'Zurück zum Garten',replay:'Noch einmal spielen',names:['Samen','Keimling','Junge Pflanze','Blühende Pflanze'],save:'Speichern nicht möglich. Dein Fortschritt bleibt für diesen Besuch.'},
en:{mainMap:'Back to the main map',world:'Neighbourhood',garden:'Garden',home:'Home',south:'Market',play:'Playground',school:'School',mosque:'Mosque',library:'Library',plaza:'Square',gate:'To the neighbourhood',center:'Garden centre',west:'Path',sky:'Lookout bench',plant:'Plant',animals:'Water for the sparrow',craft:'Workbench',walk:'Tap the path to walk. Drag to look around.',goGarden:'To the garden',goPlant:'To the plant',goExit:'Back to the neighbourhood',moving:'Walking to {place}…',enter:'Enter the garden',explore:'Explore the garden.',map:'Area map',settings:'Settings',back:'Opening screen',mute:'Mute sound',unmute:'Turn sound on',recenter:'My character',close:'Close',order:'Order the plant’s growth',instruction:'Tap the pictures from first to last.',try:'Try another stage. What comes first?',success:'Allah created plants and made them grow.',earned:'Plant activity complete',returnGarden:'Back to the garden',replay:'Play again',names:['Seed','Seedling','Growing plant','Flowering plant'],save:'Saving is unavailable. Progress stays for this visit.'}
};
const regionKeys=['orchard','water','lookout','shared'];
const regionNames={ar:{orchard:'البستان',water:'الماء والعناية',lookout:'مرصد الطبيعة',shared:'المساحة المشتركة'},de:{orchard:'Obstgarten',water:'Wasser und Pflege',lookout:'Naturbeobachtung',shared:'Gemeinschaftsplatz'},en:{orchard:'Orchard',water:'Water and care',lookout:'Nature lookout',shared:'Shared garden'}};
for(const language of Object.keys(regionNames))Object.assign(texts[language],regionNames[language]);
const walkFrames={"boy": {"front": ["assets/walk-directional/boy-front-0.webp", "assets/walk-directional/boy-front-1.webp", "assets/walk-directional/boy-front-2.webp", "assets/walk-directional/boy-front-3.webp"], "right": ["assets/walk-directional/boy-right-0.webp", "assets/walk-directional/boy-right-1.webp", "assets/walk-directional/boy-right-2.webp", "assets/walk-directional/boy-right-3.webp"], "back": ["assets/walk-directional/boy-back-0.webp", "assets/walk-directional/boy-back-1.webp", "assets/walk-directional/boy-back-2.webp", "assets/walk-directional/boy-back-3.webp"], "left": ["assets/walk-directional/boy-left-0.webp", "assets/walk-directional/boy-left-1.webp", "assets/walk-directional/boy-left-2.webp", "assets/walk-directional/boy-left-3.webp"]}, "girl": {"front": ["assets/walk-directional/girl-front-0.webp", "assets/walk-directional/girl-front-1.webp", "assets/walk-directional/girl-front-2.webp", "assets/walk-directional/girl-front-3.webp"], "right": ["assets/walk-directional/girl-right-0.webp", "assets/walk-directional/girl-right-1.webp", "assets/walk-directional/girl-right-2.webp", "assets/walk-directional/girl-right-3.webp"], "back": ["assets/walk-directional/girl-back-0.webp", "assets/walk-directional/girl-back-1.webp", "assets/walk-directional/girl-back-2.webp", "assets/walk-directional/girl-back-3.webp"], "left": ["assets/walk-directional/girl-left-0.webp", "assets/walk-directional/girl-left-1.webp", "assets/walk-directional/girl-left-2.webp", "assets/walk-directional/girl-left-3.webp"]}};
let smoothReady=false,smoothCharacter='',displayDirection=0,turnClock=0,strideDistance=0;
const directions=['front','right','back','left'];
const smoothSprite=document.createElement('span');smoothSprite.id='world-walk-sprite';smoothSprite.setAttribute('aria-hidden','true');$('world-avatar').append(smoothSprite);
function loadSmooth(character){smoothReady=false;smoothCharacter=character;$('world-avatar').classList.remove('smooth-ready');const img=new Image();img.src='assets/walk-directional/'+character+'-smooth-v1.webp';img.decode().then(()=>{if(smoothCharacter!==character)return;smoothSprite.style.backgroundImage='url("'+img.src+'")';smoothReady=true;$('world-avatar').classList.add('smooth-ready');}).catch(()=>{});}
function drawSmooth(walking){const turning=displayDirection!==directions.indexOf(facing)*2;const col=turning||!walking?displayDirection:Math.floor(strideDistance/20)%8;const row=turning||!walking?4:directions.indexOf(facing);smoothSprite.style.backgroundPosition=(col*100/7)+'% '+(row*25)+'%';smoothSprite.dataset.frame=String(col);smoothSprite.dataset.row=String(row);}
let watered=false;
let facing="front",lastFrame="",walkFrame=1;
let active=false,lang='de',profile=null,scene='world',pos=[262,671],route=[],onArrival=null,following=true,camera={x:0,y:0},scale=1,last=0,done=false,muted=true,storageOK=true,plantOrder=[],mistakes=0,drag=null,audio=null;
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));const t=()=>texts[lang];
function read(){try{const d=JSON.parse(localStorage.getItem(KEY)||'null');return d&&d.version===1?d:null;}catch{return null;}}
function save(){if(!active)return;try{localStorage.setItem(KEY,JSON.stringify({version:1,gardenLayout:2,visited:true,scene,position:pos,facing,completedSteps:[...(done?['plant']:[]),...(watered?['watering']:[])]}));}catch{storageOK=false;}}
function ping(){if(muted)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=720;g.gain.setValueAtTime(.025,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.14);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.15);}catch{}}
function nearest(point){const m=maps[scene];let best=null;for(let i=0;i<m.edges.length;i++){const [a,b]=m.edges[i],A=m.nodes[a],B=m.nodes[b],dx=B[0]-A[0],dy=B[1]-A[1],u=clamp(((point[0]-A[0])*dx+(point[1]-A[1])*dy)/(dx*dx+dy*dy),0,1),p=[A[0]+u*dx,A[1]+u*dy],d=distance(p,point);if(!best||d<best.d)best={a,b,p,d,i};}return best;}
function pathTo(point){const m=maps[scene],s=nearest(pos),e=nearest(point),nodes={...m.nodes,S:s.p,T:e.p},adj={};Object.keys(nodes).forEach(k=>adj[k]=[]);function link(a,b){const d=distance(nodes[a],nodes[b]);adj[a].push([b,d]);adj[b].push([a,d]);}m.edges.forEach(([a,b])=>link(a,b));link('S',s.a);link('S',s.b);link('T',e.a);link('T',e.b);if(s.i===e.i)link('S','T');const ds={S:0},prev={},q=new Set(Object.keys(nodes));while(q.size){let u=null;for(const k of q)if(u===null||(ds[k]??Infinity)<(ds[u]??Infinity))u=k;if(!Number.isFinite(ds[u]))break;q.delete(u);if(u==='T')break;for(const [v,d]of adj[u])if(ds[u]+d<(ds[v]??Infinity)){ds[v]=ds[u]+d;prev[v]=u;}}let path=[],u='T';while(u&&u!=='S'){path.unshift(nodes[u]);u=prev[u];}return path;}
function move(point,action=null,label=null){route=pathTo(point);onArrival=action;following=true;$('world-target').hidden=false;const end=route.at(-1)||pos;$('world-target').style.left=end[0]+'px';$('world-target').style.top=end[1]+'px';$('world-hint').textContent=label?t().moving.replace('{place}',label):t().walk;}
function travel(key){if(!maps[scene].nodes[key])return;let action=null;if(scene==='world'&&key==='garden')action=()=>setScene('garden',maps.garden.nodes.gate);if(scene==='garden'&&key==='gate')action=()=>setScene('world',maps.world.nodes.garden);move(maps[scene].nodes[key],action,t()[key]);}
function setScene(next,point){scene=next;route=[];onArrival=null;pos=nearestForScene(point);$('world-art').src=maps[scene].art;$('world-target').hidden=true;following=true;updateLabels();resize();save();}
function nearestForScene(point){return nearest(point).p;}
function resize(){if(!active)return;scale=Math.max($('world-view').clientWidth/1536,$('world-view').clientHeight/1024,innerWidth<760?.78:.85);renderCamera(true);}
function renderCamera(snap=false){const w=$('world-view').clientWidth,h=$('world-view').clientHeight,maxX=Math.max(0,1536-w/scale),maxY=Math.max(0,1024-h/scale);if(following){let x=clamp(pos[0]-w/scale*.5,0,maxX),y=clamp(pos[1]-h/scale*.57,0,maxY);camera.x=snap?x:camera.x+(x-camera.x)*.13;camera.y=snap?y:camera.y+(y-camera.y)*.13;}camera.x=clamp(camera.x,0,maxX);camera.y=clamp(camera.y,0,maxY);$('world-stage').style.transform=`translate(${-camera.x*scale}px,${-camera.y*scale}px) scale(${scale})`;$('world-avatar').style.left=pos[0]+'px';$('world-avatar').style.top=pos[1]+'px';}
function faceMovement(dx,dy){
 if(Math.abs(dx)+Math.abs(dy)<.001)return;
 const horizontal=dx<0?'left':'right',vertical=dy<0?'back':'front';
 if(Math.abs(dx)>Math.abs(dy)*1.12)facing=horizontal;
 else if(Math.abs(dy)>Math.abs(dx)*1.12)facing=vertical;
 else if(facing!==horizontal&&facing!==vertical)facing=Math.abs(dx)>Math.abs(dy)?horizontal:vertical;
}
function tick(now){
 const dt=Math.min((now-last)/1000,.05);last=now;
 if(active){
  const blocked=!!document.querySelector('.world-dialog[open]');
  if(route.length&&!blocked){
   let budget=dt*235;
   while(route.length&&budget>0){
    const dx=route[0][0]-pos[0],dy=route[0][1]-pos[1],d=Math.hypot(dx,dy);
    faceMovement(dx,dy);
    if(smoothReady){const target=directions.indexOf(facing)*2;if(displayDirection!==target){if(now-turnClock>=65){const delta=(target-displayDirection+8)%8;displayDirection=(displayDirection+(delta<=4?1:7))%8;turnClock=now;}budget=0;break;}strideDistance+=Math.min(d,budget);}
    if(d<=budget){pos=route.shift();budget-=d;}
    else{pos=[pos[0]+dx*budget/d,pos[1]+dy*budget/d];budget=0;}
   }
   if(!route.length){const action=onArrival;onArrival=null;$('world-target').hidden=true;$('world-hint').textContent=scene==='garden'&&done?t().explore:t().walk;save();action?.();}
  }
  const walking=route.length>0&&!document.querySelector('.world-dialog[open]');
  $('world-avatar').classList.toggle('walking',walking);
  if(walking)walkFrame=Math.floor(now/145)%4;
  const key=profile.character+':'+facing+':'+walkFrame;
  if(!smoothReady&&key!==lastFrame){$('world-avatar-image').src=walkFrames[profile.character==='girl'?'girl':'boy'][facing][walkFrame];lastFrame=key;}
  $('world-avatar').dataset.facing=facing;
  if(smoothReady)drawSmooth(walking);updateContext();renderCamera();
 }
 requestAnimationFrame(tick);
}
const regionMarkers=regionKeys.map(key=>{const button=document.createElement('button');button.className='garden-region-marker';button.type='button';button.dataset.region=key;button.innerHTML='<span class="map-pin-core" aria-hidden="true"></span>';$('world-stage').append(button);button.onclick=()=>travel(key);return button;});
const gateHotspot=document.createElement('button');gateHotspot.id='world-gate-hotspot';gateHotspot.type='button';$('world-stage').append(gateHotspot);gateHotspot.onclick=()=>travel('gate');
function updateLabels(){const c=t();gateHotspot.hidden=scene!=='garden';gateHotspot.textContent=({ar:'الخروج إلى الحيّ',de:'Zum Viertel',en:'Exit to neighbourhood'}[lang]);gateHotspot.style.left='770px';gateHotspot.style.top='850px';
for(const button of regionMarkers){button.hidden=scene!=='garden';const key=button.dataset.region,P=maps.garden.nodes[key];button.style.left=P[0]+'px';button.style.top=(P[1]-30)+'px';button.title=c[key];button.setAttribute('aria-label',c[key]);}
$('world-return').hidden=scene==='world';$('world-return').textContent=({ar:'الحيّ',de:'Viertel',en:'Home map'}[lang]);$('world-return').setAttribute('aria-label',c.mainMap);document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';$('world-title').textContent=c[scene];$('world-map').setAttribute('aria-label',c.map);$('world-menu').setAttribute('aria-label',c.settings);$('world-view').setAttribute('aria-label',c.walk);$('overview-title').textContent=c.map;$('settings-title').textContent=c.settings;$('world-home').textContent=c.back;$('world-sound').textContent=muted?c.unmute:c.mute;$('world-save-warning').textContent=c.save;$('world-save-warning').hidden=storageOK;document.querySelectorAll('.close-world-dialog').forEach(b=>b.setAttribute('aria-label',c.close));document.querySelectorAll('[data-world-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.worldLang===lang)));
$('world-hotspot').hidden=scene!=='world';const P=maps.world.nodes.garden;$('world-hotspot').style.left=P[0]+'px';$('world-hotspot').style.top=(P[1]-40)+'px';$('world-hotspot').setAttribute('aria-label',c.enter);$('world-hotspot').innerHTML='<span class="map-pin-core" aria-hidden="true"></span>';updateContext();}
const entryLabels={ar:{gate:'الخروج إلى الحيّ',garden:'ادخل الحديقة'},de:{gate:'Zum Viertel',garden:'Garten betreten'},en:{gate:'Exit to neighbourhood',garden:'Enter the garden'}};
let tutorialUntil=0,tutorialShown=false;
function nearbyPlace(){if(route.length)return null;const keys=scene==='world'?['garden']:['gate',...regionKeys];return keys.sort((a,b)=>distance(pos,maps[scene].nodes[a])-distance(pos,maps[scene].nodes[b])).find(k=>distance(pos,maps[scene].nodes[k])<100)||null;}
function updateContext(){const key=nearbyPlace(),button=$('world-go'),hint=$('world-hint');const region=regionKeys.includes(key);button.hidden=!key||region;if(key&&!region)button.textContent=entryLabels[lang][key];hint.hidden=!region&&(!!key||Date.now()>tutorialUntil);if(region)hint.textContent=t()[key];else if(!hint.hidden)hint.textContent=({ar:'المس الطريق للمشي، واسحب للاستكشاف',de:'Zum Gehen tippen · Zum Erkunden ziehen',en:'Tap a path to walk · Drag to explore'}[lang]);}

function enter(event){profile=event.detail;lang=texts[profile.language]?profile.language:'de';muted=profile.muted;const d=read();done=Array.isArray(d?.completedSteps)&&d.completedSteps.includes('plant');watered=Array.isArray(d?.completedSteps)&&d.completedSteps.includes('watering');$('opening-screen').hidden=true;$('game-shell').hidden=true;$('world-screen').hidden=false;document.body.classList.remove('opening-active');document.body.classList.add('world-active');facing=['front','right','back','left'].includes(d?.facing)?d.facing:'front';walkFrame=1;lastFrame='';displayDirection=directions.indexOf(facing)*2;strideDistance=0;loadSmooth(profile.character==='girl'?'girl':'boy');
const characterFrames=walkFrames[profile.character==='girl'?'girl':'boy'];
$('world-avatar-image').src=characterFrames[facing][walkFrame];

active=true;if(!tutorialShown){try{tutorialShown=localStorage.getItem('hudhud-map-help-v1')==='seen';}catch{}}if(!tutorialShown){tutorialUntil=Date.now()+6500;tutorialShown=true;try{localStorage.setItem('hudhud-map-help-v1','seen');}catch{}}const s=d&&maps[d.scene]?d.scene:'world';scene=s;const v=s==='garden'&&d?.gardenLayout!==2?maps.garden.nodes.gate:Array.isArray(d?.position)&&d.position.length===2&&d.position.every(Number.isFinite)?d.position:maps[s].nodes[maps[s].spawn];setScene(s,v);$('world-view').focus({preventScroll:true});}
window.addEventListener('hudhud:profile-ready',enter);window.addEventListener('hudhud:resume',enter);
$('world-return').onclick=()=>{if(scene==='world')return;drag=null;setScene('world',maps.world.nodes.garden);$('world-view').focus({preventScroll:true});};
$('world-go').onclick=()=>{const key=nearbyPlace();if(key)travel(key);};$('world-hotspot').onclick=()=>travel(maps[scene].goal);
$('world-map').onclick=()=>{$('overview-art').src=maps[scene].art;const keys=scene==='world'?['home','library','mosque','school','south','play','plaza','garden']:['gate',...regionKeys];$('destinations').replaceChildren(...keys.map(key=>{const b=document.createElement('button');b.type='button';b.textContent=t()[key];b.dataset.destination=key;b.onclick=()=>{$('world-overview').close();travel(key);};return b;}));$('world-overview').showModal();};
$('world-menu').onclick=()=>{updateLabels();$('world-settings').showModal();};document.querySelectorAll('.close-world-dialog').forEach(b=>b.onclick=()=>b.closest('dialog').close());
document.querySelectorAll('[data-world-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.worldLang;document.querySelector('[data-lang="'+lang+'"]').click();updateLabels();});
$('world-sound').onclick=()=>{muted=!muted;document.querySelector('#mute').click();updateLabels();if(!muted)ping();};
$('world-home').onclick=()=>{save();active=false;route=[];onArrival=null;$('world-settings').close();$('world-screen').hidden=true;document.body.classList.remove('world-active');document.body.classList.add('opening-active');$('opening-screen').hidden=false;$('game-shell').hidden=true;document.querySelector('[data-opening-lang="'+lang+'"]').click();window.scrollTo(0,0);};
const view=$('world-view');view.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,cx:camera.x,cy:camera.y,moved:false};view.setPointerCapture(e.pointerId);});view.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>9)drag.moved=true;if(drag.moved){following=false;camera.x=drag.cx-(e.clientX-drag.x)/scale;camera.y=drag.cy-(e.clientY-drag.y)/scale;renderCamera();}});view.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;if(!drag.moved){const bounds=view.getBoundingClientRect(),p=[camera.x+(e.clientX-bounds.left)/scale,camera.y+(e.clientY-bounds.top)/scale],n=nearest(p);if(n.d<80)move(n.p);}drag=null;});view.addEventListener('pointercancel',()=>drag=null);
view.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const dx=e.key==='ArrowLeft'?-80:e.key==='ArrowRight'?80:0,dy=e.key==='ArrowUp'?-80:e.key==='ArrowDown'?80:0;move([pos[0]+dx,pos[1]+dy]);}});
const discoveryText={
 ar:{title:'من بذرة إلى زهرة',actions:['المس البذرة','المس النبتة','لنكتشف المزيد'],states:['بذرة','نبتة صغيرة','زهرة'],loading:'لحظة…',failed:'أعد المحاولة'},
 de:{title:'Vom Samen zur Blüte',actions:['Berühre den Samen','Berühre die Pflanze','Weiter entdecken'],states:['Samen','Junge Pflanze','Blüte'],loading:'Einen Moment…',failed:'Erneut versuchen'},
 en:{title:'From seed to flower',actions:['Touch the seed','Touch the plant','Keep exploring'],states:['Seed','Young plant','Flower'],loading:'One moment…',failed:'Try again'}
};
const plantArt=['assets/plant/seed.webp','assets/plant/sprout.webp','assets/plant/flower.webp'];
let plantStage=0,plantBusy=false,plantTimer=0,plantSession=0;
function chapterOptions(){return {watered,seedDone:done,onWater:()=>{watered=true;save();updateLabels();},onSeed:()=>openPlant(true)};}
function openWatering(){window.HUDHUDPlantChapter.start(lang,'water',chapterOptions());}
window.addEventListener('hudhud:plant-progress',()=>{if(active)updateLabels();});
function openPlant(replay=false){
 if(done&&!replay){window.HUDHUDPlantChapter.openMenu(lang,chapterOptions());return;}
 clearTimeout(plantTimer);plantSession++;plantStage=0;plantBusy=true;
 const c=discoveryText[lang],body=$('plant-body');
 $('plant-dialog').classList.add('plant-discovery');$('plant-title').textContent=c.title;
 body.innerHTML='<button class="plant-scene" type="button" disabled><span class="plant-painting"></span></button><footer class="plant-controls"><div class="plant-progress" aria-hidden="true"><span></span><span></span><span></span></div><p class="plant-status" role="status" aria-live="polite"></p><button type="button" class="plant-action" disabled></button></footer>';
 const painting=body.querySelector('.plant-painting');
 plantArt.forEach((src,i)=>{const img=new Image();img.src=src;img.alt='';img.className='plant-frame';img.dataset.frame=i;painting.append(img);});
 body.querySelector('.plant-scene').onclick=advancePlant;body.querySelector('.plant-action').onclick=advancePlant;
 $('plant-dialog').showModal();renderPlant();loadPlantArt();
}
async function loadPlantArt(){
 const session=plantSession,c=discoveryText[lang];plantBusy=true;renderPlant();
 try{
  await Promise.all([...$('plant-body').querySelectorAll('img')].map(img=>img.decode()));
  if(session!==plantSession||!$('plant-dialog').open)return;
  plantBusy=false;renderPlant();
 }catch{
  if(session!==plantSession||!$('plant-dialog').open)return;
  const button=$('plant-body').querySelector('.plant-action');button.disabled=false;button.textContent=c.failed;button.onclick=loadPlantArt;
 }
}
function renderPlant(){
 const body=$('plant-body'),c=discoveryText[lang];
 body.querySelectorAll('.plant-frame').forEach((img,i)=>img.classList.toggle('is-current',i===plantStage));
 body.querySelectorAll('.plant-progress span').forEach((dot,i)=>dot.classList.toggle('is-current',i<=plantStage));
 const sceneButton=body.querySelector('.plant-scene'),action=body.querySelector('.plant-action');
 sceneButton.disabled=plantBusy||plantStage===2;sceneButton.setAttribute('aria-label',c.actions[plantStage]);
 action.disabled=plantBusy;action.textContent=plantBusy?c.loading:c.actions[plantStage];action.onclick=advancePlant;
 body.querySelector('.plant-status').textContent=c.states[plantStage];
 $('plant-dialog').dataset.stage=plantStage;
}
function advancePlant(){
 if(plantBusy)return;
 if(plantStage===2){$('plant-dialog').close();openWatering();return;}
 plantStage++;plantBusy=true;renderPlant();
 const session=plantSession;
 plantTimer=setTimeout(()=>{
  if(session!==plantSession||!$('plant-dialog').open)return;
  plantBusy=false;
  if(plantStage===2){done=true;save();updateLabels();}
  renderPlant();
 },matchMedia('(prefers-reduced-motion: reduce)').matches?0:950);
}
$('plant-dialog').addEventListener('close',()=>{plantSession++;clearTimeout(plantTimer);plantBusy=false;});
window.addEventListener('resize',resize);document.addEventListener('visibilitychange',()=>{if(document.hidden)save();});window.addEventListener('pagehide',save);requestAnimationFrame(tick);
// Read-only snapshot aids QA without mutating game state.
window.HUDHUDWorld={getState:()=>({active,scene,position:[...pos],moving:route.length>0,facing,completed:done,camera:{...camera},scale})};
})();

