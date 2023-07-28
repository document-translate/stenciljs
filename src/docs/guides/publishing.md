---
description: 发布组件库
---

# 发布组件库

有许多策略可以发布和分发组件库以供外部项目使用。Stencil 的一个好处是可以很容易地生成适合你用例的各种[输出目标](../output-targets/overview)。

## 发布到 NPM

第一步，也是强烈推荐的一步是[发布组件库到 NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)。
NPM 是一个在线软件注册中心，用于共享库、工具、实用程序和包等。一旦这个库发布到 NPM 上，其他项目就可以将你的组件库作为依赖添加到它们自己的项目中，并在自己的项目中使用这些组件。

## `package.json`

`package.json` 文件的目的是向其他工具提供如何查找包文件的说明，并提供有关包的信息。
例如，打包工具如 [Rollup](https://rollupjs.org/) 和 [Webpack](https://webpack.js.org/) 使用此配置来定位项目的入口文件。

使用编译器的一个好处是，它能够提供关于如何最好地设置发行版项目的帮助。以下是在项目的 `package.json` 文件中常见的设置:

```json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.js",
  "es2015": "dist/esm/index.mjs",
  "es2017": "dist/esm/index.mjs",
  "types": "dist/types/components.d.ts",
  "unpkg": "dist/my-project-name/my-project-name.esm.js",
  "collection:main": "dist/collection/index.js",
  "collection": "dist/collection/collection-manifest.json",
  "files": ["dist/", "css/", "loader/"]
}
```

| Property | 描述                                                  | 推荐                              |
| -------- | ----------------------------------------------------- | --------------------------------- |
| `main`   | CommonJS 模块的入口文件                               | `dist/index.cjs.js`               |
| `module` | ES 模块的入口文件， ES 模块是标准化的推荐格式         | `dist/index.js`                   |
| `es2015` | 通常用于框架打包。                                    | `dist/esm/index.mjs`              |
| `es2017` | 通常用于框架打包。                                    | `dist/esm/index.mjs`              |
| `types`  | 项目类型的入口文件。                                  | `dist/types/components.d.ts`      |
| `unpkg`  | 项目 [unpkg](https://unpkg.com/) CDN 请求的入口文件。 | `dist/{NAMESPACE}/{NAMESPACE}.js` |
| `files`  | npm 发行版中应该包含的文件数组。                      | `["dist/", "loader/"]`            |

`collection`属性用于在其他 Stencil 应用程序中延迟加载。

:::info 提示
如果你同时分发了 `dist` 和 `dist-custom-elements`，那么最好选择其中一个作为主要入口。
:::
