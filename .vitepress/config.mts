import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import { sidebarTOC } from './sidebar';

import vuetify from 'vite-plugin-vuetify';
import UnoCSS from 'unocss/vite';



// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: "/document",
    title: 'XFusion',
    description: 'A VitePress Site',
    appearance: false,
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        sidebar: [
            ...sidebarTOC(),
            {}
        ],

        outline: {
            label: "大纲",
            level: [1, 6],
        },

        lastUpdated: {
            text: "最后更新于",
            formatOptions: {
                dateStyle: "short",
                timeStyle: "medium",
            },
        },
    },
    lastUpdated: true,
    // 重置原版布局文件
    vite: {
        ssr: {
            noExternal: [/\.css$/, /^vuetify/],
        },
        plugins: [
            UnoCSS(),
            vuetify(),
        ],
        resolve: {
            alias: [
                {
                    find: /^.*\/VPSidebar\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./theme/component/VPSidebar.vue', import.meta.url)
                    )
                },
            ]
        }
    }
});
