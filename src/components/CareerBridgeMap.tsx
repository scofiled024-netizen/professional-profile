import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Handshake, Users, Sparkles } from "lucide-react";

type Lang = "en" | "zh";

const CONTENT = {
  en: {
    title: "Career Bridge Map",
    subtitle:
      "From cross-border client operations to corporate liaison work, client experience, and AI-assisted prototyping.",
    cards: [
      {
        id: "trade",
        icon: Globe,
        title: "Cross-Border Client Operations",
        short: "Built a foundation in cross-border communication, documentation, client/vendor coordination, and full order-cycle workflows.",
        expanded:
          "Running full-cycle orders for overseas clients entirely in English gave me practical exposure to cross-border business, documentation, and coordinating across multiple stakeholders with no interpreter to fall back on. This foundation supports roles in client operations, transaction coordination, business operations, and overseas account management.",
        skills: [
          "Cross-border communication",
          "Client/vendor coordination",
          "CRM & documentation",
          "Business English",
          "Follow-up and execution",
        ],
        roles: [
          "Client Operations Coordinator",
          "Transaction Coordinator",
          "Business Operations Assistant",
          "International Account Manager",
        ],
        skillsLabel: "Skills",
        rolesLabel: "Best-fit roles",
      },
      {
        id: "coffee",
        icon: Handshake,
        title: "Corporate Service & Client Liaison",
        short: "Nearly three years as the on-site liaison for a 300–400 person corporate client base — service delivery, issue resolution, and trust built over time.",
        expanded:
          "Serving as the daily point of contact between two companies taught me how to keep a demanding corporate client base satisfied without incident — handling requests, resolving issues on the spot, coordinating events, and reporting on operations consistently, day after day, for years.",
        skills: [
          "Corporate client liaison",
          "Service recovery",
          "Event coordination",
          "Operational reporting",
          "Long-term relationship management",
        ],
        roles: [
          "Corporate Client Liaison",
          "Customer Success Manager",
          "Client Operations Coordinator",
          "Account Manager",
        ],
        skillsLabel: "Skills",
        rolesLabel: "Best-fit roles",
      },
      {
        id: "client",
        icon: Users,
        title: "Client Experience & Coordination",
        short: "Connects communication, process management, and service delivery across different working environments.",
        expanded:
          "Across client operations, corporate liaison work, and live exhibition sales, I've repeatedly played the role of a bridge between people, products, and workflows. This makes me well-suited for roles that require communication, coordination, follow-up, and calm execution under pressure — remote or in person.",
        skills: [
          "Stakeholder communication",
          "Process follow-up",
          "Problem solving",
          "Remote & on-site coordination",
          "Multilingual support",
          "Service mindset",
        ],
        roles: [
          "Customer Success",
          "Client Operations Coordinator",
          "Support Specialist",
          "Localization Project Coordinator",
        ],
        skillsLabel: "Skills",
        rolesLabel: "Best-fit roles",
      },
      {
        id: "ai",
        icon: Sparkles,
        title: "AI-Assisted Prototyping",
        short: "Given a job description, builds a working prototype that addresses the target company's actual operational problem — not just an interest in AI.",
        expanded:
          "This site and its Recruiter Fit Report are one example — an AI-assisted tool built from scratch and shipped. For specific interview processes, the same practice has gone further: building small working tools (a reply-drafting assistant, a reminders workflow, a tracking dashboard) that address a company's real day-to-day operations, often before I'm even hired. It's a fast way to prove I understand a job, not just talk about it.",
        skills: [
          "AI-assisted product building",
          "Rapid prototyping",
          "Prompt engineering",
          "Problem diagnosis",
          "Fast learning",
        ],
        roles: [
          "AI-Bilingual Evaluation / Localization QA",
          "Bilingual Customer Success (AI / Tech)",
          "Localization Project Coordinator",
          "Product / Ops Support in Tech Companies",
        ],
        skillsLabel: "Skills",
        rolesLabel: "Best-fit roles",
      },
    ],
  },
  zh: {
    title: "职业桥梁地图",
    subtitle: "从跨境客户运营到企业联络、客户体验，再到 AI 辅助原型开发。",
    cards: [
      {
        id: "trade",
        icon: Globe,
        title: "跨境客户运营",
        short: "在跨境沟通、单证处理、客户/供应商协调与完整订单流程方面打下扎实基础。",
        expanded:
          "全英文独立跑完整个海外订单流程，让我积累了跨境业务、单证处理，以及在没有翻译或后援的情况下协调多方利益相关者的实战经验，适合客户运营、交易协调、商务运营与海外客户管理类岗位。",
        skills: ["跨境沟通", "客户/供应商协调", "CRM 与单证处理", "商务英语", "跟进与执行"],
        roles: ["客户运营协调专员", "交易协调专员", "商务运营助理", "国际客户经理"],
        skillsLabel: "技能",
        rolesLabel: "适合岗位",
      },
      {
        id: "coffee",
        icon: Handshake,
        title: "企业服务与客户联络",
        short: "近三年担任 300 至 400 人规模企业客户群的现场联络人——服务交付、问题解决，日积月累建立起的信任。",
        expanded:
          "作为两家公司之间的日常联络人，我学会了如何在不出岔子的情况下维持一个高要求的企业客户群——处理诉求、现场解决问题、协调活动、持续做运营汇报，年复一年。",
        skills: [
          "企业客户联络",
          "服务补救",
          "活动协调",
          "运营汇报",
          "长期客户关系管理",
        ],
        roles: ["企业客户联络人", "客户成功经理", "客户运营协调专员", "客户经理"],
        skillsLabel: "技能",
        rolesLabel: "适合岗位",
      },
      {
        id: "client",
        icon: Users,
        title: "客户体验与协调",
        short: "连接沟通、流程管理与服务交付，贯穿多种工作场景。",
        expanded:
          "在客户运营、企业联络与现场展会销售中，我反复扮演着人、产品与流程之间的桥梁角色，适合需要沟通、协调、跟进与稳定执行的岗位——无论现场还是远程。",
        skills: ["利益相关者沟通", "流程跟进", "问题解决", "远程与现场协调", "多语言支持", "服务意识"],
        roles: ["客户成功", "客户运营协调专员", "支持专员", "本地化项目协调"],
        skillsLabel: "技能",
        rolesLabel: "适合岗位",
      },
      {
        id: "ai",
        icon: Sparkles,
        title: "AI 辅助原型开发",
        short: "拿到一份职位描述后，能做出一个真正解决该公司实际运营问题的小工具——而不只是说自己对 AI 感兴趣。",
        expanded:
          "这个网站和其中的招聘匹配报告就是一个例子——一个从零搭建并真正上线的 AI 辅助工具。在一些具体的面试流程中，我把这个做法用得更进一步：做出能解决该公司实际日常运营问题的小工具（回复辅助、提醒工作流、进度看板），而且往往在被录用之前就已经做好。这是证明自己理解一份工作最快的方式，而不是嘴上说说。",
        skills: [
          "AI 辅助产品开发",
          "快速原型开发",
          "提示词工程",
          "问题诊断",
          "快速学习",
        ],
        roles: [
          "AI 双语评估/本地化质检",
          "双语客户成功（AI/科技行业）",
          "本地化项目协调",
          "科技公司产品/运营支持",
        ],
        skillsLabel: "技能",
        rolesLabel: "适合岗位",
      },
    ],
  },
} as const;

