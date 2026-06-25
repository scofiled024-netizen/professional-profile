import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HandwritingHeadingProps {
  text: string;
  lang: "en" | "zh";
}

function splitTrailingPunctuation(value: string) {
  const match = value.match(/^(.+?)([!?。！？]+)$/);
  if (!match) return { body: value, punctuation: null as string | null };
  return { body: match[1], punctuation: match[2] };
}

export default function HandwritingHeading({ text, lang }: HandwritingHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4, margin: "-50px" });

  const isZh = lang === "zh";
  const headingFont = isZh
    ? 'var(--app-font-handwriting-zh, "Songti SC", "STSong", "SimSun", "Noto Serif SC", serif)'
    : 'var(--app-font-handwriting-en, "Caveat", cursive)';
  const { body, punctuation } = splitTrailingPunctuation(text);

  return (
    <div ref={ref} className="relative inline-block overflow-hidden mb-6 max-w-full">
      <motion.h3
        key={`${lang}-${text}`}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl text-foreground pb-2 pr-4 tracking-tight font-normal"
        style={{
          fontFamily: headingFont,
          fontStyle: isZh ? "italic" : "normal",
          lineHeight: isZh ? 1.35 : 1.15,
        }}
      >
        {body}
        {punctuation && (
          <span
            style={{
              marginLeft: isZh ? "0.28em" : "0.16em",
              display: "inline-block",
              transform: isZh ? "translateY(0.08em)" : undefined,
            }}
          >
            {punctuation}
          </span>
        )}
      </motion.h3>
    </div>
  );
}
