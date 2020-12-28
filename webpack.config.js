const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`)

module.exports = {
  context: src,
  mode: 'development',
  entry: './index.js',
  output: {
    filename: filename('js'),
    path: dist,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': src,
      '@core': path.resolve(src, 'core'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  target: isDev ? 'web' : 'browserslist',
  devServer: {
    open: true,
    watchOptions: {
      ignored: '/node_modules/',
    },
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(src, 'img'),
          to: path.resolve(dist, 'img'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'JS - test', // Title
      favicon: 'img/favicon.ico',
      template: 'template.html', // Исходный файл
      filename: 'index.html', // Выходной
    }),
    new MiniCssExtractPlugin({filename: filename('css')}),
    new WebpackBar(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env', 'postcss-sort-media-queries'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
}
