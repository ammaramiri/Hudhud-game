/* HUDHUD 0.34.7 — M10: the CHILD, not a prayer rug, turns toward the mihrab.
 * Reuses the exact directional sprite family from the approved HUDHUD world.
 * No compass invention, geolocation, music, device headings or extra prayer rugs.
 * Existing hudhud-m10-v1 progress and m10 achievement are retained.
 */
(()=>{'use strict';if(window.HUDHUDM10)return;
const SAVE='hudhud-m10-v1',TOTAL=14;
const L={
ar:{title:'أتعرف إلى القبلة',back:'إلى قاعة الصلاة',next:'أكمل',again:'ألعب مرة أخرى',done:'تعرّفت إلى القبلة',doneText:'القبلة جهة الكعبة المشرفة في مكة. داخل هذه القاعة يدلّ المحراب على جهة القبلة. عندما أغيّر مكاني، أُعيد توجيه نفسي إلى الجهة نفسها.',good:'أحسنت. ',retry:'جرّب مرة أخرى.',left:'أستدير يساراً',right:'أستدير يميناً',move:'أنقل شخصيتي إلى مكان الصلاة',point:'المحراب',window:'النافذة',space:'مكان الوقوف',door:'الممر',player:'شخصيتي',friend:'صديقي',hint:'اسحب الشخصية نحو المكان الصحيح أو اضغط على المكان.',
steps:[
['ما القبلة؟','إلى أي جهة يتوجه المسلم عند الصلاة؟','القبلة جهة الكعبة المشرفة في مكة.',['جهة الكعبة المشرفة في مكة','أية جهة أختارها']],
['أجد المحراب','المس المحراب في جدار قاعة الصلاة، وليس النافذة.','المحراب يدل على جهة القبلة في هذه القاعة.'],
['علامة في المسجد','ما الذي يدلني على اتجاه القبلة هنا؟','أستعين بالمحراب الذي يحدد جهة القبلة.',['المحراب','النافذة المزخرفة']],
['أوجّه نفسي','أنا ملتفت إلى اليمين. أدر الشخصية حتى تواجه المحراب.','صرت مستقبلاً القبلة بجسمي.'],
['لستُ في الاتجاه الصحيح','أنا أواجه مدخل القاعة بدلاً من المحراب. استدر حتى تواجه القبلة.','الآن أواجه المحراب لا المدخل.'],
['أبتعد عن الممر','شخصيتي تقف عند المدخل. انقلها إلى موضع الوقوف المحدد.','تركت طريق المصلين مفتوحاً.'],
['ما الذي لا يحدد القبلة؟','هل النافذة أو الزخرفة وحدها تكفي لتحديد جهة القبلة؟','أستدل بعلامة صحيحة مثل المحراب، لا بالألوان والزخارف.',['لا، أحتاج دليلاً على الاتجاه','نعم، أتبع أجمل نافذة']],
['أغيّر مكاني','انتقلت إلى طرف القاعة. ضع الشخصية في الموضع الجديد، ثم أدرها نحو المحراب.','تغيّر مكاني، لكن جهة القبلة ثابتة.'],
['أختار مكاناً مناسباً','اضغط على موضع الوقوف ولا تضغط على الممر.','أقف في موضع لا يعيق الآخرين.'],
['من يتجه إلى القبلة؟','شاهد الشخصيتين واضغط على التي تواجه المحراب.','الشخص الصحيح يتجه بجسمه إلى المحراب.'],
['المكان والاتجاه','عندما أنتقل إلى صف آخر، ماذا أفعل؟','أحافظ على توجهي إلى القبلة.',['أظل متجهاً نحو المحراب','أدير ظهري إلى المحراب']],
['أساعد صديقي','صديقي ملتفت إلى اليمين. أدره حتى يقف متجهاً إلى المحراب.','ساعدت صديقي على معرفة الاتجاه.'],
['إذا كنت خارج المسجد','ولا أرى محراباً، كيف أعرف القبلة؟','أسأل شخصاً موثوقاً أو أستخدم وسيلة موثوقة لمعرفة القبلة.',['أتحقق من جهة القبلة بمصدر موثوق','أختار الاتجاه عشوائياً']],
['أطبّق بنفسي','أولاً المس المحراب، ثم أدر شخصيتك نحوه، ثم ضعها في مكان الوقوف.','وجدت جهة القبلة ووقفت مواجهًا لها دون سد الطريق.']
],last:['1 من 3: المس المحراب.','2 من 3: وجّه شخصيتك نحو المحراب.','3 من 3: انقل الشخصية إلى مكان الوقوف.'],relocateFirst:'أولاً: انقل شخصيتك إلى الموضع الجديد.',thenFace:'الآن: أدر شخصيتك لتواجه المحراب.',one:'الشخصية الأولى',two:'الشخصية الثانية'},
de:{title:'Die Qibla erkennen',back:'Zum Gebetssaal',next:'Weiter',again:'Noch einmal',done:'Du hast die Qibla erkannt',doneText:'Die Qibla ist die Richtung der Kaaba in Mekka. Hier weist der Mihrab den Weg. Nach einem Standortwechsel richte ich mich wieder zur Qibla aus.',good:'Richtig. ',retry:'Versuche es noch einmal.',left:'Nach links drehen',right:'Nach rechts drehen',move:'Meine Figur zum Gebetsplatz bewegen',point:'Mihrab',window:'Fenster',space:'Gebetsplatz',door:'Durchgang',player:'Meine Figur',friend:'Freund',hint:'Ziehe die Figur zum freien Platz oder tippe darauf.',
steps:[
['Wohin bete ich?','In welche Richtung wenden sich Muslime beim Gebet?','Zur Kaaba in Mekka.',['Zur Kaaba in Mekka','In eine beliebige Richtung']],
['Finde den Mihrab','Tippe auf den Mihrab in der Wand, nicht auf das Fenster.','Der Mihrab weist hier die Richtung.'],
['Ein Zeichen im Gebetssaal','Was zeigt mir hier die Qibla?','Der Mihrab in der Qibla-Wand.',['Der Mihrab','Das bunte Fenster']],
['Dreh dich um','Die Figur schaut nach rechts. Drehe sie zum Mihrab.','Die Figur schaut jetzt zum Mihrab.'],
['Falsche Richtung','Die Figur schaut zum Eingang. Dreh dich zum Mihrab.','Jetzt zeigt ihr Blick zur Qibla.'],
['Weg freihalten','Die Figur steht im Eingang. Stelle sie auf einen Gebetsplatz.','Der Durchgang bleibt frei.'],
['Dekoration genügt nicht','Bestimmen Fenster und Wandfarbe die Qibla?','Nein. Ich orientiere mich an zuverlässigen Hinweisen.',['Nein, ich prüfe die Richtung','Ja, nach dem schönsten Fenster']],
['Anderer Standort','Bewege die Figur auf die andere Seite und richte sie zum Mihrab.','Der Ort wechselt, die Qibla bleibt gleich.'],
['Geeigneter Platz','Wähle einen freien Platz, nicht den Durchgang.','Ich blockiere niemanden.'],
['Wer schaut zum Mihrab?','Wähle die Figur, die zum Mihrab zeigt.','Diese Figur schaut richtig.'],
['Richtung behalten','Was tue ich in einer anderen Gebetsreihe?','Ich bleibe zur Qibla ausgerichtet.',['Ich richte mich weiter zum Mihrab','Ich drehe ihm den Rücken zu']],
['Hilf einem Freund','Drehe deinen Freund so, dass er zum Mihrab schaut.','Du hast den richtigen Weg gezeigt.'],
['Ohne Mihrab','Wie finde ich die Qibla außerhalb einer Moschee?','Mit einer zuverlässigen Auskunft oder Hilfe.',['Mit einer zuverlässigen Quelle','Ich rate die Richtung']],
['Abschlussübung','Finde den Mihrab, drehe dich zu ihm und gehe zu einem freien Platz.','Du hast dich richtig ausgerichtet.']
],last:['1/3: Tippe auf den Mihrab.','2/3: Richte deine Figur aus.','3/3: Gehe zu einem freien Platz.'],relocateFirst:'Erst: Wähle den neuen Platz.',thenFace:'Jetzt: Dreh dich zum Mihrab.',one:'Erste Figur',two:'Zweite Figur'},
en:{title:'Find the Qibla',back:'Back to prayer hall',next:'Continue',again:'Play again',done:'You found the Qibla',doneText:'The Qibla is the direction of the Kaaba in Mecca. In this hall, the mihrab points toward it. If I move, I face that same direction again.',good:'Correct. ',retry:'Try again.',left:'Turn left',right:'Turn right',move:'Move my character to a clear spot',point:'Mihrab',window:'Window',space:'Standing spot',door:'Walkway',player:'My character',friend:'My friend',hint:'Drag the character to the standing spot or tap it.',
steps:[
['Where is the Qibla?','Which direction do Muslims face in prayer?','Toward the Kaaba in Mecca.',['Towards the Kaaba in Mecca','Any direction I like']],
['Find the mihrab','Tap the mihrab in the wall, not the window.','The mihrab indicates the Qibla here.'],
['A sign in this hall','Which feature here shows the prayer direction?','The mihrab in the Qibla wall.',['The mihrab','The coloured window']],
['Face the right way','You face right. Turn your character toward the mihrab.','Now you face the mihrab.'],
['Turn around','You are facing the entrance. Turn to the mihrab.','Now you face the Qibla.'],
['Keep the walkway clear','Move your character away from the entrance to a clear standing spot.','The entrance stays clear.'],
['Not just decoration','Does the window colour determine the Qibla?','No, I need a reliable indication.',['No, I check the direction','Yes, I choose the nicest window']],
['Change your place','Move to the other side of the hall, then face the mihrab.','Your place changed but the Qibla did not.'],
['Choose a place','Tap a clear standing spot, not the doorway.','You left a clear walkway.'],
['Who faces the Qibla?','Tap the person facing the mihrab.','That person faces the correct way.'],
['Keep facing it','If you move to another row, what should you do?','Keep facing the Qibla.',['I face the mihrab again','I turn my back to the mihrab']],
['Help a friend','Turn your friend until they face the mihrab.','You helped them face the right way.'],
['Away from a mosque','How do I find the Qibla with no mihrab?','Check a reliable source or ask someone trustworthy.',['Check a reliable source','Guess any direction']],
['Final activity','Find the mihrab, face it, and move to a suitable place.','You found the direction and left the walkway clear.']
],last:['1/3: Tap the mihrab.','2/3: Face your character toward it.','3/3: Move your character to a clear spot.'],relocateFirst:'First: move to the new place.',thenFace:'Now: face the mihrab.',one:'First character',two:'Second character'}
};
const KINDS=['choice','find','choice','turn','turn','move','choice','relocate','spot','compare','choice','turnFriend','choice','final'];
const START={3:90,4:180,7:90,11:90,13:180};
const DIR={0:'back',90:'right',180:'front',270:'left'};
const $=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const btn=(txt,fn,cls='')=>{const e=$('button',cls,txt);e.type='button';e.addEventListener('click',fn);return e};
const img=(src,cls,alt='')=>{const e=$('img',cls);e.src=src;e.alt=alt;e.draggable=false;return e};
let dialog=null,opts={},lang='ar',phase=0,solved=false,complete=false,sub=0,angle=0,status='',player='girl',activeCharacter=null,locked=false,ticket=0;
const T=()=>L[lang], sprite=(gender,deg)=>`assets/prayer-avatars/${gender}-${DIR[deg]||'back'}.webp`;
function save(){try{localStorage.setItem(SAVE,JSON.stringify({phase,solved,complete,sub,angle}))}catch{}}
function state(){return {phase,solved,complete,sub,angle,open:!!dialog,version:'0.34.7'}}
function message(s){status=s;const p=dialog?.querySelector('.m10-feedback');if(p)p.textContent=s}
function wrong(){if(locked||solved)return;message(T().retry)}
function success(){if(solved||locked)return;solved=true;save();message(T().good+T().steps[phase][2]);dialog?.querySelector('.m10-next')?.removeAttribute('disabled');dialog?.querySelector('.m10-stage')?.classList.add('is-complete')}
function close(){ticket++;if(!dialog)return;const d=dialog;dialog=null;d.close();d.remove();opts.onClose?.()}
function advance(){if(!solved||locked)return;ticket++;if(phase===TOTAL-1){complete=true;phase=TOTAL;save();window.HUDHUDProgress?.mark?.('m10');opts.onComplete?.();render();return}phase++;sub=0;solved=false;angle=START[phase]??0;status='';save();render()}
function replay(){ticket++;phase=0;solved=false;complete=false;sub=0;angle=0;status='';save();render()}
function choices(panel,items){const g=$('div','m10-choices');items.forEach((x,i)=>g.append(btn(x,()=>i===0?success():wrong(),'m10-choice')));panel.append(g)}
function hotspot(scene,x,y,cls,label,fn){const e=btn('',fn,'m10-hotspot '+cls);e.style.left=x+'%';e.style.top=y+'%';e.setAttribute('aria-label',label);e.title=label;scene.append(e);return e}
function label(scene,s,cls){scene.append($('span','m10-label '+cls,s))}
function mihrab(scene,clickable,fn=success){const e=hotspot(scene,49,35,'m10-mihrab',T().point,clickable?fn:()=>{});if(!clickable)e.disabled=true;label(scene,T().point,'m10-label-mihrab');if(clickable)hotspot(scene,82,32,'m10-window',T().window,wrong);return e}
function character(scene,gender=player,deg=angle,x=45,y=10,extra=''){const e=img(sprite(gender,deg),'m10-avatar '+extra,T().player);e.style.left=x+'%';e.style.bottom=y+'%';e.dataset.gender=gender;scene.append(e);return e}
function orient(){if(activeCharacter)activeCharacter.src=sprite(activeCharacter.dataset.gender||player,angle)}
function turn(delta){if(locked||solved)return;angle=(angle+delta+360)%360;orient();save();if(angle===0){if(phase===13&&sub===1){sub++;status='';save();render()}else success()}else message(T().retry)}
function turns(panel,el){const g=$('div','m10-turns');g.append(btn(T().left,()=>turn(-90),'m10-turn'),btn(T().right,()=>turn(90),'m10-turn'));panel.append(g);
if(!el)return;el.classList.add('m10-controllable');el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('aria-label',T().player+' — '+T().left+' / '+T().right);el.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Enter',' '].includes(e.key)){e.preventDefault();turn(e.key==='ArrowLeft'?-90:90)}});let ptr=null,skipClick=false;el.addEventListener('pointerdown',e=>{if(solved||locked)return;ptr={id:e.pointerId,x:e.clientX};el.setPointerCapture?.(e.pointerId)});el.addEventListener('pointerup',e=>{if(!ptr||ptr.id!==e.pointerId)return;const d=e.clientX-ptr.x;ptr=null;if(Math.abs(d)>24){skipClick=true;turn(d>0?90:-90)}});el.addEventListener('click',e=>{if(skipClick){skipClick=false;return}turn(90)})}
function changeSub(){sub++;status='';save();render()}
function moveCharacter(scene,panel,x=72,y=10,targetX=45,targetY=73,after=success){const a=character(scene,player,0,x,y,'m10-controllable');const target=hotspot(scene,targetX,targetY,'m10-floor-target',T().space,()=>go());label(scene,T().space,'m10-label-space');let moving=false,ptr=null;
function go(){if(moving||locked||solved)return;moving=true;locked=true;a.style.left=targetX+'%';a.style.bottom='20%';target.classList.add('is-right');const my=++ticket;setTimeout(()=>{if(!dialog||my!==ticket)return;locked=false;after()},420)}
a.style.touchAction='none';a.tabIndex=0;a.setAttribute('role','button');a.setAttribute('aria-label',T().player);a.addEventListener('pointerdown',e=>{if(locked||solved)return;ptr={id:e.pointerId,x:e.clientX,y:e.clientY};a.setPointerCapture?.(e.pointerId)});a.addEventListener('pointermove',e=>{if(!ptr||ptr.id!==e.pointerId)return;a.style.setProperty('--dx',(e.clientX-ptr.x)+'px');a.style.setProperty('--dy',(e.clientY-ptr.y)+'px')});a.addEventListener('pointerup',e=>{if(!ptr)return;ptr=null;const r=target.getBoundingClientRect();const hit=e.clientX>r.left-40&&e.clientX<r.right+40&&e.clientY>r.top-40&&e.clientY<r.bottom+40;a.style.setProperty('--dx','0px');a.style.setProperty('--dy','0px');if(hit)go();else message(T().hint)});a.addEventListener('pointercancel',()=>{ptr=null;a.style.setProperty('--dx','0px');a.style.setProperty('--dy','0px')});a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});panel.append(btn(T().move,go,'m10-action'));return a}
function build(view,panel){const scene=$('div','m10-stage');view.append(scene);scene.append(img('assets/m10/hall-no-rug-v2.webp','m10-background',''));activeCharacter=null;
const kind=KINDS[phase];if(kind!=='compare'&&kind!=='move'&&!(kind==='relocate'&&sub===0)&&!(kind==='final'&&sub===2))activeCharacter=character(scene,player,angle,45,12);
if(kind==='choice'){if([0,2,6,10,12].includes(phase))mihrab(scene,false);choices(panel,T().steps[phase][3])}
if(kind==='find'){mihrab(scene,true)}
if(kind==='turn'){mihrab(scene,false);turns(panel,activeCharacter)}
if(kind==='move'){mihrab(scene,false);moveCharacter(scene,panel,72,8,45,73);hotspot(scene,47,94,'m10-walkway',T().door,wrong)}
if(kind==='relocate'){mihrab(scene,false);if(sub===0){panel.querySelector('.m10-prompt').textContent=T().relocateFirst;moveCharacter(scene,panel,67,10,36,68,changeSub)}else{panel.querySelector('.m10-prompt').textContent=T().thenFace;activeCharacter.style.left='36%';turns(panel,activeCharacter)}}
if(kind==='spot'){mihrab(scene,false);hotspot(scene,45,72,'m10-floor-target',T().space,success);hotspot(scene,46,93,'m10-walkway',T().door,wrong);label(scene,T().space,'m10-label-space')}
if(kind==='compare'){mihrab(scene,false);const correct=character(scene,player,0,31,10,'m10-compare');const bad=character(scene,player,180,66,10,'m10-compare');correct.tabIndex=0;correct.setAttribute('role','button');correct.setAttribute('aria-label',T().one);correct.classList.add('m10-controllable');correct.addEventListener('click',success);correct.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();success()}});bad.classList.add('m10-controllable');bad.tabIndex=0;bad.setAttribute('role','button');bad.setAttribute('aria-label',T().two);bad.addEventListener('click',wrong);bad.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();wrong()}});const g=$('div','m10-turns');g.append(btn(T().one,success,'m10-turn'),btn(T().two,wrong,'m10-turn'));panel.append(g)}
if(kind==='turnFriend'){mihrab(scene,false);const friend=player==='girl'?'boy':'girl';activeCharacter?.remove();activeCharacter=character(scene,friend,angle,45,12);turns(panel,activeCharacter)}
if(kind==='final'){panel.querySelector('.m10-prompt').textContent=T().last[sub];if(sub===0)mihrab(scene,true,changeSub);if(sub===1){mihrab(scene,false);turns(panel,activeCharacter)}if(sub===2){mihrab(scene,false);moveCharacter(scene,panel,72,8,45,73,success)}}
return scene}
function render(){if(!dialog)return;dialog.replaceChildren();const t=T();const h=$('header','m10-head');h.append(btn(t.back,close,'m10-back'),$('strong','m10-title',t.title),$('span','m10-count',complete?`${TOTAL}/${TOTAL}`:`${phase+1}/${TOTAL}`));dialog.append(h);if(complete){const e=$('section','m10-finish');e.append($('h2','',t.done),$('p','',t.doneText),btn(t.again,replay,'m10-replay'));dialog.append(e);return}
const layout=$('div','m10-layout'),view=$('div','m10-view'),panel=$('section','m10-panel');panel.append($('h2','m10-heading',t.steps[phase][0]),$('p','m10-prompt',t.steps[phase][1]));build(view,panel);panel.append($('p','m10-feedback',status));const next=btn(t.next,advance,'m10-next');next.disabled=!solved;panel.append(next);layout.append(view,panel);dialog.append(layout);if(solved)dialog.querySelector('.m10-stage')?.classList.add('is-complete')}
function open(o={}){if(dialog)close();opts=o;lang=L[o.lang]?o.lang:'ar';let p={};try{p=JSON.parse(localStorage.getItem('hudhud-home-profile-v1')||'{}')||{}}catch{}player=['boy','girl'].includes(o.character)?o.character:p.character==='boy'?'boy':'girl';let s={};try{s=JSON.parse(localStorage.getItem(SAVE)||'{}')||{}}catch{}complete=!!s.complete;phase=complete?TOTAL:Math.min(TOTAL-1,Math.max(0,Number(s.phase)||0));solved=!!s.solved;sub=Math.max(0,Math.min(2,Number(s.sub)||0));if(phase!==7&&phase!==13)sub=0;angle=[0,90,180,270].includes(Number(s.angle))?Number(s.angle):START[phase]??0;if((phase===3||phase===4||phase===7||phase===11||phase===13)&&!solved&&angle===0&&sub!==2)angle=START[phase];status='';locked=false;ticket++;const d=$('dialog','m10-dialog');d.lang=lang;d.dir=lang==='ar'?'rtl':'ltr';d.setAttribute('aria-label',T().title);d.addEventListener('cancel',e=>{e.preventDefault();close()});document.body.append(d);dialog=d;d.showModal();render();return state()}
window.HUDHUDM10={open,close,getState:state,version:'0.34.7'};
})();
