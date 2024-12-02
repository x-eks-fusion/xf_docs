# 平台工程移植

> [!NOTE] 作者
> dotc

本章节介绍如何将平台 SDK 与 XFusion 关联

(可简单理解为：如何创建一个关联 XFusion 的平台侧工程)

**前置准备：**

- 了解 XFusion 的构建命令及其参数的作用。
- 会使用 python
- 简单了解 jinja 用法
- 对将要对接的平台构建流程较为熟悉

# 对接流程

## 1. 新增目标对象及目标目录

- 在 xfusion/boards 下新增一个目录，再在其下创建一个名为 "**target.json**" 的文件，此时，**该目录名**则为 xfusion 下平台环境激活以及构建时可以被选定的**目标对象名**。

  - 原因：xfusion 在进行环境激活时（. ./export.sh xxx），递归检索并收集 boards 目录下的存在 "target.json" 文件的目录的名字，将其所在的目录名加入到可激活、可构建的目标对象列表中。

- 例：将要新增 星闪芯片 ws63 的支持，目标名为 "ws63"

  1.  可以在 boards 下递归创建目录 nearlink/ws63
  1.  其后在 boards/nearlink/ws63 下创建 "**target.json**" 文件
  1.  此时不指定目标平台去执行环境激活命令（**. ./export.sh**），即可看到提示需要传入目标名，其后紧跟着当前支持的目标名，就能看的 "ws63" 在支持列表中了，如下：

      ```Bash
      user@host:. ./export.sh
      user@host:You need to choose one of the following targets: ws63 bs21 esp32
      ```

- export 激活环境过后，以下变量将会被设置：
  1. "XF_ROOT" 设置成激活的 XFusion 的跟目录。
  1. "XF_TARGET" 设置成激活的目标对象名。
  1. "XF_TARGET_PATH" 设置成激活的目标目录的路径。
  1. "XF_VERSION" 设置成激活的 XFusion 的版本。
  - 更多可查看激活命令执行时的输出信息。

## 2. 提供平台 SDK 至 XFusion

- 准备好要对接的平台的 SDK，放至 xfusion/sdks 下。
- 如果可以且需要进行版本控制，可在**目标目录**下的 "**target.json**" 文件中添加版本信息。(**_xfusion/boards/ ... /[target_name]_**，如何创建目标目录见: [新增目标对象](#1-新增目标对象) )

  - "**target.json**" 版本控制条目及说明如下：

  ```Json
  {
      "sdks":{
          "url": "https://github.com/xxxxx",
          "commit": "xxxxxx",
          "dir": "平台 SDK 在 xfusion/sdks 下的路径 (目录名)",
          "branch": "分支名"
      }
  }
  ```

## 3. 提供平台侧工程 至 XFusion (平台工程关联至 XFuison)

> [!IMPORTANT]
> 此步通用但不是必须的。
> (如：平台侧的普通工程无法存在于 SDK 外，或者难度过大，则可能没有此步骤，不提供平台侧工程至 XFusion ，而是在源 SDK 下的工程直接关联至 XFusion，不过此情况下也可参考本步骤进行对接)

1. 准备一份平台侧最简的、包含构建文件、能正常编译的平台侧原生工程，迁移或拷贝至**目标目录**下 (如：xfusion/boards/../["target_name"]，如何创建目标目录见: [新增目标对象](#1-新增目标对象) )
1. 后面将以此工程为基础，来对接 (关联) 到 XFusion，浏览下一章节 [构建对接](./porting_xfusion_build.md)
