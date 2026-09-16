"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Clock, Heart, Flame, Leaf, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Hero() {
  const { setIsAiModalOpen } = useCart();

  return (
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Emotion, Hook & Story */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F4EFE6] text-[#253D32] border border-[#253D32]/10 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C29D59]"></span>
              Aromaterapia Botânica • Mais de 30 Anos de Tradição
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#253D32] tracking-tight leading-[1.14]">
              Transforme a energia da sua casa com incensos{" "}
              <span className="italic font-normal text-[#C29D59]">
                100% puros e seguros para seus animais.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#607168] leading-relaxed font-sans max-w-xl">
              Feitos à mão no Brasil com madeira de reflorestamento e extratos puros de plantas.{" "}
              <strong>Sem carvão mineral, sem pólvora e com 1 hora de queima contínua por vareta.</strong>
            </p>

            {/* Trust bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-[#253D32] font-semibold">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#588157] shrink-0" />
                <span>Zero dor de cabeça ou fumaça preta</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#588157] shrink-0" />
                <span>Totalmente inofensivo para pets</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#588157] shrink-0" />
                <span>10 varetas por pacote (~10 horas de queima)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#588157] shrink-0" />
                <span>Validade de 24 meses sem perder o cheiro</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#253D32] text-white font-semibold text-sm shadow-md hover:bg-[#1C3027] transition-all cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-[#C29D59] group-hover:rotate-12 transition-transform" />
                <span>Consultor IA: Encontrar meu Kit Ideal</span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#pack-builder"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-[#253D32] font-semibold text-sm border border-[#253D32]/15 shadow-xs hover:bg-[#F4EFE6] transition-all"
              >
                <span>Monte o Seu Pack Livre</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#C29D59]/20 text-[#253D32] font-bold">
                  Mín. 5
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Humanized Collage (Lifestyle + Product) */}
          <div className="lg:col-span-5 relative">
            {/* Main Lifestyle Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/wellness-hero.jpg"
                alt="Mulher brasileira meditando e relaxando com incenso natural Mathura"
                className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom tag on image */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C29D59] text-white mb-1">
                  Harmonia & Bem-Estar
                </span>
                <p className="text-xs sm:text-sm font-medium leading-snug">
                  "O único incenso que não irrita minha rinite e meu cachorro dorme tranquilo do meu lado."
                </p>
                <span className="text-[11px] text-white/75 block mt-0.5">
                  — Beatriz Mendonça, cliente Mathura
                </span>
              </div>
            </div>

            {/* Overlapping Pet-Friendly Visual Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 glass-card p-3 rounded-2xl border border-[#253D32]/15 shadow-xl flex items-center gap-3 max-w-xs animate-bounce-subtle">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                <img
                  src="/images/pet-relaxation.jpg"
                  alt="Pet dormindo seguro com incenso Mathura"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#588157] block">
                  100% Pet-Friendly
                </span>
                <span className="text-xs font-bold text-[#253D32] block leading-tight">
                  Sem Carvão ou Pólvora
                </span>
                <span className="text-[10px] text-[#607168]">
                  Seguro para cães e gatos
                </span>
              </div>
            </div>

            {/* Top Floating Badge */}
            <div className="absolute -top-4 -right-2 glass-card px-3.5 py-2 rounded-2xl border border-[#C29D59]/30 shadow-lg flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C29D59]" />
              <div className="text-left">
                <span className="text-[10px] text-[#607168] block leading-none">Queima Longa</span>
                <strong className="text-xs text-[#253D32] leading-tight block">~60 Min por Vareta</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
