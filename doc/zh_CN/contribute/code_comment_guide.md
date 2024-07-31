# 代码注释指南

本文说明 xfusion c/cpp 代码的注释规范。

---

**适用范围：**

- *外部库以外*的所有 xfusion c/cpp 头文件/源文件。

**阅读对象：**

- 所有 c 语言代码贡献者。

---

# 简介

xfusion c/cpp 代码的注释使用 doxygen 风格的注释，如果使用 vscode 编写代码，请安装`cschlosser.doxdocgen`插件，方便生成 doxygen 风格的注释。

> vscode 的 doxygen 插件：[Doxygen Documentation Generator](https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen).
> doxygen 文档：[Documenting the code](https://www.doxygen.nl/manual/docblocks.html)

## 原则

**注释**是帮助读者在阅读和使用代码的信息。

**注释的位置：**

注释可以添加到函数、结构体、类型定义、枚举、宏等任何需要说明代码作用的地方。
但是注释只能在需要说明的代码的上方或者右侧。注释在需要说明的代码的右侧时，请注意使用`/*!< 注释 */`样式的的注释，以表明当前注释说明的对象是左侧的代码。

如：

```c
/* ********** 正确示例 ********** */

/* 总线配置 */
xf_spi_bus_cfg_t bus_cfg = {0};
xf_spi_bus_cfg_t bus_cfg = {0};  /*!< 总线配置，注意这个`!<`，表示当前注释说明的是左边的代码而不是后面代码 */

/* ********** 错误示例 ********** */

/* 1. ↓缺少`!<`，导致生成文档时注释位置错误 */
xf_spi_bus_cfg_t bus_cfg = {0}; /* 总线配置 */
xf_spi_pin_t spi_pin = {0};

/* 2. ↓注释位置错误 */
xf_spi_bus_cfg_t bus_cfg = {0};
/* 总线配置 */
```

**注释的重点：**

函数中的注释应当概括一段代码的作用，以及解释说明代码中重点以及难以理解的部分。
好的代码（拥有规范的命名、操作明确等特征）应当可以说明代码本身在做什么，即代码能够自己解释自己。因此没必要在函数中每一行都解释代码在做什么，而是**在必要情况下说明代码做了什么，为什么这么做**。

**注释的格式：**

通常**建议**只使用`/* */`的注释格式。

**头文件的注释：**

要求尽可能详细以及全面，函数功能参数的注释、结构体的注释、枚举类型的注释等等都要完善，好的头文件能够做到让用户不看源码就可以使用这个模块。

---

# 示例

## 文件头注释

```c
/**
 * @file xf_log.h
 * @author catcatBlue (catcatblue@qq.com)
 * @brief xf_log 日志模块。
 * @version 1.0
 * @date 2023-07-26     初版。
 *       2024-01-14     替换 printf 实现、加变量锁、增加日志输出后端、
 *                      增加 VERBOSE 等级。
 *                      由于通过日志输出后端可以实现异步输出，因此 log 不设总锁。
 *
 * Copyright (c) 2024, CorAL. All rights reserved.
 *
 */
```

TODO: 文件头注释规范。

## 如何注释

以下代码是函数注释示例，位于`components/xf_hal/xf_spi/xf_spi.h`。

```c
/**
 * @brief xf_spi 初始化总线并添加设备。
 *
 * @param spi_num spi 号。
 * @param clock_speed_khz spi 时钟速度，单位 kHz。
 * @param preset 预设值，见 @ref xf_spi_presets_t。
 * @param mosi mosi(主出从入)引脚号。
 * @param miso miso(主入从出)引脚号。
 * @param sclk 时钟引脚号。
 * @param cs 片选引脚号。
 *      主机模式时可以为 NC，此时传输前后不会操作 cs 引脚，从机模式时必须填入。
 * @param[out] p_handle 传出的操作句柄。
 *      主机模式时可以为 NULL，表示想要稍后添加设备（填入 pre_cb 等参数），
 *      从机模式时必须填入以接收传出的句柄。也可分为`bus_init`、`bus_add_device`两步。
 * @return xf_err_t
 *      - XF_ERR_INVALID_ARG        参数错误
 *      - XF_FAIL                   失败
 *      - XF_OK                     成功
 *
 * @note 该初始化函数中主要完成两个步骤：
 *      1. 调用 `xf_spi_bus_init()` 初始化 spi 总线；
 *      2. 调用 `xf_spi_bus_add_device()` 添加 spi 设备。
 */
xf_err_t xf_spi_init(
    xf_spi_t spi_num,
    uint16_t clock_speed_khz, xf_spi_presets_t preset,
    xf_gpio_t mosi, xf_gpio_t miso, xf_gpio_t sclk, xf_gpio_t cs,
    xf_spi_handle_t *p_handle);
```

从以上示例中，可以看出一个函数注释由以下部分组成：

1. 特殊注释块(Special comment blocks).

   > [Special comment blocks](https://www.doxygen.nl/manual/docblocks.html#specialblock)

   特殊注释块是如下样式的注释块：

   ```c
   /**
    * ... text ...
    */
   ```

   这是 Javadoc 样式的注释块，当然还有其他样式的注释块，但是为了统一风格，xfusion 中**只使用 Javadoc 样式**的注释块。

1. 特殊命令(Special Commands).

   > [Special Commands](https://www.doxygen.nl/manual/commands.html)

   命令是如`@brief @param @return`样式的代码，命令样式除了以`@`开头外，还有以反斜杠开头的`\`样式，xfusion 中**只使用以`@`开头的命令样式**。

   在函数注释中，常用命令有以下几种：

   1. 简介`@brief { brief description }`.
      `@brief`命令用于简要介绍文件、函数、变量、结构体等代码的功能。这是最常用的命令。
      注意！如果注释块中只有一个`@brief`，请**注意删除多余的空行**；如果有多个命令，注意将`@brief`与其余命令间隔一行，如下所示。

      ```c
      /* ********** ↓ 正确的 ********** */
      /**
       * @brief 我是注释。
       */

      /**
       * @brief 我是注释。
       *
       * @param 参数1 我是参数1。
       * @param 参数2 我是参数2。
       */

      /* ********** ↓ 错误的 ********** */
      /**
       * @brief 不要这样。
       *
       */

      /**
       * @brief 不要这样 ↓，缺少空行。
       * @param 参数 我是参数。
       */
      ```

   1. 参数`@param '['dir']' <parameter-name> { parameter description }`.
      `@param`命令通常用于介绍函数或者函数原型(类型定义的函数原型)的参数的作用。
      `@param`命令有一个可选参数，方向`dir`，这个参数紧靠`@param`，可以是`[in]`、`[in, out]`和`[out]`.
      xfusion 中如果不注明方向`dir`，则**默认为`[in]`**；一旦参数涉及传出，比如函数内会修改指针指向的空间，则必须标明传出双向`[in, out]`和传出`[out]`.
      `@param`命令中的参数名`<parameter-name>`在插件生成 doxygen 风格注释时会自动生成。
      `@param`命令中的参数描述`{ parameter description }`用于描述该参数的作用，必要时请加上`@ref`或者`@see`命令告知读者有用的参考信息。
      如果函数没有参数，请跳过该命令。

      ```c
      /**
       * @brief Copies bytes from a source memory area to a destination memory area,
       * where both areas may not overlap.
       *
       * @param[out] dest The memory area to copy to.
       * @param[in]  src  The memory area to copy from.
       * @param[in]  n    The number of bytes to copy
       */
      void memcpy(void *dest, const void *src, size_t n);
      ```

   1. 返回值`@return { description of the return value }`.
      `@return`是对返回结果的描述。
      如果有多种返回结果请用以下格式表示（`*      -`中有 6 个空格实际上是因为按了两次 TAB）；如果没有返回值请跳过该命令。

      ```c
      /**
       * @brief xf_spi 反初始化。
       *
       * @param spi_num spi 号。
       * @return xf_err_t
       *      - XF_ERR_INVALID_ARG        参数错误
       *      - XF_ERR_NOT_SUPPORTED      不支持（未对接）
       *      - XF_FAIL                   失败
       *      - XF_OK                     成功
       *
       * @note 会删除该总线下的所有设备。
       */
      xf_err_t xf_spi_deinit(xf_spi_t spi_num);
      ```

   1. 注意事项`@note { text }`或`@attention { attention text }`以及警告`@warning { warning message }`.
      `@note`或`@attention`命令用于告诉读者需要注意的重要信息。
      `@warning`命令告诉读者必须怎么做或者禁止怎么做，否则会产生什么后果。

再次强调，为了节省时间，请用功能类似于`cschlosser.doxdocgen`的 vscode 插件生成 doxygen 风格注释的模板。
以下代码是生成的注释模板，插件可以帮你节省时间。

```c
/**
 * @brief
 *
 * @param spi_num
 * @param clock_speed_khz
 * @param preset
 * @param mosi
 * @param miso
 * @param sclk
 * @param cs
 * @param p_handle
 * @return xf_err_t
 */
xf_err_t xf_spi_init(
    xf_spi_t spi_num,
    uint16_t clock_speed_khz, xf_spi_presets_t preset,
    xf_gpio_t mosi, xf_gpio_t miso, xf_gpio_t sclk, xf_gpio_t cs,
    xf_spi_handle_t *p_handle);
```

以下代码是结构体注释示例，位于`components/xf_hal/xf_spi/xf_spi_types.h`。

```c
/**
 * @brief spi 通用配置结构体。
 */
typedef struct _xf_spi_cfg_t {
    uint16_t hosts: 1;                  /*!< spi 是否是主机，见 xf_spi_hosts_t */
    uint16_t data_width: 3;             /*!< spi 数据宽度，见 xf_spi_data_width_t */
    uint16_t direction: 3;              /*!< spi 方向，见 xf_spi_direction_t */
    uint16_t clock_phase: 1;            /*!< spi 时钟相位，见 xf_spi_clock_phase_t */
    uint16_t clock_polarity: 1;         /*!< spi 时钟极性，见 xf_spi_clock_polarity_t */
    uint16_t bit_order: 1;              /*!< spi 比特顺序，见 xf_spi_bit_order_t */
    uint16_t nss: 2;                    /*!< spi NSS 管理方式，见 xf_spi_nss_t */
    uint16_t crc: 1;                    /*!< spi CRC，见 xf_spi_crc_t */
    uint16_t tx_en_dma: 1;              /*!< spi DMA 通道，见 xf_spi_dma_ch_t */
    uint16_t rx_en_dma: 1;              /*!< spi DMA 通道，见 xf_spi_dma_ch_t */
    uint16_t reserve: 1;                /*!< 保留 */
    uint16_t clock_speed_khz;           /*!< spi 时钟速率(单位千赫兹) */
    uint16_t crc_polynomial;            /*!< 指定用于计算 CRC 的多项式 */
    uint16_t transfer_sz;               /*!< 写：spi 最大传输大小；读：spi 已接收大小 */
    void *p_ext_cfg;                    /*!< 额外配置 */
} xf_spi_cfg_t;
```

### 做得更好

除了`@brief, @param, @return`等等常用命令，还有`@details, @code, @example`等命令可以让你的注释做得更出色。如以下示例所示。

```c
/**
 * @brief xf_spi 设置设备配置。
 *
 * @param handle 设备操作句柄。
 * @param p_dev_cfg 设备配置指针。见 @ref xf_spi_dev_cfg_t。
 * @return xf_err_t
 *      - XF_ERR_INVALID_ARG        参数错误
 *      - XF_ERR_NOT_SUPPORTED      不支持（未对接）
 *      - XF_FAIL                   失败
 *      - XF_OK                     成功
 *
 * @details
 * Example:
 * @code{c}
 * // handle 是通过 xf_spi_bus_add_device() 得到的句柄
 * xf_spi_cfg_t spi_cfg = {0};
 * spi_cfg.data_width = XF_SPI_DATA_WIDTH_8_BITS;
 * xf_spi_dev_cfg_t dev_cfg = {0};
 * dev_cfg.p_spi_cfg = &spi_cfg;
 * BIT_SET1(dev_cfg.target_mask, XF_SPI_CFG_DATA_WIDTH);
 * xf_spi_dev_set_cfg(handle, &dev_cfg);  ///! 设置 spi0 总线配置
 * // 如果设置成功，函数`xf_spi_dev_set_cfg()`会将对应位设为 0
 * if (BIT_GET(dev_cfg.target_mask, XF_SPI_CFG_DATA_WIDTH) == 0) {
 *     xf_printf("successfully set!\r\n");
 * }
 * @endcode
 */
xf_err_t xf_spi_dev_set_cfg(
    xf_spi_handle_t handle, xf_spi_dev_cfg_t *p_dev_cfg);
```

1. 其他命令.

   > [Special Commands](https://www.doxygen.nl/manual/commands.html)

   1. 代码块`@code['{'<word>'}']`.
      代码块是注释中被解释为代码的部分，可以显示语法高亮。用于说明在实际代码中如何使用某个函数或其他代码。
      `@code`与`@endcode`一起出现。
      `@code`的可选参数`['{'<word>'}']`用于指定语法高亮的语言，在`xf_spi_dev_set_cfg()`示例中通过`@code{c}`指定为 c 语言的语法高亮。

   1. 详细描述`@details { detailed description }`.
      就像`@brief`开始一个简短的描述，`@details`开始详细的描述。你也可以开始一个新的段落（空白行），那么就不需要`@details`命令了。
      `@details`可以使用 markdown 语法。

   1. 示例文件`@example['{lineno}'] <file-name>`.
      `@example`命令可以在生成的注释中链接到示例文件。
      `@example`命令可选参数`{lineno}`可以启用示例的行号

      > 用法参见：[cmdexample](https://www.doxygen.nl/manual/commands.html#cmdexample)

   1. 分组.

      > [grouping](https://www.doxygen.nl/manual/grouping.html#memgroup)

      1. 定义组`@defgroup <name> (group title)`.
         `@defgroup`命令用于表示注释块中包含类、模块、概念、文件或命名空间主题的文档，也就是用于对符号进行分类。您还可以使用组作为其他组的成员，从而建立组的层次结构。
         `@defgroup`命令的参数`<name>`是唯一的标识符，且不能有空格。这意味着同一个名字不能`@defgroup`两次。
         `@defgroup`命令的参数`(group title)`是组的标题，括号是可选的，中间可以有空格。
         可以通过组前的开始标记`@{`和组后的结束标记`@}`将成员分组在一起。
         **注意`@}`后面请注释组的标题**，告诉告诉读者当前括号的归属。

         ```c
         /**
          * @defgroup Unique_ID_of_the_group 组的标题
          * @{
          */

         /* 你希望添加到组里的内容... */

         /**
          * @} // Unique_ID_of_the_group
          * // ↑ 请重复一遍组的标识告诉读者当前括号的归属。
          */
         ```

      1. 添加组`@addtogroup <name> [(title)]`.
         `@addtogroup`命令用于将代码添加到指定组中，如果组不存在时则会创建组。类似与`@defgroup`，但是`@addtogroup`可以重复使用而不会警告，
         `@addtogroup`命令的参数`<name>`是标识符。
         `@addtogroup`命令的参数`[(title)]`是组的标题，是可选项。
         **注意`@}`后面请注释组的标题**，告诉告诉读者当前括号的归属。
         `@addtogroup`用法类似于`@defgroup`。此处不在赘述。

# 参考文献

- [Documenting Code](https://docs.espressif.com/projects/esp-idf/zh_CN/release-v5.0/esp32/contribute/documenting-code.html)
- [Documenting the code](https://www.doxygen.nl/manual/docblocks.html)
- [Special Commands](https://www.doxygen.nl/manual/commands.html)
