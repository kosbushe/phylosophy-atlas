import { supplementFigures } from "@/lib/canon-supplement";

export type CanonFigure = {
  id: string;
  index: string;
  name: string;
  nativeName?: string;
  dates: string;
  tradition: string;
  region: string;
  focus: string;
  slug?: string;
  disputed?: boolean;
};

export type CanonEra = {
  id: string;
  index: string;
  title: string;
  dates: string;
  note: string;
  figures: CanonFigure[];
};

const legacyCanonEras: CanonEra[] = [
  {
    id: "axial",
    index: "I",
    title: "Осевое время",
    dates: "VI–IV века до н. э.",
    note: "Первые большие языки пути, порядка, бытия и общественной справедливости.",
    figures: [
      {
        id: "buddha",
        index: "01",
        name: "Будда",
        nativeName: "Siddhārtha Gautama · सिद्धार्थ गौतम",
        dates: "вероятно, V век до н. э.",
        tradition: "Индия",
        region: "Северная Индия",
        focus:
          "Страдание имеет причины и может прекратиться; философия становится практикой преобразования восприятия, желания и действия.",
        disputed: true,
      },
      {
        id: "confucius",
        index: "02",
        name: "Конфуций",
        nativeName: "Kǒng Fūzǐ · 孔夫子",
        dates: "551–479 до н. э.",
        tradition: "Китай",
        region: "Лу, древний Китай",
        focus:
          "Человечный порядок начинается с воспитания характера, ритуала и умения правильно жить в отношениях с другими.",
      },
      {
        id: "heraclitus",
        index: "03",
        name: "Гераклит",
        nativeName: "Ἡράκλειτος",
        dates: "ок. 540–ок. 480 до н. э.",
        tradition: "Античность",
        region: "Эфес",
        focus:
          "Мир — не неподвижная вещь, а упорядоченное становление; противоположности образуют напряжённое единство, доступное логосу.",
      },
      {
        id: "parmenides",
        index: "04",
        name: "Парменид",
        nativeName: "Παρμενίδης",
        dates: "конец VI — середина V века до н. э.",
        tradition: "Античность",
        region: "Элея",
        focus:
          "Разум требует отличать то, что действительно есть, от изменчивой картины явлений и привычных человеческих мнений.",
        disputed: true,
      },
      {
        id: "laozi",
        index: "05",
        name: "Лао-цзы",
        nativeName: "Lǎozǐ · 老子",
        dates: "датировка спорна: VI–IV века до н. э.",
        tradition: "Китай",
        region: "Древний Китай",
        focus:
          "Следовать Дао — значит действовать без насильственного нажима, ценить мягкость, простоту и плодотворную пустоту.",
        disputed: true,
      },
      {
        id: "mozi",
        index: "06",
        name: "Мо-цзы",
        nativeName: "Mòzǐ · 墨子",
        dates: "ок. 470–ок. 391 до н. э.",
        tradition: "Китай",
        region: "Древний Китай",
        focus:
          "Поступки и институты следует судить по общей пользе; беспристрастная забота важнее роскоши, наследственного статуса и войны.",
      },
    ],
  },
  {
    id: "classical",
    index: "II",
    title: "Классические школы",
    dates: "V–III века до н. э.",
    note: "Добродетель, знание, природа, государство и счастье становятся системами жизни.",
    figures: [
      {
        id: "socrates",
        index: "07",
        name: "Сократ",
        nativeName: "Σωκράτης",
        dates: "ок. 470/469–399 до н. э.",
        tradition: "Античность",
        region: "Афины",
        focus:
          "Достойная жизнь начинается с проверки собственных убеждений: вопрос превращается в нравственную и интеллектуальную практику.",
        slug: "socrates",
      },
      {
        id: "plato",
        index: "08",
        name: "Платон",
        nativeName: "Πλάτων",
        dates: "428/427–348/347 до н. э.",
        tradition: "Античность",
        region: "Афины",
        focus:
          "Знание, справедливость, любовь и государство исследуются через различие между изменчивой видимостью и умопостигаемым порядком.",
      },
      {
        id: "diogenes",
        index: "09",
        name: "Диоген Синопский",
        nativeName: "Διογένης ὁ Σινωπεύς",
        dates: "ок. 412/404–323 до н. э.",
        tradition: "Античность",
        region: "Синопа — Афины — Коринф",
        focus:
          "Свобода требует радикально сократить зависимость от собственности, статуса и условностей и проверить мысль собственной жизнью.",
        disputed: true,
      },
      {
        id: "aristotle",
        index: "10",
        name: "Аристотель",
        nativeName: "Ἀριστοτέλης",
        dates: "384–322 до н. э.",
        tradition: "Античность",
        region: "Стагира — Афины",
        focus:
          "Исследовать вещь — значит понять её причины, форму, цель и место в целом; хорошая жизнь формируется устойчивой практикой добродетели.",
      },
      {
        id: "zhuangzi",
        index: "11",
        name: "Чжуан-цзы",
        nativeName: "Zhuāngzǐ · 莊子",
        dates: "ок. 369–286 до н. э.",
        tradition: "Китай",
        region: "Древний Китай",
        focus:
          "Любая жёсткая перспектива ограниченна; свобода возникает в способности следовать превращениям мира без цепляния за одну меру.",
      },
      {
        id: "epicurus",
        index: "12",
        name: "Эпикур",
        nativeName: "Ἐπίκουρος",
        dates: "341–270 до н. э.",
        tradition: "Античность",
        region: "Самос — Афины",
        focus:
          "Счастье — это не избыток наслаждений, а отсутствие телесной боли и душевной тревоги, поддержанное дружбой и разумными желаниями.",
      },
    ],
  },
  {
    id: "late-antiquity",
    index: "III",
    title: "Поздняя античность",
    dates: "I–V века",
    note: "Внутренняя свобода, пустотность, Единое и новая философия личности.",
    figures: [
      {
        id: "epictetus",
        index: "13",
        name: "Эпиктет",
        nativeName: "Ἐπίκτητος",
        dates: "ок. 50–ок. 135",
        tradition: "Античность",
        region: "Иераполь — Никополь",
        focus:
          "Свобода начинается с различения того, что зависит от нас, и того, что не зависит; страдание усиливают наши суждения о событиях.",
      },
      {
        id: "nagarjuna",
        index: "14",
        name: "Нагарджуна",
        nativeName: "Nāgārjuna · नागार्जुन",
        dates: "ок. 150–250",
        tradition: "Индия",
        region: "Южная Индия — вероятно",
        focus:
          "Пустотность не означает небытие: вещи возникают зависимо и потому не обладают изолированной, неизменной сущностью.",
        slug: "nagarjuna",
        disputed: true,
      },
      {
        id: "plotinus",
        index: "15",
        name: "Плотин",
        nativeName: "Πλωτῖνος",
        dates: "204/205–270",
        tradition: "Античность",
        region: "Египет — Рим",
        focus:
          "Многообразие мира мыслится как исхождение от Единого через Ум и Душу, а философская жизнь — как внутреннее возвращение к источнику.",
      },
      {
        id: "augustine",
        index: "16",
        name: "Августин",
        nativeName: "Aurelius Augustinus",
        dates: "354–430",
        tradition: "Христианство",
        region: "Северная Африка",
        focus:
          "Память, время, воля и внутренний опыт становятся путём к вопросу о Боге, свободе, зле и благодати.",
      },
    ],
  },
  {
    id: "medieval",
    index: "IV",
    title: "Средневековые миры",
    dates: "VIII–XIII века",
    note: "Индийская, исламская, китайская, еврейская и христианская философии в споре разума и откровения.",
    figures: [
      {
        id: "shankara",
        index: "17",
        name: "Шанкара",
        nativeName: "Śaṅkara · शङ्कर",
        dates: "вероятно, VIII век",
        tradition: "Индия",
        region: "Индия",
        focus:
          "Недвойственность Брахмана и Атмана раскрывается через устранение неведения: различия опыта реальны условно, но не окончательно.",
        disputed: true,
      },
      {
        id: "alfarabi",
        index: "18",
        name: "Аль-Фараби",
        nativeName: "Abū Naṣr al-Fārābī · أبو نصر الفارابي",
        dates: "ок. 870–950",
        tradition: "Ислам",
        region: "Центральная Азия — Багдад — Дамаск",
        focus:
          "Философия, религия, логика и политика образуют проект добродетельного города, направленного к человеческому совершенству.",
      },
      {
        id: "avicenna",
        index: "19",
        name: "Ибн Сина",
        nativeName: "Avicenna · ابن سينا",
        dates: "980–1037",
        tradition: "Ислам",
        region: "Центральная Азия — Персия",
        focus:
          "Различие сущности и существования ведёт к понятию Необходимо Сущего; мысленный опыт раскрывает самостоятельность души.",
      },
      {
        id: "alghazali",
        index: "20",
        name: "Аль-Газали",
        nativeName: "Abū Ḥāmid al-Ghazālī · أبو حامد الغزالي",
        dates: "1058–1111",
        tradition: "Ислам",
        region: "Персия",
        focus:
          "Критика метафизической уверенности соединяется с радикальным сомнением, логикой и поиском знания, способного изменить жизнь.",
      },
      {
        id: "averroes",
        index: "21",
        name: "Ибн Рушд",
        nativeName: "Averroes · ابن رشد",
        dates: "1126–1198",
        tradition: "Ислам",
        region: "Кордова — Марракеш",
        focus:
          "Философское доказательство и откровение не обязаны противоречить друг другу; Аристотель становится собеседником религиозной культуры.",
      },
      {
        id: "zhuxi",
        index: "22",
        name: "Чжу Си",
        nativeName: "Zhū Xī · 朱熹",
        dates: "1130–1200",
        tradition: "Китай",
        region: "Южная Сун",
        focus:
          "Принцип ли и жизненная энергия ци объясняют порядок вещей, а изучение мира и самовоспитание образуют единую практику.",
      },
      {
        id: "maimonides",
        index: "23",
        name: "Маймонид",
        nativeName: "Moshe ben Maimon · משה בן מימון",
        dates: "1138–1204",
        tradition: "Иудаизм",
        region: "Кордова — Каир",
        focus:
          "Разум и Тора читаются совместно, а отрицательная теология показывает, почему о Боге надёжнее говорить через отрицание ограничений.",
      },
      {
        id: "aquinas",
        index: "24",
        name: "Фома Аквинский",
        nativeName: "Thomas Aquinas",
        dates: "1225–1274",
        tradition: "Христианство",
        region: "Италия — Париж",
        focus:
          "Вера и разум различаются, но не уничтожают друг друга; метафизика, естественный закон и добродетель входят в единую систему.",
      },
    ],
  },
  {
    id: "early-modern",
    index: "V",
    title: "Раннее Новое время",
    dates: "XV–XVII века",
    note: "Государство, метод, опыт, права и новая метафизика субъекта.",
    figures: [
      {
        id: "machiavelli",
        index: "25",
        name: "Макиавелли",
        nativeName: "Niccolò Machiavelli",
        dates: "1469–1527",
        tradition: "Европа",
        region: "Флоренция",
        focus:
          "Политика исследуется как самостоятельная область действия, где virtù сталкивается с fortuna, конфликтом и хрупкостью республики.",
      },
      {
        id: "hobbes",
        index: "26",
        name: "Гоббс",
        nativeName: "Thomas Hobbes",
        dates: "1588–1679",
        tradition: "Европа",
        region: "Англия",
        focus:
          "Из страха, соперничества и уязвимости людей выводится общественный договор и необходимость суверенной власти.",
      },
      {
        id: "descartes",
        index: "27",
        name: "Декарт",
        nativeName: "René Descartes",
        dates: "1596–1650",
        tradition: "Европа",
        region: "Франция — Нидерланды",
        focus:
          "Методическое сомнение ищет несомненное основание знания и приводит к мыслящему субъекту, ясным идеям и проблеме связи души и тела.",
      },
      {
        id: "zerayacob",
        index: "28",
        name: "Зэра Яыкоб",
        nativeName: "Zär'a Ya‘əqob · ዘርአ ያዕቆብ",
        dates: "1599–1692 — по «Хатате»",
        tradition: "Африка",
        region: "Эфиопия",
        focus:
          "Разум и совесть становятся мерой религиозных и моральных утверждений; авторство дошедшего трактата остаётся предметом дискуссии.",
        disputed: true,
      },
      {
        id: "spinoza",
        index: "29",
        name: "Спиноза",
        nativeName: "Baruch Spinoza",
        dates: "1632–1677",
        tradition: "Европа",
        region: "Нидерланды",
        focus:
          "Есть одна бесконечная субстанция, а свобода означает не нарушение необходимости, а понимание причин наших действий и аффектов.",
      },
      {
        id: "locke",
        index: "30",
        name: "Локк",
        nativeName: "John Locke",
        dates: "1632–1704",
        tradition: "Европа",
        region: "Англия",
        focus:
          "Опыт формирует содержание знания; личность связана с сознанием, а законная власть — с правами и согласием управляемых.",
      },
      {
        id: "leibniz",
        index: "31",
        name: "Лейбниц",
        nativeName: "Gottfried Wilhelm Leibniz",
        dates: "1646–1716",
        tradition: "Европа",
        region: "Ганновер",
        focus:
          "Мир состоит из перспективных центров — монад; принцип достаточного основания связывает логику, метафизику и множество возможных миров.",
      },
    ],
  },
  {
    id: "enlightenment",
    index: "VI",
    title: "Просвещение",
    dates: "XVIII век",
    note: "Критика познания, общественный договор, автономия и равенство.",
    figures: [
      {
        id: "hume",
        index: "32",
        name: "Юм",
        nativeName: "David Hume",
        dates: "1711–1776",
        tradition: "Европа",
        region: "Шотландия",
        focus:
          "Опыт не показывает необходимой причинности или неизменного «я»: привычка и человеческая природа поддерживают то, что разум не доказывает.",
      },
      {
        id: "rousseau",
        index: "33",
        name: "Руссо",
        nativeName: "Jean-Jacques Rousseau",
        dates: "1712–1778",
        tradition: "Европа",
        region: "Женева — Франция",
        focus:
          "Как сохранить свободу в обществе, создающем зависимость и неравенство? Общая воля должна превратить подчинение закону в самоуправление.",
      },
      {
        id: "kant",
        index: "34",
        name: "Кант",
        nativeName: "Immanuel Kant",
        dates: "1724–1804",
        tradition: "Европа",
        region: "Кёнигсберг",
        focus:
          "Разум исследует собственные границы и условия опыта, а нравственная автономия требует относиться к человеку как к цели.",
      },
      {
        id: "wollstonecraft",
        index: "35",
        name: "Мэри Уолстонкрафт",
        nativeName: "Mary Wollstonecraft",
        dates: "1759–1797",
        tradition: "Европа",
        region: "Великобритания",
        focus:
          "Если разум и нравственная ответственность общечеловечны, образование и гражданская свобода не могут быть мужской привилегией.",
      },
    ],
  },
  {
    id: "long-nineteenth",
    index: "VII",
    title: "Долгий XIX век",
    dates: "1770–1900",
    note: "История, воля, существование, капитал, переоценка ценностей и всеединство.",
    figures: [
      {
        id: "hegel",
        index: "36",
        name: "Гегель",
        nativeName: "Georg Wilhelm Friedrich Hegel",
        dates: "1770–1831",
        tradition: "Европа",
        region: "Германия",
        focus:
          "Свобода развивается исторически через противоречия, признание и институты; истина раскрывается как движение целого.",
      },
      {
        id: "schopenhauer",
        index: "37",
        name: "Шопенгауэр",
        nativeName: "Arthur Schopenhauer",
        dates: "1788–1860",
        tradition: "Европа",
        region: "Германия",
        focus:
          "За миром представления действует ненасытная воля; искусство, аскеза и сострадание временно или радикально ослабляют её власть.",
      },
      {
        id: "kierkegaard",
        index: "38",
        name: "Кьеркегор",
        nativeName: "Søren Kierkegaard",
        dates: "1813–1855",
        tradition: "Европа",
        region: "Копенгаген",
        focus:
          "Истина становится экзистенциальной задачей отдельного человека, проходящего через выбор, тревогу, отчаяние и риск веры.",
      },
      {
        id: "marx",
        index: "39",
        name: "Маркс",
        nativeName: "Karl Marx",
        dates: "1818–1883",
        tradition: "Европа",
        region: "Германия — Лондон",
        focus:
          "Сознание и свобода зависят от материальных общественных отношений; отчуждение, идеология и классовый конфликт требуют практического изменения мира.",
      },
      {
        id: "nietzsche",
        index: "40",
        name: "Ницше",
        nativeName: "Friedrich Nietzsche",
        dates: "1844–1900",
        tradition: "Европа",
        region: "Германия — Швейцария — Италия",
        focus:
          "Генеалогия разоблачает происхождение ценностей, а опыт нигилизма ставит задачу их переоценки и утверждения жизни.",
        slug: "nietzsche",
      },
      {
        id: "solovyov",
        index: "41",
        name: "Владимир Соловьёв",
        nativeName: "Владимир Сергеевич Соловьёв",
        dates: "1853–1900",
        tradition: "Россия",
        region: "Российская империя",
        focus:
          "Всеединство, богочеловечество, любовь и нравственный прогресс должны преодолеть разрыв между знанием, верой и общественной жизнью.",
      },
    ],
  },
  {
    id: "twentieth",
    index: "VIII",
    title: "Первая половина XX века",
    dates: "1859–середина XX века",
    note: "Сознание, язык, бытие, свобода, политика и положение человека в мире.",
    figures: [
      {
        id: "husserl",
        index: "42",
        name: "Гуссерль",
        nativeName: "Edmund Husserl",
        dates: "1859–1938",
        tradition: "Европа",
        region: "Моравия — Германия",
        focus:
          "Феноменология возвращается к тому, как вещи даны сознанию: интенциональность и редукция раскрывают структуры опыта и жизненного мира.",
      },
      {
        id: "nishida",
        index: "43",
        name: "Нисида Китаро",
        nativeName: "西田 幾多郎",
        dates: "1870–1945",
        tradition: "Япония",
        region: "Япония",
        focus:
          "Чистый опыт, место и абсолютное ничто образуют язык, в котором восточноазиатская мысль встречается с европейской философией.",
      },
      {
        id: "russell",
        index: "44",
        name: "Бертран Рассел",
        nativeName: "Bertrand Russell",
        dates: "1872–1970",
        tradition: "Европа",
        region: "Великобритания",
        focus:
          "Логический анализ проясняет структуру высказываний и их отношение к миру, превращая язык в инструмент решения философских проблем.",
      },
      {
        id: "berdyaev",
        index: "45",
        name: "Николай Бердяев",
        nativeName: "Николай Александрович Бердяев",
        dates: "1874–1948",
        tradition: "Россия",
        region: "Россия — Франция",
        focus:
          "Свобода и творчество предшествуют объективации; личность нельзя свести к вещи, роли или элементу безличной системы.",
      },
      {
        id: "heidegger",
        index: "46",
        name: "Хайдеггер",
        nativeName: "Martin Heidegger",
        dates: "1889–1976",
        tradition: "Европа",
        region: "Германия",
        focus:
          "Вопрос о бытии возвращается через анализ человеческого бытия-в-мире, времени, конечности и позднее — техники.",
      },
      {
        id: "wittgenstein",
        index: "47",
        name: "Витгенштейн",
        nativeName: "Ludwig Wittgenstein",
        dates: "1889–1951",
        tradition: "Европа",
        region: "Вена — Кембридж",
        focus:
          "Сначала границы мира исследуются через логическую форму языка; позднее философские узлы распускаются через языковые игры и формы жизни.",
      },
      {
        id: "sartre",
        index: "48",
        name: "Сартр",
        nativeName: "Jean-Paul Sartre",
        dates: "1905–1980",
        tradition: "Европа",
        region: "Франция",
        focus:
          "У человека нет заранее заданной сущности: он неизбежно свободен, ответственен и способен прятаться от свободы в дурной вере.",
      },
      {
        id: "arendt",
        index: "49",
        name: "Ханна Арендт",
        nativeName: "Hannah Arendt",
        dates: "1906–1975",
        tradition: "Европа",
        region: "Германия — США",
        focus:
          "Политика рождается из действия и человеческой множественности; тоталитаризм, суждение и бездумность показывают хрупкость общего мира.",
      },
      {
        id: "beauvoir",
        index: "50",
        name: "Симона де Бовуар",
        nativeName: "Simone de Beauvoir",
        dates: "1908–1986",
        tradition: "Европа",
        region: "Франция",
        focus:
          "Свобода всегда осуществляется в конкретных условиях; положение женщины как «Другого» раскрывает социальные механизмы неравенства.",
      },
    ],
  },
];

