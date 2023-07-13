# Properties

Props 是在 HTML 元素上公开的自定义 attributes/properties。它们允许开发人员将数据传递给组件来渲染或以其他方式使用。

## Prop 装饰器{#the-prop-decorator-prop}

Props 使用 Stencil 的`@Prop()`装饰器在组件上声明，如下所示：

```tsx
// First, we import Prop from '@stencil/core'
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list",
})
export class TodoList {
  // Second, we decorate a class member with @Prop()
  @Prop() name: string;

  render() {
    // Within the component's class, its props are
    // accessed via `this`. This allows us to render
    // the value passed to `todo-list`
    return <div>To-Do List Name: {this.name}</div>;
  }
}
```

在上面的例子中，`@Prop()` 放在(装饰) `name` 类成员之前，它是一个字符串。
通过给 `name` 添加 `@Prop()`， Stencil 将把 `name` 暴露为元素上的一个属性，这个属性可以在组件使用的任何地方设置:

```tsx
{
  /* 在 TSX 文件中使用组件 */
}
<todo-list name={"Tuesday's To-Do List"}></todo-list>;
```

```html
<!-- 在 HTML 文件中使用组件 -->
<todo-list name="Tuesday's To-Do List"></todo-list>
```

在上面的例子中，`todo-list` 组件在 TSX 和 HTML 中的使用几乎相同。两者之间的唯一区别是在 TSX 中，赋值给 prop(在这个例子中是 `name`)的值被包裹在大括号中。
然而，在某些情况下，HTML 和 TSX 将属性传递给组件的方式略有不同。

## Variable Casing

In the JavaScript ecosystem, it's common to use 'camelCase' when naming variables. The example component below has a
class member, `thingToDo` that is camelCased.

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  // thingToDo is 'camelCased'
  @Prop() thingToDo: string;

  render() {
    return <div>{this.thingToDo}</div>;
  }
}
```

Since `thingToDo` is a prop, we can provide a value for it when we use our `todo-list-item` component. Providing a
value to a camelCased prop like `thingToDo` is nearly identical in TSX and HTML.

When we use our component in a TSX file, an attribute uses camelCase:

```tsx
<todo-list-item thingToDo={"Learn about Stencil Props"}></todo-list-item>
```

In HTML, the attribute must use 'dash-case' like so:

```html
<todo-list-item thing-to-do="Learn about Stencil Props"></todo-list-item>
```

## Data Flow

Props should be used to pass data down from a parent component to its child component(s).

The example below shows how a `todo-list` component uses three `todo-list-item` child components to render a ToDo list.

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list",
})
export class TodoList {
  render() {
    return (
      <div>
        <h1>To-Do List Name: Stencil To Do List</h1>
        <ul>
          {/* Below are three Stencil components that are children of `todo-list`, each representing an item on our list */}
          <todo-list-item
            thingToDo={"Learn about Stencil Props"}
          ></todo-list-item>
          <todo-list-item
            thingToDo={"Write some Stencil Code with Props"}
          ></todo-list-item>
          <todo-list-item thingToDo={"Dance Party"}></todo-list-item>
        </ul>
      </div>
    );
  }
}
```

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() thingToDo: string;

  render() {
    return <li>{this.thingToDo}</li>;
  }
}
```

:::info 提示
Children components should not know about or reference their parent components. This allows Stencil to
efficiently re-render your components. Passing a reference to a component as a prop may cause unintended side effects.
:::

## 可变性{#mutability}

A Prop is by default immutable from inside the component logic. Once a value is set by a user, the component cannot
update it internally. For more advanced control over the mutability of a prop, please see the
[mutable option](#prop-mutability-mutable) section of this document.

## 类型{#types}

Props 可以是`boolean`、`number`、`string`，甚至是`Object`或`Array`。下面的例子展示了`todo-list-item`来添加更多不同类型的 props。

```tsx
import { Component, Prop, h } from "@stencil/core";
// `MyHttpService` is an `Object` in this example
import { MyHttpService } from "../some/local/directory/MyHttpService";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() isComplete: boolean;
  @Prop() timesCompletedInPast: number;
  @Prop() thingToDo: string;
  @Prop() myHttpService: MyHttpService;
}
```

### 布尔类型 prop{#boolean-prop}

Stencil 组件的 prop 可以被声明为 `boolean` 类型：

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() isComplete: boolean;
}
```

