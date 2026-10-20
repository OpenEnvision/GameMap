import type { DemoContent } from './models';
export const demoTypeLabels = {
  gameplay: "Gameplay",
  assets: "Asset generation",
  scenes: "Scene generation",
  "world-model": "World model",
  workflow: "Development workflow",
} as const;
/**
 * A temporally shortened preview is an excerpt even when its full image frame is
 * preserved. A complete author GIF may remain a source-recording after encoding.
 * originalUrl always retains the author-published recording independently.
 */
export type RecordingView = Omit<DemoContent, 'recordingId' | 'resourceId' | 'originalUrl'>;
export interface Recording { id: string; resourceId: string; originalUrl: string; views: RecordingView[]; }
export function groupRecordings<T extends { data: DemoContent }>(views: readonly T[]) {
  const groups = new Map<string, T[]>();
  for (const view of views) { const group = groups.get(view.data.recordingId) || []; group.push(view); groups.set(view.data.recordingId, group); }
  return [...groups.values()];
}
