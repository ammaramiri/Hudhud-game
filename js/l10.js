(() => {
  'use strict';
  const key = 'hudhud-l10-v1';
  const room = 'assets/l10/quran-room-v1.webp';
  const lessons = {
    ar: {
      title: 'أعتني بالمصحف', back: 'إلى المكتبة', start: 'أبدأ', next: 'أكمل', done: 'أحسنت العناية بالمصحف', again: 'أعيد التمرين',
      intro: 'هذه غرفة القراءة في جناح القرآن. هنا أقرأ بهدوء وأحافظ على المصحف.',
      questions: [
        ['أستعدّ للقراءة', 'على يديّ أثر طعام. ماذا أفعل؟', 'أنظّف يديّ وأجفّفهما', 'أفتح المصحف بيديّ كما هما', 'أنظّف يديّ وأجفّفهما حتى تبقى الصفحات نظيفة.'],
        ['أختار مكاناً للقراءة', 'أين أضع المصحف وأنا أقرأ؟', 'على الحامل النظيف والثابت', 'بجوار كوب ماء مفتوح', 'أضعه على الحامل وأبعد عنه الماء والطعام.'],
        ['أقلّب الصفحة', 'كيف أنتقل إلى الصفحة التالية؟', 'أقلّب الصفحة برفق', 'أشدّ الصفحة بسرعة', 'أقلّب الورق برفق حتى لا يتمزّق.'],
        ['أعيده إلى مكانه', 'انتهيت من القراءة. ماذا أفعل؟', 'أغلقه وأعيده إلى رفّ نظيف وآمن', 'أتركه عند المدخل في طريق المارّة', 'أغلق المصحف وأعيده إلى مكانه حتى يبقى محفوظاً.']
      ],
      retry: 'حاول مرة أخرى. اختر التصرف الذي يحافظ على المصحف.'
    },
    en: {
      title: 'I care for the Mushaf', back: 'Back to the library', start: 'Begin', next: 'Continue', done: 'You cared for the Mushaf', again: 'Practise again',
      intro: 'This is the reading room in the Quran wing. Here I read quietly and care for the Mushaf.',
      questions: [
        ['Get ready to read', 'There is food on my hands. What should I do?', 'Clean and dry my hands', 'Open the Mushaf as I am', 'I clean and dry my hands to keep the pages clean.'],
        ['Choose a place to read', 'Where should I put the Mushaf while reading?', 'On the clean, stable stand', 'Next to an open cup of water', 'I use the stand and keep drinks and food away.'],
        ['Turn the page', 'How should I go to the next page?', 'Turn the page gently', 'Pull the page quickly', 'I turn the page gently so it will not tear.'],
        ['Put it back', 'I have finished reading. What should I do?', 'Close it and return it to a clean, safe shelf', 'Leave it in the entrance where people walk', 'I close the Mushaf and return it to its place for safekeeping.']
      ],
      retry: 'Try again. Choose the action that looks after the Mushaf.'
    },
    de: {
      title: 'Ich achte auf den Mushaf', back: 'Zurück zur Bibliothek', start: 'Beginnen', next: 'Weiter', done: 'Du hast gut auf den Mushaf geachtet', again: 'Noch einmal üben',
      intro: 'Das ist der Leseraum im Koranflügel. Hier lese ich in Ruhe und achte auf den Mushaf.',
      questions: [
        ['Zum Lesen vorbereiten', 'Ich habe Essensreste an den Händen. Was mache ich?', 'Meine Hände reinigen und abtrocknen', 'Den Mushaf so öffnen', 'Ich reinige und trockne meine Hände, damit die Seiten sauber bleiben.'],
        ['Einen Leseplatz wählen', 'Wo lege ich den Mushaf beim Lesen ab?', 'Auf dem sauberen und stabilen Lesepult', 'Neben einem offenen Becher mit Wasser', 'Ich nutze das Lesepult und halte Essen und Getränke fern.'],
        ['Die Seite umblättern', 'Wie komme ich zur nächsten Seite?', 'Die Seite vorsichtig umblättern', 'Schnell an der Seite ziehen', 'Ich blättere vorsichtig um, damit das Papier nicht reißt.'],
        ['Zurückstellen', 'Ich habe fertig gelesen. Was mache ich?', 'Schließen und ins saubere, sichere Regal stellen', 'Im Eingangsbereich liegen lassen', 'Ich schließe den Mushaf und stelle ihn an seinen Platz zurück.']
      ],
      retry: 'Versuche es noch einmal. Wähle die Handlung, die den Mushaf schützt.'
    }
  };
  function read() {
    try { return JSON.parse(localStorage.getItem(key) || '{}') || {}; }
    catch { return {}; }
  }
  function open({lang = 'ar', onClose, onComplete} = {}) {
    if (document.querySelector('.l10-dialog[open]')) return;
    const t = lessons[lang] || lessons.ar;
    const state = read();
    const last = t.questions.length + 1;
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
    const dialog = el('dialog', 'l05-dialog l04-dialog l10-dialog');
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
      const art = el('div','l04-art');
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
      const question = t.questions[step - 1];
      if (step === 0) {
        panel.append(el('h1','',t.title),el('p','l05-text',t.intro),button(t.start,()=>go(1),'l05-primary'));
      } else if (question) {
        const [heading, prompt, correct, wrong, explanation] = question;
        const actions = el('div','l05-actions');
        const feedback = el('p','l05-feedback');
        feedback.setAttribute('role','status');
        const choices = step % 2 ? [correct, wrong] : [wrong, correct];
        for (const choice of choices) {
          const answer = button(choice, () => {
            for (const option of actions.children) option.classList.remove('l05-wrong');
            if (choice !== correct) {
              answer.classList.add('l05-wrong');
              feedback.textContent = t.retry;
              return;
            }
            for (const option of actions.children) option.disabled = true;
            answer.classList.add('l05-right');
            feedback.textContent = explanation;
            const next = button(t.next,()=>go(step + 1),'l05-primary');
            panel.append(next);
            next.focus();
          },'l10-choice');
          actions.append(answer);
        }
        panel.append(el('h1','',heading),el('p','l05-text',prompt),actions,feedback);
      } else {
        panel.append(el('h1','',t.done),button(t.again,()=>go(0),'l05-primary'));
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
  window.HUDHUDL10 = {open};
})();
