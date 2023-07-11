---
sidebar_label: Component
description: Documentation for the @Component decorator
slug: /component
---

# Component 装饰器{#component-decorator}

`@Component()` 是一个将 TypeScript 类指定为 Stencil 组件的装饰器。每个 Stencil 组件在构建时都被转换为 web 组件。

```tsx
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
  // 附加选项
})
export class TodoList {
  // implementation omitted
}
```

## Component 选项{#component-options}

`@Component()`装饰器接受一个参数，一个包含组件配置选项的对象字面量。这允许对每个组件进行单独配置，以适应每个项目的独特需求。

下面描述了每个选项、其类型以及是否为必需选项。

### tag

**Required**

**Type: `string`**

**Details:**<br/>
这个值设置了 Stencil 将生成的自定义元素的名称。为了遵守[HTML 规范](https://html.spec.whatwg.org/#valid-custom-element-name)，标签名称必须包含一个破折号('-')。

理想情况下，标签名是全局唯一的值。
拥有全局唯一的值有助于防止与全局的 `CustomElementsRegistry` 发生命名冲突，在全局 `CustomElementsRegistry` 中定义了所有自定义元素。
建议为同一个集合中的所有组件选择唯一的前缀。

**示例**:<br/>

```tsx
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
})
export class TodoList {
  // implementation omitted
}
```

编译后，`Todolist` 中定义的组件可以在 HTML 或其他 TSX 文件中使用:

```html
<!-- Here we use the component in an HTML file -->
<todo-list></todo-list>
```

```tsx
{
  /* Here we use the component in a TSX file */
}
<todo-list></todo-list>;
```

### assetsDirs

**Optional**

**Type: `string[]`**

**Details:**<br/>
`assetsDirs` 是包含组件所需的静态文件(assets)的目录的相对路径数组。

**示例**:<br/>
下面是一个示例项目的目录结构，其中包含一个示例组件和资产目录。

```txt
src/
└── components/
    ├── assets/
    │   └── sunset.jpg
    └── todo-list.tsx
```

下面，`todo-list` 组件将使用 Stencil 的 [`getAssetPath()`](../guides/assets.md#getassetpath) 从 `assets/` 目录中
正确加载 `sunset.jpg` 图像。

```tsx
import { Component, Prop, getAssetPath, h } from "@stencil/core";

@Component({
  tag: "todo-list",
  // 1. assetsDirs lists the 'assets' directory as a relative (sibling)
  // directory
  assetsDirs: ["assets"],
})
export class TodoList {
  image = "sunset.jpg";

  render() {
    // 2. the asset path is retrieved relative to the asset base path to use in
    // the <img> tag
    const imageSrc = getAssetPath(`./assets/${this.image}`);
    return <img src={imageSrc} />;
  }
}
```

在上面的例子中，以下代码允许 `todo-list` 显示提供的资源:

1. `TodoList`的`@Component()`装饰器具有`assetsDirs`属性，并列出文件的兄弟目录`assets/`。这将把`assets`目录复制到分发目录。
2. Stencil 的 [`getAssetPath()`](../guides/assets#getAssetPath) 用于检索 `<img>` 标签中使用的图像的路径

有关配置资产的更多信息，请参阅 Stencil 的 [Assets Guide](../guides/assets.md)

### scoped

**Optional**

**Type: `boolean`**

**Default: `false`**

**Details:**<br/>
如果为 `true`，组件将使用 [scoped stylesheets](./styles#scoped-css)。

有作用域的 CSS 是使用原生的[shadow DOM](./styling#shadow-dom)风格封装的替代方案。它将数据属性添加到样式中，以使它们独一无二，从而将它们限定在组件的范围内。
然而，它并不能阻止轻量级 DOM 的样式渗入到组件中。

要使用原生的 [shadow DOM](./styling#shadow-dom), 请查看
[`shadow`](#shadow)。

如果启用了 `shadow` ，则此选项不能设置为 `true`。

**示例**:<br/>

```tsx
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
  scoped: true,
})
export class TodoList {
  // implementation omitted
}
```

### shadow{#shadow}

**Optional**

**Type: `boolean | { delegatesFocus: boolean }`**

**Default: `false`**

**Details:**<br/>
如果为 `true`，组件将使用[原生 Shadow DOM 封装](./styles#Shadow-DOM)。如果浏览器原生不支持 shadow-dom，它将回退到 `scoped`。

`delegatesFocus` 是一个使用 Shadow DOM 为组件中的第一个可聚焦条目[提供焦点](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus)的属性。

如果提供了一个包含 `delegatesFocus` 的对象字面量，则组件将使用[原生 Shadow DOM 封装](./styling#shadow-dom)，而不管赋给 `delegatesFocus` 的值是什么。

当 `delegatesFocus` 设置为 `true` 时，组件的影子 DOM 中会添加 `delegatesFocus: true`。

当 `delegatesFocus` 为 `true` 时，组件的不可聚焦部分被点击：

- 组件的第一个可聚焦部分被赋予焦点
- 组件接收任何可用的 `focus` 样式

如果 `shadow` 设置为 `false`，组件将不会使用原生的 shadow DOM 封装。

如果启用了 `scoped` ，则不能将此选项设置为启用。

**示例 1**:<br/>

```tsx
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
  shadow: true,
})
export class TodoList {
  // implementation omitted
}
```

**示例 2**:<br/>

```tsx
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
  shadow: {
    delegatesFocus: true,
  },
})
export class TodoList {
  // implementation omitted
}
```

### styleUrl

**Optional**

**Type: `string`**

**Details:**<br/>
外部样式表的相对 URL，其中包含要应用于组件的样式。
默认情况下，Stencil 将只处理 CSS 文件(以`.css`结尾的文件)。
对其他 CSS 变体的支持，如 Sass，可以通过[插件](https://stenciljs.com/docs/plugins#related-plugins)添加。

**示例**:<br/>
下面是一个示例项目的目录结构，其中包含一个示例组件和样式表。

```txt
src/
└── components/
    ├── todo-list.css
    └── todo-list.tsx
```

通过设置 `styleUrl`， Stencil 将把 `todo-list.css` 样式表应用到 `todo-list` 组件上:

```tsx
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
  styleUrl: "./todo-list.css",
})
export class TodoList {
  // implementation omitted
}
```

### styleUrls

**Optional**

**Type: `string[] | { [modeName: string]: string | string[]; }`**

**Details:**<br/>
外部样式表的相对 url 列表，其中包含要应用于组件的样式。
此外，还可以提供一个对象，将命名的 "mode" 映射到一个或多个样式表。

默认情况下，Stencil 将只处理 CSS 文件(以`.css`结尾的文件)。
对其他 CSS 变体的支持，如 Sass，可以通过[插件](https://stenciljs.com/docs/plugins#related-plugins)添加。

**示例**:<br/>
下面是一个示例项目的目录结构，其中包含一个示例组件和样式表。

```txt
src/
└── components/
    ├── todo-list-1.css
    ├── todo-list-2.css
    └── todo-list.tsx
```

通过设置 `styleUrls`， Stencil 将把这两个样式表应用到' todo-list'组件上：

```tsx
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
  styleUrls: ["./todo-list-1.css", "./todo-list-2.css"],
})
export class TodoList {
  // implementation omitted
}
```

```tsx title="Using modes"
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
  styleUrls: {
    ios: "todo-list-1.ios.scss",
    md: "todo-list-2.md.scss",
  },
})
export class TodoList {
  // implementation omitted
}
```

### styles

**Optional**

**Type: `string | { [modeName: string]: any }`**

**Details:**<br/>
包含内联 CSS 而不是使用外部样式表的字符串。
这个特性的性能特征与使用外部样式表相同。

当使用 `styles` 时，只允许使用 CSS。
如果你需要更多高级功能，请参阅 [`styleUrl`](# styleUrl)。

**示例**:<br/>

```tsx
import { Component } from "@stencil/core";

@Component({
  tag: "todo-list",
  styles: "div { background-color: #fff }",
})
export class TodoList {
  // implementation omitted
}
```

## 嵌入或嵌套组件{#embedding-or-nesting-components}

通过向 JSX 代码中添加 HTML 标记，可以轻松地组合组件。由于组件只是 HTML 标记，所以不需要在另一个 Stencil 组件中导入 Stencil 组件。

下面是在一个组件中使用另一个组件的例子：

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "my-embedded-component",
})
export class MyEmbeddedComponent {
  @Prop() color: string = "blue";

  render() {
    return <div>My favorite color is {this.color}</div>;
  }
}
```

```tsx
import { Component, h } from "@stencil/core";

@Component({
  tag: "my-parent-component",
})
export class MyParentComponent {
  render() {
    return (
      <div>
        <my-embedded-component color="red"></my-embedded-component>
      </div>
    );
  }
}
```

`my-parent-component` 的 `render()` 函数中包含了 `my-embedded-component` 的引用。
