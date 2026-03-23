import crypto from "node:crypto";
import express from "express";
import { readJson, writeJson } from "../utils/storage.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, gradeLevel, goals } = req.body;

    if (!name || !email || !gradeLevel || !goals) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leads = await readJson("leads.json");
    leads.push({
      id: crypto.randomUUID(),
      name,
      email,
      gradeLevel,
      goals,
      createdAt: new Date().toISOString()
    });

    await writeJson("leads.json", leads);
    res.status(201).json({ message: "Thanks! We received your inquiry and will be in touch soon." });
  } catch (error) {
    next(error);
  }
});

export default router;
