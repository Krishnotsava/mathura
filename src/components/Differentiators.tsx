"use client";

import React from "react";
import {
  Check,
  X,
  ShieldCheck,
  Sparkles,
  Flame,
  Leaf,
  Clock,
  Award,
  Ban,
  HeartHandshake,
} from "lucide-react";

export function Differentiators() {
  const pillars = [
    {
      icon: <Ban className="w-6 h-6 text-[#B86B53]" />,
      title: "Não Contém Pólvora",
      desc: "Sem fagulhas agressivas ou compostos explosivos. Queima suave e contínua.",
    },
    {
      icon: <Ban className="w-6 h-6 text-[#B86B53]" />,
      title: "Não Contém Carvão",
      desc: "Livre da fumaça preta e pesada que irrita a rinite e causa dor de cabeça.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#C29D59]" />,
      title: "100% Artesanal",
      desc: "Feito à mão com madeira de reflorestamento sustentável e resinas puras.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-[#588157]" />,
      title: "Essência das Plantas",
      desc: "Óleos e princípios botânicos autênticos extraídos diretamente da natureza.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#C29D59]" />,
      title: "Dura 60 Min Queimando",
      desc: "Mais de 1 hora inteira de difusão aromática contínua por cada vareta.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#253D32]" />,
      title: "+30 Anos de Tradição",
      desc: "Três décadas de maestria e pureza botânica reconhecidas em todo o Brasil.",
    },
  ];

  return (
    <section id="diferenciais" className="py-16 md:py-24 bg-[#FBF9F5] border-t border-[#253D32]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-[#253D32] border border-[#253D32]/10 mb-4 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#588157]" />
            Transparência & Tradição Botânica
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#253D32] tracking-tight mb-4">
            Por que a Mathura não é um incenso comum?
          </h2>
          <p className="text-base sm:text-lg text-[#607168] font-sans">
            A maioria dos incensos industriais utilizam restos de carvão mineral e pólvora para baratear a produção. Nós escolhemos o caminho da aromaterapia limpa há mais de 30 anos.
          </p>
        </div>

        {/* 6 Icons Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-[#253D32]/10 shadow-2xs flex flex-col items-center text-center space-y-2.5 hover:border-[#C29D59]/50 transition-all hover:shadow-xs group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-display font-bold text-[#253D32] leading-tight">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#607168] leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Incenso Convencional */}
          <div className="rounded-3xl p-7 bg-[#F4EFE6]/40 border border-[#253D32]/10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                ✕
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-[#253D32]">
                  Incensos Comuns de Mercado
                </h3>
                <span className="text-xs text-[#607168]">Industrial e Sintético</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#607168]">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Carvão mineral e pólvora:</strong> fumaça escura que causa dor de cabeça, rinite e irritação nas vias aéreas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Tóxico para pets:</strong> essências sintéticas de laboratório que agridem o olfato sensível de cães e gatos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Queima rápida (20 minutos):</strong> queima rápido demais e deixa cheiro residual de cinza queimada.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Validade curta:</strong> ressecam e perdem o aroma em poucas semanas dentro da gaveta.</span>
              </li>
            </ul>
          </div>

          {/* Mathura Incensos Naturais */}
          <div className="rounded-3xl p-7 bg-[#253D32] text-white space-y-5 shadow-xl relative overflow-hidden ring-2 ring-[#C29D59]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C29D59]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C29D59] text-[#253D32] flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Incensos Naturais Mathura
                  </h3>
                  <span className="text-xs text-[#C29D59] font-medium">100% Artesanal & Botânico (+30 Anos)</span>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-[#C29D59]/20 text-[#C29D59] border border-[#C29D59]/40">
                Padrão Ouro
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-white/90">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#C29D59] shrink-0 mt-0.5" />
                <span><strong>0% Carvão e 0% Pólvora:</strong> base pura de madeira de reflorestamento e óleos essenciais extraídos de plantas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#C29D59] shrink-0 mt-0.5" />
                <span><strong>Totalmente Pet-Friendly:</strong> aromatização sutil e segura que não intoxica nem incomoda animais de estimação.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#C29D59] shrink-0 mt-0.5" />
                <span><strong>Queima Prolongada de ~60 min:</strong> 1 hora de difusão lenta de princípios ativos da aromaterapia por vareta.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#C29D59] shrink-0 mt-0.5" />
                <span><strong>Validade Preservada por 2 Anos:</strong> o incenso pode ser estocado sem perda de intensidade ou aroma.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
