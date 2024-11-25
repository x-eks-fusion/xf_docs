# 快速入门

本文介绍 xfusion 的安装步骤、使用方法等基础内容。

---

**阅读对象：**

- xfusion 用户。

---

# 环境需求

目前主要使用的开发环境是：**Windows + Linux 虚拟机**。

通常工作流程是在 Windows 使用 VSCode 通过 ssh 连接到虚拟机，在 Windows 上编辑代码，在 Linux 上编译，后根据目标平台在 Windows(WS63 使用 BurnTool 烧录)或者 Linux 上烧录。

本文假设读者已安装好 VMware Ubuntu20.04 或者 WSL 虚拟机，并且配置好了 SSH 远程连接、VSCode 开发环境、git。如果没有安装，可以参考以下链接安装：

> 1. 安装虚拟机（VMware 或 WSL 二选一即可）
>
>    1. VMware Ubuntu 虚拟机。
>
>       1. [使用 VMWare 安装 Ubuntu 并使用 vscode 远程连接到虚拟机 | 邱维东 (qiu-weidong.github.io)](https://qiu-weidong.github.io/2022/04/30/OS/vmware/)
>       2. [VMware 安装配置 Ubuntu（最新版、超详细）\_vmware-workstation-full-17.5.1-23298084.exe-CSDN 博客](https://blog.csdn.net/m0_70885101/article/details/137694608)
>
>    2. WSL 虚拟机。
>
>       1. [设置 WSL 开发环境 | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/setup/environment)
>       2. [开始通过 WSL 使用 VS Code | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-vscode)

# 前置准备

如果没有安装 python, 请先安装 python 3.8 以上的版本的 python.

1.  打开虚拟机终端。
2.  安装 python。

    ```bash
    sudo apt-get install python3 python3-pip
    ```

# 安装 xfusion

如果您有 xfusion release 压缩包（含子模块的完整 release），您可以使用《[通过压缩包](#通过压缩包)》的步骤安装 xfusion 本体。否则请通过《[通过 git 链接](#通过-git-链接)》的步骤安装。

## 通过压缩包

1.  打开虚拟机终端。
2.  解压 xfusion 到你想放到的文件夹。

    ```bash
    cd ~
    # 创建你希望放置的文件夹
    mkdir development; cd development
    # 通过 ssh 或其他方式将 xfusion.xxxxxxxx.tar.gz 复制到虚拟机
    # 此处省略
    # 解压
    tar -xvzf xfusion.xxxxxxxx.tar.gz
    cd xfusion
    # 如果 xfusion 目录内不存在 sdks 文件夹，请创建它
    mkdir sdks
    ```

## 通过 git 链接

TODO 更新 xfusion 链接

1.  打开虚拟机终端。
2.  克隆仓库。

    > 由于写该文档时还没有公开的 git 仓库链接，下文用 http://xxx/xfusion/xfusion.git 替代。

    ```bash
    cd ~
    # 创建你希望放置的文件夹
    mkdir development; cd development
    # 克隆 xfusion 仓库，目前请不要递归克隆
    # 如果公开的 git 仓库有 feature 分支，请切换到 feature
    git clone http://xxx/xfusion/xfusion.git -b feature
    cd xfusion
    # 初始化和更新子模块
    git submodule init
    git submodule update
    # 如果 xfusion 目录内不存在 sdks 文件夹，请创建它
    mkdir sdks
    ```

# 安装具体平台 SDK

xfusion 本身不含工具链，需要安装对应平台的开发环境才能编译 xfusion 的代码。

xfusion 目前支持以下平台，您可以根据需要安装对应平台的 sdk
，请至少选择一个平台安装一次开发环境：

1. 《[从 esp32 开始](starting_with_esp32.md)》(基于 esp-idf v5.0)
2. 《[从 ws63 开始](starting_with_ws63.md)》(HI3863 芯片)

至此您应当可以在某个平台上编译烧录了，您可以看看接下来的[实用技巧](#实用技巧)帮助你配置 VSCode 的开发环境，或者看看[工程相关](project/index.md)了解如何创建带有用户组件的工程，以及如何安装外部组件。

在导出 xfusion 环境变量后可以直接通过 `xf` 命令来查看所支持的命令。

```txt
xf
Usage: xf [OPTIONS] COMMAND [ARGS]...

Options:
  -v, --verbose  Enable verbose mode.
  -r, --rich     Enable rich mode.
  -t, --test     Enable test mode.
  --help         Show this message and exit.

Commands:
  build       编译工程
  clean       清空编译中间产物
  create      初始化创建一个新工程
  export      导出对应sdk的工程（需要port对接）
  flash       烧录工程（需要port对接）
  install     安装指定的包
  menuconfig  全局宏的配置
  search      模糊搜索包名
  uninstall   卸载指定的包
  update      更新对应sdk的工程（需要port对接）
  version     查询当前版本
```

# 实用技巧

如果您使用 VSCode 开发，这些《[实用技巧](practical_tips.md)》可以使你的 VSCode 更好用，比如配置智能感知实现精准的代码提示、配置代码格式化等。

# 子文档

- [从 esp32 开始](starting_with_esp32.md)
- [从 ws63 开始](starting_with_ws63.md)
- [实用技巧](practical_tips.md)
- [工程相关](project/index.md)
