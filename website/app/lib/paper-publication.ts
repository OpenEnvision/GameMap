import type { ContentModels } from "../../content/models";

type PaperPublication = Pick<
  ContentModels["paper"],
  "publication" | "year" | "referenceType"
>;

// Presentation aliases only: never infer a venue from a title, arXiv ID or URL,
// or change the original bibliographic data. Prefer an unabridged citation over
// discarding an unrecognized workshop, track, publication status or joint venue.
const venues: readonly (readonly [string, RegExp])[] = [
  [
    "CHI PLAY",
    /\b(?:Annual Symposium on Computer-Human Interaction in Play|CHI PLAY)\b/i,
  ],
  [
    "CHI",
    /\b(?:(?:SIGCHI|CHI) Conference on Human Factors in Computing Systems|CHI)\b/i,
  ],
  [
    "AIIDE",
    /\b(?:(?:AAAI Conference on )?Artificial Intelligence and Interactive Digital Entertainment(?: Conference)?|AIIDE)\b/i,
  ],
  ["AAAI", /\b(?:AAAI Conference on Artificial Intelligence|AAAI)\b/i],
  [
    "NeurIPS",
    /\b(?:Advances in Neural Information Processing Systems|NeurIPS)\b/i,
  ],
  ["NIPS", /\bNIPS\b/i],
  [
    "ICLR",
    /\b(?:International Conference on Learning Representations|ICLR)\b/i,
  ],
  ["ICML", /\b(?:International Conference on Machine Learning|ICML)\b/i],
  [
    "CVPR",
    /\b(?:(?:IEEE\/CVF )?Conference on Computer Vision and Pattern Recognition|CVPR)\b/i,
  ],
  [
    "ICCV",
    /\b(?:(?:IEEE\/CVF )?International Conference on Computer Vision|ICCV)\b/i,
  ],
  ["ECCV", /\b(?:European Conference on Computer Vision|ECCV)\b/i],
  ["EMNLP-IJCNLP", /\bEMNLP-IJCNLP\b/i],
  [
    "EMNLP",
    /\b(?:Conference on Empirical Methods in Natural Language Processing|EMNLP)\b/i,
  ],
  ["NAACL", /\bNAACL\b/i],
  [
    "ACL",
    /\b(?:(?:Annual )?Meeting of the Association for Computational Linguistics|ACL)\b/i,
  ],
  ["DiGRA/FDG", /\bInternational Joint Conference of DiGRA and FDG\b/i],
  ["DiGRA", /\b(?:Digital Games Research Association Conference|DiGRA)\b/i],
  [
    "FDG",
    /\b(?:International Conference on (?:the )?Foundations of Digital Games|FDG)\b/i,
  ],
  ["CoG", /\b(?:IEEE Conference on Games|(?:IEEE )?CoG)\b/i],
  [
    "CIG",
    /\b(?:IEEE Conference on Computational Intelligence (?:and|in) Games|CIG)\b/i,
  ],
  ["GECCO", /\b(?:Genetic and Evolutionary Computation Conference|GECCO)\b/i],
  [
    "IJCAI",
    /\b(?:International Joint Conference on Artificial Intelligence|IJCAI)\b/i,
  ],
  [
    "IROS",
    /\b(?:IEEE\/RSJ International Conference on Intelligent Robots and Systems|IROS)\b/i,
  ],
  [
    "DSAA",
    /\b(?:IEEE International Conference on Data Science and Advanced Analytics|DSAA)\b/i,
  ],
  [
    "UIST",
    /\b(?:(?:Annual )?ACM Symposium on User Interface Software and Technology|UIST)\b/i,
  ],
  ["CUI", /\b(?:ACM Conference on Conversational User Interfaces|CUI)\b/i],
  [
    "AST",
    /\b(?:(?:IEEE\/ACM )?International Conference on Automation of Software Test|AST)\b/i,
  ],
  [
    "ASE",
    /\b(?:(?:IEEE\/ACM )?International Conference on Automated Software Engineering|ASE)\b/i,
  ],
  [
    "FSE",
    /\b(?:ACM International Conference on (?:the )?Foundations of Software Engineering|FSE)\b/i,
  ],
  [
    "ACE",
    /\b(?:International Conference on Advances in Computer Entertainment Technology|ACE)\b/i,
  ],
  ["WWW", /\b(?:International Conference on World Wide Web|WWW)\b/i],
  ["SIGGRAPH", /\bSIGGRAPH\b/i],
  ["MSR", /\bMSR\b/i],
  ["NLP4ConvAI", /\bNLP4ConvAI\b/i],
  [
    "Wordplay",
    /\b(?:Wordplay: When Language Meets Games Workshop|Wordplay)\b/i,
  ],
  [
    "EvoApplications",
    /\b(?:Applications of Evolutionary Computation|EvoApplications)\b/i,
  ],
];
const qualifiers: readonly (readonly [string, RegExp])[] = [
  [
    "Findings",
    /\bFindings(?: of the Association for Computational Linguistics)?\s*:?/gi,
  ],
  ["Datasets & Benchmarks Track", /\bDatasets and Benchmarks Track\b/gi],
  [
    "Competitions & Demonstrations Track",
    /\bCompetitions and Demonstrations Track\b/gi,
  ],
  ["Workshop", /\bWorkshops?\b/gi],
  ["Extended Abstracts", /\bExtended Abstracts\b/gi],
  ["Companion", /\bCompanion(?: Proceedings)?\b/gi],
  ["Long Papers", /\bLong Papers\b/gi],
  ["Short Papers", /\bShort Papers\b/gi],
  ["Talks", /\bTalks\b/gi],
  ["Accepted", /\bAccepted\b/gi],
];
// These parts are bibliographic locators, not conference editions. In particular,
// page numbers such as 2048–2056 and arXiv posting years must not become venue years.
const bibliography = [
  /\bpages?\s+\d+(?::\d+)?(?:\s*[–—-]\s*\d+(?::\d+)?)?/gi,
  /\b\d+\(\d+\):\d+\s*[–—-]\s*\d+/g,
  /\bvolume\s+\d+(?:\s+of\s+(?:Proceedings of Machine Learning Research|Lecture Notes in Computer Science))?/gi,
  /\bFirst posted in\s+\d{4}\b/gi,
  /\barXiv:\s*\d{4}\.\d{4,5}(?:v\d+)?/gi,
];
const global = (pattern: RegExp) => new RegExp(pattern.source, "gi");

