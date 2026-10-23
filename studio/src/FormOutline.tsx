import { useEffect, useRef, useState } from "react";
import { ListTree } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

export function FormOutline({ sections }: { sections: Section[] }) {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState(sections[0]?.id);
  const sectionIds = sections.map((section) => section.id).join("|");

  useEffect(() => {
    const elements = sectionIds
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (!elements.length) return;
    const scroller = nav.current?.closest(".editor-content");
    const topbar = document.querySelector(".topbar");
    const mobile = window.matchMedia("(max-width: 800px)");
    let observer: IntersectionObserver | undefined;
    const visible = new Set<string>();

    const observe = () => {
      observer?.disconnect();
      visible.clear();
      const root = mobile.matches ? null : scroller;
      const offset = mobile.matches
        ? topbar?.getBoundingClientRect().height || 0
        : 0;
      nav.current?.parentElement?.style.setProperty(
        "--form-outline-offset",
        `${offset}px`,
      );
      const height = root?.getBoundingClientRect().height || window.innerHeight;
      const inset = Math.min(
        offset + (nav.current?.offsetHeight || 48) + 12,
        height * 0.35,
      );
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          const current = elements.find((element) => visible.has(element.id));
          if (current) setActive(current.id);
        },
        { root, rootMargin: `-${inset}px 0px -45% 0px`, threshold: 0 },
      );
      elements.forEach((element) => observer!.observe(element));
    };

    setActive(elements[0].id);
    observe();
    const resize = new ResizeObserver(observe);
    if (scroller) resize.observe(scroller);
    if (topbar) resize.observe(topbar);
    mobile.addEventListener("change", observe);
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      resize.disconnect();
      mobile.removeEventListener("change", observe);
      window.removeEventListener("resize", observe);
    };
  }, [sectionIds]);

  return (
    <nav
      ref={nav}
      className="form-outline"
      aria-label="内容字段分组"
      style={{
        gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))`,
      }}
    >
      <span className="form-outline-label">
        <ListTree size={14} aria-hidden="true" />
        本页内容
      </span>
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? "location" : undefined}
          onClick={() => setActive(section.id)}
        >
          <span className="outline-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          {section.title}
        </a>
      ))}
    </nav>
  );
}
