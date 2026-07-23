import Link from "next/link";
import { LanguageSwitcher, type AtlasLocale } from "@/components/LanguageSwitcher";
import { canonEras } from "@/lib/canon";

type LocalizedLocale = Exclude<AtlasLocale, "ru">;

type LocalizedCopy = {
  siteName: string;
  kicker: string;
  headline: string;
  lead: string;
  nav: [string, string, string];
  start: string;
  russianMap: string;
  statusTitle: string;
  statusText: string;
  themesTitle: string;
  themesLead: string;
  themes: Array<{ id: string; label: string; question: string; thinkers: Array<[string, string]> }>;
  erasTitle: string;
  eraTitles: string[];
  aboutEyebrow: string;
  aboutTitle: string;
  principles: Array<[string, string]>;
  footer: string;
  russianProfile: string;
};

export const localizedCopy: Record<LocalizedLocale, LocalizedCopy> = {
  en: {
    siteName: "Philosophy Atlas",
    kicker: "A CONTEMPORARY GUIDE TO PHILOSOPHY",
    headline: "100 THINKERS",
    lead: "A clear route through the people, ideas and traditions that changed how humanity understands freedom, truth, power and the self.",
    nav: ["Questions", "Chronology", "How to read"],
    start: "Explore the questions",
    russianMap: "Open the complete Russian atlas",
    statusTitle: "A multilingual edition, built with editorial care",
    statusText: "The international index and navigation are live. The 100 detailed profiles are being translated in reviewed batches; until each translation is ready, profile links open the verified Russian original.",
    themesTitle: "Start with a question, not a name",
    themesLead: "Choose the tension that matters to you. The atlas will show thinkers who disagree — and why.",
    themes: [
      { id: "freedom", label: "Freedom", question: "What does it mean to be free when circumstances and desire constrain us?", thinkers: [["epictetus", "Epictetus"], ["sartre", "Jean-Paul Sartre"]] },
      { id: "meaning", label: "Meaning", question: "What makes a life meaningful when no single answer is given to everyone?", thinkers: [["confucius", "Confucius"], ["nietzsche", "Friedrich Nietzsche"]] },
      { id: "justice", label: "Justice", question: "Should a just society prioritize equality, rights, utility or freedom?", thinkers: [["plato", "Plato"], ["rawls", "John Rawls"]] },
      { id: "knowledge", label: "Knowledge", question: "How do we distinguish knowledge from confident opinion?", thinkers: [["socrates", "Socrates"], ["kant", "Immanuel Kant"]] },
      { id: "love", label: "Love", question: "Is love a feeling, a choice, a way of knowing, or a practice of freedom?", thinkers: [["plato", "Plato"], ["beauvoir", "Simone de Beauvoir"]] },
      { id: "power", label: "Power", question: "Why do people obey — and when does power become legitimate?", thinkers: [["machiavelli", "Niccolò Machiavelli"], ["arendt", "Hannah Arendt"]] },
      { id: "technology", label: "Technology", question: "Is technology only a tool, or does it reshape how the world appears to us?", thinkers: [["heidegger", "Martin Heidegger"], ["foucault", "Michel Foucault"]] },
      { id: "work", label: "Work", question: "Why can work create dignity and meaning while also exhausting freedom?", thinkers: [["marx", "Karl Marx"], ["byungchulhan", "Byung-Chul Han"]] },
    ],
    erasTitle: "Ten eras, many traditions",
    eraTitles: ["Foundations", "Classical worlds", "Late antiquity", "Medieval traditions", "Renaissance", "Early modernity", "Enlightenment", "The nineteenth century", "The twentieth century", "Contemporary thought"],
    aboutEyebrow: "HOW THE ATLAS WORKS",
    aboutTitle: "Not a reference shelf. A tool for thinking for yourself.",
    principles: [["Begin with a question", "You do not need to know in advance whether you need Kant, Buddha or Arendt."], ["Compare answers", "The atlas keeps disagreement visible instead of presenting one convenient truth."], ["Continue to sources", "Quotes, reconstructions and editorial examples are clearly separated."]],
    footer: "An independent educational atlas of world philosophy.",
    russianProfile: "Verified Russian profile",
  },
  fr: {
    siteName: "Atlas de la philosophie",
    kicker: "UN GUIDE CONTEMPORAIN DE LA PHILOSOPHIE",
    headline: "100 PENSEURS",
    lead: "Un parcours clair à travers les personnes, les idées et les traditions qui ont transformé notre manière de penser la liberté, la vérité, le pouvoir et le soi.",
    nav: ["Questions", "Chronologie", "Mode d’emploi"],
    start: "Explorer les questions",
    russianMap: "Ouvrir l’atlas russe complet",
    statusTitle: "Une édition multilingue, avec une vraie exigence éditoriale",
    statusText: "L’index international et la navigation sont disponibles. Les 100 profils détaillés sont traduits par lots relus ; en attendant, les liens ouvrent l’original russe vérifié.",
    themesTitle: "Commencez par une question, pas par un nom",
    themesLead: "Choisissez la tension qui vous importe. L’atlas montre les penseurs qui s’opposent — et pourquoi.",
    themes: [
      { id: "freedom", label: "Liberté", question: "Que signifie être libre lorsque les circonstances et le désir nous limitent ?", thinkers: [["epictetus", "Épictète"], ["sartre", "Jean-Paul Sartre"]] },
      { id: "meaning", label: "Sens", question: "Qu’est-ce qui donne du sens à une vie lorsqu’aucune réponse unique ne s’impose à tous ?", thinkers: [["confucius", "Confucius"], ["nietzsche", "Friedrich Nietzsche"]] },
      { id: "justice", label: "Justice", question: "Une société juste doit-elle privilégier l’égalité, les droits, l’utilité ou la liberté ?", thinkers: [["plato", "Platon"], ["rawls", "John Rawls"]] },
      { id: "knowledge", label: "Connaissance", question: "Comment distinguer la connaissance d’une opinion assurée ?", thinkers: [["socrates", "Socrate"], ["kant", "Immanuel Kant"]] },
      { id: "love", label: "Amour", question: "L’amour est-il un sentiment, un choix, une connaissance ou une pratique de la liberté ?", thinkers: [["plato", "Platon"], ["beauvoir", "Simone de Beauvoir"]] },
      { id: "power", label: "Pouvoir", question: "Pourquoi obéissons-nous — et quand le pouvoir devient-il légitime ?", thinkers: [["machiavelli", "Nicolas Machiavel"], ["arendt", "Hannah Arendt"]] },
      { id: "technology", label: "Technique", question: "La technique est-elle un simple outil ou transforme-t-elle notre manière de voir le monde ?", thinkers: [["heidegger", "Martin Heidegger"], ["foucault", "Michel Foucault"]] },
      { id: "work", label: "Travail", question: "Pourquoi le travail peut-il donner dignité et sens tout en épuisant la liberté ?", thinkers: [["marx", "Karl Marx"], ["byungchulhan", "Byung-Chul Han"]] },
    ],
    erasTitle: "Dix époques, plusieurs traditions",
    eraTitles: ["Fondations", "Mondes classiques", "Antiquité tardive", "Traditions médiévales", "Renaissance", "Première modernité", "Lumières", "XIXe siècle", "XXe siècle", "Pensée contemporaine"],
    aboutEyebrow: "COMMENT FONCTIONNE L’ATLAS",
    aboutTitle: "Pas une encyclopédie. Un outil pour penser par soi-même.",
    principles: [["Commencer par une question", "Nul besoin de savoir d’avance s’il vous faut Kant, Bouddha ou Arendt."], ["Comparer les réponses", "L’atlas rend les désaccords visibles au lieu d’imposer une vérité commode."], ["Revenir aux sources", "Les citations, reconstructions et exemples éditoriaux sont clairement distingués."]],
    footer: "Un atlas éducatif indépendant de la philosophie mondiale.",
    russianProfile: "Profil russe vérifié",
  },
  es: {
    siteName: "Atlas de la filosofía",
    kicker: "UNA GUÍA CONTEMPORÁNEA DE FILOSOFÍA",
    headline: "100 PENSADORES",
    lead: "Un recorrido claro por las personas, ideas y tradiciones que transformaron nuestra forma de pensar la libertad, la verdad, el poder y el yo.",
    nav: ["Preguntas", "Cronología", "Cómo leer"],
    start: "Explorar las preguntas",
    russianMap: "Abrir el atlas ruso completo",
    statusTitle: "Una edición multilingüe con rigor editorial",
    statusText: "El índice internacional y la navegación ya están disponibles. Los 100 perfiles detallados se traducen en lotes revisados; mientras tanto, los enlaces abren el original ruso verificado.",
    themesTitle: "Empieza con una pregunta, no con un nombre",
    themesLead: "Elige la tensión que te importa. El atlas muestra qué pensadores discrepan — y por qué.",
    themes: [
      { id: "freedom", label: "Libertad", question: "¿Qué significa ser libre cuando las circunstancias y el deseo nos limitan?", thinkers: [["epictetus", "Epicteto"], ["sartre", "Jean-Paul Sartre"]] },
      { id: "meaning", label: "Sentido", question: "¿Qué da sentido a una vida cuando no existe una respuesta única para todos?", thinkers: [["confucius", "Confucio"], ["nietzsche", "Friedrich Nietzsche"]] },
      { id: "justice", label: "Justicia", question: "¿Debe una sociedad justa priorizar la igualdad, los derechos, la utilidad o la libertad?", thinkers: [["plato", "Platón"], ["rawls", "John Rawls"]] },
      { id: "knowledge", label: "Conocimiento", question: "¿Cómo distinguimos el conocimiento de una opinión segura de sí misma?", thinkers: [["socrates", "Sócrates"], ["kant", "Immanuel Kant"]] },
      { id: "love", label: "Amor", question: "¿Es el amor un sentimiento, una elección, una forma de conocer o una práctica de libertad?", thinkers: [["plato", "Platón"], ["beauvoir", "Simone de Beauvoir"]] },
      { id: "power", label: "Poder", question: "¿Por qué obedecemos y cuándo se vuelve legítimo el poder?", thinkers: [["machiavelli", "Nicolás Maquiavelo"], ["arendt", "Hannah Arendt"]] },
      { id: "technology", label: "Tecnología", question: "¿Es la tecnología solo una herramienta o transforma nuestra manera de ver el mundo?", thinkers: [["heidegger", "Martin Heidegger"], ["foucault", "Michel Foucault"]] },
      { id: "work", label: "Trabajo", question: "¿Por qué el trabajo puede dar dignidad y sentido y, al mismo tiempo, agotar la libertad?", thinkers: [["marx", "Karl Marx"], ["byungchulhan", "Byung-Chul Han"]] },
    ],
    erasTitle: "Diez épocas, muchas tradiciones",
    eraTitles: ["Fundamentos", "Mundos clásicos", "Antigüedad tardía", "Tradiciones medievales", "Renacimiento", "Primera modernidad", "Ilustración", "Siglo XIX", "Siglo XX", "Pensamiento contemporáneo"],
    aboutEyebrow: "CÓMO FUNCIONA EL ATLAS",
    aboutTitle: "No es una enciclopedia. Es una herramienta para pensar por cuenta propia.",
    principles: [["Empieza con una pregunta", "No necesitas saber de antemano si buscas a Kant, Buda o Arendt."], ["Compara las respuestas", "El atlas mantiene visible el desacuerdo en lugar de ofrecer una verdad cómoda."], ["Continúa con las fuentes", "Las citas, reconstrucciones y ejemplos editoriales están claramente separados."]],
    footer: "Un atlas educativo independiente de la filosofía mundial.",
    russianProfile: "Perfil ruso verificado",
  },
  de: {
    siteName: "Atlas der Philosophie",
    kicker: "EIN ZEITGENÖSSISCHER WEGWEISER ZUR PHILOSOPHIE",
    headline: "100 DENKER",
    lead: "Ein klarer Weg durch Menschen, Ideen und Traditionen, die unser Verständnis von Freiheit, Wahrheit, Macht und Selbst verändert haben.",
    nav: ["Fragen", "Chronologie", "So funktioniert es"],
    start: "Fragen erkunden",
    russianMap: "Den vollständigen russischen Atlas öffnen",
    statusTitle: "Eine mehrsprachige Ausgabe mit redaktioneller Sorgfalt",
    statusText: "Internationaler Index und Navigation sind verfügbar. Die 100 ausführlichen Profile werden in geprüften Etappen übersetzt; bis dahin führen die Links zum verifizierten russischen Original.",
    themesTitle: "Beginnen Sie mit einer Frage, nicht mit einem Namen",
    themesLead: "Wählen Sie den Konflikt, der Sie beschäftigt. Der Atlas zeigt, welche Denker widersprechen — und warum.",
    themes: [
      { id: "freedom", label: "Freiheit", question: "Was bedeutet Freiheit, wenn Umstände und Begehren uns begrenzen?", thinkers: [["epictetus", "Epiktet"], ["sartre", "Jean-Paul Sartre"]] },
      { id: "meaning", label: "Sinn", question: "Was macht ein Leben sinnvoll, wenn es keine fertige Antwort für alle gibt?", thinkers: [["confucius", "Konfuzius"], ["nietzsche", "Friedrich Nietzsche"]] },
      { id: "justice", label: "Gerechtigkeit", question: "Soll eine gerechte Gesellschaft Gleichheit, Rechte, Nutzen oder Freiheit priorisieren?", thinkers: [["plato", "Platon"], ["rawls", "John Rawls"]] },
      { id: "knowledge", label: "Wissen", question: "Wie unterscheiden wir Wissen von selbstsicherer Meinung?", thinkers: [["socrates", "Sokrates"], ["kant", "Immanuel Kant"]] },
      { id: "love", label: "Liebe", question: "Ist Liebe Gefühl, Entscheidung, Erkenntnisform oder eine Praxis der Freiheit?", thinkers: [["plato", "Platon"], ["beauvoir", "Simone de Beauvoir"]] },
      { id: "power", label: "Macht", question: "Warum gehorchen Menschen — und wann wird Macht legitim?", thinkers: [["machiavelli", "Niccolò Machiavelli"], ["arendt", "Hannah Arendt"]] },
      { id: "technology", label: "Technik", question: "Ist Technik nur ein Werkzeug oder verändert sie, wie uns die Welt erscheint?", thinkers: [["heidegger", "Martin Heidegger"], ["foucault", "Michel Foucault"]] },
      { id: "work", label: "Arbeit", question: "Warum kann Arbeit Würde und Sinn schaffen und zugleich Freiheit erschöpfen?", thinkers: [["marx", "Karl Marx"], ["byungchulhan", "Byung-Chul Han"]] },
    ],
    erasTitle: "Zehn Epochen, viele Traditionen",
    eraTitles: ["Grundlagen", "Klassische Welten", "Spätantike", "Mittelalterliche Traditionen", "Renaissance", "Frühe Neuzeit", "Aufklärung", "19. Jahrhundert", "20. Jahrhundert", "Gegenwärtiges Denken"],
    aboutEyebrow: "SO FUNKTIONIERT DER ATLAS",
    aboutTitle: "Kein Nachschlagewerk. Ein Werkzeug für das eigene Denken.",
    principles: [["Mit einer Frage beginnen", "Sie müssen nicht vorher wissen, ob Sie Kant, Buddha oder Arendt brauchen."], ["Antworten vergleichen", "Der Atlas hält Widerspruch sichtbar, statt eine bequeme Wahrheit auszugeben."], ["Zu den Quellen weitergehen", "Zitate, Rekonstruktionen und redaktionelle Beispiele sind klar getrennt."]],
    footer: "Ein unabhängiger Bildungsatlas der Weltphilosophie.",
    russianProfile: "Verifiziertes russisches Profil",
  },
};

