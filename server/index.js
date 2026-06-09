import express from "express";
import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { analyzeJobDescription, getRemainingRequests } from "./jdMatcher.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
dotenv.config({ path: path.join(rootDir, ".env") });

const distPath = path.join(rootDir, "dist");
const app = express();

app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));

function clientId(req) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

app.get("/api/jd-match/remaining", (req, res) => {
  res.json({ remaining: getRemainingRequests(clientId(req)) });
});

app.post("/api/jd-match", async (req, res) => {
  try {
    const { jd, outputLang = "en" } = req.body ?? {};
    const result = await analyzeJobDescription(jd, outputLang, clientId(req));
    res.json({
      result,
      remaining: getRemainingRequests(clientId(req)),
    });
  } catch (err) {
    const known = new Set([
      "JD_TOO_SHORT",
      "RATE_LIMIT",
      "MISSING_API_KEY",
      "INVALID_API_KEY",
      "INSUFFICIENT_BALANCE",
      "NETWORK_ERROR",
      "API_ERROR",
    ]);
    const code = err instanceof Error && known.has(err.message) ? err.message : "API_ERROR";
    const status =
      code === "JD_TOO_SHORT"
        ? 400
        : code === "RATE_LIMIT"
          ? 429
          : code === "MISSING_API_KEY" || code === "INVALID_API_KEY"
            ? 503
            : code === "INSUFFICIENT_BALANCE"
              ? 402
              : code === "NETWORK_ERROR"
                ? 503
                : 502;
    res.status(status).json({ error: code });
  }
});

if (!existsSync(distPath)) {
  console.error(
    "ERROR: dist/ folder not found. The website cannot be served until dist/ exists.",
  );
} else {
  app.use(express.static(distPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) next(err);
    });
  });
}

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ error: "NOT_FOUND" });
    return;
  }
  res.status(404).send("Not found");
});

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  if (!process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY === "your_key_here") {
    console.warn("WARNING: DEEPSEEK_API_KEY is not set. JD Matcher will return a configuration error.");
  } else {
    console.log("DeepSeek API key loaded.");
  }
});
