const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const storageKey = "sana-sport-content";

document.querySelectorAll(".topbar .social").forEach((social) => {
  social.innerHTML =
    '<a class="social__link social__link--whatsapp" href="https://wa.me/77470947197" target="_blank" rel="noopener" aria-label="Написать в WhatsApp"><svg aria-hidden="true"><use href="images/social-icons.svg#whatsapp"></use></svg></a><a class="social__link social__link--instagram" href="https://www.instagram.com/sanasportkz/" target="_blank" rel="noopener" aria-label="Открыть Instagram Sana Sport"><svg aria-hidden="true"><use href="images/social-icons.svg#instagram"></use></svg></a>';
});

const languageQuery = new URLSearchParams(window.location.search).get("lang");
const activeLanguage = languageQuery === "kz" ? "kz" : "ru";

function languageUrl(language) {
  const url = new URL(window.location.href);
  url.hash = "";
  if (language === "kz") url.searchParams.set("lang", "kz");
  else url.searchParams.delete("lang");
  return `${url.pathname.split("/").pop() || "index.html"}${url.search}${url.hash}`;
}

function translateTextNodes(translations) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parentTag = node.parentElement?.tagName;
      return parentTag === "SCRIPT" || parentTag === "STYLE"
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const source = node.nodeValue;
    const trimmed = source.trim();
    const translated = translations[trimmed];
    if (translated) node.nodeValue = source.replace(trimmed, translated);
  });

  document.querySelectorAll("[placeholder], [aria-label]").forEach((element) => {
    ["placeholder", "aria-label"].forEach((attribute) => {
      const source = element.getAttribute(attribute);
      if (source && translations[source]) element.setAttribute(attribute, translations[source]);
    });
  });
}

