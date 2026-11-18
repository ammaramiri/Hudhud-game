/* HUDHUD N02 — أراعي جاري / Care for my neighbours.
 * 10 connected interactions. No music, drum, nasheed, audio playback, or faces.
 * One scene + existing HUDHUD avatars. Works with mouse, touch and keyboard.
 */
(()=>{'use strict';
const KEY='hudhud-n02-v1',ASSET='assets/neighborhood/';
const AVATAR='assets/HUDHUD_HOME_',MAX=10;
const L={
ar:{title:'أراعي جاري',back:'إلى ممر الجيران',next:'أكمل',again:'ألعب مرة أخرى',done:'أكملت المرحلة',end:'أُحسن إلى جاري، ولا أُؤذيه بضجيج أو إغلاق طريق، وأحافظ على نظافة المكان.',progress:'الموقف',good:'تصرف حسن.',try:'جرّب مرة أخرى.',help:'اسحب الغرض إلى الموضع المناسب، أو استخدم الزر.',target:'المكان المناسب',save:'تعذّر حفظ التقدّم على هذا الجهاز.',questions:[
'دراجتي تسدّ ممرّ الجيران. ماذا أفعل؟','جاري يحتاج إلى الهدوء. جهاز الصوت مرتفع. ماذا أفعل؟','هناك كيس نفايات أمام مدخل الجار. أين أضعه؟','التقيتُ جاري في الممر. كيف أحيّيه؟','جاري يحمل أغراضه ويريد المرور. كيف أفسح له الطريق؟','حان وقت الراحة، وأريد اللعب. ماذا أختار؟','جاري يحمل أغراضاً كثيرة. ما التصرف المناسب؟','باب الجار مفتوح قليلاً. كيف أحترم خصوصيته؟','أحدثتُ ضجيجاً وأزعجت جاري. ماذا أقول؟','انتهى اليوم. ما الذي يراعي حق الجار؟'],
answers:[['أترك الدراجة في وسط الطريق','أنقل الدراجة إلى جانب الممر'],['أزيد الصوت','أخفض الصوت وأوقف الجهاز'],['أتركه أمام الباب','أنقله إلى مكان النفايات'],['السلام عليكم','أتجاهله تماماً'],['أبتعد وأفسح له الطريق','أقف حيث أنا وأمنعه'],['أختار لعبة هادئة','أرفع الصوت قرب نافذته'],['أسأله إن كان يحتاج إلى مساعدة','آخذ الأغراض دون إذنه'],['أمضي دون النظر داخل البيت','أقترب لأنظر إلى الداخل'],['أعتذر وأحرص على الهدوء','هذا ليس شأني'],['أترك الممر نظيفاً وأحترم الهدوء','أترك الأشياء أمام أبواب الآخرين']],
feedback:['الممر حق للجميع، فلا أغلقه بدراجتي.','لا أشغّل موسيقى أو أؤذي جاري بالصوت.','لا أترك النفايات أمام باب غيري.','السلام خلق حسن مع الجيران.','أُفسح الطريق ولا أُضيّقه على الآخرين.','أختار وقتاً ومكاناً مناسبين للعب.','أسأل قبل المساعدة ولا أفرضها.','لا أنظر في خصوصيات البيوت.','الاعتذار وإصلاح الخطأ من حسن الجوار.','حقوق الجار ترافقني كل يوم.'],
labels:{bike:'الدراجة',radio:'جهاز الصوت',bag:'كيس النفايات',move:'أنقل الغرض',quiet:'أخفض الصوت',mute:'الجهاز متوقف',neighbour:'الجار',waiting:'تقدّم الجار',ready:'الممر أصبح خالياً',bin:'موضع النفايات',low:'الصوت منخفض'}},
de:{title:'Ich nehme Rücksicht auf Nachbarn',back:'Zur Nachbarsgasse',next:'Weiter',again:'Noch einmal spielen',done:'Aufgabe geschafft',end:'Ich bin freundlich zu meinen Nachbarn, halte Wege frei und vermeide störenden Lärm.',progress:'Situation',good:'Gute Entscheidung.',try:'Versuch es erneut.',help:'Ziehe den Gegenstand an die richtige Stelle oder benutze den Knopf.',target:'Richtiger Platz',save:'Fortschritt konnte nicht gespeichert werden.',questions:['Mein Fahrrad blockiert den Weg. Was tue ich?','Mein Nachbar braucht Ruhe. Das Gerät ist laut. Was tue ich?','Ein Müllsack steht vor der Tür des Nachbarn. Wohin damit?','Ich begegne einem Nachbarn. Wie grüße ich?','Mein Nachbar trägt Dinge und möchte vorbei. Was tue ich?','Es ist Ruhezeit. Welche Aktivität wähle ich?','Mein Nachbar trägt viele Dinge. Was mache ich?','Die Haustür steht offen. Wie wahre ich die Privatsphäre?','Ich habe den Nachbarn gestört. Was sage ich?','Wie achte ich jeden Tag auf meine Nachbarn?'],answers:[['Fahrrad mitten im Weg lassen','Fahrrad an den Rand stellen'],['Noch lauter stellen','Leiser stellen und ausschalten'],['Vor der Tür liegen lassen','Zur Müllstelle bringen'],['As-salāmu ʿalaikum','Ganz ignorieren'],['Platz machen','Den Weg blockieren'],['Leise spielen','Direkt am Fenster laut sein'],['Zuerst fragen, ob ich helfen soll','Ohne Erlaubnis wegnehmen'],['Vorbeigehen, ohne hineinzusehen','Ins Haus hineinsehen'],['Entschuldigung sagen und leiser sein','Das ist mir egal'],['Wege frei und sauber halten','Sachen vor fremde Türen stellen']],feedback:['Der Weg gehört allen.','Kein Musikstück oder lautes Gerät wird abgespielt.','Müll gehört nicht vor fremde Türen.','Ein freundlicher Gruß gehört zur Nachbarschaft.','Ich lasse andere vorbeigehen.','Wähle passende Zeit und Ort zum Spielen.','Hilfe vorher anbieten.','Privatsphäre achten.','Fehler eingestehen und beheben.','Rücksicht gilt jeden Tag.'],labels:{bike:'Fahrrad',radio:'Gerät',bag:'Müllbeutel',move:'Bewegen',quiet:'Leiser stellen',mute:'Ausgeschaltet',neighbour:'Nachbar',waiting:'Er kann weiter',ready:'Weg frei',bin:'Müllstelle',low:'Lautstärke reduziert'}},
en:{title:'I care for my neighbours',back:'Neighbours’ lane',next:'Continue',again:'Play again',done:'Activity complete',end:'I am considerate, keep pathways clear, and avoid disturbing my neighbours.',progress:'Situation',good:'Good choice.',try:'Try again.',help:'Drag the item to the correct spot, or use the button.',target:'Safe place',save:'Could not save progress.',questions:['My bicycle blocks our shared path. What should I do?','My neighbour needs quiet. The device is loud. What should I do?','A rubbish bag is in front of the neighbour’s doorway. Where does it go?','I meet my neighbour. What should I say?','My neighbour is carrying things and needs to pass. What do I do?','It is quiet time. What should I play?','My neighbour is carrying many bags. What should I do?','A door is ajar. How do I respect privacy?','I disturbed my neighbour. What should I say?','How can I care for my neighbours every day?'],answers:[['Leave the bike in the middle','Move it to the side'],['Turn it up','Lower the volume and switch it off'],['Leave it at the door','Move it to the rubbish point'],['As-salamu alaykum','Ignore them completely'],['Make room','Block the way'],['Choose a quiet activity','Make noise by the window'],['Ask whether help is wanted','Take the bags without asking'],['Pass without looking inside','Peek through the door'],['Apologise and keep it quiet','Not my problem'],['Keep the path clear and clean','Leave things by others’ doors']],feedback:['Keep shared paths clear.','No music or loud sound is played.','Do not leave rubbish at a doorway.','A friendly greeting is kind.','Make room for others.','Choose an appropriate time and place to play.','Offer before helping.','Respect privacy.','Acknowledge and repair mistakes.','Neighbourly care is daily.'],labels:{bike:'Bicycle',radio:'Sound device',bag:'Rubbish bag',move:'Move the item',quiet:'Turn down',mute:'Device off',neighbour:'Neighbour',waiting:'Path is clear',ready:'Way clear',bin:'Rubbish point',low:'Volume down'}}
};
const $=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n};
function btn(text,action,cls=''){const n=$('button',cls,text);n.type='button';n.onclick=action;return n}
function img(src,cls,alt=''){const n=$('img',cls);n.src=src;n.alt=alt;n.draggable=false;return n}
function saved(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
let dialog=null,options={},lang='ar',step=0,solved=false,complete=false,errors=0,disabled=false,lastStatus='',player='girl',token=0;
const T=()=>L[lang];
function persist(){try{localStorage.setItem(KEY,JSON.stringify({step,solved,complete,errors,version:1}))}catch{lastStatus=T().save}}
function state(){return {step,solved,complete,errors,lang,open:!!dialog}}
function close(){token++;if(!dialog)return;const d=dialog;dialog=null;d.close();d.remove();options.onClose?.()}
function showStatus(message){lastStatus=message;const n=dialog?.querySelector('.hn02-feedback');if(n)n.textContent=message}
function wrong(){if(solved||disabled)return;errors++;showStatus(T().try);persist()}
function success(){if(solved||disabled)return;solved=true;showStatus(T().feedback[step]);persist();const next=dialog?.querySelector('.hn02-next');if(next)next.disabled=false;dialog?.querySelector('.hn02-stage')?.classList.add('is-correct');}
function actionChoices(index){if(solved||disabled)return;const correct={0:1,1:1,2:1,3:0,4:0,5:0,6:0,7:0,8:0,9:0}[step];if(index!==correct)return wrong();if(step===5){dialog?.querySelector('.hn02-radio')?.classList.add('hn02-muted')}success()}
function moveObject(node,stepId){if(!node||solved||disabled)return;disabled=true;node.classList.add('hn02-placed');const marker=dialog?.querySelector('.hn02-drop');marker?.classList.add('hn02-flash');const id=++token;
setTimeout(()=>{if(id!==token||!dialog)return;disabled=false;success()},520)}
function sprite(scene,name,cls,style){const version=name==='neighbor'?'v2':'v1';const n=img(ASSET+'n02-'+name+'-'+version+'.webp','hn02-prop '+cls,name);Object.assign(n.style,style);scene.append(n);return n}
function drag(source,onDrop){let pointer=null;
source.style.touchAction='none';source.addEventListener('pointerdown',e=>{if(solved||disabled||pointer)return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY,dx:0,dy:0};source.setPointerCapture?.(e.pointerId)});
source.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId||solved)return;pointer.dx=e.clientX-pointer.x;pointer.dy=e.clientY-pointer.y;source.style.setProperty('--dx',pointer.dx+'px');source.style.setProperty('--dy',pointer.dy+'px')});
source.addEventListener('pointerup',e=>{if(!pointer)return;const d=pointer;pointer=null;const target=dialog?.querySelector('.hn02-drop');const box=target?.getBoundingClientRect();const inside=box&&e.clientX>=box.left-28&&e.clientX<=box.right+28&&e.clientY>=box.top-28&&e.clientY<=box.bottom+28;
if(inside){source.style.removeProperty('--dx');source.style.removeProperty('--dy');onDrop()}else{source.style.removeProperty('--dx');source.style.removeProperty('--dy');if(Math.hypot(d.dx,d.dy)>20)showStatus(T().help)}});
source.addEventListener('pointercancel',()=>{pointer=null;source.style.removeProperty('--dx');source.style.removeProperty('--dy')})}
function buildScene(host){const scene=$('div','hn02-stage');host.append(scene);scene.append(img(ASSET+'n02-scene-v1.webp','hn02-background',''));
const t=T(),lab=t.labels;
const playerSrc=AVATAR+(player==='boy'?'BOY':'GIRL')+'_CUTOUT_v001.webp';scene.append(img(playerSrc,'hn02-player'));
// Scene details must match the individual teaching situation.
const neighbour=step>=3&&step<=8&&step!==7?sprite(scene,(step===4||step===6)?'carry':'neighbor','hn02-neighbor'+((step===4||step===6)?' hn02-carry':''),{}):null;
if(neighbour)neighbour.alt=lab.neighbour;
if(step===7){const door=sprite(scene,'door','hn02-door',{});door.alt=lang==='ar'?'باب الجار المفتوح':lang==='de'?'Geöffnete Haustür':'Open neighbour door'}
if(step===3||step===8){const callout=$('span','hn02-greeting',step===3?(lang==='ar'?'السلام عليكم':lang==='de'?'As-salāmu ʿalaikum':'As-salamu alaykum'):(lang==='ar'?'أعتذر':lang==='de'?'Entschuldigung':'Sorry'));scene.append(callout)}
let prop=null;
if(step===0||step===9)prop=sprite(scene,'bicycle','hn02-bike',{});
else if(step===1||step===5)prop=sprite(scene,step===1?'radio-noise':'radio','hn02-radio',{});
else if(step===2||step===9)prop=sprite(scene,'trashbag','hn02-bag',{});
if(prop){prop.alt=[lab.bike,lab.radio,lab.bag][step===1||step===5?1:step===2?2:0];}
if([0,2].includes(step)){
 const drop=btn(step===0?lab.target:lab.bin,()=>moveObject(prop,step),'hn02-drop');drop.style.left=step===0?'79%':'85%';drop.style.top=step===0?'80%':'80%';scene.append(drop);drag(prop,()=>moveObject(prop,step));
}
if(step===1){prop.classList.add('hn02-active');prop.setAttribute('role','button');prop.tabIndex=0;prop.addEventListener('click',()=>{prop.classList.add('hn02-muted');success()});prop.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();prop.click()}})}
if(step===9){prop.classList.add('hn02-small');const tidy=sprite(scene,'trashbag','hn02-bag hn02-tidy',{});tidy.alt=lab.bag;}
return scene}
function next(){if(!solved||disabled)return;token++;if(step===MAX-1){complete=true;step=MAX;persist();options.onComplete?.();window.HUDHUDProgress?.mark('n02');render();return;}step++;solved=false;lastStatus='';persist();render()}
function render(){if(!dialog)return;const t=T();dialog.replaceChildren();const header=$('header','hn02-header');header.append(btn(t.back,close,'hn02-back'),$('strong','hn02-title',t.title),$('span','hn02-counter',complete?`${MAX}/${MAX}`:`${step+1}/${MAX}`));dialog.append(header);
if(complete){const done=$('section','hn02-finish');done.append($('h2','',t.done),$('p','',t.end));done.append(btn(t.again,()=>{step=0;solved=false;complete=false;errors=0;persist();render()},'hn02-replay'));dialog.append(done);return}
const layout=$('div','hn02-layout'),picture=$('div','hn02-picture'),panel=$('section','hn02-panel');buildScene(picture);const question=$('h2','hn02-question',t.questions[step]);question.tabIndex=-1;panel.append(question);
const optionsWrap=$('div','hn02-choices');let opts=t.answers[step];
// Stage 0/2 offer a useful action button as an accessible alternative to drag and drop.
if([0,2].includes(step))optionsWrap.append(btn(opts[1],()=>moveObject(picture.querySelector('.hn02-prop'),step),'hn02-action'));
else if(step===1)optionsWrap.append(btn(opts[1],()=>{picture.querySelector('.hn02-radio')?.classList.add('hn02-muted');success()},'hn02-action'));
else opts.forEach((label,i)=>optionsWrap.append(btn(label,()=>actionChoices(i),'hn02-choice')));
panel.append(optionsWrap,$('p','hn02-feedback',lastStatus));
const nextButton=btn(t.next,next,'hn02-next');nextButton.disabled=!solved;panel.append(nextButton);
layout.append(picture,panel);dialog.append(layout);
}
function open(opts={}){if(dialog)close();options=opts;lang=L[opts.lang]?opts.lang:'ar';let p=null;try{p=JSON.parse(localStorage.getItem('hudhud-home-profile-v1')||'null')}catch{}
player=opts.character==='boy'||opts.character==='girl'?opts.character:(p?.character==='boy'?'boy':'girl');const old=saved();complete=old?.complete===true;step=complete?MAX:Math.max(0,Math.min(MAX-1,Number.isInteger(old?.step)?old.step:0));solved=!!old?.solved;errors=Number(old?.errors)||0;disabled=false;lastStatus='';token++;
const d=$('dialog','hn02-dialog');d.lang=lang;d.dir=lang==='ar'?'rtl':'ltr';d.setAttribute('aria-label',T().title);d.addEventListener('cancel',e=>{e.preventDefault();close()});document.body.append(d);dialog=d;d.showModal();render();return state()}
window.HUDHUDN02={open,close,getState:state,version:'0.34.2'};
})();