要在 HTML 中使用这个版本的 `todo-list-item`，我们将字符串 `"true"`/`"false"` 传递给组件：

```html
<!-- 设置 isComplete 为 'true' -->
<todo-list-item is-complete="true"></todo-list-item>
<!-- 设置 isComplete 为 'false' -->
<todo-list-item is-complete="false"></todo-list-item>
```

要在 TSX 中使用这个版本的 `todo-list-item`，需要使用 `true`/`false` ，并用花括号括起来：

```tsx
// 设置 isComplete 为 'true'
<todo-list-item isComplete={true}></todo-list-item>
// 设置 isComplete 为 'false'
<todo-list-item isComplete={false}></todo-list-item>
```

Stencil 处理`boolean`类型属性的几种方式值得注意：

1. 如果在 HTML 中提供字符串 `"false"`，布尔属性的值将为 `false`

```html
<!-- The 'todo-list-item' component will have an isComplete value of `false` -->
<todo-list-item is-complete="false"></todo-list-item>
```

2. 如果在 HTML 中提供的字符串不是 `"false"`，布尔属性的值将为 `true`

```html
<!-- The 'todo-list-item' component will have an isComplete value of -->
<!-- `true` for each of the following examples -->
<todo-list-item is-complete=""></todo-list-item>
<todo-list-item is-complete="0"></todo-list-item>
<todo-list-item is-complete="False"></todo-list-item>
```

3. 如果布尔属性没有[默认值](#default-values)，并且满足以下条件之一，那么它的值将是 `undefined`：
   1. 在使用组件时，不包含 prop
   1. 在使用组件时包含了 prop，但没有赋值

```html
<!-- Both examples using the 'todo-list-item' component will have an -->
<!-- isComplete value of `undefined` -->
<todo-list-item></todo-list-item>
<todo-list-item is-complete></todo-list-item>
```

### 数字类型 prop{#number-prop}

Stencil 组件的 prop 可以被声明为 `number` 类型：

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() timesCompletedInPast: number;
}
```

要在 HTML 中使用这个版本的 `todo-list-item`，我们将数值作为字符串传递给组件:

```html
<!-- 设置 timesCompletedInPast 为 '0' -->
<todo-list-item times-completed-in-past="0"></todo-list-item>
<!-- 设置 timesCompletedInPast 为 '23' -->
<todo-list-item times-completed-in-past="23"></todo-list-item>
```

要在 TSX 中使用这个版本的 `todo-list-item`，需要将一个由大括号括起来的数字传递给组件:

```tsx
// 设置 timesCompletedInPast 为 '0'
<todo-list-item timesCompletedInPast={0}></todo-list-item>
// 设置 timesCompletedInPast 为 '23'
<todo-list-item timesCompletedInPast={23}></todo-list-item>
```

### 字符串类型 Prop{#string-prop}

Stencil 组件的 prop 可以被声明为 `string` 类型：

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() thingToDo: string;
}
```

要在 HTML 中使用这个版本的 `todo-list-item`，我们将值作为字符串传递给组件:

```html
<!-- Set thingToDo to 'Learn about Stencil Props' -->
<todo-list-item thing-to-do="Learn about Stencil Props"></todo-list-item>
<!-- Set thingToDo to 'Write some Stencil Code with Props' -->
<todo-list-item
  thing-to-do="Write some Stencil Code with Props"
></todo-list-item>
```

要在 TSX 中使用这个版本的`todo-list-item`，我们将值作为字符串传递给组件。在 TSX 中向 props 提供字符串值时，大括号不是必需的:

