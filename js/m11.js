/* HUDHUD M11 v0.35.7 — front-camera moving takbir and hand positions.
   Keeps progress key hudhud-m11-v1 and stage code m11. No changes to M04/M09/M10.
   Valid fiqh variants are accepted, not marked wrong. */
(()=>{'use strict';
const BASE='assets/m11/';
const SAVE='hudhud-m11-v1',TOTAL=14;
const POSES=['rest','lower','mid','shoulder','up','fold','fold2','reversed','one'];
const VER='0.35.7',FAT=[
'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ',
'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ\nغَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'];
const lessons=[
['الباب خلفي والقبلة أمامي','تعلمت جهة القبلة في الدرس السابق. أقف الآن للصلاة وظهري إلى باب المسجد؛ نشاهد حركات يديّ من الأمام.','review','rest'],
['أنوي الصلاة بقلبي','أستحضر الصلاة التي سأصليها دون أن أُلزم نفسي بنطق نية مخصوصة.','choice','rest'],
['أقف معتدلاً','أقف في موضعي بسكينة قبل التكبير.','choice','rest'],
['إلى أي ارتفاع أرفع يديّ؟','اختر هيئة وردت في السنة. لرفع اليدين إلى الكتفين أو الأذنين أصل صحيح.','height','up'],
['أميّز الخطأ في الرفع','اختر الطريقة السليمة: أرفع اليدين معاً، لا يد واحدة ولا أكتفي بتحريكهما قرب الخصر.','posechoice','mid'],
['أقول: الله أكبر','كبّر عند رفع اليدين. شاهد ارتفاعهما في اللقطة المتتابعة.','motion','rest'],
['أنزل يدي بعد التكبير','أكمل الحركة إلى الوقوف بهدوء ثم ضمّ اليدين.','motion','mid'],
['أي يد تكون فوق الأخرى؟','في هيئة القبض تكون اليد اليمنى فوق اليسرى.','hand','fold'],
['أين أضع اليدين؟','الصدر وفوق السرة من الهيئات الفقهية المشهورة. لا نضع اختلاف المذاهب ضمن الأخطاء.','placement','fold2'],
['أقف بخشوع','لا أعبث بثيابي أو يديّ أثناء القيام، وأنظر بهدوء.','choice','fold'],
['أبدأ بقراءة الفاتحة','راجع الكلمات واقرأها مع معلّم أو قارئ متقن. هذه اللعبة لا تفحص صحة التلاوة.','fat1','fold'],
['أتابع الفاتحة','أقرأ آيات الفاتحة بتأنٍّ دون استعجال.','fat2','fold'],
['أختم الفاتحة','أتمّ مراجعة الفاتحة كاملة. الركوع والسجود يأتيان في الدروس التالية.','fat3','fold'],
['أتدرّب من البداية','أطبّق خطوات بداية الصلاة بالترتيب: نية القلب، التكبير والرفع، إنزال اليدين، وضع اليمنى فوق اليسرى، القراءة.','sequence','rest']
];
const choices={
1:[['أنوي الصلاة في قلبي',true,'صحيح، النية محلها القلب.'],['أتلفّظ بجملة محددة أعتقد أن الصلاة لا تصح بدونها',false,'ليس مطلوباً التلفظ بنية مخصوصة.']],
2:[['أقف معتدلاً ساكناً',true,'أحسنت، أبدأ في هدوء.'],['أظل أتحرك وأعبث بأشيائي',false,'أهيئ نفسي للصلاة بهدوء.']],
9:[['أثبت بهدوء دون عبث',true,'السكينة جزء مهم من التعلم.'],['أحرّك أصابعي باستمرار وأنشغل بها',false,'أترك الأشياء التي تشغلني عن الصلاة.']]
};
const seq=['أستحضر النيّة في قلبي','أرفع يديّ وأقول الله أكبر','أخفض يدي بعد التكبير','أضع اليمنى فوق اليسرى','أقرأ الفاتحة وأنا قائم'];
let dlg=null,stage=0,solved=false,complete=false,sub=0,status='',lang='ar',character='boy',opts={},animationId=0;
const $=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
const btn=(name,fn,cls='')=>{const b=$('button',cls,name);b.type='button';b.addEventListener('click',fn);return b};
function save(){try{localStorage.setItem(SAVE,JSON.stringify({part:stage,solved,complete,sub}))}catch{}}
function sceneSrc(key){
 const pose=POSES.includes(key)?key:'rest';
 return BASE+'m11-'+character+'-'+pose+'-v4.webp';
}
function figure(key='rest',cls=''){
 const main=cls.includes('m11v-main-avatar');
 const img=$('img',main?'m11v-scene-pose '+cls:'m11v-avatar '+cls);
 img.src=sceneSrc(key);
 img.alt=main?'وضعية بداية الصلاة':'';
 img.draggable=false;
 return img;
}
function feedback(message,good){status=message;const p=dlg?.querySelector('.m11v-feedback');if(p){p.textContent=status;p.classList.toggle('bad',!good)}}
function good(message){solved=true;save();feedback(message||'أحسنت.',true);const n=dlg?.querySelector('.m11v-next');if(n)n.disabled=false}
function wrong(message){feedback(message||'أعد المحاولة. لاحظ حركة اليدين جيداً.',false)}
function next(){if(!solved)return;if(stage===TOTAL-1){complete=true;save();window.HUDHUDProgress?.mark?.('m11');opts.onComplete?.();draw();return}stage++;solved=false;sub=0;status='';save();draw()}
function back(){const o=opts;close();o.onClose?.()}
function close(){if(animationId){clearInterval(animationId);animationId=0}if(!dlg)return;const d=dlg;dlg=null;d.close();d.remove()}
function makeChoiceList(panel,items){const box=$('div','m11v-answers');items.forEach(([label,ok,msg])=>{box.append(btn(label,()=>ok?good(msg):wrong(msg),'m11v-answer'))});panel.append(box)}
function gallery(panel,items){const row=$('div','m11v-gallery');items.forEach(x=>{
 const b=btn('',()=>x.ok?good(x.message||'صحيح. هذه هيئة مقبولة.'):wrong(x.message||'هذه ليست الهيئة التي نتدرّب عليها.'),'m11v-gallery-card');
 const img=figure(x.pose);img.src=sceneSrc(x.pose).replace('-v4.webp','-detail-v5.webp');b.append(img,$('span','',x.name));row.append(b)
});panel.append(row)}
function showMotion(scene,panel,key){const hero=scene.querySelector('.m11v-main-avatar');let running=false;const frames=key==='raise'?['rest','lower','mid','shoulder','up']:['up','shoulder','mid','lower','fold'];
 const control=btn(key==='raise'?'شاهد رفع اليدين عند التكبير':'شاهد خفض اليدين ووضعهما',()=>{}, 'm11v-motion-button');
 control.onclick=()=>{if(running)return;running=true;control.disabled=true;let i=0;hero.src=sceneSrc(frames[0]);
  animationId=setInterval(()=>{i++;if(i<frames.length){hero.src=sceneSrc(frames[i]);}
   else{clearInterval(animationId);animationId=0;control.disabled=false;running=false;good(key==='raise'?'ارتفعت اليدان مع قول: الله أكبر.':'بعد التكبير خفضت اليدين، ثم وضعت اليمنى فوق اليسرى.')}} ,510)
 };
 panel.append(control)
}
function renderCurrent(scene,panel){
 const p=stage;
 const hero=scene ? figure(lessons[p][3],'m11v-main-avatar') : null;
 if(hero)scene.append(hero);
 if(p===0){panel.append(btn('أقف وظهري إلى الباب',()=>good('القبلة أمام الطفل، والباب خلفه. الكاميرا أمامه لتوضيح الحركة.'),'m11v-motion-button'))}
 else if(p===1||p===2||p===9)makeChoiceList(panel,choices[p]);
 else if(p===3)gallery(panel,[
 {name:'إلى مستوى الكتفين',pose:'shoulder',ok:true,message:'ورد الرفع حذو المنكبين.'},
 {name:'إلى مستوى الأذنين',pose:'up',ok:true,message:'ورد الرفع حذو الأذنين أيضاً.'},
 {name:'حركة صغيرة عند الخصر فقط',pose:'lower',ok:false,message:'ارفع كفيك إلى مستوى الكتفين أو الأذنين.'}]);
 else if(p===4)gallery(panel,[
 {name:'أرفع اليدين معاً',pose:'up',ok:true,message:'رفع اليدين معاً، أحسنت.'},
 {name:'لا أرفعهما إلا قليلاً',pose:'lower',ok:false,message:'نريد رفع اليدين في بدء التكبير.'},
 {name:'أحرّك يدًا واحدة فقط',pose:'one',ok:false,message:'نتدرب على رفع اليدين معاً.'}]);
 else if(p===5||p===6)showMotion(scene,panel,p===5?'raise':'lower');
 else if(p===7)gallery(panel,[
 {name:'اليمنى فوق اليسرى',pose:'fold',ok:true,message:'هذا ترتيب اليدين في هيئة القبض.'},
 {name:'اليسرى فوق اليمنى',pose:'reversed',ok:false,message:'في هيئة القبض تكون اليمنى فوق اليسرى.'},
 {name:'أعبث بيديّ دون استقرار',pose:'rest',ok:false,message:'أقف بهدوء وأبتعد عن العبث.'}]);
 else if(p===8)gallery(panel,[
 {name:'على الصدر',pose:'fold2',ok:true,message:'هيئة معتبرة في الفقه.'},
 {name:'فوق السرّة',pose:'fold',ok:true,message:'توجد هيئات فقهية معتبرة في موضع اليدين.'},
 {name:'أشبك أصابعي وأعبث بها',pose:'rest',ok:false,message:'لا نعبث باليدين أثناء القيام.'}]);
 else if(p>=10&&p<=12){const verses=$('div','m11v-verses',FAT[p-10]);panel.append(verses);panel.append(btn('قرأت المقطع وراجعته',()=>good('أحسنت. تعلّم التلاوة الصحيحة على معلّم متقن.'),'m11v-motion-button'))}
 else if(p===13){hero.src=sceneSrc(['rest','up','lower','fold','fold'][Math.min(4,sub)]);const box=$('div','m11v-answers');seq.forEach((name,i)=>{const b=btn(name,()=>{if(i!==sub){wrong('حاول ترتيب البداية بالخطوات الصحيحة.');return}sub++;status='';solved=sub===seq.length;save();draw()},'m11v-answer'+(i<sub?' done':''));b.disabled=i<sub;box.append(b)});panel.append($('div','m11v-sequence-count',`الخطوة ${Math.min(sub+1,5)} من 5`),box)}
}
function draw(){if(!dlg)return;if(animationId){clearInterval(animationId);animationId=0}dlg.replaceChildren();const head=$('header','m11v-head');head.append(btn('إلى تعليم الصلاة',back,'m11v-back'),$('strong','m11v-title','أبدأ صلاتي'),$('span','m11v-count',complete?'14 / 14':`${stage+1} / ${TOTAL}`));dlg.append(head);
 if(complete){const end=$('section','m11v-finished');end.append($('h2','','أتممت درس بداية الصلاة'),$('p','','تدرّبت على النية، ورفع اليدين عند التكبير، ووضع اليمنى فوق اليسرى، وقراءة الفاتحة. بقي الركوع والسجود في الدروس التالية.'),btn('أعيد الدرس من البداية',()=>{complete=false;stage=0;solved=false;sub=0;status='';save();draw()},'m11v-next'));dlg.append(end);return}
 const [title,prompt]=lessons[stage], layout=$('div','m11v-layout'),scene=[3,4,7,8].includes(stage)?null:$('div','m11v-scene'),panel=$('section','m11v-panel');
 panel.append($('h2','',title),$('p','m11v-prompt',prompt));renderCurrent(scene,panel);const feed=$('p','m11v-feedback',status);panel.append(feed);
 const nextBtn=btn(stage===TOTAL-1?'إنهاء الدرس':'أكمل',next,'m11v-next');nextBtn.disabled=!solved;panel.append(nextBtn);if(scene)layout.append(scene);else layout.classList.add('m11v-layout-choices');layout.append(panel);dlg.append(layout);
}
function open(o={}){close();opts=o;lang=o.lang||'ar';let profile={};try{profile=JSON.parse(localStorage.getItem('hudhud-home-profile-v1')||'{}')||{}}catch{}
 character=(o.character||profile.character)==='girl'?'girl':'boy';POSES.forEach(pose=>{const frame=new Image();frame.src=sceneSrc(pose)});let saved={};try{saved=JSON.parse(localStorage.getItem(SAVE)||'{}')||{}}catch{}
 complete=!!saved.complete;stage=Math.min(TOTAL-1,Math.max(0,Number(saved.part)||0));solved=!!saved.solved;sub=Math.min(5,Math.max(0,Number(saved.sub)||0));status='';
 dlg=$('dialog','m11v-dialog');dlg.lang='ar';dlg.dir='rtl';dlg.setAttribute('aria-label','أبدأ صلاتي');dlg.addEventListener('cancel',e=>{e.preventDefault();back()});document.body.append(dlg);dlg.showModal();draw();return getState()}
function getState(){return {stage,sub,solved,complete,open:!!dlg,version:VER}}
function autoRevealPrayerLessons(){
 const observer=new MutationObserver(()=>{
  const modal=document.querySelector('dialog.m09-hall-dialog[open]');
  const list=modal?.querySelector('.m09-prayer-path');
  if(!list||list.dataset.m11Revealed)return;
  list.dataset.m11Revealed='true';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if(!modal.open)return;
   const offset=list.getBoundingClientRect().top-modal.getBoundingClientRect().top;
   modal.scrollTop+=Math.max(0,offset-60);
   const first=list.querySelector('button:not(:disabled)');
   first?.focus({preventScroll:true});
  }));
 });
 observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',autoRevealPrayerLessons,{once:true});else autoRevealPrayerLessons();
window.HUDHUDM11={open,close,getState,version:VER};
})();
