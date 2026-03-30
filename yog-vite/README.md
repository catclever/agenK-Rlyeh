# @agent-k/yog-vite

## 模块简介

`yog-vite`（原 `vite-plugin`）是专为提供深度集成能力的 **Vite 专属拦截与通信插件**。

作为 `yog-cli` 的“更深度、受限特定维度（Vite 生态）”版本，它同样承载着桥梁的意义。

## 模块作用

与 `yog-cli` 仅能在前端浅层挂载脚本不同，`yog-vite` 利用 Vite 的 Dev Server 钩子，实现了更深度的全栈集成：
- 在 HTML 层面（`transformIndexHtml`）优雅注入 Agent K 组件入口。
- 提供虚拟模块（`\0agent-k-client.js`），内部动态组装各库输出。
- 在 Node 进程端挂载 WebSocket Server 服务端，提供打通前后端的一条高速通道，这使得基于基座的前端可以获取读写**本地真实文件系统**的能力，这是简单 HTTP Proxy 工具做不到的。

## 当前状态

**功能可用**。已实现了双向 WebSocket（`ws-fs.ts`等）以及自动在宿主 Vite 页面端注入 `TentaclesOverlay`、`AIPanel` 和 `GladiusTerminal` 的全家桶大礼包能力。
