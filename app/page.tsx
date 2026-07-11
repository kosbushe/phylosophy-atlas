"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import CanonMap from "@/components/CanonMap";
import { canonFigures } from "@/lib/canon";
import { portraitIndex, portraitThumbnail } from "@/lib/portrait-index";

type QuestionTheme = {
  id: string;
  label: string;
  question: string;
  keywords: string[];
  philosophers: Array<{ slug: string; relevance: string }>;
};

const questionThemes: QuestionTheme[] = [
  {
    id: "freedom",
    label: "Свобода",
    question: "Что значит быть свободным, если обстоятельства, общество и желания нас ограничивают?",
    keywords: [
      "свобод",
      "выбор",
      "ответствен",
      "автоном",
      "зависим",
      "огранич",
      "воля",
    ],
    philosophers: [
      { slug: "epictetus", relevance: "Помещает свободу в наши суждения и выбор." },
      { slug: "zhuangzi", relevance: "Освобождает от одной жёсткой точки зрения." },
      { slug: "spinoza", relevance: "Связывает свободу с пониманием причин и аффектов." },
      { slug: "rousseau", relevance: "Показывает, как общий закон создаёт гражданскую свободу." },
      { slug: "sartre", relevance: "Делает нас ответственными за выбранный жизненный проект." },
      { slug: "beauvoir", relevance: "Требует хотеть свободы не только для себя." },
    ],
  },
  {
    id: "anxiety",
    label: "Тревога",
    question: "Почему нас тревожит будущее — и можно ли изменить отношение к неопределённости?",
    keywords: [
      "тревог",
      "страх",
      "неопредел",
      "беспокой",
      "контрол",
      "боюсь",
      "боять",
      "будущ",
      "паник",
      "пережив",
    ],
    philosophers: [
      { slug: "buddha", relevance: "Ищет причины неудовлетворённости в цеплянии." },
      { slug: "epicurus", relevance: "Разбирает страх смерти и ненужные желания." },
      { slug: "epictetus", relevance: "Отделяет подвластное нам от неподвластного." },
      { slug: "augustine", relevance: "Исследует беспокойство разделённой воли." },
      { slug: "schopenhauer", relevance: "Показывает страдание бесконечного желания." },
      { slug: "kierkegaard", relevance: "Понимает тревогу как головокружение свободы." },
    ],
  },
  {
    id: "meaning",
    label: "Смысл",
    question: "Что делает жизнь осмысленной, если готового ответа для всех не существует?",
    keywords: [
      "смысл",
      "жизн",
      "цель",
      "ценност",
      "зачем",
      "счаст",
      "пустот",
      "смерт",
    ],
    philosophers: [
      { slug: "confucius", relevance: "Строит достойную жизнь через характер и отношения." },
      { slug: "aristotle", relevance: "Связывает хорошую жизнь с деятельностью согласно добродетели." },
      { slug: "augustine", relevance: "Ищет цельность в верном порядке любви." },
      { slug: "kierkegaard", relevance: "Требует прожить выбор лично." },
      { slug: "nietzsche", relevance: "Проверяет ценности по формам жизни, которые они создают." },
      { slug: "sartre", relevance: "Смысл возникает через выбор и проект." },
    ],
  },
  {
    id: "power",
    label: "Власть",
    question: "Почему люди подчиняются власти — и когда власть становится законной?",
    keywords: [
      "власт",
      "государ",
      "полит",
      "управ",
      "сил",
      "подчин",
      "лидер",
      "началь",
      "закон",
    ],
    philosophers: [
      { slug: "confucius", relevance: "Ставит нравственный пример выше страха." },
      { slug: "plato", relevance: "Связывает управление со знанием блага." },
      { slug: "machiavelli", relevance: "Исследует сохранение государства и последствия решений." },
      { slug: "hobbes", relevance: "Выводит суверенную власть из потребности в безопасности." },
      { slug: "marx", relevance: "Находит власть в собственности, труде и классе." },
      { slug: "arendt", relevance: "Отличает совместную власть от насилия." },
    ],
  },
  {
    id: "justice",
    label: "Справедливость",
    question: "Что делает общество справедливым — равенство, польза, права или свобода?",
    keywords: [
      "справедлив",
      "равен",
      "право",
      "долг",
      "общество",
      "честн",
      "неравен",
      "морал",
      "этик",
    ],
    philosophers: [
      { slug: "mozi", relevance: "Судит нормы по общей пользе и беспристрастной заботе." },
      { slug: "plato", relevance: "Ищет справедливость как порядок души и города." },
      { slug: "locke", relevance: "Основывает власть на правах и согласии." },
      { slug: "wollstonecraft", relevance: "Требует равного образования и независимости." },
      { slug: "marx", relevance: "Обнаруживает эксплуатацию за формальным равенством." },
      { slug: "beauvoir", relevance: "Связывает справедливость со свободой каждого действовать." },
    ],
  },
  {
    id: "happiness",
    label: "Счастье",
    question: "Из чего складывается хорошая жизнь — из удовольствия, добродетели, свободы или внутреннего покоя?",
    keywords: ["счаст", "удоволь", "радост", "хорошая жизнь", "благополуч"],
    philosophers: [
      { slug: "buddha", relevance: "Связывает освобождение с прекращением цепляния." },
      { slug: "aristotle", relevance: "Понимает счастье как деятельность согласно добродетели." },
      { slug: "epicurus", relevance: "Отделяет устойчивое удовольствие от избыточных желаний." },
      { slug: "epictetus", relevance: "Помещает благополучие в область наших суждений и выбора." },
      { slug: "zhuangzi", relevance: "Ослабляет зависимость от одной меры успеха." },
      { slug: "russell", relevance: "Исследует практические источники несчастья и интереса к жизни." },
    ],
  },
  {
    id: "love",
    label: "Любовь",
    question: "Любовь — это чувство, выбор, способ познания другого или совместная практика свободы?",
    keywords: ["любов", "отношен", "близост", "друг", "семь"],
    philosophers: [
      { slug: "plato", relevance: "Показывает восхождение любви от желания к созерцанию прекрасного." },
      { slug: "confucius", relevance: "Видит человечность в качестве наших отношений." },
      { slug: "augustine", relevance: "Ставит вопрос о верном порядке любви." },
      { slug: "kierkegaard", relevance: "Отличает любовь как долг от одной лишь склонности." },
      { slug: "solovyov", relevance: "Понимает любовь как преодоление замкнутости отдельного я." },
      { slug: "beauvoir", relevance: "Требует союза двух свобод вместо присвоения другого." },
    ],
  },
  {
    id: "death",
    label: "Смерть",
    question: "Как знание о конечности меняет жизнь — и можно ли перестать бояться смерти?",
    keywords: ["смерт", "конечн", "умира", "страх смерти", "утрат"],
    philosophers: [
      { slug: "socrates", relevance: "Связывает философскую жизнь с готовностью отвечать за неё до конца." },
      { slug: "epicurus", relevance: "Разбирает логическую ошибку страха перед собственным небытием." },
      { slug: "buddha", relevance: "Делает непостоянство предметом практического внимания." },
      { slug: "schopenhauer", relevance: "Рассматривает смерть на фоне воли и индивидуальности." },
      { slug: "nietzsche", relevance: "Проверяет способность утвердить жизнь целиком." },
      { slug: "heidegger", relevance: "Показывает конечность как условие собственного выбора." },
    ],
  },
  {
    id: "knowledge",
    label: "Знание",
    question: "Что мы действительно можем знать — и как отличить знание от уверенного мнения?",
    keywords: ["знан", "опыт", "доказ", "сомнен", "разум"],
    philosophers: [
      { slug: "socrates", relevance: "Начинает исследование с признания границ знания." },
      { slug: "plato", relevance: "Отличает знание от мнения и изменчивой видимости." },
      { slug: "aristotle", relevance: "Строит знание через причины, наблюдение и доказательство." },
      { slug: "descartes", relevance: "Использует сомнение для поиска несомненного основания." },
      { slug: "hume", relevance: "Показывает пределы вывода из опыта." },
      { slug: "kant", relevance: "Исследует условия и границы возможного опыта." },
    ],
  },
  {
    id: "truth",
    label: "Истина",
    question: "Истина существует независимо от нас или всегда раскрывается через язык, перспективу и способ вопроса?",
    keywords: ["истин", "реальн", "факт", "лож", "объектив"],
    philosophers: [
      { slug: "parmenides", relevance: "Радикально отделяет бытие от человеческого мнения." },
      { slug: "plato", relevance: "Ищет устойчивый умопостигаемый порядок за видимостью." },
      { slug: "nagarjuna", relevance: "Показывает зависимость любого утверждения от условий и отношений." },
      { slug: "descartes", relevance: "Проверяет истину методом систематического сомнения." },
      { slug: "nietzsche", relevance: "Исследует перспективы и жизненные силы за претензиями на истину." },
      { slug: "heidegger", relevance: "Возвращает истине смысл раскрытия, а не только соответствия." },
    ],
  },
  {
    id: "responsibility",
    label: "Ответственность",
    question: "За что человек отвечает, если его выбор ограничен характером, обществом и обстоятельствами?",
    keywords: ["ответствен", "вина", "долг", "решен", "последств"],
    philosophers: [
      { slug: "confucius", relevance: "Начинает общественный порядок с работы над собственным характером." },
      { slug: "epictetus", relevance: "Отделяет наш выбор от неподвластных обстоятельств." },
      { slug: "kant", relevance: "Связывает ответственность с автономией и универсальным правилом." },
      { slug: "kierkegaard", relevance: "Требует лично прожить выбор, который нельзя делегировать." },
      { slug: "sartre", relevance: "Делает свободу неотделимой от ответственности." },
      { slug: "beauvoir", relevance: "Проверяет личную свободу её отношением к свободе других." },
    ],
  },
  {
    id: "society",
    label: "Общество",
    question: "Почему люди создают общество — и как совместная жизнь одновременно защищает и ограничивает нас?",
    keywords: ["обществ", "государ", "люди", "договор", "совмест"],
    philosophers: [
      { slug: "confucius", relevance: "Строит порядок через отношения, воспитание и ритуал." },
      { slug: "plato", relevance: "Связывает устройство города с устройством души." },
      { slug: "hobbes", relevance: "Выводит общество из потребности прекратить взаимную угрозу." },
      { slug: "rousseau", relevance: "Исследует переход от зависимости к гражданской свободе." },
      { slug: "marx", relevance: "Показывает материальные отношения и конфликт за юридическими формами." },
      { slug: "arendt", relevance: "Видит политику в совместном действии разных людей." },
    ],
  },
  {
    id: "god",
    label: "Бог",
    question: "Что может разум сказать о Боге — и где проходят границы доказательства, веры и языка?",
    keywords: ["бог", "вера", "религи", "дух", "творец"],
    philosophers: [
      { slug: "augustine", relevance: "Ищет Бога через память, волю и внутренний опыт." },
      { slug: "shankara", relevance: "Устраняет неведение о недвойственности Атмана и Брахмана." },
      { slug: "alfarabi", relevance: "Соотносит философское знание, религию и устройство города." },
      { slug: "avicenna", relevance: "Развивает аргумент от существования к Необходимо Сущему." },
      { slug: "maimonides", relevance: "Ограничивает положительные высказывания о Боге." },
      { slug: "aquinas", relevance: "Различает области разума и откровения, не разрывая их." },
    ],
  },
  {
    id: "self",
    label: "Я",
    question: "Есть ли внутри нас устойчивое я — или личность складывается из памяти, привычек, отношений и выбора?",
    keywords: ["я", "личност", "идентич", "себя", "характер"],
    philosophers: [
      { slug: "buddha", relevance: "Разбирает представление о неизменном я на процессы опыта." },
      { slug: "socrates", relevance: "Делает исследование собственной жизни философской практикой." },
      { slug: "augustine", relevance: "Исследует глубину памяти, воли и внутренней речи." },
      { slug: "hume", relevance: "Не находит за потоком восприятий отдельной неизменной сущности." },
      { slug: "kierkegaard", relevance: "Понимает я как отношение, которое должно стать собой." },
      { slug: "nietzsche", relevance: "Показывает множество сил и интерпретаций внутри субъекта." },
    ],
  },
  {
    id: "time",
    label: "Время",
    question: "Время существует само по себе или возникает в сознании, памяти, истории и нашей конечности?",
    keywords: ["врем", "прошл", "будущ", "настоящ", "истори"],
    philosophers: [
      { slug: "aristotle", relevance: "Связывает время с исчислением движения." },
      { slug: "augustine", relevance: "Находит прошлое и будущее в настоящем души." },
      { slug: "kant", relevance: "Понимает время как форму человеческого созерцания." },
      { slug: "hegel", relevance: "Раскрывает смысл через историческое движение целого." },
      { slug: "husserl", relevance: "Анализирует удержание прошедшего и ожидание будущего в опыте." },
      { slug: "heidegger", relevance: "Связывает человеческое существование с времённостью и конечностью." },
    ],
  },
  {
    id: "technology",
    label: "Технологии",
    question: "Техника остаётся инструментом человека — или незаметно перестраивает внимание, власть и сам способ видеть мир?",
    keywords: ["техник", "технолог", "цифров", "алгоритм", "данн", "ии", "интернет"],
    philosophers: [
      { slug: "bacon", relevance: "Связывает организованное знание с человеческой способностью действовать." },
      { slug: "heidegger", relevance: "Показывает, как техника задаёт способ раскрытия мира." },
      { slug: "benjamin", relevance: "Исследует, как воспроизводимость меняет искусство и восприятие." },
      { slug: "foucault", relevance: "Обнаруживает власть в аппаратах наблюдения, знания и нормализации." },
      { slug: "habermas", relevance: "Защищает пространство аргумента от системного и медийного давления." },
      { slug: "byungchulhan", relevance: "Разбирает цифровую психополитику, прозрачность и добровольное самораскрытие." },
    ],
  },
  {
    id: "work",
    label: "Работа",
    question: "Почему работа даёт достоинство и смысл, но одновременно может превращать свободу в истощение?",
    keywords: ["работ", "труд", "карьер", "выгоран", "успех", "продуктив", "устал"],
    philosophers: [
      { slug: "adamsmith", relevance: "Показывает силу и человеческую цену разделения труда." },
      { slug: "marx", relevance: "Анализирует отчуждение, эксплуатацию и власть собственности." },
      { slug: "freud", relevance: "Связывает труд с культурой, сублимацией и конфликтом желаний." },
      { slug: "arendt", relevance: "Различает труд, изготовление вещей и политическое действие." },
      { slug: "foucault", relevance: "Исследует дисциплину, норму и производство управляемого субъекта." },
      { slug: "byungchulhan", relevance: "Показывает, как требование достижений превращается в самоэксплуатацию." },
    ],
  },
  {
    id: "inequality",
    label: "Неравенство",
    question: "Какие различия допустимы — и когда социальный порядок лишает людей реальной возможности жить и действовать?",
    keywords: ["неравен", "бедност", "дискримин", "рас", "каст", "гендер", "возможност"],
    philosophers: [
      { slug: "wollstonecraft", relevance: "Связывает равенство с образованием и независимым разумом." },
      { slug: "marx", relevance: "Ищет структурное неравенство в собственности и организации труда." },
      { slug: "dubois", relevance: "Анализирует расовую границу и двойное сознание." },
      { slug: "ambedkar", relevance: "Требует уничтожения касты, а не косметического смягчения её последствий." },
      { slug: "beauvoir", relevance: "Показывает, как женщина производится как социальный Другой." },
      { slug: "amartyasen", relevance: "Сравнивает не только ресурсы, но и реальные человеческие возможности." },
    ],
  },
];

