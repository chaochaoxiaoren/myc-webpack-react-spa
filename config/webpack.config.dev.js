const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
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
    open: ['/home'],
	  // historyApiFallback: true //历史路径
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin()
    ]
  }
}