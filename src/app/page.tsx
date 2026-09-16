import React from "react";
import { CartProvider } from "@/context/CartContext";
import { SmokeBackground } from "@/components/SmokeBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuickSearch } from "@/components/QuickSearch";
import { Bestsellers } from "@/components/Bestsellers";
import { CuratedKits } from "@/components/CuratedKits";
import { PackBuilder } from "@/components/PackBuilder";
import { NewArrivals } from "@/components/NewArrivals";
import { UsageGuide } from "@/components/UsageGuide";
import { Differentiators } from "@/components/Differentiators";
import { Testimonials } from "@/components/Testimonials";
import { AiSommelierModal } from "@/components/AiSommelierModal";
import { CartDrawer } from "@/components/CartDrawer";
import { WholesaleModal } from "@/components/WholesaleModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <CartProvider>
      <div className="relative min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A221E] selection:bg-[#253D32]/15 selection:text-[#253D32]">
        {/* Subtle GPU smoke simulation background */}
        <SmokeBackground />

        {/* Global sticky header */}
        <Navbar />

        {/* Main single-page sections */}
        <main className="flex-1 relative z-10">
          <Hero />

          {/* Prominent Quick Search Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-4">
            <QuickSearch />
          </div>

          {/* Bestsellers: Os Mais Vendidos */}
          <Bestsellers />

          {/* Compre por Kits: Coleções Prontas por Objetivo */}
          <CuratedKits />

          {/* Interactive Pack Builder: Monte seu Pack Livre (Mínimo 5) */}
          <PackBuilder />

          {/* New Arrivals: Novidades & Lançamentos Botânicos */}
          <NewArrivals />

          {/* Usage Guide & Precautions: Modo de Usar */}
          <UsageGuide />

          {/* Differentiators & Side-by-side comparison */}
          <Differentiators />

          {/* Testimonials: Depoimentos & Prova Social */}
          <Testimonials />
        </main>

        {/* Drawers & Modals */}
        <AiSommelierModal />
        <CartDrawer />
        <WholesaleModal />

        {/* Global Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}
