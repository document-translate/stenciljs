# Events

没有所谓的 stencil 事件，相反，stencil 鼓励使用 [DOM 事件](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)。
然而，Stencil 提供了一个 API 来指定组件可以触发的事件，以及组件监听的事件。它通过 `Event()` 和 `Listen()` 装饰器来实现。

## Event 装饰器{#event-decorator}

组件可以使用事件发射器装饰器发送数据和事件。

要让其他组件处理[自定义 DOM 事件](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)，
请使用 `@Event()` 装饰器。

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

上面的代码将 dispatch 一个名为 `todoCompleted` 的自定义 DOM 事件。

`Event(opts: EventOptions)` 装饰器可选地接受一个选项对象来塑造分派事件的行为。选项和默认值如下所述。

```tsx
export interface EventOptions {
  /**
   * 覆盖默认值的自定义事件名称字符串。
   */
  eventName?: string;
  /**
   * 布尔值，表示事件是否通过DOM向上冒泡。
   */
  bubbles?: boolean;

  /**
   * 布尔值，表示事件是否可取消。
   */
  cancelable?: boolean;

  /**
   * 布尔值，表示事件是否可以跨越 shadow DOM 和 regular DOM 的边界。
   */
  composed?: boolean;
}
```

Example:

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  // Event called 'todoCompleted' that is "composed", "cancellable" and it will bubble up!
  @Event({
    eventName: 'todoCompleted',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    const event = this.todoCompleted.emit(todo);
    if(!event.defaultPrevented) {
      // if not prevented, do some default handling code
    }
  }
}
```

## Listen 装饰器{#listen-decorator}

`Listen()` 装饰器用于监听 DOM 事件，包括从 `@Event` 分发的事件。当组件从 DOM 中添加或删除时，事件监听器会自动添加或删除。

在下面的例子中，假设子组件 `TodoList` 使用 `EventEmitter` 触发一个 `todoCompleted` 事件。

```tsx
import { Listen } from '@stencil/core';

...
export class TodoApp {

  @Listen('todoCompleted')
  todoCompletedHandler(event: CustomEvent<Todo>) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  }
}
```

### Listen 选项{#listen-option}

`@Listen(eventName, opts?: ListenOptions)` 包含了第二个可选参数，可以用来配置如何绑定 DOM 事件监听器。

```tsx
export interface ListenOptions {
  target?: "body" | "document" | "window";
  capture?: boolean;
  passive?: boolean;
}
```

可用的选项是 `target`, `capture` 和 `passive`:

#### target

也可以为主机本身以外的事件注册处理程序。
`target` 选项可用于更改事件监听器绑定的位置，这对于监听应用程序范围的事件非常有用。

在下面的例子中，我们将监听从 `window` 发出的 scroll 事件:

```tsx
  @Listen('scroll', { target: 'window' })
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }
```

#### passive

默认情况下，Stencil 使用几种启发式方法来确定是否必须附加一个 `passive` 事件监听器。`passive` 选项可以用来改变默认行为。

请查看 [https://developers.google.com/web/updates/2016/06/passive-event-listeners](https://developers.google.com/web/updates/2016/06/passive-event-listeners)
了解更多信息。

#### capture

默认情况下，带有`@Listen`的事件监听器没有 "capture"。
当事件监听器设置为 "capture" 时，这意味着事件将在 "capture 阶段" 分发。
查看 [https://www.quirksmode.org/js/events_order.html](https://www.quirksmode.org/js/events_order.html) 了解更多信息。

```tsx
  @Listen('click', { capture: true })
  handleClick(ev) {
    console.log('click');
  }
```

## 键盘事件{#keyboard-event}

对于键盘事件，你可以在 `@Listen()` 中使用标准的 `keydown` 事件并使用`event.keyCode`或`event.which` 来获取键的代码，
或者使用 `event.key` 来获取键的字符串表示形式。

```tsx
@Listen('keydown')
handleKeyDown(ev: KeyboardEvent){
  if (ev.key === 'ArrowDown'){
    console.log('down arrow pressed')
  }
}
```

有关事件键字符串的更多信息可以在 [w3c 规范](https://www.w3.org/TR/uievents-key/#named-key-attribute-values)中找到。

## 在 JSX 中使用事件{#using-events-in-jsx}

在 stencil 编译的应用程序或组件中，您还可以在 JSX 中将监听器直接绑定到事件。它的工作原理与普通的 DOM 事件(如 `onClick` )非常相似。

让我们使用上面的 TodoList 组件:

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

我们现在可以使用以下语法直接在 JSX 中的组件上监听这个事件:

```tsx
<todo-list onTodoCompleted={(ev) => this.someMethod(ev)} />
```

这个属性是自动生成的，前缀是"on"。例如，如果触发的事件名为 `todoDeleted`，则该属性将被调用 `onTodoDeleted`:

```tsx
<todo-list onTodoDeleted={(ev) => this.someOtherMethod(ev)} />
```

## 监听来自非 jsx 元素的事件{#listening-to-events-from-a-non-JSX-element}

```tsx
<todo-list></todo-list>
<script>
  const todoListElement = document.querySelector('todo-list');
  todoListElement.addEventListener('todoCompleted', event => { /* your listener */ })
</script>
```
