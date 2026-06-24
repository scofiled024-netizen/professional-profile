import { useEffect, useState } from "react";
import {
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MinusCircle,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  analyzeJobDescription,
  getRemainingRequests,
  type FitLabel,
  type FitReportResult,
} from "@/lib/jdMatcher";

type Lang = "en" | "zh";

const UI = {
  en: {
    title: "Recruiter Fit Report",
    subtitle: "Paste a job description — get a structured fit report in seconds.",
    placeholder: "Paste job description here…",
    analyze: "Generate Report",
    analyzing: "Analyzing role fit…",
    remaining: (n: number) => `${n} reports remaining today`,
    fitScore: "Overall Fit",
    match: "Match",
    strengths: "Best-Matched Strengths",
    gaps: "Possible Gaps",
    talkingPoints: "Interview Talking Points",
    recruiterSummary: "Recruiter Summary",
    copySummary: "Copy Summary",
    copied: "Copied!",
    keywords: "Suggested Resume Keywords",
    labels: {
      "Strong Fit": "Strong Fit",
      "Good Fit": "Good Fit",
      "Partial Fit": "Partial Fit",
      "Stretch Role": "Stretch Role",
    } as Record<FitLabel, string>,
    errors: {
      JD_TOO_SHORT: "Please paste a longer job description.",
      RATE_LIMIT: "Daily limit reached. Please try again tomorrow.",
      MISSING_API_KEY: "Add DEEPSEEK_API_KEY to .env in the project root, then restart npm run dev.",
      INVALID_API_KEY: "JD Matcher API key is invalid.",
      INSUFFICIENT_BALANCE: "DeepSeek account has insufficient balance. Top up at platform.deepseek.com.",
      NETWORK_ERROR: "Cannot reach DeepSeek API. Check your internet connection.",
      API_ERROR: "JD Matcher service is temporarily unavailable.",
      default: "JD Matcher service is temporarily unavailable.",
    },
  },
  zh: {
    title: "职位匹配报告",
    subtitle: "粘贴职位描述，数秒内生成结构化匹配报告。",
    placeholder: "请在此粘贴职位描述…",
    analyze: "生成报告",
    analyzing: "正在分析职位匹配度…",
    remaining: (n: number) => `今日剩余 ${n} 次分析`,
    fitScore: "综合匹配度",
    match: "匹配",
    strengths: "核心匹配优势",
    gaps: "待提升项",
    talkingPoints: "面试应答要点",
    recruiterSummary: "招聘方摘要",
    copySummary: "复制摘要",
    copied: "已复制！",
    keywords: "建议简历关键词",
    labels: {
      "Strong Fit": "高度匹配",
      "Good Fit": "良好匹配",
      "Partial Fit": "部分匹配",
      "Stretch Role": "挑战型岗位",
    } as Record<FitLabel, string>,
    errors: {
      JD_TOO_SHORT: "请粘贴更完整的职位描述。",
      RATE_LIMIT: "今日分析次数已用完，请明天再试。",
      MISSING_API_KEY: "请在项目根目录 .env 中配置 DEEPSEEK_API_KEY，然后重启 npm run dev。",
      INVALID_API_KEY: "职位匹配 API 密钥无效。",
      INSUFFICIENT_BALANCE: "DeepSeek 账户余额不足，请前往 platform.deepseek.com 充值。",
      NETWORK_ERROR: "无法连接 DeepSeek 服务，请检查网络。",
      API_ERROR: "职位匹配服务暂不可用。",
      default: "职位匹配服务暂不可用。",
    },
  },
};

const LABEL_STYLES: Record<
  FitLabel,
  { bg: string; text: string; border: string; ring: string; icon: typeof CheckCircle2 }
> = {
  "Strong Fit": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-500/30",
    ring: "stroke-emerald-500",
    icon: CheckCircle2,
  },
  "Good Fit": {
    bg: "bg-sky-500/10",
    text: "text-sky-700 dark:text-sky-400",
    border: "border-sky-500/30",
    ring: "stroke-sky-500",
    icon: CheckCircle2,
  },
  "Partial Fit": {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/30",
    ring: "stroke-amber-500",
    icon: MinusCircle,
  },
  "Stretch Role": {
    bg: "bg-orange-500/10",
    text: "text-orange-700 dark:text-orange-400",
    border: "border-orange-500/30",
    ring: "stroke-orange-500",
    icon: AlertCircle,
  },
};

