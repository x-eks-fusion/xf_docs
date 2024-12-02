# 基础功能对接（XF_SYS）

> [!NOTE] 作者
> dotc

本章节介绍如何对接 XFusion 基础功能部分

**前置准备：**

- 了解 XFusion 的构建命令及其参数的作用。
- 了解 XFusion 基础功能的作用及 XFusion 的例程。
- 熟悉将要对接的 XFusion 基础功能的原理、将对接的平台的处理流程等。
- 了解 XFusion 基础功能的对接要求。

# 目前需要对接的基础功能有

1. XFusion 自动初始化
1. xf_init
1. xf_log

# 对接流程

## 1. XFusion 自动初始化对接：

> 目前已实现调用的方法统一，即用户只需调用同名的方法即可

- 目前 XFusion 自动初始化实现方法有 3 种，仅需选一种方式进行对接，然后 menuconfig 配置成对应的方法即可：
  1. (**section 属性**)**(GNU 特性)** : 通过 `section` 将自动初始化的函数的符号导出指定的段, 实现依赖倒置。
  2. (**constructor 属性**)**(GNU 特性)** : 将自动初始化的函数的符号, 通过 `constructor` 挂载到内置初始化链表, 实现在调用时初始化(延迟初始化), 同时也实现依赖倒置。
  3. (**显式注册表**) : 显式调用注册函数, 此时需要手动修改注册表。此时 `xf_init` 也会依赖需要初始化的组件, 通常不推荐使用。

### section 方法的对接步骤

1. 需在平台侧的链接脚本中，找到 text 段

2. 在 text 段中加入 `xf_auto_init` 段，如下：

   ```Linkscript

    /* 省略 */

   /* 在此插入 xf_auto_init 段 */
   . = ALIGN(4);                    /* 32 位使用 4 字节对齐方式，64 位使用 8 字节对齐方式 */
   __xf_init_start = .;             /* 此处为 xf_auto_init 段起始 */

   /* .xf_auto_init* : 通配 .xf_auto_init* 的符号 ; SORT: 对符号排序; KEEP : 确保这些段不会优化掉 (即使没被显式引用) */
   KEEP(*(SORT(.xf_auto_init*)))
   __xf_init_end = .;               /* 此处为 xf_auto_init 段结尾 */
   . = ALIGN(4);                    /* 32 位使用 4 字节对齐方式，64 位使用 8 字节对齐

    /* 省略 */

   ```

### constructor 方法的对接步骤

- 略，仅需平台侧编译器支持 constructor 属性方法即可

### 显式注册表 方法的对接步骤

- 略，不推荐使用

## 2. xf_init 对接：

- 目前 xf_init 仅需要对接两方法

  1. **_void xfusion_init(void)_** : 初始化 xfusion，包含 log 初始化，自动初始化等。需要放在较早被调用的位置，且在 "xfusion_run" 的调用前。

  2. **_void xfusion_run(void)_** : 运行 xfusion。需要将该函数放到循环里面调用。

- 例 : (tasks_xf_premain 可放在平台 main 函数中或者在创建的线程中执行)

  ```C

  static void *tasks_xf_premain(const char *arg)
  {
      unused(arg);
      xfusion_init();
      while (1)
      {
          xfusion_run();
      }
      return NULL;
  }

  ```

## 3. xf_log 对接：

- 目前 xf_log 仅对接一个方法：

  1. ***int xf_log_register_obj(xf_log_out_t out_func, void *user_args)\***

  - 说明：注册 log 的后端 (log 最终输出到哪里)，其最大值受到 XF_LOG_OBJ_MAX 的限制。

  - 参数说明：

    1. **_out_func_** : 后端输出函数， 如果减少 IO 操作，可以考虑使用异步缓冲

       - 类型 : typedef void(*xf_log_out_t)(const char *str, size_t len, void \*arg);

    1. **_user_args_** : 传入的参数，会在 out_func 中被调用。

  - 对接流程 :

    > 如对接了 xf_sys 中的时间戳功能，则 xf_log 会正常输出时间戳；否则不会正常输出时间戳。

    1. 实现 **xf_log_out_t** 类型的后端函数 (如 printf 、串口 等)。

    2. 实现另一个函数 (假设为 : "port_log_init" )，其实现为 : 通过 "**xf_log_register_obj**" 将实现后端函数注册至 xf_log 实现对接。

    3. 通过 **XF_INIT_EXPORT_SETUP** 将 "port_log_init" 加入自动初始化列表 (注意：需包含初始化的头文件 "xf_init.h" ， 否则以上操作无效)。

    - 例 "port_xf_log.c" 文件内容 :

    ```C

    #include "xf_log.h"
    #include "xf_init.h"
    #include "stdio.h"

    static void xf_log_out(const char *str, size_t len, void *arg)
    {
        if ((NULL == str) || (0 == len)) {
            return;
        }
        printk("%.*s", (int)len, str);
    }

    static int port_log_init(void)
    {
        xf_log_register_obj(xf_log_out, NULL);
        return 0;
    }
    XF_INIT_EXPORT_SETUP(port_log_init);

    ```

  - 验证 : 编译带有 xf_log 日志输出，且日志等级设置正常的工程，运行查看输出日志结果进行验证。

# 至此，基础功能对接完成。

- 后面根据需要可对接 xf_sys 、 xf_osal 等其他部分。
