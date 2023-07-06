---
sidebar_label: Getting Started
description: Getting Started
slug: /getting-started
---

# 快速上手{#getting-started}

## 开始一个新项目{#starting-a-new-project}

### 前置条件{#prerequisites}

Stencil 需要最新的 LTS 版本的 [NodeJS](https://nodejs.org/) 和 npm/yarn。在继续之前，请确保已经安装或更新了 Node。

### Running the `create-stencil` CLI

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

## My First Component

Stencil components are created by adding a new file with a `.tsx` extension, such as `my-component.tsx`.
The `.tsx` extension is required since Stencil components are built using [JSX](../components/templating-and-jsx.md) and TypeScript.

When we ran `create-stencil` above, it generated a component, `my-component.tsx`, that can be found in the `src/components/my-component` directory:

```tsx title="my-component.tsx"
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

Once compiled, this component can be used in HTML just like any other tag.

```md
<my-component first="Stencil" middle="'Don't call me a framework'" last="JS"></my-component>
```

When rendered, the browser will display `Hello World! I'm Stencil 'Don't call me a framework' JS`.

### Anatomy of `my-component`

Let's dive in and describe what's happening in `my-component`, line-by-line.

After the import statements, the first piece we see is the [`@Component` decorator](../components/component.md):

```tsx
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
```

This decorator provides metadata about our component to the Stencil compiler.
Information, such as the custom element name (`tag`) to use, can be set here.
This decorator tells Stencil to:

- Set the [element's name](../components/component.md#tag) to 'my-component'
- [Apply the stylesheet](../components/component.md#styleurl) 'my-component.css' to the component
- Enable [native Shadow DOM functionality](../components/component.md#shadow) for this component

Below the `@Component()` decorator, we have a standard JavaScript class declaration:

```tsx
export class MyComponent {
```

Within this class is where you'll write the bulk of your code to bring your Stencil component to life.

Next, the component contains three class members, `first`, `middle` and `last`.
Each of these class members have the [`@Prop()` decorator](../components/properties.md#the-prop-decorator-prop) applied to them:

```ts
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;
```

`@Prop()` tells Stencil that the property is public to the component, and allows Stencil to rerender when any of these public properties change.
We'll see how this works after discussing the `render()` function.

In order for the component to render something to the screen, we must declare a [`render()` function](../components/templating-and-jsx.md#basics) that returns JSX.
If you're not sure what JSX is, be sure to reference the [Using JSX](../components/templating-and-jsx.md) docs.

The quick idea is that our render function needs to return a representation of the HTML we want to push to the DOM.

```tsx
  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
```

This component's `render()` returns a `<div>` element, containing text to render to the screen.

The `render()` function uses all three class members decorated with `@Prop()`, through the `getText` function.
Declaring private functions like `getText` helps pull logic out of the `render()` function's JSX.

Any property decorated with `@Prop()` is also automatically watched for changes.
If a user of our component were to change the element's `first`, `middle`, or `last` properties, our component would fire its `render()` function again, updating the displayed content.

## Component Generator

The `create-stencil` CLI can generate new components for you.
If you used one of the starters, you can simply run the `generate` npm script in your project, which will start the interactive generator.

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

You can invoke the Stencil CLI directly with the `generate` command (`g` for short).

```shell
stencil generate
# or
stencil g
```

If you would like to run `stencil generate` outside of a Stencil project, it can be installed globally.
To do so, prefix the command above with [`npx`](https://docs.npmjs.com/cli/v9/commands/npx), like so:

```shell
npx stencil generate
```

Running a command prefixed with `npx` will fetch the package for you automatically and prompt you to install it.
Once installed, Stencil will run the task to scaffold a new component.

You can optionally pass the component tag name directly to the command.
The component tag name needs to be lowercase and contain at least one dash ('-').

```sh
stencil generate my-new-component
```

The generator will ask you which files to generate.
This allows you to bootstrap a stylesheet as well as spec and e2e tests along with the component file.

All components will be generated within the `src/components` folder.
Within that directory, a folder will be created with the same name as the component tag name you provided, and within that folder the files will be generated.
It is also possible to specify one or multiple sub-folders to generate the component in.

For example, if you specify `pages/page-home` as the component tag name, the files will be generated in `src/components/pages/page-home`.

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
