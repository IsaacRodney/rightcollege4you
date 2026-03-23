import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SectionIntro from "../components/SectionIntro";
import StoryCard from "../components/StoryCard";
import TestimonialCard from "../components/TestimonialCard";
import useSeo from "../hooks/useSeo";
import { fetchStories } from "../lib/api";

const testimonials = [
  {
    quote: "The application strategy felt custom from day one. My daughter was calmer, sharper, and got into her dream school.",
    author: "Parent of Stanford admit",
    result: "Accepted to Stanford and UCLA"
  },
  {
    quote: "Every essay draft got stronger, and I finally knew how to tell my story instead of sounding generic.",
    author: "NYU admit",
    result: "Accepted to NYU, USC, and Boston University"
  }
];

const stats = [
  { value: "95%", label: "acceptance rate" },
  { value: "100+", label: "students helped" },
  { value: "1:1", label: "personalized advising" }
];

export default function HomePage() {
  useSeo(
    "Get Into Your Dream College",
    "RightCollege4You helps students build standout college applications with strategy, essay support, and personalized mentorship."
  );

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStories()
      .then((data) => setStories(data.slice(0, 3)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-20 lg:grid-cols-[1.15fr_.85fr] lg:pt-28">
        <div>
          <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Personalized College Consulting
          </p>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-none tracking-tight text-white md:text-8xl">
            Get Into Your Dream College
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            RightCollege4You helps students turn strong potential into standout applications with tailored strategy, essay coaching, and calm, proven guidance.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/success-stories"
              className="rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-white"
            >
              View Success Stories
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Results Snapshot</p>
          <div className="mt-8 grid gap-5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="font-display text-5xl text-white">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionIntro
          eyebrow="Featured Outcomes"
          title="Real students. Real admits. Clear progress."
          description="Each application plan is shaped around the student’s voice, strengths, and goals. Here’s a look at recent wins."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {loading && <LoadingState label="Loading success stories..." />}
          {error && <ErrorState message={error} />}
          {!loading && !error && stories.map((story) => <StoryCard key={story.id} story={story} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[.95fr_1.05fr]">
        <SectionIntro
          eyebrow="Why Families Choose Us"
          title="Strategy that feels personal, not generic."
          description="We combine admissions expertise with thoughtful coaching so students can submit stronger applications without losing themselves in the process."
        />
        <div className="grid gap-6">
          {testimonials.map((item) => (
            <TestimonialCard key={item.author} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
