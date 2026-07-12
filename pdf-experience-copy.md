# Resume Update — Manual Copy/Paste Guide

I couldn't safely automate edits directly into the `.pages` files — macOS blocks the
UI scripting needed to preserve formatting, and Pages' AppleScript interface only
supports replacing the *entire* document body at once (which would wipe all bold/
layout). So this is a manual guide instead. Sorry for the detour.

Target files:
- `/Users/chao/Desktop/简历/7:11简历更新/ChaoLiu_CS_Resume_2026.pages` (EN)
- `/Users/chao/Desktop/简历/7:11简历更新/刘超_客户服务_简历_2026.pages` (ZH)

**Order note:** Experience stays reverse-chronological (HOTELEX → Manner → JCBasic →
English Instructor) — same as it is now, same as the website. Only the JCBasic and
Manner role *titles* change; nothing needs to be moved.

Fastest method in Pages: **Edit menu → Find → Find & Replace** (or ⌥⌘F), paste the
"Find" text, paste the "Replace" text, click Replace All. This preserves bold/format
because Pages keeps the existing character style when swapping matched text.

---

## EN — `ChaoLiu_CS_Resume_2026.pages`

### 1. Header block

| Find (current) | Replace with |
|---|---|
| `Bilingual Customer Experience Professional  |  English–Chinese  |  ` | `Bilingual Client Operations Coordinator  |  Cross-Border & Remote Teams  |  ` |
| `B2B Client Relations  |  International Brand Services` | `Client Operations Coordination  |  Bilingual Communication  |  AI-Assisted Delivery` |
| `Shanghai, China | +86 136-6210-5286 | scofiled024@gmail.com | chaoliu.icu` | `Chengdu, China (Remote-Ready) | +86 136-6210-5286 | scofiled024@gmail.com | chaoliu.icu` |

### 2. Professional Summary (replace the whole paragraph)

Find the full paragraph starting "Bilingual (English/Chinese) customer-facing professional..." and replace with:

```
Bilingual (English/Mandarin) client operations and cross-border coordination professional, comfortable as the only English-speaking point of contact on the team — across international trade, corporate service operations, and live exhibition sales. Fluent in business English with hands-on experience in full-cycle order management with CRM, real-time interpretation, and cross-cultural client relations. Also builds small AI-assisted prototype tools — a workflow, dashboard, or reply-drafting assistant — when a role calls for it, to show an understanding of a company's real operations before being hired for it.
```

### 3. Role title retitles (Experience section — order unchanged)

| Find (current) | Replace with |
|---|---|
| `Senior Barista & Corporate Client Liaison` | `Corporate Client Liaison & Senior Barista` |
| `Foreign Trade Specialist & International Client Manager` | `International Client Operations Coordinator` |

### 4. JCBasic bullets (optional light tightening)

| Find (current) | Replace with |
|---|---|
| `English-language contact for overseas B2B clients across Alibaba International, Etsy and brand website; managed the full order lifecycle in Zoho CRM.` | `Only English-speaking contact for overseas clients across Alibaba International, Etsy and brand website; ran the full order lifecycle in Zoho CRM, start to finish, entirely on my own.` |

### 5. Core Competencies — add one line

After the `Tools:` line (or wherever fits), add a new bullet:

```
AI-Assisted Prototyping: Given a job description, builds a small working tool (workflow, dashboard, or reply-drafting assistant) addressing the target company's real operations — often before the interview happens.
```

Optionally tighten `Customer Service:` line to drop the "B2B & B2C" framing:

| Find (current) | Replace with |
|---|---|
| `Customer Service:  Inquiry handling, complaint resolution, after-sales coordination, B2B & B2C client relations, service recovery` | `Customer Service:  Inquiry handling, complaint resolution, after-sales coordination, client relations, service recovery` |

---

## ZH — `刘超_客户服务_简历_2026.pages`

I can't read this file's current text directly (its content lives in a text box, not
the main body flow, so my read-only tooling can't extract it). Structure should
mirror the English file 1:1 — same section order, same line-for-line layout. Use the
blocks below as direct replacements for the equivalent lines.

### 1. Header block

```
双语客户运营协调专员  |  跨境团队协作  |
跨境客户运营  |  双语协调沟通  |  AI 辅助交付
成都，中国（可远程） | +86 136-6210-5286 | scofiled024@gmail.com | chaoliu.icu
```

### 2. 个人简介（Professional Summary，整段替换）

```
双语（中英文）客户运营与跨境协调专业人员，习惯作为唯一的英文联络人独立处理事务、无需后援——横跨国际贸易、企业服务运营与现场展会销售。英语流利，具备 CRM 全周期订单管理、实时口译及跨文化客户关系处理的实战经验。如果岗位需要，也会先做出一个 AI 辅助的小工具（工作流、看板或自动回复助手），用实际产出证明自己理解这份工作，而不只是被雇用之后才开始学。
```

### 3. 职位名称替换（Experience 部分，顺序不变）

| 原文 | 替换为 |
|---|---|
| 高级咖啡师 / 企业客户对接人（或类似表述） | 企业客户联络人 / 高级咖啡师 |
| 外贸专员 & 国际客户经理（或类似表述） | 国际客户运营协调专员 |

### 4. 核心能力（Core Competencies）— 新增一行

```
AI 辅助原型开发：拿到一份职位描述后，能独立做出一个真正解决目标公司实际运营问题的小工具（工作流、看板或自动回复助手），往往在面试之前就已经完成。
```

---

## After editing

Export both files as PDF (File → Export To → PDF) and replace:
- `public/resume-en.pdf`
- `public/resume-zh.pdf`

Then let me know and I'll double-check the site still links to the right filenames.
