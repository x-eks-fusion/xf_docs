# xfusion 构建流程

本文简要说明 xfusion 的构建流程。

---

**阅读对象：**

- 想要深入了解 `xfusion` 框架的用户以及移植开发者。

---

## export 阶段

构建之初会使用`export`脚本激活`xfuison`

windows cmd:

```cmd
.\export.bat <target>
```

windows powershell:

```powershell
.\export.ps1 <target>
```

linux:

```shell
. ./export.sh <target>
```

其目的首先是导出`XF_ROOT`、`XF_TARGET`、`XF_VERSION`、`XF_TARGET_PATH` 四个临时环境变量。关闭当前`shell`则环境变量消失。
其次，创建`python`虚拟环境（如果当前出于`python`虚拟环境中,则不创建）。
最后安装位于`tools/xf_build/`下的`xf_build`构建工具

---

## 前期判断

当我们执行`xf build`命令的时候。
会自动调用 `tools/xf_build/xf_build/xf_build/cmd/cmd.py`中的`build()`函数。
`build()`函数操作：

1. **检查是否是工程目录。**
   此检查是通过当前目录下有无`xf_project.py`实现的。
   后续会创建临时环境变量`XF_PROJECT_PATH`保存工程路径。

2. **检查当前目标有无改变。**
   这里利用了`XF_ROOT`下的`build/project_info.json`保存的`XF_TARGET_PATH`对比当前环境变量中的`XF_TARGET_PATH`是否一致。如果不一致，则调用`xf clean`命令进行清除

3. **检查当前工程有无改变。**
   这里利用了`XF_ROOT`下的`build/project_info.json`保存的`XF_PROJECT_PATH`对比当前环境变量中的`XF_PROJECT_PATH`是否一致。如果不一致，则调用`xf clean`命令进行清除

4. **执行`xf_project.py`脚本, 完成收集编译信息任务**

---

## 收集阶段

`xf_project.py`被执行后，其内容大致如下：

```python
import xf_build

xf_build.project_init()
xf_build.program()
```

`project_init()`方法位于`tools/xf_build/xf_build/xf_build/__init__.py`文件中。
主要完成默认`project`对象的创建，以及简化其方法的调用

`program()`方法位于`tools/xf_build/xf_build/xf_build/build.py`文件中。
`program()`主要的作用是：

1.  将`XF_ROOT`下的`components`文件夹下的所有文件夹视为一个个组件。
2.  将`XF_PROJECT_PATH`下的`components`文件夹下的所有文件夹视为一个个组件。
3.  将`XF_PROJECT_PATH`下的`main`视为一个组件。
4.  执行所有组件的`xf_collect.py`文件
5.  最终将所有的构建信息收集到`XF_PROJECT_PATH`下的`build/build_environ.json`中

其中`xf_collect.py`文件大致为：

```python
import xf_build

xf_build.collect()

```

`collect()`方法的`srcs`默认为`["*.c"]`、`inc_dirs`默认为`["."]`。如果不设置具体内容，则默认收集该文件夹内的所有`.c`文件。可以自定义，直接采取默认参数。

还有个参数是`requires`。主要涉及到组件之间的依赖关系。如果`A`需要`B`组件里面的函数则在`A`的`xf_collect.py`文件中的`collect()`改为`collect(requires=[B])`组件名为文件夹名。

TODO: 后续将会添加更多的指令收集，如：`cflag`等编译参数收集。

---

## 插件编译部分

上个阶段的末期会调用`XF_ROOT`下的`plugins`下的`XF_TARGET`插件。这部分需要移植者针对不同的`target`进行对应的编译插件开发。

插件开发需要完成以下几个功能：

1. 创建你所需要的`target`文件夹
2. 在`target`文件夹下创建`__init__.py`文件。该文件内容如下：
   ```python
   from .build import *
   ```
   只有该文件存在，才会被识别为一个`python`包
3. 在`target`文件夹下创建`build.py`文件。该文件内容如下：

   ```python
   import xf_build

   hookimpl = xf_build.get_hookimpl()

   class esp32():
    @hookimpl
    def build(self, args):
        """
        这里对接编译的内容。
        通过 XF_PROJECT_PATH 下的
        build/build_environ.json 文件
        生成对应的sdk构建脚本
        启动sdk的编译命令
        """

    @hookimpl
    def clean(self, args):
        """
        这里对接清除编译命令
        """

    @hookimpl
    def flash(self, args):
        """
        这里对接烧录命令
        """

    @hookimpl
    def export(self, args):
        """
        这里对接导出命令
        """

    @hookimpl
    def update(self, args):
        """
        这里对接导出更新命令
        """

    @hookimpl
    def menuconfig(self, args):
        """
        这里sdk的menuconfig命令。
        """
   ```
