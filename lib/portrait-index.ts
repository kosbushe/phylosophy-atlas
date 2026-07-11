export type PortraitReference = {
  src: string;
  thumb?: string;
  alt: string;
  credit?: string;
  source?: string;
};

const verifiedSupplementAttribution: Record<string, { credit: string; source: string }> = {
  xunzi: {
    credit: "Автор неизвестен · общественное достояние",
    source: "https://commons.wikimedia.org/wiki/File:Portrait_of_Xun_Zi.jpg",
  },
  zeno: {
    credit: "Paolo Monti · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Paolo_Monti_-_Servizio_fotografico_(Napoli,_1969)_-_BEIC_6353768.jpg",
  },
  seneca: {
    credit: "Calidius · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Duble_herma_of_Socrates_and_Seneca_Antikensammlung_Berlin_07.jpg",
  },
  kautilya: {
    credit: "Автор неизвестен · общественное достояние",
    source: "https://commons.wikimedia.org/wiki/File:Chanakya_artistic_depiction.jpg",
  },
  alkindi: {
    credit: "Iraqi Post · общественное достояние",
    source: "https://commons.wikimedia.org/wiki/File:Stamp_IQ_1962_6f.jpg",
  },
  christinedepizan: {
    credit: "British Library, Harley 4431 · общественное достояние",
    source: "https://commons.wikimedia.org/wiki/File:Christine_de_Pisan_-_cathedra.jpg",
  },
  ibnkhaldun: {
    credit: "Reda Kerbush · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Bust_of_Ibn_Khaldun_(Casbah_of_Bejaia,_Algeria).jpg",
  },
  adamsmith: {
    credit: "Автор неизвестен · общественное достояние",
    source: "https://commons.wikimedia.org/wiki/File:Adam_Smith_The_Muir_portrait.jpg",
  },
  berkeley: {
    credit: "John Smibert · общественное достояние",
    source: "https://commons.wikimedia.org/wiki/File:John_Smibert_-_Bishop_George_Berkeley_-_Google_Art_Project_(cropped).jpg",
  },
};

const checkedSupplementPortraits = Object.fromEntries(
  [
    ["mencius", "Мэн-цзы", "Mencius"],
    ["kautilya", "Каутилья", "Chanakya"],
    ["zeno", "Зенон Китийский", "Zeno_of_Citium"],
    ["xunzi", "Сюнь-цзы", "Xunzi_(philosopher)"],
    ["seneca", "Сенека", "Seneca_the_Younger"],
    ["vasubandhu", "Васубандху", "Vasubandhu"],
    ["alkindi", "Аль-Кинди", "Al-Kindi"],
    ["dogen", "Догэн", "Dogen"],
    ["ockham", "Уильям Оккам", "William_of_Ockham"],
    ["ibnkhaldun", "Ибн Хальдун", "Ibn_Khaldun"],
    ["christinedepizan", "Кристина Пизанская", "Christine_de_Pizan"],
    ["bacon", "Фрэнсис Бэкон", "Francis_Bacon"],
    ["pascal", "Блез Паскаль", "Blaise_Pascal"],
    ["berkeley", "Джордж Беркли", "George_Berkeley"],
    ["adamsmith", "Адам Смит", "Adam_Smith"],
    ["mill", "Джон Стюарт Милль", "John_Stuart_Mill"],
    ["dostoevsky", "Фёдор Достоевский", "Fyodor_Dostoevsky"],
    ["tolstoy", "Лев Толстой", "Leo_Tolstoy"],
    ["peirce", "Чарльз Сандерс Пирс", "Charles_Sanders_Peirce"],
    ["williamjames", "Уильям Джеймс", "William_James"],
    ["freud", "Зигмунд Фрейд", "Sigmund_Freud"],
    ["bergson", "Анри Бергсон", "Henri_Bergson"],
    ["dewey", "Джон Дьюи", "John_Dewey"],
    ["dubois", "Уильям Эдуард Бёркхардт Дюбуа", "W._E._B._Du_Bois"],
    ["gandhi", "Махатма Ганди", "Mahatma_Gandhi"],
    ["iqbal", "Мухаммад Икбал", "Muhammad_Iqbal"],
    ["ambedkar", "Бхимрао Рамджи Амбедкар", "B._R._Ambedkar"],
    ["benjamin", "Вальтер Беньямин", "Walter_Benjamin"],
    ["popper", "Карл Поппер", "Karl_Popper"],
    ["adorno", "Теодор Адорно", "Theodor_W._Adorno"],
    ["levinas", "Эммануэль Левинас", "Emmanuel_Levinas"],
    ["merleauponty", "Морис Мерло-Понти", "Maurice_Merleau-Ponty"],
    ["simoneweil", "Симона Вейль", "Simone_Weil"],
    ["camus", "Альбер Камю", "Albert_Camus"],
    ["rawls", "Джон Ролз", "John_Rawls"],
  ].map(([slug, name, article]) => {
    const attribution = verifiedSupplementAttribution[slug];
    return [slug, {
      src: `/portraits/${slug}.webp`,
      alt: `Историческое или фотографическое изображение: ${name}`,
      credit:
        attribution?.credit ??
        "Открытое изображение Wikimedia; автор и лицензия указаны по ссылке",
      source: attribution?.source ?? `https://en.wikipedia.org/wiki/${article}`,
    }];
  }),
) as Record<string, PortraitReference>;

