import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Rate limiting ────────────────────────────────────────
const rateLimit = new Map<string, { count: number; ts: number }>();
const LIMIT  = 3;
const WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now - entry.ts > WINDOW) {
    rateLimit.set(ip, { count: 1, ts: now });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_RECIPIENT) {
    console.error("RESEND_API_KEY no configurada");
    return NextResponse.json(
      { error: "Servicio de email no configurado" },
      { status: 503 }
    );
  }

  // ─── Rate limiting ────────────────────────────────────────
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Inténtalo en una hora." },
      { status: 429 }
    );
  }

  try {
    const { name, email, message, website } = await req.json();

    // ─── Honeypot ─────────────────────────────────────────
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // ─── Validación ───────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Portfolio <noreply@msolla.dev>",
      to: process.env.CONTACT_RECIPIENT ?? "",
      reply_to: email,
      subject: `[Portfolio] Mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 502 }
      );
    }

    console.log("Email enviado:", data?.id);
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Error inesperado:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}