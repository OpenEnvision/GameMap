# 来源修订与实现边界

使用这些固定版本的源文件和模型卡，定位文档所述行为背后的实现。其他参考资料及版本特定的集成要求，请参阅相关专题档案。

## 修订索引

| 已检查的来源                                                                                                                                                                                                                                  | 确切修订                                       | 证据范围                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------ |
| [作为 bpy 模块的 Blender](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/doc/python_api/rst/info_advanced_blender_as_bpy.rst)                                                                              | `3f4216e1bad1e76e9c2d4a00b4a9d09954593f47` | 已检查源文件；运行时未经测试                                                     |
| [Bevy 远程实现文档](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/crates/bevy_remote/src/lib.rs)                                                                                                           | `85503941e488152711a4695bbe248e9ed9f453fc` | 已检查源文件；运行时未经测试                                                     |
| [Bevy 无头渲染器示例](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/examples/app/headless_renderer.rs)                                                                                                      | `85503941e488152711a4695bbe248e9ed9f453fc` | 已检查源文件；运行时未经测试                                                     |
| [Coding-Solo/godot-mcp README](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/README.md)                                                                                                        | `1209744fad78f3998f98c7394fd0f6ef50da5281` | 已检查源文件；运行时未经测试                                                     |
| [ComfyUI 从历史记录下载图像的示例](https://github.com/Comfy-Org/ComfyUI/blob/c06bf5f569d268b80076e5f44126f87cdf835869/script_examples/websockets_api_example.py)                                                                                    | `c06bf5f569d268b80076e5f44126f87cdf835869` | 已检查源文件；运行时未经测试                                                     |
| [ComfyUI 服务器操作实现](https://github.com/Comfy-Org/ComfyUI/blob/c06bf5f569d268b80076e5f44126f87cdf835869/server.py)                                                                                                                         | `c06bf5f569d268b80076e5f44126f87cdf835869` | 已检查源文件；运行时未经测试                                                     |
| [axe-core API](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/doc/API.md)                                                                                                                          | `f49c1c49b5eafe1f8065e07c314f75968dd91333` | 已检查源文件；运行时未经测试                                                     |
| [Playwright 许可证](https://github.com/microsoft/playwright/blob/54c711571a37de525377e6f3d3608c3e029b1829/LICENSE)                                                                                                                         | `54c711571a37de525377e6f3d3608c3e029b1829` | 已检查源文件；运行时未经测试                                                     |
| [axe-core 许可证](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/LICENSE)                                                                                                                             | `f49c1c49b5eafe1f8065e07c314f75968dd91333` | 已检查源文件；运行时未经测试                                                     |
| [运行你的 ink](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/Documentation/RunningYourInk.md)                                                                                                                  | `35c63e52f1d36060930dc7ed3cfba38ea224b528` | 已检查源文件；运行时未经测试                                                     |
| [pi 扩展](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md)                                                                                                    | `482c1381a00d8d00bc81697e4a980c593db6803e` | 已检查源文件；运行时未经测试                                                     |
| [GEPA 适配器协议](https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/adapter.py)                                                                                                                    | `f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819` | 已检查源文件；运行时未经测试                                                     |
| [Meta-Harness 入门指南](https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/ONBOARDING.md)                                                                                                      | `8123ccabe2b19fa1123090b2e5f1bacc20963ce8` | 已检查源文件；运行时未经测试                                                     |
| [ink 官方仓库](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/README.md)                                                                                                                                        | `35c63e52f1d36060930dc7ed3cfba38ea224b528` | 已检查源文件；运行时未经测试                                                     |
| [bevyengine/bevy 许可证范围](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/README.md)                                                                                                                     | `85503941e488152711a4695bbe248e9ed9f453fc` | 已检查源文件；运行时未经测试                                                     |
| [bevyengine/bevy 许可证范围](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/LICENSE-MIT)                                                                                                                   | `85503941e488152711a4695bbe248e9ed9f453fc` | 已检查源文件；运行时未经测试                                                     |
| [blender/blender 许可证范围](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/COPYING)                                                                                                                       | `3f4216e1bad1e76e9c2d4a00b4a9d09954593f47` | 已检查源文件；运行时未经测试                                                     |
| [Coding-Solo/godot-mcp 许可证范围](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/LICENSE)                                                                                                           | `1209744fad78f3998f98c7394fd0f6ef50da5281` | 已检查源文件；运行时未经测试                                                     |
| [Coding-Solo/godot-mcp index.ts](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts)                                                                                                   | `1209744fad78f3998f98c7394fd0f6ef50da5281` | 已检查源文件；运行时未经测试                                                     |
| [Coding-Solo/godot-mcp godot_operations.gd](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/scripts/godot_operations.gd)                                                                     | `1209744fad78f3998f98c7394fd0f6ef50da5281` | 已检查源文件；运行时未经测试                                                     |
| [inkle/ink 许可证范围](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/LICENSE.txt)                                                                                                                               | `35c63e52f1d36060930dc7ed3cfba38ea224b528` | 已检查源文件；运行时未经测试                                                     |
| [Playwright 主分支源码快照：actionability.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/actionability.md)                                                                                  | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | 已检查源文件；运行时未经测试                                                     |
| [Playwright 主分支源码快照：class-pageassertions.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/api/class-pageassertions.md)                                                                | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | 已检查源文件；运行时未经测试                                                     |
| [Playwright 主分支源码快照：params.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/api/params.md)                                                                                            | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | 已检查源文件；运行时未经测试                                                     |
| [Playwright 主分支源码快照：accessibility-testing-js.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/accessibility-testing-js.md)                                                            | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | 已检查源文件；运行时未经测试                                                     |
| [Playwright 主分支源码快照：test-snapshots-js.md](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/test-snapshots-js.md)                                                                          | `b335271cdc2b57cac2be8ad37c5dd283ac6b8938` | 已检查源文件；运行时未经测试                                                     |
| [固定版本的 facebook/musicgen-small 模型卡](https://huggingface.co/facebook/musicgen-small/blob/4c8334b02c6ec4e8664a91979669a501ec497792/README.md)                                                                                             | `4c8334b02c6ec4e8664a91979669a501ec497792` | 已检查源文件；运行时未经测试                                                     |
| [固定版本的 stabilityai/TripoSR 模型卡](https://huggingface.co/stabilityai/TripoSR/blob/5b521936b01fbe1890f6f9baed0254ab6351c04a/README.md)                                                                                                     | `5b521936b01fbe1890f6f9baed0254ab6351c04a` | 已检查源文件；运行时未经测试                                                     |
| [Ink 故事状态与后台保存](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/ink-engine-runtime/Story.cs)                                                                                                                 | `35c63e52f1d36060930dc7ed3cfba38ea224b528` | 已检查源文件；运行时未经测试；[论断范围](gameplay-state-contracts.md)                 |
| [Nakama 事务成员范围](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/core_multi.go)                                                                                                                | `cab8af584947ff0d7ebee91d6c33e67d87fd3e47` | 已检查源文件；运行时未经测试；[论断范围](gameplay-state-contracts.md)                 |
| [Nakama 数据库事务重试](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/db.go)                                                                                                                       | `cab8af584947ff0d7ebee91d6c33e67d87fd3e47` | 已检查源文件；运行时未经测试；[论断范围](gameplay-state-contracts.md)                 |
| [Nakama JavaScript multiUpdate 参数位置](https://github.com/heroiclabs/nakama/blob/cab8af584947ff0d7ebee91d6c33e67d87fd3e47/server/runtime_javascript_nakama.go)                                                                            | `cab8af584947ff0d7ebee91d6c33e67d87fd3e47` | 已检查源文件；运行时未经测试；[论断范围](gameplay-state-contracts.md)                 |
| [GameDevBench 复现与隔离指南](https://github.com/waynchi/gamedevbench/blob/39952ba6341898380ff1c2c3336101c57c99196b/README.md)                                                                                                                 | `39952ba6341898380ff1c2c3336101c57c99196b` | 已检查确切文件；未执行基准或沙箱；[论断范围](benchmark-reproducibility.md)              |
| [GameDevBench 许可证](https://github.com/waynchi/gamedevbench/blob/39952ba6341898380ff1c2c3336101c57c99196b/LICENSE)                                                                                                                       | `39952ba6341898380ff1c2c3336101c57c99196b` | 已检查确切文件；未执行基准或沙箱；[论断范围](benchmark-reproducibility.md)              |
| [UnityDataTools README.md](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/README.md)                                                                                                | `db19dffbf40008e3a61e7566a5ddd6888eb68717` | 已检查确切文档；原生二进制文件未经测试；[论断范围](production-debugging-contracts.md)      |
| [UnityDataTools Documentation/agent-guide.md](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/agent-guide.md)                                                          | `db19dffbf40008e3a61e7566a5ddd6888eb68717` | 已检查确切文档；原生二进制文件未经测试；[论断范围](production-debugging-contracts.md)      |
| [UnityDataTools Documentation/addressables-build-reports.md](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/addressables-build-reports.md)                            | `db19dffbf40008e3a61e7566a5ddd6888eb68717` | 已检查确切文档；原生二进制文件未经测试；[论断范围](production-debugging-contracts.md)      |
| [UnityDataTools Documentation/comparing-builds.md](https://github.com/Unity-Technologies/UnityDataTools/blob/db19dffbf40008e3a61e7566a5ddd6888eb68717/Documentation/comparing-builds.md)                                                | `db19dffbf40008e3a61e7566a5ddd6888eb68717` | 已检查确切文档；原生二进制文件未经测试；[论断范围](production-debugging-contracts.md)      |
| [RenderDoc v1.46 docs/in_application_api.rst](https://github.com/baldurk/renderdoc/blob/e4bd23b671d3d5a747ff5221dbe08a63eb6ca200/docs/in_application_api.rst)                                                                           | `e4bd23b671d3d5a747ff5221dbe08a63eb6ca200` | 已检查确切源码；未执行捕获/回放；[论断范围](production-debugging-contracts.md)         |
| [RenderDoc v1.46 renderdoc/api/replay/renderdoc_replay.h](https://github.com/baldurk/renderdoc/blob/e4bd23b671d3d5a747ff5221dbe08a63eb6ca200/renderdoc/api/replay/renderdoc_replay.h)                                                   | `e4bd23b671d3d5a747ff5221dbe08a63eb6ca200` | 已检查确切源码；未执行捕获/回放；[论断范围](production-debugging-contracts.md)         |
| [GliDe LICENSE](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/LICENSE)                                                                                                                            | `0626688f2b2eab5414d8f8e28e682cfaf607c0ab` | 已检查来源；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行                  |
| [GliDe README.md](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/README.md)                                                                                                                        | `0626688f2b2eab5414d8f8e28e682cfaf607c0ab` | 已检查来源；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行                  |
| [GliDe analyzer/memory.py](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/analyzer/memory.py)                                                                                                      | `0626688f2b2eab5414d8f8e28e682cfaf607c0ab` | 已检查来源；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行                  |
| [GliDe config.py](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/config.py)                                                                                                                        | `0626688f2b2eab5414d8f8e28e682cfaf607c0ab` | 已检查来源；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行                  |
| [GliDe evaluation/evaluator.py](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/evaluation/evaluator.py)                                                                                            | `0626688f2b2eab5414d8f8e28e682cfaf607c0ab` | 已检查来源；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行                  |
| [GliDe graph.py](https://github.com/SandyyyZheng/GliDe/blob/0626688f2b2eab5414d8f8e28e682cfaf607c0ab/graph.py)                                                                                                                          | `0626688f2b2eab5414d8f8e28e682cfaf607c0ab` | 已检查来源；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行                  |
| [scenesmith scenesmith/agent_utils/articulated_retrieval_server/retrieval.py](https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/articulated_retrieval_server/retrieval.py)     | `67cc408fd38334b4a926efef45e284302ed5055b` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [scenesmith scenesmith/agent_utils/articulated_retrieval_server/dataclasses.py](https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/articulated_retrieval_server/dataclasses.py) | `67cc408fd38334b4a926efef45e284302ed5055b` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [scenesmith scenesmith/agent_utils/asset_router/router.py](https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/asset_router/router.py)                                           | `67cc408fd38334b4a926efef45e284302ed5055b` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [scenesmith scenesmith/prompts/data/asset_router/asset_validation.yaml](https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/prompts/data/asset_router/asset_validation.yaml)                 | `67cc408fd38334b4a926efef45e284302ed5055b` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [scenesmith scenesmith/agent_utils/checkpoint_state.py](https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/scenesmith/agent_utils/checkpoint_state.py)                                                 | `67cc408fd38334b4a926efef45e284302ed5055b` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [scenesmith README.md](https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/README.md)                                                                                                                   | `67cc408fd38334b4a926efef45e284302ed5055b` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [scenesmith LICENSE](https://github.com/nepfaff/scenesmith/blob/67cc408fd38334b4a926efef45e284302ed5055b/LICENSE)                                                                                                                       | `67cc408fd38334b4a926efef45e284302ed5055b` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [SceneAssistant main.py](https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/main.py)                                                                                                               | `dcedd341f36ca1a0cfb3f0392c6a203b84a3a616` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [SceneAssistant llm.py](https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/llm.py)                                                                                                                 | `dcedd341f36ca1a0cfb3f0392c6a203b84a3a616` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [SceneAssistant readme.md](https://github.com/ROUJINN/SceneAssistant/blob/dcedd341f36ca1a0cfb3f0392c6a203b84a3a616/readme.md)                                                                                                           | `dcedd341f36ca1a0cfb3f0392c6a203b84a3a616` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [DreamReward Reward3D/Reward3D.py](https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/Reward3D/Reward3D.py)                                                                                           | `eeb5c648e6c2a25c8f6f8038edfe75d73c811614` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [DreamReward threestudio/models/guidance/DreamReward_guidance1.py](https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/threestudio/models/guidance/DreamReward_guidance1.py)                           | `eeb5c648e6c2a25c8f6f8038edfe75d73c811614` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [DreamReward README.md](https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/README.md)                                                                                                                 | `eeb5c648e6c2a25c8f6f8038edfe75d73c811614` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [DreamReward LICENSE](https://github.com/liuff19/DreamReward/blob/eeb5c648e6c2a25c8f6f8038edfe75d73c811614/LICENSE)                                                                                                                     | `eeb5c648e6c2a25c8f6f8038edfe75d73c811614` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [AVR-Eval-Agent assets.py](https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/assets.py)                                                                                               | `3c91b950caada637c517f0ae158ba31a298d3901` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [AVR-Eval-Agent video_game_builder.py](https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/video_game_builder.py)                                                                       | `3c91b950caada637c517f0ae158ba31a298d3901` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [AVR-Eval-Agent relative_eval.py](https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/relative_eval.py)                                                                                 | `3c91b950caada637c517f0ae158ba31a298d3901` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [AVR-Eval-Agent video_utils.py](https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/video_utils.py)                                                                                     | `3c91b950caada637c517f0ae158ba31a298d3901` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [AVR-Eval-Agent README.md](https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/README.md)                                                                                               | `3c91b950caada637c517f0ae158ba31a298d3901` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [AVR-Eval-Agent LICENSE](https://github.com/SamsungSAILMontreal/AVR-Eval-Agent/blob/3c91b950caada637c517f0ae158ba31a298d3901/LICENSE)                                                                                                   | `3c91b950caada637c517f0ae158ba31a298d3901` | 已检查来源；[资源反馈范围](asset-selection-feedback.md)；未执行                    |
| [VideoTree/adaptive_breath_expansion.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/adaptive_breath_expansion.py)                                                                             | `605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e` | 已重读确切源码；与先前 SHA-256 匹配；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行 |
| [VideoTree/depth_expansion.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/depth_expansion.py)                                                                                                 | `605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e` | 已重读确切源码；与先前 SHA-256 匹配；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行 |
| [VideoTree/prompts.py](https://github.com/Ziyang412/VideoTree/blob/605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e/prompts.py)                                                                                                                 | `605ec8e917f9a0f95d37a73a0b50bf0e8cfe076e` | 已重读确切源码；与先前 SHA-256 匹配；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行 |
| [vstar/visual_search.py](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/visual_search.py)                                                                                                            | `4ede6647959cfb59eeabd09286adf6a5f9478da0` | 已重读确切源码；与先前 SHA-256 匹配；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行 |
| [vstar/app.py](https://github.com/penghao-wu/vstar/blob/4ede6647959cfb59eeabd09286adf6a5f9478da0/app.py)                                                                                                                                | `4ede6647959cfb59eeabd09286adf6a5f9478da0` | 已重读确切源码；与先前 SHA-256 匹配；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行 |
| [LongVU/longvu/cambrian_arch.py](https://github.com/Vision-CAIR/LongVU/blob/1b0be5cc28614b03a423bbaf129ae364750b5012/longvu/cambrian_arch.py)                                                                                           | `1b0be5cc28614b03a423bbaf129ae364750b5012` | 已重读确切源码；与先前 SHA-256 匹配；[视觉反馈范围](visual-feedback-mechanisms.md)；未执行 |

## 已核查的论断与边界

### 作为 bpy 模块的 Blender

[已检查的确切文件](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/doc/python_api/rst/info_advanced_blender_as_bpy.rst)

- 独立 bpy 类似于后台 Blender，但并不提供全部 CLI 选项。不支持模块重载，每个进程编辑一个 blend 状态。
- 会加载默认启动场景；除非显式加载，否则忽略用户偏好设置/启动配置。
- 不具备常规 Blender 信号处理程序，包括特殊的 Ctrl-C 渲染取消及崩溃日志行为。

**限制：** 仅固定来源证据；不是适配器实现修订、环境锁定或运行时验证。已重读确切文件；已安装软件及依赖版本仍未知。

### Bevy 远程实现文档

[已检查的确切文件](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/crates/bevy_remote/src/lib.rs)

- RemotePlugin 安装协议支持，但不含传输；RemoteHttpPlugin 提供 HTTP。
- world.query 和 world.get_components 公开 ECS 数据。非严格读取可能包含逐组件错误，而不是全有或全无的成功。

**限制：** 仅固定来源证据；不是适配器实现修订、环境锁定或运行时验证。已重读确切文件；已安装软件及依赖版本仍未知。

### Bevy 无头渲染器示例

[已检查的确切文件](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/examples/app/headless_renderer.rs)

- 无窗口示例禁用 Winit，使用 ScheduleRunner，但仍需要 GPU 渲染。
- 相机输出经过 GPU 图像、回读缓冲区/通道及 CPU 图像；主世界/渲染世界传输会增加文档记载的一帧延迟。
- 捕获包含场景预运行、显式 GPU 映射/轮询及对齐行处理。包装器超时是额外建议的验收措施，并非示例所确立。

**限制：** 仅固定来源证据；不是适配器实现修订、环境锁定或运行时验证。已重读确切文件；已安装软件及依赖版本仍未知。

### Coding-Solo/godot-mcp README

[已检查的确切文件](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/README.md)

- README 记载了编辑器/项目启动、开始/停止、调试输出、场景管理及 UID 工具。
- 前提条件为 Godot 和 Node >=18；UID 管理标为 Godot 4.4+。这是社区 CLI/GDScript 集成。
- README 中的 autoApprove 示例不能确立用户授权或沙箱保证。

**限制：** 仅固定来源证据；不是适配器实现修订、环境锁定或运行时验证。已重读确切文件；已安装软件及依赖版本仍未知。

### ComfyUI 从历史记录下载图像的示例

[已检查的确切文件](https://github.com/Comfy-Org/ComfyUI/blob/c06bf5f569d268b80076e5f44126f87cdf835869/script_examples/websockets_api_example.py)

- 上游示例先通过历史记录，再通过 /view 解析输出描述符。
- 上游示例将二进制 websocket 数据视为预览。

**限制：** 已于 2026-10-18 在记录的提交上重读确切源文件。来源修订不固定已安装的包、模型、依赖环境或 GameMap 适配器。未执行软件。

### ComfyUI 服务器操作实现

[已检查的确切文件](https://github.com/Comfy-Org/ComfyUI/blob/c06bf5f569d268b80076e5f44126f87cdf835869/server.py)

- 审阅过的 POST 处理程序接受 UUID，但入队前不检查 ID 重复。
- 定向取消处理排队中/运行中的作业；对运行 ID 的原子检查可避免取消替代作业。
- 已完成或未知的 ID 返回 HTTP 200，并附带 cancelled:false。

**限制：** 已于 2026-10-18 在记录的提交上重读确切源文件。来源修订不固定已安装的包、模型、依赖环境或 GameMap 适配器。未执行软件。

### axe-core API

[已检查的确切文件](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/doc/API.md)

- axe.run 通过回调报告错误/结果，或在未提供回调时返回 Promise。结果区分通过、违规、不完整及不适用的情况。
- 结果包含 URL、时间戳、测试引擎版本及环境。不完整结果需要进一步调查或人工审查。
- resultTypes 可以将省略类别限制为每条规则一个节点。框架及预加载超时控制不能确立完整的原生游戏无障碍覆盖。

**限制：** 通过发布提交解析标签 v4.10.3；已重读确切 API.md。检查不可变的上游内容，不能确立已安装的包、浏览器、引擎或发布版本是否可用。

### Playwright 许可证

[已检查的确切文件](https://github.com/microsoft/playwright/blob/54c711571a37de525377e6f3d3608c3e029b1829/LICENSE)

- v1.56.1 仓库许可证为 Apache-2.0。浏览器二进制文件及第三方声明需要单独审查；该文件不固定滚动更新的 API 文档。

**限制：** 通过官方发布提交链接解析标签 v1.56.1；仅检查 LICENSE 文件。检查不可变的上游内容，不能确立已安装的包、浏览器、引擎或发布版本是否可用。

### axe-core 许可证

[已检查的确切文件](https://github.com/dequelabs/axe-core/blob/f49c1c49b5eafe1f8065e07c314f75968dd91333/LICENSE)

- v4.10.3 仓库许可证为 MPL-2.0。这不能确立每个包装器或依赖的许可证。

**限制：** 通过官方发布提交链接解析标签 v4.10.3；仅检查 LICENSE 文件。检查不可变的上游内容，不能确立已安装的包、浏览器、引擎或发布版本是否可用。

### 运行你的 ink

[已检查的确切文件](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/Documentation/RunningYourInk.md)

- Story 从编译后的 JSON 构造。Continue/canContinue 推进可用内容；currentChoices 和 ChooseChoiceIndex 驱动选项选择。
- state.ToJson 和 LoadJson 序列化并恢复解释器状态。外部引擎副作用需要单独的持久化/回滚设计。
- 外部绑定默认为 lookaheadSafe=false；标为安全的函数必须能够容忍重复求值。

**限制：** 仅固定来源证据；不是适配器实现修订、环境锁定或运行时验证。已重读确切文件；已安装软件及依赖版本仍未知。

### pi 扩展

[已检查的确切文件](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/docs/extensions.md)

- 自定义工具定义模式并执行；结果将模型内容与详情/结构化内容分开。
- 嵌套 executeTool 调用会发出事件，但不会自动创建对话记录条目；调用工具可以报告它们。存储的嵌套调用元数据省略结果。
- 同级工具调用可以并行运行。
- 同一提交上的进一步[证据生命周期检查](visual-evidence-research.md#pi-evidence-lifecycle-and-interrupted-execution)涵盖[会话钩子及规范化](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/agent-session.ts)、[协作式工具执行](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/agent/src/agent-loop.ts)、[嵌套信号及上下文组合](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/extensions/runner.ts)、[活动分支会话投影](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/session-manager.ts)及[纯文本摘要序列化](https://github.com/earendil-works/pi/blob/482c1381a00d8d00bc81697e4a980c593db6803e/packages/coding-agent/src/core/compaction/utils.ts)。链接的小节保留了支持性的图像/RPC 文档及确切论断边界；取消与对话恢复不能确立引擎回滚或作业恢复。

**限制：** 已于 2026-10-18 在记录的提交上重读确切源文件。来源修订不固定已安装的包、模型、依赖环境或 GameMap 适配器。未执行软件。

### GEPA 适配器协议

[已检查的确切文件](https://github.com/gepa-ai/gepa/blob/f1cfdee2856e9dc4b5b4dc5cc2e391d0aa20d819/src/gepa/core/adapter.py)

- 评估返回对齐的输出/分数及可选轨迹。
- make_reflective_dataset 生成逐组件、可 JSON 序列化的反馈；轨迹对优化器是不透明的。
- 分数越高越好；单项失败获得失败分数，系统性错误可能抛出异常。

**限制：** 已于 2026-10-18 在记录的提交上重读确切源文件。来源修订不固定已安装的包、模型、依赖环境或 GameMap 适配器。未执行软件。

### Meta-Harness 入门指南

[已检查的确切文件](https://github.com/stanford-iris-lab/meta-harness/blob/8123ccabe2b19fa1123090b2e5f1bacc20963ce8/ONBOARDING.md)

- 要求明确的修改边界/接口、一致的评估、预算及停止规则。
- 最终测试必须与候选生成/选择分开；持久状态可能泄露测试信息。
- 保留候选源代码、分数、配置及跟踪。

**限制：** 已于 2026-10-18 在记录的提交上重读确切源文件。来源修订不固定已安装的包、模型、依赖环境或 GameMap 适配器。未执行软件。

### ink 官方仓库

[已检查的确切文件](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/README.md)

- 核心 C# 运行时及 inklecate CLI 不同于社区 inkjs JavaScript 移植版。
- README 声明采用 MIT 许可，并警告 inkjs 通常落后一个主版本，而不是承诺功能对等。

**限制：** 观测到的仓库快照；README 加单独重读的 LICENSE.txt。检查不可变的上游内容，不能确立已安装的包、浏览器、引擎或发布版本是否可用。

### Bevy README：仓库与资源许可证范围

[已检查的确切文件](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/README.md)

- 仓库 README 声明，除另有说明的文件/crate 外采用 MIT OR Apache-2.0；随附的示例资源可能采用不同许可证。已在同一提交检查 MIT 文件和 README；不能笼统推断资源许可。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。

### Bevy MIT 许可证文件

[已检查的确切文件](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/LICENSE-MIT)

- 已检查的 LICENSE-MIT 包含 MIT 授权。仓库范围的双许可证及资源例外在[同一提交的 README](https://github.com/bevyengine/bevy/blob/85503941e488152711a4695bbe248e9ed9f453fc/README.md) 中单独记载。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。

### blender/blender 许可证范围

[已检查的确切文件](https://github.com/blender/blender/blob/3f4216e1bad1e76e9c2d4a00b4a9d09954593f47/COPYING)

- COPYING 指明 GNU GPL，并指向 doc/license/GPL-license.txt。不要仅因某些包装器采用宽松许可证就将 Blender 软件标为 MIT；确切的包/文件许可仍需单独审查。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。

### Coding-Solo/godot-mcp 许可证范围

[已检查的确切文件](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/LICENSE)

- 已检查的 LICENSE 提供 MIT 授权。这不能确立用户项目的沙箱保证、权限或许可证。配置示例位于[单独检查过的 README](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/README.md)。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。

### Coding-Solo/godot-mcp index.ts

[已检查的确切文件](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/index.ts)

- run_project 在生成另一个进程前向先前跟踪的进程发送 kill；它跟踪一个句柄，但不等待先前进程退出，因此不能保证只有一个存活进程的排他性。
- stop_project 发送 kill，并在返回前清除 activeProcess；此处理程序不等待退出确认。
- 自然退出会清除 activeProcess；get_debug_output 随后返回没有活动进程的错误，因此该端点不是持久的崩溃后日志档案。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。

### Coding-Solo/godot-mcp godot_operations.gd

[已检查的确切文件](https://github.com/Coding-Solo/godot-mcp/blob/1209744fad78f3998f98c7394fd0f6ef50da5281/src/scripts/godot_operations.gd)

- 类实例化将脚本查找限制为已注册的全局类名，在此辅助函数中拒绝原始路径。仍可实例化已注册的项目脚本；这不是沙箱隔离或完整安全性的证明。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。

### inkle/ink 许可证范围

[已检查的确切文件](https://github.com/inkle/ink/blob/35c63e52f1d36060930dc7ed3cfba38ea224b528/LICENSE.txt)

- 已在同一提交检查 MIT LICENSE.txt；固定运行时指南并不为第三方故事/媒体资源授予许可。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。

### Playwright 主分支源码快照：actionability.md

[已检查的确切文件](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/actionability.md)

- 已检查的主分支快照在点击检查中，除唯一/可见/稳定/事件/启用外，还包含非惰性（Not Inert）检查。
- 不透明度为零仍视为可见；稳定要求两个动画帧；强制操作会绕过事件接收检查；dispatchEvent 不进行可操作性检查。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。主分支源码快照提交于 2026-10-17T07:40:24Z，不同于已发布的 playwright.dev 页面。不要推断已发布页面由此提交构建，也不要推断它是已发布/已安装的版本。

### Playwright 主分支源码快照：class-pageassertions.md

[已检查的确切文件](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/api/class-pageassertions.md)

- 需要运行器；比较前要求连续两张完全相同的截图。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。主分支源码快照提交于 2026-10-17T07:40:24Z，不同于已发布的 playwright.dev 页面。不要推断已发布页面由此提交构建，也不要推断它是已发布/已安装的版本。

### Playwright 主分支源码快照：params.md

[已检查的确切文件](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/api/params.md)

- 信号自 v1.62 起有文档记载；断言失败/重试停止不是应用程序回滚。
- 共享参数记载了有限动画快进/transitionend、无限动画重置/重启、隐藏插入符、不可见元素遮罩、shadow/iframe 样式表及 CSS 缩放。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。主分支源码快照提交于 2026-10-17T07:40:24Z，不同于已发布的 playwright.dev 页面。不要推断已发布页面由此提交构建，也不要推断它是已发布/已安装的版本。

### Playwright 主分支源码快照：accessibility-testing-js.md

[已检查的确切文件](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/accessibility-testing-js.md)

- 自动扫描无法证明符合全部 WCAG；需要人工/包容性用户评估。
- exclude 将元素及其所有后代从所有规则中排除。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。主分支源码快照提交于 2026-10-17T07:40:24Z，不同于已发布的 playwright.dev 页面。不要推断已发布页面由此提交构建，也不要推断它是已发布/已安装的版本。

### Playwright 主分支源码快照：test-snapshots-js.md

[已检查的确切文件](https://github.com/microsoft/playwright/blob/b335271cdc2b57cac2be8ad37c5dd283ac6b8938/docs/src/test-snapshots-js.md)

- 连续两张匹配的截图；字体/浏览器/平台会影响输出。
- toMatchSnapshot 接受文本及二进制数据。

**限制：** 已检查此提交上的确切源文件；不暗示固定了运行时或实现。主分支源码快照提交于 2026-10-17T07:40:24Z，不同于已发布的 playwright.dev 页面。不要推断已发布页面由此提交构建，也不要推断它是已发布/已安装的版本。

### 固定版本的 facebook/musicgen-small 模型卡

[已检查的确切文件](https://huggingface.co/facebook/musicgen-small/blob/4c8334b02c6ec4e8664a91979669a501ec497792/README.md)

- MusicGen-small 模型卡区分 CC BY-NC 4.0 权重与 MIT 代码，并将研究描述为预期用途。
- 模型卡不能确立特定输入的权利、输出权利清理、单独的基准发布授权，或托管提供商的训练/保留承诺。

**限制：** 仅检查了此检查点的模型卡。未下载权重、接受条款、更改账户配置或执行模型。

### 固定版本的 stabilityai/TripoSR 模型卡

[已检查的确切文件](https://huggingface.co/stabilityai/TripoSR/blob/5b521936b01fbe1890f6f9baed0254ab6351c04a/README.md)

- TripoSR 模型卡声明 MIT，并将精选的 Objaverse 训练子集描述为 CC-BY。这不为任意输入完成权利清理，也不将许可延伸至链接的后继项目 SF3D。
- 模型卡不能确立输出权利清理、单独的基准发布授权，或托管提供商的训练/保留承诺。

**限制：** 仅检查了此检查点的模型卡。未下载权重、接受条款、更改账户配置或执行模型。

## 时效性与晋级策略

实现评估循环时：

- 在托管实验即将开始前，重新检查服务条款、模型可用性及过期输出契约。核查日期不是持续监测的承诺。
- 将已发布版本文档与不断变化的默认分支分开。较晚的源文件可以展示实现细节，但不能证明已安装版本包含该细节。
- 将实际引擎/包/模型版本与来源参考一并记录。为执行测试场景单独固定依赖及配置。
- 来源修订、模型标识符、内容、渲染器、操作系统或项目设置变化时，重新运行针对性验收测试。文档页面没有差异，不能证明托管行为未改变。
- 明确记录缺失、不可访问及相互矛盾的证据。无法读取仓库 API 或受访问限制的文件时，不要编造修订。

实践链路及未解决的端到端行为见[生产工作单](production-work-orders.md)。历史工作室叙述收录于[生产案例研究](studio-production-case-studies.md)。这些是[生产研究索引](research-index.md)的补充，不是新的资源数量论断。