function enableKazakhLanguage() {
  const translations = {
    "НАПРАВЛЕНИЯ": "БАҒЫТТАР",
    "О НАС": "БІЗ ТУРАЛЫ",
    "ТАРИФЫ": "ТАРИФТЕР",
    "ДЛЯ РОДИТЕЛЕЙ": "АТА-АНАЛАРҒА",
    "СОТРУДНИЧЕСТВО": "ЫНТЫМАҚТАСТЫҚ",
    "НОВОСТИ": "ЖАҢАЛЫҚТАР",
    "КОНТАКТЫ": "БАЙЛАНЫС",
    "НОВОЕ": "ЖАҢА",
    "Направления": "Бағыттар",
    "О нас": "Біз туралы",
    "Тарифы": "Тарифтер",
    "Для родителей": "Ата-аналарға",
    "Аренда": "Жалға алу",
    "Новости": "Жаңалықтар",
    "Контакты": "Байланыс",
    "Личный кабинет": "Жеке кабинет",
    "Главная": "Басты бет",
    "Меню": "Мәзір",
    "Другое": "Басқа",
    "Политика конфиденциальности": "Құпиялылық саясаты",
    "Правила посещения центра": "Орталыққа келу ережелері",
    "Оферта": "Жария оферта",
    "Политика обработки данных": "Деректерді өңдеу саясаты",
    "Спорт": "Спорт",
    "Творчество": "Шығармашылық",
    "Образование": "Білім",
    "Все": "Барлығы",
    "Подробнее →": "Толығырақ →",
    "Все тарифы →": "Барлық тарифтер →",
    "Перейти в магазин": "Дүкенге өту",
    "Тренеры и преподаватели": "Жаттықтырушылар мен оқытушылар",
    "Вопрос-ответ": "Сұрақ-жауап",
    "Отправить заявку": "Өтінім жіберу",
    "Ваше имя": "Атыңыз",
    "Телефон родителя": "Ата-ананың телефоны",
    "Закрыть": "Жабу",
    "Связаться с нами": "Бізбен байланысу",
    "Связаться с администратором": "Әкімшімен байланысу",
    "Задать вопрос": "Сұрақ қою",
    "Узнать больше →": "Көбірек білу →",
    "Читать новость": "Жаңалықты оқу",
    "Заказать товар": "Тауарға тапсырыс беру",
    "Все товары": "Барлық тауарлар",
    "Одежда": "Киім",
    "Экипировка": "Жабдық",
    "Сувениры": "Кәдесыйлар",
    "Рекомендации для родителей": "Ата-аналарға арналған кеңестер",
    "Памятка для родителей": "Ата-аналарға арналған жадынама",
    "Правила посещения": "Келу ережелері",
    "Пропуски и заморозка": "Сабақты жіберу және мұздату",
    "Безопасность детей": "Балалардың қауіпсіздігі",
    "Остались вопросы?": "Сұрақтарыңыз бар ма?",
    "Аренда и партнёрство": "Жалға алу және серіктестік",
    "Аренда поля и залов": "Алаң мен залдарды жалға алу",
    "Корпоративные предложения": "Корпоративтік ұсыныстар",
    "Размещение рекламы": "Жарнама орналастыру",
    "Оставить заявку на аренду": "Жалға алуға өтінім қалдыру",
    "Мы всегда на связи": "Біз әрдайым байланыстамыз",
    "Аренда и сотрудничество": "Жалға алу және ынтымақтастық",
    "Подробнее об аренде": "Жалға алу туралы толығырақ",
    "Найти": "Табу",
    "Открыть в Яндекс.Картах ↗": "Яндекс.Карталарда ашу ↗",
    "Фирменный мерч Sana Sport": "Sana Sport фирмалық мерчі",
    "Что происходит в Sana Sport": "Sana Sport-та не болып жатыр",
    "Более 20 кружков и секций": "20-дан астам үйірме мен секция",
    "Рисование": "Сурет салу",
    "Жас аспаз": "Жас аспаз",
    "Мастерская \"Еңбек\"": "«Еңбек» шеберханасы",
    "Домбыра": "Домбыра",
    "Фортепиано": "Фортепиано",
    "Вокал": "Вокал",
    "Художественная гимнастика": "Көркем гимнастика",
    "Хореография": "Хореография",
    "Робототехника": "Робототехника",
    "Английский язык": "Ағылшын тілі",
    "Группы продленного дня": "Ұзартылған күн топтары",
    "Подготовка к школе": "Мектепке даярлық",
    "Казахский язык": "Қазақ тілі",
    "ИИ-инженерия": "ЖИ-инженерия",
    "Футбол": "Футбол",
    "Волейбол": "Волейбол",
    "Баскетбол": "Баскетбол",
    "Джиу-джитсу": "Джиу-джитсу",
    "Шахматы": "Шахмат",
    "Настольный теннис": "Үстел теннисі",
    "Бокс": "Бокс",
    "Дзюдо": "Дзюдо",
    "Карате": "Каратэ",
    "Муай-тай": "Муай-тай",
    "Тхэквондо": "Таэквондо",
    "Выбрать": "Таңдау",
    "Sana Sport — семейный спортивный центр": "Sana Sport — отбасылық спорт орталығы",
    "Sana Sport — Семейный": "Sana Sport — отбасылық",
    "спортивный центр": "спорт орталығы",
    "Более 20 кружков спорта, творчества и образования": "Спорт, шығармашылық және білім бойынша 20-дан астам үйірме",
    "на 10 000 м². Один центр — весь день ребёнка.": "10 000 м² аумақта. Бір орталық — балаңыздың толық күні.",
    "Записаться на пробное занятие": "Сынақ сабағына жазылу",
    "Купить абонемент": "Абонемент сатып алу",
    "мест для детей": "балаларға арналған орын",
    "площадь комплекса": "кешен аумағы",
    "кружков и секций": "үйірме мен секция",
    "направлений спорта": "спорт бағыты",
    "направлений творчества": "шығармашылық бағыты",
    "Комфортная и безопасная среда": "Жайлы әрі қауіпсіз орта",
    "Sana Sport — флагман среди спорткомплексов Астаны. Эргономичный дизайн, продуманная инфраструктура и лучшие технологии — полный комфорт для ребёнка на всех 10 000 м² центра.": "Sana Sport — Астана спорт кешендерінің көшбасшысы. Эргономикалық дизайн, ойластырылған инфрақұрылым және үздік технологиялар баланың орталықтағы 10 000 м² аумақта өзін жайлы сезінуіне жағдай жасайды.",
    "Дети учатся находить радость в движении и здоровом образе жизни: командные игры, единоборства, настольный теннис.": "Балалар қимыл-қозғалыс пен салауатты өмір салтынан қуаныш табуды үйренеді: командалық ойындар, жекпе-жек және үстел теннисі.",
    "Возможность открыть в себе новое: рисование, музыка, хореография, робототехника.": "Өзіңізден жаңа қыр ашуға мүмкіндік: сурет, музыка, хореография және робототехника.",
    "Знания и навыки, которые помогают расти: языки, подготовка к школе, продлёнка.": "Өсуге көмектесетін білім мен дағдылар: тілдер, мектепке даярлық және ұзартылған күн тобы.",
    "Командные виды спорта": "Командалық спорт түрлері",
    "Единоборства / бокс": "Жекпе-жек / бокс",
    "Индивидуально и в группах": "Жеке және топпен",
    "Все возрастные группы": "Барлық жас топтары",
    "Худи, кепки и рюкзаки с символикой центра.": "Орталықтың символикасы бар худи, кепка және рюкзактар.",
    "Мастера спорта, призёры турниров, обладатели чёрных поясов": "Спорт шеберлері, турнир жүлдегерлері, қара белбеу иелері",
    "и педагоги с высшим образованием.": "және жоғары білімді педагогтер.",
    "Тренер по настольному теннису": "Үстел теннисі жаттықтырушысы",
    "Преподаватель образовательных программ": "Білім беру бағдарламаларының оқытушысы",
    "Преподаватель творческих дисциплин": "Шығармашылық пәндер оқытушысы",
    "Проходят ли детские кружки и секции одновременно с занятиями для взрослых?": "Балалар үйірмелері мен секциялары ересектер сабақтарымен бір уақытта өте ме?",
    "Да, расписание разделено по залам и времени — дети и взрослые не пересекаются на площадках.": "Иә, кесте залдар мен уақыт бойынша бөлінген — балалар мен ересектер алаңдарда қатар келмейді.",
    "Нужно ли специальное снаряжение для занятий?": "Сабаққа арнайы жабдық керек пе?",
    "На первом занятии всё необходимое оборудование предоставляется центром.": "Алғашқы сабақта барлық қажетті жабдықты орталық ұсынады.",
    "У вас есть бесплатный пробный урок?": "Тегін сынақ сабағы бар ма?",
    "Да, оставьте заявку, и администратор подберёт удобное направление.": "Иә, өтінім қалдырыңыз, әкімші ыңғайлы бағытты таңдап береді.",
    "На каких языках проходят занятия?": "Сабақтар қай тілдерде өтеді?",
    "Занятия проходят на русском и казахском языках.": "Сабақтар орыс және қазақ тілдерінде өтеді.",
    "Вы государственная организация?": "Сіздер мемлекеттік ұйымсыздар ма?",
    "Sana Sport — частный семейный спортивный центр.": "Sana Sport — жекеменшік отбасылық спорт орталығы.",
    "Получите бесплатный": "Тегін",
    "пробный урок": "сынақ сабағын алыңыз",
    "Оставьте контакты — вам перезвонят и подберут": "Байланыс деректеріңізді қалдырыңыз — сізге хабарласып,",
    "удобное направление и время.": "ыңғайлы бағыт пен уақытты таңдайды.",
  };

  document.documentElement.lang = "kk";
  document.body.classList.add("is-kazakh");
  translateTextNodes(translations);

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };
  const setTextList = (selector, values) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (values[index]) element.textContent = values[index];
    });
  };
  const setLeadingTextList = (selector, values) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (values[index] && element.firstChild) {
        element.firstChild.nodeValue = `${values[index]} `;
      }
    });
  };

  // Page-specific copy is set by selectors so text split by <br> and modal
  // data attributes are translated as well.
  setText(".tariffs-heading .eyebrow", "ТАРИФТЕР");
  setText(".tariffs-heading h1", "Sana Sport абонементтері");
  setText(".tariffs-heading p", "Ай сайынғы төлем, ауру кезінде абонементті тоқтату және бірнеше бағытқа жазылғанда жеңілдік.");
  setTextList(".tariff-card h2", ["Командалық спорт түрлері", "Жекпе-жек / бокс", "Үстел теннисі", "Шығармашылық", "Хореография", "Білім беру"]);
  setTextList(".tariff-card__button", Array(6).fill("Рәсімдеу"));
  document.querySelectorAll(".tariff-card p").forEach((price) => {
    if (price.firstChild) price.firstChild.nodeValue = "бастап ";
  });

  setText(".parents-heading .eyebrow", "АТА-АНАЛАРҒА");
  setText(".parents-heading h1", "Ата-аналарға арналған кеңестер");
  setText(".parents-heading p", "Sana Sport дене белсенділігі мен салауатты өмір салтын қолдауға арналған спорт бағыттары және ата-аналарға пайдалы кеңестер ұсынады.");
  const kazakhParentArticles = [
    ["Ересектерге арналған секциялар", "Sana Sport-тағы ересектер спорты — денсаулық, сергектік және жақсы көңіл күйге арналған жаттығулар.", "Sana Sport-тағы ересектер спорты — денсаулық, сергектік және жақсы көңіл күйге арналған жаттығулар. Өзіңізге ыңғайлы форматты таңдаңыз: жеке немесе топпен."],
    ["Жас спортшының дербестігін тәрбиелеу", "Спорт психологы Михаил Боттиннің жас спортшының дербестігі, мотивациясы және қолдауы туралы дәрісі.", "Спорт психологы Михаил Боттин жас спортшының дербестігін тәрбиелеу, мотивацияны сақтау және нәтижеге жету жолындағы қолдау туралы әңгімелейді."],
    ["Спортшы өміріндегі тамақтану", "Клиникалық нутрициолог Альфия Большепаваның спортшы өміріндегі тамақтану және қалпына келу туралы дәрісі.", "Клиникалық нутрициолог Альфия Большепава спортшы өміріндегі теңгерімді тамақтану мен жаттығудан кейінгі қалпына келу жайлы кеңес береді."],
    ["Залдарды жалға алу", "Жеке мақсаттар, жаттығулар және іс-шаралар үшін әртүрлі көлемдегі залдарды жалға ала аласыз.", "Жеке мақсаттар, жаттығулар және іс-шаралар үшін әртүрлі көлемдегі залдарды жалға ала аласыз. Шарттар туралы толығырақ жалға алу бетінен біліңіз."],
    ["Жеке жаттығулар", "Сағат 19:00-ден кейін жаттықтырушыларымыз жеке мақсаттарыңызға сай жаттығу өткізуге дайын.", "Сағат 19:00-ден кейін жаттықтырушыларымыз жеке мақсаттарыңызға жетуге көмектесіп, жеке бағдарлама құрастыру үшін жаттығу өткізуге дайын."],
  ];
  document.querySelectorAll(".parent-article").forEach((article, index) => {
    const translation = kazakhParentArticles[index];
    if (!translation) return;
    const [title, preview, description] = translation;
    article.dataset.parentTitle = title;
    article.dataset.parentText = description;
    article.querySelector("h2").textContent = title;
    article.querySelector("p").textContent = preview;
  });
  setTextList(".parent-more", Array(5).fill("Толығырақ білу →"));
  setText(".parent-reminders h2", "Ата-аналарға ескерту");
  setTextList(".reminder-grid h3", ["Келу ережелері", "Сабақты өткізіп алу және тоқтату", "Балалардың қауіпсіздігі"]);
  setTextList(".reminder-grid p", ["Ауыстыратын аяқ киім, бағытқа сай киім және сабақ басталардан 10 минут бұрын келу.", "Абонементті ауру кезінде анықтамамен айына 14 күнге дейін тоқтатуға болады.", "Орталық аумағында кіру жүйесі, бейнебақылау және медициналық пункт бар."]);
  setText(".parents-faq > h2", "Сұрақ-жауап");
  setLeadingTextList(".parents-faq summary", ["Балалар үйірмелері мен секциялары ересектерге арналған сабақтармен бір уақытта өте ме?", "Сабақтарға арнайы жабдық керек пе?", "Тегін сынақ сабағы бар ма?", "Сабақтар қай тілдерде өтеді?", "Сіздер мемлекеттік ұйымсыздар ма?"]);
  setTextList(".parents-faq details p", ["Иә, кесте залдар мен уақытқа бөлінген — балалар мен ересектер алаңдарда кездеспейді.", "Алғашқы сабақта барлық қажетті жабдықты орталық ұсынады.", "Иә, өтінім қалдырыңыз, әкімші сізге ыңғайлы бағытты таңдап береді.", "Сабақтар орыс және қазақ тілдерінде өтеді.", "Sana Sport — жекеменшік отбасылық спорт орталығы."]);
  setText(".parents-cta h2", "Сұрақтарыңыз қалды ма?");
  setText(".parents-cta .button", "Әкімшімен байланысу");
  setText(".parent-modal__content small", "АТА-АНАЛАРҒА ПАЙДАЛЫ");
  setText(".parent-modal__content .button", "Сұрақ қою");

  setText(".rental-heading .eyebrow", "ЫНТЫМАҚТАСТЫҚ");
  setText(".rental-heading h1", "Жалға алу және серіктестік");
  setText(".rental-heading p", "Sana Sport-та біз өзара пайдалы серіктестікті жоғары бағалаймыз және денсаулықты, фитнесті және шығармашылықты дамытуға бағытталған ынтымақтастық түрлерін қарастыруға дайынбыз.");
  setTextList(".rental-option h2", ["Алаң мен залдарды жалға алу", "Корпоративтік ұсыныстар", "Жарнама орналастыру"]);
  setTextList(".rental-option p", ["Жаттығуларға, іс-шараларға және жеке мақсаттарға арналған әртүрлі көлемдегі залдар — сағаттық жалға алу.", "Компания командалары мен қызметкерлеріне арналған спорт форматтары.", "Кешен аумағындағы адам көп жүретін жарнама орындары."]);
  setText(".rental-cta h2", "Бірлескен жұмыста мүмкіндік көресіз бе?");
  setText(".rental-cta p", "Бізге info@sanasport.kz мекенжайы арқылы жазыңыз — бірге белсенді әрі салауатты өмірге шабыт беретін жобалар жасай аламыз.");
  setText(".rental-cta .button", "Жалға алуға өтінім қалдыру");

  setText(".news-heading .eyebrow", "ЖАҢАЛЫҚТАР");
  setText(".news-heading h1", "Sana Sport-та не болып жатыр");
  setText(".news-heading p", "Турнирлер, жаңа залдардың ашылуы, акциялар және секцияларға қабылдау.");
  const kazakhNews = [
    ["Sana Sport Grizzlies U17 Қазақстанды Түркиядағы халықаралық турнирде таныстырады!", "2026 жылғы 8 қыркүйек", "2026 жылғы 8–11 қыркүйек аралығында Sana Sport Grizzlies U17 командасы Түркияның Алания қаласында өтетін EVOQ Challenge Cup халықаралық турниріне қатысады.", "2026 жылғы 8–11 қыркүйек аралығында Sana Sport Grizzlies U17 командасы Түркияның Алания қаласында өтетін EVOQ Challenge Cup халықаралық турниріне қатысады. Командаға сенімді ойын мен үлкен жеңістер тілейміз!"],
    ["«Болашақ ойындары» — киберспорт баскетболмен тоғысқанда!", "2026 жылғы 6 қыркүйек", "Sana Sport-та киберспортты, жастарды және нағыз баскетболды біріктірген «Болашақ ойындары» / Hybrid Basketball Cup ерекше турнирі өтті!", "Sana Sport-та киберспортты, жастарды және нағыз баскетболды біріктірген «Болашақ ойындары» / Hybrid Basketball Cup ерекше турнирі өтті! Бұл жарқын матчтар, жаңа таныстықтар және командалық жігерге толы күн болды."],
    ["Sana Sport — үстел теннисіндегі жаңа жеңіс!", "2026 жылғы 6 қыркүйек", "Үстел теннисінен ЦСИЮ №9 чемпионатында Sana Sport тәрбиеленушісі Сердяк На үздік нәтиже көрсетіп, 1-орын иеленді.", "Үстел теннисінен ЦСИЮ №9 чемпионатында Sana Sport тәрбиеленушісі Сердяк На үздік нәтиже көрсетіп, ДЮСШ спортшылары арасында 1-орын иеленді! Чемпионымыз бен жаттықтырушыларды құттықтаймыз."],
  ];
  document.querySelectorAll(".news-card").forEach((card, index) => {
    const translation = kazakhNews[index];
    if (!translation) return;
    const [title, date, preview, description] = translation;
    card.dataset.newsTitle = title;
    card.dataset.newsDate = date;
    card.dataset.newsText = description;
    card.querySelector("time").textContent = date;
    card.querySelector("h2").textContent = title;
    card.querySelector("p").textContent = preview;
  });
  setTextList(".news-read", Array(3).fill("Жаңалықты оқу"));
  setText(".news-modal__content .button", "Бізбен байланысу");

  setText(".contacts-copy .eyebrow", "БАЙЛАНЫСТАР");
  setText(".contacts-copy h1", "Біз әрдайым байланыстамыз");
  setTextList(".contacts-copy dt", ["МЕКЕНЖАЙ", "ЖҰМЫС УАҚЫТЫ", "ТЕЛЕФОН", "ПОШТА"]);
  setText("#contact-address", "Астана қ., Қажымұқан көшесі, 5");
  setText(".contacts-copy dl > div:nth-child(2) dd", "Дс–Жс, 8:00–23:00, демалыссыз");
  setText(".rental-box h2", "Жалға алу және ынтымақтастық");
  setText(".rental-box p", "Алаңдар мен залдарды жалға алу, корпоративтік ұсыныстар және жарнама орналастыру — info@sanasport.kz поштасына жазыңыз.");
  setText(".rental-box .button", "Жалға алу туралы толығырақ");
  setText(".map-search label", "Картадан мекенжайды табу");
  const mapAddress = document.querySelector("#map-address");
  if (mapAddress) mapAddress.value = "Астана қ., Қажымұқан көшесі, 5";
  setText("#map-search-button", "Табу");
  setText("#map-external", "Яндекс.Карталардан ашу ↗");

  setText(".shop-heading .eyebrow", "SANA SHOP");
  setText(".shop-heading h1", "Sana Sport фирмалық тауарлары");
  setText(".shop-heading p", "Жаттығулар мен күнделікті өмірге арналған киім және аксессуарлар.");
  setTextList(".shop-filter", ["Барлық тауарлар", "Балалар", "Киім", "Жабдық", "Кәдесыйлар"]);
  setTextList(".shop-group__heading h2", ["Балалар", "Киім", "Жабдық", "Кәдесыйлар"]);
  const kazakhProducts = [
    ["Sana Kids футболкасы", "6 / 14 жас"], ["Жасыл Sana Kids футболкасы", "6 / 8 / 10 / 12 / 14 жас"], ["Ақ Sana Kids футболкасы", "6 / 14 жас"],
    ["Erkin oila, batyl jasa", "XS / S"], ["Sheksiz mumkindik", "XS / S"], ["Kishkentai qadamdar ulken jetistikke aparady", "XS / S"],
    ["Sana Sport рюкзагы", "Бірыңғай өлшем"], ["Спорт сөмкесі", "Бірыңғай өлшем"], ["Түсті Sana Sport рюкзагы", "Бірыңғай өлшем"],
    ["Sana Sport дәптері", "Бірыңғай өлшем"], ["Sana Sport термобөтелкесі", "Бірыңғай өлшем"], ["Sana Sport бөтелкесі", "Бірыңғай өлшем"],
  ];
  document.querySelectorAll(".product-card").forEach((card, index) => {
    const translation = kazakhProducts[index];
    if (!translation) return;
    const [title, size] = translation;
    card.dataset.product = title;
    card.dataset.size = size;
    card.querySelector("h3").textContent = title;
    card.querySelector("small").textContent = size;
  });
  setTextList(".product-image span", ["Балалар", "Балалар", "Балалар", "Киім", "Киім", "Киім", "Жабдық", "Жабдық", "Жабдық", "Кәдесыйлар", "Кәдесыйлар", "Кәдесыйлар"]);
  setText(".shop-modal__content small", "SANA SHOP ТАУАРЫ");
  setText(".shop-modal__content p", "Өлшемді таңдаңыз, тапсырысты растау үшін әкімші сізбен байланысады.");
  const shopSizeLabel = document.querySelector(".shop-modal__content label");
  if (shopSizeLabel?.firstChild) shopSizeLabel.firstChild.nodeValue = "Өлшем";
  setText(".shop-order-button", "Тауарға тапсырыс беру");
  setText(".trainer-modal__content small", "SANA SPORT КОМАНДАСЫ");
  setText(".trainer-modal__content .button", "Бізбен байланысу");
  setText("#shop-notice-title", "Тауарлар каталогы");
  setText("#shop-notice-description", "Каталогта Sana Sport-та қазір бар тауарлар көрсетілген.");
  setText("#shop-notice-pickup", "Жеткізу жоқ — тауарларды тек орталықтың өзінен сатып алуға болады.");
  setText("#shop-notice-confirm", "Түсінікті");

  document.querySelectorAll(".contact").forEach((contact) => {
    setText(".contact h2", "Тегін сынақ сабағын алыңыз");
    setText(".contact p", "Байланыс деректеріңізді қалдырыңыз — біз сізге хабарласып, ыңғайлы бағыт пен уақытты таңдаймыз.");
    contact.querySelector('input[type="text"]')?.setAttribute("placeholder", "Аты-жөніңіз");
    contact.querySelector('input[type="tel"]')?.setAttribute("placeholder", "Ата-ананың телефоны");
    const submit = contact.querySelector('button[type="submit"]');
    if (submit) submit.textContent = "Өтінім жіберу";
  });
  const kazakhDirectionCards = [
    ["Футбол", "Командалық ойын, қозғалыс және салауатты әдет.", "Sana Sport-тағы футбол балаларды командалық ойынға баулиды, дағдысын дамытып, белсенді өмір салтын ұната білуге үйретеді."],
    ["Волейбол", "Командалық ойын, үйлесім және қарқынды жаттығу.", "Волейбол балалардың үйлесімін дамытып, командада ойнауды үйретеді және жаттығуды қызықты етеді."],
    ["Баскетбол", "Ептілік, жылдамдық және командалық ойын қуанышы.", "Баскетбол жаттығулары дене белсенділігін қызықты ойынмен ұштастырып, балалардың ептілігін арттырады."],
    ["Джиу-джитсу", "Күш, өзін-өзі бақылау және сенімділік.", "Джиу-джитсу дене күшін дамытып, өзін-өзі бақылауға, құрметке және қорғаныс тәсілдеріне үйретеді."],
    ["Шахмат", "Стратегиялық ойлау мен зейін.", "Шахмат стратегиялық ойлауды дамытып, баланың зейінін шоғырландыруға көмектеседі."],
    ["Үстел теннисі", "Жылдам реакция, дәлдік және үйлесім.", "Үстел теннисі жылдам реакцияны дамытып, қозғалыс үйлесімін жақсартады."],
    ["Бокс", "Дене дайындығы мен тәртіп.", "Бокс дене дайындығын эмоцияны бақылау қабілетімен біріктіріп, балаларды мықты әрі сенімді болуға тәрбиелейді."],
    ["Дзюдо", "Тәртіп, құрмет және мықты мінез.", "Дзюдо дене күшін, тәртіпті және қарсыласқа құрмет сезімін дамытады."],
    ["Каратэ", "Зейін, құрмет және өзін таныту.", "Каратэ балаларға зейінін арттыруға, құрмет көрсетуге және өзін танытуға көмектеседі."],
    ["Муай-тай", "Күш, төзімділік және сенімділік.", "Муай-тай балалардың күшін, төзімділігін және өзіне деген сенімін арттырады."],
    ["Таэквондо", "Икемділік, тәртіп және өзін бақылау.", "Таэквондо икемділікті, тәртіпті және өзін-өзі бақылауды қалыптастырады."],
    ["Робототехника", "Бағдарламалау, инженерия және логика.", "Балалар бағдарламалау мен инженерия негіздерін меңгеріп, логикалық ойлауын және техникалық дағдыларын дамытады."],
    ["Ағылшын тілі", "Сөйлеу тәжірибесі және сенімді қарым-қатынас.", "Бағдарлама балаға ағылшын тілінде еркін сөйлесуге көмектеседі."],
    ["Ұзартылған күн топтары", "Сабаққа көмек және дағдыларды дамыту.", "Бала тәжірибелі педагогпен үй тапсырмасын орындап, өткен тақырыптарды бекітеді."],
    ["Мектепке даярлық", "Сенімді бастау және әлеуетті ашу.", "Бағдарлама баланың қызығушылығы мен қажеттілігін ескере отырып, жан-жақты дамуына бағытталған."],
    ["Қазақ тілі", "Жайлы тәжірибе және еркін қарым-қатынас.", "Қазақ тілін жайлы әрі қызықты ортада меңгергісі келетіндерге арналған."],
    ["ЖИ-инженерия", "Жобалар, технологиялар және жасанды интеллект.", "ЖИ-инженерия жасанды интеллект пен инженерияға байланысты жобаларды құруды қамтиды."],
    ["Сурет салу", "Қиял және өнермен танысу.", "Сурет салу шығармашылық ойлауды, қиялды дамытып, әртүрлі көркемдік тәсілдермен таныстырады."],
    ["Жас аспаз", "Пісіреміз, дәмін татамыз және командада жұмыс істейміз.", "Кішкентай аспаздар қарапайым әрі дәмді тағам дайындап, командамен жұмыс істеу дағдысын дамытады."],
    ["«Еңбек» шеберханасы", "Қол еңбегі, ағаш және шынайы жобалар.", "Шығармашылық сабақ ағашпен жұмыс істеу дағдыларын және түрлі бұйым жасау қабілетін дамытады."],
    ["Домбыра", "Қазақ күйлері, ырғақ және музыкалық есту.", "Домбыра сабақтарында балалар ойнау негіздерін меңгеріп, естуі мен ырғақ сезімін дамытады."],
    ["Фортепиано", "Музыка, есту және сенімді орындау.", "Сабақтарда балалар ойнау негіздерін меңгеріп, ырғақ, есту және сүйемелдеу дағдыларын дамытады."],
    ["Вокал", "Тыныс, дауыс, дикция және әртістік.", "Вокал сабақтарында балалар тыныс алуды, дауысты қоюды, дикция мен артикуляцияны меңгереді."],
    ["Көркем гимнастика", "Икемділік, сымбат, дене қалпы және ырғақ.", "Көркем гимнастика сұлулық пен сымбатты күш және икемділікпен біріктіріп, пластика мен ырғақ сезімін дамытады."],
    ["Хореография", "Би, пластика және музыкалық.", "Сабақтар би арқылы пластиканы, үйлесімділікті, музыкалылықты және әртістікті дамытады."],
  ];
  document.querySelectorAll(".direction-card").forEach((card, index) => {
    const translation = kazakhDirectionCards[index];
    if (!translation) return;
    const [title, preview, description] = translation;
    card.dataset.name = title;
    card.dataset.description = description;
    card.querySelector("h2").textContent = title;
    card.querySelector("p").textContent = preview;
  });
  const kazakhAgeLabels = {
    "с 3 лет": "3 жастан бастап",
    "с 4 лет": "4 жастан бастап",
    "с 5 лет": "5 жастан бастап",
    "с 6 лет": "6 жастан бастап",
    "с 7 лет": "7 жастан бастап",
    "с 8 лет": "8 жастан бастап",
    "с 11 лет": "11 жастан бастап",
    "Ученики 1–4 классов": "1–4 сынып оқушылары",
  };
  document.querySelectorAll(".direction-card").forEach((card) => {
    const age = kazakhAgeLabels[card.dataset.age] ?? card.dataset.age;
    card.dataset.age = age;
    card.querySelector(".direction-card__image span").textContent = age;
  });
  const modalMeta = document.querySelector(".direction-modal .modal-meta");
  if (modalMeta) modalMeta.textContent = "айына 8 сабақтан бастап";
  document.querySelectorAll('a[href]').forEach((link) => {
    if (link.closest(".languages")) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin === window.location.origin && /\.html$/.test(url.pathname)) {
      url.searchParams.set("lang", "kz");
      link.href = `${url.pathname.split("/").pop()}${url.search}${url.hash}`;
    }
  });
}

