"use client";

import React, { useState } from "react";
import { FRAGRANCES, Fragrance } from "@/data/fragrances";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  ExternalLink,
  SlidersHorizontal,
  Flame,
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
  Settings,
  Sparkles,
  ArrowLeft,
  Filter,
  Eye,
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  whatsapp: string;
  email: string;
  itemsSummary: string;
  boxCount: number;
  total: number;
  paymentMethod: "PIX (5% OFF)" | "Cartão (6x)";
  status: "Pago" | "Em Separação" | "Enviado" | "Entregue";
  createdAt: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "#MTH-849201",
    customerName: "Mariana Alcantara",
    whatsapp: "5511987654321",
    email: "mariana.alcantara@email.com",
    itemsSummary: "Pack Livre: 7 Ervas (3), Arruda (2), Lavanda (3), Palo Santo (2)",
    boxCount: 10,
    total: 142.40,
    paymentMethod: "PIX (5% OFF)",
    status: "Pago",
    createdAt: "Hoje às 22:45",
  },
  {
    id: "#MTH-849198",
    customerName: "Carlos Eduardo Silva",
    whatsapp: "5521998877665",
    email: "carlos.silva@email.com",
    itemsSummary: "Kit Purificação & Descarrego (5 caixinhas)",
    boxCount: 5,
    total: 79.90,
    paymentMethod: "Cartão (6x)",
    status: "Em Separação",
    createdAt: "Hoje às 21:10",
  },
  {
    id: "#MTH-849182",
    customerName: "Beatriz Mendonça",
    whatsapp: "5531988112233",
    email: "beatriz.mendonca@email.com",
    itemsSummary: "Pack Livre: Palo Santo (5), Canela (3), Alecrim (4), Benjoim (3)",
    boxCount: 15,
    total: 208.90,
    paymentMethod: "PIX (5% OFF)",
    status: "Enviado",
    createdAt: "Ontem às 18:30",
  },
  {
    id: "#MTH-849150",
    customerName: "Lucas Esteves",
    whatsapp: "5548991234567",
    email: "lucas.esteves@email.com",
    itemsSummary: "Pack Livre: Lavanda (5), Sândalo (5), Camomila (5), Flor de Laranjeira (5)",
    boxCount: 20,
    total: 279.90,
    paymentMethod: "Cartão (6x)",
    status: "Entregue",
    createdAt: "Há 2 dias",
  },
  {
    id: "#MTH-849120",
    customerName: "Juliana Peixoto",
    whatsapp: "5511977665544",
    email: "juliana.peixoto@email.com",
    itemsSummary: "Kit Foco & Concentração (5 caixinhas)",
    boxCount: 5,
    total: 75.90,
    paymentMethod: "PIX (5% OFF)",
    status: "Entregue",
    createdAt: "Há 3 dias",
  },
];

