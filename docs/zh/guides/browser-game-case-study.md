# 把浏览器游戏当作案例来读

先打开游戏，选一小段交互，把实际发生的事记下来，再对照作者的制作材料。下面三个练习分别观察路线提示、探索存档和敌人移动。

## 选一个有材料可对照的案例

AI Arcade 在游戏旁展示作者公开的提示词或技能。Playground Arcade 可以按游玩方式找游戏。Game Off 要求参赛者提交公开仓库，可以对照参赛版本和工程文件，再从作者自己的说明里核对 AI 的用法。[AI Arcade](https://aiarcade.games/make) · [Playground Arcade](https://playgroundarcade.com/) · [Game Off](https://itch.io/jam/game-off-2026)

从 [GameMap 的浏览器试玩案例](/examples/?access=playable)里选一个。确认游戏能打开，并附有至少一项作者材料，例如源码仓库、开发日志或制作自述。

## MOTHLIGHT 怎么改成驾驶游戏

在桌面端打开 [MOTHLIGHT 案例](/examples/fable52-mothlight/)，开车穿过一道光门。加速之前，先辨认下一个目标。故意错过一个路口，再按 `R` 回到上一道光门。记下镜头、路线标识和过门反馈里，哪些提示让你接上路线。

把这段体验与[街机页的制作说明](https://aiarcade.games/play/mothlight?tab=prompt)、[作者仓库](https://github.com/hahaliu1029/fable5.2demo)对照。根据公开说明，第三条指令把已有的步行体验改成驾驶游戏，沿用了城市、雨和反射效果。到仓库的 `mothlight/` 目录找车辆控制和光门逻辑，看看代码如何实现改版后的玩法。

## Papertrails 记住了什么

通过 [Papertrails 案例](/examples/fable52-papertrails/) 走到一次地貌转换，拾取一个物件，再回到熟悉的位置。观察纸景什么时候出现或折起、回程是否容易辨认，以及重新加载后保留了什么。

街机条目链接到作者托管的游戏，也介绍了开发过程。结合作者仓库的截图和实现，找找你玩的这个种子下究竟保存了哪些状态。页面署名列了两个模型。要追查某个功能由谁完成，还要看具体的工程文件和作者记录。[街机条目](https://aiarcade.games/play/papertrails) · [作者仓库](https://github.com/xikhar/papertrails)

## GothicVania 怎么修好悬空的敌人

打开 [GothicVania 案例](/examples/gothicvania-codex/)，靠近一只食尸鬼，观察它在平台边缘的移动。如果它离开地面，盯住它相对于平台的位置，看看播放动画时它到底移动了多远。

作者写到，浏览器里的反馈暴露了敌人悬空的问题。开发日志记录了加上重力、限制空中转向，再把追逐改成在平台边缘巡逻的过程。把这段修复顺序与当前行为对照。署名里也列出了智能体编写的代码之外的贡献，包括人制作的美术和音乐、作者用 Tiled 搭建的关卡。[制作自述](https://github.com/acatovic/gothicvania-codex-demo#the-story) · [开发日志](https://github.com/acatovic/gothicvania-codex-demo/blob/main/PROGRESS.md) · [署名](https://github.com/acatovic/gothicvania-codex-demo#attribution)

## 留下一条能用的比较

记录四件事。

- 游玩链接、访问日期、设备，以及准确的输入顺序。
- 一个观察结果，需要时附截图或短录像。
- 作者的解释及来源链接。如果读了代码，记下对应的提交版本。
- 一项想借鉴的做法，以及首先需要验证的未解问题。

范围要小，例如过门反馈或敌人落地。在复制代码或素材之前，分别核对它们的许可声明。能把一处设计或实现决策讲清楚，并帮助你安排下一项工作，就是有用的案例分析。