interface CareerBridgeMapProps {
  lang: Lang;
}

export default function CareerBridgeMap({ lang }: CareerBridgeMapProps) {
  const c = CONTENT[lang];
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  return (
    <section id="bridge" className="scroll-mt-32" aria-labelledby="bridge-heading">
      <h2
        id="bridge-heading"
        className="text-sm uppercase tracking-widest text-muted-foreground mb-16 border-b border-border pb-4 font-medium"
      >
        {c.title}
      </h2>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-3xl font-light">
        {c.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.cards.map((card) => {
            const Icon = card.icon;
            const isOpen = selected === card.id;
            return (
              <div key={card.id} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => toggle(card.id)}
                  aria-expanded={isOpen}
                  className={`text-left rounded-2xl border p-5 transition-all focus:outline-none focus:ring-2 focus:ring-ring/40 ${
                    isOpen
                      ? "border-primary/40 bg-card shadow-md ring-1 ring-primary/10"
                      : "border-border/60 bg-card/80 hover:border-border hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.short}</p>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-2xl border border-border/40 bg-muted/30 p-5 space-y-4">
                        <p className="text-sm leading-relaxed text-foreground">{card.expanded}</p>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
                            {card.skillsLabel}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {card.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-xs px-2.5 py-1 rounded-full bg-background border border-border/40 text-foreground hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
                            {card.rolesLabel}
                          </p>
                          <ul className="space-y-1">
                            {card.roles.map((role) => (
                              <li key={role} className="text-sm text-muted-foreground">
                                · {role}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
      </div>
    </section>
  );
}
