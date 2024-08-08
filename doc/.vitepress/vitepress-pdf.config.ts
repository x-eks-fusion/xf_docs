import type { DefaultTheme } from 'vitepress'
import { defineUserConfig } from 'vitepress-export-pdf'

import userConfig from './config/index.mjs'

function extractLinksFromConfig(config: DefaultTheme.Config) {
  const links: string[] = [
    "/document/zh_CN/api-reference/index",
    "/document/zh_CN/get-started/index",
    "/document/zh_CN/get-started/practical_tips",
    "/document/zh_CN/get-started/starting_with_ws63",
    "/document/zh_CN/get-started/starting_with_esp32",
    "/document/zh_CN/get-started/project/index",
    "/document/zh_CN/get-started/project/install_external_components",
    "/document/zh_CN/get-started/project/new_project_and_user_component",
    "/document/zh_CN/insight/index",
    "/document/zh_CN/insight/xfusion_structure",
    "/document/zh_CN/insight/xfusion_build_process",
    "/document/zh_CN/insight/xfusion_run_process",
    "/document/zh_CN/insight/component_development_guide",
    "/document/zh_CN/insight/porting/index",
    "/document/zh_CN/insight/porting/porting_new_platform_support",
    "/document/zh_CN/insight/porting/porting_component_support",
    "/document/zh_CN/introduction/index",
    "/document/zh_CN/contribute/index",
    "/document/zh_CN/contribute/code_comment_guide",
    "/document/zh_CN/contribute/coding_style_guide",
    "/document/zh_CN/contribute/documentation_guide",
    "/document/zh_CN/contribute/pull_request_process",
  ].map((item)=>`${item}.html`)

  function extractLinks(sidebar: DefaultTheme.SidebarItem[]) {
    for (const item of sidebar) {
      if (item.items)
        extractLinks(item.items)

      else if (item.link)
        links.push(`${item.link}.html`)
    }
  }

  for (const key in config.sidebar)
    extractLinks(config.sidebar[key])

  return links
}

const links = extractLinksFromConfig(userConfig.themeConfig!)
const routeOrder = [
  // '/document/zh_CN/index.html',
  ...links,
]

const headerTemplate = `<div style="margin-top: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: center; align-items: center; color: lightgray; border-bottom: solid lightgray 1px; font-size: 10px;">
  <span class="title">Xfusion</span>
</div>`

const footerTemplate = `<div style="margin-bottom: -0.4cm; height: 70%; width: 100%; display: flex; justify-content: flex-start; align-items: center; color: lightgray; border-top: solid lightgray 1px; font-size: 10px;">
  <span style="margin-left: 15px;" class="url">xfusion document</span>
</div>`


export default defineUserConfig({
  outFile: 'xfusion.pdf',
  outDir: 'pdf-vitepress',
  pdfOptions: {
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
    margin: {
      bottom: 60,
      left: 25,
      right: 25,
      top: 60,
    },
  },
  urlOrigin: 'https://coralzone.github.io/',
  sorter: (pageA, pageB) => {
    const aIndex = routeOrder.findIndex(route => route === pageA.path)
    const bIndex = routeOrder.findIndex(route => route === pageB.path)
    return aIndex - bIndex
  },
})