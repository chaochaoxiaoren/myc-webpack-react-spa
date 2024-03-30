const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.config.common')
const productionConfig = require('./webpack.config.prod')
const developmentConfig = require('./webpack.config.dev')
const analyzeConfig = require('./webpack.config.analyze')

module.exports = (env) => {
  if (env.production) {
    console.log('prod');
    return merge(commonConfig, productionConfig)
  } else if(env.development) {
    console.log('dev');
    return merge(commonConfig, developmentConfig)
  } else if(env.analyze) {
    return merge(commonConfig, analyzeConfig)
  } else {
    return new Error('No matching configuration was found')
  }
}
