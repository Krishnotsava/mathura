"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Heart, ShieldCheck, MessageCircle, LayoutDashboard } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Footer() {
  const { setIsWholesaleOpen, setIsAiModalOpen } = useCart();

  return (
    <footer className="bg-[#1C2B24] text-[#FBF9F5] pt-16 pb-12 border-t border-[#253D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C29D59] text-[#253D32] flex items-center justify-center font-display font-bold">
                M
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-white">
                MATHURA
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              Mais de 30 anos de tradição em aromaterapia botânica consciente. Incensos 100% naturais sem carvão e sem pólvora, queima lenta de 1 hora e seguros para animais.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C29D59] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>+30 Anos de Garantia & Pureza</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C29D59] mb-4">
              Navegação Rápida
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <a href="#mais-vendidos" className="hover:text-white transition-colors">
                  Os Mais Vendidos
                </a>
              </li>
              <li>
                <a href="#compre-por-kits" className="hover:text-white transition-colors">
                  Compre por Kits Prontos
                </a>
              </li>
              <li>
                <a href="#pack-builder" className="hover:text-white transition-colors">
                  Monte seu Pack Livre (Mín. 5)
                </a>
              </li>
              <li>
                <a href="#novidades" className="hover:text-white transition-colors">
                  Novidades Botânicas
                </a>
              </li>
              <li>
                <a href="#modo-de-usar" className="hover:text-white transition-colors">
                  Modo de Usar & Cuidados
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white transition-colors">
                  Depoimentos de Clientes
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Consultor de Aromas com IA
                </button>
              </li>
            </ul>
          </div>

          {/* Business / Wholesale */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C29D59] mb-4">
              Lojistas & Parcerias
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <button
                  onClick={() => setIsWholesaleOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Atacado (100 a 300 Unidades)
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/5511999999999?text=Ol%C3%A1%20gostaria%20de%20revender%20os%20incensos%20Mathura"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  Falar com Representante
                </a>
              </li>
              <li>
                <span className="text-white/50 block">CNPJ / Revenda Autorizada</span>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C29D59] hover:text-[#e4c27d] font-medium transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Painel de Gestão (Lojista)
                </Link>
              </li>
            </ul>
          </div>

          {/* Sustainability & Pet-Friendly Note */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <span className="text-xs font-bold text-[#C29D59] flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" /> Compromisso Eco-Consciente
            </span>
            <p className="text-[11px] text-white/70 leading-relaxed">
              Toda a madeira utilizada em nossos incensos provém de áreas de reflorestamento certificado. Zero crueldade animal e zero emissão de gases pesados decorrentes de combustão de carvão mineral.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Mathura Incensos Naturais. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-[#B86B53] mx-1 fill-current" /> para harmonizar o seu lar.
          </div>
        </div>
      </div>
    </footer>
  );
}
