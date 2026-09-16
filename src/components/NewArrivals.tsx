"use client";

import React from "react";
import { FRAGRANCES } from "@/data/fragrances";
import { useCart } from "@/context/CartContext";
import { Sparkles, Plus, Clock, Flame, Award } from "lucide-react";

export function NewArrivals() {
  const { addFragranceToPack, packFragranceCounts } = useCart();

  const newArrivals = FRAGRANCES.filter((f) => f.isNewArrival);

  return (
    <section id="novidades" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#253D32]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-[#253D32] border border-[#253D32]/10 mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#588157]" />
            Lançamentos Exclusivos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#253D32] tracking-tight mb-4">
            Novidades Botânicas da Mathura
          </h2>
          <p className="text-base sm:text-lg text-[#607168] font-sans">
            Novas sinergias aromáticas puras desenvolvidas para despertar sensações únicas de aconchego, frescor e elevação espiritual.
          </p>
        </div>

        {/* Grid of New Arrivals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {newArrivals.map((fragrance) => {
            const count = packFragranceCounts[fragrance.id] || 0;

            return (
              <div
                key={fragrance.id}
                className="rounded-3xl p-5 bg-white border border-[#253D32]/10 hover:border-[#588157]/50 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md relative overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative w-full h-48 mb-4 rounded-2xl bg-linear-to-b from-[#F4EFE6]/40 to-[#FBF9F5]/80 flex items-center justify-center p-2 overflow-hidden border border-[#253D32]/5">
                  <img
                    src={fragrance.imageUrl}
                    alt={fragrance.name}
                    className="max-h-40 w-auto object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                    loading="lazy"
                  />

                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#588157] text-white shadow-2xs">
                      Novidade
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white text-[#253D32] border border-[#253D32]/10">
                      {fragrance.family}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="text-[10px] text-[#607168] bg-white px-2 py-0.5 rounded-md border border-[#253D32]/10 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-[#C29D59]" />
                      ~60 min
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Social Proof */}
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#B86B53] font-bold flex items-center gap-1 text-[11px]">
                        <Flame className="w-3 h-3" /> +{fragrance.salesCount} vendidos
                      </span>
                      <span className="text-[#C29D59] font-bold flex items-center gap-0.5 text-xs">
                        ★ {fragrance.rating.toFixed(1)} <span className="text-[#607168] font-normal text-[10px]">({fragrance.reviewsCount})</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-[#253D32] mb-0.5">
                      {fragrance.name}
                    </h3>
                    <p className="text-[11px] italic text-[#607168] mb-2">
                      {fragrance.subtitle}
                    </p>
                    <p className="text-xs text-[#253D32]/80 line-clamp-2 mb-3 leading-relaxed">
                      {fragrance.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {fragrance.benefits.slice(0, 2).map((b, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#253D32] font-medium"
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add to Pack Button */}
                  <div className="pt-3 border-t border-[#253D32]/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#607168] font-medium">
                      {count > 0 ? `${count} no seu pack` : "10 varetas/cx"}
                    </span>

                    <button
                      onClick={() => addFragranceToPack(fragrance.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#253D32] text-white hover:bg-[#1C3027] transition-all text-xs font-semibold shadow-xs cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#C29D59]" />
                      <span>{count > 0 ? "Adicionar +" : "Experimentar"}</span>
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