function ScoreRing({ score, ringClass }: { score: number; ringClass: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88" aria-hidden="true">
        <circle cx="44" cy="44" r={radius} fill="none" className="stroke-muted" strokeWidth="6" />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          className={ringClass}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground leading-none">{score}%</span>
      </div>
    </div>
  );
}

interface JDMatcherProps {
  lang: Lang;
}

export default function JDMatcher({ lang }: JDMatcherProps) {
  const t = UI[lang];
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FitReportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(20);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getRemainingRequests().then(setRemaining).catch(() => undefined);
  }, []);

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);
    setCopied(false);
    setLoading(true);
    try {
      const match = await analyzeJobDescription(jd, lang);
      setResult(match);
      setRemaining(await getRemainingRequests());
    } catch (err) {
      const code = err instanceof Error ? err.message : "default";
      setError(t.errors[code as keyof typeof t.errors] ?? t.errors.default);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.recruiterSummary) return;
    try {
      await navigator.clipboard.writeText(result.recruiterSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const labelStyle = result ? LABEL_STYLES[result.fitLabel] ?? LABEL_STYLES["Good Fit"] : null;
  const LabelIcon = labelStyle?.icon;

  return (
    <div
      className="border border-border/60 bg-card rounded-3xl shadow-sm p-6 md:p-8 flex flex-col gap-5"
      data-testid="jd-matcher"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{t.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.subtitle}</p>
        </div>
      </div>

      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder={t.placeholder}
        rows={6}
        disabled={loading}
        data-testid="jd-textarea"
        className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-60 transition-shadow"
      />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="text-xs text-muted-foreground">{t.remaining(remaining)}</span>
        <button
          onClick={handleAnalyze}
          disabled={loading || !jd.trim()}
          data-testid="jd-analyze-btn"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 rounded-full text-sm font-medium uppercase tracking-widest transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.analyzing}
            </>
          ) : (
            t.analyze
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            data-testid="jd-error"
          >
            {error}
          </motion.div>
        )}

        {result && labelStyle && LabelIcon && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5 pt-2 border-t border-border/40"
            data-testid="jd-result"
          >
            <div className="flex items-center gap-5 flex-wrap">
              <ScoreRing score={result.fitScore} ringClass={labelStyle.ring} />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
                  {t.fitScore}
                </p>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${labelStyle.bg} ${labelStyle.text} ${labelStyle.border}`}
                >
                  <LabelIcon className="w-4 h-4" />
                  {t.labels[result.fitLabel] ?? result.fitLabel}
                </div>
              </div>
            </div>

            {result.strengths.length > 0 && (
              <div className="rounded-xl border border-border/40 bg-background/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">
                  {t.strengths}
                </p>
                <ul className="space-y-2">
                  {result.strengths.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.gaps.length > 0 && (
              <div className="rounded-xl border border-border/40 bg-background/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">
                  {t.gaps}
                </p>
                <ul className="space-y-2">
                  {result.gaps.map((gap, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1 shrink-0">–</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.interviewTalkingPoints.length > 0 && (
              <div className="rounded-xl border border-border/40 bg-background/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">
                  {t.talkingPoints}
                </p>
                <ol className="space-y-2 list-decimal list-inside">
                  {result.interviewTalkingPoints.map((point, i) => (
                    <li key={i} className="text-sm leading-relaxed text-foreground pl-1">
                      {point}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="rounded-xl bg-muted/50 border border-border/40 px-4 py-4">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {t.recruiterSummary}
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground border border-border rounded-full px-3 py-1.5 hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40"
                  data-testid="copy-summary-btn"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      {t.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      {t.copySummary}
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{result.recruiterSummary}</p>
            </div>

            {result.resumeKeywords.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-3">
                  {t.keywords}
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.resumeKeywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-foreground border border-border/40"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
