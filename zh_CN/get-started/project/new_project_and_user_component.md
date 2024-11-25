# 新建工程与用户组件

本文介绍 xfusion 中基础工程概念以及如何创建带有用户组件的工程。

---

**阅读对象：**

- xfusion 用户。

---

# xfusion 工程介绍

一个典型的 xfusion 用户工程通常由以下部分组成：

1.  用户主程序 `main`；
1.  用户组件 `components 内的组件`；
1.  工程脚本 `xf_project.py`；
1.  收集脚本 `xf_collect.py`；

其<span id="file_tree">文件树</span>如下所示：

```txt
📦xf_project_sample
 ┣ 📂components
 ┃ ┗ 📂foo
 ┃ ┃ ┣ 📜XFKconfig
 ┃ ┃ ┣ 📜foo.c
 ┃ ┃ ┣ 📜foo.h
 ┃ ┃ ┗ 📜xf_collect.py
 ┣ 📂main
 ┃ ┣ 📜xf_collect.py
 ┃ ┗ 📜xf_main.c
 ┗ 📜xf_project.py
```

- `xf_project.py`

  工程脚本 `xf_project.py` 的内容通常如下，主要完成工程变量（如工程名）的初始化、所有源码的收集工作，并且**默认以当前文件夹的名字作为工程名**。

  ```python
  import xf_build
  xf_build.project_init()
  xf_build.program()
  ```

- `xf_collect.py`

  每个组件下均会有 `xf_collect.py` 用于**标记当前组件所拥有的源文件、头文件目录以及依赖情况**，内容通常如下：

  ```python
  import xf_build
  srcs = ["*.c"]
  incs = ["."]
  reqs = ["xf_utils"]
  xf_build.collect(srcs=srcs, inc_dirs=incs, requires=reqs)
  ```

  如果源文件和头文件都在组件文件夹的根目录，`srcs` 与 `inc_dirs` 参数均可以省略，默认参数会收集组件文件夹的根目录的源文件和头文件。

  依赖参数 `requires` 用于表示当前组件依赖哪些组件，其中 `xf_utils` 包含通用定义和常用的接口，因此一般都需要加入依赖。

- `XFKconfig`

  `XFKconfig` 等同于 `Kconfig`，用于在 `build/header_config/xfconfig.h` **生成以 `CONFIG_` 开头的配置宏定义**。

  `XFKconfig` 示例如下，他最终会生成宏定义 `CONFIG_COMPONENTS_TEST_VAL`。

  ```txt
  config COMPONENTS_TEST_VAL
      int "test value"
      default "1234"
  ```

- `📂main`

  即为**用户主程序**。

  > [!NOTE]
  >
  > 1. 由于历史原因 `📂main` 的文件夹仍然叫 `main`，实际在生成 esp-idf 组件时的名字叫 `user_main`，实际上改名为 `xf_main` 会更合适。
  >
  > 1. `main` 组件的 `xf_collect.py` 脚本中可以不写依赖参数 `requires`，因为 xf_build 会自动添加所有组件作为 `main` 组件的依赖。

关于工程的源文件有以下几点需要注意。

> [!WARNING]
>
> 1. **建议使用 `xf_main.c`** 作为用户主程序文件名，不建议使用 `main.c`。
>
>    因为某些 SDK 中没有将组件打包成静态库的机制，如果使用 `main.c` 的话可能会与实际的函数入口(含有 `int main(void)` 的)源文件冲突。
>
> 1. 在 xfusion 下所有用户程序源文件都建议添加用户前缀。
>
>    原因同上，在没有将组件打包成静态库的机制 SDK 中重复的源文件可能导致文件冲突。
>
>    xfusion 内的源文件绝大部分都添加了 `xf_` 前缀。

# 新建工程

新建工程通常有两种方式，一是通过 `xf create <工程名>` 的方式创建，二是直接复制示例到目标文件夹。

对于方式一的使用命令如下：

```bash
# 首先导出 xfsuion 环境变量
cd xfusion
. ./export.sh esp32

# 然后到您希望存放工程的文件夹
mkdir ~/project; cd ~/project

# 在此创建名为 my_first_xfusion_project 的 xfusion 工程
xf create my_first_xfusion_project

# 之后就可以编译了
cd my_first_xfusion_project
xf build
```

> [!NOTE]
> 这种方式本质上是将 `examples/get_started/template_project` 工程复制到目标目录并改名。

# 添加用户组件

用户组件工程结构与 main 的工程结构类似，均由以下部分组成：

1.  组件头文件(`foo.h`)；
1.  组件源文件(`foo.c`)；
1.  收集脚本(`xf_collect.py`)；
1.  配置菜单(`XFKconfig`)。

收集脚本 `xf_collect.py` 和配置菜单 `XFKconfig` 使用前文的内容即可，组件头文件和组件源文件示例内容如下。

1.  组件头文件(`foo.h`)；

    ```c
    #ifndef __FOO_H__
    #define __FOO_H__

    #include "xfconfig.h"
    #include "xf_utils.h"

    #ifdef __cplusplus
    extern "C" {
    #endif

    void foo(void);

    #ifdef __cplusplus
    } /*extern "C"*/
    #endif

    #endif /* __FOO_H__ */
    ```

1.  组件源文件(`foo.c`)；

    ```c
    #include "foo.h"
    static const char *const TAG = "components_test";
    void foo(void)
    {
        XF_LOGI(TAG, "CONFIG_COMPONENTS_TEST_VAL: %d", CONFIG_COMPONENTS_TEST_VAL);
        return;
    }
    ```

之后在用户主程序 `main` 中引入 `foo.h` 的头文件即可使用用户组件。

```c
#include "foo.h"
void xf_main(void)
{
    foo();
}
```

当你填充完[文件树](#file_tree)的内容后，可以使用：

```bash
xf menuconfig
```

打开配置菜单，即可在用户组件 `user components` 看到刚刚编写用户组件 `foo` 内 `XFKconfig` 的配置项了。

![image](/image/new_project_and_user_component-menu_user_foo.png)

通过 `xf build` 和 `xf flash` 命令编译烧录程序后会输出如下日志：

```
I (397)-components_test: CONFIG_COMPONENTS_TEST_VAL: 1234
```
