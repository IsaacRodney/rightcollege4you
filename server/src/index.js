import "dotenv/config";
import cors from "cors";
import express from "express";
import adminRoutes from "./routes/admin.js";
import leadsRoutes from "./routes/leads.js";
import storiesRoutes from "./routes/stories.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/stories", storiesRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/admin", adminRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`RightCollege4You API running on http://localhost:${port}`);
});
