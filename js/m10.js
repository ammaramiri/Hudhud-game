/* HUDHUD M10 — أتعرف إلى القبلة / Find the Qibla
 * Atlas M-3 prayer hall. Fourteen meaningful interactive situations.
 * No camera, device bearing, geolocation, music, avatar facial features, or invented compass readings.
 * In THIS DRAWN mosque the mihrab at the back of the hall indicates the qibla.
 */
(()=>{'use strict';
if(window.HUDHUDM10)return;
const AS='assets/m10/',SAVE='hudhud-m10-v1',TOTAL=14;
const DATA={
ar:{title:'أتعرف إلى القبلة',back:'إلى قاعة الصلاة',next:'أكمل',again:'ألعب مرة أخرى',done:'أحسنت! تعرّفت إلى القبلة',doneText:'القبلة جهة المسجد الحرام في مكة. في قاعة المسجد يساعدني المحراب على معرفة اتجاهها، وإذا كنت في مكان آخر أتحقق من الاتجاه بمصدر موثوق.',good:'أحسنت. ',retry:'ليس هذا الاتجاه. حاول مرة أخرى.',turnLeft:'أدير يساراً',turnRight:'أدير يميناً',move:'أنقل السجادة إلى الموضع المحدد',hint:'اسحب السجادة إلى الدائرة، أو استخدم الزر.',check:'أتحقق',mat:'السجادة',mihrab:'المحراب',window:'النافذة',clear:'مكان صلاة مناسب',entrance:'الممر',status:'أصبحت السجادة متجهة إلى المحراب.',levels:[
['إلى أين أتجه في صلاتي؟','ما المقصود بالقبلة؟','القبلة جهة المسجد الحرام في مكة.',['جهة المسجد الحرام في مكة','أي نافذة تعجبني']],
['أكتشف المحراب','المس المحراب في جدار قاعة الصلاة، ولا تلمس النافذة.','المحراب في هذا المسجد يدلّ على جهة القبلة.'],
['أفهم علامة المحراب','ما الدليل الذي أستعين به داخل قاعة المسجد؟','أنظر إلى المحراب المحدد في جدار القبلة.',['المحراب','لون الستارة أو النافذة']],
['أوجّه سجادتي','السجادة مائلة إلى الجانب. أدرها حتى يصبح رأسها باتجاه المحراب.','أصبح اتجاه السجادة نحو جدار القبلة.'],
['أصحح الاتجاه المعاكس','السجادة معكوسة! أدرها إلى جهة المحراب.','لا أصلّي وظهري إلى جهة القبلة في هذا المشهد.'],
['أختار موضعاً للصلاة','انقل السجادة إلى الموضع المخصص بعيداً عن المدخل.','المكان مناسب، والسجادة متجهة نحو المحراب.'],
['لا أتبع الزخرفة وحدها','هل تكفي زخارف السجادة لتحديد القبلة في أي مكان؟','لا. أتأكد من جهة القبلة أولاً، ثم أوجّه السجادة إليها.',['لا، أتحقق من القبلة أولاً','نعم، لون السجادة يحدد القبلة']],
['غيّرتُ مكاني','انتقلت إلى الطرف الآخر من القاعة. أعد توجيه سجادتي نحو المحراب.','يتغير موضعي، لكنني أبقى متجهاً إلى القبلة.'],
['أبتعد عن الممر','المس موضع الصلاة المناسب، ولا تقف عند مدخل القاعة.','أختار موضعاً لا يعيق دخول المصلّين.'],
['ألاحظ سجادتين','أمامك سجادتان. المس السجادة الموجّهة نحو المحراب.','وجدت السجادة الصحيحة، وليس كل اتجاه مثل الآخر.'],
['أحافظ على اتجاهي','إذا انتقلت من وسط القاعة إلى طرفها، ماذا أفعل؟','أبقى متوجهاً إلى جهة القبلة.',['أحافظ على جهة القبلة','أغيّر الاتجاه عشوائياً']],
['أساعد زميلي','سجادة زميلي مائلة. أدرها حتى تتجه نحو المحراب.','أصلحت اتجاه السجادة دون أن أغيّر جهة القبلة.'],
['إذا لم أرَ محراباً','إذا كنت في مكان لا يوجد فيه محراب، كيف أتحقق من القبلة؟','أسأل شخصاً موثوقاً أو أستخدم وسيلة موثوقة لمعرفة الاتجاه.',['أتحقق من اتجاه موثوق','أختار جهة عشوائية']],
['التطبيق الأخير','أثبت ما تعلمته: عيّن المحراب، ثم وجّه السجادة وانقلها إلى موضع الصلاة.','تعرفت إلى القبلة ووجهت السجادة واستعملت موضعاً مناسباً.']
],finalParts:['1 من 3: المس المحراب.','2 من 3: أدر السجادة نحو المحراب.','3 من 3: انقل السجادة إلى موضع الصلاة.']},
de:{title:'Die Qibla erkennen',back:'Zum Gebetssaal',next:'Weiter',again:'Noch einmal spielen',done:'Du hast die Gebetsrichtung erkannt',doneText:'Die Qibla ist die Richtung der Heiligen Moschee in Mekka. Im Gebetssaal zeigt der Mihrab die Richtung an; an anderen Orten prüfe ich sie zuverlässig.',good:'Gut. ',retry:'Versuche es mit einer anderen Richtung.',turnLeft:'Nach links drehen',turnRight:'Nach rechts drehen',move:'Gebetsteppich zum freien Platz bewegen',hint:'Ziehe den Teppich in den Kreis oder nutze die Taste.',check:'Prüfen',mat:'Gebetsteppich',mihrab:'Mihrab',window:'Fenster',clear:'Freier Gebetsplatz',entrance:'Durchgang',status:'Der Teppich zeigt zum Mihrab.',levels:[
['Wohin bete ich?','Was ist die Qibla?','Die Qibla ist die Richtung der Heiligen Moschee in Mekka.',['Zur Heiligen Moschee in Mekka','Zu irgendeinem Fenster']],
['Den Mihrab entdecken','Berühre den Mihrab im Gebetssaal, nicht das Fenster.','Der Mihrab zeigt hier die Qibla an.'],
['Das Zeichen erkennen','Woran erkenne ich die Gebetsrichtung in diesem Saal?','Der Mihrab ist das Zeichen in der Qibla-Wand.',['Am Mihrab','An der Farbe des Fensters']],
['Teppich ausrichten','Der Teppich ist seitlich gedreht. Richte sein oberes Ende zum Mihrab.','Der Teppich zeigt nun zur Qibla.'],
['Umgedreht?','Der Teppich zeigt in die entgegengesetzte Richtung. Drehe ihn.','Der Teppich ist jetzt ausgerichtet.'],
['Gebetsplatz wählen','Verschiebe den Teppich auf den freien Gebetsplatz, weg vom Eingang.','Der Durchgang bleibt frei.'],
['Nicht nur das Muster','Reicht das Teppichmuster allein, um überall die Qibla zu erkennen?','Nein. Erst die Richtung bestimmen, dann den Teppich ausrichten.',['Nein, zuerst die Richtung prüfen','Ja, das Teppichmuster genügt']],
['Neuer Platz','Du stehst jetzt auf der anderen Seite. Richte den Teppich erneut aus.','Der Gebetsplatz ändert sich, nicht die Qibla.'],
['Eingang freihalten','Wähle den richtigen Gebetsplatz, nicht den Durchgang.','Der Eingang ist frei.'],
['Zwei Teppiche','Welcher der beiden Teppiche zeigt zum Mihrab?','Dieser Teppich ist richtig ausgerichtet.'],
['Richtung behalten','Was gilt, wenn ich im Saal meinen Platz wechsle?','Ich halte die Gebetsrichtung bei.',['Ich bleibe zur Qibla ausgerichtet','Ich wähle eine beliebige Richtung']],
['Einem Freund helfen','Drehe den Teppich deines Freundes zum Mihrab.','Gut ausgerichtet.'],
['Ohne Mihrab','Wie finde ich die Qibla ohne einen Mihrab?','Ich nutze eine zuverlässige Quelle für die Richtung.',['Zuverlässige Quelle prüfen','Eine Richtung raten']],
['Abschlussübung','Finde den Mihrab, richte den Teppich aus und lege ihn an einen freien Platz.','Alle drei Aufgaben sind geschafft.']
],finalParts:['1/3: Mihrab berühren','2/3: Teppich ausrichten','3/3: Teppich zum freien Platz bringen']},
en:{title:'Find the Qibla',back:'Back to prayer hall',next:'Continue',again:'Play again',done:'You found the prayer direction',doneText:'The Qibla is the direction of the Sacred Mosque in Mecca. Inside a prayer hall the mihrab indicates it; elsewhere I check with a reliable source.',good:'Well done. ',retry:'Try a different direction.',turnLeft:'Turn left',turnRight:'Turn right',move:'Move the rug to the clear space',hint:'Drag the rug into the target or use the button.',check:'Check',mat:'Prayer rug',mihrab:'Mihrab',window:'Window',clear:'Clear prayer space',entrance:'Walkway',status:'The rug now faces the mihrab.',levels:[
['Where do we face?','What is the Qibla?','The direction of the Sacred Mosque in Mecca.',['Towards the Sacred Mosque in Mecca','Towards any pretty window']],
['Find the mihrab','Tap the mihrab in the wall, not the window.','The mihrab indicates the Qibla in this mosque.'],
['Recognize the sign','Which feature in this prayer hall shows the direction?','The mihrab marks the direction in the Qibla wall.',['The mihrab','The window colours']],
['Turn the rug','The rug is sideways. Point its top towards the mihrab.','Now the rug points towards the Qibla.'],
['Turn around','The rug is facing backwards. Rotate it towards the mihrab.','The direction is correct now.'],
['Find a good spot','Move the prayer rug to the marked space, clear of the doorway.','The entrance stays clear.'],
['Not just decoration','Does a rug pattern alone tell us the Qibla everywhere?','No. First identify the direction; then align the rug.',['No, check the Qibla first','Yes, the rug colour tells us']],
['Move to a new place','You moved to the other side of the hall. Face the mihrab again.','Your position changed, but the Qibla did not.'],
['Keep the entrance clear','Tap a suitable prayer space, not the doorway.','The walkway remains clear.'],
['Two prayer rugs','Tap the rug pointing towards the mihrab.','You chose the correct rug.'],
['Keep facing the same way','What if I move across the prayer hall?','I keep facing the Qibla.',['I still face the Qibla','I choose any direction']],
['Help a friend','Turn your friend’s rug towards the mihrab.','The rug now faces the right direction.'],
['Away from a mosque','How should I find the Qibla where there is no mihrab?','I check the direction using a reliable source.',['Check a reliable source','Guess a direction']],
['Final activity','Find the mihrab, orient the rug, and move it to a suitable place.','All three activities complete.']
],finalParts:['1/3: Tap the mihrab','2/3: Rotate the rug','3/3: Move the rug to the clear space']}
};
const TYPE=['choice','find','choice','rotate','rotate','move','choice','rotate','spot','compare','choice','rotate','choice','final'];
const START={3:90,4:180,7:270,11:90,13:180};
const $=(tag,cls,value)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(value!==undefined)e.textContent=value;return e};
const button=(label,handler,cls)=>{const e=$('button',cls,label);e.type='button';e.onclick=handler;return e};
const img=(url,cls,alt='')=>{const e=$('img',cls);e.src=url;e.alt=alt;e.draggable=false;return e};
let dlg=null,opts={},language='ar',phase=0,solved=false,complete=false,sub=0,angle=0,status='',player='girl',rug=null,locked=false;
const T=()=>DATA[language];
function remember(){try{localStorage.setItem(SAVE,JSON.stringify({phase,solved,complete,sub,angle}))}catch{}}
function state(){return {phase,solved,complete,sub,angle,open:!!dlg}}
function feedback(s){status=s;const p=dlg?.querySelector('.m10-feedback');if(p)p.textContent=s}
function wrong(){if(locked||solved)return;feedback(T().retry)}
function done(){if(solved||locked)return;solved=true;remember();feedback(T().good+T().levels[phase][2]);dlg?.querySelector('.m10-next')?.removeAttribute('disabled');dlg?.querySelector('.m10-stage')?.classList.add('is-complete')}
function close(){if(!dlg)return;const d=dlg;dlg=null;d.close();d.remove();opts.onClose?.()}
function goNext(){if(!solved||locked)return;if(phase===TOTAL-1){complete=true;phase=TOTAL;remember();window.HUDHUDProgress?.mark?.('m10');opts.onComplete?.();draw();return;}phase++;solved=false;sub=0;angle=START[phase]??0;status='';remember();draw()}
function replay(){phase=0;solved=false;complete=false;sub=0;angle=0;status='';remember();draw()}
function choice(panel,arr,correct=0){const box=$('div','m10-choices');arr.forEach((label,i)=>box.append(button(label,()=>i===correct?done():wrong(),'m10-choice')));panel.append(box)}
function spot(scene,x,y,cls,label,handler){const b=button('',handler,'m10-spot '+cls);b.setAttribute('aria-label',label);b.title=label;b.style.left=x+'%';b.style.top=y+'%';scene.append(b);return b}
function note(scene,t,cls){scene.append($('span','m10-visual-note '+cls,t))}
function addMihrab(scene,wrongWindow=true,correctHandler=done){spot(scene,49,35,'m10-mihrab',T().mihrab,correctHandler);if(wrongWindow)spot(scene,83,28,'m10-window',T().window,wrong)}
function rugAt(scene,x=51,y=70,orientation=angle,extra=''){const r=img(AS+'rug-open-v1.webp','m10-rug '+extra,T().mat);r.style.left=x+'%';r.style.top=y+'%';r.style.setProperty('--angle',orientation+'deg');r.setAttribute('aria-label',T().mat);scene.append(r);return r}
function updateRug(){if(rug)rug.style.setProperty('--angle',angle+'deg')}
function turn(delta){if(solved||locked)return;angle=(angle+delta+360)%360;updateRug();remember();if(angle===0){feedback(T().status);if(phase===13&&sub===1){locked=true;setTimeout(()=>{if(!dlg)return;locked=false;sub=2;status='';remember();draw()},300)}else done();}else feedback(T().retry)}
function turnActions(panel,scene){const box=$('div','m10-turns');box.append(button(T().turnLeft,()=>turn(-90),'m10-turn'),button(T().turnRight,()=>turn(90),'m10-turn'));panel.append(box);
if(rug){rug.classList.add('m10-interactive');rug.setAttribute('role','button');rug.tabIndex=0;rug.addEventListener('click',()=>turn(90));rug.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'||e.key==='Enter'||e.key===' '){e.preventDefault();turn(e.key==='ArrowLeft'?-90:90)}});let start=null,moved=false;rug.addEventListener('pointerdown',e=>{if(solved||locked)return;start={x:e.clientX,id:e.pointerId};moved=false;rug.setPointerCapture?.(e.pointerId)});rug.addEventListener('pointerup',e=>{if(!start||e.pointerId!==start.id)return;const dx=e.clientX-start.x;start=null;if(Math.abs(dx)>28){moved=true;turn(dx>0?90:-90)}});rug.addEventListener('click',e=>{if(moved){e.stopImmediatePropagation();moved=false}},true)}}
function addMove(panel,scene,sourcePos=[68,70],destPos=[45,74]){rug=rugAt(scene,sourcePos[0],sourcePos[1],0,'m10-interactive');const tgt=spot(scene,destPos[0],destPos[1],'m10-floor-target',T().clear,()=>place());
const label=$('span','m10-target-caption',T().clear);label.style.left=destPos[0]+'%';label.style.top=(destPos[1]-11)+'%';scene.append(label);
let pointer=null,dragged=false;
function place(){if(solved||locked)return;locked=true;rug.classList.add('m10-placed');rug.style.left=destPos[0]+'%';rug.style.top=destPos[1]+'%';rug.style.setProperty('--dx','0px');rug.style.setProperty('--dy','0px');tgt.classList.add('is-right');setTimeout(()=>{if(!dlg)return;locked=false;if(phase===13&&sub===2)done();else done()},350)}
rug.style.touchAction='none';rug.addEventListener('pointerdown',e=>{if(locked||solved)return;pointer={x:e.clientX,y:e.clientY,id:e.pointerId};dragged=false;rug.setPointerCapture?.(e.pointerId)});
rug.addEventListener('pointermove',e=>{if(!pointer||e.pointerId!==pointer.id)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;dragged=dragged||Math.hypot(dx,dy)>12;rug.style.setProperty('--dx',dx+'px');rug.style.setProperty('--dy',dy+'px')});
rug.addEventListener('pointerup',e=>{if(!pointer)return;pointer=null;const rect=tgt.getBoundingClientRect();const inside=e.clientX>=rect.left-48&&e.clientX<=rect.right+48&&e.clientY>=rect.top-48&&e.clientY<=rect.bottom+48;rug.style.setProperty('--dx','0px');rug.style.setProperty('--dy','0px');if(inside)place();else if(dragged)feedback(T().hint)});
rug.addEventListener('pointercancel',()=>{pointer=null;rug.style.setProperty('--dx','0px');rug.style.setProperty('--dy','0px')});
rug.tabIndex=0;rug.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();place()}});
panel.append(button(T().move,place,'m10-action'));
}
function drawScene(view,panel){const scene=$('div','m10-stage');scene.dataset.phase=phase;view.append(scene);scene.append(img('assets/m09/hall-v1.webp','m10-background',''));
const avatar=img('assets/HUDHUD_HOME_'+(player==='boy'?'BOY':'GIRL')+'_CUTOUT_v001.webp','m10-avatar');scene.append(avatar);
const kind=TYPE[phase];rug=null;
if(kind==='choice'){
 if(phase===0||phase===12){spot(scene,49,35,'m10-mihrab m10-mihrab-hint',T().mihrab,()=>{});note(scene,T().mihrab,'m10-note-mihrab')}
 if(phase===6||phase===10)rug=rugAt(scene,53,72,phase===6?90:0);
 choice(panel,T().levels[phase][3]);
}
if(kind==='find'){addMihrab(scene,true,done);note(scene,T().mihrab,'m10-note-mihrab')}
if(kind==='rotate'){rug=rugAt(scene,phase===7?68:phase===11?43:51,phase===7?68:72,angle);spot(scene,49,35,'m10-mihrab m10-mihrab-hint',T().mihrab,()=>{});turnActions(panel,scene)}
if(kind==='move'){addMove(panel,scene,[71,71],[44,73])}
if(kind==='spot'){spot(scene,44,70,'m10-floor-target',T().clear,done);spot(scene,47,91,'m10-walkway',T().entrance,wrong);note(scene,T().clear,'m10-note-clear')}
if(kind==='compare'){const one=rugAt(scene,37,73,0,'m10-rug-choice'),two=rugAt(scene,67,73,90,'m10-rug-choice');one.tabIndex=0;one.setAttribute('role','button');one.setAttribute('aria-label',T().good+T().mat);one.onclick=done;one.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();done()}});two.tabIndex=0;two.setAttribute('role','button');two.setAttribute('aria-label',T().retry+T().mat);two.onclick=wrong;two.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();wrong()}});note(scene,'1','m10-note-one');note(scene,'2','m10-note-two');panel.append(button(language==='ar'?'السجادة ١':language==='de'?'Teppich 1':'Rug 1',done,'m10-mini-choice'),button(language==='ar'?'السجادة ٢':language==='de'?'Teppich 2':'Rug 2',wrong,'m10-mini-choice'));}
if(kind==='final'){
 const title=panel.querySelector('.m10-prompt');title.textContent=T().finalParts[sub];
 if(sub===0){addMihrab(scene,true,()=>{sub=1;angle=START[13];status='';remember();draw()})}
 if(sub===1){rug=rugAt(scene,51,73,angle);spot(scene,49,35,'m10-mihrab m10-mihrab-hint',T().mihrab,()=>{});turnActions(panel,scene)}
 if(sub===2){addMove(panel,scene,[72,74],[46,71])}
}
return scene}
function draw(){if(!dlg)return;dlg.replaceChildren();const t=T();const hd=$('header','m10-head');hd.append(button(t.back,close,'m10-back'),$('strong','m10-title',t.title),$('span','m10-count',complete?`${TOTAL}/${TOTAL}`:`${phase+1}/${TOTAL}`));dlg.append(hd);
if(complete){const end=$('section','m10-finish');end.append($('h2','',t.done),$('p','',t.doneText),button(t.again,replay,'m10-replay'));dlg.append(end);return}
const layout=$('div','m10-layout'),view=$('div','m10-view'),panel=$('section','m10-panel');panel.append($('h2','m10-heading',t.levels[phase][0]),$('p','m10-prompt',t.levels[phase][1]));drawScene(view,panel);panel.append($('p','m10-feedback',status));const next=button(t.next,goNext,'m10-next');next.disabled=!solved;panel.append(next);layout.append(view,panel);dlg.append(layout);if(solved)dlg.querySelector('.m10-stage')?.classList.add('is-complete')}
function open(o={}){if(dlg)close();opts=o;language=DATA[o.lang]?o.lang:'ar';let profile={};try{profile=JSON.parse(localStorage.getItem('hudhud-home-profile-v1')||'{}')||{}}catch{}player=o.character==='boy'||o.character==='girl'?o.character:profile.character==='boy'?'boy':'girl';let saved={};try{saved=JSON.parse(localStorage.getItem(SAVE)||'{}')||{}}catch{}complete=!!saved.complete;phase=complete?TOTAL:Math.min(TOTAL-1,Math.max(0,parseInt(saved.phase)||0));solved=!!saved.solved;sub=Math.min(2,Math.max(0,parseInt(saved.sub)||0));angle=Number.isFinite(saved.angle)?saved.angle:START[phase]??0;locked=false;status='';dlg=$('dialog','m10-dialog');dlg.lang=language;dlg.dir=language==='ar'?'rtl':'ltr';dlg.setAttribute('aria-label',T().title);dlg.addEventListener('cancel',e=>{e.preventDefault();close()});document.body.append(dlg);dlg.showModal();draw();return state()}
window.HUDHUDM10={open,close,getState:state,version:'0.34.5'};
})();
