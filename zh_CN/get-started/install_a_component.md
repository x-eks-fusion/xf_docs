# 安装一个组件

> [!NOTE] 作者
> kirto

本文内容主要帮助大家使用 xf 指令安装和下载一个组件。

> [!TIP] 前提
>当我们准备了一份工程并激活好 XFusion 后

# 快速在工程中添加一个组件

在我们的工程中通过以下指令可以快速添加一个 cjson 组件

```bash
xf install cjson
```

这时 cjson 就会被我们安装到组件中

```bash
📦hello
 ┣ 📂components
 ┃ ┗ 📂cjson
 ┃ ┃ ┣ 📂cJSON
 ┃ ┃ ┣ 📂example
 ┃ ┃ ┣ 📜README.md
 ┃ ┃ ┣ 📜config.json
 ┃ ┃ ┗ 📜xf_collect.py
 ┣ 📂main
 ┃ ┣ 📜xf_collect.py
 ┃ ┗ 📜xf_main.c
 ┗ 📜xf_project.py
```

在 xf_main.c 中写一个简单的示例

```c
#include "cJSON.h"
#include "cJSON_Utils.h"
#include "xf_log.h"

void xf_main(void)
{
    // 定义一个复杂的 JSON 字符串
    const char *json_string = "{\"name\":\"John\", \"age\":30, \"address\":{\"city\":\"New York\", \"zipcode\":10001}, \"contacts\":[{\"type\":\"phone\", \"value\":\"123-456-7890\"}, {\"type\":\"email\", \"value\":\"john@example.com\"}]}";

    // 解析 JSON 字符串
    cJSON *root = cJSON_Parse(json_string);
    if (root == NULL) {
        xf_log_printf("Failed to parse JSON\n");
        return;
    }

    // 定义指向目标数据的 JSON 指针路径
    const char *pointer_path = "/contacts/1/value";

    // 使用 cJSONUtils_GetPointer 获取路径中的 JSON 项
    cJSON *target_item = cJSONUtils_GetPointer(root, pointer_path);
    if (target_item == NULL) {
        xf_log_printf("Failed to find target item\n");
        cJSON_Delete(root);
        return;
    }

    // 打印目标项的值
    char *target_value = target_item->valuestring;
    if (target_value != NULL) {
        xf_log_printf("Target value: %s\n", target_value);
    } else {
        xf_log_printf("Failed to print target value\n");
    }

    // 清理
    cJSON_Delete(root);

}
```

# 如何删除组件

本质上，xf 就是通过帮你从服务器拉取组件，然后解压放到 components 下面。
删除组件可以通过直接删除指定文件夹。
也可以通过以下指令来快速移除：

```bash
xf uninstall cjson
```

# 如何查询组件

如果我们只知道我们需要一个 json 库，但是不知道名字。
可以通过以下指令来搜索我们的库

```bash
xf search json
```

xf 会通过模糊查询，查询到可能匹配的包名

![package_search](/image/package_search.png)

# 在网页上查看组件

有时候我们想要了解一下有哪些包可以用。
此时可以考虑看看我们的[网页版组件库](https://coral-zone.cc/#/component)