document.querySelectorAll(".languages").forEach((languages) => {
  languages.innerHTML = `<a href="${languageUrl("kz")}" lang="kk"${activeLanguage === "kz" ? " class=\"is-current\"" : ""}>KZ</a> <a href="${languageUrl("ru")}" lang="ru"${activeLanguage === "ru" ? " class=\"is-current\"" : ""}>RU</a>`;
});

function initializeFaq(selector) {
  document.querySelector(`${selector} details[open]`)?.removeAttribute("open");

  document.querySelectorAll(`${selector} details`).forEach((details) => {
  const summary = details.querySelector("summary");
  const answer = details.querySelector("p");
  if (!summary || !answer) return;

  let currentAnimation;
  let currentContentAnimation;

  const finishAnimation = (shouldStayOpen) => {
    currentAnimation?.cancel();
    currentContentAnimation?.cancel();
    currentAnimation = undefined;
    currentContentAnimation = undefined;
    details.open = shouldStayOpen;
    details.style.height = "";
    answer.style.opacity = "";
  };

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    const isClosing = details.dataset.faqClosing === "true";
    if (currentAnimation) finishAnimation(!isClosing);

    const startHeight = details.offsetHeight;
    const shouldOpen = !details.open || isClosing;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const animationOptions = {
      duration: prefersReducedMotion ? 100 : 200,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      fill: "both",
    };
    delete details.dataset.faqClosing;

    if (shouldOpen) {
      answer.style.opacity = "0";
      details.open = true;
    } else {
      details.dataset.faqClosing = "true";
      details.open = false;
    }

    const endHeight = details.offsetHeight;
    details.open = true;
    details.style.height = `${startHeight}px`;

    currentAnimation = details.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      animationOptions,
    );
    currentContentAnimation = answer.animate(
      prefersReducedMotion
        ? { opacity: shouldOpen ? [0, 1] : [1, 0] }
        : {
            opacity: shouldOpen ? [0, 1] : [1, 0],
            transform: shouldOpen
              ? ["translateY(4px)", "translateY(0)"]
              : ["translateY(0)", "translateY(-4px)"],
          },
      animationOptions,
    );

    currentAnimation.onfinish = () => {
      const heightAnimation = currentAnimation;
      const contentAnimation = currentContentAnimation;
      currentAnimation = undefined;
      currentContentAnimation = undefined;
      details.open = shouldOpen;
      details.style.height = "";
      answer.style.opacity = "";
      heightAnimation?.cancel();
      contentAnimation?.cancel();
      delete details.dataset.faqClosing;
    };
  });
  });
}

