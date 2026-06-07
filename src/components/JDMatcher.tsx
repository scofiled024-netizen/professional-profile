import { useState } from "react";
import { Loader2, Sparkles, CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  analyzeJobDescription,
  getRemainingRequests,
  type FitRating,
  type JDMatchResult,
} from "@/lib/jdMatcher";

type Lang = "en" | "zh";

const UI = {
  en: {
    title: "JD Fit Checker",
    subtitle: "Paste a job description — get an honest fit read in seconds.",
    placeholder: "Paste job description here…",
    analyze: "Show Analysis",
    analyzing: "Analyzing…",
    remaining: (n: number) => `${n} analyses remaining today`,
    ratingLabel: "Fit Rating",
    ratings: {
      Strong: "Strong Fit",
      Moderate: "Moderate Fit",
      Partial: "Partial Fit",
    } as Record<FitRating, string>,
    alignment: "Alignment",
    fitPoints: "Specific Fit",
    gaps: "Honest Gaps",
    assessment: "Recruiter Assessment",
    errors: {
      JD_TOO_SHORT: "Please paste a longer job description (at least 30 characters).",
      RATE_LIMIT: "Daily analysis limit reached. Please try again tomorrow.",
      MISSING_API_KEY: "API key not configured. See setup instructions.",
      API_ERROR: "Analysis unavailable — please try again.",
      default: "Analysis unavailable — please try again.",
    },
  },
  zh: {
    title: "职位匹配分析",
    subtitle: "粘贴职位描述，快速获得客观的匹配评估。",
    placeholder: "请在此粘贴职位描述…",
    analyze: "开始分析",
    analyzing: "分析中…",
    remaining: (n: number) => `今日剩余 ${n} 次分析`,
    ratingLabel: "匹配度",
    ratings: {
      Strong: "高度匹配",
      Moderate: "中度匹配",
      Partial: "部分匹配",
    } as Record<FitRating, string>,
    alignment: "匹配概述",
    fitPoints: "具体契合点",
    gaps: "客观差距",
    assessment: "招聘方评估",
    errors: {
      JD_TOO_SHORT: "请粘贴更完整的职位描述（至少30个字符）。",
      RATE_LIMIT: "今日分析次数已用完，请明天再试。",
      MISSING_API_KEY: "API 密钥未配置，请参阅设置说明。",
      API_ERROR: "分析暂不可用，请稍后重试。",
      default: "分析暂不可用，请稍后重试。",
    },
  },
};

const RATING_STYLES: Record<
  FitRating,
  { bg: string; text: string; border: string; icon: typeof CheckCircle2 }
> = {
  Strong: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
  },
  Moderate: {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/30",
    icon: MinusCircle,
  },
  Partial: {
    bg: "bg-orange-500/10",
    text: "text-orange-700 dark:text-orange-400",
    border: "border-orange-500/30",
    icon: AlertCircle,
  },
};

interface JDMatcherProps {
  lang: Lang;
}

export default function JDMatcher({ lang }: JDMatcherProps) {
  const t = UI[lang];
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JDMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(getRemainingRequests);

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const match = await analyzeJobDescription(jd);
      setResult(match);
      setRemaining(getRemainingRequests());
    } catch (err) {
      const code = err instanceof Error ? err.message : "default";
      setError(t.errors[code as keyof typeof t.errors] ?? t.errors.default);
    } finally {
      setLoading(false);
    }
  };

  const ratingStyle = result ? RATING_STYLES[result.rating] : null;
  const RatingIcon = ratingStyle?.icon;

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

        {result && ratingStyle && RatingIcon && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5 pt-2 border-t border-border/40"
            data-testid="jd-result"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${ratingStyle.bg} ${ratingStyle.text} ${ratingStyle.border}`}
            >
              <RatingIcon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest opacity-70 mr-1">{t.ratingLabel}</span>
              {t.ratings[result.rating]}
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
                {t.alignment}
              </p>
              <p className="text-sm leading-relaxed text-foreground">{result.summary}</p>
            </div>

            {result.fitPoints.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
                  {t.fitPoints}
                </p>
                <ul className="space-y-2">
                  {result.fitPoints.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.gaps.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
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

            <div className="rounded-xl bg-muted/50 border border-border/40 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
                {t.assessment}
              </p>
              <p className="text-sm leading-relaxed text-foreground italic">{result.assessment}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
