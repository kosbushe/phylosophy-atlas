"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { canonEras } from "@/lib/canon";
import { portraitIndex, portraitThumbnail } from "@/lib/portrait-index";

export default function CanonMap() {
  const [activeEra, setActiveEra] = useState("all");

  const filteredEras = useMemo(() => {
    return activeEra === "all"
      ? canonEras
      : canonEras.filter((era) => era.id === activeEra);
  }, [activeEra]);

  const visibleCount = filteredEras.reduce((total, era) => total + era.figures.length, 0);

  return (
    <section className="canon-v2" id="canon-map">
      <header className="canon-v2-heading">
        <p>100 ФИЛОСОФОВ / ОТБОРНАЯ КАРТА</p>
        <div>
          <h2>
            Мыслители и
            <br />исторические эпохи.
          </h2>
          <span>
            Не один поток и не один ответ. Выберите эпоху и увидите, какие мыслители
            формировали её вопросы, языки и споры.
          </span>
        </div>
      </header>

      <div className="canon-v2-toolbar">
        <p className="canon-v2-filter-label">Выберите историческую эпоху. Повторное нажатие покажет все.</p>

        <div className="canon-v2-filters" role="group" aria-label="Фильтр по историческим эпохам">
          {canonEras.map((era) => (
            <button
              className={activeEra === era.id ? "is-active" : ""}
              type="button"
              key={era.id}
              onClick={() => setActiveEra((current) => current === era.id ? "all" : era.id)}
              aria-pressed={activeEra === era.id}
            >
              {era.index}. {era.title}
            </button>
          ))}
        </div>
      </div>

      <div className="canon-v2-result-meta" aria-live="polite">
        <strong>{String(visibleCount).padStart(2, "0")}</strong>
        <span>из 100 мыслителей</span>
      </div>

      {filteredEras.length ? (
        <div className="canon-v2-eras" id="chronology">
          {filteredEras.map((era) => (
            <article className="canon-v2-era" id={`era-${era.id}`} key={era.id}>
              <header>
                <span>{era.index}</span>
                <div>
                  <p>{era.dates}</p>
                  <h3>{era.title}</h3>
                </div>
                <small>{era.note}</small>
              </header>

              <div className="canon-v2-grid">
                {era.figures.map((figure) => (
                  <Link
                    className="canon-v2-card"
                    key={figure.id}
                    href={`/${figure.id}`}
                    aria-label={`Открыть страницу: ${figure.name}`}
                  >
                    <span className="canon-v2-card-index">{figure.index}</span>
                    <span
                      className="canon-v2-card-portrait"
                      data-initial={figure.name.slice(0, 1)}
                      aria-hidden="true"
                    >
                      {portraitIndex[figure.id] ? (
                        <img
                          src={portraitThumbnail(portraitIndex[figure.id])}
                          alt=""
                          width={360}
                          height={360}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.hidden = true;
                          }}
                        />
                      ) : null}
                    </span>
                    <span className="canon-v2-card-copy">
                      <small>
                        {figure.tradition} · {figure.dates}
                      </small>
                      <strong>{figure.name}</strong>
                      <em>{figure.focus}</em>
                    </span>
                    <span className="canon-v2-card-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="canon-v2-empty">
          <span>∅</span>
          <h3>Ничего не найдено</h3>
          <p>Попробуйте выбрать другую историческую эпоху.</p>
          <button
            type="button"
            onClick={() => {
              setActiveEra("all");
            }}
          >
            Показать всех
          </button>
        </div>
      )}
    </section>
  );
}
