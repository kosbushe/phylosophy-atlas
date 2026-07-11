"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  canonEras,
  canonTraditions,
  type CanonFigure,
} from "@/lib/canon";
import { portraitIndex, portraitThumbnail } from "@/lib/portrait-index";

function searchableText(figure: CanonFigure) {
  return [
    figure.name,
    figure.nativeName,
    figure.dates,
    figure.tradition,
    figure.region,
    figure.focus,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("ru");
}

export default function CanonMap() {
  const [query, setQuery] = useState("");
  const [activeTradition, setActiveTradition] = useState<(typeof canonTraditions)[number]>(
    "Все",
  );

  const filteredEras = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ru");

    return canonEras
      .map((era) => ({
        ...era,
        figures: era.figures.filter((figure) => {
          const matchesTradition =
            activeTradition === "Все" || figure.tradition === activeTradition;
          return matchesTradition && (!needle || searchableText(figure).includes(needle));
        }),
      }))
      .filter((era) => era.figures.length > 0);
  }, [activeTradition, query]);

  const visibleCount = filteredEras.reduce((total, era) => total + era.figures.length, 0);

  return (
    <section className="canon-v2" id="canon-map">
      <header className="canon-v2-heading">
        <p>ХРОНОЛОГИЧЕСКИЙ АТЛАС / 100</p>
        <div>
          <h2>
            Все мыслители.
            <br />В одном времени.
          </h2>
          <span>
            Ищите по имени, идее или традиции. На каждой карточке — главный вопрос,
            с которого стоит начать знакомство.
          </span>
        </div>
      </header>

      <div className="canon-v2-toolbar">
        <label className="canon-v2-search">
          <span>Найти философа или идею</span>
          <div>
            <i aria-hidden="true">⌕</i>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Имя, традиция или главный вопрос…"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Очистить поиск">
                ×
              </button>
            ) : null}
          </div>
        </label>

        <div className="canon-v2-filters" role="group" aria-label="Фильтр по традиции">
          {canonTraditions.map((tradition) => (
            <button
              className={activeTradition === tradition ? "is-active" : ""}
              type="button"
              key={tradition}
              onClick={() => setActiveTradition(tradition)}
              aria-pressed={activeTradition === tradition}
            >
              {tradition}
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
            <article className="canon-v2-era" key={era.id}>
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
          <p>Попробуйте другое имя, идею или снимите фильтр традиции.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTradition("Все");
            }}
          >
            Показать всех
          </button>
        </div>
      )}
    </section>
  );
}
