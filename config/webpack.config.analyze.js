const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
  ]
}
