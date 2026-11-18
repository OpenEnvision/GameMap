# Design system, second edition: World Studio

A design record of the second-edition visual direction. The stylesheets in `website/app/styles/` are the source of truth; where they differ from this page, the stylesheets win.

Active references: overview-concept.png and library-concept.png, created with built-in ImageGen. These replace the first-edition visual direction. UI remains native React/CSS/SVG; original art and official project previews are separate assets.

Palette: page #111214; rail #161719; surfaces #1a1b1e; borders #303135; primary text #eeeae4; secondary #aaa7a2; quiet text #767773; accent #ff754e. Genuine dark backgrounds, no purple wash. Selected controls use warm orange with restrained warm elevation. The hero has an explicit left-to-right edge fade, retaining original image colors on the right.

Typography: Space Grotesk, 700 / display 64–80px; Manrope, 400–700 / UI 12–15px; Manrope with system fallbacks for English body copy. Readable dense data uses 12–13px body and 15–16px titles. Mobile display scales from 40–49px, body 12–13px. Search inputs use 16px on mobile to avoid focus zoom.

Shell: 210px fixed navigation, 66px fixed header, 26px main gutters. Custom geometric map logo in SVG. Active nav has orange left rule and dark warm fill. All navigation uses meaningful line symbols. Brand resources use local real SVGs; papers/tools without brands use semantic vectors rather than monograms.

Overview: 400px cinematic world hero, 'Build your next world.', English purpose, Explore the map and resource CTA. Three illustrated route tiles select 2D, 3D and Code WM. Six-step dark interactive map with real resource inspector. Authentic source-credited project gallery, then six category discovery links and methodology note.

Library: spacious title and English subtitle, selected project preview rail, search and list/grid controls, six category tabs, functional stage/type/dimension/sort filters. Editorial rows use actual brands and source-specific previews; gallery view uses vector identity when no authentic preview exists. Drawer has authentic preview where available, source credit, type/year, actual sourced descriptions, topics, source CTA and saved state.

Notes: illustrated editorial title, four numbered conceptual notes, image-led Code WM explanation and explicit state/structure/rendering pipeline. Saved collection shares the library language.

Artwork: /media/editorial/* are original AI-generated editorial art, labelled accordingly. /media/demos/* are author/official previews and each has source/credit. Never substitute imagined project results for official evidence. Do not use misleading video-play buttons on static images.

Motion: subtle image scale on hover, orange selection transitions, short entrances; reduced-motion disables transitions. Routes remain functional with keyboard, mobile nav hides from accessibility tree when closed, modal focus is contained. Mobile route nodes become readable two-column layout and inspector stacks below.

English edition: all interface copy, catalog content, accessibility labels, and downloadable reader guides are in English. Mobile hero content and source credits flow naturally instead of sharing fixed vertical slots. The root index.html remains a generated direct-open preview; GitHub Pages publishes dist/.
