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
      <p className="eyebrow mb-6">contacto</p>

      <h1
        className="font-display font-extrabold tracking-[-0.03em] leading-[1.1] mb-4 text-[var(--text)]"
        style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
      >
        Hablemos.
      </h1>

      <p className="text-[var(--text-soft)] mb-12 leading-[1.75] text-[1.05rem]">
        Si tienes una oportunidad interesante, quieres hablar sobre tecnología
        o simplemente conectar, estoy al otro lado.
        Respondo lo antes posible.
      </p>

      {status === "ok" ? (
        <div className="p-8 border border-[var(--color-success)] rounded-[var(--radius)] text-[var(--color-success)] font-mono">
          ✓ Mensaje enviado. Te respondo pronto.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute left-[-9999px] opacity-0 pointer-events-none"
            value={form.website}
            onChange={handleChange}
          />

          {[
            { name: "name",  label: "Nombre", type: "text",  placeholder: "Tu nombre"    },
            { name: "email", label: "Email",  type: "email", placeholder: "tu@email.com" },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="form-label">{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                value={form[name as FormField]}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          ))}

          <div>
            <label htmlFor="message" className="form-label">Mensaje</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="En qué puedo ayudarte..."
              value={form.message}
              onChange={handleChange}
              className="form-input resize-y"
            />
          </div>

          {status === "error" && (
            <p className="text-[var(--color-error)] font-mono text-[0.85rem]">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary self-start"
            style={status === "sending" ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
          >
            {status === "sending" ? "Enviando..." : <>Enviar mensaje <span className="btn-arrow">→</span></>}
          </button>
        </form>
      )}
    </>
  );
}
