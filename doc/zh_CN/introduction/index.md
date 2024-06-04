---
outline: deep
---

# 介绍

## 关于 XFuison

**XFusion**，来自**X（Embedded Kits System**）—— 嵌入式套件系统 系列，是一个融合多个嵌入式平台的软件开发工具包（ SDK ），为开发者提供统一且便于开发的接口的嵌入式系统。

开发者基于 XFusion 开发应用时，无需花过多时间及精力在移植（像 RTOS），基础驱动、基础功能的实现等与平台底层相关的工作，可以更专注于应用功能的设计与实现，并且，在其上开发的应用，可以在多平台上快速迁移、切换。(一次开发，多端部署)

Fusion，意为融合、联合，且有核聚变的意思，表达了 XFusion 的愿景：让分散的平台融合在一起，凝聚出更大的能量，更好地支持开发者实现他们的想法。

TODO 这里放 xfusion 整体框架图

## 特征集（可增加，参考 nuttx）

TODO 可考虑增加特征集的描述
https://nuttx.apache.org/docs/latest/introduction/about.html#feature-set

## 硬件要求

- 最小工程编译测试情况：（如屏蔽掉 printf 的 hello world 或 template_project）
  - 保持能正常运行的状态：
    1. 不屏蔽目前所有对接实现
    2. 仅配置使能核心功能：systime、uart
    3. xf_heap 设置 100 字节可用，使用静态方法
    4. 系统堆设为 0，栈保持默认 2k 字节（仅 stm32 可设）
  - stm32f103：
    - 优化级别：
      - O0 编译：27964
      - Og 编译：17576
      - O2 编译：16352
    - 测试分析：XF 本体大概 6~9k 左右
  - linux：
    - 优化级别：
      - O0 编译：32320
      - Og 编译：24198
      - O2 编译：22774
    - 测试分析：XF 本体大概 12~15k 左右（包含 xf_heap-S0）

## 开源证书：apache 2.0

## 版本说明：

TODO： 补全版本说明

## FAQ：

TODO： 补全 FAQ
