"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const navigation = [
  ["Projects", "/#projects"],
  ["Skills", "/#skills"],
  ["Education", "/#education"],
  ["About", "/#about"],
] as const;

const linkClass = "inline-flex min-h-11 items-center rounded-sm px-1 transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:min-h-0 sm:px-0";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95">
      <div className="relative mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link className="shrink-0 rounded-sm text-sm font-bold tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-base" href="/">
          {profile.name}
        </Link>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span aria-hidden="true" className="text-xl leading-none">{isOpen ? "×" : "≡"}</span>
        </button>

        <nav aria-label="주요 메뉴" className="hidden sm:block">
          <ul className="flex items-center gap-7 whitespace-nowrap text-sm font-medium text-slate-600">
            {navigation.map(([label, href]) => <li key={href}><Link className={linkClass} href={href}>{label}</Link></li>)}
            <li><a className={linkClass} href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a className={linkClass} href={profile.links.blog} target="_blank" rel="noopener noreferrer">Blog</a></li>
          </ul>
        </nav>

        {isOpen ? (
          <nav id="mobile-navigation" aria-label="모바일 주요 메뉴" className="absolute inset-x-5 top-[calc(100%+1px)] rounded-b-xl border-x border-b border-slate-200 bg-white p-3 shadow-lg sm:hidden">
            <ul className="grid grid-cols-2 gap-x-3 text-sm font-medium text-slate-700">
              {navigation.map(([label, href]) => <li key={href}><Link className={`${linkClass} w-full`} href={href} onClick={() => setIsOpen(false)}>{label}</Link></li>)}
              <li className="border-t border-slate-200"><a className={`${linkClass} w-full`} href={profile.links.github} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>GitHub <span className="ml-1" aria-hidden="true">↗</span></a></li>
              <li className="border-t border-slate-200"><a className={`${linkClass} w-full`} href={profile.links.blog} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>Blog <span className="ml-1" aria-hidden="true">↗</span></a></li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
