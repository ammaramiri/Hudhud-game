/* Atlas totals include planned stages; completion is permanent per browser. */
(()=>{'use strict';
const KEY='hudhud-completions-v1',ranges={home:['h',1,24],kitchen:['h',5,9],mosque:['m',1,22],wudu:['m',4,8],school:['s',1,18],classroom:['s',1,4],market:['q',1,13],giving:['q',11,13],garden:['g',1,14],orchard:['g',1,4],library:['l',1,19],faith:['l',5,9],world:['n',1,13],play:['p',1,8],cooperation:['p',5,8]};
let earned={};try{earned=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{}
function save(){try{localStorage.setItem(KEY,JSON.stringify(earned))}catch{}}
function mark(id){if(earned[id])return;earned[id]=true;save();window.dispatchEvent(new Event('hudhud:completion'));}
function importOld(){for(const id of ['g01','g04','m04','h06','l05','q13','s03','p08']){try{const s=JSON.parse(localStorage.getItem('hudhud-'+id+'-v1')||'{}');if(s.complete||s.completed||s.baseDone||s.bestStars>0||(id==='l05'&&s.step>=6)||(id==='s03'&&s.round>0)||(id==='q13'&&s.step>=6))mark(id)}catch{}}}
function stats(area){importOld();const a=ranges[area];if(!a)return null;const ids=Array.from({length:a[2]-a[1]+1},(_,i)=>a[0]+String(a[1]+i).padStart(2,'0'));return {done:ids.filter(id=>earned[id]).length,total:ids.length}}
function render(area,lang='ar'){const host=document.querySelector('.world-heading');if(!host)return;let n=document.getElementById('world-progress');if(!n){n=document.createElement('span');n.id='world-progress';n.setAttribute('role','status');host.append(n)}const s=stats(area);n.hidden=!s;if(!s)return;const num=x=>new Intl.NumberFormat(lang==='ar'?'ar-u-nu-arab':lang).format(x);n.textContent=lang==='ar'?'أنجزت '+num(s.done)+' من '+num(s.total):lang==='de'?num(s.done)+' von '+num(s.total)+' geschafft':num(s.done)+' of '+num(s.total)+' completed';n.title=lang==='ar'?'يشمل العدد جميع مراحل المكان في الأطلس، ومنها مراحل قيد الإعداد. التحدّي اختياري.':lang==='de'?'Enthält geplante Aufgaben. Herausforderungen sind freiwillig.':'Includes planned activities. Challenges are optional.';n.style.setProperty('--earned',s.done/s.total*100+'%')}
for(const id of ['g01','g04','m04','h06','l05','q13','s03','p08']){const api=window['HUDHUD'+id.toUpperCase()];if(!api?.open)continue;const open=api.open;api.open=function(o={}){const done=o.onComplete;return open.call(this,{...o,onComplete:(...a)=>{mark(id);done?.(...a)}})}}
importOld();window.HUDHUDProgress={mark,stats,render};
})();
/* HUDHUD 0.33.1: load only four compact neighborhood hotspots on the ORIGINAL map.
   No new background images or geometry modifications. */
(()=>{'use strict';
 if(document.getElementById('hudhud-neighborhood-script'))return;
 const style=document.createElement('link');style.id='hudhud-neighborhood-style';style.rel='stylesheet';style.href='css/neighborhood-hubs.css?v=0.33.1';document.head.append(style);
 const script=document.createElement('script');script.id='hudhud-neighborhood-script';script.src='js/neighborhood-hubs.js?v=0.33.1';script.defer=true;document.body.append(script);
})();


/* v0.34.0 loader: old production index.html already loads progress.js.
   Load neighbourhood UI, N02 interactive stage, and styles without editing index.html. */
(()=>{'use strict';
const base=new URL('../',document.currentScript.src);
function style(rel){if(document.querySelector('[data-hudhud-style="'+rel+'"]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href=new URL(rel,base).href;l.dataset.hudhudStyle=rel;document.head.append(l)}
function script(rel){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=new URL(rel,base).href;s.onload=resolve;s.onerror=()=>{console.error('HUDHUD: failed to load '+rel);reject(new Error(rel))};document.head.append(s)})}
style('css/neighborhood-hubs.css');style('css/n02.css');
script('js/n02.js').then(()=>script('js/neighborhood-hubs.js')).catch(e=>console.error('HUDHUD neighborhood unavailable:',e.message));
})();
