import type { Metadata } from "next";
import "./globals.css";
import "./cinematic.css";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "joaoliradev-portfolio.vercel.app";
const siteUrl = `https://${productionHost}`;
const title = "João Lira | Sites, sistemas e integrações sob medida";
const description = "João Lira é desenvolvedor full-stack especializado em landing pages, aplicações web, APIs e integrações. Solicite um orçamento para seu projeto.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  keywords: [
    "desenvolvedor full-stack",
    "desenvolvimento de landing page",
    "desenvolvimento de sistemas web",
    "APIs e integrações",
    "freelancer desenvolvimento web",
    "João Lira",
  ],
  authors: [{ name: "João Victor Lira", url: siteUrl }],
  creator: "João Victor Lira",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "João Lira — Desenvolvimento Web",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "João Lira — sites, sistemas e integrações sob medida" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon-gengar.png?v=4", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon-gengar.png?v=4",
    apple: "/apple-touch-icon.png?v=4",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "João Victor Lira",
      url: siteUrl,
      image: `${siteUrl}/profile.webp`,
      jobTitle: "Desenvolvedor Full Stack",
      address: { "@type": "PostalAddress", addressLocality: "João Pessoa", addressRegion: "PB", addressCountry: "BR" },
      sameAs: ["https://github.com/joaolira-dev", "https://www.linkedin.com/in/joaolira-dev"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "João Lira — Desenvolvimento Web",
      url: siteUrl,
      description,
      image: `${siteUrl}/og.png`,
      areaServed: { "@type": "Country", name: "Brasil" },
      provider: { "@id": `${siteUrl}/#person` },
      serviceType: ["Landing pages", "Sites institucionais", "Sistemas web", "APIs e integrações"],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
