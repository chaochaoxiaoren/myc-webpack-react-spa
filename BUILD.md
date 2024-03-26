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


