var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
    publicPath: '/'
  },
  resolve: {
      extensions: ["web.js", ".js", ".jsx", ".ts", ".tsx", ".less", ".html"]
    },
  module: {
        loaders: [
            { 
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            { 
              test: /\.ts|.tsx$/,
              loader: 'ts-loader'
            },
            { 
              test: /\.html$/,
              loader: 'html-loader'
            }
        ]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: false,
    }),
  ]
};
