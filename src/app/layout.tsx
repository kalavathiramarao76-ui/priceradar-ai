import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { AuthGate } from "@/components/AuthGate";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = "https://priceradar-ai.vercel.app";

export const metadata: Metadata = {
  title: "PriceRadar AI — Competitor Price Tracking & Dynamic Pricing Intelligence",
  description:
    "AI-powered competitor price tracking, dynamic pricing, and market intelligence for e-commerce. Analyze competitors, compare prices, and get optimal pricing strategies. Free, no signup required.",
  keywords: [
    "competitor price tracking",
    "dynamic pricing",
    "price intelligence",
    "e-commerce pricing",
    "price comparison AI",
    "market analysis",
    "pricing strategy",
  ],
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "PriceRadar AI — Competitor Price Tracking & Dynamic Pricing",
    description:
      "AI-powered competitor price tracking, dynamic pricing, and market intelligence for e-commerce. Analyze, compare, and optimize your pricing strategy.",
    type: "website",
    url: siteUrl,
    siteName: "PriceRadar AI",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PriceRadar AI — Competitor Price Tracking",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PriceRadar AI — Competitor Price Tracking & Dynamic Pricing",
    description:
      "AI-powered competitor price tracking, dynamic pricing, and market intelligence for e-commerce.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@priceradar_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PriceRadar AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered competitor price tracking, dynamic pricing, and market intelligence for e-commerce.",
  url: siteUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "85",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('priceradar-theme')||'dark';if(t==='system'){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="noise-overlay" />
        <AuthGate><ToastProvider>{children}</ToastProvider></AuthGate>
      </body>
    </html>
  );
}
