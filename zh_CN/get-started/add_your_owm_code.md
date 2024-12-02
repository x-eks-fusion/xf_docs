# 添加自己的代码

> [!NOTE] 作者
> kirto

本文主要介绍如何在一个 XFusion 工程上添加自己的源代码和头文件。

> [!TIP] 前提
>当我们准备了一份工程并激活好 XFusion 后

# 简单的添加独立文件

## main 文件夹中添加文件

当我们需要添加一些应用层代码 .c .h 文件的时候。
我们可以考虑在工程内的 main 文件夹添加。
由于 main 文件夹中工程收集脚本 `xf_collect.py` 中的 [xf_build.collect()](../insight/xf_build_script.md#collect) 方法自动收集 main 文件下的源文件。
所以，如果在 main 文件夹下面添加文件是不用修改 `xf_collect.py` 的。

```bash
📦hello
 ┣ 📂main
 ┃ ┣ 📜my_code.c
 ┃ ┣ 📜my_code.h
 ┃ ┣ 📜xf_collect.py
 ┃ ┗ 📜xf_main.c
 ┗ 📜xf_project.py
```

## main 文件夹中添加子文件夹

当我们的文件较多的时候，会考虑用文件夹管理文件。
此时将文件夹加入 main 文件夹中。

```bash
📦hello
 ┣ 📂main
 ┃ ┣ 📂my_code
 ┃ ┃ ┣ 📜my_code.c
 ┃ ┃ ┗ 📜my_code.h
 ┃ ┣ 📜xf_collect.py
 ┃ ┗ 📜xf_main.c
 ┗ 📜xf_project.py
```

由于新增的文件是在子文件夹中，所以我们需要修改 `xf_collect.py` 进行手动添加

```python

import xf_build

srcs=["*.c", "my_code/*.c"]
inc_dirs = [".", "my_code"]
xf_build.collect(srcs, inc_dirs)

```
---

除了上述方法外，你还可以在你的子文件夹中复制一份 xf_collect.py

```bash
📦hello
 ┣ 📂main
 ┃ ┣ 📂my_code
 ┃ ┃ ┣ 📜my_code.c
 ┃ ┃ ┣ 📜my_code.h
 ┃ ┃ ┗ 📜xf_collect.py
 ┃ ┣ 📜xf_collect.py
 ┃ ┗ 📜xf_main.c
 ┗ 📜xf_project.py
```

xf 指令会扫描 main 下面的 xf_collect.py 运行，但是不会添加子文件夹的 xf_collect.py 。
所以，子文件夹的 xf_collect.py下 需要添加一个 `import my_code.xf_collect` 

```python

import xf_build
import my_code.xf_collect

xf_build.collect()

```

# 添加一个自己的组件

当我们要添加一个独立的组件时候，不是很希望和 main 文件夹挤在一起。
于是，我们可以通过创建 `components` 文件夹。
xf 指令会扫描 main 下面的 xf_collect.py 。components的子文件夹的 xf_collect.py 也会被收集。
所以，我们只需要加一个  xf_collect.py 就可以。

```bash
📦hello
 ┣ 📂components
 ┃ ┗ 📂my_code
 ┃ ┃ ┣ 📜my_code.c
 ┃ ┃ ┣ 📜my_code.h
 ┃ ┃ ┗ 📜xf_collect.py
 ┣ 📂main
 ┃ ┣ 📜xf_collect.py
 ┃ ┗ 📜xf_main.c
 ┗ 📜xf_project.py
```

用户文件夹的 xf_collect.py 内容和 main 的 xf_collect.py 保持一致就行。
但是一定要是 `📂components` 的子文件夹。

```python

import xf_build

xf_build.collect()

```

# 添加一个独立的文件夹

如果你的文件夹不希望放到 components 里面。那么也没关系，你可以放到工程中你喜欢的文件夹中。

```bash
📦hello
 ┣ 📂main
 ┃ ┣ 📜xf_collect.py
 ┃ ┗ 📜xf_main.c
 ┣ 📂my_code
 ┃ ┣ 📜my_code.c
 ┃ ┣ 📜my_code.h
 ┃ ┗ 📜xf_collect.py
 ┗ 📜xf_project.py
```

但是需要在 `xf_project.py` 中写清楚文件夹的路径。

```python
import xf_build

user_dirs = ["my_code"]

xf_build.project_init(user_dirs)
xf_build.program()

```

