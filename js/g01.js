'use strict';
(()=>{
const KEY='hudhud-g01-v1',BASE='assets/g01/';
const L={
ar:{title:'رحلة النبتة',back:'إلى البستان',next:'أكمل',finish:'أتممت الرحلة',again:'ألعب من جديد',mute:'كتم الصوت',sound:'تشغيل الصوت',loading:'تُحمَّل صور الرحلة…',retry:'إعادة تحميل الصور',error:'لم تكتمل الصور. أعد المحاولة.',save:'تعذّر حفظ التقدم؛ يبقى متاحاً خلال هذه الزيارة.',step:'الخطوة',of:'من',done:'الله أنبتها، وأنا اعتنيت بها.',thanks:'الحمد لله على نعمة النبات.',stars:'نجوم',select:'اختر الأداة أولاً، ثم المس الأصيص.',soil:'التراب',trowel:'المجرفة',seed:'البذرة',water:'إبريق الماء',cover:'غطِّ البذرة',pot:'الأصيص',shade:'مكان مظلل',light:'مكان مضيء',move:'انقلها إلى الضوء',observe:'شاهد ما يحدث بعد مرور وقت',time:'تمر أيام… ينمو الجذر ثم تظهر النبتة.',correct:'هذه العناية التي تحتاجها النبتة.',wrong:'تربتها جافة. ما الذي تحتاجه الآن؟',orderWrong:'ابدأ بالبذرة، ثم ابحث عما يأتي بعدها.',wet:'التربة رطبة الآن. توقف عن السقي.',over:'الماء كثير. لنحاول بكمية أقل.',waterHint:'اسقِ على دفعات صغيرة، وتوقف عندما تصبح التربة رطبة.',stages:['بذرة في التراب','بادرة صغيرة','نبتة نامية'],heads:['جهِّز التراب','اصنع حفرة صغيرة','ازرع البذرة','اسقِ بقدر الحاجة','تأمل الإنبات','اختر مكاناً مضيئاً','رتِّب رحلة النبتة','اعتنِ بنبتة أخرى'],instructions:['اختر التراب ثم أضفه إلى الأصيص على دفعتين.','اختر المجرفة ثم المس التراب لصنع حفرة.','ضع البذرة في الحفرة، ثم غطِّها بالتراب.','اختر إبريق الماء، ثم اسقِ الأصيص على دفعات صغيرة.','شاهد مراحل الإنبات تحت التراب. الله هو الذي يُنبت الزرع.','انقل الأصيص من الظل إلى المكان المضيء.','رتِّب الصور: بذرة، ثم بادرة، ثم نبتة.','انظر إلى التربة والأوراق، واختر العناية المناسبة.'],ready:['أصبح التراب جاهزاً.','الحفرة جاهزة للبذرة.','البذرة مغطاة بالتراب.','سقيت بقدر الحاجة.','نحن نزرع ونسقي، والله يُنبت الزرع.','وضعت النبتة في مكان مضيء.','من بذرة صغيرة أنبت الله هذه النبتة.','نعتني بنعم الله ونشكره عليها.']},
de:{title:'Die Reise der Pflanze',back:'Zum Obstgarten',next:'Weiter',finish:'Reise geschafft',again:'Noch einmal',mute:'Ton aus',sound:'Ton an',loading:'Bilder werden geladen…',retry:'Bilder erneut laden',error:'Die Bilder konnten nicht vollständig geladen werden.',save:'Speichern nicht möglich. Der Fortschritt bleibt für diesen Besuch.',step:'Schritt',of:'von',done:'Allah ließ sie wachsen. Ich habe sie gepflegt.',thanks:'Alhamdulillah für die Pflanzen.',stars:'Sterne',select:'Wähle zuerst das Werkzeug, dann tippe auf den Topf.',soil:'Erde',trowel:'Pflanzschaufel',seed:'Samen',water:'Gießkanne',cover:'Samen bedecken',pot:'Blumentopf',shade:'Im Schatten',light:'Im Licht',move:'Ins Licht stellen',observe:'Sieh, was nach einiger Zeit geschieht',time:'Tage vergehen… Erst wächst die Wurzel, dann erscheint der Keimling.',correct:'Diese Pflege braucht die Pflanze.',wrong:'Die Erde ist trocken. Was braucht sie jetzt?',orderWrong:'Beginne mit dem Samen. Was kommt danach?',wet:'Die Erde ist jetzt feucht. Höre auf zu gießen.',over:'Das ist zu viel Wasser. Versuche es mit weniger.',waterHint:'Gieße kleine Mengen. Höre auf, sobald die Erde feucht ist.',stages:['Samen in der Erde','Keimling','Junge Pflanze'],heads:['Erde vorbereiten','Ein kleines Loch machen','Den Samen pflanzen','Passend gießen','Die Keimung entdecken','Einen hellen Platz wählen','Das Wachstum ordnen','Eine weitere Pflanze pflegen'],instructions:['Wähle die Erde und fülle den Topf in zwei Portionen.','Wähle die Schaufel und tippe auf die Erde.','Lege den Samen ins Loch und bedecke ihn mit Erde.','Wähle die Gießkanne und gieße kleine Mengen.','Entdecke die Keimung unter der Erde. Allah lässt die Pflanzen wachsen.','Stelle den Topf vom Schatten ins Licht.','Ordne: Samen, Keimling, junge Pflanze.','Betrachte Erde und Blätter. Wähle die passende Pflege.'],ready:['Die Erde ist bereit.','Das Pflanzloch ist bereit.','Der Samen ist mit Erde bedeckt.','Du hast passend gegossen.','Wir pflanzen und gießen. Allah lässt die Pflanzen wachsen.','Die Pflanze steht jetzt im Licht.','Aus einem kleinen Samen ließ Allah diese Pflanze wachsen.','Wir pflegen Allahs Gaben und danken Ihm.']},
en:{title:'Plant journey',back:'To the orchard',next:'Continue',finish:'Journey complete',again:'Play again',mute:'Mute',sound:'Sound on',loading:'Loading the journey…',retry:'Reload pictures',error:'Some pictures could not load. Try again.',save:'Saving is unavailable. Progress stays for this visit.',step:'Step',of:'of',done:'Allah made it grow. I cared for it.',thanks:'Alhamdulillah for the blessing of plants.',stars:'stars',select:'Choose the tool first, then tap the pot.',soil:'Soil',trowel:'Trowel',seed:'Seed',water:'Watering can',cover:'Cover the seed',pot:'Plant pot',shade:'Shady spot',light:'Bright spot',move:'Move into the light',observe:'See what happens after some time',time:'Days pass… The root grows, then the seedling emerges.',correct:'This is the care the plant needs.',wrong:'Its soil is dry. What does it need now?',orderWrong:'Start with the seed. What comes next?',wet:'The soil is moist now. Stop watering.',over:'Too much water. Try a smaller amount.',waterHint:'Water in small amounts. Stop when the soil is moist.',stages:['Seed in soil','Seedling','Young plant'],heads:['Prepare the soil','Make a small hole','Plant the seed','Water with care','Discover germination','Choose a bright spot','Order the plant journey','Care for another plant'],instructions:['Choose the soil and add it to the pot in two portions.','Choose the trowel, then tap the soil to make a hole.','Place the seed in the hole, then cover it with soil.','Choose the watering can and water in small amounts.','Explore germination under the soil. Allah makes plants grow.','Move the pot from the shade to the bright spot.','Put the pictures in order: seed, seedling, young plant.','Look at the soil and leaves. Choose the care it needs.'],ready:['The soil is ready.','The planting hole is ready.','The seed is covered with soil.','You watered with care.','We plant and water. Allah makes the plants grow.','The plant is now in the light.','Allah grew this plant from a small seed.','We care for Allah’s blessings and thank Him.']}
};
const fresh=()=>({version:1,step:0,fill:0,dug:false,seeded:false,covered:false,water:0,root:0,light:false,order:[],cared:false,mistakes:0,completed:false,bestStars:0});
let s=fresh(),lang='ar',options={},dialog,scene,dock,status,next,selected='',message='',loaded=false,loading=false,loadFailed=false,saveOK=true,muted=true,audio,epoch=0,focusBefore,busy=false,actionFrame=0;
function read(){try{const d=JSON.parse(localStorage.getItem(KEY)||'null');if(!d||d.version!==1)return;const ranges={step:7,fill:2,water:2,root:3,mistakes:1000,bestStars:3};for(const [k,max] of Object.entries(ranges))if(!Number.isInteger(d[k])||d[k]<0||d[k]>max)return;for(const k of ['dug','seeded','covered','light','cared','completed'])if(typeof d[k]!=='boolean')return;if(!Array.isArray(d.order)||d.order.length>3||d.order.some((v,i)=>v!==i))return;const valid=[true,d.fill===2,d.dug,d.covered,d.water===2,d.root===3,d.light,d.order.length===3];if(!valid.slice(0,d.step+1).every(Boolean)||d.completed&&(!d.cared||d.step!==7))return;s={...fresh(),...d};}catch{saveOK=false;}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(s));}catch{saveOK=false;}}
const text=()=>L[lang];
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;}
function button(cls,txt,action){const n=el('button',cls,txt);n.type='button';n.onclick=action;return n;}
function sound(){if(muted)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=580;g.gain.setValueAtTime(.025,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.1);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.11);}catch{}}
const specs={planting:[3,2],growth:[2,2],care:[2,2],roots:[2,2],tools:[3,2]};
function sprite(sheet,index,cls=''){
 const n=el('span','g01-sprite '+cls);let cols=specs[sheet][0],rows=specs[sheet][1];
 if(sheet==='tools'){index=({0:1,1:1,2:2,3:0,4:3})[index]??0;cols=2;rows=2;}
 n.style.backgroundImage='url("'+BASE+sheet+(sheet==='tools'?'-v2.webp':'-v1.webp')+'")';
 n.style.backgroundSize=(cols*100)+'% '+(rows*100)+'%';
 n.style.backgroundPosition=((index%cols)*100/(cols-1))+'% '+(Math.floor(index/cols)*100/(rows-1))+'%';
 n.style.aspectRatio=rows+'/'+cols;
 if(sheet==='planting'){n.style.backgroundSize='300% 272.6087%';n.style.backgroundPosition=((index%3)*50)+'% '+((index<3?140:665)/794*100)+'%';n.style.aspectRatio='418 / 460';}
 n.setAttribute('aria-hidden','true');return n;
}
function potIndex(){return s.step===0?(s.fill===0?0:s.fill===2?2:1):s.step===1?(s.dug?3:2):s.step===2?(s.covered?5:s.seeded?4:3):(s.water===0?2:5);}
function updatePot(){const pot=scene?.querySelector('.g01-pot');if(pot)pot.replaceChildren(sprite('planting',potIndex()));}
// Coordinates are all in the same square work surface; Arabic direction never flips them.
function perform(kind,commit){
 if(busy||!dialog?.open)return;busy=true;const id=epoch,board=scene.querySelector('.g01-workbench');
 const actor=board.querySelector('.g01-actor');actor.style.opacity='1';
 const dust=el('div','g01-particles');board.append(dust);
 const water=kind==='water',seed=kind==='seed',dig=kind==='dig',cover=kind==='cover';
 const count=seed?0:water?25:20,parts=[];
 for(let i=0;i<count;i++){const q=el('i',water?'g01-drop':'g01-grain');dust.append(q);parts.push(q);}
 let start=null,committed=false;
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const duration=reduced?400:1800;
 const smooth=x=>x*x*(3-2*x),lerp=(a,b,t)=>a+(b-a)*t;
 function frame(now){
  if(id!==epoch||!dialog.open){busy=false;return;}
  start??=now;const t=Math.min(1,(now-start)/duration);
  const lift=smooth(Math.min(1,t/.26)),rest=t>.8?smooth((t-.8)/.2):0;
  const blend=lift*(1-rest);let x,y,w,angle,mx,my;
  if(water){w=42;x=lerp(60,48,blend);y=lerp(48,1,blend);angle=lerp(0,-38,blend);mx=.12;my=.37;}
  else if(seed){w=12;x=lerp(5,44,smooth(Math.min(1,t/.65)));y=lerp(51,47,smooth(Math.min(1,t/.65)));angle=t*60;mx=.5;my=.5;}
  else if(dig||cover){w=38;x=lerp(2,38,blend);y=lerp(48,16,blend)+(t>.28&&t<.72?Math.sin((t-.28)/.44*Math.PI)*12:0);angle=lerp(0,dig?-25:25,blend);mx=.22;my=.78;}
  else{w=38;x=lerp(0,12,blend);y=lerp(47,0,blend);angle=lerp(0,115,blend);mx=.5;my=.16;}
  actor.style.left=x+'%';actor.style.top=y+'%';actor.style.width=w+'%';actor.style.transform='rotate('+angle+'deg)';
  if(seed&&t>.65)actor.style.opacity=String(Math.max(0,1-(t-.65)/.13));
  const r=angle*Math.PI/180,dx=(mx-.5)*w,dy=(my-.5)*w;
  const sx=x+w/2+dx*Math.cos(r)-dy*Math.sin(r),sy=y+w/2+dx*Math.sin(r)+dy*Math.cos(r);
  parts.forEach((q,i)=>{const phase=((t-.27)*4+i/count)%1,visible=t>.27&&t<.78;
   const targetX=50+Math.sin(i*2.4)*(water?10:7),targetY=53+Math.cos(i*1.8)*3;
   const px=dig?lerp(50,35+Math.sin(i)*12,phase):lerp(sx,targetX,phase);
   const py=dig?53-Math.sin(phase*Math.PI)*13:lerp(sy,targetY,phase*phase);
   q.style.left=px+'%';q.style.top=py+'%';q.style.opacity=visible?String(1-phase*.3):'0';
  });
  if(t>=.68&&!committed){committed=true;commit();save();updatePot();if(water)board.dataset.wet=String(s.water);}
  if(t<1)actionFrame=requestAnimationFrame(frame);else{busy=false;changed();}
 }
 actionFrame=requestAnimationFrame(frame);
}
function ready(){return [s.fill===2,s.dug,s.covered,s.water===2,s.root===3,s.light,s.order.length===3,s.cared][s.step];}
function changed(){save();sound();render();}
function choose(tool){if(busy)return;selected=tool;message='';render();}
function usePot(){if(!loaded||s.completed||busy)return;const c=text();message='';
 if(s.step===0&&selected==='soil'){if(s.fill<2)perform('soil',()=>{s.fill++;});return;}
 if(s.step===1&&selected==='trowel'){if(!s.dug)perform('dig',()=>{s.dug=true;});return;}
 if(s.step===2&&selected==='seed'){if(!s.seeded)perform('seed',()=>{s.seeded=true;});return;}
 if(s.step===3&&selected==='water'){perform('water',()=>{if(s.water===2){s.water=1;s.mistakes++;message=c.over;}else s.water++;});return;}
 message=c.select;render();}
