import type { DemoContent } from "./models";
export type RecordingView = Omit<
  DemoContent,
  "recordingId" | "resourceId" | "originalUrl"
>;
export interface Recording {
  id: string;
  resourceId: string;
  originalUrl: string;
  views: RecordingView[];
}
export function pageCoverAlt(alt: string) {
  return alt
    .replace("; not an upstream page or gameplay screenshot.", ".")
    .replace("; not a gameplay screenshot.", ".");
}

export function groupRecordings<T extends { data: DemoContent }>(
  views: readonly T[],
) {
  const groups = new Map<string, T[]>();
  for (const view of views) {
    const group = groups.get(view.data.recordingId) || [];
    group.push(view);
    groups.set(view.data.recordingId, group);
  }
  return [...groups.values()];
}
