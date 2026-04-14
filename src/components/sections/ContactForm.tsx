"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type Status = "idle" | "sending" | "ok" | "error";
type FormField = "name" | "email" | "message" | "website";

export function ContactForm() {
  const [status, setStatus]     = useState<Status>("idle");
  const [form, setForm]         = useState<Record<FormField, string>>({ name: "", email: "", message: "", website: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    setStatus("idle");
    setForm({ name: "", email: "", message: "", website: "" });
    setErrorMsg("");
  }, [pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Error desconocido");
        setStatus("error");
        return;
      }

      setStatus("ok");
    } catch {
      setErrorMsg("No se pudo conectar con el servidor");
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "0.85rem 1rem",
    color: "var(--text)",
    fontFamily: "var(--font-sans)",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color var(--transition), box-shadow var(--transition)",
  };

  return (
    <>
      <p className="section-label" style={{ color: "var(--accent)", marginBottom: "1.5rem" }}>
        contacto
      </p>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: "1rem",
          color: "var(--text)",
        }}
      >
        Hablemos.
      </h1>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--text-soft)",
          marginBottom: "3rem",
          lineHeight: 1.75,
          fontSize: "1.05rem",
        }}
      >
        Si tienes una oportunidad interesante, quieres hablar sobre tecnología
        o simplemente conectar, estoy al otro lado.
        Respondo lo antes posible.
      </p>

      {status === "ok" ? (
        <div
          style={{
            padding: "2rem",
            border: "1px solid var(--color-success)",
            borderRadius: "var(--radius)",
            color: "var(--color-success)",
            fontFamily: "var(--font-mono)",
          }}
        >
          ✓ Mensaje enviado. Te respondo pronto.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
            value={form.website}
            onChange={handleChange}
          />

          {[
            { name: "name",  label: "Nombre", type: "text",  placeholder: "Tu nombre"    },
            { name: "email", label: "Email",  type: "email", placeholder: "tu@email.com" },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label
                htmlFor={name}
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-soft)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                }}
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                value={form[name as FormField]}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-soft)",
                marginBottom: "0.4rem",
                letterSpacing: "0.06em",
              }}
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="En qué puedo ayudarte..."
              value={form.message}
              onChange={handleChange}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {status === "error" && (
            <p style={{ color: "var(--color-error)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary"
            style={{
              alignSelf: "flex-start",
              ...(status === "sending" && { opacity: 0.6, cursor: "not-allowed" }),
            }}
          >
            {status === "sending" ? "Enviando..." : <>Enviar mensaje <span className="btn-arrow">→</span></>}
          </button>
        </form>
      )}
    </>
  );
}