function care(tool){if(s.cared)return;if(tool==='water'){s.cared=true;message=text().correct;}else{s.mistakes++;message=text().wrong;}changed();}
function pickOrder(value){if(s.order.includes(value))return;if(value===s.order.length){s.order.push(value);message='';}else{s.mistakes++;message=text().orderWrong;}changed();}
function advance(){if(!loaded||!ready()||s.completed||busy)return;if(s.step===7){s.completed=true;s.bestStars=Math.max(s.bestStars,s.mistakes===0?3:s.mistakes<=3?2:1);save();options.onComplete?.({stars:s.bestStars});}else{s.step++;selected='';message='';save();}sound();render();dialog.querySelector('.g01-heading')?.focus({preventScroll:true});}
function tool(name,index,action){const b=button('g01-tool',undefined,action||(()=>choose(name)));b.dataset.tool=name;b.setAttribute('aria-pressed',String(selected===name));b.append(sprite('tools',index),el('span','',text()[name]));return b;}
function render(){if(!dialog?.open)return;const c=text();dialog.replaceChildren();dialog.lang=lang;dialog.dir=lang==='ar'?'rtl':'ltr';const header=el('header','g01-header');header.append(button('g01-back',c.back,()=>dialog.close()),el('strong','',c.title),button('g01-sound',muted?c.sound:c.mute,()=>{if(busy)return;muted=!muted;options.onMute?.(muted);sound();render();}));dialog.append(header);
if(!loaded){const box=el('div','g01-loading');box.append(el('p','',loadFailed?c.error:c.loading));if(loadFailed)box.append(button('g01-retry',c.retry,loadImages));dialog.append(box);return;}
const layout=el('div','g01-layout');scene=el('div','g01-scene'+(s.step===5&&!s.completed?' g01-light-scene':''));dock=el('section','g01-dock');layout.append(scene,dock);dialog.append(layout);
const h=el('h2','g01-heading',s.completed?c.finish:c.heads[s.step]);h.tabIndex=-1;dock.append(el('p','g01-progress',c.step+' '+(s.step+1)+' '+c.of+' 8'),h);
if(s.completed){scene.append(sprite('growth',3,'g01-hero'));dock.append(el('p','g01-truth',c.done),el('p','',c.thanks));const stars=el('p','g01-stars','★'.repeat(s.bestStars));stars.setAttribute('aria-label',s.bestStars+' '+c.stars);dock.append(stars,button('g01-next',c.back,()=>dialog.close()),button('g01-replay',c.again,()=>{const best=s.bestStars;s=fresh();s.bestStars=best;selected='';message='';changed();}));return;}
dock.append(el('p','g01-instruction',c.instructions[s.step]));const tools=el('div','g01-tools');
if(s.step<=3){
 const board=el('div','g01-workbench');board.dataset.wet=String(s.step===3?s.water:0);scene.append(board);
 board.append(el('span','g01-pot-shadow'));
 const pot=button('g01-pot',undefined,usePot);pot.setAttribute('aria-label',c.pot);pot.append(sprite('planting',potIndex()));board.append(pot);
 const actor=sprite('tools',s.step===0?3:s.step===1?2:s.step===2?(s.seeded?2:4):0,'g01-actor g01-actor-'+(s.step===2&&s.seeded?1:s.step));board.append(actor);
 const surface=el('span','g01-wet-soil');board.append(surface);
 if(s.step===0)tools.append(tool('soil',3));
 if(s.step===1)tools.append(tool('trowel',2));
 if(s.step===2){if(!s.seeded)tools.append(tool('seed',4));else if(!s.covered)tools.append(button('g01-cover',c.cover,()=>{perform('cover',()=>{s.covered=true;selected='';});}));}
 if(s.step===3){tools.append(tool('water',0));const meter=el('div','g01-water-meter');meter.setAttribute('aria-label',c.waterHint);for(let i=0;i<3;i++)meter.append(el('span',i<=s.water?'filled':''));scene.append(meter);dock.append(el('p','g01-small',c.waterHint));}
 if(s.step===0)scene.append(el('span','g01-badge',s.fill+' / 2'));
}
if(s.step===4){scene.append(sprite('roots',s.root,'g01-hero'));scene.append(el('p','g01-time',c.time));if(s.root<3)tools.append(button('g01-observe',c.observe,()=>{s.root++;changed();}));}
if(s.step===5){const shade=button('g01-zone g01-shade',c.shade,()=>{}),light=button('g01-zone g01-lit',c.light,()=>{s.light=true;changed();});scene.append(shade,light);const pot=el('div','g01-move-pot'+(s.light?' is-lit':''));pot.append(sprite('growth',1));pot.draggable=true;pot.addEventListener('dragstart',e=>{e.dataTransfer?.setData('text/plain','g01-pot');});light.addEventListener('dragover',e=>e.preventDefault());light.addEventListener('drop',e=>{e.preventDefault();if(e.dataTransfer?.getData('text/plain')==='g01-pot'){s.light=true;changed();}});pot.addEventListener('pointerdown',e=>{if(s.light)return;pot.setPointerCapture?.(e.pointerId);});pot.addEventListener('pointerup',e=>{const r=scene.getBoundingClientRect();if(e.clientX>r.left+r.width*.5){s.light=true;changed();}});scene.append(pot);if(!s.light)tools.append(button('g01-move',c.move,()=>{s.light=true;changed();}));}
if(s.step===6){const cards=el('div','g01-order');for(const value of [2,0,1]){const b=button('g01-card',undefined,()=>pickOrder(value));b.dataset.order=String(value);b.disabled=s.order.includes(value);b.append(sprite(value===0?'planting':'growth',value===0?5:value===1?1:3,value===0?'g01-card-seed':''),el('span','',c.stages[value]));if(b.disabled)b.append(el('b','g01-order-number',String(value+1)));cards.append(b);}scene.append(cards);}
if(s.step===7){scene.append(sprite('care',s.cared?1:0,'g01-hero'));if(!s.cared)tools.append(tool('soil',3,()=>care('soil')),tool('water',0,()=>care('water')),button('g01-tool',c.move,()=>care('light')));}
dock.append(tools);status=el('p','g01-status',message||(ready()?c.ready[s.step]:s.step===3&&s.water===2?c.wet:''));status.setAttribute('role','status');status.setAttribute('aria-live','polite');dock.append(status);next=button('g01-next',s.step===7?c.finish:c.next,advance);next.disabled=!ready();dock.append(next);if(!saveOK)dock.append(el('p','g01-small',c.save));}
async function loadImages(){if(loading)return;loading=true;loadFailed=false;render();const id=epoch;try{await Promise.all(['bench-portrait','bench-wide','light',...Object.keys(specs)].map(name=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=BASE+name+(name==='tools'?'-v2.webp':'-v1.webp');})));if(id!==epoch)return;loaded=true;}catch{if(id===epoch)loadFailed=true;}finally{if(id===epoch){loading=false;render();}}}
async function open(opts={}){options=opts;lang=L[opts.lang]?opts.lang:'ar';muted=opts.muted!==false;selected='';message='';read();focusBefore=document.activeElement;if(!dialog){dialog=el('dialog','g01-dialog');dialog.setAttribute('aria-label',text().title);document.body.append(dialog);dialog.addEventListener('close',()=>{epoch++;cancelAnimationFrame(actionFrame);busy=false;loading=false;save();options.onClose?.();focusBefore?.focus?.({preventScroll:true});});}dialog.setAttribute('aria-label',text().title);if(!dialog.open)dialog.showModal();render();if(!loaded)await loadImages();}
window.HUDHUDG01={open,getState:()=>JSON.parse(JSON.stringify(s))};
})();
