# Document


## 本地构建与测试

如需本地预览效果,请确保已经安装(`nodejs >= 18`)环境


- 在clone此仓库后需要安装所需依赖
```sh
npm install # 安装依赖
```

- 在开发模式查看效果
```
npm run docs:dev # 在开发模式中查看效果
```

- 构建文档产物

```sh
npm run docs:build # 在开发模式中查看效果
```

- 查看构建后的效果(预览)

```
npm run docs:preview # 在开发模式中查看效果
```
## tips
文档生成配置所在目录 `doc/.vitepress` 目录下的 `config` 文件或者 `config`目录
vitepress会自动导入 config文件或者`config`文件夹下的`index.mts`文件

其中的字段 sidebar 表示配置 侧边栏 ,`nav`表示配置导航栏,具体细节可以参考 `vitepress` 官方文档


- [nodejs Dist](https://nodejs.org/dist/)
- [vitepress](https://vitepress.dev/zh/guide/getting-started)