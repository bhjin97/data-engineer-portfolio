import { certifications } from "@/data/certifications";
import type { Certification } from "@/types/profile";
import { SectionHeading } from "./SectionHeading";

const certificationAccentStyles: Record<Certification["accent"], string> = {
  blue: "border-blue-200 border-l-blue-500 bg-blue-50/40 hover:border-blue-300",
  amber: "border-amber-200 border-l-amber-500 bg-amber-50/40 hover:border-amber-300",
  cyan: "border-cyan-200 border-l-cyan-600 bg-cyan-50/40 hover:border-cyan-300",
};

export function CertificationsSection() {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Certifications" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification) => (
            <li
              key={certification.name}
              className={`min-w-0 rounded-xl border border-l-4 px-5 py-4 transition-colors ${certificationAccentStyles[certification.accent]}`}
            >
              <p className="text-sm font-semibold text-slate-900">{certification.name}</p>
              <p className="mt-1.5 break-words text-xs leading-5 text-slate-500">{certification.issuer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
