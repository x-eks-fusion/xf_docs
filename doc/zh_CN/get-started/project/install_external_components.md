# 安装外部组件

本文介绍 xfusion 中如何通过 `xf install` 安装用户组件。

---

**阅读对象：**

- xfusion 用户。

**前置知识：**

读者应当了解以下知识：

1. 已经基于 xfusion 搭建过某个开发板的开发环境，完成过一次完整的编译、烧录、查看输出的流程。
2. 了解 xfusion 用户工程的各个组成部分及作用。

---

xfusion 每个工程都由 main 组件和用户组件组成，通过接口的方式抽象代码可以使得常用的代码在不同工程中都可用，从而提高代码的复用性。

xfusion 的组件仓库目前的地址是：

[geek-heart.com](http://www.geek-heart.com/)

可以点击上方的导航栏中的 `component` 查看现有的组件。

![alt text](/image/install_external_components-components.png)

本文以 `cJSON` 为例介绍如何实用 xfusion 的组件系统。

# JSON 和 cJSON

JSON（JavaScript 对象表示法）是一种轻量级的数据交换格式。JSON 是一种完全独立于语言的文本格式，但使用 C 系列语言的程序员熟悉的约定，包括 C、C++、C#、Java、JavaScript、Perl、Python 等。这些属性使 JSON 成为理想的数据交换语言。

JSON 建立在两个结构之上：

- 名称/值对的集合。在各种语言中，这都是作为对象、记录、结构、字典、哈希表、键控列表或关联数组来实现的。
- 值的有序列表。在大多数语言中，这是以数组、向量、列表或序列的形式实现的。

关于 JSON 的详细说明可以参考[JSON 格式 --- JSON](https://www.json.org/json-en.html)。

以下代码是一个 JSON 示例：

```json
{
  "name": "Awesome 4K",
  "resolutions": [
    {
      "width": 1280,
      "height": 720
    },
    {
      "width": 1920,
      "height": 1080
    },
    {
      "width": 3840,
      "height": 2160
    }
  ]
}
```

而 cJSON 是由 Dave Gamble 使用 ANSI C 编写的轻量级 JSON 解析器，cJSON 使用 MIT 开源协议。

# xfusion 中使用 cJSON

xfusion 已经将其集成到外部组件库中，点击[geek-heart.com](http://www.geek-heart.com/)中的 `cJSON` 组件可以看到如下页面：

![image](/image/install_external_components-cjson.png)

通过右侧的命令：

```
xf install cJSON
```

可以快速地将 `cJSON` 组件安装到用户工程中。

下文将以基于 esp-idf 的 xfusion 演示如何使用 `cJSON`。

```bash
cd ~/development # 切换到您希望存放的工程目录

# 1. 导出 esp-idf 环境变量
get_idf5.0

# 2. 导出 xfusion 环境变量，需要替换 xfusion 的路径到您实际的路径
. ~/development/xfusion/export.sh esp32

# 3. 创建一个名为 `install_ext_cpnt` 的最小工程，
xf create install_ext_cpnt

# 您可以通过 xf search 来模糊搜索当前组件库所拥有的组件
xf search json
# ┏━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━┓
# ┃ Name         ┃ Version ┃ license ┃ author     ┃
# ┡━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━┩
# │ cJSON        │ 1.7.18  │ MIT     │ DaveGamble │
# └──────────────┴─────────┴─────────┴────────────┘

# 4. 安装 cJSON
xf install cJSON
# Downloading... ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
# 15:10:39: 组件cJSON安装成功
```

安装完毕后的工程文件树如下：

```
📦install_ext_cpnt
 ┣ 📂components
 ┃ ┗ 📂cJSON
 ┃ ┃ ┣ 📂cJSON
 ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┣ 📜cJSON.c
 ┃ ┃ ┃ ┣ 📜cJSON.h
 ┃ ┃ ┃ ┣ 📜cJSON_Utils.c
 ┃ ┃ ┃ ┣ 📜cJSON_Utils.h
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📂example
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┗ 📂cJSON
 ┃ ┃ ┃ ┃ ┃ ┗ 📜xf_collect.py
 ┃ ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┃ ┣ 📜xf_collect.py
 ┃ ┃ ┃ ┃ ┗ 📜xf_main.c
 ┃ ┃ ┃ ┗ 📜xf_project.py
 ┃ ┃ ┣ 📜README.md
 ┃ ┃ ┣ 📜config.json
 ┃ ┃ ┗ 📜xf_collect.py
 ┣ 📂main
 ┃ ┣ 📜xf_collect.py
 ┃ ┗ 📜xf_main.c
 ┗ 📜xf_project.py
```

xfusion 中的 `cJSON` 组件主要由以下两部分组成：

1.  `cJSON` 源码(`components/cJSON/cJSON/`).
1.  `cJSON` 对 xfusion 移植的示例(`components/cJSON/example/`).

同样 xfusion 中的 `cJSON` 组件也包含 `xf_collect.py` 确保您下载下来后就可以立即使用。

`cJSON` 组件 xfusion 移植的示例其实也是一个完整的工程，您可以直接到 `components/cJSON/example/` 目录下使用 `xf build` 编译。

接下来将 `components/cJSON/example/main/xf_main.c` 的内容全部复制到 `main/xf_main.c` 即可使用。

```c
/* `components/cJSON/example/main/xf_main.c` 的部分内容 */
#include "xf_hal.h"
#include "cJSON.h"
#include "cJSON_Utils.h"
#define TAG "cjson"
void xf_main(void)
{
    // 定义一个复杂的 JSON 字符串
    const char *json_string = "{\"name\":\"John\", \"age\":30, \"address\":{\"city\":\"New York\", \"zipcode\":10001}, \"contacts\":[{\"type\":\"phone\", \"value\":\"123-456-7890\"}, {\"type\":\"email\", \"value\":\"john@example.com\"}]}";
    // 解析 JSON 字符串
    cJSON *root = cJSON_Parse(json_string);
    if (root == NULL) {
        XF_LOGI(TAG, "Failed to parse JSON");
        return;
    }
    // 定义指向目标数据的 JSON 指针路径
    const char *pointer_path = "/contacts/1/value";
    // 使用 cJSONUtils_GetPointer 获取路径中的 JSON 项
    cJSON *target_item = cJSONUtils_GetPointer(root, pointer_path);
    if (target_item == NULL) {
        XF_LOGI(TAG, "Failed to find target item");
        cJSON_Delete(root);
        return;
    }
    // 打印目标项的值
    char *target_value = target_item->valuestring;
    if (target_value != NULL) {
        XF_LOGI(TAG, "Target value: %s", target_value);
    } else {
        XF_LOGI(TAG, "Failed to print target value");
    }
    // 清理
    cJSON_Delete(root);
}
```

之后编译，烧录，运行查看结果。

```bash
# 5. 打开 menuconfig
xf menuconfig
# 由于头文件包含顺序的问题，可能会导致某些宏失效，暂时先关闭 xfusion 的 attribute 宏
# 将该选项设为关闭 (Top) -> system components -> xf_utils -> Common Error Configuration -> Enable attribute

# 6. 编译
xf build
# Project build complete. To flash, run this command:
# ...

# 7. 烧录并打开 esp-idf终端
xf flash monitor
# 正常情况下应当会输出如下信息
# I (500)-cjson: Target value: john@example.com
```

运行日志如下所示：

![image](/image/install_external_components-cjson_log.png)
