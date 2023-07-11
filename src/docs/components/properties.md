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

#### `any` 类型

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

#### Optional Types

TypeScript allows members to be marked optional by appending a `?` at the end of the member's name. The example below
demonstrates making each a component's props optional:

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  // completeMsg is optional, has an explicit type
  // annotation of `string`, and no default value
  @Prop() completeMsg?: string;
  // label is optional, has no explicit type
  // annotation, but does have a default value
  // of 'urgent'
  @Prop() label? = "urgent";
  // thingToDo has no type annotation and no
  // default value
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

When using a Stencil prop that is marked as optional, Stencil will try to infer the type of the prop if a type is
not explicitly given. In the example above, Stencil is able to understand that:

- `completeMsg` is of type string, because it has an explicit type annotation
- `label` is of type string, because it has a [default value](#default-values) that is of type string
- `thingToDo` [is of type `any`](#any-type), because it has no explicit type annotation, nor default value

Because Stencil can infer the type of `label`, the following will fail to compile due to a type mismatch:

```tsx
{
  /* This fails to compile with the error "Type 'number' is not assignable to type 'string'" for the label prop. */
}
<todo-list-item
  completeMsg={"true"}
  label={42}
  thingToDo={"Learn about any-typed props"}
></todo-list-item>;
```

It is worth noting that when using a component in an HTML file, such type checking is unavailable. This is a constraint
on HTML, where all values provided to attributes are of type string:

```html
<!-- using todo-list-item in HTML -->
<todo-list-item
  complete-msg="42"
  label="null"
  thing-to-do="Learn about any-typed props"
></todo-list-item>
```

renders:

```md
- completeMsg has a value of - 42 - and a typeof value of "string"
- label has a value of - null - and a typeof value of "string"
- thingToDo has a value of - Learn about any-typed props - and a typeof value of "string"
```

#### Union Types

Stencil allows props types be [union types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types),
which allows you as the developer to combine two or more pre-existing types to create a new one. The example below shows
a `todo-list-item` who accepts a `isComplete` prop that can be either a string or boolean.

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "todo-list-item",
})
export class ToDoListItem {
  @Prop() isComplete: string | boolean;
}
```

This component can be used in both HTML:

```html
<todo-list-item is-complete="true"></todo-list-item>
<todo-list-item is-complete="false"></todo-list-item>
```

and TSX:

```tsx
<todo-list-item isComplete={true}></todo-list-item>
<todo-list-item isComplete={false}></todo-list-item>
```

## 默认值{#default-values}

Stencil props can be given a default value as a fallback in the event a prop is not provided:

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

Regardless of if we use this component in HTML or TSX, "The number is 42 and the string is defaultValue" is displayed
when no values are passed to our component:

```html
<component-with-some-props></component-with-some-props>
```

The default values on a component can be overridden by specifying a value for a prop with a default value. For the
example below, "The number is 7 and the string is defaultValue" is rendered. Note how the value provided to `aNumber`
overrides the default value, but the default value of `aString` remains the same:

```html
<component-with-some-props a-number="7"></component-with-some-props>
```

### Inferring Types from Default Values

When a default value is provided, Stencil is able to infer the type of the prop from the default value:

```tsx
import { Component, Prop, h } from "@stencil/core";
@Component({
  tag: "component-with-many-props",
})
export class ComponentWithManyProps {
  // both props below are of type 'boolean'
  @Prop() boolean1: boolean;
  @Prop() boolean2 = true;

  // both props below are of type 'number'
  @Prop() number1: number;
  @Prop() number2 = 42;

