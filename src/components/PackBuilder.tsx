"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FRAGRANCES, PACK_PRESETS, Fragrance } from "@/data/fragrances";
import { Plus, Minus, Check, Sparkles, ShoppingBag, Trash2, Clock, ShieldCheck, ArrowRight, Flame } from "lucide-react";

export function PackBuilder() {
  const {
    packFragranceCounts,
    addFragranceToPack,
    removeFragranceFromPack,
    clearCurrentPack,
    totalSelectedBoxes,
    minBoxesRequired,
    remainingToMinimum,
    isMinimumReached,
    currentPricing,
    applyPresetSuggestion,
    targetPresetSize,
    addCurrentPackToCart,
  } = useCart();

  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFragrances = FRAGRANCES.filter((f) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchBenefits = f.benefits.some((b) => b.toLowerCase().includes(q));
      const matchNotes = f.notes.toLowerCase().includes(q);
      const matchDesc = f.description.toLowerCase().includes(q);
      if (!matchName && !matchBenefits && !matchNotes && !matchDesc) return false;
    }

    // Filter by intention
    if (activeFilter === "todos") return true;
    return f.intentions.includes(activeFilter as any);
  });

  return (
    <section id="pack-builder" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F4EFE6] text-[#253D32] border border-[#253D32]/10 mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C29D59]" />
            Personalização Sem Limites
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#253D32] tracking-tight mb-4">
            Monte o Seu Pack de Aromaterapia
          </h2>
          <p className="text-base sm:text-lg text-[#607168] font-sans">
            Você tem total liberdade: <strong>adicione quantas caixinhas desejar (mínimo de 5)</strong>. Quanto mais caixinhas você escolhe, mais o valor unitário diminui.
          </p>
        </div>

        {/* Step 1: Sugestões de Kits — KIT 10 RECOMENDADO CENTRALIZADO NO MEIO */}
        <div className="mb-14">
          <div className="text-center mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#607168]">
              Sugestões Rápidas de Kits (Ou adicione livremente abaixo):
            </h3>
            <span className="text-[11px] text-[#588157] font-semibold block mt-0.5">
              ✓ 5 caixinhas por apenas R$ 79,90 • Descontos progressivos automáticos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto items-center">
            {PACK_PRESETS.map((preset) => {
              const isSelected = targetPresetSize === preset.size;
              const isRecommended = preset.isRecommended;

              return (
                <div
                  key={preset.size}
                  onClick={() => applyPresetSuggestion(preset.size)}
                  className={`p-5 rounded-3xl text-center transition-all relative cursor-pointer flex flex-col justify-between ${
                    isRecommended
                      ? "bg-white border-2 border-[#C29D59] shadow-xl scale-103 ring-4 ring-[#C29D59]/20 z-10"
                      : isSelected
                      ? "bg-[#253D32] text-white shadow-lg scale-102 ring-2 ring-[#C29D59]"
                      : "glass-card hover:border-[#253D32]/30 text-[#253D32]"
                  }`}
                >
                  {/* Badge */}
                  {preset.badge && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap ${
                        isRecommended
                          ? "bg-[#C29D59] text-white"
                          : isSelected
                          ? "bg-white text-[#253D32]"
                          : "bg-[#F4EFE6] text-[#253D32] border border-[#253D32]/15"
                      }`}
                    >
                      {preset.badge}
                    </div>
                  )}

                  <div className="pt-2">
                    <span className="block text-2xl sm:text-3xl font-display font-bold">
                      {preset.size} Caixinhas
                    </span>
                    <span className={`block text-xs mt-1 ${isRecommended ? "text-[#607168]" : isSelected ? "text-white/80" : "text-[#607168]"}`}>
                      {preset.sticks} varetas ({preset.sticks}h de queima total)
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-current/10">
                    <span className="block text-xl font-bold">
                      R$ {preset.price.toFixed(2).replace(".", ",")}
                    </span>
                    <span className={`block text-xs font-semibold ${isRecommended ? "text-[#588157]" : isSelected ? "text-[#C29D59]" : "text-[#588157]"}`}>
                      R$ {preset.unitPrice.toFixed(2).replace(".", ",")} por caixinha
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 100% OPAQUE & HIGH-CONTRAST STICKY PROGRESS BAR WHEN SCROLLING */}
        <div className="sticky top-20 z-30 mb-12 max-w-4xl mx-auto">
          <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-[#253D32] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#253D32]">
                    Progresso do seu Pack:
                  </span>
                  <span className="text-base font-extrabold text-[#253D32] bg-[#F4EFE6] px-2.5 py-0.5 rounded-lg border border-[#253D32]/15">
                    {totalSelectedBoxes} {totalSelectedBoxes === 1 ? "caixinha" : "caixinhas"}
                  </span>
                </div>

                {/* Price Display */}
                {totalSelectedBoxes >= minBoxesRequired ? (
                  <div className="text-right">
                    <span className="text-base sm:text-lg font-bold text-[#253D32] block leading-none">
                      Total: R$ {currentPricing.total.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-[11px] text-[#588157] font-semibold block">
                      R$ {currentPricing.unitPrice.toFixed(2).replace(".", ",")} / un
                      {currentPricing.freeShipping ? " • Frete Grátis!" : ""}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-[#B86B53] bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                    Faltam {remainingToMinimum} para o mínimo (5 caixinhas)
                  </span>
                )}
              </div>

              {/* Progress track */}
              <div className="w-full h-3 bg-[#EAE5DA] rounded-full overflow-hidden border border-[#253D32]/20">
                <div
                  className="h-full bg-linear-to-r from-[#253D32] via-[#588157] to-[#C29D59] transition-all duration-300 rounded-full"
                  style={{
                    width: `${Math.min(100, (totalSelectedBoxes / Math.max(5, targetPresetSize || totalSelectedBoxes)) * 100)}%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-[#607168] mt-1.5 font-medium">
                <span>Mínimo: 5 caixinhas (R$ 79,90)</span>
                <span>Adicione quantas quiser • Preço cai até R$ 13,00/un</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {totalSelectedBoxes > 0 && (
                <button
                  onClick={clearCurrentPack}
                  className="p-3 rounded-xl text-[#607168] hover:text-[#B86B53] hover:bg-[#F4EFE6] transition-colors cursor-pointer border border-[#253D32]/10"
                  title="Limpar seleção"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={addCurrentPackToCart}
                disabled={!isMinimumReached}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                  isMinimumReached
                    ? "bg-[#253D32] text-white hover:bg-[#1C3027] ring-2 ring-[#C29D59] scale-102"
                    : "bg-[#EAE5DA] text-[#607168] opacity-60 cursor-not-allowed"
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-[#C29D59]" />
                <span>
                  {isMinimumReached
                    ? `Adicionar ${totalSelectedBoxes} Caixinhas à Sacola`
                    : `Escolha no Mínimo 5 Caixinhas`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Filters & Search */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar aroma ou necessidade..."
                className="w-full rounded-full bg-white border border-[#253D32]/15 px-4 py-2.5 text-xs text-[#253D32] placeholder-[#607168]/60 focus:outline-none focus:border-[#C29D59] shadow-2xs"
              />
            </div>

            {/* Intention Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full sm:w-auto text-xs no-scrollbar">
              {[
                { id: "todos", label: "Todas as Fragrâncias" },
                { id: "descarrego", label: "🛡️ Descarrego & Proteção" },
                { id: "foco", label: "🧠 Foco & Concentração" },
                { id: "relaxamento", label: "🌙 Serenidade & Sono" },
                { id: "prosperidade", label: "💰 Prosperidade & Fartura" },
                { id: "meditacao", label: "🧘 Meditação & Paz" },
                { id: "afrodisiaco", label: "✨ Amor & Harmonia" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all font-medium cursor-pointer ${
                    activeFilter === tab.id
                      ? "bg-[#253D32] text-white shadow-xs"
                      : "bg-white text-[#607168] border border-[#253D32]/10 hover:bg-[#F4EFE6]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fragrance Cards Grid with UNIFORM STANDARDIZED PHOTO CONTAINERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredFragrances.map((fragrance) => {
            const count = packFragranceCounts[fragrance.id] || 0;
            const isAdded = count > 0;

            return (
              <div
                key={fragrance.id}
                className={`rounded-3xl p-5 transition-all flex flex-col justify-between relative group ${
                  isAdded
                    ? "glass-card-active"
                    : "glass-card hover:border-[#C29D59]/40"
                }`}
              >
                {/* STANDARDIZED UNIFORM IMAGE SHOWCASE */}
                <div className="relative w-full h-48 mb-4 rounded-2xl bg-linear-to-b from-[#F4EFE6]/40 to-[#FBF9F5]/80 flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={fragrance.imageUrl}
                    alt={`Caixinha de Incenso Natural Mathura ${fragrance.name}`}
                    className="max-h-44 w-auto object-contain drop-shadow-md group-hover:scale-106 group-hover:-translate-y-1 transition-all duration-300"
                    loading="lazy"
                  />

                  {/* Top Badges over image */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/95 text-[#253D32] border border-[#253D32]/10 shadow-2xs">
                      {fragrance.family}
                    </span>
                    {fragrance.isBestseller && (
                      <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#C29D59] text-white shadow-2xs">
                        Mais Vendido
                      </span>
                    )}
                    {fragrance.isNewArrival && (
                      <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#588157] text-white shadow-2xs">
                        Novidade
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="text-[10px] text-[#607168] bg-white/95 px-2 py-0.5 rounded-md border border-[#253D32]/10 flex items-center gap-1 font-semibold shadow-2xs">
                      <Clock className="w-3 h-3 text-[#C29D59]" />
                      ~60 min
                    </span>
                  </div>

                  {/* Quantity Ribbon if added */}
                  {count > 0 && (
                    <div className="absolute bottom-2.5 right-2.5 z-10 bg-[#253D32] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <span>{count} no seu pack</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Social Proof: Sales count & Rating */}
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-[#B86B53] font-bold flex items-center gap-1">
                        🔥 +{fragrance.salesCount.toLocaleString("pt-BR")} vendidos
                      </span>
                      <span className="text-[#C29D59] font-bold flex items-center gap-0.5">
                        ★ {fragrance.rating.toFixed(1)} <span className="text-[#607168] font-medium text-[10px]">({fragrance.reviewsCount})</span>
                      </span>
                    </div>

                    <h4 className="text-lg font-display font-bold text-[#253D32] mb-0.5 leading-tight">
                      {fragrance.name}
                    </h4>
                    <p className="text-[11px] italic text-[#607168] mb-2">
                      {fragrance.subtitle}
                    </p>

                    <p className="text-xs text-[#253D32]/85 leading-relaxed mb-3 line-clamp-2">
                      {fragrance.description}
                    </p>

                    {/* Benefits Badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {fragrance.benefits.slice(0, 2).map((benefit, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#253D32]/10 text-[#253D32] font-medium"
                        >
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Counter Action (NO LIMIT) */}
                  <div className="pt-3 border-t border-[#253D32]/10 flex items-center justify-between">
                    <span className="text-[11px] text-[#607168] font-medium">
                      10 varetas p/ caixinha
                    </span>

                    {/* Counter Buttons */}
                    <div className="flex items-center gap-1.5">
                      {count > 0 && (
                        <button
                          onClick={() => removeFragranceFromPack(fragrance.id)}
                          className="w-7 h-7 rounded-full bg-white border border-[#253D32]/20 flex items-center justify-center text-[#253D32] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      )}

                      {count > 0 && (
                        <span className="w-5 text-center font-bold text-xs text-[#253D32]">
                          {count}
                        </span>
                      )}

                      <button
                        onClick={() => addFragranceToPack(fragrance.id)}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#253D32] text-white hover:bg-[#1C3027] shadow-xs transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#C29D59]" />
                        <span>{count > 0 ? "Mais 1" : "Adicionar"}</span>
                      </button>
                    </div>
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
