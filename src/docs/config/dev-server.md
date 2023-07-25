---
description: 集成的 Dev Server 配置
---

# 集成开发服务器{integrated-dev-server}

为了简化开发，Stencil 附带了一个集成的开发服务器。通过集成构建过程和开发服务器，Stencil 能够大大改善开发体验，而不需要复杂的构建脚本和配置。在应用构建和重新构建的过程中，编译器能够与开发服务器通信，反之亦然。

## 热模块替换{#hot-module-replacement}

编译器已经提供了监视模式，但加上开发服务器，它还能更进一步，只重新加载浏览器中发生变化的内容。热模块替换允许应用程序将其状态保持在浏览器内，同时在文件保存后切换出具有更新逻辑的单个组件。

## Style 替换{##style-replacement}

Web 组件可以带有自己的 css，可以使用 shadow dom，还可以有单独的样式标签。传统上，实时重新加载外部 css 链接通常可以做到这一点，然而，在 shadow root 中更新具有内联样式的组件一直是一个挑战。通过集成的开发服务器，Stencil 能够动态更新所有组件的样式，无论它们是否使用 shadow dom，而不需要刷新页面。

## 开发中的错误{#development-errors}

当开发过程中发生错误时，例如打印语法错误，Stencil 不仅会在控制台中记录错误和错误来源，还会将错误覆盖在应用程序上，以便于阅读。

## 在编辑器中打开{#open-in-editor}

当在浏览器中显示开发错误并覆盖项目时，指向源文本的行号是可以点击的，这将直接在你的 IDE 中打开源文件。

## Dev Server 配置{#dev-server-config}

| 属性             | 描述                                                                                                                                                                    | 默认值    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `address`        | 开发服务器使用的 IP 地址。默认值是 `0.0.0.0`，指向本地机器上的所有 IPv4 地址，例如`localhost`。                                                                         | `0.0.0.0` |
| `basePath`       | 服务器使用的基础路径。默认为根路径名。                                                                                                                                  | `/`       |
| `https`          | 默认情况下，开发服务器通过 http 协议运行。相反，您可以通过提供自己的 SSL 证书和密钥通过 https 运行它(见下面的示例)。                                                    | `false`   |
| `initialLoadUrl` | 开发服务器首先打开的 URL。                                                                                                                                              | `/`       |
| `logRequests`    | 对服务器的每个请求都会在终端中记录下来。                                                                                                                                | `false`   |
| `openBrowser`    | 默认情况下，启动开发服务器时，会在默认浏览器中打开本地开发 URL。但是，为了防止这个 URL 被打开，请将此值更改为`false`。                                                  | `true`    |
| `reloadStrategy` | 当监视和更新文件时，默认情况下开发服务器将使用 `hmr` (热模块替换)来更新页面，而无需刷新整个页面。要让页面完全刷新，请使用 `pageReload`。要禁用任何重载，请使用 `null`。 | `hmr`     |
| `port`           | 设置服务器的端口。                                                                                                                                                      | `3333`    |

## 示例{#example}

```tsx
import { readFileSync } from "fs";
import { Config } from "@stencil/core";

export const config: Config = {
  devServer: {
    reloadStrategy: "pageReload",
    port: 4444,
    https: {
      cert: readFileSync("cert.pem", "utf8"),
      key: readFileSync("key.pem", "utf8"),
    },
  },
};
```
