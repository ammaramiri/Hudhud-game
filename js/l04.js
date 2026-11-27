(() => {
  'use strict';
  const key = 'hudhud-l04-v2';
  const names = ['السَّمِيع','البَصِير','الغَفُور','الرَّزَّاق'];
  const order = [2,0,3,1];
  const artwork = ['hear-v1','see-v1','forgive-v2','provide-v1'];
  const verses = ['42/11','42/11','39/53','51/58'];
  const references = {
    ar:['الشورى ١١','الشورى ١١','الزمر ٥٣','الذاريات ٥٨'],
    en:['Ash-Shura 42:11','Ash-Shura 42:11','Az-Zumar 39:53','Adh-Dhariyat 51:58'],
    de:['Asch-Schura 42:11','Asch-Schura 42:11','Az-Zumar 39:53','Adh-Dhariyat 51:58']
  };
  const recall = {
    ar: {
      prompt:'أستخدم ما تعلّمته',
      questions:['أخطأتُ وأريد أن أطلب من الله أن يغفر لي. بأيّ اسم أدعوه؟','أريد أن أسأل الله من رزقه. بأيّ اسم أدعوه؟'],
      responses:['يا غفور، اغفر لي.','يا رزّاق، ارزقني.']
    },
    en: {
      prompt:'Put it into practice',
      questions:['I made a mistake and want to ask Allah to forgive me. Which name can I use?','I want to ask Allah to provide for me. Which name can I use?'],
      responses:['O Forgiving One, forgive me.','O Provider, provide for me.']
    },
    de: {
      prompt:'Wende dein Wissen an',
      questions:['Ich habe einen Fehler gemacht und bitte Allah um Vergebung. Welchen Namen kann ich dabei verwenden?','Ich bitte Allah um Versorgung. Welchen Namen kann ich dabei verwenden?'],
      responses:['O Vergebender, vergib mir.','O Versorgender, versorge mich.']
    }
  };
  const finish = 10;
  const copy = {
    ar: {
      title:'أسماء الله ومعانيها', back:'إلى جناح معرفة الله', intro:'نتعرّف اليوم إلى أربعةٍ من أسماء الله الحسنى.', choose:'أيّ اسم يدلّ على هذا المعنى؟',
      next:'أكمل', start:'أبدأ التحدّي', retry:'حاول مرة أخرى. فكّر في المعنى الذي يذكره السؤال.', done:'تعلّمتَ أربعة أسماء من أسماء الله الحسنى.', again:'أُعيد الدرس',
      lines:['الله يسمع كلَّ شيء، حتى الدعاء بصوت خافت.','الله يرى كلَّ شيء، حتى ما لا يراه الناس.','الله كثير المغفرة. يغفر لمن تاب إليه.','الله يرزق مخلوقاته، ومن رزقه لنا الطعام والماء.'],
      clues:['دعت طفلة ربّها بصوت خافت. أيّ اسم يدلّ على أن الله يسمع دعاءها؟','أعادت طفلة كتاباً إلى مكانه ولم يرها أحد. أيّ اسم يدلّ على أن الله يرى عملها؟','أساء طفل إلى صديقه. اعتذر إليه وتاب إلى الله. أيّ اسم يدلّ على مغفرة الله؟','زرعت أسرة القمح وسقته ثم حصدته. أيّ اسم يدلّ على أن الله يرزقنا الطعام؟']
    },
    en: {
      title:'Allah’s names and their meanings',back:'Back to the library wing',intro:'Today we will learn four of Allah’s beautiful names.',choose:'Which name matches this meaning?',
      next:'Continue',start:'Start the challenge',retry:'Try again. Think of the meaning in the question.',done:'You learned four of Allah’s beautiful names.',again:'Play again',
      lines:['Allah hears everything, even a quiet prayer.','Allah sees everything, even what people do not see.','Allah forgives again and again. He forgives those who turn to Him in repentance.','Allah provides for His creation. Food and water are part of what He gives us.'],
      clues:['A child prays quietly. Which name tells us that Allah hears the prayer?','A child puts a book back while no one is watching. Which name tells us that Allah sees the action?','A child hurts a friend, apologises and repents to Allah. Which name points to Allah’s forgiveness?','A family plants wheat, waters it and gathers the harvest. Which name tells us that Allah provides our food?']
    },
    de: {
      title:'Allahs Namen und ihre Bedeutungen',back:'Zurück zum Bibliotheksflügel',intro:'Heute lernen wir vier von Allahs schönen Namen kennen.',choose:'Welcher Name passt zu dieser Bedeutung?',
      next:'Weiter',start:'Übung beginnen',retry:'Versuche es noch einmal. Achte auf die Bedeutung in der Frage.',done:'Du hast vier von Allahs schönen Namen kennengelernt.',again:'Noch einmal spielen',
      lines:['Allah hört alles, sogar ein leises Bittgebet.','Allah sieht alles, auch was Menschen nicht sehen.','Allah vergibt immer wieder. Er vergibt denen, die sich reumütig an Ihn wenden.','Allah versorgt Seine Geschöpfe. Essen und Wasser gehören zu dem, was Er uns gibt.'],
      clues:['Ein Kind bittet Allah leise. Welcher Name sagt uns, dass Allah das Bittgebet hört?','Ein Kind stellt ein Buch zurück, ohne dass jemand zusieht. Welcher Name sagt uns, dass Allah es sieht?','Ein Kind verletzt einen Freund, entschuldigt sich und bereut vor Allah. Welcher Name weist auf Allahs Vergebung hin?','Eine Familie sät Weizen, gießt ihn und erntet. Welcher Name sagt uns, dass Allah uns mit Essen versorgt?']
    }
  };
  const labels = {
    en:['As-Samīʿ · The All-Hearing','Al-Baṣīr · The All-Seeing','Al-Ghafūr · The Forgiving','Ar-Razzāq · The Provider'],
    de:['As-Samīʿ · Der Allhörende','Al-Baṣīr · Der Allsehende','Al-Ghafūr · Der Vergebende','Ar-Razzāq · Der Versorgende']
  };
  function read() {
    try {
      const current = localStorage.getItem(key);
      if (!current) {
        const previous = JSON.parse(localStorage.getItem('hudhud-l04-v1') || '{}');
        return {step:0, complete:previous?.complete === true};
      }
      const saved = JSON.parse(current);
      return {
        step:Number.isInteger(saved?.step) ? Math.max(0, Math.min(finish, saved.step)) : 0,
        complete:saved?.complete === true
      };
    } catch { return {step:0,complete:false}; }
  }
  function open(options={}) {
    if(document.querySelector('.l04-dialog[open]'))return;
    const lang=copy[options.lang]?options.lang:'ar';
    const t=copy[lang];
    const label=i=>lang==='ar'?names[i]:labels[lang][i];
    const state=read();
    const dialog=document.createElement('dialog');
    dialog.className='l05-dialog l04-dialog';
    dialog.lang=lang;
    dialog.dir=lang==='ar'?'rtl':'ltr';
    dialog.setAttribute('aria-label',t.title);
    const el=(tag,css,text)=>{const node=document.createElement(tag);if(css)node.className=css;if(text)node.textContent=text;return node;};
    const button=(text,run,css)=>{const node=el('button',css,text);node.type='button';node.onclick=run;return node;};
    function save(){
      try {
        localStorage.setItem(key,JSON.stringify(state));
        // Keep the existing completion importer compatible.
        if (state.complete) localStorage.setItem('hudhud-l04-v1',JSON.stringify({step:8,complete:true}));
      } catch {}
    }
    function close(){dialog.close();dialog.remove();options.onClose?.();}
    function advance(){state.step++;if(state.step===finish)state.complete=true;save();if(state.step===finish)options.onComplete?.();render();}
    function render(){
      const shell=el('div','l05-shell'), head=el('header'), main=el('main'), art=el('div','l04-art'), panel=el('section','l05-panel');
      const progress=el('progress','l04-progress');progress.max=finish;progress.value=state.step;progress.setAttribute('aria-label',t.title);
      head.append(button(t.back,close,'l05-back'),el('strong','',t.title),progress);
      const i = state.step < 4 ? state.step : order[state.step - 4];
      if (i !== undefined) {
        const image = el('img');
        image.src = 'assets/l04/' + artwork[i] + '.webp';
        image.alt = '';
        image.width = 1200;
        image.height = 800;
        art.append(image);
      } else {
        main.classList.add('l04-text-only');
      }
      if(state.step===finish){
        const cards = el('ul','l04-recap');
        for (const name of names.keys()) {
          const card = el('li');
          card.append(el('strong','',label(name)),el('p','',t.lines[name]));
          cards.append(card);
        }
        panel.append(el('h1','',t.done),cards,button(t.again,()=>{state.step=0;save();render();},'l05-primary'));
      }else if(state.step<4){
        if(i===0)panel.append(el('p','l05-eyebrow',t.intro));
        panel.append(el('h1','',names[i]));
        if(lang!=='ar')panel.append(el('p','l05-eyebrow',label(i)));
        const verse = el('a','l04-verse',references[lang][i]);
        verse.href = 'https://quran.com/' + verses[i];
        verse.target = '_blank';
        verse.rel = 'noopener';
        panel.append(el('p','l05-text',t.lines[i]),verse,button(i===3?t.start:t.next,advance,'l05-primary'));
      }else{
        const application = state.step >= 8 ? state.step - 8 : undefined;
        const answer = application === undefined ? i : [2,3][application];
        const actions = el('div','l05-actions'), feedback = el('p','l05-feedback');
        feedback.setAttribute('role','status');
        const heading = application === undefined ? t.choose : recall[lang].prompt;
        const clue = application === undefined ? t.clues[answer] : recall[lang].questions[application];
        panel.append(el('h1','',heading),el('p','l05-text',clue),actions,feedback);
        const distractor=[1,0,3,2][answer];
        const choices=state.step%2===0?[distractor,answer]:[answer,distractor];
        for(const choice of choices){
          const b=button(label(choice),()=>{
            for (const action of actions.children) action.classList.remove('l05-wrong');
            if(choice!==answer){b.classList.add('l05-wrong');feedback.textContent=t.retry;return;}
            for(const action of actions.children)action.disabled=true;
            b.classList.add('l05-right');
            feedback.textContent = application === undefined ? t.lines[answer] : recall[lang].responses[application];
            const next=button(t.next,advance,'l05-primary');
            panel.append(next);
            next.focus();
          },'l04-choice');
          actions.append(b);
        }
      }
      if (art.childElementCount) main.append(art);
      main.append(panel);
      shell.append(head,main);
      dialog.replaceChildren(shell);
      if (dialog.open) {
        const heading = panel.querySelector('h1');
        heading.tabIndex = -1;
        heading.focus({preventScroll:true});
      }
    }
    dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
    document.body.append(dialog);render();dialog.showModal();dialog.querySelector('.l05-panel button')?.focus();
  }
  window.HUDHUDL04={open,isComplete:()=>read().complete};
})();
