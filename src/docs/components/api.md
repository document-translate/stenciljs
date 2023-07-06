---
sidebar_label: API
description: Component API
slug: /api
---

# Component API

stencil 提供的整个 API 可以浓缩成一组装饰器、生命周期钩子和渲染方法。

## 装饰器{#decorators}

Decorators are a pure compiler-time construction used by stencil to collect all the metadata about a component, the properties, attributes and methods it might expose, the events it might emit or even the associated stylesheets.
Once all the metadata has been collected, all the decorators are removed from the output, so they don't incur any runtime overhead.

- [@Component()](./component#component-decorator) declares a new web component
- [@Prop()](./properties#the-prop-decorator-prop) declares an exposed property/attribute
- [@State()](./state#the-state-decorator-state) declares an internal state of the component
- [@Watch()](./reactive-data#the-watch-decorator-watch) declares a hook that runs when a property or state changes
- [@Element()](./host-element#element-decorator) declares a reference to the host element
- [@Method()](./methods#method-decorator) declares an exposed public method
- [@Event()](./events#event-decorator) declares a DOM event the component might emit
- [@Listen()](./events#listen-decorator) listens for DOM events

## Lifecycle hooks

- [connectedCallback()](./component-lifecycle#connectedcallback)
- [disconnectedCallback()](./component-lifecycle#disconnectedcallback)
- [componentWillLoad()](./component-lifecycle#componentwillload)
- [componentDidLoad()](./component-lifecycle#componentdidload)
- [componentShouldUpdate(newValue, oldValue, propName): boolean](./component-lifecycle#componentshouldupdate)
- [componentWillRender()](./component-lifecycle#componentwillrender)
- [componentDidRender()](./component-lifecycle#componentdidrender)
- [componentWillUpdate()](./component-lifecycle#componentwillupdate)
- [componentDidUpdate()](./component-lifecycle#componentdidupdate)
- **[render()](./templating-and-jsx)**

## componentOnReady()

This isn't a true "lifecycle" method that would be declared on the component class definition, but instead is a utility method that
can be used by an implementation consuming your Stencil component to detect when a component has finished its first render cycle.

This method returns a promise which resolves after `componentDidRender()` on the _first_ render cycle.

:::info
`componentOnReady()` only resolves once per component lifetime. If you need to hook into subsequent render cycle, use
`componentDidRender()` or `componentDidUpdate()`.
:::

Executing code after `componentOnReady()` resolves could look something like this:

```ts
// Get a reference to the element
const el = document.querySelector("my-component");

el.componentOnReady().then(() => {
  // Place any code in here you want to execute when the component is ready
  console.log("my-component is ready");
});
```

The availability of `componentOnReady()` depends on the component's compiled output type. This method is only available for lazy-loaded
distribution types ([`dist`](../output-targets/dist) and [`www`](../output-targets/www)) and, as such, is not available for
[`dist-custom-elements`](../output-targets/custom-elements) output. If you want to simulate the behavior of `componentOnReady()` for non-lazy builds,
you can implement a helper method to wrap the functionality similar to what the Ionic Framework does [here](https://github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts#L60-L79).

## appload 事件{#the-appload-event}

除了特定于组件的生命周期钩子之外，当应用及其所有子组件完成加载时，一个名为 `appload` 的特殊事件将被触发。你可以在`window`对象上监听它。

If you have multiple apps on the same page, you can determine which app emitted the event by checking `event.detail.namespace`. This will be the value of the [namespace config option](../config/overview#namespace) you've set in your Stencil config.

```tsx
window.addEventListener("appload", (event) => {
  console.log(event.detail.namespace);
});
```

## Other

- [**Host**](./host-element): Host 是一个函数组件，可以在 `render` 函数的根节点使用，为宿主元素本身设置属性和事件监听器。

- [**h()**](./templating-and-jsx): 它在 `render()` 中用于将 JSX 转换为虚拟的 DOM 元素。

- [**readTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing):
  调度 DOM-read 任务。提供的回调函数将在执行 DOM 读取的最佳时机执行，而不会导致布局混乱。

- [**writeTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing):
  调度 DOM-write 任务。提供的回调函数将在执行 DOM 变化的最佳时机执行，而不会导致布局混乱。

- **forceUpdate()**: 即使状态没有改变，也调度给定实例或元素的新渲染。请注意 `forceUpdate()` 不是同步的，可能在下一帧执行 DOM 渲染。

- getAssetPath(): 获取本地资源的路径。参考 [Assets](../guides/assets#get-asset-path) 页面获取使用信息。
- setMode()
- getMode()
- getElement()
