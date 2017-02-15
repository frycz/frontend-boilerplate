var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/script.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
    publicPath: '/static/'
  },
  module: {
        loaders: [
            { 
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            { 
              test: /\.ts|.tsx$/,
              loader: ['ts-loader']
            },
            { 
              test: /\.html$/,
              loader: ['file-loader']
            }
        ]
  },
  plugins: [
        new ExtractTextPlugin("style.css")
  ]
};
