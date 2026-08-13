import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "배형진 | Data Engineer Portfolio",
  description:
    "Kafka, Spark, Airflow 기반 데이터 파이프라인과 Hybrid RAG 프로젝트를 담은 배형진의 데이터 엔지니어 포트폴리오",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-zinc-50 text-zinc-950">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
