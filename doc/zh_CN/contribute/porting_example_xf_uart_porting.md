# 移植示例 - 添加 xf_uart 实现

本文说明 xfusion xf_hal 组件 xf_uart 如何移植外设驱动支持。其余组件的对接也有类似的步骤。

**阅读对象：**

- 想要添加新的外设驱动支持的贡献者。

# xf_uart 简介

首先了解需要对接的组件。

xf_uart 文件树如下：

```
xf_uart/
┣ test/
┃ ┣ main/
┃ ┃ ┣ main.c
┃ ┃ ┗ xf_collect.py
┃ ┗ xf_project.py
┣ XFKconfig
┣ xf_uart.c
┣ xf_uart.h
┣ xf_uart_port.h
┗ xf_uart_types.h
```

1. **`xf_*_types.h`**.

   该模块通用的数据类型。

   通用，指的是给用户用(`xf_main.c`)、给该模块用(`xf_uart.c`)、给其他间接依赖该模块的模块用（比如只依赖该模块的数据类型）、给对接该模块的实现用(`xfusion/ports/st/stm32f1xx/src/port_xf_uart`)。

1. **`xf_*_port.h`**.

   对接该模块所需的数据类型定义(`xf_*_port_in_t`、`xf_*_port_out_t`、以及其他对接所需的私有数据类型)、函数定义(`xf_uart_port_attach`)，用户通常不可用。

   如`xf_uart_port.h`。

1. **`xf_*.h`**.

   用户调用的模块接口。

   如`xf_uart.h`。

1. **`xf_*.c`**.

   模块实现。

   不应有与硬件相关的代码片段，如有应当明确指出，如`xf_uart.c`。

1. **`XFKconfig`**.

   模块配置。

   至少包含开关此模块的配置选项。

1. **`test/`**.

   模块测试工程。

## 对接要点

通常`xf_uart_port.h`内会有模块接口结构体，如下所示：

```c
/**
 * @brief UART 接口结构体。
 */
typedef struct _xf_uart_port_in_t {
    /**
     * @brief 检查串口资源有效性。
     *
     * @param[in, out] p_args 待检查的参数，含目标检查项目。
     * @param[out] p_res 检查的结果。
     * @return xf_err_t
     *      - XF_OK      成功
     *      - XF_FAIL    失败
     */
    xf_err_t (*check)(
        xf_uart_check_args_t *p_args, xf_uart_check_res_t *p_res);

    /**
     * @brief 初始化串口。
     *
     * @param uart_num 串口号。
     * @param[in, out] p_cfg 串口配置。
     * @return xf_err_t
     *      - XF_OK      成功
     *      - XF_FAIL    失败
     */
    xf_err_t (*init)(xf_uart_t uart_num, xf_uart_cfg_t *p_cfg);

    /**
     * @brief 反初始化串口。
     *
     * @param uart_num 串口号。
     * @return xf_err_t
     *      - XF_OK      成功
     *      - XF_FAIL    失败
     */
    xf_err_t (*deinit)(xf_uart_t uart_num);

    /**
     * @brief 设置串口配置。
     *
     * @param uart_num 串口号。
     * @param[in, out] p_cfg 串口配置。
     * @return xf_err_t
     *      - XF_OK      成功
     *      - XF_FAIL    失败
     */
    xf_err_t (*set_cfg)(xf_uart_t uart_num, xf_uart_cfg_t *p_cfg);

    /**
     * @brief 获取串口配置。
     *
     * @param uart_num 串口号。
     * @param[in, out] p_cfg 串口配置。
     * @return xf_err_t
     *      - XF_OK      成功
     *      - XF_FAIL    失败
     */
    xf_err_t (*get_cfg)(xf_uart_t uart_num, xf_uart_cfg_t *p_cfg);

    /**
     * @brief 串口发送数据。
     *
     * @note 对于 stm32 平台，该接口用于 DMA。
     * @param uart_num 串口号。
     * @param src 发送数据源。
     * @param length 发送数据长度。
     * @param wait_ms 发送超时时间，单位毫秒。设为 0 时使用 ringbuf 等方式发送。
     * @return int16_t
     *      - (>0)       成功，返回发送的数据长度
     */
    uint16_t (*write)(xf_uart_t uart_num, xf_uart_transaction_t *p_t);

    /**
     * @brief 串口接收数据。
     *
     * @note 对于 stm32 平台，该接口用于 DMA。
     * @param uart_num 串口号。
     * @param buf 接收数据缓冲区。
     * @param length 接收数据缓冲区长度。
     * @param wait_ms 接收超时时间，单位毫秒。设为 0 时直接读取缓冲区数据。
     * @return int16_t
     *      - (>0)       成功，返回读取的数据长度
     */
    uint16_t (*read)(xf_uart_t uart_num, xf_uart_transaction_t *p_t);

    /**
     * @brief 设置串口回调函数。
     *
     * @param uart_num 串口号。
     * @param cb 回调函数。
     * @param user_args 回调函数参数中的用户数据。
     * @return xf_err_t
     *      - XF_OK      成功
     *      - XF_FAIL    失败
     */
    xf_err_t (*set_cb)(xf_uart_t uart_num, xf_uart_cb_t cb_func, void *user_args);
} xf_uart_port_in_t;
```

