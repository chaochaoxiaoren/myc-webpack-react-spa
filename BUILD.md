# react应用
单页面和多页面应用都可以在这一个项目里使用

## 第一阶段 安装依赖
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

