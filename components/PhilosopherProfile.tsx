"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { canonFigures } from "@/lib/canon";
import type { Philosopher } from "@/lib/philosophers";
import { portraitIndex } from "@/lib/portrait-index";
import { TermText } from "@/components/TermText";

export function PhilosopherProfile({ philosopher }: { philosopher: Philosopher }) {
  const nameGenitive = philosopher.nameGenitive ?? philosopher.name;
  const location = philosopher.birthPlace ?? {
    label: philosopher.region,
    query: philosopher.region,
    note: "Регион жизни и работы",
  };
  const getMapsHref = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const mapsHref = getMapsHref(location.query);
  const deathMapsHref = philosopher.deathPlace
    ? getMapsHref(philosopher.deathPlace.query)
    : undefined;
  const [activeDialogue, setActiveDialogue] = useState(0);
  const [question, setQuestion] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const shareRoot = useRef<HTMLDivElement>(null);
  const [questionMode, setQuestionMode] = useState<"curated" | "matched" | "fallback">(
    "curated",
  );

  const currentIndex = canonFigures.findIndex((item) => item.id === philosopher.slug);
  const previous = canonFigures[(currentIndex + canonFigures.length - 1) % canonFigures.length];
  const next = canonFigures[(currentIndex + 1) % canonFigures.length];
  const titleClass =
    philosopher.name.length > 15
      ? "is-very-long"
      : philosopher.name.length > 11
        ? "is-long"
        : "";
  const mobileTitleClass =
    philosopher.name.length > 13
      ? "is-mobile-very-long"
      : philosopher.name.length > 8
        ? "is-mobile-long"
        : "";
  const glossaryScope = new Set<string>();
  const glossary = (children: string, limit?: number) => (
    <TermText limit={limit} scope={glossaryScope}>
      {children}
    </TermText>
  );
  const citationLabel = {
    verified: "Проверенная цитата",
    "late-testimony": "Позднее свидетельство",
    "traditional-attribution": "Традиционно приписывается",
    "traditional-formula": "Традиционная формула",
    "editorial-paraphrase": "Редакционная формулировка",
  }[philosopher.quote.citationType ?? "verified"];

  const activeAnswer = useMemo(
    () => philosopher.dialogues[activeDialogue],
    [activeDialogue, philosopher.dialogues],
  );

  function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = question.toLocaleLowerCase("ru");
    if (!normalized.trim()) return;

    const matchIndex = philosopher.dialogues.findIndex((dialogue) =>
      dialogue.keywords.some((keyword) => normalized.includes(keyword)),
    );

    setActiveDialogue(matchIndex >= 0 ? matchIndex : 0);
    setQuestionMode(matchIndex >= 0 ? "matched" : "fallback");
  }

  const birth = philosopher.milestones[0];
  const death = philosopher.milestones.at(-1);
  const isLivingAuthor = philosopher.lifeSpan?.death === "живой автор";

  useEffect(() => {
    if (!shareOpen) return;

    function closeOnOutsideClick(event: MouseEvent) {
      if (!shareRoot.current?.contains(event.target as Node)) setShareOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setShareOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [shareOpen]);

  useEffect(() => {
    if (!shareStatus) return;
    const timeout = window.setTimeout(() => setShareStatus(""), 4000);
    return () => window.clearTimeout(timeout);
  }, [shareStatus]);

  function getShareUrl() {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.toString();
  }

  async function copyShareUrl(url: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return;
    }

    const field = document.createElement("textarea");
    field.value = url;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }

  async function shareProfile(target: "telegram" | "instagram" | "dzen" | "max") {
    const url = getShareUrl();
    const title = `${philosopher.name} – Философская карта`;
    const text = `${philosopher.name}: ${philosopher.oneLine}`;

    if (target === "telegram") {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setShareOpen(false);
      setShareStatus("Telegram открыт");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setShareOpen(false);
        setShareStatus("Страница передана");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    const destinations = {
      instagram: { label: "Instagram", url: "https://www.instagram.com/" },
      dzen: { label: "Дзен", url: "https://dzen.ru/" },
      max: { label: "MAX", url: "https://max.ru/" },
    } as const;
    const destination = destinations[target];

    window.open(destination.url, "_blank", "noopener,noreferrer");
    await copyShareUrl(url);
    setShareOpen(false);
    setShareStatus(`Ссылка скопирована для ${destination.label}`);
  }

  async function copyProfileLink() {
    await copyShareUrl(getShareUrl());
    setShareOpen(false);
    setShareStatus("Ссылка скопирована");
  }

  async function sharePage() {
    const url = getShareUrl();
    const title = `${philosopher.name} – Философская карта`;
    const text = `${philosopher.name}: ${philosopher.oneLine}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setShareStatus("Страница передана");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await copyShareUrl(url);
    setShareStatus("Ссылка скопирована");
  }

  return (
    <main className={`profile-shell profile-${philosopher.slug}`}>
      <header className="profile-header">
        <Link className="atlas-wordmark" href="/">
          Философская карта
        </Link>
        <nav className="profile-nav" aria-label="Навигация по странице">
          <a href="#overview">Вид сверху</a>
          <a href="#ideas">Идеи</a>
          <a href="#dialogue">Разговор</a>
          <a href="#sources">Источники</a>
        </nav>
        <div className="profile-header-actions">
          <Link className="back-to-map" href="/">
            ← Карта
          </Link>
          <div className="profile-share" ref={shareRoot}>
            <button
              aria-expanded={shareOpen}
              aria-haspopup="dialog"
              className="profile-share-toggle"
              onClick={() => {
                setShareStatus("");
                setShareOpen((value) => !value);
              }}
              type="button"
            >
              Поделиться <span aria-hidden="true">↗</span>
            </button>
            {shareOpen ? (
              <div aria-label="Поделиться страницей" className="profile-share-menu" role="dialog">
                <p>Поделиться страницей</p>
                <div>
                  <button onClick={() => shareProfile("telegram")} type="button">Telegram</button>
                  <button onClick={() => shareProfile("instagram")} type="button">Instagram</button>
                  <button onClick={() => shareProfile("dzen")} type="button">Дзен</button>
                  <button onClick={() => shareProfile("max")} type="button">MAX</button>
                </div>
                <small>Instagram, Дзен и MAX – через меню приложений</small>
                <button className="profile-share-copy" onClick={copyProfileLink} type="button">
                  Копировать ссылку
                </button>
              </div>
            ) : null}
            {shareStatus ? (
              <span className="profile-share-status" role="status">{shareStatus}</span>
            ) : null}
          </div>
        </div>
      </header>

      <section className="profile-hero">
        <span className="profile-coordinate">{philosopher.index} / 100</span>
        <div className="profile-title-block">
          <p className="profile-era">
            {philosopher.century} · {glossary(philosopher.tradition, 2)}
          </p>
          <h1 className={[titleClass, mobileTitleClass].filter(Boolean).join(" ")}>
            {philosopher.name}
          </h1>
          <p className="profile-native">{philosopher.nativeName}</p>
          {philosopher.quoteOnCover ? (
            <blockquote className="profile-title-quote">
              <span>{citationLabel}</span>
              <p>«{glossary(philosopher.quote.translation, 2)}»</p>
              <cite>
                <a href="#verified-quote">{philosopher.quote.source}</a>
              </cite>
            </blockquote>
          ) : null}
          <p className="profile-thesis">
            {glossary(philosopher.oneLine)}
          </p>
          <div className="profile-tags">
            <span>{philosopher.dates}</span>
            <a
              aria-label={`${location.note}: ${location.label}. Открыть в Google Картах`}
              className="profile-location"
              href={mapsHref}
              rel="noreferrer"
              target="_blank"
              title={`${location.note}: ${location.label}`}
            >
              {location.label} <b aria-hidden="true">↗</b>
            </a>
            {philosopher.deathPlace && deathMapsHref ? (
              <a
                aria-label={`${philosopher.deathPlace.note}: ${philosopher.deathPlace.label}. Открыть в Google Картах`}
                className="profile-location profile-death-location"
                href={deathMapsHref}
                rel="noreferrer"
                target="_blank"
                title={`${philosopher.deathPlace.note}: ${philosopher.deathPlace.label}`}
              >
                умер: {philosopher.deathPlace.label} <b aria-hidden="true">↗</b>
              </a>
            ) : null}
          </div>
          <div className="source-seal">
            <span>Статус источников</span>
            <strong>{glossary(philosopher.sourceStatus, 2)}</strong>
          </div>
        </div>

        <figure className="profile-portrait">
          <span className="portrait-fallback" aria-hidden="true" />
          <div className="portrait-halo" />
          <img
            src={portraitIndex[philosopher.slug]?.src ?? philosopher.portrait}
            alt={philosopher.portraitAlt}
            width={960}
            height={1200}
            referrerPolicy="no-referrer"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/portrait-placeholder.svg";
            }}
          />
          <figcaption>
            <a href={philosopher.portraitSource} rel="noreferrer" target="_blank">
              {philosopher.portraitCredit} ↗︎
            </a>
          </figcaption>
        </figure>

      </section>

      <section className="overview-section" id="overview">
        <div className="section-heading">
          <p>ОБЩИЙ КОНТУР / 01</p>
          <h2>Общий контур за 30 секунд</h2>
        </div>
        <div className="overview-layout">
          <p className="overview-lead">
            {glossary(philosopher.helicopter, 10)}
          </p>
          <div className="overview-cards">
            <article>
              <span>Главный вопрос</span>
              <p>{glossary(philosopher.mainQuestion)}</p>
            </article>
            <article>
              <span>Инструмент</span>
              <p>{glossary(philosopher.method)}</p>
            </article>
            <article>
              <span>Что изменил</span>
              <p>{glossary(philosopher.changed)}</p>
            </article>
            <article className="source-card">
              <span>Как мы это знаем</span>
              <small>Надёжность реконструкции</small>
              <p>{glossary(philosopher.sourceNote, 10)}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="ideas-section" id="ideas">
        <div className="section-heading section-heading-light">
          <p>КАРТА ИДЕЙ / 02</p>
          <h2>Семь главных мыслей {nameGenitive}</h2>
        </div>
        <div className="ideas-introduction">
          <p>
            Это не словарь терминов и не набор афоризмов. Здесь собраны семь главных
            мыслей, через которые раскрывается ответ мыслителя на его главный вопрос.
            Каждая мысль сопровождается современной ситуацией, в которой она помогает
            рассуждать точнее.
          </p>
          <div>
            <span>Вместе эти идеи отвечают на вопрос</span>
            <strong>{glossary(philosopher.mainQuestion)}</strong>
          </div>
        </div>
        <div className="idea-chapters">
          {philosopher.ideas.map((idea, index) => (
            <article
              className="idea-chapter"
              key={idea.title}
            >
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{glossary(idea.title, 2)}</h3>
              </header>
              <div className="idea-chapter-body">
                <div>
                  <span>Суть</span>
                  <p>{glossary(idea.text)}</p>
                </div>
                <aside>
                  <span>Пример сегодня</span>
                  <p>{glossary(idea.example)}</p>
                </aside>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="life-section" id="life">
        <div className="section-heading">
          <p>ВРЕМЕННАЯ ЛИНИЯ / 03</p>
          <h2>Жизнь и движение</h2>
        </div>
        <div
          className={`life-span${isLivingAuthor ? " is-open-ended" : ""}`}
          aria-label={`Жизненный путь ${nameGenitive}`}
        >
          <div>
            <span>Рождение</span>
            <strong>{philosopher.lifeSpan?.birth ?? birth?.date ?? philosopher.dates}</strong>
            <a
              className="life-place-link"
              href={mapsHref}
              rel="noreferrer"
              target="_blank"
            >
              {location.label} ↗
            </a>
          </div>
          <i aria-hidden="true" />
          {!isLivingAuthor ? (
            <div>
              <span>Смерть</span>
              <strong>{philosopher.lifeSpan?.death ?? death?.date ?? philosopher.dates}</strong>
              {philosopher.deathPlace && deathMapsHref ? (
                <a
                  className="life-place-link"
                  href={deathMapsHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  {philosopher.deathPlace.label} ↗
                </a>
              ) : (
                <small className="life-place-note">место не установлено</small>
              )}
            </div>
          ) : null}
        </div>
        <div className="milestone-track">
          {philosopher.milestones.map((milestone, index) => (
            <article key={`${milestone.date}-${milestone.title}`}>
              <span className="milestone-dot">{String(index + 1).padStart(2, "0")}</span>
              <time>
                <span>{milestone.date}</span>
                {milestone.age ? <small>{milestone.age}</small> : null}
              </time>
              <h3>{glossary(milestone.title, 2)}</h3>
              <p>{glossary(milestone.text)}</p>
            </article>
          ))}
          {philosopher.restingPlace ? (
            <article className="resting-place-card">
              <span className="milestone-dot">
                {String(philosopher.milestones.length + 1).padStart(2, "0")}
              </span>
              <time>
                <span>{philosopher.restingPlace.date}</span>
                <small>место захоронения</small>
              </time>
              <h3>Место памяти</h3>
              <p>{glossary(philosopher.restingPlace.description)}</p>
              <div className="resting-place-links">
                <a
                  className="resting-place-map"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(philosopher.restingPlace.query)}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {philosopher.restingPlace.label} <b aria-hidden="true">↗</b>
                </a>
                <a
                  className="resting-place-source"
                  href={philosopher.restingPlace.sourceHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  {philosopher.restingPlace.sourceLabel} ↗
                </a>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="quote-section" id="verified-quote">
        <div className="quote-card">
          <span className="quote-label">{citationLabel}</span>
          <blockquote>«{glossary(philosopher.quote.translation, 3)}»</blockquote>
          {philosopher.quote.original !== philosopher.quote.translation ? (
            <p
              className="quote-original"
              lang={philosopher.slug === "nietzsche" ? "de" : undefined}
            >
              {philosopher.quote.original}
            </p>
          ) : null}
          <cite>
            {philosopher.quote.source} · {philosopher.quote.translationNote}
          </cite>
        </div>
        <div className="myth-card">
          <span className="quote-label">Что обычно искажают</span>
          <h3>{glossary(philosopher.distortion.myth)}</h3>
          <p>{glossary(philosopher.distortion.correction)}</p>
        </div>
      </section>

      <section className="dialogue-section" id="dialogue">
        <div className="section-heading">
          <p>РАЗГОВОР / 04</p>
          <h2>Задать вопрос прошлому</h2>
        </div>
        <div className="dialogue-layout">
          <div className="dialogue-prompts">
            <p>Выберите подготовленный вопрос</p>
            {philosopher.dialogues.map((dialogue, index) => (
              <button
                className={activeDialogue === index ? "is-active" : ""}
                key={dialogue.prompt}
                onClick={() => {
                  setActiveDialogue(index);
                  setQuestionMode("curated");
                }}
                type="button"
              >
                {dialogue.prompt}
                <span>↗︎</span>
              </button>
            ))}
            <form onSubmit={askQuestion}>
              <label htmlFor={`question-${philosopher.slug}`}>Или сформулируйте свой вопрос</label>
              <div>
                <input
                  id={`question-${philosopher.slug}`}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Например: почему я боюсь ошибиться?"
                  type="text"
                  value={question}
                />
                <button type="submit" aria-label="Задать вопрос">
                  →
                </button>
              </div>
            </form>
          </div>

          <article className="dialogue-answer" aria-live="polite">
            <div className="answer-status">
              <span>Редакторская реконструкция</span>
              <i />
              <span>не цитата</span>
            </div>
            {questionMode !== "curated" && (
              <p className="match-note">
                {questionMode === "matched"
                  ? "Страница сопоставила вопрос с тематически близкой подготовленной позицией."
                  : "Тематического совпадения не найдено: показана первая подготовленная позиция."}{" "}
                Проверьте основание ответа по указанному тексту.
              </p>
            )}
            <p className="answer-text">{glossary(activeAnswer.answer, 10)}</p>
            <p className="answer-source">Основание: {glossary(activeAnswer.source, 4)}</p>
          </article>
        </div>
      </section>

      <section className="sources-section" id="sources">
        <div className="section-heading">
          <p>МАТЕРИАЛЫ / 05</p>
          <h2>Материалы для полной картины</h2>
        </div>
        <p className="sources-introduction">
          Если хочется не только получить ориентир, но и составить объёмное представление
          о мыслителе, начните с этих текстов, исследований и справочных материалов.
        </p>
        <div className="source-list">
          {philosopher.sources.map((source, index) => (
            <a href={source.href} key={source.href} rel="noreferrer" target="_blank">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{source.label}</strong>
              <small>{glossary(source.detail, 4)}</small>
              <b>↗︎</b>
            </a>
          ))}
        </div>
      </section>

      <footer className="profile-footer">
        <Link href={`/${previous.id}`}>
          <span>{currentIndex === 0 ? "← К концу карты" : "← Назад во времени"}</span>
          <strong>{previous.name}</strong>
        </Link>
        <div className="footer-actions">
          <Link className="footer-map" href="/">
            Вернуться на карту
          </Link>
          <button className="footer-share" onClick={sharePage} type="button">
            <span>{shareStatus || "Поделиться"}</span>
            <b aria-hidden="true">↗</b>
          </button>
        </div>
        <Link className="footer-next" href={`/${next.id}`}>
          <span>
            {currentIndex === canonFigures.length - 1
              ? "К началу карты →"
              : "Дальше во времени →"}
          </span>
          <strong>{next.name}</strong>
        </Link>
      </footer>
    </main>
  );
}
