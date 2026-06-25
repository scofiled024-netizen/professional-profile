import { CANDIDATE_PROFILE } from "./profile.js";
import { isDeepSeekConfigured } from "./deepseekEnv.js";

const VALID_LABELS = ["Strong Fit", "Good Fit", "Partial Fit", "Stretch Role"];
const API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-v4-flash";

function labelFromScore(score) {
  if (score >= 80) return "Strong Fit";
  if (score >= 65) return "Good Fit";
  if (score >= 45) return "Partial Fit";
  return "Stretch Role";
}

function asStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string" && item.trim()) : [];
}

function buildSystemPrompt(outputLang) {
  const languageInstruction =
    outputLang === "zh"
      ? `- Write all string values in Simplified Chinese (简体中文).
- Keep "fitLabel" as one of: Strong Fit, Good Fit, Partial Fit, Stretch Role (English only).`
      : `- Write all string values in English.`;

  return `You are an experienced HR recruiter preparing a structured fit report for a hiring manager evaluating Chao Liu for a specific role.

CANDIDATE PROFILE:
${JSON.stringify(CANDIDATE_PROFILE, null, 2)}

INSTRUCTIONS:
- Compare the pasted job description against this candidate's real background only. Do not invent experience.
- Draw on selectedWork (detailed case studies), experience, capabilityGroups, howIWork, careerBridges, and knowledgePillars as evidence — not summary alone.
- Be honest, recruiter-style: no cheerleading, no generic praise, no filler.
- fitScore: integer 0–100 reflecting overall role fit based on evidence in the profile.
- fitLabel: exactly one of "Strong Fit" (80–100), "Good Fit" (65–79), "Partial Fit" (45–64), "Stretch Role" (below 45). Must align with fitScore.
- strengths: 3–5 bullets connecting Chao's real experience to JD requirements.
- gaps: 2–4 honest but constructive gaps.
- interviewTalkingPoints: 3 concise, role-specific talking points Chao can use in an interview.
- recruiterSummary: 80–120 words from a recruiter/hiring manager perspective summarizing fit and recommendation.
- resumeKeywords: 8–12 keywords/phrases from the JD that Chao should emphasize on his resume.
${languageInstruction}

Respond ONLY with valid JSON in this exact shape:
{
  "fitScore": 82,
  "fitLabel": "Strong Fit",
  "strengths": ["..."],
  "gaps": ["..."],
  "interviewTalkingPoints": ["..."],
  "recruiterSummary": "...",
  "resumeKeywords": ["..."]
}`;
}

export function normalizeResult(parsed) {
  let fitScore = Number(parsed.fitScore);
  if (!Number.isFinite(fitScore)) fitScore = 70;
  fitScore = Math.max(0, Math.min(100, Math.round(fitScore)));

  let fitLabel = typeof parsed.fitLabel === "string" ? parsed.fitLabel.trim() : "";
  if (!VALID_LABELS.includes(fitLabel)) {
    fitLabel = labelFromScore(fitScore);
  }

  const strengths = asStringArray(parsed.strengths);
  const gaps = asStringArray(parsed.gaps);
  const interviewTalkingPoints = asStringArray(parsed.interviewTalkingPoints);
  const recruiterSummary =
    typeof parsed.recruiterSummary === "string" ? parsed.recruiterSummary.trim() : "";
  const resumeKeywords = asStringArray(parsed.resumeKeywords);

  if (!recruiterSummary || strengths.length === 0) {
    throw new Error("API_ERROR");
  }

  return {
    fitScore,
    fitLabel,
    strengths: strengths.slice(0, 5),
    gaps: gaps.slice(0, 4),
    interviewTalkingPoints: interviewTalkingPoints.slice(0, 3),
    recruiterSummary,
    resumeKeywords: resumeKeywords.slice(0, 12),
  };
}

function parseModelContent(content) {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("API_ERROR");
  return normalizeResult(JSON.parse(jsonMatch[0]));
}

export async function analyzeJobDescription(jobDescription, outputLang = "en") {
  if (!isDeepSeekConfigured()) {
    throw new Error("MISSING_API_KEY");
  }
  const apiKey = process.env.DEEPSEEK_API_KEY.trim();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt(outputLang) },
        {
          role: "user",
          content: `Job description to evaluate:\n\n${jobDescription}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  const rawBody = await response.text();

  if (response.status === 401) throw new Error("INVALID_API_KEY");
  if (response.status === 402) throw new Error("INSUFFICIENT_BALANCE");
  if (response.status === 429) throw new Error("RATE_LIMIT");
  if (!response.ok) {
    console.error(`DeepSeek HTTP ${response.status}:`, rawBody.slice(0, 400));
    throw new Error("API_ERROR");
  }

  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    throw new Error("API_ERROR");
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("API_ERROR");

  return parseModelContent(content);
}
