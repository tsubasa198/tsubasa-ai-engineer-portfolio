import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-jp";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tsubasa's Portfolio | AI Engineer / FDE",
  description:
    "業務改善では終わらない。現場の『こうだったらいいのに』をプロダクトとして実現する。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
