# 移植示例 - 添加 stm32f103ze 平台支持

本文将主要以移植 stm32f1xx 系列芯片（具体来说是 stm32f103ze）为例，介绍`与移植直接相关的文件或文件夹`、`如何添加原始工程`、`已移植工程内文件的介绍`和`原始工程对接步骤`。

环境是：linux 环境下，基于 Makefile 管理工程，并调用 sdk 文件夹中`xpack-arm-none-eabi-gcc-13.2.1-1.1`工具链编译。

**阅读对象：**

- 想要添加新的平台或芯片支持的贡献者。

**前置知识：**

- 读者应当配置好了 xfusion 的 stm32 或者 esp32 的开发环境（能编译运行），并且知道 xfusion 的编译、运行操作步骤，了解在这个过程中用了什么文件。
- 本文主要基于 stm32f1xx 芯片介绍，本文默认读者了解 stm32f1xx hal 库、ll 库编程，并且了解 stm32f1xx gcc 工程结构（可从 stm32cubemx 中生成）。

# 直接相关的文件或文件夹

与移植新的平台或芯片直接相关的文件或文件夹主要有：1. `export.sh`, 2. `sdks/`, 3. `ports/`, 4. `boards/`. 这些文件均位于`xfusion`目录内。

1. **`export.sh`**.

   **`xfusion/export.sh`用于导出所需的变量到命令行中的环境变量中。**

   `export.sh`文件详解不是本文目标。见{`export.sh`详解}。
   TODO：`export.sh` 详解。

   `export.sh` 主要导出了以下环境变量：

   1. **XF_ROOT**:

      即 xfusion 所在文件夹。
      如：`/home/mao/xfusion`。

   1. **XF_PORT**:

      即 xfusion `export.sh` 环境激活时的对象/目标的名称。
      如：`stm32f103ze`。

   1. **XF_PORT_PATH**:

      即 xfusion `export.sh` 环境激活时的对象/目标所在的文件夹。
      如：`/home/mao/xfusion/boards/st/stm32f103ze`。
      该文件夹同时也是原始工程所在的文件夹。详情将在下文中介绍。

   1. XF_VERSION:

      即 xfusion 版本号。
      如：`v0.2.1`。

1. **`sdks`**.

   `sdks` 文件夹存放原始工程所需要的代码，如外设驱动等信息。

   对于 stm32f1xx 来说，stm32f1xx 需要：

   1. `sdks` 文件夹内的原始 sdk 包，如驱动库、中间件等。
   1. 编译工程所需要的工具链。

   `xfusion/tools/sdk_download` 提供了 stm32f1 的原始 sdk 包`STM32CubeF1-1.8.5`和工具链`xpack-arm-none-eabi-gcc-13.2.1-1.1`的下载方式。

   `sdks` 文件夹结构如下：

   ```
   xfusion/
   ┗ sdks/
     ┣ STM32CubeF1-1.8.5/
     ┃ ┗ Drivers/
     ┃   ┣ CMSIS/
     ┃   ┗ STM32F1xx_HAL_Driver/
     ┣ arm/
     ┃ ┗ xpack-arm-none-eabi-gcc-13.2.1-1.1/
     ┗ README.md
   ```

   对于 esp32 的来说，esp-idf 开发环境可以通过 export 环境变量的方式使用。因此这里不需要下载存放 esp-idf，只需根据 esp-idf 的官方教程安装好，在 xfusion 使用 esp32 之前导出 esp-idf 环境变量即可。

