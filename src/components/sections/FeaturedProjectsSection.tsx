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
  const [primaryProject, ...supportingProjects] = featuredProjects;

  return (
    <section id="projects" className="scroll-mt-20 border-b border-slate-200 bg-slate-50 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Featured Projects"
          description="프로젝트의 설계 과정과 문제 해결 기록을 상세 페이지에서 확인할 수 있습니다."
        />
        {primaryProject ? <ProjectCard project={primaryProject} prominence="primary" /> : null}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {supportingProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} prominence="secondary" />
          ))}
        </div>
      </div>
    </section>
  );
}
