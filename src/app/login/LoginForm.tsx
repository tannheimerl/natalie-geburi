"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

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
    <form onSubmit={onSubmit}>
      <label className="login-label" htmlFor="password">
        Passwort
      </label>
      <input
        id="password"
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        autoFocus
        required
      />
      <button className="login-btn" type="submit" disabled={loading}>
        {loading ? "Einen Moment…" : "Reinschauen"}
      </button>
      <div className="login-error">{error}</div>
    </form>
  );
};

export default LoginForm;
