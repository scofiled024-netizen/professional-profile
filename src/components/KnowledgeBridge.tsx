import { ArrowRight } from "lucide-react";

type Lang = "en" | "zh";

const CONTENT = {
  en: {
    title: "Knowledge & Bridge",
    subtitle:
      "Three foundations — trade, language, and communication — connected to verified work and target roles.",
    pillars: [
      {
        id: "trade",
        title: "International Economics & Trade",
        badge: "B.A. · 2016–2020",
        knowledge:
          "International trade flows, commercial logic, and cross-border business context.",
        applied: "JCBasic full-cycle orders, documentation, and platform operations.",
        roles: "Trade client manager · International ops · B2B coordination",
        caseLabel: "Case 02 — JCBasic",
      },
      {
        id: "english",
        title: "English",
        badge: "B.A. · 2016–2020",
        knowledge: "Written expression, linguistic structure, and cross-cultural pragmatics.",
        applied:
          "Sole English contact for overseas clients, live exhibition interpretation, 150+ independent sales conversations.",
        roles: "Bilingual client success · Brand representative · Customer Success",
        caseLabel: "Cases 01 & 02 — HOTELEX · JCBasic",
      },
      {
        id: "comms",
        title: "International Journalism & Communication",
        badge: "Exam prep · 2020–2022 · non-degree",
        knowledge:
          "Communication frameworks, international news context, and audience-aware messaging.",
        applied:
          "Brand value translation at HOTELEX, cross-cultural information transfer under pressure, clear stakeholder communication.",
        roles: "Brand comms support · PR/content assist · International market communication",
        caseLabel: "Case 01 — HOTELEX",
      },
    ],
    labels: {
      knowledge: "Foundation",
      applied: "Applied in",
      roles: "Connects to",
      inPractice: "See in practice",
    },
  },
  zh: {
    title: "知识桥梁",
    subtitle: "贸易、语言、传播三大基础——有据可查，并指向具体目标岗位。",
    pillars: [
      {
        id: "trade",
        title: "国际经济与贸易",
        badge: "本科 · 2016–2020",
        knowledge: "国际贸易流程、商业逻辑与跨境商务语境。",
        applied: "JCBasic 全周期订单、单证处理与平台运营。",
        roles: "外贸客户经理 · 国际业务协调 · B2B 运营",
        caseLabel: "案例 02 — JCBasic",
      },
      {
        id: "english",
        title: "英语",
        badge: "本科 · 2016–2020",
        knowledge: "书面表达、语言结构与跨文化语用。",
        applied: "海外客户唯一英文联络、展会现场口译、150+ 独立成交沟通。",
        roles: "双语客户成功 · 品牌代表 · 客户成功",
        caseLabel: "案例 01 & 02 — HOTELEX · JCBasic",
      },
      {
        id: "comms",
        title: "国际新闻与传播",
        badge: "系统学习 · 2020–2022",
        knowledge: "传播学框架、国际新闻语境与受众导向的信息表达。",
        applied: "HOTELEX 品牌信息转译、高压下的跨文化沟通、清晰的利益相关方表达。",
        roles: "品牌传播支持 · 公关/内容协助 · 国际化市场沟通",
        caseLabel: "案例 01 — HOTELEX",
      },
    ],
    labels: {
      knowledge: "知识基础",
      applied: "已应用于",
      roles: "可连接岗位",
      inPractice: "见代表案例",
    },
  },
} as const;

interface KnowledgeBridgeProps {
  lang: Lang;
  onNavigate: (sectionId: string) => void;
}

export default function KnowledgeBridge({ lang, onNavigate }: KnowledgeBridgeProps) {
  const c = CONTENT[lang];

  return (
    <section id="knowledge" className="scroll-mt-32" aria-labelledby="knowledge-heading">
      <h2
        id="knowledge-heading"
        className="text-sm uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-4 font-medium"
      >
        {c.title}
      </h2>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-3xl font-light">
        {c.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {c.pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="flex flex-col rounded-3xl border border-border/60 bg-card p-6 md:p-7 shadow-sm"
          >
            <p className="text-[11px] uppercase tracking-widest text-primary font-medium mb-2">
              {pillar.badge}
            </p>
            <h3 className="text-lg font-semibold tracking-tight text-foreground mb-4">
              {pillar.title}
            </h3>

            <div className="space-y-4 flex-1 text-sm leading-relaxed">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-1.5">
                  {c.labels.knowledge}
                </p>
                <p className="text-foreground">{pillar.knowledge}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-1.5">
                  {c.labels.applied}
                </p>
                <p className="text-muted-foreground">{pillar.applied}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-1.5">
                  {c.labels.roles}
                </p>
                <p className="text-muted-foreground">{pillar.roles}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("work")}
              className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors group text-left"
            >
              {c.labels.inPractice}
              <span className="text-muted-foreground group-hover:text-primary">· {pillar.caseLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
