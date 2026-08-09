import type { Education } from "@/types/profile";

export const education: Education[] = [
  {
    name: "MetaCode 데이터 엔지니어 부트캠프",
    period: "2026.01.23 — 2026.05.16",
    subject: "데이터 엔지니어링",
    description: "데이터 엔지니어링 과정",
    project: {
      name: "E-Commerce Hybrid Data Pipeline",
      href: "/projects/meta-pipeline",
    },
  },
  {
    name: "LG U+ Why Not SW Camp",
    period: "2025.05.13 — 2025.11.21",
    hours: "1,040시간",
    subject: "클라우드 기반 데이터 분석 및 서비스 개발",
    description: "클라우드 기반 데이터 분석 및 서비스 개발 과정",
    project: {
      name: "Aller",
    },
  },
];
