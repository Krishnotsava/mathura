# Project Blueprint: Mathura — Incensos Naturais & Aromaterapia

> **Data de Definição:** 15 de Setembro de 2026  
> **Status:** Aprovado & Pronto para Implementação  
> **Framework Base:** [Web Project Brainstorming](file:///.agents/skills/brainstorm/SKILL.md)

---

## 1. Conceito Central & Proposta de Valor

* **Marca:** Mathura
* **Produto:** Incensos artesanais 100% naturais de alto valor agregado.
* **Diferenciais Competitivos:**
  * Sem pólvora e sem carvão mineral.
  * Base de madeira de reflorestamento e essências puras extraídas de plantas.
  * Seguro e sem contraindicação para animais de estimação (*Pet-Friendly*).
  * Longa queima: aproximadamente 1 hora por vareta (10 varetas por pacote).
  * Longa durabilidade: 24 meses sem perda de aroma (ideal para estocagem).
* **Posicionamento:** Rituais de bem-estar, purificação, foco, relaxamento e equilíbrio energético através da aromaterapia consciente.

---

## 2. Arquitetura de Informação & UX (Single Page Dinâmica)

### Estrutura da Página Principal
1. **Header Fixo:**
   * Logo Mathura.
   * Navegação suave por âncoras (Rituais, Monte seu Kit, Sobre, Guia IA).
   * Link dedicado para **Área de Atacado / Lojistas**.
   * Ícone do Carrinho Flutuante com contador em tempo real.
2. **Hero Imersivo:**
   * Apresentação da marca, estética Eco-Clean e proposição de valor.
   * CTA duplo: *"Encontrar meu Ritual com IA"* e *"Montar meu Kit"*.
3. **Sommelier de Aromas / Guia de Energização (IA):**
   * Interface conversacional rápida alimentada pela Gemini API.
   * Diagnóstico: *"O que você deseja harmonizar hoje?"* -> Sugestão imediata do kit com botão de adição com 1 clique.
4. **Sistemas de Tratamento / Rituais com Posologia:**
   * Kits fechados pré-montados para 30 dias de tratamento (ex.: 5 fragrâncias complementares, cronograma de queima semanal/diária).
5. **Construtor de Packs Livre (*Pack Builder*):**
   * Escolha do tamanho base: 5, 10, 15 ou 20 pacotinhos (mínimo de 5).
   * Filtro duplo: **Por Benefício/Intenção** ou **Por Fragrância**.
   * Contador visual flutuante (ex.: *"3 de 5 selecionados — Faltam 2"*).
6. **Checkout Transparente:**
   * Modal / Gaveta fluida sem redirecionamento para fora da loja.
   * Pagamento via Pix com aprovação imediata e Cartão de Crédito.
7. **Pós-Venda & Confirmação:**
   * E-mail transacional automático.
   * Botão de acompanhamento direto no WhatsApp com mensagem pré-preenchida.

---

## 3. Identidade Visual & Design System

* **Estética:** *Eco-Clean Luxury* (minimalista, botânica, acolhedora e sustentável).
* **Paleta de Cores:**
  * **Fundo Primário:** Areia / Linho Natural (`#F9F8F5`).
  * **Superfícies & Cards:** Branco Translúcido / Vidro Suave (`rgba(255, 255, 255, 0.85)` com `backdrop-filter: blur(10px)`).
  * **Cor de Destaque / Marca:** Verde Botânico / Eucalipto (`#2D4A3E`).
  * **Acentos:** Terracota suave e toques amadeirados.
  * **Texto:** Ardósia profundo (`#1C2321`) para contraste WCAG AA/AAA.
* **Tipografia:**
  * **Títulos & Destaques:** *Outfit* (Google Font — geométrica, limpa e moderna).
  * **Textos de Apoio & Botões:** *Plus Jakarta Sans* / *Inter* (ultra-legível em qualquer tamanho de tela).
* **Efeitos & Movimento (`antigravity` + `3d`):**
  * Canvas de fundo com simulação sutil e orgânica de fumaça aromática (acelerada por GPU, sem peso de CPU).
  * Suporte estrito a `prefers-reduced-motion` (desativa fumaça caso o usuário configure acessibilidade).
  * Micro-interações táteis e elevações suaves de sombra nos cards.

---

## 4. Arquitetura Técnica

* **Framework:** Next.js (React 19 / App Router) — SPA híbrida com pré-renderização rápida no servidor.
* **Estilização:** Tailwind CSS + CSS Modules / Canvas para simulação de partículas.
* **Inteligência Artificial:** Google Gemini API com o catálogo de ervas, correspondência semântica de sintomas e posologia de queima.
* **Gateway de Pagamento:** Mercado Pago (Checkout Transparente com Pix instantâneo + Cartão).
* **Comunicação & Mensageria:**
  * E-mails transacionais (Resend / SMTP) com design responsivo.
  * Integração de link inteligente de WhatsApp (*Click-to-Chat*) para pós-venda e recompra.
* **Painel Administrativo:**
  * Rota protegida com autenticação para gestão de:
    * Fragrâncias, estoque e benefícios associados.
    * Pedidos recebidos, status (Pendente, Pago, Enviado, Entregue).
    * Base de clientes com histórico de compras.

---

## 5. SEO, GEO & Performance

* **SEO Técnico:**
  * Metadados OpenGraph configurados para cards perfeitos no WhatsApp e Instagram.
  * Marcação Schema.org estruturada (`ProductGroup` com variantes das fragrâncias, `Offer`, `BreadcrumbList`).
* **GEO (Generative Engine Optimization):**
  * Conteúdo estruturado para que buscadores baseados em IA (ChatGPT Search, Perplexity, Google AI Overviews) encontrem e citem a Mathura como referência em incensos naturais pet-friendly e de longa queima.
* **Performance:** Imagens WebP, Lazy-loading, carregamento prioritário do Hero (LCP < 1.5s).

---

## 6. Roadmap do Projeto: MVP vs. Fases Futuras

### 🚀 Fase 1: MVP (Lançamento Rápido & Conversão)
- [x] Concepção e Blueprint completo do projeto.
- [ ] Single Page Dinâmica com visual Eco-Clean e fumaça aromática suave.
- [ ] Construtor de Packs (5, 10, 15, 20 pacotes) com filtro por benefício e aroma.
- [ ] Rituais sugeridos de 30 dias com cronograma de uso.
- [ ] Consultor IA Sommelier integrado (Gemini API).
- [ ] Checkout Transparente Mercado Pago (Pix + Cartão).
- [ ] E-mail de confirmação de compra automático.
- [ ] Painel Administrativo de pedidos e produtos.
- [ ] SEO & Schema.org aplicados.

### 🌟 Fase 2: Escala & Expansão
- [ ] Área exclusiva de Atacado com cadastro de CNPJ/Lojista (100, 200, 300 unidades com precificação escalonada).
- [ ] Automação de WhatsApp via API oficial para aviso de status e régua de recompra automática após 25 dias da entrega.
- [ ] Clube do Ritual Mathura (Assinatura mensal recorrente com desconto).
- [ ] Painel de métricas e gráficos de faturamento por fragrância.
