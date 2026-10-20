import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Chúc mừng 20/10 Hiền ơi 🌸",
  description: "Một món quà nhỏ dành tặng Hiền nhân Ngày Phụ nữ Việt Nam 20/10",
  openGraph: {
    title: "Chúc mừng 20/10 Hiền ơi 🌸",
    description: "Một món quà nhỏ dành tặng Hiền nhân Ngày Phụ nữ Việt Nam 20/10",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${playfair.variable} ${dancing.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
