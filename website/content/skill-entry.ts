import skills from '../../data/segments/skills.json';
import type { AgentGameResource } from '../src/data/agentGameTypes';
/** A toolkit view references the catalog entity instead of re-authoring its title, source, and summary. */
export function levelDesignToolkit(): AgentGameResource {
  const resource = skills.find(entry => entry.id === 'level-design-book-skill');
  if (!resource) throw new Error('Missing level-design catalog entry');
  return { id:'level-design-book-skill', catalogResourceId:resource.id, title:resource.name, summary:resource.summary,
    kind:'skill', agents:['agent-neutral'], engine:'Engine-agnostic · primarily 3D level design', sourceUrl:resource.url, codeUrl:resource.url,
    evidenceUrl:'https://book.leveldesignbook.com/appendix/license', codeType:'instructions',
    codeScope:'A text-only SKILL.md, thirteen topical/source references, and three templates. Read, copy, and adapt with the included attribution and CC BY-NC-SA 4.0 notice.',
    limitations:'Unofficial book adaptation, not a pi-maintainer publication or executable engine integration. No workflow or design outcome was independently run. Observe noncommercial/share-alike conditions and third-party exceptions; the reported 94-page reading coverage belongs to the imported package snapshot.',
    publisher:'The Level Design Book authors; unofficial adaptation distributed by GameMap', official:false, reviewed:resource.verified };
}
