(() => {
  'use strict';
  const pose = (name, source) => ({name, source});
  const shared = {
    standing: pose('standing', 'm23'),
    bow: pose('bow', 'm23'),
    rising: pose('descent', 'm23'),
    upright: pose('upright', 'm23'),
    lower: pose('lower', 'm24'),
    prostrate: pose('prostrate', 'm24'),
    sit: pose('sit', 'm24')
  };
  const scene = (title, text, image, words) => ({title, text, image, words});
  const option = (label, correct, feedback, image) => ({label, correct, feedback, image});
  const quiz = (title, text, options, image) => ({title, text, options, image});
  const contact = (title, text, region) => ({...scene(title, text, shared.prostrate), region});
  const lessons = {
    m23: [
      scene('أنزل إلى الركوع', 'بعد القراءة في القيام، أبدأ الانحناء نحو الركوع بهدوء.', shared.rising, 'الله أكبر'),
      scene('أضع كفّيّ على ركبتيّ', 'أنحني من الوركين، وأضع كل كفّ على ركبة. أبسط ظهري وأجعل رأسي على امتداده.', shared.bow),
      quiz('أيّ صورة تُظهر الركوع؟', 'انظر إلى الظهر وموضع الكفّين.', [
        option('الصورة الأولى', false, 'هذا انحناء قليل، والكفّان ما زالتا على الفخذين.', pose('shallow','m23')),
        option('الصورة الثانية', true, 'الظهر مبسوط والكفّان على الركبتين.', shared.bow),
        option('الصورة الثالثة', false, 'لاحظ تقوّس الظهر. أبسط ظهري بقدر استطاعتي.', pose('rounded','m23'))
      ]),
      scene('أطمئنّ في الركوع', 'أستقرّ لحظة في هيئة الركوع وأقول بهدوء.', shared.bow, 'سبحان ربّي العظيم'),
      quiz('ماذا أقول في الركوع؟', 'اختر الذكر المناسب لهذه الهيئة.', [
        option('سبحان ربّي الأعلى', false, 'هذا ذكر السجود.'), option('سبحان ربّي العظيم', true, 'هذا ذكر الركوع.')
      ], shared.bow),
      scene('أرفع من الركوع', 'أرفع رأسي وجذعي حتى أعود إلى الوقوف. هذا تدريب على الصلاة منفرداً.', shared.rising, 'سمع الله لمن حمده'),
      scene('أعتدل قائماً', 'أقف باستقامة وأطمئنّ قبل النزول إلى السجود.', shared.upright, 'ربّنا ولك الحمد'),
      quiz('متى أنزل للسجود؟', 'تذكّر ما يأتي بعد رفع الرأس من الركوع.', [
        option('بعد أن أعتدل وأطمئنّ قائماً', true, 'أستقرّ في القيام أولاً.'), option('قبل أن أستقيم', false, 'أرفع حتى أعتدل قائماً أولاً.')
      ], shared.upright),
      quiz('أراجع ذكر الرفع', 'ماذا أقول وأنا أرفع من الركوع في هذا التدريب؟', [
        option('الله أكبر', false, 'نقول الله أكبر عند النزول إلى الركوع. لهذا الرفع ذكره.'), option('سمع الله لمن حمده', true, 'وعند الاعتدال أقول ربّنا ولك الحمد.')
      ], shared.rising)
    ],
    m24: [
      scene('أنزل إلى السجود', 'بعد أن أعتدل من الركوع وأطمئنّ، أهبط نحو الأرض بهدوء.', shared.lower, 'الله أكبر'),
      scene('أسجد على سبعة أعضاء', 'الجبهة مع الأنف، والكفّان، والركبتان، وأطراف أصابع القدمين. نعدّ الجبهة مع الأنف موضعاً واحداً.', shared.prostrate),
      contact('الجبهة مع الأنف', 'أضع الجبهة والأنف على الأرض برفق. هذا موضع واحد من السبعة.', 'head'),
      contact('الكفّان', 'أضع الكفّ اليمنى واليسرى على الأرض قرب الرأس، وأرفع المرفقين والساعدَين عن الأرض. أترك مساحة للذي يصلي بجانبي.', 'hands'),
      contact('الركبتان', 'أضع الركبة اليمنى واليسرى على الأرض وأستقرّ.', 'knees'),
      contact('أطراف القدمين', 'أضع أطراف أصابع القدم اليمنى واليسرى على الأرض. أتجه بها نحو القبلة بقدر استطاعتي.', 'feet'),
      quiz('أيّ صورة تُظهر هيئة السجود؟', 'انتبه إلى الساعدين وأطراف القدمين.', [
        option('الصورة الأولى', false, 'الساعدان ممدودان على الأرض. أرفعُهما وأُبقي الكفّين عليها.', pose('arms','m24')),
        option('الصورة الثانية', false, 'القدمان مرفوعتان. أضع أطراف أصابع القدمين على الأرض.', pose('feet','m24')),
        option('الصورة الثالثة', true, 'أطراف القدمين تلامس الأرض والساعدان مرفوعان.', shared.prostrate)
      ]),
      quiz('كم عضواً أضع على الأرض؟', 'الجبهة والأنف يُحسبان معاً. تذكّر الكفّين والركبتين والقدمين.', [
        option('سبعة', true, 'واحد للجبهة والأنف، واثنان لكلّ من الكفّين والركبتين والقدمين.'), option('أربعة', false, 'احسب اليمنى واليسرى كلاًّ على حدة.')
      ], shared.prostrate),
      scene('أطمئنّ في السجود', 'أستقرّ في السجود وأقول بهدوء.', shared.prostrate, 'سبحان ربّي الأعلى'),
      scene('أرفع وأجلس بين السجدتين', 'أرفع من السجود قائلاً «الله أكبر»، وأستقرّ جالساً وأضع كفّيّ على فخذيّ.', shared.sit, 'ربّ اغفر لي'),
      quiz('هل أسجد مجدداً فوراً؟', 'ما الخطوة بين السجدة الأولى والثانية؟', [
        option('أرفع رأسي قليلاً ثم أسجد', false, 'أجلس حتى أطمئنّ أولاً.'), option('أجلس وأطمئنّ ثم أسجد', true, 'الجلوس بهدوء يفصل بين السجدتين.')
      ], shared.sit),
      scene('أسجد السجدة الثانية', 'أنزل قائلاً «الله أكبر». أستقرّ في السجدة الثانية كما فعلت في الأولى.', shared.prostrate, 'سبحان ربّي الأعلى')
    ]
  };
  const root = document.querySelector('[data-prayer-lesson]');
  const id = root.dataset.prayerLesson;
  const steps = lessons[id];
  const key = 'hudhud-' + id + '-v1';
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}') || {}; }
    catch { return {}; }
  }
  const character = read('hudhud-home-profile-v1').character === 'girl' ? 'girl' : 'boy';
  const saved = read(key);
  let index = Number.isInteger(saved.step) ? Math.min(steps.length - 1, Math.max(0, saved.step)) : 0;
  let complete = saved.complete === true && saved.replaying !== true;
  const imageUrl = image => 'assets/' + image.source + '/' + character + '-' + image.name + '.webp';
  function save() {
    try { localStorage.setItem(key, JSON.stringify({step:index, complete:complete || saved.complete === true, replaying:!complete && saved.complete === true})); }
    catch {}
  }
  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };
  function makeImage(image, alt) {
    const img = create('img');
    img.src = imageUrl(image);
    img.alt = alt;
    img.width = 1448;
    img.height = 1086;
    return img;
  }
  function render(focus = false) {
    const step = steps[index];
    const heading = create('h2', '', complete ? 'أنهيت الدرس' : step.title);
    heading.tabIndex = -1;
    const content = create('section','prayer-content');
    const body = create('div','prayer-body');
    const foot = create('footer','prayer-footer');
    const feedback = create('p','prayer-feedback');
    feedback.setAttribute('role','status');
    const next = create('button','prayer-next',complete ? 'أعيد التدريب' : index === steps.length - 1 ? 'أنهي الدرس' : 'أكمل');
    next.type = 'button';
    next.disabled = !complete && Boolean(step.options);
    next.onclick = () => {
      if (complete) {
        saved.complete = true;
        complete = false;
        index = 0;
      } else if (index === steps.length - 1) complete = true;
      else index++;
      save();
      render(true);
    };
    content.append(heading);
    if (complete) {
      body.append(create('p','','يمكنك مراجعة الدرس أو العودة إلى اللعبة.'));
    } else {
      body.append(create('p','prayer-instruction',step.text));
      if (step.words) body.append(create('p','prayer-words',step.words));
      if (step.image) {
        const figure = create('figure','prayer-scene');
        figure.append(makeImage(step.image,step.title));
        if (step.region) {
          const marker = create('span','prayer-marker prayer-marker-' + character + '-' + step.region);
          marker.setAttribute('aria-hidden','true');
          figure.append(marker);
        }
        body.append(figure);
      }
      if (step.options) {
        const choices = create('div',step.options[0].image ? 'prayer-choices prayer-visual-choices' : 'prayer-choices');
        for (const item of step.options) {
          const button = create('button','prayer-choice');
          button.type = 'button';
          if (item.image) {
            const detail = makeImage(item.image,'');
            detail.src = imageUrl(item.image).replace('.webp','-detail.webp');
            detail.width = 560;
            detail.height = 450;
            button.append(detail);
          }
          button.append(create('span','',item.label));
          button.onclick = () => {
            for (const choice of choices.children) choice.removeAttribute('data-result');
            button.dataset.result = item.correct ? 'correct' : 'retry';
            feedback.textContent = item.feedback;
            next.disabled = !item.correct;
          };
          choices.append(button);
        }
        body.append(choices);
      }
    }
    foot.append(feedback,next);
    content.append(body,foot);
    root.replaceChildren(content);
    if (focus) heading.focus({preventScroll:true});
  }
  render();
})();
