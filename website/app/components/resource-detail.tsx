import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bookmark, Check, Link2, X } from "lucide-react";
import type { Resource } from "../../src/types";
import ResourceIcon, {
  ResourceAttribution,
} from "../../src/components/ResourceIcon";
import { categories, stageLabels, typeLabels } from "../lib/catalog";
import { projectVideos } from "../../src/data/projectVideos";
import { projectMedia } from "../../src/data/projectMedia";

export function ResourceDetail({
  resource,
  saved,
  onSave,
  onClose,
}: {
  resource: Resource;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copy, setCopy] = useState("");
  const video = projectVideos[resource.id];
  const media = projectMedia[resource.id];
  useEffect(() => {
    const node = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node?.showModal();
    return () => {
      node?.close();
      document.body.style.overflow = overflow;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="resource-dialog"
      aria-labelledby="resource-title"
      aria-describedby="resource-summary"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <div className="detail-toolbar">
        <span className="eyebrow">
          {
            categories.find((category) => category.id === resource.category)
              ?.label
          }
        </span>
        <button
          className="quiet-icon"
          onClick={onClose}
          aria-label="Close resource details"
        >
          <X size={21} />
        </button>
      </div>
      {(video || media) && (
        <figure className="detail-media">
          {video ? (
            <video
              controls
              playsInline
              preload="none"
              src={video.previewSrc}
              poster={media?.src}
              aria-label={video.title}
            >
              Your browser does not support this preview.
            </video>
          ) : (
            <img src={media.src} alt={media.alt} loading="lazy" />
          )}
          <figcaption>
            <a
              href={video?.source || media.source}
              target="_blank"
              rel="noreferrer"
            >
              {video?.credit || media.credit}
              <ArrowUpRight size={12} />
            </a>
            {video && (
              <a href={video.src} target="_blank" rel="noreferrer">
                Original video
                <ArrowUpRight size={12} />
              </a>
            )}
          </figcaption>
          {video && <p>{video.description}</p>}
        </figure>
      )}
      <div className="detail-identity">
        <ResourceIcon resource={resource} size={56} />
        <span className="small-label">
          {typeLabels[resource.type]}
          {resource.year ? ` / ${resource.year}` : ""}
        </span>
      </div>
      <h2 id="resource-title">{resource.name}</h2>
      <ResourceAttribution resource={resource} linked />
      <p id="resource-summary" className="detail-summary">
        {resource.summary}
      </p>
      <div className="detail-actions">
        <a
          className="button button-primary"
          href={resource.url}
          target="_blank"
          rel="noreferrer"
        >
          Visit project
          <ArrowUpRight size={16} />
        </a>
        <button
          className="button button-secondary"
          aria-pressed={saved}
          onClick={onSave}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save resource"}
        </button>
      </div>
      <section className="detail-section">
        <h3>Why it belongs here</h3>
        <p>{resource.detail}</p>
      </section>
      {resource.access && (
        <section className="detail-section">
          <h3>Tutorial, demo & source</h3>
          <div className="access-list">
            {Object.entries(resource.access).map(([kind, access]) => (
              <div key={kind}>
                <span className="small-label">
                  {kind} / {access.kind.replaceAll("-", " ")}
                </span>
                {access.url ? (
                  <a href={access.url} target="_blank" rel="noreferrer">
                    {access.label}
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <strong>{access.label}</strong>
                )}
                <p>{access.note}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="detail-section">
        <h3>Where it fits</h3>
        <div className="tag-list">
          {resource.stages.map((stage) => (
            <span key={stage}>{stageLabels[stage]}</span>
          ))}
          {resource.dimensions.map((track) => (
            <span key={track}>
              {track === "world" ? "World models" : track.toUpperCase()}
            </span>
          ))}
        </div>
      </section>
      {resource.links?.length ? (
        <section className="detail-section">
          <h3>Go a little further</h3>
          <div className="detail-links">
            {resource.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </section>
      ) : null}
      <div className="detail-footer">
        <span>Source reviewed {resource.verified}</span>
        <button
          className="inline-link"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setCopy("Link copied.");
            } catch {
              setCopy("Could not copy. Use the address in your browser.");
            }
          }}
        >
          {copy === "Link copied." ? <Check size={14} /> : <Link2 size={14} />}
          Copy link
        </button>
      </div>
      {copy && (
        <p className="copy-notice" role="status">
          {copy}
        </p>
      )}
    </dialog>
  );
}
