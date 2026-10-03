'use strict';
(()=>{
const copy={
ar:{tagline:'تعلّم دينك وأنت تلعب',story:'كان مع سليمان عليه السلام طائر يُسمّى الهُدهُد.\nرأى قومًا يسجدون للشمس من دون الله،\nفرجع وأخبر سليمان بما رأى.',invite:'وفي مغامرتنا، ريشته معك.\nهل أنت مستعد لتعرف ما لا تعرفه بعد؟',next:'تابع'},
en:{tagline:'Learn your faith while you play',story:'With Prophet Sulayman, peace be upon him, was a bird called the hoopoe — Hudhud. It saw people worshipping the sun instead of Allah, then returned to tell Sulayman what it had seen.',invite:'In our adventure, its feather is with you.\nReady to discover what you don’t know yet?',next:'Continue'},
de:{tagline:'Lerne deinen Glauben beim Spielen',story:'Beim Propheten Sulaiman, Friede sei mit ihm, war ein Vogel namens Hudhud — ein Wiedehopf. Er sah Menschen, die statt Allah die Sonne anbeteten. Er kehrte zurück und berichtete Sulaiman davon.',invite:'In unserem Abenteuer begleitet dich seine Feder.\nBereit, Neues zu entdecken?',next:'Weiter'}
};
const $=id=>document.getElementById(id);
function render(lang){const c=copy[lang]||copy.de;for(const [id,key] of Object.entries({'opening-tagline':'tagline','opening-story-text':'story','opening-invitation':'invite','opening-next-label':'next'}))$(id).textContent=c[key];document.querySelectorAll('[data-opening-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.openingLang===lang)));document.title='HUDHUD — '+c.tagline;}
document.querySelectorAll('[data-opening-lang]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('[data-lang="'+b.dataset.openingLang+'"]').click();render(b.dataset.openingLang);}));
$('opening-next').addEventListener('click',()=>{$('opening-screen').hidden=true;$('game-shell').hidden=false;document.body.classList.remove('opening-active');window.scrollTo(0,0);const title=$($('returning-screen').hidden?'welcome-title':'returning-title');title.setAttribute('tabindex','-1');title.focus({preventScroll:true});});
render(document.documentElement.lang);
})();
