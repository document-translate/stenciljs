---
description: Stencil有许多附加组件，您可以在构建过程中使用它们。
---

# 概述{#overview}

## Stencil: 一个 Web Components 编译器

Stencil 是一个生成 Web Components(更确切地说，是自定义元素)的编译器。Stencil 将最流行的框架的最佳概念结合到一个简单的构建时工具中。

Stencil 使用 TypeScript、JSX 和 CSS 创建符合标准的 Web 组件，这些组件可以用来构建高质量的组件库。

用 Stencil 生成的 Web 组件可以直接与流行的框架一起使用。此外，Stencil 可以生成特定于框架的包装器，这些包装器允许 Stencil 组件与特定于框架的开发人员体验一起使用。

与直接使用[自定义元素 api](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) 相比，
Stencil 提供了[方便的 api](../components/api)，使编写快速组件更加简单。
使用虚拟 DOM、JSX 和异步渲染，可以轻松创建快速且功能强大的组件，这些组件仍然 100%兼容 Web 组件标准。
除了更容易编写自定义元素，Stencil 还在 Web 组件之上添加了许多关键功能，例如预渲染和将对象作为属性(而不仅仅是字符串)。

开发者体验也得到了优化，并提供了实时重载和一个内置到编译器中的小型开发服务器。

## 如何使用 Stencil?{#how-can-i-use-stencil}

### 设计系统和组件库{#design-systems-and-component-libraries}

Stencil 的主要目标是为设计系统和组件库提供令人惊叹的工具。组件作为一个概念，为工程师和设计师提供了类似的语言，以便就设计实现进行富有成效的对话。
[访问 Design Systems 页面了解更多信息。](../guides/design-systems)

## Stencil 的历史{#the-history-of-stencil}

Stencil 最初是由 **[Ionic Framework](http://ionicframework.com/)** 团队创建的，目的是为了构建更快、更强大的组件，并在每个主要框架上工作。

作为 Web 开发人员快速增长的目标，渐进式 Web 应用程序的出现要求对 Web 应用程序开发性能采取不同的方法。Ionic 对传统框架和打包技术的经典使用，使得开发团队很难满足渐进式 Web 应用的延迟和代码量需求，这些应用可以在快网络和慢网络上运行，也可以在各种平台和设备上运行。

此外，框架碎片造成了 web 开发互操作性的噩梦，为一个框架构建的组件不能与另一个框架工作。

Web 组件为这两个问题提供了一个解决方案，将更多的工作推给浏览器以获得更好的性能，并且目标是所有框架都可以使用的基于标准的组件模型。

然而，仅靠 Web Component 还不够。构建快速的 web 应用程序需要创新，而这些创新以前局限在传统的 web 框架中。
Stencil 的目的是将这些功能从传统框架中提取出来，并将它们引入快速出现的 Web 组件标准。虽然 Stencil 主要用于构建设计系统和组件库，但这些创新允许仅使用 Stencil 构建整个应用程序。
