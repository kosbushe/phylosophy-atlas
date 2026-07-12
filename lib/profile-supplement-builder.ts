import type { Dialogue, Philosopher } from "@/lib/philosophers";
import { portraitIndex } from "@/lib/portrait-index";

type IdeaSeed = readonly [title: string, text: string, example: string];
type MilestoneSeed = readonly [date: string, title: string, text: string];
type SourceSeed = readonly [label: string, detail: string, href: string];

export type SupplementProfileSeed = {
  slug: string;
  name: string;
  nameGenitive?: string;
  birthPlace?: Philosopher["birthPlace"];
  restingPlace?: Philosopher["restingPlace"];
  nativeName: string;
  dates: string;
  century: string;
  region: string;
  tradition: string;
  oneLine: string;
  mainQuestion: string;
  method: string;
  changed: string;
  sourceNote: string;
  helicopter: string;
  ideas: readonly IdeaSeed[];
  milestones: readonly MilestoneSeed[];
  quote: Philosopher["quote"];
  distortion: readonly [myth: string, correction: string];
  sources: readonly SourceSeed[];
  portrait?: string;
  portraitAlt?: string;
  portraitCredit?: string;
  portraitSource?: string;
  sourceStatus?: string;
  dialogues?: readonly Dialogue[];
  satellite?: boolean;
};

function editorialDialogues(seed: SupplementProfileSeed): Dialogue[] {
  const keywords = seed.ideas
    .flatMap(([title]) => title.toLocaleLowerCase("ru").split(/\s+/))
    .filter((word) => word.length > 4)
    .slice(0, 8);

  return [
    {
      prompt: seed.mainQuestion,
      answer: seed.helicopter,
      source: `Редакторская реконструкция по корпусу ${seed.name} и источникам страницы`,
      keywords,
    },
    {
      prompt: "С чего начать применять эту философию сегодня?",
      answer: `${seed.ideas[0][1]} Практический вход: ${seed.ideas[0][2]}`,
      source: "Редакторская аналогия; не цитата и не готовый совет",
      keywords: [...keywords, "сегодня", "примен", "начать", "практик"],
    },
    {
      prompt: "Где эту позицию чаще всего упрощают?",
      answer: seed.distortion[1],
      source: "Редакторское предостережение по академическим источникам страницы",
      keywords: [...keywords, "упрощ", "ошиб", "миф", "искаж"],
    },
  ];
}

export function defineSupplementProfile(seed: SupplementProfileSeed): Philosopher {
  if (seed.ideas.length !== 7) {
    throw new Error(`${seed.slug}: профиль должен содержать ровно семь идей.`);
  }

  const checkedPortrait = portraitIndex[seed.slug];
  const portrait = seed.portrait ?? checkedPortrait?.src ?? "/portrait-placeholder.svg";

  return {
    slug: seed.slug,
    index: "",
    name: seed.name,
    nameGenitive: seed.nameGenitive,
    birthPlace: seed.birthPlace,
    restingPlace: seed.restingPlace,
    nativeName: seed.nativeName,
    dates: seed.dates,
    century: seed.century,
    region: seed.region,
    tradition: seed.tradition,
    color: "#d43b2d",
    mapPosition: "50%",
    portrait,
    portraitAlt:
      seed.portraitAlt ??
      checkedPortrait?.alt ??
      `Условная портретная карточка: изображение ${seed.name} ещё проходит лицензионную проверку`,
    portraitCredit:
      seed.portraitCredit ??
      checkedPortrait?.credit ??
      "Временная редакционная карточка до завершения лицензионной проверки изображения",
    portraitSource:
      seed.portraitSource ?? checkedPortrait?.source ?? seed.sources[0][2],
    oneLine: seed.oneLine,
    mainQuestion: seed.mainQuestion,
    method: seed.method,
    changed: seed.changed,
    sourceStatus:
      seed.sourceStatus ??
      (seed.satellite ? "Фигура-спутник · прямой авторский корпус" : "Прямой авторский корпус"),
    sourceNote: seed.sourceNote,
    helicopter: seed.helicopter,
    ideas: seed.ideas.map(([title, text, example]) => ({ title, text, example })),
    milestones: seed.milestones.map(([date, title, text]) => ({ date, title, text })),
    quote: seed.quote,
    distortion: {
      myth: seed.distortion[0],
      correction: seed.distortion[1],
    },
    dialogues: seed.dialogues ? [...seed.dialogues] : editorialDialogues(seed),
    sources: seed.sources.map(([label, detail, href]) => ({ label, detail, href })),
  };
}
