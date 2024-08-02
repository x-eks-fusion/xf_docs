# xfusion 运行流程

本文以 esp32 为例，介绍从 esp-idf 的用户 main 程序 `app_main()` 运行到 xfusion 的用户 main 程序 `xf_main()` 的过程中发生了什么。

---

**阅读对象：**

- 想要深入了解 xfusion 框架的用户以及移植开发者、组件开发者。

---

# 从 `app_main()` 开始

`app_main()` 是 esp-idf 的用户主程序，在 `app_main()` 之前 esp-idf 还完成了以下三个阶段：

- 硬件和基本 C 语言运行环境的端口初始化。
- 软件服务和 FreeRTOS 的系统初始化。
- 运行主任务并调用 `app_main`。

在此不对 `app_main()` 之前程序介绍，如果您感兴趣可以参考：《[应用程序的启动流程 - ESP32 - — ESP-IDF 编程指南 v5.0.6 文档 (espressif.com)](https://docs.espressif.com/projects/esp-idf/zh_CN/v5.0.6/esp32/api-guides/startup.html)》。

`app_main()` 在 xfusion 框架的位置是 `boards/espressif/esp32/main/main.c`，如《xfusion 文件夹结构》所说的：

`boards` 文件夹是存放原始工程的目录，而 `ports` 文件夹是存放原始 sdk 与 xfusion 对接的实现的文件夹，之所以如此分离设计，是因为 xfusion 考虑到不是所有驱动或接口都会在 xfusion 中实现，为了兼容能同时使用 xfusion 与原始 sdk 的使用方案故此分离。

在 `boards/espressif/esp32/main/main.c` 中的主要内容如下所示;

```c
#include "xfusion.h"

static void _preinit(void);
static void _predeinit(void);
extern void port_log_init(void);

static const xf_init_preinit_ops_t preinit_ops = {
    .preinit        = _preinit,
    .predeinit      = _predeinit,
};

void app_main(void)
{
    xfusion_run(&preinit_ops);
}

static void _preinit(void)
{
    port_log_init();
}

static void _predeinit(void){ }
```

其中：

1. `preinit_ops` 是预初始化与反预初始化的操作集。

   其主要作用是初始化与反初始化日志系统，以便在自动初始化阶段输出实际的初始化顺序。

   之所以有这个设计，是因为有些单片机上（比如 stm32 裸机开发）没有日志系统，这个设计可以实现**在自动初始化阶段临时借用硬件输出接口，初始化完毕后使用** **​`xf_hal`​** **的接口接管日志输出**。

   如下图中的 `D (xxx)-xf_init: initialize [ret:0] xxx done.` 所示：

   ![image](/image/xfusion_run_process-init_log.png)

2. `_preinit()` 调用了 `port_log_init()`，其作用就是调用日志初始化函数。

   `port_log_init()` 主要代码如下所示，位于 `ports/espressif/esp32/port_log.c`。

   ```c
   static size_t log_backend(char *p_buf, size_t buf_size, xf_log_backend_args_t *p_args)
   {
       (void)(p_args);
       if ((NULL == p_buf) || (0 == buf_size)) { return 0; }
       return printf("%.*s", (int)buf_size, p_buf);
   }

   static uint32_t log_time(void)
   {
       return esp_log_timestamp();
   }

   void port_log_init(void)
   {
       xf_log_set_backend(log_backend);
       xf_log_set_time_src(log_time);
       xf_printf_set_putchar(putchar);
   }
   ```

   实际调用了 xf_log 的设置输出后端和时间戳函数，以及设置了 xf_printf 的 putchar 输出函数。

3. `_predeinit()` 是个空函数。

   因为 esp-idf 已经有自己的日志系统了，并且 esp-idf 重定向了标准库标准输入输出流，xfusion 直接调用标准格式化输出函数或者直接使用 `puts()` 即可。不需要临时借用硬件实现的日志输出，因此也不需要反初始化。

# `xfusion_run()` 运行

`xfusion_run()` 函数则是封装了 xfusion 的初始化与用户程序的运行两个部分，`xfusion_run()` 函数位于 `components/xf_init/xfusion.c`，其主要代码如下。

```c
static void mbus_handle(xf_task_t task)
{
    (void)task;
    xf_task_mbus_handle();
}

void xfusion_run(const xf_init_preinit_ops_t *const p_ops)
{
    xf_init(p_ops);
#if XF_TASK_MBUS_IS_ENABLE
    xf_ntask_create_loop(mbus_handle, NULL, 0, 10);
#endif
    xf_main();
    xf_task_manager_run_default();
}
```

其中：

1. `xf_init(p_ops);`

   运行自动初始化。自动初始化的详细内容见 API 参考内的 xf_init 相关

2. `xf_ntask_create_loop(mbus_handle, NULL, 0, 10);`

   创建一个默认的发布订阅处理任务。

3. `xf_main();`

   运行用户主程序。

4. `xf_task_manager_run_default();`

   启动默认的任务管理器，并开始调度。包含之前创建的默认的发布订阅处理任务也是在此处理。

   注意：该函数不会返回！
