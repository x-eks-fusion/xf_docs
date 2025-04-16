# Windows 环境搭建

> [!NOTE] 作者
> kirto

本文主要介绍在 Windows 环境中如何搭建 XFusion 开发环境

> [!WARNING] 前提条件
> - **环境搭建前，需要先简单查看 [选择一个平台开始](index.md) 下，对应平台所支持的开发环境，是否支持此处将要搭建的环境 (Windows)**

# 前置准备

如果没有安装 python, 请先安装 python 3.8 以上的版本的 [python](https://www.python.org/downloads/release/python-3106/).

![python_install](/image/python_install.png)

> [!WARNING]⚠️注意
> 安装时勾选 Add Python 3.10 to PATH 方便命令行调用

![python_installer](/image/python_installer.png)

还需要安装 [git](https://git-scm.com/) 方便拉取源码

![git_install](/image/git_install.png)

# 安装 XFusion

1. 克隆仓库
  ```bash
  git clone --recurse-submodules https://github.com/x-eks-fusion/xfusion.git
  ```
2. 激活 XFusion
    如果是 powershell：
    ```powershell
    cd xfusion             # 进入 XFusion 文件夹
    ./export.ps1 <target> # 激活指定的芯片
    ```

    如果是 cmd：

    ```cmd
    cd xfusion             # 进入 XFusion 文件夹
    .\export.bat <target> # 激活指定的芯片
    ```
    > [!WARNING]⚠️注意
    > 每次打开一个新的终端，如果想要用 XFusion 都需要激活一次

  由于这个操作比较常用，所以我们可以通过在添加系统环境变量让这个脚本可以在任意路径下使用。

  1. 复制当前 XFusion 的绝对路径
  2. <kbd>win</kbd>+<kbd>s</kbd> 打开微软搜索
  3. 搜索`编辑系统环境变量`
  4. 选择环境变量
    ![windows_edit_environment](/image/windows_edit_environment.png)
  5. 选择`系统变量`中的`Path`，点击编辑
    ![windows_edit_path](/image/windows_edit_path.png)
  6. 点击`新建`，然后粘贴我们之前复制的 XFusion 的绝对路径
  7. 点击`确定`
  8. 打开一个新的 cmd 或者 powershell，现在我们可以在任意路径下使用 export.bat（powershell是export.ps1）了。