```tsx
// Set thingToDo to 'Learn about Stencil Props'
<todo-list-item thingToDo="Learn about Stencil Props"></todo-list-item>
// Set thingToDo to 'Write some Stencil Code with Props'
<todo-list-item thingToDo="Write some Stencil Code with Props"></todo-list-item>
// Set thingToDo to 'Write some Stencil Code with Props' with curly braces
<todo-list-item thingToDo={"Learn about Stencil Props"}></todo-list-item>
```

### Object Props

Stencil 组件的 prop 可以被声明为 `Object` 类型：

```tsx
// TodoListItem.tsx
import { Component, Prop, h } from "@stencil/core";
import { MyHttpService } from "../path/to/MyHttpService";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  // Use `@Prop()` to declare the `httpService` class member
  @Prop() httpService: MyHttpService;
}
```

```tsx
// MyHttpService.ts
export class MyHttpService {
  // This implementation intentionally left blank
}
```

在 TypeScript 中，`MyHttpService` 既是一个 `对象` 也是一个 `类型`。
当使用像 `MyHttpService` 这样的用户定义类型时，类型必须始终在声明时使用 `export` 关键字导出。
这样做的原因是当从父组件传递`MyHttpService`的实例给`TodoListItem`时，Stencil 需要知道`httpService`是什么类型的 prop。

要在 TSX 中设置 `httpService`，请将自定义元素标签中的属性名称分配给所需的值，如下所示:

```tsx
// TodoList.tsx
import { Component, h } from "@stencil/core";
import { MyHttpService } from "../MyHttpService";

@Component({
  tag: "todo-list",
  styleUrl: "todo-list.css",
  shadow: true,
})
export class ToDoList {
  private httpService = new MyHttpService();

  render() {
    return <todo-list-item httpService={this.httpService}></todo-list-item>;
  }
}
```

注意，属性名使用了 `camelCase`，值被大括号括起来。

不能像下面这样通过 HTML 属性来设置 `Object` 类型的 prop:

```html
<!-- this will not work -->
<todo-list-item
  http-service="{ /* implementation omitted */ }"
></todo-list-item>
```

这样做的原因是，Stencil 不会尝试将 HTML 中类似对象的字符串序列化为 JavaScript 对象。
类似地，Stencil 不支持从 JSON 反序列化对象。
执行这两种操作在运行时都很昂贵，并且有丢失对其他嵌套 JavaScript 对象的引用的风险。

相反，可以通过 HTML 中的 `<script>` 标签设置属性：

```html
<script>
  document.querySelector("todo-list-item").httpService = {
    /* implementation omitted */
  };
</script>
```

### Array Props

Stencil 组件的 prop 可以被声明为 `Array` 类型：

```tsx
// TodoList.tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() itemLabels: string[];
}
```

要在 TSX 中设置 `itemLabels`，需要在自定义元素的标签中指定所需的值，如下所示：

```tsx
// TodoList.tsx
import { Component, h } from "@stencil/core";
import { MyHttpService } from "../MyHttpService";

@Component({
  tag: "todo-list",
  styleUrl: "todo-list.css",
  shadow: true,
})
export class ToDoList {
  private labels = ["non-urgent", "weekend-only"];

  render() {
    return <todo-list-item itemLabels={this.labels}></todo-list-item>;
  }
}
```

注意，属性名使用了 `camelCase`，值被大括号括起来。

不能通过 HTML 属性来设置 `Array` 类型的 prop:

```html
<!-- this will not work -->
<todo-list-item item-labels="['non-urgent', 'weekend-only']"></todo-list-item>
```

这样做的原因是，Stencil 不会尝试将 HTML 中类似数组的字符串序列化为 JavaScript 对象。
这样做在运行时开销很大，并且有丢失对其他嵌套 JavaScript 对象的引用的风险。

相反，可以通过 HTML 中的 `<script>` 标签设置属性：

```html
<script>
  document.querySelector("todo-list-item").itemLabels = [
    "non-urgent",
    "weekend-only",
  ];
</script>
```

### 高级的 Prop 类型{#advanced-prop-type}

#### `any` 类型{#any-type}

