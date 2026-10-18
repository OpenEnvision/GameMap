export function AtlasArt({ small=false }: {small?:boolean}) {
 return <svg className={small?'atlas-art small':'atlas-art'} viewBox="0 0 240 170" fill="none" aria-hidden="true">
  <ellipse cx="124" cy="84" rx="105" ry="44" transform="rotate(-26 124 84)" stroke="currentColor" strokeWidth=".6" strokeDasharray="2 7"/>
  <g stroke="currentColor" strokeWidth=".75"><path d="m73 92 35-20 35 20-35 21z" fill="#eef1e6"/><path d="m73 92 35 21v40l-35-20z" fill="#f8f8f0"/><path d="m108 113 35-21v41l-35 20z" fill="#e8edde"/>
  <path d="m109 72 35-20 35 20-35 21z" fill="#f8f8f0"/><path d="m109 72 35 21v40l-35-20z" fill="#edf0e4"/><path d="m144 93 35-21v40l-35 21z" fill="#e2e8d8"/>
  <path d="m109 32 35-20 35 20-35 21z" fill="#f6f7ed"/><path d="m109 32 35 21v40l-35-20z" fill="#edf0e4"/><path d="m144 53 35-21v40l-35 21z" fill="#e2e8d8"/>
  <path d="m195 51 16-9 16 9-16 10zM195 51l16 10v18l-16-9zM211 61l16-10v19l-16 9z"/>
  </g><circle cx="41" cy="112" r="2" fill="currentColor"/><circle cx="186" cy="20" r="2" fill="currentColor"/>
 </svg>;
}
