import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV_IDS } from "@/constants/nav";
import type { SiteContent } from "@/content/types";
import type { Lang } from "@/types/lang";

type Theme = "light" | "dark";

interface NavbarProps {
  lang: Lang;
  theme: Theme;
  content: SiteContent;
  activeSection: string;
  mobileOpen: boolean;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onToggleMobile: (e: React.MouseEvent) => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({
  lang,
  theme,
  content,
  activeSection,
  mobileOpen,
  onToggleLang,
  onToggleTheme,
  onToggleMobile,
  onScrollToSection,
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-semibold tracking-tight text-sm shrink-0" data-testid="nav-name">
          {content.hero.name}
        </span>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-5 mr-2">
            {NAV_IDS.map((id) => (
              <button
                key={id}
                onClick={() => onScrollToSection(id)}
                data-testid={`nav-${id}`}
                aria-current={activeSection === id ? "true" : undefined}
                className={`text-xs uppercase tracking-widest transition-colors ${
                  activeSection === id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {content.nav[id]}
              </button>
            ))}
          </div>

          <button
            onClick={onToggleLang}
            data-testid="lang-toggle"
            aria-label={lang === "en" ? "Switch to Chinese" : "切换为英文"}
            className="flex items-center gap-1.5 text-xs font-medium tracking-widest border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
          >
            <span className={lang === "en" ? "text-foreground font-semibold" : ""}>EN</span>
            <span className="opacity-30">/</span>
            <span className={lang === "zh" ? "text-foreground font-semibold" : ""}>中文</span>
          </button>

          <button
            onClick={onToggleTheme}
            data-testid="theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onToggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
          >
            {mobileOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

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
                  onClick={() => onScrollToSection(id)}
                  aria-current={activeSection === id ? "true" : undefined}
                  className={`text-left text-sm py-2.5 px-3 rounded-lg uppercase tracking-widest transition-colors ${
                    activeSection === id
                      ? "text-primary font-medium bg-muted/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {content.nav[id]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
