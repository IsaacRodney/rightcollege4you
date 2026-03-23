const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function parseResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function fetchStories() {
  return parseResponse(await fetch(`${API_URL}/stories`));
}

export async function fetchStoryBySlug(slug) {
  return parseResponse(await fetch(`${API_URL}/stories/${slug}`));
}

export async function submitLead(payload) {
  return parseResponse(
    await fetch(`${API_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
  );
}

export async function adminLogin(token) {
  return parseResponse(
    await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
  );
}

export async function saveStory(story, token) {
  return parseResponse(
    await fetch(`${API_URL}/admin/stories`, {
      method: story.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(story)
    })
  );
}