const canonOrder100 = [
  "buddha",
  "confucius",
  "heraclitus",
  "parmenides",
  "laozi",
  "mozi",
  "socrates",
  "plato",
  "diogenes",
  "aristotle",
  "mencius",
  "zhuangzi",
  "kautilya",
  "epicurus",
  "zeno",
  "xunzi",
  "seneca",
  "epictetus",
  "nagarjuna",
  "sextus",
  "plotinus",
  "augustine",
  "vasubandhu",
  "dignaga",
  "shankara",
  "alkindi",
  "alfarabi",
  "avicenna",
  "alghazali",
  "averroes",
  "zhuxi",
  "maimonides",
  "dogen",
  "aquinas",
  "dunsscotus",
  "ockham",
  "ibnkhaldun",
  "christinedepizan",
  "machiavelli",
  "bacon",
  "hobbes",
  "descartes",
  "zerayacob",
  "pascal",
  "spinoza",
  "locke",
  "leibniz",
  "berkeley",
  "hume",
  "rousseau",
  "adamsmith",
  "kant",
  "wollstonecraft",
  "hegel",
  "schopenhauer",
  "mill",
  "kierkegaard",
  "marx",
  "dostoevsky",
  "tolstoy",
  "peirce",
  "williamjames",
  "nietzsche",
  "solovyov",
  "freud",
  "husserl",
  "bergson",
  "dewey",
  "dubois",
  "gandhi",
  "nishida",
  "russell",
  "berdyaev",
  "jung",
  "iqbal",
  "heidegger",
  "wittgenstein",
  "ambedkar",
  "benjamin",
  "popper",
  "adorno",
  "sartre",
  "levinas",
  "arendt",
  "beauvoir",
  "merleauponty",
  "simoneweil",
  "camus",
  "anscombe",
  "rawls",
  "kuhn",
  "deleuze",
  "fanon",
  "foucault",
  "habermas",
  "derrida",
  "amartyasen",
  "judithbutler",
  "mbembe",
  "byungchulhan",
] as const;

