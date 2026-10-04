'use strict';
(()=>{
const copy={
 ar:{title:'اسقِ النبتة',garden:'الحديقة',cloud:'الغيمة',plant:'النبتة',hint:'حرّك الغيمة نحو النبتة',tap:'المس النبتة',rain:'المس الغيمة لينزل المطر',growing:'تنتعش النبتة…',success:'الماء يساعد النبتة على النمو',again:'مرة أخرى',back:'العودة إلى الحديقة',loading:'لحظة…',retry:'أعد المحاولة'},
 de:{title:'Gieße die Pflanze',garden:'Garten',cloud:'Wolke',plant:'Pflanze',hint:'Ziehe die Wolke zur Pflanze',tap:'Berühre die Pflanze',rain:'Tippe auf die Wolke für Regen',growing:'Die Pflanze erholt sich…',success:'Wasser hilft der Pflanze beim Wachsen',again:'Noch einmal',back:'Zurück zum Garten',loading:'Einen Moment…',retry:'Erneut versuchen'},
 en:{title:'Water the plant',garden:'Garden',cloud:'Cloud',plant:'Plant',hint:'Move the cloud to the plant',tap:'Touch the plant',rain:'Tap the cloud to make it rain',growing:'The plant is perking up…',success:'Water helps plants grow',again:'Play again',back:'Back to the garden',loading:'One moment…',retry:'Try again'}
};
let dialog,session=0,timer,lang='ar',state='loading',selected=false,drag=null,onComplete=()=>{};
const q=s=>dialog.querySelector(s), c=()=>copy[lang];
function render(){dialog.dataset.state=state;q('.water-status').textContent=state==='loading'?c().loading:state==='ready'?(selected?c().tap:c().hint):state==='placed'?c().rain:state==='raining'?c().growing:state==='error'?c().retry:c().success;q('.water-cloud').disabled=!['ready','placed'].includes(state);q('.water-plant').disabled=state!=='ready';q('.water-cloud').setAttribute('aria-pressed',String(selected));q('.water-replay').hidden=state!=='complete';q('.water-finish').hidden=state!=='complete';q('.water-retry').hidden=state!=='error';}
function place(){if(state!=='ready')return;state='placed';selected=false;drag=null;const cloud=q('.water-cloud');cloud.style.left='50%';cloud.style.top='4%';cloud.style.transform='translateX(-50%)';render();cloud.focus({preventScroll:true});}
function rain(){if(state!=='placed')return;state='raining';render();const id=session;timer=setTimeout(()=>{if(id!==session||!dialog.open)return;state='complete';render();onComplete();q('.water-finish').focus({preventScroll:true});},matchMedia('(prefers-reduced-motion: reduce)').matches?400:2600);}
function reset(){clearTimeout(timer);session++;state='ready';selected=false;drag=null;const cloud=q('.water-cloud');cloud.style.left='67%';cloud.style.top='3%';cloud.style.transform='translateX(-50%)';render();}
async function load(){const id=++session;state='loading';render();try{await Promise.all(['garden.png','sprites.png'].map(name=>{const i=new Image();i.src='assets/watering/'+name;return i.decode();}));if(id===session&&dialog.open)reset();}catch{if(id===session&&dialog.open){state='error';render();}}}
function open(language,complete){lang=copy[language]?language:'en';onComplete=complete||(()=>{});if(dialog?.open)return;
 if(!dialog){dialog=document.createElement('dialog');dialog.id='watering-dialog';dialog.className='world-dialog';dialog.setAttribute('aria-labelledby','water-title');document.body.append(dialog);dialog.addEventListener('close',()=>{session++;clearTimeout(timer);drag=null;});}
 dialog.dir=lang==='ar'?'rtl':'ltr';dialog.lang=lang;
 dialog.innerHTML='<header class="water-header"><h2 id="water-title"></h2><button class="water-back" type="button"></button></header><div class="water-stage"><button type="button" class="water-plant"><span class="water-bud"></span><span class="water-bloom"></span></button><div class="water-rain" aria-hidden="true">'+Array.from({length:14},(_,i)=>'<i style="--i:'+i+'"></i>').join('')+'</div><button type="button" class="water-cloud"><span></span></button></div><footer class="water-footer"><p class="water-status" role="status" aria-live="polite"></p><div class="water-actions"><button type="button" class="water-replay" hidden></button><button type="button" class="water-finish" hidden></button><button type="button" class="water-retry" hidden></button></div></footer>';
 q('#water-title').textContent=c().title;q('.water-back').textContent='‹ '+c().garden;q('.water-cloud').setAttribute('aria-label',c().cloud);q('.water-plant').setAttribute('aria-label',c().plant);q('.water-replay').textContent=c().again;q('.water-finish').textContent=c().back;q('.water-retry').textContent=c().retry;
 q('.water-back').onclick=q('.water-finish').onclick=()=>dialog.close();q('.water-replay').onclick=reset;q('.water-retry').onclick=load;
 q('.water-plant').onclick=()=>{if(selected)place();};
 const cloud=q('.water-cloud');let suppressClick=false;
 cloud.onclick=()=>{if(suppressClick){suppressClick=false;return;}if(state==='placed')rain();else if(state==='ready'){selected=!selected;render();}};
 cloud.onpointerdown=e=>{if(state!=='ready')return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};suppressClick=false;cloud.setPointerCapture(e.pointerId);};
 cloud.onpointermove=e=>{if(!drag||drag.id!==e.pointerId)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>8)drag.moved=true;if(!drag.moved)return;const r=q('.water-stage').getBoundingClientRect();cloud.style.left=Math.max(18,Math.min(82,(e.clientX-r.left)/r.width*100))+'%';cloud.style.top=Math.max(0,Math.min(68,(e.clientY-r.top)/r.height*100))+'%';};
 cloud.onpointerup=e=>{if(!drag||drag.id!==e.pointerId)return;const moved=drag.moved;drag=null;if(!moved)return;suppressClick=true;const p=q('.water-plant').getBoundingClientRect();if(e.clientX>=p.left-35&&e.clientX<=p.right+35&&e.clientY>=p.top-60&&e.clientY<=p.bottom)place();else{cloud.style.left='67%';cloud.style.top='3%';}};
 cloud.onpointercancel=()=>{drag=null;if(state==='ready'){cloud.style.left='67%';cloud.style.top='3%';}};
 dialog.showModal();load();
}
window.HUDHUDWatering={open};
})();
