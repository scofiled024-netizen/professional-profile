import { CANDIDATE_PROFILE } from "./profile.js";
import { postJson } from "./deepseekHttp.js";

const API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-chat";
const RATE_LIMIT_MAX = 26;

/** @type {Map<string, { count: number; date: string }>} */
const rateLimitStore = new Map();

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getClientUsage(clientId) {
  const key = clientId || "unknown";
  const entry = rateLimitStore.get(key);
  const today = todayKey();

  if (!entry || entry.date !== today) {
    return { count: 0, date: today };
  }
  return entry;
}

export function getRemainingRequests(clientId) {
  const usage = getClientUsage(clientId);
  return Math.max(0, RATE_LIMIT_MAX - usage.count);
}

function incrementUsage(clientId) {
  const key = clientId || "unknown";
  const usage = getClientUsage(key);
  rateLimitStore.set(key, { count: usage.count + 1, date: usage.date });
}

function mapDeepSeekStatus(status) {
  if (status === 401) return "INVALID_API_KEY";
  if (status === 402) return "INSUFFICIENT_BALANCE";
  if (status === 429) return "RATE_LIMIT";
  return "API_ERROR";
}

/**
 * @param {"en" | "zh"} outputLang
 */
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
- Be honest, recruiter-style: no cheerleading, no generic praise, no filler.
- fitScore: integer 0–100 reflecting overall role fit based on evidence in the profile.
- fitLabel: exactly one of "Strong Fit" (80–100), "Good Fit" (65–79), "Partial Fit" (45–64), "Stretch Role" (below 45). Must align with fitScore.
- strengths: 3–5 bullets connecting Chao's real experience to JD requirements (bilingual communication, client-facing, trade, B2B, coffee/service, operations, AI curiosity as relevant).
- gaps: 2–4 honest but constructive gaps (e.g. "Limited direct SaaS experience, but transferable client support background.").
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

const VALID_LABELS = ["Strong Fit", "Good Fit", "Partial Fit", "Stretch Role"];

function labelFromScore(score) {
  if (score >= 80) return "Strong Fit";
  if (score >= 65) return "Good Fit";
  if (score >= 45) return "Partial Fit";
  return "Stretch Role";
}

function asStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string" && item.trim()) : [];
}

function normalizeResult(parsed) {
  let fitScore = Number(parsed.fitScore);
  if (!Number.isFinite(fitScore)) {
    const legacyRating = parsed.rating;
    if (legacyRating === "Strong") fitScore = 85;
    else if (legacyRating === "Moderate") fitScore = 72;
    else if (legacyRating === "Partial") fitScore = 55;
    else fitScore = 70;
  }
  fitScore = Math.max(0, Math.min(100, Math.round(fitScore)));

  let fitLabel = typeof parsed.fitLabel === "string" ? parsed.fitLabel.trim() : "";
  if (!VALID_LABELS.includes(fitLabel)) {
    fitLabel = labelFromScore(fitScore);
  }

  const strengths = asStringArray(parsed.strengths).length
    ? asStringArray(parsed.strengths)
    : asStringArray(parsed.fitPoints);
  const gaps = asStringArray(parsed.gaps);
  const interviewTalkingPoints = asStringArray(parsed.interviewTalkingPoints);
  let recruiterSummary =
    typeof parsed.recruiterSummary === "string"
      ? parsed.recruiterSummary.trim()
      : typeof parsed.assessment === "string"
        ? parsed.assessment.trim()
        : typeof parsed.summary === "string"
          ? parsed.summary.trim()
          : "";
  const resumeKeywords = asStringArray(parsed.resumeKeywords);

  if (!recruiterSummary || strengths.length === 0) {
    throw new Error("incomplete payload");
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

function parseResult(content) {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("DeepSeek response missing JSON:", content.slice(0, 300));
    throw new Error("API_ERROR");
  }

  try {
    return normalizeResult(JSON.parse(jsonMatch[0]));
  } catch (err) {
    console.error("Failed to parse DeepSeek JSON:", err instanceof Error ? err.message : err);
    console.error("Raw content:", content.slice(0, 300));
    throw new Error("API_ERROR");
  }
}

/**
 * @param {string} jd
 * @param {"en" | "zh"} outputLang
 * @param {string} clientId
 */
export async function analyzeJobDescription(jd, outputLang = "en", clientId) {
  const trimmed = jd.trim();
  if (trimmed.length < 30) {
    throw new Error("JD_TOO_SHORT");
  }

  const usage = getClientUsage(clientId);
  if (usage.count >= RATE_LIMIT_MAX) {
    throw new Error("RATE_LIMIT");
  }

  const apiKey = process.env.DEEPSEEK_API_KEY?.trim();
  if (!apiKey || apiKey === "your_key_here") {
    throw new Error("MISSING_API_KEY");
  }

  let response;
  try {
    response = await postJson(
      API_URL,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt(outputLang) },
          {
            role: "user",
            content: `Job description to evaluate:\n\n${trimmed}`,
          },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    );
  } catch (err) {
    console.error("DeepSeek network error:", err instanceof Error ? err.message : err);
    throw new Error("NETWORK_ERROR");
  }

  const rawBody = response.body;

  if (response.status < 200 || response.status >= 300) {
    console.error(`DeepSeek HTTP ${response.status}:`, rawBody.slice(0, 400));
    throw new Error(mapDeepSeekStatus(response.status));
  }

  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    console.error("DeepSeek returned non-JSON body:", rawBody.slice(0, 400));
    throw new Error("API_ERROR");
  }

  if (data.error) {
    console.error("DeepSeek API error payload:", JSON.stringify(data.error).slice(0, 400));
    throw new Error(mapDeepSeekStatus(data.error.code ?? response.status));
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    console.error("DeepSeek response missing content:", rawBody.slice(0, 400));
    throw new Error("API_ERROR");
  }

  incrementUsage(clientId);
  return parseResult(content);
}
