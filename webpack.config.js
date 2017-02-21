var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './node_modules/materialize-css/dist/js/materialize.min.js',
    './src/index.ts'
  ],
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
            },
            { 
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
              loader: "url-loader?limit=10000&minetype=application/font-woff" 
            },
            {
               test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader" 
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
