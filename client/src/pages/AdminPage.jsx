import { useEffect, useState } from "react";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import useSeo from "../hooks/useSeo";
import { adminLogin, fetchStories, saveStory } from "../lib/api";

const emptyStory = {
  name: "",
  slug: "",
  highSchool: "",
  topSchool: "",
  summary: "",
  fullStory: "",
  activities: "",
  acceptedColleges: "",
  gpa: "",
  testScore: ""
};

function normalizeStory(form, existingId) {
  return {
    id: existingId,
    name: form.name,
    slug: form.slug,
    highSchool: form.highSchool,
    topSchool: form.topSchool,
    summary: form.summary,
    fullStory: form.fullStory,
    activities: form.activities.split(",").map((item) => item.trim()).filter(Boolean),
    acceptedColleges: form.acceptedColleges.split(",").map((item) => item.trim()).filter(Boolean),
    metrics: {
      gpa: form.gpa,
      testScore: form.testScore
    }
  };
}

function storyToForm(story) {
  return {
    name: story.name,
    slug: story.slug,
    highSchool: story.highSchool,
    topSchool: story.topSchool,
    summary: story.summary,
    fullStory: story.fullStory,
    activities: story.activities.join(", "),
    acceptedColleges: story.acceptedColleges.join(", "),
    gpa: story.metrics.gpa || "",
    testScore: story.metrics.testScore || ""
  };
}

export default function AdminPage() {
  useSeo("Admin", "Manage RightCollege4You success stories.");

  const [token, setToken] = useState(localStorage.getItem("rc4u-admin-token") || "");
  const [isAuthed, setIsAuthed] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [form, setForm] = useState(emptyStory);
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    if (!token) return;
    adminLogin(token)
      .then(() => {
        setIsAuthed(true);
        localStorage.setItem("rc4u-admin-token", token);
      })
      .catch(() => setIsAuthed(false));
  }, [token]);

  useEffect(() => {
    setLoading(true);
    fetchStories()
      .then((data) => setStories(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await adminLogin(token);
      localStorage.setItem("rc4u-admin-token", token);
      setIsAuthed(true);
      setFeedback({ type: "success", message: "Admin access confirmed." });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    try {
      const saved = await saveStory(normalizeStory(form, editingId), token);
      setFeedback({ type: "success", message: `Saved ${saved.name}.` });
      setForm(emptyStory);
      setEditingId("");
      setStories(await fetchStories());
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  }

  function editStory(story) {
    setEditingId(story.id);
    setForm(storyToForm(story));
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  if (!isAuthed) {
    return (
      <section className="mx-auto max-w-xl px-6 py-20">
        <form onSubmit={handleLogin} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Admin</p>
          <h1 className="mt-4 font-display text-4xl text-white">Manage stories</h1>
          <p className="mt-4 text-slate-300">Use the shared admin token to access the story editor.</p>
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Admin token"
            className="mt-6 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-accent"
          />
          {feedback.message && <div className="mt-4 text-sm text-rose-200">{feedback.message}</div>}
          <button className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950">Sign In</button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <form onSubmit={handleSave} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <h1 className="font-display text-4xl text-white">{editingId ? "Edit Story" : "Add Story"}</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["name", "Student name or initials"],
              ["slug", "URL slug"],
              ["highSchool", "High school"],
              ["topSchool", "Top school"],
              ["gpa", "GPA"],
              ["testScore", "SAT / ACT / optional"]
            ].map(([name, placeholder]) => (
              <input
                key={name}
                name={name}
                value={form[name]}
                onChange={updateField}
                placeholder={placeholder}
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-accent"
              />
            ))}
          </div>
          <textarea
            name="summary"
            value={form.summary}
            onChange={updateField}
            rows="3"
            placeholder="Short summary"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-accent"
          />
          <textarea
            name="fullStory"
            value={form.fullStory}
            onChange={updateField}
            rows="6"
            placeholder="Detailed story"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-accent"
          />
          <textarea
            name="activities"
            value={form.activities}
            onChange={updateField}
            rows="3"
            placeholder="Activities, comma separated"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-accent"
          />
          <textarea
            name="acceptedColleges"
            value={form.acceptedColleges}
            onChange={updateField}
            rows="3"
            placeholder="Accepted colleges, comma separated"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-accent"
          />
          {feedback.message && (
            <div className={`mt-4 text-sm ${feedback.type === "success" ? "text-accent" : "text-rose-200"}`}>
              {feedback.message}
            </div>
          )}
          <button className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950">Save Story</button>
        </form>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8">
          <h2 className="font-display text-3xl text-white">Current Stories</h2>
          <p className="mt-3 text-slate-300">Select an item to load it into the form and edit its details.</p>
          <div className="mt-8 space-y-4">
            {loading && <LoadingState label="Loading stories..." />}
            {!loading &&
              stories.map((story) => (
                <button
                  type="button"
                  key={story.id}
                  onClick={() => editStory(story)}
                  className="w-full rounded-3xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-accent/40"
                >
                  <p className="font-semibold text-white">{story.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{story.highSchool} | {story.topSchool}</p>
                </button>
              ))}
            {!loading && stories.length === 0 && <ErrorState message="No stories found yet." />}
          </div>
        </div>
      </div>
    </section>
  );
}
