# 构建对接

**阅读对象：**

- 需要添加新的平台或芯片构建相关支持的移植开发者。

**前置知识：**

- 了解 xfusion 的构建命令及其参数的作用。
- 会使用 python
- 简单了解 jinja 用法
- 对将要对接的平台构建流程较为熟悉

# 对接流程

## 新增目标对象名

在 xfusion/boards 下新增一个目录，再在其下创建一个名为 “target.json” 的文件，此时，该目录名则为平台环境激活以及构建时可以被选定的目标对象名。

原因：xfusion 在进行环境激活时（. ./export.sh xxx），递归检索并收集 boards 目录下的存在 “target.json” 文件的目录的名字，将其所在的目录名加入到可激活、可构建的目标对象列表中。

- 如：将要新加 星闪芯片 ws63

  1.  可以在 boards 下递归创建目录 nearlink/ws63
  2.  其后在 boards/nearlink/ws63 下创建 “target.json” 文件
  3.  此时不指定目标平台去执行环境激活命令（. ./export.sh），即可看到提示需要传入目标名，其后紧跟着当前支持的目标名，就能看的 “ws63” 在支持列表中了，如下：

      ```Bash
      user@host:. ./export.sh
      user@host:You need to specify a target: ws63 esp32
      ```

## 对接构建方法

1. 在 xfusion/plugins 下 新增一个目录，目录名需要与步骤 ① 中最终包含“target.json” 文件的目录的名字一致（或者说与执行构建命令时，传入的目标对象名一致）。

   原因：xfusion 在进行构建时，会通过执行构建命令时传入的目标对象名在 xfusion/plugins 下 搜寻同名目录，执行其下的构建插件脚本。

2. 在 xfusion/plugins/[new_target]/ 下，创建 “**init**.py”文件，其内容如下：

   ```Python
   from .build import *
   ```

3. 在 xfusion/plugins/[new_target]/ 下，创建 “[build.py](http://build.py)”文件并按要求及需要实现各个回调方法， 其模板内容及注解如下：

   ```Python
   """
   导入此处构建可能能用的方法：
   exec_cmd：命令执行（ menuconfiig 命令不能使用该方法）
   apply_template：普通模板解析方法
   apply_components_template：组件模板解析方法
   get_define：（？待）
   cd_to_root：跳转至 xf 根目录
   cd_to_target：跳转至编译目标（平台侧工程）所在的目录（？待）
   cd_to_project：跳转至 xf 工程目录
   """
   import xf_build
   from xf_build import api

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
   class **[new_target]**():    #  [new_target] 为新增的目标名

       # 执行 xf build 时会调用的钩子（回调）函数
       # 对接编译方法。
       @hookimpl
       def build(self, args):
       """
       对接工作通常只需：
       1、提供模板文件（*.j2，普通模板与组件模板）（基于 jinja 模板引擎）
       2、调用模版系统解析方法，配合模板文件（*.j2），
           解析 xf 侧工程的编译信息，生成平台侧可用的构建信息文件
           （如xx.mk、CMakeLists.txt、xx.cmake等）
       3、将生成的构建信息文件（平台侧可用的）加入到平台侧工程进行编译

       在 xf 工程目录下执行 xf build 时的执行流程：
       1、xf 构建系统会收集 xf 侧的编译相关信息
           （参与编译的文件、includepath、编译选项、CFLAGS、组件信息等），
           并生成至工程目录下的 build 目录下 build_environ.json 文件中。
       2、xf 构建系统执行此插件文件的 build 方法，一般为以下步骤（需由移植开发者编写）：
           模板文件编写参考 jinja 文档或参考已存在的其他平台的模板文件
           A、根据需要调用对应的模版解析方法及传入对应的模板文件，
           对 xf 工程 build 目录下的 build_environ.json 文件进行解析，
           方法目前有两种：
           普通模板解析方法
           def apply_template(temp, save, replace=None):
               temp：普通模板文件
               save：解析完后保存的文件路径（包含名字）
               replace（可选）：
               1、读取 build_environ.json 文件
               2、jinja 模板引擎加载传入的模板文件进行解析
               3、接收解析结果，转存至指定的文件（传入的 save 参数）

           组件模板解析方法（非必须，也可自行通过 普通模板解析方法 实现组件解析）
           def apply_components_template(temp, suffix):
               temp：组件模板文件
               suffix：解析完后保存的文件的名字或后缀。
               1、读取 build_environ.json 文件
               2、jinja 模板引擎加载传入的组件模板文进行解析，
               具体表现为：
               遍历 public_components、user_components 组件集合
               下的各组件项，每项单独根据组件模板进行解析生成单独的文件，
               存储的位置会根据 build_environ.json 中的层次结构进行目录创建，
               文件名会根据传入参数 suffix 进行生成：
                   如果是 suffix 是类似 “xxx” 的文件名形式，则会生成 “xxx” 的文件
                   如果是 suffix 是类似 “.xxx” 的后缀形式，则会生成组件名（又或者说是所在目录名）
               同名的后缀是 “.xxx” 的文件。
               例如：public_components 下有组件 xf_hal，
               解析生成文件后会 xf 工程 build 目录下，
               会出现 build/public_components/xf_hal/ 的目录结构，
               在 xf_hal 下：
                   如果传入 suffix 是 “CMakeLists.txt”，则会生成 CMakeLists.txt 文件；
                   如果传入 suffix 是 “.mk”，则会生成 xf_hal.mk 文件；

           B、将步骤 A 中生成的平台侧可用的构建信息文件加入到平台侧工程进行编译。

       """
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

## 至此，构建对接完毕
