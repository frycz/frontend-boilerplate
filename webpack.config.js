var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.ts',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
    publicPath: '/',
  },
  resolve: {
      extensions: ["web.js", ".js", ".jsx", ".ts", ".tsx", ".less", ".html"]
    },
  module: {
        rules: [
            { 
              test: /\.css$/,
              loader: ['style-loader', 'css-loader' ]
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
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ]
};
