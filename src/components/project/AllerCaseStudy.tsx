import Image from "next/image";
import Link from "next/link";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { ProjectResourceLinks } from "@/components/project/ProjectResourceLinks";
import { ProjectSectionNav } from "@/components/project/ProjectSectionNav";
import { allerCaseStudy } from "@/data/aller";
import type { Project } from "@/types/project";

type AllerCaseStudyProps = {
  project: Project;
};

const navigationItems = [
  { id: "overview", label: "Overview" },
  { id: "service-demo", label: "Demo" },
  { id: "architecture", label: "Architecture" },
  { id: "data-pipeline", label: "Pipeline" },
  { id: "hybrid-rag", label: "Hybrid RAG" },
  { id: "ocr-analysis", label: "OCR" },
  { id: "skin-fit-score", label: "Fit Score" },
  { id: "technical-challenges", label: "Challenges" },
  { id: "results-contribution", label: "Results" },
] as const;

const overviewResourceLinks = allerCaseStudy.relatedLinks.filter(
  (link) => link.label === "GitHub Repository" || link.label === "Final Presentation",
);

const architectureRoles = [
  ["React", "사용자 화면과 상호작용"],
  ["FastAPI", "요청 처리와 기능 API"],
  ["MariaDB", "제품·성분·리뷰·사용자 데이터 관리"],
  ["Pinecone", "제품 특징 및 명칭의 의미 기반 검색"],
  ["LangChain / OpenAI API", "질문 분석, 검색 라우팅, 응답 생성"],
  ["Airflow / Playwright", "제품·리뷰 데이터 수집과 갱신"],
  ["Docker / AWS ECR / EC2", "컨테이너 이미지 구성과 프로젝트 당시 배포 환경"],
] as const;

const searchStrategies = [
  ["제품 특징", "Pinecone 의미 검색", "MariaDB 상세 조회"],
  ["특징 + 일부 명시 조건", "Pinecone 후보 생성", "MariaDB 조건 필터링"],
  ["특징 + 강한 명시 조건", "MariaDB 후보 축소", "Pinecone 벡터 조회 · cosine similarity 재정렬"],
  ["명시 조건", "MariaDB 조건 검색", "RDB-only"],
] as const;

const fitScoreRules = [
  "제품 성분을 6개 효능군으로 분류",
  "단순 성분 개수가 아닌 효능군별 상대 비율 사용",
  "피부 타입마다 다른 효능 중요도와 목표 범위 적용",
  "기본 점수 25점과 효능별 기여도 최대 75점으로 100점 구성",
  "사용자 지정 주의 성분이 있으면 최종 점수에서 40점 감점",
  "일반 주의 성분은 감점 대신 안내와 종합 의견에 반영",
] as const;

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

