// An open, folded G with a detached waypoint: a map for worlds yet to be built.
const artwork = (
  <g fill="currentColor">
    <path d="M22 3 33 9.4 25 14 22 12.2 11 18.5v12.7l11 6.3 11-6.3V28H22v-8h19v15L22 46 3 35V14Z"/>
    <path d="m3 14 8 4.5v12.7L22 37.5V46L3 35Z" fill="#111214" fillOpacity=".2"/>
    <path d="m33 28 8-8H22v8Z" fill="#fff" fillOpacity=".16"/>
    <path d="m41 2 5 2.9v5.8L41 13.6l-5-2.9V4.9Z"/>
  </g>
);

export default function BrandMark({size=38}:{size?:number}) {
  return <svg className="brand-mark" width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">{artwork}</svg>;
}

export function BrandWordmark() {
  return <span className="brand-wordmark">Game<span className="brand-wordmark-map">Map</span></span>;
}
