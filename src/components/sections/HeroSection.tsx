import Link from "next/link";
import { profile } from "@/data/profile";

const primaryButton = "inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700";
const secondaryButton = "inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-700";

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <h1 className="text-[2.125rem] font-bold leading-tight tracking-tight text-slate-950 sm:text-[3.5rem] sm:leading-[1.12]">
            {profile.headline.map((line) => <span className="block" key={line}>{line}</span>)}
          </h1>
          <p className="mt-6 text-lg font-bold text-slate-950 sm:text-2xl">
            {profile.name}
            <span className="px-1.5 text-slate-300">·</span>
            <span className="text-blue-700">{profile.role}</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className={primaryButton} href="/#projects">Projects</Link>
            <a className={secondaryButton} href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className={secondaryButton} href={profile.links.blog} target="_blank" rel="noopener noreferrer">Blog</a>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:gap-5" aria-label="주요 기술 스택">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Core stack</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {profile.stack.map((technology) => (
              <li className="text-sm font-semibold text-slate-600" key={technology}>{technology}</li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
