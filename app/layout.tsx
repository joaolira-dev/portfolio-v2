import type { Metadata } from "next";
import "./globals.css";

const productionHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  "joaoliradev-portfolio.vercel.app";
const siteUrl = `https://${productionHost}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "João Victor Lira — Desenvolvedor Full Stack",
  description:
    "Portfólio de João Victor Lira, desenvolvedor Full Stack especializado em React, Spring Boot e APIs escaláveis.",
  keywords: [
    "João Victor Lira",
    "Desenvolvedor Full Stack",
    "React",
    "Spring Boot",
    "Java",
    "João Pessoa",
  ],
  authors: [{ name: "João Victor Lira" }],
  openGraph: {
    title: "João Victor Lira — Full Stack Developer",
    description: "Interfaces precisas. Sistemas escaláveis. Experiências que orbitam ideias.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: siteUrl,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "João Victor Lira - Desenvolvedor Full Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "João Victor Lira — Full Stack Developer",
    description: "React, Spring Boot e APIs escaláveis.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon-gengar.png?v=4", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon-gengar.png?v=4",
    apple: "/apple-touch-icon.png?v=4",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-gengar.png?v=4" type="image/png" sizes="512x512" />
        <link rel="shortcut icon" href="/favicon-gengar.png?v=4" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4" sizes="180x180" />
      </head>
      <body>{children}</body>
    </html>
  );
}
