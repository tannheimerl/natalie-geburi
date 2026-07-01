"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
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
        // TODO: Fix text colour
        className="w-full p-4 h-[48px] rounded-[8px] border-[1px] border-line bg-white text-navy font-sans text-[16px] transition placeholder:text-[#9A9AA2] focus:outline-none focus:border-navy"
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
