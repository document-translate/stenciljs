---
description: 学习如何包装组件，以便人们可以在 React 中使用它们
---

# React 集成

**Supports: React v16.7+ • TypeScript 3.7+ • Stencil v2.9.0+**

Stencil 可以为你的 web 组件生成 React 组件包装器。这允许你的 Stencil 组件在 React 应用程序中使用。与标准 web 组件相比，使用 Stencil 的组件包装器的好处包括：

- 自定义事件将被正确处理，并正确地在 React 渲染树中传播
- 非字符串或数字的属性将被正确地绑定到组件

## 设置{#setup}

### 项目结构{#project-structure}

我们建议在组件库中使用 [monorepo](https://www.toptal.com/front-end/guide-to-monorepos) 结构和组件包装器。
你的项目工作区应该包含你的 Stencil 组件库和生成的 React 组件包装库。

一个项目设置的示例可能看起来类似于：

```bash
top-most-directory/
└── packages/
    ├── stencil-library/
    │   ├── stencil.config.js
    │   └── src/components/
    └── react-library/
        └── src/
            ├── components/
            └── index.ts
```

本指南在 monorepo 中使用 Lerna，但你也可以使用其他解决方案，如 Nx、TurboRepo 等。

要在本教程中使用 Lerna，请全局安装 Lerna:

:::code-group

```bash [npm]
npm install --global lerna
```

```bash [yarn]
yarn global add lerna
```

```bash [pnpm]
pnpm add --global lerna
```

:::

#### 创建一个 monorepo{#creating-a-monorepo}

:::info 提示
如果您已经有一个 monorepo，请跳过本节。
:::

:::code-group

```bash [npm]
# From your top-most-directory/, initialize a workspace
lerna init

# install dependencies
npm install

# install typescript and node types
npm install typescript @types/node --save-dev
```

```bash [yarn]
# From your top-most-directory/, initialize a workspace
lerna init

# install dependencies
yarn install

# install typescript and node types
yarn add typescript @types/node --dev
```

```bash [pnpm]
# From your top-most-directory/, initialize a workspace
lerna init

# install dependencies
pnpm install

# install typescript and node types
pnpm add typescript @types/node --save-dev
```

:::

#### 创建一个 Stencil 组件库

:::info 提示
如果您已经有了 Stencil 组件库，请跳过本节。
:::

:::code-group

```bash [npm]
cd packages/
npm init stencil components stencil-library
cd stencil-library
# Install dependencies
npm install
```

```bash [yarn]
cd packages/
yarn create stencil components stencil-library
cd stencil-library
# Install dependencies
yarn install
```

```bash [pnpm]
cd packages/
pnpm create stencil components stencil-library
cd stencil-library
# Install dependencies
pnpm install
```

:::

#### 创建一个 React 组件库

:::info 提示
如果您已经有了 React 组件库，请跳过本节。
:::

The first time you want to create the component wrappers, you will need to have a React library package to write to.

Run the following commands from the root directory of your monorepo to create a React component library:

```bash npm2yarn
# Create a project
lerna create react-library # fill out the prompts accordingly
cd packages/react-library

# Install core dependencies
npm install react react-dom typescript @types/react --save-dev
```

Lerna does not ship with a TypeScript configuration. At the root of the workspace, create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "noImplicitAny": false,
    "removeComments": true,
    "noLib": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es6",
    "sourceMap": true,
    "lib": ["es6"]
  },
  "exclude": ["node_modules", "**/*.spec.ts", "**/__tests__/**"]
}
```

In your `react-library` project, create a project specific `tsconfig.json` that will extend the root config:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "lib": ["dom", "es2015"],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es2015",
    "skipLibCheck": true,
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "declarationDir": "./dist/types"
  },
  "include": ["lib"],
  "exclude": ["node_modules"]
}
```

Update the generated `package.json` in your `react-library`, adding the following options to the existing config:

```diff
{
-  "main": "lib/react-library.js",
+  "main": "dist/index.js",
+  "module": "dist/index.js",
+  "types": "dist/types/index.d.ts",
  "scripts": {
-    "test": "node ./__tests__/react-library.test.js"
+    "test": "node ./__tests__/react-library.test.js",
+    "build": "npm run tsc",
+    "tsc": "tsc -p ."
-  }
+  },
   "files": [
-    "lib"
+    "dist"
   ]
+  "publishConfig": {
+    "access": "public"
+  },
+  "dependencies": {
+    "stencil-library": "*"
+  }
}
```

