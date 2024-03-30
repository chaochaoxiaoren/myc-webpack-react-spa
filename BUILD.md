# react应用
单页面和多页面应用都可以在这一个项目里使用

## 第一阶段 react
1. 安装react，router，mobx
```
npm i react react-dom react-router-dom mobx mobx-react-lite
npm i @babel/preset-react -D
```
2. 配置babel
```
module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [['@babel/plugin-transform-runtime']],
}
```
3. 配置webpack.config.common.js
```
// 支持js 和 jsx 两种类型文件
{
  test: /\.jsx?$/i,
  exclude: /node_modules/,
  loader: 'babel-loader',
},
```
4. 配置多页面
如果多页面内部还有路由，需要配置output的filename

5. 配置redux
```
npm i react-redux  @reduxjs/toolkit
```
6. 简单总结
此次修改的内容让整个架构支持了react的基本技术栈

## 第二阶段 typescript
支持typescript
1. 安装
```
npm i ts-loader typescript @types/react @types/react-dom -D
```
2. 初始化配置，生成tsconfig.json
```
tsc --init
```
3. 配置webpack.config.common.js
```
{
  test: /\.tsx?$/i,
  exclude: /node_modules/,
  loader: 'ts-loader',
},
```
4. 注意ts,tsx文件内直接引入*.css等非ts文件时，会提示找不到文件，这时候需要在根目录下添加声明
> https://geek-docs.com/typescript/typescript-questions/677_typescript_cant_import_cssscss_modules_typescript_says_cannot_find_module.html
```
# 配置globals.d.ts，其他文件类型也是一样的配置
declare module '*.css';
declare module '*.ts';
```

## 第三阶段 less, sass
1. 安装依赖
```
npm i less less-loader sass sass-loader -D
```
2. 配置webpack.config.common.js
```
{
  test: /\.less$/i,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2, // 表示需要先经过多少loader的处理
                          // https://webpack.docschina.org/loaders/css-loader/#importloaders 
                          // 0 => no loaders (default);
                          // 1 => postcss-loader;
                          // 2 => less-loader postcss-loader;
      },
    },
    'postcss-loader',
    'less-loader'
  ],
},
{
  test: /\.s[ac]ss$/i,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2, // 表示需要先经过多少loader的处理
                          // https://webpack.docschina.org/loaders/css-loader/#importloaders 
                          // 0 => no loaders (default);
                          // 1 => postcss-loader;
                          // 2 => sass-loader postcss-loader;
      },
    },
    'postcss-loader',
    'sass-loader'
  ],
},
```
## 第四阶段 eslint
规范代码
1. 初始化配置
```
npm init @eslint/config
// 按照步骤一步一步的选择即可
```
2. 安装webpack 插件,并配置后缀（如果不想因为eslint报错影响开发，可以不安装）
```
npm i eslint-webpack-plugin -D
```
3. 配置.eslintrc.js，.eslintignore
```
// .eslintrc.js
settings: {
    react: {
        version: 'detect',
    },
},

// .eslintignore
node_modules
config
dist
postcss.config.js
babel.config.js
src/iconfont
```
4. package.json 配置脚本, 方便eslint验证，代码修复
```
"eslint": "eslint src",
"eslint:fix": "eslint src --fix"
```
## 第五阶段 stylelint
1. 安装
```
npm init stylelint
```
2. 为了支持less，需要安装和修改配置
```
npm i postcss-less -D

# .stylelintrc.json
{
  "extends": ["stylelint-config-standard"],
  "overrides": [
    {
      "files": ["*.less"],
      "customSyntax": "postcss-less"
    }
  ]
}
```
3. 安装webpack插件, 并配置需要检查的后缀
```
npm i stylelint-webpack-plugin -D
```
4. package.json 配置脚本
```
"stylelint": "stylelint  src/**/*.{vue,scss,css,sass,less}",
"stylelint:fix": "stylelint  src/**/*.{vue,scss,css,sass,less} --fix"
```
## 第六阶段 优化整个项目
包括整个项目的构建优化，打包优化和结构优化
1. 优化,压缩css
安装插件，配置webpack.config.common.js的plugins
```
npm install css-minimizer-webpack-plugin --save-dev
```
2. 优化，压缩html
安装插件，配置webpack.config.common.js的plugins
```
npm install html-minimizer-webpack-plugin --save-dev
```
3. 图片压缩，优化
```
npm install image-minimizer-webpack-plugin imagemin --save-dev
```
图片压缩主要有两种模式：不失真，失真
处理的技术也有两种imagemin, squoosh
此处只使用imagemin，配置webpack.config.common.js的optimization.minimizer
```
// 图片质量不会下降
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
// 图片质量下降
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```
4. json压缩
安装插件，配置webpack.config.common.js的optimization.minimizer
```
npm install json-minimizer-webpack-plugin --save-dev
```
将json文件放在单独的文件中可以看到明显变化

