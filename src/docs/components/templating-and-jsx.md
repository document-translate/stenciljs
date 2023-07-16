---
description: 使用 JSX
---

# 使用 JSX

模板组件使用 JSX 呈现，JSX 是一种流行的声明式模板语法。每个组件都有一个 `render` 函数，该函数返回在运行时渲染到 DOM 的组件树

## 基础{#basics}

`render` 函数用于输出将被绘制到屏幕上的组件树。

```tsx
class MyComponent {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>This is JSX!</p>
      </div>
    );
  }
}
```

在本例中，我们将返回 `div` 的 JSX 表示形式，并带有两个子元素 `h1` 和 `p`

### 宿主元素{#host-element}

如果你想修改宿主元素本身，比如给组件本身添加一个类或一个属性，可以使用 `<host>` 函数组件。 [查看更多详情](./host-element)

## 数据绑定{#data-binding}

组件通常需要呈现动态数据。要在 JSX 中做到这一点，在变量周围使用 `{ }`:

```tsx
render() {
  return (
    <div>Hello {this.name}</div>
  )
}
```

:::info 提示
如果你熟悉 ES6 模板变量，JSX 变量非常相似，只是没有 `$`:
:::

```tsx
//ES6
`Hello ${this.name}`

//JSX
Hello {this.name}
```

## 条件{#conditionals}

如果我们想有条件地渲染不同的内容，我们可以使用 JavaScript 的 If /else 语句:
在这里，如果 `name` 没有定义，我们可以渲染一个不同的元素。

```tsx
render() {
  if (this.name) {
    return ( <div>Hello {this.name}</div> )
  } else {
    return ( <div>Hello, World</div> )
  }
}
```

此外，内联条件可以使用 JavaScript 三元操作符创建:

```tsx
render() {
  return (
    <div>
    {this.name
      ? <p>Hello {this.name}</p>
      : <p>Hello World</p>
    }
    </div>
  );
}
```

**请注意:** Stencil 重用 DOM 元素以获得更好的性能。考虑下面的代码:

```tsx
{
  someCondition ? (
    <my-counter initialValue={2} />
  ) : (
    <my-counter initialValue={5} />
  );
}
```

以上代码的行为与下面的代码完全相同:

```tsx
<my-counter initialValue={someCondition ? 2 : 5} />
```

因此，如果 `someCondition` 发生改变， `<my-counter>` 内部状态不会发生重置并且它的生命周期方法，比如 `componentWillLoad()` 不会触发。
相反，条件语句仅仅触发对同一个组件的更新。

如果你想在一个条件中销毁或重新创建一个组件，你可以指定 `key` 属性。这告诉 Stencil 组件实际上是不同的兄弟元素:

```tsx
{
  someCondition ? (
    <my-counter key="a" initialValue={2} />
  ) : (
    <my-counter key="b" initialValue={5} />
  );
}
```

这样，如果 `someCondition` 改变了，你得到一个新的 `<my-counter>` 组件与新的内部状态，也运行生命周期方法 `componentWillLoad()` 和 `componentDidLoad()`

## 插槽{#slots}

组件通常需要在其组件树的特定位置呈现动态的子组件，允许开发人员在使用我们的组件时提供子内容，我们的组件将该子组件放置在适当的位置。

为此，你可以在 `my-component` 内部使用 [Slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)
标签。

```tsx
// my-component.tsx

render() {
  return (
    <div>
      <h2>A Component</h2>
      <div><slot /></div>
    </div>
  );
}

```

然后，如果用户在创建组件 `my-component` 时传递了子组件，那么 `my-component` 将把该组件放在上面的第二个 `<div>` 中:

```tsx
render(){
  return(
    <my-component>
      <p>Child Element</p>
    </my-component>
  )
}
```

插槽也可以使用 `name` 属性来指定插槽的输出位置:

```tsx
// my-component.tsx

render(){
  return [
    <slot name="item-start" />,
    <h1>Here is my main content</h1>,
    <slot name="item-end" />
  ]
}
```

```tsx
render(){
  return(
    <my-component>
      <p slot="item-start">I'll be placed before the h1</p>
      <p slot="item-end">I'll be placed after the h1</p>
    </my-component>
  )
}
```

## Dealing with Children

