export const NAV_IDS = ["hero", "work", "experience", "capabilities", "about", "contact"] as const;

export type NavId = (typeof NAV_IDS)[number];
