# Data Engineer Portfolio

데이터 엔지니어 배형진의 웹 포트폴리오입니다.

데이터 파이프라인을 설계하고 운영하면서 겪은 기술적 고민과 문제 해결 과정, 성능 검증 결과를 프로젝트별로 정리했습니다.

## Live Portfolio

### [bhjin-portfolio.vercel.app](https://bhjin-portfolio.vercel.app/)

배포된 포트폴리오는 PC와 모바일 환경에서 확인할 수 있습니다.

## Featured Projects

### E-Commerce Hybrid Data Pipeline

Kafka와 Spark를 기반으로 실시간 스트리밍과 배치 데이터를 통합 처리하고, Bronze–Silver–Gold 계층을 거쳐 분석 환경으로 제공하는 데이터 파이프라인입니다.

* Kafka·Spark Structured Streaming 기반 이벤트 처리
* Airflow 기반 배치 오케스트레이션
* MinIO 데이터 레이크와 PostgreSQL 데이터 마트
* Redis·Grafana 기반 스트리밍 모니터링
* 대규모 이벤트 처리 및 인덱스 성능 검증

[프로젝트 상세 보기](https://bhjin-portfolio.vercel.app/projects/meta-pipeline)

### Aller

제품·리뷰 데이터 파이프라인과 Hybrid RAG를 결합해 사용자 조건에 맞는 화장품과 추천 근거를 제공하는 AI 기반 검색·추천 서비스입니다.

* Airflow 기반 제품·리뷰 데이터 파이프라인
* MariaDB와 Pinecone을 결합한 Hybrid RAG
* LangChain 기반 질의 분석 및 검색 라우팅
* OCR 성분 분석과 피부 적합도 계산
* Docker·AWS ECR·EC2 배포 구성

[프로젝트 상세 보기](https://bhjin-portfolio.vercel.app/projects/aller)

## Tech Stack

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS
* **Deployment:** Vercel
* **Development:** Git, GitHub

## Local Development

저장소를 로컬 환경에서 실행하는 방법입니다.

```bash
git clone https://github.com/bhjin97/data-engineer-portfolio.git
cd data-engineer-portfolio
npm install
npm run dev
```

개발 서버는 로컬 환경의 `http://localhost:3000`에서 실행됩니다.

> `localhost`는 로컬 개발용 주소이며, 공개 포트폴리오는 위의 Live Portfolio 링크에서 확인할 수 있습니다.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment

GitHub `main` 브랜치와 Vercel을 연결해 배포합니다.

`main` 브랜치에 변경 사항이 반영되면 Vercel에서 Production Deployment가 자동으로 실행됩니다.

