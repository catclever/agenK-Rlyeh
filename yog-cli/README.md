# @agent-k/yog-cli

## 模块简介

`yog-cli`（原 `cli`）是 Agent K 系统的**独立命令行反向代理注入器 (Standalone CLI Proxy Injector)**。可执行命令为 `yog`。

在神话中，犹格·索托斯 (Yog-Sothoth) 是门、门匙与看门人，连接着所有的维度与时空。在本项目中，`yog-cli` 就是跨越不同维度（不同前端项目）的万能网关。

## 模块作用

它的存在打破了技术栈的限制，使得你可以将 Agent K 的所有能力无缝“空投”到任意现存的网站或本地开发应用中。
- 提供基于 `express` 的 HTTP 反向代理。
- 拦截目标应用的 HTML 返回流，在 `</body>` 前强行注入 Agent K 的挂载点 `<div id="agent-k-root"></div>` 以及用 `esbuild` 动态打包的插件资源。

## 当前状态

**可用且功能完整**。
通过 `npx yog -t <目标URL>` 即可启动代理服务，将 `eyes`、`gladius`、`tentacles` 等组件强行植入目标网页以供测试和交互展示。
