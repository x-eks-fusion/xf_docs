# 构建对接

> [!NOTE] 作者
> dotc

本章节介绍如何对接 XFusion 构建部分

(可简单理解为：如何将 XFusion 的工程的构建 (编译) 信息给到平台侧的工程，一起进行构建)

**前置准备：**

- 了解 xfusion 的构建命令及其参数的作用。
- 会使用 python
- 简单了解 jinja 用法
- 对将要对接的平台构建流程较为熟悉
- 已完成 [平台工程移植](porting_xfusion_build.md) 的步骤 (本章节默认已经完成该步骤)

# 目前需要对接的基础功能有

# 对接流程

## 1. 对接构建方法

1. 在 **xfusion/plugins** 下 新增一个目录，目录名需要与目标目录名 (**_xfusion/boards/ ... /[target_name]_**) 一致（或者说与环境激活时 (. ./export.sh [target_name])，传入的目标对象名一致）。

   - 原因：xfusion 在进行构建时 (如： xf build)，会在 xfusion/plugins 下 搜寻环境激活的目标对象名的同名目录，执行其下的构建插件脚本。

2. 在 xfusion/plugins/[target_name]/ 下，创建 "\***\*init**.py\*\*" 文件，其内容如下：

   ```Python
   from .build import *
   ```

3. 在 xfusion/plugins/[target_name]/ 下，创建 "**build.py**" 文件，并按要求及需要实现各个回调方法。

- build.py 中回调方法的对接：

  - build : 对接编译方法

    - 可简单理解为：将 XFusion 下的工程构建信息便捷转换为平台侧的构建信息，然后一起参与编译。

    - build 方法对接通常有以下步骤 (简述):

      1. 提供模板文件（\*.j2，普通模板与组件模板）（基于 jinja 模板引擎）
      1. 调用模版系统解析方法，配合模板文件（\*.j2），解析 xf 侧工程的编译信息 (**build_environ.json**，详情浏览下面 <u>"xf 执行编译时的执行过程 (xf 工程目录下)："的第 1 点</u>)，
         生成平台侧可用的构建信息文件（如 xx.mk、CMakeLists.txt、xx.cmake 等）
      1. 将新生成的构建信息文件（平台侧可用的）加入到平台侧工程进行编译

    - xf 编译时的执行过程 (xf 工程目录下)：
      1. xf 构建系统会收集 xf 侧的编译相关信息参与编译的文件、includepath、编译选项、CFLAGS、组件信息等），并生成至 **xf 工程目录下** 的 **build 目录下** **build_environ.json** 文件中。
      1. xf 构建系统执行此插件文件的 **build** 方法。
    - build 方法一般为以下步骤（详情）（需由移植开发者编写）：

      > 关于模板文件如何编写参考 jinja 文档或已存在的其他平台的模板文件

      - 根据需要调用对应的模版解析方法及传入对应的模板文件，
        对 xf 工程 build 目录下的 **build_environ.json** 文件进行解析。
        方法目前有两种：

        1. 普通模板解析方法：

           ```Python
           def apply_template(temp, save, replace=None):
           temp：普通模板文件
           save：解析完后保存的文件路径（包含名字）
           replace（可选）：
           ```

           1. 读取 build_environ.json 文件
           1. jinja 模板引擎加载传入的模板文件进行解析
           1. 接收解析结果，转存至指定的文件（传入的 save 参数）

        1. 组件模板解析方法（非必须，也可自行通过 普通模板解析方法 实现组件解析）

           ```Python
           def apply_components_template(temp, suffix):
               temp：组件模板文件
               suffix：解析完后保存的文件的名字或后缀。
           ```

           1. 读取 **build_environ.json** 文件
           1. jinja 模板引擎加载传入的组件模板文进行解析：

              - 遍历 **public_components** 、 **user_components** 组件集合下的各组件项，每项单独根据组件模板进行解析生成单独的文件，存储的位置会根据 **build_environ.json** 中的层次结构进行目录创建，文件名会根据传入参数 suffix 进行生成：

                - 如果是 suffix 是类似 “xxx” 的文件名形式，则会生成 “xxx” 的文件
                - 如果是 suffix 是类似 “.xxx” 的后缀形式，则会生成组件名（又或者说是所在目录名）同名的后缀是 “.xxx” 的文件。

              - 例如：public_components 下有组件 xf_hal，
                解析生成文件后会 xf 工程 build 目录下，会出现 build/public_components/xf_hal/ 的目录结构，在 xf_hal 下：

                - 如果传入 suffix 是 “CMakeLists.txt”，则会生成 CMakeLists.txt 文件；
                - 如果传入 suffix 是 “.mk”，则会生成 xf_hal.mk 文件；

    - clean : 对接清除方法。(略)

    - flash : 对接下载方法。(略)

    - export : 对接工程导出方法。(略)

    - update : 对接（导出的）工程更新方法。(略)

    - menuconfig : 对接目标平台的 menuconfig。(略)

    - clean : 对接清除方法。(略)

    ::: details build.py 内容的模板及注解如下 ：

    ```Python

    import xf_build
    from xf_build import api
    """
    构建可能用的方法：
    exec_cmd : 命令执行（ menuconfiig 命令不能使用该方法）
    apply_template : 普通模板解析方法
    apply_components_template :组件模板解析方法
    cd_to_root : 跳转至 xf 根目录
    cd_to_target :跳转至激活的目标目录（平台侧工程）
    cd_to_project : 跳转至 xf 工程目录
    更多可用的方法浏览 "from xf_build import api" 导入的 api
    """

    """
    为了兼容多开放平台（win、linux等）的目录路径，
    **常见目录操作请使用 pathlib 方法而不是 os.path 下的方法**，
    这是一种面向对象的方法，构建好目录对象后就可以执行对象下的目录操作方法。
    如：
    路径对象构建：my_nepath:Path = dir_path / "filename.cmake"
    检查路径存在与否：my_nepath.exists()
    更多方法及说明参考 pathlib 相关文档或源码
    """
    from pathlib import Path

    hookimpl = xf_build.get_hookimpl()

    class **[target_name]**():    #  [target_name] 为新增的目标名

        # 执行 xf build 时会调用的钩子（回调）函数
        # 对接编译方法。
        @hookimpl
        def build(self, args):
            pass

        # 执行 xf clean 时会调用的钩子（回调）函数
        #  对接清除方法
        @hookimpl
        def clean(self, args):
            pass

        # 执行 xf flash 时会调用的钩子（回调）函数
        # 对接下载方法
        @hookimpl
        def flash(self, args):
            pass

        # 执行 xf export 时会调用的钩子（回调）函数
        # 对接工程导出方法
        @hookimpl
        def export(self, args):
            pass

        # 执行 xf update 时会调用的钩子（回调）函数
        # 对接（导出的）工程更新方法
        @hookimpl
        def update(self, args):
            pass

        # 执行 xf menuconfig sub 时会调用的钩子（回调）函数
        # 对接目标平台的 menuconfig
        @hookimpl
        def menuconfig(self, args):
        # 注意，执行目标平台的 menuconfig 命令时，不要使用 api.exec_cmd 进行执行，
        # 需要使用 os.system 执行
            pass

    ```

    :::

## 2. 验证

- 在任意普通的 xf 工程下，激活目标环境，然后执行 "xf build"，查看编译信息等是否显示编译成功。

## 至此，构建对接完毕

- 后面需对接的是 xf_sys 的部分
