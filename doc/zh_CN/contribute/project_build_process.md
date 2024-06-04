# 项目构建流程（ubuntu）

项目构建大致可以分为三个部分

- export部分
- xfusion收集整理部分
- sdk编译部分

## export 部分

在使用sdk开发之前通常需要执行

```shell
source export.sh <port>
```

来激活环境，此时，我们的export.sh执行经过如下

1. 判断系统运行环境
2. 获取脚本绝对路径
3. 设置xfusion根目录
4. 设置port和port路径
5. 进入虚拟环境并安装相关依赖
6. 完成export操作

### is_sourcing

export的运行之后会进入这个函数里，它会检测当前的脚本执行是否使用source运行。由于export的部分核心是需要在当前的shell环境下临时的加入一些系统环境变量。如果是改变export.sh的权限直接执行则无法达到该效果（本质是直接执行方式该脚本会在一个新的子 shell 中运行）。

### get_script_dir

获取脚本的绝对路径，实际上这个路径也是后面的XF的根目录。本路径是后续一切路径的基础，针对不同平台做出了一些优化

### main

判断之前的script_dir是否是咱们的xfusion目录（这里为了防止用户随意移动export.sh会测试该目录下面/tools/xf_build/build.py是否有这个脚本，如果没有则表示xfusion移动过位置，则后续不执行退出）。当环境中没有XF_ROOT变量且get_script_dir无法获取位置的时候，会让我们去手动的export XF_ROOT（出现该情况可以提供issue并提供复现环境，我们会尽快的修改get_script_dir来兼容更多环境）。如果script_dir有内容且XF_ROOT没设置的情况下，会将XF_ROOT设置为script_dir。至此，根目录环境变量已经设置完毕，后续无论是脚本还是其它环境变量都会依赖该变量。

### set_port

这部分开始的时候会调用tools/export_script下面的ports_gen_kconfig.py脚本产生一个kconfig用于menuconfig设置port，并且会列出port，提供给后续操作。后续对传入的port进行判断，判断的结果如果是在我们port范围之内则通过，如果参数不对则会丢出警告并退出

### enter_virtualenv

这里会去调用tools/export_script下面的virtualenv.py脚本，检测当前是否处于虚拟环境。 如果处于虚拟环境则安装依赖库，如果不处于虚拟环境，则virtualenv.p脚本会自动创建虚拟环境，然后激活他，再安装依赖库。

### cleanup和print_value

清除临时参数，和打印关键性的全局变量（后续操作依赖它们）

## XFusion收集整理部分

经过激活环境后，我们可以执行xf的指令。

```shell
xf init temp
cd temp
xf build
```

执行编译后，主要分为以下几个阶段

### xf.py执行阶段

xf.py位于项目的 "tools/xf_build/script/xf.py"中，
当我们执行xf build 时候本质上是在执行xf.py，下面的build函数。我们通过用户工程目录下的build/build_info.json（编译后自动生成）来检测是否是刚切换的状态。如果是，则保存XF_PORT。然后扫描所有XF_ROOT、XF_ROOT/port、XF_ROOT/components/*、用户目录/*下所有的XFKConfig，并汇总整合到config.in文件，用于menuconfig。然后开始执行用户目录下的xf_project.py函数。

### xf_project.py执行阶段

 这里我们的样板工程temp里面是以下代码：

```py
import xf_build

xf_build.project_init()
xf_build.program()

```

初始化创建了一个默认的全局对象：

```py
def project_init():
    global default_project
    global program
    global collect
    global collect_srcs
    global add_folders
    default_project = xf_project()
    program = default_project.program
    collect = default_project.collect
    collect_srcs = default_project.collect_srcs
    add_folders = default_project.add_folders
```

所以主要的部分还是后面的program部分，这部分是调用了默认全局对象中的program对象。这里主要的操作是搜索XF_ROOT/components/*  用户目录/components/* 用户目录/main/*下所有的文件， 生成build_info.json然后依据这个文件生成对应的makefile文件或cmake文件用于底层的构建，最终调用XF_PORT_PATH下面的xf_cmd.py的build()来进行最终编译

## sdk编译部分

xf_cmd.py是移植者提供的文件， 该文件会最终调用命令行进行编译， 来达到最终编译固件的效果。

# 总结

总的来说， 是通过export.sh确定xf框架的路径。通过xf.py调用了所有的构建用的python文件，根据这些文件收集了需要加入编译的信息，并生成对应的工程构建文件。最终，通过底层的xf_cmd.py执行底层sdk的编译命令，进行编译。


# 部分名词的解释

XF：我们的框架简称（XFusion的简写）

port：export阶段设置的平台，比如esp32、stm32f10x。指导后续调用什么工具链

XF_ROOT：用于存放XF框架的绝对路径，这里会在export阶段被设置在系统环境变量中

XF_PORT：这里用于存放在export阶段设置的平台名称，比如esp32、stm32f10x。也是设置在系统环境变量中

XF_PORT_PATH：存放在export阶段设置的平台路径。指导收集整理阶段结尾去哪里寻找sdk的xf_cmd.py文件

xf_cmd.py：该部分用于最终调用sdk工具链编译烧录等功能的脚本，详情见《移植指南》。同时也是export阶段用于识别是否是port的依据（文件夹下面有xf_cmd.py则文件夹名是port之一，用于判断你输入的是否是port）
