# Für Natalie — Date-Reisepass 🎟️

Ein kleines Geburtstagsgeschenk: ein passwortgeschützter „Date-Reisepass" mit 7 Date-Ideen
als durchblätterbare Karten im Tinder-Stil. Gebaut mit **Next.js (App Router) + TypeScript**,
ohne Datenbank, fertig für **Vercel**.

## Features

- 7 Date-Karten zum Durchwischen (Maus, Finger, Pfeiltasten, Punkte-Navigation)
- Angedeuteter Kartenstapel dahinter („es kommt noch mehr")
- „Als eingelöst stempeln" mit handgemachtem Tinten-Stempel-Effekt (SVG)
- Fortschrittsanzeige + „Alle Stempel zurücksetzen"
- Passwortschutz über Next.js-Middleware (manuelle Eingabe **oder** Auto-Login per Link)
- `prefers-reduced-motion` wird respektiert, responsive bis Mobile

## Speicherung des „eingelöst"-Status

Der Eingelöst-Status wird im **`localStorage` des Browsers** gespeichert — also **pro Gerät /
pro Browser separat**. Dein Stand und Natalies Stand sind getrennt; es gibt keinen
gemeinsamen serverseitigen Zustand. Das war die bewusste Wahl, um ohne zusätzliche Datenbank
auszukommen.

> Falls ihr später einen geräteübergreifenden, gemeinsamen Stand wollt, müsste man eine
> kleine API-Route + einen Key-Value-Store (z. B. Upstash Redis / Vercel KV) ergänzen.

## Lokales Setup

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen anlegen
cp .env.example .env.local
# .env.local öffnen und SITE_PASSWORD (und idealerweise AUTH_SECRET) setzen

# 3. Dev-Server starten
npm run dev
# -> http://localhost:3000
```

### Umgebungsvariablen

| Variable        | Pflicht   | Bedeutung                                                                                                                     |
| --------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `SITE_PASSWORD` | ja        | Das gemeinsame Passwort, mit dem die Seite freigeschaltet wird.                                                               |
| `AUTH_SECRET`   | empfohlen | Geheimer Wert zum Hashen des Auth-Cookies. Generieren: `openssl rand -hex 32`. Ohne Wert wird ein unsicherer Default genutzt. |

## Wie der Passwortschutz funktioniert

Es gibt **zwei Wege**, reinzukommen:

1. **Manuelle Eingabe** — Login-Seite unter `/login`, Passwortfeld, fertig.
2. **Auto-Login per Link** — die Seite mit `?token=DAS_PASSWORT` aufrufen:

   ```
   https://DEINE-DOMAIN.vercel.app/?token=geheim123
   ```

   Stimmt der Token mit `SITE_PASSWORD` überein, wird automatisch eingeloggt, der `token`
   wird aus der sichtbaren URL **entfernt** und es wird ein **httpOnly-Cookie** (30 Tage)
   gesetzt — bei späteren Besuchen ist kein erneutes Einloggen nötig.

Das Cookie enthält **nicht** das Passwort im Klartext, sondern einen SHA-256-Hash aus
`SITE_PASSWORD` + `AUTH_SECRET`. Die Prüfung passiert in `src/middleware.ts` bei jedem Request.

## `SITE_PASSWORD` in Vercel setzen

1. Projekt im [Vercel-Dashboard](https://vercel.com) öffnen.
2. **Settings → Environment Variables**.
3. Hinzufügen:
   - `SITE_PASSWORD` = euer Passwort (Environments: Production, Preview, Development)
   - `AUTH_SECRET` = langer Zufallswert (`openssl rand -hex 32`)
4. Nach dem Setzen **neu deployen** (Variablen greifen erst beim nächsten Build/Deploy).

## Deployment

### Variante A — über GitHub (empfohlen)

```bash
git add -A
git commit -m "Date-Reisepass für Natalie"
git branch -M main
git remote add origin git@github.com:DEIN-USER/DEIN-REPO.git
git push -u origin main
```

Dann auf vercel.com: **Add New… → Project → Repo importieren**. Vor dem ersten Deploy
unter **Environment Variables** `SITE_PASSWORD` und `AUTH_SECRET` setzen → **Deploy**.

### Variante B — über die Vercel CLI

```bash
npm i -g vercel        # einmalig
vercel login           # einmalig

vercel                 # Preview-Deploy (fragt beim ersten Mal das Projekt-Setup ab)

# Env-Variablen setzen (oder im Dashboard, s. o.):
vercel env add SITE_PASSWORD
vercel env add AUTH_SECRET

vercel --prod          # Production-Deploy
```

## Der fertige Link zum Verschicken

Nach dem Deploy bekommst du eine Domain wie `https://natalie-dates.vercel.app`. Den Link mit
Auto-Login (sie muss nichts eintippen) baust du so:

```
https://natalie-dates.vercel.app/?token=DEIN_SITE_PASSWORD
```

Diesen Link kannst du ihr direkt schicken — beim Öffnen ist sie automatisch drin. 🎁
