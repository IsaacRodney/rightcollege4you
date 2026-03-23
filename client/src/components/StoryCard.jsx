export default function StoryCard({ story }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl text-white">{story.name}</h3>
        </div>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {story.topSchool}
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
        {story.metrics.gpa && <span className="rounded-full bg-white/8 px-3 py-1">GPA {story.metrics.gpa}</span>}
        {story.metrics.testScore && <span className="rounded-full bg-white/8 px-3 py-1">{story.metrics.testScore}</span>}
      </div>
      <p className="mt-6 text-base leading-7 text-slate-300">{story.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {story.acceptedColleges.slice(0, 4).map((college) => (
          <span key={college} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">
            {college}
          </span>
        ))}
      </div>
    </article>
  );
}
