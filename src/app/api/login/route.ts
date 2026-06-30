import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, expectedToken, isValidPassword } from "@/lib/auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage

export const POST = async (req: NextRequest) => {
  let password: string | null = null;

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => null);
    password = body?.password ?? null;
  } else {
    const form = await req.formData();
    password = (form.get("password") as string) ?? null;
  }

  if (!isValidPassword(password)) {
    return NextResponse.json({ ok: false, error: "Falsches Passwort" }, { status: 401 });
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
