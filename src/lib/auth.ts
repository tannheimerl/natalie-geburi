// Minimaler, selbstgebauter Passwortschutz fuer eine Single-Password-Seite.
// Funktioniert sowohl im Edge-Runtime (middleware.ts) als auch im Node-Runtime
// (Route Handler), weil ausschliesslich die Web-Crypto-API genutzt wird.

export const AUTH_COOKIE = "natalie_auth";

// Fallback-Secret nur fuer lokale Entwicklung. In Produktion AUTH_SECRET setzen.
const DEFAULT_SECRET = "natalie-passport-dev-secret-change-me";

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

/**
 * Erwarteter Cookie-Wert: ein SHA-256-Hash aus Passwort + Secret.
 * Nicht trivial zu erraten, ohne dass das Passwort im Cookie steht.
 */
export const expectedToken = async (): Promise<string | null> => {
  const password = process.env.SITE_PASSWORD;
  if (!password) return null;
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  const data = new TextEncoder().encode(`${password}:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

/** Prueft, ob ein eingegebenes/uebergebenes Passwort korrekt ist. */
export const isValidPassword = (candidate: string | null | undefined): boolean => {
  const password = process.env.SITE_PASSWORD;
  if (!password || !candidate) return false;
  // Laengencheck zuerst, dann konstanter Vergleich.
  if (candidate.length !== password.length) return false;
  let mismatch = 0;
  for (let i = 0; i < password.length; i++) {
    mismatch |= candidate.charCodeAt(i) ^ password.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Prueft, ob der mitgesendete Cookie-Wert dem erwarteten Hash entspricht. */
export const isValidCookie = async (value: string | undefined): Promise<boolean> => {
  if (!value) return false;
  const expected = await expectedToken();
  if (!expected) return false;
  return value === expected;
}
