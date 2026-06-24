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

  let response: Response;
  try {
    response = await fetch("/api/jd-match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription: trimmed, outputLang }),
    });
  } catch {
    throw new Error("NETWORK_ERROR");
  }

  const raw = await response.text();
  let data: (FitReportResult & { error?: string }) | null = null;
  try {
    data = raw ? (JSON.parse(raw) as FitReportResult & { error?: string }) : null;
  } catch {
    throw new Error(response.ok ? "API_ERROR" : "API_ERROR");
  }

  if (!response.ok) {
    throw new Error(data?.error ?? "API_ERROR");
  }

  if (!data || data.fitScore == null || !data.recruiterSummary) {
    throw new Error("API_ERROR");
  }

  return data;
}
