---
outline: deep
---

# 快速入门

## 1. 安装

开始使用 XFusion 的第一步是安装一系列所需的工具，最后下载 XFusion 项目源代码。

### 1.1 前置准备

```Bash
sudo apt-get install python3 python3-pip
```

### 1.2 获取 XFusion

- 克隆 git 仓库：

```Bash
git clone <!!放链接!!>
```

## 2.开始使用

### 2.1 进入 xfusion 目录

```Bash
cd /path/to/xfusion/
```

### 2.2. 平台 SDK 或工具下载（非必需）：

```Bash
cd sdk_download/
python sdk_download.py [object]    # [object]：指定下载的对象，目前可用选项有：IDF ARM STM32F10X
```

### 2.3. 激活要进行开发的平台（可能需要下载平台对应的 SDK 或工具）：

```Bash
# 注意:
# 1、这里是需要 . ./xxx.sh 执行脚本，不是 ./xxx.sh 直接执行脚本
# 2、在新开的终端开发则需要重新执行 export.sh 进行 xfusion 环境激活
# 3、如果在 xfusion 的子目录下需进行环境激活，也可以 . ./[相对路径]/export.sh 执行环境激活脚本进行激活
. ./export.sh [platform]    # [platform]：指定的平台，目前可用选项有： linux_x86_64 stm32f103c8 stm32f103ze esp32

```

### 2.4 下面可以进行开发了

可以进入 xfusion/examples/下的例程或者执行如下命令新建例程进行体验：

```Bash
xf init test-pro
cd test-pro
xf build
```

构建命令使用的是**xf**，在前面 export.sh 激活 xfusion 环境后即可使用。

xf 目前可用功能如下：

```Bash
Usage: xf [OPTIONS] COMMAND [ARGS]...

Options:
  -v, --verbose  Enable verbose mode.
  --help         Show this message and exit.

Commands:
  build       编译工程
  clean       清空编译中间产物
  export      导出对应sdk的工程（需要port对接）
  flash       烧录工程（需要port对接）
  init        初始化创建一个新工程
  menuconfig  全局宏的配置
  update      更新对应sdk的工程（需要port对接）
  version     查询当前版本
```

### 2.5 配置平台工具链、调试或烧录环境（非必需）

- **esp32 idf**：一般无需额外配置工具链、调试或烧录环境，只需激活 IDF 环境后就可。

  - 烧录参考：

    https://docs.espressif.com/projects/esp-idf/zh_CN/release-v5.0/esp32/get-started/windows-setup.html#id12

  - 调试参考：

    https://docs.espressif.com/projects/esp-idf/zh_CN/release-v5.0/esp32/api-guides/jtag-debugging/index.html?highlight=debug

- **stm32f103c8、stm32f103ze**：工具链、调试或烧录：

  - 可选择使用 xfusion/tools/sdk_download 中的 sdk_download.py 进行下载安装，默认情况下会自动选择该工具链；
  - 也可以选择手动配置：在 xfusion/boards/st/stm32f103xx 下新建 temp 目录，再在其中新建`tools_path.mk`文件，对其进行选择性配置：

    - 工具链配置：（如需自定义则在`tools_path.mk`中增加以下项，修改其参数）

      ```Bash
      # 构建工具可执行文件目录
      TOOLCHAIN_EXEC_DIR  ?= $(XF_ROOT)/sdks/arm/xpack-arm-none-eabi-gcc-13.2.1-1.1/bin
      # 构建工具前缀
      TOOLCHAIN_PREFIX    ?= arm-none-eabi-
      ```

    - 烧录配置：（如需自定义则在`tools_path.mk`中增加以下项，修改其参数）

      ```Bash
      # openocd 可执行文件
      OPENOCD_EXEC        ?= openocd
      # openocd 调试器配置
      OPENOCD_INTERRFACE  ?= interface/jlink.cfg
      # openocd 目标芯片配置
      OPENOCD_TARGET      ?= target/stm32f1x.cfg
      # openocd 速度
      OPENOCD_SPEED_KHZ   ?= 1000
      # openocd 下载偏移地址
      OPENOCD_DL_OFFSET   ?= 0x0
      ```
