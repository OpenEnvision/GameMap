/* First-visit brand moment. The markup is static (identical on server and
 * client) and the whole sequence, including its removal, is a CSS animation in
 * styles/fx.css, so it can never block a visitor without JavaScript. It only
 * shows under prefers-reduced-motion: no-preference, never takes pointer
 * events, and FX_INTRO_SCRIPT skips it for the rest of the browser session. */

/** Runs in <head> before first paint. */
export const FX_INTRO_SCRIPT =
  'try{var d=document.documentElement,s=window.sessionStorage;if(s.getItem("gm-intro"))d.setAttribute("data-fx-intro","off");else s.setItem("gm-intro","1")}catch(e){}';

// The GameMap mark (public/brand/gamemap-mark.svg), split into its parts.
const BODY =
  "M31 3 48.3 13 35.5 20.4 31 17.8 13.5 27.9v20.2L31 58.2l17.5-10.1V43H31V30.5h30v23.9L31 71.7 1 54.4V20.3L31 3Z";
const FACE = "m1 20.3 12.5 7.6v20.2L31 58.2v13.5L1 54.4V20.3Z";
const DOT = "m61 1 8 4.6v9.2l-8 4.6-8-4.6V5.6L61 1Z";

export function FxIntro() {
  return (
    <div className="fx-intro" aria-hidden="true">
      <div className="fx-intro-stage">
        <svg
          className="fx-intro-mark"
          viewBox="-2 -2 76 76"
          width="76"
          height="76"
          focusable="false"
        >
          <path className="fx-intro-body" d={BODY} />
          <path className="fx-intro-face" d={FACE} />
          <path className="fx-intro-dot" d={DOT} />
          <path className="fx-intro-trace" d={BODY} pathLength={1} />
        </svg>
        <span className="fx-intro-word">
          <span>Game</span>
          <span className="fx-intro-accent">Map</span>
        </span>
      </div>
      <span className="fx-intro-meter">
        <span className="fx-intro-count" />
        <span className="fx-intro-bar" />
      </span>
    </div>
  );
}
