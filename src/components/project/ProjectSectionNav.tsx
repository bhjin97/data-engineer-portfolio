"use client";

import { useEffect, useState } from "react";

const items = [
  ["Overview", "overview"],
  ["Pipeline", "data-flow"],
  ["Decisions", "decisions"],
  ["Modeling", "modeling"],
  ["Operations", "operations"],
  ["Troubleshooting", "troubleshooting"],
  ["Validation", "validation"],
  ["Next Step", "next-step"],
] as const;

export function ProjectSectionNav() {
  const [activeSection, setActiveSection] = useState<(typeof items)[number][1]>("overview");

  useEffect(() => {
    const sections = items
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      const marker = window.scrollY + 145;
      let currentSection: (typeof items)[number][1] = items[0][1];

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          currentSection = section.id as (typeof items)[number][1];
        } else {
          break;
        }
      }

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <nav
      aria-label="프로젝트 섹션"
      className="sticky top-16 z-40 border-y border-slate-200 bg-white/95 px-5 sm:px-8"
    >
      <div className="mx-auto max-w-6xl overflow-x-auto">
        <ul className="flex min-w-max items-center gap-7 py-5 text-sm text-slate-700 sm:gap-8 sm:py-6">
          {items.map(([label, id]) => {
            const isActive = activeSection === id;

            return (
              <li key={id}>
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block pb-2 pt-1 transition-colors hover:text-blue-700 ${
                    isActive
                      ? "font-semibold text-blue-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-blue-600"
                      : "font-medium"
                  }`}
                  href={`#${id}`}
                  onClick={() => setActiveSection(id)}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