对接时需要根据以上接口说明，实现符合要求的函数，并调用相应的对接函数传入实现函数，如调用`xf_uart_port_attach()`。

```c
/**
 * @brief 对接 xf_uart 操作。
 *
 * @param port_in xf_uart 接口。
 * @return xf_err_t
 *      - XF_OK      成功
 *      - XF_FAIL    失败
 */
xf_err_t xf_uart_port_attach(xf_uart_port_in_t *port_in);
```

## xf_uart 对应的实现

xf_uart 并没有规定接口实现代码的具体规范，需要贡献者制定合适的规范，只要实现接口要求即可。

路径在`xfusion/ports/st/stm32f1xx/src/port_xf_uart`。

`port_xf_uart`的含义是对接到 xf_uart，同时也有说明该代码在`ports/`文件夹内的意思。

port_xf_uart 文件树如下：

```
port_xf_uart/
┣ private/
┃ ┣ hw_uart.h
┃ ┗ port_xf_uart.h
┣ README.md
┣ hw_uart.c
┣ hw_uart_const.c
┗ port_xf_uart.c
```

1. **`port_xf_uart.c`**.

   存放`xf_uart_port_in_t`内定义是函数的实现，这里的代码是硬件无关的，通过`hw_uart_*()`函数封装并调用和具体硬件相关的功能。

   `port_xf_uart.c`中实现了基于`xf_ringbuf`的串口环形缓冲区，并通过中断后台发送数据以及接收数据。`xf_ringbuf`是与硬件无关的，因此放到这里。

   之所以这样划分，是因为该代码可复用到其他没有内置 fifo，需要软件 ringbuf 的芯片。

1. **`hw_uart.c`**.

   硬件相关代码，实现`port_xf_uart.c`所需要的接口。

1. **`hw_uart_const.c`**.

   硬件代码常量，用于实现 xfusion 定义的数据类型到硬件相关代码的数据类型的转换。

   在`hw_uart.c`是直接通过：

   ```c
   #define ENABLE_HW_UART_CONST (1)
   #include "hw_uart_const.c"
   #undef ENABLE_HW_UART_CONST
   ```

   这种方式包含，主要用于减少`hw_uart.c`代码量，也在使用通配符匹配所有源码时防止编译器多次编译。

1. **`private/`**.

   私有头文件。

   `hw_uart.h`表示由`hw_uart.c`提供的功能，给`port_xf_uart.c`使用；`port_xf_uart.h`则相反，表示由`port_xf_uart.c`提供的功能，给`hw_uart.c`使用.

### 注意事项

需要注意的是，由于使用了自动初始化，`xf_uart_port_attach()`不会被显式调用。`port_xf_uart.c`中通过以下代码导出到段，并在初始化时通过函数`xf_init()`调用。

```c
int port_attach_xf_uart(void)
{
    xf_uart_port_in_t xf_uart_port_in = {
        .check = port_xf_uart_check,
        .init = port_xf_uart_init,
        .deinit = port_xf_uart_deinit,
        .set_cfg = port_xf_uart_set_cfg,
        .get_cfg = port_xf_uart_get_cfg,
        .write = port_xf_uart_write,
        .read = port_xf_uart_read,
        .set_cb = port_xf_uart_set_cb,
    };
    return xf_uart_port_attach(&xf_uart_port_in);
}
XF_INIT_BOARD_EXPORT(port_attach_xf_uart);
```

`XF_INIT_BOARD_EXPORT()`宏的具体定义见`xfusion/components/xf_init/xf_init.h`。
