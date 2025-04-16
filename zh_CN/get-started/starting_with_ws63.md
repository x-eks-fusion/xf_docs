# 从 ws63 开始

> [!NOTE] 作者
> kirto

本文主要介绍如何搭建 WS63 的 XFusion 开发环境

# 关于 WS63

WS63 系列是 2.4GHz Wi-Fi 6 BLE 星闪多模 IoT SoC 芯片，其中增强款芯片 WS63 支持 2.4GHz 的雷达人体活动检测功能，适用于大小家电、电工照明及对人体出没检测有需求的常电类物联网智能场景。

- 集成 IEEE 802.11 b/g/n/ax 基带和 RF 电路，包括功率放大器 PA、低噪声放大器 LNA、RF balun、天线开关以及电源管理模块等；
- 支持 20MHz 频宽，提供最大 114.7Mbps 物理层速率，支持更大的发射功率和更远的覆盖距离；
- 支持 BLE 1MHz/2MHz 频宽、BLE4.0/4.1/4.2/5.0/5.1/5.2 协议、BLE Mesh 和 BLE 网关功能，最大空口速率 2Mbps；
- 支持星闪 SLE 1MHz/2MHz/4MHz 频宽、SLE1.0 协议、支持 SLE 网关功能，最大空口速率 12Mbps。

WS63 系列芯片采用 QFN40（5mm x 5mm）封装，匹配不同场合的应用，细分为下列两种：

- Hi3863：合封 4MB Flash，支持 WiFi、SLE、BLE 多模并发，支持单天线通道
- Hi3863E：支持雷达人体活动检测，合封 4MB Flash，支持 WiFi、SLE、BLE 多模并发，支持双天线通道

见：《[WS63 芯片 | 海思官网 (hisilicon.com)](https://www.hisilicon.com/cn/products/connectivity/short-range-IoT/wifi-nearlink-ble/Hi3863V100)》。

# 激活 XFusion

通过之前在 .bashrc 中保存的激活命令的别名来激活 (详见[安装 XFusion](preparation_with_linux.md#安装-xfusion))
```bash
get_xf ws63
```

使用 `xf target -s` 命令，可以帮助我们确认导出的 target 是否是 ws63

# 安装 WS63 SDK

## 获取源码

激活后，我们仅仅需要一个命令。XFusion 便会自动的根据 `boards/nearlink/ws63` 下的 `target.json` 文件，来下载对应版本的sdk。

```bash
xf target -d
```

## 安装 WS63 SDK 环境依赖

ws63 的 SDK 是使用 python + cmake 编译，其中依赖一些软件，需要安装

### 配置 Shell
配置默认使用 bash。打开Linux终端，执行命令“sudo dpkg-reconfigure dash”， 选择 no。
```bash
sudo dpkg-reconfigure dash
```

### 安装 Cmake
打开 Linux 终端，执行命令“sudo aptinstall cmake”，完成Cmake 的安装。
```bash
sudo apt install cmake
```

### 安装pycparser
```bash
pip3 install pycparser==2.21
```

