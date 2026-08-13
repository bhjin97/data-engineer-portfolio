import type { ProjectLink, ProjectMedia } from "@/types/project";

export type AllerChallenge = {
  index: string;
  title: string;
  problem: string;
  cause?: string[];
  solution: string;
  result: string;
  note?: string;
};

export type AllerCaseStudyData = {
  period: string;
  team: string;
  role: string;
  overview: string;
  responsibilities: string[];
  problems: string[];
  goals: string[];
  architectureImage: ProjectMedia;
  pipelineImage: ProjectMedia;
  ragImage: ProjectMedia;
  ocrImage: ProjectMedia;
  fitScoreImage: ProjectMedia;
  challenges: AllerChallenge[];
  results: string[];
  contributions: string[];
  conclusion: string;
  relatedLinks: ProjectLink[];
};

export const allerCaseStudy: AllerCaseStudyData = {
  period: "2025.09.10 – 2025.11.21",
  team: "5인 팀 프로젝트",
  role: "Team Lead · Data Pipeline · Hybrid RAG · Deployment",
  overview:
    "Aller는 제품·리뷰·성분 데이터를 통합하고, 사용자의 자연어 질문과 피부 정보를 바탕으로 적합한 화장품과 추천 근거를 제공하는 서비스입니다. 질문에 포함된 제품 특징과 브랜드·가격·카테고리·성분 조건을 분석하고, Vector DB와 RDB를 조합해 실제 상품 데이터에서 결과를 검색합니다.",
  responsibilities: [
    "팀 리더로서 일정 조율 및 기능 통합 관리",
    "제품·리뷰 데이터 수집·정제·적재 파이프라인 구축",
    "Airflow 기반 주간 데이터 수집 자동화",
    "Hybrid RAG 검색 구조 통합 및 수정",
    "Docker 이미지 구성 및 AWS ECR·EC2 배포",
  ],
  problems: [
    "화장품 성분표는 전문 용어가 많아 사용자가 이해하기 어렵습니다.",
    "제품을 직접 사용하기 전에는 자신의 피부와 맞는지 판단하기 어렵습니다.",
    "일반 상품 검색만으로는 피부 고민과 사용감 같은 자연어 조건을 반영하기 어렵습니다.",
    "사용자 피부 정보와 제품 성분을 함께 고려한 설명이 부족합니다.",
  ],
  goals: [
    "자연어 조건을 분석해 실제 제품 데이터에서 적합한 상품 검색",
    "피부 타입과 제품 성분을 바탕으로 적합도 점수 제공",
    "성분표 이미지에서 제품과 성분 정보 추출",
    "추천 결과와 함께 선택 근거 제공",
  ],
  architectureImage: {
    src: "/projects/aller/architecture.png",
    alt: "Aller 시스템 아키텍처",
    label: "System Architecture",
    description: "React, FastAPI, MariaDB, Pinecone과 외부 AI API를 연결한 Aller 전체 시스템 구조",
    width: 1207,
    height: 678,
  },
  pipelineImage: {
    src: "/projects/aller/airflow-dag.svg",
    alt: "Aller Airflow 제품 데이터 파이프라인",
    label: "Airflow Data Pipeline",
    description: "제품과 리뷰 데이터를 수집하고 Stage 적재와 Upsert를 거쳐 운영 테이블에 반영하는 주간 파이프라인",
    width: 1500,
    height: 300,
  },
  ragImage: {
    src: "/projects/aller/hybrid-rag-flow.png",
    alt: "Aller Hybrid RAG 검색 라우팅",
    label: "Hybrid RAG Routing",
    description: "질문의 조건 조합에 따라 Pinecone과 MariaDB의 검색 순서를 선택하는 Hybrid RAG 흐름",
    width: 994,
    height: 652,
  },
  ocrImage: {
    src: "/projects/aller/ocr-input-example.jpg",
    alt: "화장품 성분표 OCR 입력 예시",
    label: "OCR Input Example",
    description: "제품 성분표 이미지에서 제품명과 성분명을 추출하기 위한 OCR 입력 예시",
    width: 3024,
    height: 4032,
  },
  fitScoreImage: {
    src: "/projects/aller/skin-fit-score-flow.png",
    alt: "피부 타입별 제품 적합도 계산 과정",
    label: "Skin Fit Score",
    description: "제품 성분을 효능군으로 분류하고 피부 타입별 중요도를 적용해 적합도 점수를 계산하는 과정",
    width: 1672,
    height: 941,
  },
  challenges: [
    {
      index: "01",
      title: "크롤링 속도와 실행 안정성 사이의 균형",
      problem:
        "AWS EC2에서는 대상 사이트에 정상적으로 접근하지 못해 크롤링을 로컬에서 실행해야 했습니다. 로컬에서 한 작업의 처리 범위를 크게 하면 자원 부하로 실행이 중단됐고, 작업을 여러 개로 나누어 병렬 처리하면 짧은 시간에 요청이 집중되어 접근 제한이 발생했습니다.",
      cause: [
        "클라우드 서버 환경에서 대상 사이트 접근 제한",
        "단일 작업의 과도한 로컬 CPU·메모리 사용",
        "병렬 실행으로 인한 요청 집중",
      ],
      solution:
        "작업 수를 줄이는 대신 로컬 환경이 감당할 수 있는 범위까지 작업당 처리량을 조정하고, 수집 작업을 순차적으로 실행했습니다. 또한 Playwright의 Headless 모드를 비활성화해 실제 브라우저와 유사한 실행 환경을 사용했습니다.",
      result:
        "최대 처리 속도보다 수집 지속성과 접근 안정성을 우선하는 방식으로 실행 구조를 조정해 제품·리뷰 데이터를 안정적으로 확보했습니다.",
      note: "이 조정은 초기 및 로컬 크롤링 실행 전략에 관한 것으로, Airflow 운영 DAG 전체가 완전히 순차 처리됐다는 의미는 아닙니다.",
    },
    {
      index: "02",
      title: "조건별 Hybrid RAG 검색 순서 설계",
      problem:
        "벡터 검색만으로는 자연어 의미를 반영할 수 있지만 가격·브랜드·카테고리 같은 필수 조건을 보장하기 어렵고, RDB만으로는 사용감과 기대 효과 같은 표현을 검색하기 어려웠습니다.",
      solution:
        "질문에서 추출된 조건의 종류와 선택도에 따라 Vector-first, RDB-first 또는 RDB-only 경로를 선택했습니다. 정확 조건이 충분하면 MariaDB에서 후보를 먼저 줄이고, 자연어 특징이 중심이면 Pinecone에서 유사 후보를 먼저 탐색했습니다.",
      result:
        "정확한 조건과 의미적 유사성을 함께 반영하면서 불필요한 후보 비교와 최종 LLM 컨텍스트를 줄이는 검색 구조를 구현했습니다.",
    },
  ],
  results: [
    "제품·리뷰 데이터의 수집부터 운영 테이블 반영까지 이어지는 데이터 파이프라인 구축",
    "Airflow 기반 주간 데이터 갱신 구조 구현",
    "질문 조건에 따라 RDB와 Vector DB를 조합하는 Hybrid RAG 검색 구현",
    "OCR 성분 분석과 피부 적합도 계산을 포함한 서비스형 MVP 완성",
    "Docker 이미지와 AWS ECR을 이용해 EC2 환경에 배포하고 구동 검증",
  ],
  contributions: [
    "Team Lead",
    "제품·리뷰 데이터 전체 수집·정제·적재 및 Upsert 담당",
    "Airflow 데이터 파이프라인 구축",
    "Hybrid RAG 통합 및 수정",
    "Docker·AWS ECR·EC2 배포 구성",
  ],
  conclusion:
    "데이터를 수집하는 데서 끝나지 않고, 정제·적재된 제품 정보를 검색과 추천 기능에 연결해 실제 사용자가 활용할 수 있는 서비스 흐름을 구축했습니다.",
  relatedLinks: [
    { label: "GitHub Repository", href: "https://github.com/bhjin97/Team-Grow" },
    { label: "Recorded Demo", href: "https://youtu.be/w3JsB6KwPug" },
    { label: "Final Presentation", href: "/projects/aller/docs/aller-final-presentation.pdf" },
  ],
};