export function LocalizedLanding({ locale }: { locale: LocalizedLocale }) {
  const copy = localizedCopy[locale];

  return (
    <main className="home-v2-shell localized-shell" lang={locale}>
      <header className="home-v2-header localized-header">
        <Link className="home-v2-wordmark" href={`/${locale}`}>{copy.siteName}</Link>
        <nav className="localized-nav" aria-label={copy.siteName}>
          <a href="#questions">{copy.nav[0]}</a>
          <a href="#chronology">{copy.nav[1]}</a>
          <a href="#about">{copy.nav[2]}</a>
        </nav>
        <LanguageSwitcher current={locale} />
      </header>

      <section className="localized-hero">
        <img alt="" aria-hidden="true" src="/images/philosophy-chronicle-collage-fullbleed.webp" />
        <div>
          <p>{copy.kicker}</p>
          <h1>{copy.headline}</h1>
          <strong>700 IDEAS · 10 ERAS · 5 LANGUAGES</strong>
          <p>{copy.lead}</p>
          <nav>
            <a href="#questions">{copy.start} ↓</a>
            <Link href="/">{copy.russianMap} →</Link>
          </nav>
        </div>
      </section>

      <aside className="localized-status" aria-label={copy.statusTitle}>
        <span>{locale.toUpperCase()} / BETA</span>
        <div><h2>{copy.statusTitle}</h2><p>{copy.statusText}</p></div>
      </aside>

      <section className="localized-themes" id="questions">
        <header><p>18 ROUTES / 08 PREVIEW</p><h2>{copy.themesTitle}</h2><span>{copy.themesLead}</span></header>
        <div>
          {copy.themes.map((theme, index) => (
            <article key={theme.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{theme.label}</h3>
              <p>{theme.question}</p>
              <nav>
                {theme.thinkers.map(([slug, name]) => <Link href={`/${slug}`} key={slug}>{name} ↗</Link>)}
              </nav>
              <small>{copy.russianProfile}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="localized-eras" id="chronology">
        <header><p>2500+ YEARS</p><h2>{copy.erasTitle}</h2></header>
        <div>
          {canonEras.map((era, index) => (
            <article key={era.id}>
              <span>{era.index}</span><h3>{copy.eraTitles[index]}</h3><p>{era.dates}</p><strong>{era.figures.length}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="home-v2-about localized-about" id="about">
        <p className="section-number">{copy.aboutEyebrow} / 01</p>
        <div><h2>{copy.aboutTitle}</h2></div>
        <ol>{copy.principles.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{body}</p></li>)}</ol>
      </section>

      <footer className="localized-footer">
        <div><strong>{copy.siteName}</strong><p>{copy.footer}</p></div>
        <div><a href="https://www.konstantinbushe.ru">Konstantin Bushe ↗</a><LanguageSwitcher current={locale} /></div>
      </footer>
    </main>
  );
}

