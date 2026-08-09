import { certifications } from "@/data/certifications";
import { SectionHeading } from "./SectionHeading";

export function CertificationsSection() {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Certifications" />
        <ul className="grid gap-3 sm:grid-cols-3">
          {certifications.map((certification) => (
            <li key={certification.name} className="rounded-xl border border-slate-200 px-5 py-4 text-sm font-semibold text-slate-700">
              {certification.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