export const portraitIndex: Partial<Record<string, PortraitReference>> = {
  "buddha": {
    "src": "/portraits/buddha.webp",
    "alt": "Гандхарское изображение медитирующего Будды, созданное через много веков после его жизни"
  },
  "confucius": {
    "src": "/portraits/confucius.webp",
    "alt": "Позднее традиционное изображение Конфуция, приписываемое художественной традиции эпохи Тан"
  },
  "heraclitus": {
    "src": "/portraits/heraclitus.webp",
    "alt": "Воображаемый портрет Гераклита кисти Йоханнеса Морелсе, XVII век"
  },
  "parmenides": {
    "src": "/portraits/parmenides.webp",
    "alt": "Поздний бюст, традиционно идентифицируемый как Парменид"
  },
  "laozi": {
    "src": "/portraits/laozi.webp",
    "alt": "Позднее изображение Лао-цзы верхом на быке кисти Чжан Лу"
  },
  "mozi": {
    "src": "/portraits/mozi.webp",
    "alt": "Позднее традиционное изображение Мо-цзы"
  },
  "socrates": {
    "src": "/portraits/socrates.webp",
    "alt": "Гравюрное изображение Сократа по античному скульптурному типу"
  },
  "plato": {
    "src": "/portraits/plato.webp",
    "alt": "Римская копия греческого портретного типа Платона, связанного с Силанионом"
  },
  "diogenes": {
    "src": "/portraits/diogenes.webp",
    "alt": "Картина Жана-Леона Жерома «Диоген», созданная в XIX веке"
  },
  "aristotle": {
    "src": "/portraits/aristotle.webp",
    "alt": "Римская копия античного портретного типа Аристотеля"
  },
  "zhuangzi": {
    "src": "/portraits/zhuangzi.webp",
    "alt": "Позднее условное изображение Чжуан-цзы"
  },
  "epicurus": {
    "src": "/portraits/epicurus.webp",
    "alt": "Римский мраморный бюст Эпикура по греческому оригиналу"
  },
  "epictetus": {
    "src": "/portraits/epictetus.webp",
    "alt": "Позднее гравюрное изображение Эпиктета"
  },
  "nagarjuna": {
    "src": "/portraits/nagarjuna.webp",
    "alt": "Традиционное тибетское изображение Нагарджуны, а не прижизненный портрет"
  },
  "plotinus": {
    "src": "/portraits/plotinus.webp",
    "alt": "Мраморная голова III века, традиционно отождествляемая с Плотином"
  },
  "augustine": {
    "src": "/portraits/augustine.webp",
    "alt": "Фреска Сандро Боттичелли со святым Августином, XV век"
  },
  "shankara": {
    "src": "/portraits/shankara.webp",
    "alt": "Позднее художественное изображение Шанкары"
  },
  "alfarabi": {
    "src": "/portraits/alfarabi.webp",
    "alt": "Современное условное изображение аль-Фараби"
  },
  "avicenna": {
    "src": "/portraits/avicenna.webp",
    "alt": "Посмертный европейский портрет Ибн Сины, опубликованный в 1584 году"
  },
  "alghazali": {
    "src": "/portraits/alghazali.webp",
    "alt": "Позднее условное изображение аль-Газали"
  },
  "averroes": {
    "src": "/portraits/averroes.webp",
    "alt": "Гравированный посмертный портрет Ибн Рушда по образу Рафаэля"
  },
  "zhuxi": {
    "src": "/portraits/zhuxi.webp",
    "alt": "Традиционный портрет Чжу Си"
  },
  "maimonides": {
    "src": "/portraits/maimonides.webp",
    "alt": "Широко известный поздний воображаемый портрет Маймонида"
  },
  "aquinas": {
    "src": "/portraits/aquinas.webp",
    "alt": "Поздняя гравюра Фомы Аквинского"
  },
  "machiavelli": {
    "src": "/portraits/machiavelli.webp",
    "alt": "Посмертный портрет Никколо Макиавелли кисти Санти ди Тито"
  },
  "hobbes": {
    "src": "/portraits/hobbes.webp",
    "alt": "Портрет Томаса Гоббса кисти Джона Майкла Райта"
  },
  "descartes": {
    "src": "/portraits/descartes.webp",
    "alt": "Портрет Рене Декарта кисти Франса Халса"
  },
  "zerayacob": {
    "src": "/portraits/zerayacob.webp",
    "alt": "Позднее художественное изображение Зэра Яыкоба",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Zara_Yaqob.jpg"
  },
  "spinoza": {
    "src": "/portraits/spinoza.webp",
    "alt": "Портрет Баруха Спинозы, созданный неизвестным художником"
  },
  "locke": {
    "src": "/portraits/locke.webp",
    "alt": "Портрет Джона Локка кисти Годфри Неллера"
  },
  "leibniz": {
    "src": "/portraits/leibniz.webp",
    "alt": "Портрет Готфрида Вильгельма Лейбница кисти Бернхарда Кристофа Франке"
  },
  "hume": {
    "src": "/portraits/hume.webp",
    "alt": "Портрет Дэвида Юма кисти Аллана Рэмзи"
  },
  "rousseau": {
    "src": "/portraits/rousseau.webp",
    "alt": "Портрет Жан-Жака Руссо кисти Мориса Кантена де Латура"
  },
  "kant": {
    "src": "/portraits/kant.webp",
    "alt": "Портрет Иммануила Канта"
  },
  "wollstonecraft": {
    "src": "/portraits/wollstonecraft.webp",
    "alt": "Портрет Мэри Уолстонкрафт кисти Джона Опи"
  },
  "hegel": {
    "src": "/portraits/hegel.webp",
    "alt": "Портрет Георга Вильгельма Фридриха Гегеля кисти Якоба Шлезингера"
  },
  "schopenhauer": {
    "src": "/portraits/schopenhauer.webp",
    "alt": "Фотографический портрет Артура Шопенгауэра, снятый Иоганном Шефером"
  },
  "kierkegaard": {
    "src": "/portraits/kierkegaard.webp",
    "alt": "Рисунок Сёрена Кьеркегора"
  },
  "marx": {
    "src": "/portraits/marx.webp",
    "alt": "Фотографический портрет Карла Маркса"
  },
  "nietzsche": {
    "src": "/portraits/nietzsche.webp",
    "alt": "Фотографический портрет Фридриха Ницше 1882 года"
  },
  "solovyov": {
    "src": "/portraits/solovyov.webp",
    "alt": "Портрет Владимира Соловьёва кисти Николая Ярошенко"
  },
  "husserl": {
    "src": "/portraits/husserl.webp",
    "alt": "Фотографический портрет Эдмунда Гуссерля"
  },
  "nishida": {
    "src": "/portraits/nishida.webp",
    "alt": "Фотографический портрет Нисиды Китаро"
  },
  "russell": {
    "src": "/portraits/russell.webp",
    "alt": "Фотографический портрет Бертрана Рассела, 1936 год"
  },
  "berdyaev": {
    "src": "/portraits/berdyaev.webp",
    "alt": "Фотографический портрет Николая Бердяева"
  },
  "heidegger": {
    "src": "/portraits/heidegger.webp",
    "alt": "Фотографический портрет Мартина Хайдеггера около 1960 года"
  },
  "wittgenstein": {
    "src": "/portraits/wittgenstein.webp",
    "alt": "Фотографический портрет Людвига Витгенштейна, 1929 год"
  },
  "sartre": {
    "src": "/portraits/sartre.webp",
    "alt": "Фотографический портрет Жан-Поля Сартра"
  },
  "arendt": {
    "src": "/portraits/arendt.webp",
    "alt": "Фотографический портрет Ханны Арендт"
  },
  "beauvoir": {
    "src": "/portraits/beauvoir.webp",
    "alt": "Фотографический портрет Симоны де Бовуар"
  },
  "byungchulhan": {
    "src": "https://upload.wikimedia.org/wikipedia/commons/4/4d/2015_Byung-Chul_Han_%283x4_cropped%29.jpg",
    "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/2015_Byung-Chul_Han_%283x4_cropped%29.jpg/330px-2015_Byung-Chul_Han_%283x4_cropped%29.jpg",
    "alt": "Фотографический портрет Бён-Чхоль Хана, 2015 год",
    "credit": "ActuaLitté · CC BY-SA 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:2015_Byung-Chul_Han_(3x4_cropped).jpg"
  },
  "sextus": {
    "src": "/portraits/sextus.webp",
    "alt": "Поздняя гравюра Секста Эмпирика",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Sextus.jpg"
  },
  "dignaga": {
    "src": "/portraits/dignaga.webp",
    "alt": "Традиционное изображение Дигнаги, обучающего буддийской логике",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:218_Dignaga_Teaching_Buddhist_Logic.jpg"
  },
  "dunsscotus": {
    "src": "/portraits/dunsscotus.webp",
    "alt": "Позднее художественное изображение Иоанна Дунса Скота",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Scoto_(Duns_Scoto).jpg"
  },
  "jung": {
    "src": "/portraits/jung.webp",
    "alt": "Фотографический портрет Карла Густава Юнга",
    "credit": "ETH-Bibliothek Zürich · Wikimedia Commons",
    "source": "https://commons.wikimedia.org/wiki/File:ETH-BIB-Jung,_Carl_Gustav_(1875-1961)-Portrait-Portr_14163_(cropped).tif"
  },
  "anscombe": {
    "src": "/portraits/anscombe.webp",
    "alt": "Фотографический портрет Гертруды Элизабет Маргарет Энском",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Elisabeth_Anscombe.jpg"
  },
  "kuhn": {
    "src": "/portraits/kuhn.webp",
    "alt": "Фотографический портрет Томаса Куна",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Thomas_Kuhn_(1977)_(cropped).jpg"
  },
  "deleuze": {
    "src": "/portraits/deleuze.webp",
    "alt": "Фотографический портрет Жиля Делёза",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:AVT_Gilles-Deleuze_6342.webp"
  },
  "fanon": {
    "src": "/portraits/fanon.webp",
    "alt": "Фотографический портрет Франца Фанона",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Photograph_of_Frantz_Fanon_from_Black_Skin_White_Masks_(1967)_dust_jacket.webp"
  },
  "foucault": {
    "src": "/portraits/foucault.webp",
    "alt": "Фотографический портрет Мишеля Фуко, около 1970 года",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Photo_of_Michel_Foucault_on_1970_dustjacket_of_The_Order_of_Things.jpg"
  },
  "habermas": {
    "src": "/portraits/habermas.webp",
    "alt": "Фотографический портрет Юргена Хабермаса",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:JuergenHabermas_crop1.jpg"
  },
  "derrida": {
    "src": "/portraits/derrida.webp",
    "alt": "Фотографический портрет Жака Деррида",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Derrida_EHESS_(cropped).png"
  },
  "amartyasen": {
    "src": "/portraits/amartyasen.webp",
    "alt": "Фотографический портрет Амартии Сена",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Amartya_Sen_20071128_cologne_cropped.jpg"
  },
  "judithbutler": {
    "src": "/portraits/judithbutler.webp",
    "alt": "Фотографический портрет Джудит Батлер",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:JudithButler2013.jpg"
  },
  "mbembe": {
    "src": "/portraits/mbembe.webp",
    "alt": "Фотографический портрет Ашиля Мбембе",
    "credit": "Wikimedia Commons; автор и лицензия указаны по ссылке",
    "source": "https://commons.wikimedia.org/wiki/File:Achille_Mbembe_2.JPG"
  },
  ...checkedSupplementPortraits,
} as const;

export function portraitAtWidth(portrait: PortraitReference, width: number) {
  return portrait.src.replace(/([?&]width=)\d+/, `$1${width}`);
}

export function portraitThumbnail(portrait?: PortraitReference) {
  if (!portrait) {
    return "/portrait-placeholder.svg";
  }

  if (portrait.thumb) {
    return portrait.thumb;
  }

  if (/^\/portraits\/[^/]+\.webp$/.test(portrait.src)) {
    return portrait.src.replace("/portraits/", "/portraits/thumb/");
  }

  return portraitAtWidth(portrait, 320);
}
