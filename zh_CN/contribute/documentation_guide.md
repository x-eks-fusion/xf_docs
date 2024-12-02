# 文档指南

> [!NOTE] 作者
> ccb5, dotc

本文描述编写 XFusion 文档需要遵守的内容、格式等规范。

**前置准备：**

1. 对 markdown 语法有充分的了解，如需参考 markdown 语法，请参考 [Markdown 入门基础 | Markdown 官方教程](#Markdown-入门基础-|-Markdown-官方教程)，[Markdown-教程 | 菜鸟教程](<#Markdown-教程-|-菜鸟教程-(runoob.com)>)。
1. 对 vitepress 部分补充语法，详参: [VitePress 内置的 Markdown 扩展](#VitePress-内置的-Markdown-扩展) 。

---

# 文档仓库的获取及前置准备

## 1. 文档仓库的获取

   > [!WARNING]
   > 如需对文档系统部分进行贡献 (需要提 PR )，请勿直接克隆主仓库进行修改，请严格按以下步骤执行。

   - 文档主仓库地址: https://github.com/x-eks-fusion/xf_docs

   1. fork 主仓库到自己的账户下。
   1. 在本地克隆自己 fork 的仓库。
   1. 根据将修改的内容，创建合适的分支名，最后基于这个分支进行修改。

   - 详参:[Pull Request 提交步骤](./pull_request_process.md)

## 2. 环境的搭建

   - 如需本地预览效果,请确保已经安装 (`nodejs >= 18`) (`pnpm >= 9.2.0`) 环境。

     - nodejs 安装详见： https://nodejs.org/zh-cn/download/package-manager
     - 包管理器安装详见： https://nodejs.org/zh-cn/download/package-manager/all

## 3. 根据需要执行以下指令

```shell
# 安装依赖
npm install (必需)

# 热更新预览 (看实际需要，通常使用此命令进行边编写边查看实际渲染效果的操作)
npm run dev

# 编译静态文件 (看实际需要)
npm run build

# 预览编译后的文件 (看实际需要)
npm run preview
```

# 关于文档修改的一些操作

- 文档修改一般有如下操作:

  - 需要在侧边栏新增大纲:

    - 在文件 "**.vitepress/sidebar.ts**" 下的 "**function sidebarTOC()**" 中增加对应的大纲信息以及大纲条目描述。
    - 例 :

    ::: details 增加大纲 "深入了解"，其中有两条目: "XFusion 目录结构", "XFusion 构建流程"

    ```VitePress

    export function sidebarTOC(): DefaultTheme.SidebarItem[] {
       return [

          ......

          // 大纲项
          {
             text: "深入了解",                // 大纲名
             collapsed: false,
             link: "/zh_CN/insight/",         // 大纲文档组所在路径 (index.md)
             items: sidebarInsight(),         // 大纲的描述 (描述其下条目的名字、路径)
          },

          ......

       ];
    }
    ......

    // 大纲的描述 (描述其下条目的名字、路径)
    /* 深入了解 */
    function sidebarInsight(): DefaultTheme.SidebarItem[] {
       return [
          {
                text: "XFusion 目录结构",
                link: "/zh_CN/insight/xfusion_directory_structure",
          },
          {
                text: "XFusion 构建流程",
                link: "/zh_CN/insight/xfusion_build_process",
          },
       ];
    }

    ```

    :::

  - 需要在现有大纲中新增条目:

    - 在文件 "**.vitepress/sidebar.ts**" 下的 "**function sidebarTOC()**" 中找到对应大纲项的大纲描述，然后在大纲描述中增加对应的条目信息，以及对应文档的路径。
    - 例 :
      ::: details 在大纲 "深入了解" 中增加 1 个条目: "xf build 构建脚本"

      ```VitePress

      export function sidebarTOC(): DefaultTheme.SidebarItem[] {
         return [

            ......

            // 目标大纲项
            {
               text: "深入了解",                // 大纲名
               collapsed: false,
               link: "/zh_CN/insight/",         // 大纲文档组所在路径 (index.md)
               items: sidebarInsight(),         // 大纲的描述 (描述其下条目的名字、路径)
            },

            ......

         ];
      }
      ......

      // 大纲的描述 (描述其下条目的名字、路径)
      /* 深入了解 */
      function sidebarInsight(): DefaultTheme.SidebarItem[] {
         return [
            {
                  text: "XFusion 目录结构",
                  link: "/zh_CN/insight/xfusion_directory_structure",
            },
            {
                  text: "XFusion 构建流程",
                  link: "/zh_CN/insight/xfusion_build_process",
            },


            // 新增的 "xf build 构建脚本" 条目
            {
                  text: "xf build 构建脚本",
                  link: "/zh_CN/insight/xf_build_script",
            },
         ];
      }

      ```

      :::

# 文档内容

- 目前一般的文档主要有如下内容 :
  1.  开头标明作者。如下 :
      ```markdown
      > [!NOTE] 作者
      > <作者名称>
      ```
  2.  概述。请使用正文格式进行描述。
  3.  内容。
  4.  参考文献。

# 文档格式规范

XFusion 文档目前只提供中文，为了管理不同文档中的图片，**请将文档中使用到的图片统一放到`doc/public/image`路径下**。

编写文档时，请遵循以下**文档规则：**

1. **一个段落写在同一行内。**

   **错误**示例如下。这个示例中将一段或者一句话分成了很多行。

   ```markdown {.line-numbers}
   我是一段很长的段落。在这个段落中，我将反复强调一个观点，那就是我是一段很长很长的
   段落。这个段落的目的是为了达到一定的字数，通过不断地重复“我是一段很长的段落”来实
   现。这种写作方式可能单调，但它有效地传达了信息，即我是一段很长的段落。总之，这个
   段落的核心就是它的长度和重复性。

   尽管现在的长度已经缩减，但核心思想仍然不变。这种重复的写作手法，虽然可能显得有些
   单调，却能够清晰地传达出一个信息：我是一段很长的段落。这就是这个段落存在的意义，
   它通过简洁的语言和重复的结构，向读者展示了其核心内容。总结来说，这个段落的主旨依
   然是它的冗长和重复，这是其独特的表达方式。
   ```

   **正确**的示例如下。
   markdown 在查看时通常会打开自动换行，不需要手动换行。
   一段话一行有助于在翻译软件中快速翻译，而不需要手动删除换行。

   ```markdown {.line-numbers}
   我是一段很长的段落。在这个段落中，我将反复强调一个观点，那就是我是一段很长很长的段落。这个段落的目的是为了达到一定的字数，通过不断地重复“我是一段很长的段落”来实现。这种写作方式可能单调，但它有效地传达了信息，即我是一段很长的段落。总之，这个段落的核心就是它的长度和重复性。

   尽管现在的长度已经缩减，但核心思想仍然不变。这种重复的写作手法，虽然可能显得有些单调，却能够清晰地传达出一个信息：我是一段很长的段落。这就是这个段落存在的意义，它通过简洁的语言和重复的结构，向读者展示了其核心内容。总结来说，这个段落的主旨依然是它的冗长和重复，这是其独特的表达方式。
   ```

1. **使用自动格式化**，并注意一些格式细节。

   推荐使用 vscode 插件`esbenp.prettier-vscode`来完成格式化与 markdown 预览等功能。通过该插件可以使用`alt + shift + f`快捷键来快速格式化 markdown 文档而不用鼠标右键格式化或者手动格式化。

   1. **在中英文、数字间适当插入空格。**

      尽管很多渲染器在预览时可以自动插入空格，但还是有很多不支持。插入空格的 markdown 文档在阅读源码时更加美观。
      例如：`你说的对，但是《STM32》是由意法半导体 (ST) 推出的一系列 32 位的单片机。`。

   1. **使用`*`而不是`_`。**

      例如需要加粗的部分使用`**粗体**`、而不是`__粗体__`。
      因为`_`可能无法被正确识别，而且在输入中文时输入`_`需要频繁切换中英文输入。

   1. 代码块中**标注正确的语言种类**，以提供语法高亮。
   1. 建议在说明复杂的逻辑时使用`mermaid`、`wavedrom`绘制图表、时序图辅助说明。
   1. 不建议在 markdown 文档内使用注释，如`<!--  -->`。

1. 文件格式：

   1. 使用 3 或者 4 个空格替代`TAB`，并且**不要**使用制表符缩进代码；
   1. 行尾**不要**尾随空格；
   1. 文件编码格式为 **UTF-8** 格式；
   1. 使用 Unix 风格的 **LF** 行结束符。
   1. markdown 源码也需要保证一定的美观。
      TODO: markdown 源码格式具体规定。

# 参考文献

1. [编写文档 - ESP32 - — ESP-IDF 编程指南 latest 文档 (espressif.com)](https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32/contribute/documenting-code.html)
1. [Markdown 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/markdown/md-tutorial.html) {#Markdown-教程-|-菜鸟教程-(runoob.com)}
1. [Markdown 入门基础 | Markdown 官方教程](https://markdown.com.cn/intro.html) {#Markdown-入门基础-|-Markdown-官方教程}
1. [VitePress 内置的 Markdown 扩展](https://vitepress.dev/zh/guide/markdown) {#VitePress-内置的-Markdown-扩展}
