# Pull Request 提交步骤

本文说明 xfusion 的 Pull Request 提交步骤。

---

**阅读对象：**

- 所有需要提交代码的贡献者。

---

# Pull Request 是什么

Pull Request (以下简称 PR) 和 Merge Request (以下简称 MR) 都是代码协作中**用于请求将代码更改合并到主分支的机制。**

当你想要贡献代码到一个项目时，你通常需要从原项目中 fork 一份副本，然后在你的副本上进行更改。更改完成后，你会向原项目发起一个 Pull Request，请求项目维护者拉取(pull)你的更改并合并到他们的项目。

Pull Request 是在 GitHub 上使用的术语，而 Merge Request 通常与 GitLab 关联，只是 Merge Request 更直接地反映了请求的最终操作，即合并(merge)代码到主分支。因此 **PR 和 MR 在下文中不作区分。**

# xfusion 的 Pull Request 提交步骤

xfusion 不允许直接推送代码到主分支(main)，因此您必须先要 fork 一份副本。以下是具体的操作方法：

> 本文假设读者已经安装好了 git, 并且注册了 GitHub 账户。

1. **Fork 项目。**

   访问{xfusion 仓库链接}，并且点击页面右上角的 Fork 按钮，fork 一份 xfusion 副本。

1. **克隆仓库。**

   1. 打开您 fork 的 xfusion 仓库副本网页，点击网页上的`Code`获取 https 克隆链接。
   1. 然后打开您的本地终端，克隆您 fork 的仓库。

      ```bash
      # 克隆仓库
      git clone --recursive {您 fork 的 xfusion 仓库链接} xfusion
      cd xfusion
      # 添加上游仓库，即 xfusion 原始仓库
      git remote add upstream {xfusion 仓库链接}
      ```

   1. 创建新的分支。

      在新分支上修改，有几个优势：

      1. **能够保持主分支干净**。
      1. **易于管理**：如果你在主分支上直接进行开发，那么每次上游仓库更新时，你都需要处理合并冲突。而如果你在不同的分支上工作，就可以更容易地拉取上游的更新，并且在必要时只合并你的特定更改。
      1. **并行开发**：创建新分支可以让你同时在多个功能上工作，而不会互相干扰。这对于处理多个问题或添加多个功能特别有用。
      1. **代码审查**：在单独的分支上工作可以让其他贡献者更容易地审查你的代码，因为它们只包含相关的更改。

      可以通过以下命令创建新的分支。

      ```bash
      # 切换到新的分支
      git checkout -b local-branch
      # 推送 local-branch 到远端
      git push
      ```

