import type { Philosopher, ProfilePlace } from "@/lib/philosophers";

type ProfileDefaults = {
  nameGenitive?: string;
  lifeSpan?: Philosopher["lifeSpan"];
  birthPlace?: ProfilePlace;
  deathPlace?: ProfilePlace;
  quoteOnCover?: boolean;
};

const place = (label: string, query: string, note: string): ProfilePlace => ({
  label,
  query,
  note,
});

const profileDefaults: Record<string, ProfileDefaults> = {
  buddha: {
    nameGenitive: "Будды",
    lifeSpan: { birth: "вероятно, V век до н. э.", death: "вероятно, V век до н. э." },
    birthPlace: place("Лумбини (традиционно)", "Lumbini, Nepal", "Место рождения по традиции"),
    deathPlace: place("Кушинагар (традиционно)", "Kushinagar, Uttar Pradesh, India", "Место смерти по традиции"),
  },
  confucius: {
    nameGenitive: "Конфуция",
    lifeSpan: { birth: "551 до н. э.", death: "479 до н. э." },
    birthPlace: place("Цзоу, близ Цюйфу", "Qufu, Shandong, China", "Место рождения"),
    deathPlace: place("Лу, Цюйфу", "Qufu, Shandong, China", "Место смерти"),
  },
  heraclitus: {
    nameGenitive: "Гераклита",
    lifeSpan: { birth: "ок. 540 до н. э.", death: "ок. 480 до н. э." },
    birthPlace: place("Эфес", "Ephesus, Selcuk, Turkey", "Место рождения"),
    deathPlace: place("Эфес", "Ephesus, Selcuk, Turkey", "Место смерти"),
  },
  parmenides: {
    nameGenitive: "Парменида",
    lifeSpan: { birth: "конец VI века до н. э.", death: "середина V века до н. э." },
    birthPlace: place("Элея", "Velia, Ascea, Italy", "Место рождения"),
    deathPlace: place("Элея", "Velia, Ascea, Italy", "Предполагаемое место смерти"),
  },
  laozi: {
    nameGenitive: "Лао-цзы",
    lifeSpan: { birth: "не установлено", death: "не установлено" },
    birthPlace: place("Луи (традиционно)", "Luyi County, Zhoukou, Henan, China", "Место рождения по поздней традиции"),
  },
  mozi: {
    nameGenitive: "Мо-цзы",
    lifeSpan: { birth: "ок. 470 до н. э.", death: "ок. 391 до н. э." },
    birthPlace: place("Шаньдун (вероятно)", "Shandong, China", "Вероятный регион рождения"),
  },
  socrates: {
    nameGenitive: "Сократа",
    lifeSpan: { birth: "ок. 470/469 до н. э.", death: "399 до н. э." },
    birthPlace: place("Афины", "Athens, Greece", "Место рождения"),
    deathPlace: place("Афины", "Athens, Greece", "Место смерти"),
  },
  plato: {
    nameGenitive: "Платона",
    lifeSpan: { birth: "428/427 до н. э.", death: "348/347 до н. э." },
    birthPlace: place("Афины", "Athens, Greece", "Место рождения"),
    deathPlace: place("Афины", "Athens, Greece", "Место смерти"),
  },
  diogenes: {
    nameGenitive: "Диогена Синопского",
    lifeSpan: { birth: "ок. 412/404 до н. э.", death: "323 до н. э." },
    birthPlace: place("Синопа", "Sinop, Turkey", "Место рождения"),
    deathPlace: place("Коринф", "Ancient Corinth, Greece", "Место смерти"),
  },
  aristotle: {
    nameGenitive: "Аристотеля",
    lifeSpan: { birth: "384 до н. э.", death: "322 до н. э." },
    birthPlace: place("Стагира", "Stageira, Halkidiki, Greece", "Место рождения"),
    deathPlace: place("Халкида", "Chalcis, Greece", "Место смерти"),
  },
  mencius: {
    nameGenitive: "Мэн-цзы",
    lifeSpan: { birth: "ок. 372 до н. э.", death: "289 до н. э." },
    birthPlace: place("Цзоу", "Zoucheng, Shandong, China", "Место рождения"),
    deathPlace: place("Цзоу", "Zoucheng, Shandong, China", "Место смерти"),
  },
  zhuangzi: {
    nameGenitive: "Чжуан-цзы",
    lifeSpan: { birth: "ок. 369 до н. э.", death: "286 до н. э." },
    birthPlace: place("Мэн, царство Сун", "Mengcheng County, Anhui, China", "Традиционно связываемое место рождения"),
    deathPlace: place("Мэн, царство Сун", "Mengcheng County, Anhui, China", "Традиционно связываемое место смерти"),
  },
  kautilya: {
    nameGenitive: "Каутильи",
    birthPlace: place("Древняя Индия", "India", "Регион жизни и работы"),
  },
  epicurus: {
    nameGenitive: "Эпикура",
    lifeSpan: { birth: "341 до н. э.", death: "270 до н. э." },
    birthPlace: place("Самос", "Samos, Greece", "Место рождения"),
    deathPlace: place("Афины", "Athens, Greece", "Место смерти"),
  },
  zeno: {
    nameGenitive: "Зенона Китийского",
    lifeSpan: { birth: "ок. 334 до н. э.", death: "262 до н. э." },
    birthPlace: place("Китий", "Larnaca, Cyprus", "Место рождения"),
    deathPlace: place("Афины", "Athens, Greece", "Место смерти"),
  },
  xunzi: {
    nameGenitive: "Сюнь-цзы",
    lifeSpan: { birth: "ок. 310 до н. э.", death: "ок. 235 до н. э." },
    birthPlace: place("Чжао", "Handan, Hebei, China", "Регион рождения"),
    deathPlace: place("Ланьлин", "Lanling County, Shandong, China", "Традиционно связываемое место смерти"),
  },
  seneca: {
    nameGenitive: "Сенеки",
    lifeSpan: { birth: "ок. 4 до н. э.", death: "65" },
    birthPlace: place("Кордуба", "Cordoba, Spain", "Место рождения"),
    deathPlace: place("Рим", "Rome, Italy", "Место смерти"),
  },
  epictetus: {
    nameGenitive: "Эпиктета",
    lifeSpan: { birth: "ок. 50", death: "ок. 135" },
    birthPlace: place("Иераполь", "Pamukkale, Denizli, Turkey", "Место рождения"),
    deathPlace: place("Никополь", "Nicopolis, Preveza, Greece", "Место смерти"),
  },
  nagarjuna: {
    nameGenitive: "Нагарджуны",
    lifeSpan: { birth: "ок. 150", death: "ок. 250" },
    birthPlace: place("Южная Индия (вероятно)", "Andhra Pradesh, India", "Вероятный регион рождения"),
  },
  sextus: {
    nameGenitive: "Секста Эмпирика",
    birthPlace: place("Средиземноморский мир", "Mediterranean Sea", "Регион жизни и работы"),
  },
  plotinus: {
    nameGenitive: "Плотина",
    lifeSpan: { birth: "204/205", death: "270" },
    birthPlace: place("Египет", "Egypt", "Регион рождения"),
    deathPlace: place("Кампания", "Campania, Italy", "Место смерти"),
  },
  augustine: {
    nameGenitive: "Августина",
    lifeSpan: { birth: "354", death: "430" },
    birthPlace: place("Тагаста", "Souk Ahras, Algeria", "Место рождения"),
    deathPlace: place("Гиппон Регий", "Annaba, Algeria", "Место смерти"),
  },
  vasubandhu: {
    nameGenitive: "Васубандху",
    birthPlace: place("Гандхара (вероятно)", "Peshawar, Pakistan", "Вероятный регион рождения"),
  },
  dignaga: {
    nameGenitive: "Дигнаги",
    lifeSpan: { birth: "ок. 480", death: "ок. 540" },
    birthPlace: place("Южная Индия", "Kanchipuram, Tamil Nadu, India", "Традиционно связываемый регион рождения"),
  },
  shankara: {
    nameGenitive: "Шанкары",
    lifeSpan: { birth: "вероятно, VIII век", death: "вероятно, VIII век" },
    birthPlace: place("Калади (традиционно)", "Kalady, Kerala, India", "Место рождения по традиции"),
  },
  alkindi: {
    nameGenitive: "Аль-Кинди",
    lifeSpan: { birth: "ок. 801", death: "ок. 873" },
    birthPlace: place("Куфа", "Kufa, Iraq", "Место рождения"),
    deathPlace: place("Багдад", "Baghdad, Iraq", "Место смерти"),
  },
  alfarabi: {
    nameGenitive: "Аль-Фараби",
    lifeSpan: { birth: "ок. 870", death: "950" },
    birthPlace: place("Фараб / Отрар", "Otrar, Kazakhstan", "Место рождения"),
    deathPlace: place("Дамаск", "Damascus, Syria", "Место смерти"),
  },
  avicenna: {
    nameGenitive: "Ибн Сины",
    lifeSpan: { birth: "980", death: "1037" },
    birthPlace: place("Афшана", "Afshona, Bukhara Region, Uzbekistan", "Место рождения"),
    deathPlace: place("Хамадан", "Hamadan, Iran", "Место смерти"),
  },
  alghazali: {
    nameGenitive: "Аль-Газали",
    lifeSpan: { birth: "1058", death: "1111" },
    birthPlace: place("Тус", "Tus, Iran", "Место рождения"),
    deathPlace: place("Тус", "Tus, Iran", "Место смерти"),
  },
  averroes: {
    nameGenitive: "Ибн Рушда",
    lifeSpan: { birth: "1126", death: "1198" },
    birthPlace: place("Кордова", "Cordoba, Spain", "Место рождения"),
    deathPlace: place("Марракеш", "Marrakesh, Morocco", "Место смерти"),
  },
  zhuxi: {
    nameGenitive: "Чжу Си",
    lifeSpan: { birth: "1130", death: "1200" },
    birthPlace: place("Юси", "Youxi County, Fujian, China", "Место рождения"),
    deathPlace: place("Цзяньян", "Jianyang, Nanping, Fujian, China", "Место смерти"),
  },
  maimonides: {
    nameGenitive: "Маймонида",
    lifeSpan: { birth: "1138", death: "1204" },
    birthPlace: place("Кордова", "Cordoba, Spain", "Место рождения"),
    deathPlace: place("Фустат / Каир", "Old Cairo, Egypt", "Место смерти"),
  },
  dogen: {
    nameGenitive: "Догэна",
    lifeSpan: { birth: "1200", death: "1253" },
    birthPlace: place("Киото", "Kyoto, Japan", "Место рождения"),
    deathPlace: place("Киото", "Kyoto, Japan", "Место смерти"),
  },
  aquinas: {
    nameGenitive: "Фомы Аквинского",
    lifeSpan: { birth: "1225", death: "1274" },
    birthPlace: place("Роккасекка", "Roccasecca, Italy", "Место рождения"),
    deathPlace: place("Аббатство Фоссанова", "Fossanova Abbey, Priverno, Italy", "Место смерти"),
  },
  dunsscotus: {
    nameGenitive: "Иоанна Дунса Скота",
    lifeSpan: { birth: "ок. 1265/1266", death: "1308" },
    birthPlace: place("Данс", "Duns, Scotland", "Место рождения"),
    deathPlace: place("Кёльн", "Cologne, Germany", "Место смерти"),
  },
  ockham: {
    nameGenitive: "Уильяма Оккама",
    lifeSpan: { birth: "ок. 1287", death: "1347" },
    birthPlace: place("Оккам", "Ockham, Surrey, United Kingdom", "Место рождения"),
    deathPlace: place("Мюнхен", "Munich, Germany", "Место смерти"),
  },
  ibnkhaldun: {
    nameGenitive: "Ибн Хальдуна",
    lifeSpan: { birth: "1332", death: "1406" },
    birthPlace: place("Тунис", "Tunis, Tunisia", "Место рождения"),
    deathPlace: place("Каир", "Cairo, Egypt", "Место смерти"),
  },
  christinedepizan: {
    nameGenitive: "Кристины Пизанской",
    lifeSpan: { birth: "1364", death: "ок. 1430" },
    birthPlace: place("Венеция", "Venice, Italy", "Место рождения"),
  },
  machiavelli: {
    nameGenitive: "Макиавелли",
    lifeSpan: { birth: "1469", death: "1527" },
    birthPlace: place("Флоренция", "Florence, Italy", "Место рождения"),
    deathPlace: place("Флоренция", "Florence, Italy", "Место смерти"),
  },
  bacon: {
    nameGenitive: "Фрэнсиса Бэкона",
    lifeSpan: { birth: "1561", death: "1626" },
    birthPlace: place("Лондон", "London, United Kingdom", "Место рождения"),
    deathPlace: place("Хайгейт", "Highgate, London, United Kingdom", "Место смерти"),
  },
  hobbes: {
    nameGenitive: "Гоббса",
    lifeSpan: { birth: "1588", death: "1679" },
    birthPlace: place("Уэстпорт, Малмсбери", "Malmesbury, Wiltshire, United Kingdom", "Место рождения"),
    deathPlace: place("Хардвик-Холл", "Hardwick Hall, Derbyshire, United Kingdom", "Место смерти"),
  },
  descartes: {
    nameGenitive: "Декарта",
    lifeSpan: { birth: "1596", death: "1650" },
    birthPlace: place("Ла-Э-ан-Турен", "Descartes, Indre-et-Loire, France", "Место рождения"),
    deathPlace: place("Стокгольм", "Stockholm, Sweden", "Место смерти"),
  },
  zerayacob: {
    nameGenitive: "Зэры Яыкоба",
    birthPlace: place("Эфиопия", "Ethiopia", "Регион жизни и работы"),
  },
  pascal: {
    nameGenitive: "Блеза Паскаля",
    lifeSpan: { birth: "1623", death: "1662" },
    birthPlace: place("Клермон-Ферран", "Clermont-Ferrand, France", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  spinoza: {
    nameGenitive: "Спинозы",
    lifeSpan: { birth: "1632", death: "1677" },
    birthPlace: place("Амстердам", "Amsterdam, Netherlands", "Место рождения"),
    deathPlace: place("Гаага", "The Hague, Netherlands", "Место смерти"),
  },
  locke: {
    nameGenitive: "Локка",
    lifeSpan: { birth: "1632", death: "1704" },
    birthPlace: place("Рингтон", "Wrington, Somerset, United Kingdom", "Место рождения"),
    deathPlace: place("Хай-Лейвер", "High Laver, Essex, United Kingdom", "Место смерти"),
  },
  leibniz: {
    nameGenitive: "Лейбница",
    lifeSpan: { birth: "1646", death: "1716" },
    birthPlace: place("Лейпциг", "Leipzig, Germany", "Место рождения"),
    deathPlace: place("Ганновер", "Hanover, Germany", "Место смерти"),
  },
  berkeley: {
    nameGenitive: "Джорджа Беркли",
    lifeSpan: { birth: "1685", death: "1753" },
    birthPlace: place("Килкенни", "Kilkenny, Ireland", "Место рождения"),
    deathPlace: place("Оксфорд", "Oxford, United Kingdom", "Место смерти"),
  },
  hume: {
    nameGenitive: "Юма",
    lifeSpan: { birth: "1711", death: "1776" },
    birthPlace: place("Эдинбург", "Edinburgh, United Kingdom", "Место рождения"),
    deathPlace: place("Эдинбург", "Edinburgh, United Kingdom", "Место смерти"),
  },
  rousseau: {
    nameGenitive: "Руссо",
    lifeSpan: { birth: "1712", death: "1778" },
    birthPlace: place("Женева", "Geneva, Switzerland", "Место рождения"),
    deathPlace: place("Эрменонвиль", "Ermenonville, France", "Место смерти"),
  },
  adamsmith: {
    nameGenitive: "Адама Смита",
    lifeSpan: { birth: "1723", death: "1790" },
    birthPlace: place("Керколди", "Kirkcaldy, Scotland", "Место рождения"),
    deathPlace: place("Эдинбург", "Edinburgh, Scotland", "Место смерти"),
  },
  kant: {
    nameGenitive: "Канта",
    lifeSpan: { birth: "1724", death: "1804" },
    birthPlace: place("Кёнигсберг", "Kaliningrad, Russia", "Место рождения"),
    deathPlace: place("Кёнигсберг", "Kaliningrad, Russia", "Место смерти"),
  },
  wollstonecraft: {
    nameGenitive: "Мэри Уолстонкрафт",
    lifeSpan: { birth: "1759", death: "1797" },
    birthPlace: place("Спиталфилдс", "Spitalfields, London, United Kingdom", "Место рождения"),
    deathPlace: place("Лондон", "London, United Kingdom", "Место смерти"),
  },
  hegel: {
    nameGenitive: "Гегеля",
    lifeSpan: { birth: "1770", death: "1831" },
    birthPlace: place("Штутгарт", "Stuttgart, Germany", "Место рождения"),
    deathPlace: place("Берлин", "Berlin, Germany", "Место смерти"),
  },
  schopenhauer: {
    nameGenitive: "Шопенгауэра",
    lifeSpan: { birth: "1788", death: "1860" },
    birthPlace: place("Данциг", "Gdansk, Poland", "Место рождения"),
    deathPlace: place("Франкфурт-на-Майне", "Frankfurt am Main, Germany", "Место смерти"),
  },
  mill: {
    nameGenitive: "Джона Стюарта Милля",
    lifeSpan: { birth: "1806", death: "1873" },
    birthPlace: place("Лондон", "London, United Kingdom", "Место рождения"),
    deathPlace: place("Авиньон", "Avignon, France", "Место смерти"),
  },
  kierkegaard: {
    nameGenitive: "Кьеркегора",
    lifeSpan: { birth: "1813", death: "1855" },
    birthPlace: place("Копенгаген", "Copenhagen, Denmark", "Место рождения"),
    deathPlace: place("Копенгаген", "Copenhagen, Denmark", "Место смерти"),
  },
  marx: {
    nameGenitive: "Маркса",
    lifeSpan: { birth: "1818", death: "1883" },
    birthPlace: place("Трир", "Trier, Germany", "Место рождения"),
    deathPlace: place("Лондон", "London, United Kingdom", "Место смерти"),
  },
  dostoevsky: {
    nameGenitive: "Фёдора Достоевского",
    lifeSpan: { birth: "1821", death: "1881" },
    birthPlace: place("Москва", "Moscow, Russia", "Место рождения"),
    deathPlace: place("Санкт-Петербург", "Saint Petersburg, Russia", "Место смерти"),
  },
  tolstoy: {
    nameGenitive: "Льва Толстого",
    lifeSpan: { birth: "1828", death: "1910" },
    birthPlace: place("Ясная Поляна", "Yasnaya Polyana, Tula Oblast, Russia", "Место рождения"),
    deathPlace: place("Астапово", "Lev Tolstoy railway station, Lipetsk Oblast, Russia", "Место смерти"),
  },
  peirce: {
    nameGenitive: "Чарльза Сандерса Пирса",
    lifeSpan: { birth: "1839", death: "1914" },
    birthPlace: place("Кембридж, Массачусетс", "Cambridge, Massachusetts, USA", "Место рождения"),
    deathPlace: place("Милфорд, Пенсильвания", "Milford, Pennsylvania, USA", "Место смерти"),
  },
  williamjames: {
    nameGenitive: "Уильяма Джеймса",
    lifeSpan: { birth: "1842", death: "1910" },
    birthPlace: place("Нью-Йорк", "New York City, USA", "Место рождения"),
    deathPlace: place("Тамворт", "Tamworth, New Hampshire, USA", "Место смерти"),
  },
  nietzsche: {
    nameGenitive: "Ницше",
    lifeSpan: { birth: "1844", death: "1900" },
    birthPlace: place("Рёккен", "Röcken, Germany", "Место рождения"),
    deathPlace: place("Веймар", "Weimar, Germany", "Место смерти"),
  },
  solovyov: {
    nameGenitive: "Владимира Соловьёва",
    lifeSpan: { birth: "1853", death: "1900" },
    birthPlace: place("Москва", "Moscow, Russia", "Место рождения"),
    deathPlace: place("Узкое", "Uzkoye Estate, Moscow, Russia", "Место смерти"),
  },
  freud: {
    nameGenitive: "Зигмунда Фрейда",
    lifeSpan: { birth: "1856", death: "1939" },
    birthPlace: place("Фрайберг", "Příbor, Czech Republic", "Место рождения"),
    deathPlace: place("Лондон", "London, United Kingdom", "Место смерти"),
  },
  husserl: {
    nameGenitive: "Гуссерля",
    lifeSpan: { birth: "1859", death: "1938" },
    birthPlace: place("Простеёв", "Prostějov, Czech Republic", "Место рождения"),
    deathPlace: place("Фрайбург-им-Брайсгау", "Freiburg im Breisgau, Germany", "Место смерти"),
  },
  bergson: {
    nameGenitive: "Анри Бергсона",
    lifeSpan: { birth: "1859", death: "1941" },
    birthPlace: place("Париж", "Paris, France", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  dewey: {
    nameGenitive: "Джона Дьюи",
    lifeSpan: { birth: "1859", death: "1952" },
    birthPlace: place("Берлингтон", "Burlington, Vermont, USA", "Место рождения"),
    deathPlace: place("Нью-Йорк", "New York City, USA", "Место смерти"),
  },
  dubois: {
    nameGenitive: "У. Э. Б. Дюбуа",
    lifeSpan: { birth: "1868", death: "1963" },
    birthPlace: place("Грейт-Баррингтон", "Great Barrington, Massachusetts, USA", "Место рождения"),
    deathPlace: place("Аккра", "Accra, Ghana", "Место смерти"),
  },
  gandhi: {
    nameGenitive: "Махатмы Ганди",
    lifeSpan: { birth: "1869", death: "1948" },
    birthPlace: place("Порбандар", "Porbandar, Gujarat, India", "Место рождения"),
    deathPlace: place("Нью-Дели", "New Delhi, India", "Место смерти"),
  },
  nishida: {
    nameGenitive: "Нисиды Китаро",
    lifeSpan: { birth: "1870", death: "1945" },
    birthPlace: place("Унокэ", "Kahoku, Ishikawa, Japan", "Место рождения"),
    deathPlace: place("Камакура", "Kamakura, Japan", "Место смерти"),
  },
  russell: {
    nameGenitive: "Бертрана Рассела",
    lifeSpan: { birth: "1872", death: "1970" },
    birthPlace: place("Треллек", "Trellech, Monmouthshire, Wales", "Место рождения"),
    deathPlace: place("Пенриндайдрайт", "Penrhyndeudraeth, Wales", "Место смерти"),
  },
  berdyaev: {
    nameGenitive: "Николая Бердяева",
    lifeSpan: { birth: "1874", death: "1948" },
    birthPlace: place("Киев", "Kyiv, Ukraine", "Место рождения"),
    deathPlace: place("Кламар", "Clamart, France", "Место смерти"),
  },
  jung: {
    nameGenitive: "Карла Густава Юнга",
    lifeSpan: { birth: "1875", death: "1961" },
    birthPlace: place("Кессвиль", "Kesswil, Switzerland", "Место рождения"),
    deathPlace: place("Кюснахт", "Küsnacht, Switzerland", "Место смерти"),
  },
  iqbal: {
    nameGenitive: "Мухаммада Икбала",
    lifeSpan: { birth: "1877", death: "1938" },
    birthPlace: place("Сиалкот", "Sialkot, Pakistan", "Место рождения"),
    deathPlace: place("Лахор", "Lahore, Pakistan", "Место смерти"),
  },
  heidegger: {
    nameGenitive: "Хайдеггера",
    lifeSpan: { birth: "1889", death: "1976" },
    birthPlace: place("Мескирх", "Meßkirch, Germany", "Место рождения"),
    deathPlace: place("Фрайбург-им-Брайсгау", "Freiburg im Breisgau, Germany", "Место смерти"),
  },
  wittgenstein: {
    nameGenitive: "Витгенштейна",
    lifeSpan: { birth: "1889", death: "1951" },
    birthPlace: place("Вена", "Vienna, Austria", "Место рождения"),
    deathPlace: place("Кембридж", "Cambridge, United Kingdom", "Место смерти"),
  },
  ambedkar: {
    nameGenitive: "Б. Р. Амбедкара",
    lifeSpan: { birth: "1891", death: "1956" },
    birthPlace: place("Мхоу", "Mhow, Madhya Pradesh, India", "Место рождения"),
    deathPlace: place("Дели", "Delhi, India", "Место смерти"),
  },
  benjamin: {
    nameGenitive: "Вальтера Беньямина",
    lifeSpan: { birth: "1892", death: "1940" },
    birthPlace: place("Берлин", "Berlin, Germany", "Место рождения"),
    deathPlace: place("Портбоу", "Portbou, Spain", "Место смерти"),
  },
  popper: {
    nameGenitive: "Карла Поппера",
    lifeSpan: { birth: "1902", death: "1994" },
    birthPlace: place("Вена", "Vienna, Austria", "Место рождения"),
    deathPlace: place("Кенли", "Kenley, London, United Kingdom", "Место смерти"),
  },
  adorno: {
    nameGenitive: "Теодора Адорно",
    lifeSpan: { birth: "1903", death: "1969" },
    birthPlace: place("Франкфурт-на-Майне", "Frankfurt am Main, Germany", "Место рождения"),
    deathPlace: place("Фисп", "Visp, Switzerland", "Место смерти"),
  },
  sartre: {
    nameGenitive: "Сартра",
    lifeSpan: { birth: "1905", death: "1980" },
    birthPlace: place("Париж", "Paris, France", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  levinas: {
    nameGenitive: "Эммануэля Левинаса",
    lifeSpan: { birth: "1906", death: "1995" },
    birthPlace: place("Каунас", "Kaunas, Lithuania", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  arendt: {
    nameGenitive: "Ханны Арендт",
    lifeSpan: { birth: "1906", death: "1975" },
    birthPlace: place("Линден, Ганновер", "Hannover-Linden, Germany", "Место рождения"),
    deathPlace: place("Нью-Йорк", "New York City, USA", "Место смерти"),
  },
  beauvoir: {
    nameGenitive: "Симоны де Бовуар",
    lifeSpan: { birth: "1908", death: "1986" },
    birthPlace: place("Париж", "Paris, France", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  merleauponty: {
    nameGenitive: "Мориса Мерло-Понти",
    lifeSpan: { birth: "1908", death: "1961" },
    birthPlace: place("Рошфор-сюр-Мер", "Rochefort, Charente-Maritime, France", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  simoneweil: {
    nameGenitive: "Симоны Вейль",
    lifeSpan: { birth: "1909", death: "1943" },
    birthPlace: place("Париж", "Paris, France", "Место рождения"),
    deathPlace: place("Ашфорд", "Ashford, Kent, United Kingdom", "Место смерти"),
  },
  camus: {
    nameGenitive: "Альбера Камю",
    lifeSpan: { birth: "1913", death: "1960" },
    birthPlace: place("Мондови", "Drean, Algeria", "Место рождения"),
    deathPlace: place("Вильблевен", "Villeblevin, France", "Место смерти"),
  },
  anscombe: {
    nameGenitive: "Элизабет Энском",
    lifeSpan: { birth: "1919", death: "2001" },
    birthPlace: place("Лимерик", "Limerick, Ireland", "Место рождения"),
    deathPlace: place("Кембридж", "Cambridge, United Kingdom", "Место смерти"),
  },
  rawls: {
    nameGenitive: "Джона Ролза",
    lifeSpan: { birth: "1921", death: "2002" },
    birthPlace: place("Балтимор", "Baltimore, Maryland, USA", "Место рождения"),
    deathPlace: place("Лексингтон", "Lexington, Massachusetts, USA", "Место смерти"),
  },
  kuhn: {
    nameGenitive: "Томаса Куна",
    lifeSpan: { birth: "1922", death: "1996" },
    birthPlace: place("Цинциннати", "Cincinnati, Ohio, USA", "Место рождения"),
    deathPlace: place("Кембридж, Массачусетс", "Cambridge, Massachusetts, USA", "Место смерти"),
  },
  deleuze: {
    nameGenitive: "Жиля Делёза",
    lifeSpan: { birth: "1925", death: "1995" },
    birthPlace: place("Париж", "Paris, France", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  fanon: {
    nameGenitive: "Франца Фанона",
    lifeSpan: { birth: "1925", death: "1961" },
    birthPlace: place("Фор-де-Франс", "Fort-de-France, Martinique", "Место рождения"),
    deathPlace: place("Бетесда", "Bethesda, Maryland, USA", "Место смерти"),
  },
  foucault: {
    nameGenitive: "Мишеля Фуко",
    lifeSpan: { birth: "1926", death: "1984" },
    birthPlace: place("Пуатье", "Poitiers, France", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  habermas: {
    nameGenitive: "Юргена Хабермаса",
    lifeSpan: { birth: "1929", death: "живой автор" },
    birthPlace: place("Дюссельдорф", "Düsseldorf, Germany", "Место рождения"),
  },
  derrida: {
    nameGenitive: "Жака Деррида",
    lifeSpan: { birth: "1930", death: "2004" },
    birthPlace: place("Эль-Биар", "El Biar, Algiers, Algeria", "Место рождения"),
    deathPlace: place("Париж", "Paris, France", "Место смерти"),
  },
  amartyasen: {
    nameGenitive: "Амартии Сена",
    lifeSpan: { birth: "1933", death: "живой автор" },
    birthPlace: place("Шантиникетан", "Santiniketan, West Bengal, India", "Место рождения"),
  },
  judithbutler: {
    nameGenitive: "Джудит Батлер",
    lifeSpan: { birth: "1956", death: "живой автор" },
    birthPlace: place("Кливленд", "Cleveland, Ohio, USA", "Место рождения"),
  },
  mbembe: {
    nameGenitive: "Ашиля Мбембе",
    lifeSpan: { birth: "1957", death: "живой автор" },
    birthPlace: place("Отеле", "Otélé, Cameroon", "Место рождения"),
  },
  byungchulhan: {
    nameGenitive: "Бён-Чхоля Хана",
    lifeSpan: { birth: "1959", death: "живой автор" },
    birthPlace: place("Сеул", "Seoul, South Korea", "Место рождения"),
  },
};

function replaceLongDash(text: string) {
  // Тире в русском тексте зависит от синтаксиса. Механическая замена em dash
  // на en dash портила авторские формулировки и не должна происходить при рендере.
  return text;
}

type YearRange = {
  start: number;
  end: number;
  approximate: boolean;
};

function parseYearRange(value?: string): YearRange | undefined {
  if (!value) return undefined;

  const normalized = value.replace(/−/g, "–");
  const bce = /до н\. э\./i.test(normalized);
  const approximate = /ок\.|вероятно|примерно|-е\b|\/|век/i.test(normalized);
  const numbers = normalized.match(/\d{1,4}/g)?.map(Number) ?? [];

  if (!numbers.length) return undefined;

  let start = numbers[0]!;
  let end = numbers.length > 1 ? numbers[numbers.length - 1]! : start;

  if (/-е\b/.test(normalized) && end === start) end = start + 9;

  if (bce) {
    start = -start;
    end = -end;
  }

  return {
    start: Math.min(start, end),
    end: Math.max(start, end),
    approximate,
  };
}

function ageAtYear(birthYear: number, eventYear: number) {
  const crossesEraBoundary = birthYear < 0 && eventYear > 0;
  return eventYear - birthYear - (crossesEraBoundary ? 1 : 0);
}

function yearWord(value: number) {
  const last = value % 10;
  const lastTwo = value % 100;

  if (last === 1 && lastTwo !== 11) return "год";
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return "года";
  return "лет";
}

function formatAge(start: number, end: number, approximate: boolean) {
  const prefix = approximate ? "ок. " : "";

  if (start === end) return `${prefix}${start} ${yearWord(start)}`;

  return `${prefix}${start}–${end} ${yearWord(end)}`;
}

function inferMilestoneAge(philosopher: Philosopher, milestone: Philosopher["milestones"][number]) {
  const title = milestone.title.toLocaleLowerCase("ru");
  const date = milestone.date.toLocaleLowerCase("ru");

  if (title.includes("рождение")) return "0 лет";

  if (title.includes("исторический диапазон")) return "датировка спорна";

  const birthRange = parseYearRange(philosopher.lifeSpan?.birth);
  const deathRange = parseYearRange(philosopher.lifeSpan?.death);
  const eventRange = parseYearRange(milestone.date);

  if (birthRange && eventRange) {
    if (deathRange && eventRange.start > deathRange.end + 3) {
      return "посмертная рецепция";
    }

    const startAge = ageAtYear(birthRange.end, eventRange.start);
    const endAge = ageAtYear(birthRange.start, eventRange.end);

    if (startAge >= 0 && endAge <= 130) {
      return formatAge(
        Math.min(startAge, endAge),
        Math.max(startAge, endAge),
        birthRange.approximate || eventRange.approximate || startAge !== endAge,
      );
    }
  }

  if (
    date.includes("после") ||
    /наслед|канонизац|возвращ|рецепц|комментар|учени|традиц|влияни|издан/.test(title)
  ) {
    return "посмертная рецепция";
  }

  if (/век|период|диапазон|спорн|традиц|неясн|контекст/.test(date + title)) {
    return "возраст не установлен";
  }

  return "возраст не установлен";
}

export function applyProfileDefaults(philosopher: Philosopher): Philosopher {
  const defaults = profileDefaults[philosopher.slug] ?? {};

  return {
    ...philosopher,
    nameGenitive: philosopher.nameGenitive ?? defaults.nameGenitive ?? philosopher.name,
    lifeSpan: philosopher.lifeSpan ?? defaults.lifeSpan,
    birthPlace: philosopher.birthPlace ?? defaults.birthPlace,
    deathPlace: philosopher.deathPlace ?? defaults.deathPlace,
    quoteOnCover: philosopher.quoteOnCover ?? defaults.quoteOnCover ?? true,
  };
}

export function normalizeProfileTypography(philosopher: Philosopher): Philosopher {
  return {
    ...philosopher,
    nativeName: replaceLongDash(philosopher.nativeName),
    dates: replaceLongDash(philosopher.dates),
    lifeSpan: philosopher.lifeSpan
      ? {
          birth: replaceLongDash(philosopher.lifeSpan.birth),
          death: replaceLongDash(philosopher.lifeSpan.death),
        }
      : philosopher.lifeSpan,
    birthPlace: philosopher.birthPlace
      ? {
          ...philosopher.birthPlace,
          label: replaceLongDash(philosopher.birthPlace.label),
          note: replaceLongDash(philosopher.birthPlace.note),
        }
      : philosopher.birthPlace,
    deathPlace: philosopher.deathPlace
      ? {
          ...philosopher.deathPlace,
          label: replaceLongDash(philosopher.deathPlace.label),
          note: replaceLongDash(philosopher.deathPlace.note),
        }
      : philosopher.deathPlace,
    century: replaceLongDash(philosopher.century),
    region: replaceLongDash(philosopher.region),
    tradition: replaceLongDash(philosopher.tradition),
    portraitAlt: replaceLongDash(philosopher.portraitAlt),
    portraitCredit: replaceLongDash(philosopher.portraitCredit),
    oneLine: replaceLongDash(philosopher.oneLine),
    mainQuestion: replaceLongDash(philosopher.mainQuestion),
    method: replaceLongDash(philosopher.method),
    changed: replaceLongDash(philosopher.changed),
    sourceStatus: replaceLongDash(philosopher.sourceStatus),
    sourceNote: replaceLongDash(philosopher.sourceNote),
    helicopter: replaceLongDash(philosopher.helicopter),
    ideas: philosopher.ideas.map((idea) => ({
      ...idea,
      title: replaceLongDash(idea.title),
      text: replaceLongDash(idea.text),
      example: idea.example ? replaceLongDash(idea.example) : idea.example,
    })),
    milestones: philosopher.milestones.map((milestone) => ({
      ...milestone,
      date: replaceLongDash(milestone.date),
      age: replaceLongDash(
        milestone.title.toLocaleLowerCase("ru").includes("рождение")
          ? inferMilestoneAge(philosopher, milestone)
          : milestone.age ?? inferMilestoneAge(philosopher, milestone),
      ),
      title: replaceLongDash(milestone.title),
      text: replaceLongDash(milestone.text),
    })),
    quote: {
      ...philosopher.quote,
      original: replaceLongDash(philosopher.quote.original),
      translation: replaceLongDash(philosopher.quote.translation),
      source: replaceLongDash(philosopher.quote.source),
      translationNote: replaceLongDash(philosopher.quote.translationNote),
    },
    distortion: {
      myth: replaceLongDash(philosopher.distortion.myth),
      correction: replaceLongDash(philosopher.distortion.correction),
    },
    dialogues: philosopher.dialogues.map((dialogue) => ({
      ...dialogue,
      prompt: replaceLongDash(dialogue.prompt),
      answer: replaceLongDash(dialogue.answer),
      source: replaceLongDash(dialogue.source),
    })),
    sources: philosopher.sources.map((source) => ({
      ...source,
      label: replaceLongDash(source.label),
      detail: replaceLongDash(source.detail),
    })),
    restingPlace: philosopher.restingPlace
      ? {
          ...philosopher.restingPlace,
          date: replaceLongDash(philosopher.restingPlace.date),
          label: replaceLongDash(philosopher.restingPlace.label),
          description: replaceLongDash(philosopher.restingPlace.description),
          sourceLabel: replaceLongDash(philosopher.restingPlace.sourceLabel),
        }
      : philosopher.restingPlace,
  };
}
