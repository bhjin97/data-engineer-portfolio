import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AllerCaseStudy } from "@/components/project/AllerCaseStudy";
import { ProjectDetailSection } from "@/components/project/ProjectDetailSection";
import { ProjectCaseStudy } from "@/components/project/ProjectCaseStudy";
import { RelatedLinks } from "@/components/project/RelatedLinks";
import { getProjectBySlug, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.isPublished !== false)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  const publicProject = project?.isPublished !== false ? project : undefined;

  return {
    title: publicProject ? `${publicProject.title} | 데이터 엔지니어 포트폴리오` : "프로젝트",
    description: publicProject?.summary,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project || project.isPublished === false) {
    notFound();
  }

  if (project.detailKind === "aller") {
    return <AllerCaseStudy project={project} />;
  }

  if (project.caseStudy) {
    return <ProjectCaseStudy project={project} />;
  }

  return (
    <main className="px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link className="text-sm underline underline-offset-4" href="/#projects">
          프로젝트 목록으로
        </Link>
        <div className="py-10">
          <p className="text-sm text-zinc-500">{project.status}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{project.title}</h1>
          <p className="mt-4 leading-7 text-zinc-600">{project.summary}</p>
        </div>
        {project.details.map((section) => (
          <ProjectDetailSection key={section.id} section={section} />
        ))}
        <RelatedLinks links={project.relatedLinks} />
      </article>
    </main>
  );
}