JSX 中节点的子节点在运行时对应于一个节点数组， 它们是通过使用 [`array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
创建或者直接在 JSX 中声明为兄弟。这意味着在运行时下面两个顶级 div 的子元素（`.Todo-one` 和 `.todo-two`）将是用同样的方式表示:

```tsx
render() {
  return (
    <>
      <div class="todo-one">
        {this.todos.map((todo) => (
          <span>{ todo.taskName }</span>
        )}
      </div>
      <div class="todo-two">
        <span>{ todos[0].taskName }</span>
        <span>{ todos[1].taskName }</span>
      </div>
    </>
  )
}
```

如果这个子数组是动态的，也就是说，如果任何节点可以被添加、删除或重新排序，那么在每个元素上设置一个唯一的 `key` 属性是一个好主意，像这样:

```tsx
render() {
  return (
    <div>
      {this.todos.map((todo) => (
        <div key={todo.uid}>
          <div>{todo.taskName}</div>
        </div>
      ))}
    </div>
  )
}
```

当子数组中的节点被重新排列时，Stencil 会努力在渲染中保留 DOM 节点，但它不能在所有情况下都这样做。设置一个 `key` 属性可以让 Stencil 确保它可以在渲染中匹配新的和旧的子节点，
从而避免不必要地重新创建 DOM 节点。

:::warning 谨慎
不要使用数组索引或其他非唯一值作为 `key`。尽量确保每个子节点都有一个不变的 `key`，并且在所有兄弟节点中是唯一的。
:::

## 处理用户输入{#handling-user-input}

Stencil 使用原生的 [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events).

下面是一个处理按钮点击的示例。注意 [箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
的使用

```tsx
...
export class MyComponent {
  private handleClick = () => {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click Me!</button>
    );
  }
}
```

下面是另一个监听 input 元素 `change` 事件的例子。注意 [箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
的使用。

```tsx
...
export class MyComponent {
  private inputChanged = (event: Event) => {
    console.log('input changed: ', (event.target as HTMLInputElement).value);
  }

  render() {
    return (
      <input onChange={this.inputChanged}/>
    );
  }
}
```

## 复杂的模板内容{#complex-template-content}

到目前为止，我们已经看到了如何只返回单个根元素的示例。我们也可以在根元素中嵌套元素

如果组件有多个 "顶级" 元素，那么 `render` 函数可以返回一个数组。注意 `<div>` 元素之间的 ","。

```tsx
render() {
  return ([
  // 第一个顶级元素
  <div class="container">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>,

  // 第二个顶级元素, 注意 “,”
  <div class="another-container">
    ... more html content ...
  </div>
  ]);
}
```

或者你可以使用 `Fragment` 功能组件，在这种情况下，你不需要添加逗号:

```tsx
import { Fragment } from '@stencil/core';
...
render() {
  return (<Fragment>
    // first top level element
    <div class="container">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>

    <div class="another-container">
      ... more html content ...
    </div>
  </Fragment>);
}
```

也可以使用 `innerHTML` 将内容直接内联到元素中。这在一下情况很有帮助，例如，动态加载一个 syg，然后想要在 `div` 中渲染它。这就像在普通的 HTML 中一样:

```tsx
<div innerHTML={svgContent}></div>
```

## 获取对 DOM 元素的引用{#getting-a-reference-to-a-DOM-element}

在需要获取对元素的直接引用的情况下，就像通常使用 `document.querySelector` 一样，您可能希望在 JSX 中使用 `ref`。让我们看一个在表单中使用 `ref` 的例子:

```tsx
@Component({
  tag: "app-home",
})
export class AppHome {
  textInput!: HTMLInputElement;

  handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(this.textInput.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            ref={(el) => (this.textInput = el as HTMLInputElement)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

In this example we are using `ref` to get a reference to our input `ref={(el) => this.textInput = el as HTMLInputElement}`. We can then use that ref to do things such as grab the value from the text input directly `this.textInput.value`.

## 避免共享 JSX 节点{#avoid-shared-JSX-nodes}

渲染器缓存元素查找是为了提高性能。然而，这样做的一个副作用是不应该在相同的呈现器中共享完全相同的 JSX 节点。

在下面的示例中，`sharedNode` 变量在 `render()` 函数中被重用多次。渲染器能够通过缓存引用来优化其 DOM 元素查找，但是，这在重用节点时会导致问题。相反，建议始终生成惟一的节点，如下面的更改示例所示。

```tsx
@Component({
  tag: "my-cmp",
})
export class MyCmp {
  render() {
    const sharedNode = <div>Text</div>; // [!code --]
    return (
      <div>
        {sharedNode} // [!code --]
        {sharedNode} // [!code --]
        <div>Text</div> // [!code ++]
        <div>Text</div> // [!code ++]
      </div>
    );
  }
}
```

另外，可以使用创建一个工厂函数来返回一个公共 JSX 节点。示例如下

```tsx
@Component({
  tag: "my-cmp",
})
export class MyCmp {
  getText() {
    return <div>Text</div>;
  }

  render() {
    return (
      <div>
        {this.getText()}
        {this.getText()}
      </div>
    );
  }
}
```

## 其它资源{#other-resources}

- [Understanding JSX for StencilJS Applications](https://www.joshmorony.com/understanding-jsx-for-stencil-js-applications/)
