import { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Linkedin, ArrowUp, Sun, Moon, Download, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import JDMatcher from "@/components/JDMatcher";
import CareerBridgeMap from "@/components/CareerBridgeMap";
import KnowledgeBridge from "@/components/KnowledgeBridge";
import HowIWork from "@/components/HowIWork";
import HandwritingHeading from "@/components/HandwritingHeading";
import photoSrc from "@assets/profile-photo.jpg";
import tfsuLogoSrc from "@assets/tfsu-logo.png";
import dianjingLogoSrc from "@assets/dianjing-logo.png";
import hotelexLogoSrc from "@assets/hotelex-logo.png";
import yuanfudaoLogoSrc from "@assets/yuanfudao-logo.png";
import mannerLogoSrc from "@assets/manner-logo.png";
import lilithGamesLogoSrc from "@assets/lilith-games-logo.png";
import jcbasicLogoSrc from "@assets/jcbasic-logo.png";

const experienceLogoClass =
  "size-[3.025rem] shrink-0 rounded-md object-contain ring-1 ring-border/50 bg-white";

type Lang = "en" | "zh";

const CONTENT = {
  en: {
    nav: {
      hero: "Overview",
      work: "Selected Work",
      experience: "Experience",
      capabilities: "Capabilities",
      knowledge: "Knowledge",
      "how-i-work": "How I Work",
      about: "About",
      contact: "Contact",
    },
    hero: {
      name: "Chao Liu",
      title: "Bilingual Client Operations Coordinator · Cross-Border & Remote Teams",
      subtitle: "Client Operations Coordination · Bilingual Communication · AI-Assisted Delivery",
      intro: "I've independently run full order-to-payment cycles for overseas clients entirely in English, kept a 300–400 person corporate client base running smoothly for nearly three years, and closed 150+ deals solo at Asia's largest hospitality trade expo. I sit at the intersection of language, operations, and people — backed by hands-on experience using AI agents and vibe-coding to optimize workflows and build working products from scratch.",
      button1: "View Selected Work",
      button2: "Download Resume",
      linkedin: "https://www.linkedin.com/in/chaoliu-cn/",
      email: "scofiled024@gmail.com",
    },
    work: {
      title: "Selected Work",
      cards: [
        {
          num: "01",
          title: "Full-Cycle Overseas Client Operations, Solo",
          tag: "JCBasic · Shanghai Tingdi Accessories Co., Ltd.",
          context: "At JCBasic, I was the only English-speaking contact for overseas clients across Alibaba International, Etsy and brand website, using Zoho CRM as the primary system for client records, pipeline tracking, and order status.",
          responsibility: "I acted as the primary English-speaking contact for overseas clients and ran their orders through the full lifecycle, start to finish, entirely on my own.",
          actions: "Managed client records, pipeline, and order status in Zoho CRM, and responded to inquiries with quotations. Coordinated order amendments, production updates, and shipment tracking while keeping clients informed. Prepared contracts, invoices, and packing lists, and handled after-sales issues, complaints, and payment follow-up.",
          results: "Managed orders from initial inquiry through delivery and payment follow-up. Maintained clear communication between overseas clients and internal teams. Reduced the need for customers to chase for updates.",
          skills: "CRM (Zoho) · Order Lifecycle Management · Client Communication · Documentation · Cross-Border Coordination · Stakeholder Management",
        },
        {
          num: "02",
          title: "On-Site Corporate Service Liaison at Lilith Games HQ",
          tag: "Manner Coffee × Lilith Games · Shanghai · Jul 2023 – Mar 2026",
          context: "Manner Coffee operates a dedicated café inside Lilith Games' flagship headquarters — an award-winning 215,000 sq ft campus in Shanghai. The café served as the primary hospitality touchpoint for the entire company.",
          responsibility: "I was the permanent on-site liaison between Manner Coffee's operations team and Lilith Games' corporate administration — managing daily service delivery, issue resolution, and event coordination across two campus locations.",
          actions: "Handled all client-facing communication with Lilith Games' admin team independently. Coordinated internal events from requirements gathering through execution. Managed daily revenue reconciliation, inventory tracking, and operational reporting consistently over nearly three years.",
          results: "Maintained zero major service failures over a near three-year tenure. Delivered consistent service quality for a 300–400 person daily client base in a high-expectation corporate environment. Built a stable, trusted long-term relationship between two companies.",
          skills: "Corporate Client Liaison · Issue Resolution · Event Coordination · Operational Reporting · Long-Term Relationship Management",
        },
        {
          num: "03",
          title: "Representing International Coffee Brands at HOTELEX Shanghai",
          tag: "HOTELEX Shanghai 2026 · Panda Bear Express",
          context: "Panda Bear Express represented ICOSA Brewhouse and Biru Roast at HOTELEX Shanghai 2026 — one of Asia's largest hospitality and foodservice trade exhibitions.",
          responsibility: "I served as the sole English-Chinese bilingual brand representative across the four-day exhibition, supporting sales, product communication, interpretation, and buyer engagement.",
          actions: "Communicated product value to Chinese trade buyers. Provided live English-Chinese interpretation for international brand representatives and competition baristas. Handled buyer questions and objections. Managed sales activity independently during high-traffic periods.",
          results: "Completed more than 150 sales transactions. Prevented communication breakdowns between international representatives and Chinese buyers. Maintained service quality throughout a high-pressure exhibition environment.",
          skills: "Bilingual Communication · Live Interpretation · Sales Support · International Brand Representation · Adaptability",
        },
      ],
      labels: {
        context: "Context",
        responsibility: "Responsibility",
        actions: "Actions",
        results: "Results",
      },
    },
    experience: {
      title: "Experience",
      entries: [
        {
          date: "Mar – Apr 2026",
          role: "Bilingual Brand Representative & On-Site Sales",
          company: "Panda Bear Express (ICOSA Brewhouse & Biru Roast)",
          location: "Shanghai",
          logo: hotelexLogoSrc,
          summary: "Sole bilingual representative at HOTELEX Shanghai 2026, managing all client-facing operations for two international specialty coffee brands across a four-day trade expo. Delivered real-time English-Chinese interpretation for brand directors and closed 150+ transactions independently.",
        },
        {
          date: "Jul 2023 – Mar 2026",
          role: "Corporate Client Liaison & Senior Barista",
          company: "Manner Coffee × Lilith Games",
          location: "Shanghai",
          logos: [mannerLogoSrc, lilithGamesLogoSrc],
          summary: "Primary service contact between Manner Coffee and Lilith Games' corporate administration team across two campus locations. Managed daily client communication, event coordination, and operational records for a 300–400 person daily client base over nearly three years.",
        },
        {
          date: "Mar 2022 – Apr 2023",
          role: "International Client Operations Coordinator",
          company: "JCBasic (上海听谛服饰辅料有限公司)",
          location: "Shanghai",
          logo: jcbasicLogoSrc,
          summary: "Only English-speaking contact for overseas clients on Alibaba International, Etsy and brand website. Managed the full order lifecycle in Zoho CRM, plus commercial documentation and after-sales coordination independently.",
        },
        {
          date: "Sep – Dec 2021",
          role: "English Language Instructor",
          company: "Dianjing Training School, Liuzhou",
          location: "Liuzhou",
          logo: dianjingLogoSrc,
          summary: "Delivered English lessons to elementary, middle, and high school students. Broke down complex linguistic concepts for non-specialist learners and drew on a dual-degree English background to structure clear, accessible instruction.",
        },
        {
          date: "Apr – Jul 2021",
          role: "Operations & Customer Success Intern",
          company: "Yuanfudao",
          location: "Changsha",
          logo: yuanfudaoLogoSrc,
          summary: "Managed online user communities of 200+ members, supported sales conversions, and handled administrative operations in a fast-paced digital education environment.",
        },
      ],
    },
    capabilities: {
      title: "Capabilities",
      groups: [
        {
          name: "Client and Stakeholder Coordination",
          desc: "Building and maintaining professional relationships with clients across B2B, corporate, and exhibition contexts. Managing expectations, handling complaints, and keeping communication clear under pressure.",
        },
        {
          name: "Cross-Border Client Operations & Coordination",
          desc: "End-to-end order and account operations across international platforms including Alibaba International, Etsy and brand website. Commercial documentation, shipment tracking, and receivables follow-up.",
        },
        {
          name: "Bilingual and Cross-Cultural Communication",
          desc: "Fluent in English and Mandarin across written correspondence, real-time interpretation, and cross-cultural client management. Comfortable bridging international brand teams and Chinese-speaking buyers or partners.",
        },
        {
          name: "Service Delivery and Issue Resolution",
          desc: "Owning the full service experience from first contact to resolution. Acting as a first point of contact for demanding clients, resolving issues on the spot, and recovering service quality quickly.",
        },
        {
          name: "AI-Assisted Prototyping",
          desc: "Given a job description, builds a small working tool — a workflow, dashboard, or reply-drafting assistant — that addresses the target company's actual day-to-day operations, often before the interview even happens. This site and its Recruiter Fit Report are one example; several more were built for specific interview processes.",
        },
      ],
    },
    about: {
      title: "About",
      text: [
        <>
          My career has moved across international trade, corporate service operations, live exhibition sales, and — more recently — building small AI-assisted tools when a role calls for it. These look like different lines of work, and they are. But the pattern underneath has been the same:{" "}
          <span className="font-semibold italic">understanding what someone needs, communicating it accurately, and making sure things move forward.</span>
        </>,
        <>
          I am drawn to roles where the gap between what is said and what is understood actually matters. Where a poorly translated email causes a delayed shipment. Where a client's frustration, handled well, becomes a reason to stay.{" "}
          <span className="font-semibold italic">Where being the only bilingual person in the room is an opportunity, not a burden.</span>
        </>,
        <>
          Outside of work, I think carefully about how things are communicated — tone, precision, what gets left out. Two years of structured study in international journalism and communication further reinforced this communication instinct. I believe{" "}
          <span className="font-semibold italic">calm, clear communication is a skill worth taking seriously.</span>
        </>,
      ],
    },
    education: {
      label: "Education",
      school: "Tianjin Foreign Studies University",
      period: "2016 – 2020",
      degrees: [
        "Bachelor of Economics in International Economics and Trade",
        "Bachelor of Arts in English",
      ],
    },
    contact: {
      title: "Contact",
      heading: "Let's talk about the role!",
      body: "Currently open to bilingual client operations, coordination, and customer success roles — in person or fully remote — connecting international or US-based companies with China-side clients, partners, or operations. Based in Chengdu. Available immediately.",
      bodyExtra: "Also open to localization coordination, bilingual roles in gaming and tech, and AI-related bilingual work, plus nationwide and overseas assignments.",
      email: "scofiled024@gmail.com",
      emailLabel: "Email",
      linkedin: "https://www.linkedin.com/in/chaoliu-cn/",
      linkedinLabel: "LinkedIn",
      button: "Download Resume",
    },
  },
  zh: {
    nav: {
      hero: "概览",
      work: "精选项目",
      experience: "工作经历",
      capabilities: "核心能力",
      knowledge: "知识桥梁",
      "how-i-work": "工作方式",
      about: "关于我",
      contact: "联系方式",
    },
    hero: {
      name: "刘超",
      title: "双语客户运营协调专员 · 跨境协作与远程协同",
      subtitle: "跨境客户运营 · 双语协调沟通 · AI 辅助工具开发",
      intro: "全程英文独立处理海外客户从询盘到回款的全流程，无需翻译协助；近三年稳定支撑一个 300 至 400 人规模的企业客户群；也曾在亚洲最大餐饮酒店展上独立完成 150 余笔成交。语言、运营与人——我站在三者的交汇点，同时具备使用 AI Agent 与 vibe coding 优化工作流程、独立开发出可用产品的实操经验。",
      button1: "查看精选项目",
      button2: "下载简历",
      linkedin: "https://www.linkedin.com/in/chaoliu-cn/",
      email: "scofiled024@gmail.com",
    },
    work: {
      title: "精选项目",
      cards: [
        {
          num: "01",
          title: "独立支撑海外客户全周期运营",
          tag: "JCBasic · 上海听谛服饰辅料有限公司",
          context: "在 JCBasic，我负责通过阿里巴巴国际站、Etsy 及品牌官网对接海外客户，担任团队的英文客户联络人；以 Zoho CRM 作为主系统管理客户档案、销售跟进与订单状态。",
          responsibility: "作为海外客户的英文联络人，全程独立管理订单生命周期，不依赖翻译或任何后援。",
          actions: "在 Zoho CRM 中维护客户档案、销售跟进与订单状态，响应询盘并出具报价。协调订单变更、生产进度与物流跟踪，主动同步客户状态。缮制合同、发票及装箱单，处理售后问题、客诉及应收款跟进。",
          results: "全程无需翻译协助，独立对接海外客户，未发生需升级处理的重大客诉。主动同步订单进度，减少客户反复催问，维持长期稳定合作。",
          skills: "CRM（Zoho）· 订单全周期管理 · 客户沟通 · 单证处理 · 跨境协调 · 利益相关方管理",
        },
        {
          num: "02",
          title: "驻场莉莉丝游戏总部企业客户联络人",
          tag: "Manner Coffee × 莉莉丝游戏 · 上海 · 2023年7月–2026年3月",
          context: "Manner Coffee 在莉莉丝游戏旗舰总部内运营一家专属咖啡馆——这座园区面积约两万平方米，曾多次荣获设计大奖，而咖啡馆是全公司重要的日常服务触点。",
          responsibility: "我担任 Manner Coffee 运营团队与莉莉丝游戏企业行政团队之间的常驻现场联络人，负责两个园区的日常服务交付、问题处理及活动协调。",
          actions: "独立处理与莉莉丝游戏行政团队的全部客户沟通。从需求确认到现场执行，全程跟进内部活动协调。近三年来持续进行每日收入核对、库存盘点和运营汇报。",
          results: "近三年保持零重大服务失误，每日稳定服务 300 至 400 人规模的企业客户群。在高标准的企业客户环境中，建立并维护了两家公司之间长期、可信赖的合作关系。",
          skills: "企业客户联络 · 问题解决 · 活动协调 · 运营报告 · 长期客户关系管理",
        },
        {
          num: "03",
          title: "代表国际咖啡品牌参展 HOTELEX 上海国际酒店餐饮展",
          tag: "HOTELEX 上海 2026 · Panda Bear Express",
          context: "Panda Bear Express 代表 ICOSA Brewhouse 与 Biru Roast 参展 HOTELEX 上海国际酒店餐饮展 2026——亚洲规模最大的餐饮酒店行业贸易展之一。",
          responsibility: "展会为期四天，我是全场唯一的中英双语品牌代表，独立承担销售、产品讲解、口译与买家接待的全部工作。",
          actions: "向中国贸易买家阐释产品价值；为国际品牌负责人及参赛咖啡师提供实时中英口译；处理买家咨询与异议，在客流高峰独立维持销售运转。",
          results: "四天内独立完成 150 多笔成交，有效避免外方团队与中国买家之间的沟通障碍，在高密度、高压力的展会环境中始终保持稳定的服务状态。",
          skills: "双语沟通 · 现场口译 · 销售支持 · 国际品牌代表 · 适应能力",
        },
      ],
      labels: {
        context: "背景",
        responsibility: "职责",
        actions: "工作内容",
        results: "成果",
      },
    },
    experience: {
      title: "工作经历",
      entries: [
        {
          date: "2026年3月–4月",
          role: "双语品牌代表 & 现场销售",
          company: "Panda Bear Express（ICOSA Brewhouse & Biru Roast）",
          location: "上海",
          logo: hotelexLogoSrc,
          summary: "作为 HOTELEX 上海国际酒店餐饮展 2026 的唯一双语代表，全面负责两个国际精品咖啡品牌的所有客户对接工作。为品牌总监提供实时英中口译，独立完成 150 多笔交易。",
        },
        {
          date: "2023年7月–2026年3月",
          role: "企业客户联络人 / 高级咖啡师",
          company: "Manner Coffee × 莉莉丝游戏",
          location: "上海",
          logos: [mannerLogoSrc, lilithGamesLogoSrc],
          summary: "担任 Manner Coffee 与莉莉丝游戏行政团队之间的主要服务联络人，横跨两个园区。近三年负责日常客户沟通、活动协调及 300 至 400 人规模客户群体的运营记录维护。",
        },
        {
          date: "2022年3月–2023年4月",
          role: "国际客户运营协调专员",
          company: "JCBasic（上海听谛服饰辅料有限公司）",
          location: "上海",
          logo: jcbasicLogoSrc,
          summary: "担任阿里巴巴国际站、Etsy 及品牌官网上海外客户的联络人；以 Zoho CRM 管理客户档案、销售跟进与订单状态，独立负责商业单证及售后协调。",
        },
        {
          date: "2021年9月–12月",
          role: "英语教师",
          company: "柳州点睛培训学校",
          location: "柳州",
          logo: dianjingLogoSrc,
          summary: "为中小学各学段授课，将复杂语言知识转化为易懂表达，并结合英语双学位背景设计清晰、可跟上的课程。",
        },
        {
          date: "2021年4月–7月",
          role: "运营与客户成功实习生",
          company: "猿辅导",
          location: "长沙",
          logo: yuanfudaoLogoSrc,
          summary: "管理 200 余人的线上用户社群，协助销售转化，在快节奏数字教育环境中处理行政运营工作。",
        },
      ],
    },
    capabilities: {
      title: "核心能力",
      groups: [
        {
          name: "客户与利益相关方协调",
          desc: "在 B2B、企业及展会等不同场景中建立并维护专业的客户关系，管理客户期望，处理投诉，并在高压环境下确保沟通清晰无误。",
        },
        {
          name: "跨境客户运营与协调",
          desc: "跨平台（阿里巴巴国际站、Etsy、品牌官网）及 CRM 系统的端到端订单与客户运营，涵盖商业单证、发货追踪及应收款跟进。",
        },
        {
          name: "双语与跨文化沟通",
          desc: "中英文流利，胜任书面沟通、实时口译及跨文化客户管理工作。擅长在国际品牌团队与中文买家或合作伙伴之间搭建沟通桥梁。",
        },
        {
          name: "服务交付与问题解决",
          desc: "全程主导从首次接触到问题解决的完整服务体验。作为高要求客户的第一联络人，现场解决问题，快速恢复服务质量。",
        },
        {
          name: "AI 辅助原型开发",
          desc: "拿到一份职位描述（JD）后，我会先做出一个能真正解决该公司实际运营问题的小工具——一个工作流、看板或自动回复助手，而不是空谈自己「对 AI 感兴趣」。这个网站和其中的招聘匹配报告就是一个例子；另外还为几次具体的面试流程单独做过类似的小工具。",
        },
      ],
    },
    about: {
      title: "关于我",
      text: [
        <>
          我的职业经历横跨国际贸易、企业服务运营、现场展会销售，最近还多了一项——在需要的时候，自己动手做一些 AI 辅助的小工具。这些看起来是完全不同的工作方式，也确实如此；但底层的逻辑始终如一：
          <span className="font-semibold italic">理解对方需求，精准传达信息，并确保事情向前推进。</span>
        </>,
        <>
          我倾向于选择那些「表达」与「理解」之间的落差会产生实质影响的岗位。在这样的角色中，一封翻译不当的邮件会导致发货延迟；一次妥善处理的客户不满，能成为客户留下的理由；
          <span className="font-semibold italic">而成为现场唯一的双语沟通者，是一种机遇，而非负担。</span>
        </>,
        <>
          工作之余，我会审慎思考信息的传递方式——语气、精准度，以及那些被省略的内容。两年国际新闻与传播方向的系统学习，进一步强化了这种沟通意识。我相信，
          <span className="font-semibold italic">冷静而清晰的沟通，是一项值得认真对待的能力。</span>
        </>,
      ],
    },
    education: {
      label: "教育背景",
      school: "天津外国语大学",
      period: "2016 – 2020",
      degrees: ["国际经济与贸易 经济学学士", "英语 文学学士"],
    },
    contact: {
      title: "联系方式",
      heading: "欢迎聊聊合适的机会!",
      body: "目前开放双语客户运营、协调与客户成功类岗位机会——现场或远程均可，衔接国际企业与中国境内的客户、合作方或运营团队。常驻成都，随时可入职。",
      bodyExtra: "亦开放本地化协调、游戏与科技行业双语岗位，以及 AI 相关双语工作方向，同时接受全国及海外派遣。",
      email: "scofiled024@gmail.com",
      emailLabel: "邮箱",
      linkedin: "https://www.linkedin.com/in/chaoliu-cn/",
      linkedinLabel: "领英",
      button: "下载简历",
    },
  },
};

const NAV_IDS = ["hero", "work", "experience", "capabilities", "knowledge", "how-i-work", "about", "contact"] as const;

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [lang, setLang] = useState<Lang>("en");
  const [showTop, setShowTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  const c = CONTENT[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_IDS.map((id) => document.getElementById(id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLang = () => setLang((l) => (l === "en" ? "zh" : "en"));

  const resumeUrl = lang === "zh" ? "/resume-zh.pdf" : "/resume-en.pdf";
  const resumeFilename = lang === "zh" ? "刘超_简历.pdf" : "ChaoLiu_CV.pdf";

  return (
    <div
      className="min-h-[100dvh] bg-background text-foreground font-sans selection:bg-primary/20 antialiased"
      lang={lang === "zh" ? "zh-CN" : "en"}
    >
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-sm shrink-0" data-testid="nav-name">
            {c.hero.name}
          </span>
          <div className="flex items-center gap-3">
            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-5 mr-2">
              {NAV_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  data-testid={`nav-${id}`}
                  aria-current={activeSection === id ? "true" : undefined}
                  className={`text-xs uppercase tracking-widest transition-colors ${
                    activeSection === id
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.nav[id]}
                </button>
              ))}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              data-testid="lang-toggle"
              aria-label={lang === "en" ? "Switch to Chinese" : "切换为英文"}
              className="flex items-center gap-1.5 text-xs font-medium tracking-widest border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
            >
              <span className={lang === "en" ? "text-foreground font-semibold" : ""}>EN</span>
              <span className="opacity-30">/</span>
              <span className={lang === "zh" ? "text-foreground font-semibold" : ""}>中文</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              data-testid="theme-toggle"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={(e) => { e.stopPropagation(); setMobileOpen((o) => !o); }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
            >
              {mobileOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-md px-6 py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {NAV_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    aria-current={activeSection === id ? "true" : undefined}
                    className={`text-left text-sm py-2.5 px-3 rounded-lg uppercase tracking-widest transition-colors ${
                      activeSection === id
                        ? "text-primary font-medium bg-muted/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    {c.nav[id]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-[1100px] mx-auto px-6 pt-32 pb-32 space-y-20">
        {/* HERO + JD MATCHER */}
        <section id="hero" className="min-h-[70vh] pt-12 lg:pt-0">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[55%_45%] lg:gap-x-8 lg:gap-y-6 lg:items-start">
            {/* Mobile: photo first */}
            <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 relative z-0 flex justify-center lg:justify-end">
              <FadeIn delay={0.2}>
                <img
                  src={photoSrc}
                  alt={c.hero.name}
                  className="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] rounded-full object-cover object-top shadow-xl ring-1 ring-border shrink-0"
                />
              </FadeIn>
            </div>

            {/* Left column: name, headline, tags */}
            <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 relative z-10 overflow-visible">
              <FadeIn>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
                  {c.hero.name}
                </h1>
                <h2
                  className={`font-medium tracking-tight text-foreground mb-2 ${
                    lang === "zh"
                      ? "text-base sm:text-lg lg:text-xl"
                      : "text-lg sm:text-xl lg:text-2xl"
                  }`}
                >
                  {c.hero.title.split(" · ").map((segment, i, arr) => (
                    <span key={i} className={lang === "zh" ? "lg:whitespace-nowrap" : undefined}>
                      {segment}
                      {i < arr.length - 1 && (
                        <>
                          <span className="hidden sm:inline"> · </span>
                          <br className="sm:hidden" />
                        </>
                      )}
                    </span>
                  ))}
                </h2>
                <div className="flex flex-nowrap gap-x-1 gap-y-1 overflow-x-auto text-[10px] uppercase tracking-wider text-muted-foreground mb-10 border-b border-border/40 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {c.hero.subtitle.split(" · ").map((tag, i) => (
                    <span key={i} className="whitespace-nowrap shrink-0">
                      {i === 0 ? tag : `· ${tag}`}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Left column: intro + CTAs — grid row 2 aligns with JD Matcher */}
            <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 relative z-10 overflow-visible">
              <FadeIn delay={0.1}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl font-light">
                  {c.hero.intro}
                </p>
                <div className="flex flex-col items-start">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                    <button
                      onClick={() => scrollToSection("work")}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-widest transition-colors w-full sm:w-auto sm:min-w-fit sm:whitespace-nowrap text-center shadow-sm hover:shadow-md"
                    >
                      {c.hero.button1}
                    </button>
                    <a
                      href={resumeUrl}
                      download={resumeFilename}
                      className="border border-border/60 bg-transparent text-foreground hover:border-border hover:bg-muted/30 px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-widest transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Download className="w-4 h-4" />
                      {c.hero.button2}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <a
                      href={c.hero.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${c.hero.email}`}
                      aria-label={`Email ${c.hero.email}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right column: JD Matcher below photo (desktop), full width (mobile) */}
            <div className="order-4 lg:order-none lg:col-start-2 lg:row-start-2 relative z-0 w-full">
              <FadeIn delay={0.15}>
                <JDMatcher lang={lang} />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CAREER BRIDGE MAP */}
        <FadeIn>
          <CareerBridgeMap lang={lang} />
        </FadeIn>

        {/* WORK */}
        <section id="work" className="scroll-mt-32">
          <FadeIn>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16 border-b border-border pb-4 font-medium">
              {c.work.title}
            </h2>
          </FadeIn>
          <div className="space-y-24 md:space-y-32">
            {c.work.cards.map((card, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group border border-border/40 bg-card p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-8 md:mb-10">
                    <span className="text-4xl md:text-5xl font-light text-muted-foreground/30 block mb-4">
                      {card.num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-primary font-medium tracking-wide text-sm md:text-base">
                      {card.tag}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-6 md:gap-y-8 mb-10">
                    <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground pt-1 border-t border-border/40 md:border-none md:pt-0">
                      {c.work.labels.context}
                    </div>
                    <div className="text-foreground leading-relaxed">
                      {card.context}
                    </div>
                    
                    <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground pt-1 border-t border-border/40 md:border-none md:pt-0">
                      {c.work.labels.responsibility}
                    </div>
                    <div className="text-foreground leading-relaxed">
                      {card.responsibility}
                    </div>
                    
                    <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground pt-1 border-t border-border/40 md:border-none md:pt-0">
                      {c.work.labels.actions}
                    </div>
                    <div className="text-foreground leading-relaxed">
                      <ul className="space-y-2">
                        {card.actions
                          .split(/(?<=[.。；;])\s*/)
                          .filter((action) => action.trim().length > 0)
                          .map((action, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-muted-foreground/60 mt-2.5 w-1.5 h-1.5 rounded-full shrink-0 bg-current"></span>
                              <span>{action.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    
                    <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground pt-1 border-t border-border/40 md:border-none md:pt-0">
                      {c.work.labels.results}
                    </div>
                    <div className="text-foreground leading-relaxed">
                      {card.results}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border/40 flex flex-wrap gap-2">
                    {card.skills.split(" · ").map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default rounded-full text-xs font-medium tracking-wide">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-32">
          <FadeIn>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16 border-b border-border pb-4 font-medium">
              {c.experience.title}
            </h2>
          </FadeIn>
          <div className="relative border-l border-border/40 ml-3 md:ml-0 md:pl-0 space-y-16">
            {c.experience.entries.map((exp, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-[224px_1fr] md:gap-12 group">
                  <div className="absolute left-[-5px] md:left-[219px] top-1.5 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary transition-colors ring-4 ring-background"></div>
                  <div className="hidden md:block text-sm font-medium text-muted-foreground pt-0.5 text-right pr-12 border-r border-border/40">
                    <div className="whitespace-nowrap">{exp.date}</div>
                    <div className="text-xs font-normal mt-1">{exp.location}</div>
                    {"logos" in exp && exp.logos ? (
                      <div className="mt-3 flex justify-end items-center gap-1.5">
                        {exp.logos.map((src, logoIndex) => (
                          <Fragment key={src}>
                            {logoIndex > 0 && (
                              <span
                                className="text-xs text-muted-foreground/70 font-medium"
                                aria-hidden="true"
                              >
                                ×
                              </span>
                            )}
                            <img src={src} alt="" className={experienceLogoClass} />
                          </Fragment>
                        ))}
                      </div>
                    ) : (
                      "logo" in exp &&
                      exp.logo && (
                        <img src={exp.logo} alt="" className={`mt-3 ml-auto ${experienceLogoClass}`} />
                      )
                    )}
                  </div>
                  <div className="md:pl-4">
                    <div className="md:hidden text-sm font-medium text-muted-foreground mb-2">
                      {exp.date} · {exp.location}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-primary font-medium mb-4">{exp.company}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="scroll-mt-32">
          <FadeIn>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16 border-b border-border pb-4 font-medium">
              {c.capabilities.title}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-16">
            {c.capabilities.groups.map((group, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground mb-3">
                    {group.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {group.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* KNOWLEDGE BRIDGE */}
        <FadeIn>
          <KnowledgeBridge lang={lang} onNavigate={scrollToSection} />
        </FadeIn>

        {/* HOW I WORK */}
        <FadeIn>
          <HowIWork lang={lang} />
        </FadeIn>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-32">
          <FadeIn>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16 border-b border-border pb-4 font-medium">
              {c.about.title}
            </h2>
          </FadeIn>
          <div className="max-w-3xl space-y-8 text-lg md:text-xl text-foreground font-light leading-relaxed">
            {c.about.text.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <p>{paragraph}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-16 max-w-3xl">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16 border-b border-border pb-4 font-medium">
                {c.education.label}
              </h2>
              <div className="flex items-start gap-5 md:gap-6">
                <img
                  src={tfsuLogoSrc}
                  alt=""
                  className="size-[5.75rem] md:size-[5.875rem] shrink-0 rounded-full object-cover ring-1 ring-border/50"
                />
                <div className="text-foreground text-base md:text-lg leading-relaxed">
                  <span className="font-semibold text-lg md:text-xl">{c.education.school}</span>
                  <span className="text-muted-foreground mx-2.5">|</span>
                  <span className="text-muted-foreground">{c.education.period}</span>
                  <div className="mt-2 space-y-1 text-base text-muted-foreground">
                    {c.education.degrees.map((degree) => (
                      <div key={degree}>{degree}</div>
                    ))}
                  </div>
                  {"extra" in c.education && c.education.extra && (
                    <div className="mt-3 text-base text-muted-foreground">{c.education.extra}</div>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-32 flex flex-col justify-center">
          <div className="max-w-2xl">
            <FadeIn>
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-16 border-b border-border pb-4 font-medium">
                {c.contact.title}
              </h2>
            </FadeIn>
            <HandwritingHeading text={c.contact.heading} lang={lang} />
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground text-lg md:text-xl mb-4 font-light leading-relaxed">
                {c.contact.body}
              </p>
              {c.contact.bodyExtra && (
                <p className="text-muted-foreground/70 text-sm mb-12 font-light leading-relaxed">
                  {c.contact.bodyExtra}
                </p>
              )}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a
                  href={`mailto:${c.contact.email}`}
                  className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-5 h-5" />
                  <span>{c.contact.emailLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={c.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors group"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>{c.contact.linkedinLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={resumeUrl}
                  download={resumeFilename}
                  className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors group sm:ml-4"
                >
                  <Download className="w-5 h-5" />
                  <span>{c.contact.button}</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all shadow-sm hover:shadow-md"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}