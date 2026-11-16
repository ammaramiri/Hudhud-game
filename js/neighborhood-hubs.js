/* HUDHUD 0.34.0 — four subtle neighbourhood entrances on the approved map.
 * Three approved closer submaps (N1,N2,N4); N3 stays in central square.
 * Only N02 is presently playable; no fake stage completion.
 */
(()=>{'use strict';
if(window.HUDHUDNeighborhood)return;
const SPOTS=[
{id:'n1',at:[303,703],art:'assets/neighborhood/neighbors-n1-v2.webp',stages:['n01','n02','n03','n04'],positions:[[24,81],[75,66],[43,40],[71,25]]},
{id:'n2',at:[685,735],art:'assets/neighborhood/safe-road-n2-v2.webp',stages:['n05','n06','n07'],positions:[[26,43],[51,55],[74,73]]},
{id:'n3',at:[760,487],art:null,stages:['n08','n09','n10'],positions:[]},
{id:'n4',at:[1225,704],art:'assets/neighborhood/station-n4-v2.webp',stages:['n11','n12','n13'],positions:[[22,71],[48,58],[78,72]]}
];
const L={
 ar:{title:'الحي',back:'إلى الحي',soon:'قيد الإعداد',play:'العب المرحلة',ready:'جاهزة للعب',names:['ممر الجيران','الطريق الآمن','ساحة اللقاء','محطة الرحلة'],stages:['أبدأ بالسلام وأردّه','أراعي جاري','أحترم خصوصية البيوت','أوصل أمانة','أرفع الأذى بأمان','أفسح الطريق','أساعد من يحتاج','أستقبل ضيفاً','آداب الزيارة','أشارك في خدمة الحي','أجهّز حقيبتي','ذكر الركوب والسفر','أراعي رفاق الرحلة'],square:'ساحة اللقاء تقع مباشرةً في قلب الحي، ولا تحتاج خريطة فرعية.'},
 de:{title:'Viertel',back:'Zurück zum Viertel',soon:'In Vorbereitung',play:'Spielen',ready:'Spielbar',names:['Nachbarsgasse','Sicherer Weg','Treffpunkt','Reisestation'],stages:['Grüßen und erwidern','Rücksicht auf Nachbarn','Privatsphäre achten','Etwas anvertrauen','Hindernisse sicher beseitigen','Den Weg freihalten','Sicher helfen','Gast willkommen heißen','Zu Besuch sein','Gemeinsam mithelfen','Meine Tasche packen','Worte vor der Reise','Rücksicht auf Mitreisende'],square:'Der Treffpunkt ist direkt im Zentrum der Hauptkarte.'},
 en:{title:'Neighbourhood',back:'Back to neighbourhood',soon:'Coming later',play:'Play stage',ready:'Playable',names:['Neighbours’ lane','Safe road','Meeting place','Travel stop'],stages:['Greet and respond','Care for neighbours','Respect privacy','Deliver an entrusted item','Remove hazards safely','Leave the way clear','Help safely','Welcome a guest','Visiting manners','Help the neighbourhood','Pack for a trip','Words for travel','Care for fellow travellers'],square:'The meeting place is the central circle on the main neighbourhood map.'}
};
const E=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el};
let dialog=null,spots=[],lastLang='',lastVisible=null,ready=false,currentZone=null;
function lang(){const selected=document.querySelector('.languages [data-lang][aria-pressed="true"]')?.dataset.lang;const l=selected||document.documentElement.lang;return L[l]?l:'ar'}
function visible(){if(document.getElementById('world-screen')?.hidden)return false;const world=window.HUDHUDWorld?.getState?.();return world?.active&&world.scene==='world'}
function dispose(){if(!dialog)return;const d=dialog;dialog=null;d.close();d.remove();currentZone=null}
function btn(text,fn,cls){const b=E('button',cls,text);b.type='button';b.onclick=fn;return b}
function open(id){const i=SPOTS.findIndex(p=>p.id===id);if(i<0)return;dispose();currentZone=id;const t=L[lang()],spot=SPOTS[i];const d=E('dialog','hnh-dialog');d.dir=lang()==='ar'?'rtl':'ltr';d.lang=lang();d.setAttribute('aria-label',t.names[i]);
const head=E('header','hnh-head');head.append(btn(t.back,dispose,'hnh-close'),E('h2','hnh-title',t.names[i]));d.append(head);
if(spot.art){const map=E('div','hnh-submap');const image=E('img','hnh-submap-art');image.src=spot.art;image.alt=t.names[i];image.loading='eager';map.append(image);spot.stages.forEach((stage,n)=>{const play=stage==='n02';const dot=btn((n+1).toString(),()=>play?launchN02():undefined,'hnh-stage-pin'+(play?' is-playable':' is-planned'));
dot.style.left=spot.positions[n][0]+'%';dot.style.top=spot.positions[n][1]+'%';dot.title=`${stage.toUpperCase()} — ${t.stages[Number(stage.slice(1))-1]} — ${play?t.ready:t.soon}`;dot.setAttribute('aria-label',dot.title);dot.disabled=!play;map.append(dot)});d.append(map)}else d.append(E('p','hnh-note',t.square));
const list=E('div','hnh-stage-list');spot.stages.forEach(stage=>{const n=Number(stage.slice(1))-1,play=stage==='n02';const el=btn(`${stage.toUpperCase()} · ${t.stages[n]} — ${play?t.play:t.soon}`,()=>play?launchN02():undefined,'hnh-stage-item'+(play?' is-playable':''));el.disabled=!play;list.append(el)});d.append(list);
d.addEventListener('cancel',e=>{e.preventDefault();dispose()});document.body.append(d);dialog=d;d.showModal()}
function launchN02(){if(!window.HUDHUDN02){console.error('HUDHUD N02 not loaded');return}const l=lang();dispose();window.HUDHUDN02.open({lang:l,onClose:()=>open('n1')})}
function addOverview(){const target=document.getElementById('destinations');if(!visible()||!target)return;target.querySelectorAll('.hnh-overview-item').forEach(x=>x.remove());SPOTS.forEach((item,i)=>{const b=btn(L[lang()].names[i],()=>{document.getElementById('world-overview')?.close();open(item.id)},'hnh-overview-item');target.append(b)})}
function sync(){const l=lang(),show=visible();if(l===lastLang&&show===lastVisible)return;lastLang=l;lastVisible=show;spots.forEach((b,i)=>{b.hidden=!show;b.title=L[l].names[i];b.setAttribute('aria-label',L[l].names[i])});if(document.getElementById('world-overview')?.open)addOverview()}
function init(){if(ready||!document.getElementById('world-stage'))return;ready=true;const scene=document.getElementById('world-stage');SPOTS.forEach((spot,i)=>{const b=btn('',()=>open(spot.id),'hnh-hotspot');b.style.left=spot.at[0]+'px';b.style.top=spot.at[1]+'px';b.dataset.neighborhood=spot.id;scene.append(b);spots.push(b)});
const map=document.getElementById('world-overview');if(map)new MutationObserver(()=>{if(map.open)addOverview()}).observe(map,{attributes:true,attributeFilter:['open']});
document.getElementById('world-map')?.addEventListener('click',()=>queueMicrotask(addOverview));
document.querySelectorAll('[data-lang],[data-world-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(sync,0)));
window.addEventListener('hudhud:profile-ready',()=>setTimeout(sync,0));window.addEventListener('hudhud:resume',()=>setTimeout(sync,0));
sync();setInterval(sync,700)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.HUDHUDNeighborhood={open,close:dispose,getState:()=>({open:!!dialog,zone:currentZone,version:'0.34.0'})};
})();