const WHOLESALE_LEADS = [
  {
    storeName: "Espaço Holístico Mandala",
    contactName: "Fernanda Costa",
    whatsapp: "5511988887777",
    city: "São Paulo, SP",
    unitsRequested: 200,
    tierTotal: 1980.00,
    status: "Negociação em Aberto",
    date: "Hoje às 15:20",
  },
  {
    storeName: "Studio Yoga & Prana",
    contactName: "Roberto Neves",
    whatsapp: "5541999998888",
    city: "Curitiba, PR",
    unitsRequested: 100,
    tierTotal: 1150.00,
    status: "Aguardando Contato",
    date: "Ontem às 11:00",
  },
  {
    storeName: "Empório Botânico Flor de Lótus",
    contactName: "Aline Barreto",
    whatsapp: "5521977776666",
    city: "Niterói, RJ",
    unitsRequested: 300,
    tierTotal: 2670.00,
    status: "Proposta Enviada",
    date: "Há 2 dias",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "catalog" | "wholesale" | "settings">("overview");
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("todos");

  // Stock management state
  const [stockCounts, setStockCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FRAGRANCES.forEach((f, idx) => {
      initial[f.id] = 120 + ((idx * 17) % 180);
    });
    return initial;
  });

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      o.email.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus =
      selectedStatusFilter === "todos" || o.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 38450.0;
  const totalBoxesSold = orders.reduce((sum, o) => sum + o.boxCount, 0) + 2480;
  const avgTicket = totalRevenue / (orders.length + 248);

  return (
    <div className="min-h-screen bg-[#F4EFE6]/40 flex flex-col font-sans text-[#1A221E]">
      {/* Top Admin Navbar */}
      <header className="bg-[#253D32] text-white px-6 py-4 flex items-center justify-between border-b border-[#C29D59]/30 shadow-md">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-all"
            title="Voltar à Loja Virtual"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ver Loja Virtual</span>
          </a>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#C29D59] text-[#253D32] flex items-center justify-center font-display font-bold text-sm">
              M
            </div>
            <div>
              <span className="font-display font-bold tracking-tight text-base text-white block leading-none">
                MATHURA • Painel de Gestão
              </span>
              <span className="text-[10px] text-[#C29D59] tracking-wider uppercase font-semibold">
                E-commerce & Distribuição Botânica
              </span>
            </div>
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-white/70">
            Ambiente: <strong className="text-white">Produção (Ativo)</strong>
          </span>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#253D32]/10 no-scrollbar">
          {[
            { id: "overview", label: "Visão Geral", icon: TrendingUp },
            { id: "orders", label: `Pedidos Recentes (${orders.length})`, icon: ShoppingBag },
            { id: "catalog", label: `Catálogo & Estoque (${FRAGRANCES.length})`, icon: Package },
            { id: "wholesale", label: `Cotações Atacado (${WHOLESALE_LEADS.length})`, icon: Users },
            { id: "settings", label: "Regras de Checkout", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#253D32] text-white shadow-sm"
                    : "bg-white text-[#607168] hover:text-[#253D32] hover:bg-[#F4EFE6] border border-[#253D32]/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#C29D59]" : "text-[#607168]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: VISÃO GERAL (OVERVIEW) */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-[#607168]">
                  <span className="text-xs font-semibold">Faturamento Total</span>
                  <div className="w-8 h-8 rounded-lg bg-[#588157]/15 text-[#588157] flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-2xl font-display font-bold text-[#253D32]">
                    R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <p className="text-[11px] text-[#588157] font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +28.4% vs mês anterior
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-[#607168]">
                  <span className="text-xs font-semibold">Caixinhas Vendidas</span>
                  <div className="w-8 h-8 rounded-lg bg-[#C29D59]/15 text-[#C29D59] flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-2xl font-display font-bold text-[#253D32]">
                    {totalBoxesSold.toLocaleString("pt-BR")} caixinhas
                  </span>
                  <p className="text-[11px] text-[#607168]">
                    Média de <strong>9.8 caixinhas por pedido</strong>
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-[#607168]">
                  <span className="text-xs font-semibold">Ticket Médio</span>
                  <div className="w-8 h-8 rounded-lg bg-[#253D32]/15 text-[#253D32] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-2xl font-display font-bold text-[#253D32]">
                    R$ {avgTicket.toFixed(2).replace(".", ",")}
                  </span>
                  <p className="text-[11px] text-[#588157] font-semibold">
                    Alavancado pelo frete grátis R$ 100
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-[#607168]">
                  <span className="text-xs font-semibold">Taxa de Conversão PIX</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-2xl font-display font-bold text-[#253D32]">
                    72% no PIX
                  </span>
                  <p className="text-[11px] text-[#607168]">
                    Gatilho de 5% OFF funcionando com êxito
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Section: Recent Orders Quick Table + Top Selling Fragrances */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Recent Orders preview */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-display font-bold text-[#253D32]">
                      Últimos Pedidos Recebidos
                    </h3>
                    <p className="text-xs text-[#607168]">
                      Pedidos gerados pelo montador de packs livres e kits fechados
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-semibold text-[#253D32] hover:underline flex items-center gap-1"
                  >
                    <span>Ver todos</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#253D32]/10 text-[#607168] uppercase text-[10px] tracking-wider">
                        <th className="pb-3">Pedido</th>
                        <th className="pb-3">Cliente</th>
                        <th className="pb-3">Itens</th>
                        <th className="pb-3">Valor</th>
                        <th className="pb-3">Pagamento</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#253D32]/5">
                      {orders.slice(0, 4).map((order) => (
                        <tr key={order.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                          <td className="py-3 font-bold text-[#253D32]">{order.id}</td>
                          <td className="py-3 font-medium text-[#253D32]">
                            <div>{order.customerName}</div>
                            <div className="text-[10px] text-[#607168]">{order.createdAt}</div>
                          </td>
                          <td className="py-3 text-[#607168] max-w-xs truncate" title={order.itemsSummary}>
                            {order.itemsSummary}
                          </td>
                          <td className="py-3 font-bold text-[#253D32]">
                            R$ {order.total.toFixed(2).replace(".", ",")}
                          </td>
                          <td className="py-3 text-[11px] text-[#588157] font-semibold">
                            {order.paymentMethod}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                order.status === "Pago"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : order.status === "Em Separação"
                                  ? "bg-amber-100 text-amber-800"
                                  : order.status === "Enviado"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Top Selling Fragrances */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-4">
                <div>
                  <h3 className="text-base font-display font-bold text-[#253D32] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#B86B53]" />
                    Campeões de Venda
                  </h3>
                  <p className="text-xs text-[#607168]">
                    Fragrâncias mais incluídas nos packs livres
                  </p>
                </div>

                <div className="space-y-3">
                  {FRAGRANCES.slice(0, 5).map((f, i) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#FBF9F5] border border-[#253D32]/5 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={f.imageUrl}
                          alt={f.name}
                          className="w-8 h-10 object-contain shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-[#253D32] block truncate">
                            {f.name}
                          </span>
                          <span className="text-[10px] text-[#607168] block">
                            ★ {f.rating} ({f.reviewsCount} avaliações)
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-[#B86B53] text-[11px] block">
                          +{f.salesCount}
                        </span>
                        <span className="text-[10px] text-[#607168]">vendidos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GESTÃO DE PEDIDOS (ORDERS) */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-display font-bold text-[#253D32]">
                  Gestão Completa de Pedidos
                </h3>
                <p className="text-xs text-[#607168]">
                  Acompanhe, atualize status e faça contato com clientes via WhatsApp em 1 clique
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#607168]" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Buscar por cliente, pedido..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#253D32]/15 bg-[#FBF9F5] focus:outline-none focus:border-[#C29D59]"
                  />
                </div>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="text-xs rounded-xl border border-[#253D32]/15 bg-[#FBF9F5] px-3 py-2 text-[#253D32]"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="Pago">Pago</option>
                  <option value="Em Separação">Em Separação</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregue">Entregue</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#253D32]/10 text-[#607168] uppercase text-[10px] tracking-wider bg-[#F4EFE6]/50">
                    <th className="p-3">Pedido</th>
                    <th className="p-3">Cliente & Contato</th>
                    <th className="p-3">Fragrâncias / Composição</th>
                    <th className="p-3">Qtd / Valor</th>
                    <th className="p-3">Pagamento</th>
                    <th className="p-3">Alterar Status</th>
                    <th className="p-3">Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#253D32]/5">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FBF9F5]/80 transition-colors">
                      <td className="p-3 font-bold text-[#253D32]">
                        {order.id}
                        <span className="block text-[10px] text-[#607168] font-normal">{order.createdAt}</span>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-[#253D32]">{order.customerName}</div>
                        <div className="text-[11px] text-[#607168]">{order.email}</div>
                        <div className="text-[11px] text-[#588157] font-semibold">+{order.whatsapp}</div>
                      </td>
                      <td className="p-3 text-[#253D32]/85 max-w-xs">
                        <div className="line-clamp-2 leading-relaxed" title={order.itemsSummary}>
                          {order.itemsSummary}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-sm text-[#253D32] block">
                          R$ {order.total.toFixed(2).replace(".", ",")}
                        </span>
                        <span className="text-[10px] text-[#607168]">
                          {order.boxCount} caixinhas
                        </span>
                      </td>
                      <td className="p-3 text-[11px] text-[#588157] font-semibold">
                        {order.paymentMethod}
                      </td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                          className="text-[11px] font-bold rounded-lg border border-[#253D32]/15 bg-white px-2 py-1"
                        >
                          <option value="Pago">Pago</option>
                          <option value="Em Separação">Em Separação</option>
                          <option value="Enviado">Enviado</option>
                          <option value="Entregue">Entregue</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <a
                          href={`https://wa.me/${order.whatsapp}?text=${encodeURIComponent(
                            `Olá ${order.customerName}! Aqui é da Mathura Incensos. Informamos que seu pedido ${order.id} está com status: ${order.status}. Muito obrigado pela confiança!`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#25D366]/15 text-[#1e8845] hover:bg-[#25D366] hover:text-white transition-all text-[11px] font-bold"
                          title="Enviar mensagem automática no WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CATÁLOGO & ESTOQUE (30 FRAGRÂNCIAS REAIS) */}
        {activeTab === "catalog" && (
          <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-display font-bold text-[#253D32]">
                  Controle de Catálogo & Estoque (30 Fragrâncias Reais)
                </h3>
                <p className="text-xs text-[#607168]">
                  Todas as 30 fragrâncias com fotos reais transparentes cadastradas e sincronizadas
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#588157]/15 text-[#588157] font-bold px-3 py-1 rounded-full">
                  30 Produtos Ativos
                </span>
                <span className="text-xs bg-white border border-[#253D32]/10 text-[#253D32] px-3 py-1 rounded-full">
                  100% com Fotos Reais
                </span>
              </div>
            </div>

            {/* Fragrances Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#253D32]/10 text-[#607168] uppercase text-[10px] tracking-wider bg-[#F4EFE6]/50">
                    <th className="p-3">Produto</th>
                    <th className="p-3">Família Olfativa</th>
                    <th className="p-3">Estoque Disponível</th>
                    <th className="p-3">Vendas Acumuladas</th>
                    <th className="p-3">Avaliação Média</th>
                    <th className="p-3">Destaques</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#253D32]/5">
                  {FRAGRANCES.map((fragrance) => {
                    const stock = stockCounts[fragrance.id] || 80;
                    return (
                      <tr key={fragrance.id} className="hover:bg-[#FBF9F5]/80 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 rounded-lg bg-[#FBF9F5] p-1 flex items-center justify-center border border-[#253D32]/10 shrink-0">
                              <img
                                src={fragrance.imageUrl}
                                alt={fragrance.name}
                                className="max-h-full w-auto object-contain"
                              />
                            </div>
                            <div>
                              <span className="font-bold text-sm text-[#253D32] block">
                                {fragrance.name}
                              </span>
                              <span className="text-[10px] text-[#607168] italic">
                                {fragrance.subtitle}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-[#F4EFE6] text-[#253D32] text-[10px] font-semibold">
                            {fragrance.family}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={stock}
                              onChange={(e) =>
                                setStockCounts((prev) => ({
                                  ...prev,
                                  [fragrance.id]: parseInt(e.target.value) || 0,
                                }))
                              }
                              className="w-16 px-2 py-1 rounded border border-[#253D32]/15 text-xs font-bold text-[#253D32]"
                            />
                            <span className="text-[10px] text-[#607168]">caixinhas</span>
                          </div>
                        </td>
                        <td className="p-3 font-bold text-[#B86B53]">
                          +{fragrance.salesCount.toLocaleString("pt-BR")} cxs
                        </td>
                        <td className="p-3 text-[#C29D59] font-bold">
                          ★ {fragrance.rating.toFixed(1)}{" "}
                          <span className="text-[#607168] font-normal text-[10px]">
                            ({fragrance.reviewsCount})
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            {fragrance.isBestseller && (
                              <span className="px-2 py-0.5 rounded bg-[#C29D59] text-white text-[9px] font-bold">
                                Mais Vendido
                              </span>
                            )}
                            {fragrance.isNewArrival && (
                              <span className="px-2 py-0.5 rounded bg-[#588157] text-white text-[9px] font-bold">
                                Novidade
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LEADS DE ATACADO (WHOLESALE) */}
        {activeTab === "wholesale" && (
          <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-5">
            <div>
              <h3 className="text-lg font-display font-bold text-[#253D32]">
                Oportunidades de Atacado & Revenda (B2B)
              </h3>
              <p className="text-xs text-[#607168]">
                Lojistas e espaços terapêuticos que solicitaram pedidos de 100 a 300 unidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WHOLESALE_LEADS.map((lead, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#253D32]/10 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#253D32]">
                        {lead.storeName}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {lead.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#607168]">
                      Responsável: <strong>{lead.contactName}</strong> ({lead.city})
                    </p>

                    <div className="p-3 rounded-xl bg-white border border-[#253D32]/10 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#607168]">Volume Solicitado:</span>
                        <strong className="text-[#253D32]">{lead.unitsRequested} unidades</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#607168]">Valor da Proposta:</span>
                        <strong className="text-[#588157]">
                          R$ {lead.tierTotal.toFixed(2).replace(".", ",")}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
                      `Olá ${lead.contactName}, aqui é da Mathura Incensos! Recebemos seu interesse na cotação de ${lead.unitsRequested} unidades para a loja ${lead.storeName}. Podemos conversar sobre a entrega?`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-xs hover:bg-[#20bd5a] transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Negociar no WhatsApp</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REGRAS DE CHECKOUT & GATILHOS */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-6 max-w-4xl">
            <div>
              <h3 className="text-lg font-display font-bold text-[#253D32]">
                Configuração dos Gatilhos de Conversão Ativos
              </h3>
              <p className="text-xs text-[#607168]">
                Regras comerciais aplicadas dinamicamente no checkout e no construtor
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#253D32]/10 space-y-2">
                <span className="font-bold text-[#253D32] block">🚚 Meta de Frete Grátis</span>
                <p className="text-[#607168]">
                  Configurado para: <strong>R$ 100,00</strong>. Barra de progresso exibe quanto falta para atingir a meta.
                </p>
                <span className="inline-block text-[10px] font-bold text-[#588157] bg-[#588157]/10 px-2 py-0.5 rounded">
                  Status: ATIVO
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#253D32]/10 space-y-2">
                <span className="font-bold text-[#253D32] block">💳 Desconto no PIX</span>
                <p className="text-[#607168]">
                  Configurado para: <strong>5% de desconto automático</strong> no valor final da sacola.
                </p>
                <span className="inline-block text-[10px] font-bold text-[#588157] bg-[#588157]/10 px-2 py-0.5 rounded">
                  Status: ATIVO
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#253D32]/10 space-y-2">
                <span className="font-bold text-[#253D32] block">⚡ Cronômetro de Reserva de Estoque</span>
                <p className="text-[#607168]">
                  Tempo regressivo de <strong>15 minutos</strong> ativado automaticamente ao abrir a sacola.
                </p>
                <span className="inline-block text-[10px] font-bold text-[#588157] bg-[#588157]/10 px-2 py-0.5 rounded">
                  Status: ATIVO
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#253D32]/10 space-y-2">
                <span className="font-bold text-[#253D32] block">📦 Regra do Pack Livre</span>
                <p className="text-[#607168]">
                  Mínimo obrigatório: <strong>5 caixinhas (R$ 79,90)</strong>. Piso de desconto: <strong>R$ 13,00/un</strong>.
                </p>
                <span className="inline-block text-[10px] font-bold text-[#588157] bg-[#588157]/10 px-2 py-0.5 rounded">
                  Status: ATIVO
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
