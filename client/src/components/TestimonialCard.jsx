export default function TestimonialCard({ quote, author, result }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
      <p className="text-lg leading-8 text-slate-100">"{quote}"</p>
      <div className="mt-6">
        <p className="font-semibold text-white">{author}</p>
        <p className="text-sm text-accent">{result}</p>
      </div>
    </article>
  );
}
