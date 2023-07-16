---
description: 升级到 Stencil v4.0.0
---

# 升级到 Stencil v4.0.0

## 快速上手{#getting-started}

我们建议您只从 Stencil v3 升级到 Stencil v4。
如果你落后了几个版本，我们建议每次升级一个主要版本(从 v1 到 v2，然后 v2 到 v3，最后 v3 到 v4)。
这将减少你必须同时处理的破坏性更改的数量。

有关该库之前主要版本中引入的重大更改，请参见：

- [Stencil v3 破坏性变更](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v300)
- [Stencil v2 破坏性变更](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-two)
- [Stencil v1 破坏性变更](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-one)

对于使用 Stencil v3 的项目，请安装最新版本的 Stencil v4： `npm install @stencil/core@4`

## 更新代码{#updating-your-code}

### 新的配置默认值{#new-configuration-defaults}

从 Stencil v4.0.0 开始，一些配置选项的默认配置值发生了变化。
下面几节将介绍已更改的配置选项、它们的新默认值，以及退出新行为(如果适用)的方法。

#### `transformAliasedImportPaths`

TypeScript 项目可以通过[`tsconfig.json` 配置文件中的 `paths`](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)来指定路径别名，如下所示：

:::code-group

```json [tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@utils": ["src/utils/index.ts"]
    }
  }
}
```

:::

在上面的例子中，当 TypeScript 执行类型解析时， `"@utils"` 将被映射为字符串 `"src/utils/index.ts"`。
然而，TypeScript 编译器不会将这些路径从键转换为值，作为输出的一部分。
相反，它依赖于打包/加载器来完成转换。

