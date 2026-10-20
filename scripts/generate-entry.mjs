import { exportRootStatic } from './lib/root-static.mjs';
const manifest = await exportRootStatic();
console.log(`Exported the complete static site to the repository root: ${manifest.files.length} files; base ${manifest.base}. index.html is the rendered homepage.`);
