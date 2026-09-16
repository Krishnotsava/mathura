"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Sparkles, ShoppingBag, Leaf, Building2, Menu, X } from "lucide-react";

export function Navbar() {
  const { cartCount, setIsCartOpen, setIsAiModalOpen, setIsWholesaleOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner: Key Differentiators */}
      <div className="bg-[#253D32] text-[#FBF9F5] text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-[#C29D59]" />
          100% Natural • Sem Carvão e Sem Pólvora
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C29D59]"></span>
          Frete Grátis nas compras acima de R$ 100
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C29D59]"></span>
          Mais de 30 Anos de Mercado
        </span>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-panel shadow-sm py-3"
            : "bg-[#FBF9F5]/90 backdrop-blur-md py-4 border-b border-[#253D32]/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#253D32] flex items-center justify-center text-[#FBF9F5] font-display font-semibold text-lg tracking-wider shadow-sm group-hover:bg-[#1C3027] transition-colors">
              M
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-[#253D32] block leading-none">
                MATHURA
              </span>
              <span className="text-[10px] tracking-widest text-[#607168] uppercase block mt-0.5 font-medium">
                Incensos Naturais
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#253D32]/85">
            <a
              href="#mais-vendidos"
              className="hover:text-[#253D32] hover:underline underline-offset-8 transition-colors"
            >
              Mais Vendidos
            </a>
            <a
              href="#compre-por-kits"
              className="hover:text-[#253D32] hover:underline underline-offset-8 transition-colors"
            >
              Compre por Kits
            </a>
            <a
              href="#pack-builder"
              className="hover:text-[#253D32] hover:underline underline-offset-8 transition-colors"
            >
              Monte o Seu Pack
            </a>
            <a
              href="#novidades"
              className="hover:text-[#253D32] hover:underline underline-offset-8 transition-colors"
            >
              Novidades
            </a>
            <a
              href="#modo-de-usar"
              className="hover:text-[#253D32] hover:underline underline-offset-8 transition-colors"
            >
              Modo de Usar
            </a>
            <a
              href="#depoimentos"
              className="hover:text-[#253D32] hover:underline underline-offset-8 transition-colors"
            >
              Avaliações
            </a>
            <button
              onClick={() => setIsWholesaleOpen(true)}
              className="flex items-center gap-1 text-[#B86B53] hover:text-[#9B533D] font-bold transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              Atacado
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* AI Sommelier Button */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#F4EFE6] text-[#253D32] border border-[#C29D59]/40 hover:bg-[#C29D59]/15 hover:border-[#C29D59] transition-all cursor-pointer shadow-sm group"
            >
              <Sparkles className="w-4 h-4 text-[#C29D59] group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Guia de Energização</span>
              <span className="sm:hidden">Guia IA</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#C29D59] badge-pulse"></span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#253D32] text-[#FBF9F5] hover:bg-[#1C3027] transition-colors shadow-sm cursor-pointer"
              aria-label="Abrir sacola de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C29D59] text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#253D32] hover:bg-[#F4EFE6] rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-[#253D32]/10 px-6 py-5 mt-3 space-y-3">
            <a
              href="#mais-vendidos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#253D32] py-1"
            >
              🔥 Os Mais Vendidos
            </a>
            <a
              href="#compre-por-kits"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#253D32] py-1"
            >
              📦 Compre por Kits Prontos
            </a>
            <a
              href="#pack-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#253D32] py-1"
            >
              ✨ Monte o Seu Pack Livre (Mín. 5)
            </a>
            <a
              href="#novidades"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#253D32] py-1"
            >
              🌱 Novidades Botânicas
            </a>
            <a
              href="#modo-de-usar"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#253D32] py-1"
            >
              🕯️ Modo de Usar
            </a>
            <a
              href="#depoimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#253D32] py-1"
            >
              ⭐ Avaliações & Depoimentos
            </a>
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#253D32] py-1"
            >
              🛡️ +30 Anos de Mercado & Diferenciais
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWholesaleOpen(true);
              }}
              className="flex items-center gap-2 text-sm font-bold text-[#B86B53] py-2 w-full text-left pt-2 border-t border-[#253D32]/10"
            >
              <Building2 className="w-4 h-4" />
              Área de Atacado (Lojistas)
            </button>
          </div>
        )}
      </header>
    </>
  );
}
