"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  // Erlaubt QR-Login auch auf /login?token=... (die Middleware laeuft hier nicht).
  const tokenFromUrl = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (candidate: string) => {
      setError("");
      setLoading(true);
      try {
        const res = await fetch(
          `/api/login?token=${encodeURIComponent(candidate)}`,
          { method: "POST" },
        );
        if (res.ok) {
          // Hard navigation, damit die Middleware das neue Cookie sieht.
          window.location.href = from.startsWith("/") ? from : "/";
        } else {
          setError("Falsches Passwort. Versuch es nochmal.");
          setLoading(false);
        }
      } catch {
        setError("Etwas ist schiefgelaufen. Versuch es nochmal.");
        setLoading(false);
      }
    },
    [from],
  );

  // Auto-Login, wenn ein Token in der URL steht (z.B. per QR-Code).
  useEffect(() => {
    if (tokenFromUrl) {
      login(tokenFromUrl);
    }
  }, [tokenFromUrl, login]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(password);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label
        className="font-sans font-bold text-[16px] text-navy mb-[16px]"
        htmlFor="password"
      >
        Passwort
      </label>
      <input
        id="password"
        className="w-full p-4 h-[48px] rounded-[12px] border-[1px] border-line bg-white text-muted font-sans text-[16px] transition placeholder:text-[#9A9AA2] focus:outline-none focus:border-navy"
        type="password"
        placeholder="Passwort eingeben"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        autoFocus
        required
      />
      {error && (
        <div className="font-sans text-[14px] mt-[8px] text-[#D7263D]">
          {error}
        </div>
      )}
      <Button
        type="primary"
        label={loading ? "Wird geprüft…" : "Entsperren"}
        className="mt-[24px]"
        disabled={loading}
        submit
      ></Button>
    </form>
  );
};

export default LoginForm;
