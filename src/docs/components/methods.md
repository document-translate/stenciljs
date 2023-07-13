# Method 装饰器

`@Method()` 装饰器用于在公共 API 上暴露方法。使用 `@Method()` 装饰器装饰的函数可以直接从元素中调用，即它们可以从外部调用!

:::info 提示
开发者应该尽可能少地依赖公开的方法，而尽量默认地使用属性和事件。随着应用程序的扩展，我们发现通过@Prop 来管理和传递数据比使用公共方法更容易。
:::

```tsx
import { Method } from "@stencil/core";

export class TodoList {
  @Method()
  async showPrompt() {
    // show a prompt
  }
}
```

像这样调用这个方法：

:::info 提示
在尝试调用公共方法之前，开发人员应该使用 `customElements.whenDefined` 方法来确保组件是已经被定义的。
:::

```tsx
(async () => {
  await customElements.whenDefined("todo-list");
  const todoListElement = document.querySelector("todo-list");
  await todoListElement.showPrompt();
})();
```

## 公共方法必须是异步的{#public-methods-must-be-async}

Stencil 的架构在所有级别上都是异步的，这使得它具有许多性能优势和易用性。通过使用 `@Method` 装饰器的方法确保公有方法返回一个 Promise：

- 开发人员可以在下载实现之前调用方法，而不用 componentOnReady()，它会将方法调用排队，并在组件完成加载后解析。

- 无论组件是否仍然需要延迟加载，还是已经完全 hydrated，与组件的交互都是一样的。

- 通过异步保持组件的公共 API，应用程序可以透明地将组件移动到 [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)，
  而 API 仍然是相同的。

- 只有具有 `@Method` 装饰器的公开方法才需要返回一个 Promise。所有其他组件方法都是该组件私有的，不需要是异步的。

```tsx
// VALID: using async
@Method()
async myMethod() {
  return 42;
}

// VALID: using Promise.resolve()
@Method()
myMethod2() {
  return Promise.resolve(42);
}

// VALID: even if it returns nothing, it needs to be async
@Method()
async myMethod3() {
  console.log(42);
}

// INVALID
@Method()
notOk() {
  return 42;
}
```

## 私有方法{#private-methods}

非公共方法仍然可以用来组织组件的业务逻辑，它们不必返回 Promise。

```tsx
class Component {
  // Since `getData` is not a public method exposed with @Method
  // it does not need to be async
  getData() {
    return this.someData;
  }
  render() {
    return <div>{this.getData()}</div>;
  }
}
```
