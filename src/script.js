require('./style.css');
require('file-loader?name=[name].[ext]!./index.html');
// TODO: https://webpack.github.io/docs/stylesheets.html separate styles
(function init() {
  console.log('General Tutorial');
})();
