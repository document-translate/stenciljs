---
description: Stencil Copy Tasks
---

# 输出目标的拷贝任务

每个输出目标都可以有自己的 `copy` 配置，它是一个对象数组，定义了应该复制到输出目标的构建目录中的任何文件或文件夹。

### src

数组中的每个对象都必须包含一个 `src` 属性，它可以是一个绝对路径，一个来自 `srcDir` 的相对路径，或者一个通配模式。默认情况下，复制到目标的项将使用与源相同的名称。

在下面的 `www` 输出目标示例中的 `copy` 配置中，构建将把整个目录从 `src/images` 复制到 `www/images` 。在这个例子中，由于没有设置 `srcDir` 属性，默认的源目录是 `src`。

```tsx
outputTargets: [
  {
    type: "www",
    copy: [{ src: "images" }],
  },
];
```

### dest

配置文件还可以提供一个可选的 `dest` 属性，它可以是一个绝对路径，也可以是输出目标的构建目录的相对路径。
在下面的例子中，我们将构建目录自定义为 `public` 而不是默认的，这会将 `src/files/fonts` 复制到 `public/static/web-fonts`。

```tsx
outputTargets: [
  {
    type: "www",
    dir: "public",
    copy: [{ src: "files/fonts", dest: "static/web-fonts" }],
  },
];
```

### warn{#warn}

默认情况下，如果文件或目录不可用，如果复制任务找不到它，则不会发出警告。要查看无法找到复制任务源的警告，请使用复制配置对象设置 `warn: true`。

```tsx
outputTargets: [
  {
    type: "dist",
    copy: [{ src: "fonts", warn: true }],
  },
];
```
