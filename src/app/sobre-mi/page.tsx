import { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Desarrollador fullstack desde 2012. Mi trayectoria, cómo trabajo y qué busco en mi próximo proyecto.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="page-content-narrow">
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
            body: `Con 13 años ya estaba haciendo webs con Frontpage y Dreamweaver. Siempre supe que quería dedicarme al mundo de la informática — la única duda era si acabaría en programación o en sistemas, y eso no lo resolví hasta que vi ambos mundos en primero. Mi primer contacto profesional fue una beca en una escuela de negocios donde hacía de todo: desde picar datos de leads en su sistema hasta diseñar una biblioteca online para gestionar los libros de la biblioteca que reservaban los alumnos. Ahí entendí que me gustaba construir cosas que la gente usara de verdad.`,
          },
          {
            title: "Cómo trabajo",
            body: `Mis compañeros me describen como responsable y serio, pero cercano y disponible. Creo que un buen developer es, primero, un buen comunicador: pregunto antes de asumir, escribo código que otros pueden mantener, y pienso en producción desde el primer commit. Cuando entro en modo concentración profunda, se me pueden pasar horas sin darme cuenta — y sin escuchar nada de lo que pasa alrededor. No me interesa acumular tecnologías; me interesa resolver el problema correcto. También me gusta entender las decisiones desde la perspectiva del negocio y de la experiencia de usuario, no solo desde el código.`,
          },
          {
            title: "Qué me motiva",
            body: `Que lo que construyo importe de verdad. Hay proyectos pequeños que te recuerdan por qué empezaste. En algún momento de mi carrera desarrollé algo para un amigo cercano, sin grandes pretensiones, y años después sigue agradeciéndome el impacto que tuvo en su negocio. Ese tipo de feedback vale más que cualquier métrica. Es el tipo de impacto que no siempre valoro en el momento, pero que es el que más me importa. Lo que me haría levantarme con ganas un lunes sería trabajar en algo propio, con una visión clara de hacia dónde va y que aportase algo positivo. No hace falta que sea el próximo Netflix — con que cambie vidas y me dé estabilidad en la mía, es suficiente.`,
          },
          {
            title: "Fuera del código",
            body: `Leo sobre arquitectura de software y, cada vez más, sobre geopolítica, negocios e inversiones. Empecé a investigar al cambiar mi hipoteca y un tema me fue llevando a otro — acabé entrando en una madriguera de conejo de la que no me arrepiento. Resulta que el mundo es más interesante que una hoja de cálculo, aunque muchas decisiones importantes todavía se toman exactamente así. El Real Madrid y el Age of Empires completan el cuadro — en ese orden.`,
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
              background: "#f5c400",
              flexShrink: 0,
              boxShadow: "0 0 8px #f5c400",
            }}
          />
          <p style={{ fontSize: "0.9rem", color: "var(--text-soft)" }}>
            <strong style={{ color: "var(--text)" }}>Abierto a conversaciones</strong> sobre oportunidades remotas o híbridas cerca de Alcalá de Henares.{" "}
            <a href="/contacto" style={{ color: "var(--accent)" }}>Hablemos →</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
