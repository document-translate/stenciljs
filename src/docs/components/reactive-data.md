# 响应式数据{#reactive-data}

当组件的 prop 或 state 发生变化时，Stencil 组件也会更新。

## 渲染方法{#rendering-methods}

当组件的 props 或 state 发生变化时，[`render()` 方法](./template-and-jsx) 将按计划运行。

## Watch 装饰器{#watch-decorator}

`@Watch()` 是一个应用于 Stencil 组件的方法的装饰器。该装饰器接受一个参数，即用 `@Prop()` 或 `@State()` 装饰的类成员的名称。
使用 `@Watch()` 修饰的方法将在其关联的类成员发生更改时自动运行。

```tsx
// We import Prop & State to show how `@Watch()` can be used on
// class members decorated with either `@Prop()` or `@State()`
import { Component, Prop, State, Watch } from "@stencil/core";

@Component({
  tag: "loading-indicator",
})
export class LoadingIndicator {
  // We decorate a class member with @Prop() so that we
  // can apply @Watch()
  @Prop() activated: boolean;
  // We decorate a class member with @State() so that we
  // can apply @Watch()
  @State() busy: boolean;

  // Apply @Watch() for the component's `activated` member.
  // Whenever `activated` changes, this method will fire.
  @Watch("activated")
  watchPropHandler(newValue: boolean, oldValue: boolean) {
    console.log("The old value of activated is: ", oldValue);
    console.log("The new value of activated is: ", newValue);
  }

  // Apply @Watch() for the component's `busy` member.
  // Whenever `busy` changes, this method will fire.
  @Watch("busy")
  watchStateHandler(newValue: boolean, oldValue: boolean) {
    console.log("The old value of busy is: ", oldValue);
    console.log("The new value of busy is: ", newValue);
  }

  @Watch("activated")
  @Watch("busy")
  watchMultiple(newValue: boolean, oldValue: boolean, propName: string) {
    console.log(`The new value of ${propName} is: `, newValue);
  }
}
```

在上面的例子中，有两个 `@Watch()` 装饰器。一个修饰了 `watchPropHandler`，当类成员 `activated` 发生变化时，这个修饰就会被触发。
另一个修饰了 `watchStateHandler`，它将在类成员 `busy` 发生变化时触发。

当触发时，`@Watch()` 的方法将接收 prop/state 的新旧值。这对于验证或处理副作用很有用。

:::info 提示
`@Watch()` 装饰器不会在组件初始加载时触发。
:::

## 处理数组和对象{#handling-arrays-and-objects}

当 Stencil 检查使用 `@Prop()` 或 `@State()` 修饰的类成员是否发生变化时，它会检查对类成员的引用是否发生了变化。
当一个类成员是一个对象或数组，并且被 `@Prop()` 或 `@State` 标记时，对现有实体内容的改变不会导致 `@Watch()` 被触发，因为它不会改变对类成员的引用。

### 更新数组{#updating-arrays}

对于数组，标准的可变数组操作，如 `push()` 和 `unshift()` 不会触发组件更新。这些函数会改变数组的内容，但不会改变对数组本身的引用。

为了修改数组，应该使用非可变数组运算符。不可变数组操作符返回一个新数组的副本，可以高效地检测。
这些包括 `map()` 和 `filter()`，以及[展开运算符语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
由 `map()`、`filter()` 等返回的值应该被分配给正在被 `@Prop()` 或 `@State()` 修饰的类成员。

例如，要将一个新元素推送到数组中，可以使用已有的值创建一个新数组，并在末尾添加新值：

```tsx
import { Component, State, Watch, h } from "@stencil/core";

@Component({
  tag: "rand-numbers",
})
export class RandomNumbers {
  // We decorate a class member with @State() so that we
  // can apply @Watch(). This will hold a list of randomly
  // generated numbers
  @State() randNumbers: number[] = [];

  private timer: NodeJS.Timer;

  // Apply @Watch() for the component's `randNumbers` member.
  // Whenever `randNumbers` changes, this method will fire.
  @Watch("randNumbers")
  watchStateHandler(newValue: number[], oldValue: number[]) {
    console.log("The old value of randNumbers is: ", oldValue);
    console.log("The new value of randNumbers is: ", newValue);
  }

  connectedCallback() {
    this.timer = setInterval(() => {
      // generate a random whole number
      const newVal = Math.ceil(Math.random() * 100);

      /**
       * This does not create a new array. When stencil
       * attempts to see if any Watched members have changed,
       * it sees the reference to its `randNumbers` State is
       * the same, and will not trigger `@Watch` or a re-render
       */
      // this.randNumbers.push(newVal)

      /**
       * Using the spread operator, on the other hand, does
       * create a new array. `randNumbers` is reassigned
       * using the value returned by the spread operator.
       * The reference to `randNumbers` has changed, which
       * will trigger `@Watch` and a re-render
       */
      this.randNumbers = [...this.randNumbers, newVal];
    }, 1000);
  }

  disconnectedCallback() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>
        randNumbers contains:
        <ol>
          {this.randNumbers.map((num) => (
            <li>{num}</li>
          ))}
        </ol>
      </div>
    );
  }
}
```

### 更新对象{updating-an-object}

应该使用展开运算符来更新对象。
与数组一样，在 Stencil 中修改对象不会触发视图更新。
但是，使用展开运算符并将其返回值赋值给正在被 `@Prop()` 或 `@State()` 修饰的类成员将会触发视图更新。
下面是一个例子:

```tsx
import { Component, State, Watch, h } from "@stencil/core";

export type NumberContainer = {
  val: number;
};

@Component({
  tag: "rand-numbers",
})
export class RandomNumbers {
  // We decorate a class member with @State() so that we
  // can apply @Watch(). This will hold a randomly generated
  // number.
  @State() numberContainer: NumberContainer = { val: 0 };

  private timer: NodeJS.Timer;

  // Apply @Watch() for the component's `numberContainer` member.
  // Whenever `numberContainer` changes, this method will fire.
  @Watch("numberContainer")
  watchStateHandler(newValue: NumberContainer, oldValue: NumberContainer) {
    console.log("The old value of numberContainer is: ", oldValue);
    console.log("The new value of numberContainer is: ", newValue);
  }

  connectedCallback() {
    this.timer = setInterval(() => {
      // generate a random whole number
      const newVal = Math.ceil(Math.random() * 100);

      /**
       * This does not create a new object. When stencil
       * attempts to see if any Watched members have changed,
       * it sees the reference to its `numberContainer` State is
       * the same, and will not trigger `@Watch` or are-render
       */
      // this.numberContainer.val = newVal;

      /**
       * Using the spread operator, on the other hand, does
       * create a new object. `numberContainer` is reassigned
       * using the value returned by the spread operator.
       * The reference to `numberContainer` has changed, which
       * will trigger `@Watch` and a re-render
       */
      this.numberContainer = { ...this.numberContainer, val: newVal };
    }, 1000);
  }

  disconnectedCallback() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return <div>numberContainer contains: {this.numberContainer.val}</div>;
  }
}
```
