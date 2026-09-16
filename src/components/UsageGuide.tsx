"use client";

import React from "react";
import { Flame, Wind, Home, ShieldAlert, Sparkles, AlertTriangle, Calendar, SunMedium } from "lucide-react";

export function UsageGuide() {
  return (
    <section id="modo-de-usar" className="py-16 md:py-20 bg-white border-b border-[#253D32]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F4EFE6] text-[#253D32] border border-[#253D32]/10 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C29D59]" />
            Experiência Aromática Perfeita
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#253D32] tracking-tight mb-3">
            Modo de Usar seu Incenso Mathura
          </h2>
          <p className="text-base text-[#607168] font-sans max-w-xl mx-auto">
            Por ser 100% natural, sem pólvora e sem carvão mineral, siga estes passos simples para uma queima limpa e duradoura.
          </p>
        </div>

        {/* 3 Visual Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {/* Step 1 */}
          <div className="rounded-3xl p-6 bg-[#FBF9F5] border border-[#253D32]/10 flex flex-col items-center text-center space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#253D32] text-white flex items-center justify-center shadow-sm">
              <Flame className="w-7 h-7 text-[#C29D59]" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C29D59]">
                Passo 1
              </span>
              <h3 className="text-base font-display font-bold text-[#253D32]">
                Acendimento Inicial
              </h3>
              <p className="text-xs text-[#607168] leading-relaxed">
                Acender a ponta da vareta com fósforo ou isqueiro até formar uma brasa viva e incandescente.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-3xl p-6 bg-[#FBF9F5] border border-[#253D32]/10 flex flex-col items-center text-center space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#253D32] text-white flex items-center justify-center shadow-sm">
              <Wind className="w-7 h-7 text-[#588157]" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#588157]">
                Passo 2
              </span>
              <h3 className="text-base font-display font-bold text-[#253D32]">
                Suavizar a Chama
              </h3>
              <p className="text-xs text-[#607168] leading-relaxed">
                Apagar a chama suavemente assoprando ou movimentando a vareta, mantendo apenas a brasa ativa.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-3xl p-6 bg-[#FBF9F5] border border-[#253D32]/10 flex flex-col items-center text-center space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#253D32] text-white flex items-center justify-center shadow-sm">
              <Home className="w-7 h-7 text-[#C29D59]" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C29D59]">
                Passo 3
              </span>
              <h3 className="text-base font-display font-bold text-[#253D32]">
                Fixação no Incensário
              </h3>
              <p className="text-xs text-[#607168] leading-relaxed">
                Colocar em um incensário seguro, para que sejam liberadas as substâncias aromáticas botânicas por todo o espaço.
              </p>
            </div>
          </div>
        </div>

        {/* Official Product Notice */}
        <div className="max-w-2xl mx-auto text-center p-3 rounded-2xl bg-[#F4EFE6]/60 border border-[#253D32]/10 text-xs font-semibold text-[#253D32] mb-10">
          🌿 Produto específico para aromatização de ambiente.
        </div>

        {/* Discrete & Elegant Precautions Box */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-[#FBF9F5] border border-[#253D32]/10 p-5 text-xs text-[#607168] space-y-3">
          <div className="flex items-center gap-2 text-[#253D32] font-bold">
            <ShieldAlert className="w-4 h-4 text-[#B86B53]" />
            <span>Precauções & Cuidados com o Produto:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-[#253D32]/5 text-[11px]">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-[#B86B53] shrink-0 mt-0.5" />
              <span>Manter fora do alcance de crianças e animais domésticos durante a queima.</span>
            </div>
            <div className="flex items-start gap-2">
              <SunMedium className="w-3.5 h-3.5 text-[#C29D59] shrink-0 mt-0.5" />
              <span>Proteger do calor direto do sol e da umidade para preservar os óleos essenciais.</span>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#588157] shrink-0 mt-0.5" />
              <span>Validade: 2 anos a partir da data de fabricação sem perda de aroma.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