:::info 提示
The `stencil-library` dependency is how Lerna knows to resolve the internal Stencil library dependency. See Lerna's documentation on
[package dependency management](https://lerna.js.org/docs/getting-started#package-dependency-management) for more information.
:::

### Adding the React Output Target

Install the `@stencil/react-output-target` dependency to your Stencil component library package.

```bash npm2yarn
# Install dependency
npm install @stencil/react-output-target --save-dev
```

In your project's `stencil.config.ts`, add the `reactOutputTarget` configuration to the `outputTargets` array:

```ts
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "stencil-library",
  outputTargets: [
    // By default, the generated proxy components will
    // leverage the output from the `dist` target, so we
    // need to explicitly define that output alongside the
    // React target
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    reactOutputTarget({
      componentCorePackage: "stencil-library",
      proxiesFile: "../react-library/lib/components/stencil-generated/index.ts",
    }),
  ],
};
```

:::tip
The `proxiesFile` is the relative path to the file that will be generated with all of the React component wrappers. You will replace the
file path to match your project's structure and respective names. You can generate any file name instead of `index.ts`.

The `componentCorePackage` should match the `name` field in your Stencil project's `package.json`.
:::

See the [API section below](#api) for details on each of the output target's options.

You can now build your Stencil component library to generate the component wrappers.

```bash npm2yarn
# Build the library and wrappers
npm run build
```

If the build is successful, you’ll see the new generated file in your React component library at the location specified by the `proxiesFile` argument.

### Add the Components to your React Component Library's Entry File

In order to make the generated files available within your React component library and its consumers, you’ll need to export everything from within your entry file. First, rename `react-library.js` to `index.ts`. Then, modify the contents to match the following:

```tsx
export * from "./components/stencil-generated";
```

### Registering Custom Elements

To register your web components for the lazy-loaded (hydrated) bundle, you'll need to expose a method for registering the underlying Stencil
generated custom elements for the React proxy components to leverage. The easiest way to do this is to modify the React library's entry file
to re-export the Stencil loader's `defineCustomElements()` method. In your React library's entry file (`packages/react-library/lib/index.ts`),
add the following:

```diff
export * from "./components/stencil-generated";
+ export { defineCustomElements } from "stencil-library/loader";
```

### Link Your Packages (Optional)

:::info 提示
If you are using a monorepo tool (Lerna, Nx, etc.), skip this section.
:::

Before you can successfully build a local version of your React component library, you will need to link the Stencil package to the React package.

From your Stencil project's directory, run the following command:

```bash npm2yarn
# Link the working directory
npm link
```

From your React component library's directory, run the following command:

```bash npm2yarn
# Link the package name
npm link name-of-your-stencil-package
```

The name of your Stencil package should match the `name` property from the Stencil component library's `package.json`.

Your component libraries are now linked together. You can make changes in the Stencil component library and run `npm run build` to propagate the
changes to the React component library.

:::tip
As an alternative to `npm link` , you can also run `npm install` with a relative path to your Stencil component library. This strategy, however, will
modify your `package.json` so it is important to make sure you do not commit those changes.
:::

## Consumer Usage

### Creating a Consumer React App

:::info 提示
If you already have a React app, skip this section.
:::

From the `packages/` directory, run the following commands to create a starter React app:

<!-- TODO: see if we can convert this to use `npm2yarn` once related issues are resolved -->
<!-- See https://github.com/facebook/docusaurus/issues/5861 for more information -->

```bash
# Create the React app
npm create vite@latest my-app -- --template react-ts
# of if using yarn
yarn create vite my-app --template react-ts

cd ./my-app

# install dependencies
npm install
# or if using yarn
yarn install
```

You'll also need to link your React component library as a dependency. This step makes it so your React app will be able to correctly resolve imports from your React library. This
is easily done by modifying your React app's `package.json` to include the following:

```json
"dependencies": {
  "react-library": "*"
}
```

### Consuming the React Wrapper Components

This section covers how developers consuming your React component wrappers will use your package and component wrappers.

Before you can consume your React proxy components, you'll need to build your React component library. From `packages/react-library` run:

:::code-group

```bash [npm]
npm run build
```

```bash [yarn]
yarn build
```

```bash [pnpm]
pnpm run build
```

:::

To make use of your React component library in your React application, import your components from your React component library in the file where you want to use them.

```tsx
// App.tsx
import "./App.css";
import { MyComponent, defineCustomElements } from "react-library";

defineCustomElements();

function App() {
  return (
    <div className="App">
      <MyComponent first="Your" last="Name" />
    </div>
  );
}

export default App;
```

## API

### componentCorePackage

**Optional**

**Default: The `components.d.ts` file in the Stencil project's `package.json` types field**

**Type: `string`**

The name of the Stencil package where components are available for consumers (i.e. the value of the `name` property in your Stencil component library's `package.json`).
This is used during compilation to write the correct imports for components.

For a starter Stencil project generated by running:

```bash npm2yarn
npm init stencil component my-component-lib
```

The `componentCorePackage` would be set to:

```ts
// stencil.config.ts

export const config: Config = {
  ...,
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'my-component-lib',
      // ... additional config options
    })
  ]
}
```

Which would result in an import path like:

```js
import { defineCustomElement as defineMyComponent } from "my-component-lib/components/my-component.js";
```

:::info 提示
Although this field is optional, it is _highly_ recommended that it always be defined to avoid potential issues with paths not being generated correctly
when combining other API arguments.
:::

### customElementsDir

**Optional**

**Default: 'dist/components'**

**Type: `string`**

If [includeImportCustomElements](#includeimportcustomelements) is `true`, this option can be used to specify the directory where the generated
custom elements live. This value only needs to be set if the `dir` field on the `dist-custom-elements` output target was set to something other than
the default directory.

### excludeComponents

**Optional**

**Default: `[]`**

**Type: `string[]`**

This lets you specify component tag names for which you don't want to generate React wrapper components. This is useful if you need to write framework-specific versions of components. For instance, in Ionic Framework, this is used for routing components - like tabs - so that
Ionic Framework can integrate better with React Router.

### includeDefineCustomElements

**Optional**

**Default: `true`**

**Type: `boolean`**

If `true`, all Web Components will automatically be registered with the Custom Elements Registry. This can only be used when lazy loading Web Components and will not work when `includeImportCustomElements` is `true`.

### includeImportCustomElements

**Optional**

**Default: `undefined`**

**Type: `boolean`**

If `true`, the output target will import the custom element instance and register it with the Custom Elements Registry when the component is imported inside of a user's app. This can only be used with the [Custom Elements](../output-targets/custom-elements.md) output and will not work with lazy loaded components.

### includePolyfills

**Optional**

**Default: `true`**

**Type: `boolean`**

If `true`, polyfills will automatically be imported and the `applyPolyfills` function will be called in your proxies file. This can only be used when lazy loading Web Components and will not work when `includeImportCustomElements` is enabled.

### loaderDir

**Optional**

**Default: `/dist/loader`**

**Type: `string`**

The path to where the `defineCustomElements` helper method exists within the built project. This option is only used when `includeDefineCustomElements` is enabled.

### proxiesFile

**Required**

**Type: `string`**

This parameter allows you to name the file that contains all the component wrapper definitions produced during the compilation process. This is the first file you should import in your React project.

## FAQ's

### Do I have to use the `dist` output target?

No! By default, this output target will look to use the `dist` output, but the output from `dist-custom-elements` can be used alternatively.

To do so, simply set the `includeImportCustomElements` option in the output target's config and ensure the
[custom elements output target](../output-targets/custom-elements.md) is added to the Stencil config's output target array:

```ts
// stencil.config.ts

export const config: Config = {
  ...,
  outputTargets: [
    // Needs to be included
    {
      type: 'dist-custom-elements'
    },
    reactOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '{path to your proxy file}',
      // This is what tells the target to use the custom elements output
      includeImportCustomElements: true
    })
  ]
}
```

Now, all generated imports will point to the default directory for the custom elements output. If you specified a different directory
using the `dir` property for `dist-custom-elements`, you need to also specify that directory for the React output target. See
[the API section](#customelementsdir) for more information.

In addition, all the Web Components will be automatically defined as the generated component modules are bootstrapped.

### What is the best format to write event names?

Event names shouldn’t include special characters when initially written in Stencil. Try to lean on using camelCased event names for interoperability between frameworks.
