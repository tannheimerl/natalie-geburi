import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, expectedToken, isValidPassword } from "@/lib/auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage

export const POST = async (req: NextRequest) => {
  const password = req.nextUrl.searchParams.get("token");

  if (!isValidPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "Falsches Passwort" },
      { status: 401 },
    );
  }

  const value = await expectedToken();
  const res = NextResponse.json({ ok: true });
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
};
