---
outline: deep
---

# 目录结构

## Xfusion/目录结构

```Bash
xfusion/
┣ .vscode/
┣ boards/ ........................ 各平台原生工程及与 XF 构建相关对接
┣ components/ .................... XF 内部组件
┣ docs/ .......................... XF 文档
┣ examples/ ...................... XF 例程
┣ ports/ ......................... 平台 SDK 与 XF 功能相关的对接
┣ sdks/ .......................... 各平台 sdk及工具
┣ tools/ ......................... XF相关的工具
┣ LICENSE ........................ XF 许可证
┣ README.md
┣ XFKconfig
┣ export.bat ...................... XF 环境激活脚本 （win端）
┣ export.sh ...................... XF 环境激活脚本 （linux端）
┗ requirements.txt ............... XF 依赖描述
```

### boards/：各平台原生工程及与 XF 构建相关对接。

```Bash
boards/
┣ espressif/ <──────── 厂商或平台
┃ ┗ esp32/ <<═════════════│════ 编译目标的原生工程（包含与XF构建相关对接）
┣ linux/ <────────────────┤       ║
┃ ┗ linux_x86_64/ <<══════│═══════╣
┣ st/ <───────────────────┘       ║
┃ ┣ stm32f103c8/ <<═══════════════╣
┃ ┗ stm32f103ze/ <<═══════════════╝
┣ README.md
┗ XFKconfig  .................... 平台描述配置文件（自动生成）
```

### components/：XF 内部组件。

```Bash
 components/
┣ xf_atomic/ .................... 原子操作
┣ xf_check/ .................... XF 检测相关
┃ ┣ xf_check.h
┃ ┗ xf_collect.py .............. 标记为自动收集编译文件的 py 脚本
┣ xf_def/ ...................... XF 定义的一些常用宏定义、函数等
┣ xf_device/ .............. XF 设备管理
┣ xf_event/ .............. XF 事件
┣ xf_hal/ .............. XF HAL （硬件抽象层）
┃ ┣ xf_adc/
┃ ┣ xf_gpio/
┃ ┣ xf_i2c/
┃ ┣ xf_pwm/
┃ ┣ xf_spi/
┃ ┣ xf_systime/
┃ ┣ xf_timer/
┃ ┣ xf_uart/
┃ ┣ XFKconfig
┃ ┣ xf_collect.py
┃ ┣ xf_hal.h
┃ ┗ xf_hal_port.h
┣ xf_heap/ .............. XF 堆内存管理
┣ xf_init/ .............. XF 初始化
┣ xf_libc/ .............. XF libc
┣ xf_list/ .............. XF 链表
┣ xf_log/ .............. XF log 日志
┣ xf_mutex/ .............. XF 互斥锁
┣ xf_osal/ .............. XF OSAL 系统抽象层
┣ xf_ringbuf/ .............. XF ringbuf 环形缓冲
┗ xf_test/ .............. XF 通用测试

```

### docs/：XF 文档。

### examples/：XF 例程。

```Bash
examples/
┣ get_started/ .................. 快速开始例程
┃ ┣ hello_world/
┃ ┣ template_project/
┃ ┗ xf_template/
┣ peripherals/ .................. 外设例程
┃ ┣ adc/
┃ ┣ gpio/
┃ ┣ i2c/
┃ ┣ pwm/
┃ ┣ spi/
┃ ┣ systime/
┃ ┣ timer/
┃ ┗ uart/
┣ system/ ...................... 系统例程
┃ ┣ event/
┃ ┗ event_timer/
┗ README.md
```

### ports/：平台 SDK 与 XF 功能相关的对接。

```Bash
ports/
┣ espressif/ <────── 厂商或平台
┃ ┗ esp32/ <<════════════│═══ 编译的目标与 XF 功能相关的对接
┣ linux/ <───────────────┤       ║
┃ ┗ linux_x86_64/ <<═════│═══════╣
┣ osal/ .................│.......║...... OSAL 的对接
┃ ┗ freertos/            │       ║
┣ st/ <──────────────────┘       ║
┃ ┗ stm32f1xx/<<═════════════════╝
┗ README.md
```

### sdks/：各平台 sdk 及工具。（一般使用 sdk_download.py 脚本下载 sdk 或工具均下到此）

### tools/：XF 相关的工具。

```Bash
tools/
┣ build/
┃ ┣ bdist.linux-x86_64/
┃ ┗ lib/
┣ export_script/ ...................... XF 环境激活相关脚本
┃ ┣ README.md
┃ ┣ check_virtualenv.py ..... XF 环境激活相关脚本
┃ ┣ port_get_path.py ........ 获取指定的激活目标平台所在目录
┃ ┗ ports_gen_kconfig.py .... 根据激活的目标平台生成对应配置文件（XFKconfig）
┣ format_code/ ........................ 代码格式化相关
┣ json_yaml_conversion/
┣ sdk_download/ ....................... SDK 包拉取相关脚本
┣ xf_build/ ........................... XF 构建相关脚本
┣ README.md
┗ setup.py
```
