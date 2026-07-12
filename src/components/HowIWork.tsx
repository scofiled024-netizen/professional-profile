import { Compass, MessageSquare, Shield } from "lucide-react";

type Lang = "en" | "zh";

const CONTENT = {
  en: {
    title: "How I Work",
    subtitle: "Personal context — translated into professional fit, not autobiography.",
    fitLabel: "Best fit for",
    cards: [
      {
        icon: Compass,
        trait: "Cross-cultural independence",
        evidence:
          "Solo travel across Southeast Asia (7 countries, 1+ month) and extensive travel across China — plus serving as the only English-speaking contact for B2B accounts.",
        fit: "Roles that require on-site ownership, travel, and calm problem-solving in unfamiliar environments.",
      },
      {
        icon: MessageSquare,
        trait: "Communicating with clarity",
        evidence:
          "Structured exam preparation in international journalism & communication (2020–2022); English instruction at Dianjing Training School; bilingual interpretation at HOTELEX.",
        fit: "Roles where mistranslation or vague messaging has real cost — client success, brand representation, B2B coordination.",
      },
      {
        icon: Shield,
        trait: "Steady ownership",
        evidence:
          "Nearly three years at Lilith Games with zero major service failures; consistent daily reporting and long-term account trust built over time.",
        fit: "Relationship-driven roles that reward reliability — corporate accounts, client liaison, operations.",
      },
    ],
  },
  zh: {
    title: "工作方式",
    subtitle: "将个人经历转化为职业优势——服务于岗位匹配，而非人生叙事。",
    fitLabel: "最适合",
    cards: [
      {
        icon: Compass,
        trait: "跨文化独立",
        evidence:
          "独自旅行东南亚七国（逾一个月）并深度游历全国多数省份；同时长期担任唯一的全英文 B2B 联络人，无后备支持。",
        fit: "需要一线独立负责、出差或外派，并能在陌生环境中冷静解决问题。",
      },
      {
        icon: MessageSquare,
        trait: "清晰沟通",
        evidence:
          "两年国际新闻与传播方向的系统学习；柳州点睛培训学校英语教学实习；HOTELEX 双语口译与品牌转译。",
        fit: "信息转译成本高、误解代价大的角色——客户成功、品牌代表、B2B 协调。",
      },
      {
        icon: Shield,
        trait: "稳定负责",
        evidence:
          "莉莉丝游戏驻场近三年零重大服务失误；持续日常汇报与长期客户信任的积累。",
        fit: "重视可靠性与长期关系的岗位——企业客户管理、客户联络、运营协调。",
      },
    ],
  },
} as const;

interface HowIWorkProps {
  lang: Lang;
}

export default function HowIWork({ lang }: HowIWorkProps) {
  const c = CONTENT[lang];

  return (
    <section id="how-i-work" className="scroll-mt-32" aria-labelledby="how-i-work-heading">
      <h2
        id="how-i-work-heading"
        className="text-sm uppercase tracking-widest text-muted-foreground mb-16 border-b border-border pb-4 font-medium"
      >
        {c.title}
      </h2>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-3xl font-light">
        {c.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {c.cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.trait}
              className="rounded-3xl border border-border/40 bg-muted/20 p-6 md:p-7 space-y-4"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{card.trait}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.evidence}</p>
              <div className="border-t border-border/40 pt-4">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-1.5">
                  {c.fitLabel}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{card.fit}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
