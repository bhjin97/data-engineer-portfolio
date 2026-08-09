import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ProjectMedia as ProjectMediaData } from "@/types/project";

type ProjectMediaProps = {
  media: ProjectMediaData;
  compact?: boolean;
  contained?: boolean;
  hideCaption?: boolean;
};

export function ProjectMedia({ media, compact = false, contained = false, hideCaption = false }: ProjectMediaProps) {
  const publicPath = join(process.cwd(), "public", media.src.replace(/^\//, ""));
  const hasImage = existsSync(publicPath);

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {hasImage && contained ? (
        <div className="relative aspect-[4/3] w-full bg-slate-50">
          <Image
            alt={media.alt}
            className="object-contain"
            fill
            sizes="(max-width: 1023px) 100vw, 46vw"
            src={media.src}
          />
        </div>
      ) : hasImage ? (
        <Image
          alt={media.alt}
          className="h-auto w-full object-contain"
          height={compact ? 720 : 900}
          sizes={compact ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 1200px) 100vw, 1120px"}
          src={media.src}
          width={1600}
        />
      ) : (
        <div className={`flex items-center justify-center bg-slate-50 px-6 text-center ${contained ? "aspect-[4/3]" : compact ? "min-h-48" : "min-h-64 sm:min-h-80"}`}>
          <div>
            <p className="text-sm font-semibold text-slate-700">{media.label} image will be added</p>
            <p className="mt-2 break-all font-mono text-xs text-slate-400">{media.src}</p>
          </div>
        </div>
      )}
      {!hideCaption ? <figcaption className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
        {media.label}{media.description ? ` · ${media.description}` : ""}
      </figcaption> : null}
    </figure>
  );
}
