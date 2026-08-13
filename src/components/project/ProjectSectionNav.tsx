"use client";

import { useEffect, useState } from "react";

export type SectionNavItem = {
  id: string;
  label: string;
};

type ProjectSectionNavProps = {
  items: readonly SectionNavItem[];
};

export function ProjectSectionNav({ items }: ProjectSectionNavProps) {
  const [activeSection, setActiveSection] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      const marker = window.scrollY + 225;
      let currentSection = items[0]?.id ?? "";

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          currentSection = section.id;
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
  }, [items]);

  return (
    <nav
      aria-label="프로젝트 섹션"
      className="sticky top-16 z-40 border-y border-slate-200 bg-white/95 px-5 sm:px-8"
    >
      <div className="mx-auto max-w-6xl overflow-x-auto">
        <ul className="flex min-w-max items-center gap-3 py-3 text-sm text-slate-700 sm:gap-8 sm:py-6">
          {items.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={`relative flex min-h-11 items-center rounded-sm px-2 transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600 lg:min-h-0 lg:px-0 lg:pb-2 lg:pt-1 ${
                    isActive
                      ? "font-semibold text-blue-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-blue-600"
                      : "font-medium"
                  }`}
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
