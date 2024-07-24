---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "XFusion"
  text: "文档中心"
  actions:
    - theme: alt
      text: 介绍
      link: /zh_CN/introduction/
    - theme: brand
      text: 快速入门
      link: /zh_CN/get-started/

features:
  - title: 多平台
    details: 支持 esp32, ws63 等平台。后续将支持 linux, stm32 等等。
  - title: 快速迁移
    details: 一次开发，多端部署。xfusion 有独立的 HAL（硬件抽象层），实现同一份代码在跨平台时只需简单修改引脚配置。
  - title: 协程
    details: 内置无栈协程，协作式调度简单可预测，移植无需汇编。
---

[[English]](en/index.md)

**XFusion**，来自 **X(Embedded Kits System)** —— 嵌入式套件系统，是一个融合多个嵌入式平台的软件开发工具包(SDK)，为开发者提供**统一且便于开发的嵌入式开发环境**。
