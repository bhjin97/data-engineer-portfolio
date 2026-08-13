import type { ProjectLink } from "@/types/project";

type ProjectResourceLinksProps = {
  links: readonly ProjectLink[];
};

export function ProjectResourceLinks({ links }: ProjectResourceLinksProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, index) => (
        <a
          className={
            index === 0
              ? "inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              : "inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          }
          href={link.href}
          key={link.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
