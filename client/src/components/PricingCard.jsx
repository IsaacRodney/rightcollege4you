import { Link } from "react-router-dom";

export default function PricingCard({ tier, featured = false }) {
  return (
    <article
      className={`rounded-[2rem] border p-8 ${
        featured
          ? "border-accent/30 bg-gradient-to-b from-accent/15 to-white/5 shadow-glow"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-3xl text-white">{tier.name}</h3>
        {featured && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-950">
            Most Popular
          </span>
        )}
      </div>
      <p className="mt-4 text-4xl font-semibold text-white">{tier.price}</p>
      <p className="mt-3 text-sm leading-7 text-slate-300">{tier.description}</p>
      <div className="mt-6 space-y-3 text-sm text-slate-200">
        {tier.features.map((feature) => (
          <p key={feature} className="rounded-full border border-white/10 px-4 py-2">
            {feature}
          </p>
        ))}
      </div>
      <Link
        to="/contact"
        className={`mt-8 inline-flex rounded-full px-5 py-3 text-sm font-semibold transition ${
          featured ? "bg-accent text-slate-950 hover:bg-white" : "border border-white/15 bg-white/8 text-white hover:bg-white/15"
        }`}
      >
        Book a Consultation
      </Link>
    </article>
  );
}
