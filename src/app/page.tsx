"use client";

import { useEffect, useState } from "react";
import { DATES } from "@/lib/dates";
import DateCard from "@/components/DateCard";
import IconButton from "@/components/IconButton";
import Button from "@/components/Button";

const STORAGE_KEY = "natalie-dates-redeemed";

const Home = () => {
  const [current, setCurrent] = useState(0);
  // Pro Karte das Einlöse-Datum (ISO) oder null, wenn nicht eingelöst.
  const [redeemedAt, setRedeemedAt] = useState<(string | null)[]>(() =>
    DATES.map(() => null),
  );
  const [hydrated, setHydrated] = useState(false);

  // localStorage laden (clientseitig, pro Geraet/Browser) – inkl. Migration vom alten Boolean-Format.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (Array.isArray(saved) && saved.length === DATES.length) {
        setRedeemedAt(
          saved.map((v) =>
            typeof v === "string" ? v : v ? new Date().toISOString() : null,
          ),
        );
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(redeemedAt));
    } catch {
      /* ignore */
    }
  }, [redeemedAt, hydrated]);

  const goTo = (index: number) => {
    if (index < 0 || index >= DATES.length) return;
    setCurrent(index);
  };

  const toggleRedeem = () => {
    setRedeemedAt((prev) => {
      const next = [...prev];
      next[current] = next[current] ? null : new Date().toISOString();
      return next;
    });
  };

  const isDone = redeemedAt[current] != null;
  const hasNext = current < DATES.length - 1;

  return (
    <div className="min-h-screen w-full flex flex-col p-[24px]">
      <div className="mb-[56px] text-white">
        <h1 className="font-bold text-[24px] mb-[16px]">Für Natalie</h1>
        <p className="text-[16px]">
          Acht Dates für kleine und grosse Momente. Gemeinsame Erinnerungen, die
          bleiben.
        </p>
      </div>

      <div className="w-full">
        <DateCard
          key={current}
          date={DATES[current]}
          isDone={isDone}
          redeemedAt={redeemedAt[current]}
        />
      </div>

      <div className="flex items-center justify-center gap-[24px] mt-[32px]">
        <IconButton
          icon="arrow_back"
          aria-label="Vorherige Karte"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        />
        <div className="flex items-center gap-2">
          {DATES.map((d, i) => (
            <button
              key={i}
              className={`w-[8px] h-[8px] rounded-full border-0 p-0 cursor-pointer transition motion-reduce:transition-none ${
                i === current
                  ? "bg-navy scale-[1.3]"
                  : "bg-white/50 hover:bg-white/85"
              }`}
              aria-label={`Karte ${i + 1}: ${d.title}`}
              aria-current={i === current ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <IconButton
          icon="arrow_forward"
          aria-label="Nächste Karte"
          onClick={() => goTo(current + 1)}
          disabled={!hasNext}
        />
      </div>
      <Button
        type={isDone ? "secondary" : "primary"}
        label={isDone ? "Aufheben" : "Einlösen"}
        className="mt-auto w-full"
        onClick={toggleRedeem}
      />
    </div>
  );
};

export default Home;
