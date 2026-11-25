# 在 Godot 里做一个房间原型

做一个 **Fuse Courier（保险丝快递员）** 原型。捡齐三个保险丝，在巡逻撞到你或时间用尽前穿过出口。第一版用方块和计数就够了。玩起来有问题，几分钟内还能改。

HoloVista 团队在[复盘](https://www.gamedeveloper.com/design/postmortem-aconites-holovista)里提到，五分钟原型很受欢迎，投入更多美术和叙事后，玩家却没察觉自己在做选择。借鉴他们总结的做法，先做一版便宜的中间稿。这个练习先把房间、出口和重开做顺，等别人能玩完一轮，再换精灵图和动画。

## 1. 建立可运行的起点

通过 [Godot 官方示例条目](/testing/godot-demos/)选择与已安装编辑器兼容的分支。复制 GDScript 版 [Dodge the Creeps 项目](https://github.com/godotengine/godot-demo-projects/tree/master/2d/dodge_the_creeps)，保留附带声明。在 GitHub 上先切到与本地稳定版编辑器匹配的分支，再下载 `2d/dodge_the_creeps`。`master` 跟的是开发版编辑器。示例已经有玩家移动、敌人和开局、重开。不熟悉这些部分时，可跟随[官方首个游戏教程](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html)了解原项目。

导入其 `project.godot`，运行主场景，开始一轮、移动、碰到敌人，再开始一次。将编辑器版本、来源提交、实际启动步骤及首次无报错的基线记录到 `evidence/README.md`。先解决导入或启动错误，再修改玩法。本练习先面向键盘控制的桌面构建；该版本可运行后，再选择额外导出平台。

可以让已有编码客户端编辑文件，同时由你操作 Godot。需要编辑器自动化时，[Godot Forge 桥接条目](/agents/godot-forge-editor-bridge/)说明了编辑器与运行时的区别及配置要求。先在未修改的项目上建立可用连接。

## 2. 复制练习规格

将这些决策保存到 `BRIEF.md`。下面的尺寸、位置和时间限制都是本练习的设计选择。

| 项目 | 规格 |
| --- | --- |
| 视图 | 固定 960 × 640 房间；玩家碰撞范围须保持在房间内 |
| 布局 | 玩家位于 (96, 540)；保险丝位于 (160, 160)、(480, 320)、(800, 160)；出口位于 (864, 540) |
| 危险物 | 一个巡逻对象，在 (240, 320) 与 (720, 320) 间移动；速度和起始方向固定 |
| 目标 | 每枚保险丝只计数一次；收集第三枚后解锁出口；进入已解锁出口即获胜 |
| 失败 | 接触危险物，或 45 秒倒计时归零，本轮失败 |
| 暂停 | 冻结玩家、巡逻对象和倒计时；暂停／继续控件仍可使用 |
| 重试 | 复位玩家／巡逻对象的位置和碰撞、巡逻方向、全部保险丝、计数、出口锁、计时器及暂停状态 |
| 交付 | 可编辑工程、桌面构建、操作说明、资产来源清单及验收结果记录 |

在 Project Settings → Input Map 中创建以下 Action，并在脚本中使用这些名称。由 HUD 处理暂停／继续，让玩法暂停时输入仍然可用。

| Action | 绑定 |
| --- | --- |
| `move_left` | A／左方向键 |
| `move_right` | D／右方向键 |
| `move_up` | W／上方向键 |
| `move_down` | S／下方向键 |
| `start_retry` | Enter；仅在开局前或已有结果后接受 |
| `pause` | Escape；将运行中的一轮在游玩与暂停之间切换 |

## 3. 搭建场景并连接交互

改造现有玩家和 HUD，不要另加一套控制器。保留 `main.tscn`、`main.gd`、`player.tscn` 和 `player.gd`；新增 `pickup.tscn`／`pickup.gd`、`exit.tscn`／`exit.gd` 及 `hazard.tscn`／`hazard.gd`。以以下场景树为目标，将拾取物场景实例化三次，分配不同 ID。

```text
Main (Node; main.gd)
├── Player (Area2D; player.tscn)
│   ├── AnimatedSprite2D
│   └── CollisionShape2D
├── Fuses (Node2D)
│   ├── Fuse01 (Area2D; pickup.tscn)
│   ├── Fuse02 (Area2D; pickup.tscn)
│   └── Fuse03 (Area2D; pickup.tscn)
├── Exit (Area2D; exit.tscn)
├── Hazard (Area2D; hazard.tscn)
├── RoundTimer (Timer)
└── HUD (CanvasLayer; hud.tscn)
    ├── FuseCount (Label)
    ├── TimeLeft (Label)
    ├── Result (Label)
    ├── StartRetry (Button)
    └── PauseResume (Button)
```

为每个拾取物、出口和危险物添加可见子节点及碰撞形状。将玩家放到碰撞层 1，让这些交互区域监测层 1，并只接受玩家。由于玩家是区域，应连接它们的 `area_entered` 信号，而非只接收物理体的信号。[Godot Area2D 参考](https://docs.godotengine.org/en/stable/classes/class_area2d.html)说明了该信号及监测要求。信号只在初始化时连接一次。

在主脚本中保存本轮状态和已收集 ID。初始状态设为 `READY`，计时器保持停止。拾取物报告自己的 ID，主脚本验证、更新计数并隐藏该拾取物。出口请求完成本轮，不另存一套保险丝计数。将示例的随机敌人生成替换为单个巡逻对象时，停用原有随机生成逻辑。

将 `RoundTimer` 设为单次运行、45 秒、关闭自动启动。进入游玩状态时启动，超时连接到失败处理，显示其剩余时间。移除示例旧的计分／生成计时器连接。参见 [Timer 参考](https://docs.godotengine.org/en/stable/classes/class_timer.html)。

实现以下**伪代码契约**，并按实际脚本及信号参数调整：

```text
start_or_retry:
  if state not in [READY, WON, LOST]: return
  unpause_world()
  collected_ids.clear()
  restore_player_hazard_and_fuses()
  exit_unlocked = false
  reset_round_timer(45)
  state = PLAYING
  start_round_timer()

pickup(id):
  if state != PLAYING or id in collected_ids: return
  collected_ids.add(id)
  hide_fuse(id)
  exit_unlocked = (size(collected_ids) == 3)

exit_entered:
  if state == PLAYING and exit_unlocked: finish(WON)

pause_or_resume:
  if state == PLAYING: state = PAUSED; freeze_world()
  else if state == PAUSED: state = PLAYING; resume_world()

finish(result):
  if state != PLAYING: return
  state = result
  stop_round_timer_and_hazard()
```

将危险物接触和倒计时结束都接入失败转移。仅在游玩状态移动玩家，各方向共用一个速度，并将移动方向归一化。通过 `SceneTree.paused` 暂停／继续，游戏节点设为可暂停处理，HUD 设为 Always，并由 HUD 处理暂停输入。Godot 的[暂停文档](https://docs.godotengine.org/en/stable/tutorials/scripting/pausing_games.html)解释了处理模式，以及为何停止处理后信号仍可能执行。因此信号处理函数仍须检查状态。

## 4. 每次交给代理一个阶段

将此表作为任务队列。每行通过后保存一个可运行检查点。

| 阶段 | 交付物 | 继续前的运行检查 |
| --- | --- | --- |
| 房间 | 固定布局、输入绑定和玩家移动 | 走到每个角落；对角线速度与直线移动一致 |
| 目标 | 三个具有唯一 ID 的拾取物、计数及锁定出口 | 再次进入同一拾取区域，计数不变；两枚保险丝不能获胜 |
| 本轮流程 | 巡逻对象、倒计时、结果和重试 | 分别以两种原因失败；重试复位规格中的全部项目 |
| 暂停 | 暂停提示及可用的继续操作 | 暂停后等待；位置和剩余时间保持不变 |
| 表现 | 一套替换精灵、可读 HUD 和反馈 | 在相同布局下重做目标及重试检查 |
| 打包 | 桌面导出及启动说明 | 从新目录运行，完成胜利、失败和重试路线 |

创建目标场景后，可将以下有边界的首项任务复制到代理会话：

> 阅读 `BRIEF.md`、`main.tscn`、`main.gd`、`pickup.tscn` 和 `pickup.gd`。只实现拾取收集及出口解锁，保持玩家移动和布局不变。编辑前报告实际节点路径及信号连接。在主脚本中只使用一套已收集 ID 集合，拒绝重复 ID，仅在达到三枚时解锁出口。返回改动文件、启动步骤，以及重复拾取、提前进入出口和收齐三枚的检查结果。如果无法运行 Godot，将这些检查标为待验证，并给出让我执行的确切步骤。

后续并行工作应分配独立文件，并先约定信号。[代理团队俄罗斯方块案例](/examples/claude-agent-team-tetris/)提供了划分规则、渲染和控制职责的真实开发记录。

## 5. 接入资产并保留玩法循环

通过 [Kenney 测试条目](/testing/kenney/)选择一个小型资源包，将下载的包及附带许可记录到 `ASSET_SOURCES.md`。先替换画面，保持碰撞尺寸、拾取物位置及移动速度固定。

替换为动画资源时，应明确帧尺寸、帧顺序、时长和一个稳定锚点。分别在站立、移动及转向时预览循环，以游戏实际比例检查边缘和对齐。保留可编辑源文件及导入设置。裁剪或打包帧时使用[精灵交付契约](../assets/validation.md#sprite-atlas-metadata-and-playback-delivery)；以后将房间替换为图块地图时，使用[图块地图契约](../assets/validation.md#tile-map-identity-geometry-and-runtime-delivery)。

## 6. 检查失败情况并交付可复现构建

保留一条收齐三枚保险丝并抵达出口的路线，再测试提前进入出口、重复收集、接触危险物、超时、暂停／继续及连续三次重试。记录起始状态、动作、预期及实际结果；单张截图无法展示计时器冻结或一次完整重试。[测试资源库](../reference/testing-library.md)提供适合扩展这些检查的项目和资产夹具。

| 症状 | 优先检查 | 最小有效复现场景 |
| --- | --- | --- |
| 拾取没有反应 | 玩家碰撞层、区域掩码、监测及信号目标 | 玩家加一个拾取物，并记录进入事件 |
| 计数跳增或重试后越来越快 | 重复的信号连接、计时器或巡逻实例 | 一个拾取物及两次重试，记录 ID 和节点数量 |
| 出口过早获胜 | 独立计数器或缺失的本轮状态检查 | 两个拾取物和一个出口 |
| 无法恢复游玩 | HUD 处理模式及暂停输入的处理位置 | 仅保留玩家、计时器和暂停按钮 |
| 导出与编辑器表现不同 | 首个错误、资源缺失、导入设置及路径 | 在新目录中全新导出，执行相同测试路线 |

某一阶段失败时，回到上一个检查点，每次只改变一个变量。调试拾取时停用巡逻，通过后再恢复。如果继续做 2D 房间，可以借用[关卡设计指南](level-design.md)的路线图和观察方法。指南里的中继站是另一项使用步行控制器的 3D 练习。将工程、构建、操作说明、来源清单及证据一起打包，让另一人按启动说明操作。公开分发前，按[候选发布构建验收](../production/release-readiness.md)在干净的目标用户配置下测试安装。

如果目标交付物是动作条件视频体验或学习得到的模拟器，请走独立的[世界模型路线](../ecosystem/world-models.md)。若要制作规则在引擎中执行、可编辑的游戏，则继续采用本路线。
