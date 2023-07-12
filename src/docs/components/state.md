# State

'State' 是一个通用术语，指的是存储在类或类的实例中的值和对象，以便现在或将来使用。

与常规的 TypeScript 类一样，Stencil 组件也可以有一个或多个内部类成员，用于保存组成组件状态的值。
Stencil 允许开发人员有选择地使用 `@State()` 装饰器标记持有类部分状态的类成员，以便在状态更改时触发重新渲染。

## State 装饰器{#state-decorator}

Stencil 提供了一个装饰器，用于在某些类成员更改时触发重新渲染。触发重新渲染的组件的类成员必须使用 Stencil 的`@State()`装饰器进行装饰，如下所示：

```tsx
// 首先， 我们从 '@stencil/core' 导入 State
import { Component, State, h } from "@stencil/core";

@Component({
  tag: "current-time",
})
export class CurrentTime {
  // Second, we decorate a class member with @State()
  // When `currentTime` changes, a rerender will be
  // triggered
  @State() currentTime: number = Date.now();

  render() {
    // Within the component's class, its members are
    // accessed via `this`. This allows us to render
    // the value stored in `currentTime`
    const time = new Date(this.currentTime).toLocaleTimeString();

    return <span>{time}</span>;
  }
}
```

在上面的例子中，`@State()` 放在(装饰) `currentTime` 类成员之前，它是一个数字。这会标记 `currentTime`，这样每当它的值改变时，组件就会渲染。

然而，上面的例子并没有展示 `@State` 的真正威力。`@State` 成员只能在类内更新，上面的例子在初始赋值 `currentTime` 后就不会更新了。
这意味着我们的 `current-time` 组件将永远不会重新渲染!我们在下面的例子中修复它，每 1000 毫秒(1 秒)更新一次 `current-time`:

```tsx
import { Component, State, h } from "@stencil/core";

@Component({
  tag: "current-time",
})
export class CurrentTime {
  timer: number;

  // `currentTime` is decorated with `@State()`,
  // as we need to trigger a rerender when its
  // value changes to show the latest time
  @State() currentTime: number = Date.now();

  connectedCallback() {
    this.timer = window.setInterval(() => {
      // the assignment to `this.currentTime`
      // will trigger a re-render
      this.currentTime = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.currentTime).toLocaleTimeString();

    return <span>{time}</span>;
  }
}
```

上面的例子使用了 [connectedCallback() 生命周期方法](./component-lifecycle#connectedCallback) 每 1000 毫秒(或者每一秒)将
`currentTime` 设置为 `Date.now()` 的值。因为 `currentTime` 的值每秒都在变化，所以 Stencil 在 `current-time` 上调用 `render` 函数，它会漂亮地打印出当前时间。

上面的例子还利用了 [disconnectedCallback()生命周期方法](./component-lifecycle#disconnectedCallback) 来正确地清理在 `connectedCallback()`
中使用 `setInterval` 创建的定时器。这对于使用 `@State` 来说不是必需的，但在使用 `setInterval` 时是一个很好的实践。

## 何时使用 `@State()`?{#when-the-use-state}

`@State()` 应该用于所有在类成员发生变化时触发重新渲染的类成员。然而，并非所有的内部状态都需要使用 `@State()` 进行修饰。
如果你确定值不会改变或者它不需要触发重新渲染，那么 `@State()` 就不是必需的。仅在绝对必要时使用 `@State()` 被认为是一个最佳实践。
回顾我们的 `current-time` 组件：

```tsx
import { Component, State, h } from "@stencil/core";

@Component({
  tag: "current-time",
})
export class CurrentTime {
  // `timer` is not decorated with `@State()`, as
  // we do not wish to trigger a rerender when its
  // value changes
  timer: number;

  // `currentTime` is decorated with `@State()`,
  // as we need to trigger a rerender when its
  // value changes to show the latest time
  @State() currentTime: number = Date.now();

  connectedCallback() {
    // the assignment to `this.timer` will not
    // trigger a re-render
    this.timer = window.setInterval(() => {
      // the assignment to `this.currentTime`
      // will trigger a re-render
      this.currentTime = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.currentTime).toLocaleTimeString();

    return <span>{time}</span>;
  }
}
```

## 示例{#examples}

### 使用 `@State()` 和 `@Listen()`{#use-state-with-listen}

这个例子使用了 `@State` 和 [`@Listen`](./events#listen-decorator) 装饰器。我们定义一个名为 `isOpen` 的类成员，并用 `@State()` 装饰它。
通过使用 `@Listen()`，我们可以在点击事件中切换 `isOpen` 的值。

```tsx
import { Component, Listen, State, h } from "@stencil/core";

@Component({
  tag: "my-toggle-button",
})
export class MyToggleButton {
  // `isOpen` is decorated with `@State()`,
  // changes to it will trigger a rerender
  @State() isOpen: boolean = true;

  @Listen("click", { capture: true })
  handleClick() {
    // whenever a click event occurs on
    // the component, update `isOpen`,
    // triggering the rerender
    this.isOpen = !this.isOpen;
  }

  render() {
    return <button>{this.isOpen ? "Open" : "Closed"}</button>;
  }
}
```

### 复杂类型{#complex-types}

对于更高级的用例，`@State()` 可以与复杂类型一起使用。在下面的例子中，我们打印一个 `Item` 条目的列表。
虽然我们最初从 0 个 `Item` 开始，但我们使用与之前相同的模式，每 2000 毫秒(2 秒)向 `ItemList` 的 `items` 数组添加一次新的 `Item`。
每次一个新条目被添加到 `items` 中，都会发生一次渲染：

```tsx
import { Component, State, h } from "@stencil/core";

// a user defined, complex type describing an 'Item'
type Item = {
  id: number;
  description: string;
};

@Component({
  tag: "item-list",
})
export class ItemList {
  // `timer` is not decorated with `@State()`, as
  // we do not wish to trigger a rerender when its
  // value changes
  timer: number;

  // `items` will trigger a rerender if
  // the value assigned to the variable changes
  @State() items: Item[] = [];

  connectedCallback() {
    // the assignment to `this.timer` will not
    // trigger a re-render
    this.timer = window.setInterval(() => {
      const newTodo: Item = {
        description: "Item",
        id: this.items.length + 1,
      };
      // the assignment to `this.items` will
      // trigger a re-render. the assignment
      // using '=' is important here, as we
      // need that to make sure the rerender
      // occurs
      this.items = [...this.items, newTodo];
    }, 2000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h1>To-Do List</h1>
        <ul>
          {this.items.map((todo) => (
            <li>
              {todo.description} #{todo.id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
```

<!-- It's important to note that it's the reassignment of `this.items` that is causing the rerender in `connectedCallback()`: -->

需要注意的是，正是 `this.items` 的重新分配导致了 `connectedCallback()` 中的重新渲染：

```ts
this.items = [...this.items, newTodo];
```

像下面的例子一样，改变对 `this.items` 的现有引用不会导致渲染，因为 Stencil 不会知道数组的内容已经改变:

```ts
// updating `items` either of these ways will not
// cause a rerender
this.items.push(newTodo);
this.items[this.items.length - 1] = newTodo;
```

与上面的例子类似，这个代码示例使用了 [connectedCallback()生命周期方法](./component-lifecycle#connectedcallback)
来创建一个新的 `Item` 并每 2000 毫秒(每两秒)将其添加到 `items` 中。上面的例子还利用了 [disconnectedCallback()生命周期方法](./component-lifecycle#disconnectedCallback)
来正确地清理在 `connectedCallback()` 中使用 `setInterval` 创建的定时器。