const landmarkSlugs = new Set([
  "buddha",
  "confucius",
  "socrates",
  "plato",
  "aristotle",
  "nagarjuna",
  "machiavelli",
  "spinoza",
  "kant",
  "nietzsche",
  "ambedkar",
  "foucault",
  "rawls",
  "byungchulhan",
]);

function createSpiralPoints(count: number) {
  const samples: Array<{ x: number; y: number; distance: number }> = [];
  let totalDistance = 0;

  for (let index = 0; index <= 2400; index += 1) {
    const t = index / 2400;
    const angle = -2.5 + t * Math.PI * 6;
    const radiusX = 47 - 27 * t;
    const radiusY = 44 - 26 * t;
    const point = {
      x: 50 + Math.cos(angle) * radiusX,
      y: 50 + Math.sin(angle) * radiusY,
      distance: totalDistance,
    };
    const previous = samples.at(-1);

    if (previous) {
      totalDistance += Math.hypot(
        (point.x - previous.x) * 1.62,
        point.y - previous.y,
      );
      point.distance = totalDistance;
    }

    samples.push(point);
  }

  return Array.from({ length: count }, (_, index) => {
    const target = (totalDistance * index) / Math.max(1, count - 1);
    const point =
      samples.find((sample) => sample.distance >= target) ??
      samples[samples.length - 1];

    return {
      x: Number(point.x.toFixed(4)),
      y: Number(point.y.toFixed(4)),
    };
  });
}

