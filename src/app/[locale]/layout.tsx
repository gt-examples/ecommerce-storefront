import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GTProvider, T } from "gt-next";
import { getLocale } from "gt-next/server";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const titles: Record<string, string> = {
    en: "Storefront | GT E-commerce Demo",
    es: "Tienda | Demostración de comercio electrónico GT",
    fr: "Boutique | Démo e-commerce GT",
    ja: "ストアフロント | GT Eコマースデモ",
    zh: "店面 | GT 电子商务演示",
  };
  const descriptions: Record<string, string> = {
    en: "Multilingual e-commerce storefront demonstrating GT internationalization with locale-aware pricing, pluralized counts, and stock status branching.",
    es: "Tienda de comercio electrónico multilingüe que demuestra la internacionalización de GT con precios según la configuración regional, conteos pluralizados y ramificación de estado de stock.",
    fr: "Vitrine e-commerce multilingue démontrant l'internationalisation GT avec tarification adaptée à la locale, comptages pluralisés et branchement de statut de stock.",
    ja: "ロケール対応の価格設定、複数形カウント、在庫状況の分岐を備えたGT国際化を実演する多言語ECストアフロント。",
    zh: "多语言电子商务店面，展示GT国际化功能，包括区域感知定价、复数计数和库存状态分支。",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      locale,
    },
    alternates: {
      languages: {
        en: "/en",
        es: "/es",
        fr: "/fr",
        ja: "/ja",
        zh: "/zh",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} antialiased`}>
        <GTProvider>
          <div className="bg-blue-950 border-b border-blue-900">
            <div className="max-w-5xl mx-auto px-6 py-2 text-center">
              <p className="text-xs text-blue-300">
                <T>
                  This is a demo application built with{" "}
                  <a
                    href="https://generaltranslation.com"
                    className="underline hover:text-blue-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    General Translation
                  </a>{" "}
                  to showcase multilingual e-commerce features. Not a real store.
                </T>
              </p>
            </div>
          </div>
          <Header />
          {children}
        </GTProvider>
      </body>
    </html>
  );
}
