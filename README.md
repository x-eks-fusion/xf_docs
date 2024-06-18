# Document


## 本地构建与测试

如需本地预览效果,请确保已经安装(`nodejs >= 18`)环境

```shell
# 安装依赖
npm install

# 在开发模式中查看效果
npm run docs:dev

# 编译为静态文件
npm run docs:build

# 在开发模式中查看效果
npm run docs:preview
```


## tips

文档生成配置所在目录 `doc/.vitepress` 目录下的 `config` 文件或者 `config`目录
vitepress会自动导入 config文件或者`config`文件夹下的`index.mts`文件

其中的字段 sidebar 表示配置 侧边栏 ,`nav`表示配置导航栏,具体细节可以参考 `vitepress` 官方文档


- [nodejs Dist](https://nodejs.org/dist/)
- [vitepress](https://vitepress.dev/zh/guide/getting-started)


### github actions

`deploy.yml` 配置依赖于 `yarn.lock` 文件。若使用 github actions 配合 GitHub 自动生成页面，
请保证 github `{path}/settings/actions` 页面内单选项全部选择顶部第一个。

在第一次生成后，将 `gh-pages` 分支(详见配置 `deploy.yml`) 设为 GitHub pages，后续页面更新由 actions 自动完成。
