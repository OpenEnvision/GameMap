import { Gamepad2, PanelsTopLeft } from "lucide-react";
import { useTheme } from "next-themes";
import type { ThemeSwitchProps } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { useHydrated } from "../lib/client-query";
import { useSiteI18n } from "../lib/i18n";

export const displayModeStorageKey = "gamemap-display-mode";

// This runs before next-themes reads storage or the browser paints the page.
// System was a color preference, so it becomes the new default Game mode.
export const displayModeBootstrap = `(function(){var mode="game";try{var stored=localStorage.getItem("${displayModeStorageKey}");if(stored==="general"||stored==="game"){mode=stored;}else{if(stored===null&&localStorage.getItem("theme")==="light")mode="general";localStorage.setItem("${displayModeStorageKey}",mode);}}catch(_){mode="game";}var root=document.documentElement;root.classList.remove("light","dark");root.classList.add(mode==="game"?"dark":"light");var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute("content",mode==="game"?"#0b101b":"#fffcfb");})();`;

export function DisplayModeToggle({ className = "" }: { className?: string }) {
  const { t } = useSiteI18n();
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const mode = hydrated && theme === "general" ? "general" : "game";
  const game = mode === "game";
  return (
    <button
      type="button"
      className={`quiet-icon display-mode-toggle ${className}`.trim()}
      aria-label={t("Switch display mode")}
      aria-pressed={game}
      data-mode={mode}
      title={t(game ? "Game mode" : "General mode")}
      disabled={!hydrated}
      onClick={() => setTheme(game ? "general" : "game")}
    >
      <Gamepad2
        className="display-mode-game-icon"
        size={18}
        aria-hidden="true"
      />
      <PanelsTopLeft
        className="display-mode-general-icon"
        size={18}
        aria-hidden="true"
      />
    </button>
  );
}

export function DocumentationDisplayMode({
  className = "",
  mode: _mode,
  ...props
}: ThemeSwitchProps) {
  return (
    <div
      {...props}
      className={`documentation-display-mode ${className}`.trim()}
    >
      <DisplayModeToggle />
    </div>
  );
}
