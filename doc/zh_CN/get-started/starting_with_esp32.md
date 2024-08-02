# 从 esp32 开始

本文说明如何基于 esp-idf 使用 xfusion。

---

**阅读对象：**

- 基于 esp-idf 平台使用 xfusion 的用户。

---

# 安装 ESP-IDF

注意，xfusion 目前对接的是 esp-idf v5.0 版本。

详细步骤见 ESP-IDF 官方文档：

《[快速入门 - ESP32 - — ESP-IDF 编程指南 v5.0.6 文档 (espressif.com)](https://docs.espressif.com/projects/esp-idf/zh_CN/v5.0.6/esp32/get-started/index.html)》。

# 基于 ESP-IDF 使用 xfusion

1.  vscode 远程连接到虚拟机，并且打开 xfusion 文件夹。
1.  **先导出 esp-idf 环境变量**，再导出 xfusion 环境变量。

    以下代码中 `get_idf5.0` 为自定义的导出 esp-idf 环境的命令的别名，见 《[Linux 和 macOS 平台工具链的标准设置 - ESP32 - — ESP-IDF 编程指南 v5.0.6 文档 (espressif.com)](https://docs.espressif.com/projects/esp-idf/zh_CN/v5.0.6/esp32/get-started/linux-macos-setup.html#get-started-set-up-env)》.

    ```bash
    cd xfusion
    get_idf5.0 # 先导出 esp-idf 环境变量
    . ./export.sh esp32 # 再导出 xfusion 环境变量
    ```

1.  移动到 `log`​ 例程内。

    ```bash
    cd examples/system/log
    ```

1.  清除、配置、编译。

    1.  运行以下命令：

        ```bash
        clear; xf clean; xf menuconfig; xf build
        ```

    1.  效果：

        编译成功后可以看到此提示信息：

        ​![image](/image/starting_with_esp32-compilation_success.png)​

1.  烧录。有两种方式可以烧录并打开终端。

    1.  将 esp32 连接到 linux 虚拟机。
    1.  烧录。

        1.  使用 xf 命令（目前暂时不能指定端口号）。

            ```bash
            xf flash monitor
            ```

        1.  使用 esp-idf 自带的命令（可以指定端口号）。

            ```bash
            cd xfusion
            cd boards/espressif/esp32
            get_idf5.0
            # /dev/ttyUSB0 为 esp32 开发板端口号
            clear; idf.py flash monitor -p /dev/ttyUSB0
            ```

1.  观察运行现象。

    1.  运行现象如下图所示。

        ​![image](/image/starting_with_esp32-example_log_output.png)​

‍