initializeFaq("#faq");
initializeFaq(".parents-faq");
const defaultContent = {
  heroTitle: "Sana Sport — Семейный\nспортивный центр",
  heroDescription:
    "Более 20 кружков спорта, творчества и образования\nна 10 000 м². Один центр — весь день ребёнка.",
  address: "г. Астана, ул. Кажымукана, 5",
  phone: "+7 (747) 094 71 97",
  heroImage: "images/placeholder.png",
  aboutImage: "images/waitingzone.png",
};

menuToggle.addEventListener("click", () => nav.classList.toggle("is-open"));
document
  .querySelectorAll(".nav a")
  .forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("is-open")),
  );

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.is-active").classList.remove("is-active");
    tab.classList.add("is-active");
  });
});

document.querySelector(".contact form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector(".form-status");
  status.textContent = "Спасибо! Мы свяжемся с вами в ближайшее время.";
  event.currentTarget.reset();
});

const adminPanel = document.querySelector("#admin-panel");
const adminForm = document.querySelector("#admin-form");
const adminStatus = document.querySelector("#admin-status");
if (adminForm) {
  let content = {
    ...defaultContent,
    ...JSON.parse(localStorage.getItem(storageKey) || "{}"),
  };

  function applyContent() {
    document.querySelector("#hero-title").innerHTML = content.heroTitle.replace(
      /\n/g,
      "<br>",
    );
    document.querySelector("#hero-description").innerHTML =
      content.heroDescription.replace(/\n/g, "<br>");
    document.querySelector("#site-address").textContent = content.address;
    const phone = document.querySelector("#site-phone");
    phone.textContent = content.phone;
    phone.href = `tel:${content.phone.replace(/[^\d+]/g, "")}`;
    const heroImage =
      content.heroImage &&
      !content.heroImage.includes("Hero image placeholder.png")
        ? content.heroImage
        : defaultContent.heroImage;
    document.querySelector(".visual--building img").src = heroImage;
    const aboutImage = content.aboutImage || defaultContent.aboutImage;
    document.querySelector(".visual--lounge img").src = aboutImage;
  }

  function fillAdminForm() {
    Object.entries(content).forEach(([key, value]) => {
      const field = adminForm.elements[key];
      if (field && field.type !== "file") field.value = value;
    });
  }

  function setAdminOpen(isOpen) {
    adminPanel.classList.toggle("is-open", isOpen);
    adminPanel.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) fillAdminForm();
  }

  function resizeImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const scale = Math.min(1, 1600 / image.width, 1200 / image.height);
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);
          canvas
            .getContext("2d")
            .drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        image.onerror = reject;
        image.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  document
    .querySelector("#admin-open")
    .addEventListener("click", () => setAdminOpen(true));
  document
    .querySelector("#admin-close")
    .addEventListener("click", () => setAdminOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setAdminOpen(false);
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a")
      setAdminOpen(true);
  });

  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(adminForm);
    content.heroTitle = formData.get("heroTitle").trim();
    content.heroDescription = formData.get("heroDescription").trim();
    content.address = formData.get("address").trim();
    content.phone = formData.get("phone").trim();
    for (const imageName of ["heroImage", "aboutImage"]) {
      const file = formData.get(imageName);
      if (file && file.size) content[imageName] = await resizeImage(file);
    }
    localStorage.setItem(storageKey, JSON.stringify(content));
    applyContent();
    adminStatus.textContent = "Изменения сохранены";
    setTimeout(() => {
      adminStatus.textContent = "";
    }, 2500);
  });

  document.querySelectorAll(".admin-remove").forEach((button) => {
    button.addEventListener("click", () => {
      content[button.dataset.image] = "";
      localStorage.setItem(storageKey, JSON.stringify(content));
      applyContent();
      fillAdminForm();
    });
  });

  document.querySelector("#admin-reset").addEventListener("click", () => {
    content = { ...defaultContent };
    localStorage.removeItem(storageKey);
    applyContent();
    fillAdminForm();
    adminStatus.textContent = "Восстановлены исходные данные";
  });

  applyContent();
}

