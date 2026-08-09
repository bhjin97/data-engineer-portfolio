import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-slate-200 bg-slate-50 px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
          {profile.about.heading.map((line) => <span className="block" key={line}>{line}</span>)}
        </h2>
        <div className="space-y-4 text-base leading-8 text-slate-600">
          {profile.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
