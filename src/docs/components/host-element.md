---
sidebar_label: Host Element
description: Working with host elements
slug: /host-element
---

# 使用宿主元素{#working-with-host-elements}

Stencil 组件在其 `render` 方法中[使用 JSX](./template-and-JSX.md)声明性地渲染它们的子组件。大多数情况下，`render()` 函数描述了将要被渲染的子元素，但它也可以用于渲染宿主元素本身的属性。

## `<Host>`

`Host` 函数组件可以在 render 函数的根节点使用，为宿主元素本身设置属性和事件监听器。它的工作原理和其他 JSX 一样:

```tsx
// Host is imported from '@stencil/core'
import { Component, Host, h } from "@stencil/core";

@Component({ tag: "todo-list" })
export class TodoList {
  @Prop() open = false;
  render() {
    return (
      <Host
        aria-hidden={this.open ? "false" : "true"}
        class={{
          "todo-list": true,
          "is-open": this.open,
        }}
      />
    );
  }
}
```

如果 `this.open === true`, 将渲染成：

```tsx
<todo-list class="todo-list is-open" aria-hidden="false"></todo-list>
```

类似的， 如果 `this.open === false`：

```tsx
<todo-list class="todo-list" aria-hidden="true"></todo-list>
```

`<Host>` 是一个虚拟组件，一个由 stencil 公开的虚拟 API，用于声明性地设置宿主元素的属性，它永远不会在 DOM 中呈现，例如，你永远不会在 Chrome 开发者工具中看到 `<Host>`。

### `<Host>` 可以作为 `<Fragment>`{#host-can-work-as-a-fragment}

`<Host>` 也可以用于需要在根级渲染多个组件的情况，例如:

它可以通过`render()`方法来实现：

```tsx
@Component({ tag: "my-cmp" })
export class MyCmp {
  render() {
    return (
      <Host>
        <h1>Title</h1>
        <p>Message</p>
      </Host>
    );
  }
}
```

这个 JSX 将渲染以下 HTML：

```html
<my-cmp>
  <h1>Title</h1>
  <p>Message</p>
</my-cmp>
```

即使我们不使用 `<Host>` 来呈现宿主元素中的任何属性，它也是一个有用的 API，可以在根级呈现许多元素。

## Element 装饰器{Element-Decorator}

`@Element()` 装饰器用于访问类实例中的宿主元素。这将返回一个 `HTMLElement` 的实例，因此可以在这里使用标准的 DOM 方法/事件。

```tsx
import { Element } from '@stencil/core';

...
export class TodoList {

  @Element() el: HTMLElement;

  getListHeight(): number {
    return this.el.getBoundingClientRect().height;
  }
}
```

为了在初始化类成员时引用宿主元素，你需要使用 TypeScript 的确定赋值断言修饰符来避免类型错误：

```tsx
import { Element } from '@stencil/core';

...
export class TodoList {

  @Element() el!: HTMLElement;

  private listHeight = this.el.getBoundingClientRect().height;
}
```

如果你需要在 prop 或 state 改变时更新宿主元素，你应该在 `render()` 方法中使用 `<Host>` 元素执行此操作。

## Styling

在 [Styling page](./styling#shadow-dom-in-stencil) 你可以看到有关样式设置的完整信息。

通过使用 `@Component` 装饰器中定义的组件 tag，可以将 CSS 应用到 `<Host>` 元素上。

```tsx
@Component({
  tag: 'my-cmp',
  styleUrl: 'my-cmp.css'
})
...
```

my-cmp.css:

```css
my-cmp {
  width: 100px;
}
```

### Shadow DOM{#shadow-dom}

需要注意的是，当使用 shadow DOM 时，`<Host>` 元素的样式并不完全相同。你必须使用 `:host` 而不是 `my-cmp` 元素选择器。

```tsx
@Component({
  tag: 'my-cmp',
  styleUrl: 'my-cmp.css',
  shadow: true
})
...
```

my-cmp.css:

```css
:host {
  width: 100px;
}
```
