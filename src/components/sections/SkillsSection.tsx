/* eslint-disable @next/next/no-img-element */
import { skills } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-slate-200 bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Skills" />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 min-[360px]:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <div key={group.category} className="bg-white p-6">
              <h3 className="text-sm font-semibold text-slate-950">{group.category}</h3>
              {group.items.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex max-w-full items-center">
                      <img
                        src={item.badgeUrl}
                        alt={`${item.name} 기술 배지`}
                        loading="lazy"
                        decoding="async"
                        className="h-5 max-w-full object-contain object-left"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-zinc-600">{group.note}</p>
              )}
            </div>
          ))}
          <div aria-hidden="true" className="hidden bg-white min-[360px]:block" />
        </div>
      </div>
    </section>
  );
}
