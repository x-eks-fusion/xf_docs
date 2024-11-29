# 使用 vscode 插件

> [!NOTE] 作者
> kirto

本文主要介绍如何使用 vscode 插件简化开发流程

# 安装 XFusion vscode 插件

在 vscode 的拓展商店搜索 xfusion

![vscode_plugin](/image/vscode_plugin.png)

点击安装即可安装插件

![vscode_plugin_logo](/image/vscode_plugin_logo.png)

安装完插件左侧边栏会出现一个xfusion图标。点击图标会出现下面的启动页面。

![vscode_plugin_start](/image/vscode_plugin_start.png)

当然，也可以在插件设置中配置路径。
点击<kbd>选择路径</kbd>，找到 XFusion 路径后点击 `以后不再提示` 然后关闭这个页面。
就完成了 vscode 插件安装

# 如何使用 XFusion 插件

> [!WARNING]⚠️注意
> 执行以下操作前至少要打开一个终端
> 插件的本质是可视化的调用指令

## export 的过程

点击右下角的 xfusion 标签

![vscode_plugin_export](/image/vscode_plugin_export.png)

选择一个 target 。这里对应着命令行中的`激活 xfusion`操作。

![vscode_plugin_target](/image/vscode_plugin_target.png)

此时，插件就会自动发送 export 命令到终端了。

## 插件编译

点击左侧边栏的 logo。点击`编译`图标。这一步对应命令行的操作为[xf build](xf_command_reference.md#build)。

![vscode_plugin_build](/image/vscode_plugin_build.png)

这时会出现文件目录树。目录树主要展示你调用组件目录和源文件。

![vscode_plugin_file_tree](/image/vscode_plugin_file_tree.png)

目录树会有以下几种目录：
- public_components (公共组件库)
- user_components (用户组件库)
- user_dirs (用户文件夹)
- user_main (用户主文件夹)

## 插件清除

点击`清除`图标。这一步对应命令行的操作为[xf clean](xf_command_reference.md#clean)。

![vscode_plugin_clean](/image/vscode_plugin_clean.png)

则清除编译产生的中间产物，并清空目录树的显示

![vscode_plugin_clear](/image/vscode_plugin_clear.png)


## 插件烧录

点击`下载`图标。这一步对应命令行的操作为[xf flash](xf_command_reference.md#flash)。

![vscode_plugin_flash](/image/vscode_plugin_flash.png)


## 插件打开 menuconfig

点击`菜单`图标。这一步对应命令行的操作为[xf menuconfig](xf_command_reference.md#menuconfig)。
![vscode_plugin_menuconfig](/image/vscode_plugin_menuconfig.png)


## 插件打开串口监视器

点击`监视器`图标。这一步对应命令行的操作为[xf monitor \[串口号\]](xf_command_reference.md#monitor)。

![vscode_plugin_monitor](/image/vscode_plugin_monitor.png)

然后，选择串口。就可以在命令行中查看了。

![vscode_plugin_serial](/image/vscode_plugin_serial.png)

