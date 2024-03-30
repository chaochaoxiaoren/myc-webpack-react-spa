const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    server: 'http',
    compress: true, // 代码压缩，增加gzip
    port: 4000, // 端口号
    proxy: [
      { //代理配置
        context: ['/api'],
        target: 'http://localhost:3000',
      },
    ],
    hot: true,
    open: ['/home'],         // 默认打开的路由
	  historyApiFallback: {    // 目的是为了处理单页应用的路由问题，使得所有非静态资源请求都使用指定的入口文件，这样单页面应用就可以直接访问路由查看页面了
      rewrites: [
        { from: /\//, to: '/home/index.html' },        // from是匹配的路由，to是相对于打包文件夹的路径
        { from: /\/home\/*/, to: '/home/index.html' },
        { from: /\/trade\/*/, to: '/trade/index.html' },
      ],
    },
    client: {
      overlay: false
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin()
    ]
  }
}