import { ProjectMedia } from "@/components/project/ProjectMedia";
import type { ProjectMediaComparison } from "@/types/project";

type ProjectImageComparisonProps = {
  comparison: ProjectMediaComparison;
};

export function ProjectImageComparison({ comparison }: ProjectImageComparisonProps) {
  return (
    <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <div className="min-w-0">
        <p className="mb-3 text-xs font-bold tracking-[0.16em] text-slate-500">BEFORE</p>
        <ProjectMedia contained hideCaption media={comparison.before} />
      </div>
      <div className="flex justify-center text-2xl font-light text-blue-500" aria-hidden="true">
        <span className="lg:hidden">↓</span>
        <span className="hidden lg:inline">→</span>
      </div>
      <div className="min-w-0">
        <p className="mb-3 text-xs font-bold tracking-[0.16em] text-blue-700">AFTER</p>
        <ProjectMedia contained hideCaption media={comparison.after} />
      </div>
    </div>
  );
}