TypeScript 的[' any '类型](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)是一种特殊类型，可用于防止对特定值进行类型检查。
因为`any`是 TypeScript 中的有效类型，所以 Stencil props 也可以被指定为 `any` 类型。下面的例子演示了三种使用类型为 `any` 的 props 的不同方式:

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  // isComplete有一个显式的类型注解 `any`，
  // 并且没有默认值
  @Prop() isComplete: any;
  // label has an explicit type annotation of
  // `any` with a default value of 'urgent',
  // which is a string
  @Prop() label: any = "urgent";
  // thingToDo has no type and no default value,
  // and will be considered to be type `any` by
  // TypeScript
  @Prop() thingToDo;

  render() {
    return (
      <ul>
        <li>
          isComplete has a value of - {this.isComplete} - and a typeof value of
          "{typeof this.isComplete}"
        </li>
        <li>
          label has a value of - {this.label} - and a typeof value of "
          {typeof this.label}"
        </li>
        <li>
          thingToDo has a value of - {this.thingToDo} - and a typeof value of "
          {typeof this.thingToDo}"
        </li>
      </ul>
    );
  }
}
```

当使用类型为 `any` 的模板属性时(隐式或显式)，提供给属性的值保留自己的类型信息。Stencil 和 TypeScript 都不会尝试改变属性的类型。
为了演示，让我们使用两次 `todo-list-item`，每次使用不同的 prop 值:

```tsx
{/* Using todo-list-item in TSX using differnt values each time */}
<todo-list-item isComplete={42} label={null} thingToDo={"Learn about any-typed props"}></todo-list-item>
<todo-list-item isComplete={"42"} label={1} thingToDo={"Learn about any-typed props"}></todo-list-item>
```

以下内容将根据上面的用法示例渲染:

```md
- isComplete has a value of - 42 - and a typeof value of "number"
- label has a value of - - and a typeof value of "object"
- thingToDo has a value of - Learn about any-typed props - and a typeof value of "string"

- isComplete has a value of - 42 - and a typeof value of "string"
- label has a value of - 1 - and a typeof value of "number"
- thingToDo has a value of - Learn about any-typed props - and a typeof value of "string"
```

在 `todo-list-item` 的第一次使用中，给 `isComplete` 提供了一个 42 的数值，而在第二次使用中，它接收了一个包含"42"的字符串。
`isComplete` 上的类型分别反映了它提供的值的类型 `number` 和 `string`。

看看`label`，值得注意的是，尽管属性有一个[默认值](#default-values)，但它并没有将 `label` 的类型缩小为 `string` 类型。
在 `todo-list-item` 的第一次使用中，`label` 的值是 null，而在第二次使用中，它的值是 1。存储在 `label` 中的值的类型分别正确地报告为 `object` 和 `number`。

#### 可选类型{#optional-types}

TypeScript 允许通过在成员名称的末尾附加 "?" 将成员标记为可选。下面的示例演示了使每个组件的道具都是可选的：

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  // completeMsg 是可选的，有一个显式的
  //  `string` 类型注解，并且没有默认值
  @Prop() completeMsg?: string;
  // label 是可选的，没有显式类型注释
  // 但有默认值 'urgent'
  @Prop() label? = "urgent";
  // thingToDo 没有类型注释也没有默认值
  @Prop() thingToDo?;

  render() {
    return (
      <ul>
        <li>
          completeMsg has a value of - {this.completeMsg} - and a typeof value
          of "{typeof this.completeMsg}"
        </li>
        <li>
          label has a value of - {this.label} - and a typeof value of "
          {typeof this.label}"
        </li>
        <li>
          thingToDo has a value of - {this.thingToDo} - and a typeof value of "
          {typeof this.thingToDo}"
        </li>
      </ul>
    );
  }
}
```

当使用标记为可选的 Stencil prop 时，如果没有明确指定类型，Stencil 将尝试推断 prop 的类型。在上面的例子中，Stencil 能够理解:

