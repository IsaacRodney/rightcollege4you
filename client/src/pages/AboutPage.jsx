import SectionIntro from "../components/SectionIntro";
import useSeo from "../hooks/useSeo";

const differentiators = [
  "Personalized strategy rooted in each student's voice, goals, and academic story",
  "Hands-on essay coaching that strengthens both content and confidence",
  "Clear timelines and accountability so families always know what comes next"
];

export default function AboutPage() {
  useSeo(
    "About",
    "Learn about RightCollege4You's mission, personalized college consulting approach, and founder story."
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionIntro
        eyebrow="About Us"
        title="A thoughtful path to stronger college applications."
        description="RightCollege4You was built to give students focused, human guidance through a process that often feels overwhelming and impersonal."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <h2 className="font-display text-3xl text-white">Our Mission</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            We help students present the strongest, truest version of themselves to colleges through sharp positioning, better essays, and a process designed to reduce stress.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Founder story placeholder: share the journey behind RightCollege4You, why this work matters, and the philosophy that shaped the service.
          </p>
        </article>
        <article className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8">
          <h2 className="font-display text-3xl text-white">What Makes Us Different</h2>
          <div className="mt-6 space-y-4">
            {differentiators.map((item) => (
              <p key={item} className="rounded-3xl border border-white/10 px-5 py-4 text-base leading-7 text-slate-200">
                {item}
              </p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
