# @agent-k/tentacles

## 模块简介

`tentacles` 是 Agent K 系统的**触须交互层 (UI Overlay & Interaction Layer)**。

代表着神话生物延伸到应用中的无数触手，用于触摸、感知和控制目标环境。

## 模块作用

它是实现在目标网页上“无法无天”般操作的核心前端库。主要职责包括：
- 渲染全屏的透明叠加层 (Overlay)。
- 提供拖拽 (Drag)、缩放、圈选 (Selection) 屏幕元素的能力（重度依赖 `react-moveable` 和 `selecto` 等底层库）。
- 实现桌面级的窗口管理（例如 `DraggableWindow` 悬浮组件）。

## 当前状态

**核心功能可用**。主要负责承载和布局其他组件（如把 `eyes` 和 `gladius` 放入可拖拽面板），自身也承接了画布 (Artboard) 属性与界面视觉的操作逻辑。
