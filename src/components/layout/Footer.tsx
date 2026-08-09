import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p><span className="font-semibold text-slate-700">{profile.name}</span> · {profile.role}</p>
        <div className="flex gap-5">
          <a className="hover:text-blue-700" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="hover:text-blue-700" href={profile.links.blog} target="_blank" rel="noopener noreferrer">Blog</a>
        </div>
      </div>
    </footer>
  );
}
