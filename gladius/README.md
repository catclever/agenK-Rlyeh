# @agent-k/gladius

## 模块简介

`gladius` 是 Agent K 系统中的**虚拟终端执行器 (Terminal Environment)**。

名称来源于罗马短剑 (Gladius)，代表了系统执行直接指令和切割操作的武器。

## 模块作用

为 Agent K 提供执行命令行操作的基础设施面板。
- 基于 `xterm.js` 在浏览器中渲染终端界面。
- 集成了 `@webcontainer/api`，期望可以在纯浏览器环境中启动一个微型的 Node.js 执行环境，从而在隔离的安全沙盒中运行脚本及系统级命令。

## 当前状态

**功能可用**。前端 UI 终端已成型（如 `GladiusTerminal` 组件），可以在悬浮窗中作为与服务器/容器交互的输入输出窗口。
