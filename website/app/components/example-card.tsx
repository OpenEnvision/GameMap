import { ArrowUpRight, Code2 } from "lucide-react";
import { Link } from "react-router";
import { content } from "../../content/registry";
import { learningMedia, publicAsset } from "../lib/catalog";
import type { LearningPath } from "../../src/data/learningTypes";

export function ExampleCard({
  game,
  compact = false,
}: {
  game: LearningPath;
  compact?: boolean;
}) {
  const media = learningMedia[game.id];
  const entry = content.require(
    game.category === "foundation" ? "foundation" : "example",
    game.id,
  );
  return (
    <article
      className={`example-card${compact ? " compact" : ""}`}
      id={game.id}
      data-content-ref={entry.key}
    >
      <a
        className="example-image"
        href={game.demo.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${game.demo.kind === "playable" ? "Play" : "Download"} ${game.title}`}
      >
        {media && (
          <img
            src={publicAsset(media.src)}
            alt={media.alt}
            width={1280}
            height={720}
            loading="lazy"
          />
        )}
        <span className="image-action">
          {game.demo.kind === "playable" ? "Play the game" : "Get the game"}
          <ArrowUpRight size={14} />
        </span>
      </a>
      <div className="example-body">
        <div className="card-meta">
          <span>
            {game.track.toUpperCase()} / {game.engine}
          </span>
          <Code2 size={15} />
        </div>
        <h3>
          <a href={game.demo.url} target="_blank" rel="noreferrer">
            {game.title}
            <ArrowUpRight size={17} />
          </a>
        </h3>
        <p>{game.description}</p>
        {!compact && (
          <details className="build-notes">
            <summary>How it was built</summary>
            <p>{game.aiUse}</p>
            <ol>
              {game.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="source-note">{game.source.note}</p>
            <p className="source-note">{game.demo.note}</p>
            {game.evidence && (
              <>
                <a href={game.evidence.url} target="_blank" rel="noreferrer">
                  {game.evidence.label}
                  <ArrowUpRight size={13} />
                </a>
                <p className="source-note">{game.evidence.note}</p>
              </>
            )}
          </details>
        )}
        <div className="example-links">
          <Link to={entry.url}>
            Complete record
            <ArrowUpRight size={13} />
          </Link>
          <a href={game.source.url} target="_blank" rel="noreferrer">
            Project source
            <ArrowUpRight size={13} />
          </a>
          <a href={game.tutorial.url} target="_blank" rel="noreferrer">
            {compact ? "Build story" : game.tutorial.label}
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}
