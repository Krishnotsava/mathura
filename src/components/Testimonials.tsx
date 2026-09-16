"use client";

import React from "react";
import { Star, CheckCircle2, Heart, Sparkles, MessageCircle } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  product: string;
  content: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mariana Alcantara",
    role: "Praticante de Yoga",
    location: "São Paulo, SP",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    product: "Kit Serenidade & Relaxamento",
    content: "Eu tenho rinite alérgica severa e passei anos sem poder usar incenso porque a fumaça de carvão me dava dor de cabeça imediata. O incenso da Mathura é simplesmente surreal: fumaça leve, aroma de planta de verdade e meu cachorro fica super tranquilo do lado!",
    date: "Há 3 dias",
  },
  {
    name: "Rodrigo Vasconcelos",
    role: "Arquiteto & Home Office",
    location: "Belo Horizonte, MG",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    product: "Pack 10 Caixinhas (Foco + Palo Santo)",
    content: "Comprei o kit de 10 caixinhas para trabalhar em casa. O alecrim e o café com cappuccino dão um ânimo surreal no período da tarde. Cada vareta realmente dura mais de 1 hora inteira queimando bem devagar. Já virei cliente fiel!",
    date: "Há 1 semana",
  },
  {
    name: "Camila Guimarães",
    role: "Terapeuta Holística",
    location: "Curitiba, PR",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    product: "Kit Purificação & Descarrego",
    content: "Uso no meu consultório entre os atendimentos. Os clientes sempre perguntam que cheiro maravilhoso é esse. O de 7 Ervas e o de Arruda limpam o ambiente sem deixar cheiro de queimado. O frete grátis acima de R$ 100 facilitou muito.",
    date: "Há 2 semanas",
  },
  {
    name: "Lucas Esteves",
    role: "Designer Gráfico",
    location: "Florianópolis, SC",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    product: "Pack 15 Caixinhas Personalizado",
    content: "A entrega foi super rápida, chegou em 3 dias com embalagem muito perfumada e impecável. Dá pra sentir de longe que não tem pólvora nem produtos químicos tóxicos. Nota 10 para o atendimento e para a qualidade!",
    date: "Há 4 dias",
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#253D32]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-[#253D32] border border-[#253D32]/10 mb-4 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-[#B86B53] fill-current" />
            Depoimentos Reais & Prova Social
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#253D32] tracking-tight mb-4">
            Quem Experimenta, Não Volta aos Incensos Comuns
          </h2>
          <p className="text-base sm:text-lg text-[#607168] font-sans">
            Mais de <strong>30 anos de tradição</strong> encantando lares brasileiros. Veja o que dizem nossos clientes apaixonados por bem-estar.
          </p>

          {/* Aggregate Rating Score */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-[#253D32]/10 shadow-xs">
            <div className="flex text-[#C29D59]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#253D32]">
              4.9 de 5.0 estrelas
            </span>
            <span className="text-xs text-[#607168]">
              (Mais de 3.200 avaliações verificadas)
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#253D32]/10 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Header with Photo & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#C29D59]/40 shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#253D32] flex items-center gap-1">
                      {t.name}
                      <span title="Compra Verificada" className="inline-flex">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#588157] shrink-0" />
                      </span>
                    </h4>
                    <span className="text-[11px] text-[#607168] block">
                      {t.location}
                    </span>
                  </div>
                </div>

                {/* Stars & Product */}
                <div className="space-y-1.5 mb-3.5">
                  <div className="flex text-[#C29D59]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="inline-block text-[10px] font-semibold text-[#588157] bg-[#588157]/10 px-2 py-0.5 rounded">
                    {t.product}
                  </span>
                </div>

                {/* Content */}
                <p className="text-xs text-[#253D32]/85 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Date */}
              <div className="pt-4 mt-4 border-t border-[#253D32]/5 flex items-center justify-between text-[11px] text-[#607168]">
                <span>Compra Verificada</span>
                <span>{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
