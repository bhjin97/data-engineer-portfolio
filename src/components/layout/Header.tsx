import Link from "next/link";
import { profile } from "@/data/profile";

const navigation = [
  ["Projects", "/#projects"],
  ["Skills", "/#skills"],
  ["Education", "/#education"],
  ["About", "/#about"],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link className="shrink-0 text-sm font-bold tracking-tight text-slate-950 sm:text-base" href="/">
          {profile.name}
        </Link>
        <nav aria-label="주요 메뉴" className="min-w-0 overflow-x-auto">
          <ul className="flex items-center gap-4 whitespace-nowrap text-sm font-medium text-slate-600 sm:gap-7">
            {navigation.map(([label, href]) => (
              <li key={href}>
                <Link className="transition-colors hover:text-blue-700" href={href}>
                  {label}
                </Link>
              </li>
            ))}
            <li><a className="transition-colors hover:text-blue-700" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a className="transition-colors hover:text-blue-700" href={profile.links.blog} target="_blank" rel="noopener noreferrer">Blog</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
