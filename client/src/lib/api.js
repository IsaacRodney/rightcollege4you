const STORIES_KEY = "rc4u-stories";
const LEADS_KEY = "rc4u-leads";
const DEFAULT_ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || "rightcollege-admin";
const FORMLY_ACCESS_KEY = "d65049731ad54082a55fdea35c00495b";
const FORMLY_ENDPOINT = "https://formly.email/submit";

const seedStories = [
  {
    id: "1",
    slug: "student-a-stanford",
    name: "Student A",
    highSchool: "Arcadia High School",
    topSchool: "Stanford",
    metrics: {
      gpa: "4.0 UW / 4.6 W",
      testScore: "SAT 1540"
    },
    activities: ["Robotics captain", "Nonprofit coding mentor", "Science Olympiad medalist"],
    acceptedColleges: ["Stanford", "UCLA", "UC Berkeley", "Carnegie Mellon"],
    summary: "This student had strong numbers but needed a more memorable application narrative tied to leadership and impact.",
    fullStory:
      "We repositioned Maya's application around the systems she built for others, not just the awards she won.\n\nHer essays shifted from achievement lists to a clear story about engineering as community problem-solving. We also refined her supplemental essays so each school saw a distinct fit.\n\nThe final result was a polished application that felt ambitious, specific, and personal."
  },
  {
    id: "2",
    slug: "student-b-uchicago",
    name: "Student B",
    highSchool: "Mira Costa High School",
    topSchool: "UChicago",
    metrics: {
      gpa: "3.82 UW / 4.2 W",
      testScore: "Test-optional"
    },
    activities: ["Student journalist", "Film club director", "Part-time videographer"],
    acceptedColleges: ["UChicago", "Washington University", "Rice University", "UIUC"],
    summary: "This student's profile was creative and compelling, but the early essays sounded too broad and academic.",
    fullStory:
      "We leaned into this student's storytelling strengths and used media work to anchor a more cohesive brand.\n\nThe application evolved from polished but generic to vivid and unmistakably personal. We also narrowed the school list to emphasize programs where the portfolio and voice would stand out.\n\nThat strategic clarity helped produce multiple strong admits, including a first-choice outcome."
  },
  {
    id: "3",
    slug: "student-c-oxford",
    name: "Student C",
    highSchool: "Cupertino High School",
    topSchool: "Oxford University",
    metrics: {
      gpa: "3.95 UW / 4.5 W",
      testScore: "ACT 35"
    },
    activities: ["Debate team president", "Hospital volunteer", "Research intern"],
    acceptedColleges: ["Oxford University", "Cornell University", "UCSD"],
    summary: "This student needed help presenting a multidimensional identity instead of sounding like a typical pre-med applicant.",
    fullStory:
      "Our work centered on nuance. We helped this student connect debate experience, research interests, and service work into a more reflective personal narrative.\n\nWe also made the supplemental essays sharper and more school-specific, which strengthened the overall coherence of each application.\n\nThe result was a thoughtful admissions package that helped the student reach a standout admit."
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
    const seedById = Object.fromEntries(seedStories.map((story) => [story.id, story]));
    const mergedStories = stories.map((story) => seedById[story.id] ?? story);
    const needsRefresh = JSON.stringify(mergedStories) !== JSON.stringify(stories);

    if (needsRefresh) {
      setStoredJson(STORIES_KEY, mergedStories);
    }

    return mergedStories;
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

  const formData = new FormData();
  formData.append("access_key", FORMLY_ACCESS_KEY);
  formData.append("subject", "New RightCollege4You consultation request");
  formData.append("from_name", "RightCollege4You Website");
  formData.append("name", name);
  formData.append("email", email);
  formData.append("gradeLevel", gradeLevel);
  formData.append("goals", goals);
  formData.append("message", `Grade Level: ${gradeLevel}\nGoals: ${goals}`);
  formData.append("metadata[source]", "rightcollege4you-contact-page");
  formData.append("metadata[page_url]", window.location.href);

  const response = await fetch(FORMLY_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: formData
  });

  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : { success: response.ok, message: response.ok ? "Form submitted successfully." : "Unable to send consultation request" };

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Unable to send consultation request");
  }

  const leads = getStoredJson(LEADS_KEY, []);
  leads.push({
    id: crypto.randomUUID(),
    ...payload,
    createdAt: new Date().toISOString()
  });
  setStoredJson(LEADS_KEY, leads);

  return { message: "Thanks! Your consultation request was sent successfully." };
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
