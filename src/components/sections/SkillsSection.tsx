import { skills } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-slate-200 bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Skills" />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
          <div key={group.category} className="bg-white p-6">
            <h3 className="text-sm font-semibold text-slate-950">{group.category}</h3>
            {group.items.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-slate-600">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-zinc-600">{group.note}</p>
            )}
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
