# @agent-k/eyes

## 模块简介

`eyes` 是 Agent K 系统中的**右侧 AI 交互面板与观察中枢 (AI Interaction Panel)**。

在设定中，它代表着 Agent 拥有的“视界”和“意识对话出口”。

## 模块作用

这是用户与 Agent K 模型（如大语言模型或视觉模型）进行交互、下达指令的主要入口。
- 提供聊天的用户界面 (Chat UI)。
- 与底层的 FileSystem（如通过 WebSocket 与宿主连接的文件系统）进行数据交互，展示代码变更建议或状态分析。

## 当前状态

**开发中/部分功能可用**。已提供基础的 React UI （例如 `AIPanel` 组件），并可以渲染在由 `yog-cli` 或 `yog-vite` 注入的窗口内。需配合后端的代理环境工作以获得真正的文件和执行权限。
