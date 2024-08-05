# 外设对接（XF_HAL）

**阅读对象：**

- 需要对接 xfusion 外设功能的移植开发者。

**前置知识：**

- 了解 xfusion 的构建命令及其参数的作用。
- 了解 xf_hal 的作用及 xfusion 的例程。
- 熟悉将要对接的外设的原理、将对接的平台的处理流程等。
- 了解 xf_hal 对将要对接的外设的对接要求

# 对接流程

## 1. 实现对接 xf 驱动操作集的注册函数。一般流程为：

1.  对接 xf_driver_ops_t 通用操作集的各个方法：（具体作用及要求详参：[xf_driver_ops_t 操作集的各方法的作用及对接要求](#1-实现对接-xf-驱动操作集的注册函数一般流程为)）

    ```C
    typedef struct _xf_driver_ops_t {
        xf_err_t (*open)(xf_hal_dev_t *dev);
        xf_err_t (*ioctl)(xf_hal_dev_t *dev, uint32_t cmd, void *config);
        int (*read)(xf_hal_dev_t *dev, void *buf, size_t count);
        int (*write)(xf_hal_dev_t *dev, const void *buf, size_t count);
        xf_err_t (*close)(xf_hal_dev_t *dev);
    } xf_driver_ops_t;

    ```

2.  将对接好的操作集注册至 xf_hal 中，调用如“xf_hal_xxx_register”形式的函数，xxx 是外设类型，如 gpio 则调用 xf_hal_gpio_register 。

## 2. 将 ① 中实现的注册函数加入自动初始化工作序列中。一般流程为：

调用自动初始化标记宏“XF_INIT_EXPORT_PREV”对注册函数进行标记。**注意注意注意！需要加上“#include "xf_init.h"”**，否则注册会不成功，编译也不会报错只有警告，容易被忽略。

## 至此，外设对接完毕

## xf_driver_ops_t 操作集的各方法作用及对接要求

1.  xf_err_t (*open)(xf_hal_dev_t *dev)：通常是对应外设应用侧 init 被调用时被调用，进行对象构造。如 gpio 是 xf_hal_gpio_init 被调用时，会调用对接时注册的操作集下的 open 操作方法。

    返回值类型：xf_err_t ：正常返回 XF_OK。

    - 参数说明：

      ::: details xf_hal_dev_t \*dev：xf hal 基类对象：

      ```C
      typedef struct _xf_hal_dev_t {
          xf_list_t node;
          uint32_t type;    // 保存外设类型
          uint32_t id;      // 一般用于标识同一类型下的不同资源，如 I2C1的1
          void *platform_data;   // 平台侧的数据，一般是对接时包含平台侧外设信息的子类对象
      #if XF_HAL_LOCK_IS_ENABLE
          void *mutex;
      #endif
      } xf_hal_dev_t;
      ```

      :::

    - open 函数一般会执行的流程如下：

      1.  有效性检查。如 GPIO、I2C 资源索引号是否有效、是否超出可用的范围等。
      2.  （非必要）初始化（创建）平台侧的外设对象，句柄记录至基类对象（参数 dev）中的 platform_data 成员。一般包含对接时需要再各个操作中流转的一些数据，如外设的部分状态、平台侧读写的方法（如 I2C 主机与从机记录为不同的读写方法）。
      3.  （非必要）对平台侧的外设对象成员进行初始化。

2.  xf_err_t (*close)(xf_hal_dev_t *dev)：通常是对应外设应用侧 deinit 被调用时被调用，进行对象析构。

    返回值类型：xf_err_t ：正常返回 XF_OK。

    - 参数说明：

      ::: details xf_hal_dev_t \*dev：xf hal 基类对象。

      ```C
      typedef struct _xf_hal_dev_t {
          xf_list_t node;
          uint32_t type;    // 保存外设类型
          uint32_t id;      // 一般用于标识同一类型下的不同资源，如 I2C1的1
          void *platform_data;   // 平台侧的数据，一般是对接时包含平台侧外设信息的子类对象
      #if XF_HAL_LOCK_IS_ENABLE
          void *mutex;
      #endif
      } xf_hal_dev_t;
      ```

      :::

    - close 函数一般会执行的流程如下：

      1.  有效性检查。如 GPIO、I2C 资源索引号是否有效、是否超出可用的范围等。
      2.  （非必要）外设相关的反初始化处理
      3.  （非必要）反初始化（销毁、回收内存）平台侧的外设对象。

3.  xf_err_t (*ioctl)(xf_hal_dev_t *dev, uint32_t cmd, void \*config)：通常是对应外设应用侧相关配置被设置时会被调用。

    常见的配置如 timeout、IO num、速率、外设开启与关闭等，不同外设可能有不同的可配置项，详情查阅如 “xf_hal_xxx_cmd_t”的类型（xxx 为外设类型，如 GPIO 则为 xf_hal_gpio_cmd_t）。

    返回值类型：xf_err_t ：正常返回 XF_OK。

    - 参数说明：
      ::: details xf_hal_dev_t \*dev：xf hal 基类对象。

      ```C
      typedef struct _xf_hal_dev_t {
          xf_list_t node;
          uint32_t type;    // 保存外设类型
          uint32_t id;      // 一般用于标识同一类型下的不同资源，如 I2C1的1
          void *platform_data;   // 平台侧的数据，一般是对接时包含平台侧外设信息的子类对象
      #if XF_HAL_LOCK_IS_ENABLE
          void *mutex;
      #endif
      } xf_hal_dev_t;
      ```

      :::

    uint32_t cmd：配置命令集，每个命令各占一个位（bit），从第 0 为向上递增，当某位为 1 时则表示该位命令触发。详情查阅如 “xf_hal_xxx_cmd_t”的类型（xxx 为外设类型，如 GPIO 则为 xf_hal_gpio_cmd_t）。

    void \*config：hal 层配置记录。记录 hal 层该外设的配置信息。此处是 void 类型，通常需要强转类型为对应外设的 hal 层配置类型使用，类型形式如“xf_hal_xxx_config_t”（xxx 为外设类型，如 GPIO 则为 xf_hal_gpio_config_t）。

    所有外设都有两个通用控制命令： XF_HAL_XXX_CMD_DEFAULT 与 XF_HAL_XXX_CMD_ALL。

    - XF_HAL_XXX_CMD_DEFAULT（0x0） ：用于表示需要将默认配置加载至 hal 层配置记录 config 中。一般需要单独且放在最前面处理。
    - XF_HAL_XXX_CMD_ALL（0xFFFFFFFFUL）：因为置 1 了所有配置位，所以表示所有命令生效。一般无需单独处理，只需按命令位逐个处理即可。

    ::: details 这两个命令都是在用户侧调用外设 init 函数时，在调用 open 后，进行下发的，调用过程如下：

    ```C
    xf_hal_xxx_init(...)
    {
    ...
    xf_hal_driver_create(XF_HAL_XXX_TYPE,xxx_num);
    {
        ...
        dev_table[XF_HAL_XXX_TYPE].constructor(xxx_num);
        {
        ...
        xxx_constructor(xxx_num);
        {
            **xf_hal_driver_open(dev, XF_HAL_XXX_TYPE, xxx_num);**
            {

            }
            **xf_hal_driver_ioctl(dev, XF_HAL_XXX_CMD_DEFAULT, &dev_xxx->config);**
            **xf_hal_driver_ioctl(dev, XF_HAL_XXX_CMD_ALL, &dev_xxx->config)**;
        }
        }
    }
    }
    ```

    :::

    ::: details ioctl 一般处理流程参考（也可自行按要求用其他方式进行处理）：

    ```C
    static int port_xxx_ioctl(xf_hal_dev_t *dev, uint32_t cmd, void *config)
    {
        // 强转为外设的 hal_config 类型以获取外设的 hal_config
        xf_hal_xxx_config_t *hal_config = (xf_hal_xxx_config_t *)config;

        // 获取前面 open 时，创建的平台侧的外设对象
        port_xxx_t *port_xxx = (port_xxx_t *)dev->platform_data;
        uint8_t xxx_num =  dev->id;

        /**************************************
        *
        *  XF_HAL_XXX_CMD_DEFAULT 命令：
        *  默认配置加载到 hal_config 后返回
        *
        **************************************/
        if (cmd == XF_HAL_XXX_CMD_DEFAULT) {
            // ... ...
            hal_config->enable      = XF_XXX_ENABLE_DEFAULT_CFG;
            hal_config->timeout_ms  = XF_XXX_TIMEOUT_DEFAULT_CFG;
            // ... ...
            return XF_OK;
        }

        /**************************************
        *
        *  其他配置命令
        *
        **************************************/
        // 初始化 state_evt 状态事件为状态无事件
        port_dev_state_evt_t state_evt = PORT_DEV_STATE_EVT_NONE;
        uint8_t bit_n = 0;
        while (cmd > 0)
        {
            uint32_t cmd_bit = cmd & (0x1<<bit_n);  // 获取该位的命令状态（是否有效）
            cmd &= (~cmd_bit);                      // 清除该检测完的命令位
            /* 命令匹配 */
            switch (cmd_bit)
            {
            /* 以下为平台侧 有 对应动态修改 API 的配置命令项 */
            case XF_HAL_XXX_CMD_AAA:
            {
                /*
                    A. 当前外设状态为运行，且本次命令集无停止的命令 （hal_config 中的状态配置不是停止）
                    -> 动态修改配置：
                        直接调用平台侧动态修改该项配置的 API 即可。
                */
                if( (port_xxx->state == PORT_DEV_STATE_RUNNING)
                    && (hal_config->enable != false) )
                {
                    xxx_set_aaa_dynamic( ... ... );
                }
                /*  B. 当前外设状态为停止 -> 静态修改配置。
                        因为 hal_config 已经记录了配置，
                        所以无需任何处理，继续处理其他命令位。
                */
            }break;
            /* 以下为平台侧 无 对应动态修改 API 的配置命令项 */
            case XF_HAL_XXX_CMD_BBB:
            case XF_HAL_XXX_CMD_CCC:
            case XF_HAL_XXX_CMD_DDD:
            {
                /*
                    A. 当前外设状态为运行，且本次命令集无停止的命令 （hal_config 中的状态配置不是停止）
                    -> 动态修改配置：
                        设置 state_evt 为重启事件即可，然后继续处理其他命令位。
                        因为平台侧无对应动态修改的 API ，所以在处理完所有触发的命令位后，
                        才通过重启（停止后再重新设置再打开）的方式进行动态配置
                */
                if( (port_xxx->state == PORT_DEV_STATE_RUNNING)
                    && (hal_config->enable != false) )
                {
                    state_evt = PORT_DEV_STATE_EVT_RESTART;
                }
                /*  B. 当前外设状态为停止，或本次命令集有停止的命令（hal_config 中的状态配置是停止）
                    -> 静态修改配置：
                        因为 hal_config 已经记录了配置，
                        所以无需任何处理，继续处理其他命令位。
                */
            }break;
            /* 状态切换配置项（开或关） */
            case XF_HAL_XXX_CMD_ENABLE:
            {
                /*
                    根据 hal_config 中的状态配置（开或关），
                    设置 state_evt 为启动事件或停止事件即可，然后继续处理其他命令位。
                    因为需要避免还有其他并发配置命令位还没进行设置，
                    所以在处理完所有触发的命令位后，才执行外设的启动或停止。
                */
                state_evt = (hal_config->enable == true)?
                    PORT_DEV_STATE_EVT_START:PORT_DEV_STATE_EVT_STOP;
            }break;
            default:
                break;
            }
            ++bit_n;    // 移至下一位命令位
        }

        /* 检查状态变更事件 */
        switch (state_evt)
        {
        case PORT_DEV_STATE_EVT_RESTART:            // A. 重启事件
        {
            /* 当状态为运行时才需要执行外设停止的流程其短暂更改状态为停止 */
            if(port_xxx->state != PORT_DEV_STATE_STOP)
            {
                /* 此处执行外设停止的流程 */
                port_xxx->state = PORT_DEV_STATE_STOP;
            }
        }// 不 break, 需要往下继续执行 start 处理以实现重启（停止后重新启动）
        case PORT_DEV_STATE_EVT_START:              // B. 启动事件
        {
            /* 此处执行外设启动的流程 */
            port_xxx->state = PORT_DEV_STATE_RUNNING;
            return XF_OK;
        }break;
        case PORT_DEV_STATE_EVT_STOP:               // C. 停止事件
        {
            /* 当状态已为停止时则跳出，无需执行停止流程 */
            if(port_xxx->state == PORT_DEV_STATE_STOP)
            {
                break;
            }
            /* 此处执行外设停止的流程 */
            port_xxx->state = PORT_DEV_STATE_STOP;
        }
        default:                                    // D. 无状态变更事件
            break;
        }
        return XF_OK;
    }

    ```

    :::

4.  int (*read)(xf_hal_dev_t *dev, void \*buf, size_t count)：在 hal 层外设读相关的操作被执行时会被调用。

    返回值类型： int ：正常则返回实际读取到的数据量；**异常报错时，需要注意返回的必须是负值错误码**。

    - 返回值处理情况：

      1.  如果是非阻塞异步读且未完成的情况一般返回的是 0。

      2.  一般错误码均是正值（如 xf_err_t 中除 XF_FAIL 外的错误码），则需要取反处理，以确保负值返回。

      3.  可能有些平台某些错误返回本身就是负值，则直接返回即可。如果有需要，也可对这种负值错误情况进行特殊提示。

    - 参数说明：

      ::: details xf_hal_dev_t \*dev：xf hal 基类对象。

      ```C
      typedef struct _xf_hal_dev_t {
          xf_list_t node;
          uint32_t type;    // 保存外设类型
          uint32_t id;      // 一般用于标识同一类型下的不同资源，如 I2C1的1
          void *platform_data;   // 平台侧的数据，一般是对接时包含平台侧外设信息的子类对象
      #if XF_HAL_LOCK_IS_ENABLE
          void *mutex;
      #endif
      } xf_hal_dev_t;

      ```

      :::

      void \*buf：读出的数据的缓存。

      size_t count：期望读出的数据量

5.  int (*write)(xf_hal_dev_t *dev, const void \*buf, size_t count)：在 hal 层外设写相关的操作被执行时会被调用。

    返回值类型： int ：正常则返回实际写入的数据量；**异常报错时，需要注意返回的必须是负值错误码**。

    - 返回值处理情况：

      1.  如果是非阻塞异步写且未完成的情况一般返回的是 0。

      2.  一般错误码均是正值（如 xf_err_t 中除 XF_FAIL 外的错误码），则需要取反处理，以确保负值返回。

      3.  可能有些平台某些错误返回本身就是负值，则直接返回即可。如果有需要，也可对这种负值错误情况进行特殊提示。

    - 参数说明：

      ::: details xf_hal_dev_t \*dev：xf hal 基类对象。

      ```C
      typedef struct _xf_hal_dev_t {
          xf_list_t node;
          uint32_t type;    // 保存外设类型
          uint32_t id;      // 一般用于标识同一类型下的不同资源，如 I2C1的1
          void *platform_data;   // 平台侧的数据，一般是对接时包含平台侧外设信息的子类对象
      #if XF_HAL_LOCK_IS_ENABLE
          void *mutex;
      #endif
      } xf_hal_dev_t;
      ```

      :::

      const void \*buf：写入的数据的缓存。

      size_t count：需要写入的数据量
