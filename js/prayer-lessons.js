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
  const scene = (title, text, image, words, repeat) => ({title, text, image, words, repeat});
  const option = (label, correct, feedback, image) => ({label, correct, feedback, image});
  const quiz = (title, text, options, image) => ({title, text, options, image});
  const contact = (title, text, region) => ({...scene(title, text, shared.prostrate), region});
  const salamRight = pose('salam-right','m27');
  const salamLeft = pose('salam-left','m27');
  const salam = 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ';
  const checkMove = (title, image, correct, wrong, feedback, retry, correctFirst = true) => {
    const yes = option(correct,true,feedback);
    const no = option(wrong,false,retry);
    return quiz(title,'اختر الحركة التالية.',correctFirst ? [yes,no] : [no,yes],image);
  };
  const iftirash = pose('iftirash','m29');
  const tawarruk = pose('tawarruk','m29');
  const kneeling = pose('wrong','m29');
  const finger = pose('finger','m29');
  const fatiha = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ';
  const refuge = 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ';
  const reading = [
    scene('أقرأ الفاتحة', 'أقرأ سورة الفاتحة وأنا قائم.', shared.standing, fatiha),
    scene('آمين', 'أقول آمين بعد الفاتحة.', shared.standing, 'آمِين'),
    scene('أقرأ ما تيسّر', 'أقرأ بعد الفاتحة ما تيسّر من القرآن. هذا مثال من سورة الإخلاص.', shared.standing, 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ')
  ];
  const practiceUnit = [
    ...reading,
    checkMove('بعد القراءة',shared.standing,'أركع','أسجد','أكبّر وأنزل إلى الركوع.','الركوع يأتي بعد القيام.',false),
    scene('أستقرّ في الركوع','أطمئنّ قبل أن أرفع.',shared.bow,'سُبْحَانَ رَبِّيَ الْعَظِيمِ','ثلاث مرات'),
    checkMove('في الركوع',shared.bow,'أرفع وأعتدل','أجلس للتشهّد','أرفع من الركوع.','بعد الركوع أعود إلى القيام.'),
    scene('أرفع من الركوع','أقول هذا الذكر عند الرفع.',shared.rising,'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ'),
    scene('أعتدل قائماً','أطمئنّ وأنا قائم.',shared.upright,'رَبَّنَا وَلَكَ الْحَمْدُ'),
    checkMove('بعد الاعتدال',shared.upright,'أسجد السجدة الأولى','أركع مرة أخرى','أكبّر وأنزل للسجود.','بعد الاعتدال تأتي السجدة الأولى.',false),
    scene('السجدة الأولى','أطمئنّ في السجود.',shared.prostrate,'سُبْحَانَ رَبِّيَ الْأَعْلَى','ثلاث مرات'),
    checkMove('بعد السجدة الأولى',shared.prostrate,'أجلس بين السجدتين','أسجد مباشرة','أكبّر وأجلس مطمئنّاً.','أجلس وأطمئنّ بين السجدتين.'),
    scene('أجلس بين السجدتين','أستقرّ جالساً وأدعو.',shared.sit,'رَبِّ اغْفِرْ لِي'),
    checkMove('بعد الجلوس',shared.sit,'أسجد السجدة الثانية','أنهض إلى القيام','أكبّر وأسجد السجدة الثانية.','بقيت السجدة الثانية قبل أن أُكمل الركعة.',false),
    scene('السجدة الثانية','أطمئنّ في السجدة الثانية.',shared.prostrate,'سُبْحَانَ رَبِّيَ الْأَعْلَى','ثلاث مرات')
  ];
  const tahiyyat = [
    'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ',
    'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ',
    'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ'
  ];
  const salawat = [
    'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
    'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ'
  ];
  const lessons = {
    m23: [
      scene('أنزل إلى الركوع', 'بعد القراءة في القيام، أبدأ الانحناء نحو الركوع بهدوء.', shared.rising, 'الله أكبر'),
      scene('أضع كفّيّ على ركبتيّ', 'أنحني من الوركين، وأضع كل كفّ على ركبة. أبسط ظهري وأجعل رأسي على امتداده.', shared.bow),
      quiz('أيّ صورة تُظهر الركوع؟', 'انظر إلى الظهر وموضع الكفّين.', [
        option('الصورة الأولى', false, 'هذا انحناء قليل، والكفّان ما زالتا على الفخذين.', pose('shallow','m23')),
        option('الصورة الثانية', true, 'الظهر مبسوط والكفّان على الركبتين.', shared.bow),
        option('الصورة الثالثة', false, 'لاحظ تقوّس الظهر. أبسط ظهري بقدر استطاعتي.', pose('rounded','m23'))
      ]),
      scene('أطمئنّ في الركوع', 'أستقرّ لحظة في هيئة الركوع وأقول بهدوء.', shared.bow, 'سبحان ربّي العظيم', 'ثلاث مرات'),
      quiz('ماذا أقول في الركوع؟', 'اختر الذكر المناسب لهذه الهيئة.', [
        option('سبحان ربّي الأعلى', false, 'هذا ذكر السجود.'), option('سبحان ربّي العظيم', true, 'هذا ذكر الركوع. نردّده ثلاث مرات في هذا التدريب.')
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
      scene('أطمئنّ في السجود', 'أستقرّ في السجود وأقول بهدوء.', shared.prostrate, 'سبحان ربّي الأعلى', 'ثلاث مرات'),
      scene('أرفع وأجلس بين السجدتين', 'أرفع من السجود قائلاً «الله أكبر»، وأستقرّ جالساً وأضع كفّيّ على فخذيّ.', shared.sit, 'ربّ اغفر لي'),
      quiz('هل أسجد مجدداً فوراً؟', 'ما الخطوة بين السجدة الأولى والثانية؟', [
        option('أرفع رأسي قليلاً ثم أسجد', false, 'أجلس حتى أطمئنّ أولاً.'), option('أجلس وأطمئنّ ثم أسجد', true, 'الجلوس بهدوء يفصل بين السجدتين.')
      ], shared.sit),
      scene('أسجد السجدة الثانية', 'أنزل قائلاً «الله أكبر». أستقرّ في السجدة الثانية كما فعلت في الأولى.', shared.prostrate, 'سبحان ربّي الأعلى', 'ثلاث مرات')
    ],
    m25: [
      scene('من القيام إلى الركوع', 'هذه مراجعة للركعة الأولى. بعد القراءة وأنا قائم، أنزل إلى الركوع.', shared.standing, 'الله أكبر'),
      scene('أستقرّ في الركوع', 'أضع كفّيّ على ركبتيّ وأطمئنّ.', shared.bow, 'سبحان ربّي العظيم', 'ثلاث مرات'),
      quiz('ما الحركة التالية؟', 'أتممت الركوع. اختر ما تفعله الآن.', [
        option('أنزل إلى السجود فوراً', false, 'قبل السجود أرفع من الركوع وأعتدل قائماً.'),
        option('أرفع من الركوع وأعتدل قائماً', true, 'أقول عند الرفع: سمع الله لمن حمده، ثم أقول في الاعتدال: ربّنا ولك الحمد.')
      ], shared.rising),
      scene('السجدة الأولى', 'بعد أن أطمئنّ قائماً، أنزل مكبّراً وأسجد.', shared.prostrate, 'سبحان ربّي الأعلى', 'ثلاث مرات'),
      quiz('ماذا أفعل بين السجدتين؟', 'أرفع رأسي من السجدة الأولى وأقول الله أكبر.', [
        option('أجلس وأطمئنّ', true, 'أجلس وأقول: ربّ اغفر لي.'),
        option('أقف للركعة التالية', false, 'بقيت السجدة الثانية. أجلس أولاً.')
      ], shared.sit),
      scene('السجدة الثانية', 'أنزل مكبّراً من الجلوس إلى السجدة الثانية.', shared.prostrate, 'سبحان ربّي الأعلى', 'ثلاث مرات'),
      quiz('أين تنتهي الركعة الأولى؟', 'اختر الترتيب الكامل لما بعد الاعتدال من الركوع.', [
        option('سجدة ثم قيام', false, 'في الركعة سجدتان وبينهما جلوس.'),
        option('سجدة، جلوس، سجدة', true, 'هكذا تكتمل الركعة الأولى.')
      ], shared.prostrate)
    ],
    m26: [
      quiz('أبدأ الركعة الثانية', 'انتهت السجدة الثانية من الركعة الأولى. ماذا أفعل؟', [
        option('أنهض للركعة الثانية', true, 'أقول الله أكبر وأنا أنهض إلى القيام.'),
        option('أسجد سجدة ثالثة', false, 'اكتملت السجدتان. الآن أنهض للركعة الثانية.')
      ], shared.prostrate),
      scene('أقف وأقرأ', 'أستقيم قائماً وأقرأ الفاتحة في الركعة الثانية.', shared.standing),
      quiz('هل أبدأ بتكبيرة الإحرام مرة أخرى؟', 'أنا الآن قائم في الركعة الثانية.', [
        option('أعيد تكبيرة الإحرام', false, 'تكبيرة الإحرام كانت في بداية الصلاة.'),
        option('أتابع صلاتي وأقرأ الفاتحة', true, 'أنا في الصلاة بالفعل. أتابع الركعة الثانية.')
      ], shared.standing),
      scene('أركع بعد القراءة', 'أقول «الله أكبر» وأنا أنزل إلى الركوع، ثم أطمئنّ فيه.', shared.bow, 'سبحان ربّي العظيم', 'ثلاث مرات'),
      scene('أرفع وأعتدل', 'أقول «سمع الله لمن حمده» عند الرفع في هذا التدريب على الصلاة منفرداً.', shared.upright, 'ربّنا ولك الحمد'),
      scene('أسجد السجدة الأولى', 'بعد الاعتدال أقول «الله أكبر» وأنزل للسجود.', shared.prostrate, 'سبحان ربّي الأعلى', 'ثلاث مرات'),
      scene('أجلس بين السجدتين', 'أرفع من السجود مكبّراً، وأجلس وأطمئنّ.', shared.sit, 'ربّ اغفر لي'),
      scene('أسجد السجدة الثانية', 'أنزل مكبّراً وأسجد مرة ثانية.', shared.prostrate, 'سبحان ربّي الأعلى', 'ثلاث مرات'),
      quiz('أجلس للتشهّد', 'بعد الركعة الثانية أجلس للتشهّد. في الصلوات الخمس حال الإقامة، في الفجر هذا التشهّد الأخير، وفي الظهر والعصر والمغرب والعشاء هذا التشهّد الأول.', [
        option('أنهض فوراً', false, 'أجلس للتشهّد أولاً. أكمل ما تبقّى من الركعات إن كانت الصلاة أكثر من ركعتين.'),
        option('أجلس للتشهّد', true, 'في الفجر أجلس للتشهّد الأخير، وفي بقية الصلوات المفروضة حال الإقامة أجلس للتشهّد الأول ثم أقوم للركعة الثالثة.')
      ], shared.sit)
    ],
    m29: [
      scene('أنظر إلى الجلسة من الخلف','هذه هيئة الافتراش: أجلس على قدمي اليسرى المفروشة، وأنصب اليمنى وأوجّه أصابعها إلى القبلة بقدر استطاعتي.',iftirash),
      scene('أتعرّف إلى التورّك','في هذه الصفة من التورّك أجلس على الأرض وأُخرج اليسرى من تحت ساقي اليمنى. تفاصيل موضع التورّك تختلف باختلاف الصفة والمذهب.',tawarruk),
      quiz('أيّ صورة فيها جلوس مستقر؟','انظر إلى موضع الوركين. اختر هيئة الجلوس في الصورتين.',[
        option('الصورة الأولى',false,'ما زالت الشخصية على ركبتيها ووركاها مرفوعين. اجلس حتى تطمئنّ.',kneeling),
        option('الصورة الثانية',true,'هنا استقرّت الشخصية في الجلوس.',iftirash)
      ]),
      scene('أشير بالسبّابة','أضع يدي اليمنى على فخذي أو ركبتي، وأشير بسبّابة اليمنى في التشهّد. وردت صفات للإشارة، فلا نحكم على الصلاة من وقت حركة الإصبع وحده.',finger),
      quiz('أيّ إصبع أستخدم؟','انظر إلى اليد اليمنى في الصورة.',[
        option('السبّابة',true,'السبّابة هي الإصبع المجاورة للإبهام.'),
        option('الخنصر',false,'الخنصر هو الإصبع الصغيرة. الإشارة بالسبّابة.')
      ],finger)
    ],
    m30: [
      scene('أجلس للتشهّد الأول','في صلاة المغرب أو صلاة رباعية في الإقامة، أجلس بعد الركعة الثانية. نتدرّب هنا على صلاة المغرب. أقول التحيات هنا وفي التشهّد الأخير.',iftirash),
      ...tahiyyat.map((words,i)=>scene(['أبدأ التحيات','أكمل السلام','أقول الشهادتين'][i],'أقرأ وأنا جالس مطمئنّاً.',shared.sit,words)),
      quiz('إلى أين بعد التشهّد الأول؟','أنا في صلاة المغرب. فرغت من التشهّد الأول.',[
        option('أسلّم الآن',false,'بقيت ركعة في المغرب.'),
        option('أقوم للركعة الثالثة',true,'أقول الله أكبر وأنا أنهض لإكمال الصلاة.')
      ],iftirash)
    ],
    m27: [
      scene('أجلس للتشهّد', 'أجلس بطمأنينة بعد السجدة الثانية من الركعة الثانية. نتدرّب على الجلوس الأخير في صلاة الفجر، ونستعمل الافتراش في هذا المثال.', iftirash),
      scene('أبدأ التحيات', 'اقرأ هذا الجزء بهدوء وأنت جالس.', shared.sit, 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ'),
      scene('أتابع التشهّد', 'أكمل التحيات بهذا الجزء.', shared.sit, 'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ'),
      scene('أنطق بالشهادتين', 'أختم التشهّد بالشهادتين.', shared.sit, 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ'),
      scene('أصلّي على النبي ﷺ', 'في التشهّد الأخير أقرأ الصلاة الإبراهيمية. ابدأ بهذا الجزء.', shared.sit, 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ'),
      scene('أكمل الصلاة الإبراهيمية', 'أقرأ الجزء الثاني قبل التسليم.', shared.sit, 'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ'),
      scene('أستعيذ بالله قبل التسليم','بعد التشهّد والصلاة الإبراهيمية أقرأ هذا الدعاء.',shared.sit,refuge),
      quiz('متى أسلّم؟', 'تذكّر الفرق بين التشهّد الأول والأخير.', [
        option('بعد التشهّد الأول في صلاة المغرب', false, 'بعد التشهّد الأول في المغرب أقوم للركعة الثالثة.'),
        option('في ختام الصلاة، بعد التشهّد الأخير', true, 'التسليم في ختام الصلاة.')
      ], shared.sit),
      scene('أسلّم إلى يميني', 'ألتفت برأسي إلى يميني وأنا جالس.', salamRight, salam),
      scene('أسلّم إلى يساري', 'ثم ألتفت برأسي إلى يساري.', salamLeft, salam),
      quiz('أتذكّر ترتيب التسليم', 'أيّ جهة أبدأ بها؟', [
        option('يميني ثم يساري', true, 'صحيح، اليمين ثم اليسار.'),
        option('يساري ثم يميني', false, 'ابدأ بالتسليم إلى يمينك.')
      ], shared.sit)
    ],
    m28: [
      checkMove('أبدأ صلاة الفجر',shared.upright,'أستحضر النيّة وأكبّر تكبيرة الإحرام','أبدأ بالسجود','أبدأ قائماً وأقول الله أكبر، ثم أقرأ.','بداية الصلاة تكون بالقيام والتكبير للقادر.'),
      ...practiceUnit,
      checkMove('أتممت الركعة الأولى',shared.prostrate,'أقوم للركعة الثانية','أسلّم','أقوم مكبّراً وأقرأ الفاتحة في الركعة الثانية.','بقيت الركعة الثانية.',false),
      ...practiceUnit,
      checkMove('أتممت الركعة الثانية من الفجر',shared.prostrate,'أجلس للتشهّد الأخير','أقف للركعة الثالثة','أجلس وأقرأ التشهّد والصلاة الإبراهيمية.','صلاة الفجر ركعتان.'),
      ...tahiyyat.map(words=>scene('أقرأ التشهّد','أقرأ وأنا جالس مطمئنّاً.',shared.sit,words)),
      ...salawat.map(words=>scene('أقرأ الصلاة الإبراهيمية','أقرأ هذا الجزء قبل التسليم.',shared.sit,words)),
      scene('أستعيذ بالله','أدعو قبل التسليم.',shared.sit,refuge),
      checkMove('بعد التشهّد الأخير',shared.sit,'أسلّم إلى يميني أولاً','أقوم مرة أخرى','أقول: '+salam+' إلى يميني.','الآن أختم الصلاة بالتسليم.',false),
      scene('أسلّم إلى يميني','ألتفت إلى يميني وأنا جالس.',salamRight,salam),
      checkMove('بعد التسليم إلى اليمين',salamRight,'أسلّم إلى يساري','أعود إلى الركوع','أقول: '+salam+' إلى يساري. انتهت الصلاة.','بقي التسليم إلى اليسار.'),
      scene('أسلّم إلى يساري', 'ألتفت إلى يساري وأنا جالس.', salamLeft, salam),
      scene('أتممت صلاة الفجر', 'صلّيت ركعتين بالترتيب، وختمت الصلاة بالتشهّد الأخير والتسليم.', salamLeft)
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
  if (saved.revision !== 2 && ['m27','m28'].includes(id) && !saved.complete) saved.step=0;
  let index = Number.isInteger(saved.step) ? Math.min(steps.length - 1, Math.max(0, saved.step)) : 0;
  let complete = saved.complete === true && saved.replaying !== true;
  const imageUrl = image => 'assets/' + image.source + '/' + character + '-' + image.name + '.webp';
  function save() {
    try { localStorage.setItem(key, JSON.stringify({revision:2,step:index, complete:complete || saved.complete === true, replaying:!complete && saved.complete === true})); }
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
    const content = create('section',complete ? 'prayer-content prayer-complete' : 'prayer-content');
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
      const following = {
        m25: ['m26','أُكمل الركعة الثانية'],
        m26: ['m29','جلسة التشهّد والإشارة بالسبّابة'],
        m29: ['m30','التشهّد الأول'],
        m30: ['m27','التشهّد الأخير والتسليم'],
        m27: ['m28','أصلّي ركعتين بنفسي']
      }[id];
      if (following) {
        const nextLesson = create('a','',following[1]);
        nextLesson.href = following[0] + '-stage-preview.html';
        body.append(nextLesson);
      }
    } else {
      body.append(create('p','prayer-instruction',step.text));
      if (step.words) {
        const words = create('p','prayer-words',step.words);
        if (step.words.length > 75) words.classList.add('prayer-words-long');
        if (step.repeat) words.append(create('span','prayer-repeat',step.repeat));
        body.append(words);
      }
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
            if (item.image.source !== 'm29') detail.src = imageUrl(item.image).replace('.webp','-detail.webp');
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
