import { useCallback, useEffect, useState } from "react";
import { GameCard } from "./game-card";
import {
  useCommunity,
  useCommunityText,
  type CommunityWork,
} from "../lib/community";

export function useCommunityWorks() {
  const community = useCommunity(),
    request = community?.request,
    configured = community?.settings.configured;
  const [works, setWorks] = useState<CommunityWork[]>([]),
    [error, setError] = useState(false);
  const refresh = useCallback(async () => {
    if (!request || !configured) return;
    try {
      const all: CommunityWork[] = [];
      let total = 1;
      while (all.length < total && all.length < 5000) {
        const result = await request<{ items: CommunityWork[]; count: number }>(
          "/works?offset=" + all.length,
        );
        all.push(...result.items);
        total = result.count;
        if (!result.items.length) break;
      }
      setWorks(all);
      setError(false);
    } catch {
      setError(true);
    }
  }, [request, configured]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { works, error, refresh };
}
export function CommunityWorkCard({ work }: { work: CommunityWork }) {
  const text = useCommunityText(),
    first = work.screenshots[0];
  return (
    <GameCard
      contentKey={work.key}
      title={work.title}
      description={work.description}
      track={work.track}
      engine={work.engine}
      demo={{ url: work.url, kind: work.accessKind }}
      recordUrl={`/works/?id=${work.id}`}
      sourceUrl={work.sourceUrl || undefined}
      media={
        first
          ? {
              src: `/community-media/${first}.webp`,
              alt: `${work.title} — ${text("author-submitted screenshot", "作者投稿截图")}`,
              width: work.preview?.width || 1280,
              height: work.preview?.height || 720,
            }
          : undefined
      }
      notes={
        <details className="build-notes">
          <summary>{text("Community submission", "用户投稿")}</summary>
          <p>
            {text("Created by ", "作者：")}
            {work.author}
          </p>
          <p className="source-note">
            {work.license ||
              text(
                "Reuse rights have not been specified.",
                "作者未说明复用许可。",
              )}
          </p>
        </details>
      }
    />
  );
}
