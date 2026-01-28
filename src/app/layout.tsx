import type { Metadata } from "next";
import "./globals.css";

/**
 * ICA Knowledge Center - Root Layout
 *
 * CRITICAL: This layout sets dir="rtl" on the <html> element
 * All child components will inherit RTL text direction
 */

export const metadata: Metadata = {
  title: "מרכז הידע | ICA",
  description: "מרכז הידע והכלים של ICA - תשובות, תכנים וכלים מקצועיים למטפלים ומטפלות",
  keywords: ["ICA", "התמכרויות", "מרכז ידע", "מטפלים", "כלים מקצועיים"],
  authors: [{ name: "ICA Israel" }],
  openGraph: {
    title: "מרכז הידע | ICA",
    description: "תשובות, תכנים וכלים מקצועיים — במעבר מהיר מצורך לפעולה",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-white text-ica-primary antialiased">
        {children}
      </body>
    </html>
  );
}