function StepFlow({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((step, index) => (
        <li className="flex items-center gap-2" key={step}>
          <span className="rounded-lg border border-slate-200 bg-white px-3 py-2">{step}</span>
          {index < steps.length - 1 ? (
            <span className="text-slate-300" aria-hidden="true">
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function AllerCaseStudy({ project }: AllerCaseStudyProps) {
  const technologyGroups = ["Data", "AI & Search", "Application", "Infra"].map((group) => ({
    group,
    items: project.technologies?.filter((technology) => technology.responsibility === group) ?? [],
  }));

  return (
    <main className="bg-white">
      <section id="overview" className="border-b border-slate-200 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Link className="text-sm font-semibold text-blue-700 hover:text-blue-800" href="/#projects">
            ← 프로젝트 목록
          </Link>
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_260px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">{project.projectType}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">{project.title}</h1>
              <p className="mt-4 text-lg font-medium text-slate-500 sm:text-xl">자연어 검색과 피부 타입 분석을 결합한 화장품 추천 서비스</p>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">{allerCaseStudy.overview}</p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Image
                alt="Aller 로고"
                className="h-auto w-full max-w-56 object-contain"
                height={811}
                priority
                sizes="224px"
                src="/projects/aller/aller-logo.png"
                width={1939}
              />
            </div>
          </div>

          <dl className="mt-10 grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-3">
            <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Period</dt><dd className="mt-2 font-semibold text-slate-800">{allerCaseStudy.period}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Team</dt><dd className="mt-2 font-semibold text-slate-800">{allerCaseStudy.team}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Role</dt><dd className="mt-2 text-sm font-semibold leading-6 text-slate-800">{allerCaseStudy.role}</dd></div>
          </dl>

          <div className="mt-6"><ProjectResourceLinks links={overviewResourceLinks} /></div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Personal Contribution</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                {allerCaseStudy.responsibilities.map((item) => <li className="border-l-2 border-blue-500 pl-4" key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {technologyGroups.map(({ group, items }) => (
                <div key={group}>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{group}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{items.map((item) => item.name).join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectSectionNav items={navigationItems} />

      <section id="problem-goal" className="scroll-mt-36 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Problem & Goal" subtitle="성분 정보, 피부 조건, 자연어 표현을 하나의 검색과 분석 흐름에서 다루고자 했습니다." />
          <div className="grid items-stretch gap-10 lg:grid-cols-2">
            <div className="flex h-full flex-col"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Problem</p><ul className="mt-5 grid flex-1 gap-0 lg:grid-rows-[repeat(4,minmax(6rem,1fr))]">{allerCaseStudy.problems.map((item) => <li className="flex min-h-24 items-start border-t border-slate-200 py-5 text-sm leading-6 text-slate-700" key={item}>{item}</li>)}</ul></div>
            <div className="flex h-full flex-col"><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Goal</p><ul className="mt-5 grid flex-1 gap-0 lg:grid-rows-[repeat(4,minmax(6rem,1fr))]">{allerCaseStudy.goals.map((item) => <li className="flex min-h-24 items-start border-t border-slate-200 py-5 text-sm font-medium leading-6 text-slate-800" key={item}>{item}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <section id="service-demo" className="scroll-mt-36 border-y border-slate-200 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Service Demo" subtitle="회원가입과 피부 타입 진단부터 자연어 제품 추천, 즐겨찾기와 주의 성분 설정, 피부 적합도 계산 및 OCR 성분 분석까지 Aller의 주요 사용자 흐름을 확인할 수 있습니다." />
          <a
            className="group mx-auto block max-w-4xl"
            href="https://youtu.be/w3JsB6KwPug"
            rel="noopener noreferrer"
            target="_blank"
          >
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors group-hover:border-blue-300">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  alt="Aller 서비스 시연 영상 썸네일"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  fill
                  sizes="(max-width: 1023px) 100vw, 896px"
                  src="/projects/aller/demo-thumbnail.jpg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/15 transition-colors group-hover:bg-slate-950/25">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/90 text-xl text-blue-700 shadow-sm" aria-hidden="true">▶</span>
                </div>
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
                <span>Recorded Demo</span>
                <span className="font-semibold text-blue-700">Aller 서비스 시연 영상 보기 ↗</span>
              </figcaption>
            </figure>
          </a>
        </div>
      </section>

      <section id="architecture" className="scroll-mt-36 bg-slate-50 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Architecture" subtitle="제품 데이터의 수집·저장부터 자연어 검색과 사용자 응답까지 연결한 전체 시스템 구조입니다." />
          <ProjectMedia media={allerCaseStudy.architectureImage} />
          <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {architectureRoles.map(([name, role]) => <article className="border-t border-slate-300 pt-4" key={name}><h3 className="font-bold text-slate-950">{name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{role}</p></article>)}
          </div>
          <p className="mt-8 border-l-2 border-blue-500 pl-4 text-sm leading-6 text-slate-600">Docker 이미지와 AWS ECR을 이용해 프로젝트 당시 EC2 환경에 배포하고 서비스 구동을 검증했습니다. 현재 운영 중인 서비스는 아닙니다.</p>
        </div>
      </section>

      <section id="data-pipeline" className="scroll-mt-36 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Data Pipeline" subtitle="수집 결과를 운영 테이블에 바로 반영하지 않고 Stage 적재와 정제 단계를 분리했습니다." />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"><StepFlow steps={["Playwright 크롤링", "Stage 테이블 적재", "정제 및 Upsert", "MariaDB 운영 테이블 반영"]} /></div>
          <div className="mt-8"><ProjectMedia media={allerCaseStudy.pipelineImage} /></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div><h3 className="text-xl font-bold text-slate-950">Weekly Update</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600"><li>스킨·토너, 에센스·세럼·앰플, 크림, 선크림 카테고리의 제품과 리뷰 수집·정제</li><li>기존 데이터는 갱신하고 신규 데이터는 추가하는 Upsert 적용</li><li>Airflow에서 매주 월요일 오전 10시 실행</li><li>수집 단계와 운영 테이블 반영 단계를 분리한 갱신 구조</li></ul></div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Personal Contribution</p><p className="mt-4 leading-7 text-slate-700">제품·리뷰 데이터의 크롤링, 적재, 정제 및 Upsert 파이프라인을 담당했습니다. 전성분 원천 데이터 수집은 담당 범위에서 제외됩니다.</p></div>
          </div>
        </div>
      </section>

      <section id="hybrid-rag" className="scroll-mt-36 bg-slate-50 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Hybrid RAG" subtitle="정확 조건 검색과 자연어 의미 검색을 질문의 조건 조합에 따라 연결했습니다." />
          <p className="max-w-4xl leading-8 text-slate-600">사용자 질문에는 사용감·효과 같은 의미 기반 특징과 브랜드·가격·카테고리·성분처럼 정확한 필터가 함께 포함될 수 있어 하나의 검색 방식만으로 처리하기 어려웠습니다.</p>
          <div className="mt-8"><ProjectMedia media={allerCaseStudy.ragImage} /></div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div><h3 className="text-xl font-bold text-slate-950">Question Analysis</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600"><li>모든 신규 질문을 LangChain 체인에서 처리</li><li>GPT-4o-mini가 GENERAL 또는 PRODUCT_FIND로 의도 분류</li><li>브랜드, 성분, 제품 특징, 가격 범위를 JSON으로 추출</li><li>카테고리는 동의어 사전과 문자열 규칙으로 보정</li><li>검색 정보가 부족하면 추가 조건 요청</li></ul></div>
            <div><h3 className="text-xl font-bold text-slate-950">Storage Roles</h3><dl className="mt-5 space-y-4 text-sm leading-6"><div><dt className="font-bold text-blue-700">Pinecone</dt><dd className="text-slate-600">제품 특징 의미 검색, 유사 후보 생성, 후보 재정렬</dd></div><div><dt className="font-bold text-blue-700">MariaDB</dt><dd className="text-slate-600">최신 상품 정보 관리, 정확 조건 검색, 제품–성분 관계 조회</dd></div><div><dt className="font-bold text-blue-700">LLM</dt><dd className="text-slate-600">의도와 조건 추출, 검색 결과 기반 추천 이유 생성</dd></div></dl></div>
          </div>
          <div className="mt-12 space-y-4">
            {searchStrategies.map(([condition, first, next], index) => <article className="grid gap-3 border-t border-slate-300 pt-5 sm:grid-cols-[42px_1fr_1.5fr] sm:items-center" key={condition}><p className="text-xs font-bold text-blue-700">0{index + 1}</p><h3 className="font-bold text-slate-950">{condition}</h3><p className="text-sm text-slate-600">{first} <span className="text-blue-500" aria-hidden="true">→</span> {next}</p></article>)}
            <article className="grid gap-3 border-t border-slate-300 pt-5 sm:grid-cols-[42px_1fr_1.5fr] sm:items-center"><p className="text-xs font-bold text-blue-700">05</p><h3 className="font-bold text-slate-950">RDB 결과 없음</h3><p className="text-sm text-slate-600">강한 조건의 결과가 없으면 Vector-first 경로로 폴백</p></article>
          </div>
          <div className="mt-10 rounded-2xl border border-blue-200 bg-white p-6 sm:p-8"><h3 className="font-bold text-slate-950">Result</h3><p className="mt-3 leading-7 text-slate-600">질문 조건에 맞는 후보를 검색·필터링하고 필요한 경우 벡터 유사도로 재정렬한 뒤 최대 5개의 제품을 제시합니다. 선택도가 높은 조건을 먼저 적용해 필수 조건과 의미 검색을 함께 반영하고, 후보 제품과 최종 LLM 컨텍스트의 크기를 제한했습니다.</p><p className="mt-4 text-sm font-medium text-blue-700">Hybrid RAG는 팀 공동 작업으로 진행했으며, 개인 역할은 검색 구조의 통합과 수정입니다.</p></div>
        </div>
      </section>

      <section id="ocr-analysis" className="scroll-mt-36 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="OCR Analysis" subtitle="서비스 데이터베이스에 등록되지 않은 제품도 성분표를 기준으로 확인할 수 있도록 구성했습니다." />
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <ProjectMedia contained media={allerCaseStudy.ocrImage} />
            <div><StepFlow steps={["성분표 이미지 업로드", "Vision API 텍스트 추출", "제품명·성분명 식별", "성분 정보 조회", "분석 결과 제공"]} /><p className="mt-8 leading-8 text-slate-600">사용자가 성분표 이미지를 업로드하면 Vision API로 텍스트를 추출하고 제품명과 성분명을 식별합니다. 추출된 정보는 성분 분석뿐 아니라 AI 상담과 피부 적합도 계산의 입력 데이터로 활용됩니다.</p></div>
          </div>
        </div>
      </section>

      <section id="skin-fit-score" className="scroll-mt-36 bg-slate-50 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Skin Fit Score" subtitle="피부 타입과 제품 성분 구성을 함께 고려해 0~100점의 적합도를 계산합니다." />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><StepFlow steps={["피부 타입 확인", "전성분 효능군 분류", "상대 비율 계산", "중요도·목표 범위 적용", "0~100점 산출", "주의 성분 반영"]} /></div>
          <div className="mt-8"><ProjectMedia media={allerCaseStudy.fitScoreImage} /></div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2"><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{fitScoreRules.map((rule) => <li className="border-t border-slate-300 pt-4 text-sm leading-6 text-slate-700" key={rule}>{rule}</li>)}</ul><div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8"><h3 className="text-xl font-bold text-slate-950">Normalization</h3><p className="mt-4 leading-8 text-slate-600">성분 수가 많은 제품이 무조건 높은 점수를 받지 않도록 효능군별 상대 비율을 사용하고, 피부 타입별 중요도와 목표 범위를 적용해 기여도를 정규화했습니다.</p><p className="mt-5 text-sm leading-6 text-slate-500">피부 적합도 계산은 서비스의 핵심 설계이며 개인 단독 구현으로 구분하지 않습니다.</p></div></div>
        </div>
      </section>

      <section id="technical-challenges" className="scroll-mt-36 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Technical Challenges" subtitle="처리 속도만이 아니라 실행 지속성과 검색 조건의 정확도를 기준으로 구조를 조정했습니다." />
          <div className="space-y-10">
            {allerCaseStudy.challenges.map((challenge) => <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" key={challenge.index}><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Case {challenge.index}</p><h3 className="mt-2 text-2xl font-bold text-slate-950">{challenge.title}</h3><dl className="mt-7 grid gap-6 lg:grid-cols-4"><div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Problem</dt><dd className="mt-2 text-sm leading-6 text-slate-600">{challenge.problem}</dd></div><div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Cause</dt><dd className="mt-2 text-sm leading-6 text-slate-600">{challenge.cause ? <ul className="space-y-2">{challenge.cause.map((cause) => <li key={cause}>— {cause}</li>)}</ul> : "검색 저장소마다 보장할 수 있는 조건이 달랐습니다."}</dd></div><div><dt className="text-xs font-bold uppercase tracking-wider text-blue-700">Solution</dt><dd className="mt-2 text-sm leading-6 text-slate-700">{challenge.solution}</dd></div><div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Result</dt><dd className="mt-2 text-sm leading-6 text-slate-600">{challenge.result}</dd></div></dl>{challenge.note ? <p className="mt-6 border-l-2 border-amber-400 pl-4 text-xs leading-5 text-slate-500">{challenge.note}</p> : null}</article>)}
          </div>
        </div>
      </section>

      <section id="results-contribution" className="scroll-mt-36 bg-slate-50 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Results & Contribution" subtitle="수집한 데이터를 실제 검색과 추천 기능으로 연결한 서비스형 MVP를 완성했습니다." />
          <div className="grid items-stretch gap-10 lg:grid-cols-2">
            <div className="flex h-full flex-col"><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Results</p><ul className="mt-5 grid flex-1 gap-0 lg:grid-rows-[repeat(5,minmax(6rem,1fr))]">{allerCaseStudy.results.map((item) => <li className="flex min-h-24 items-start border-t border-slate-300 py-5 text-sm leading-6 text-slate-700" key={item}>{item}</li>)}</ul></div>
            <div className="flex h-full flex-col"><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Personal Contribution</p><ul className="mt-5 grid flex-1 gap-0 lg:grid-rows-[repeat(5,minmax(6rem,1fr))]">{allerCaseStudy.contributions.map((item) => <li className="flex min-h-24 items-start border-t border-slate-300 py-5 text-sm font-medium leading-6 text-slate-700" key={item}>{item}</li>)}</ul></div>
          </div>
          <p className="mt-16 max-w-4xl border-l-4 border-blue-600 pl-6 text-xl font-semibold leading-9 text-slate-800">{allerCaseStudy.conclusion}</p>
        </div>
      </section>
    </main>
  );
}
