import type { Project } from "@/types/project";
import { allerCaseStudy } from "@/data/aller";

const placeholderDetails = [
  ["overview", "Overview"],
  ["problem-goal", "Problem & Goal"],
  ["architecture", "Architecture"],
  ["core-design", "Core Design"],
  ["performance", "Performance"],
  ["monitoring-operations", "Monitoring & Operations"],
  ["troubleshooting", "Troubleshooting"],
  ["results-lessons", "Results & Lessons"],
] as const;

function createPlaceholderDetails(projectName: string) {
  return placeholderDetails.map(([id, title]) => ({
    id,
    title,
    content: `${projectName}의 확인된 내용을 추후 정리할 예정입니다.`,
  }));
}

export const projects: Project[] = [
  {
    slug: "meta-pipeline",
    title: "E-Commerce Hybrid Data Pipeline",
    subtitle: "Event-Driven Streaming & Batch Data Platform",
    featuredSummary:
      "Kafka와 Spark를 기반으로 실시간 이벤트와 배치 데이터를 통합 처리하고, Bronze–Silver–Gold 계층으로 가공하는 E-Commerce 데이터 파이프라인입니다.",
    summary:
      "주문·배송·리뷰 이벤트를 Kafka와 Spark Structured Streaming으로 실시간 처리하고, Airflow 기반 Spark Batch를 통해 Bronze–Silver–Gold 계층으로 가공하여 PostgreSQL과 Metabase에서 분석할 수 있도록 구축한 하이브리드 데이터 파이프라인입니다.",
    status: "정리 중",
    featured: true,
    featuredOrder: 1,
    projectType: "Personal Project",
    scope: "End-to-End Data Pipeline Design & Implementation",
    scopeDescription:
      "이벤트 생성부터 수집, 실시간·배치 처리, 데이터 레이크 및 데이터 마트 구성, 모니터링과 분석 환경까지 전체 데이터 흐름을 설계·구축",
    features: [
      {
        label: "Event-Driven Streaming",
        reason: "정적 주문 데이터를 시간 흐름 기반 이벤트로 재구성하여 실시간 처리 흐름을 구현",
      },
      {
        label: "Batch Orchestration",
        reason: "Airflow로 배치 실행 순서와 스트리밍 중지·재시작을 하나의 워크플로로 관리",
      },
      {
        label: "Bronze · Silver · Gold",
        reason: "원본 보존, 정제·통합, 분석용 집계를 계층별로 분리",
      },
      {
        label: "Checkpoint Recovery",
        reason: "컨테이너 재시작 시 Kafka Offset과 Spark Checkpoint를 기준으로 미처리 이벤트부터 이어서 처리",
      },
      {
        label: "Monitoring",
        reason: "Redis에 처리 지표를 저장하고 Grafana와 Slack으로 실행 상태를 관찰",
      },
    ],
    metrics: [
      {
        index: "01",
        label: "적재 검증",
        value: "4.5M",
        unit: "EVENTS",
        description: "100만 테스트 주문 기반 Kafka → Spark → MinIO 적재 검증",
      },
      {
        index: "02",
        label: "입력 조건 검증",
        value: "10,000",
        unit: "EPS",
        description: "10,000 EPS 입력 부하에서 Kafka → Spark → MinIO 적재 검증",
      },
      {
        index: "03",
        label: "QUERY",
        value: "19.810 → 0.074 ms",
        description: "PostgreSQL 특정 occupation 조건 조회의 인덱스 적용 전후 실행 시간",
      },
    ],
    coreTechnologies: ["Kafka", "Spark", "Airflow", "MinIO", "PostgreSQL", "Docker"],
    technologies: [
      {
        name: "Kafka",
        reason: "이벤트 생산과 처리를 분리하고 Streaming 중단 상황에서도 이벤트를 보존하기 위해 사용",
        responsibility: "Event ingestion / buffering",
      },
      {
        name: "Spark",
        reason: "Streaming과 Batch를 하나의 처리 엔진으로 구성하고 Checkpoint 기반 복구를 검증하기 위해 사용",
        responsibility: "Streaming & Batch processing",
      },
      {
        name: "Airflow",
        reason: "Batch 실행 순서와 Streaming 중지·재시작을 하나의 Workflow로 관리하기 위해 사용",
        responsibility: "Workflow orchestration",
      },
      {
        name: "MinIO",
        reason: "Raw 데이터를 보존하고 재처리 가능한 Data Lake 계층을 구성하기 위해 사용",
        responsibility: "Bronze / Silver / Gold storage",
      },
      {
        name: "PostgreSQL",
        reason: "Gold Mart를 BI에서 조회할 수 있는 Serving Layer로 사용",
        responsibility: "Analytics serving",
      },
      { name: "Docker" },
      { name: "Redis", responsibility: "Streaming metrics storage" },
      { name: "Grafana", responsibility: "Real-time monitoring" },
      { name: "Prometheus", responsibility: "Infrastructure metrics collection" },
      { name: "Metabase", responsibility: "BI analytics" },
      { name: "Slack", responsibility: "Workflow failure notification" },
    ],
    architecture: {
      flows: [
        {
          label: "Event Streaming",
          steps: ["Python Event Generator", "Kafka", "Spark Structured Streaming", "MinIO Bronze"],
        },
        {
          label: "Streaming Monitoring",
          steps: ["Spark Streaming", "Redis", "Grafana"],
        },
        {
          label: "Batch",
          steps: ["MinIO Bronze", "Spark Batch", "Silver", "Gold", "PostgreSQL", "Metabase"],
        },
      ],
      orchestration: {
        description:
          "Airflow가 제한된 단일 VM 리소스 환경에서 Streaming과 Batch의 리소스 경쟁을 줄이도록 배치 워크플로를 관리",
        sequence: ["Streaming 중지", "Silver 처리", "Validation", "Gold 처리", "Streaming 재시작"],
      },
    },
    dataLayers: [
      {
        name: "Bronze",
        responsibilities: ["Raw 이벤트 및 정적 데이터 보존", "원본 보존", "재처리 기반"],
      },
      {
        name: "Silver",
        responsibilities: ["데이터 정제", "Fact / Dimension 모델링", "Join 기반 통합 데이터 생성"],
      },
      {
        name: "Gold",
        responsibilities: ["KPI Aggregation", "BI Mart 생성"],
      },
    ],
    dataModeling: {
      facts: ["fact_order_item", "fact_delivery", "fact_review"],
      dimensions: ["customer_dim", "product_dim", "seller_dim"],
      serving: ["PostgreSQL", "Metabase"],
    },
    operations: [
      {
        index: "01",
        label: "Streaming Recovery",
        title: "Checkpoint & Offset Recovery",
        description:
          "컨테이너 재시작 시 Spark Checkpoint와 Kafka Offset을 기준으로 미처리 이벤트부터 이어서 처리",
        flows: [{ label: "Resume", steps: ["Kafka Offset", "Spark Checkpoint", "Resume"] }],
      },
      {
        index: "02",
        label: "Resource Strategy",
        title: "Scheduled Resource Control",
        description:
          "제한된 단일 VM에서 매일 새벽 3시 Airflow가 Streaming과 Batch의 실행 시점을 분리해 리소스 경쟁을 완화합니다. 중단 중 이벤트는 Kafka에 보존됩니다.",
        flows: [{ label: "Workflow", steps: ["Streaming Stop", "Silver", "Validation", "Gold", "Streaming Restart"] }],
      },
      {
        index: "03",
        label: "Monitoring",
        title: "Application & Infrastructure Observability",
        description:
          "Redis에 최신·누적 처리 지표를 저장하고 Grafana에서 실시간 처리량 및 누적 건수를 모니터링",
        flows: [
          { label: "Application Metrics", steps: ["Spark Streaming", "Redis", "Grafana"] },
          { label: "Infrastructure Metrics", steps: ["Container / Host", "Prometheus", "Grafana"] },
        ],
      },
      {
        index: "04",
        label: "Workflow Monitoring",
        title: "Workflow Notification",
        description: "Task 실패 시 on_failure_callback으로 Slack 알림을 전송하고 Gold Mart 생성 완료 시 성공 알림을 전송합니다. 메시지에는 DAG ID, Task ID, Execution Date, Log URL을 포함합니다.",
        flows: [
          { label: "Failure Alert", steps: ["Airflow Task Failure", "on_failure_callback", "Slack"] },
          { label: "Success Notification", steps: ["build_gold_marts Success", "Slack"] },
        ],
      },
    ],
    troubleshooting: [
      {
        index: "01",
        title: "Streaming Query 반복 재시작",
        problem:
          "Streaming Query가 정상 종료되기 전에 컨테이너가 반복 재시작되고 메모리 사용량과 여러 Driver 지표가 중첩됨",
        cause: "dropDuplicates State Store와 Checkpoint 상태 불일치",
        decision: "Raw Streaming 단계에서 중복 제거 상태를 유지하지 않도록 처리 위치를 조정",
        solution: "Raw Streaming 단계의 dropDuplicates 제거 및 Checkpoint 분리",
        result: "재시작 이후 Streaming 실행 상태와 모니터링 지표 안정화",
        comparison: {
          before: {
            src: "/projects/meta-pipeline/troubleshooting-before.png",
            alt: "Streaming Query 문제 해결 전 Grafana 모니터링",
            label: "Troubleshooting Before",
          },
          after: {
            src: "/projects/meta-pipeline/troubleshooting-after.png",
            alt: "Streaming Query 문제 해결 후 Grafana 모니터링",
            label: "Troubleshooting After",
          },
        },
      },
      {
        index: "02",
        title: "단일 VM 리소스 부족과 서비스 불안정",
        problem:
          "단일 VM에서 Spark Streaming과 Batch, Metabase 등의 서비스를 함께 실행하면서 메모리 사용량이 증가하고 일부 서비스가 불안정해지거나 종료됨",
        cause:
          "Streaming과 Batch가 Spark 자원을 동시에 사용하고 BI·Monitoring 도구까지 동일 서버의 CPU와 Memory를 공유",
        decision:
          "근본 해결은 Airflow로 Streaming과 Batch 실행 시점을 분리하는 것으로 정하고, 8GB SWAP은 순간적인 Memory Peak에 대한 보조 안전장치로만 구성",
        solution: "Streaming Stop → Batch → Streaming Restart 순서로 리소스 경쟁 완화",
        result:
          "Batch 자원을 확보하면서 Streaming 재시작 후 Kafka와 Checkpoint를 통해 미처리 이벤트를 이어서 처리하는 운영 구조 구성",
      },
      {
        index: "03",
        title: "실시간 처리 지표 누락",
        problem: "데이터는 적재되고 있었지만 Grafana의 일부 실시간 처리 지표가 기대대로 집계되지 않음",
        cause: "과거 시점의 event_time을 Monitoring Window 기준으로 사용해 현재 처리 시점과 시간 기준이 불일치",
        decision: "모니터링 목적의 처리량 계산 기준을 Event Time에서 Processing Time으로 변경",
        solution: "실제 시스템 처리 시점을 기준으로 Monitoring Window 재구성",
        result: "현재 Streaming 처리량이 Grafana에서 정상 집계됨",
      },
    ],
    caseStudy: {
      problem: [
        "Olist 데이터셋은 주문·배송·리뷰 결과가 정적인 형태로 저장되어 있어 실제 서비스에서 발생하는 이벤트의 시간 흐름과 실시간·배치 처리 구조를 그대로 경험하기 어렵습니다.",
        "단순 CSV 배치 가공을 넘어 이벤트 생성부터 수집, 처리, 저장, 분석, 모니터링까지 연결된 데이터 플랫폼을 구현하고자 했습니다.",
      ],
      goal:
        "정적 이커머스 데이터를 주문·배송·리뷰 이벤트로 재구성하고, 원본 보존과 재처리·복구·자원 제어·모니터링·BI Serving을 포함한 End-to-End 데이터 흐름을 검증합니다.",
      goalItems: [
        { label: "Event-Driven", description: "정적 데이터를 시간 흐름 기반 이벤트로 재구성" },
        { label: "Hybrid Pipeline", description: "Streaming과 Batch를 하나의 데이터 흐름으로 연결" },
        { label: "Operability", description: "재처리·복구·모니터링을 고려한 운영 구조 구현" },
      ],
      dataFlowDescription: [
        "주문·배송·리뷰 이벤트를 Kafka로 수집하고 Spark Structured Streaming으로 처리해 MinIO Bronze에 원본 형태로 저장합니다. 처리 지표는 Redis에 기록해 Grafana에서 모니터링합니다.",
        "Airflow가 Spark Batch Workflow를 실행해 Bronze를 Silver와 Gold로 가공하고, 최종 분석 결과를 PostgreSQL과 Metabase로 제공합니다.",
      ],
      architectureImage: {
        src: "/projects/meta-pipeline/architecture.png",
        alt: "E-Commerce Hybrid Data Pipeline 전체 아키텍처",
        label: "Architecture",
      },
      decisions: [
        {
          title: "Kafka",
          contextLabel: "Problem",
          context: "Streaming Consumer가 일시 중단되더라도 주문·배송·리뷰 이벤트가 유실되면 안 됐습니다.",
          decision: "Producer와 Consumer를 분리하고 이벤트를 보존하는 Event Ingestion Layer로 Kafka를 사용했습니다.",
          effect: "중단 중에도 이벤트를 보존하고 재시작 후 이어서 처리할 수 있는 구조를 만들었습니다.",
        },
        {
          title: "Spark",
          contextLabel: "Consideration",
          context: "데이터 규모만 보면 Spark가 반드시 필요한 수준은 아니었습니다.",
          decision: "Streaming과 Batch를 하나의 엔진으로 구성하고 Checkpoint 복구와 대량 처리 구조를 검증하기 위해 선택했습니다.",
          effect: "Structured Streaming과 Spark Batch로 실시간 처리와 Silver / Gold 변환을 수행했습니다.",
        },
        {
          title: "MinIO + Data Layers",
          contextLabel: "Problem",
          context: "가공 결과만 보존하면 로직 변경이나 오류 발생 시 원본부터 다시 처리하기 어렵습니다.",
          decision: "MinIO Data Lake에 Bronze → Silver → Gold 계층별 책임을 분리했습니다.",
          effect: "원본 보존과 재처리 기반, 정제·모델링, 분석 Mart 생성을 분리했습니다.",
        },
        {
          title: "Airflow",
          contextLabel: "Constraint",
          context: "제한된 단일 VM에서 Streaming과 Batch를 함께 실행하면 리소스 경쟁이 발생할 수 있었습니다.",
          decision: "매일 새벽 3시 Streaming 중지 → Silver → Validation → Gold → 재시작 순서를 관리하도록 구성했습니다.",
          effect: "반복 작업을 자동화하고 Batch 시간에 Spark 자원을 확보했습니다.",
        },
        {
          title: "Redis + Grafana + Prometheus",
          contextLabel: "Problem",
          context: "애플리케이션 처리 상태와 제한된 VM의 CPU·Memory 상태를 함께 확인해야 했습니다.",
          decision: "처리 지표는 Redis, 시스템·컨테이너 지표는 Prometheus로 수집해 Grafana에서 확인했습니다.",
          effect: "Throughput·누적/최신 이벤트와 CPU·Memory·Container Resource를 함께 관찰했습니다.",
        },
        {
          title: "PostgreSQL + Metabase",
          contextLabel: "Purpose",
          context: "Gold 데이터를 분석 사용자가 빠르게 조회할 수 있는 Serving Layer가 필요했습니다.",
          decision: "Gold Mart를 PostgreSQL에 적재하고 Metabase에서 BI 분석에 사용했습니다.",
          effect: "Fact / Dimension → Gold Mart → PostgreSQL → Metabase 흐름을 구성했습니다.",
        },
      ],
      operationsImages: [
        { src: "/projects/meta-pipeline/airflow-dag.png", alt: "Airflow Batch DAG", label: "Airflow DAG" },
        { src: "/projects/meta-pipeline/slack-notification.png", alt: "Airflow 실행 결과 Slack 알림", label: "Slack Notification" },
        { src: "/projects/meta-pipeline/grafana-monitoring.png", alt: "Streaming 및 시스템 리소스 Grafana 모니터링", label: "Grafana Monitoring" },
      ],
      validations: [
        {
          index: "01", label: "Volume Test", question: "대량 이벤트를 End-to-End로 처리할 수 있는가?", value: "4,500,327", unit: "EVENTS",
          description: "1,000,000개의 Synthetic Order를 기반으로 총 4,500,327개의 주문·배송·리뷰 이벤트를 생성하고, Kafka → Spark Structured Streaming → MinIO Bronze까지 동일 건수 적재를 검증했습니다.",
        },
        {
          index: "02", label: "Load Test", question: "입력 부하가 증가해도 데이터 흐름이 유지되는가?", value: "10,000", unit: "EPS",
          description: "10,000 EPS 입력 조건에서 Kafka → Spark Structured Streaming → MinIO까지 전체 데이터 흐름과 적재 상태를 검증했습니다.",
          limitation: "Producer가 약 11,000 EPS에서 먼저 병목되어 Spark 자체의 처리 한계까지 측정한 결과는 아닙니다.",
          image: { src: "/projects/meta-pipeline/load-test-10k.png", alt: "10,000 EPS 부하 테스트 Grafana 지표", label: "10K EPS Load Test" },
        },
        {
          index: "03", label: "Query Optimization", question: "Analytics Serving Query를 개선할 수 있는가?", value: "19.810 ms → 0.074 ms",
          description: "mart_customer_segment_sales의 occupation 조건 조회에 인덱스를 적용하고 동일 쿼리를 EXPLAIN (ANALYZE, BUFFERS)로 비교한 결과, Execution Time이 19.810 ms에서 0.074 ms로 감소했습니다.",
          limitation: "WHERE occupation = '금형원' 조건으로 수행한 해당 EXPLAIN ANALYZE 측정 결과입니다.",
          indexTest: {
            test: "mart_customer_segment_sales의 occupation 조건 조회에 Index 적용",
            before: "19.810 ms",
            after: "0.074 ms",
            beforePlan: "Parallel Seq Scan",
            afterPlan: "Bitmap Index Scan",
            indexName: "idx_mart_customer_segment_occupation",
          },
          comparison: {
            before: { src: "/projects/meta-pipeline/index-before.png", alt: "PostgreSQL 인덱스 적용 전 실행 계획과 실행 시간", label: "Index Before" },
            after: { src: "/projects/meta-pipeline/index-after.png", alt: "PostgreSQL 인덱스 적용 후 실행 계획과 실행 시간", label: "Index After" },
          },
        },
      ],
      limitations: [
        { index: "01", title: "Producer Bottleneck", limitation: "약 11,000 EPS에서 Producer가 먼저 병목되어 Spark Streaming 처리 한계까지는 측정하지 못했습니다.", next: "Producer 병렬화와 Kafka Partition 조정 후 Spark 처리 한계를 다시 측정합니다." },
        { index: "02", title: "Single-Node Environment", limitation: "4 CPU · 24GB 단일 VM에서 구축해 분산 환경의 수평 확장 효과는 검증하지 못했습니다.", next: "Kafka Broker와 Spark Worker를 여러 노드로 분리해 처리량과 장애 복구 특성을 비교합니다." },
        { index: "03", title: "Synthetic Load", limitation: "Olist 데이터를 이벤트로 재구성한 테스트로 실제 트래픽의 불규칙한 패턴과 완전히 같지 않습니다.", next: "Burst Traffic, 시간대 편향, 이벤트 타입별 비율 차이를 반영합니다." },
        { index: "04", title: "Data Quality & Schema Evolution", limitation: "현재는 처리, 기본 Validation, 복구 구조 검증에 집중했습니다.", next: "Data Quality 자동화, 실패 데이터 격리, Schema Change Detection과 알림을 추가합니다." },
      ],
      conclusion: "수집·저장·변환뿐 아니라 복구·모니터링·검증까지 연결된 데이터 파이프라인을 구축하고, 제한된 환경에서의 운영 방식과 확인된 한계를 직접 검증했습니다.",
    },
    details: [
      {
        id: "overview",
        title: "Overview",
        content:
          "이벤트 생성부터 수집, 스트리밍·배치 처리, 저장, 모니터링 및 분석 환경까지 설계하고 구축한 개인 프로젝트입니다.",
      },
      {
        id: "problem-goal",
        title: "Problem & Goal",
        content:
          "주문·배송·리뷰 데이터를 실시간 이벤트와 배치 데이터로 연결하고, 재처리와 분석이 가능한 파이프라인을 구성했습니다.",
      },
      {
        id: "architecture",
        title: "Architecture",
        content:
          "Kafka와 Spark Structured Streaming으로 이벤트를 MinIO Bronze에 적재하고, Airflow 기반 Spark Batch로 Silver와 Gold를 생성해 PostgreSQL과 Metabase로 제공합니다.",
      },
      {
        id: "core-design",
        title: "Core Design",
        content:
          "Bronze–Silver–Gold 계층, Checkpoint 기반 복구, 제한된 단일 VM을 고려한 Streaming과 Batch 실행 시점 분리를 핵심으로 설계했습니다.",
      },
      {
        id: "performance",
        title: "Performance",
        content:
          "10,000 EPS 입력 조건에서 Kafka → Spark Structured Streaming → MinIO 전체 흐름을 검증했으며, mart_customer_segment_sales의 occupation 조건 조회에서 인덱스 적용 전후 Execution Time이 19.810 ms에서 0.074 ms로 감소한 것을 확인했습니다.",
      },
      {
        id: "monitoring-operations",
        title: "Monitoring & Operations",
        content:
          "Redis와 Grafana로 최신·누적 처리 지표를 확인하고, Task 실패 시 Slack 실패 알림과 Gold Mart 생성 완료 시 성공 알림을 전송하도록 구성했습니다.",
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting",
        content:
          "dropDuplicates State Store와 Checkpoint 상태 불일치로 발생한 반복 재시작 문제를 Raw Streaming 단계의 dropDuplicates 제거와 Checkpoint 분리로 개선했습니다.",
      },
      {
        id: "results-lessons",
        title: "Results & Lessons",
        content:
          "1,000,000개의 Synthetic Order를 기반으로 생성한 4,500,327개 이벤트 적재, 10,000 EPS 입력 조건의 전체 흐름, 특정 occupation 조회 조건의 인덱스 적용 전후 실행 시간을 검증했습니다.",
      },
    ],
    relatedLinks: [
      { label: "GitHub Repository", href: "https://github.com/bhjin97/Meta_Pipeline" },
      { label: "Final Presentation · PDF", href: "/projects/meta-pipeline/E-Commerce-Hybrid-Data-Pipeline.pdf" },
      { label: "Presentation Video · YouTube", href: "https://www.youtube.com/watch?v=AOgdfq-37nA&t=204s" },
    ],
  },
  {
    slug: "aller",
    title: "Aller",
    subtitle: "AI 기반 화장품 검색·추천 서비스",
    summary:
      "제품·리뷰 데이터 파이프라인과 Hybrid RAG 검색을 결합해 사용자 조건에 맞는 화장품과 추천 근거를 제공하는 서비스입니다.",
    status: "완료",
    featured: true,
    detailKind: "aller",
    projectType: "5인 팀 프로젝트",
    scope: "Team Lead · Data Pipeline · Hybrid RAG · Deployment",
    coreTechnologies: ["Airflow", "MariaDB", "LangChain", "Pinecone", "Docker"],
    technologies: [
      { name: "Python", responsibility: "Data" },
      { name: "pandas", responsibility: "Data" },
      { name: "Playwright", responsibility: "Data" },
      { name: "Airflow", responsibility: "Data" },
      { name: "MariaDB", responsibility: "Data" },
      { name: "LangChain", responsibility: "AI & Search" },
      { name: "OpenAI API", responsibility: "AI & Search" },
      { name: "Pinecone", responsibility: "AI & Search" },
      { name: "FastAPI", responsibility: "Application" },
      { name: "React", responsibility: "Application" },
      { name: "Docker", responsibility: "Infra" },
      { name: "AWS EC2", responsibility: "Infra" },
      { name: "AWS ECR", responsibility: "Infra" },
    ],
    details: [],
    relatedLinks: allerCaseStudy.relatedLinks,
  },
  {
    slug: "future-project",
    title: "Future Project",
    summary: "새 프로젝트를 추가하기 위한 placeholder입니다.",
    status: "예정",
    featured: false,
    details: createPlaceholderDetails("Future Project"),
    relatedLinks: [],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
