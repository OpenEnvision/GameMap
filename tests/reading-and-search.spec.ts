import {test,expect} from '@playwright/test';

test('complete search preserves relevance across content types and shared URLs',async({page})=>{
 await page.goto('explore/?q=Code%20World%20Model');
 const results=page.locator('.search-ranked-results .content-card');
 await expect(results.first()).toContainText('Code World Model');
 const first=await results.first().getAttribute('data-content-ref');
 expect(first).not.toBe('resource:codex');
 await page.getByRole('navigation',{name:'Content types',exact:true}).getByRole('button',{name:/Resources/}).click();
 await expect(page).toHaveURL(/kind=resource/);
 await expect(results.first()).toContainText('Code World Model');
 await page.reload();await expect(results.first()).toContainText('Code World Model');
});

test('home intent searches give a working development path in both languages',async({page})=>{
 for(const [home,query,kind] of [['','I want to build a 2D game','path:2d'],['zh/','我想做一个2D游戏','path:2d']]){
  await page.goto(home);await page.locator('[data-client-ready=true]').waitFor();
  await page.locator('.hero-search input').fill(query);await page.locator('.hero-search button').click();
  const first=page.locator('.search-ranked-results .content-card').first();
  await expect(first).toHaveAttribute('data-content-ref',kind);await first.getByRole('link').click();
  await expect(page).toHaveURL(/paths\/2d\/$/);await expect(page.getByRole('heading',{level:1})).not.toHaveText('We could not load this page.');
 }
});

test('detail actions precede media and games link back to their real recordings',async({page})=>{
 for(const path of ['examples/katana-kitsune-godot/','showcase/recording-moonlight-mayhem/','zh/examples/polar-icecapade-claude/']){
  await page.goto(path);await expect(page.locator('[data-client-ready=true]')).toBeVisible();
  await expect(page.getByRole('heading',{level:1})).not.toContainText('could not load');
 }
 await page.goto('examples/moonlight-mayhem-codex/');
 const play=page.locator('.record-quick-actions').getByRole('link',{name:'Play the game',exact:true});
 await expect(play).toBeInViewport();
 await expect(page.locator('.record-quick-actions').getByRole('link',{name:'Project source',exact:true})).toBeInViewport();
 await page.locator('.related-content').getByRole('link',{name:'Moonlight & Mayhem · Museum heist',exact:true}).click();
 await expect(page).toHaveURL(/showcase\/recording-moonlight-mayhem\/$/);
});

test('Chinese headline uses complete phrases and the first exercise is reachable',async({page})=>{
 await page.goto('zh/');
 const heading=page.getByRole('heading',{level:1});await expect(heading).toHaveText('构建你的下一个世界.');
 const lines=await heading.evaluate(el=>{
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const tops:Record<string,number>={};let node;
  while((node=walker.nextNode()))for(let i=0;i<(node.textContent?.length||0);i++){
   const r=document.createRange();r.setStart(node,i);r.setEnd(node,i+1);tops[node.textContent![i]]=Math.round(r.getBoundingClientRect().top);
  }
  return tops;
 });
 expect(new Set([...('下一个世界')].map(x=>lines[x])).size).toBe(1);
 expect(lines['下']).toBeGreaterThan(lines['构']);
 await page.locator('.hero-actions').getByRole('link',{name:'从实践指南开始',exact:true}).click();
 await expect(page.locator('#first-playable-loop')).toBeAttached();
 const exercise=page.getByRole('heading',{level:2,name:/15 分钟练习/});
 await expect(exercise).toBeVisible();
 await expect(exercise).toBeInViewport();
});