const spiralPoints = createSpiralPoints(canonFigures.length);
const spiralPolyline = spiralPoints.map((point) => `${point.x},${point.y}`).join(" ");

export default function Home() {
  const themePicker = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeThemeId, setActiveThemeId] = useState<string | null>(null);
  const [routeNotice, setRouteNotice] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const activeTheme = questionThemes.find((theme) => theme.id === activeThemeId) ?? null;
  const highlightedSlugs = activeTheme?.philosophers.map((item) => item.slug) ?? [];
  const highlightedSet = new Set(highlightedSlugs);
  const routeFigures = highlightedSlugs
    .map((slug) => canonFigures.find((figure) => figure.id === slug))
    .filter((figure): figure is (typeof canonFigures)[number] => Boolean(figure));
  const previewFigure =
    canonFigures.find((figure) => figure.id === selectedSlug) ?? null;
  const hasRoute = routeFigures.length > 0;

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        window.setTimeout(() => menuButton.current?.focus(), 0);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function selectTheme(theme: QuestionTheme) {
    setActiveThemeId(theme.id);
    setRouteNotice(theme.question);
    setQuery(theme.label);
    setSelectedSlug(null);
  }

  function clearRoute() {
    setActiveThemeId(null);
    setRouteNotice(null);
    setSelectedSlug(null);
    setQuery("");
    window.setTimeout(() => themePicker.current?.querySelector("button")?.focus(), 0);
  }

  function openPortrait(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setSelectedSlug(slug);
  }

  function focusQuestion() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    themePicker.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
    window.setTimeout(
      () => themePicker.current?.querySelector("button")?.focus(),
      reducedMotion ? 0 : 350,
    );
  }

  return (
    <main className="home-v2-shell">
      <header className="home-v2-header">
        <Link className="home-v2-wordmark" href="/" aria-label="Философская карта, главная">
          Философская карта
        </Link>
        <nav
          className={`home-v2-nav ${menuOpen ? "is-open" : ""}`}
          id="home-navigation"
          aria-label="Основная навигация"
        >
          <a href="#canon-map" onClick={() => setMenuOpen(false)}>
            Философы
          </a>
          <a href="#ask" onClick={() => setMenuOpen(false)}>
            Темы
          </a>
          <a href="#chronology" onClick={() => setMenuOpen(false)}>
            Хронология
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            О проекте
          </a>
        </nav>
        <button
          className="home-v2-search-trigger"
          type="button"
          onClick={() => {
            setMenuOpen(false);
            focusQuestion();
          }}
        >
          <span aria-hidden="true">⌕</span>
          Темы
        </button>
        <button
          ref={menuButton}
          className={`home-v2-menu ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-controls="home-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      <section
        className={`home-v2-hero ${previewFigure ? "has-preview" : ""}`}
        id="ask"
      >
        <div className="home-v2-stage">
        <svg
          className="spiral-line"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline points={spiralPolyline} pathLength="1" />
        </svg>

        <div className="home-v2-core">
          <p className="home-v2-kicker">100 философов · 700 идей · 2500 лет</p>
          <h1>
            100 философов.
            <br />
            Выберите тему.
          </h1>
          <p className="home-v2-lead">
            {hasRoute
              ? `Маршрут готов: ${routeFigures.length} точек зрения. Выберите мыслителя и сравните позиции.`
              : "Не нужно формулировать идеальный вопрос. Выберите одну тему — карта покажет, с каких идей начать и где философы расходятся."}
          </p>

          {hasRoute ? (
            <div className="home-v2-route" aria-live="polite">
              <div className="home-v2-route-head">
                <span>Маршрут по теме · {routeFigures.length}</span>
                <button type="button" onClick={clearRoute}>
                  Все темы
                </button>
              </div>
              <p>{query}</p>
              <div className="home-v2-route-steps" aria-label="Подобранные философы">
                {routeFigures.map((figure, index) => (
                  <button
                    className={selectedSlug === figure.id ? "is-active" : ""}
                    key={figure.id}
                    type="button"
                    onClick={() => setSelectedSlug(figure.id)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {figure.name}
                  </button>
                ))}
              </div>
              <small>
                {routeNotice} Это редакционный маршрут, а не автоматический ответ.
                Начните с любого имени: порядок не означает, что одна позиция
                «правильнее» другой.
              </small>
            </div>
          ) : (
            <div className="home-v2-topic-picker" ref={themePicker}>
              <div className="home-v2-topic-heading">
                <strong>Выберите одну тему</strong>
                <span>18 редакционных маршрутов</span>
              </div>
              <div className="home-v2-themes" role="group" aria-label="Темы философского маршрута">
                {questionThemes.map((theme) => (
                  <button
                    className={activeThemeId === theme.id ? "is-active" : ""}
                    key={theme.id}
                    type="button"
                    onClick={() => selectTheme(theme)}
                    aria-pressed={activeThemeId === theme.id}
                    title={theme.question}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
              <p>
                Карта не ведёт свободный чат и не выдаёт готовый совет. Она собирает
                проверяемый маршрут из шести разных философских позиций.
              </p>
            </div>
          )}

          {previewFigure ? (
            <div className="home-v2-touch-selection" aria-live="polite">
              <span>
                {previewFigure.index} · {previewFigure.name}
              </span>
              <Link href={`/${previewFigure.id}`}>Открыть философа →</Link>
            </div>
          ) : null}
        </div>

        <div className="spiral-portraits" aria-label="Хронология 100 философов">
          {canonFigures.map((figure, index) => {
            const point = spiralPoints[index];
            const isSelected = previewFigure?.id === figure.id;
            const isRelevant = highlightedSet.has(figure.id) || isSelected;
            const hasSelection = highlightedSlugs.length > 0 || Boolean(previewFigure);
            const isPinned = selectedSlug === figure.id;
            const isLandmark = landmarkSlugs.has(figure.id);
            const classes = [
              "spiral-node",
              isLandmark ? "is-landmark" : "",
              isRelevant ? "is-relevant" : "",
              hasSelection && !isRelevant ? "is-muted" : "",
              isSelected ? "is-selected" : "",
              isPinned ? "is-pinned" : "",
              point.y > 72 ? "is-lower" : "",
              point.x < 18 ? "is-left-edge" : "",
              point.x > 82 ? "is-right-edge" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const style = {
              "--spiral-x": `${point.x}%`,
              "--spiral-y": `${point.y}%`,
              "--spiral-delay": `${index * 12}ms`,
            } as CSSProperties;

            return (
              <Link
                className={classes}
                href={`/${figure.id}`}
                key={figure.id}
                style={style}
                aria-label={`${figure.index}. ${figure.name}, ${figure.dates}. Открыть краткую карточку.`}
                aria-expanded={isSelected}
                aria-controls="philosopher-preview"
                onClick={(event) => openPortrait(event, figure.id)}
              >
                <span className="spiral-node-index">{figure.index}</span>
                <span className="spiral-node-image" data-initial={figure.name.slice(0, 1)}>
                  {portraitIndex[figure.id] ? (
                    <img
                      src={portraitThumbnail(portraitIndex[figure.id])}
                      alt=""
                      width={320}
                      height={320}
                      loading={index < 12 ? "eager" : "lazy"}
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.hidden = true;
                      }}
                    />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </div>
        </div>

        {previewFigure ? (
          <aside
            className="home-v2-preview-card is-pinned"
            id="philosopher-preview"
            aria-label={`Кратко о философе: ${previewFigure.name}`}
          >
            <div className="home-v2-preview-meta">
              <span>{previewFigure.index} / 100</span>
              <small>{previewFigure.tradition}</small>
              <button
                type="button"
                onClick={() => setSelectedSlug(null)}
                aria-label="Закрыть карточку"
              >
                ×
              </button>
            </div>
            <div className="home-v2-preview-person">
              <span
                className="home-v2-preview-portrait"
                data-initial={previewFigure.name.slice(0, 1)}
              >
                {portraitIndex[previewFigure.id] ? (
                  <img
                    src={portraitThumbnail(portraitIndex[previewFigure.id])}
                    alt={`Портрет: ${previewFigure.name}`}
                    width={240}
                    height={240}
                    referrerPolicy="no-referrer"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.hidden = true;
                    }}
                  />
                ) : null}
              </span>
              <div>
                <strong>{previewFigure.name}</strong>
                <small className="home-v2-preview-dates">{previewFigure.dates}</small>
              </div>
            </div>
            <p>
              {activeTheme?.philosophers.find(
                (item) => item.slug === previewFigure.id,
              )?.relevance ?? previewFigure.focus}
            </p>
            <div className="home-v2-preview-action">
              <Link href={`/${previewFigure.id}`}>Открыть полную страницу →</Link>
              <span>Выберите другой портрет — карточка обновится здесь же</span>
            </div>
          </aside>
        ) : null}

      </section>

      <section className="home-v2-bridge" id="thinkers">
        <p>Не ищите одного правильного ответа.</p>
        <h2>Посмотрите, где мыслители соглашаются, спорят и меняют сам вопрос.</h2>
        <div>
          <span>18</span>
          <small>тематических маршрутов</small>
          <span>10</span>
          <small>исторических эпох</small>
          <span>100</span>
          <small>философов и спутников</small>
        </div>
      </section>

      <CanonMap />

      <section className="home-v2-about" id="about">
        <p className="section-number">КАК УСТРОЕНА КАРТА / 01</p>
        <div>
          <h2>Не справка. Инструмент для собственного мышления.</h2>
          <p>
            У каждого философа — контекст эпохи, семь идей на понятном языке,
            современные примеры, проверенная цитата, источники и возможность
            сохранить собственную заметку.
          </p>
        </div>
        <ol>
          <li>
            <span>01</span>
            <strong>Начните с вопроса</strong>
            <p>Не нужно заранее знать, кто вам нужен — Кант, Будда или Арендт.</p>
          </li>
          <li>
            <span>02</span>
            <strong>Сравните ответы</strong>
            <p>Карта показывает несколько традиций, а не выдаёт одну удобную истину.</p>
          </li>
          <li>
            <span>03</span>
            <strong>Откройте первоисточники</strong>
            <p>Цитаты и реконструкции отделены от редакторских примеров.</p>
          </li>
        </ol>
      </section>

      <footer className="home-v2-footer" id="project-footer">
        <div className="home-v2-footer-main">
          <div>
            <Link href="/">Философская карта</Link>
            <p>Личный образовательный атлас мировой философии.</p>
          </div>
          <div className="home-v2-footer-authors">
            <p>Авторы проекта</p>
            <div>
              <span>Создан</span>
              <a
                href="https://t.me/Speaker_cafe"
                target="_blank"
                rel="noreferrer"
              >
                Константин Буше ↗
              </a>
              <a
                href="https://www.konstantinbushe.ru"
                target="_blank"
                rel="noreferrer"
              >
                konstantinbushe.ru
              </a>
            </div>
            <div>
              <span>С подачи</span>
              <a
                href="https://t.me/zibareffIlya"
                target="_blank"
                rel="noreferrer"
              >
                Илья Зибарев ↗
              </a>
              <a
                href="https://www.zibarev.com"
                target="_blank"
                rel="noreferrer"
              >
                zibarev.com
              </a>
            </div>
          </div>
          <nav aria-label="Навигация в подвале">
            <a href="#canon-map">Все философы</a>
            <a href="#chronology">Хронология</a>
            <a href="#about">О проекте</a>
            <a href="#ask">Задать вопрос ↑</a>
          </nav>
        </div>
        <div className="home-v2-footer-note">
          <p>
            Материалы подготовлены по открытым и публично доступным источникам.
            Первоисточники, академические справочники и атрибуция изображений
            указаны на страницах философов.
          </p>
          <nav aria-label="Правовая информация">
            <Link href="/legal#sources">Источники и редакционная политика</Link>
            <Link href="/legal#terms">Условия использования</Link>
            <Link href="/legal#privacy">Конфиденциальность</Link>
            <Link href="/legal#rights">Правообладателям</Link>
          </nav>
        </div>
        <div className="home-v2-footer-bottom" id="project-footer-bottom">
          <span>© 2026 Философская карта</span>
          <a
            href="https://www.bushe.online"
            target="_blank"
            rel="noreferrer"
          >
            bushe.online · обмен опытом ↗
          </a>
          <span>Образовательный проект · не является публичной офертой</span>
        </div>
      </footer>
    </main>
  );
}
