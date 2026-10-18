import { ArrowUpRight, BookOpen, Code2, Gamepad2 } from 'lucide-react';
import type { AccessKind, Resource } from '../types';

export const accessLabels:Record<AccessKind,string>={
  tutorial:'Tutorial',playable:'Playable in browser',interactive:'Interactive tool',video:'Video demo',
  download:'Download & run project', 'full-source':'Complete project source',sdk:'SDK source',examples:'Example code',
  model:'Model / inference source','local-tool':'Run tool locally','pipeline-source':'Generator pipeline source',service:'Hosted service',unavailable:'Not publicly available',
};
const slots=[['tutorial','Tutorial',BookOpen],['demo','Demo',Gamepad2],['source','Source',Code2]] as const;

export default function ResourceAccess({resource}:{resource:Resource}){
  if(!resource.access)return null;
  return <div className="resource-access" aria-label={`${resource.name} tutorials, demos, and source`}>
    {slots.map(([key,title,Icon])=>{
      const link=resource.access![key];
      return <div className={`access-item${link.url?'':' is-unavailable'}`} key={key}>
        <div className="access-heading"><Icon size={15}/><span>{title}</span>{link.kind!=='tutorial'?<small>{accessLabels[link.kind]}</small>:null}</div>
        {link.url?<a href={link.url} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={16}/></a>:<strong>{link.label}</strong>}
        <p>{link.note}</p>
      </div>;
    })}
  </div>;
}
