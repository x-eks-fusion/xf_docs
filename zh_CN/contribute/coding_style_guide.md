# 编码风格指南

本文说明 xfusion 编码所使用的风格。

请遵守 xfusion 编码风格，统一编码风格可以减少因为风格转换带来的阅读成本。

---

**适用范围：**

- *外部库以外*的所有 c 头文件/源文件。

TODO: xfusion cpp 语言代码编程规范

**阅读对象：**

- 所有 c 语言代码贡献者。

**非目标：**

- c 语言代码编程规范。本文只说明风格 xfusion 编码风格，编程规范（如如何提高代码安全性）不是本文目标，可以查阅：
  - [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
  - [MISRA C:2012 Amendment 3](https://www.misra.org.uk/app/uploads/2022/12/MISRA-C-2012-AMD3.pdf)

---

# xfusion 头文件/源文件模板

xfusion 目前已经提供了 xfusion 内 c 语言代码头文件/源文件模板，提交到 xfusion 的代码请应用 xfusion 头文件/源文件模板。

空白模板见`examples/get_started/xf_template/blank_xf_template/`目录内的`xf_template.h/xf_template.c`。说明见[模板的说明](#模板的说明)。

模板说明实例见`examples/get_started/xf_template/main`内的`xf_template_source_detail.h/xf_template_source_detail.c`。详情见下文。

# 使用自动格式化

详情见：[format_code/README.md](#)。

**请不要忽略该部分，自动格式化能节省大量的排版工作量。**

自动格式化会帮你完成在合适的运算符周围添加空格、缩进代码、限制连续空白行数、限制每行字符数等等工作。

# 模板的说明

该小节介绍 xfusion 的 c 语言头文件/源文件模板的组成部分。

只需了解模板各个部分的作用即可，需要使用时请从`examples/get_started/xf_template/blank_xf_template/`目录内复制出来并修改。

所有 c/cpp 代码文件的总体要求如下（自动格式化会帮你完成这些总体要求）：

1. 使用 4 个空格替代`TAB`，并且**不要**使用制表符缩进代码；
1. 行尾**不要**尾随空格；
1. 每行字数**推荐不超过 80 个字符**，最多 120 字符（含）；
   > 如果每行少于 80 个字符，在 vscode 中两栏对照查看代码时能全部看完，而不用水平滚动或开启换行显示。
1. 文件编码格式为 **UTF-8** 格式；
1. 使用 Unix 风格的 **LF** 行结束符，而不是 Windows 风格的 CRLF 行结束符。

## 头文件模板

头文件模板由以下几个部分组成：

- 文件描述。如以下代码所示，至少需要包含文件名、作者、简介、版本、日期、版权声明这几个部分。

  ```c
  /**
   * @file xf_template.h
   * @author your name (you@domain.com)
   * @brief xfusion 头文件空白模板。
   * @version 0.1
   * @date 2023-10-23
   *
   * Copyright (c) 2023, CorAL. All rights reserved.
   *
   */
  ```

- 防止头文件重复包含的宏。
  要点：

  1. 修改宏名为当前文件名的大写格式，不含点'.'以及其他无法作为宏定义的字符。
  2. 以**双**下划线开头和结尾这个宏。
  3. 在宏的`#endif`结尾，注释说明该`#endif`的归属，如`#endif /* __XF_TEMPLATE_H__ */`。

  ```c
  #ifndef __XF_TEMPLATE_H__ /*!< 修改为文件名对应的定义 */
  #define __XF_TEMPLATE_H__

  /* ... */

  #endif /* __XF_TEMPLATE_H__ */
  ```

- `extern "C"`。
  用于 c++ 程序调用时声明该程序是 c 源程序。注意！`extern "C"`在`#include`之后。

  ```c

  #include "xf_def.h"

  /* 注意`extern "C"`在`#include`之后。 */
  #ifdef __cplusplus
  extern "C" {
  #endif

  /* ... */

  #ifdef __cplusplus
  } /* extern "C" */
  #endif
  ```

- 内容提示符及对应内容。
  注意头文件与源文件的内容提示符不完全相同。
  **其他内容应当与内容提示符保持上下各一空行的间隔。**
  头文件的内容提示符包含以下内容：

  1. 头文件`Includes`。
     > 如：`#include "xf_def.h"`；
  1. 宏定义(无参宏)`Defines`。
     > 如：`#define FOO (1)`；
  1. 类型定义`Typedefs`。
     > 如：`typedef int xf_templ_int_t;`；
  1. 全局函数原型`Global Prototypes`。
     > 如：`int global_func(int args);`；
  1. 宏函数(有参宏)`Macros`。
     > 如：`#define XF_TEMPLATE_MACROS_ADD(_a, _b) ((_a) + (_b))`；

  ```c
  /* 头文件包含的内容提示符 */

  /* ==================== [Includes]  ========================================== */

  /* ==================== [Defines]   =========================================== */

  /* ==================== [Typedefs]  ========================================== */

  /* ==================== [Global Prototypes]  ================================= */

  /* ==================== [Macros]    ============================================ */
  ```

## 源文件模板

源文件模板由以下几个部分组成：

- 文件描述。格式同头文件模板。
- 内容提示符及对应内容。
  注意头文件与源文件的内容提示符不完全相同。
  **其他内容应当与内容提示符保持上下各一空行的间隔。**
  源文件的内容提示符包含以下内容：

  1. 头文件`Includes`。
     > 如：`#include "xf_template.h"`；
  1. 宏定义(无参宏)`Defines`。
     > 如：`#define BAR (1)`；
  1. 类型定义`Typedefs`。
     > 如：`typedef int int_t;`；
  1. 静态函数原型`Static Prototypes`。
     > 如：`int _static_func(int args);`；
  1. 静态变量`Static Variables`。
     > 如：`int s_val = 0;`；
  1. 宏函数(有参宏)`Macros`。
     > 如：`#define XF_TEMPLATE_MACROS_SUB(_a, _b) ((_a) - (_b))`；
  1. 全局函数定义`Global Functions`。
     > 如：`int global_func(int args) { return args; };`；
  1. 静态函数定义`Static Functions`。
     > 如：`int _static_func(int args) { return args; };`。

  ```c
  /* 源文件包含的内容提示符 */

  /* ==================== [Includes]  ========================================== */

  /* ==================== [Defines]   =========================================== */

  /* ==================== [Typedefs]  ========================================== */

  /* ==================== [Static Prototypes]  ================================= */

  /* ==================== [Static Variables]   ================================== */

  /* ==================== [Macros]    ============================================ */

  /* ==================== [Global Functions]   ================================== */

  /* ==================== [Static Functions]   ================================== */
  ```

# 编码风格说明

该部分将详细介绍编码风格。注释风格请见《[代码注释指南](./code_comment_guide.md)》。该文档说明如何写出符合 doxygen 格式要求的注释。

## 缩进风格

xfusion c 源码缩进风格使用"One True Brace Style"，简称`1TBS`或`OTBS`，这是一种基于"K&R"风格的变体。`1TBS`和`K&R`最大的区别是，`1TBS`不允许单语句分支时省略花括号。此处不对缩进风格作详细介绍，详细内容请查阅[Indentation style](https://en.wikipedia.org/wiki/Indentation_style)。

xfusion 缩进风格的示例代码如下，详细示例见`examples/get_started/xf_template/main/xf_template_source_detail.c`。

```c
/**
 * @brief 主函数。
 */
int main(int argc, char *argv[])
{
    xf_templ_int_t ret = 0;
    int32_t val = 0;

    /**
     * @brief 分支语句哪怕只有一句也必须加花括号。
     */
    if (XF_TEMPLATE_VERSION != XF_TEMPLATE_VERSION_CHECK(1, 0, 0)) {
        XF_TEMPL_PRINTF("error: version check failed\n");
    } else {
        XF_TEMPL_PRINTF("version check: ok\n");
        XF_TEMPL_PRINTF("version is %lu\n", (uint32_t)XF_TEMPLATE_VERSION);
    } /*!< 必要时此处需要添加判断条件，以说明该花括号的来源  */

    xf_component_func();
    xf_template_another_func();
    xf_template_init();

    ret = _xf_template_func(&s_struct, &val);
    /**
     * @brief 常量在前可以避免不必要的逻辑错误。
     * 如 if (XF_TEMPL_FAIL = ret) 时编译会报错。
     */
    if (XF_TEMPL_FAIL == ret) {
        XF_TEMPL_PRINTF("error: ret is XF_TEMPL_FAIL\n");
        return XF_TEMPL_FAIL;
    }

    XF_TEMPL_PRINTF("ret: %d\n", ret);
    XF_TEMPL_PRINTF("ok\n");

    return XF_TEMPL_OK;
}
```

## 命名风格

### 文件及目录命名风格

TODO: 文件及目录命名风格详细说明

如 xf_uart 所示：

```
📦xf_uart
 ┣ 📜xf_uart.c
 ┣ 📜xf_uart.h
 ┣ 📜xf_uart_port.h
 ┗ 📜xf_uart_types.h
```

- xf_uart.h: 当前模块对外提供的功能的头文件。通常提供给用户使用。
- xf_uart.c: 当前模块功能的的实现。
- xf_uart_port.h: 实现当前模块功能所需要的接口。用户通常无需使用。
- xf_uart_types.h: 当前模块定义的数据类型。

### 内容(命名及排版)风格

由于头文件内的内容会被别处调用，通过命名空间标识来源是有必要的。

**命名空间：**

对于会被别处调用的代码，除非特殊情况，否则都**要求**加上命名空间（含全局变量，同时**建议不使用**全局变量）。
会被别处调用的代码包括但不限于：

1. 宏（含无参宏与带参宏）；
1. 结构体、共用体、枚举类型等；
1. 类型定义；
1. 函数；
1. 全局变量（建议不使用）。

#### 宏

宏定义(无参宏)是预处理指令中的一种，预处理阶段时会替换宏名为宏对应的替换列表。
格式为`#define 宏名 替换列表`。
如：

```c
#define XF_TEMPLATE_HELP_STR            "xf_template v0.1"
#define XF_TEMPLATE_HELP_STR_SPLICING   "test" XF_TEMPLATE_HELP_STR "abc123"
#define XF_TEMPLATE_DEFINE              (1)
```

宏函数(带参宏)。
格式为`#define 宏名(参数1,参数2,...,参数n) 替换列表`。
如：

```c
/**
 * @brief 带参宏示例。
 */
#define XF_TEMPLATE_MACROS_ADD(_a, _b) ((_a) + (_b))

/**
 * @brief 无需返回参数的宏
 *
 * 1. 通常需要用 do { } while (0) 包围（除非通过宏定义变量等情况）。
 * 2. while (0) 后不要加分号（使用时强制加分号）。
 */
#define XF_TEMPLATE_MACROS_NO_RETURN(_a, _b) \
    do { \
        s_data = (_a) + (_b); \
    } while (0)

/**
 * @brief 需要返回参数的宏
 *
 * 1. 使用 ({ }) 包围。
 * 2. 明显括出返回值。
 */
#define XF_TEMPLATE_MACROS_HAS_RETURN(_x)   \
    ({                                      \
        typeof(_x) __ret = (_x);            \
        __ret = __ret + (_x);               \
        (__ret);                            \
    })

/**
 * @brief 关于条件编译
 *
 * 1. 需要在对应的 #else 后追加相应的的条件（如：`!defined(xf_printf)`），
 *    在 #endif 后标注 #if 的信息（如：`defined(xf_printf)`）。
 *
 * @note 如何宏需要缩进保持美观，请在'#'号后面缩进。如下缩进所示。
 */
/* xf_template 输出接口 */
#ifdef xf_printf
#   define XF_TEMPL_PRINTF(_fmt, ...)   xf_printf((_fmt), ##__VA_ARGS__)
#else /* !defined(xf_printf) */
#   define XF_TEMPL_PRINTF(_fmt, ...)   printf((_fmt), ##__VA_ARGS__)
#endif /* defined(xf_printf) */

#ifndef UNUSED
#   define UNUSED(_x)                    ((void)(_x))     /*!< 未使用的变量 */
#endif

```

**命名要点：**

1. 根据需要添加命名空间；
   源文件(.c)内的定义的宏的名字可以不添加命名空间。**推荐**添加。
   一旦需要被别的文件调用，就**必须**加上命名空间。
1. 宏定义(无参宏)的宏名**必须**大写，如有特殊情况不大写宏定义时需要特殊注明；
1. 宏函数(带参宏)的宏名**通常**大写，除了非常类似于函数的宏或者编译器特性宏以及其他约定成俗的情况；
1. 宏函数(带参宏)的参数对大小写没有要求，但是通常**推荐**添加单下划线`_`以说明该参数是宏的参数，并且加以括号，防止表达式传入宏参数时造成逻辑错误；
1. 能说明宏的作用。

**格式要点：**

1. 宏对应的内容通常建议加括号，如下；

   ```c
   #define XF_TEMPLATE_DEFINE (1)
   ```

1. **不要求**对齐多个连续的宏名及其对应的内容，以及宏的继续符`\`，除非代码已经稳定很少更改；

   ```c
   /* 多个连续的宏，内容不要求对齐 */
   #define XF_TEMPLATE_MACROS_ADD(_a, _b)        ((_a) + (_b))
   #define XF_TEMPLATE_MACROS_NO_RETURN(_a, _b)  do { s_data = (_a) + (_b); } while (0)
   #define XF_TEMPLATE_MACROS_FOO                (1)
   /* 宏的继续符`\`对齐的情况，不要求对齐 */
   #define XF_TEMPLATE_MACROS_HAS_RETURN(_x)   \
       ({                                      \
           typeof(_x) __ret = (_x);            \
           __ret = __ret + (_x);               \
           (__ret);                            \
       })
   ```

1. 如果需要缩进预处理指令，请在在`#`号后面缩进，而不是在`#`号前面缩进。

   > 尽管 astyle 通过`--indent-preproc-block`命令可以自动缩进预处理指令，但是实测发现存在错误缩进多行注释的情况，因此暂未使用。

   如：

   ```c
   /* 正确示例 */
   #ifndef UNUSED
   #   define UNUSED(_x) ((void)(_x))
   #endif

   /* 错误示例 */
   #ifndef UNUSED
       #define UNUSED(_x) ((void)(_x))
   #endif
   ```

#### 类型定义、结构体、共用体、枚举类型等

xfusion 所有的 c 头文件/源文件都**强制**使用类型定义去替代结构体、共用体、枚举类型，包括浮点类型、整型等数据类型。

**命名要点：**

1. 类型定义、结构体、共用体。

   1. 用**类型定义**替换所有的结构体、共用体、枚举类型。
   1. 结构体、共用体、枚举类型的名字用单下划线`_`加类型定义的名字。
   1. 类型定义的名字需要用`_t`后缀结尾，说明该类型是通过类型定义定义的。
   1. 通常都需要添加命名空间前缀。
   1. 通常使用`int32_t`、`uint8_t`等类型定义替换`int`、`unsigned char`等数据类型。
   1. 如下：

      ```c
      /**
       * @brief 结构体示例。
      *
      * @details
      * 1. 结构体**必须**用类型定义。
      * 2. 结构体名字是类型定义名字前加单下划线。如：`_xf_templ_struct_t`。
      *    当然用 xf_templ_struct_s 也可以。
      */
      typedef struct _xf_templ_struct_t {
         xf_templ_int_t num;             /*!< 这是一个数字 */
         char *p_str;                    /*!< 这是一个字符串指针，前缀`p_`强调指针类型 */
         union {                         /*!< 结构体内的联合体或结构体等可以匿名 */
            uint8_t all;                /*!< 通过这个值可以修改整个共用体 */
            struct {                    /*!< 结构体内的联合体或结构体等可以匿名 */
                  uint8_t val_u4: 4;      /*!< 这是位域的示例，u4 表示有 4 位，根据位置可能是 [0..3] */
                  uint8_t val_bit4: 1;    /*!< 这是位域的示例，bit4 表示的是从 bit0 起数的第 5 位 */
                  uint8_t reserved: 3;    /*!< 这是位域中未使用的位 */
            } bits;  /*!< 如果使用了英文缩写，应当在此说明缩写的原文 */
         } data;
      } xf_templ_struct_t;
      ```

   1. 命名示例：
      TODO: 类型定义命名示例。

1. 枚举类型。

   1. 枚举元素要求和宏定义一样，无特殊情况都**必须大写**。
   1. 不使用枚举类型定义变量（如以下示例代码中的`xf_templ_enum_t`），通常只使用枚举类型定义的枚举元素。

      > 为了避免不同编译器为枚举类型分配不同大小。
      > 如 `components/xf_def/xf_err.h` 内的 `xf_err_code_t` 和 `xf_err_t`。使用 `xf_err_code_t` 内的枚举值，但不使用 `xf_err_code_t` 定义变量。

   1. 枚举元素通常要求有一个最大值，并且该最大值通常不作为正常值使用。
   1. 除了只做索引的枚举元素以外，应当用**功能**代替其中的数字。
   1. 如：

      ```c
      /**
       * @brief 枚举类型示例。
       *
       * @details
       * 1. 枚举类型通过类型定义重命名。
       * 2. 枚举类型命名是类型定义名字前加单下划线。如 "_xf_templ_enum_t"。
       *    用 xf_templ_enum_e 也可以。
       * 3. 枚举类型的值需要大写。
       * 4. 枚举值通常要求有一个最大值，并且该最大值使用时通常不作为正常值。
       */
      typedef enum _xf_templ_enum_t {
         XF_TEMPL_ENUM_0 = 0x00,         /*!< 枚举值 0，第一个枚举值通常要求手动赋     值 */
         XF_TEMPL_ENUM_1,                /*!< 枚举值 1 */
         XF_TEMPL_ENUM_2,                /*!< 枚举值 2 */
                                         /* 此处保留一行空行，以区分正常值和最大值 */
         XF_TEMPL_ENUM_MAX,              /*!< 枚举值最大值 */

         XF_TEMPL_ENUM_DEFAULT = XF_TEMPL_ENUM_1,    /*!< 枚举值默认值 */
      } xf_templ_enum_t;
      ```

#### 函数、变量、常量、goto 标签等

xfusion c 语言代码都采用`snake_case`风格命名。也就是`unix like`风格。如`xf_evt_attach()`、`xf_evt_sys_init()`等等。
如需缩写，请从[缩写词表](#缩写词表)中选取。

**命名要点：**

1. 函数。

   函数命名的总体原则是：`{主语}_{谓语}_{宾语}`。

   1. `{主语}`通常由`{前缀}_{模块}`组成，是发起动作的主体。

      1. `{主语}`**不可**省略。
      1. 如`xf_spi`表示 xfusion 中的 spi 模块（隐含 xf_hal）。
      1. 如`xf_spi_dev`表示发起动作的主语（主体）是 spi 设备(device)。

   1. `{谓语}`即为动作，动作的承接对象可能是主语，也可能是宾语，取决于是否有宾语。

      1. `{谓语}`**不可**省略。

         > 好的示例如`xf_uart_get_tx_buffer_free()`，表示在 uart 中获取发送缓冲区剩余空间大小。
         > 而如果去除`get`，`xf_uart_tx_buffer_free()`的则会产生歧义，可能的含义有，1. 同包含 get 的情况；2. 发送缓冲区剩余空间大小。

      1. `{谓语}`优先使用具有相反含义的词组。词组列表见附录[反义或互斥词组](#反义或互斥词组)。

         1. 具有相反含义的常用词组的有：
            获取/设置(get/set)、初始化/反初始化(initialize/deinitialize)、获取/释放(acquire/release)、创建/销毁(create/destroy)、添加/移除(add/remove)、上锁/解锁(lock/unlock)等。
         1. 其余没有相反含义的常用词组：
            延时(delay)、是否(is)、检查(check)等。

   1. `{宾语}`即为动作的承接对象。

      1. `{谓语}`可以省略。省略时表示动作的对象就是主语自己。
         如`xf_delay_ms()`表示以 ms 为单位延时（隐含主语为系统或当前线程）。
         如`xf_systime_init()`表示初始化`xf_systime`模块。

1. 变量、常量。

   1. 前缀。
      前缀有助于使用者在使用时辨别当前变量的类型，目前有以下常用几种前缀。前缀可以组合使用。

      1. `s_`，表示**静态变量**，无论是函数内或者文件内定义的静态变量都**必须**用`static`修饰；

         如：`components/xf_log/xf_log.c`中的`static xf_log_level_t s_global_level = (xf_log_level_t)XF_LOG_DEFAULT_LEVEL;`。

      1. `g_`，表示**全局变量**，与`s_`的区别是能否通过`extern`等方式直接访问，只要能被直接访问（不含通过指针访问）到的变量，都**必须**用`g_`。

      1. `c_`，表示**常量**。位于只读数据段的数据。对于常量**推荐**使用`c_`前缀。

         1. 常量可以在头文件中声明，并在别的文件内调用。
         1. 有`const`修饰的变量不一定是常量。
         1. 对于指针应当特别小心，只有满足： 1. 该指针不可改变指向；2. 不可通过该指针修改指向的空间的数据；3. 该指针指向的空间的数据不会改变。才能直接在在头文件中声明。以下示例说明了能在头文件中声明的指针的示例。

            ```c
            /* 一个变量数组 */
            char buf[10] = {0};

            /* 以下情况都可能存在数据竞争，都不能在头文件中直接声明 */

            /* 指向变量数组的指针变量 */
            char               *p_buf   = buf;
            /* 指向变量数组的指针常量 */
            char        *const  pc_buf  = buf;
            /**
             * @brief 指向变量数组的指针变量，且不可通过当前指针修改指向的空间。
             *
             * @note 尽管不可通过当前指针修改指向的空间，
             * 但是指针的指向可能改变，存在数据竞争风险。
             */
            const char         *cp_buf  = buf;
            /**
             * @brief 指向变量数组的指针常量，且不可通过当前指针修改指向的空间。
             *
             * @note
             * 尽管不可通过当前指针修改指向的空间，指针的指向也不能改变，
             * 但是指向的空间是变量数组，在通过 cpc_buf 读取数据过程中，
             * 数据有可能改变，因此存在风险。
             * 如：
             * 初始时，buf[0...9] == "abcdef\0\0\0\0"，
             * 通过 cpc_buf 读取 3 个字符后，线程切换到修改 buf 的线程，并修改 buf：
             * buf[0...9] == "012345\0\0\0\0"，线程再切换回通过 cpc_buf 读取数据的线程：
             * 最终读取的数据是: "abc345\0\0\0\0"
             */
            const char  *const  cpc_buf = buf;

            /* 能在头文件中声明的情况是（命名空间假设为 xf_tmp） */

            /* .h */
            extern const char *const g_xf_tmp_character_literal;
            /* .c */
            const char *const g_xf_tmp_character_literal = "hello world";

            /* 实际上也可以在 .h 中直接 */
            // const char *const g_xf_tmp_character_literal = "hello world";
            ```

      1. `p_`，表示**指针**。**强烈推荐**指针使用`p_`前缀。二级指针可以用`pp_`或者`p_xxx_ptr`。二级指针以上的级别的指针通常不使用。

1. goto 标签。
   通常**建议**单下划线开头，如`_xf_xxx_init_err`，表示 xxx 模块初始化错误时的处理，如释放资源等等。

## 内容编排风格

详情见详细示例`examples/get_started/xf_template/main/xf_template_source_detail.c`。

👉[xf_template_source_detail.c](#)👈

请根据内容提示符编写代码。

### 头文件顺序

1. 当前组件的公共头文件，也就是当前组件对外提供的功能的头文件；如：`#include "xf_template_header_detail.h"`；
2. 标准库，如 `#include <stdio.h>`；
3. 其他 POSIX 标准标头，如：`#include <sys/time.h>`；
4. 本文件所需要的其他组件的头文件，如：`#include "xf_log.h"`、`#include "xf_spi.h"`；
5. 本文件所需要的当前组件的其他头文件或者私有头文件。

> 备注："当前组件的公共头文件"也可放到"本文件所需要的当前组件的其他头文件或者私有头文件"之前
> 项目中很多历史遗留代码还没修改顺序，请以该顺序为准。

如：

```c
/* ==================== [Includes] ========================================== */

#include "xf_template_header_detail.h"

#include <stdio.h>

#if ENABLE_XF_HAL
#include "xf_hal.h"
#endif /* ENABLE_XF_HAL */

#include "xf_component_template.h"
```

### 其余细则

- 不要以空行开始或者结束函数。
  ```c
  void function1()
  {
      do_one_thing();
      do_another_thing();
                                  /* 不正确，函数结尾不要空行 */
  }
                                  /* 函数和函数之间需要空行 */
  void function2()
  {
                                  /* 不正确，函数开始不要空行 */
      int var = 0;
      while (var < SOME_CONSTANT) {
          do_stuff(&var);
      }
  }
  ```
- 在条件和循环关键字后添加单空格（自动格式化会自动完成）。
  ```c
  if (condition) { /*!< 正确 */
      /* ... */
  }
  switch (n) { /*!< 正确 */
      case 0:
          /* ... */
  }
  for(int i = 0; i < CONST; ++i) { /*!< 不正确，关键词周围缺少空格 */
      /* ... */
  }
  ```
- 每行最大长度为 120 个字符（超长时自动格式化会自动换行）。
- 在合适的运算符周围添加空格（自动格式化会自动完成）。
- 如果不再需要某些代码，请将其完全删除。如果需要临时禁用，请在注释的代码周围说明原因。`#if 0 ... #endif`代码块同样。

# 附录

## 缩写词表

| 中文        | 英文          | 缩写   |
| :---------- | :------------ | :----- |
| 参数        | argument      | arg    |
| 参数        | parameter     | param  |
| 描述符      | descriptor    | dsc    |
| 缓冲区      | buffer        | buf    |
| 命令        | command       | cmd    |
| 配置        | configuration | cfg    |
| 控制        | control       | ctrl   |
| 比较        | compare       | cmp    |
| 位置        | position      | pos    |
| 错误        | error         | err    |
| 时钟        | clock         | clk    |
| 设备        | device        | dev    |
| 消息        | message       | msg    |
| 字符串      | string        | str    |
| 回调        | call-back     | cb     |
| 分配        | allocate      | alloc  |
| 临时        | temp          | tmp    |
| 对象        | object        | obj    |
| 同步        | synchronize   | sync   |
| 信号量      | semaphore     | sem    |
| 互斥量      | mutex         | mtx    |
| 注册/寄存器 | register      | reg    |
| 之前        | previous      | prev   |
| 当前        | current       | curr   |
| 最大        | maximum       | max    |
| 最小        | minimum       | min    |
| 增加        | increment     | inc    |
| 减少        | decrement     | dec    |
| 初始化      | initialize    | init   |
| 反初始化    | deinitialize  | deinit |

## 反义或互斥词组

| 中文            | 英文                |
| :-------------- | :------------------ |
| 添加/删除       | add/remove          |
| 添加/删除       | add/delete          |
| 开始/结束       | begin/end           |
| 创建/销毁       | create/destroy      |
| 插入/删除       | insert/delete       |
| 递增/递减       | increment/decrement |
| 锁定/解锁       | lock/unlock         |
| 旧/新           | old/new             |
| 源/目标         | source/target       |
| 源/目标         | source/destination  |
| 第一个/最后一个 | first/last          |
| 放入/取出       | put/get             |
| 打开/关闭       | open/close          |
| 启动/停止       | start/stop          |
| 显示/隐藏       | show/hide           |
| 复制/粘贴       | copy/paste          |
| 获取/释放       | acquire/release     |
| 最小/最大       | min/max             |
| 当前/之前       | current/previous    |
| 当前/之前       | current/next        |
| 下一个/之前     | next/previous       |
| 发送/接收       | send/receive        |
| 上/下           | up/down             |

# 参考文献

1. [Espressif IoT Development Framework Style Guide](https://docs.espressif.com/projects/esp-idf/zh_CN/release-v5.0/esp32/contribute/style-guide.html)
1. [LVGL Coding style](https://docs.lvgl.io/master/CODING_STYLE.html)
1. [Artistic Style 3.4.12 Documentation](https://astyle.sourceforge.net/astyle.html)
1. [RT-Thread 编程风格](https://gitee.com/rtthread/rt-thread/blob/master/documentation/contribution_guide/coding_style_cn.md)
