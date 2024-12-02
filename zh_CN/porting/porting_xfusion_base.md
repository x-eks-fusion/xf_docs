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

1. xf_init
1. XFusion 的调用
1. xf_log
1. xf_sys

# 对接流程

## 1. xf_init 对接：

> 目前 xf_init 的自动初始化已实现调用的方法统一，即用户只需调用同名的方法即可

- 目前 xf_init 的自动初始化实现方法有 3 种，仅需选一种方式进行对接，然后 menuconfig 配置成对应的方法即可：
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
   /* .xf_auto_init* : 通配 .xf_auto_init* 的符号 ; SORT: 对符号排序; KEEP : 确保这些段不会优化掉 (即使没被显式引用) */
   KEEP(*(SORT(.xf_auto_init*)))
   . = ALIGN(4);                    /* 32 位使用 4 字节对齐方式，64 位使用 8 字节对齐

    /* 省略 */

   ```

### constructor 方法的对接步骤

- 略，仅需平台侧编译器支持 constructor 属性方法即可

### 显式注册表 方法的对接步骤

- 略，不推荐使用

## 2. XFusion 的调用

- XFusion 需由平台侧工程调用才能正常运行，目前需要被调用的方法有 2 个 :

  1. **void xfusion_init(void)** : 初始化 XFusion ，包含 log 初始化，自动初始化等。需要放在较早被调用的位置，且在 "xfusion_run" 的调用前。

  2. **void xfusion_run(void)** : 运行 XFusion 。需要将该函数放到循环里面调用。

- 例 : main 函数中调用 "xfusion_init" 与 "xfusion_run" 方法。 (也可自行创建的线程进行调用)

  ```C

  void main(void)
  {
      xfusion_init();
      while (1)
      {
          xfusion_run();
      }
      return;
  }

  ```

## 3. xf_log 对接：

- 目前 xf_log 仅对接一个方法：

  1. ***int xf_log_register_obj(xf_log_out_t out_func, void *user_args)***

  - 描述：注册 log 的后端 (log 最终输出到哪里)，其最大值受到 XF_LOG_OBJ_MAX 的限制。

  - 参数说明：

    1. **_out_func_** : 后端输出函数， 如果减少 IO 操作，可以考虑使用异步缓冲

       - 类型 : typedef void(*xf_log_out_t)(const char *str, size_t len, void \*arg);

    1. **_user_args_** : 传入的参数，会在 out_func 中被调用。

  - 对接流程 :

    > 如对接了 xf_sys 中的时间戳功能，则 xf_log 会正常输出时间戳；否则不会正常输出时间戳。

    1. 实现 **xf_log_out_t** 类型的后端函数 (如 printf 、串口 等)。

    1. 实现另一个函数 (假设为 : "port_log_init" )，其实现为 : 通过 "**xf_log_register_obj**" 将实现后端函数注册至 xf_log 实现对接。

    1. 通过 **XF_INIT_EXPORT_SETUP** 将 "port_log_init" 加入自动初始化列表 (注意：需包含初始化的头文件 "xf_init.h" ， 否则以上操作无效)。

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
        print("%.*s", (int)len, str);
    }

    static int port_log_init(void)
    {
        xf_log_register_obj(xf_log_out, NULL);
        return 0;
    }
    XF_INIT_EXPORT_SETUP(port_log_init);

    ```

  - 验证 : 编译带有 xf_log 日志输出，且日志等级设置正常的工程，运行查看输出日志结果进行验证。

## xf_sys 对接

- xf_sys 目前可对接的功能有 : (看情况进行对接)

1. 系统时间 (xf_sys_time) (强烈建议对接)

1. 系统看门狗 (xf_sys_watchdog)

1. 系统重启

1. 中断开启与关闭

### 系统时间对接

- 目前只需要调用 "**xf_sys_time_init**" 来注册系统时间微妙级 (us)的时间戳获取的方法即可。

- 对接流程 :

  1. 实现 "**xf_us_t (\*get_us)(void)**" 类型的微妙级时间戳获取函数。

  1. 实现另一个函数 (假设为 : "port_sys_init" )，其实现为 : 通过 "**xf_sys_time_init**" 将实现的微妙级时间戳获取函数注册至 xf_sys 实现对接。

  1. 通过 **XF_INIT_EXPORT_BOARD** 将 "port_sys_init" 加入自动初始化列表 (注意：需包含初始化的头文件 "xf_init.h" ， 否则以上操作无效)。

- 例 :

  ```C

  #include "xf_sys.h"
  #include "xf_init.h"

  #include <sys/time.h>
  #include <time.h>

  static xf_us_t _port_xf_sys_get_us(void)
  {
      struct timespec current_time;
      clock_gettime(CLOCK_MONOTONIC, &current_time);

      return current_time.tv_sec*(1000*1000) + current_time.tv_nsec/1000;
  }

  static int port_sys_init()
  {
      xf_sys_time_init(_port_xf_sys_get_us);
      return XF_OK;
  }

  XF_INIT_EXPORT_BOARD(port_sys_init);

  ```

### 系统看门狗对接

- 目前可对接的系统看门狗接口有:

  1. **_xf_err_t xf_sys_watchdog_enable(void)_** : 系统看门狗开启

  1. **_xf_err_t xf_sys_watchdog_disable(void)_** : 系统看门狗关闭

  1. **_xf_err_t xf_sys_watchdog_kick(void)_** : 系统看门狗喂狗操作

### 系统重启对接

- 目前可对接的系统重启接口有 :

  1. **_void xf_sys_reboot(void)_** : 软件系统重启

### 系统中断对接

- 目前可对接的系系统中断接口有 :

  1. **_xf_err_t xf_sys_interrupt_enable(void)_** : 系统中断开启

  1. **_xf_err_t xf_sys_interrupt_disable(void)_** : 系统中断关闭

# 至此，基础功能对接完成。

- 后面根据需要可对接 xf_osal 、 xf_ble 、 xf_sle 、xf_wifi 、 xf_netif 等其他部分。
