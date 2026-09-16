import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#253D32",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Mathura | Incensos Naturais & Aromaterapia Consciente",
  description:
    "Incensos artesanais 100% naturais, sem carvão, sem pólvora, madeira de reflorestamento e seguros para animais. Monte seu pack livre ou descubra o aroma ideal para o seu bem-estar.",
  keywords: [
    "incenso natural",
    "aromaterapia",
    "incenso sem carvao",
    "incenso pet friendly",
    "queima lenta 1 hora",
    "reflorestamento",
    "kit de incensos",
    "mathura incensos",
  ],
  authors: [{ name: "Mathura" }],
  openGraph: {
    title: "Mathura | Incensos Naturais & Aromaterapia Consciente",
    description:
      "Artesanais, sem pólvora ou carvão mineral. Rituais e packs personalizados com 1h de queima por vareta.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FBF9F5] text-[#1A221E] font-sans selection:bg-[#253D32]/15 selection:text-[#253D32]">
        {children}
      </body>
    </html>
  );
}
