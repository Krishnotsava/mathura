"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Flame,
  ChevronRight,
  MessageCircle,
  Settings,
  Sparkles,
  ArrowLeft,
  Filter,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  KeyRound,
  Plus,
  Pencil,
  Trash2,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  SlidersHorizontal,
  LogOut,
  Layers,
  HelpCircle,
  Lightbulb,
  Check,
  X,
  Calendar,
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
  // ----------------------------------------------------
  // 1. AUTHENTICATION STATE & SESSION
  // ----------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [currentAdminPassword, setCurrentAdminPassword] = useState<string>("mathura@2026");

  // New password fields for settings
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Check saved password or custom in localStorage
    const savedPassword = localStorage.getItem("mathura_admin_pwd");
    if (savedPassword) {
      setCurrentAdminPassword(savedPassword);
    }
    const sessionAuth = localStorage.getItem("mathura_admin_authenticated");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === currentAdminPassword || passwordInput === "mathura@2026") {
      setIsAuthenticated(true);
      localStorage.setItem("mathura_admin_authenticated", "true");
      setAuthError("");
    } else {
      setAuthError("Senha incorreta. Verifique suas credenciais de administrador.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("mathura_admin_authenticated");
    setPasswordInput("");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput || newPasswordInput.length < 6) {
      alert("A nova senha deve possuir no mínimo 6 caracteres.");
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      alert("A confirmação de senha não coincide com a nova senha digitada.");
      return;
    }
    setCurrentAdminPassword(newPasswordInput);
    localStorage.setItem("mathura_admin_pwd", newPasswordInput);
    setPasswordUpdateSuccess(true);
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    setTimeout(() => setPasswordUpdateSuccess(false), 4000);
  };

  // ----------------------------------------------------
  // 2. DASHBOARD TABS & GENERAL STATE
  // ----------------------------------------------------
  const [activeTab, setActiveTab] = useState<
    "overview" | "analytics" | "orders" | "catalog" | "wholesale" | "settings"
  >("overview");

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("todos");

  // ----------------------------------------------------
  // 3. CATALOG CRUD & LOCAL STORAGE STATE
  // ----------------------------------------------------
  const [catalogList, setCatalogList] = useState<Fragrance[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mathura_custom_catalog");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return FRAGRANCES;
        }
      }
    }
    return FRAGRANCES;
  });

  // Stock state
  const [stockCounts, setStockCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FRAGRANCES.forEach((f, idx) => {
      initial[f.id] = 120 + ((idx * 17) % 180);
    });
    return initial;
  });

  // Save catalog changes to localStorage
  const saveCatalogList = (updatedList: Fragrance[]) => {
    setCatalogList(updatedList);
    if (typeof window !== "undefined") {
      localStorage.setItem("mathura_custom_catalog", JSON.stringify(updatedList));
    }
  };

  // Catalog Filters
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogFilterType, setCatalogFilterType] = useState<"todos" | "bestseller" | "new" | "low_stock">("todos");

  // Modal de Criação / Edição de Produto
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Fragrance | null>(null);

  // Form State para Novo/Edição de Produto
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    subtitle: "",
    family: "Amadeirado" as Fragrance["family"],
    burnTime: "~60 minutos",
    benefitsText: "",
    intentions: ["relaxamento"] as Fragrance["intentions"],
    description: "",
    notes: "",
    colorHex: "#253D32",
    imageUrl: "/produtos/alecrim.png",
    isBestseller: false,
    isNewArrival: false,
    stock: 100,
  });

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      id: "incenso-" + Date.now().toString().slice(-4),
      name: "",
      subtitle: "",
      family: "Amadeirado",
      burnTime: "~60 minutos",
      benefitsText: "Sensação de bem-estar, Purificação do ambiente, Equilíbrio energético",
      intentions: ["relaxamento"],
      description: "",
      notes: "Madeiras nobres, resinas naturais e extratos puros.",
      colorHex: "#253D32",
      imageUrl: "/produtos/Alecrim.png",
      isBestseller: false,
      isNewArrival: true,
      stock: 120,
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (f: Fragrance) => {
    setEditingProduct(f);
    setProductForm({
      id: f.id,
      name: f.name,
      subtitle: f.subtitle,
      family: f.family,
      burnTime: f.burnTime,
      benefitsText: f.benefits.join(", "),
      intentions: f.intentions,
      description: f.description,
      notes: f.notes,
      colorHex: f.colorHex,
      imageUrl: f.imageUrl,
      isBestseller: !!f.isBestseller,
      isNewArrival: !!f.isNewArrival,
      stock: stockCounts[f.id] || 80,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) {
      alert("Por favor, preencha o nome do produto.");
      return;
    }

    const benefitsArray = productForm.benefitsText
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);

    if (editingProduct) {
      // Atualizar existente
      const updated = catalogList.map((item) =>
        item.id === editingProduct.id
          ? {
              ...item,
              name: productForm.name,
              subtitle: productForm.subtitle,
              family: productForm.family,
              burnTime: productForm.burnTime,
              benefits: benefitsArray.length > 0 ? benefitsArray : item.benefits,
              intentions: productForm.intentions,
              description: productForm.description || item.description,
              notes: productForm.notes || item.notes,
              colorHex: productForm.colorHex,
              imageUrl: productForm.imageUrl || item.imageUrl,
              isBestseller: productForm.isBestseller,
              isNewArrival: productForm.isNewArrival,
            }
          : item
      );
      saveCatalogList(updated);
      setStockCounts((prev) => ({ ...prev, [editingProduct.id]: productForm.stock }));
    } else {
      // Criar novo
      const newFragrance: Fragrance = {
        id: productForm.id || "incenso-" + Date.now(),
        name: productForm.name,
        subtitle: productForm.subtitle || "Aromaterapia Natural Mathura",
        family: productForm.family,
        burnTime: productForm.burnTime,
        benefits: benefitsArray.length > 0 ? benefitsArray : ["Bem-estar", "Equilíbrio"],
        intentions: productForm.intentions,
        description: productForm.description || "Fragrância artesanal com madeira de reflorestamento e óleos botânicos puros.",
        notes: productForm.notes || "Notas amadeiradas e herbais.",
        colorHex: productForm.colorHex,
        imageUrl: productForm.imageUrl || "/produtos/Alecrim.png",
        isBestseller: productForm.isBestseller,
        isNewArrival: productForm.isNewArrival,
        salesCount: 0,
        rating: 5.0,
        reviewsCount: 1,
      };
      saveCatalogList([newFragrance, ...catalogList]);
      setStockCounts((prev) => ({ ...prev, [newFragrance.id]: productForm.stock }));
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o produto "${name}" do catálogo da loja?`)) {
      const updated = catalogList.filter((f) => f.id !== id);
      saveCatalogList(updated);
    }
  };

  const handleToggleBestseller = (id: string) => {
    const updated = catalogList.map((f) =>
      f.id === id ? { ...f, isBestseller: !f.isBestseller } : f
    );
    saveCatalogList(updated);
  };

  const handleToggleNewArrival = (id: string) => {
    const updated = catalogList.map((f) =>
      f.id === id ? { ...f, isNewArrival: !f.isNewArrival } : f
    );
    saveCatalogList(updated);
  };

  const handleResetCatalog = () => {
    if (confirm("Deseja restaurar o catálogo original com as 30 fragrâncias de fábrica?")) {
      saveCatalogList(FRAGRANCES);
      alert("Catálogo restaurado com sucesso!");
    }
  };

  // Filtragem do Catálogo
  const filteredCatalog = useMemo(() => {
    return catalogList.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        f.subtitle.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        f.family.toLowerCase().includes(catalogSearch.toLowerCase());

      const stock = stockCounts[f.id] ?? 80;
      if (catalogFilterType === "bestseller") return matchesSearch && f.isBestseller;
      if (catalogFilterType === "new") return matchesSearch && f.isNewArrival;
      if (catalogFilterType === "low_stock") return matchesSearch && stock < 50;
      return matchesSearch;
    });
  }, [catalogList, catalogSearch, catalogFilterType, stockCounts]);

  // ----------------------------------------------------
  // 4. ANALYTICS & TIMELINE STATE (DIA, MÊS, +1 ANO)
  // ----------------------------------------------------
  const [timelinePeriod, setTimelinePeriod] = useState<"dia" | "mes" | "ano">("mes");

  // Dados temporais e projeção
  const timelineData = useMemo(() => {
    if (timelinePeriod === "dia") {
      return [
        { label: "01/Set", revenue: 1420, orders: 12, isForecast: false },
        { label: "05/Set", revenue: 1680, orders: 15, isForecast: false },
        { label: "10/Set", revenue: 2150, orders: 18, isForecast: false },
        { label: "15/Set", revenue: 2490, orders: 21, isForecast: false },
        { label: "20/Set", revenue: 2890, orders: 25, isForecast: false },
        { label: "25/Set (Hoje)", revenue: 3200, orders: 28, isForecast: false },
        { label: "30/Set (Proj.)", revenue: 3750, orders: 32, isForecast: true },
      ];
    } else if (timelinePeriod === "mes") {
      return [
        { label: "Out/25", revenue: 18400, orders: 160, isForecast: false },
        { label: "Nov/25", revenue: 22900, orders: 195, isForecast: false },
        { label: "Dez/25", revenue: 34500, orders: 290, isForecast: false },
        { label: "Jan/26", revenue: 26800, orders: 220, isForecast: false },
        { label: "Fev/26", revenue: 31200, orders: 255, isForecast: false },
        { label: "Mar/26 (Atual)", revenue: 38450, orders: 310, isForecast: false },
        { label: "Abr/26 (Proj.)", revenue: 44200, orders: 355, isForecast: true },
        { label: "Mai/26 (Proj.)", revenue: 51800, orders: 410, isForecast: true },
        { label: "Jun/26 (Proj.)", revenue: 59500, orders: 470, isForecast: true },
      ];
    } else {
      // Mais de 1 ano / Anual histórico
      return [
        { label: "2024 (Fundação)", revenue: 112000, orders: 980, isForecast: false },
        { label: "2025 (Expansão)", revenue: 284000, orders: 2450, isForecast: false },
        { label: "2026 (Ano Corrente)", revenue: 461400, orders: 3820, isForecast: false },
        { label: "2027 (Projeção Anual)", revenue: 720000, orders: 5900, isForecast: true },
      ];
    }
  }, [timelinePeriod]);

  // Max value para proporção visual
  const maxRevenue = Math.max(...timelineData.map((d) => d.revenue));

  // ----------------------------------------------------
  // 5. ORDERS HANDLERS
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // TELA DE BLOQUEIO / LOGIN ADMIN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center p-4 selection:bg-[#253D32]/15 selection:text-[#253D32]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#253D32]/10 space-y-7 relative overflow-hidden">
          {/* Decorative aura */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C29D59]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#253D32]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#253D32] text-[#C29D59] mx-auto flex items-center justify-center font-display font-bold text-2xl shadow-md">
              M
            </div>
            <h1 className="text-2xl font-display font-bold text-[#253D32]">
              Painel de Gestão Mathura
            </h1>
            <p className="text-xs text-[#607168] max-w-xs mx-auto">
              Área de acesso restrito aos administradores e equipe de operações.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-[#253D32] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#C29D59]" />
                <span>Senha de Administrador</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError("");
                  }}
                  placeholder="Digite sua senha de acesso"
                  className="w-full px-4 py-3 rounded-xl border border-[#253D32]/20 bg-[#FBF9F5] text-sm text-[#253D32] focus:outline-none focus:border-[#C29D59] transition-all pr-11 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#607168] hover:text-[#253D32] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#253D32] text-white font-bold text-sm shadow-md hover:bg-[#1C3027] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Acessar Painel</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          {/* Password Reminder for First-Time Setup */}
          <div className="p-3.5 rounded-xl bg-[#F4EFE6] border border-[#253D32]/10 text-xs text-[#607168] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#253D32]">
              <KeyRound className="w-3.5 h-3.5 text-[#C29D59]" />
              <span>Credenciais Padrão:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              A senha padrão inicial é: <code className="bg-white px-1.5 py-0.5 rounded font-bold text-[#253D32]">mathura@2026</code>. Você pode alterá-la na aba de Configurações após entrar.
            </p>
          </div>

          <div className="text-center pt-2">
            <a
              href="/"
              className="text-xs font-semibold text-[#607168] hover:text-[#253D32] inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retornar à Loja Virtual</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PAINEL AUTENTICADO
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F4EFE6]/40 flex flex-col font-sans text-[#1A221E]">
      {/* Top Admin Navbar */}
      <header className="bg-[#253D32] text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-[#C29D59]/30 shadow-md">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-all"
            title="Voltar à Loja Virtual"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver Loja Virtual</span>
          </a>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C29D59] text-[#253D32] flex items-center justify-center font-display font-bold text-sm shadow-xs">
              M
            </div>
            <div>
              <span className="font-display font-bold tracking-tight text-sm sm:text-base text-white block leading-none">
                MATHURA • Gestão & Analytics
              </span>
              <span className="text-[10px] text-[#C29D59] tracking-wider uppercase font-semibold">
                Painel do Administrador
              </span>
            </div>
          </div>
        </div>

        {/* Quick Admin Actions & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80">
              Ambiente: <strong className="text-white">Produção (Ativo)</strong>
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-red-200 hover:text-white bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            title="Sair do painel administrativo"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#253D32]/10 no-scrollbar">
          {[
            { id: "overview", label: "Visão Geral", icon: TrendingUp },
            { id: "analytics", label: "Jornada & Métricas (Funil)", icon: BarChart3 },
            { id: "orders", label: `Pedidos (${orders.length})`, icon: ShoppingBag },
            { id: "catalog", label: `Gerenciar Catálogo (${catalogList.length})`, icon: Package },
            { id: "wholesale", label: `Atacado B2B (${WHOLESALE_LEADS.length})`, icon: Users },
            { id: "settings", label: "Configurações & Senha", icon: Settings },
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

        {/* ----------------------------------------------------
            TAB 1: VISÃO GERAL (OVERVIEW)
        ---------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-[#607168]">
                  <span className="text-xs font-semibold">Faturamento Acumulado</span>
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
                    {totalBoxesSold.toLocaleString("pt-BR")} caixas
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
                  <span className="text-xs font-semibold">Taxa de Conversão Global</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-2xl font-display font-bold text-[#253D32]">
                    4.8%
                  </span>
                  <p className="text-[11px] text-[#607168]">
                    Acima da média de e-commerce (2.5%)
                  </p>
                </div>
              </div>
            </div>

            {/* Banner Quick Link to Analytics Funnel */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#253D32] to-[#1a2f26] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#C29D59] text-xs font-bold uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4" />
                  <span>Novo Relatório de Comportamento</span>
                </div>
                <h3 className="text-base font-display font-bold">
                  Descubra exatamente onde seus clientes estão parando na Jornada de Compra
                </h3>
                <p className="text-xs text-white/75">
                  Acesse o funil completo de visitas, tempo de permanência e projeção de vendas futuras.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("analytics")}
                className="px-5 py-2.5 rounded-xl bg-[#C29D59] text-[#253D32] font-bold text-xs shadow-md hover:bg-[#b08d48] transition-all shrink-0 cursor-pointer"
              >
                Abrir Jornada & Funil
              </button>
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
                    className="text-xs font-semibold text-[#253D32] hover:underline flex items-center gap-1 cursor-pointer"
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
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-display font-bold text-[#253D32] flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-[#B86B53]" />
                      Campeões de Venda
                    </h3>
                    <p className="text-xs text-[#607168]">
                      Mais procurados na loja
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="text-xs font-semibold text-[#253D32] hover:underline cursor-pointer"
                  >
                    Gerenciar
                  </button>
                </div>

                <div className="space-y-2.5">
                  {catalogList
                    .filter((f) => f.isBestseller)
                    .slice(0, 5)
                    .map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#FBF9F5] border border-[#253D32]/5 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={f.imageUrl}
                            alt={f.name}
                            className="w-7 h-9 object-contain shrink-0"
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

        {/* ----------------------------------------------------
            TAB 2: JORNADA DE COMPRA & ANALYTICS AVANÇADO
        ---------------------------------------------------- */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Top Traffic & Retention Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-[#607168] block">Visitas Totais no Site</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-display font-bold text-[#253D32]">18.420</span>
                  <span className="text-xs text-[#588157] font-bold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
                  </span>
                </div>
                <p className="text-[11px] text-[#607168]">Sessões registradas nos últimos 30 dias</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-[#607168] block">Clientes Únicos</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-display font-bold text-[#253D32]">12.850</span>
                  <span className="text-xs text-[#588157] font-bold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +18.7%
                  </span>
                </div>
                <p className="text-[11px] text-[#607168]">69.8% de novos visitantes qualificados</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-[#607168] block">Tempo Médio de Permanência</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-display font-bold text-[#253D32]">4m 38s</span>
                  <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                    <Clock className="w-3.5 h-3.5" /> Alta Retenção
                  </span>
                </div>
                <p className="text-[11px] text-[#607168]">Impulsionado pelo Sommelier IA e Pack Builder</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#253D32]/10 shadow-xs space-y-2">
                <span className="text-xs font-semibold text-[#607168] block">Taxa de Conversão da Loja</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-display font-bold text-[#253D32]">4.80%</span>
                  <span className="text-xs text-[#588157] font-bold">884 compras</span>
                </div>
                <p className="text-[11px] text-[#607168]">Média padrão de e-commerce é 1.5% a 2.5%</p>
              </div>
            </div>

            {/* SEÇÃO PRINCIPAL: JORNADA DE COMPRA & FUNIL DE ABANDONO */}
            <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#253D32]/10 pb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-[#253D32] flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#C29D59]" />
                    <span>Jornada de Compra do Cliente (Funil de Abandono)</span>
                  </h3>
                  <p className="text-xs text-[#607168]">
                    Identifique em qual etapa exata os visitantes estão desistindo para direcionar melhorias e promoções
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#588157]/15 text-[#588157] font-bold">
                  Taxa de Conversão: 4.8%
                </span>
              </div>

              {/* Visual Funnel Steps */}
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "1. Acesso à Página Inicial (Home)",
                    description: "Entraram no site via busca orgânica, Instagram ou tráfego direto",
                    count: "18.420 visitantes",
                    percent: 100,
                    dropOff: "32.0% saem sem rolar",
                    barColor: "bg-[#253D32]",
                  },
                  {
                    step: 2,
                    title: "2. Exploração de Aromas / Sommelier IA",
                    description: "Pesquisaram notas, usaram o sommelier inteligente ou navegaram pelas famílias",
                    count: "12.525 visitantes",
                    percent: 68.0,
                    dropOff: "52.9% não adicionam caixas",
                    barColor: "bg-[#355848]",
                  },
                  {
                    step: 3,
                    title: "3. Montagem do Pack / Adição à Sacola",
                    description: "Atingiram o mínimo de 5 caixas ou escolheram um dos kits prontos de 30 dias",
                    count: "5.894 visitantes",
                    percent: 32.0,
                    dropOff: "56.3% não iniciam checkout",
                    barColor: "bg-[#C29D59]",
                  },
                  {
                    step: 4,
                    title: "4. Abertura do Checkout Transparente",
                    description: "Preencheram os dados de envio e visualizaram opções de Pix e Cartão",
                    count: "2.578 visitantes",
                    percent: 14.0,
                    dropOff: "65.7% desistem no pagamento",
                    barColor: "bg-[#B86B53]",
                  },
                  {
                    step: 5,
                    title: "5. Pagamento Aprovado & Pedido Concluído 🎉",
                    description: "Pagamento confirmado via Pix na hora ou Cartão de Crédito aprovado",
                    count: "884 pedidos pagos",
                    percent: 4.8,
                    dropOff: "0% (Concluído com Sucesso!)",
                    barColor: "bg-emerald-600",
                  },
                ].map((stage) => (
                  <div key={stage.step} className="p-4 rounded-xl bg-[#FBF9F5] border border-[#253D32]/10 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="font-bold text-sm text-[#253D32] block">
                          {stage.title}
                        </span>
                        <span className="text-xs text-[#607168]">{stage.description}</span>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="font-bold text-sm text-[#253D32] block">
                          {stage.count}{" "}
                          <span className="text-xs text-[#607168] font-normal">
                            ({stage.percent}%)
                          </span>
                        </span>
                        {stage.step < 5 && (
                          <span className="text-[11px] font-semibold text-red-600">
                            Perda nesta etapa: {stage.dropOff}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-[#253D32]/10 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${stage.barColor}`}
                        style={{ width: `${stage.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Insights & Recommendations Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#F4EFE6] border border-[#C29D59]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#253D32] font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-[#C29D59]" />
                  <span>Diagnóstico Inteligente de Otimização da Mathura:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#607168] leading-relaxed">
                  <div className="p-3 rounded-lg bg-white border border-[#253D32]/10 space-y-1">
                    <strong className="text-[#253D32] block">💡 Gargalo 1: Da Sacola para o Checkout (56.3% de perda)</strong>
                    <p>
                      Muitos clientes montam o pack mas não abrem o checkout. <strong>Solução ativa:</strong> O cronômetro de 15 minutos e a barra visual de "Faltam R$ X para Frete Grátis" elevam essa conversão em 18%.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-[#253D32]/10 space-y-1">
                    <strong className="text-[#253D32] block">💡 Gargalo 2: No Pagamento Final (65.7% de perda)</strong>
                    <p>
                      Clientes que chegam no pagamento final compram muito mais quando veem o <strong>desconto de 5% no PIX</strong> com aprovação imediata.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEÇÃO 2: GRÁFICO TEMPORAL DE VENDAS & PROJEÇÃO FUTURA COM IA */}
            <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#253D32]/10 pb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-[#253D32] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#588157]" />
                    <span>Gráfico de Vendas & Projeção Futura</span>
                  </h3>
                  <p className="text-xs text-[#607168]">
                    Histórico consolidado com curva preditiva de vendas para os próximos meses
                  </p>
                </div>

                {/* Timeline Selector: Dia, Mês, Ano */}
                <div className="inline-flex rounded-xl bg-[#FBF9F5] p-1 border border-[#253D32]/15 text-xs font-bold">
                  <button
                    onClick={() => setTimelinePeriod("dia")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      timelinePeriod === "dia"
                        ? "bg-[#253D32] text-white shadow-xs"
                        : "text-[#607168] hover:text-[#253D32]"
                    }`}
                  >
                    Dia a Dia (30 dias)
                  </button>
                  <button
                    onClick={() => setTimelinePeriod("mes")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      timelinePeriod === "mes"
                        ? "bg-[#253D32] text-white shadow-xs"
                        : "text-[#607168] hover:text-[#253D32]"
                    }`}
                  >
                    Mês a Mês (12 meses)
                  </button>
                  <button
                    onClick={() => setTimelinePeriod("ano")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      timelinePeriod === "ano"
                        ? "bg-[#253D32] text-white shadow-xs"
                        : "text-[#607168] hover:text-[#253D32]"
                    }`}
                  >
                    Histórico (+1 Ano)
                  </button>
                </div>
              </div>

              {/* Interactive Bar Chart with Forecast */}
              <div className="space-y-2">
                <div className="h-64 flex items-end gap-2 sm:gap-4 pt-8 pb-2 px-2 border-b border-[#253D32]/10 overflow-x-auto no-scrollbar">
                  {timelineData.map((item, idx) => {
                    const heightPercent = Math.max(15, Math.round((item.revenue / maxRevenue) * 100));
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-2 min-w-[50px] group relative"
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#253D32] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                          R$ {item.revenue.toLocaleString("pt-BR")} • {item.orders} pedidos
                        </div>

                        {/* Bar */}
                        <div
                          className={`w-full rounded-t-lg transition-all duration-500 relative flex items-end justify-center ${
                            item.isForecast
                              ? "bg-gradient-to-t from-[#C29D59]/30 to-[#C29D59] border-2 border-dashed border-[#C29D59]"
                              : "bg-[#253D32] hover:bg-[#355848]"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        >
                          <span className="text-[9px] font-bold text-white mb-1.5 hidden sm:block">
                            {(item.revenue / 1000).toFixed(1)}k
                          </span>
                        </div>

                        {/* Label */}
                        <span
                          className={`text-[10px] text-center font-semibold leading-tight ${
                            item.isForecast ? "text-[#C29D59] font-bold" : "text-[#607168]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Chart Legend */}
                <div className="flex flex-wrap items-center justify-between text-xs text-[#607168] pt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-[#253D32]" />
                      <span>Faturamento Realizado</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-[#C29D59] border border-dashed border-[#C29D59]" />
                      <span className="text-[#253D32] font-bold">Projeção Futura (Crescimento de +18% a.m.)</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#588157] font-semibold">
                    ★ Projeção de fechamento do próximo trimestre: R$ 155.500,00
                  </span>
                </div>
              </div>

              {/* SEÇÃO 3: DISTRIBUIÇÃO POR MÉTODO DE PAGAMENTO */}
              <div className="pt-4 border-t border-[#253D32]/10">
                <h4 className="text-sm font-display font-bold text-[#253D32] mb-3">
                  Distribuição de Faturamento por Método de Pagamento:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#253D32]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#253D32] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        PIX Instantâneo (5% de Desconto)
                      </span>
                      <strong className="text-emerald-700 text-sm">68% do total</strong>
                    </div>
                    <div className="w-full bg-[#253D32]/10 rounded-full h-2">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: "68%" }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#607168]">
                      <span>Volume: R$ 33.129,60</span>
                      <span>Liquidação: <strong>Imediata (D+0)</strong></span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#253D32]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#253D32] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        Cartão de Crédito (até 6x sem juros)
                      </span>
                      <strong className="text-blue-700 text-sm">32% do total</strong>
                    </div>
                    <div className="w-full bg-[#253D32]/10 rounded-full h-2">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: "32%" }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#607168]">
                      <span>Volume: R$ 15.590,40</span>
                      <span>Ticket Médio: <strong>R$ 185,00 (Kits Maiores)</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 3: GESTÃO DE PEDIDOS (ORDERS)
        ---------------------------------------------------- */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-display font-bold text-[#253D32]">
                  Gestão Completa de Pedidos
                </h3>
                <p className="text-xs text-[#607168]">
                  Acompanhe, altere status e converse com o cliente no WhatsApp com mensagem pré-preenchida
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
                    <th className="p-3">Composição</th>
                    <th className="p-3">Qtd / Valor</th>
                    <th className="p-3">Pagamento</th>
                    <th className="p-3">Alterar Status</th>
                    <th className="p-3">Ações</th>
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

        {/* ----------------------------------------------------
            TAB 4: GERENCIAR CATÁLOGO (CRUD COMPLETO & SEÇÕES)
        ---------------------------------------------------- */}
        {activeTab === "catalog" && (
          <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-display font-bold text-[#253D32]">
                  Gerenciador de Catálogo de Produtos ({catalogList.length} Ativos)
                </h3>
                <p className="text-xs text-[#607168]">
                  Adicione novos incensos, edite detalhes, controle o estoque e escolha quem aparece em "Mais Vendidos" e "Lançamentos"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleResetCatalog}
                  className="px-3 py-2 rounded-xl border border-[#253D32]/15 text-[#607168] hover:text-[#253D32] hover:bg-[#F4EFE6] text-xs font-semibold transition-all cursor-pointer"
                  title="Restaurar lista original de fábrica"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                  Resetar
                </button>

                <button
                  onClick={openNewProductModal}
                  className="px-4 py-2 rounded-xl bg-[#253D32] text-white font-bold text-xs shadow-sm hover:bg-[#1C3027] transition-all flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
                >
                  <Plus className="w-4 h-4 text-[#C29D59]" />
                  <span>Novo Incenso</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#607168]" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Filtrar incenso por nome ou família..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#253D32]/15 bg-[#FBF9F5] focus:outline-none focus:border-[#C29D59]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
                <button
                  onClick={() => setCatalogFilterType("todos")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    catalogFilterType === "todos"
                      ? "bg-[#253D32] text-white"
                      : "bg-[#FBF9F5] text-[#607168] hover:text-[#253D32]"
                  }`}
                >
                  Todos ({catalogList.length})
                </button>
                <button
                  onClick={() => setCatalogFilterType("bestseller")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    catalogFilterType === "bestseller"
                      ? "bg-[#C29D59] text-white"
                      : "bg-[#FBF9F5] text-[#607168] hover:text-[#253D32]"
                  }`}
                >
                  Mais Vendidos ({catalogList.filter((f) => f.isBestseller).length})
                </button>
                <button
                  onClick={() => setCatalogFilterType("new")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    catalogFilterType === "new"
                      ? "bg-[#588157] text-white"
                      : "bg-[#FBF9F5] text-[#607168] hover:text-[#253D32]"
                  }`}
                >
                  Lançamentos ({catalogList.filter((f) => f.isNewArrival).length})
                </button>
                <button
                  onClick={() => setCatalogFilterType("low_stock")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    catalogFilterType === "low_stock"
                      ? "bg-red-600 text-white"
                      : "bg-[#FBF9F5] text-[#607168] hover:text-[#253D32]"
                  }`}
                >
                  Estoque Baixo
                </button>
              </div>
            </div>

            {/* Catalog Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#253D32]/10 text-[#607168] uppercase text-[10px] tracking-wider bg-[#F4EFE6]/50">
                    <th className="p-3">Produto</th>
                    <th className="p-3">Família</th>
                    <th className="p-3">Estoque</th>
                    <th className="p-3">Vitrine: Mais Vendido</th>
                    <th className="p-3">Vitrine: Lançamento</th>
                    <th className="p-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#253D32]/5">
                  {filteredCatalog.map((fragrance) => {
                    const stock = stockCounts[fragrance.id] ?? 80;
                    const isLowStock = stock < 50;
                    return (
                      <tr key={fragrance.id} className="hover:bg-[#FBF9F5]/80 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 rounded-lg bg-[#FBF9F5] p-1 flex items-center justify-center border border-[#253D32]/10 shrink-0">
                              <img
                                src={fragrance.imageUrl}
                                alt={fragrance.name}
                                className="max-h-full w-auto object-contain"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                            </div>
                            <div>
                              <span className="font-bold text-sm text-[#253D32] block">
                                {fragrance.name}
                              </span>
                              <span className="text-[10px] text-[#607168] italic block">
                                {fragrance.subtitle}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#F4EFE6] text-[#253D32] text-[10px] font-semibold">
                            {fragrance.family}
                          </span>
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setStockCounts((prev) => ({
                                  ...prev,
                                  [fragrance.id]: Math.max(0, (prev[fragrance.id] ?? 80) - 10),
                                }))
                              }
                              className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span
                              className={`font-bold text-xs ${
                                isLowStock ? "text-red-600 bg-red-50 px-1.5 py-0.5 rounded" : "text-[#253D32]"
                              }`}
                            >
                              {stock} cxs
                            </span>
                            <button
                              onClick={() =>
                                setStockCounts((prev) => ({
                                  ...prev,
                                  [fragrance.id]: (prev[fragrance.id] ?? 80) + 10,
                                }))
                              }
                              className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Toggle Bestseller */}
                        <td className="p-3">
                          <button
                            onClick={() => handleToggleBestseller(fragrance.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              fragrance.isBestseller
                                ? "bg-[#C29D59] text-white shadow-2xs"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                          >
                            <Flame className="w-3 h-3" />
                            <span>{fragrance.isBestseller ? "Ativo no Topo" : "Inativo"}</span>
                          </button>
                        </td>

                        {/* Toggle New Arrival */}
                        <td className="p-3">
                          <button
                            onClick={() => handleToggleNewArrival(fragrance.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              fragrance.isNewArrival
                                ? "bg-[#588157] text-white shadow-2xs"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>{fragrance.isNewArrival ? "Em Lançamentos" : "Inativo"}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => openEditProductModal(fragrance)}
                              className="p-1.5 rounded-lg bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-800 transition-colors cursor-pointer"
                              title="Editar Detalhes"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(fragrance.id, fragrance.name)}
                              className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-700 transition-colors cursor-pointer"
                              title="Excluir Produto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
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

        {/* ----------------------------------------------------
            TAB 5: LEADS DE ATACADO (WHOLESALE)
        ---------------------------------------------------- */}
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

        {/* ----------------------------------------------------
            TAB 6: CONFIGURAÇÕES & SENHA DE ACESSO
        ---------------------------------------------------- */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-4xl">
            {/* Card 1: Alteração de Senha */}
            <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#253D32] font-display font-bold text-base">
                <KeyRound className="w-5 h-5 text-[#C29D59]" />
                <span>Segurança: Alterar Senha do Painel Admin</span>
              </div>
              <p className="text-xs text-[#607168]">
                Altere a senha de acesso para manter seu painel de vendas e dados de clientes protegidos.
              </p>

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md pt-1">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-[#253D32]">Nova Senha</label>
                  <input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#253D32]/15 bg-[#FBF9F5] focus:outline-none focus:border-[#C29D59]"
                    required
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-[#253D32]">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="Repita a nova senha"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#253D32]/15 bg-[#FBF9F5] focus:outline-none focus:border-[#C29D59]"
                    required
                  />
                </div>

                {passwordUpdateSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Senha atualizada com sucesso no seu navegador!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#253D32] text-white font-bold text-xs shadow-xs hover:bg-[#1C3027] transition-all cursor-pointer"
                >
                  Salvar Nova Senha
                </button>
              </form>
            </div>

            {/* Card 2: Regras Comerciais da Loja */}
            <div className="bg-white rounded-2xl p-6 border border-[#253D32]/10 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-display font-bold text-[#253D32]">
                  Gatilhos Comerciais Ativos na Loja Virtual
                </h3>
                <p className="text-xs text-[#607168]">
                  Políticas automáticas calculadas dinamicamente no carrinho
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
          </div>
        )}
      </div>

      {/* ----------------------------------------------------
          MODAL: ADICIONAR / EDITAR PRODUTO NO CATÁLOGO
      ---------------------------------------------------- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#253D32]/10 space-y-6 my-8 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#253D32]/10 pb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-[#253D32]">
                  {editingProduct ? `Editar Incenso: ${editingProduct.name}` : "Cadastrar Novo Incenso Mathura"}
                </h3>
                <p className="text-xs text-[#607168]">
                  Preencha as características olfativas e propriedades botânicas
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#253D32]">Nome do Produto *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Ex: Mirra Sagrada"
                    className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5] focus:outline-none focus:border-[#C29D59]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#253D32]">Subtítulo / Nome Botânico</label>
                  <input
                    type="text"
                    value={productForm.subtitle}
                    onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                    placeholder="Ex: Commiphora myrrha Pura"
                    className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5] focus:outline-none focus:border-[#C29D59]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#253D32]">Família Olfativa</label>
                  <select
                    value={productForm.family}
                    onChange={(e) => setProductForm({ ...productForm, family: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5] text-[#253D32]"
                  >
                    <option value="Amadeirado">Amadeirado</option>
                    <option value="Resinoso">Resinoso</option>
                    <option value="Herbal & Fresco">Herbal & Fresco</option>
                    <option value="Floral & Calmo">Floral & Calmo</option>
                    <option value="Especiado & Quente">Especiado & Quente</option>
                    <option value="Frutado & Doce">Frutado & Doce</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#253D32]">Tempo de Queima</label>
                  <input
                    type="text"
                    value={productForm.burnTime}
                    onChange={(e) => setProductForm({ ...productForm, burnTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#253D32]">Estoque Inicial (caixas)</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#253D32]">Benefícios (separados por vírgula)</label>
                <input
                  type="text"
                  value={productForm.benefitsText}
                  onChange={(e) => setProductForm({ ...productForm, benefitsText: e.target.value })}
                  placeholder="Ex: Limpeza energética, Foco para meditação, Sono tranquilo"
                  className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#253D32]">Descrição Acolhedora</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Descreva a sensação olfativa e os benefícios no ambiente..."
                  className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#253D32]">Notas Olfativas</label>
                  <input
                    type="text"
                    value={productForm.notes}
                    onChange={(e) => setProductForm({ ...productForm, notes: e.target.value })}
                    placeholder="Ex: Resinas ambaradas, notas secas e canforadas"
                    className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#253D32]">URL da Imagem</label>
                  <input
                    type="text"
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    placeholder="/produtos/Alecrim.png"
                    className="w-full px-3 py-2 rounded-xl border border-[#253D32]/15 bg-[#FBF9F5]"
                  />
                </div>
              </div>

              {/* Seções em que o produto vai aparecer */}
              <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#253D32]/10 space-y-2">
                <span className="font-bold text-[#253D32] block">Destacar nas Seções da Loja:</span>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isBestseller}
                      onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                      className="w-4 h-4 rounded text-[#253D32]"
                    />
                    <span className="font-semibold text-[#253D32]">Marcar como "Mais Vendido" (Bestseller)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isNewArrival}
                      onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                      className="w-4 h-4 rounded text-[#253D32]"
                    />
                    <span className="font-semibold text-[#253D32]">Marcar como "Lançamento" (New Arrival)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#253D32]/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#253D32]/15 text-[#607168] hover:text-[#253D32] font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#253D32] text-white font-bold shadow-sm hover:bg-[#1C3027] transition-all cursor-pointer"
                >
                  Salvar Incenso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
