"use client";

import { useEffect, useState } from "react";
import { DATES } from "@/lib/dates";
import DateCard from "@/components/DateCard";

const STORAGE_KEY = "natalie-dates-redeemed";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [redeemed, setRedeemed] = useState<boolean[]>(() => DATES.map(() => false));
  const [hydrated, setHydrated] = useState(false);

  // localStorage laden (clientseitig, pro Geraet/Browser).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (Array.isArray(saved) && saved.length === DATES.length) {
        setRedeemed(saved.map(Boolean));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // localStorage speichern.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(redeemed));
    } catch {
      /* ignore */
    }
  }, [redeemed, hydrated]);

  const goTo = (index: number) => {
    if (index < 0 || index >= DATES.length) return;
    setCurrent(index);
  };

  const toggleRedeem = () => {
    setRedeemed((prev) => {
      const next = [...prev];
      next[current] = !next[current];
      return next;
    });
  };

  const isDone = redeemed[current];

  // Stack-Karten dahinter (depth 1 = naechste, depth 2 = die danach).
  const stack = [2, 1].filter((depth) => current + depth < DATES.length);

  return (
    <div className="wrap">
      <div className="masthead">
        <h1>Für Natalie</h1>
        <p>
          Acht Eintritts­karten in unsere gemeinsame Zeit. Wähl eine, wann du willst, ich komme mit, egal was.
        </p>
      </div>

      <div className="passport">
        <div className="card-stage">
          {stack.map((depth) => (
            <div key={`stack-${depth}`} className="stack-card" data-depth={depth} />
          ))}

          <DateCard
            key={current}
            date={DATES[current]}
            isDone={isDone}
          />
        </div>
      </div>

      <div className="bottom-bar">
        <div className="nav-row">
          <button
            className="arrow-btn"
            aria-label="Vorherige Karte"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
          >
            ←
          </button>
          <div className="counter">
            {current + 1} / {DATES.length}
          </div>
          <button
            className="arrow-btn"
            aria-label="Nächste Karte"
            onClick={() => goTo(current + 1)}
            disabled={current === DATES.length - 1}
          >
            →
          </button>
        </div>

        <div className="dots">
          {DATES.map((d, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "active" : ""} ${redeemed[i] ? "done" : ""}`}
              aria-label={`Karte ${i + 1}: ${d.title}`}
              onClick={() => goTo(i)}
            >
              <span aria-hidden="true">{d.icon}</span>
            </button>
          ))}
        </div>

        <button
          className={`card-action ${isDone ? "undo" : ""}`}
          type="button"
          onClick={toggleRedeem}
        >
          {isDone ? "Stempel entfernen" : "Als eingelöst stempeln"}
        </button>
      </div>
    </div>
  );
};

export default Home;
