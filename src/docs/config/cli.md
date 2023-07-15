---
description: 命令行接口-Stencil CLI
---

# 命令行接口 (CLI)

## `stencil build`{#stencil-build}

生成一个 Stencil 项目。下面的标志是 `build` 命令的可用选项。

| Flag            | 描述                                                                                                                                                                                                                | 别名 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `--ci`          | Run a build using recommended settings for a Continuous Integration (CI) environment. Defaults the number of workers to 4, allows for extra time if taking screenshots via the tests and modifies the console logs. | -    |
| `--config`      | `stenccil.config.ts` 文件的路径。这个标志在大多数情况下是不需要的，因为 Stencil 会找到配置。另外，Stencil 配置不是必须的。                                                                                          | `-c` |
| `--debug`       | Adds additional runtime code to help debug, and sets the log level for more verbose output.                                                                                                                         | -    |
| `--dev`         | 运行开发构建                                                                                                                                                                                                        |      |
| `--docs-readme` | 基于组件类型，prop，methods，events，JSDocs, css 变量等生成 readme.md 文档。                                                                                                                                        | -    |
| `--es5`         | 创建一个与 ES5 兼容的构建。默认情况下，在开发期间不会创建 ES5 构建，以缩短构建时间。然而，ES5 构建总是在生产构建期间创建的。在开发期间可以使用此标志创建 ES5 构建。                                                 | -    |
| `--log`         | 将`stencil build` 的日志写入 `stencil-build.log` 文件. log 文件的位置与配置文件的位置相                                                                                                                             | -    |
| `--prerender`   | Prerender the application using the `www` output target after the build has completed.                                                                                                                              | -    |
| `--prod`        | Runs a production build which will optimize each file, improve bundling, remove unused code, minify, etc. A production build is the default, this flag is only used to override the `--dev` flag.                   | -    |
| `--max-workers` | Max number of workers the compiler should use. Defaults to use the same number of CPUs the Operating System has available.                                                                                          | -    |
| `--next`        | 选择加入以测试 "下一个版本" Stencil 编译器功能。                                                                                                                                                                    | -    |
| `--no-cache`    | 禁用使用缓存。                                                                                                                                                                                                      | -    |
| `--no-open`     | 默认情况下，`--serve` 命令将打开一个浏览器窗口。使用 `--no-open` 命令不会自动打开浏览器窗口。                                                                                                                       | -    |
| `--port`        | [集成开发服务器](./dev-server) 的端口. 默认是`3333`.                                                                                                                                                                | `-p` |
| `--serve`       | 启动 [集成开发服务器](./dev-server).                                                                                                                                                                                | -    |
| `--stats`       | 将项目的统计信息写入 `template-stats.json`。stats 文件的位置与配置文件的位置相同。                                                                                                                                  | -    |
| `--verbose`     | 记录关于构建的每个步骤的附加信息。                                                                                                                                                                                  | -    |
| `--watch`       | 在开发期间监视文件，并在文件更新时触发重新构建。                                                                                                                                                                    | -    |

## `stencil test`{#stencil-test}

测试 Stencil 项目。下面的标志是 `test` 命令的可用选项。

| Flag         | 描述                                                                                                                                                                                                                                                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--spec`     | 使用 [Jest](https://jestjs.io/) 执行 `.spec.ts` 文件.                                                                                                                                                                                                                                                                        |
| `--e2e`      | 使用 [Puppeteer](https://developers.google.com/web/tools/puppeteer) 和 [Jest](https://jestjs.io/) 执行 `.e2e.ts` 文件.                                                                                                                                                                                                       |
| `--no-build` | 在运行测试之前跳过生成过程。(您需要事先构建它)。                                                                                                                                                                                                                                                                             |
| `--devtools` | 在 Chrome 中打开开发工具面板进行端到端测试。设置此标志将禁用 `--headless`                                                                                                                                                                                                                                                    |
| `--headless` | 设置在 Chrome 中用于端到端测试的无头模式。`——headless` 和 `——headless=true` 将在 Chrome 中启用“旧”的无头模式，这是 Chrome v112 之前默认使用的模式。`——headless=new` 将启用 Chrome v112 中引入的新的无头模式。有关 Chrome 新 headless 模式的更多信息，请参阅[这篇文章](https://developer.chrome.com/articles/new-headless/)。 |

## `stencil`{#stencil}

| Flag        | 描述                         | 别名 |
| ----------- | ---------------------------- | ---- |
| `--help`    | 显示解释不同标志的帮助输出。 | `-h` |
| `--version` | 打印当前的 Stencil 版本。    | `-v` |

## `stencil generate <sub-folder>`{#stencil-generate-sub-folder}

启动交互式组件生成器。您可以指定一个或多个子文件夹来生成组件。
