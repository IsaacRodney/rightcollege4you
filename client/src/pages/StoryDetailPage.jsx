import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import useSeo from "../hooks/useSeo";
import { fetchStoryBySlug } from "../lib/api";

export default function StoryDetailPage() {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStoryBySlug(slug)
      .then((data) => setStory(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  useSeo(
    story ? `${story.name} Success Story` : "Success Story",
    story
      ? `${story.name} earned admission to ${story.topSchool} with support from RightCollege4You.`
      : "Detailed RightCollege4You success story."
  );

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {loading && <LoadingState label="Loading story..." />}
      {error && <ErrorState message={error} />}
      {story && (
        <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-8 md:p-12">
          <Link to="/success-stories" className="text-sm font-semibold text-accent">
            Back to success stories
          </Link>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{story.highSchool}</p>
              <h1 className="mt-3 font-display text-5xl text-white">{story.name}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{story.summary}</p>
            </div>
            <div className="rounded-3xl border border-accent/30 bg-accent/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Top Result</p>
              <p className="mt-2 font-display text-3xl text-accent">{story.topSchool}</p>
            </div>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <h2 className="font-display text-2xl text-white">Profile Snapshot</h2>
              <div className="mt-5 space-y-3 text-slate-200">
                <p>GPA: {story.metrics.gpa || "N/A"}</p>
                <p>Test Scores: {story.metrics.testScore || "Test-optional"}</p>
                <p>Activities: {story.activities.join(", ")}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <h2 className="font-display text-2xl text-white">Accepted To</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {story.acceptedColleges.map((college) => (
                  <span key={college} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                    {college}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="font-display text-2xl text-white">How RightCollege4You Helped</h2>
            <p className="mt-4 whitespace-pre-line text-lg leading-8 text-slate-300">{story.fullStory}</p>
          </div>
        </div>
      )}
    </section>
  );
}
