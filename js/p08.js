/* P08: direct manipulation, no audio, no timed scoring. Completion precedes optional challenge. */
(()=>{'use strict';
const KEY='hudhud-p08-v1',C={
ar:{title:'أُحافظ على سلامة غيري',back:'إلى ركن التعاون',next:'أكمل',clear:'أُبعد ما يعوق اللعب',clearHelp:'أبعد قطار اللعبة عن الممر.',space:'أترك مساحة لغيري',spaceHelp:'اسحب شخصيتك إلى دائرة الانتظار.',wait:'زميلي يعبر الآن',waitHelp:'أنتظر حتى يخلو المسار.',waitBtn:'أنتظر زميلي',rush:'أبدأ الآن',cross:'المسار خالٍ. أعبر الآن',cleared:'أصبح المسار آمناً.',spaced:'تركت مساحة لزميلي.',waited:'عبر زميلي بأمان. الآن دوري.',retryClear:'ضع قطار اللعبة في الصندوق.',retrySpace:'انتظر في الدائرة بعيداً عن المسار.',retryWait:'المسار مشغول. دعه ينتهي أولاً.',ball:'قطار اللعبة — اسحبه للصندوق أو المسه لإعادته',me:'شخصيتي — اسحبها إلى دائرة الانتظار أو المسها',friend:'زميلي',tray:'صندوق الأدوات',spot:'مكان الانتظار',done:'أتممت المرحلة',end:'ألعب بلطف، وأحافظ على سلامة غيري.',challenge:'جرّب التحدّي',again:'ألعب مرة أخرى',round:'موقف',rule:'ثلاثة مواقف. نجمة لكل موقف دون خطأ أو تلميح.',hint:'تلميح',score:'نجوم التحدّي',save:'تعذّر الحفظ. يمكنك متابعة اللعب الآن.',safe:'المسار آمن',moving:'زميلي يعبر…',myMove:'أعبر بهدوء…',helpClick:'يمكنك أيضاً لمس العنصر لتحريكه.',challengeTitle:'كيف نجعل اللعب آمناً؟',saved:'سُجّل إنجازك. التحدّي اختياري.'},
en:{title:'I keep others safe',back:'Cooperation corner',next:'Continue',clear:'Clear the play area',clearHelp:'Move the toy train off the path.',space:'Give others space',spaceHelp:'Drag your character to the waiting circle.',wait:'My friend is crossing',waitHelp:'Wait until the course is clear.',waitBtn:'Wait for my friend',rush:'Start now',cross:'The course is clear. My turn',cleared:'The course is safe now.',spaced:'I gave my friend space.',waited:'My friend crossed safely. My turn now.',retryClear:'Put the toy train in the tray.',retrySpace:'Wait in the circle away from the course.',retryWait:'The course is occupied. Let your friend finish.',ball:'Toy train — drag into the tray or tap to put it away',me:'My character — drag to the waiting circle or tap',friend:'My friend',tray:'Storage tray',spot:'Waiting spot',done:'Activity complete',end:'I play kindly and keep others safe.',challenge:'Try the challenge',again:'Play again',round:'Situation',rule:'Three situations. A star for each with no mistakes or hints.',hint:'Hint',score:'Challenge stars',save:'Saving is unavailable. You can keep playing.',safe:'Safe course',moving:'My friend is crossing…',myMove:'I cross calmly…',helpClick:'You can also tap the object to move it.',challengeTitle:'How can we make play safe?',saved:'Completion recorded. The challenge is optional.'},
de:{title:'Ich achte auf die Sicherheit anderer',back:'Zur Kooperationsecke',next:'Weiter',clear:'Den Spielweg freimachen',clearHelp:'Räume den Spielzeugzug vom Weg.',space:'Anderen Platz lassen',spaceHelp:'Ziehe deine Figur in den Wartekreis.',wait:'Mein Freund geht hinüber',waitHelp:'Warte, bis der Weg frei ist.',waitBtn:'Auf meinen Freund warten',rush:'Jetzt losgehen',cross:'Der Weg ist frei. Ich bin dran',cleared:'Der Weg ist jetzt sicher.',spaced:'Ich habe meinem Freund Platz gelassen.',waited:'Mein Freund ist sicher angekommen. Jetzt bin ich dran.',retryClear:'Lege den Spielzeugzug in die Kiste.',retrySpace:'Warte im Kreis neben dem Spielweg.',retryWait:'Der Weg ist besetzt. Lass deinen Freund erst ankommen.',ball:'Toy train — in die Kiste ziehen oder zum Aufräumen antippen',me:'Meine Figur — in den Wartekreis ziehen oder antippen',friend:'Mein Freund',tray:'Aufbewahrungskiste',spot:'Warteplatz',done:'Aufgabe geschafft',end:'Ich spiele rücksichtsvoll und achte auf andere.',challenge:'Herausforderung starten',again:'Noch einmal spielen',round:'Situation',rule:'Drei Situationen. Ein Stern für jede ohne Fehler oder Hinweis.',hint:'Hinweis',score:'Sterne',save:'Speichern nicht möglich. Du kannst weiterspielen.',safe:'Sicherer Weg',moving:'Mein Freund geht hinüber…',myMove:'Ich gehe ruhig hinüber…',helpClick:'Du kannst den Gegenstand auch antippen.',challengeTitle:'Wie machen wir das Spielen sicher?',saved:'Erfolg gespeichert. Die Herausforderung ist freiwillig.'}};
let d,opts,lang,s,mem={},saveFailed=false,feedback='',hinted=false,busy=false,epoch=0,animations=[];
const t=()=>C[lang],E=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n};
function button(id,txt,fn,cls=''){const b=E('button',cls,txt);b.type='button';b.dataset.action=id;b.onclick=fn;return b}
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{return mem}}
function persist(){mem={...s};try{localStorage.setItem(KEY,JSON.stringify(s))}catch{saveFailed=true}}
function initial(old={}){return {step:0,mode:'base',order:['clear','space','wait'],solved:false,waited:false,complete:!!old.complete,best:Number(old.best)||0,stars:0,faults:[],end:false,positions:{me:[23,70],friend:[25,55]}}}
function valid(x){return x&&Number.isInteger(x.step)&&x.step>=0&&x.step<3&&['base','challenge'].includes(x.mode)&&Array.isArray(x.order)&&x.order.length===3&&new Set(x.order).size===3&&x.order.every(v=>['clear','space','wait'].includes(v))&&Array.isArray(x.faults)}
function cancelMotion(){epoch++;for(const a of animations)a.cancel();animations=[];busy=false}
function close(){cancelMotion();persist();d.close();d.remove();d=null;opts.onClose?.()}
function reset(challenge=false){cancelMotion();const old=s;s=initial(old);if(challenge){s.mode='challenge';s.order.sort(()=>Math.random()-.5)}feedback='';hinted=false;persist();render()}
function task(){return s.order[s.step]}
function wrong(key){if(!s.faults.includes(s.step))s.faults.push(s.step);feedback=t()[key];persist();render()}
function solve(){s.solved=true;s.waited=false;feedback=t()[task()==='clear'?'cleared':task()==='space'?'spaced':'waited'];persist();render()}
function next(){if(!s.solved||busy)return;if(s.mode==='challenge'&&!s.faults.includes(s.step))s.stars++;if(s.step===2){s.end=true;s.best=Math.max(s.best,s.stars);if(s.mode==='base'){s.complete=true;opts.onComplete?.()}persist();render();return}s.step++;s.solved=false;s.waited=false;hinted=false;feedback='';persist();render()}
function img(src,cls,alt=''){const n=E('img',cls);n.src=src;n.alt=alt;n.draggable=false;return n}
function coords(n,x,y){n.style.left=x+'%';n.style.top=y+'%'}
function sprite(kind,x,y,interactive=false){
 const n=interactive?button('me','',()=>moveTo(n,[12,82],solve),'p08-person p08-draggable'):E('div','p08-person');
 n.dataset.actor=kind;n.setAttribute('aria-label',kind==='me'?t().me:t().friend);
 const skin=E('span','p08-walker');skin.style.backgroundImage='url("assets/walk-directional/'+(kind==='me'?'boy':'girl')+'-smooth-v1.webp")';skin.style.backgroundPosition='0% 100%';n.append(skin);
 const position=s.positions?.[kind]||[x,y];coords(n,...position);return n;
}
async function motion(n,points,ms=1300){
 busy=true;const token=epoch,skin=n.querySelector('.p08-walker'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 d.querySelectorAll('.p08-actions button,.p08-draggable').forEach(b=>b.disabled=true);
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],(p[1]-points[i][1])*2/3));const total=lengths.reduce((a,b)=>a+b,0);
 const duration=reduce?120:skin?Math.max(650,total*95):ms;
 return new Promise(resolve=>{let started,lastDirection=0;
 function frame(now){if(token!==epoch||!d){resolve(false);return}started??=now;const progress=Math.min(1,(now-started)/duration);let remaining=progress*total,index=0;
 while(index<lengths.length-1&&remaining>lengths[index])remaining-=lengths[index++];
 const from=points[index],to=points[index+1],fraction=lengths[index]?remaining/lengths[index]:1;
 const x=from[0]+(to[0]-from[0])*fraction,y=from[1]+(to[1]-from[1])*fraction;coords(n,x,y);
 if(skin){const dx=to[0]-from[0],dy=to[1]-from[1];lastDirection=Math.abs(dx)>Math.abs(dy)*.75?(dx>0?1:3):(dy>0?0:2);const col=Math.floor(progress*total/2.2)%8;skin.style.backgroundPosition=(col*100/7)+'% '+(lastDirection*25)+'%';s.positions[n.dataset.actor]=[x,y];n.style.zIndex=String(Math.round(y));}
 if(progress<1){requestAnimationFrame(frame);return}
 if(skin)skin.style.backgroundPosition=(lastDirection*2*100/7)+'% 100%';busy=false;resolve(true);
 }requestAnimationFrame(frame);});
}
async function moveTo(n,dest,done){if(busy||s.solved)return;const start=[parseFloat(n.style.left),parseFloat(n.style.top)];if(await motion(n,[start,dest],900))done()}
function draggable(n,dest,retry){let drag=null,suppress=false;
 n.addEventListener('pointerdown',e=>{if(busy||s.solved)return;drag={x:e.clientX,y:e.clientY,old:[parseFloat(n.style.left),parseFloat(n.style.top)],moved:false};n.setPointerCapture(e.pointerId)});
 n.addEventListener('pointermove',e=>{if(!drag)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5)drag.moved=true;if(!drag.moved||n.dataset.actor)return;const r=n.parentElement.getBoundingClientRect();coords(n,Math.max(2,Math.min(98,(e.clientX-r.left)/r.width*100)),Math.max(10,Math.min(94,(e.clientY-r.top)/r.height*100)))});
 n.addEventListener('pointerup',async e=>{if(!drag)return;const old=drag.old,moved=drag.moved;drag=null;if(!moved)return;suppress=true;const r=n.parentElement.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;
 if(Math.abs(x-dest[0])<17&&Math.abs(y-dest[1])<18)moveTo(n,dest,solve);
 else{if(!n.dataset.actor)await motion(n,[[parseFloat(n.style.left),parseFloat(n.style.top)],old],600);wrong(retry)}});
 n.addEventListener('click',e=>{if(suppress){suppress=false;e.stopImmediatePropagation();e.preventDefault()}},true);
 n.addEventListener('pointercancel',()=>{if(drag){coords(n,...drag.old);drag=null}});
}
async function waitForFriend(){if(busy||s.waited)return;feedback=t().moving;d.querySelector('.p08-feedback').textContent=feedback;const n=d.querySelector('.p08-friend');
 if(await motion(n,[s.positions.friend,[39,52],[52,49],[66,46],[79,43],[90,57]])){s.waited=true;feedback=t().waited;persist();render()}}
