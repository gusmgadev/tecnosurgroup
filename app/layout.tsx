import type { Metadata } from "next";
import { theme } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: `${theme.navbar.cta.text.replace('Contactanos', 'Tecnosur Group')}`,
  description: theme.footer.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
