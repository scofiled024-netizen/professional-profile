export const NAV_IDS = [
  "hero",
  "work",
  "experience",
  "capabilities",
  "knowledge",
  "how-i-work",
  "about",
  "contact",
] as const;

export type NavId = (typeof NAV_IDS)[number];