- `completeMsg` 是字符串类型，因为它有一个显式的类型注释
- `label` 是字符串类型，因为它有一个字符串类型的[默认值](#default-values)
- `thingToDo` 是 [`any`](#any-type) 类型，因为它没有明确的类型注释，也没有默认值

因为 Stencil 可以推断出 `label` 的类型，下面的代码会因为类型不匹配而编译失败：

```tsx
{
  /* 这将导致编译失败，并出现标签 prop 的错误 "Type 'number' is not assignable to type 'string'"。 */
}
<todo-list-item
  completeMsg={"true"}
  label={42}
  thingToDo={"Learn about any-typed props"}
></todo-list-item>;
```

值得注意的是，当在 HTML 文件中使用组件时，这种类型检查是不可用的。这是 HTML 的一个约束，提供给属性的所有值的类型都是 string:

```html
<!-- 在 html 中使用 todo-list-item -->
<todo-list-item
  complete-msg="42"
  label="null"
  thing-to-do="Learn about any-typed props"
></todo-list-item>
```

渲染成：

```md
- completeMsg has a value of - 42 - and a typeof value of "string"
- label has a value of - null - and a typeof value of "string"
- thingToDo has a value of - Learn about any-typed props - and a typeof value of "string"
```

#### Union Types

Stencil 允许 props 类型为 [union types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)，
这允许开发人员将两个或多个现有类型组合起来创建一个新的类型。
下面的例子展示了一个 `todo-list-item` 对象，它接受一个 `isComplete` 属性，该属性可以是字符串或布尔值。

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() isComplete: string | boolean;
}
```

这个组件可以在 HTML 中使用:

```html
<todo-list-item is-complete="true"></todo-list-item>
<todo-list-item is-complete="false"></todo-list-item>
```

和 TSX:

```tsx
<todo-list-item isComplete={true}></todo-list-item>
<todo-list-item isComplete={false}></todo-list-item>
```

## 默认值{#default-values}

Stencil props 可以被赋予一个默认值，作为未提供 prop 的回退:

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "component-with-some-props",
})
export class ComponentWithSomeProps {
  @Prop() aNumber = 42;
  @Prop() aString = "defaultValue";

  render() {
    return (
      <div>
        The number is {this.aNumber} and the string is {this.aString}
      </div>
    );
  }
}
```

无论我们是在 HTML 还是 TSX 中使用这个组件，当没有值传递给我们的组件时，都会显示 "number is 42 and The string is defaultValue"：

```html
<component-with-some-props></component-with-some-props>
```

可以通过为带有默认值的 prop 指定值来覆盖组件上的默认值。
对于下面的例子, 将渲染成 "The number is 7 and the string is defaultValue"。
注意，提供给 `aNumber` 的值覆盖了默认值，但 `aString` 的默认值仍然保持不变。

```html
<component-with-some-props a-number="7"></component-with-some-props>
```

### 从默认值推断类型{#inferring-types-from-default-values}

当提供默认值时，Stencil 能够从默认值推断出 prop 的类型:

```tsx
import { Component, Prop, h } from "@stencil/core";
@Component({
  tag: "component-with-many-props",
})
export class ComponentWithManyProps {
  // 下面两个 prop 的类型都是 'boolean'
  @Prop() boolean1: boolean;
  @Prop() boolean2 = true;

  // 下面两个 prop 的类型都是 'number'
  @Prop() number1: number;
  @Prop() number2 = 42;

  // 下面两个 prop 的类型都是 'string'
  @Prop() string1: string;
  @Prop() string2 = "defaultValue";
}
```

## 必填的 prop{#required-property}

通过在 prop 名称之后附加 `!`，Stencil 根据需要标记该 attribute/property 为必填。这样可以确保在 TSX 中使用组件时，将使用该属性：

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  // Note the '!' after the variable name.
  @Prop() thingToDo!: string;
}
```

## Prop 校验{#prop-validation}

要校验 Prop, 可以使用 [@Watch()](./reactive-data#the-watch-decorator-watch) 装饰器：

```tsx
import { Component, Prop, Watch, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class TodoList {
  // Mark the prop as required, to make sure it is provided when we use `todo-list-item`.
  // We want stricter guarantees around the contents of the string, so we'll use `@Watch` to perform additional validation.
  @Prop() thingToDo!: string;

  @Watch("thingToDo")
  validateName(newValue: string, _oldValue: string) {
    // don't allow `thingToDo` to be the empty string
    const isBlank = typeof newValue !== "string" || newValue === "";
    if (isBlank) {
      throw new Error("thingToDo is a required property and cannot be empty");
    }
    // don't allow `thingToDo` to be a string with a length of 1
    const has2chars = typeof newValue === "string" && newValue.length >= 2;
    if (!has2chars) {
      throw new Error("thingToDo must have a length of more than 1 character");
    }
  }
}
```

## @Prop() Options

`@Prop()` 装饰器接受一个可选参数来指定特定的选项，以修改组件上 prop 的行为。`@Prop()` 的可选参数是一个对象字面量，包含以下一个或多个字段：

```tsx
export interface PropOptions {
  attribute?: string;
  mutable?: boolean;
  reflect?: boolean;
}
```

### Attribute Name (`attribute`)

Properties 和组件 attributes 是强关联的，但不一定是同一件事。attributes 是一个 HTML 概念，但 properties 是 JavaScript 中面向对象编程固有的概念。

在 Stencil 中，应用于 **property** 的 `@Prop()` 装饰器将指示 Stencil 编译器也监听 DOM 属性的变化。

通常，property 名与 attribute 名相同，但情况并不总是如此。以下面的组件为例：

```tsx
import { Component, Prop, h } from "@stencil/core";
// `MyHttpService` is an `Object` in this example
import { MyHttpService } from "../some/local/directory/MyHttpService";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() isComplete: boolean;
  @Prop() thingToDo: string;
  @Prop() httpService: MyHttpService;
}
```

这个组件有 **3 properties**, 但是编译器只会创建 **2 attributes**: `is-complete` 和 `thing-to-do`.

```html
<todo-list-item is-complete="false" thing-to-do="Read Attribute Naming Section of Stencil Docs"></my-cmp>
```

请注意，`httpService` 类型不是原始类型(例如，不是 `number`、`boolean` 或 `string`)。由于 DOM 属性只能是字符串，因此使用 `"http-service"`
作为 DOM 属性是没有意义的。Stencil 不会尝试将 HTML 中类似对象的字符串序列化为 JavaScript 对象。
关于如何配置 `httpService`，请参阅 [Object Props](#object-props)。

同时，`isComplete`和 `thingToDo` properties 遵循 `camelCase` 命名，但 attributes 不区分大小写，因此 attributes 名称默认为 `is-complete` 和 `thing-to-do`。

幸运的是，这种“默认”行为可以使用 `@Prop()` 装饰器的 `attribute` 选项来改变:

```tsx
import { Component, Prop, h } from "@stencil/core";
// `MyHttpService` is an `Object` in this example
import { MyHttpService } from "../some/local/directory/MyHttpService";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop({ attribute: "complete" }) isComplete: boolean;
  @Prop({ attribute: "thing" }) thingToDo: string;
  @Prop({ attribute: "my-service" }) httpService: MyHttpService;
}
```

通过使用这个选项，当在 HTML 中使用组件时，我们可以明确地知道哪些 property 有关联的 DOM attribute 以及 attribute 的名称。

```html
<todo-list-item complete="false" thing="Read Attribute Naming Section of Stencil Docs" my-service="{}"></my-cmp>
```

### Prop Mutability (`mutable`)

默认情况下，Prop 在组件内部是不可变的。然而，通过将 Prop 声明为可变的，可以显式地允许在组件内部改变 Prop，如下面的例子所示：

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop({ mutable: true }) thingToDo: string;

  componentDidLoad() {
    this.thingToDo = "Ah! A new value!";
  }
}
```

