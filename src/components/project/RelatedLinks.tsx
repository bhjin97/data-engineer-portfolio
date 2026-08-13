import type { ProjectLink } from "@/types/project";

type RelatedLinksProps = {
  links: ProjectLink[];
  openInNewTab?: boolean;
};

export function RelatedLinks({ links, openInNewTab = false }: RelatedLinksProps) {
  return (
    <section className="border-t border-zinc-200 py-8">
      <h2 className="text-xl font-semibold">Related Links</h2>
      {links.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="underline underline-offset-4"
                href={link.href}
                rel={openInNewTab ? "noopener noreferrer" : undefined}
                target={openInNewTab ? "_blank" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-zinc-600">확인된 관련 링크를 추후 추가할 예정입니다.</p>
      )}
    </section>
  );
}
