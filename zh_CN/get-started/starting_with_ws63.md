# 从 ws63 开始

本文说明如何基于 ws63 sdk 使用 xfusion。

---

**阅读对象：**

- 基于 ws63 sdk 平台使用 xfusion 的用户。

---

**关于 ws63：**

ws63 是海思 HI3863 的 SDK 的代号。

Hi3863V100 系列是 2.4GHz Wi-Fi 6 BLE 星闪多模 IoT SoC 芯片，其中增强款芯片 Hi3863EV100 支持 2.4GHz 的雷达人体活动检测功能，适用于大小家电、电工照明及对人体出没检测有需求的常电类物联网智能场景。

•集成 IEEE 802.11 b/g/n/ax 基带和 RF 电路，包括功率放大器 PA、低噪声放大器 LNA、RF balun、天线开关以及电源管理模块等；
•支持 20MHz 频宽，提供最大 114.7Mbps 物理层速率，支持更大的发射功率和更远的覆盖距离；
•支持 BLE 1MHz/2MHz 频宽、BLE4.0/4.1/4.2/5.0/5.1/5.2 协议、BLE Mesh 和 BLE 网关功能，最大空口速率 2Mbps；
•支持星闪 SLE 1MHz/2MHz/4MHz 频宽、SLE1.0 协议、支持 SLE 网关功能，最大空口速率 12Mbps。

Hi3863V100 系列芯片采用 QFN40（5mm x 5mm）封装，匹配不同场合的应用，细分为下列两种：

• Hi3863：合封 4MB Flash，支持 WiFi、SLE、BLE 多模并发，支持单天线通道
• Hi3863E：支持雷达人体活动检测，合封 4MB Flash，支持 WiFi、SLE、BLE 多模并发，支持双天线通道

