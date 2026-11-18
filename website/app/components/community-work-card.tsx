import { useCallback, useEffect, useState } from "react";
import { GameCard } from "./game-card";
import { useCommunity, type CommunityWork } from "../lib/community";
import { useSiteI18n } from "../lib/i18n";

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
  const { t } = useSiteI18n(),
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
              alt: `${work.title} — ${t("author-submitted screenshot")}`,
              width: work.preview?.width || 1280,
              height: work.preview?.height || 720,
            }
          : undefined
      }
      notes={
        <details className="build-notes">
          <summary>{t("Community submission")}</summary>
          <p>{t("Created by {author}", { author: work.author })}</p>
          <p className="source-note">
            {work.license || t("Reuse rights have not been specified.")}
          </p>
        </details>
      }
    />
  );
}
