import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Contact" />
        <address className="grid gap-3 not-italic sm:grid-cols-2 lg:grid-cols-4">
          <a className="min-w-0 rounded-xl border border-slate-200 p-5 transition-colors hover:border-blue-300" href={`mailto:${profile.contact.email}`}><span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email</span><span className="mt-2 block break-all text-sm font-semibold text-slate-800">{profile.contact.email}</span></a>
          <a className="rounded-xl border border-slate-200 p-5 transition-colors hover:border-blue-300" href={profile.contact.phoneHref}><span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Phone</span><span className="mt-2 block text-sm font-semibold text-slate-800">{profile.contact.phone}</span></a>
          <a className="rounded-xl border border-slate-200 p-5 transition-colors hover:border-blue-300" href={profile.links.github} target="_blank" rel="noopener noreferrer"><span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">GitHub</span><span className="mt-2 block text-sm font-semibold text-blue-700">bhjin97 ↗</span></a>
          <a className="rounded-xl border border-slate-200 p-5 transition-colors hover:border-blue-300" href={profile.links.blog} target="_blank" rel="noopener noreferrer"><span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Blog</span><span className="mt-2 block text-sm font-semibold text-blue-700">Velog ↗</span></a>
        </address>
      </div>
    </section>
  );
}