1. **`boards`**.

   `boards` 文件夹**目前存放原始工程**。

   xfusion 本质上是基于原始工程的组件库，但抽象程度更高，确保使用不同带有 gnu99 支持的工具链都可以编译与使用。

   因此 xfusion 添加新的芯片支持，实际上是**在原始工程添加 xfusion 组件源码和原始工程到 xfusion 的对接**，实现完全屏蔽或大部分屏蔽具体硬件差异。

   _boards 文件夹存放的内容和`boards`（板）的含义不是很相符，在下一个版本可能会将原始工程移动到`ports`文件夹内，而`boards`文件夹则放具体的板的外设配置等信息。_

   `boards` 的文件夹结构（分类依据）目前主要是`厂商 -> 具体芯片型号`，如`st -> stm32f103c8`。
   或者`某个通用平台 -> 区分该平台不同芯片或者某种显著差异的特征`，如`linux -> linux_x86_64`。

   `boards` 文件夹结构如下：

   ```
   xfusion/
   ┗ boards/
     ┣ espressif/
     ┃ ┗ esp32/
     ┣ linux/
     ┃ ┗ linux_x86_64/
     ┣ st/
     ┃ ┣ stm32f103c8/
     ┃ ┗ stm32f103ze/
     ┣ README.md
     ┗ XFKconfig
   ```

1. **`ports`**.

   `ports` 文件夹存放**原始工程的功能对接到 xfusion 的实现代码**。

   主要将硬件资源驱动等对接到`xfusion/components`内的组件。如`xfusion/components/xf_hal`的对接。

   `ports` 文件夹结构如下：

   ```
   xfusion/
   ┗ ports/
     ┣ espressif/
     ┃ ┗ esp32/
     ┣ linux/
     ┃ ┗ linux_x86_64/
     ┣ osal/
     ┃ ┗ freertos/
     ┣ st/
     ┃ ┗ stm32f1xx/
     ┣ windows/
     ┃ ┗ README.md
     ┗ README.md
   ```

   分类依据同`boards`，但是实现对接时通常以系列为单位。分类依具体差异区别如下所示（以 st 为例，其中细线是对应关系）：

   ```
   xfusion/                   xfusion/                   xfusion/
   ┗ boards/                  ┗ ports/                    ┗ components/
     ┗ st/             (对应)   ┗ st/           (对接)      ┃
       ┣ stm32f103c8/ ───>─┬──────╊ stm32f1xx/ ───>─┬───────╊ xf_hal/
       ┣ stm32f103ze/ ───>─┤      ┃                 │       ┣ xf_event/
       ┣ stm32f1..../ ───>─┘      ┃                 │       ┗ .../
       ┃                          ┃                 │                ┃
       ┣ stm32f407zg/ ───>─┬──────┺ stm32f4xx/ ───>─┘                ┃
       ┣ stm32f411ce/ ───>─┤                ┃                        ┃
       ┗ stm32f4..../ ───>─┘                ┃                        ┃
         ┃                                  ┃                        ┃
         ┃   原始工程 sdk 代码可存在的范围   ┃                        ┃
         ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛                        ┃
         ┃            xfusion/components 代码可存在的范围             ┃
         ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   ```

# 已对接工程的介绍

首先介绍已对接的工程。

`boards/st/stm32f103c8`文件夹结构如下：

```
stm32f103c8/
┣ Core/
┃ ┣ Inc/
┃ ┃ ┣ gpio.h
┃ ┃ ┣ main.h
┃ ┃ ┣ stm32_assert.h
┃ ┃ ┣ stm32f1xx_hal_conf.h
┃ ┃ ┗ stm32f1xx_it.h
┃ ┗ Src/
┃   ┣ gpio.c
┃   ┣ main.c
┃   ┣ stm32f1xx_it.c
┃   ┗ system_stm32f1xx.c
┣ MDK-ARM/
┃ ┣ startup_stm32f103xb.s
┃ ┗ stm32.uvprojx
┣ .gitignore
┣ .mxproject
┣ Makefile
┣ STM32F103XB_FLASH.ld
┣ STM32F103xx.svd
┣ XFKconfig
┣ build_utils.mk
┣ download.mk
┣ export.yaml
┣ porject.mk
┣ startup_stm32f103xb.s
┣ stm32.ioc
┗ xf_cmd.py
```

## 原始工程文件

文件树如下：

