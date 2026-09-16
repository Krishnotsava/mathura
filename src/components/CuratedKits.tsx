"use client";

import React from "react";
import { CURATED_KITS, FRAGRANCES, CuratedKit } from "@/data/fragrances";
import { useCart } from "@/context/CartContext";
import { Clock, ShieldCheck, Sparkles, ShoppingBag, SlidersHorizontal, PackageCheck } from "lucide-react";

export function CuratedKits() {
  const { addTreatmentToCart, loadTreatmentIntoBuilder } = useCart();

  return (
    <section id="compre-por-kits" className="py-16 md:py-24 bg-[#F4EFE6]/50 border-y border-[#253D32]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-[#253D32] border border-[#253D32]/10 mb-4 shadow-2xs">
            <PackageCheck className="w-3.5 h-3.5 text-[#C29D59]" />
            Coleções Prontas por Objetivo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#253D32] tracking-tight mb-4">
            Compre por Kits Prontos
          </h2>
          <p className="text-base sm:text-lg text-[#607168] font-sans">
            Cada kit contém exatamente os 5 pacotes artesanais ilustrados abaixo (50 varetas com mais de 50 horas de queima). Prontos para atuar e auxiliar no seu bem-estar, ou personalizáveis no montador livre.
          </p>
        </div>

        {/* Kits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {CURATED_KITS.map((kit) => {
            const includedFragrances = kit.recommendedFragranceIds
              .map((id) => FRAGRANCES.find((f) => f.id === id))
              .filter(Boolean);

            const isFeatured = kit.isFeatured;

            return (
              <div
                key={kit.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all ${
                  isFeatured
                    ? "bg-white border-2 border-[#C29D59] shadow-2xl ring-4 ring-[#C29D59]/15 scale-101"
                    : "glass-card border border-[#253D32]/10"
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {isFeatured ? (
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C29D59] text-white flex items-center gap-1.5 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" /> RECOMENDADO PELO SOMMELIER
                    </span>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#253D32] text-white">
                      Coleção Especial
                    </span>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-[#C29D59] font-bold">
                    <Clock className="w-4 h-4" />
                    <span>50 Horas de Queima</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-[#253D32] mb-1.5">
                    {kit.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#588157] mb-5 leading-relaxed flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#588157]"></span>
                    {kit.tagline}
                  </p>

                  {/* Real Product Transparent Photos Gallery for this Kit */}
                  <div className="mb-5 p-4 rounded-2xl bg-linear-to-b from-[#FBF9F5] to-[#F4EFE6]/60 border border-[#253D32]/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#253D32] block mb-3">
                      As 5 Caixinhas Inclusas Neste Kit:
                    </span>

                    <div className="grid grid-cols-5 gap-2 items-end justify-items-center">
                      {includedFragrances.map((f, i) => (
                        <div key={i} className="flex flex-col items-center text-center group w-full">
                          <div className="h-28 w-full flex items-center justify-center p-1 bg-white/70 rounded-xl border border-[#253D32]/5 shadow-2xs">
                            <img
                              src={f?.imageUrl}
                              alt={f?.name}
                              className="h-24 max-w-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-[#253D32] line-clamp-1 mt-1.5">
                            {f?.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guide Box */}
                  <div className="p-4 rounded-2xl bg-white border border-[#253D32]/10 mb-6 text-xs space-y-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#253D32]">
                      <ShieldCheck className="w-4 h-4 text-[#588157]" />
                      Como usar este kit (Guia Sugerido):
                    </div>
                    <p className="text-[#607168]">
                      <strong>Frequência:</strong> {kit.prescription.frequency}
                    </p>
                    <p className="text-[#607168]">
                      <strong>Ambiente ideal:</strong> {kit.prescription.schedule}
                    </p>
                    <p className="text-[#253D32] font-medium pt-1 border-t border-[#253D32]/5">
                      <strong>Efeito esperado:</strong> {kit.prescription.targetEffect}
                    </p>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-[#253D32]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-display font-bold text-[#253D32]">
                        R$ {kit.price.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-xs text-[#607168] line-through">
                        R$ {kit.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#588157] font-semibold block">
                      5 caixinhas inclusas • R$ 15,98 / unidade
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => loadTreatmentIntoBuilder(kit)}
                      title="Personalizar as fragrâncias ou adicionar mais caixinhas no montador"
                      className="p-3 rounded-full bg-white border border-[#253D32]/15 text-[#253D32] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addTreatmentToCart(kit)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#253D32] text-white font-semibold text-xs hover:bg-[#1C3027] transition-all shadow-md cursor-pointer group"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#C29D59]" />
                      <span>Comprar Kit Completo</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Export para manter compatibilidade
export { CuratedKits as TreatmentPacks };
