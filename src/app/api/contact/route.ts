import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  // ⚠️ Validación en runtime (NO en top-level)
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY no configurada");
    return NextResponse.json(
      { error: "Servicio de email no configurado" },
      { status: 503 }
    );
  }

  try {
    const { name, email, message } = await req.json();

    // Validación básica
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

    // ✅ Instanciación AQUÍ (clave para que no rompa el build)
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Portfolio <noreply@msolla.dev>",
      to: "miguelangelss4@gmail.com",
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