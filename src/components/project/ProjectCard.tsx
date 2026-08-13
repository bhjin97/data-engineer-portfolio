import Link from "next/link";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  number: "01" | "02";
};

const contributionItems = [
  ["DATA", "제품·리뷰 데이터 파이프라인"],
  ["SEARCH", "Hybrid RAG 통합 및 라우팅"],
  ["DEPLOY", "Docker · AWS ECR · EC2"],
] as const;

const metricDescriptions: Record<string, string> = {
  EVENTS: "대규모 이벤트 적재 검증",
  EPS: "실시간 처리 부하 검증",
  QUERY: "인덱스 적용 전후 비교",
};

export function ProjectCard({ project, number }: ProjectCardProps) {
  const githubLink = project.relatedLinks.find((link) => link.label.toLowerCase().includes("github"));
  const isMetaPipeline = project.slug === "meta-pipeline";
  const projectLabel = isMetaPipeline ? "Representative Project" : "Team Project · Lead";
  const linkClass = "group/link -my-3 inline-flex min-h-11 items-center rounded-sm px-1 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:my-0 lg:min-h-0 lg:px-0";

  return (
    <article className="grid overflow-hidden rounded-2xl border border-slate-200 border-l-blue-500 bg-white shadow-sm transition-[border-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-px hover:border-blue-200 hover:shadow-md motion-reduce:transform-none md:grid-cols-[minmax(0,3fr)_minmax(17rem,2fr)] lg:min-h-[390px]">
      <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-9">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700">{number}</span>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{projectLabel}</p>
        </div>

        <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{project.title}</h3>
        {project.subtitle ? <p className="mt-2 text-sm font-medium text-slate-500">{project.subtitle}</p> : null}
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{project.featuredSummary ?? project.summary}</p>

        {project.coreTechnologies ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} 핵심 기술`}>
            {project.coreTechnologies.map((technology) => (
              <li className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600" key={technology}>{technology}</li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <Link className={`${linkClass} text-blue-700 hover:text-blue-800`} href={`/projects/${project.slug}`}>
            상세 프로젝트 보기 <span className="ml-1 transition-transform motion-safe:group-hover/link:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
          {githubLink ? (
            <a className={`${linkClass} text-slate-600 hover:text-slate-950`} href={githubLink.href} target="_blank" rel="noopener noreferrer">
              GitHub <span className="ml-1" aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>

      <aside className="border-t border-slate-200 bg-slate-50/70 p-6 sm:p-8 md:border-l md:border-t-0 lg:p-9" aria-label={isMetaPipeline ? "프로젝트 핵심 검증 결과" : "프로젝트 핵심 기여"}>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">{isMetaPipeline ? "Key Results" : "Core Contribution"}</p>
        <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
          {isMetaPipeline
            ? project.metrics?.map((metric) => {
                const label = metric.unit ?? metric.label;
                return (
                  <div className="grid gap-1 py-4 sm:grid-cols-[5rem_1fr] sm:gap-x-4" key={metric.label}>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
                    <dd className="min-w-0">
                      <p className="break-words text-xl font-bold tracking-tight text-slate-950">{metric.value}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{metricDescriptions[label]}</p>
                    </dd>
                  </div>
                );
              })
            : contributionItems.map(([label, description]) => (
                <div className="grid gap-1 py-4 sm:grid-cols-[5rem_1fr] sm:gap-x-4" key={label}>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
                  <dd className="text-sm font-semibold leading-6 text-slate-800">{description}</dd>
                </div>
              ))}
        </dl>
      </aside>
    </article>
  );
}
