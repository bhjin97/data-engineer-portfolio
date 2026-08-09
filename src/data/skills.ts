import type { SkillGroup } from "@/types/profile";

const badge = (label: string, color: string, logo?: string, logoColor = "white") => {
  const logoQuery = logo ? `&logo=${logo}&logoColor=${logoColor}` : "";

  return `https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=flat${logoQuery}`;
};

export const skills: SkillGroup[] = [
  {
    category: "Language & Data",
    items: [
      { name: "Python", badgeUrl: badge("Python", "3776AB", "python") },
      { name: "SQL", badgeUrl: badge("SQL", "147EBA") },
    ],
  },
  {
    category: "Data Processing",
    items: [
      { name: "Pandas", badgeUrl: badge("Pandas", "150458", "pandas") },
      { name: "Apache Kafka", badgeUrl: badge("Apache Kafka", "231F20", "apachekafka") },
      { name: "Apache Spark", badgeUrl: badge("Apache Spark", "E25A1C", "apachespark") },
    ],
  },
  {
    category: "Orchestration",
    items: [{ name: "Apache Airflow", badgeUrl: badge("Apache Airflow", "017CEE", "apacheairflow") }],
  },
  {
    category: "Storage & Database",
    items: [
      { name: "PostgreSQL", badgeUrl: badge("PostgreSQL", "4169E1", "postgresql") },
      { name: "MinIO", badgeUrl: badge("MinIO", "C72E49", "minio") },
      { name: "Redis", badgeUrl: badge("Redis", "DC382D", "redis") },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Docker", badgeUrl: badge("Docker", "2496ED", "docker") },
      { name: "Linux", badgeUrl: badge("Linux", "333333", "linux", "FCC624") },
    ],
  },
  {
    category: "Monitoring & BI",
    items: [
      { name: "Grafana", badgeUrl: badge("Grafana", "F46800", "grafana") },
      { name: "Metabase", badgeUrl: badge("Metabase", "509EE3", "metabase") },
    ],
  },
];
