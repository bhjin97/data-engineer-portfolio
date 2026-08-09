import type { SkillGroup } from "@/types/profile";

export const skills: SkillGroup[] = [
  {
    category: "Language & Data",
    items: ["Python", "SQL", "PySpark", "Pandas"],
  },
  {
    category: "Data Processing",
    items: ["Apache Kafka", "Apache Spark", "Spark Structured Streaming"],
  },
  {
    category: "Orchestration",
    items: ["Apache Airflow"],
  },
  {
    category: "Storage & Database",
    items: ["PostgreSQL", "MinIO", "Redis"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Linux"],
  },
  {
    category: "Monitoring & BI",
    items: ["Grafana", "Metabase"],
  },
];