转换路径别名的能力是在 [Stencil v3.1.0](https://github.com/ionic-team/stencil/releases/tag/v3.1.0) 中作为一个可选特性引入的。
以前，用户必须在他们的 `stencil.config.ts` 文件中使用 `transformAliasedImportPaths` 显式启用此功能:

:::code-group

```ts [stencil.config.ts]
// 在 Stencil v3.1.0 启用 'transformAliasedImportPaths'
import { Config } from "@stencil/core";

export const config: Config = {
  transformAliasedImportPaths: true,
  // ...
};
```

:::

从 Stencil v4.0.0 开始，默认启用此功能。
以前启用此功能的项目从 Stencil v3.1.0 以上迁移，可以安全地从其 Stencil 配置文件中删除该标志。

对于使用此新默认值时遇到问题的用户，我们鼓励您[在 Stencil GitHub repo 上提交一个新问题](https://github.com/ionic-team/stencil/issues/new?assignees=&labels=&projects=&template=bug_report.yml&title=bug%3A+)。

作为一种变通方法，可以将此标志设置为 `false` 以禁用默认功能。

:::code-group

```ts [stencil.config.ts]
// 在 Stencil v4.0.0 中 禁用 'transformAliasedImportPaths'
import { Config } from "@stencil/core";

export const config: Config = {
  transformAliasedImportPaths: false,
  // ...
};
```

:::

有关此标志的更多信息，请参阅[配置文档](../config/overview#transformaliasedimportpaths)

#### `transformAliasedImportPathsInCollection`

在 [Stencil v2.18.0](https://github.com/ionic-team/stencil/releases/tag/v2.18.0) 中引入的 `transformAliasedImportPathsInCollection`
是 [`dist` 输出目标](../output-targets/dist#transformAliasedImportPathsInCollection) 上的配置标志。
`transformAliasedImportPathsInCollection` 转换导入路径，类似于[`transformAliasedImportPaths`](# transformAliasedImportPaths)。
然而，此标志仅为收集输出目标是否启用 `transformAliasedImportPaths` 功能。

从 Stencil v4.0.0 开始，默认启用此标志。
以前启用此功能的项目，如果从 Stencil v2.18.0+ 迁移，则可以安全地从其 Stencil 配置文件中删除该标志。

对于使用此新默认值时遇到问题的用户，我们鼓励您[在 Stencil GitHub repo 上提交一个新问题](https://github.com/ionic-team/stencil/issues/new?assignees=&labels=&projects=&template=bug_report.yml&title=bug%3A+)。
作为一种变通方法，可以将此标志设置为 `false` 以禁用默认功能。

:::code-group

```ts [stencil.config.ts]
// 在 Stencil v4.0.0 禁用 'transformAliasedImportPathsInCollection'
import { Config } from "@stencil/core";

export const config: Config = {
  outputTargets: [
    {
      type: "dist",
      transformAliasedImportPathsInCollection: false,
    },
    // ...
  ],
  // ...
};
```

:::

有关此标志的更多信息，请参阅[`dist` 输出目标的文档](../output-targets/dist#transformaliasedimportpathsincollection)。

### 移除浏览器内编译支持删除{#in-browser-compilation-support-removed}

在 Stencil v4.0.0 之前，组件可以在浏览器中从 TSX 编译为 JS。
这个功能很少使用，已经从 Stencil 中删除了。
目前，还没有替代功能。
有关更多详细信息，请参阅 Stencil GitHub 讨论页面的[评论请求](https://github.com/ionic-team/stencil/discussions/4134)。

### Legacy Context and Connect APIs Removed

Previously, Stencil supported `context` and `connect` as options within the `@Prop` decorator.
Both of these APIs were deprecated in Stencil v1 and are now removed.

```ts
@Prop({ context: 'config' }) config: Config;
@Prop({ connect: 'ion-menu-controller' }) lazyMenuCtrl: Lazy<MenuController>;
```

To migrate away from usages of `context`, please see [the original deprecation announcement](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#propcontext).
To migrate away from usages of `connect`, please see [the original deprecation announcement](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#propconnect).

### 移除对旧版浏览器的支持{#legacy-browser-support-removed}

在 Stencil v3.0.0 中，我们宣布[不再支持 IE 11、非 Chromium 内核 Edge 和 Safari 10](https://github.com/ionic-team/stencil/blob/1a8ff39073a88d1372beaa98434dbe2247f68a85/BREAKING_CHANGES.md?plain=1#L78)。
在 Stencil v4.0.0 中，对这些浏览器的支持已被放弃(有关受支持浏览器的完整列表，请参阅我们的[浏览器支持策略](../reference/support-policy#browser-support))。

取消这些浏览器后，Stencil 配置文件中的一些配置选项将不再有效：

#### `__deprecated__cssVarsShim`

`extras.__deprecated__cssVarsShim` 选项导致 Stencil 包含一个 [CSS 变量](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)。
这个字段应该从项目的 Stencil 配置文件(`stencil.config.ts`)中删除。

#### `__deprecated__dynamicImportShim`

`extras.__deprecated__dynamicImportShim` 选项导致 Stencil 包含一个
[动态 `import()` 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
的 polyfill 在运行时使用。
这个字段应该从项目的 Stencil 配置文件(`stencil.config.ts`)中删除。

#### `__deprecated__safari10`

`extras.__deprecated__safari10` 选项将为 Safari 10 的 ES 模块支持打补丁。
这个字段应该从项目的 Stencil 配置文件(`stencil.config.ts`)中删除。

#### `__deprecated__shadowDomShim`

`extras.__deprecated__shadowDomShim` 选项将检查当前浏览器中需要是否需要 [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
垫片，如果需要，就包含。
这个字段应该从项目的 Stencil 配置文件(`stencil.config.ts`)中删除。

### 移除了旧缓存统计配置标志{#legacy-cache-stats-config-flag-removed}

`enableCacheStats` 标志用于缓存的遗留行为，但已经有一段时间没有使用了。
这标记已从 Stencil 的 API 中删除，应该从项目的 Stencil (`stencil.config.ts`) 配置文件中删除。

### 移除 Node 14 支持{#drop-node-14-support}

Stencil 不再支持 Node 14。
请升级本地开发机器、持续集成管道等，以使用 Node v16 或更高版本。
有关支持的运行时的完整列表，请参阅[我们的支持策略](../reference/support-policy#javascript-runtime)。

## Information Included in `docs-json` Expanded

在 Stencil v4 中对 `docs-json` 输出目标中包含的信息进行了扩展，以包含有关 Stencil 组件属性和方法类型的更多信息。

有关此更改的更多内容，请参阅 JSON 文档输出目标的 [文档中新的 `supplementalpublictypes`](../documentation-generation/docs-json#supplementalpublictypes) 选项。

### `JsonDocsEvent`

`@Event` 的 json 格式的文档现在包含了一个名为 `complexType` 的字段，它包含了该属性的类型声明中引用的类型的更多信息。

这是 Ionic 框架中 `Modal` 组件上的 [ionBreakpointDidChange 事件](https://github.com/ionic-team/ionic-framework/blob/1f0c8049a339e3a77c468ddba243041d08ead0be/core/src/components/modal/modal.tsx#L289-L292)的示例:

```json
{
  "complexType": {
    "original": "ModalBreakpointChangeEventDetail",
    "resolved": "ModalBreakpointChangeEventDetail",
    "references": {
      "ModalBreakpointChangeEventDetail": {
        "location": "import",
        "path": "./modal-interface",
        "id": "src/components/modal/modal.tsx::ModalBreakpointChangeEventDetail"
      }
    }
  }
}
```

### `JsonDocsMethod`

`@Method` 的 json 格式文档现在包含了一个名为 `complexType` 的字段，它包含了该属性的类型声明中引用的类型的更多信息。

Here's an example of what this looks like for the [open
method](https://github.com/ionic-team/ionic-framework/blob/1f0c8049a339e3a77c468ddba243041d08ead0be/core/src/components/select/select.tsx#L261-L313)
on the `Select` component in Ionic Framework:

这是 Ionic 框架中 `Select` 组件上的 [open 方法](https://github.com/ionic-team/ionic-framework/blob/1f0c8049a339e3a77c468ddba243041d08ead0be/core/src/components/select/select.tsx#L261-L313)的示例:

```json
{
  "complexType": {
    "signature": "(event?: UIEvent) => Promise<any>",
    "parameters": [
      {
        "tags": [
          {
            "name": "param",
            "text": "event The user interface event that called the open."
          }
        ],
        "text": "The user interface event that called the open."
      }
    ],
    "references": {
      "Promise": {
        "location": "global",
        "id": "global::Promise"
      },
      "UIEvent": {
        "location": "global",
        "id": "global::UIEvent"
      },
      "HTMLElement": {
        "location": "global",
        "id": "global::HTMLElement"
      }
    },
    "return": "Promise<any>"
  }
}
```

## 其它的包{#additional-packages}

为了确保其他 `@stencil/` 包的正常运行，建议使用到下面提到的任何包的项目都将包升级到指定的最小包版本。

| Package                          | 最小软件包版本                                                                                                           | GitHub                                                            | 文档                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| `@stencil-angular-output-target` | [0.7.1](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Fangular-output-target%400.7.1) | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/angular.md)     |
| `@stencil/sass`                  | [3.0.4](https://github.com/ionic-team/stencil-sass/releases/tag/v3.0.4)                                                  | [GitHub](https://github.com/ionic-team/stencil-sass)              | [GitHub README](https://github.com/ionic-team/stencil-sass) |
| `@stencil/store`                 | [2.0.8](https://github.com/ionic-team/stencil-store/releases/tag/v2.0.8)                                                 | [GitHub](https://github.com/ionic-team/stencil-store)             | [Stencil Doc Site](../guides/store.md)                      |
| `@stencil-react-output-target`   | [0.5.1](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Freact-output-target%400.5.1)   | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/react.md)       |
| `@stencil-vue-output-target`     | [0.8.6](https://github.com/ionic-team/stencil-ds-output-targets/releases/tag/%40stencil%2Fvue-output-target%400.8.6)     | [GitHub](https://github.com/ionic-team/stencil-ds-output-targets) | [Stencil Doc Site](../framework-integration/vue.md)         |

## 需要帮助升级？{#need-help-upgrading}

请务必查看 Stencil [v4.0.0 破坏性变更指南](https://github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v400)。

如果您需要帮助升级，请在 [Stencil Discord](https://chat.stenciljs.com) 上发帖。
