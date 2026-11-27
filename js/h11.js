(() => {
  'use strict';
  const key = 'hudhud-h11-v1';
  const room = 'assets/world/bedroom-h3-v2.webp';
  const lessons = {
  "ar": {
    "title": "أذكار النوم والاستيقاظ",
    "back": "إلى غرفة النوم",
    "start": "أبدأ",
    "next": "أكمل",
    "done": "تعلّمت ذكرَي النوم والاستيقاظ",
    "again": "أعيد التمرين",
    "intro": "نتعلّم ما نقوله حين نأوي إلى الفراش وحين نستيقظ.",
    "night": "قبل أن أنام",
    "nightMeaning": "أذكر الله قبل النوم وأستودعه نفسي.",
    "morning": "حين أستيقظ",
    "morningMeaning": "أحمد الله لأنني استيقظت بعد النوم، وأتذكّر أن إليه الرجوع.",
    "nightQuestion": "أنا في فراشي وأوشك أن أنام. أيّ ذكر أقول؟",
    "morningQuestion": "فتحت عينيّ بعد النوم. أيّ ذكر أقول؟",
    "retry": "تأمّل وقت الذكر ثم حاول مرة أخرى.",
    "source": "صحيح البخاري ٦٣٢٤"
  },
  "en": {
    "title": "Remembrance before sleep and on waking",
    "back": "Back to the bedroom",
    "start": "Begin",
    "next": "Continue",
    "done": "You learned both remembrances",
    "again": "Practise again",
    "intro": "Learn what to say as you settle into bed and as you wake up.",
    "night": "Before I sleep",
    "nightMeaning": "I remember Allah before sleeping and entrust myself to Him.",
    "morning": "When I wake up",
    "morningMeaning": "I praise Allah for waking me after sleep and remember that I will return to Him.",
    "nightQuestion": "I am in bed, about to fall asleep. What do I say?",
    "morningQuestion": "I have just opened my eyes after sleeping. What do I say?",
    "retry": "Think about when you say it and try again.",
    "source": "Sahih al-Bukhari 6324"
  },
  "de": {
    "title": "Gedenken vor dem Schlafen und beim Aufwachen",
    "back": "Zurück ins Schlafzimmer",
    "start": "Beginnen",
    "next": "Weiter",
    "done": "Du hast beide Gedenkformeln gelernt",
    "again": "Noch einmal üben",
    "intro": "Hier lernst du, was du vor dem Schlafen und beim Aufwachen sagst.",
    "night": "Vor dem Schlafen",
    "nightMeaning": "Ich gedenke Allahs vor dem Schlafen und vertraue mich Ihm an.",
    "morning": "Beim Aufwachen",
    "morningMeaning": "Ich lobe Allah, weil ich wieder aufgewacht bin, und denke daran, dass ich zu Ihm zurückkehre.",
    "nightQuestion": "Ich liege im Bett und schlafe gleich ein. Was sage ich?",
    "morningQuestion": "Ich bin gerade aufgewacht. Was sage ich?",
    "retry": "Überlege, wann du es sagst, und versuche es erneut.",
    "source": "Sahih al-Bukhari 6324"
  }
};
  const words = ['بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ'];
  function read() {
    try { return JSON.parse(localStorage.getItem(key) || '{}') || {}; }
    catch { return {}; }
  }
  function open({lang = 'ar', onClose, onComplete} = {}) {
    if (document.querySelector('.h11-dialog[open]')) return;
    if (!Object.hasOwn(lessons,lang)) lang = 'ar';
    const t = lessons[lang];
    const state = read();
    const last = 5;
    let step = Number.isInteger(state.step) ? Math.min(last, Math.max(0, state.step)) : 0;
    const el = (tag, style, content) => {
      const node = document.createElement(tag);
      if (style) node.className = style;
      if (content) node.textContent = content;
      return node;
    };
    const button = (content, onClick, style) => {
      const b = el('button', style, content);
      b.type = 'button';
      b.onclick = onClick;
      return b;
    };
    const dialog = el('dialog', 'l05-dialog l04-dialog h11-dialog');
    dialog.lang = lang;
    dialog.dir = lang === 'ar' ? 'rtl' : 'ltr';
    dialog.setAttribute('aria-label', t.title);
    function go(next) {
      step = next;
      const complete = step === last || state.complete === true;
      state.complete = complete;
      try { localStorage.setItem(key, JSON.stringify({step, complete})); } catch {}
      if (step === last) onComplete?.();
      render();
    }
    function render() {
      const shell = el('div', 'l05-shell');
      const header = el('header');
      const main = el('main');
      const art = el('div', step === 1 || step === 3 ? 'l04-art h11-night' : 'l04-art');
      const img = el('img');
      img.src = room;
      img.alt = '';
      img.width = 1200;
      img.height = 800;
      art.append(img);
      const panel = el('section','l05-panel');
      const progress = el('progress','l04-progress');
      progress.max = last;
      progress.value = step;
      progress.setAttribute('aria-label',t.title);
      header.append(button(t.back, () => dialog.close(),'l05-back'), el('strong','',t.title), progress);
      const night = step === 1 || step === 3;
      const context = night ? t.night : t.morning;
      const meaning = night ? t.nightMeaning : t.morningMeaning;
      const phrase = words[night ? 0 : 1];
      if (step === 0) {
        panel.append(el('h1','',t.title),el('p','l05-text',t.intro),button(t.start,()=>go(1),'l05-primary'));
      } else if (step <= 2) {
        const recitation = el('p','h11-words',phrase);
        recitation.lang = 'ar';
        recitation.dir = 'rtl';
        panel.append(el('h1','',context),recitation,el('p','l05-text',meaning),button(t.next,()=>go(step + 1),'l05-primary'));
      } else if (step < last) {
        const actions = el('div','l05-actions');
        const feedback = el('p','l05-feedback');
        feedback.setAttribute('role','status');
        const choices = [words[1],words[0]];
        for (const choice of choices) {
          const answer = button(choice, () => {
            for (const option of actions.children) option.classList.remove('l05-wrong');
            if (choice !== phrase) {
              answer.classList.add('l05-wrong');
              feedback.textContent = t.retry;
              return;
            }
            for (const option of actions.children) option.disabled = true;
            answer.classList.add('l05-right');
            feedback.textContent = meaning;
            const next = button(t.next,()=>go(step + 1),'l05-primary');
            panel.append(next);
            next.focus();
          },'h11-choice');
          answer.lang = 'ar';
          answer.dir = 'rtl';
          actions.append(answer);
        }
        panel.append(el('h1','',context),el('p','l05-text',night ? t.nightQuestion : t.morningQuestion),actions,feedback);
      } else {
        const source = el('a','l04-verse',t.source);
        source.href = 'https://sunnah.com/bukhari:6324';
        source.target = '_blank';
        source.rel = 'noopener';
        panel.append(el('h1','',t.done),source,button(t.again,()=>go(0),'l05-primary'));
      }
      main.append(art,panel);
      shell.append(header,main);
      dialog.replaceChildren(shell);
      const heading = panel.querySelector('h1');
      heading.tabIndex = -1;
      if (dialog.open) heading.focus({preventScroll:true});
    }
    dialog.addEventListener('close', () => {dialog.remove();onClose?.();},{once:true});
    document.body.append(dialog);
    render();
    dialog.showModal();
    dialog.querySelector('h1').focus({preventScroll:true});
  }
  window.HUDHUDH11 = {open};
})();
