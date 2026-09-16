export interface Fragrance {
  id: string;
  name: string;
  subtitle: string;
  family: "Amadeirado" | "Resinoso" | "Herbal & Fresco" | "Floral & Calmo" | "Especiado & Quente" | "Frutado & Doce";
  burnTime: string;
  benefits: string[];
  intentions: ("descarrego" | "foco" | "meditacao" | "prosperidade" | "relaxamento" | "afrodisiaco")[];
  description: string;
  notes: string;
  colorHex: string;
  imageUrl: string;
  popular?: boolean;
  salesCount: number;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface CuratedKit {
  id: string;
  title: string;
  tagline: string;
  sticksTotal: number;
  packCount: number;
  intention: "descarrego" | "foco" | "meditacao" | "prosperidade" | "relaxamento" | "afrodisiaco";
  isFeatured?: boolean;
  prescription: {
    frequency: string;
    schedule: string;
    targetEffect: string;
  };
  recommendedFragranceIds: string[];
  price: number;
  originalPrice: number;
}

// Retrocompatibilidade
export type TreatmentPack = CuratedKit;

export interface PackOptionPreset {
  size: number;
  label: string;
  sticks: number;
  price: number;
  unitPrice: number;
  badge?: string;
  isRecommended?: boolean;
  discountPercent?: number;
  freeShipping?: boolean;
}

// Precificação Dinâmica Mathura:
// Mínimo 5 caixinhas (R$ 79,90 = R$ 15,98/un)
// Redução progressiva nunca abaixo de R$ 13,00/un
// Valores terminando em ,90 (79,90, 94,90, 109,90, 124,90, 139,90...)
// Frete Grátis ativado para compras a partir de R$ 100,00!
export function calculateDynamicPackPrice(quantity: number) {
  if (quantity < 5) {
    return {
      total: quantity * 16.0,
      unitPrice: 16.0,
      originalTotal: quantity * 18.0,
      discountPercent: 0,
      freeShipping: false,
    };
  }

  let total = 79.90;

  if (quantity === 5) {
    total = 79.90; // R$ 15,98/un
  } else if (quantity < 10) {
    total = 79.90 + (quantity - 5) * 15.0;
  } else if (quantity === 10) {
    total = 149.90; // R$ 14,99/un (Recomendado)
  } else if (quantity < 15) {
    total = 149.90 + (quantity - 10) * 15.0;
  } else if (quantity === 15) {
    total = 219.90; // R$ 14,66/un
  } else if (quantity < 20) {
    total = 219.90 + (quantity - 15) * 12.0;
  } else if (quantity === 20) {
    total = 279.90; // R$ 13,99/un
  } else {
    let raw = 279.90 + (quantity - 20) * 13.0;
    total = Math.floor(raw) + 0.90;
    if (total / quantity < 13.00) {
      total = Math.ceil(quantity * 13.00) - 0.10;
      if (total / quantity < 13.00) total += 10.0;
    }
  }

  const unitPrice = total / quantity;
  const originalTotal = quantity * 18.0;
  const discountPercent = Math.round(((originalTotal - total) / originalTotal) * 100);
  const freeShipping = total >= 100.0;

  return {
    total,
    unitPrice,
    originalTotal,
    discountPercent,
    freeShipping,
  };
}

export const PACK_PRESETS: PackOptionPreset[] = [
  {
    size: 5,
    label: "Kit Essencial",
    sticks: 50,
    price: 79.90,
    unitPrice: 15.98,
    discountPercent: 11,
    freeShipping: false,
    badge: "Mínimo Pedido",
  },
  {
    size: 10,
    label: "Kit Equilíbrio",
    sticks: 100,
    price: 149.90,
    unitPrice: 14.99,
    discountPercent: 17,
    freeShipping: true,
    isRecommended: true,
    badge: "Mais Vendido • Frete Grátis",
  },
  {
    size: 15,
    label: "Kit Harmonia",
    sticks: 150,
    price: 219.90,
    unitPrice: 14.66,
    discountPercent: 19,
    freeShipping: true,
    badge: "Frete Grátis",
  },
  {
    size: 20,
    label: "Kit Plenitude",
    sticks: 200,
    price: 279.90,
    unitPrice: 13.99,
    discountPercent: 22,
    freeShipping: true,
    badge: "Super Economia • Frete Grátis",
  },
];

export const WHOLESALE_TIERS = [
  { units: 100, sticks: 1000, pricePerUnit: 11.50, total: 1150.00, discount: "36% OFF" },
  { units: 200, sticks: 2000, pricePerUnit: 9.90, total: 1980.00, discount: "45% OFF" },
  { units: 300, sticks: 3000, pricePerUnit: 8.90, total: 2670.00, discount: "50% OFF" },
];

// Catálogo Exclusivo e 100% fiel às 30 fotos reais da Mathura
export const FRAGRANCES: Fragrance[] = [
  {
    id: "7-ervas",
    name: "7 Ervas Sagradas",
    subtitle: "Composição Ancestral de Defumação",
    family: "Resinoso",
    burnTime: "~60 minutos",
    benefits: ["Auxilia na limpeza de energias densas", "Quebra miasmas pesados", "Escudo protetor para o lar"],
    intentions: ["descarrego"],
    description: "A mais potente sinergia de defumação brasileira. As 7 ervas atuam limpando miasmas e restaurando a frequência de paz de qualquer residência ou comércio.",
    notes: "Resinas da Amazônia, ervas secas e toque herbal balsâmico.",
    colorHex: "#2E5A44",
    imageUrl: "/produtos/7-ervas.png",
    popular: true,
    salesCount: 2850,
    rating: 5.0,
    reviewsCount: 242,
    isBestseller: true,
  },
  {
    id: "alecrim",
    name: "Alecrim Silvestre",
    subtitle: "Rosmarinus officinalis Puro",
    family: "Herbal & Fresco",
    burnTime: "~60 minutos",
    benefits: ["Auxilia na clareza mental e memória", "Ajuda no foco para estudos e trabalho", "Estimula a alegria matinal"],
    intentions: ["foco", "prosperidade"],
    description: "Conhecido como a erva da alegria e da juventude mental. Desperta a mente, dissipa a névoa mental e atua na concentração sem agitar os batimentos cardíacos.",
    notes: "Herbal canforado refrescante, folhas verdes e frescor revigorante.",
    colorHex: "#4C8C65",
    imageUrl: "/produtos/alecrim.png",
    popular: true,
    salesCount: 1920,
    rating: 4.9,
    reviewsCount: 164,
    isBestseller: true,
  },
  {
    id: "arruda",
    name: "Arruda Pura",
    subtitle: "Ruta graveolens & Madeiras de Reflorestamento",
    family: "Herbal & Fresco",
    burnTime: "~60 minutos",
    benefits: ["Purificação profunda do ar", "Neutraliza cansaço e peso no corpo", "Ajuda a restabelecer a paz"],
    intentions: ["descarrego"],
    description: "O clássico escudo vegetal contra energias estagnadas. Perfeito para acender após receber muitas visitas ou em dias de cansaço inexplicável.",
    notes: "Aroma herbal característico penetrante, notas verdes rústicas e resina pura.",
    colorHex: "#376E4B",
    imageUrl: "/produtos/arruda.png",
    popular: true,
    salesCount: 2430,
    rating: 4.9,
    reviewsCount: 210,
    isBestseller: true,
  },
  {
    id: "baunilha",
    name: "Baunilha Oriental",
    subtitle: "Vanilla planifolia em Favas",
    family: "Frutado & Doce",
    burnTime: "~60 minutos",
    benefits: ["Aconchego e nostalgia acolhedora", "Sensação de paz e acolhimento", "Reduz irritabilidade"],
    intentions: ["relaxamento", "afrodisiaco"],
    description: "Aroma doce e reconfortante que remete às melhores memórias felizes em família. Desperta serenidade, afeto e calma imediata.",
    notes: "Fava de baunilha madura, açúcar queimado e almíscar suave.",
    colorHex: "#E5C158",
    imageUrl: "/produtos/baunilha.png",
    salesCount: 1240,
    rating: 4.9,
    reviewsCount: 104,
  },
  {
    id: "benjoim",
    name: "Benjoim da Sumatra",
    subtitle: "Styrax benzoin Resina Purificante",
    family: "Resinoso",
    burnTime: "~60 minutos",
    benefits: ["Dissipa energias estagnadas", "Abre caminhos de prosperidade", "Aroma resinoso nobre"],
    intentions: ["prosperidade", "descarrego"],
    description: "Resina balsâmica milenar com aroma doce e ambarado. Muito utilizado para abençoar novos empreendimentos e lares.",
    notes: "Resina de benjoim pura, mel ambarado e toques de sândalo.",
    colorHex: "#7F4F24",
    imageUrl: "/produtos/benjoim.png",
    salesCount: 960,
    rating: 4.8,
    reviewsCount: 78,
  },
  {
    id: "balsamo",
    name: "Bálsamo Dourado",
    subtitle: "Resina Balsâmica de Alta Pureza",
    family: "Amadeirado",
    burnTime: "~60 minutos",
    benefits: ["Conforto emocional e acolhimento", "Regula o clima interno do lar", "Alívio de tensões musculares"],
    intentions: ["relaxamento", "meditacao"],
    description: "Aroma balsâmico acolhedor que envolve o corpo como um cobertor térmico aromático, trazendo sensação imediata de aconchego e restauração.",
    notes: "Madeiras nobres, seiva de árvore e especiarias suaves.",
    colorHex: "#705335",
    imageUrl: "/produtos/balsamo.png",
    salesCount: 1580,
    rating: 4.9,
    reviewsCount: 132,
    isBestseller: true,
  },
  {
    id: "cafe-capuccino",
    name: "Café & Capuccino",
    subtitle: "Grãos Tostados & Creme de Baunilha",
    family: "Especiado & Quente",
    burnTime: "~60 minutos",
    benefits: ["Ativação mental imediata", "Aconchego de cafeteria acolhedora", "Estimula conversas prazerosas"],
    intentions: ["foco", "prosperidade"],
    description: "Fragrância irresistível para manhãs de trabalho e reuniões criativas. Traz o calor da cafeína aromática sem agitação.",
    notes: "Café torrado nobre, chocolate amargo e espuma de leite cremosa.",
    colorHex: "#4A2810",
    imageUrl: "/produtos/cafe-capuccino.png",
    popular: true,
    salesCount: 790,
    rating: 4.9,
    reviewsCount: 74,
    isNewArrival: true,
  },
  {
    id: "camomila",
    name: "Camomila Romana",
    subtitle: "Matricaria chamomilla & Ervas Suaves",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Acalma crianças e pets agitados", "Auxilia contra insônia leve", "Sensação de afeto materno e carinho"],
    intentions: ["relaxamento"],
    description: "Doçura pura e conforto reconfortante. Desacelera a respiração após dias intensos de estresse ou trânsito.",
    notes: "Floral melífero suave, erva-doce e maçã fresca cortada.",
    colorHex: "#F2CC8F",
    imageUrl: "/produtos/camomila.png",
    salesCount: 1120,
    rating: 4.8,
    reviewsCount: 94,
  },
  {
    id: "canela",
    name: "Canela do Ceilão",
    subtitle: "Cinnamomum verum & Óleos Quentes",
    family: "Especiado & Quente",
    burnTime: "~60 minutos",
    benefits: ["Auxilia na atração de prosperidade e abundância", "Ajuda no aquecimento de ambientes frios", "Estimulante físico natural"],
    intentions: ["prosperidade", "foco"],
    description: "Especiaria nobre de alta vibração magnética. Muito utilizada em entradas de comércios e no início de cada mês para convidar fartura.",
    notes: "Especiado quente, doce envolvente e amadeirado picante.",
    colorHex: "#964B00",
    imageUrl: "/produtos/canela.png",
    popular: true,
    salesCount: 1740,
    rating: 4.9,
    reviewsCount: 145,
    isBestseller: true,
  },
  {
    id: "citronela",
    name: "Citronela Natural",
    subtitle: "Cymbopogon nardus Puro",
    family: "Herbal & Fresco",
    burnTime: "~60 minutos",
    benefits: ["Repelente botânico natural", "Purificação do ar", "Sensação de limpeza duradoura"],
    intentions: ["foco", "descarrego"],
    description: "Excelente para dias quentes e ambientes abertos. Além de manter mosquitos e insetos afastados naturalmente, deixa a casa com cheiro de ar puro.",
    notes: "Cítrico herbal penetrante, capim fresco e limão puro.",
    colorHex: "#5B8E7D",
    imageUrl: "/produtos/citronela.png",
    salesCount: 1350,
    rating: 4.8,
    reviewsCount: 112,
  },
  {
    id: "coco",
    name: "Coco Tropical",
    subtitle: "Cocos nucifera & Leite Botânico",
    family: "Frutado & Doce",
    burnTime: "~60 minutos",
    benefits: ["Leveza de espírito", "Boas vibrações no ar", "Ambiente descontraído"],
    intentions: ["relaxamento"],
    description: "Leveza praiana e tropical. Traz sensação de descanso mental, tranquilidade e leveza nos dias mais corridos da semana.",
    notes: "Polpa de coco fresco, água de coco doce e toque suave de baunilha.",
    colorHex: "#8D99AE",
    imageUrl: "/produtos/coco.png",
    salesCount: 740,
    rating: 4.7,
    reviewsCount: 63,
  },
  {
    id: "cravo-canela",
    name: "Cravo & Canela",
    subtitle: "Duo Especiado Estimulante",
    family: "Especiado & Quente",
    burnTime: "~60 minutos",
    benefits: ["Aquecimento de relações interpessoais", "Atrai abundância material", "Aroma irresistível de aconchego"],
    intentions: ["prosperidade", "afrodisiaco"],
    description: "A combinação clássica da perfumaria afetiva brasileira. Transforma salas de estar em ambientes vibrantes e calorosos.",
    notes: "Cravo picante pronunciado, canela doce e madeiras tostadas.",
    colorHex: "#800E13",
    imageUrl: "/produtos/cravo-canela.png",
    salesCount: 1420,
    rating: 4.9,
    reviewsCount: 118,
    isBestseller: true,
  },
  {
    id: "cravo",
    name: "Cravo da Índia",
    subtitle: "Syzygium aromaticum Nobre",
    family: "Especiado & Quente",
    burnTime: "~60 minutos",
    benefits: ["Combate energias estagnadas", "Força de vontade e coragem", "Desinfeta sutilmente o ar"],
    intentions: ["descarrego", "prosperidade"],
    description: "Especiaria poderosa usada ancestralmente para limpeza pessoal. Impulsiona a determinação e dissipa o cansaço.",
    notes: "Cravo picante e quente, madeira tostada e resina.",
    colorHex: "#6B4226",
    imageUrl: "/produtos/cravo.png",
    salesCount: 880,
    rating: 4.8,
    reviewsCount: 75,
  },
  {
    id: "dama-da-noite",
    name: "Dama da Noite",
    subtitle: "Cestrum nocturnum Floral",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Fascínio e magnetismo", "Romance e mistério", "Ambientes noturnos acolhedores"],
    intentions: ["afrodisiaco"],
    description: "Flores que só abrem e perfumam ao luar. Perfume floral denso, elegante e sofisticado que transforma o quarto em um refúgio apaixonante.",
    notes: "Flores noturnas intensas, mel e toques ambarados.",
    colorHex: "#4A4E69",
    imageUrl: "/produtos/dama-da-noite.png",
    salesCount: 1190,
    rating: 4.9,
    reviewsCount: 98,
  },
  {
    id: "damasco",
    name: "Damasco Dourado",
    subtitle: "Prunus armeniaca Suave",
    family: "Frutado & Doce",
    burnTime: "~60 minutos",
    benefits: ["Otimismo e alegria de viver", "Harmonização de emoções sutis", "Frescor adocicado acolhedor"],
    intentions: ["prosperidade", "relaxamento"],
    description: "Frutado aveludado que lembra a brisa das tardes ensolaradas de primavera. Enche o ambiente de bom humor e energia calorosa.",
    notes: "Damasco maduro, polpa doce e flores brancas sutis.",
    colorHex: "#F4A261",
    imageUrl: "/produtos/damasco.png",
    salesCount: 540,
    rating: 4.8,
    reviewsCount: 42,
    isNewArrival: true,
  },
  {
    id: "erva-doce",
    name: "Erva Doce Silvestre",
    subtitle: "Pimpinella anisum Doce",
    family: "Herbal & Fresco",
    burnTime: "~60 minutos",
    benefits: ["Afeto e moderação", "Tranquilidade digestiva emocional", "Acolhimento familiar"],
    intentions: ["relaxamento"],
    description: "Suave, adocicado e profundamente apaziguador. Dissipa discussões acaloradas e traz serenidade imediata à sala de estar.",
    notes: "Anis fresco, folhas de funcho doce e toque herbal leitoso.",
    colorHex: "#A3B18A",
    imageUrl: "/produtos/erva-doce.png",
    salesCount: 960,
    rating: 4.8,
    reviewsCount: 81,
  },
  {
    id: "flor-de-laranjeira",
    name: "Flor de Laranjeira",
    subtitle: "Neroli Botânico Puro",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Sensação de plenitude e alegria pura", "Auxilia contra angústia e palpitações", "Aroma nobre e elegante"],
    intentions: ["relaxamento", "prosperidade"],
    description: "Destilação delicada das flores cítricas da laranjeira. Perfume fino, acolhedor e profundamente tranquilizante.",
    notes: "Floral branco cítrico, mel suave e frescor de orvalho matinal.",
    colorHex: "#E9B872",
    imageUrl: "/produtos/flor-de-laranjeira.png",
    popular: true,
    salesCount: 680,
    rating: 4.9,
    reviewsCount: 58,
    isNewArrival: true,
  },
  {
    id: "girassol",
    name: "Girassol Dourado",
    subtitle: "Helianthus annuus & Seivas Solares",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Irradia magnetismo e luz pessoal", "Combate desânimo e apatia", "Abre caminhos para o sucesso"],
    intentions: ["prosperidade", "foco"],
    description: "A força e a imponência do sol condensadas em um aroma floral solar expansivo. Ilumina os dias chuvosos.",
    notes: "Pólen floral suave, calor de mel e notas de sementes tostadas.",
    colorHex: "#E09F3E",
    imageUrl: "/produtos/girassol.png",
    salesCount: 490,
    rating: 4.8,
    reviewsCount: 39,
    isNewArrival: true,
  },
  {
    id: "jasmim",
    name: "Jasmim da Noite",
    subtitle: "Jasminum sambac Floral",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Autoestima e beleza interior", "Abertura do coração para o amor", "Reduz a rigidez mental"],
    intentions: ["afrodisiaco", "meditacao"],
    description: "A flor da sedução e da pureza interior no oriente. Eleva a frequência do ambiente para sentimentos nobres e calorosos.",
    notes: "Pétalas brancas ricas, flor de laranjeira e néctar suave.",
    colorHex: "#B5838D",
    imageUrl: "/produtos/jasmim.png",
    salesCount: 1280,
    rating: 4.9,
    reviewsCount: 109,
  },
  {
    id: "lavanda",
    name: "Lavanda Francesa",
    subtitle: "Lavandula angustifolia & Flores Integrais",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Auxilia no sono profundo e reparador", "Ajuda no alívio da ansiedade diária", "Totalmente seguro para pets"],
    intentions: ["relaxamento", "meditacao"],
    description: "A essência floral mais amada do mundo para descompressão nervosa. Ideal para acender 40 minutos antes de deitar no quarto.",
    notes: "Floral fresco, notas herbáceas doces e fundo aveludado.",
    colorHex: "#7E6B8F",
    imageUrl: "/produtos/lavanda.png",
    popular: true,
    salesCount: 3120,
    rating: 5.0,
    reviewsCount: 312,
    isBestseller: true,
  },
  {
    id: "maca-verde",
    name: "Maçã Verde Refrescante",
    subtitle: "Pyrus malus & Notas Frutadas Cítricas",
    family: "Frutado & Doce",
    burnTime: "~60 minutos",
    benefits: ["Vigor e entusiasmo imediato", "Ambiente jovial e leve", "Sensação refrescante de limpeza"],
    intentions: ["foco", "relaxamento"],
    description: "Fragrância frutada crocante e efervescente. Desperta o bom humor e dissipa o ar pesado com notas verdes vibrantes.",
    notes: "Casca de maçã verde ácida, polpa doce e toques de menta suave.",
    colorHex: "#70E000",
    imageUrl: "/produtos/maca-verde.png",
    salesCount: 820,
    rating: 4.9,
    reviewsCount: 67,
    isNewArrival: true,
  },
  {
    id: "morango-champagne",
    name: "Morango com Champagne",
    subtitle: "Fragaria vesca & Efervescência Nobre",
    family: "Frutado & Doce",
    burnTime: "~60 minutos",
    benefits: ["Clima comemorativo e festivo", "Sedução romântica sofisticada", "Doçura marcante e envolvente"],
    intentions: ["afrodisiaco", "prosperidade"],
    description: "Uma celebração aos sentidos. Combina o morango silvestre maduro com a leveza borbulhante de uvas nobres.",
    notes: "Morangos vermelhos doces, acordes borbulhantes e açúcar cristal.",
    colorHex: "#D90429",
    imageUrl: "/produtos/morango-champagne.png",
    salesCount: 940,
    rating: 4.9,
    reviewsCount: 84,
    isNewArrival: true,
  },
  {
    id: "opium",
    name: "Ópium Oriental",
    subtitle: "Papaver somniferum Místico",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Profundidade meditativa", "Fascínio e introspecção serena", "Ambientes de recolhimento"],
    intentions: ["meditacao", "afrodisiaco"],
    description: "Aroma lendário dos palácios asiáticos. Intenso, aveludado e envolvente, ideal para noites frias de leitura e reflexão.",
    notes: "Pétalas orientais exóticas, resinas doces e madeiras nobres.",
    colorHex: "#3D0066",
    imageUrl: "/produtos/opium.png",
    salesCount: 1050,
    rating: 4.8,
    reviewsCount: 91,
  },
  {
    id: "palo-santo",
    name: "Palo Santo dos Andes",
    subtitle: "Bursera graveolens de Coleta Sustentável",
    family: "Amadeirado",
    burnTime: "~60 minutos",
    benefits: ["Auxilia na purificação do ambiente", "Dissipa o estresse mental acumulado", "Atua atraindo sorte e boas vibrações"],
    intentions: ["meditacao", "descarrego", "prosperidade"],
    description: "Madeira sagrada colhida apenas de árvores caídas naturalmente. Aroma amadeirado doce, místico e reconfortante.",
    notes: "Madeira nobre defumada, toque cítrico de menta e anis suave.",
    colorHex: "#8B5A2B",
    imageUrl: "/produtos/palo-santo.png",
    popular: true,
    salesCount: 3450,
    rating: 5.0,
    reviewsCount: 388,
    isBestseller: true,
  },
  {
    id: "pitanga",
    name: "Pitanga Negra",
    subtitle: "Eugenia uniflora Nativa da Mata Atlântica",
    family: "Frutado & Doce",
    burnTime: "~60 minutos",
    benefits: ["Vitalidade e entusiasmo diário", "Criatividade e paixão pela vida", "Ambientes descontraídos e alegres"],
    intentions: ["prosperidade", "afrodisiaco"],
    description: "Fruta genuinamente brasileira que simboliza abundância e renovação energética. Perfuma com intensidade frutada marcante.",
    notes: "Frutas vermelhas silvestres, folhas verdes maceradas e doçura vibrante.",
    colorHex: "#C1121F",
    imageUrl: "/produtos/pitanga.png",
    popular: true,
    salesCount: 620,
    rating: 4.9,
    reviewsCount: 51,
    isNewArrival: true,
  },
  {
    id: "rosa-branca",
    name: "Rosa Branca Serena",
    subtitle: "Rosa alba Pétalas Puras",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Paz angelical e serenidade", "Dissipa mágoas e ressentimentos", "Ambientes de pureza e luz"],
    intentions: ["meditacao", "relaxamento"],
    description: "As pétalas aveludadas de rosas brancas orvalhadas. Uma fragrância imaculada que acalma o coração e abençoa o lar.",
    notes: "Rosas frescas, orvalho e notas suaves de talco vegetal.",
    colorHex: "#E8D5C4",
    imageUrl: "/produtos/rosa-branca.png",
    salesCount: 1310,
    rating: 4.9,
    reviewsCount: 115,
  },
  {
    id: "rosa-musgosa",
    name: "Rosa Musgosa Rara",
    subtitle: "Rosa centifolia & Notas de Musgo Silvestre",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Sofisticação clássica e requinte", "Harmonização de emoções profundas", "Aroma verde aveludado"],
    intentions: ["relaxamento", "meditacao"],
    description: "Uma rosa com facetas terrosas e campestres. Conecta o frescor das florestas úmidas com a nobreza das pétalas de rosas antigas.",
    notes: "Rosas rústicas, musgo de carvalho e seiva verde.",
    colorHex: "#6B705C",
    imageUrl: "/produtos/rosa-musgosa.png",
    salesCount: 780,
    rating: 4.8,
    reviewsCount: 64,
  },
  {
    id: "rosa-vermelha",
    name: "Rosa Vermelha Paixão",
    subtitle: "Rosa damascena Envolvente",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Amor-próprio e magnetismo afetivo", "Clima romântico e sedutor", "Sensibilidade artística"],
    intentions: ["afrodisiaco"],
    description: "A rainha das flores em sua máxima intensidade aromática. Estimula a paixão, a entrega e a celebração do amor a dois.",
    notes: "Rosas vermelhas maduras, toques aveludados e mel floral.",
    colorHex: "#9B2226",
    imageUrl: "/produtos/rosa-vermelha.png",
    salesCount: 1260,
    rating: 4.9,
    reviewsCount: 108,
  },
  {
    id: "sandalo",
    name: "Sândalo Real",
    subtitle: "Santalum album & Madeira Nobre",
    family: "Amadeirado",
    burnTime: "~60 minutos",
    benefits: ["Harmonização profunda do lar", "Reduz tensões mentais crônicas", "Aroma elegante para receber visitas"],
    intentions: ["meditacao", "prosperidade"],
    description: "A madeira nobre dos templos orientais. Aroma aveludado que permanece nas fibras de tecidos e no ar por horas a fio.",
    notes: "Madeira doce cremosa, âmbar leve e toques terrosos sutis.",
    colorHex: "#A47551",
    imageUrl: "/produtos/sandalo.png",
    popular: true,
    salesCount: 1650,
    rating: 4.9,
    reviewsCount: 139,
    isBestseller: true,
  },
  {
    id: "ylang-ylang",
    name: "Ylang Ylang Floral Exótico",
    subtitle: "Cananga odorata das Ilhas Tropicais",
    family: "Floral & Calmo",
    burnTime: "~60 minutos",
    benefits: ["Afrodisíaco floral intenso", "Desperta a sensualidade e o bom humor", "Alivia o estresse e a rigidez"],
    intentions: ["afrodisiaco", "relaxamento"],
    description: "A lendária 'flor das flores' do sudeste asiático. Perfume doce, exótico e cremoso que convida ao relaxamento prazeroso.",
    notes: "Floral tropical intenso, jasmim doce e toques de néctar.",
    colorHex: "#D4A373",
    imageUrl: "/produtos/ylang-ylang.png",
    salesCount: 890,
    rating: 4.8,
    reviewsCount: 73,
  },
];

// Coleções de Kits Prontos por Objetivo (100% com IDs reais existentes)
export const CURATED_KITS: CuratedKit[] = [
  {
    id: "kit-descarrego",
    title: "Kit Purificação & Descarrego",
    tagline: "Ideal para ambientes carregados",
    sticksTotal: 50,
    packCount: 5,
    intention: "descarrego",
    prescription: {
      frequency: "1 a 2 varetas nos dias mais densos (segundas e sextas-feiras)",
      schedule: "Acender próximo à porta de entrada e cantos da casa para circulação",
      targetEffect: "Dissipa miasmas energéticos, neutraliza o peso do ambiente e renova o ar",
    },
    recommendedFragranceIds: [
      "7-ervas",
      "arruda",
      "palo-santo",
      "alecrim",
      "sandalo",
    ],
    price: 79.90,
    originalPrice: 100.00,
  },
  {
    id: "kit-foco",
    title: "Kit Foco & Concentração",
    tagline: "Ideal para estudos e concentração",
    sticksTotal: 50,
    packCount: 5,
    intention: "foco",
    isFeatured: true, // Destaque central
    prescription: {
      frequency: "1 vareta pela manhã ao iniciar o trabalho e 1 após o almoço",
      schedule: "Mantenha em sua mesa ou espaço de trabalho para ativar a mente",
      targetEffect: "Aumenta o foco sustentado sem ansiedade e auxilia na produtividade",
    },
    recommendedFragranceIds: [
      "canela",
      "cravo-canela",
      "alecrim",
      "palo-santo",
      "cafe-capuccino",
    ],
    price: 79.90,
    originalPrice: 100.00,
  },
  {
    id: "kit-equilibrio",
    title: "Kit Harmonia & Equilíbrio",
    tagline: "Ideal para equilibrar o ambiente",
    sticksTotal: 50,
    packCount: 5,
    intention: "prosperidade",
    prescription: {
      frequency: "1 vareta durante a tarde ou ao reunir a família na sala",
      schedule: "Áreas comuns, sala de estar e locais de convivência",
      targetEffect: "Atua harmonizando as energias familiares e trazendo paz ao lar",
    },
    recommendedFragranceIds: [
      "sandalo",
      "pitanga",
      "flor-de-laranjeira",
      "girassol",
      "canela",
    ],
    price: 79.90,
    originalPrice: 100.00,
  },
  {
    id: "kit-serenidade",
    title: "Kit Serenidade & Relaxamento",
    tagline: "Ideal para serenidade",
    sticksTotal: 50,
    packCount: 5,
    intention: "relaxamento",
    prescription: {
      frequency: "1 vareta 40 minutos antes de dormir ou durante banho de relaxamento",
      schedule: "Ambientes de descanso, quarto de dormir ou sala de meditação",
      targetEffect: "Auxilia no relaxamento profundo e prepara o corpo para o descanso sem agredir animais",
    },
    recommendedFragranceIds: [
      "lavanda",
      "camomila",
      "flor-de-laranjeira",
      "rosa-branca",
      "sandalo",
    ],
    price: 79.90,
    originalPrice: 100.00,
  },
];

export const TREATMENT_PACKS = CURATED_KITS;
