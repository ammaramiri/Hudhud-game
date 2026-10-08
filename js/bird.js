'use strict';
(()=>{
const KEY='hudhud-bird-v1',assets=['garden.webp','sprites.webp','garden-filled.webp'];
const texts={
ar:{title:'اسقِ العصفور',garden:'الحديقة',fill:'املأ الوعاء',tap:'المس الوعاء',pour:'ينساب الماء…',drink:'يشرب العصفور…',kind:'نرحم الحيوانات ونعتني بها',again:'مرة أخرى',back:'العودة إلى الحديقة',loading:'لحظة…',retry:'أعد المحاولة',jug:'إبريق الماء',bowl:'وعاء الماء',save:'تعذّر الحفظ على هذا الجهاز'},
de:{title:'Wasser für den Spatz',garden:'Garten',fill:'Fülle die Schale',tap:'Tippe auf die Schale',pour:'Das Wasser fließt…',drink:'Der Spatz trinkt…',kind:'Wir sind barmherzig zu Tieren und kümmern uns um sie.',again:'Noch einmal',back:'Zurück zum Garten',loading:'Einen Moment…',retry:'Erneut versuchen',jug:'Wasserkrug',bowl:'Wasserschale',save:'Speichern auf diesem Gerät nicht möglich'},
en:{title:'Water for the sparrow',garden:'Garden',fill:'Fill the bowl',tap:'Tap the bowl',pour:'The water is flowing…',drink:'The sparrow is drinking…',kind:'We show mercy to animals and care for them.',again:'Play again',back:'Back to the garden',loading:'One moment…',retry:'Try again',jug:'Water pitcher',bowl:'Water bowl',save:'Unable to save on this device'}
};
let dialog,lang='ar',state='loading',selected=false,drag=null,session=0,timers=[],flowFrame=0,saved=false,saveOK=true;
const c=()=>texts[lang],q=s=>dialog.querySelector(s),reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function isComplete(){try{return saved||JSON.parse(localStorage.getItem(KEY)||'null')?.complete===true;}catch{return saved;}}
function clear(){cancelAnimationFrame(flowFrame);session++;timers.forEach(clearTimeout);timers=[];drag=null;}
function later(fn,ms){const id=session;timers.push(setTimeout(()=>{if(id===session&&dialog.open)fn();},reduced()?100:ms));}
function render(){dialog.dataset.state=state;q('.bird-status').textContent=state==='ready'?(selected?c().tap:c().fill):state==='pouring'?c().pour:state==='drinking'?c().drink:state==='complete'?c().kind:state==='error'?c().retry:c().loading;q('.bird-jug').disabled=state!=='ready';q('.bird-bowl').disabled=state!=='ready';q('.bird-jug').setAttribute('aria-pressed',String(selected));q('.bird-retry').hidden=state!=='error';q('.bird-again').hidden=state!=='complete';q('.bird-finish').hidden=state!=='complete';q('.bird-save').hidden=state!=='complete'||saveOK;}
function reset(){clear();state='ready';selected=false;saveOK=true;q('.bird-jug').style.removeProperty('translate');render();}
function complete(){state='complete';saved=true;try{localStorage.setItem(KEY,JSON.stringify({version:1,complete:true}));}catch{saveOK=false;}render();window.dispatchEvent(new Event('hudhud:bird-progress'));q('.bird-finish').focus({preventScroll:true});}
function flow(){if(state!=='pouring'||!dialog.open)return;const r=q('.bird-canvas').getBoundingClientRect(),p=q('.bird-spout').getBoundingClientRect();const x=p.left+p.width/2-r.left,y=p.top+p.height/2-r.top;const endX=Math.max(r.width*.53,Math.min(r.width*.68,x-12)),endY=r.height*.54;q('.bird-flow').setAttribute('d',`M${x},${y} Q${x-12},${y+20} ${endX},${endY}`);flowFrame=requestAnimationFrame(flow);}
function pour(){if(state!=='ready')return;drag=null;selected=false;q('.bird-jug').style.removeProperty('translate');state='pouring';render();flow();later(()=>{state='drinking';render();later(complete,3300);},3000);}
async function load(){clear();const id=session;state='loading';render();try{await Promise.all(assets.map(a=>{const i=new Image();i.src='assets/bird/'+a;return i.decode();}));if(id===session&&dialog.open)reset();}catch{if(id===session&&dialog.open){state='error';render();}}}
function open(language){if(dialog?.open)return;lang=texts[language]?language:'en';
if(!dialog){dialog=document.createElement('dialog');dialog.id='bird-dialog';dialog.className='world-dialog';dialog.setAttribute('aria-labelledby','bird-title');document.body.append(dialog);dialog.addEventListener('close',clear);}
dialog.lang=lang;dialog.dir=lang==='ar'?'rtl':'ltr';
dialog.innerHTML='<div class="bird-canvas"><div class="bird-water" aria-hidden="true"></div><div class="bird-sparrow" aria-hidden="true"><span class="bird-upright"></span><span class="bird-drinking"></span></div><button type="button" class="bird-bowl"></button><svg class="bird-stream" aria-hidden="true"><path class="bird-flow"/></svg><button type="button" class="bird-jug"><span></span><i class="bird-spout"></i></button></div><header class="bird-header"><button class="bird-back" type="button"></button><h2 id="bird-title"></h2></header><footer class="bird-footer"><p class="bird-status" role="status" aria-live="polite"></p><p class="bird-save" hidden></p><div class="bird-actions"><button class="bird-retry" type="button" hidden></button><button class="bird-again" type="button" hidden></button><button class="bird-finish" type="button" hidden></button></div></footer>';
q('#bird-title').textContent=c().title;q('.bird-back').textContent='‹ '+c().garden;q('.bird-jug').setAttribute('aria-label',c().jug);q('.bird-bowl').setAttribute('aria-label',c().bowl);q('.bird-retry').textContent=c().retry;q('.bird-again').textContent=c().again;q('.bird-finish').textContent=c().back;q('.bird-save').textContent=c().save;
q('.bird-back').onclick=q('.bird-finish').onclick=()=>dialog.close();q('.bird-again').onclick=reset;q('.bird-retry').onclick=load;q('.bird-bowl').onclick=()=>{if(selected)pour();};
const jug=q('.bird-jug');let suppress=false;
jug.onclick=()=>{if(suppress){suppress=false;return;}if(state==='ready'){selected=!selected;render();}};
jug.onpointerdown=e=>{if(state!=='ready'||!e.isPrimary)return;suppress=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};jug.setPointerCapture(e.pointerId);};
jug.onpointermove=e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>8)drag.moved=true;if(drag.moved)jug.style.translate=dx+'px '+dy+'px';};
jug.onpointerup=e=>{if(!drag||drag.id!==e.pointerId)return;const moved=drag.moved;drag=null;jug.style.removeProperty('translate');if(!moved)return;suppress=true;const b=q('.bird-bowl').getBoundingClientRect();if(e.clientX>=b.left&&e.clientX<=b.right&&e.clientY>=b.top&&e.clientY<=b.bottom)pour();};
jug.onpointercancel=()=>{drag=null;jug.style.removeProperty('translate');};
dialog.showModal();load();
}
window.HUDHUDBird={open,isComplete};
})();