1. **做出修改。**

   您的修改可以是修复代码或者文档的 bug，提交新的功能等等，xfusion 欢迎您的任何与 xfusion 发展方向相符的贡献。

   请注意，xfusion 的**每个 PR 只接受 1 个 commit**，因此每次 PR 不要涉及不同的方面。如需修改多个方面，请创建多个分支，各自修改后再提交 PR。

   1. 做出修改。

      ```bash
      # 此时已经在 local-branch 分支了
      # 做出您的修改，此处以 my-file.c 为例子
      vim my-file.c
      ```

   1. 检查风格。

      您的代码应当符合[贡献指南](./index.md)中提到的[编码风格指南](./coding_style_guide.md)等注意事项。您也可以用格式化脚本先格式化您的代码。

      ```bash
      python ${您的xfusion路径}/tools/format_code/format.py my-file.c
      ```

   1. 推送到 fork 仓库中。

      ```bash
      # 将 my-file.c 的修改添加到暂存区
      git add my-file.c
      # 提交暂存区到本地仓库，注意 commit 消息的格式，这在下文可以找到
      git commit my-file.c
      # 推送到您 fork 的 xfusion 远端仓库
      git push
      ```

      > NOTE: commit 消息的格式请见下文：👉[commit 消息的格式](#commit-消息的格式)👈

   1. 保持同步。

      当您测试了代码后就可以准备提交了。在提交前请确保您的 fork 和上游保持同步。

      ```bash
      git checkout main
      # 拉取上游，也就是 xfusion 原始仓库
      git fetch upstream
      # 合并上游到本地
      git merge upstream/main
      git push
      ```

      将本地 main 分支与本地新建的分支合并。

      ```bash
      git checkout local-branch
      git merge main
      git push
      ```

   1. 根据需要重复以上步骤。

   1. 如果你的修改已经完毕，但是有多个 commit，再提交前请用 rebase 来压缩他们。

      > 如果您不清楚如何才能压缩他们，请参考：
      > [将 Github 拉取请求压缩到一个提交中- Eli Bendersky 的网站 --- Squashing Github pull requests into a single commit - Eli Bendersky&apos;s website (thegreenplace.net)](https://eli.thegreenplace.net/2014/02/19/squashing-github-pull-requests-into-a-single-commit/)

1. **创建 Pull Request。**

   1. 在 git 仓库中选择需要合并到主分支的分支，这里是`local-branch`，点击 create Pull Request 按钮创建 Pull Request。

   1. 请确认提交前的检查清单。

   1. 签署 CLA。

   1. 创建 Pull Request 成功后，审核人员会审核您的代码，相关意见会在 Pull Request 页面中反馈给您，您需要根据意见修改。一旦审核人员认为您的修改没有问题了，请及时压缩到一个 commit，之后审核人员通过您的贡献。

# commit 消息的格式

xfusion 目前使用 vscode 插件`redjue.git-commit-plugin`生成 commit 消息。

## 格式

格式遵循 [Angular Team Commit Specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)，如下所示：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### type(类型)

必须是以下之一：

| Type         | Description                                          |
| ------------ | ---------------------------------------------------- |
| **init**     | 项目初始化                                           |
| **feat**     | 添加新特性                                           |
| **fix**      | 修复 bug                                             |
| **docs**     | 仅仅修改文档                                         |
| **style**:   | 不影响代码逻辑的更改（仅仅修空格、格式、缺少分号等） |
| **refactor** | 既不修复错误也不添加功能的代码更改                   |
| **perf**     | 优化相关，比如提升性能、体验                         |
| **test**     | 添加或纠正现有测试                                   |
| **build**    | 依赖相关的内容                                       |
| **ci**       | ci 配置相关                                          |
| **chore**    | 对构建过程或辅助工具和库（例如文档生成）的更改       |
| **revert**   | 回滚到上一个版本                                     |

### scope(修改范围)

范围可以是指定提交更改位置的任何内容。

修改范围是**必填**项目，目前使用的格式约定如下：

`最外层目录名-修改的模块`.

例如：

```txt
🐞 fix(example-gatt): 延时改xf task；修正部分log输出
📃 docs(ports-ws63): 上传readme
🐞 fix(components-xf_hal..): 更新日志等级
```

### subject(概述)

概述是对更改的简要描述：

- 使用祈使式、现在时："change" not "changed" nor "changes"。
- 不要将首字母大写。
- 结尾无点(.)。
- 最多 20 个字符。
- 目前以中文为主，不排除修改为英文的可能。

### body(详情)

用于描述此更改的详情。

### 备注

备注通常是修复 bug 的链接。

**重大变更**应以`BREAKING CHANGE:`一词开头，并带有一个空格或两个换行符。

> 格式详情见：[RedJue/git-commit-plugin: Automatically generate git commit (github.com)](https://github.com/RedJue/git-commit-plugin/tree/master)

# 本文待办事项

TODO: 1. 持续集成（CI）Continuous Integration (CI)。
TODO: 2. 替换链接`{xfusion 仓库链接}`，给出详细的步骤截图。
TODO: 3. 预 commit。
TODO: 4. git 相关教程链接。
TODO: 5. 使用 vscode 相关插件优化步骤。
TODO: 6. rebase 具体步骤。见[使用 Git 进行更改](https://nuttx.apache.org/docs/latest/contributing/making-changes.html)。
TODO: 7. 提交前的检查清单。

# 参考文献

- [使用 Git 进行更改- NuttX latest 文档 --- Making Changes Using Git — NuttX latest documentation (apache.org)](https://nuttx.apache.org/docs/latest/contributing/making-changes.html)
- [NuttX RFC 0001：代码贡献工作流- NUTTX - Apache 软件基金会 --- NuttX RFC 0001: Code Contribution Workflow - NUTTX - Apache Software Foundation](https://cwiki.apache.org/confluence/display/NUTTX/NuttX+RFC+0001%3A+Code+Contribution+Workflow)
- [贡献- LVGL 文档 --- Contributing — LVGL documentation](https://docs.lvgl.io/master/CONTRIBUTING.html)
- [投稿指南-ESP 32- - ESP-IDF 编程指南最新文档 --- Contributions Guide - ESP32 - — ESP-IDF Programming Guide latest documentation (espressif.com)](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/contribute/index.html)
- [Angular 提交格式参考表 --- Angular Commit Format Reference Sheet (github.com)](https://gist.github.com/brianclements/841ea7bffdb01346392c)
- [RedJue/git-commit-plugin: Automatically generate git commit (github.com)](https://github.com/RedJue/git-commit-plugin)