#### Mutable Arrays and Objects

Stencil 通过引用来比较 Props，以便高效地重新渲染组件。
在一个对象或数组的 Prop 上设置 `mutable: true` 允许组件内部对该 Prop 的引用发生改变并触发渲染。
它不允许通过对现有对象或数组的可变更改来触发渲染。

例如，要更新数组 Prop：

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "my-component",
})
export class MyComponent {
  @Prop({ mutable: true }) contents: string[] = [];
  timer: NodeJS.Timer;

  connectedCallback() {
    this.timer = setTimeout(() => {
      // this does not create a new array. when stencil
      // attempts to see if any of its Props have changed,
      // it sees the reference to its `contents` Prop is
      // the same, and will not trigger a render

      // this.contents.push('Stencil')

      // this does create a new array, and therefore a
      // new reference to the Prop. Stencil will pick up
      // this change and rerender
      this.contents = [...this.contents, "Stencil"];
      // after 3 seconds, the component will re-render due
      // to the reference change in `this.contents`
    }, 3000);
  }

  disconnectedCallback() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return <div>Hello, World! I'm {this.contents[0]}</div>;
  }
}
```

在上面的例子中，使用 `this.contents.push('Stencil')` 原地更新 prop 是没有效果的。
Stencil 看不到对 `this.contents` 的更改。因为它查看了 prop 的引用并发现它没有改变。
这样做是出于性能考虑。
如果 Stencil 必须遍历数组中的每个值来确定它是否发生了变化，则会导致性能下降。
相反，重新为 prop 赋值(在上面的例子中，我们使用扩展运算符)被认为是更好的性能和更习惯的做法。

这同样适用于对象。
应该使用展开运算符创建一个新对象，而不是原地改变现有对象。这个对象会因引用而不同，因此会触发重新渲染:

```tsx
import { Component, Prop, h } from "@stencil/core";

