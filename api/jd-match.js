import { analyzeJobDescription } from "../lib/fitReport.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }

  try {
    const body = req.body ?? {};
    const jobDescription = String(body.jobDescription ?? body.jd ?? "").trim();
    const outputLang = body.outputLang === "zh" ? "zh" : "en";

    if (jobDescription.length < 30) {
      return res.status(400).json({ error: "JD_TOO_SHORT" });
    }

    const result = await analyzeJobDescription(jobDescription, outputLang);
    return res.status(200).json(result);
  } catch (err) {
    const code = err instanceof Error ? err.message : "UNKNOWN";

    if (code === "MISSING_API_KEY" || code === "INVALID_API_KEY") {
      return res.status(503).json({ error: code });
    }
    if (code === "INSUFFICIENT_BALANCE" || code === "RATE_LIMIT") {
      return res.status(502).json({ error: code });
    }
    if (code === "API_ERROR") {
      return res.status(502).json({ error: code });
    }

    console.error("jd-match error:", code);
    return res.status(500).json({ error: "API_ERROR" });
  }
}
