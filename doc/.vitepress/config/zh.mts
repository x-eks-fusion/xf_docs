import { DefaultTheme, defineConfig } from "vitepress";

// 导航栏
function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "首页",
      link: "/zh_CN/",
    },
    {
      text: "介绍",
      link: "/zh_CN/introduction/",
    },
    {
      text: "快速开始",
      link: "/zh_CN/get-started/",
    },
  ];
}

// 项目贡献
function contribute(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "代码注释指南",
      link: "code_comment_guide",
    },
    {
      text: "编码风格指南",
      link: "coding_style_guide",
    },
    {
      text: "文档指南",
      link: "documentation_guide",
    },
    {
      text: "移植示例(stm32f103ze)",
      link: "porting_example_platform_support_stm32f103ze",
    },
    {
      text: "移植示例",
      link: "porting_example_xf_uart_porting",
    },
    {
      text: "移植指南",
      link: "porting_guide",
    },
    {
      text: "项目构建流程（ubuntu）",
      link: "project_structure",
    },
    {
      text: "项目结构",
      link: "project_structure",
    },
    {
      text: "Pull Request 提交步骤",
      link: "pull_request_process",
    },
    {
      text: "工作流程",
      link: "workflow",
    },
  ];
}

// xfusion 快速开始
function getStarted(): DefaultTheme.SidebarItem {
  return {
    text: "快速入门",
    link: "/zh_CN/get-started/",
    collapsed: false,
  };
}

function introduction(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "入门",
      link: "/zh_CN/introduction/",
      collapsed: false,
    },
  ];
}

export default defineConfig({
  lang: "zh_CN",
  base: "/docs/",
  title: "XFusion",
  description: "为开发者提供统一且便于开发的接口的嵌入式系统",
  themeConfig: {
    nav: nav(),
    sidebar: [
        {
        text: "介绍",
        link:"introduction/",
        base:"/zh_CN/"
      },
      getStarted(),
      {
        text:"源码结构",
        link:"/zh_CN/source_tree/",
      },
      {
        text: "贡献指南",
        base: "zh_CN/contribute/",
        items: contribute(),
      },
    ],
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});
