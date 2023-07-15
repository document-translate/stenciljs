# Styling Components

## Shadow DOM{#shadow-dom}

### 什么是 Shadow DOM?{#what-is-the-shadow-dom}

The [shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) is an API built into the browser that allows for DOM encapsulation and style encapsulation. It is a core aspect of the Web Component standards. The shadow DOM shields a component’s styles, markup, and behavior from its surrounding environment. This means that we do not need to be concerned about scoping our CSS to our component, nor worry about a component’s internal DOM being interfered with by anything outside the component.

When talking about the shadow DOM, we use the term "light DOM" to refer to the “regular” DOM. The light DOM encompasses any part of the DOM that does not use the shadow DOM.

### Stencil 中的 Shadow DOM{#shadow-dom-in-stencil}

The shadow DOM hides and separates the DOM of a component in order to prevent clashing styles or unwanted side effects. We can use the shadow DOM in our Stencil components to ensure our components won’t be affected by the applications in which they are used.

To use the Shadow DOM in a Stencil component, you can set the `shadow` option to `true` in the component decorator.

```tsx
@Component({
  tag: "shadow-component",
  styleUrl: "shadow-component.css",
  shadow: true,
})
export class ShadowComponent {}
```

如果你想了解更多关于启用和配置 shadow DOM 的信息，请参阅[组件 api 的 shadow 字段](./component#component-options)。

默认情况下，使用 [`stencil generate` 命令](../config/cli#stencil-generate-sub-folder)创建的组件默认使用 Shadow DOM。

### Styling with the Shadow DOM

With the shadow DOM enabled, elements within the shadow root are scoped, and styles outside of the component do not apply. As a result, CSS selectors inside the component can be simplified, as they will only apply to elements within the component. We do not have to include any specific selectors to scope styles to the component.

```css
:host {
  color: black;
}

div {
  background: blue;
}
```

:::info 提示
`:host` 伪类选择器用于选择组件的 [`Host` 元素](./host-element)
:::

With the shadow DOM enabled, only these styles will be applied to the component. Even if a style in the light DOM uses a selector that matches an element in the component, those styles will not be applied.

### Shadow DOM 选择器{#shadow-dom-querySelector}

When using Shadow DOM and you want to query an element inside your web component, you must first use the [`@Element` decorator](./host-element#element-decorator) to gain access to the host element, and then you can use the `shadowRoot` property to perform the query. This is because all of your DOM inside your web component is in a shadowRoot that Shadow DOM creates. For example:

```tsx
import { Component, Element } from '@stencil/core';

@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.css',
  shadow: true
})
export class ShadowComponent {

  @Element() el: HTMLElement;

  componentDidLoad() {
    const elementInShadowDom = this.el.shadowRoot.querySelector('.a-class-selector');

    ...
  }

}
```

### Shadow DOM 的浏览器支持{#shadow-dom-browser-support}

shadow DOM 目前原生支持的浏览器有：

- Chrome
- Firefox
- Safari
- Edge (v79+)
- Opera

在不支持 shadow DOM 的浏览器中，我们退回到 scoped CSS。这为你提供了 shadow DOM 附带的样式封装，但无需加载巨大的 shadow DOM polyfill。

### 作用域 CSS{#scoped-css}

使用 shadow DOM 的另一种选择是使用作用域组件。你可以通过在组件装饰器中将 `scoped` 选项设置为 `true` 来使用受限组件。

```tsx
@Component({
  tag: "scoped-component",
  styleUrl: "scoped-component.css",
  scoped: true,
})
export class ScopedComponent {}
```

Scoped CSS is a proxy for style encapsulation. It works by appending a data attribute to your styles to make them unique and thereby scope them to your component. It does not, however, prevent styles from the light DOM from seeping into your component.

## CSS 变量{#css-custom-properties}

CSS 自定义属性通常也称为 CSS 变量，用于包含可以在多个 CSS 声明中使用的值。例如，我们可以创建一个名为 `--color-primary` 的自定义属性，并将其值赋值为 `blue`。

```css
:host {
  --color-primary: blue;
}
```

然后我们可以使用该自定义属性来设置组件的不同部分的样式

```css
h1 {
  color: var(--color-primary);
}
```

### Customizing Components with Custom Properties

CSS custom properties can allow the consumers of a component to customize a component’s styles from the light DOM. Consider a `shadow-card` component that uses a custom property for the color of the card heading.

```css
:host {
  --heading-color: black;
}

.heading {
  color: var(--heading-color);
}
```

:::info 提示
CSS 自定义属性必须在 `Host` 元素 (`:Host`) 上声明，以便它们暴露给消费应用程序。
:::

The `shadow-card` heading will have a default color of `black`, but this can now be changed in the light DOM by selecting the `shadow-card` and changing the value of the `--heading-color` custom property.

```css
shadow-card {
  --heading-color: blue;
}
```

## CSS Parts

CSS custom properties can be helpful for customizing components from the light DOM, but they are still a little limiting as they only allow a user to modify specific properties. For situations where users require a higher degree of flexibility, we recommend using the [CSS `::part()` pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::part). You can define parts on elements of your component with the “part” attribute.

```tsx
@Component({
  tag: "shadow-card",
  styleUrl: "shadow-card.css",
  shadow: true,
})
export class ShadowCard {
  @Prop() heading: string;

  render() {
    return (
      <Host>
        <h1 part="heading">{this.heading}</h1>
        <slot></slot>
      </Host>
    );
  }
}
```

Then you can use the `::part()` pseudo-class on the host element to give any styles you want to the element with the corresponding part.

```css
shadow-card::part(heading) {
  text-transform: uppercase;
}
```

This allows for greater flexibility in styling as any styles can now be added to this element.

### Exportparts

If you have a Stencil component nested within another component, any `part` specified on elements of the child component will not be exposed through the parent component. In order to expose the `part`s of the child component, you need to use the `exportparts` attribute. Consider this `OuterComponent` which contains the `InnerComponent`.

```tsx
@Component({
  tag: "outer-component",
  styleUrl: "outer-component.css",
  shadow: true,
})
export class OuterComponent {
  render() {
    return (
      <Host>
        <h1>Outer Component</h1>
        <inner-component exportparts="inner-text" />
      </Host>
    );
  }
}

@Component({
  tag: "inner-component",
  styleUrl: "inner-component.css",
  shadow: true,
})
export class InnerComponent {
  render() {
    return (
      <Host>
        <h1 part="inner-text">Inner Component</h1>
      </Host>
    );
  }
}
```

By specifying "inner-text" as the value of the `exportparts` attribute, elements of the `InnerComponent` with a `part` of "inner-text" can now be styled in the light DOM. Even though the `InnerComponent` is not used directly, we can style its parts through the `OuterComponent`.

```html
<style>
  outer-component::part(inner-text) {
    color: blue;
  }
</style>

<outer-component />
```

## 全局样式{#global-styles}

虽然大多数样式通常局限于每个组件，但有时让样式对项目中的所有组件都可用是很有用的。要创建全局可用的样式，首先要创建全局样式表。
例如，你可以在 `src` 目录下创建一个名为 `global` 的文件夹，并在其中创建一个名为 `global.css` 的文件。
最常见的是，这个文件通过 `:root` 伪类来声明根元素上的 CSS 自定义属性。
这是因为通过 `:root` 伪类提供的样式可以通过 shadow 边界传递。例如，你可以定义一个所有组件都可以使用的主色。

```css
:root {
  --color-primary: blue;
}
```

除了 CSS 自定义属性，全局样式表的其他用例还包括

- Theming: 定义整个应用程序中使用的 CSS 变量
- 使用`@font-face`加载字体
- 应用级别的字体
- CSS 重置

要使全局样式对项目中的所有组件可用，`stencil.config.ts` 文件带有一个可选的 [`globalStyle` 设置](../config/overview#globalstyle)，它接受全局样式表的路径。

```tsx
export const config: Config = {
  namespace: "app",
  globalStyle: "src/global/global.css",
  outputTarget: [
    {
      type: "www",
    },
  ],
};
```

编译器将在 `global.css` 上运行相同的压缩、自动修复和插件，并为 [`www`](../output-targets/www) 和 [`dist`](../output-targets/dist)输出目标生成一个输出文件。
生成的文件将始终具有 `.css` 扩展名并被命名为指定的 `namespace`。

在上面的例子中，由于命名空间是 `app`，因此生成的全局样式文件将位于: `./www/build/app.css`。

这个文件必须手动导入到应用程序的 `index.html` 中。

```html
<link rel="stylesheet" href="/build/app.css" />
```
