# Linux 环境搭建

> [!NOTE] 作者
> kirto

本文主要介绍在 Linux 环境中如何搭建 XFusion 开发环境

> [!WARNING] 前提条件
> - **环境搭建前，需要先简单查看 [选择一个平台开始](index.md) 下，对应平台所支持的开发环境，是否支持此处将要搭建的环境 (Linux)**

# 前置准备

如果没有安装 python, 请先安装 python 3.8 以上的版本的 python.

```bash
sudo apt-get install python3 python3-pip
```

如果环境中有 python3， 但是没有 python , 可以创建 python 的软连接

```bash
sudo ln -s /usr/bin/python3 /user/bin/python
```

还需要安装 [git](https://git-scm.com/) 方便拉取源码

```bash
sudo apt-get git
```

# 安装 XFusion

1. 克隆仓库
  ```bash
  git clone --recurse-submodules https://github.com/x-eks-fusion/xfusion.git
  ```
2. 激活 XFusion
  ```bash
  cd xfusion             # 进入 XFusion 文件夹
  . ./export.sh <target> # 激活指定的芯片
  ```
  > [!WARNING]⚠️注意
  > 每次打开一个新的终端，如果想要用 XFusion 都需要激活一次

  由于这个操作比较常用，所以我们可以通过在 .bashrc 中通过 alias 命令，设置一个别名。

  ```bash
  vim ~/.bashrc # 根据不同 shell ，zsh 就是 .zshrc
  ```
  进入 vim 界面后，输入 <kbd>Shift</kbd>+<kbd>g</kbd>，跳转到最后一行。
  按下 <kbd>o</kbd> 插入自己的命令。
  ```bash
  alias get_xf=". ~/xfusion/export.sh"   # 双引号后面是 XFusion 路径
  ```
  然后通过 <kbd>Esc</kbd> 退出编辑。
  最后通过 <kbd>:</kbd>+<kbd>w</kbd>+<kbd>q</kbd>，即"<kbd>:wq</kbd>", 再加上回车确认保存。

  至此，重启终端后。每次激活只需要输入：
  ```bash
  get_xf
  ```
