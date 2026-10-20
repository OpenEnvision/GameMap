# 从想法到可玩的游戏

先做出一个能开始、游玩、失败和重试的小循环。再围绕下一步要解决的问题选择工具，每次修改后都回到游戏里检查结果。

<a id="first-playable-loop"></a>

## 15 分钟练习：在浏览器里跑通第一个游戏循环

准备桌面浏览器和已有的纯文本编辑器即可；不需要账号、API Key、安装依赖、游戏引擎或外部素材。下面是专为教程提供的小示例，与“游戏案例”中有作者开发证据的项目分开。

### 1. 保存并打开完整示例

把下面整段代码复制到纯文本文件，命名为 **first-game.html**，再用浏览器打开。扩展名应是 `.html`，不要保存成 `.html.txt`。支持富文本的编辑器需要先切换到纯文本格式。可以直接打开文件，不必启动本地服务器。

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Three points — first game loop</title>
<style>
  body { margin: 24px auto; max-width: 680px; padding: 0 16px;
    font: 18px system-ui; background: #101827; color: #f5f7fb; }
  canvas { width: 100%; background: #19263b; border: 1px solid #64748b; }
  button { padding: 10px 18px; font: inherit; cursor: pointer; }
</style>
<h1>Three points</h1>
<p>Move with arrow keys or WASD. Collect all three orange points.</p>
<button id="start">Start</button>
<p id="readout">Press Start. You have 20 seconds.</p>
<canvas id="game" width="640" height="360" aria-label="Blue player and orange points"></canvas>
<script>
const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const readout = document.querySelector('#readout');
const start = document.querySelector('#start');
const speed = 200, roundSeconds = 20;
const keys = new Set();
let player, points, remaining, state = 'ready', last = performance.now();
function reset() {
  player = { x: 50, y: 180 };
  points = [{ x: 200, y: 180 }, { x: 360, y: 110 }, { x: 520, y: 250 }];
  remaining = roundSeconds;
  keys.clear();
}
reset();
start.addEventListener('click', () => {
  reset(); state = 'playing'; start.textContent = 'Restart';
});
window.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
    event.preventDefault(); keys.add(key);
  }
});
window.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()));
window.addEventListener('blur', () => keys.clear());
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05); last = now;
  if (state === 'playing') {
    let x = Number(keys.has('arrowright') || keys.has('d')) - Number(keys.has('arrowleft') || keys.has('a'));
    let y = Number(keys.has('arrowdown') || keys.has('s')) - Number(keys.has('arrowup') || keys.has('w'));
    const length = Math.hypot(x, y) || 1;
    player.x = Math.max(10, Math.min(630, player.x + x / length * speed * dt));
    player.y = Math.max(10, Math.min(350, player.y + y / length * speed * dt));
    for (const point of points)
      if (Math.hypot(player.x - point.x, player.y - point.y) < 21) point.taken = true;
    remaining = Math.max(0, remaining - dt);
    if (points.every(point => point.taken)) state = 'won';
    else if (remaining === 0) state = 'lost';
  }
  ctx.clearRect(0, 0, 640, 360);
  for (const point of points) if (!point.taken) {
    ctx.fillStyle = '#ff936a'; ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = '#8bcbff'; ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
  const score = points.filter(point => point.taken).length;
  if (state === 'playing') readout.textContent = `Score ${score}/3 · ${remaining.toFixed(1)}s`;
  if (state === 'won') readout.textContent = 'You win! Press Restart to play again.';
  if (state === 'lost') readout.textContent = 'Time is up. Press Restart to try again.';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
</script>
</html>
```

### 2. 先验证原始游戏

点击 **Start**，用方向键或 WASD 移动蓝色方块，收集橙色圆点。

- **胜利：** 在 20 秒内收集三个圆点，页面应显示 “You win!”。
- **失败：** 点击 Restart 后保持不动，等 20 秒，页面应显示 “Time is up.”。
- **重试：** 再点 Restart。方块回到左侧，三个圆点重新出现，下一帧显示 0/3 分和重新开始的计时。

如果看到的是代码文本，先检查文件扩展名和纯文本格式；如果方块不动，点击游戏页面并确认已经开始。这一步验证的是开始 → 游玩 → 胜负 → 重试的完整小循环。

### 3. 只做一个修改，再跑同样的检查

可以请编程代理完成，也可以手动修改：

> 只把 first-game.html 中的玩家速度从每秒 200 像素改为 140 像素。保留操作方式、圆点位置、20 秒计时与重试行为。说明修改了哪一行，以及应重跑哪些手动检查。不要添加依赖。

保存并刷新浏览器后，同一路线应花更长时间；收齐圆点、超时与重试仍应正常。若有检查失败，先撤回这一个改动，并保留失败时的操作顺序。手动完成练习不需要编程代理账号。

### 4. 再选择下一份完整项目

先到[游戏案例](/examples/)选择能看懂操作与启动方法的完整源码项目；需要测试目标时，查看[测试资源](/testing/)。这些入口提供中文界面。记录浏览器、改动、操作和实际结果，再按下一步的问题深入下面的引擎与制作指南。

## 先说清楚要交付什么

选择工具之前，先写下玩家可以做什么、核心循环是什么，以及怎样算完成。一个能发布的游戏项目、可控制的视频世界、可导入的场景资产和用于规划的模拟器，并不是同一种交付物。

建议先确定：

- 目标平台、操作方式和预计游玩时长。
- 开始、结束、失败与重试条件。
- 当前引擎、可用资产、性能预算和时间限制。
- 第一轮必须做成什么，以及明确不做什么。

不要先列出十几个工具，再寻找它们能拼成什么。已有经验和能跑通的模板，通常比演示视频的视觉效果更重要。

## 从一个小循环开始

| 要做的事 | 一个合理的起点 | 首先检查 |
| --- | --- | --- |
| 浏览器 2D 原型 | Phaser 或现有网页游戏模板 | 输入、碰撞、计分、失败和重启是否连通 |
| 小型 2D / 3D 项目 | Godot 官方示例 | 引擎版本、项目结构和原始运行基线 |
| 已有 Unity 项目 | 熟悉的项目模板与官方工具 | 编辑、测试、构建是否能在当前环境完成 |
| 较复杂的 3D 场景 | 已有 Unreal 项目或模板 | 场景、交互、打包与目标平台依赖 |

这些是入门方向，不是工具性能排名。具体能力和版本限制请继续查看[引擎资料（英文）](../engines-notes.md)。

## 每次只增加一个可验证的变化

1. 先运行原始项目，确认输入、画面和重试正常。
2. 让代理解释结构，再提出一个边界明确的修改。
3. 检查实际行为，而不只看生成的文件或成功提示。
4. 保存修改、运行步骤和证据，然后再进入下一步。

例如：先调整移动速度并重跑同一条路线，而不是同时改角色控制、敌人 AI、光照和整套资产。

## 资产要经过导入与运行检查

“生成成功”不等于“可以直接用于游戏”。至少检查格式、单位、比例、坐标方向、依赖文件、材质、碰撞、骨骼与动画。还要确认代码、模型、贴图、音频、权重和服务条款分别允许怎样使用。

能下载、能在编辑器打开和能在目标设备正确运行，是不同的检查点。更详细的限制见[资产验证契约（英文）](../asset-validation-contracts.md)。

## 把验证写成具体问题

- 玩家能否完成一轮开始、游玩、失败、重试？
- 修改后，原本能玩的路径是否退化？
- 截图是否对应当前状态，还是旧画面或缓存？
- 在目标设备上，帧时间、输入和画面是否满足预算？
- 换一位测试者，是否仍能看懂目标和反馈？

把观察到的行为、测试者说的话和设计者的解释分开记录。少量便利样本不能证明总体成功率。

## 接下来去哪

- [完整实践参考（英文）](../practical-guide.md)：引擎选择、资产导入和分层测试。
- [中文关卡设计指南](level-design-skill.md)：从意图、路线和灰盒进入实际试玩。
- [游戏案例](/examples/)：先用中文界面筛选可玩的完整项目，再查看作者开发记录和源码。
- [测试资源](/testing/)：先按任务查找环境与资产；[完整研究资料（英文）](../game-testing-library.md)提供更细的启动与许可信息。
- [中文本地运行指南](deployment.md)：把网站跑起来，查看源资料更新。
