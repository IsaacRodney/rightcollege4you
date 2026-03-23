import express from "express";
import { readJson } from "../utils/storage.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    res.json(await readJson("stories.json"));
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const stories = await readJson("stories.json");
    const story = stories.find((item) => item.slug === req.params.slug);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(story);
  } catch (error) {
    next(error);
  }
});

export default router;
