---
description: 快速上手
---

# 快速上手{#getting-started}

## 开始一个新项目{#starting-a-new-project}

### 前置条件{#prerequisites}

Stencil 需要最新的 LTS 版本的 [NodeJS](https://nodejs.org/) 和 npm/yarn。在继续之前，请确保已经安装或更新了 Node。

### 运行 `create-stencil` CLI{#running-the-create-stencil-cli}

`create-stencil` 命令行可以用来创建一个新的 Stencil 项目，可以使用以下命令运行:

::: code-group

```bash [npm]
npm init stencil
```

```bash [yarn]
yarn create stencil
```

```bash [pnpm]
pnpm create stencil
```

:::
Stencil 可以用来创建独立组件，也可以用来创建整个应用程序。
`create-stencil`将提供一个提示，以便您可以选择要创建的项目类型:

```txt
? Select a starter project.

Starters marked as [community] are developed by the Stencil
Community, rather than Ionic. For more information on the
Stencil Community, please see github.com/stencil-community

❯   component                Collection of web components that can be
                             used anywhere
    app [community]          Minimal starter for building a Stencil
                             app or website
    ionic-pwa [community]    Ionic PWA starter with tabs layout and routes
```

选择 'component' 选项将提示您输入项目的名称。
这里，我们将我们的项目命名为 'my-first-stencil-project':

```bash
✔ Pick a starter › component
? Project name › my-first-stencil-project
```

在按下 `ENTER` 确认您的选择后，CLI 将在与提供的项目名称匹配的目录中为我们生成一个 Stencil 项目。
成功创建项目后，CLI 将在控制台打印类似下面的内容:

```bash
✔ Project name › my-first-stencil-project
✔ All setup  in 26 ms

  We suggest that you begin by typing:

  $ cd my-first-stencil-project
  $ npm install
  $ npm start

  $ npm start
    Starts the development server.

  $ npm run build
    Builds your project in production mode.

  $ npm test
    Starts the test runner.

  Further reading:

   - https://github.com/ionic-team/stencil-component-starter

  Happy coding! 🎈
```

第一部分描述了完成项目引导所需的几个命令。

```bash
$ cd my-first-stencil-project
$ npm install
$ npm start
```

这会将当前目录更改为 `my-first-stencil-project` ，为您安装依赖项，并启动开发服务器

### 有用的初始命令{#useful-initial-commands}

`create-stencil` 输出的第二部分描述了开发过程中可用的一些有用命令

- `npm start` 启动本地开发服务器。开发服务器将打开一个新的浏览器选项卡，其中包含项目的组件。当你修改组件时，dev-server 使用热模块重载来更新浏览器中的组件，以获得快速的反馈周期。

- `npm run build` 构建组件的生产版本。这一步生成的组件不能在本地开发服务器中使用，而是要在使用组件的项目中使用。

- `npm test` 运行项目的测试。`create-stencil` 命令行在搭建项目时创建了端到端测试和单元测试。

At this time, Stencil does not interact with any version control systems (VCS) when running the `create-stencil` CLI.
If you wish to place your project under version control, we recommend initializing your VCS now.
If you wish to use git, run the following after changing your current directory to the root of your Stencil project:

```bash
$ git init
$ git add -A
$ git commit -m "initialize project using stencil cli"
```

## 我的第一个组件{#my-first-component}

通过添加一个后缀为 `.tsx` 的新文件来创建 Stencil 组件。例如 `my-component.tsx`。
因为 Stencil 组件是使用 [JSX](../components/templating-and-jsx) 和 TypeScript 构建的，所以需要 tsx 的扩展。

当我们运行上面的 `create-stencil` 时，它生成了一个组件 `my-component.tsx`。你可以在 `src/components/my-component` 目录下找到它：

:::code-group

```tsx [my-component.tsx]
import { Component, Prop, h } from "@stencil/core";
import { format } from "../../utils/utils";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true,
})
export class MyComponent {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
```

:::

编译后，这个组件就可以像其他标签一样在 HTML 中使用。

```md
<my-component first="Stencil" middle="'Don't call me a framework'" last="JS"></my-component>
```

渲染后，浏览器将显示 `Hello World! I'm Stencil 'Don't call me a framework' JS`.

### `my-component` 剖析{#anatomy-of-my-component}

让我们深入了解并逐行分析 `my-component` 中发生了什么。

import 语句之后，我们看到的第一个部分是 [`@Component` 装饰器](../components/component):

```tsx
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
```

这个装饰器为 Stencil 编译器提供了组件的元数据。
例如要使用的自定义元素名称( `tag` )等信息可以在这里设置。
这个装饰器告诉 Stencil：

- 设置 [元素名字](../components/component#tag) 为 'my-component'
- [应用样式表](../components/component#styleurl) 'my-component.css' 到组件
- 为该组件启用 [原生 Shadow DOM 功能](../components/component.md#shadow)

在 `@Component()` 装饰器下面，我们有一个标准的 JavaScript 类声明:

```tsx
export class MyComponent {
```

在这个类中，您将编写大量代码，以使 Stencil 组件栩栩如生。

接下来，该组件包含三个类成员：`first`、 `middle` 和 `last`。
这些类的每个成员都应用了 [`@Prop()` 装饰器](../components/properties#the-prop-decorator-prop)：

```ts
@Prop() first: string;
@Prop() middle: string;
@Prop() last: string;
```

`@Prop()` 告诉 Stencil 该属性对组件是公共的，并允许 Stencil 在这些公共属性发生变化时重新渲染。
在讨论完 `render()` 函数后，我们将看到它是如何工作的。

为了让组件在屏幕上渲染一些东西，我们必须声明一个返回 JSX 的 [`render()` 函数](../components/templating-and-jsx#basics)。
如果你不确定 JSX 是什么，请务必参考 [使用 JSX](../components/templating-and-jsx) 文档。

简单地说，我们的呈现函数需要返回我们想要推送到 DOM 的 HTML 的表示形式。

```tsx
private getText(): string {
  return format(this.first, this.middle, this.last);
}

render() {
  return <div>Hello, World! I'm {this.getText()}</div>;
}
```

这个组件的 `render()` 返回一个 `<div>` 元素，包含要渲染到屏幕上的文本。

`render()` 函数通过 `getText` 函数使用了所有三个用 `@Prop()` 修饰的类成员。
声明像 `getText` 这样的私有函数有助于将逻辑从 `render()` 函数的 JSX 中提取出来。

任何用 `@Prop()` 修饰的属性也会被自动监视变化。
如果我们组件的用户要更改元素的 `first`、`middle` 或 `last` 属性，我们的组件将再次触发它的 `render()` 函数，更新显示的内容。

## 组件生成器{#component-generator}

`create-stencil` CLI 可以为你生成新组件。
如果使用了其中一个启动器，则可以简单地在项目中运行名为 `generate` 的 npm 脚本，该脚本将启动交互式生成器。

:::code-group

```bash [npm]
npm run generate
```

```bash [yarn]
yarn run generate
```

```bash [pnpm]
pnpm run generate
```

:::

你可以直接使用 `generate` 命令(简称 `g`) 调用 Stencil CLI。

```shell
stencil generate
# or
stencil g
```

如果你想在 stencil 项目之外运行 `stencil generate`，它可以全局安装。
要做到这一点，请在上面的命令前加上 [`npx`](https://docs.npmjs.com/cli/v9/commands/npx)，就像这样:

```shell
npx stencil generate
```

运行以 `npx` 为前缀的命令会自动为你获取包并提示你安装它。
安装后，Stencil 将运行任务来脚手架一个新组件。

您可以选择将组件标签名称直接传递给命令。
组件标签名必须是小写的，并且至少包含一个破折号(`-`)。

```sh
stencil generate my-new-component
```

生成器会询问你要生成哪些文件。
这允许您创建样式表、 spec 和 e2e 测试以及组件文件。

所有组件都将在 `src/components` 文件夹中生成。
在该目录中，将创建一个与您提供的组件标签名称相同的文件夹，文件将在该文件夹中生成。
也可以指定一个或多个子文件夹来生成组件。

例如，如果指定 `pages/page-home` 作为组件标签名，则文件将在 `src/components/pages/page-home` 中生成。

```shell
stencil generate pages/page-home
```

```txt
src
└── components
    └── pages
        └── page-home
            ├── page-home.css
            ├── page-home.e2e.ts
            ├── page-home.spec.ts
            └── page-home.tsx
```

## 更新 Stencil{#updating-stencil}

要获得 `@stencil/core` 的最新版本，您可以运行:

:::code-group

```bash [npm]
npm install @stencil/core@latest --save-exact
```

```bash [yarn]
yarn add @stencil/core@latest --save-exact
```

```bash [pnpm]
pnpm add @stencil/core@latest --save-exact
```

:::