export function paperConferencePublication(paper: PaperPublication) {
  if (paper.referenceType !== "conference-paper" || !paper.publication.trim())
    return null;
  const source = paper.publication.trim();
  const original = { label: source, year: null, abbreviated: false };
  const matches = venues.flatMap(([name, pattern]) =>
    [...source.matchAll(global(pattern))].map((match) => ({
      name,
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    })),
  );
  const main = matches.slice().sort((a, b) => b.text.length - a.text.length)[0];
  if (
    !main ||
    matches.some(
      (match) =>
        match.name !== main.name &&
        !(match.start >= main.start && match.end <= main.end),
    )
  )
    return original;

  let dated = source;
  for (const pattern of bibliography) dated = dated.replace(pattern, " ");
  if (/\b(?:18|19|20|21)\d{2}\s*[/–—-]\s*(?:18|19|20|21)\d{2}\b/.test(dated))
    return original;
  const years = [
    ...new Set(
      [...dated.matchAll(/\b(?:18|19|20|21)\d{2}[a-z]?\b/gi)].map((match) =>
        Number(match[0].slice(0, 4)),
      ),
    ),
  ];
  const before = source
    .slice(0, main.start)
    .match(/\b((?:18|19|20|21)\d{2})\s*$/)?.[1];
  const after = source
    .slice(main.end)
    .match(/^[\s,.:()-]*((?:18|19|20|21)\d{2})\b/)?.[1];
  if (before && after && before !== after) return original;
  // A named conference edition takes precedence over a later proceedings/record
  // year. If several unrelated years remain, keep the original rather than guess.
  const year = before
    ? Number(before)
    : after
      ? Number(after)
      : years.length === 1
        ? years[0]
        : years.length
          ? null
          : paper.year;
  if (year === null) return original;

  let rest = source;
  for (const [name, pattern] of venues)
    if (name === main.name) rest = rest.replace(global(pattern), " ");
  const modifiers = qualifiers
    .filter(([, pattern]) => global(pattern).test(source))
    .map(([name]) => name);
  for (const [, pattern] of qualifiers) rest = rest.replace(pattern, " ");
  for (const pattern of bibliography) rest = rest.replace(pattern, " ");
  rest = rest
    .replace(
      /\b(?:Association for Computing Machinery|Association for Computational Linguistics|Digital Games Research Association|IEEE|ACM|PMLR|Springer)\b/gi,
      " ",
    )
    .replace(/\b(?:In|Proceedings|of|the)\b/gi, " ")
    .replace(
      /\b(?:First|Third|Eighth|Twentieth|Twenty-Fifth|\d+(?:st|nd|rd|th))\b/gi,
      " ",
    )
    .replace(/\b(?:18|19|20|21)\d{2}[a-z]?\b/gi, " ")
    .replace(/[’']\d{2}\b/g, " ")
    .replace(/\b\d+\b/g, " ")
    .replace(/[\s,.;:()[\]/–—'’-]/g, "");
  // Unknown residual text could be a named workshop, track or publication caveat.
  // Do not hide it behind an overly broad parent-conference badge.
  if (rest) return original;
  return {
    label: [`${main.name} ${year}`, ...modifiers].join(" · "),
    year,
    abbreviated: true,
  };
}
