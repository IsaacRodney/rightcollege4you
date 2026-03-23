import { useState } from "react";
import SectionIntro from "../components/SectionIntro";
import useSeo from "../hooks/useSeo";
import { submitLead } from "../lib/api";

const initialForm = {
  name: "",
  email: "",
  gradeLevel: "",
  goals: ""
};

export default function ContactPage() {
  useSeo(
    "Get Started",
    "Contact RightCollege4You to book a consultation and begin your personalized college admissions strategy."
  );

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await submitLead(form);
      setStatus({ type: "success", message: data.message });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <div>
          <SectionIntro
            eyebrow="Get Started"
            title="Book a strategy conversation."
            description="Tell us where you are in the process, what you’re aiming for, and how we can help."
          />
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Booking Preview</p>
            <h2 className="mt-4 font-display text-3xl text-white">Calendly-style placeholder</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Consultation slots can be embedded here later for direct scheduling. For now, submit the form and we’ll follow up personally.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-200">Name</span>
              <input
                required
                name="name"
                value={form.name}
                onChange={updateField}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-200">Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-200">Grade Level</span>
              <input
                required
                name="gradeLevel"
                value={form.gradeLevel}
                onChange={updateField}
                placeholder="9th grade, 11th grade, transfer, etc."
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-200">Goals</span>
              <textarea
                required
                name="goals"
                rows="6"
                value={form.goals}
                onChange={updateField}
                placeholder="Share your target schools, timeline, and where you want support."
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
              />
            </label>
          </div>
          {status.message && (
            <div
              className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
                status.type === "success" ? "bg-accent/15 text-accent" : "bg-rose-400/10 text-rose-200"
              }`}
            >
              {status.message}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
