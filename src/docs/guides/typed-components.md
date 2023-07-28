---
description: Typed Components
---

# Typed Components

使用 Stencil 生成的 Web 组件带有由 Stencil 编译器自动生成的类型声明文件。

一般来说，Typescript 声明在使用组件时提供了强大的保证:

- 确保正确的值作为属性传递
- 现代 ide(如 VSCode)中的代码自动补全
- 事件明细
- 组件方法的签名

这些公共类型是由 Stencil 在 `src/component.d.ts` 中自动生成的。
该文件允许在 JSX(就像 React)和每个组件的 `HTMLElement` 接口中使用强类型。

:::info 提示
建议将此文件与源代码控制中的其余代码一起检入。
:::

因为 Stencil 生成的 Web 组件只是普通的 Web 组件，知识它们扩展了 `HTMLElement` 接口。
对于每个组件，在全局作用域中注册一个名为 `HTML{CamelCaseTag}Element` 的类型。
这意味着开发人员不必显式地导入它们，就像 `HTMLElement` 或 `HTMLScriptElement` 不会被导入一样。

- `ion-button` => `HTMLIonButtonElement`
- `ion-menu-controller` => `HTMLIonMenuControllerElement`

```tsx
const button: HTMLIonButtonElement = document.queryElement("ion-button");
button.fill = "outline";
```

**重要提示**：始终使用 `HTML{}Element` 接口来保存对组件的引用。

## Properties

本节以经移动到 [Property Types](../components/properties#types)

### Required Properties

本节以经移动到 [Required Properties](../components/properties#required-properties)