async function cross(){if(busy||!s.waited)return;d.querySelector('.p08-feedback').textContent=t().myMove;const n=d.querySelector('.p08-player');
 if(await motion(n,[s.positions.me,[18,68],[25,55],[39,52],[52,49],[66,46],[79,43],[90,70]]))solve()}
function render(){if(!d)return;d.replaceChildren();d.lang=lang;d.dir=lang==='ar'?'rtl':'ltr';d.dataset.mode=s.mode;d.dataset.task=task();const header=E('header','p08-header');header.append(button('close',t().back,close),E('strong','',t().title));d.append(header);
if(s.end){const end=E('section','p08-end');end.append(img('assets/p08/course.webp','p08-end-art'),E('h1','',t().done),E('p','',t().end));if(s.mode==='challenge'){end.append(E('p','p08-stars','★'.repeat(s.stars)+'☆'.repeat(3-s.stars)),E('p','',t().score+': '+s.stars+' / 3'))}else end.append(E('p','p08-muted',saveFailed?t().save:t().saved));end.append(button('challenge',t().challenge,()=>reset(true)),button('replay',t().again,()=>reset()));d.append(end);return}
const body=E('div','p08-body'),scene=E('div','p08-scene'),panel=E('section','p08-panel');scene.append(img('assets/p08/course.webp','p08-background'));
const kind=task(),showHint=s.mode==='base'||hinted;
const circle=E('div','p08-circle');coords(circle,12,82);if(kind!=='clear'){circle.setAttribute('aria-label',t().spot);scene.append(circle)}
const friend=sprite('friend',kind==='wait'?(s.waited||s.solved?90:52):25,kind==='wait'?(s.waited||s.solved?68:52):57);friend.classList.add('p08-friend');scene.append(friend);
const me=sprite('me',kind==='space'&&!s.solved?33:s.solved&&kind==='wait'?88:13,kind==='space'&&!s.solved?64:s.solved&&kind==='wait'?79:85,kind==='space'&&!s.solved);me.classList.add('p08-player');scene.append(me);if(kind==='space'&&!s.solved)draggable(me,[12,82],'retrySpace');
if(kind==='clear'){const dest=[s.mode==='challenge'?21:17,27],ball=button('ball','',()=>moveTo(ball,dest,solve),'p08-ball p08-draggable');ball.setAttribute('aria-label',t().ball);ball.append(img('assets/p08/toy-train-v1.webp',''));coords(ball,...(s.solved?dest:s.mode==='challenge'?[65,49]:[39,55]));ball.disabled=s.solved;scene.append(ball);if(!s.solved)draggable(ball,dest,'retryClear');if(showHint&&!s.solved){const tray=E('div','p08-tray-target');tray.setAttribute('aria-label',t().tray);scene.append(tray)}}
if(s.solved)scene.append(E('div','p08-safe',t().safe));
panel.append(E('p','p08-counter',(s.mode==='challenge'?t().round+' ':'')+(s.step+1)+' / 3'),E('h1','',s.mode==='challenge'&&!hinted?t().challengeTitle:t()[kind]));if(showHint)panel.append(E('p','p08-instruction',t()[kind+'Help']));if(s.mode==='challenge'&&s.step===0)panel.append(E('p','p08-muted',t().rule));
const actions=E('div','p08-actions');if(kind==='wait'&&!s.solved){if(!s.waited)actions.append(button('wait',t().waitBtn,waitForFriend),button('rush',t().rush,()=>wrong('retryWait'),'p08-secondary'));else actions.append(button('cross',t().cross,cross))}if(s.solved)actions.append(button('next',t().next,next));else if(s.mode==='challenge')actions.append(button('hint',t().hint,()=>{hinted=true;if(!s.faults.includes(s.step))s.faults.push(s.step);persist();render()},'p08-secondary'));
const status=E('p','p08-feedback',feedback);status.setAttribute('role','status');status.setAttribute('aria-live','polite');panel.append(actions,status);if(kind!=='wait'&&!s.solved&&showHint)panel.append(E('p','p08-muted',t().helpClick));if(saveFailed)panel.append(E('p','p08-muted',t().save));body.append(scene,panel);d.append(body)}
function open(o={}){if(d)return;opts=o;lang=C[o.lang]?o.lang:'ar';const old=read();s=valid(old)?old:initial(old);s.positions??={me:task()==='clear'?[23,70]:[12,82],friend:s.waited?[90,57]:[25,55]};feedback='';hinted=false;busy=false;saveFailed=false;d=E('dialog','p08-dialog');d.setAttribute('aria-label',t().title);document.body.append(d);d.oncancel=e=>{e.preventDefault();close()};d.showModal();render()}
window.HUDHUDP08={open,version:'0.31.2'};
})();