5. css提取到文件
安装插件，这个是常用的将css放置在一个css文件中, 配置 webpack.config.common.js的 plugins 和 module.rules
```
npm install --save-dev mini-css-extract-plugin
```

6. 压缩js代码
安装插件，配置webpack.config.common.js的optimization.minimizer
```
npm install terser-webpack-plugin --save-dev
```

7. 将打包好的文件进一步压缩成gzip文件，方便服务器开启gzip之后直接使用，减少了服务器的压力
> 服务器必须开启gzip
安装插件，配置webpack.config.common.js的plugins
```
npm i compression-webpack-plugin -D
```
## 第七阶段
继续优化，依旧包括构建优化，打包优化
1. 给自己代码前后添加注释
```
new webpack.BannerPlugin({
  banner: 'myc-webpack-spa'
})
```

2. 为了更好的观察整个打包的文件结构，安装webpack-bundle-analyzer
```
npm i webpack-bundle-analyzer -D

// 新增webpack.config.analyze.js文件
// 配置脚本
"analyze": "webpack --env analyze -c ./config/webpack.config.js",
```

3. 配置optimization.splitChunks，拆分更多的chunk文件
没有使用这种方式，因为导出模块联邦时，这个会有影响，以后再仔细研究

4. 缩短ts-loader构建时间
```
npm i fork-ts-checker-webpack-plugin -D
// webpack.config.common.js，查看他的官方文档，发现ts-loader >=9.3.0时直接使用即可
new ForkTsCheckerWebpackPlugin()
```

5. 使用thread-loader加快构建(测试了下，对我的电脑来说有无都没影响，之后可以再细测)
```
npm i thread-loader -D
// 暂时给js 文件加上这个做测试用
```

6. 模块联邦，可以让其他模块共享功能
```
// 提供模块联邦组件配置
new ModuleFederationPlugin({
  // 应用名，全局唯一，不可冲突。 
  name: "component_app",
  // 暴露的文件名称 
  filename: "remoteEntry.js",
  // 远程应用暴露出的模块名。
  exposes: {
    "./Dialog": "./src/pages/home/container/components/Dialog/index.jsx",
  },
  // shared: [ // 与远程模块共享的模块，与远程模块共同配置，这样在页面中就只会加载一次这个library, 用来避免重复加载第三方依赖
  //   "react",
  //   "react-dom"
  // ]
}),

// 使用模块联邦组件配置
new ModuleFederationPlugin({
  //远程访问地址入口
  remotes: {
    "component_app": "component_app@http://localhost:4000/remoteEntry.js",
  },
})
// 组件使用方式Lazy，Suspense
const Dialog = React.lazy(() => import("component_app/Dialog"))
<Suspense fallback={<p>loading</p>}>
  <Dialog />
</Suspense>
```
注意一下问题：   
两边配置的.browserslistrc可以不一致，但是必须保证导出的组件能在两个项目里正常运行，即表示提供者最好能适配所有浏览器，或使用者要做好兼容性处理。

7. 这次修改有很多小改动帮助项目更好的运行
```
// 注释不再单独打包
new TerserPlugin({
  extractComments: false, // 注释不会导出成一个单独的文件
}),

// stylelint 不对class格式做验证
"rules": {
  "selector-class-pattern": null
}

// css-loader配置camelCase: true，允许驼峰、横线链接方式的混合使用
{
  loader: 'css-loader',
  options: {
    modules: {
      exportLocalsConvention: 'camelCase',
    },
    ...
  }
  ...
}

// 另外一个项目的.browserslistrc 修改，支持带有async/await模块联邦组件
defaults and fully supports es6
```






