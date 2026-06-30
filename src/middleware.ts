import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, expectedToken, isValidPassword, isValidCookie } from "@/lib/auth";

// 30 Tage eingeloggt bleiben.
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const middleware = async (req: NextRequest) => {
  const { nextUrl } = req;

  const cookieValue = req.cookies.get(AUTH_COOKIE)?.value;

  // 1) Gueltiges Auth-Cookie? -> durchlassen.
  if (await isValidCookie(cookieValue)) {
    return NextResponse.next();
  }

  // 2) Auto-Login per ?token=DAS_PASSWORT in der URL.
  const token = nextUrl.searchParams.get("token");
  if (isValidPassword(token)) {
    // token aus der sichtbaren URL entfernen, damit das Passwort nicht
    // laenger als noetig in Adressleiste/History steht.
    const cleanUrl = nextUrl.clone();
    cleanUrl.searchParams.delete("token");

    const res = NextResponse.redirect(cleanUrl);
    const value = await expectedToken();
    if (value) {
      res.cookies.set(AUTH_COOKIE, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });
    }
    return res;
  }

  // 3) Sonst: zur Login-Seite umleiten (Ziel merken).
  const loginUrl = nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = "";
  const dest = nextUrl.pathname + nextUrl.search;
  if (dest && dest !== "/") {
    loginUrl.searchParams.set("from", dest);
  }
  return NextResponse.redirect(loginUrl);
};

// Auf alle Seiten anwenden ausser: Login-Seite, Login-/Logout-API,
// Next-interne Pfade und statische Assets.
export const config = {
  matcher: ["/((?!login|api/login|api/logout|_next/static|_next/image|favicon.ico).*)"],
};
