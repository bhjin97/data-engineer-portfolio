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

  return (
    <article className={`rounded-2xl border p-6 ${isPrimary ? "border-blue-200 bg-white shadow-sm sm:p-9" : isPlanned ? "border-dashed border-slate-300 bg-transparent text-slate-500" : "border-slate-200 bg-white shadow-sm"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {isPrimary ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Representative project</p> : null}
          <h3 className={`${isPrimary ? "text-2xl sm:text-3xl" : "text-xl"} font-bold tracking-tight text-slate-950`}>{project.title}</h3>
          {project.subtitle ? <p className="mt-2 text-sm font-medium text-slate-500">{project.subtitle}</p> : null}
        </div>
        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {project.status}
        </span>
      </div>
      <p className={`${isPrimary ? "mt-5 max-w-2xl text-base" : "mt-4 text-sm"} leading-7 text-slate-600`}>{project.summary}</p>
      {isPrimary && (project.projectType || project.scope) ? (
        <dl className="mt-6 grid gap-4 border-y border-slate-200 py-5 sm:grid-cols-2">
          {project.projectType ? <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Project type</dt><dd className="mt-2 text-sm font-medium text-slate-700">{project.projectType}</dd></div> : null}
          {project.scope ? <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Scope</dt><dd className="mt-2 text-sm font-medium text-slate-700">{project.scope}</dd></div> : null}
        </dl>
      ) : null}
      {isPrimary && project.features ? (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Design decisions</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.features.slice(0, 3).map((feature) => <li className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800" key={feature.label}>{feature.label}</li>)}
          </ul>
        </div>
      ) : null}
      {isPrimary && project.metrics ? (
        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Validation results</p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={metric.label}>
              <dt className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500"><span>{metric.label}</span><span>{metric.index}</span></dt>
              <dd className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{metric.value}</dd>
              {metric.unit ? <dd className="mt-1 text-xs font-bold tracking-[0.12em] text-blue-700">{metric.unit}</dd> : null}
              {metric.description ? <dd className="mt-3 text-xs leading-5 text-slate-600">{metric.description}</dd> : null}
            </div>
          ))}
          </dl>
        </div>
      ) : null}
      {isPrimary && project.coreTechnologies ? (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Core</span>
          {project.coreTechnologies.map((technology) => <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700" key={technology}>{technology}</span>)}
        </div>
      ) : null}
      <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-semibold">
        <Link className="text-blue-700 hover:text-blue-800" href={`/projects/${project.slug}`}>상세 페이지 <span aria-hidden="true">→</span></Link>
        {githubLink ? <a className="text-slate-600 hover:text-slate-950" href={githubLink.href}>GitHub <span aria-hidden="true">↗</span></a> : <span className="cursor-not-allowed text-slate-400" title="링크 준비 중">GitHub 준비 중</span>}
      </div>
    </article>
  );
}