见：《[Hi3863V100 芯片 | 海思官网 (hisilicon.com)](https://www.hisilicon.com/cn/products/connectivity/short-range-IoT/wifi-nearlink-ble/Hi3863V100)》。

# 安装 WS63 SDK

## 获取源码

如果您有 `WS63_1.10.T7.xxxxxxxx.tar.gz` 压缩包，您可以按照以下步骤安装 WS63 SDK。

- 通过压缩包安装。

  复制压缩包到 `xfusion/sdks`​ 文件夹内，并解压即可。

  ```bash
  # 此处省略复制 `WS63_1.10.T7.xxxxxxxx.tar.gz` 步骤
  cd ~/development/xfusion/sdks
  tar -xvzf WS63_1.10.T7.xxxxxxxx.tar.gz
  # 如果解压出来的文件夹不叫 `ws63_1.10.t7` 请手动重命名它
  # 见 plugins/ws63/build.py 的 `SDK_PATH: Path = api.XF_ROOT / "sdks/ws63_1.10.t7"` 一句
  # mv WS63_1.10.T7 ws63_1.10.t7
  ```

- 通过 git 安装。

  > 由于写该文档时还没有公开的 git 仓库链接，下文用 http://xxx/xfusion/ws63_1.10.t7.git 替代。

  ```bash
  cd ~/development/xfusion/sdks
  git clone http://xxx/xfusion/ws63_1.10.t7.git
  ```

## 安装 WS63 SDK 环境依赖

```bash
# 搭建Linux开发环境
# Linux 系统推荐使用Ubuntu 20.04 及以上版本，Shell 使用bash ，SDK使用Cmake编译（3.14.1 以上），编译工具还包括Python（3.8.0 以上）等。

# 配置 Shell
# 配置默认使用 bash。打开Linux终端，执行命令“sudo dpkg-reconfigure dash”， 选择 no。
sudo dpkg-reconfigure dash

# 安装 Cmake
sudo apt install cmake

# 安装 Python 环境，推荐python3.8.0以上版本。
python3 -V

## 如果Python版本太低，请升级python版本
# sudo apt-get update
# sudo apt-get install python3 -y

## 安装Python包管理工具
sudo apt-get install python3-setuptools python3-pip -y

## 安装Kconfiglib 14.1.0+
sudo pip3 install kconfiglib
# 或 `sudo -E -H pip3 install kconfiglib`
## 其中 -H 标志使 sudo 假定 root 的主目录为 HOME 而不是当前用户的主目录。
## -E 表示使用代理

## 安装pycparser
pip3 install pycparser==2.21
```

## (可以忽略)原生 SDK 编译测试

此时解压出来的 ws63 sdk 无法直接编译，需要手动关闭 xfusion 对接部分才能编译。

1.  关闭 xfusion 对接。

    ```bash
    # 打开 menuconfig 菜单
    clear; python3 build.py ws63-liteos-app menuconfig
    ```

    关闭 `(Top) -> Application -> Enable porting XF.`​。如下图所示，之后按 `s`​ 后回车保存，并按 `q`​ 退出。

    ​![image](/image/starting_with_ws63-menu_close_porting_xf.png)​

1.  编译。

    ```bash
    clear; python3 build.py -c -nhso -release ws63-liteos-app
    ```

    出现下图内容即为编译成功。

    ​![image](/image/starting_with_ws63-compilation_success.png)​

1.  重新打开 xfusion 对接。

    根据上述步骤重新打开即可。

# 基于 WS63 SDK 使用 xfusion

1. vscode 远程连接到虚拟机，并且打开 xfusion 文件夹。
1. 导出 xfusion 环境变量。

   ```bash
   cd ~/development/xfusion
   # `.` 表示用 source 的方式运行 export.sh 脚本
   # `ws63` 表示使用 ws63 目标平台或者芯片
   . ./export.sh ws63
   ```

   此时会安装虚拟环境和导出一些环境变量到当前终端中。

   ​![image](/image/starting_with_ws63-xf_export.png)​

   此时可以使用 xf 命令，通过 xf 命令可以快速地调用目标平台的编译命令等功能。

   ```txt
   $ xf
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

1. 移动到 `log`​ ​ 例程内。

   ```bash
   cd examples/system/log
   ```

1. 清除、配置、编译。

   1. 清除：

      1. 命令：`xf clean`​。
      1. 效果：会清除当前例程内的 build 文件夹。

   1. 设置 xfusion 菜单：

      1. 命令：`xf menuconfig`​。
      1. 效果：

         1. ​![image](/image/starting_with_ws63-menu_log_level.png)​
         1. 修改完毕后通过 `s`​ 按键保存配置。

   1. 编译：

      1. 命令：`xf build`​。
      1. 效果：

         编译成功后可以看到此提示信息：

         1. ​![image](/image/starting_with_ws63-compilation_success2.png)​

1. 烧录。

   1. 编译完毕后，固件包会输出到 `sdks/ws63_1.10.t7/output/ws63/fwpkg/ws63-liteos-app/ws63-liteos-app_all.fwpkg`​。
   1. 将文件 `ws63-liteos-app_all.fwpkg`​ 复制到虚拟机到 Windows 共享文件夹或者其他 Windows 文件夹内。
   1. 打开 burntool。

      1. 设置串口波特率。

         ​![image](/image/starting_with_ws63-burntool_set_baud.png)​

      1. 配置烧录选项。

         ​![image](/image/starting_with_ws63-burntool_config_options.png)​

      1. 前三步完成后的效果如下图所示。

         ​![image](/image/starting_with_ws63-burntool_config_complete.png)​

      1. 按下开发板上的 RST 按键开始烧录。

         ​![image](/image/starting_with_ws63-dev_board_press_rst.png)​

      1. 烧录完成信息如图所示。

         ​![image](/image/starting_with_ws63-burntool_burn_ok.png)​

1. 观察运行现象。

   1. 将 ws63 连接到 Windows 并打开串口终端。
   1. 按下 RST 重置 ws63。
   1. 运行现象如下图所示。

      ​![image](/image/starting_with_ws63-example_log_output.png)​

      图中 `float: f`​ 的原因是 xf_printf 关闭了浮点数支持，开启浮点数支持大概要增加 2.5KB 的 flash 占用空间。
