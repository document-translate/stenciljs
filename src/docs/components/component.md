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

**Example**:<br/>
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
If `true`, the component will use [scoped stylesheets](./styling#scoped-css).

Scoped CSS is an alternative to using the native [shadow DOM](./styling.md#shadow-dom) style encapsulation.
It appends a data attribute to your styles to make them unique and thereby scope them to your component.
It does not, however, prevent styles from the light DOM from seeping into your component.

To use the native [shadow DOM](./styling#shadow-dom), see the configuration for [`shadow`](#shadow).

This option cannot be set to `true` if `shadow` is enabled.

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
If `true`, the component will use [native Shadow DOM encapsulation](./styling#shadow-dom).
It will fall back to `scoped` if the browser does not support shadow-dom natively.

`delegatesFocus` is a property that [provides focus](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus) to the first focusable entry in a component using Shadow DOM.
If an object literal containing `delegatesFocus` is provided, the component will use [native Shadow DOM encapsulation](./styling.md#shadow-dom), regardless of the value assigned to `delegatesFocus`.

When `delegatesFocus` is set to `true`, the component will have `delegatesFocus: true` added to its shadow DOM.

When `delegatesFocus` is `true` and a non-focusable part of the component is clicked:

- the first focusable part of the component is given focus
- the component receives any available `focus` styling

If `shadow` is set to `false`, the component will not use native shadow DOM encapsulation.

This option cannot be set to enabled if `scoped` is enabled.

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
Relative URL to an external stylesheet containing styles to apply to your component.
By out of the box, Stencil will only process CSS files (files ending with `.css`).
Support for additional CSS variants, like Sass, can be added via [a plugin](https://stenciljs.com/docs/plugins#related-plugins).

**示例**:<br/>
Below is an example project's directory structure containing an example component and stylesheet.

```txt
src/
└── components/
    ├── todo-list.css
    └── todo-list.tsx
```

By setting `styleUrl`, Stencil will apply the `todo-list.css` stylesheet to the `todo-list` component:

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
A list of relative URLs to external stylesheets containing styles to apply to your component.

Alternatively, an object can be provided that maps a named "mode" to one or more stylesheets.
This

By out of the box, Stencil will only process CSS files (ending with `.css`).
Support for additional CSS variants, like Sass, can be added via [a plugin](https://stenciljs.com/docs/plugins#related-plugins).

**示例**:<br/>
Below is an example project's directory structure containing an example component and stylesheet.

```txt
src/
└── components/
    ├── todo-list-1.css
    ├── todo-list-2.css
    └── todo-list.tsx
```

By setting `styleUrls`, Stencil will apply both stylesheets to the `todo-list` component:

```tsx title="Using an array of styles"
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
A string that contains inlined CSS instead of using an external stylesheet.
The performance characteristics of this feature are the same as using an external stylesheet.

When using `styles`, only CSS is permitted.
See [`styleUrl`](#styleurl) if you need more advanced features.

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

## Embedding or Nesting Components

Components can be composed easily by adding the HTML tag to the JSX code. Since the components are just HTML tags, nothing needs to be imported to use a Stencil component within another Stencil component.

Here's an example of using a component within another component:

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

The `my-parent-component` includes a reference to the `my-embedded-component` in the `render()` function.
