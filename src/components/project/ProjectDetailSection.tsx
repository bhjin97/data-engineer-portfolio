import type { ProjectDetailSection as ProjectDetail } from "@/types/project";

type ProjectDetailSectionProps = {
  section: ProjectDetail;
};

export function ProjectDetailSection({ section }: ProjectDetailSectionProps) {
  return (
    <section id={section.id} className="border-t border-zinc-200 py-8">
      <h2 className="text-xl font-semibold">{section.title}</h2>
      <p className="mt-3 leading-7 text-zinc-600">{section.content}</p>
    </section>
  );
}
