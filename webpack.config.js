var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js'
  },
  module: {
        loaders: [
            { 
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            }
        ]
  },
  plugins: [
        new ExtractTextPlugin("style.css")
  ],
  devServer: {
   contentBase: path.join(__dirname, "dist"),
   compress: true,
   port: 9000
 }
};
