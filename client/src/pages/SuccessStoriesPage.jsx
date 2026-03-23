import { useEffect, useState } from "react";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SectionIntro from "../components/SectionIntro";
import StoryCard from "../components/StoryCard";
import useSeo from "../hooks/useSeo";
import { fetchStories } from "../lib/api";

export default function SuccessStoriesPage() {
  useSeo(
    "Success Stories",
    "See how RightCollege4You students improved their applications and earned admission to top colleges."
  );

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStories()
      .then((data) => setStories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionIntro
        eyebrow="Success Stories"
        title="Accepted with intention, not guesswork."
        description="Browse sample student outcomes, academic profiles, and the strategic changes that made their applications more compelling."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading && <LoadingState label="Loading student profiles..." />}
        {error && <ErrorState message={error} />}
        {!loading && !error && stories.map((story) => <StoryCard key={story.id} story={story} />)}
      </div>
    </section>
  );
}
