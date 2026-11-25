import type { ContentEntry } from "../../content/models";
import { Link, useSiteI18n } from "../lib/i18n";
import { testingUses } from "../../src/data/testingTypes";

export function TestingStarterCard({
  entry,
  resources,
  total,
  onUse,
}: {
  entry: ContentEntry<"testing-pack">;
  resources: ContentEntry<"testing">[];
  total: number;
  onUse: () => void;
}) {
  const { t } = useSiteI18n();
  const pack = entry.data;
  const labels =
    resources.length === total
      ? pack.resources.split(" · ")
      : resources.map((item) => item.title);
  return (
    <article
      id={entry.url.split("#")[1]}
      className="testing-starter-card"
      data-content-key={entry.key}
      data-content-kind={entry.kind}
    >
      <p className="testing-starter-goal">{t(testingUses[pack.use])}</p>
      <h2 data-content-field="title">{entry.title}</h2>
      <p data-content-field="resources">
        <span data-content-field="testingIds">
          {resources.map((resource, index) => (
            <span key={resource.id}>
              {index > 0 && " · "}
              <Link to={resource.url}>{labels[index] || resource.title}</Link>
            </span>
          ))}
        </span>
      </p>
      {resources.length !== total && (
        <p className="testing-starter-availability">
          {t("{count} of {total} suggested resources match your filters.", {
            count: resources.length,
            total,
          })}
        </p>
      )}
      <dl>
        {(
          [
            ["task", "Task"],
            ["measure", "Measure"],
            ["check", "Checkpoint"],
          ] as const
        ).map(
          ([field, label]) =>
            pack[field] && (
              <div key={field} data-content-field={field}>
                <dt>{t(label)}</dt>
                <dd>{pack[field]}</dd>
              </div>
            ),
        )}
      </dl>
      <button type="button" className="testing-clear" onClick={onUse}>
        {t("Use this testing goal")}
      </button>
    </article>
  );
}
