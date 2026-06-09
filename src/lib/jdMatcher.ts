export type FitLabel = "Strong Fit" | "Good Fit" | "Partial Fit" | "Stretch Role";

export interface FitReportResult {
  fitScore: number;
  fitLabel: FitLabel;
  strengths: string[];
  gaps: string[];
  interviewTalkingPoints: string[];
  recruiterSummary: string;
  resumeKeywords: string[];
}

type OutputLang = "en" | "zh";

export async function getRemainingRequests(): Promise<number> {
  const response = await fetch("/api/jd-match-remaining");
  if (!response.ok) return 0;
  const data = (await response.json()) as { remaining?: number };
  return data.remaining ?? 0;
}

export async function analyzeJobDescription(
  jd: string,
  outputLang: OutputLang = "en",
): Promise<FitReportResult> {
  const trimmed = jd.trim();
  if (trimmed.length < 30) {
    throw new Error("JD_TOO_SHORT");
  }

  const response = await fetch("/api/jd-match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobDescription: trimmed, outputLang }),
  });

  const data = (await response.json()) as FitReportResult & { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "API_ERROR");
  }

  if (!data.fitScore || !data.recruiterSummary) {
    throw new Error("API_ERROR");
  }

  return data;
}
