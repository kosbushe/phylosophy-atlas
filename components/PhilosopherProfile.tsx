"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { canonFigures } from "@/lib/canon";
import type { Philosopher } from "@/lib/philosophers";
import { portraitIndex } from "@/lib/portrait-index";

export function PhilosopherProfile({ philosopher }: { philosopher: Philosopher }) {
  const [activeDialogue, setActiveDialogue] = useState(0);
  const [question, setQuestion] = useState("");
  const [questionMode, setQuestionMode] = useState<"curated" | "matched" | "fallback">(
    "curated",
  );
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

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

  useEffect(() => {
    const stored = window.localStorage.getItem(`philosophy-note:${philosopher.slug}`);
    const frame = window.requestAnimationFrame(() => {
      if (stored) setNote(stored);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [philosopher.slug]);

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

  function saveNote() {
    window.localStorage.setItem(`philosophy-note:${philosopher.slug}`, note);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
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
        <Link className="back-to-map" href="/">
          ← Карта
        </Link>
      </header>

      <section className="profile-hero">
        <span className="profile-coordinate">{philosopher.index} / 100</span>
        <div className="profile-title-block">
          <p className="profile-era">
            {philosopher.century} · {philosopher.tradition}
          </p>
          <h1 className={[titleClass, mobileTitleClass].filter(Boolean).join(" ")}>
            {philosopher.name}
          </h1>
          <p className="profile-native">{philosopher.nativeName}</p>
          <p className="profile-thesis">{philosopher.oneLine}</p>
          <div className="profile-tags">
            <span>{philosopher.dates}</span>
            <span>{philosopher.region}</span>
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

        <div className="source-seal">
          <span>Статус источников</span>
          <strong>{philosopher.sourceStatus}</strong>
        </div>
      </section>

      <section className="overview-section" id="overview">
        <div className="section-heading">
          <p>ВИД СВЕРХУ / 01</p>
          <h2>Увидеть общий контур за три минуты</h2>
        </div>
        <div className="overview-layout">
          <p className="overview-lead">{philosopher.helicopter}</p>
          <div className="overview-cards">
            <article>
              <span>Главный вопрос</span>
              <p>{philosopher.mainQuestion}</p>
            </article>
            <article>
              <span>Инструмент</span>
              <p>{philosopher.method}</p>
            </article>
            <article>
              <span>Что изменил</span>
              <p>{philosopher.changed}</p>
            </article>
            <article className="source-card">
              <span>Надёжность реконструкции</span>
              <p>{philosopher.sourceNote}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="ideas-section" id="ideas">
        <div className="section-heading section-heading-light">
          <p>КАРТА ИДЕЙ / 02</p>
          <h2>Семь идей, которыми можно пользоваться</h2>
        </div>
        <div className="ideas-introduction">
          <p>
            Это не словарь терминов. Каждая мысль сначала объяснена без специальной
            подготовки, а затем показана на узнаваемой ситуации из современной жизни.
            Современный пример — редакторская аналогия, а не цитата и не доказательство
            учения.
          </p>
          <div>
            <span>Вместе эти идеи отвечают на вопрос</span>
            <strong>{philosopher.mainQuestion}</strong>
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
                <h3>{idea.title}</h3>
              </header>
              <div className="idea-chapter-body">
                <div>
                  <span>Суть</span>
                  <p>{idea.text}</p>
                </div>
                <aside>
                  <span>Пример сегодня</span>
                  <p>{idea.example}</p>
                </aside>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="life-section" id="life">
        <div className="section-heading">
          <p>ВРЕМЕННАЯ ЛИНИЯ / 03</p>
          <h2>Жизнь и движение текста</h2>
        </div>
        <div className="milestone-track">
          {philosopher.milestones.map((milestone, index) => (
            <article key={`${milestone.date}-${milestone.title}`}>
              <span className="milestone-dot">{String(index + 1).padStart(2, "0")}</span>
              <time>{milestone.date}</time>
              <h3>{milestone.title}</h3>
              <p>{milestone.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-card">
          <span className="quote-label">Проверенная цитата</span>
          <blockquote>«{philosopher.quote.translation}»</blockquote>
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
          <h3>{philosopher.distortion.myth}</h3>
          <p>{philosopher.distortion.correction}</p>
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
            <p className="answer-text">{activeAnswer.answer}</p>
            <p className="answer-source">Основание: {activeAnswer.source}</p>
          </article>
        </div>
      </section>

      <section className="notes-section" id="notes">
        <div>
          <p className="section-number">ЛИЧНЫЙ СЛОЙ / 05</p>
          <h2>Мой ответ: {philosopher.name}</h2>
          <p>
            Эта запись хранится только в вашем браузере и не показывается гостям карты.
          </p>
        </div>
        <div className="note-editor">
          <textarea
            onChange={(event) => setNote(event.target.value)}
            placeholder="Мысль, возражение, вопрос, связь с собственной жизнью…"
            value={note}
          />
          <button onClick={saveNote} type="button">
            {saved ? "Сохранено" : "Сохранить заметку"}
          </button>
        </div>
      </section>

      <section className="sources-section" id="sources">
        <div className="section-heading">
          <p>ИСТОЧНИКИ / 06</p>
          <h2>На чём держится страница</h2>
        </div>
        <div className="source-list">
          {philosopher.sources.map((source, index) => (
            <a href={source.href} key={source.href} rel="noreferrer" target="_blank">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{source.label}</strong>
              <small>{source.detail}</small>
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
        <Link className="footer-map" href="/">
          Вернуться на карту
        </Link>
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
