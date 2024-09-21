# webpack 相关
Q: webpack的一些关键概念：

A: 
JavaScript 的 模块打包工具 (module bundler)。通过分析模块之间的依赖，最终将所有模块打包成一份或者多份代码包 (bundler)，供 HTML 直接引用。实质上，Webpack 仅仅提供了 打包功能 和一套 文件处理机制，然后通过生态中的各种 Loader 和 Plugin 对代码进行预编译和打包。因此 Webpack 具有高度的可拓展性，能更好的发挥社区生态的力量。

Entry: 入口文件，Webpack 会从该文件开始进行分析与编译；
Output: 出口路径，打包后创建 bundler 的文件路径以及文件名；
Module: 模块，在 Webpack 中任何文件都可以作为一个模块，会根据配置的不同的 Loader 进行加载和打包；
Chunk: 代码块，可以根据配置，将所有模块代码合并成一个或多个代码块，以便按需加载，提高性能；
Loader: 模块加载器，进行各种文件类型的加载与转换；
Plugin: 拓展插件，可以通过 Webpack 相应的事件钩子，介入到打包过程中的任意环节，从而对代码按需修改；

Q: 有哪些常见的Loader？他们是解决什么问题的？

A: 
file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
source-map-loader：加载额外的 Source Map 文件，以方便断点调试
image-loader：加载并且压缩图片文件
babel-loader：让babel来处理最新的js(ts、jsx)语法
css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

Q: 有哪些常见的Plugin？他们是解决什么问题的？

A: 
HtmlWebpackPlugin: 用于创建最终使用的HTML文件。可自动生成，也可以使用模版创建。
UglifyjsWebpackPlugin: 用于压缩js文件
TerserWebpackPlugin：用于压缩js，更新，支持es6语法
ExtractTextWebpackPlugin: 将所有的入口 chunk中引用的 *.css，移动到独立分离的 CSS 文件

Q: Loader 和 Plugin 有什么差别

A: 
Loader直译为"加载器"。Webpack将一切文件视为模块，Loader让Webpack拥有了加载和解析非JavaScript文件的能力。
Plugin直译为"插件"。Plugin可以扩展Webpack的功能。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

Q: 如何提高Webpack的构建速度

A: 
优化 loader 配置，配置test 、 include 、 exclude
terser-webpack-plugin，开启缓存和多进程压缩
thread-loader 为每个loder开辟单独的进程
cache-loader 给loader设置缓存

 