const figureById = new Map(
  [...legacyCanonEras.flatMap((era) => era.figures), ...supplementFigures].map(
    (figure) => [figure.id, figure],
  ),
);

if (canonOrder100.length !== 100 || new Set(canonOrder100).size !== 100) {
  throw new Error("Канон должен содержать ровно 100 уникальных фигур.");
}

export const canonFigures: CanonFigure[] = canonOrder100.map((id, index) => {
  const figure = figureById.get(id);

  if (!figure) {
    throw new Error(`Фигура ${id} отсутствует в данных канона.`);
  }

  return {
    ...figure,
    index: String(index + 1).padStart(3, "0"),
  };
});

function figures(from: number, to: number) {
  return canonFigures.slice(from - 1, to);
}

export const canonEras: CanonEra[] = [
  {
    id: "axial",
    index: "I",
    title: "Осевое время",
    dates: "VI–IV века до н. э.",
    note: "Путь, порядок, бытие и общественная справедливость получают первые большие философские языки.",
    figures: figures(1, 6),
  },
  {
    id: "classical",
    index: "II",
    title: "Классические школы",
    dates: "V–III века до н. э.",
    note: "Добродетель, знание, государство, скепсис и счастье превращаются в конкурирующие системы жизни.",
    figures: figures(7, 16),
  },
  {
    id: "late-antiquity",
    index: "III",
    title: "Империи и поздняя античность",
    dates: "I век до н. э. — VI век",
    note: "Стоицизм, буддийская эпистемология, скептицизм и новые философии личности пересекают имперские миры.",
    figures: figures(17, 24),
  },
  {
    id: "medieval-worlds",
    index: "IV",
    title: "Средневековые миры",
    dates: "VIII–XV века",
    note: "Разум, откровение, язык, государство и созерцательная практика развиваются в исламской, христианской, еврейской и восточноазиатской традициях.",
    figures: figures(25, 38),
  },
  {
    id: "early-modern",
    index: "V",
    title: "Раннее Новое время",
    dates: "XV–XVII века",
    note: "Государство, научный метод, опыт, права и метафизика субъекта образуют новую карту знания и власти.",
    figures: figures(39, 48),
  },
  {
    id: "enlightenment-systems",
    index: "VI",
    title: "Просвещение и системы",
    dates: "XVIII — начало XIX века",
    note: "Моральные чувства, критика разума, автономия, история и равенство становятся проектами современного общества.",
    figures: figures(49, 55),
  },
  {
    id: "long-nineteenth",
    index: "VII",
    title: "Долгий XIX век",
    dates: "1806–1877",
    note: "Свобода, капитал, роман, бессознательное, прагматизм, колониализм и религиозное обновление меняют понятие человека.",
    figures: figures(56, 75),
  },
  {
    id: "crisis-modernity",
    index: "VIII",
    title: "Кризис модерности",
    dates: "1889–1909",
    note: "Язык, бытие, раса, техника, тоталитаризм, телесность и ответственность проходят через катастрофы первой половины XX века.",
    figures: figures(76, 87),
  },
  {
    id: "postwar",
    index: "IX",
    title: "Послевоенная философия",
    dates: "1913–1930",
    note: "Абсурд, справедливость, научные революции, деколонизация, различие и коммуникация перестраивают философскую повестку.",
    figures: figures(88, 96),
  },
  {
    id: "contemporary",
    index: "X",
    title: "Современность",
    dates: "1933 — настоящее время",
    note: "Реальные возможности, гендер, некрополитика и цифровая самоэксплуатация связывают философию с институтами повседневной жизни.",
    figures: figures(97, 100),
  },
];

export const canonTraditions = [
  "Все",
  "Античность",
  "Индия",
  "Китай",
  "Ислам",
  "Иудаизм",
  "Христианство",
  "Европа",
  "Россия",
  "Африка",
  "Япония",
  "США",
  "Корея",
] as const;
