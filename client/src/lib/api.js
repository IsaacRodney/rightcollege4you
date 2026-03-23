const STORIES_KEY = "rc4u-stories";
const LEADS_KEY = "rc4u-leads";
const DEFAULT_ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || "rightcollege-admin";

const seedStories = [
  {
    id: "1",
    slug: "maya-s-stanford",
    name: "Maya S.",
    highSchool: "Arcadia High School",
    topSchool: "Stanford",
    metrics: {
      gpa: "4.0 UW / 4.6 W",
      testScore: "SAT 1540"
    },
    activities: ["Robotics captain", "Nonprofit coding mentor", "Science Olympiad medalist"],
    acceptedColleges: ["Stanford", "UCLA", "UC Berkeley", "Carnegie Mellon"],
    summary: "Maya had strong numbers but needed a more memorable application narrative tied to leadership and impact.",
    fullStory:
      "We repositioned Maya's application around the systems she built for others, not just the awards she won.\n\nHer essays shifted from achievement lists to a clear story about engineering as community problem-solving. We also refined her supplemental essays so each school saw a distinct fit.\n\nThe final result was a polished application that felt ambitious, specific, and personal."
  },
  {
    id: "2",
    slug: "daniel-l-nyu",
    name: "Daniel L.",
    highSchool: "Mira Costa High School",
    topSchool: "NYU",
    metrics: {
      gpa: "3.82 UW / 4.2 W",
      testScore: "Test-optional"
    },
    activities: ["Student journalist", "Film club director", "Part-time videographer"],
    acceptedColleges: ["NYU", "USC", "Boston University", "Loyola Marymount"],
    summary: "Daniel's profile was creative and compelling, but his early essays sounded too broad and academic.",
    fullStory:
      "We leaned into Daniel's storytelling strengths and used his media work to anchor a more cohesive brand.\n\nHis application evolved from polished but generic to vivid and unmistakably his. We also narrowed the school list to emphasize programs where his portfolio and voice would stand out.\n\nThat strategic clarity helped him earn multiple strong admits, including his first-choice program at NYU."
  },
  {
    id: "3",
    slug: "priya-k-columbia",
    name: "Priya K.",
    highSchool: "Cupertino High School",
    topSchool: "Columbia",
    metrics: {
      gpa: "3.95 UW / 4.5 W",
      testScore: "ACT 35"
    },
    activities: ["Debate team president", "Hospital volunteer", "Research intern"],
    acceptedColleges: ["Columbia", "Cornell", "Emory", "UC San Diego"],
    summary: "Priya needed help presenting a multidimensional identity instead of sounding like a typical pre-med applicant.",
    fullStory:
      "Our work centered on nuance. We helped Priya connect her debate experience, research interests, and service work into a more reflective personal narrative.\n\nWe also made her supplemental essays sharper and more school-specific, which strengthened the overall coherence of each application.\n\nThe result was a thoughtful admissions package that helped her reach an Ivy admit."
  }
];

function getStoredJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setStoredJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureStories() {
  const stories = getStoredJson(STORIES_KEY, []);
  if (stories.length > 0) {
    return stories;
  }

  setStoredJson(STORIES_KEY, seedStories);
  return seedStories;
}

export async function fetchStories() {
  return ensureStories();
}

export async function fetchStoryBySlug(slug) {
  const story = ensureStories().find((item) => item.slug === slug);

  if (!story) {
    throw new Error("Story not found");
  }

  return story;
}

export async function submitLead(payload) {
  const { name, email, gradeLevel, goals } = payload;

  if (!name || !email || !gradeLevel || !goals) {
    throw new Error("All fields are required");
  }

  const leads = getStoredJson(LEADS_KEY, []);
  leads.push({
    id: crypto.randomUUID(),
    ...payload,
    createdAt: new Date().toISOString()
  });
  setStoredJson(LEADS_KEY, leads);

  return { message: "Thanks! Your inquiry was saved locally in this browser." };
}

export async function adminLogin(token) {
  if (token !== DEFAULT_ADMIN_TOKEN) {
    throw new Error("Invalid admin token");
  }

  return { message: "Authorized" };
}

export async function saveStory(story, token) {
  if (token !== DEFAULT_ADMIN_TOKEN) {
    throw new Error("Unauthorized");
  }

  const stories = ensureStories();

  if (story.id) {
    const index = stories.findIndex((item) => item.id === story.id);
    if (index === -1) {
      throw new Error("Story not found");
    }

    stories[index] = story;
    setStoredJson(STORIES_KEY, stories);
    return story;
  }

  const newStory = { ...story, id: crypto.randomUUID() };
  stories.unshift(newStory);
  setStoredJson(STORIES_KEY, stories);
  return newStory;
}
