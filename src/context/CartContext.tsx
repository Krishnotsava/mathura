"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Fragrance,
  FRAGRANCES,
  PACK_PRESETS,
  PackOptionPreset,
  TreatmentPack,
  calculateDynamicPackPrice,
} from "@/data/fragrances";

export interface CartItem {
  id: string;
  type: "custom-pack" | "treatment-pack";
  title: string;
  packSize: number;
  items: { fragrance: Fragrance; quantity: number }[];
  price: number;
  unitPrice: number;
  treatmentInfo?: {
    tagline: string;
    frequency: string;
  };
}

interface CartContextType {
  // Current Builder State (Uncapped - Minimum 5)
  packFragranceCounts: Record<string, number>;
  addFragranceToPack: (fragranceId: string) => void;
  removeFragranceFromPack: (fragranceId: string) => void;
  clearCurrentPack: () => void;
  setFragranceCount: (fragranceId: string, count: number) => void;
  
  // Total & Validation
  totalSelectedBoxes: number;
  minBoxesRequired: number;
  remainingToMinimum: number;
  isMinimumReached: boolean;
  
  // Dynamic Pricing for current pack
  currentPricing: {
    total: number;
    unitPrice: number;
    originalTotal: number;
    discountPercent: number;
    freeShipping: boolean;
  };

  // Presets & Target Helper
  targetPresetSize: number | null;
  setTargetPresetSize: (size: number | null) => void;
  applyPresetSuggestion: (size: number) => void;

  // Cart actions
  cartItems: CartItem[];
  addCurrentPackToCart: () => void;
  addTreatmentToCart: (treatment: TreatmentPack) => void;
  removeCartItem: (id: string) => void;
  cartCount: number;
  cartTotal: number;

  // Modals / Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  isWholesaleOpen: boolean;
  setIsWholesaleOpen: (open: boolean) => void;

  // Quick action to load treatment into builder
  loadTreatmentIntoBuilder: (treatment: TreatmentPack) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const minBoxesRequired = 5;
  const [packFragranceCounts, setPackFragranceCounts] = useState<Record<string, number>>({});
  const [targetPresetSize, setTargetPresetSize] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isWholesaleOpen, setIsWholesaleOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mathura_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("mathura_cart", JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const totalSelectedBoxes = Object.values(packFragranceCounts).reduce((a, b) => a + b, 0);
  const isMinimumReached = totalSelectedBoxes >= minBoxesRequired;
  const remainingToMinimum = Math.max(0, minBoxesRequired - totalSelectedBoxes);

  const currentPricing = calculateDynamicPackPrice(totalSelectedBoxes);

  const addFragranceToPack = (fragranceId: string) => {
    setPackFragranceCounts((prev) => ({
      ...prev,
      [fragranceId]: (prev[fragranceId] || 0) + 1,
    }));
  };

  const removeFragranceFromPack = (fragranceId: string) => {
    setPackFragranceCounts((prev) => {
      const current = prev[fragranceId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[fragranceId];
        return copy;
      }
      return { ...prev, [fragranceId]: current - 1 };
    });
  };

  const setFragranceCount = (fragranceId: string, count: number) => {
    setPackFragranceCounts((prev) => {
      const copy = { ...prev };
      if (count <= 0) {
        delete copy[fragranceId];
      } else {
        copy[fragranceId] = count;
      }
      return copy;
    });
  };

  const clearCurrentPack = () => {
    setPackFragranceCounts({});
    setTargetPresetSize(null);
  };

  const applyPresetSuggestion = (size: number) => {
    setTargetPresetSize(size);
    // If empty or less than size, prefill or guide
    if (totalSelectedBoxes === 0) {
      // Pick top fragrances
      const popular = FRAGRANCES.slice(0, size);
      const newCounts: Record<string, number> = {};
      popular.forEach((f) => {
        newCounts[f.id] = 1;
      });
      setPackFragranceCounts(newCounts);
    }
  };

  const addCurrentPackToCart = () => {
    if (!isMinimumReached) return;

    const items = Object.entries(packFragranceCounts)
      .map(([id, quantity]) => {
        const fragrance = FRAGRANCES.find((f) => f.id === id);
        return fragrance ? { fragrance, quantity } : null;
      })
      .filter((item): item is { fragrance: Fragrance; quantity: number } => item !== null);

    const newItem: CartItem = {
      id: `custom-${Date.now()}`,
      type: "custom-pack",
      title: `Pack Personalizado (${totalSelectedBoxes} Caixinhas • ${totalSelectedBoxes * 10} varetas)`,
      packSize: totalSelectedBoxes,
      items,
      price: currentPricing.total,
      unitPrice: currentPricing.unitPrice,
    };

    setCartItems((prev) => [...prev, newItem]);
    clearCurrentPack();
    setIsCartOpen(true);
  };

  const addTreatmentToCart = (treatment: TreatmentPack) => {
    const items = treatment.recommendedFragranceIds
      .map((id) => {
        const fragrance = FRAGRANCES.find((f) => f.id === id);
        return fragrance ? { fragrance, quantity: 1 } : null;
      })
      .filter((item): item is { fragrance: Fragrance; quantity: number } => item !== null);

    const newItem: CartItem = {
      id: `treatment-${treatment.id}-${Date.now()}`,
      type: "treatment-pack",
      title: treatment.title,
      packSize: treatment.packCount,
      items,
      price: treatment.price,
      unitPrice: treatment.price / treatment.packCount,
      treatmentInfo: {
        tagline: treatment.tagline,
        frequency: treatment.prescription.frequency,
      },
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const loadTreatmentIntoBuilder = (treatment: TreatmentPack) => {
    const newCounts: Record<string, number> = {};
    treatment.recommendedFragranceIds.forEach((id) => {
      newCounts[id] = (newCounts[id] || 0) + 1;
    });
    setPackFragranceCounts(newCounts);
    setTargetPresetSize(treatment.packCount);

    // Scroll to pack builder
    const el = document.getElementById("pack-builder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const removeCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.packSize, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        packFragranceCounts,
        addFragranceToPack,
        removeFragranceFromPack,
        clearCurrentPack,
        setFragranceCount,
        totalSelectedBoxes,
        minBoxesRequired,
        remainingToMinimum,
        isMinimumReached,
        currentPricing,
        targetPresetSize,
        setTargetPresetSize,
        applyPresetSuggestion,
        cartItems,
        addCurrentPackToCart,
        addTreatmentToCart,
        removeCartItem,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        isWholesaleOpen,
        setIsWholesaleOpen,
        loadTreatmentIntoBuilder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
