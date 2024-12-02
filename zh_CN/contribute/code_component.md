# 移植示例 - 添加组件支持

> [!NOTE] 作者
> kirto

本文说明如何给 xf 包管理仓库添加新的包

# 仓库说明

仓库地址：[https://github.com/x-eks-fusion/xf_components](https://github.com/x-eks-fusion/xf_components)

该仓库用于保存组件贡献者贡献的仓库。由于我们并不希望组件仓库强依赖 XF 本身的框架，所以，组件分为解耦部分和 xfusion 移植部分。当您使用本仓库的组件且正在使用 xfusion 的时候。可以通过

```shell
xf search <组件名>
```

进行模糊搜索功能。
通过：

```shell
xf install <组件名>
```

则可以将组件下载并解压到当前工程的 components 文件夹中，提供给您使用
通过：

```shell
xf uninstall <组件名>
```

则可以删除卸载对应的组件

# 贡献说明

对移植者的要求比较高。组件的提供必须要完成中间层、移植层和示例等。

## 中间层

中间层要求：

- 禁止依赖底层的操作部分需要自行抽象成对阶层，对接部分可以是宏定义，可以是函数声明，可以是函数指针，可以是弱定义等方式。
- 尽量直接依赖标准库，依赖标准库需要提前宏定义，方便替换
- 可以依赖第三方符合我们标准的解耦中间层，需要在 config.json 中说明
- 解耦中间层的配置可以依赖移植层的 xxx_config.h 文件
- 这部分可以是单独仓库（子模块），也可以是和移植部分在一起

## 移植层

移植层要求：

- 依赖 xfusion 层的基础操作，将解耦中间层的对接部分简化
- 对 xfusion 层需要的抽象操作需要写明依赖
- 尽量不要依赖特定的底层功能，如有需要，例如：硬件加速图像计算等需求。应当提供对应的宏予以选择
- 移植层需要对接解耦中间层的配置，修改成 XFConfig 的操作，方便用户使用 menuconfig 进行配置

## 示例

移植者需要提供至少一个示例，提供在移植了 xfusion 后，如何调用的完整流程。说明文件要大致说明示例目标，menuconfig 的配置，编译过程，运行结果。

## README.md

说明文件，需要简单介绍仓库的功能

## config.json

```json
{
  "name": "cJSON", // 组件名称
  "author": "DaveGamble", // 组件作者
  "version": "1.7.18", // 组件版本
  "license": "Apache-2.0", // 组件开源协议
  "keywords": [], // 关键词
  "description": "A collection of useful cmake utilities", // 组件简要描述
  "url": "https://github.com/DaveGamble/cJSON", // 组件链接
  "dependencies": {}, // 依赖组件以及版本
  "links": {
    "Homepage": "https://www.json.org/json-en.html", // 主页链接
    "Issues": "https://github.com/DaveGamble/cJSON/issues" // issue链接
  }
}
```

## 其它

移植者如果是移植别人的中间层，则需要标明别人中间层的仓库来源链接，仓库的作者以及开源协议。
如果需要配置的文件，可以使用 XFConfig 进行配置。

# 贡献过程

1. fork [文档仓库](https://github.com/x-eks-fusion/xf_components)
2. 添加自己的仓库文件夹
3. 添加 config.json
4. 添加[XFConfig](https://www.kernel.org/doc/html/latest/kbuild/kconfig-language.html)
5. 提交 PR 合并到主仓库
