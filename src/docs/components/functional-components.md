---
description: 函数式组件
---

# 使用函数式组件

函数式组件与普通的 Stencil web 组件有很大的不同，因为它们是 Stencil 的 JSX 编译器的一部分。函数式组件基本上是一个函数，它接受一个 props 对象并将其转换为 JSX。

```tsx
const Hello = (props) => <h1>Hello, {props.name}!</h1>;
```

当 JSX 转换器遇到这样的组件时，它将获取它的属性，将它们作为 `props` 对象传递给函数，并用函数返回的 JSX 替换该组件。

```tsx
<Hello name="World" />
```

函数式组件也接受第二个参数 `children`.

```tsx
const Hello = (props, children) => [<h1>Hello, {props.name}</h1>, children];
```

JSX 转换器将组件的所有子元素作为数组传递给函数的 `children` 参数。

```tsx
<Hello name="World">
  <p>I'm a child element.</p>
</Hello>
```

Stencil 提供了一个 `FunctionalComponent` 泛型类型，允许为组件的属性指定接口。

```tsx
// Hello.tsx

import { FunctionalComponent, h } from "@stencil/core";

interface HelloProps {
  name: string;
}

export const Hello: FunctionalComponent<HelloProps> = ({ name }) => (
  <h1>Hello, {name}!</h1>
);
```

## Working with children

函数组件的第二个参数接收传递的子组件，但为了使用它们，`FunctionalComponent` 提供了一个 utils 对象，
该对象暴露了一个 `map()` 方法来转换子组件，以及一个 `forEach()` 方法来读取它们。
不建议读取 `children` 数组，因为 stencil 编译器可能会在 prod 模式下重命名 vNode 属性。

```tsx
export interface FunctionalUtilities {
  forEach: (
    children: VNode[],
    cb: (vnode: ChildNode, index: number, array: ChildNode[]) => void
  ) => void;
  map: (
    children: VNode[],
    cb: (vnode: ChildNode, index: number, array: ChildNode[]) => ChildNode
  ) => VNode[];
}
export interface ChildNode {
  vtag?: string | number | Function;
  vkey?: string | number;
  vtext?: string;
  vchildren?: VNode[];
  vattrs?: any;
  vname?: string;
}
```

**示例：**

```tsx
export const AddClass: FunctionalComponent = (_, children, utils) =>
  utils.map(children, (child) => ({
    ...child,
    vattrs: {
      ...child.vattrs,
      class: `${child.vattrs.class} add-class`,
    },
  }));
```

:::info 提示
在 JSX 中使用函数式组件时，其名称必须以大写字母开头。 因此将其导出是由意义的。
:::

## 免责声明{#disclaimer}

函数组件和类组件之间有几个主要的区别。由于功能组件在 JSx 中只是语法糖，因此它们

- 没有被编译成 web components,
- 没有创建 DOM 节点,
- 没有 Shadow DOM 或 作用域样式,
- 没有生命周期钩子,
- 无状态.

当决定是否使用函数式组件时，要记住的一个概念是，应用程序的 UI 通常可以由其状态的函数组成，也就是说，给定相同的状态，它总是渲染相同的 UI。
如果一个组件必须保存状态，处理事件等，它可能应该是一个类组件。如果一个组件的目的只是简单地封装一些标记，以便在整个应用程序中重用，那么它可能是一个函数式组件(特别是当你使用组件库，因此不需要为其设置样式时)。
