"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FRAGRANCES, Fragrance } from "@/data/fragrances";
import { Sparkles, X, Send, CheckCircle2, Clock, Leaf, ArrowRight, Loader2 } from "lucide-react";

const QUICK_NEEDS = [
  { label: "Ambiente Carregado / Descarrego", query: "Meu ambiente está pesado e preciso de descarrego e proteção energética" },
  { label: "Aumentar Foco & Concentração", query: "Preciso de clareza mental, foco para estudar e trabalhar sem ansiedade" },
  { label: "Alívio de Estresse & Sono Profundo", query: "Estou ansioso e com dificuldade para relaxar e dormir bem à noite" },
  { label: "Atrair Prosperidade & Oportunidades", query: "Quero abrir caminhos financeiros e atrair prosperidade e boa sorte" },
  { label: "Meditação & Elevação Espiritual", query: "Pratico yoga e meditação e procuro aromas para transcendência e calma" },
  { label: "Clima Afrodisíaco & Amor", query: "Quero um clima envolvente, sensual e acolhedor para momentos a dois" },
];

export function AiSommelierModal() {
  const { isAiModalOpen, setIsAiModalOpen, setTargetPresetSize, addFragranceToPack, clearCurrentPack, setIsCartOpen } = useCart();
  
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    diagnosis: string;
    recommendedFragranceIds: string[];
    prescription: string;
    affirmation: string;
  } | null>(null);

  if (!isAiModalOpen) return null;

  const handleConsult = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/sommelier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToBuilder = () => {
    if (!result) return;
    clearCurrentPack();
    setTargetPresetSize(result.recommendedFragranceIds.length || 5);
    result.recommendedFragranceIds.forEach((id) => {
      addFragranceToPack(id);
    });
    setIsAiModalOpen(false);

    // Scroll to pack builder
    setTimeout(() => {
      const el = document.getElementById("pack-builder");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const recommendedFragrances = (result?.recommendedFragranceIds || [])
    .map((id) => FRAGRANCES.find((f) => f.id === id))
    .filter((f): f is Fragrance => f !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#253D32]/15 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#253D32]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#253D32] text-[#C29D59] flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-[#253D32]">
                Guia de Energização Mathura
              </h2>
              <p className="text-xs text-[#607168]">
                Inteligência botânica: diga o que deseja transformar e receba a prescrição perfeita.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-2 rounded-full hover:bg-[#F4EFE6] text-[#607168] hover:text-[#253D32] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {!result && !isLoading && (
            <div>
              <p className="text-sm font-semibold text-[#253D32] mb-3">
                Selecione uma necessidade frequente:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {QUICK_NEEDS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputQuery(item.query);
                      handleConsult(item.query);
                    }}
                    className="text-left p-3 rounded-xl bg-white border border-[#253D32]/10 hover:border-[#C29D59] hover:bg-[#F4EFE6] text-xs font-medium text-[#253D32] transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C29D59] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search / Text Box */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#607168] mb-2">
              Ou descreva com suas palavras:
            </label>
            <div className="relative">
              <textarea
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ex.: Sinto a casa pesada depois de receber visitas e quero um aroma limpo que não incomode meus cachorros..."
                rows={3}
                className="w-full rounded-2xl bg-white border border-[#253D32]/15 p-3.5 text-sm text-[#253D32] placeholder-[#607168]/60 focus:outline-none focus:ring-2 focus:ring-[#C29D59]/50 focus:border-[#C29D59] transition-all resize-none shadow-2xs"
              />
              <button
                onClick={() => handleConsult(inputQuery)}
                disabled={isLoading || !inputQuery.trim()}
                className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#253D32] text-white text-xs font-medium hover:bg-[#1C3027] disabled:opacity-40 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>Consultar</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#253D32]/10 text-[#253D32] flex items-center justify-center mx-auto animate-spin">
                <Sparkles className="w-6 h-6 text-[#C29D59]" />
              </div>
              <p className="text-sm font-medium text-[#253D32]">
                Sintonizando propriedades botânicas e rituais sagrados...
              </p>
            </div>
          )}

          {/* Result Card */}
          {result && !isLoading && (
            <div className="bg-white border border-[#C29D59]/30 rounded-2xl p-5 shadow-sm space-y-5 animate-scale">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#C29D59]/15 text-[#253D32] text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C29D59]" />
                  Diagnóstico do Sommelier
                </div>
                <p className="text-sm text-[#253D32] leading-relaxed">
                  {result.diagnosis}
                </p>
              </div>

              {/* Recommended Pack */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607168] mb-2.5">
                  Fragrâncias Recomendadas para o seu Kit (5 Pacotes):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendedFragrances.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FBF9F5] border border-[#253D32]/5"
                    >
                      <div
                        className="w-3 h-3 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: f.colorHex }}
                      />
                      <div>
                        <span className="text-xs font-bold text-[#253D32] block">
                          {f.name}
                        </span>
                        <span className="text-[11px] text-[#607168] block">
                          {f.benefits.slice(0, 2).join(" • ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Posology / Treatment */}
              <div className="p-3.5 rounded-xl bg-[#F4EFE6] border border-[#253D32]/10 text-xs text-[#253D32] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#253D32]">
                  <Clock className="w-3.5 h-3.5 text-[#C29D59]" />
                  Posologia Recomendada (Tratamento 30 Dias):
                </div>
                <p className="text-[#607168] leading-relaxed">
                  {result.prescription}
                </p>
              </div>

              {/* Affirmation */}
              {result.affirmation && (
                <p className="text-xs italic text-[#C29D59] text-center">
                  "{result.affirmation}"
                </p>
              )}

              {/* Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleApplyToBuilder}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#253D32] text-white font-semibold text-xs shadow-md hover:bg-[#1C3027] transition-all cursor-pointer"
                >
                  <Leaf className="w-4 h-4 text-[#C29D59]" />
                  Montar Esse Kit no Construtor
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="py-3 px-4 rounded-full bg-[#F4EFE6] text-[#253D32] text-xs font-semibold hover:bg-white transition-all cursor-pointer"
                >
                  Fazer Outra Pergunta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