  // both props below are of type 'string'
  @Prop() string1: string;
  @Prop() string2 = "defaultValue";
}
```

## Required Properties

By placing a `!` after a prop name, Stencil mark that the attribute/property as required. This ensures that when the
component is used in TSX, the property is used:

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

## Prop Validation

To do validation of a Prop, you can use the [@Watch()](./reactive-data.md#the-watch-decorator-watch) decorator:

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

The `@Prop()` decorator accepts an optional argument to specify certain options to modify how a prop on a component
behaves. `@Prop()`'s optional argument is an object literal containing one or more of the following fields:

```tsx
export interface PropOptions {
  attribute?: string;
  mutable?: boolean;
  reflect?: boolean;
}
```

### Attribute Name (`attribute`)

Properties and component attributes are strongly connected but not necessarily the same thing. While attributes are an
HTML concept, properties are a JavaScript concept inherent to Object-Oriented Programming.

In Stencil, the `@Prop()` decorator applied to a **property** will instruct the Stencil compiler to also listen for
changes in a DOM attribute.

Usually, the name of a property is the same as the attribute, but this is not always the case. Take the following
component as example:

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

This component has **3 properties**, but the compiler will create **only 2 attributes**: `is-complete` and
`thing-to-do`.

```html
<todo-list-item is-complete="false" thing-to-do="Read Attribute Naming Section of Stencil Docs"></my-cmp>
```

Notice that the `httpService` type is not a primitive (e.g. not a `number`, `boolean`, or `string`). Since DOM
attributes can only be strings, it does not make sense to have an associated DOM attribute called `"http-service"`.
Stencil will not attempt to serialize object-like strings written in HTML into a JavaScript object.
See [Object Props](#object-props) for guidance as to how to configure `httpService`.

At the same time, the `isComplete` & `thingToDo` properties follow 'camelCase' naming, but attributes are
case-insensitive, so the attribute names will be `is-complete` & `thing-to-do` by default.

Fortunately, this "default" behaviour can be changed using the `attribute` option of the `@Prop()` decorator:

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

By using this option, we are being explicit about which properties have an associated DOM attribute and the name of it
when using the component in HTML.

```html
<todo-list-item complete="false" thing="Read Attribute Naming Section of Stencil Docs" my-service="{}"></my-cmp>
```

### Prop Mutability (`mutable`)

A Prop is by default immutable from inside the component logic.
However, it's possible to explicitly allow a Prop to be mutated from inside the component, by declaring it as mutable, as in the example below:

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

Stencil compares Props by reference in order to efficiently rerender components.
Setting `mutable: true` on a Prop that is an object or array allows the _reference_ to the Prop to change inside the component and trigger a render.
It does not allow a mutable change to an existing object or array to trigger a render.

For example, to update an array Prop:

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

In the example above, updating the Prop in place using `this.contents.push('Stencil')` would have no effect.
Stencil does not see the change to `this.contents`, since it looks at the _reference_ of the Prop, and sees that it has not changed.
This is done for performance reasons.
If Stencil had to walk every slot of the array to determine if it changed, it would incur a performance hit.
Rather, it is considered better for performance and more idiomatic to re-assign the Prop (in the example above, we use the spread operator).

The same holds for objects as well.
Rather than mutating an existing object in-place, a new object should be created using the spread operator. This object will be different-by-reference and therefore will trigger a re-render:

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

In some cases it may be useful to keep a Prop in sync with an attribute. In this case you can set the `reflect` option
in the `@Prop()` decorator to `true`. When a prop is reflected, it will be rendered in the DOM as an HTML attribute.

Take the following component as example:

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

The component in the example above uses [default values](#default-values), and can be used in HTML like so:

```html
<!-- Example of using todo-list-item in HTML -->
<todo-list-item></todo-list-item>
```

When rendered in the DOM, the properties configured with `reflect: true` will be reflected in the DOM:

```html
<todo-list-item
  times-completed-in-past="2"
  thing-to-do="Read Reflect Section of Stencil Docs"
></todo-list-item>
```

While the properties not set to "reflect", such as `isComplete`, are not rendered as attributes, it does not mean it's
not there - the `isComplete` property still contains the `false` value as assigned:

```tsx
const cmp = document.querySelector("todo-list-item");
console.log(cmp.isComplete); // it prints 'false'
```