// Apply the locale after saved editor content has restored the hero copy.
if (activeLanguage === "kz") enableKazakhLanguage();

const directionTabs = document.querySelectorAll(".direction-tab");
const directionCards = document.querySelectorAll(".direction-card");
const directionModal = document.querySelector("#direction-modal");
const directionImagePaths = [
  "images/football.png", "images/volleyball.png", "images/basketball.png",
  "images/jiujitsu.png", "images/chess.png", "images/tennis.png",
  "images/box.png", "images/judo.png", "images/karate.png", "images/box.png",
  "images/taekwondo.png", "images/robotics.png", "images/english.png",
  "images/daycare.png", "images/preschool.png", "images/kazakh.png",
  "images/ai.png", "images/art.png", "images/cooking.png", "images/enbek.png",
  "images/dombyra.png", "images/piano.png", "images/vocal.png",
  "images/gymnastics.png", "images/dance.png",
];

directionCards.forEach((card, index) => {
  card.dataset.image = directionImagePaths[index] ?? card.dataset.image;
});

function openModal(modal) {
  if (!modal) return;
  modal.classList.remove("is-closing");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  if (!modal || !modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  modal.classList.add("is-closing");
  modal.setAttribute("aria-hidden", "true");
  modal.addEventListener(
    "transitionend",
    (event) => {
      if (event.target === modal && event.propertyName === "opacity") {
        modal.classList.remove("is-closing");
      }
    },
    { once: true },
  );
}

function revealDirectionCards(cards) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const easing = getComputedStyle(document.documentElement)
    .getPropertyValue("--ease-out")
    .trim();

  cards.forEach((card, index) => {
    card.classList.add("is-revealed");
    card.directionFilterAnimation?.cancel();
    card.directionFilterAnimation = card.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 160,
        delay: Math.min(index, 3) * 30,
        easing,
      },
    );
  });
}

directionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    directionTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    const category = tab.dataset.directionFilter;
    directionCards.forEach((card) =>
      card.classList.toggle(
        "is-hidden",
        category !== "all" && card.dataset.category !== category,
      ),
    );
    revealDirectionCards(
      [...directionCards].filter((card) => !card.classList.contains("is-hidden")),
    );
  });
});

const trainerTabs = document.querySelectorAll("[data-trainer-filter]");
const trainerCards = document.querySelectorAll(".trainer-grid article");

function revealTrainerCards(cards) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const easing = getComputedStyle(document.documentElement)
    .getPropertyValue("--ease-out")
    .trim();

  cards.forEach((card, index) => {
    card.trainerFilterAnimation?.cancel();
    card.trainerFilterAnimation = card.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 160,
        delay: Math.min(index, 3) * 30,
        easing,
      },
    );
  });
}

trainerTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    trainerTabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });

    const category = tab.dataset.trainerFilter;
    trainerCards.forEach((card) =>
      card.classList.toggle(
        "is-hidden",
        category !== "all" && card.dataset.trainerCategory !== category,
      ),
    );
    revealTrainerCards(
      [...trainerCards].filter((card) => !card.classList.contains("is-hidden")),
    );
  });
});

const trainerModal = document.querySelector("#trainer-modal");

