import { Metadata } from "next";
import { Terminal } from "@/components/sections/Terminal";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Fullstack Developer — Inicio",
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Terminal />
        <Stack />
      </main>
      <Footer />
    </>
  );
}
