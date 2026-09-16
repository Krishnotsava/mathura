"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { WHOLESALE_TIERS } from "@/data/fragrances";
import { X, Building2, Check, ArrowRight, ShieldCheck } from "lucide-react";

export function WholesaleModal() {
  const { isWholesaleOpen, setIsWholesaleOpen } = useWholesale();

  const [selectedTier, setSelectedTier] = useState<number>(100);
  const [storeName, setStoreName] = useState("");
  const [cityState, setCityState] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  if (!isWholesaleOpen) return null;

  const currentTier = WHOLESALE_TIERS.find((t) => t.units === selectedTier) || WHOLESALE_TIERS[0];

  const handleSendWholesaleOrder = () => {
    const message = `Olá equipe Mathura! Gostaria de fazer um pedido de ATACADO:\n\n• Loja: ${storeName || "Pessoa Física / Jurídica"}\n• Cidade/UF: ${cityState || "Não informado"}\n• WhatsApp: ${whatsapp}\n• Volume escolhido: ${currentTier.units} pacotes (${currentTier.discount})\n• Valor estimado: R$ ${currentTier.total.toFixed(2)}`;
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#253D32]/15 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#253D32]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#253D32] text-white flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5 text-[#C29D59]" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-[#253D32]">
                Área de Atacado & Lojistas
              </h3>
              <p className="text-xs text-[#607168]">
                Condições comerciais exclusivas para revenda em lojas esotéricas, empórios e spas.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWholesaleOpen(false)}
            className="p-2 rounded-full hover:bg-[#F4EFE6] text-[#607168] hover:text-[#253D32] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* Tiers Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#607168] mb-3">
              1. Selecione o lote de atacado:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {WHOLESALE_TIERS.map((tier) => {
                const isSelected = selectedTier === tier.units;
                return (
                  <button
                    key={tier.units}
                    onClick={() => setSelectedTier(tier.units)}
                    className={`p-4 rounded-2xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#253D32] text-white border-[#253D32] shadow-md scale-102 ring-2 ring-[#C29D59]"
                        : "bg-white text-[#253D32] border-[#253D32]/15 hover:bg-[#F4EFE6]"
                    }`}
                  >
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C29D59] text-white mb-2">
                      {tier.discount}
                    </span>
                    <span className="block text-2xl font-display font-bold">
                      {tier.units} Unidades
                    </span>
                    <span className={`block text-xs mt-0.5 ${isSelected ? "text-white/80" : "text-[#607168]"}`}>
                      {tier.sticks} varetas (~{tier.sticks}h de queima)
                    </span>
                    <div className="mt-3 pt-2 border-t border-current/10">
                      <span className="block text-base font-bold">
                        R$ {tier.pricePerUnit.toFixed(2).replace(".", ",")} / un
                      </span>
                      <span className={`block text-[11px] ${isSelected ? "text-white/70" : "text-[#607168]"}`}>
                        Total: R$ {tier.total.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#253D32]">
              2. Dados do seu estabelecimento / contato:
            </h4>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Nome da Loja ou Razão Social"
              className="w-full bg-[#FBF9F5] rounded-xl border border-[#253D32]/15 px-3.5 py-2.5 text-xs text-[#253D32] focus:outline-none focus:border-[#C29D59]"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={cityState}
                onChange={(e) => setCityState(e.target.value)}
                placeholder="Cidade e Estado (UF)"
                className="bg-[#FBF9F5] rounded-xl border border-[#253D32]/15 px-3.5 py-2.5 text-xs text-[#253D32] focus:outline-none focus:border-[#C29D59]"
              />
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp com DDD"
                className="bg-[#FBF9F5] rounded-xl border border-[#253D32]/15 px-3.5 py-2.5 text-xs text-[#253D32] focus:outline-none focus:border-[#C29D59]"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3 text-xs text-[#607168]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#588157] shrink-0" />
              <span>Emissão de Nota Fiscal (PJ ou PF)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#588157] shrink-0" />
              <span>Validade de 24 meses (estocagem fácil)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#588157] shrink-0" />
              <span>Material gráfico e expositor incluso</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#588157] shrink-0" />
              <span>Envio com seguro para todo o Brasil</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#253D32]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#607168] block">Total do lote selecionado:</span>
            <span className="text-2xl font-display font-bold text-[#253D32]">
              R$ {currentTier.total.toFixed(2).replace(".", ",")}
            </span>
          </div>

          <button
            onClick={handleSendWholesaleOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#253D32] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#1C3027] transition-all cursor-pointer"
          >
            <span>Falar com Consultor de Atacado</span>
            <ArrowRight className="w-4 h-4 text-[#C29D59]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function useWholesale() {
  const { isWholesaleOpen, setIsWholesaleOpen } = useCart();
  return { isWholesaleOpen, setIsWholesaleOpen };
}
