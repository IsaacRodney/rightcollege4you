import crypto from "node:crypto";
import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import { readJson, writeJson } from "../utils/storage.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { token } = req.body;
  const expectedToken = process.env.ADMIN_TOKEN || "rightcollege-admin";

  if (token !== expectedToken) {
    return res.status(401).json({ message: "Invalid admin token" });
  }

  res.json({ message: "Authorized" });
});

router.post("/stories", requireAdmin, async (req, res, next) => {
  try {
    const stories = await readJson("stories.json");
    const newStory = { ...req.body, id: crypto.randomUUID() };
    stories.unshift(newStory);
    await writeJson("stories.json", stories);
    res.status(201).json(newStory);
  } catch (error) {
    next(error);
  }
});

router.put("/stories", requireAdmin, async (req, res, next) => {
  try {
    const stories = await readJson("stories.json");
    const index = stories.findIndex((story) => story.id === req.body.id);

    if (index === -1) {
      return res.status(404).json({ message: "Story not found" });
    }

    stories[index] = req.body;
    await writeJson("stories.json", stories);
    res.json(stories[index]);
  } catch (error) {
    next(error);
  }
});

export default router;
