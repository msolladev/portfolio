import { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Fullstack developer con 13 años de experiencia profesional. Mi historia, cómo trabajo y qué me motiva.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "5rem 1.5rem 8rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          sobre mí
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "3rem",
          }}
        >
          El criterio no se aprende en cursos.
        </h1>

        {/* Secciones de narrativa — personaliza con tu historia real */}
        {[
          {
            title: "Cómo llegué aquí",
            body: `Empecé en 2012 cuando los frameworks de frontend eran algo exótico y jQuery era la norma. Desde entonces he visto nacer y morir tendencias, stacks y metodologías — lo que me da perspectiva sobre qué vale la pena adoptar y qué es ruido.`,
          },
          {
            title: "Cómo trabajo",
            body: `Creo que un buen developer es, primero, un buen comunicador. Pregunto antes de asumir, escribo código que otros pueden mantener, y pienso en producción desde el primer commit. No me interesa acumular tecnologías; me interesa resolver el problema correcto.`,
          },
          {
            title: "Qué me motiva",
            body: `Proyectos donde el software tiene impacto real: mejora procesos, salva tiempo, genera negocio. Me atrae trabajar con equipos pequeños y autónomos, con cultura de ownership y sin capas de burocracia innecesarias.`,
          },
          {
            title: "Fuera del código",
            body: `Leo sobre diseño de sistemas y filosofía de ingeniería. Disfruto explicar conceptos técnicos a personas no técnicas — si no puedo explicarlo con claridad, probablemente no lo entiendo bien.`,
          },
        ].map(({ title, body }) => (
          <section key={title} style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                color: "var(--text)",
              }}
            >
              {title}
            </h2>
            <p style={{ color: "var(--text-soft)", lineHeight: 1.8 }}>{body}</p>
          </section>
        ))}

        {/* Disponibilidad actual */}
        <div
          style={{
            marginTop: "4rem",
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            background: "var(--surface)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#28c840",
              flexShrink: 0,
              boxShadow: "0 0 8px #28c840",
            }}
          />
          <p style={{ fontSize: "0.9rem", color: "var(--text-soft)" }}>
            <strong style={{ color: "var(--text)" }}>Disponible</strong> para proyectos freelance o posiciones remote.{" "}
            <a href="/contacto" style={{ color: "var(--accent)" }}>Hablemos →</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
