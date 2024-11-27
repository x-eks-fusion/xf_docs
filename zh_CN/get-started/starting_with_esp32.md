# 从 esp32 开始

> [!NOTE] 作者
> kirto

# 关于 ESP32

ESP32 是由乐鑫科技（Espressif Systems）推出的一款高性能 IoT SoC（系统级芯片），支持 Wi-Fi 和 BLE 双模通信，广泛应用于智能家居、工业自动化和可穿戴设备等物联网场景。ESP32 系列芯片内置强大的计算能力和多样化的外设接口，能够满足复杂 IoT 应用的需求。

主要功能与特性
无线通信：集成 IEEE 802.11 b/g/n Wi-Fi 基带和 RF 电路，支持 2.4GHz 频段，提供高达 150Mbps 的物理层速率，支持长距离稳定通信。
BLE 功能：支持 BLE 4.2 和 BLE 5.0 协议，提供高达 2Mbps 的空口速率，兼容 Mesh 网络与 BLE 网关功能，满足多种无线场景。
强大的计算能力：采用双核 Tensilica Xtensa LX6 处理器，主频最高达 240MHz，可流畅运行多任务程序。
丰富的外设接口：集成 UART、SPI、I2C、I2S、PWM、ADC 和 DAC 等多种外设，满足多样化硬件设计需求。
低功耗设计：支持多种低功耗工作模式，包括深度睡眠模式，适合电池供电设备的长时间使用。
先进的硬件集成
集成电路：包括功率放大器（PA）、低噪声放大器（LNA）、RF balun 和天线开关，提供稳定的无线性能。
内置存储：集成 SRAM 和 Flash，部分型号支持外部扩展存储。
安全功能：提供硬件加密引擎（AES、SHA 等），支持安全启动（Secure Boot）和闪存加密功能。

如需更多详细技术资料，请参考：[ESP32 系列芯片 | 乐鑫官网 (espressif.com)](https://www.espressif.com/)。

# 安装 ESP-IDF

> [!WARNING]⚠️注意
> XFusion 目前对接的是 esp-idf v5.0 版本。

详细步骤见 ESP-IDF 官方文档：

《[快速入门 - ESP32 - — ESP-IDF 编程指南 v5.0.6 文档 (espressif.com)](https://docs.espressif.com/projects/esp-idf/zh_CN/v5.0.6/esp32/get-started/index.html)》。

# 安装 XFusion

如果安装 esp-idf 选用 linux 环境。详情参考：[linux 环境搭建](preparation_with_linux.md)

# 使用 XFusion 编译

1.  激活 ESP-IDF 环境
    我们在每次打开一个新的终端时，需要激活 ESP-IDF 环境
    - **普通激活**
        ```bash
        cd esp-idf      # 进入 esp-idf 文件夹
        . ./export.sh   # 导出 esp-idf 相关环境变量
        ```
    由于激活需要在每次打开新终端的时候都需要执行，如果按照上述操作，则每次都需要切换文件夹。
    以下通过 alias 指令在 .bashrc 中定义别名，简化了激活的方式。
    - **便捷激活**
    ```bash
    vim ~/.bashrc # 根据不同 shell ，zsh 就是 .zshrc
    ```
    进入 vim 界面后，输入 <kbd>Shift</kbd>+<kbd>g</kbd>，跳转到最后一行。
    按下 <kbd>o</kbd> 插入自己的命令。
    ```bash
    alias get_idf=". ~/esp-idf/export.sh"   # 双引号后面是 esp-idf 路径
    ```
    然后通过 <kbd>Esc</kbd> 退出编辑。
    最后通过 <kbd>:</kbd>+<kbd>w</kbd>+<kbd>q</kbd> 再加上回车确认保存。

    至此，重启终端后。每次激活只需要输入：
    ```bash
    get_idf
    ```

2. 激活 XFusion 环境
    通过之前在 .bashrc 中保存的激活命令的别名来激活
    ```bash
    get_xf esp32
    ```


3. 至此，就可以使用 xf 命令了
   ```bash
    xf --help
   ```

‍
