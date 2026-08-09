type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
