import fs from "fs";
import type { DefaultTheme } from 'vitepress';
import { defineUserConfig } from 'vitepress-export-pdf';
import { sidebarTOC } from './sidebar';

function extractLinksFromDir(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    // 遍历所有文件
    files.forEach((file) => {
        if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
            // 如果是文件夹，则递归调用函数
            extractLinksFromDir(`${dirPath}/${file}`, arrayOfFiles);
        } else {
            // 如果是文件，则添加到数组中
            let file_name = `${dirPath}/${file}`.replace(".md", ".html");
            // arrayOfFiles.push(file_name.replace("./doc/", "/document/"));
            arrayOfFiles.push(file_name);
        }
    });

    return arrayOfFiles;
}
const all_files = extractLinksFromDir(".", []);
const side_links: string[] = [];
const exc_files: string[] = [];
function extractLinks(sidebar: DefaultTheme.SidebarItem[]) {
    for (const item of sidebar) {
        if (item.items) {
            if (item.link && item.base == undefined) {
                side_links.push(`${item.link}index.html`);
            }
            extractLinks(item.items);
        } else if (item.link) {
            if (item.link.endsWith("/")) {
                side_links.push(`${item.link}index.html`);
            } else {
                side_links.push(`${item.link}.html`);
            }
        }
    }
}
extractLinks(sidebarTOC());

// 未添加到侧边栏的 md 文件将被忽略
for (const i of all_files) {
    if (side_links.indexOf(i) == -1) {
        if (i.indexOf("index") != -1) {
            exc_files.push("!**" + i);
        }
    }
}

export default defineUserConfig({
    outFile: 'xfusion.pdf',
    outDir: 'public',
    pdfOptions: {
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        outline: false,
        margin: {
            bottom: 60,
            left: 25,
            right: 25,
            top: 60,
        },
    },
    routePatterns: [
        ...exc_files,
    ],
    sorter: (pageA, pageB) => {
        const aIndex = side_links.findIndex(route => route === pageA.path);
        const bIndex = side_links.findIndex(route => route === pageB.path);
        return aIndex - bIndex;
    },
});