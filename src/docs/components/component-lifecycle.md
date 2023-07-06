---
sidebar_label: Lifecycle Methods
description: Component Lifecycle Methods
slug: /component-lifecycle
---

# 组件生命周期方法{#component-lifecycle-methods}

组件有许多生命周期方法，可以用来知道组件何时 "will" 和 "did" 加载，更新和渲染。可以将这些方法添加到组件中，以便在适当的时候挂钩到操作中。

在组件类中实现以下方法之一，Stencil 将自动按正确的顺序调用它们：

<ClientOnly>
<LifecycleMethodsChart />
</ClientOnly>

## connectedCallback()

每次组件连接到 DOM 时调用。当组件第一次被连接时，这个方法在 `componentWillLoad` 之前被调用。

需要注意的是，这个方法可以被多次调用，每次调用时，元素都会在 DOM 中被 **attached** 或 **moved** 。对于每次在 DOM 中添加或移动元素时都需要运行的逻辑，使用这个生命周期方法被认为是最佳实践。

```tsx
const el = document.createElement("my-cmp");
document.body.appendChild(el);
// connectedCallback() called
// componentWillLoad() called (first time)

el.remove();
// disconnectedCallback()

document.body.appendChild(el);
// connectedCallback() called again, but `componentWillLoad()` is not.
```

这个 `lifecycle` 钩子遵循与[自定义元素规范](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)中描述的相同的语义。

## disconnectedCallback()

每次组件与 DOM 断开连接时都会调用，也就是说，它可以被触发多次，不要与 `onDestroy` 类型的事件混淆。

这个 `lifecycle` 钩子遵循与[自定义元素规范](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)中描述的相同的语义。

## componentWillLoad()

在组件第一次连接到 DOM 之后调用一次。由于这个方法只被调用一次，所以它是一个异步加载数据和设置状态的好地方，而不会触发额外的重新渲染。

可以返回一个 promise，用于等待第一次 `render()` 。

## componentDidLoad()

在组件完全加载和第一个 `render()` 发生后调用一次。

## componentShouldUpdate()

当组件的 [`Prop`](./properties) 或 [`State`](./state) 属性发生变化并且即将请求渲染时，这个钩子会被调用。这个钩子接收三个参数:新值、旧值和改变后状态的名称。它应该返回一个布尔值来表示组件是否应该重新渲染(`true`)或否(`false`)。

需要注意的是，此方法不会在初始渲染之前执行，即当组件第一次附加到 dom 时，也不会在已经计划在下一帧中进行渲染时执行。

假设组件的以下两个属性同步变化:

```tsx
component.somePropA = 42;
component.somePropB = 88;
```

`componentShouldUpdate` 将首先被调用并传入参数: `42`、`undefined` 和 `somePropA` 。如果它返回 `true` ，钩子将不会被再次调用，因为重新渲染已经被安排好了。
相反，如果第一个 hook 返回 `false`，那么 `componentShouldUpdate` 将被再次调用，以 `88` 、`undefined` 和 `somePropB` 作为参数，
由 `component.somePropB = 88` 触发突变。

由于这个 hook 的执行可能是有条件的，依赖它来监视 prop 的变化是不好的，而是使用`@Watch`装饰器。

## componentWillRender()

在每次 `render()` 之前调用。可以返回一个 promise，它可以用来等待即将到来的渲染。

## componentDidRender()

在每次 `render()` 之后调用。

## componentWillUpdate()

当组件即将更新时调用，因为某些`Prop()`或`State()`发生了变化。但它不会在第一次 `render()` 前被调用。

可以返回一个 promise，用于等待下一次渲染。

## componentDidUpdate()

在组件更新后调用。 但它不会在第一次 `render()` 后被调用。

## Rendering State

我们总是建议在 `componentWillRender()` 中进行任何渲染状态更新，因为这是在 `render()` 方法之前被调用的方法。或者使用`componentDidLoad()`、`componentDidUpdate()`
和 `componentDidRender()` 方法更新渲染状态将导致另一次渲染，这对性能来说并不理想。

如果状态必须在 `componentDidUpdate()` 或 `componentDidRender()` 中更新，它有可能使组件陷入无限循环。如果在 `componentDidUpdate()`
中更新状态是不可避免的，那么该方法还应该提供一种方法来检测 `props` 或 `state` 是否“脏”(数据是否实际不同或与之前相同)。通过脏检查，`componentDidUpdate()`
能够避免渲染相同的数据，从而再次调用 `componentDidUpdate()`。

## 生命周期结构{#lifecycle-hierarchy}

生命周期方法的一个有用特性是，它们也将子组件的生命周期考虑在内。例如，如果父组件 `cmp-a` 有一个子组件 `cmp-b` ，那么在 `cmp-b` 完成加载之前，`cmp-a` 不会被认为是
"loaded" 的。另一种说法是，最深的组件首先完成加载，然后 `componentDidLoad()` 调用冒泡。

同样需要注意的是，即使 Stencil 可以延迟加载组件，并且具有异步渲染，生命周期方法仍然以正确的顺序被调用。因此，虽然顶层组件可能已经加载，但它的所有生命周期方法仍然会以正确的顺序调用，这意味着它将等待子组件完成加载。相反的情况也是如此，子组件可能已经准备好了，而父组件还没有。

在下面的例子中，我们有一个简单的组件层次结构。编号的列表显示了生命周期方法被触发的顺序。

```html
<cmp-a>
  <cmp-b>
    <cmp-c></cmp-c>
  </cmp-b>
</cmp-a>
```

1. `cmp-a` - `componentWillLoad()`
2. `cmp-b` - `componentWillLoad()`
3. `cmp-c` - `componentWillLoad()`
4. `cmp-c` - `componentDidLoad()`
5. `cmp-b` - `componentDidLoad()`
6. `cmp-a` - `componentDidLoad()`

即使有些组件可能已经加载，也可能没有加载，整个组件层次结构都会等待它的子组件完成加载和渲染。

## 异步生命的周期方法{#async-lifecycle-methods}

生命周期方法也可以返回 Promise，它允许方法异步检索数据或执行任何异步任务。一个很好的例子是获取要在组件中渲染的数据。例如，您正在读取的这个网站在渲染之前首先获取内容数据。
但是因为 `fetch()` 是异步的，所以重要的是 `componentWillLoad()` 返回一个 `Promise`，以确保父组件在其所有内容渲染之前不会被认为是“已加载”。

下面是一个简单的例子，展示了 `componentWillLoad()` 如何让它的父组件等待它完成数据加载。

```tsx
componentWillLoad() {
  return fetch('/some-data.json')
    .then(response => response.json())
    .then(data => {
      this.content = data;
    });
}
```

## 示例{#example}

这个简单的例子展示了一个时钟，并每秒更新当前时间。计时器在组件被添加到 DOM 时启动。一旦它从 DOM 中移除，定时器就会停止。

```tsx
import { Component, State, h } from "@stencil/core";

@Component({
  tag: "custom-clock",
})
export class CustomClock {
  timer: number;

  @State() time: number = Date.now();

  connectedCallback() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.time).toLocaleTimeString();

    return <span>{time}</span>;
  }
}
```
