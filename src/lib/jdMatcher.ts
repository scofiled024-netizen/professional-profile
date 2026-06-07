import { CANDIDATE_PROFILE } from "@/data/profile";

export type FitRating = "Strong" | "Moderate" | "Partial";

export interface JDMatchResult {
  rating: FitRating;
  summary: string;
  fitPoints: string[];
  gaps: string[];
  assessment: string;
}

const API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-chat";
const RATE_LIMIT_KEY = "jd-matcher-request-count";
const RATE_LIMIT_MAX = 26;

function buildSystemPrompt(): string {
  return `You are an experienced HR recruiter evaluating candidate fit for a specific job description.

CANDIDATE PROFILE:
${JSON.stringify(CANDIDATE_PROFILE, null, 2)}

INSTRUCTIONS:
- Compare the pasted job description against this candidate's real background only. Do not invent experience.
- Be honest and recruiter-style: no cheerleading, no generic praise, no filler.
- Prefix your reasoning mentally for an HR audience evaluating whether to interview.
- Rating scale:
  - "Strong": core requirements clearly met with relevant, recent evidence
  - "Moderate": meaningful overlap but notable gaps or weaker recency/industry fit
  - "Partial": some transferable skills but major requirements missing or weak match
- fitPoints: 3–5 specific bullets tying JD requirements to real candidate evidence
- gaps: 2–4 honest gaps or risks (include relevant items from honestGaps when applicable)
- assessment: 2–3 sentences, recruiter tone, practical recommendation

Respond ONLY with valid JSON in this exact shape:
{
  "rating": "Strong" | "Moderate" | "Partial",
  "summary": "one sentence alignment summary",
  "fitPoints": ["..."],
  "gaps": ["..."],
  "assessment": "recruiter-style closing assessment"
}`;
}

function parseResult(content: string): JDMatchResult {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid response format");

  const parsed = JSON.parse(jsonMatch[0]) as Partial<JDMatchResult>;
  const rating = parsed.rating;
  if (rating !== "Strong" && rating !== "Moderate" && rating !== "Partial") {
    throw new Error("Invalid fit rating");
  }
  if (!parsed.summary || !parsed.assessment) {
    throw new Error("Incomplete response");
  }

  return {
    rating,
    summary: parsed.summary,
    fitPoints: Array.isArray(parsed.fitPoints) ? parsed.fitPoints : [],
    gaps: Array.isArray(parsed.gaps) ? parsed.gaps : [],
    assessment: parsed.assessment,
  };
}

export function getRemainingRequests(): number {
  const count = Number(localStorage.getItem(RATE_LIMIT_KEY) ?? "0");
  return Math.max(0, RATE_LIMIT_MAX - count);
}

export async function analyzeJobDescription(jd: string): Promise<JDMatchResult> {
  const trimmed = jd.trim();
  if (trimmed.length < 30) {
    throw new Error("JD_TOO_SHORT");
  }

  const count = Number(localStorage.getItem(RATE_LIMIT_KEY) ?? "0");
  if (count >= RATE_LIMIT_MAX) {
    throw new Error("RATE_LIMIT");
  }

  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        {
          role: "user",
          content: `Job description to evaluate:\n\n${trimmed}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    throw new Error("API_ERROR");
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("API_ERROR");

  localStorage.setItem(RATE_LIMIT_KEY, String(count + 1));
  return parseResult(content);
}
