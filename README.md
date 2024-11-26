# Document


## 本地构建与测试

如需本地预览效果,请确保已经安装 (`nodejs >= 18`) (`pnpm >= 9.2.0`) 环境。

nodejs 安装详见： https://nodejs.org/zh-cn/download/package-manager
包管理器安装详见： https://nodejs.org/zh-cn/download/package-manager/all


```shell
# 安装依赖
npm install

# 热更新预览
npm run dev

# 编译静态文件
npm run build

# 预览编译后的文件
npm run preview
```

使用 yarn 平替 npm 请留意小于 (`yarn 4.5`) 版本不要提交 `yarn.lock` 文件。

```shell
# 安装依赖
yarn

# 热更新预览
yarn dev

# 编译静态文件
yarn build

# 预览编译后的文件
yarn preview
```


## tips

文档生成配置所在目录 `.vitepress` 目录下的 `config` 文件或者 `config` 目录
vitepress会自动导入 config文件或者 `config` 文件夹下的 `index.mts` 文件

具体配置细节请参考 `vitepress` 官方文档

- [vitepress](https://vitepress.dev/zh/guide/getting-started)

### github actions

`deploy.yml` 配置依赖于 `yarn.lock` 文件，(`yarn 1.2x`) 与 (`yarn 4.5`) 版本 lock 文件差异较大，请避免使用 yarn 导致提交不同的 lock。
若使用 github actions 配合 GitHub 自动生成页面，请保证 github `{path}/settings/actions` 页面内单选项全部选择顶部第一个。

在第一次生成后，将 `gh-pages` 分支(详见配置 `deploy.yml`) 设为 GitHub pages，后续页面更新由 actions 自动完成。
