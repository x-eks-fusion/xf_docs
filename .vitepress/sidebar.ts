import { DefaultTheme } from "vitepress";

// 侧边栏大纲
export function sidebarTOC(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "快速入门",
            collapsed: false,
            link: "/zh_CN/get-started/",
            items: sidebarGetStarted(),
        },
        {
            text: "API 参考",
            collapsed: false,
            link: "/zh_CN/api-reference/",
            items: sidebarAPIReference(),
        },
        {
            text: "深入了解",
            collapsed: true,
            link: "/zh_CN/insight/",
            items: sidebarInsight(),
        },
        {
            text: "移植指南",
            collapsed: true,
            link: "/zh_CN/porting/",
            items: sidebarPorting(),
        },
        {
            text: "贡献指南",
            collapsed: true,
            link: "/zh_CN/contribute/",
            items: sidebarContribute(),
        },
        {
            text: "FAQ",
            collapsed: true,
            link: "/zh_CN/FAQ/",
            items: sidebarFAQ(),
        },
    ];
}

/* 快速入门 */
function sidebarGetStarted(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "介绍",
            link: "/zh_CN/get-started/introduction",
        },
        {
            text: "准备工作",
            collapsed: true,
            items: [
                {
                    text: "linux 环境搭建",
                    link: "zh_CN/get-started/preparation_with_linux.md",
                },
                {
                    text: "windows 环境搭建",
                    link: "zh_CN/get-started/preparation_with_windows.md",
                },
            ],
        },
        {
            text: "选择一个平台开始",
            collapsed: true,
            items: [
                {
                    text: "从 esp32 开始",
                    link: "/zh_CN/get-started/starting_with_esp32",
                },
                {
                    text: "从 ws63 开始",
                    link: "/zh_CN/get-started/starting_with_ws63",
                },
                {
                    text: "从 bs21 开始",
                    link: "/zh_CN/get-started/starting_with_bs21",
                },
            ],
        },
        {
            text: "编译第一个工程",
            link: "/zh_CN/get-started/build_first_project",
        },
        {
            text: "添加自己的代码",
            link: "/zh_CN/get-started/add_your_owm_code",
        },
        {
            text: "安装一个组件",
            link: "/zh_CN/get-started/install_a_component",
        },
        {
            text: "使用 vscode 插件",
            link: "/zh_CN/get-started/use_vscode_plugin",
        },
        {
            text: "xf 命令参考",
            link: "/zh_CN/get-started/xf_command_reference",
        },
    ];
}

/* API 参考 */
function sidebarAPIReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '开发 API 参考',
            link: '/xfapidocs/',
            base: 'http://coral-zone.cc',
            target: '_blank',
        },
        {
            text: '移植 API 参考',
            link: '/xfapidocs/',
            base: 'http://coral-zone.cc',
            target: '_blank',
        },
    ];
}

/* 深入了解 */
function sidebarInsight(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "xfusion 文件夹结构",
            link: "/zh_CN/insight/xfusion_structure",
        },
        {
            text: "xfusion 构建流程",
            link: "/zh_CN/insight/xfusion_build_process",
        },
        {
            text: "xf build 构建脚本",
            link: "/zh_CN/insight/xfusion_run_process",
        },
    ];
}

/* 移植指南 */
function sidebarPorting(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "平台工程移植",
        },
        {
            text: "构建对接",
        },
        {
            text: "外设对接",
        },
        {
            text: "其余对接",
        },
        {
            text: "组件移植",
            link: "/zh_CN/porting/porting_component_support",
        },
    ];
}

/* 贡献指南 */
function sidebarContribute(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "代码注释指南",
            link: "/zh_CN/contribute/code_comment_guide",
        },
        {
            text: "编码风格指南",
            link: "/zh_CN/contribute/coding_style_guide",
        },
        {
            text: "文档编写指南",
            link: "/zh_CN/contribute/documentation_guide",
        },
        {
            text: "Pull Request 提交步骤",
            link: "/zh_CN/contribute/pull_request_process",
        },
    ];
}

/* FAQ*/
function sidebarFAQ(): DefaultTheme.SidebarItem[] {
    return [
    ];
}
