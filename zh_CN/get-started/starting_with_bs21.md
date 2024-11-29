# 从 bs21 开始

> [!NOTE] 作者
> kirto

本文主要介绍如何搭建 BS21 的 XFusion 开发环境

# 关于 BS21

bs21 是一款高度集成 2.4GHz SoC BLE&SLE 芯片，集成 BLE5.4/SLE1.0 和
RF 电路，RF 包含功率放大器 PA、低噪声放大器、TX/RX Switch、集成电源管理等
模块，支持 1M/2M/4M 3 种带宽，最大支持 12Mbit/s 速率。

bs21 集成高性能 32bit 微处理器（MCU），硬件安全引擎以及丰富的外设接
口，外设接口包括 SPI、UART、I2C、PWM、GPIO、USB2.0、NFC Tag、PDM、
I2S/PCM、QDEC、KEYSCAN 键盘扫描电路，支持 8 路 13bit 分辨率 ADC、ADC 支
持对接音频 AMIC，内置 SRAM 和合封 Flash，并支持在 Flash 上运行程序。

bs21 支持 LiteOS，并配套提供开放、易用的开发和调试运行环境。

bs21 适应于 PC 配件，IOT 等物联网智能终端领域。

**bs21 的主要特性**

- 支持 BLE 5.4。
- 支持 LE1M、LE2M、Long Range。
- 支持内置 PA，集成 TX/RX switch。
- 灵敏度
    - LE1M：-97dBm。
    - LE2M：-94dBm。
    - LR125K：-103dBm。
- 发射功率支持 8dBm。
- 支持最多连接 8 条链路，8 条链路 BLE 和 SLE 共享。
- 支持 BLE 白名单、可解析。
- 支持 HID 人机接口设备。
- 支持 BLE 业务间隙扫频功能。
- 支持 BLE AFH 跳频。

# 激活 XFusion

通过之前在 .bashrc 中保存的激活命令的别名来激活
```bash
get_xf bs21
```

使用 `xf target -s` 命令，可以帮助我们确认导出的 target 是否是 bs21

# 安装 BS21 SDK

## 获取源码

激活后，我们仅仅需要一个命令。XFusion 便会自动的根据 `boards/nearlink/bs21` 下的 `target.json` 文件，来下载对应版本的sdk。

```bash
xf target -d
```

## 安装 BS21 SDK 环境依赖

bs21 的 SDK 是使用 python + cmake 编译，其中依赖一些软件，需要安装

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
