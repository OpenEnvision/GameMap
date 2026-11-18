# Design system, first edition

Superseded by the [second edition](../v2/design-system.md). This page records the first visual direction for reference.

Built-in ImageGen concepts: `map-concept.png` and `library-concept.png`. These are design references; the website draws its map, line art, controls and text with SVG/CSS/React.

Concept brief: a premium editorial research atlas for AI game development. A white 214px navigation rail, off-white workspace, forest typography and chartreuse selections; a six-stage connected planning canvas, right resource inspector, category discovery, searchable editorial resource list, bookmarks and a detail drawer. Native text and controls; no invented metrics.

Tokens: workspace #f6f5ef, navigation #fbfbf8, text #20322e, lines #dedfd6, selection #d5ee83, map #edf0e4. Category accents sage #6e9d51, lavender #9780d5, orange #ec965b, blue #6b91d0, pink #cd85ad.

Typography: DM Sans for primary UI, Noto Sans SC for Chinese, Instrument Serif italic for selected display words. Sans and serif system fallbacks preserve layout if external fonts are unavailable.

Composition: fixed 65px header and 214px navigation on desktop; 36px content gutters. A connected six-node S route with a 279px inspector. The map becomes one column below 1000px. On mobile the navigation becomes a drawer and the map inspector moves below the canvas. Resource rows become single readable columns.

Shared components: Header, Sidebar, MapView, ResourceLibrary, ResourceDrawer, FieldNotes, AtlasArt. Interaction model: dimension tabs, clickable stage nodes, contextual resources, query/category/type/stage/dimension filters, sort, resource deep links, local bookmarks, Markdown export and keyboard navigation.

Motion: 180–500ms subtle entrance/state transitions; reduced-motion preference disables transitions. No bitmap overlays or imagery tinting; original generated concept references are preserved here for review.
