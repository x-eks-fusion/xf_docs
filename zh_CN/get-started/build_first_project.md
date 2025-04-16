# 编译第一个工程

> [!NOTE] 作者
> kirto

文本档主要帮助用户创建第一个工程，以及如何指导用户进行编程，编译，烧录

# 创建第一个 XFusion 工程

1. 激活自己的 SDK 环境

   > [!TIP] 激活环境
   > 有些 SDK ，例如：esp32 每次打开终端需要使用 export 激活一次环境

2. 激活 XFusion

   > [!WARNING]⚠️ 注意
   > get_xf 的命令是执行 export.sh 的别名。具体参考：
   >
   > [linux 环境搭建](preparation_with_linux.md)
   >
   > [windows 环境搭建](preparation_with_windows.md)

   ```bash
   get_xf <target>
   ```

3. 使用命令创建一个新的 XFusion 工程

   ```bash
   xf create hello
   ```

   此时创建出来的文件夹结构如下：

   ```bash
   📦hello
       ┣ 📂main
       ┃ ┣ 📜xf_collect.py
       ┃ ┗ 📜xf_main.c
       ┗ 📜xf_project.py
   ```

   - **xf_project.py**: 工程构建脚本，xf 命令通过识别这个文件来确认是不是 XFusion 。文件内部调用 xf_build 初始化工程。
   - **xf_collect.py**：工程收集脚本，xf 通过该脚本收集所有编译的信息。文件内部调用 xf_build 的 collec() 方法收集编译信息。默认收集同级文件夹的所有 .c 。以及将当前所在文件夹加入 include_path 。
   - **xf_main.c**：代码入口文件。主要识别 xf_main() 函数作为 xf_build 的代码入口。

# 修改第一个 XFusion 工程

1.  添加自己的打印

    ```c
    #include "xf_log.h"

    void xf_main(void)
    {
        xf_log_printf("hello XFusion\n");
    }
    ```

# 编译第一个 XFusion 工程

1. 编译工程

   ```bash
   xf build
   ```

1. 烧录代码 (非必要，看对应平台是否有支持，如不支持，需按原平台的方式进行)
   ```bash
   xf flash
   ```
1. 查看串口打印 (非必要，看对应平台是否有支持，如不支持，需按原平台的方式进行)
   ```bash
   xf monitor <port>
   ```
   按下<kbd>ctrl</kbd>+<kbd>]</kbd>退出串口

# 导出第一个 XFusion 工程

> [!WARNING]⚠️ 注意
> 有些芯片不是命令行编译，需要通过 IDE。比如：keil。
> 这时上述编译步骤就没用了

1.  导出 IDE 工程

    ```bash
    xf export <工程名>
    ```

    通过上述命令，可以导出生成一个完整的 IDE 工程。然后打开工程，即可在 IDE 的环境中开发

2.  更新 IDE 工程
    ```bash
    xf update <工程名>
    ```
    当已有导出工程后，希望能更新工程的时候，可以使用上述指令进行工程更新。
