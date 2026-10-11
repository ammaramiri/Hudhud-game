'use strict';
(()=>{
const KEY='hudhud-sky-v1',art=['assets/sky/day.webp','assets/sky/night.webp'];
const texts={
 ar:{title:'الليل والنهار',garden:'الحديقة',hint:'شاهد الليل، ثم عُد للصباح',morning:'عُد إلى الصباح',done:'الله خلق الليل والنهار',day:'نهار',night:'ليل',between:'يتغيّر الوقت',time:'وقت المشهد',again:'مرة أخرى',back:'العودة إلى الحديقة',loading:'لحظة…',retry:'أعد المحاولة',save:'تعذّر الحفظ على هذا الجهاز'},
 de:{title:'Tag und Nacht',garden:'Garten',hint:'Entdecke die Nacht. Kehre dann zum Morgen zurück.',morning:'Kehre zum Morgen zurück',done:'Allah hat Tag und Nacht erschaffen.',day:'Tag',night:'Nacht',between:'Die Zeit vergeht',time:'Tageszeit',again:'Noch einmal',back:'Zurück zum Garten',loading:'Einen Moment…',retry:'Erneut versuchen',save:'Speichern auf diesem Gerät nicht möglich'},
 en:{title:'Day and night',garden:'Garden',hint:'Explore the night, then return to morning',morning:'Return to morning',done:'Allah created day and night.',day:'Day',night:'Night',between:'Time is passing',time:'Time of day',again:'Play again',back:'Back to the garden',loading:'One moment…',retry:'Try again',save:'Unable to save on this device'}
};
let dlg,lang='ar',state='loading',value=0,nightSeen=false,session=0,timer=0,frame=0,saved=false,saveOK=true;
const c=()=>texts[lang],q=s=>dlg.querySelector(s);
function isComplete(){try{return saved||JSON.parse(localStorage.getItem(KEY)||'null')?.complete===true;}catch{return saved;}}
function clear(){session++;clearTimeout(timer);cancelAnimationFrame(frame);timer=frame=0;}
function render(){
 dlg.dataset.state=state;
 q('.sky-status').textContent=state==='loading'?c().loading:state==='error'?c().retry:state==='complete'?c().done:nightSeen?c().morning:c().hint;
 q('.sky-range').disabled=q('.sky-day-button').disabled=q('.sky-night-button').disabled=['loading','error'].includes(state);
 q('.sky-retry').hidden=state!=='error';q('.sky-replay').hidden=q('.sky-finish').hidden=state!=='complete';q('.sky-save').hidden=saveOK;
 q('.sky-progress').dataset.step=state==='complete'?'3':nightSeen?'2':'1';
}
function finish(){state='complete';saved=true;try{localStorage.setItem(KEY,JSON.stringify({version:1,complete:true}));}catch{saveOK=false;}render();dispatchEvent(new Event('hudhud:sky-progress'));}
function paint(){
 q('.sky-night-art').style.opacity=String(value/100);q('.sky-range').value=String(Math.round(value));
 const name=value<=8?c().day:value>=92?c().night:c().between;
 q('.sky-time-label').textContent=name;q('.sky-range').setAttribute('aria-valuetext',name);
}
function observe(){
 clearTimeout(timer);timer=0;if(state!=='ready')return;const token=session;
 if(value>=92&&!nightSeen){timer=setTimeout(()=>{if(session===token&&dlg.open&&value>=92){nightSeen=true;render();}},700);}
 else if(value<=8&&nightSeen){timer=setTimeout(()=>{if(session===token&&dlg.open&&value<=8)finish();},700);}
}
function jump(target){
 if(!['ready','complete'].includes(state))return;
 clearTimeout(timer);cancelAnimationFrame(frame);
 const from=value,token=session,start=performance.now(),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:1000;
 function tick(now){if(token!==session||!dlg.open)return;const t=duration?Math.min(1,(now-start)/duration):1;value=from+(target-from)*(t*t*(3-2*t));paint();if(t<1)frame=requestAnimationFrame(tick);else observe();}
 frame=requestAnimationFrame(tick);
}
function reset(){clear();state='ready';nightSeen=false;value=0;saveOK=true;paint();render();}
async function load(){clear();state='loading';render();const token=session;try{await Promise.all(art.map(src=>{const img=new Image();img.src=src;return img.decode();}));if(token===session&&dlg.open){q('.sky-day-art').src=art[0];q('.sky-night-art').src=art[1];reset();}}catch{if(token===session&&dlg.open){state='error';render();}}}
function open(language){
 if(dlg?.open)return;lang=texts[language]?language:'en';
 if(!dlg){dlg=document.createElement('dialog');dlg.id='sky-dialog';dlg.className='world-dialog';dlg.setAttribute('aria-labelledby','sky-title');document.body.append(dlg);dlg.addEventListener('close',clear);}
 dlg.lang=lang;dlg.dir=lang==='ar'?'rtl':'ltr';
 dlg.innerHTML='<div class="sky-scene" aria-hidden="true"><img class="sky-day-art" src="'+art[0]+'" alt=""><img class="sky-night-art" src="'+art[1]+'" alt=""></div><header class="sky-header"><button class="sky-back" type="button"></button><h2 id="sky-title"></h2><span class="sky-time-label"></span></header><footer class="sky-controls"><div class="sky-progress" aria-hidden="true"><i></i><i></i><i></i></div><div class="sky-time-control" dir="ltr"><button type="button" class="sky-day-button"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="7"/><path d="M16 1v5m0 20v5M1 16h5m20 0h5M5 5l4 4m14 14 4 4M5 27l4-4M23 9l4-4"/></svg></button><input class="sky-range" type="range" min="0" max="100" step="1" value="0"><button type="button" class="sky-night-button"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M23 3A14 14 0 1 0 29 23 13 13 0 0 1 23 3Z"/></svg></button></div><p class="sky-status" role="status" aria-live="polite"></p><p class="sky-save" hidden></p><div class="sky-actions"><button class="sky-retry" type="button" hidden></button><button class="sky-replay" type="button" hidden></button><button class="sky-finish" type="button" hidden></button></div></footer>';
 q('#sky-title').textContent=c().title;q('.sky-back').textContent='‹ '+c().garden;q('.sky-day-button').setAttribute('aria-label',c().day);q('.sky-night-button').setAttribute('aria-label',c().night);q('.sky-range').setAttribute('aria-label',c().time);q('.sky-retry').textContent=c().retry;q('.sky-replay').textContent=c().again;q('.sky-finish').textContent=c().back;q('.sky-save').textContent=c().save;
 q('.sky-back').onclick=q('.sky-finish').onclick=()=>dlg.close();q('.sky-replay').onclick=reset;q('.sky-retry').onclick=load;q('.sky-day-button').onclick=()=>jump(0);q('.sky-night-button').onclick=()=>jump(100);
 q('.sky-range').oninput=e=>{if(!['ready','complete'].includes(state))return;cancelAnimationFrame(frame);value=Number(e.target.value);paint();observe();};
 dlg.showModal();paint();load();
}
window.HUDHUDSky={open,isComplete};
})();
