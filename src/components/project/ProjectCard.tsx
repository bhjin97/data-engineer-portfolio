import Link from "next/link";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  prominence?: "primary" | "secondary";
};

export function ProjectCard({ project, prominence = "secondary" }: ProjectCardProps) {
  const githubLink = project.relatedLinks.find((link) => link.label.toLowerCase().includes("github"));
  const isPrimary = prominence === "primary";
  const isPlanned = project.status === "예정";
  const cardLinkClass = "inline-flex min-h-11 items-center rounded-sm px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:min-h-0 sm:px-0";

  if (isPrimary) {
    return (
      <article className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Representative project</p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{project.title}</h3>
        {project.subtitle ? <p className="mt-2 text-sm font-medium text-slate-500">{project.subtitle}</p> : null}

        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">{project.featuredSummary ?? project.summary}</p>

        {project.coreTechnologies ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="프로젝트 핵심 기술">
            {project.coreTechnologies.map((technology) => (
              <li className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600" key={technology}>
                {technology}
              </li>
            ))}
          </ul>
        ) : null}

        {project.metrics ? (
          <div className="mt-8 border-y border-slate-200 py-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Validation results</p>
            <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.metrics.map((metric) => (
                <div className="min-w-0 border-t border-slate-200 pt-4" key={metric.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {metric.unit ?? metric.label}
                  </dt>
                  <dd className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    {metric.value}
                  </dd>
                  {metric.description ? <dd className="mt-3 text-xs leading-5 text-slate-600">{metric.description}</dd> : null}
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
          <Link className={`${cardLinkClass} text-blue-700 hover:text-blue-800`} href={`/projects/${project.slug}`}>
            상세 프로젝트 보기 <span aria-hidden="true">→</span>
          </Link>
          {githubLink ? (
            <a className={`${cardLinkClass} text-slate-600 hover:text-slate-950`} href={githubLink.href} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className={`rounded-2xl border p-6 ${isPlanned ? "border-dashed border-slate-300 bg-transparent text-slate-500" : "border-slate-200 bg-white shadow-sm"}`}>
      <div>
        <h3 className="text-xl font-bold tracking-tight text-slate-950">{project.title}</h3>
        {project.subtitle ? <p className="mt-2 text-sm font-medium text-slate-500">{project.subtitle}</p> : null}
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{project.summary}</p>
      {!isPlanned && project.coreTechnologies ? (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="프로젝트 핵심 기술">
          {project.coreTechnologies.slice(0, 5).map((technology) => (
            <li className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600" key={technology}>{technology}</li>
          ))}
        </ul>
      ) : null}
      <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-semibold">
        <Link className={`${cardLinkClass} text-blue-700 hover:text-blue-800`} href={`/projects/${project.slug}`}>
          상세 페이지 <span aria-hidden="true">→</span>
        </Link>
        {githubLink ? (
          <a className={`${cardLinkClass} text-slate-600 hover:text-slate-950`} href={githubLink.href} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="cursor-not-allowed text-slate-400" title="링크 준비 중">GitHub 준비 중</span>
        )}
      </div>
    </article>
  );
}
