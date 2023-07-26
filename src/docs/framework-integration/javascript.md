---
description: Components without a Framework
---

# 在没有使用框架时使用组件

在没有 JavaScript 框架的情况下，将使用 Stencil 构建的组件集成到项目中是很简单的。如果你使用的是一个简单的 HTML 页面，你可以通过一个 script 标签来添加组件。
例如，如果我们发布了一个组件到 npm，我们可以通过 CDN 这样加载该组件：

```html
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic.js"></script>
  </head>
  <body>
    <ion-toggle></ion-toggle>
  </body>
</html>
```

或者，如果你想利用 ES 模块，可以使用 import 语句包含组件。

```html
<html>
  <head>
    <script type="module">
      import { defineCustomElements } from "https://cdn.jsdelivr.net/npm/@ionic/core/loader/index.es2017.mjs";
      defineCustomElements();
    </script>
  </head>
  <body>
    <ion-toggle></ion-toggle>
  </body>
</html>
```

## 从非 jsx 元素传递对象类型的 prop{#passing-oobject-pprops-from-a-non-jsx-element}

### 手动设置 prop

```tsx
import { Prop } from "@stencil/core";

export class TodoList {
  @Prop() myObject: object;
  @Prop() myArray: Array<string>;
}
```

```html
<todo-list></todo-list>
<script>
  const todoListElement = document.querySelector("todo-list");
  todoListElement.myObject = {};
  todoListElement.myArray = [];
</script>
```

### 监听 prop 更改

```tsx
import { Prop, State, Watch } from "@stencil/core";

export class TodoList {
  @Prop() myObject: string;
  @Prop() myArray: string;
  @State() myInnerObject: object;
  @State() myInnerArray: Array<string>;

  componentWillLoad() {
    this.parseMyObjectProp(this.myObject);
    this.parseMyArrayProp(this.myArray);
  }

  @Watch("myObject")
  parseMyObjectProp(newValue: string) {
    if (newValue) this.myInnerObject = JSON.parse(newValue);
  }

  @Watch("myArray")
  parseMyArrayProp(newValue: string) {
    if (newValue) this.myInnerArray = JSON.parse(newValue);
  }
}
```

```tsx
<todo-list my-object="{}" my-array="[]"></todo-list>
```
