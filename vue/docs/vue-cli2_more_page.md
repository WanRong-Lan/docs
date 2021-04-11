# Vue-cli 2.x 配置多页面

本文适用于Vue-cli 2.x ,Vue-cli 更高版本后续更新



## Vue-cli 2.x 目录结构

```makefile
├── README.md // 项目说明文档
├── node_modules // 依赖包目录
├── build // webpack相关配置文件（都已配置好，一般无需再配置）
│       ├── build.js  //生成环境构建
│       ├── check-versions.js  //版本检查（node，npm）
│       ├── dev-client.js    //开发服务器热重载 （实现页面的自动刷新） 
│       ├── dev-server.js    //构建本地服务器（npm run dev）
│       ├── utils.js         // 构建相关工具
│       ├── vue-loader.conf.js   //csss 加载器配置
│       ├── webpack.base.conf.js    //webpack基础配置
│       ├── webpack.dev.conf.js     // webpack开发环境配置
│       └── webpack.prod.conf.js     //webpack生产环境配置
├── config // vue基本配置文件（可配置监听端口，打包输出等）
│       ├── dev.env.js // 项目开发环境配置
│       ├── index.js //   项目主要配置（包括监听端口、打包路径等）
│       └── prod.env.js // 生产环境配置
├── index.html // 项目入口文件
├── package.json // 项目依赖包配置文件
├── src // 项目核心文件（存放我们编写的源码文件）
└── static // 静态资源目录（一般存放图片类）
```

## 配置内容

#### 创建项目入口文件 more.html

创建在项目根目录下，index.html同一目录下。页面内容与index.html一致或定制化都可以。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue-cli 2.X 多页面配置</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="description" content="Description">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
  <div id="more"></div>
</body>
</html>

```

#### 创建入口 JS 和 .vue 文件

项目核心文件（ src ） 下创建 pages 页面存放各页面需要的.js 和 .vue 文件

```
├── src // 项目核心文件（存放我们编写的源码文件）
│       ├── assets // 静态资源（样式类文件、如css，less，和一些外部的js文件）
│       │       └── css  //样式
│       │       └── font  //字体
│       │       └── images  //图片
│       ├── components // 组件目录
│       │       └── Hello.vue // 测试组件
│       ├── pages // 存放多页面需要的.js 和 .vue
│       │       └── index // index.html 需要的.js 和 .vue
│       │       |       └── App.vue
│       │       │       └── main.js
│       │       └── more // more.html 需要的.js 和 .vue
│       │       │       └── more_App.vue
│       │       │       └── more_main.js
```

文件创建可以根据个人或项目情况创建相关文件，在这里写主要是后面修改后续的构建配置方便讲解

#### 修改 config/index.js

在build 中添加 more.html 的路径，即编译后生成 more.html

```js
...
build: {
  index: path.resolve(__dirname, '../dist/index.html'),
  more: path.resolve(__dirname, '../dist/more.html'),
   ...
}
...
```

#### 修改webpack基础配置

在 build/webpack.base.conf.js  在 entry 中添加入口 js 文件地址

```
entry: {
 	// app: './src/main.js', // 项目构建的时候默认的入口，我把它移到了pages/index 目录下
    app: './src/pages/index/main.js',
    more: './src/pages/more/more_main.js'
},
```

#### 修改webpack开发环境配置

在 build/webpack.dev.conf.js 中 plugins 新增 new HtmlWebpackPlugin

```js
...
plugins: {
// 原先index.html
	new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true,
    chunks:['app']
  }),
  // 新增 more.html
  new HtmlWebpackPlugin({
    filename: 'more.html',
    template: 'more.html',
    inject: true,
    chunks:['more'] // 这段需要修改，不修改的话打包好的 js 文件自动引入到index.html 
  })
}
```

chunks 的值影响到的是在开发环境下各页面引入JS 入口文件的区分，不加这段的话 会导致 index和more JS 互相加载。在下一步生产环境配置中也是一样的

#### 修改webpack生产环境配置

在 build/webpack.prod.conf.js 中 plugins 新增 new HtmlWebpackPlugin

```js
...
plugins: {
// 原先index.html
 	new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','app'] 加入指定引入文件
   }),
  // 新增 more.html
 new HtmlWebpackPlugin({
      filename: config.build.more,
      template: 'more.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor','more'] 加入指定引入文件
    }),
}
```

## 打包验证

1. 执行 npm run build 命令
2. 查验 dist 目录下index.html 和 more.html 
3. 验证 index.html 中引入了 app. 开头的 js 和 css 文件
4. 验证 index.html 中引入了 more. 开头的 js 和 css 文件





