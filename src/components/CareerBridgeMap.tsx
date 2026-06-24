import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Coffee, Users, Sparkles } from "lucide-react";

type Lang = "en" | "zh";

const CONTENT = {
  en: {
    title: "Career Bridge Map",
    subtitle:
      "From international trade to specialty coffee, client experience, and AI-assisted product building.",
    cards: [
      {
        id: "trade",
        icon: Globe,
        title: "International Trade",
        short: "Built a foundation in cross-border communication, documentation, supplier/client coordination, and business workflows.",
        expanded:
          "My international trade background gave me practical exposure to cross-border business, English communication, and coordinating across multiple stakeholders. This foundation supports roles in B2B service, business operations, overseas client management, and commercial support.",
        skills: [
          "Cross-border communication",
          "Supplier/client coordination",
          "Documentation",
          "Business English",
          "Follow-up and execution",
        ],
        roles: [
          "Foreign Trade Specialist",
          "Business Operations Assistant",
          "Client Success Associate",
          "Sales Operations Support",
        ],
        skillsLabel: "Skills",
        rolesLabel: "Best-fit roles",
      },
      {
        id: "coffee",
        icon: Coffee,
        title: "Specialty Coffee",
        short: "Developed strong hands-on customer service, product knowledge, and high-standard service awareness.",
        expanded:
          "My specialty coffee background strengthened my ability to serve customers face-to-face, explain complex products clearly, handle daily operations, and maintain quality under pressure. It gave me a grounded understanding of service standards, product experience, and earning customer trust.",
        skills: [
          "Customer-facing communication",
          "Product explanation",
          "Service recovery",
          "Detail orientation",
          "Quality control",
          "Premium consumer experience",
        ],
        roles: [
          "Customer Experience Specialist",
          "Brand / Retail Operations",
          "Client-Facing Support",
          "Community or Hospitality-Related Roles",
        ],
        skillsLabel: "Skills",
        rolesLabel: "Best-fit roles",
      },
      {
        id: "client",
        icon: Users,
        title: "Client Experience & Operations",
        short: "Connects communication, process management, and service delivery across different working environments.",
        expanded:
          "Across trade, coffee, and exhibition work, I've repeatedly played the role of a bridge between people, products, and workflows. This makes me well-suited for roles that require communication, coordination, follow-up, and calm execution under pressure.",
        skills: [
          "Stakeholder communication",
          "Process follow-up",
          "Problem solving",
          "On-site coordination",
          "Multilingual support",
          "Service mindset",
        ],
        roles: [
          "Customer Success",
          "Project Assistant",
          "Support Specialist",
          "Operations Coordinator",
        ],
        skillsLabel: "Skills",
        rolesLabel: "Best-fit roles",
      },
      {
        id: "ai",
        icon: Sparkles,
        title: "AI / Vibe-Coding Projects",
        short: "Uses AI tools to build practical personal products, including this website and JD Matcher.",
        expanded:
          "Uses AI tools to build working web products — this website and the Recruiter Fit Report demonstrate a willingness to learn quickly, experiment with new tools, and turn vague ideas into something concrete and usable.",
        skills: [
          "AI-assisted product building",
          "Prompt engineering",
          "Website iteration",
          "Problem diagnosis",
          "Tool-based workflow",
          "Fast learning",
        ],
        roles: [
          "AI Operations Assistant",
          "Product Operations",
          "Technical Support",
          "AI Data / Annotation Roles",
          "Business Support in Tech Companies",
        ],
        skillsLabel: "Skills",
        rolesLabel: "Best-fit roles",
      },
    ],
  },
  zh: {
    title: "职业桥梁地图",
    subtitle: "从国际贸易到精品咖啡、客户体验，再到 AI 辅助产品开发。",
    cards: [
      {
        id: "trade",
        icon: Globe,
        title: "国际贸易",
        short: "具备跨境沟通、单证处理、供应商/客户协调与商务流程执行的扎实基础。",
        expanded:
          "凭借我的国际贸易背景，我积累了跨境业务、英语沟通以及多方利益相关者协调的实战经验，适合 B2B 服务、商务运营、海外客户对接与商业支持类岗位。",
        skills: ["跨境沟通", "供应商/客户协调", "单证处理", "商务英语", "跟进与执行"],
        roles: ["外贸专员", "商务运营助理", "客户成功专员", "销售运营支持"],
        skillsLabel: "技能",
        rolesLabel: "适合岗位",
      },
      {
        id: "coffee",
        icon: Coffee,
        title: "精品咖啡",
        short: "培养了面对面客户服务、产品讲解与高标准服务意识。",
        expanded:
          "精品咖啡经历强化了我面对面服务客户、清晰讲解产品、处理日常运营并在压力下保持品质的能力，我对服务标准、产品体验与客户信任有扎实认识。",
        skills: [
          "面对面客户沟通",
          "产品讲解",
          "服务补救",
          "注重细节",
          "品质控制",
          "高端消费体验",
        ],
        roles: ["客户体验专员", "品牌/零售运营", "面向客户的支持岗位", "社群或酒店餐饮相关岗位"],
        skillsLabel: "技能",
        rolesLabel: "适合岗位",
      },
      {
        id: "client",
        icon: Users,
        title: "客户体验与运营",
        short: "连接沟通、流程管理与服务交付，贯穿多种工作场景。",
        expanded:
          "在贸易、咖啡与展会支持等经历中，我多次担任人、产品与流程之间的桥梁，适合需要沟通、协调、跟进与稳定执行的岗位。",
        skills: ["利益相关者沟通", "流程跟进", "问题解决", "现场协调", "多语言支持", "服务意识"],
        roles: ["客户成功", "项目助理", "支持专员", "运营协调"],
        skillsLabel: "技能",
        rolesLabel: "适合岗位",
      },
      {
        id: "ai",
        icon: Sparkles,
        title: "AI / Vibe-Coding 项目",
        short: "使用 AI 工具构建实用个人产品，包括本网站与职位匹配报告。",
        expanded:
          "使用 AI 工具构建可运行的 Web 产品。本网站与职位匹配报告体现了好奇心、自学能力，以及将模糊想法落地为可用工具的能力。",
        skills: [
          "AI 辅助产品开发",
          "提示词工程",
          "网站迭代",
          "问题诊断",
          "工具化工作流",
          "快速学习",
        ],
        roles: [
          "AI 运营助理",
          "产品运营",
          "技术支持",
          "AI 数据/标注类岗位",
          "科技公司商务支持",
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
                                className="text-xs px-2.5 py-1 rounded-full bg-background border border-border/40 text-foreground"
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
