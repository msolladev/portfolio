import { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Tienes una oportunidad interesante? Estoy abierto a conversaciones sobre posiciones remotas o híbridas cerca de Alcalá de Henares.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contacto` },
  keywords: ["contacto", "Miguel Solla", "desarrollador disponible", "remoto", "híbrido", "Alcalá de Henares"],
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="page-content-narrow">
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}