export type MyContents = { name: string };

@Component({
  tag: "my-component",
})
export class MyComponent {
  @Prop({ mutable: true }) contents: MyContents;
  timer: NodeJS.Timer;

  connectedCallback() {
    this.timer = setTimeout(() => {
      // this does not create a new object. when stencil
      // attempts to see if any of its Props have changed,
      // it sees the reference to its `contents` Prop is
      // the same, and will not trigger a render

      // this.contents.name = 'Stencil';

      // this does create a new object, and therefore a
      // new reference to the Prop. Stencil will pick up
      // this change and rerender
      this.contents = { ...this.contents, name: "Stencil" };
      // after 3 seconds, the component will re-render due
      // to the reference change in `this.contents`
    }, 3000);
  }

  disconnectedCallback() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return <div>Hello, World! I'm {this.contents.name}</div>;
  }
}
```

### Reflect Properties Values to Attributes (`reflect`)

在某些情况下，让 prop 和 attribute 保持同步可能很有用。在这种情况下，你可以将 `@Prop()` 装饰器中的 `reflect` 选项设置为 `true`。
当一个 prop 被反射时，它会作为一个 HTML 属性呈现在 DOM 中。

以下面的组件为例:

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop({ reflect: false }) isComplete: boolean = false;
  @Prop({ reflect: true }) timesCompletedInPast: number = 2;
  @Prop({ reflect: true }) thingToDo: string =
    "Read Reflect Section of Stencil Docs";
}
```

上面示例中的组件使用了[默认值](#default-values)，可以像这样在 HTML 中使用:

```html
<!-- Example of using todo-list-item in HTML -->
<todo-list-item></todo-list-item>
```

当在 DOM 中渲染时，配置了 `reflect: true` 的 prop 将作为 HTML 属性在 DOM 中反映:

```html
<todo-list-item
  times-completed-in-past="2"
  thing-to-do="Read Reflect Section of Stencil Docs"
></todo-list-item>
```

虽然没有设置为 "reflect" 的属性，例如 `isComplete`，没有被渲染为 DOM 属性，但这并不意味着它不存在——`isComplete` 属性仍然包含被赋值的 `false` 值:

```tsx
const cmp = document.querySelector("todo-list-item");
console.log(cmp.isComplete); // it prints 'false'
```
