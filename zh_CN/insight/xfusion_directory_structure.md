# XFusion 目录结构

> [!NOTE] 作者
> dotc

本文简要说明 xfusion 的目录结构。


## xfusion/ : 目录结构

```Bash
xfusion/
┣ .vscode/
┣ boards/ ......................... 各平台原生工程及与 XF 构建相关的对接
┣ build/ .......................... 
┣ components/ ..................... XF 内部组件
┣ docs/ ........................... XF 文档
┣ examples/ ....................... XF 例程
┣ plugins/ ........................ 平台 SDK 与 XF 构建相关的对接
┣ ports/ .......................... 平台 SDK 与 XF 功能相关的对接
┣ sdks/ ........................... 各平台 sdk及工具
┣ tools/ .......................... XF 相关的工具
┣ .editorconfig
┣ .gitignore
┣ .gitmodules
┣ LICENSE ......................... XF 许可证
┣ README.md
┣ XFKconfig
┣ export.bat ...................... XF 环境激活脚本 （win端）
┣ export.ps1
┣ export.sh ....................... XF 环境激活脚本 （linux端）
┗ requirements.txt ................ XF 依赖描述
```

### boards/ ：各平台原生工程及与 XF 构建相关对接。

```Bash
boards/
┣ espressif/ <──── 厂商或平台
┃ ┗ esp32/ <<══════ │ ══ 编译目标的原生工程 (包含与XF构建相关对接)
┃   ┣ ...                 │               ║
┃   ┣ target.json <─── │ ───────║── 环境激活时，会在 boards 目录下被递归搜索的文件。(激活指令将会以该文件所在的目录名作为激活的目标名)
┃   ┗ ...                 │               ║
┣ nearlink/ <───────┘               ║
┃ ┣ bs21/ <<═══════════════ ╣
┃ ┗ ws63/ <<═══════════════ ╝
┣ README.md
┗ XFKconfig  .................... 平台描述配置文件（自动生成）
```

### components/ ：XF 内部组件。

```Bash
components/
┣ xf_fal/ ................. XF FAL （ Flash 抽象层）
┃ ┗ ...
┣ xf_hal/ ................. XF HAL （硬件抽象层）
┃ ┗ ...
┣ xf_heap/ ................ XF Heap （堆内存管理）
┃ ┗ ...
┣ xf_init/ ................ XF Init （初始化管理）
┃ ┗ ...
┣ xf_log/ ................. XF Log （日志）
┃ ┗ ...
┣ xf_nal/ ................. XF NAL (网络抽象层)
┃ ┗ ...
┣ xf_net_apps/ ............ XF Net APP (网络相关应用)
┃ ┗ ...
┣ xf_osal/ ................ XF OSAL (操作系统抽象层)
┃ ┗ ...
┣ xf_sys/ ................. XF SYS (系统功能)
┃ ┗ ...
┣ xf_task/ ................ XF Task (XF 协作式调度任务)
┃ ┗ ...
┣ xf_utils/ ............... XF Utils (XF 通用功能 (工具) 集)
┃ ┗ ...
┗ xf_wal/ ................. XF WAL (无线功能抽象层)
  ┣ xf_ble/ ............... XF BLE (BLE 功能)
  ┣ xf_sle/ ............... XF SLE (SLE 功能)
  ┣ xf_wifi/ .............. XF WIFI (WiFi 功能)
  ┗ ...
```

### docs/ ：XF 文档。

### examples/ ：XF 例程。

```Bash
examples/
┣ example_components/ ............. 组件例程
┃ ┣ ex_easy_wifi/
┃ ┗ README.md
┣ get_started/ ................... 快速开始例程
┃ ┣ template_project/
┃ ┗ xf_template/
┣ osal/ .......................... OSAL 例程
┃ ┣ event/
┃ ┣ kernel/
┃ ┣ mutex/
┃ ┣ notify/
┃ ┣ queue/
┃ ┣ semaphore/
┃ ┣ thread/
┃ ┗ timer/
┣ peripherals/ ................... 外设例程
┃ ┣ adc/
┃ ┣ dac/
┃ ┣ gpio/
┃ ┣ i2c/
┃ ┣ pwm/
┃ ┣ spi/
┃ ┣ timer/
┃ ┗ uart/
┣ protocols/ ..................... 协议例程
┃ ┣ http_request/
┃ ┣ icmp_echo/
┃ ┣ iperf/
┃ ┗ sockets/
┣ system/ ........................ 系统功能例程
┃ ┣ heap/
┃ ┣ init/
┃ ┣ log/
┃ ┗ sys/
┣ task/ .......................... 协作式调度任务 (XF Task) 例程
┃ ┣ mbus/
┃ ┣ ntask/
┃ ┣ ntask2/
┃ ┣ task_pool/
┃ ┗ trigger/
┗ wireless/ ...................... 无线功能例程
  ┣ ble/
  ┣ sle/
  ┗ wifi/
```

### ports/：平台 SDK 与 XF 功能相关的对接。

```Bash
ports/
┣ espressif/ <────── 厂商或平台
┃ ┗ esp32/ <<════════ │ ═══ 编译的目标与 XF 功能相关的对接 (此处目录名与 board 下对应的目标目录名一致)
┗ nearlink/ <─────────┘             ║
  ┗ ws63/ <<═════════════════╝
```

### sdks/ ：各平台 sdk 及工具

### tools/ ：XF 相关的工具。

```Bash
tools/
┣ export_script/ ...................... XF 环境激活相关脚本
┃ ┣ README.md
┃ ┣ check_virtualenv.py ............... XF 环境激活相关脚本
┃ ┣ gen_kconfig.py
┃ ┗ get_path.py
┗ format_code/ ........................ 代码格式化相关
  ┗ ...
```
