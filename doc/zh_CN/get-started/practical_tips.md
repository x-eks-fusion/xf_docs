# 实用技巧

本文介绍在使用 xfusion 开发过程中可以提升速度或变得更加方便的实用技巧。

---

**阅读对象：**

- xfusion 用户。

---

# VSCode 配置

## C/C++ 配置

使用以下 VSCode C/C++ 可以在编写代码时有正确的语法提示。

创建 `.vscode/c_cpp_properties.json`​，并加入以下内容：

```json
{
  "configurations": [
    {
      "name": "esp32",
      "compilerPath": "<家路径>/.espressif/tools/xtensa-esp32-elf/esp-2022r1-11.2.0/xtensa-esp32-elf/bin/xtensa-esp32-elf-gcc",
      "includePath": ["${workspaceFolder}/**"],
      "cStandard": "gnu99",
      "cppStandard": "gnu++98",
      "compileCommands": "<xfusion路径>/boards/espressif/esp32/build/compile_commands.json"
    },
    {
      "name": "ws63",
      "compilerPath": "<xfusion路径>/sdks/ws63_1.10.t7/tools/bin/compiler/riscv/cc_riscv32_musl_b090/cc_riscv32_musl_fp/bin/riscv32-linux-musl-gcc",
      "includePath": ["${workspaceFolder}/**"],
      "cStandard": "gnu99",
      "cppStandard": "gnu++98",
      "forcedInclude": [
        "<xfusion路径>/sdks/ws63_1.10.t7/output/ws63/acore/ws63-liteos-app/mconfig.h"
      ],
      "compileCommands": "<xfusion路径>/sdks/ws63_1.10.t7/output/ws63/acore/ws63-liteos-app/compile_commands.json"
    }
  ],
  "version": 4,
  "enableConfigurationSquiggles": true
}
```

注意将以上配置的 `<家路径>` ​ 和 `<xfusion路径>` ​ 替换为正确的路径。

有智能感知时可以自动将宏展开，以及代码提示等功能。

使用时打开代码，点击右下角 `C / C++ 配置`​ 并根据当前目标平台选择配置。

​![image](/image/practical_tips-select_intellisense.png)​

编译后有正确的代码提示。

​![image](/image/practical_tips-macro_expanded.png)​

## VSCode 工作区配置

以下工作区配置设置了格式化程序 astyle，同时推荐了工作区插件。

创建 `xfusion.code-workspace`​，并加入以下内容：

```json
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
    "C_Cpp.intelliSenseEngine": "default",
    "astyle.executable": "${workspaceFolder}/tools/format_code/astyle/astyle-3.4.12-linux-x64",
    /* https://astyle.sourceforge.net/astyle.html */
    "astyle.cmd_options": [
      "--style=1tbs",
      "--indent=spaces=4",
      "--attach-namespaces",
      "--attach-classes",
      "--pad-oper",
      "--pad-header",
      "--unpad-paren",
      "--unpad-brackets",
      "--squeeze-lines=2",
      "--align-pointer=name",
      "--align-reference=name",
      "--keep-one-line-statements",
      "--convert-tabs",
      "--max-code-length=120"
    ],
    "editor.defaultFormatter": "chiehyu.vscode-astyle"
  },
  "extensions": {
    "recommendations": [
      "chiehyu.vscode-astyle",
      "ms-vscode.cpptools-extension-pack",
      "cschlosser.doxdocgen",
      "redjue.git-commit-plugin",
      "eamodio.gitlens",
      "shd101wyy.markdown-preview-enhanced",
      "gruntfuggly.todo-tree",
      "esbenp.prettier-vscode"
    ]
  }
}
```

之后打开工作区即可。
