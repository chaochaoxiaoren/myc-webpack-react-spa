const path = require('path');
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const JsonMinimizerPlugin =  require('json-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const CompressionPlugin = require("compression-webpack-plugin");

const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync('src/pages/*/index.js');
  entryFiles.forEach((entryFile) => {
    console.log(entryFile);
    const file = entryFile.replaceAll('\\', '/')
    const match = file.match(/src\/pages\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = path.resolve(__dirname, `../${entryFile}`);
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        // inlineSource: '.css$',
        template: path.join(__dirname, `../src/pages/${pageName}/index.html`),
        filename: `${pageName}/index.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins
  }
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 表示需要先经过多少loader的处理
                                // https://webpack.docschina.org/loaders/css-loader/#importloaders 
                                // 0 => no loaders (default);
                                // 1 => postcss-loader;
            },
          },
          'postcss-loader', // 和autoprefix 配合做css兼容处理
        ],
      },
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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[hash][ext][query]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.json$/i,
        type: 'asset/resource',
        generator: {
          filename: 'json/[hash][ext][query]'
        }
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },

    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    new StylelintPlugin({
      extensions: ['.css', '.less', '.sass', '.scss']
    }),
    new CssMinimizerPlugin(),
    new HtmlMinimizerPlugin(),
    new CompressionPlugin()
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 40000000,
    // 生成文件的最大体积
    maxAssetSize: 20000000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
      new JsonMinimizerPlugin(),
      new TerserPlugin(),
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
           //或者这样写 '@': '/src' => webpack默认会将相对路径与上下文路径进行拼接 => 上下文路径默认就是node运行是的路径 => 对于我来说就是E:node\前端项目\src
      '@home': path.resolve(__dirname, '../src/pages/home/container'),
      '@trade': path.resolve(__dirname, '../src/pages/trade/container'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], //告诉webpack你引入的文件要寻找哪些后缀的 => 简单来说就是你../index但没有说明是什么后缀的文件(你不设置这里的话好像只会找后缀为js的文件)。
  }
};