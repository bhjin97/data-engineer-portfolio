import Link from "next/link";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { ProjectImageComparison } from "@/components/project/ProjectImageComparison";
import { ProjectResourceLinks } from "@/components/project/ProjectResourceLinks";
import { ProjectSectionNav } from "@/components/project/ProjectSectionNav";
import type { Project, ProjectFlow } from "@/types/project";

type ProjectCaseStudyProps = { project: Project };

const navigationItems = [
  { id: "overview", label: "Overview" },
  { id: "data-flow", label: "Pipeline" },
  { id: "decisions", label: "Decisions" },
  { id: "modeling", label: "Modeling" },
  { id: "operations", label: "Operations" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "validation", label: "Validation" },
  { id: "next-step", label: "Next Step" },
] as const;

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return <div className="mb-8"><h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>{subtitle ? <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{subtitle}</p> : null}</div>;
}

function Flow({ flow }: { flow: ProjectFlow }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">{flow.label}</p><ol className="mt-3 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">{flow.steps.map((step, index) => <li className="flex items-center gap-2" key={`${flow.label}-${step}`}><span className="rounded-lg border border-slate-200 bg-white px-3 py-2">{step}</span>{index < flow.steps.length - 1 ? <span className="text-slate-300" aria-hidden="true">→</span> : null}</li>)}</ol></div>;
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const study = project.caseStudy;
  if (!study) return null;
  const supportingTechnologies = project.technologies?.filter((technology) => !project.coreTechnologies?.includes(technology.name));

  return (
    <main className="bg-white">
      <section id="overview" className="border-b border-slate-200 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Link className="text-sm font-semibold text-blue-700 hover:text-blue-800" href="/#projects">← 프로젝트 목록</Link>
          <p className="mt-12 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">{project.projectType}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">{project.title}</h1>
          {project.subtitle ? <p className="mt-4 text-lg font-medium text-slate-500 sm:text-xl">{project.subtitle}</p> : null}
          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">{project.summary}</p>
          <dl className="mt-10 grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-2">
            <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Role / Scope</dt><dd className="mt-2 font-semibold text-slate-800">{project.scope}</dd></div>
            <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Scope</dt><dd className="mt-2 text-sm leading-6 text-slate-600">{project.scopeDescription}</dd></div>
          </dl>
          <div className="mt-6"><ProjectResourceLinks links={project.relatedLinks} /></div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Technology</p><p className="mt-3 text-sm leading-7 text-slate-700">{project.coreTechnologies?.join(" · ")}</p></div>
            <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Supporting Technology</p><p className="mt-3 text-sm leading-7 text-slate-600">{supportingTechnologies?.map((technology) => technology.name).join(" · ")}</p></div>
          </div>
        </div>
      </section>

      <ProjectSectionNav items={navigationItems} />

      <section id="problem-goal" className="scroll-mt-20 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeader title="Problem & Goal" />
        <div className="grid gap-10 lg:grid-cols-2"><div className="space-y-4 text-base leading-8 text-slate-600">{study.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div><p className="text-lg font-semibold leading-8 text-slate-900">{study.goal}</p><dl className="mt-6 space-y-4">{study.goalItems.map((goal) => <div className="border-l-2 border-blue-500 pl-4" key={goal.label}><dt className="text-xs font-bold uppercase tracking-wider text-blue-700">{goal.label}</dt><dd className="mt-1 text-sm text-slate-600">{goal.description}</dd></div>)}</dl></div></div>
      </div></section>

      <section id="data-flow" className="scroll-mt-36 bg-slate-50 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeader title="Data Flow" subtitle="이벤트 생성부터 분석 제공까지 하나의 데이터 흐름으로 연결했습니다." />
        <div className="max-w-4xl space-y-3 leading-8 text-slate-600">{study.dataFlowDescription.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-2">{project.architecture?.flows.map((flow) => <Flow flow={flow} key={flow.label} />)}{project.architecture ? <Flow flow={{ label: "Orchestration", steps: project.architecture.orchestration.sequence }} /> : null}</div>
        <div className="mt-8"><ProjectMedia media={study.architectureImage} /></div>
      </div></section>

      <section id="decisions" className="scroll-mt-36 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeader title="Architecture & Decisions" subtitle="기술을 나열하기보다 각 선택이 어떤 문제를 해결했는지 설명합니다." />
        <div className="grid gap-5 lg:grid-cols-2">{study.decisions.map((item) => <article className="border-t-2 border-slate-900 py-6" key={item.title}><h3 className="text-xl font-bold text-slate-950">{item.title}</h3><dl className="mt-5 space-y-4 text-sm leading-6"><div><dt className="font-bold text-slate-400">{item.contextLabel}</dt><dd className="mt-1 text-slate-600">{item.context}</dd></div><div><dt className="font-bold text-blue-700">Decision</dt><dd className="mt-1 text-slate-700">{item.decision}</dd></div><div><dt className="font-bold text-slate-400">Effect</dt><dd className="mt-1 text-slate-600">{item.effect}</dd></div></dl></article>)}</div>
      </div></section>

      <section id="modeling" className="scroll-mt-36 bg-slate-50 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeader title="Data Modeling" subtitle="분석 목적에 맞게 데이터를 Fact · Dimension · Mart로 분리했습니다." />
        <p className="max-w-3xl leading-8 text-slate-600">Silver에서는 분석 중심 데이터와 반복 기준 속성을 Fact와 Dimension으로 분리하고, Gold에서는 KPI와 분석용 Mart를 생성해 PostgreSQL과 Metabase로 제공합니다.</p>
        <div className="mt-10 grid gap-3 lg:grid-cols-[1fr_auto_1.4fr_auto_1fr_auto_1fr] lg:items-stretch">{project.dataLayers?.map((layer, index) => <div className="contents" key={layer.name}><article className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-blue-700">{layer.name}</p><h3 className="mt-2 font-bold text-slate-950">{layer.name === "Bronze" ? "Raw & Reprocessable" : layer.name === "Silver" ? "Clean & Modeled" : "Analytics Mart"}</h3>{layer.name === "Silver" && project.dataModeling ? <div className="mt-5 grid gap-4 text-xs sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"><div><p className="font-bold text-slate-500">FACT</p><ul className="mt-2 space-y-1 text-slate-600">{project.dataModeling.facts.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="font-bold text-slate-500">DIMENSION</p><ul className="mt-2 space-y-1 text-slate-600">{project.dataModeling.dimensions.map((item) => <li key={item}>{item}</li>)}</ul></div></div> : <ul className="mt-5 space-y-2 text-sm text-slate-600">{layer.responsibilities.map((item) => <li key={item}>— {item}</li>)}</ul>}</article>{index < (project.dataLayers?.length ?? 0) - 1 ? <div className="flex items-center justify-center py-1 text-slate-300 lg:px-1"><span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span></div> : null}</div>)}<div className="flex items-center justify-center py-1 text-slate-300 lg:px-1"><span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span></div><article className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Serving</p><h3 className="mt-2 font-bold text-slate-950">Analytics Serving</h3><p className="mt-5 text-sm text-slate-600">{project.dataModeling?.serving.join(" → ")}</p></article></div>
      </div></section>

      <section id="operations" className="scroll-mt-36 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeader title="Reliability & Operations" subtitle="실행하는 것에서 끝나지 않고 중단·복구·자원·모니터링까지 고려했습니다." />
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">{project.operations?.map((operation) => <article className="border-t border-slate-300 pt-5" key={operation.label}><p className="text-xs font-bold text-blue-700">{operation.index} {operation.label.toUpperCase()}</p><h3 className="mt-2 text-xl font-bold text-slate-950">{operation.title}</h3><p className="mt-4 leading-7 text-slate-600">{operation.description}</p><div className="mt-5 space-y-4">{operation.flows?.map((flow) => <Flow flow={flow} key={flow.label} />)}</div></article>)}</div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">{study.operationsImages.map((media, index) => <div className={index === 2 ? "lg:col-span-2" : ""} key={media.src}><ProjectMedia compact={index !== 2} media={media} /></div>)}</div>
      </div></section>

      <section id="troubleshooting" className="scroll-mt-36 bg-slate-50 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeader title="Troubleshooting" subtitle="실패 원인을 추적하고 처리 책임과 운영 구조를 다시 설계했습니다." />
        <div className="space-y-10">{project.troubleshooting?.map((item) => <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" key={item.title}><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Case {item.index}</p><h3 className="mt-2 text-2xl font-bold text-slate-950">{item.title}</h3><dl className="mt-7 grid gap-6 lg:grid-cols-4">{[["Problem", item.problem], ["Cause", item.cause], ["Decision", `${item.decision ? `${item.decision} ` : ""}${item.solution}`], ["Result", item.result]].map(([label, value]) => <div key={label}><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-2 text-sm leading-6 text-slate-600">{value}</dd></div>)}</dl>{item.comparison ? <div className="mt-8"><ProjectImageComparison comparison={item.comparison} /></div> : item.image ? <div className="mt-8"><ProjectMedia media={item.image} /></div> : null}</article>)}</div>
      </div></section>

      <section id="validation" className="scroll-mt-36 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeader title="Validation & Performance" subtitle="설계한 데이터 흐름을 실제 부하와 쿼리로 검증했습니다." />
        <div className="space-y-12">{study.validations.map((item) => <article className="grid gap-7 border-t border-slate-300 pt-7 lg:grid-cols-[220px_1fr]" key={item.index}><div><p className="text-xs font-bold uppercase tracking-wider text-blue-700">{item.index} {item.label}</p><p className="mt-4 text-3xl font-bold tracking-tight text-slate-950">{item.value}</p>{item.unit ? <p className="mt-1 text-xs font-bold tracking-widest text-blue-700">{item.unit}</p> : null}</div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Question</p><h3 className="mt-2 text-xl font-bold text-slate-950">{item.question}</h3>{item.indexTest ? <div className="mt-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Test</p><p className="mt-2 text-sm font-semibold text-slate-700">{item.indexTest.test}</p></div> : null}<p className="mt-4 leading-7 text-slate-600">{item.description}</p>{item.limitation ? <p className="mt-4 border-l-2 border-amber-400 pl-4 text-sm leading-6 text-slate-600"><strong className="text-slate-800">검증 범위:</strong> {item.limitation}</p> : null}{item.comparison ? <div className="mt-7"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Evidence</p><ProjectImageComparison comparison={item.comparison} /></div> : item.image ? <div className="mt-7"><ProjectMedia media={item.image} /></div> : null}{item.indexTest ? <div className="mt-7 border-t border-slate-200 pt-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Observation</p><div className="mt-3 flex flex-col gap-2 text-sm text-slate-700 sm:flex-row sm:items-center"><span>{item.indexTest.beforePlan}</span><span className="text-blue-500" aria-hidden="true">→</span><span>{item.indexTest.afterPlan} using <code className="break-all font-mono text-xs text-blue-700">{item.indexTest.indexName}</code></span></div></div> : null}</div></article>)}</div>
      </div></section>

      <section id="next-step" className="scroll-mt-36 bg-slate-50 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeader title="Limitations & Next Step" subtitle="검증 범위를 명확히 하고 다음 개선 방향을 정리했습니다." />
        <div className="grid gap-5 sm:grid-cols-2">{study.limitations.map((item) => <article className="border-t-2 border-slate-800 pt-5" key={item.index}><p className="text-xs font-bold text-blue-700">{item.index}</p><h3 className="mt-2 text-lg font-bold text-slate-950">{item.title}</h3><p className="mt-4 text-sm leading-6 text-slate-600"><strong className="text-slate-900">Limitation.</strong> {item.limitation}</p><p className="mt-3 text-sm leading-6 text-slate-600"><strong className="text-blue-700">Next.</strong> {item.next}</p></article>)}</div>
        <p className="mt-16 max-w-4xl border-l-4 border-blue-600 pl-6 text-xl font-semibold leading-9 text-slate-800">{study.conclusion}</p>
      </div></section>
    </main>
  );
}
