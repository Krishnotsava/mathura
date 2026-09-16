"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { FRAGRANCES, Fragrance } from "@/data/fragrances";
import { useCart } from "@/context/CartContext";
import { Search, Sparkles, Plus, Check, X, ArrowRight, Clock, Leaf } from "lucide-react";

const QUICK_SUGGESTIONS = [
  { label: "🛡️ Ambiente Carregado", query: "descarrego" },
  { label: "🧠 Aumentar Concentração", query: "foco" },
  { label: "🌙 Alívio de Ansiedade & Sono", query: "sono" },
  { label: "💰 Atrair Fortuna & Fartura", query: "prosperidade" },
  { label: "🐾 Seguro para Pets", query: "pet" },
  { label: "🧘 Meditação & Paz", query: "meditacao" },
  { label: "✨ Clima Afrodisíaco", query: "afrodisiaco" },
];

export function QuickSearch() {
  const { addFragranceToPack, packFragranceCounts, totalSelectedBoxes, remainingToMinimum, isMinimumReached } = useCart();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Intelligent matching
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return FRAGRANCES.filter((f) => {
      // Direct text matches
      const matchName = f.name.toLowerCase().includes(q);
      const matchBenefits = f.benefits.some((b) => b.toLowerCase().includes(q));
      const matchNotes = f.notes.toLowerCase().includes(q);
      const matchDesc = f.description.toLowerCase().includes(q);
      const matchFamily = f.family.toLowerCase().includes(q);

      // Semantic synonyms mapping
      let matchSemantic = false;
      if (
        (q.includes("pesad") || q.includes("negativ") || q.includes("carregad") || q.includes("limpez") || q.includes("inveja") || q.includes("descarreg")) &&
        (f.intentions.includes("descarrego") || f.id.includes("arruda") || f.id.includes("breu"))
      ) {
        matchSemantic = true;
      } else if (
        (q.includes("estud") || q.includes("trabalh") || q.includes("concentr") || q.includes("foco") || q.includes("produtiv") || q.includes("mente")) &&
        (f.intentions.includes("foco") || f.id.includes("capim") || f.id.includes("alecrim"))
      ) {
        matchSemantic = true;
      } else if (
        (q.includes("sono") || q.includes("insoni") || q.includes("dorm") || q.includes("ansied") || q.includes("calm") || q.includes("estress") || q.includes("relax")) &&
        (f.intentions.includes("relaxamento") || f.id.includes("lavanda") || f.id.includes("sandalo"))
      ) {
        matchSemantic = true;
      } else if (
        (q.includes("dinheir") || q.includes("prosper") || q.includes("fartur") || q.includes("abundanc") || q.includes("vend") || q.includes("fortuna")) &&
        (f.intentions.includes("prosperidade") || f.id.includes("canela"))
      ) {
        matchSemantic = true;
      } else if (
        (q.includes("pet") || q.includes("cachorr") || q.includes("gato") || q.includes("animal")) &&
        (f.id.includes("lavanda") || f.id.includes("sandalo") || f.id.includes("pitanga"))
      ) {
        matchSemantic = true;
      } else if (
        (q.includes("amor") || q.includes("casal") || q.includes("afrodiz") || q.includes("afrodis") || q.includes("romance") || q.includes("sensual")) &&
        (f.intentions.includes("afrodisiaco") || f.id.includes("jasmim"))
      ) {
        matchSemantic = true;
      }

      return matchName || matchBenefits || matchNotes || matchDesc || matchFamily || matchSemantic;
    });
  }, [query]);

  const handleSelectSuggestion = (searchStr: string) => {
    setQuery(searchStr);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto my-8 relative z-20">
      {/* Search Input Card */}
      <div className="glass-panel rounded-3xl p-3 sm:p-4 shadow-lg border border-[#C29D59]/30 transition-all hover:border-[#C29D59] focus-within:border-[#C29D59] focus-within:ring-2 focus-within:ring-[#C29D59]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#253D32] text-[#C29D59] flex items-center justify-center shrink-0 shadow-xs">
            <Search className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#C29D59]">
              Consulta Rápida por Necessidade ou Benefício
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="O que você deseja harmonizar? (ex: ambiente carregado, aumentar concentração, insônia...)"
              className="w-full bg-transparent text-sm sm:text-base font-medium text-[#253D32] placeholder-[#607168]/60 focus:outline-none"
            />
          </div>

          {query && (
            <button
              onClick={handleClear}
              className="p-2 text-[#607168] hover:text-[#253D32] rounded-full hover:bg-[#F4EFE6] transition-colors cursor-pointer"
              title="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="mt-3 pt-2.5 border-t border-[#253D32]/5 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-[#607168] shrink-0 mr-1">
            Sugestões:
          </span>
          {QUICK_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggestion(item.query)}
              className="px-2.5 py-1 rounded-full bg-white border border-[#253D32]/10 hover:border-[#C29D59] hover:bg-[#F4EFE6] text-[#253D32] text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Dropdown Results */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#FBF9F5] border border-[#C29D59]/30 rounded-3xl shadow-2xl p-4 sm:p-5 max-h-[75vh] overflow-y-auto z-50 animate-scale">
          <div className="flex items-center justify-between pb-3 border-b border-[#253D32]/10 mb-3">
            <span className="text-xs font-bold text-[#253D32] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C29D59]" />
              {results.length === 1
                ? "1 Fragrância encontrada para sua busca"
                : `${results.length} Fragrâncias encontradas para "${query}"`}
            </span>
            <span className="text-[11px] text-[#607168]">
              {totalSelectedBoxes === 0
                ? "Mínimo de 5 caixinhas para compra (pack livre)"
                : !isMinimumReached
                ? `Faltam ${remainingToMinimum} para atingir o mínimo de 5 caixinhas`
                : `${totalSelectedBoxes} caixinhas no seu pack (adicione quantas quiser!)`}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm font-semibold text-[#253D32]">
                Nenhuma fragrância encontrada para "{query}".
              </p>
              <p className="text-xs text-[#607168]">
                Tente buscar por termos como <em>descarrego, foco, sono, prosperidade, sândalo ou lavanda</em>.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((fragrance) => {
                const count = packFragranceCounts[fragrance.id] || 0;

                return (
                  <div
                    key={fragrance.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#253D32]/10 hover:border-[#C29D59]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div className="w-14 h-18 rounded-xl bg-[#FBF9F5] p-1.5 flex items-center justify-center shrink-0 border border-[#253D32]/5">
                        <img
                          src={fragrance.imageUrl}
                          alt={fragrance.name}
                          className="max-h-full w-auto object-contain drop-shadow-xs"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-[#253D32]">
                            {fragrance.name}
                          </h4>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#253D32]">
                            {fragrance.family}
                          </span>
                          <span className="text-[10px] text-[#607168] flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-[#C29D59]" />
                            {fragrance.burnTime}
                          </span>
                        </div>
                        <p className="text-xs text-[#607168] mt-0.5 line-clamp-1">
                          {fragrance.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {fragrance.benefits.slice(0, 3).map((b, i) => (
                            <span
                              key={i}
                              className="text-[10px] text-[#253D32] bg-[#FBF9F5] border border-[#253D32]/5 px-1.5 py-0.5 rounded"
                            >
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {count > 0 && (
                        <span className="text-xs font-bold text-[#253D32] bg-[#F4EFE6] px-2.5 py-1 rounded-full">
                          {count} no kit
                        </span>
                      )}

                      <button
                        onClick={() => addFragranceToPack(fragrance.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer bg-[#253D32] text-white hover:bg-[#1C3027] shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#C29D59]" />
                        <span>{count > 0 ? "Adicionar mais 1" : "Adicionar ao Kit"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-[#253D32]/10 flex items-center justify-between text-xs">
                <a
                  href="#pack-builder"
                  onClick={() => setIsOpen(false)}
                  className="text-[#253D32] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Ver todas as fragrâncias no Construtor de Packs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C29D59]" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#607168] hover:text-[#253D32]"
                >
                  Fechar busca
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
