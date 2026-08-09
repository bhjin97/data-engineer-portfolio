import { education } from "@/data/education";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 border-b border-slate-200 bg-slate-50 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Education" />
        <ol className="space-y-4">
          {education.map((item) => (
            <li key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid sm:grid-cols-[180px_1fr] sm:gap-8 sm:p-7">
              <div>
                <p className="text-sm font-semibold text-blue-700">{item.period}</p>
                {item.hours ? <p className="mt-2 text-xs text-slate-500">{item.hours}</p> : null}
              </div>
              <div className="mt-4 sm:mt-0">
                <h3 className="text-lg font-bold text-slate-950">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.subject}</p>
                {item.project ? <p className="mt-4 text-sm"><span className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Project</span>{item.project.href ? <Link className="font-semibold text-blue-700 hover:text-blue-800" href={item.project.href}>{item.project.name}</Link> : <span className="font-medium text-slate-700">{item.project.name}</span>}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