function closeTrainerModal() {
  closeModal(trainerModal);
}

function openTrainerCard(card) {
  const avatar = card.querySelector(".avatar");
  const modalAvatar = document.querySelector("#trainer-modal-avatar");
  document.querySelector("#trainer-modal-name").textContent =
    card.querySelector("h3").textContent.replace(/\s+/g, " ").trim();
  document.querySelector("#trainer-modal-role").textContent =
    card.querySelector("p").textContent;
  modalAvatar.textContent = avatar.textContent;
  modalAvatar.className = `trainer-modal__avatar ${avatar.className}`;
  openModal(trainerModal);
}

trainerCards.forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.addEventListener("click", () => openTrainerCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openTrainerCard(card);
    }
  });
});

document
  .querySelector("#trainer-modal-close")
  ?.addEventListener("click", closeTrainerModal);
trainerModal?.addEventListener("click", (event) => {
  if (event.target === trainerModal) closeTrainerModal();
});

function closeDirectionModal() {
  closeModal(directionModal);
}

function openDirectionCard(card) {
  document.querySelector("#modal-title").textContent = card.dataset.name;
  document.querySelector("#modal-age").textContent = card.dataset.age;
  document.querySelector("#modal-description").textContent =
    card.dataset.description;
  document.querySelector("#modal-image").style.backgroundImage =
    `url("${card.dataset.image}")`;
  openModal(directionModal);
}

directionCards.forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.addEventListener("click", (event) => {
    if (!event.target.closest(".choose-direction")) openDirectionCard(card);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDirectionCard(card);
    }
  });
  card.querySelector(".choose-direction").addEventListener("click", () => {
    openDirectionCard(card);
  });
});

document
  .querySelector("#modal-close")
  ?.addEventListener("click", closeDirectionModal);
directionModal?.addEventListener("click", (event) => {
  if (event.target === directionModal) closeDirectionModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDirectionModal();
    closeTrainerModal();
    closeShopNotice();
  }
});

const shopFilters = document.querySelectorAll(".shop-filter");
const shopGroups = document.querySelectorAll(".shop-group");
const productCards = document.querySelectorAll(".product-card");
const shopModal = document.querySelector("#shop-modal");
const shopNotice = document.querySelector("#shop-notice");
const shopModalDescription = document.querySelector(".shop-modal__content p");
const defaultShopModalDescription = shopModalDescription?.textContent ?? "";
const pickupOnlyDescriptions =
  activeLanguage === "kz"
    ? {
        equipment: [
          "Жаттығуға және күнделікті қолдануға арналған ыңғайлы рюкзак.",
          "Спорттық заттарды өзіңізбен алып жүруге арналған кең сөмке.",
          "Күнделікті қажетті заттарға арналған жарқын Sana Sport рюкзагы.",
        ],
        souvenirs: [
          "Жоспарлар мен жазбаларға арналған фирмалық дәптер.",
          "Сусынның температурасын ұзақ сақтайтын термобөтелке.",
          "Жаттығуға және күнделікті қолдануға арналған жеңіл бөтелке.",
        ],
      }
    : {
        equipment: [
          "Удобный рюкзак для тренировок и повседневного использования.",
          "Вместительная сумка для спортивных вещей.",
          "Яркий рюкзак Sana Sport для нужных мелочей на каждый день.",
        ],
        souvenirs: [
          "Фирменный блокнот для планов и записей.",
          "Термобутылка, которая дольше сохраняет температуру напитка.",
          "Лёгкая бутылка для тренировок и повседневных дел.",
        ],
      };

const pickupOnlyIndices = {};
productCards.forEach((card) => {
  const category = card.dataset.shopCategory;
  const descriptions = pickupOnlyDescriptions[category];
  if (!descriptions) return;

  const index = pickupOnlyIndices[category] ?? 0;
  pickupOnlyIndices[category] = index + 1;
  const description = descriptions[index];
  card.dataset.hasSize = "false";
  card.dataset.description = description;
  card.querySelector(".product-info small")?.remove();

  const productInfo = card.querySelector(".product-info");
  const priceRow = productInfo?.querySelector("div");
  if (productInfo && priceRow) {
    const descriptionElement = document.createElement("p");
    descriptionElement.className = "product-info__description";
    descriptionElement.textContent = description;
    priceRow.before(descriptionElement);
  }
});

shopFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    shopFilters.forEach((item) => item.classList.remove("is-active"));
    filter.classList.add("is-active");
    const category = filter.dataset.shopFilter;
    shopGroups.forEach((group) =>
      group.classList.toggle(
        "is-hidden",
        category !== "all" && group.dataset.shopGroup !== category,
      ),
    );
  });
});

function closeShopModal() {
  closeModal(shopModal);
}

function closeShopNotice() {
  closeModal(shopNotice);
}

if (shopNotice) {
  requestAnimationFrame(() => openModal(shopNotice));
  document
    .querySelector("#shop-notice-close")
    ?.addEventListener("click", closeShopNotice);
  document
    .querySelector("#shop-notice-confirm")
    ?.addEventListener("click", closeShopNotice);
  shopNotice.addEventListener("click", (event) => {
    if (event.target === shopNotice) closeShopNotice();
  });
}

productCards.forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelector("#shop-modal-title").textContent =
      card.dataset.product;
    document.querySelector("#shop-modal-price").textContent =
      card.dataset.price;
    document.querySelector("#shop-modal-image").className =
      `shop-modal__image ${card.querySelector(".product-image").className.replace("product-image", "")}`;
    const sizeSelect = document.querySelector("#shop-modal-size");
    const sizeLabel = sizeSelect?.closest("label");
    const hasSize = card.dataset.hasSize !== "false";
    if (shopModalDescription) {
      shopModalDescription.textContent =
        card.dataset.description || defaultShopModalDescription;
    }
    if (sizeLabel) sizeLabel.hidden = !hasSize;
    if (!hasSize) {
      sizeSelect.innerHTML = "";
      openModal(shopModal);
      return;
    }
    const sizeHint = activeLanguage === "kz" ? "Өлшемін нақтылау" : "Уточнить размер";
    sizeSelect.innerHTML = `<option>${card.dataset.size}</option><option>${sizeHint}</option>`;
    openModal(shopModal);
  });
});

document
  .querySelector("#shop-modal-close")
  ?.addEventListener("click", closeShopModal);
shopModal?.addEventListener("click", (event) => {
  if (event.target === shopModal) closeShopModal();
});

const newsCards = document.querySelectorAll(".news-card");
const newsModal = document.querySelector("#news-modal");
const newsImagePaths = ["images/news1.png", "images/news2.png", "images/news3.png"];

newsCards.forEach((card, index) => {
  card.dataset.newsImage = newsImagePaths[index] ?? card.dataset.newsImage;
});

function closeNewsModal() {
  closeModal(newsModal);
}

function openNewsCard(card) {
  document.querySelector("#news-modal-date").textContent =
    card.dataset.newsDate;
  document.querySelector("#news-modal-title").textContent =
    card.dataset.newsTitle;
  document.querySelector("#news-modal-text").textContent =
    card.dataset.newsText;
  document.querySelector("#news-modal-image").style.backgroundImage =
    `url("${card.dataset.newsImage}")`;
  openModal(newsModal);
}

newsCards.forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.addEventListener("click", (event) => {
    if (!event.target.closest(".news-read")) openNewsCard(card);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openNewsCard(card);
    }
  });
  card.querySelector(".news-read").addEventListener("click", () => {
    openNewsCard(card);
  });
});

document
  .querySelector("#news-modal-close")
  ?.addEventListener("click", closeNewsModal);
newsModal?.addEventListener("click", (event) => {
  if (event.target === newsModal) closeNewsModal();
});

const parentArticles = document.querySelectorAll(".parent-article");
const parentModal = document.querySelector("#parent-modal");
const parentImagePaths = [
  "images/parent1.jpg",
  "images/parent2.png",
  "images/parent3.png",
  "images/parent4.png",
  "images/parent5.png",
];

parentArticles.forEach((article, index) => {
  article.dataset.parentImage = parentImagePaths[index] ?? article.dataset.parentImage;
});

function closeParentModal() {
  closeModal(parentModal);
}

parentArticles.forEach((article) => {
  article.querySelector(".parent-more").addEventListener("click", () => {
    document.querySelector("#parent-modal-title").textContent =
      article.dataset.parentTitle;
    document.querySelector("#parent-modal-text").textContent =
      article.dataset.parentText;
    document.querySelector("#parent-modal-image").style.backgroundImage =
      `url("${article.dataset.parentImage}")`;
    openModal(parentModal);
  });
});

document
  .querySelector("#parent-modal-close")
  ?.addEventListener("click", closeParentModal);
parentModal?.addEventListener("click", (event) => {
  if (event.target === parentModal) closeParentModal();
});

const mapSearchButton = document.querySelector("#map-search-button");
const mapAddressInput = document.querySelector("#map-address");
const contactMap = document.querySelector("#contact-map");
const mapExternal = document.querySelector("#map-external");
const mapStatus = document.querySelector("#map-status");

mapSearchButton?.addEventListener("click", () => {
  const address = mapAddressInput.value.trim();
  if (!address) {
    mapStatus.textContent = "Введите адрес для поиска";
    return;
  }
  const encodedAddress = encodeURIComponent(address);
  contactMap.src = `https://yandex.ru/map-widget/v1/?text=${encodedAddress}&z=16`;
  mapExternal.href = `https://yandex.ru/maps/?text=${encodedAddress}`;
  mapStatus.textContent = "Карта обновлена";
});

(function setupPageTransitions() {
  const duration = 600;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) return;

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      link.origin !== window.location.origin ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const destination = new URL(link.href);
    const isSameDocument =
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search;

    if (isSameDocument) return;

    event.preventDefault();
    document.body.classList.add("is-leaving");

    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, duration);
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      document.body.classList.remove("is-leaving");
    }
  });
})();

(function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const revealSelector = [
    "main > section",
    "footer.footer",
    ".direction-card",
    ".product-card",
    ".news-card",
    ".parent-article",
    ".tariff-card",
    ".rental-option",
    ".reminder-grid article",
  ].join(",");
  const revealTargets = document.querySelectorAll(revealSelector);
  const staggeredSelector = [
    ".direction-card",
    ".product-card",
    ".news-card",
    ".parent-article",
    ".tariff-card",
    ".rental-option",
    ".reminder-grid article",
  ].join(",");

  revealTargets.forEach((element) => {
    element.classList.add("reveal-on-scroll");

    if (element.matches(staggeredSelector)) {
      const siblings = [...element.parentElement.children];
      const siblingIndex = siblings.indexOf(element);
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(siblingIndex, 4) * 70}ms`,
      );
    }
  });

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-revealed");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((element) => observer.observe(element));
})();
