import { ProjectCard } from "@/components/project/ProjectCard";
import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProjectsSection() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Number.POSITIVE_INFINITY) -
        (b.featuredOrder ?? Number.POSITIVE_INFINITY),
    );
  return (
    <section id="projects" className="scroll-mt-20 border-b border-slate-200 bg-slate-50 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Featured Projects"
          description="프로젝트의 설계 과정과 문제 해결 기록을 상세 페이지에서 확인할 수 있습니다."
        />
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <div key={project.slug}>
              {index === 1 ? (
                <div className="mb-8 flex items-center gap-4" aria-hidden="true">
                  <span className="h-px flex-1 bg-slate-300" />
                  <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-slate-400">Project 02</span>
                  <span className="h-px flex-1 bg-slate-300" />
                </div>
              ) : null}
              <ProjectCard project={project} number={index === 0 ? "01" : "02"} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
