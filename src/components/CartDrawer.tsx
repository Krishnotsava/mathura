"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import {
  X,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  QrCode,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Truck,
  Flame,
  Award,
} from "lucide-react";
import confetti from "canvas-confetti";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeCartItem, cartTotal } = useCart();

  const [step, setStep] = useState<"review" | "checkout" | "success">("review");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Countdown timer for inventory reservation
  const [secondsLeft, setSecondsLeft] = useState(14 * 60 + 59); // 14m 59s
  useEffect(() => {
    if (!isCartOpen) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isCartOpen]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (!isCartOpen) return null;

  // Free shipping calculation (above R$ 100)
  const freeShippingGoal = 100.0;
  const hasFreeShipping = cartTotal >= freeShippingGoal;
  const missingForFreeShipping = Math.max(0, freeShippingGoal - cartTotal);
  const freeShippingPercent = Math.min(100, (cartTotal / freeShippingGoal) * 100);

  // Payment calculations
  const pixDiscountPrice = cartTotal * 0.95; // 5% discount
  const installmentValue = cartTotal > 0 ? cartTotal / 6 : 0; // 6x without interest

  const handleFinishPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#253D32", "#C29D59", "#B86B53", "#588157"],
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(
    `Olá Mathura! Acabei de fazer um pedido no site no valor de R$ ${cartTotal.toFixed(2)} (${customerName || "Cliente Mathura"}). Gostaria de acompanhar o envio!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs animate-fade-in flex justify-end">
      <div className="w-full max-w-lg bg-[#FBF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#253D32]/15 animate-slide-left">
        {/* Scarcity Countdown Header */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 flex items-center justify-between font-medium">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Estoque e ofertas reservados por:</span>
          </div>
          <span className="font-mono font-bold bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded shadow-2xs">
            {formattedTime}
          </span>
        </div>

        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#253D32]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#253D32] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#C29D59]" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-[#253D32]">
                Sua Sacola de Compras
              </h3>
              <span className="text-xs text-[#607168]">
                {cartItems.length === 0 ? "Vazia" : `${cartItems.length} item(ns) selecionado(s)`}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setStep("review");
            }}
            className="p-2 rounded-full hover:bg-[#F4EFE6] text-[#607168] hover:text-[#253D32] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Free Shipping Progress Bar (Target R$ 100) */}
        {cartItems.length > 0 && step !== "success" && (
          <div className="px-6 pt-4">
            <div className="p-3.5 rounded-2xl bg-white border border-[#253D32]/10 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                {hasFreeShipping ? (
                  <span className="font-bold text-[#588157] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#588157]" />
                    🎉 Parabéns! Você ganhou FRETE GRÁTIS!
                  </span>
                ) : (
                  <span className="font-semibold text-[#253D32] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#C29D59]" />
                    Falta apenas <strong className="text-[#B86B53]">R$ {missingForFreeShipping.toFixed(2).replace(".", ",")}</strong> para FRETE GRÁTIS
                  </span>
                )}
                <span className="text-[11px] font-bold text-[#607168]">
                  {freeShippingPercent.toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#EAE5DA] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    hasFreeShipping
                      ? "bg-[#588157]"
                      : "bg-linear-to-r from-[#C29D59] to-[#588157]"
                  }`}
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#253D32] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 text-[#C29D59]" />
              </div>
              <p className="text-base font-semibold text-[#253D32]">
                Sua sacola ainda está vazia
              </p>
              <p className="text-xs text-[#607168] max-w-xs mx-auto">
                Selecione um dos nossos Kits Prontos ou monte seu pack livre personalizado com o mínimo de 5 caixinhas.
              </p>
            </div>
          ) : step === "review" ? (
            /* Review Step */
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-[#253D32]/10 shadow-2xs relative"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-[#253D32]">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-[#607168] hover:text-[#B86B53] transition-colors p-1"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.treatmentInfo && (
                    <p className="text-xs text-[#588157] font-medium mb-2">
                      🌿 {item.treatmentInfo.tagline}
                    </p>
                  )}

                  {/* Fragrance breakdown with photo thumbnails */}
                  <div className="space-y-2 my-3 pt-2 border-t border-[#253D32]/5">
                    {item.items.map((entry, idx) => (
                      <div
                        key={idx}
                        className="text-xs flex items-center justify-between gap-2 text-[#253D32]/80"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={entry.fragrance.imageUrl}
                            alt={entry.fragrance.name}
                            className="w-6 h-8 object-contain shrink-0"
                          />
                          <span className="truncate">
                            {entry.fragrance.name}
                          </span>
                        </div>
                        <span className="font-semibold text-[#607168] shrink-0">
                          {entry.quantity} {entry.quantity === 1 ? "cx" : "cxs"} ({entry.quantity * 10} varetas)
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#253D32]/5 flex items-center justify-between">
                    <span className="text-xs text-[#607168]">
                      Total de queima: ~{item.packSize * 10} horas
                    </span>
                    <span className="text-base font-bold text-[#253D32]">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              ))}

              {/* Authority Badge */}
              <div className="p-3 rounded-xl bg-white border border-[#253D32]/10 flex items-center gap-2.5 text-xs text-[#253D32]">
                <Award className="w-4 h-4 text-[#C29D59] shrink-0" />
                <span>
                  <strong>Tradição Mathura:</strong> Há mais de 30 anos no mercado produzindo incensos botânicos puros.
                </span>
              </div>
            </div>
          ) : step === "checkout" ? (
            /* Checkout Step */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#253D32]/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#253D32]">
                  Dados para Confirmação & Rastreio
                </h4>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Seu Nome Completo"
                  className="w-full bg-white rounded-xl border border-[#253D32]/15 px-3.5 py-2 text-xs text-[#253D32] focus:outline-none focus:border-[#C29D59]"
                />
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Seu E-mail (para envio da nota e rastreio)"
                  className="w-full bg-white rounded-xl border border-[#253D32]/15 px-3.5 py-2 text-xs text-[#253D32] focus:outline-none focus:border-[#C29D59]"
                />
                <input
                  type="tel"
                  value={customerWhatsapp}
                  onChange={(e) => setCustomerWhatsapp(e.target.value)}
                  placeholder="Seu WhatsApp com DDD (status do envio)"
                  className="w-full bg-white rounded-xl border border-[#253D32]/15 px-3.5 py-2 text-xs text-[#253D32] focus:outline-none focus:border-[#C29D59]"
                />
              </div>

              {/* Payment selector */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#253D32] mb-2.5">
                  Escolha a Forma de Pagamento:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === "pix"
                        ? "bg-[#253D32] text-white border-[#253D32] shadow-sm"
                        : "bg-white text-[#253D32] border-[#253D32]/15 hover:bg-[#F4EFE6]"
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-[#C29D59]" />
                    <span className="block text-xs font-bold">PIX (5% OFF)</span>
                    <span className="block text-[10px] text-[#588157] font-semibold">
                      R$ {pixDiscountPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-[#253D32] text-white border-[#253D32] shadow-sm"
                        : "bg-white text-[#253D32] border-[#253D32]/15 hover:bg-[#F4EFE6]"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#C29D59]" />
                    <span className="block text-xs font-bold">Cartão de Crédito</span>
                    <span className="block text-[10px] text-white/80">
                      Até 6x de R$ {installmentValue.toFixed(2).replace(".", ",")}
                    </span>
                  </button>
                </div>
              </div>

              {paymentMethod === "pix" ? (
                <div className="p-4 rounded-2xl bg-white border border-[#253D32]/10 text-center space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#588157]/15 text-[#588157] font-bold text-xs">
                    Economize R$ {(cartTotal * 0.05).toFixed(2).replace(".", ",")} pagando no PIX
                  </span>
                  <p className="text-xs text-[#253D32]">
                    O QR Code e a chave <strong>Copia e Cola</strong> serão exibidos logo após clicar em Concluir Pedido.
                  </p>
                  <span className="inline-block text-[11px] font-bold text-[#588157]">
                    ✓ Confirmação instantânea sem espera
                  </span>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white border border-[#253D32]/10 space-y-2.5">
                  <div className="flex justify-between items-center text-xs pb-1 border-b border-[#253D32]/10">
                    <span className="text-[#607168]">Parcelamento:</span>
                    <strong className="text-[#253D32]">Até 6x sem juros no cartão</strong>
                  </div>
                  <input
                    type="text"
                    placeholder="Número do Cartão"
                    className="w-full bg-[#FBF9F5] rounded-xl border border-[#253D32]/15 px-3 py-2 text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Validade (MM/AA)"
                      className="bg-[#FBF9F5] rounded-xl border border-[#253D32]/15 px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="bg-[#FBF9F5] rounded-xl border border-[#253D32]/15 px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Success Step */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#588157]/20 text-[#588157] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-display font-bold text-[#253D32]">
                Pedido Confirmado com Sucesso!
              </h4>
              <p className="text-xs text-[#607168] max-w-sm mx-auto leading-relaxed">
                Seus incensos artesanais Mathura já estão sendo embalados com todo o cuidado e pureza botânica. Enviamos a confirmação para o seu e-mail.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#253D32]/10 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#607168]">Número do Pedido:</span>
                  <strong className="text-[#253D32]">#MTH-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607168]">Previsão de Despacho:</span>
                  <strong className="text-[#253D32]">Em até 24 horas úteis</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607168]">Frete:</span>
                  <strong className="text-[#588157]">
                    {hasFreeShipping ? "Grátis para Todo o Brasil" : "Envio Seguro com Rastreio"}
                  </strong>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-md hover:bg-[#20bd5a] transition-all"
              >
                Acompanhar Pedido pelo WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && step !== "success" && (
          <div className="p-5 sm:p-6 border-t border-[#253D32]/10 bg-white/80 backdrop-blur-xs space-y-3.5">
            {/* Payment Highlights Box */}
            <div className="bg-[#F4EFE6]/70 p-3 rounded-xl border border-[#253D32]/10 space-y-1 text-xs">
              <div className="flex justify-between items-center text-[#253D32]">
                <span className="font-semibold text-xs flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-[#C29D59]" /> No PIX (5% de desconto):
                </span>
                <strong className="text-sm text-[#588157]">
                  R$ {pixDiscountPrice.toFixed(2).replace(".", ",")}
                </strong>
              </div>
              <div className="flex justify-between items-center text-[#607168] text-[11px] pt-1 border-t border-[#253D32]/5">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-[#C29D59]" /> No cartão de crédito:
                </span>
                <span>
                  em até <strong>6x de R$ {installmentValue.toFixed(2).replace(".", ",")}</strong> sem juros
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#607168]">
                <span>Subtotal dos Produtos:</span>
                <span>R$ {cartTotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-[#607168]">Frete:</span>
                <span className={hasFreeShipping ? "text-[#588157]" : "text-[#C29D59]"}>
                  {hasFreeShipping ? "GRÁTIS" : "Calculado no próximo passo"}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#253D32] pt-2 border-t border-[#253D32]/10">
                <span>Total:</span>
                <span>R$ {cartTotal.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>

            {step === "review" ? (
              <button
                onClick={() => setStep("checkout")}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-[#253D32] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#1C3027] transition-all cursor-pointer"
              >
                <span>Avançar para Pagamento Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setStep("review")}
                  className="py-3.5 px-4 rounded-full bg-[#F4EFE6] text-[#253D32] text-xs font-semibold hover:bg-white transition-all cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  onClick={handleFinishPurchase}
                  disabled={isProcessing}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#253D32] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#1C3027] transition-all cursor-pointer"
                >
                  {isProcessing
                    ? "Processando..."
                    : paymentMethod === "pix"
                    ? `Pagar com PIX (R$ ${pixDiscountPrice.toFixed(2).replace(".", ",")})`
                    : `Concluir Pedido (6x de R$ ${installmentValue.toFixed(2).replace(".", ",")})`}
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#607168]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#588157]" />
              Checkout Seguro • Criptografia 256-bit • Mais de 30 Anos de Mercado
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
