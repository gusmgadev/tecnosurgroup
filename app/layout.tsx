import type { Metadata } from "next";
import { theme } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(theme.seo.url),
  title: {
    default:  theme.seo.title,
    template: `%s | Tecnosur Group`,
  },
  description: theme.seo.description,
  keywords:    theme.seo.keywords,
  authors:     [{ name: "Tecnosur Group", url: theme.seo.url }],
  creator:     "Tecnosur Group",
  publisher:   "Tecnosur Group",
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:                true,
      follow:               true,
      "max-image-preview":  "large",
      "max-snippet":        -1,
    },
  },
  openGraph: {
    type:        "website",
    url:         theme.seo.url,
    title:       theme.seo.title,
    description: theme.seo.description,
    siteName:    "Tecnosur Group",
    locale:      theme.seo.locale,
    images: [
      {
        url:    theme.seo.ogImage,
        width:  1200,
        height: 630,
        alt:    "Tecnosur Group — Montaje de Hidrogrúas en Patagonia",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       theme.seo.title,
    description: theme.seo.description,
    images:      [theme.seo.ogImage],
  },
  alternates: {
    canonical: theme.seo.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased" style={{ scrollPaddingTop: '100px' }}>
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