```
stm32f103c8/
┣ Core/
┃ ┣ Inc/
┃ ┃ ┗ *.h
┃ ┗ Src/
┃   ┗ *.c
┣ STM32F103XB_FLASH.ld
┣ startup_stm32f103xb.s
┣ Makefile
┣ build_utils.mk
┣ download.mk
┗ porject.mk
```

1. **`Makefile`、`download.mk`和`build_utils.mk`**.

   这三个文件**通常不需要改动**。

   1. `Makefile`:

      xfusion 提供了一个相对通用的`Makefile`模板，该文件主要用于编译以及生成 elf、hex、bin 等。不同工程或者添加源文件只需修改下文提到的`porject.mk`即可。

   1. `download.mk`:

      该文件主要包含调用 openocd 下载程序的伪目标。

   1. `build_utils.mk`:

      构建小工具，包含转义路径、获取路径、遍历文件夹、显示编译进度等小工具。

1. **`porject.mk`**.

   项目配置。添加源文件或者头文件目录时**主要修改此文件**。如果想要修改编译优化等级也可以修改此文件。详情见[porject.mk 详解](#porjectmk-详解)。

1. **`STM32F103XB_FLASH.ld`和`startup_stm32f103xb.s`**.

   分别是链接文件以及启动文件，来自`STM32CubeF1-1.8.5`。

   具体路径是：

   - `xfusion/sdks/STM32CubeF1-1.8.5/Drivers/CMSIS/Device/ST/STM32F1xx/Source/Templates/gcc/startup_stm32f103xb.s`.
   - `xfusion/sdks/STM32CubeF1-1.8.5/Drivers/CMSIS/Device/ST/STM32F1xx/Source/Templates/gcc/linker/STM32F103XB_FLASH.ld`.

   相比原始文件的修改情况：

   1. `startup_stm32f103xb.s`: 无修改。注意在`MDK-ARM`目录下的同名文件和该文件不一致。
   1. `STM32F103XB_FLASH.ld`

      由于 xfusion 中的对接`xfusion/ports/st/stm32f1xx`使用了自动初始化，因此**需要在 text 段添加 xfusion 自动初始化的内容**，相较原始文件在`.text`添加了以下内容：

      ```ld
      /* xf 自动初始化 */
      . = ALIGN(4);
      __xf_init_start = .;
      KEEP(*(SORT(.xf_auto_init*)))
      __xf_init_end = .;
      ```

      如果想知道自动初始化的机制详解，见：

      > [RT-Thread 自动初始化机制详解 RT-Thread 问答社区 - RT-Thread](https://club.rt-thread.org/ask/article/d686458bbba864f4.html)

      xfusion 中自动初始化组件：`xfusion/components/xf_init/xf_init.h`。

1. **`Core/`**.

   存原始工程头文件和源文件(如`main.c`)，如需修改时钟等配置可修改其中内容。

## 对接 xfusion 所需文件

文件树如下：

```
stm32f103c8/
┣ XFKconfig
┣ export.yaml
┗ xf_cmd.py
```

其中只有`xf_cmd.py`是必须的，**移植新平台时这三个文件都可以从别的已经移植的文件夹内复制出来并根据需要做修改。**

1. **`XFKconfig`**.

   用于生成 menuconfig。

   **目前仅仅用于生成该芯片所属平台的宏定义，属于历史遗留问题的临时措施，请不要在该文件中添加重要配置。**

   `. ./export.sh xxx`时自动生成`xfusion/boards/XFKconfig`，并且在这个自动生成的`XFKconfig`通过`orsource`的方式包含该文件`xfusion/boards/st/stm32f103c8/XFKconfig`，获取该芯片所属平台的宏定义。

   内容如下：

   ```Kconfig
   # 所属平台，临时选项
   config PLATFORM_STM32F1XX
      bool
      default "y"
   ```

1. **`export.yaml`**.

   用于生成与更新`keil`工程。该功能需要下文介绍的`xf_cmd.py`支持。具体用法可通过命令`xf --help`查看。

1. **`xf_cmd.py`**.

   `xf_cmd.py`用于在`xfusion`环境下调用原始工程的命令，或者调用`xfusion`新增的导出原始工程的命令。

   **`xf_cmd.py`文件本身也是 export 对象的标识， export 的对象是`xf_cmd.py`所在的文件夹。**。

   比如，在运行`. ./export.sh stm32f103c8`时，也就是找到了`xfusion/boards/st/stm32f103c8/xf_cmd.py`。

   运行`. ./export.sh xxx`后移动到具体例程，`xf build`、`xf flash`等命令**本质上就是在调用`xf_cmd.py`中定义的`build`功能，结合`xfusion`环境变量调用原始工程的编译命令。**

   `xf_cmd.py`目前主要定义了编译`build`、烧录或运行`flash`、清除`clean`、导出工程`export`、更新工程`update`这几个命令。**`xf_cmd.py`内已有注释说明，在此不再赘述，见`xfusion/boards/st/stm32f103c8/xf_cmd.py`**。

   移植类似于 stm32 的新平台时主要修改`build`和`flash`这两个命令，部分代码摘录如下：

   ```python
   def build(*args):
      """
      sdk编译指令，在xf_hal层编译后由xf.py启动
      """
      logging.info("sdk正在编译")
      os.system(make)
      logging.info("sdk编译成功")
   ```

   `make`是上文定义的`make = "make"`，因为这是个 makefile 管理的工程。对于 esp32 的 esp-idf 开发环境则是调用 esp-idf 的编译命令`idf.py build`：

   ```python
   def build(*args):
      """
      sdk编译指令，在xf_hal层编译后由xf.py启动
      """
      logging.info("sdk正在编译")
      os.system("idf.py build")
      logging.info("sdk编译成功")
   ```

## 其他文件

文件树如下：

```
stm32f103c8/
┣ MDK-ARM/
┃ ┣ startup_stm32f103xb.s
┃ ┗ stm32.uvprojx
┣ .gitignore
┣ .mxproject
┣ STM32F103xx.svd
┗ stm32.ioc
```

1. **`MDK-ARM/`**.

   存放 keil mdk 工程文件，用于导出。

1. **`.gitignore`**.

   用于忽略工程中的临时文件。

1. **`.mxproject`、`stm32.ioc`**.

   stm32cubemx 工程文件，暂时无法使用。

1. **`STM32F103xx.svd`**.

   CMSIS 系统视图描述格式(System View Description, SVD)正式描述了基于 Arm Cortex-M 处理器的微控制器中包含的系统，特别是外围设备的内存映射寄存器。系统视图描述中包含的详细信息与设备参考手册中的数据相当。这些信息的范围从外围设备的高级功能描述一直到内存映射寄存器中单个位字段的定义和用途。

   SVD 文件目前主要用于使用 vscode 的"marus25.cortex-debug"插件 openocd 调试时查看寄存器。

   > 详情见：
   > [System View Description (keil.com)](https://www.keil.com/pack/doc/cmsis/svd/html/index.html)

   来源是：`https://raw.githubusercontent.com/Marus/cortex-debug-dp-stm32f1/master/data/STM32F103xx.svd`.

   也可以从`STM32F1xx_DFP`包中找到：[Arm Keil | Keil STM32F1xx_DFP](https://www.keil.arm.com/packs/stm32f1xx_dfp-keil/devices/)

## Makefile 原始工程文件详解

前文已经介绍了已移植的 stm32f103c8 工程中的文件或文件夹，本节将详细介绍基于 stm32f103c8 工程移植 stm32f103ze 工程时所需要改动的文件及其内容，以及需要改动的位置。

### `porject.mk` 详解

`porject.mk`需要`$(XF_PROJECT_PATH)`环境变量指示 xfusion 工程路径，以获取 xfusion 组件源码和头文件包含路径，如以下代码所示：

```makefile
include $(XF_PROJECT_PATH)/build/build_environ.mk
```

`$(XF_PROJECT_PATH)`环境变量是在 xfusion 工程内调用`xf build`时更新，具体代码是`xfusion/tools/xf_build/script/xf.py`中的`os.environ["XF_PROJECT_PATH"] = os.path.abspath(".")`。

`build_environ.mk`也是在调用`xf build`时生成，其内容示例如下：

```makefile
XF_PRJ_NAME = uart_echo
XF_PRJ_PATH = /home/mao/xfusion/examples/peripherals/uart/uart_echo
XF_PRJ_BUILD_PATH = /home/mao/xfusion/examples/peripherals/uart/uart_echo/build
XF_INCS_STR = /home/mao/xfusion/examples/peripherals/uart/uart_echo/main/.; ...
XF_SRCS_STR = /home/mao/xfusion/examples/peripherals/uart/uart_echo/main/xf_main.c; ...
```

其中的`XF_INCS_STR`和`XF_SRCS_STR`是最重要的，用于获取 xfusion 组件源码和头文件包含路径，其余变量暂时还未使用。

`porject.mk`主要有五部分组成：

1. xfusion 的相关配置`[xfusion Configuration]`。
2. 项目配置`[Project Configuration]`。
3. c 语言编译配置`[C Configuration]`。
4. 汇编文件配置`[ASM Configuration]`。
5. 库配置`[Library Configuration]`。

**xfusion 的相关配置`[xfusion Configuration]`：**

该部分主要操作内容是：

1. 加入 STM32CubeF1-1.8.5 中的驱动文件和目录。
1. 加入原始工程的功能对接到 xfusion 的实现源码和头文件`ports/st/stm32f1xx/`。
1. 处理 xfusion 组件源码和头文件`build_environ.mk`，并加入编译。

该部分在基于 stm32f103c8 工程移植 stm32f103ze 工程时不需要改动。

```makefile
# ===================== [xfusion Configuration] ===========================

# 工程路径定义
include $(XF_PROJECT_PATH)/build/build_environ.mk

# 检查 xf 工程名
ifeq ($(XF_PRJ_NAME),)
$(error "xf project name is empty!")
endif

# 分号分隔路径替换为空格分隔路径
C_SRCS_XF_TEMP      := $(subst ;, ,$(XF_SRCS_STR))

TARGET              := $(XF_PRJ_NAME)
# OUTPUT_DIR          := # 可以修改输出路径到 xf_fw 工程目录下

SDK_PATH            := $(XF_ROOT)/sdks/STM32CubeF1-1.8.5

C_SRCS_SUFFIXES     := .c

C_SDK_SRCS_DIR      += $(SDK_PATH)/Drivers/STM32F1xx_HAL_Driver/Src
C_SDK_SRCS          += $(call wildcard_src,$(C_SDK_SRCS_DIR),$(C_SRCS_SUFFIXES))
# 过滤掉 SDK 中的模板文件
C_SRCS              += $(filter-out %_template.c, $(C_SDK_SRCS))

C_SRCS_DIR          += $(XF_ROOT)/ports/st/stm32f1xx/
C_SRCS_DIR          += $(XF_ROOT)/ports/st/stm32f1xx/**
C_SRCS_DIR          += $(XF_ROOT)/ports/st/stm32f1xx/**/**

C_SRCS              += $(subst \,/,$(C_SRCS_XF_TEMP)) # 把 windows 路径的反斜杠替换为正斜杠

C_INCS_DIR          += $(subst ;, ,$(XF_INCS_STR))

C_INCS_DIR          += $(XF_ROOT)/ports/st/stm32f1xx
C_INCS_DIR          += $(XF_ROOT)/ports/st/stm32f1xx/inc
C_INCS_DIR          += $(SDK_PATH)/Drivers/STM32F1xx_HAL_Driver/Inc
C_INCS_DIR          += $(SDK_PATH)/Drivers/CMSIS/Device/ST/STM32F1xx/Include
C_INCS_DIR          += $(SDK_PATH)/Drivers/CMSIS/Include
```

**项目配置`[Project Configuration]`：**

该部分主要操作内容是：

1. 设置编译和输出选项。默认使用 gnu99 标准，优化等级为`-Og`。

该部分在基于 stm32f103c8 工程移植 stm32f103ze 工程时不需要改动。

```makefile
# ===================== [Project Configuration] ================================

# 构建小工具
include ./build_utils.mk

# 输出目标，如 hello.elf、hello.bin 等
TARGET              ?= $(notdir $(CURDIR))
# 构建输出目录，不要以分隔符结尾
BUILD_DIR           ?= build
# 中间文件的目录
OBJ_DIR             ?= $(BUILD_DIR)/obj
# 最终生成的可执行文件或固件（.elf、.hex、bin）的输出目录
OUTPUT_DIR          ?= $(BUILD_DIR)
# 可执行文件后缀，可以为空
EXEC_SUFFIX         := .elf
# 二进制文件后缀，如果为空则不会创建
BIN_SUFFIX          := .bin
# 十六进制文件后缀，如果为空则不会创建
HEX_SUFFIX          := .hex
# 是否是调试模式
DEBUG               ?= 1
# c 语言标准
C_STD               ?= -std=gnu99
# 优化选项
OPT                 ?= -Og
```

**c 语言编译配置`[C Configuration]`：**

该部分主要操作内容是：

1. 遍历上文定义的需要搜索的目录，获取源文件列表。
1. 转换头文件目录列表为`-I`格式。
1. 定义 SDK 库所需要的全局宏，避免修改 SDK 源码。
1. 添加编译选项。

移植 stm32f103ze 工程时，主要修改`C_DEFS`内定义的宏，`STM32F103xB`宏将会在`xfusion/sdks/STM32CubeF1-1.8.5/Drivers/CMSIS/Device/ST/STM32F1xx/Include/stm32f1xx.h`中被使用。其余宏主要用于修改时钟配置，与使能 SDK 中的库。

由于 stm32f103ze 与 stm32f103c8 属于同一系列，外设基本相同，此处只需修改`STM32F103xB`为`STM32F103xE`。

```makefile
# ===================== [C Configuration] ======================================

# c 源文件后缀列表，以空格分隔
C_SRCS_SUFFIXES     ?= .c
# 需要匹配 c 源文件的目录列表
# 注意以空格分隔，且不要以 / 结尾
C_SRCS_DIR          += ./Core/Src
# c 源文件列表
C_SRCS              += $(call wildcard_src,$(C_SRCS_DIR),$(C_SRCS_SUFFIXES))
# c 头文件目录列表，以空格分隔
C_INCS_DIR          += . ./Core/Inc
# c 头文件目录列表， -I 格式
C_INCS              += $(call get_inc_paths, $(C_INCS_DIR))
# c 源文件全局定义， -D 格式
C_DEFS              += \
 -DSTM32F103xB \
 -DUSE_FULL_LL_DRIVER \
 -DUSE_HAL_DRIVER \
 -DHSE_VALUE=8000000 \
 -DHSE_STARTUP_TIMEOUT=100 \
 -DLSE_STARTUP_TIMEOUT=5000 \
 -DLSE_VALUE=32768 \
 -DHSI_VALUE=8000000 \
 -DLSI_VALUE=40000 \
 -DVDD_VALUE=3300 \
 -DPREFETCH_ENABLE=1
# 硬件设备相关
CPU                 ?= -mcpu=cortex-m3
FPU                 ?= # NONE. example: -mfpu=fpv4-sp-d16
FLOAT-ABI           ?= # NONE. example: -mfloat-abi=hard
MCU                 ?= $(CPU) -mthumb $(FPU) $(FLOAT-ABI)
# 不要在 CFLAGS 添加 $(C_INCS)
CFLAGS              += $(C_STD) $(OPT) $(C_DEFS) $(MCU)
CFLAGS              += -Wall # 开启所有警告信息
CFLAGS              += -ffunction-sections -fdata-sections # 用于减少可执行程序大小
CFLAGS              += -Wl,--gc-sections # 链接器 ld 不会链接未使用的函数，从而减小可执行文件大小
CFLAGS              += -fno-keep-static-consts # 不保留未被引用的 static const 变量
CFLAGS              += -Wl,--start-group -lc -lm -Wl,--end-group # 不关心 c 标准库和数学库的链接顺序
CFLAGS              += -fdiagnostics-color=always # 启用颜色提示
ifeq ($(DEBUG), 1)
CFLAGS              += -g -gdwarf-2
endif
```

**汇编文件配置`[ASM Configuration]`：**

该部分主要操作内容是：

1. 加入 gcc 格式的汇编启动文件。

移植 stm32f103ze 工程时，需要从`xfusion/sdks/STM32CubeF1-1.8.5/Drivers/CMSIS/Device/ST/STM32F1xx/Source/Templates/gcc/startup_stm32f103xe.s`复制并替换 stm32f103c8 的启动文件`startup_stm32f103xb.s`。

```makefile
# ===================== [ASM Configuration] ====================================

# 汇编源文件列表
AS_SRCS             += startup_stm32f103xb.s
AS_INCS             +=
AS_DEFS             += -D__ASSEMBLY__
ASFLAGS             += $(CFLAGS) $(AS_DEFS)
```

**库配置`[Library Configuration]`：**

该部分主要操作内容是：

1. 使用含有 xfusion 自动初始化段的链接脚本。
1. 链接 c 标准库、数学库等。

移植 stm32f103ze 工程时，需要从`xfusion/sdks/STM32CubeF1-1.8.5/Drivers/CMSIS/Device/ST/STM32F1xx/Source/Templates/gcc/linker/STM32F103XE_FLASH.ld`复制并替换 stm32f103c8 的启动文件`STM32F103XE_FLASH.ld`，并根据[原始工程文件](#原始工程文件)中介绍"`STM32F103XB_FLASH.ld`和`startup_stm32f103xb.s`"的小节在 text 段添加 xfusion 自动初始化的内容。

```makefile
# ===================== [ASM Configuration] ====================================

# 汇编源文件列表
AS_SRCS             += startup_stm32f103xb.s
AS_INCS             +=
AS_DEFS             += -D__ASSEMBLY__
ASFLAGS             += $(CFLAGS) $(AS_DEFS)
```

# stm32f103ze 移植步骤

1. 复制 stm32f103c8 文件夹并重命名为 stm32f103ze。

1. 从`xfusion/sdks/STM32CubeF1-1.8.5/Drivers/CMSIS/Device/ST/STM32F1xx/Source/Templates/gcc/`目录内复制`startup_stm32f103xe.s`和`STM32F103XE_FLASH.ld`，替换`startup_stm32f103xb.s`和`STM32F103XB_FLASH.ld`。

   1. 根据上文说明，在`STM32F103XE_FLASH.ld`的 text 段添加 xfusion 自动初始化的内容。

1. `MDK-ARM/`目录。

   1. `MDK-ARM/`目录内的`startup_stm32f103xb.s`需要从`xfusion/sdks/STM32CubeF1-1.8.5/Drivers/CMSIS/Device/ST/STM32F1xx/Source/Templates/arm/`目录内复制`startup_stm32f103xe.s`，并替换`startup_stm32f103xb.s`。

   1. stm32.uvprojx 需要将 stm32f103c8 相关内容替换为 stm32f103ze。如`<Device>`；`<Cpu>`内的 IRAM 地址、IROM 地址；`<Define>`的 STM32F103xB 宏。

1. 根据[`porject.mk` 详解](#porjectmk-详解)修改全局定义、链接文件、启动文件。

此时已经基本完成了移植，只需新开终端`. ./export.sh stm32f103ze`即可使用。
